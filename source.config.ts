import {
  defineDocs,
  defineConfig,
  defineCollections,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import lastModified from 'fumadocs-mdx/plugins/last-modified';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
});

/** Components live at top-level URLs (/components/*) instead of
 *  /components/* — peer of Bridge / Blog in the top nav. The
 *  separate fumadocs source means each MDX file's URL is derived
 *  from `content/components/<slug>.mdx` → `/components/<slug>`. */
export const components = defineDocs({
  dir: 'content/components',
});

/** Same pattern for the Icons section. */
export const icons = defineDocs({
  dir: 'content/icons',
});

export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: frontmatterSchema.extend({
    author: z.string().default('Sergey'),
    date: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.date()]),
  }),
});

export default defineConfig({
  plugins: [lastModified()],
});
