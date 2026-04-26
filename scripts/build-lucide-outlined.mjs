#!/usr/bin/env node
/**
 * Generate @plexui/icons-lucide-outlined from the upstream lucide-static
 * package. Each icon's open stroke path is converted into the filled
 * outline of that stroke — same visual at design size, but the SVG is now
 * a single closed `<path d="..." fill="currentColor" />` instead of an
 * open stroke.
 *
 * Pipeline per icon:
 *   1. Read node_modules/lucide-static/icons/<slug>.svg (open stroke).
 *   2. Inkscape CLI: object-stroke-to-path → flattens stroke geometry
 *      into a closed path, preserving round caps + round joins exactly
 *      because Inkscape uses real geometric buffering.
 *   3. Inkscape CLI: path-union → if the icon has multiple subpaths,
 *      unite them into a single compound path (cleaner DOM + simpler
 *      copy-svg output).
 *   4. Post-process: rewrite the SVG so it matches Plex's icon shape:
 *        <svg width="1em" height="1em" viewBox="0 0 24 24"
 *             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
 *          <path d="..." fill="currentColor" />
 *        </svg>
 *      No stroke-* attributes, no `class="lucide ..."`, no XML
 *      declaration / comment.
 *   5. Write packages/icons-lucide-outlined/icons/<slug>.svg.
 *
 * Run via:
 *   npm --workspace=@plexui/icons-lucide-outlined run build
 *
 * Pre-req:
 *   brew install --cask inkscape
 *
 * Re-running is idempotent — the script clears the output dir first.
 */

import { mkdir, readdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

// Use execFile via promisify — argv-based, no shell interpolation, safe.
const runFile = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

const SOURCE_DIR = join(REPO_ROOT, 'node_modules', 'lucide-static', 'icons');
const OUTPUT_DIR = join(
  REPO_ROOT,
  'packages',
  'icons-lucide-outlined',
  'icons'
);

const INKSCAPE = '/Applications/Inkscape.app/Contents/MacOS/inkscape';

/** ──────────────────────────────────────────────────────────
 *  Inkscape availability check
 *  ────────────────────────────────────────────────────────── */
async function ensureInkscape() {
  try {
    const { stdout } = await runFile(INKSCAPE, ['--version']);
    console.log(`[lucide-outlined] using ${stdout.trim().split('\n')[0]}`);
  } catch (err) {
    throw new Error(
      `Inkscape not found at ${INKSCAPE}. Install with:\n  brew install --cask inkscape\n\n(Original error: ${err.message})`
    );
  }
}

/** ──────────────────────────────────────────────────────────
 *  Convert one SVG file in-place via Inkscape actions
 *  ────────────────────────────────────────────────────────── */
async function inkscapeStrokeToPath(filePath) {
  // The action sequence:
  //   select-all                 → select every object in the file
  //   object-stroke-to-path      → flatten strokes into closed filled paths
  //   select-all                 → re-select after the previous op
  //   path-union                 → merge all subpaths into one compound path
  //   export-filename:<path>     → set the output path
  //   export-do                  → run the export
  //
  // Note: Inkscape 1.4+ requires the `export-filename:<path>` action
  // (NOT the `--export-filename` CLI flag) when chained inside `--actions`,
  // otherwise it errors with "No export type specified". The input file is
  // passed positionally; we re-export to the same path so the conversion
  // is in-place.
  //
  // Args are argv-style (no shell), so file paths can't inject.
  await runFile(INKSCAPE, [
    `--actions=select-all;object-stroke-to-path;select-all;path-union;export-filename:${filePath};export-do`,
    '--export-plain-svg',
    filePath,
  ]);
}

/** ──────────────────────────────────────────────────────────
 *  Trim Inkscape's output down to Plex's canonical icon shape
 *  ────────────────────────────────────────────────────────── */
function normalizeSvg(rawSvg) {
  // 1. Strip XML declaration + Lucide's license comment (kept once in README).
  let s = rawSvg.replace(/<\?xml[^?]*\?>/g, '');
  s = s.replace(/<!--[\s\S]*?-->/g, '');

  // 2. Pull every <path d="..."> from the body. After path-union there
  //    should be exactly one, but we'll concatenate any extras to be safe.
  const paths = [...s.matchAll(/<path[^>]*\sd="([^"]+)"[^>]*\/?>/g)].map(
    (m) => m[1]
  );
  if (paths.length === 0) {
    throw new Error('No <path d="…"> in Inkscape output — conversion failed');
  }
  // Concat path data with one space; Inkscape's path-union usually leaves
  // a single d-string but on rare icons (e.g. with disconnected dots) it
  // may emit multiple. Concatenation works because every segment starts
  // with an absolute moveto (M).
  const d = paths.join(' ');

  // 3. Emit the canonical shape — same shape as packages/ui/src/components/Icon/svg/*.tsx
  //    and lucide-static, just with fill instead of stroke.
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">',
    `  <path d="${d}" fill="currentColor"/>`,
    '</svg>',
    '',
  ].join('\n');
}

/** ──────────────────────────────────────────────────────────
 *  Driver
 *  ────────────────────────────────────────────────────────── */
async function main() {
  await ensureInkscape();

  // Fresh output dir — keeps removed-upstream icons from lingering.
  await rm(OUTPUT_DIR, { recursive: true, force: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  const entries = await readdir(SOURCE_DIR);
  const svgs = entries.filter((f) => f.endsWith('.svg'));
  console.log(`[lucide-outlined] converting ${svgs.length} icons…`);

  let done = 0;
  let failed = [];

  // Sequential — Inkscape spawns are heavy; running 12 in parallel locks
  // the machine up. Sequential gives stable ~5–8 ops/s on M-series.
  for (const file of svgs) {
    const slug = file.replace(/\.svg$/, '');
    const src = join(SOURCE_DIR, file);
    const dest = join(OUTPUT_DIR, file);

    try {
      // Copy source → dest, run Inkscape on dest in place.
      const raw = await readFile(src, 'utf8');
      await writeFile(dest, raw);
      await inkscapeStrokeToPath(dest);

      // Read what Inkscape produced, normalize, re-write.
      const converted = await readFile(dest, 'utf8');
      const normalized = normalizeSvg(converted);
      await writeFile(dest, normalized);

      done += 1;
      if (done % 100 === 0) {
        console.log(`[lucide-outlined]   ${done}/${svgs.length}`);
      }
    } catch (err) {
      failed.push({ slug, error: err.message });
    }
  }

  console.log(
    `[lucide-outlined] done: ${done}/${svgs.length} converted, ${failed.length} failed`
  );
  if (failed.length > 0) {
    console.log('[lucide-outlined] failures:');
    for (const f of failed.slice(0, 20)) {
      console.log(`  ${f.slug}: ${f.error.split('\n')[0]}`);
    }
    if (failed.length > 20) {
      console.log(`  … and ${failed.length - 20} more`);
    }
    // Don't throw — partial conversion is still useful; the catalog
    // builder will simply not list missing icons. CI can re-check.
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
