#!/usr/bin/env node
/**
 * Generates static JSON catalogs of icon names + SVG markup for each
 * external icon library used by /icons. Output goes into
 * public/icon-libraries/<id>.json so the IconBrowser can fetch it at
 * runtime via plain HTTP without bundling thousands of React components
 * into the docs route's main chunk.
 *
 * Run via `npm run build:icon-catalogs` (or via the predev/prebuild hook).
 */

import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const OUTPUT_DIR = join(REPO_ROOT, 'public', 'icon-libraries');

/** Map kebab-case → PascalCase, e.g. "a-arrow-down" → "AArrowDown". */
function toPascalCase(slug) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/** Map camelCase → kebab-case for SVG attribute names. */
function camelToKebab(name) {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase();
}

async function readDirSvgs(dir, options = {}) {
  const {
    suffix = '.svg',
    filterName,
    transformName,
    /** Optional `{<slug>: ["alias1", "alias2"]}` map. The slug used for
     *  lookup is the FILENAME (with `-bold` etc still in it for libs that
     *  suffix). Tags survive on the record as `record.tags` only when
     *  the lookup hits — otherwise omitted. */
    tagsBySlug,
  } = options;
  const entries = await readdir(dir);
  const files = entries.filter((file) => file.endsWith(suffix));
  return Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.svg$/, '');
      if (filterName && !filterName(slug)) return null;
      const svg = (await readFile(join(dir, file), 'utf8')).trim();
      const name = transformName
        ? transformName(slug)
        : toPascalCase(slug);
      const tags = tagsBySlug ? tagsBySlug[slug] : undefined;
      const record = { name, svg };
      if (tags && tags.length > 0) record.tags = tags;
      return record;
    })
  );
}

async function readDirRecursiveSvgs(dir, options = {}) {
  const { filterName, transformName } = options;
  const out = [];
  const walk = async (current) => {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.name.endsWith('.svg')) {
        const slug = entry.name.replace(/\.svg$/, '');
        if (filterName && !filterName(slug)) continue;
        const svg = (await readFile(full, 'utf8')).trim();
        const name = transformName ? transformName(slug) : toPascalCase(slug);
        out.push({ name, svg });
      }
    }
  };
  await walk(dir);
  return out;
}

async function emitCatalog(name, icons) {
  await mkdir(OUTPUT_DIR, { recursive: true });
  // Drop nulls + dedupe by `name` (Hugeicons in particular can re-export
  // the same icon under several aliases that all start with the same
  // canonical PascalCase name; React `key` collisions follow).
  const seen = new Set();
  const cleaned = icons
    .filter((entry) => entry && !seen.has(entry.name) && seen.add(entry.name));
  cleaned.sort((a, b) => a.name.localeCompare(b.name));
  const out = join(OUTPUT_DIR, `${name}.json`);
  await writeFile(out, JSON.stringify(cleaned));
  console.log(`[icon-catalogs] ${name}: ${cleaned.length} icons → ${out}`);
}

/* ── Lucide (stroke) ─────────────────────────────────────── */

/** Loaded once + reused for both Lucide variants. Maps each slug to its
 *  list of aliases (e.g. `heart → ["like","love","emotion","suit",…]`).
 *  The detail panel uses these to surface searchable synonyms below the
 *  icon name — same as lucide.dev/icons does. */
async function loadLucideTags() {
  const path = join(REPO_ROOT, 'node_modules', 'lucide-static', 'tags.json');
  const raw = await readFile(path, 'utf8');
  return JSON.parse(raw);
}

async function buildLucideCatalog() {
  const sourceDir = join(REPO_ROOT, 'node_modules', 'lucide-static', 'icons');
  const tagsBySlug = await loadLucideTags();
  const icons = await readDirSvgs(sourceDir, { tagsBySlug });
  // Slug `lucide` (was `lucide-stroke`) — the loader merges the outlined
  // variant in client-side, so the tab is one unified Lucide catalog.
  await emitCatalog('lucide', icons);
}

/* ── Lucide outlined (stroke-to-fill geometry) ───────────── */

/* ── Lucide Lab (@lucide/lab) ────────────────────────────── */

