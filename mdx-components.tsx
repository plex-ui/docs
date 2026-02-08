import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Accordions, Accordion } from 'fumadocs-ui/components/accordion';
import type { MDXComponents } from 'mdx/types';
import { Colors } from '@/components/docs/Colors';
import { ComponentCard } from '@/components/docs/ComponentCard';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { ComponentSource } from '@/components/docs/ComponentSource';
import { DesignTokens } from '@/components/docs/DesignTokens';
import { IconGallery } from '@/components/docs/IconGallery';
import { PropsTable } from '@/components/docs/PropsTable';
import { UsageBlock } from '@/components/docs/UsageBlock';

function H2(props: React.ComponentProps<'h2'>) {
  const isSection = props.children === 'Examples' || props.children === 'Reference';
  return (
    <h2
      {...props}
      style={
        isSection
          ? { marginTop: '3rem', marginBottom: '2rem', ...(props.style as object) }
          : props.style
      }
    />
  );
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    h2: H2,
    Accordions,
    Accordion,
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
