#!/usr/bin/env node
/**
 * Generates static JSON catalogs of icon names + SVG markup for each
 * external icon library used by /docs/icons. Output goes into
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
  const { suffix = '.svg', filterName, transformName } = options;
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
      return { name, svg };
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
  const cleaned = icons.filter(Boolean);
  cleaned.sort((a, b) => a.name.localeCompare(b.name));
  const out = join(OUTPUT_DIR, `${name}.json`);
  await writeFile(out, JSON.stringify(cleaned));
  console.log(`[icon-catalogs] ${name}: ${cleaned.length} icons → ${out}`);
}

/* ── Lucide (stroke) ─────────────────────────────────────── */

async function buildLucideCatalog() {
  const sourceDir = join(REPO_ROOT, 'node_modules', 'lucide-static', 'icons');
  const icons = await readDirSvgs(sourceDir);
  await emitCatalog('lucide-stroke', icons);
}

/* ── Phosphor (regular weight) ───────────────────────────── */

async function buildPhosphorCatalog() {
  const sourceDir = join(
    REPO_ROOT,
    'node_modules',
    '@phosphor-icons/core',
    'assets',
    'regular'
  );
  const icons = await readDirSvgs(sourceDir);
  await emitCatalog('phosphor', icons);
}

/* ── Remix (line variant) ────────────────────────────────── */

async function buildRemixCatalog() {
  const sourceDir = join(REPO_ROOT, 'node_modules', 'remixicon', 'icons');
  // Each Remix icon ships in `-fill` and `-line` flavours under category
  // folders. Use line variants only — they match Plex's outline aesthetic
  // and pair with the package's React export pattern (`RiSearchLine`).
  const icons = await readDirRecursiveSvgs(sourceDir, {
    filterName: (slug) => slug.endsWith('-line'),
    transformName: (slug) => `Ri${toPascalCase(slug)}`,
  });
  await emitCatalog('remix', icons);
}

/* ── Tabler (outline variant) ────────────────────────────── */

async function buildTablerCatalog() {
  const sourceDir = join(
    REPO_ROOT,
    'node_modules',
    '@tabler/icons',
    'icons',
    'outline'
  );
  // Tabler React exports use the `Icon` prefix: search.svg → IconSearch.
  const icons = await readDirSvgs(sourceDir, {
    transformName: (slug) => `Icon${toPascalCase(slug)}`,
  });
  await emitCatalog('tabler', icons);
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
  const renderAttr = (key, value) => {
    if (key === 'key') return null; // React-only, skip
    return `${camelToKebab(key)}="${String(value).replace(/"/g, '&quot;')}"`;
  };
  const inner = parts
    .map(([tag, attrs]) => {
      const attrStr = Object.entries(attrs)
        .map(([k, v]) => renderAttr(k, v))
        .filter(Boolean)
        .join(' ');
      return `<${tag} ${attrStr} />`;
    })
    .join('');
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ' +
    'fill="none" stroke="currentColor" stroke-width="1.5" ' +
    'stroke-linecap="round" stroke-linejoin="round">' +
    inner +
    '</svg>'
  );
}

async function buildHugeiconsCatalog() {
  // Hugeicons exports are ESM-only. Dynamic import to load.
  const mod = await import('@hugeicons/core-free-icons');
  // Each icon is exported under three names: `Bare`, `BareIcon`, `BareFreeIcons`.
  // The full free set is only addressable via `*Icon` (many icons have no
  // bare-name export). Keep `*Icon` as the canonical React name — that
  // matches Hugeicons' own docs (`<HugeiconsIcon icon={SearchIcon} />`).
  const icons = [];
  for (const [exportName, value] of Object.entries(mod)) {
    if (!Array.isArray(value)) continue;
    if (!exportName.endsWith('Icon')) continue;
    if (exportName.endsWith('FreeIcons')) continue;
    icons.push({ name: exportName, svg: hugeiconArrayToSvg(value) });
  }
  await emitCatalog('hugeicons', icons);
}

await buildLucideCatalog();
await buildPhosphorCatalog();
await buildRemixCatalog();
await buildTablerCatalog();
await buildHugeiconsCatalog();
