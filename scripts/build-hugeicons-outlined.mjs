#!/usr/bin/env node
/**
 * Generate @plexui/icons-hugeicons-outlined from upstream
 * @hugeicons/core-free-icons. Each Hugeicons free icon's open stroke is
 * converted into the filled outline of that stroke — same visual at
 * design size, but the SVG is now a single closed
 * `<path d="..." fill="currentColor" />` instead of an open stroke.
 *
 * Pipeline per icon:
 *   1. Read element-descriptor array from the ESM export, e.g.
 *      `SearchIcon = [["path", { d, stroke, strokeWidth, ... }], …]`.
 *   2. Render a temporary SVG matching the catalog builder's
 *      `hugeiconArrayToSvg` shape (24×24, stroke-width 2, round caps +
 *      joins, currentColor) so the stroke geometry is identical to what
 *      visitors see in the IconBrowser detail panel for the un-converted
 *      Hugeicons set.
 *   3. Inkscape CLI: object-stroke-to-path → flatten stroke geometry
 *      into a closed path.
 *   4. Inkscape CLI: path-union → unite multiple subpaths into one.
 *   5. Post-process: rewrite to Plex's canonical icon shape (single
 *      `<path>` with `fill="currentColor"`).
 *   6. Write packages/icons-hugeicons-outlined/icons/<exportName>.svg.
 *
 * Skips:
 *   - Re-exports (`*FreeIcons` aliases — same data under three names).
 *   - Mixed-mode descriptors (icons that bake fill geometry into stroke
 *     icons; can't be uniformly converted). Same filter as
 *     `scripts/build-icon-catalogs.mjs#isMixedHugeicon`.
 *
 * Mirrors `scripts/build-lucide-outlined.mjs`. Re-running is idempotent —
 * the script clears the output dir first.
 */

import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const runFile = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

const OUTPUT_DIR = join(
  REPO_ROOT,
  'packages',
  'icons-hugeicons-outlined',
  'icons'
);

const INKSCAPE = '/Applications/Inkscape.app/Contents/MacOS/inkscape';

async function ensureInkscape() {
  try {
    const { stdout } = await runFile(INKSCAPE, ['--version']);
    console.log(`[hugeicons-outlined] using ${stdout.trim().split('\n')[0]}`);
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
 * Render a Hugeicons descriptor as the same canonical stroke SVG that
 * the catalog builder emits for the un-converted set. This is the
 * geometry that Inkscape will then convert to a closed filled path —
 * keeping the source-of-truth shape identical to what visitors see in
 * the IconBrowser before they toggle the outlined view.
 *
 * Strips per-path stroke* attrs so the root SVG's stroke cascades down
 * uniformly (otherwise mixed stroke-widths inside one icon survive into
 * the conversion).
 */
function hugeiconArrayToSvg(parts) {
  const STROKE_ATTRS = new Set([
    'stroke',
    'strokeWidth',
    'strokeLinecap',
    'strokeLinejoin',
  ]);
  const camelToKebab = (key) =>
    key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
  const renderAttr = (key, value) =>
    `${camelToKebab(key)}="${String(value).replace(/"/g, '&quot;')}"`;
  const inner = parts
    .map(([tag, attrs]) => {
      const out = {};
      for (const [k, v] of Object.entries(attrs)) {
        if (k === 'key') continue;
        if (STROKE_ATTRS.has(k)) continue;
        out[k] = v;
      }
      const attrStr = Object.entries(out)
        .map(([k, v]) => renderAttr(k, v))
        .join(' ');
      return `<${tag} ${attrStr} />`;
    })
    .join('');
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ' +
    'fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round">' +
    inner +
    '</svg>'
  );
}

/** Mirror of build-icon-catalogs.mjs#isMixedHugeicon. */
function isMixedHugeicon(parts) {
  let hasFill = false;
  let hasStroke = false;
  for (const [, attrs] of parts) {
    if ('fill' in attrs && attrs.fill !== 'none') hasFill = true;
    if ('stroke' in attrs && attrs.stroke !== 'none') hasStroke = true;
    if (hasFill && hasStroke) return true;
  }
  return false;
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

  // ESM-only — dynamic import.
  const mod = await import('@hugeicons/core-free-icons');

  const candidates = [];
  for (const [exportName, value] of Object.entries(mod)) {
    if (!Array.isArray(value)) continue;
    if (!exportName.endsWith('Icon')) continue;
    if (exportName.endsWith('FreeIcons')) continue;
    if (isMixedHugeicon(value)) continue;
    candidates.push({ name: exportName, parts: value });
  }
  console.log(`[hugeicons-outlined] converting ${candidates.length} icons…`);

  let done = 0;
  let failed = [];

  for (const { name, parts } of candidates) {
    const dest = join(OUTPUT_DIR, `${name}.svg`);
    try {
      await writeFile(dest, hugeiconArrayToSvg(parts));
      await inkscapeStrokeToPath(dest);

      const converted = await readFile(dest, 'utf8');
      const normalized = normalizeSvg(converted);
      await writeFile(dest, normalized);

      done += 1;
      if (done % 200 === 0) {
        console.log(`[hugeicons-outlined]   ${done}/${candidates.length}`);
      }
    } catch (err) {
      failed.push({ name, error: err.message });
    }
  }

  console.log(
    `[hugeicons-outlined] done: ${done}/${candidates.length} converted, ${failed.length} failed`
  );
  if (failed.length > 0) {
    console.log('[hugeicons-outlined] failures:');
    for (const f of failed.slice(0, 20)) {
      console.log(`  ${f.name}: ${f.error.split('\n')[0]}`);
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
