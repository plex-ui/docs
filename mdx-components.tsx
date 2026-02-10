import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Accordions, Accordion } from 'fumadocs-ui/components/accordion';
import { Callout } from 'fumadocs-ui/components/callout';
import type { MDXComponents } from 'mdx/types';
import { Colors } from '@/components/docs/Colors';
import { ComponentCard } from '@/components/docs/ComponentCard';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { ComponentSource } from '@/components/docs/ComponentSource';
import { DesignTokens } from '@/components/docs/DesignTokens';
import { IconGallery } from '@/components/docs/IconGallery';
import { PropsTable } from '@/components/docs/PropsTable';
import { UsageBlock } from '@/components/docs/UsageBlock';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Accordions,
    Accordion,
    Callout,
    DesignTokens,
    Colors,
    IconGallery,
    ComponentCard,
    ComponentPreview,
    ComponentSource,
    PropsTable,
    UsageBlock,
    ...components,
  };
}
