import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const MANIFEST_PATH = join(ROOT, "packages/mcp/src/data/manifest.json");
const OUTPUT_PATH = join(ROOT, "public/llms.txt");

const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));

function formatProp(p) {
  const parts = [`  - ${p.name}`];
  if (p.type) parts.push(`(${p.type})`);
  if (p.default) parts.push(`default: ${p.default}`);
  if (p.description) parts.push(`— ${p.description}`);
  return parts.join(" ");
}

const lines = [];

lines.push("# PlexUI");
lines.push(`> ${manifest.description}`);
lines.push("");
lines.push(`Install: ${manifest.install}`);
lines.push(`Docs: ${manifest.homepage}`);
lines.push(`Components: ${manifest.componentCount}`);
lines.push("");
lines.push("## Setup");
lines.push("");
lines.push("```css");
lines.push(manifest.setup.css);
lines.push("```");
lines.push("");
lines.push(manifest.setup.provider);
lines.push("");
lines.push(`Size scale: ${manifest.sizeScale.join(", ")}`);
lines.push(`Colors: ${manifest.colors.join(", ")}`);
lines.push(`Variants: ${manifest.variants.join(", ")}`);
lines.push("");
lines.push("---");
lines.push("");

for (const comp of manifest.components) {
  lines.push(`## ${comp.name}`);
  lines.push(comp.description);
  if (comp.importPath) {
    const names = comp.exports ? comp.exports.join(", ") : comp.name;
    lines.push(`Import: import { ${names} } from "${comp.importPath}"`);
  }
  lines.push(`Docs: ${comp.docsUrl}`);

  if (comp.props && comp.props.length > 0) {
    lines.push("Props:");
    for (const p of comp.props) {
      lines.push(formatProp(p));
    }
  }

  if (comp.subComponents && comp.subComponents.length > 0) {
    for (const sub of comp.subComponents) {
      lines.push(`  ${sub.name}:`);
      for (const p of sub.props) {
        lines.push(`  ${formatProp(p)}`);
      }
    }
  }

  if (comp.examples && comp.examples.length > 0) {
    lines.push(`Examples: ${comp.examples.map((e) => e.name).join(", ")}`);
  }

  lines.push("");
}

writeFileSync(OUTPUT_PATH, lines.join("\n"));
console.error(
  `llms.txt written to public/llms.txt (${(Buffer.byteLength(lines.join("\n")) / 1024).toFixed(1)}KB)`
);
