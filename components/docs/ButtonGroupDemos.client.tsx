'use client';

import dynamic from 'next/dynamic';

/**
 * Client-side dynamic re-exports so `content/components/button-group.mdx`
 * can keep its clean `import { ... } from '@/components/docs/ButtonGroupDemos.client'`
 * shape while skipping SSR for every demo subtree.
 *
 * Why — demos stack a Radix SegmentedControl (the size toggle) ahead of a
 * Plex Input in the same tree, and React 19's useId counter drifts between
 * the server renderer (no useLayoutEffect, different Radix hydration)
 * and the client. Result: Input's 1Password-prevention id comes out
 * different on each side and Next.js flags a hydration mismatch.
 *
 * `dynamic(..., { ssr: false })` is the documented fix and is already what
 * `app/(home)/_components/SizingSection.tsx` uses for the same class of
 * problem on the landing page.
 */

const load = <K extends string>(name: K) =>
  dynamic(() => import('./ButtonGroupDemos').then((m) => ({ default: m[name as keyof typeof m] })), {
    ssr: false,
  });

export const ButtonGroupOverviewDemo = load('ButtonGroupOverviewDemo');
export const ButtonGroupOrientationDemo = load('ButtonGroupOrientationDemo');
export const ButtonGroupSizeDemo = load('ButtonGroupSizeDemo');
export const ButtonGroupNestedDemo = load('ButtonGroupNestedDemo');
export const ButtonGroupSeparatorDemo = load('ButtonGroupSeparatorDemo');
export const ButtonGroupSplitDemo = load('ButtonGroupSplitDemo');
export const ButtonGroupInputDemo = load('ButtonGroupInputDemo');
export const ButtonGroupInputGroupDemo = load('ButtonGroupInputGroupDemo');
export const ButtonGroupDropdownMenuDemo = load('ButtonGroupDropdownMenuDemo');
export const ButtonGroupSelectDemo = load('ButtonGroupSelectDemo');
export const ButtonGroupPopoverDemo = load('ButtonGroupPopoverDemo');
