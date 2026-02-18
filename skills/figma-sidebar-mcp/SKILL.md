# Sidebar Figma MCP Skill

Use this skill when creating or editing Sidebar UI kit bricks in Figma via the local MCP Bridge (`http://localhost:8767`).

## Preflight

1. Check bridge and plugin connection: `GET /status`.
2. Work on Sidebar page: `6610:356461`.
3. Use `params` (never `args`) in every command.

## Build Order

1. `.internal` section (`6610:356707`)
2. `Components` section (`6610:356704`)
3. `examples` section (`6610:356706`)
4. Preview slot wiring in preview section (`6610:356462`)

## Non-Negotiable Rules

1. Instance-first: if a shared component exists, use `create-instance` / `swap-instance`.
2. No custom badge/input primitives in Sidebar bricks.
3. Component-set containers must have:
   - border stroke `#8A38F5` (1px)
   - internal canvas padding/spacing like existing system sets (typically 40px inset + 40px spacing)
4. `sidebar-search` is a single COMPONENT (not a state variant set).
   - state control is exposed from nested Input instance properties.

## Required Reuse IDs

- Badge component set: `6357:103199`
  - Recommended instance variant for sidebar end: `6359:140480`
- Input component set: `6133:116643`
  - Recommended `sidebar-search` base: `6138:118843` (default)
  - Focus variant (when needed via exposed nested property): `6138:118915`

## Sidebar Nodes (Current Baseline)

- `.sidebar-start`: `6610:393839`
- `.sidebar-end`: `6610:393854`
- `sidebar-menu-item`: `6610:393959`
- `sidebar-group-label`: `6610:393996`
- `sidebar-separator`: `6610:394008`
- `sidebar-sub-item`: `6610:394016`
- `sidebar-menu-skeleton`: `6610:394044`
- `sidebar-card`: `6610:394051`
- `sidebar-search` (single component): `6610:393997`
- `sidebar overview` (examples): `6610:394278`
- `sidebar skeleton` (examples): `6610:396845`
- `sidebar search` (examples): `6610:510053` (recovered set ID)

## Example Fidelity Rules

1. Do not add `size=sm/md` variant axes to Sidebar examples unless docs explicitly require it.
   - keep one canonical `default` variant per example set.
2. Never leave the default `globe` icon everywhere; assign contextual icons through nested icon instance swap.
3. Icons source frame: `6194:37372` (Icons page `2100:26850`).
   - `home` `6131:11611`, `folder` `6131:11580`, `file-document` `6131:11824`, `analytics` `6131:11989`
   - `members` `6131:11902`, `settings-cog` `6131:11968`, `code` `6131:11778`, `terminal` `6131:11446`, `credit-card` `6131:11741`
4. `sidebar text-only` and `sidebar search` examples are text mode:
   - hide `start` and `end` nested item slots (no icons/chevrons)
5. `sidebar overview`:
   - badge only on `Projects` (`New`)
   - no end chevrons on other rows
6. Group label spacing:
   - use compact label instances with correct vertical density in examples:
     - sm: `6610:177294`
     - lg: `6610:177295`
7. Keep real group gaps in examples (do not flatten all rows):
   - sm group transition gap ~12px before next heading (e.g. `System`)
   - lg text-only style: first heading starts with ~8px top inset, next heading starts after ~24px separation
8. If an example set contains a single variant, resize set canvas to one-column bounds:
   - width = child + 80
   - height = child + 80
   - keep child positioned at x=40, y=40
9. `sidebar skeleton` example fidelity:
   - use exactly 4 skeleton rows
   - label widths should follow docs rhythm: 70%, 55%, 80%, 45%
10. `sidebar skeleton` and `sidebar search` must be full layout examples:
   - include left sidebar and right inset content panel (not sidebar-only crop)
   - baseline content sizes: skeleton `640x300`, search `640x600`
   - sidebar widths must match docs demos:
     - skeleton: `210px` (default)
     - search: `220px` (`variant=\"docs\"` override)
   - hard width/height checks:
     - search left content width: `196px` (`220 - 12 - 12`)
       - input: `196x36`
       - text rows: `196x36` (if you see `320x32`, layout is broken)
     - skeleton left content width: `186px` (`210 - 12 - 12`)
       - each skeleton row: `186x38` (if you see `210x28`, layout is broken)
       - label widths: `70%`, `55%`, `80%`, `45%`
11. Do not delete reviewed Sidebar sets/components to recreate them from zero.
   - Prefer in-place repair to preserve node IDs and links.
   - If recreation is unavoidable, immediately record the new node ID in `AGENTS.md` and this skill.
12. Variant names in COMPONENT_SET must be `Prop=Value`.
   - For one-state Sidebar examples, name the child component `state=default` (do not use plain `default`), so Figma does not mark variants as invalid.

## Sidebar-TEMP Reuse

When creating missing sidebar bricks, check `Sidebar-TEMP (OPEN CODE)` page (`6568:185519`) first and clone existing brick sets before rebuilding from scratch.

## Validation Checklist

1. `get-bound-variables` confirms spacing/color/typography/border bindings.
2. `badge` and `input` inside sidebar components are `INSTANCE` nodes.
3. No clipped component-set canvas (check set width/height vs widest/tallest variant).
4. Variant naming follows `axis=value` convention.
