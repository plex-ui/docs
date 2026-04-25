#!/usr/bin/env node
/**
 * Fetches tag/category metadata from upstream sources for icon
 * libraries that don't ship it inside their npm package, and caches
 * the result as JSON under `scripts/data/`. The build (build-icon-
 * catalogs.mjs) reads from these caches without hitting the network,
 * so a flaky upstream doesn't break docs builds.
 *
 * Run manually when you want to refresh tag data:
 *
 *     npm run fetch:icon-tags
 *
 * Currently pulls:
 *   - Hugeicons → https://hugeicons.com/api/icons (single JSON of every
 *     icon with `{name, tags, category, ...}`). Output mapped by npm
 *     export name (`SearchIcon`) so the build script can do a direct
 *     lookup against the descriptor exports.
 *   - Lucide Lab → tarball of the GitHub repo, extract per-icon
 *     `icons/<slug>.json` files (tags + categories). Output mapped by
 *     PascalCase name to match what `buildLucideLabCatalog` emits.
 *
 * Lucide stroke / Lucide outlined / Tabler — tags ship inside the npm
 * package, the build script reads them directly. Plex Icons — no tag
 * source; would need hand-curation if ever added.
 */

import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const runFile = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const DATA_DIR = join(__dirname, 'data');

await mkdir(DATA_DIR, { recursive: true });

/* ── HUGEICONS ────────────────────────────────────────────── */

async function fetchHugeicons() {
  console.log('[fetch-icon-tags] Hugeicons → https://hugeicons.com/api/icons');
  const response = await fetch('https://hugeicons.com/api/icons');
  if (!response.ok) {
    throw new Error(`Hugeicons API ${response.status}`);
  }
  const data = await response.json();

  // Build map keyed by npm export name (PascalCase + "Icon" suffix).
  // The API uses kebab-case slugs: `search` ↔ `SearchIcon`,
  // `account-setting-01` ↔ `AccountSetting01Icon`.
  //
  // Tag-coverage caveat: the Hugeicons API tags icons with `-01` /
  // `-02` numeric suffixes (`search-01`, `home-01`, `mail-01`) but not
  // the bare slugs (`search`, `home`, `mail`) that also exist in the
  // npm package as aliases. To extend coverage we ALIAS each `-01`
  // entry's tags to the bare-name npm export — so `Search01Icon` AND
  // `SearchIcon` both receive the same tag list. `-02`/`-03`/etc. only
  // populate their own variant.
  const tagsByName = {};
  for (const entry of data.icons) {
    if (!entry?.name) continue;
    if (!entry.tags || entry.tags === entry.name) continue;
    const tags = entry.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    if (tags.length === 0) continue;
    const npm = slugToHugeiconsNpm(entry.name);
    tagsByName[npm] = tags;
    // Alias `-01` → bare. Don't overwrite if bare already populated by
    // a real entry; first-write wins.
    const bareSlug = entry.name.replace(/-01$/, '');
    if (bareSlug !== entry.name) {
      const bareNpm = slugToHugeiconsNpm(bareSlug);
      if (!tagsByName[bareNpm]) tagsByName[bareNpm] = tags;
    }
  }

  const out = join(DATA_DIR, 'hugeicons-tags.json');
  await writeFile(out, JSON.stringify(tagsByName, null, 2) + '\n');
  console.log(
    `[fetch-icon-tags]   ${Object.keys(tagsByName).length} icons → ${out}`
  );
}

/** Convert API slug ("ai-brain", "account-setting-01") to npm export
 *  name ("AiBrainIcon", "AccountSetting01Icon"). */
function slugToHugeiconsNpm(slug) {
  return (
    slug
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('') + 'Icon'
  );
}

/* ── LUCIDE LAB ───────────────────────────────────────────── */

async function fetchLucideLab() {
  console.log(
    '[fetch-icon-tags] Lucide Lab → github.com/lucide-icons/lucide-lab tarball'
  );

  // Stage extraction in a tmp folder under DATA_DIR; remove when done.
  const tmpDir = join(DATA_DIR, '_lucide-lab-tmp');
  await rm(tmpDir, { recursive: true, force: true });
  await mkdir(tmpDir, { recursive: true });

  // Pipe curl → tar to extract only `icons/*.json` files. `--strip-components=2`
  // drops the top-level `lucide-lab-main/icons/` prefix so files land
  // directly in tmpDir.
  await runFile('sh', [
    '-c',
    `curl -sL https://github.com/lucide-icons/lucide-lab/archive/refs/heads/main.tar.gz | tar -xz -C ${JSON.stringify(tmpDir)} --strip-components=2 --include='*/icons/*.json'`,
  ]);

  const files = (await readdir(tmpDir)).filter((f) => f.endsWith('.json'));
  const tagsByName = {};
  for (const file of files) {
    const slug = file.replace(/\.json$/, '');
    const content = JSON.parse(
      await readFile(join(tmpDir, file), 'utf8')
    );
    const tags = Array.isArray(content?.tags) ? content.tags : [];
    if (tags.length === 0) continue;
    // Build catalog key: PascalCase of the slug. Matches what the
    // catalog emits via toPascalCase in build-icon-catalogs.mjs.
    const npm = slug
      .split('-')
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join('');
    tagsByName[npm] = tags;
  }

  await rm(tmpDir, { recursive: true, force: true });

  const out = join(DATA_DIR, 'lucide-lab-tags.json');
  await writeFile(out, JSON.stringify(tagsByName, null, 2) + '\n');
  console.log(
    `[fetch-icon-tags]   ${Object.keys(tagsByName).length} icons → ${out}`
  );
}

/* ── Run ──────────────────────────────────────────────────── */

const targets = process.argv.slice(2);
const tasks = {
  hugeicons: fetchHugeicons,
  'lucide-lab': fetchLucideLab,
};

const selected = targets.length > 0 ? targets : Object.keys(tasks);
for (const name of selected) {
  if (!tasks[name]) {
    console.error(`[fetch-icon-tags] unknown target: ${name}`);
    process.exit(1);
  }
  try {
    await tasks[name]();
  } catch (err) {
    console.error(`[fetch-icon-tags] ${name} FAILED: ${err.message}`);
    process.exitCode = 1;
  }
}
