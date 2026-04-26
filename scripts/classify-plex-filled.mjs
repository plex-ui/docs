#!/usr/bin/env node
/**
 * Pixel-based classifier for Plex icons.
 *
 * Plex uses `fill="currentColor"` on the root <svg> for BOTH outline
 * and filled variants — the visual difference is in the path geometry
 * (outline icons use sub-path winding to subtract a hole). Inspecting
 * the `d` attribute is unreliable because some icons (CaptionCcOn,
 * ChartXAxis/YAxis) use the SAME donut technique but the cutouts are
 * small enough that the icon LOOKS filled to a user.
 *
 * So we rasterize each icon at 64×64 with sharp and measure the ratio
 * of "ink" pixels (alpha > 64) to total pixels. A threshold around
 * 0.32 cleanly separates outline (typical 0.10–0.25) from filled
 * (typical 0.35–0.85) without false positives in either direction.
 *
 * Output: scripts/data/plex-filled-names.json — sorted list of icon
 * names classified as filled. Loaded by the runtime Plex catalog
 * loader to drive the variant tabs (matches the Tabler split UX).
 *
 * Usage:
 *
 *     node scripts/classify-plex-filled.mjs
 */

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const SVG_DIR = join(REPO_ROOT, 'packages', 'ui', 'src', 'components', 'Icon', 'svg');
const OUT = join(__dirname, 'data', 'plex-filled-names.json');

const RENDER_SIZE = 64;
const ALPHA_THRESHOLD = 64;          // count pixels with α > 64 as "ink"
// Histogram from sampling known pairs (rendered without inflating
// stroke):
//   outline (thin):    0.10–0.25
//   outline (dense):   0.25–0.38
//   filled:            0.38–0.55
// Threshold at 0.40 errs on the side of "outline" for ambiguous
// shapes (Plex names are searchable so a filled icon misplaced into
// the outline tab is still findable). Names ending in `Filled` are
// always counted as filled regardless of ratio.
const FILL_RATIO_THRESHOLD = 0.40;

/**
 * Extract the inner JSX of the <svg> from a Plex icon source file and
 * convert it to plain SVG markup that sharp can rasterize.
 */
/**
 * Inline a `const pathProps = { d: "...", fill: "...", … }` constant
 * declared above the JSX so the spread `{...pathProps}` becomes
 * inline SVG attributes. Used by 1 icon (Reload).
 */
function inlinePathPropsConst(source, inner) {
  const constMatch = source.match(/const\s+pathProps\b[^=]*=\s*\{([\s\S]*?)\}\s*;?\s*\n/);
  if (!constMatch) return inner;
  const attrs = [...constMatch[1].matchAll(/(\w+):\s*"([^"]*)"/g)]
    .map(([, k, v]) => {
      const kebab = k.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
      return `${kebab}="${v}"`;
    })
    .join(' ');
  return inner.replace(/\{\s*\.\.\.\s*pathProps\s*\}/g, attrs);
}

function reactToSvg(source) {
  // Find the <svg ...> opening tag and the </svg> closing tag.
  const open = source.match(/<svg\b([^>]*)>/);
  const close = source.match(/<\/svg>/);
  if (!open || !close) return null;
  const innerStart = open.index + open[0].length;
  const innerEnd = close.index;
  let inner = source.slice(innerStart, innerEnd);
  inner = inlinePathPropsConst(source, inner);
  // React JSX → SVG attribute name normalization.
  inner = inner
    .replace(/fillRule=/g, 'fill-rule=')
    .replace(/clipRule=/g, 'clip-rule=')
    .replace(/strokeWidth=/g, 'stroke-width=')
    .replace(/strokeLinecap=/g, 'stroke-linecap=')
    .replace(/strokeLinejoin=/g, 'stroke-linejoin=')
    .replace(/strokeMiterlimit=/g, 'stroke-miterlimit=')
    .replace(/clipPath=/g, 'clip-path=')
    .replace(/aria-hidden="true"/g, '')
    .replace(/\{\.\.\.props\}/g, '');
  // Always render with currentColor → black (sharp resolves this) and
  // a fixed canvas size; ignore the `width="1em"` from the source.
  // CRITICAL: do NOT set stroke= on the wrapper. That would inherit
  // into every <path> and add a 1px black stroke even on Plex's
  // fill-only outline icons, inflating fill ratio for everything.
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${RENDER_SIZE}" height="${RENDER_SIZE}" viewBox="0 0 24 24" fill="black">${inner}</svg>`;
}

