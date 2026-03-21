import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import manifest from "./data/manifest.json" with { type: "json" };


interface Prop {
  name: string;
  type?: string;
  default?: string;
  description?: string;
}

interface Example {
  name: string;
  code: string;
  details?: string;
}

interface SubComponent {
  name: string;
  description?: string;
  props: Prop[];
}

interface Hook {
  name: string;
  description: string;
  properties?: { name: string; description: string }[];
}

interface Component {
  slug: string;
  name: string;
  description: string;
  importPath?: string;
  exports?: string[];
  props?: Prop[];
  examples?: Example[];
  subComponents?: SubComponent[];
  hooks?: Hook[];
  docsUrl: string;
}

const components = manifest.components as Component[];


function formatProps(props: Prop[]): string {
  if (props.length === 0) return "No props documented.";
  return props
    .map((p) => {
      const parts = [`- \`${p.name}\``];
      if (p.type) parts.push(`(${p.type})`);
      if (p.default) parts.push(`default: ${p.default}`);
      if (p.description) parts.push(`— ${p.description}`);
      return parts.join(" ");
    })
    .join("\n");
}

function formatComponent(comp: Component, options?: { brief?: boolean }): string {
  const lines: string[] = [];

  lines.push(`# ${comp.name}`);
  lines.push("");
  lines.push(comp.description);
  lines.push("");

  if (comp.importPath) {
    lines.push("## Import");
    lines.push("");
    lines.push("```tsx");
    const names = comp.exports?.join(", ") || comp.name;
    lines.push(`import { ${names} } from "${comp.importPath}";`);
    lines.push("```");
    lines.push("");
  }

  if (comp.props && comp.props.length > 0) {
    lines.push("## Props");
    lines.push("");
    lines.push(formatProps(comp.props));
    lines.push("");
  }

  if (comp.subComponents && comp.subComponents.length > 0) {
    lines.push("## Sub-Components");
    lines.push("");
    for (const sub of comp.subComponents) {
      lines.push(`### ${sub.name}`);
      if (sub.description) lines.push(sub.description);
      lines.push("");
      lines.push(formatProps(sub.props));
      lines.push("");
    }
  }

  if (comp.hooks && comp.hooks.length > 0) {
    lines.push("## Hooks");
    lines.push("");
    for (const hook of comp.hooks) {
      lines.push(`### ${hook.name}`);
      lines.push(hook.description);
      if (hook.properties) {
        lines.push("");
        for (const prop of hook.properties) {
          lines.push(`- \`${prop.name}\` — ${prop.description}`);
        }
      }
      lines.push("");
    }
  }

  if (!options?.brief && comp.examples && comp.examples.length > 0) {
    lines.push("## Examples");
    lines.push("");
    for (const ex of comp.examples) {
      lines.push(`### ${ex.name}`);
      if (ex.details) {
        lines.push(ex.details);
      }
      lines.push("");
      lines.push("```tsx");
      lines.push(ex.code);
      lines.push("```");
      lines.push("");
    }
  }

  lines.push(`Docs: ${comp.docsUrl}`);

  return lines.join("\n");
}

function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  return t.includes(q);
}


const server = new McpServer({
  name: "plexui",
  version: manifest.version || "1.0.0",
});

server.tool(
  "list_components",
  "List all available PlexUI components with their descriptions and import paths",
  {},
  async () => {
    const list = components
      .map((c) => {
        const parts = [`- **${c.name}** — ${c.description}`];
        if (c.importPath) parts.push(`  Import: \`${c.importPath}\``);
        const propCount = c.props?.length || 0;
        const exampleCount = c.examples?.length || 0;
        parts.push(`  ${propCount} props, ${exampleCount} examples`);
        return parts.join("\n");
      })
      .join("\n\n");

    const text = [
      `# PlexUI Components (${components.length})`,
      "",
      manifest.description,
      "",
      `Install: \`${manifest.install}\``,
      `Docs: ${manifest.docsUrl}`,
      "",
      list,
    ].join("\n");

    return { content: [{ type: "text" as const, text }] };
  }
);

