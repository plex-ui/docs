'use client';

import {
  Children,
  isValidElement,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Tabs } from '@plexui/ui/components/Tabs';

interface IconVariantProps {
  /** Stable identifier used by the parent <IconVariantTabs> for selection. */
  value: string;
  /** Tab label shown to the user. */
  label: string;
  /** MDX/React content rendered when this variant is active. */
  children: ReactNode;
}

/**
 * Marker child for `<IconVariantTabs>`. Doesn't render anything itself —
 * the parent introspects children to find variants and pull out their
 * content + label.
 */
export function IconVariant(_props: IconVariantProps): null {
  return null;
}
IconVariant.displayName = 'IconVariant';

interface IconVariantTabsProps {
  /** Defaults to "Variant" — read aloud to screen readers. */
  ariaLabel?: string;
  /** One or more `<IconVariant>` children. */
  children: ReactNode;
}

/**
 * Tab strip + content swap for "two flavours of the same icon library"
 * pages — e.g. Lucide ships in `Stroke` and `Outlined Stroke` variants.
 *
 * Usage in MDX:
 *
 *   <IconVariantTabs>
 *     <IconVariant value="stroke" label="Stroke">…content…</IconVariant>
 *     <IconVariant value="outlined" label="Outlined Stroke">…content…</IconVariant>
 *   </IconVariantTabs>
 */
export function IconVariantTabs({
  ariaLabel = 'Variant',
  children,
}: IconVariantTabsProps) {
  // MDX wraps everything as React elements but our `<IconVariant>` marker
  // doesn't survive a strict `child.type === IconVariant` check across the
  // server-component boundary. Detect by props shape instead.
  const variants = Children.toArray(children).filter(
    (child): child is ReactElement<IconVariantProps> => {
      if (!isValidElement(child)) return false;
      const props = child.props as Partial<IconVariantProps>;
      return typeof props.value === 'string' && typeof props.label === 'string';
    }
  );

  const [value, setValue] = useState(variants[0]?.props.value ?? '');

  if (variants.length === 0) return null;

  const active = variants.find((v) => v.props.value === value) ?? variants[0];

  return (
    <div className="my-6">
      <div className="not-prose mb-6">
        <Tabs<string>
          value={value}
          onChange={setValue}
          aria-label={ariaLabel}
          variant="segmented"
          size="sm"
        >
          {variants.map((v) => (
            <Tabs.Tab key={v.props.value} value={v.props.value}>
              {v.props.label}
            </Tabs.Tab>
          ))}
        </Tabs>
      </div>
      <div>{active.props.children}</div>
    </div>
  );
}