async function fillRatio(svgString) {
  const { data, info } = await sharp(Buffer.from(svgString))
    .resize(RENDER_SIZE, RENDER_SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });
  const channels = info.channels;
  const total = info.width * info.height;
  let ink = 0;
  // Iterate alpha channel (last channel of each pixel).
  for (let i = 3; i < data.length; i += channels) {
    if (data[i] > ALPHA_THRESHOLD) ink += 1;
  }
  return ink / total;
}

const files = (await readdir(SVG_DIR))
  .filter((f) => f.endsWith('.tsx'))
  .sort();

const filled = [];
const outline = [];
const errors = [];

for (const file of files) {
  const name = file.replace(/\.tsx$/, '');
  const source = await readFile(join(SVG_DIR, file), 'utf8');
  const svg = reactToSvg(source);
  if (!svg) {
    errors.push({ name, why: 'no <svg> found' });
    continue;
  }
  // Naming convention is the strongest signal — `…Filled` suffix is
  // an intentional declaration by the icon author. Trust it before we
  // even rasterize.
  const isFilledBySuffix = /Filled$/.test(name);
  try {
    const ratio = await fillRatio(svg);
    const isFilled = isFilledBySuffix || ratio >= FILL_RATIO_THRESHOLD;
    (isFilled ? filled : outline).push({
      name,
      ratio: +ratio.toFixed(3),
      ...(isFilledBySuffix ? { bySuffix: true } : {}),
    });
  } catch (err) {
    errors.push({ name, why: err.message });
  }
}

filled.sort((a, b) => a.name.localeCompare(b.name));
outline.sort((a, b) => a.name.localeCompare(b.name));

// Apply manual overrides. The pixel classifier can't reliably tell
// small solid shapes (Stop, CaretDown, Rewind) from outline glyphs —
// Plex draws everything with fill=currentColor without strokes, so
// "filledness" is a subjective visual category that no automated
// signal nails 100% of the time. Keep an explicit allow/deny list.
let manualPromoted = 0;
let manualDemoted = 0;
try {
  const overridesRaw = await readFile(
    join(__dirname, 'data', 'plex-filled-overrides.json'),
    'utf8'
  );
  const overrides = JSON.parse(overridesRaw);
  const include = new Set(overrides.include ?? []);
  const exclude = new Set(overrides.exclude ?? []);
  // Promote include[] from outline → filled.
  for (let i = outline.length - 1; i >= 0; i -= 1) {
    if (include.has(outline[i].name)) {
      filled.push({ ...outline[i], override: 'include' });
      outline.splice(i, 1);
      manualPromoted += 1;
    }
  }
  // Demote exclude[] from filled → outline.
  for (let i = filled.length - 1; i >= 0; i -= 1) {
    if (exclude.has(filled[i].name)) {
      outline.push({ ...filled[i], override: 'exclude' });
      filled.splice(i, 1);
      manualDemoted += 1;
    }
  }
  filled.sort((a, b) => a.name.localeCompare(b.name));
  outline.sort((a, b) => a.name.localeCompare(b.name));
} catch (err) {
  if (err.code !== 'ENOENT') throw err;
  // No overrides file — fine, just run with the algorithmic output.
}

console.log(`Total: ${files.length}`);
console.log(`  outline: ${outline.length}`);
console.log(`  filled:  ${filled.length}`);
if (manualPromoted || manualDemoted) {
  console.log(
    `  overrides: +${manualPromoted} promoted, -${manualDemoted} demoted`
  );
}
if (errors.length) console.log(`  errors:  ${errors.length}`);

// Quick sanity sample
const filledByRatio = [...filled].sort((a, b) => a.ratio - b.ratio);
console.log('\nLowest-ratio filled (closest to threshold, sanity-check these):');
for (const e of filledByRatio.slice(0, 10)) {
  console.log(`  ${e.name.padEnd(36)} ratio=${e.ratio}`);
}
console.log('\nHighest-ratio outline (closest to threshold, sanity-check these):');
const outlineByRatio = [...outline].sort((a, b) => b.ratio - a.ratio);
for (const e of outlineByRatio.slice(0, 10)) {
  console.log(`  ${e.name.padEnd(36)} ratio=${e.ratio}`);
}

if (errors.length) {
  console.log('\nErrors:');
  for (const e of errors) console.log(`  ${e.name.padEnd(36)} ${e.why}`);
}

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(filled.map((e) => e.name), null, 2) + '\n');
console.log(`\n→ ${OUT}`);
