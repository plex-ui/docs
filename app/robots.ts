import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Tier 1: Critical AI answer engines ──────────────────────────
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'meta-externalagent', allow: '/' },
      { userAgent: 'meta-externalfetcher', allow: '/' },
      { userAgent: 'meta-webindexer', allow: '/' },

      // ── Tier 2: High-value AI crawlers ──────────────────────────────
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
      { userAgent: 'YouBot', allow: '/' },
      { userAgent: 'PhindBot', allow: '/' },
      { userAgent: 'DuckAssistBot', allow: '/' },
      { userAgent: 'Bravebot', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },

      // ── Tier 3: Emerging AI crawlers ────────────────────────────────
      { userAgent: 'MistralAI-User', allow: '/' },
      { userAgent: 'AzureAI-SearchBot', allow: '/' },
      { userAgent: 'Gemini-Deep-Research', allow: '/' },
      { userAgent: 'Google-NotebookLM', allow: '/' },
      { userAgent: 'ExaBot', allow: '/' },
      { userAgent: 'AI2Bot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },

      // ── Block known bad actors ──────────────────────────────────────
      { userAgent: 'Bytespider', disallow: '/' },
      { userAgent: 'PanguBot', disallow: '/' },

      // ── Default: allow all other crawlers ───────────────────────────
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://plexui.com/sitemap.xml',
  };
}
