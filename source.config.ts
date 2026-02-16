import {
  defineDocs,
  defineConfig,
  defineCollections,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
});

export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: frontmatterSchema.extend({
    author: z.string().default('Sergey'),
    date: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.date()]),
  }),
});

export default defineConfig();