async function buildLucideLabCatalog() {
  // Lab ships the same SVG-on-disk format as lucide-static. License
  // header in each file is `@license @lucide/lab v0.1.x - ISC`.
  // Per-icon tags / categories live in the `lucide-icons/lucide-lab`
  // GitHub repo as `icons/<slug>.json` files; the npm package strips
  // them. We cache the GitHub tarball into
  // `scripts/data/lucide-lab-tags.json` via `npm run fetch:icon-tags`.
  const sourceDir = join(REPO_ROOT, 'node_modules', '@lucide', 'lab', 'icons');
  const tagsByName = await loadCachedTags('lucide-lab-tags.json');
  const icons = await readDirSvgs(sourceDir);
  // The cache is keyed by PascalCase name (matching what `readDirSvgs`
  // emits via `toPascalCase(slug)`), so we attach tags by name here.
  for (const icon of icons) {
    if (!icon) continue;
    const tags = tagsByName[icon.name];
    if (tags && tags.length > 0) icon.tags = tags;
  }
  await emitCatalog('lucide-lab', icons);
}

async function buildLucideOutlinedCatalog() {
  // Source: packages/icons-lucide-outlined/icons/<slug>.svg
  // Generated by `scripts/build-lucide-outlined.mjs` from upstream
  // lucide-static via Inkscape's object-stroke-to-path action. Same
  // visual at design size, but each icon is one closed `<path d="…"
  // fill="currentColor"/>` instead of an open stroke. Tags inherit
  // from the upstream tags.json so the alias list works on this tab too.
  const sourceDir = join(
    REPO_ROOT,
    'packages',
    'icons-lucide-outlined',
    'icons'
  );
  const tagsBySlug = await loadLucideTags();
  const icons = await readDirSvgs(sourceDir, { tagsBySlug });
  await emitCatalog('lucide-outlined', icons);
}

/* ── Tabler (outline + filled variants) ──────────────────── */

/**
 * Tabler ships two variant directories under `@tabler/icons/icons/`:
 *   - `outline/` (5,039 icons) — stroke-based, default
 *   - `filled/`  (1,053 icons) — filled paths, strict subset of outline
 *
 * Tabler React exports use the `Icon` prefix:
 *   `search.svg` (outline) → `IconSearch`
 *   `search.svg` (filled)  → `IconSearchFilled`
 *
 * Tags live alongside in `@tabler/icons/icons.json` (`{tags[]}`) and
 * are shared between styles, so we reuse one tag map for both variants.
 */

function tablerTagsBySlug(meta) {
  return Object.fromEntries(
    Object.entries(meta).map(([slug, info]) => [slug, info?.tags ?? []])
  );
}

async function buildTablerCatalog() {
  const sourceDir = join(
    REPO_ROOT,
    'node_modules',
    '@tabler/icons',
    'icons',
    'outline'
  );
  const metaPath = join(REPO_ROOT, 'node_modules', '@tabler/icons', 'icons.json');
  const meta = JSON.parse(await readFile(metaPath, 'utf8'));
  const icons = await readDirSvgs(sourceDir, {
    transformName: (slug) => `Icon${toPascalCase(slug)}`,
    tagsBySlug: tablerTagsBySlug(meta),
  });
  await emitCatalog('tabler', icons);
}

async function buildTablerOutlinedCatalog() {
  // Source: packages/icons-tabler-outlined/icons/<slug>.svg
  // Generated by `scripts/build-tabler-outlined.mjs` from the upstream
  // Tabler outline set via Inkscape's object-stroke-to-path action.
  // Same visual at design size, but each icon is one closed
  // `<path d="…" fill="currentColor"/>`. Names + tags mirror the stroke
  // catalog (same `IconFoo` PascalCase, same per-slug tags) so the
  // loader can merge both catalogs by name.
  const sourceDir = join(
    REPO_ROOT,
    'packages',
    'icons-tabler-outlined',
    'icons'
  );
  const metaPath = join(REPO_ROOT, 'node_modules', '@tabler/icons', 'icons.json');
  const meta = JSON.parse(await readFile(metaPath, 'utf8'));
  const icons = await readDirSvgs(sourceDir, {
    transformName: (slug) => `Icon${toPascalCase(slug)}`,
    tagsBySlug: tablerTagsBySlug(meta),
  });
  await emitCatalog('tabler-outlined', icons);
}

