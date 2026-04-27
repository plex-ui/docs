#!/usr/bin/env node
/**
 * Generate @plexui/icons-tabler-outlined from upstream @tabler/icons.
 * Each Tabler outline icon's open stroke is converted into the filled
 * outline of that stroke — same visual at design size, but the SVG is
 * now a single closed `<path d="..." fill="currentColor" />` instead of
 * an open stroke.
 *
 * Pipeline per icon:
 *   1. Read node_modules/@tabler/icons/icons/outline/<slug>.svg.
 *   2. Inkscape CLI: object-stroke-to-path → flatten stroke geometry
 *      into a closed path, preserving round caps + round joins.
 *   3. Inkscape CLI: path-union → if the icon has multiple subpaths,
 *      unite them into a single compound path.
 *   4. Post-process: rewrite the SVG to Plex's canonical icon shape:
 *        <svg width="1em" height="1em" viewBox="0 0 24 24"
 *             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
 *          <path d="..." fill="currentColor" />
 *        </svg>
 *      Drops Tabler's `<path stroke="none" d="M0 0h24v24H0z" fill="none"/>`
 *      transparent backdrop (it's an artefact of how Tabler ships the
 *      outline set, not visible geometry).
 *   5. Write packages/icons-tabler-outlined/icons/<slug>.svg.
 *
 * Mirrors `scripts/build-lucide-outlined.mjs`. Re-running is idempotent —
 * the script clears the output dir first.
 */

import { mkdir, readdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const runFile = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

const SOURCE_DIR = join(
  REPO_ROOT,
  'node_modules',
  '@tabler',
  'icons',
  'icons',
  'outline'
);
const OUTPUT_DIR = join(
  REPO_ROOT,
  'packages',
  'icons-tabler-outlined',
  'icons'
);

const INKSCAPE = '/Applications/Inkscape.app/Contents/MacOS/inkscape';

async function ensureInkscape() {
  try {
    const { stdout } = await runFile(INKSCAPE, ['--version']);
    console.log(`[tabler-outlined] using ${stdout.trim().split('\n')[0]}`);
  } catch (err) {
    throw new Error(
      `Inkscape not found at ${INKSCAPE}. Install with:\n  brew install --cask inkscape\n\n(Original error: ${err.message})`
    );
  }
}

async function inkscapeStrokeToPath(filePath) {
  await runFile(INKSCAPE, [
    `--actions=select-all;object-stroke-to-path;select-all;path-union;export-filename:${filePath};export-do`,
    '--export-plain-svg',
    filePath,
  ]);
}

/**
 * Strip Tabler's invisible backdrop path before running the conversion —
 * it's a 24×24 transparent rectangle that exists only to keep the
 * artwork in bounds in design tooling. After object-stroke-to-path it
 * would still be there as a closed (though invisible) shape, and the
 * subsequent path-union would merge it with the real geometry, ruining
 * the silhouette. Drop it up front so the conversion sees only the
 * visible strokes.
 */
function stripTablerBackdrop(rawSvg) {
  return rawSvg.replace(
    /<path\s+stroke="none"\s+d="M0\s+0h24v24H0z"\s+fill="none"\s*\/?>/g,
    ''
  );
}

function normalizeSvg(rawSvg) {
  let s = rawSvg.replace(/<\?xml[^?]*\?>/g, '');
  s = s.replace(/<!--[\s\S]*?-->/g, '');

  const paths = [...s.matchAll(/<path[^>]*\sd="([^"]+)"[^>]*\/?>/g)].map(
    (m) => m[1]
  );
  if (paths.length === 0) {
    throw new Error('No <path d="…"> in Inkscape output — conversion failed');
  }
  const d = paths.join(' ');

  return [
    '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">',
    `  <path d="${d}" fill="currentColor"/>`,
    '</svg>',
    '',
  ].join('\n');
}

async function main() {
  await ensureInkscape();

  await rm(OUTPUT_DIR, { recursive: true, force: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  const entries = await readdir(SOURCE_DIR);
  const svgs = entries.filter((f) => f.endsWith('.svg'));
  console.log(`[tabler-outlined] converting ${svgs.length} icons…`);

  let done = 0;
  let failed = [];

  for (const file of svgs) {
    const slug = file.replace(/\.svg$/, '');
    const src = join(SOURCE_DIR, file);
    const dest = join(OUTPUT_DIR, file);

    try {
      const raw = await readFile(src, 'utf8');
      const stripped = stripTablerBackdrop(raw);
      await writeFile(dest, stripped);
      await inkscapeStrokeToPath(dest);

      const converted = await readFile(dest, 'utf8');
      const normalized = normalizeSvg(converted);
      await writeFile(dest, normalized);

      done += 1;
      if (done % 200 === 0) {
        console.log(`[tabler-outlined]   ${done}/${svgs.length}`);
      }
    } catch (err) {
      failed.push({ slug, error: err.message });
    }
  }

  console.log(
    `[tabler-outlined] done: ${done}/${svgs.length} converted, ${failed.length} failed`
  );
  if (failed.length > 0) {
    console.log('[tabler-outlined] failures:');
    for (const f of failed.slice(0, 20)) {
      console.log(`  ${f.slug}: ${f.error.split('\n')[0]}`);
    }
    if (failed.length > 20) {
      console.log(`  … and ${failed.length - 20} more`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
