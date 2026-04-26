#!/usr/bin/env node
/**
 * Generate search tags for Plex icons. Plex doesn't have an upstream
 * tag source (OpenAI Apps SDK — where these icons come from — does
 * name-only filtering in its Storybook gallery), so we build tags
 * mechanically from icon names plus a small curated synonym dictionary
 * for cases where the user might search by a different word entirely
 * (e.g. typing "trash" should find "Delete").
 *
 * Pipeline per icon name (e.g. `BackToApp`):
 *   1. Strip size/variant suffixes (Sm, Md, Lg, Xl, 01, 02, ...)
 *      → `BackToApp`
 *   2. Split PascalCase into lowercase words; drop stopwords
 *      → ["back", "app"] (drops "to")
 *   3. For each remaining word, add at most ONE synonym from the
 *      curated dictionary if a strong alternate keyword exists.
 *      Most words contribute themselves only — synonym expansion is
 *      reserved for cases where the icon name and the user's mental
 *      model genuinely diverge (`Delete` ↔ `trash`, `Mail` ↔ `email`).
 *   4. Cap at 5 tags. Drop the lowercase concatenation of the original
 *      name (the grid already filters by name; the tag list is for
 *      *related* keywords).
 *
 * Output: `scripts/data/plex-tags.json` keyed by PascalCase name.
 * Build copies it to `public/icon-libraries/plex-tags.json` and the
 * runtime Plex catalog loader merges tags onto each icon entry.
 *
 * Run manually:
 *
 *     npm run generate:plex-tags
 */

import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const SVG_DIR = join(REPO_ROOT, 'packages', 'ui', 'src', 'components', 'Icon', 'svg');
const OUT = join(__dirname, 'data', 'plex-tags.json');

const MAX_TAGS = 5;

/** Suffixes that mark size or numeric variants and don't contribute to
 *  meaning. Stripped before word decomposition. */
const VARIANT_SUFFIXES = [
  /(?:Sm|Md|Lg|Xl|Xxl)$/,
  /\d{1,3}$/, // ArrowDown01 → ArrowDown
];

/** Stopwords that fall out of PascalCase splits but carry no search
 *  signal. `BackToApp` → ["back", "to", "app"] → drop "to". */
const STOPWORDS = new Set([
  'a', 'an', 'the',
  'to', 'of', 'in', 'on', 'at', 'by', 'with', 'for', 'from', 'into', 'onto',
  'and', 'or', 'but', 'as', 'is', 'are', 'be',
  'my', 'your', 'our',
]);

/** Curated alternate-keyword map. Each key is a lowercase atom from
 *  name decomposition; the value is ONE alternate keyword the user
 *  might search by. Kept tight on purpose — over-expansion produces
 *  noisy, padded-looking tag lists. */
const ALT = {
  // Actions where the icon name and the searched word genuinely diverge
  add: 'plus',
  plus: 'add',
  remove: 'delete',
  delete: 'trash',
  trash: 'delete',
  edit: 'pencil',
  pencil: 'edit',
  search: 'find',
  find: 'search',
  settings: 'gear',
  gear: 'settings',
  cog: 'settings',
  refresh: 'reload',
  reload: 'refresh',
  filter: 'sort',
  download: 'save',
  upload: 'send',
  share: 'export',
  export: 'share',
  // Communication
  mail: 'email',
  email: 'mail',
  envelope: 'mail',
  message: 'chat',
  chat: 'message',
  bell: 'notification',
  notification: 'bell',
  // People
  user: 'profile',
  profile: 'avatar',
  avatar: 'user',
  team: 'group',
  group: 'team',
  // Files
  document: 'file',
  folder: 'directory',
  // Tech / status
  lock: 'secure',
  unlock: 'open',
  shield: 'security',
  key: 'access',
  cloud: 'storage',
  // Media
  image: 'photo',
  photo: 'image',
  camera: 'photo',
  microphone: 'mic',
  // Misc
  star: 'favorite',
  bookmark: 'favorite',
  heart: 'like',
  warning: 'alert',
  alert: 'warning',
  error: 'fail',
  info: 'help',
  question: 'help',
  // Geometry / shapes
  circle: 'round',
  square: 'box',
  // Devices
  desktop: 'computer',
  laptop: 'computer',
  mobile: 'phone',
  phone: 'mobile',
  // Maps
  pin: 'location',
  location: 'pin',
  navigation: 'compass',
  compass: 'navigation',
  // Indicators
  loader: 'spinner',
  spinner: 'loader',
  // Tools
  wrench: 'tool',
  scissors: 'cut',
  // Data
  chart: 'graph',
  graph: 'chart',
  analytics: 'data',
  // Time
  clock: 'time',
  calendar: 'date',
  // Direction (only when the alt is a real search term, not just a
  // synonym — most direction icons benefit more from semantic context
  // like "navigation" than from spatial synonyms like "below")
  arrow: 'direction',
  // Misc
  cross: 'close',
  close: 'cancel',
  cancel: 'close',
  x: 'close',
  agent: 'ai',
  ai: 'bot',
  bot: 'ai',
  history: 'log',
  log: 'history',
  inbox: 'mail',
};

/** Strip variant suffixes from a PascalCase name. */
function stripSuffix(name) {
  let stripped = name;
  for (const re of VARIANT_SUFFIXES) {
    stripped = stripped.replace(re, '');
  }
  return stripped;
}

/** Split PascalCase into lowercase atoms, dropping stopwords.
 *  `BackToApp` → ["back", "app"]
 *  `ApiKey` → ["api", "key"]
 *  `XCircle` → ["x", "circle"]   (single-letter "x" kept — meaningful as "close")
 *  `AspectRatio` → ["aspect", "ratio"] */
function splitWords(name) {
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .toLowerCase()
    .split(/[\s_]+/)
    .filter((w) => w.length > 0 && !STOPWORDS.has(w));
}

/** Generate the tag list for a single icon name. */
function tagsFor(name) {
  const stripped = stripSuffix(name);
  const atoms = splitWords(stripped);
  const tags = [];
  const seen = new Set();
  const push = (w) => {
    if (!w || seen.has(w)) return;
    seen.add(w);
    tags.push(w);
  };
  // First: the words from the name itself (most signal).
  for (const atom of atoms) push(atom);
  // Second: at most one alternate keyword per atom.
  for (const atom of atoms) {
    if (ALT[atom]) push(ALT[atom]);
    if (tags.length >= MAX_TAGS) break;
  }
  // Drop the lowercase concatenation of the original name — the grid
  // already filters by name, no point duplicating it as a tag.
  const lowerName = name.toLowerCase();
  return tags.filter((t) => t !== lowerName).slice(0, MAX_TAGS);
}

/* ── Main ─────────────────────────────────────────────────── */

const files = await readdir(SVG_DIR);
const names = files
  .filter((f) => f.endsWith('.tsx'))
  .map((f) => f.replace(/\.tsx$/, ''))
  .sort();

const tagsByName = {};
let totalTagged = 0;
let totalTagCount = 0;
for (const name of names) {
  const tags = tagsFor(name);
  if (tags.length > 0) {
    tagsByName[name] = tags;
    totalTagged += 1;
    totalTagCount += tags.length;
  }
}

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(tagsByName, null, 2) + '\n');
console.log(
  `[generate-plex-tags] ${totalTagged}/${names.length} icons tagged ` +
    `(${(totalTagCount / totalTagged).toFixed(1)} avg tags/icon) → ${OUT}`
);
