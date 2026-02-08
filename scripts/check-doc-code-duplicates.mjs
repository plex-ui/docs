import fs from 'node:fs';
import path from 'node:path';

const docsDir = path.join(process.cwd(), 'content', 'docs');
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(absolute);
      continue;
    }

    if (entry.isFile() && absolute.endsWith('.mdx')) {
      files.push(absolute);
    }
  }
}

walk(docsDir);

const duplicatePattern =
  /<\/ComponentPreview>([\t \r]*\n)+[\t \r]*<ComponentSource\b/g;
const findings = [];

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  let match;

  while ((match = duplicatePattern.exec(source)) !== null) {
    const prefix = source.slice(0, match.index);
    const line = prefix.split('\n').length;
    findings.push({
      file: path.relative(process.cwd(), file),
      line,
    });
  }
}

if (findings.length > 0) {
  console.error(
    'Found ComponentSource blocks directly after ComponentPreview. Keep a single code representation per example.'
  );
  for (const finding of findings) {
    console.error(`- ${finding.file}:${finding.line}`);
  }
  process.exit(1);
}

console.log(`OK: checked ${files.length} MDX files`);