server.tool(
  "get_component",
  "Get detailed documentation for a PlexUI component including props, examples, and usage",
  { name: z.string().describe("Component name (e.g. 'Button', 'Select', 'Sidebar')") },
  async ({ name }: { name: string }) => {
    const query = name.toLowerCase().replace(/[-_ ]/g, "");
    const comp = components.find(
      (c) =>
        c.name.toLowerCase().replace(/[-_ ]/g, "") === query ||
        c.slug.replace(/-/g, "") === query
    );

    if (!comp) {
      const suggestions = components
        .filter((c) => fuzzyMatch(name, c.name) || fuzzyMatch(name, c.description))
        .slice(0, 5);

      let text = `Component "${name}" not found.`;
      if (suggestions.length > 0) {
        text += `\n\nDid you mean:\n${suggestions.map((s) => `- ${s.name}`).join("\n")}`;
      }
      return { content: [{ type: "text" as const, text }], isError: true };
    }

    return { content: [{ type: "text" as const, text: formatComponent(comp) }] };
  }
);

server.tool(
  "search_components",
  "Search PlexUI components by name, description, or functionality",
  {
    query: z.string().describe("Search query (e.g. 'dropdown', 'form input', 'navigation')"),
    limit: z.number().optional().default(10).describe("Max results to return"),
  },
  async ({ query, limit }: { query: string; limit: number }) => {
    const matches = components.filter(
      (c) =>
        fuzzyMatch(query, c.name) ||
        fuzzyMatch(query, c.description) ||
        fuzzyMatch(query, c.slug) ||
        (c.exports && c.exports.some((e) => fuzzyMatch(query, e))) ||
        (c.props && c.props.some((p) => fuzzyMatch(query, p.name)))
    );

    if (matches.length === 0) {
      return {
        content: [
          {
            type: "text" as const,
            text: `No components found matching "${query}". Use list_components to see all available components.`,
          },
        ],
      };
    }

    const results = matches.slice(0, limit);
    const text = results.map((c) => formatComponent(c, { brief: true })).join("\n\n---\n\n");

    return {
      content: [
        {
          type: "text" as const,
          text: `Found ${matches.length} component${matches.length === 1 ? "" : "s"} matching "${query}":\n\n${text}`,
        },
      ],
    };
  }
);

server.tool(
  "get_setup_guide",
  "Get the PlexUI installation and setup guide",
  {},
  async () => {
    const text = `# PlexUI Setup Guide

## Installation

\`\`\`bash
${manifest.install}
\`\`\`

## CSS Setup

Add to your global stylesheet (e.g. \`app/globals.css\`):

\`\`\`css
${manifest.setup.css}
\`\`\`

## Provider

${manifest.setup.provider}

\`\`\`tsx
import { PlexUIProvider } from "@plexui/ui/components/PlexUIProvider";

export default function RootLayout({ children }) {
  return (
    <PlexUIProvider>
      {children}
    </PlexUIProvider>
  );
}
\`\`\`

## Design System

- **Size scale**: ${manifest.sizeScale.join(", ")} (unified across Button, Input, Select, etc.)
- **Colors**: ${manifest.colors.join(", ")}
- **Variants**: ${manifest.variants.join(", ")}
- **${manifest.componentCount} components** available

## Quick Example

\`\`\`tsx
import { Button } from "@plexui/ui/components/Button";
import { Input } from "@plexui/ui/components/Input";
import { Select } from "@plexui/ui/components/Select";

export function MyForm() {
  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="Email" size="md" />
      <Select options={[...]} placeholder="Role..." />
      <Button color="primary" size="md">Submit</Button>
    </div>
  );
}
\`\`\`

Docs: ${manifest.homepage}
`;

    return { content: [{ type: "text" as const, text }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("PlexUI MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