async function buildTablerFilledCatalog() {
  const sourceDir = join(
    REPO_ROOT,
    'node_modules',
    '@tabler/icons',
    'icons',
    'filled'
  );
  const metaPath = join(REPO_ROOT, 'node_modules', '@tabler/icons', 'icons.json');
  const meta = JSON.parse(await readFile(metaPath, 'utf8'));
  const icons = await readDirSvgs(sourceDir, {
    transformName: (slug) => `Icon${toPascalCase(slug)}Filled`,
    tagsBySlug: tablerTagsBySlug(meta),
  });
  await emitCatalog('tabler-filled', icons);
}

/* ── Hugeicons (free) ────────────────────────────────────── */

/**
 * Hugeicons ship icons as element descriptor arrays:
 *   [["path", {d, stroke, strokeWidth, key, …}], …]
 * Convert each to a plain SVG string so the same render path used for
 * every other catalog (DOMParser → React.createElement) works for
 * Hugeicons too.
 */
function hugeiconArrayToSvg(parts) {
  // We only enter this function for pure-stroke Hugeicons icons; the
  // mixed (stroke + fill) ones are filtered out earlier by
  // `isMixedHugeicon`. So per-path attribute handling is simple: strip
  // every per-path stroke* attr so the root SVG's `stroke="currentColor"
  // stroke-width="2" linecap=round linejoin=round` cascades down via
  // SVG inheritance, putting every Hugeicon on the same 2px stroke
  // grid as Lucide and Tabler.
  const STROKE_ATTRS = new Set([
    'stroke',
    'strokeWidth',
    'strokeLinecap',
    'strokeLinejoin',
  ]);
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

/** Load a `{name: tags[]}` map cached by `scripts/fetch-icon-tags.mjs`.
 *  Returns an empty object if the cache file is missing — the build
 *  succeeds without tags rather than failing on an offline machine. */
async function loadCachedTags(filename) {
  const path = join(__dirname, 'data', filename);
  try {
    const raw = await readFile(path, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(
        `[icon-catalogs]   no cache at ${filename} — run \`npm run fetch:icon-tags\` to populate`
      );
      return {};
    }
    throw err;
  }
}

async function buildHugeiconsCatalog() {
  // Hugeicons exports are ESM-only. Dynamic import to load.
  const mod = await import('@hugeicons/core-free-icons');
  // Each icon is exported under three names: `Bare`, `BareIcon`, `BareFreeIcons`.
  // The full free set is only addressable via `*Icon` (many icons have no
  // bare-name export). Keep `*Icon` as the canonical React name — that
  // matches Hugeicons' own docs (`<HugeiconsIcon icon={SearchIcon} />`).
  //
  // Skip ~40 "mixed" icons (~0.7% of the set) that ship both fill-paths
  // and stroke-paths in the same descriptor. These can't be cleanly
  // unified with our 2px stroke-width target — the baked fill geometry
  // doesn't scale with the slider, producing visually mismatched
  // thickness inside one icon. List as of @hugeicons/core-free-icons
  // 4.1.1: AccessIcon, AiLearningIcon, all Cursor*, all Touch*,
  // Touchpad*, Progress0[2-4], etc. Users who need them can install
  // @hugeicons/react directly.
  //
  // Tags come from the public Hugeicons API mirror cached at
  // `scripts/data/hugeicons-tags.json` (fetched by `npm run fetch:icon-tags`).
  const tagsByName = await loadCachedTags('hugeicons-tags.json');
  const icons = [];
  let skipped = 0;
  for (const [exportName, value] of Object.entries(mod)) {
    if (!Array.isArray(value)) continue;
    if (!exportName.endsWith('Icon')) continue;
    if (exportName.endsWith('FreeIcons')) continue;
    if (isMixedHugeicon(value)) {
      skipped += 1;
      continue;
    }
    const record = { name: exportName, svg: hugeiconArrayToSvg(value) };
    const tags = tagsByName[exportName];
    if (tags && tags.length > 0) record.tags = tags;
    icons.push(record);
  }
  if (skipped > 0) {
    console.log(`[icon-catalogs] hugeicons: skipped ${skipped} mixed-mode icons`);
  }
  await emitCatalog('hugeicons', icons);
}

async function buildHugeiconsOutlinedCatalog() {
  // Source: packages/icons-hugeicons-outlined/icons/<ExportName>.svg
  // Generated by `scripts/build-hugeicons-outlined.mjs` from the
  // pure-stroke @hugeicons/core-free-icons descriptors via Inkscape's
  // object-stroke-to-path action. File slug IS the export name (e.g.
  // `SearchIcon.svg`), so no PascalCase transform — just identity.
  // Tags inherit from the same cached `hugeicons-tags.json` so the
  // alias list works on the outlined toggle too.
  const sourceDir = join(
    REPO_ROOT,
    'packages',
    'icons-hugeicons-outlined',
    'icons'
  );
  const tagsByName = await loadCachedTags('hugeicons-tags.json');
  const icons = await readDirSvgs(sourceDir, {
    transformName: (slug) => slug,
    tagsBySlug: tagsByName,
  });
  await emitCatalog('hugeicons-outlined', icons);
}

/** A Hugeicons descriptor is "mixed" when it contains both fill-paths
 *  (`fill: "currentColor"`) and stroke-paths (`stroke: ...`) in the same
 *  icon. These render correctly at Hugeicons' native 1.5 stroke-width
 *  but can't be uniformly scaled to a different stroke-width because
 *  the fill geometry is baked. Skipped in the catalog. */
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

await buildLucideCatalog();
await buildLucideOutlinedCatalog();
await buildLucideLabCatalog();
await buildTablerCatalog();
await buildTablerOutlinedCatalog();
await buildTablerFilledCatalog();
await buildHugeiconsCatalog();
await buildHugeiconsOutlinedCatalog();
await emitPlexTags();
await emitPlexFilledNames();

/** Plex icons live as React components, so we don't generate a
 *  per-icon JSON catalog for them. We do, however, copy the side-car
 *  tags JSON (produced by `scripts/generate-plex-tags.mjs`) into the
 *  served `public/icon-libraries/` so the runtime Plex loader can
 *  fetch it. Skipped silently if the source file isn't there yet. */
async function emitPlexTags() {
  const inPath = join(__dirname, 'data', 'plex-tags.json');
  const outPath = join(OUTPUT_DIR, 'plex-tags.json');
  try {
    const raw = await readFile(inPath, 'utf8');
    await mkdir(OUTPUT_DIR, { recursive: true });
    await writeFile(outPath, raw);
    const data = JSON.parse(raw);
    console.log(
      `[icon-catalogs] plex-tags: ${Object.keys(data).length} entries → ${outPath}`
    );
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
    console.log(
      '[icon-catalogs] plex-tags: no source at scripts/data/plex-tags.json — run `npm run generate:plex-tags` to populate'
    );
  }
}

/** Mirror of `scripts/data/plex-filled-names.json` (produced by
 *  `scripts/classify-plex-filled.mjs`). The runtime Plex catalog
 *  loader fetches this list to drive the Outline / Filled tabs —
 *  Plex's `Filled` suffix is unreliable (BookmarkSaved, CaptionCcOn,
 *  ChartXAxis, etc. are visually filled without it), so the
 *  classifier rasterizes each icon and trusts a fill-ratio threshold
 *  combined with the suffix as a fallback. */
async function emitPlexFilledNames() {
  const inPath = join(__dirname, 'data', 'plex-filled-names.json');
  const outPath = join(OUTPUT_DIR, 'plex-filled-names.json');
  try {
    const raw = await readFile(inPath, 'utf8');
    await mkdir(OUTPUT_DIR, { recursive: true });
    await writeFile(outPath, raw);
    const data = JSON.parse(raw);
    console.log(
      `[icon-catalogs] plex-filled-names: ${data.length} names → ${outPath}`
    );
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
    console.log(
      '[icon-catalogs] plex-filled-names: no source — run `node scripts/classify-plex-filled.mjs`'
    );
  }
}
