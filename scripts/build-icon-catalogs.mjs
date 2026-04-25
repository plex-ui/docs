#!/usr/bin/env node
/**
 * Generates static JSON catalogs of icon names + SVG markup for each
 * external icon library used by /docs/icons. Output goes into
 * public/icon-libraries/<id>.json so the IconBrowser can fetch it at
 * runtime via plain HTTP without bundling 1.9k React components into
 * the docs route's main chunk.
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

/**
 * Lucide ships every icon as a 24×24 stroke SVG inside lucide-static.
 * Read every .svg file, derive the React export name from the filename,
 * and emit one big JSON file the IconBrowser can fetch in one round trip.
 */
async function buildLucideCatalog() {
  const sourceDir = join(REPO_ROOT, 'node_modules', 'lucide-static', 'icons');
  const entries = (await readdir(sourceDir)).filter((file) =>
    file.endsWith('.svg')
  );

  const icons = await Promise.all(
    entries.map(async (file) => {
      const slug = file.replace(/\.svg$/, '');
      const raw = (await readFile(join(sourceDir, file), 'utf8')).trim();
      // For `<img>` rendering currentColor doesn't resolve — we render a
      // hard-coded `currentColor` literal as a CSS variable later. Bake it
      // as `#0d0d0d` in the canonical preview, but keep a `currentColor`
      // copy for "Copy SVG" / "Download" so consumers get the editable form.
      return {
        name: toPascalCase(slug),
        svg: raw,
      };
    })
  );

  icons.sort((a, b) => a.name.localeCompare(b.name));

  await mkdir(OUTPUT_DIR, { recursive: true });
  const out = join(OUTPUT_DIR, 'lucide-stroke.json');
  await writeFile(out, JSON.stringify(icons));
  console.log(`[icon-catalogs] lucide-stroke: ${icons.length} icons → ${out}`);
}

await buildLucideCatalog();
