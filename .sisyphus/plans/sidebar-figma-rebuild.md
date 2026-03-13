# Sidebar Figma Page — Complete Rebuild to Pixel-Perfect Parity

## TL;DR

> **Quick Summary**: Fix and complete ALL components and examples on the Sidebar Figma page (6568:185519) to achieve pixel-perfect parity with the live site at `http://localhost:3000/docs/components/sidebar`. Also update AGENTS.md with discovered patterns.
> 
> **Deliverables**:
> - 3 fixed .internal COMPONENT_SETs + new .sidebar-badge internal component
> - 8 fixed/completed main Components (sidebar-menu-item, group-label, separator, card, sub-item, search, skeleton, + new sidebar-menu-sub-button with chevron)
> - 11 example COMPONENT_SETs matching React demos exactly (sm/md variants each)
> - Preview section with light/dark panels for all 11 examples
> - Updated AGENTS.md with FRAME vs RECTANGLE pattern + sidebar architecture
> 
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Task 0 (prereqs) → Task 1-3 (.internal) → Task 4-9 (Components) → Task 10-20 (Examples) → Task 21 (Preview) → Task 22 (AGENTS.md)

---

## Context

### Original Request
User wants the entire Sidebar page in Figma rebuilt/fixed to match the live React implementation at `http://localhost:3000/docs/components/sidebar` with pixel-perfect accuracy. All colors, states, sizes, variables, and variants must match. All 11 demo examples must be represented. AGENTS.md must be updated with discovered patterns.

### Interview Summary
**Key Discussions**:
- Bottom-up build order: `.internal` → Components → Examples → Preview
- All properties must be bound to Figma variables (no hardcoded values)
- Icons ONLY from Icons page (node 2100:26850), must be DIFFERENT per menu item
- Component set variants must NOT be stacked (laid out with spacing)
- Background layers must be FRAME type, not RECTANGLE (empirical discovery)
- Follow Menu reference page patterns as gold standard
- Group labels use `size=sm` and `size=lg` (NOT `size=md`)

**Research Findings**:
- Menu reference audit: Complete gold-standard pattern with all variable bindings documented
- React demo extraction: All 11 demos fully documented with exact props, text, icons, states
- Current Figma audit: Structure is 95% complete but content/accuracy mismatches throughout
- The `sidebar-rebuild.ts` file exists but is NOT the implementation mechanism — work is done via Bridge HTTP API at `http://localhost:8767`
- Badges in React use actual `<Badge>` component with color variants (`info`, `warning`, `discovery`, `danger`, `caution`), not simple count pills

### Metis Review
**Identified Gaps** (addressed in this plan):
- sidebar-group-label variant naming: Must be `size=sm/size=lg` not `size=sm/size=md` — **fixed in Task 5**
- Missing depth=3 for sidebar-sub-item — **added in Task 7**
- Badge implementation wrong (count pill vs colored Badge component) — **fixed via new .sidebar-badge in Task 3 and end adornment update in Task 2**
- 6 missing icon IDs for React demos (Code, Terminal, Storage, Globe, ApiKeys, CreditCard) — **resolved in Task 0**
- Mobile example has 3 boolean controls (8 combinations) — **scoped to default mobile state in Task 18**
- Nested example has 2 modes (docs text-only / icons with parents) — **both modes represented in Task 17**
- Footer Card missing Button + dismiss icon — **addressed in Task 8**

---

## Work Objectives

### Core Objective
Achieve pixel-perfect match between the Sidebar Figma page and the live site's 11 sidebar demo examples, with every property bound to design token variables.

### Concrete Deliverables
- Fixed `.internal` section: `.sidebar-start`, `.sidebar-start-active`, `.sidebar-end`, new `.sidebar-badge`
- Fixed Components section: `sidebar-menu-item`, `sidebar-group-label` (sm/lg), `sidebar-separator`, `sidebar-card`, `sidebar-sub-item` (depth 0-3), `sidebar-search`, `sidebar-menu-skeleton`, new `sidebar-menu-sub-button`
- 11 example COMPONENT_SETs each with size=sm/md variants
- Preview section with light/dark panels per AGENTS.md template
- Updated AGENTS.md

### Definition of Done
- [ ] All 11 examples in Figma visually match live site screenshots
- [ ] Every text node has 6 variable bindings (fontSize, lineHeight, fontFamily, fontStyle, letterSpacing, fills)
- [ ] Every spacing/padding/radius uses variable binding
- [ ] Every color uses semantic token variable
- [ ] All backgrounds use FRAME type (not RECTANGLE)
- [ ] Variants are laid out with spacing (not stacked)
- [ ] Icons match React demo assignments exactly

### Must Have
- All 11 demo examples with exact text/icon/badge content from SidebarDemos.tsx
- sm/md size variants for every example
- All 4 states for sidebar-menu-item (default, hover, active, disabled)
- All 3 states for sidebar-sub-item (default, hover, active)
- depth 0-3 for sidebar-sub-item
- Badge component instances (not count pills) for Badges example
- Skeleton loading state
- Search input component
- SidebarCard with title, description, CTA button, dismiss button
- Light/dark preview panels

### Must NOT Have (Guardrails)
- NO hardcoded color/size/typography values — everything bound to variables
- NO RECTANGLE backgrounds — FRAME type only for absolute-positioned backgrounds
- NO stacked variants in component sets — layout with spacing
- NO icons invented by the agent — match React exactly or leave a placeholder with a TODO comment
- NO modifications to pages other than Sidebar (6568:185519)
- NO creation of new Figma variables — only use existing ones from AGENTS.md reference
- NO modifications to shared components on other pages (Icons, Badge, etc.)
- NO additional examples beyond the 11 documented
- NO depth > 3 for sub-items (React casts as `0 | 1 | 2 | 3`)

---

## Verification Strategy (MANDATORY)

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
>
> ALL tasks are verified by the agent using Bridge API commands + Playwright screenshots.
> No human action permitted.

### Test Decision
- **Infrastructure exists**: NO (Figma design — no unit tests)
- **Automated tests**: None (visual verification via Bridge API + export)
- **Framework**: N/A

### Agent-Executed QA Scenarios (MANDATORY — ALL tasks)

**Verification Tool by Deliverable Type:**

| Type | Tool | How Agent Verifies |
|------|------|-------------------|
| **Figma component** | Bash (curl to Bridge API) | `get-node-props`, `get-bound-variables`, `find-children`, `export-node` |
| **Visual match** | Playwright (playwright skill) | Screenshot live site, compare with Figma export |
| **Variable bindings** | Bash (curl to Bridge API) | `get-bound-variables` returns expected variable IDs |

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
├── Task 0: Prerequisites — resolve icon IDs, verify Bridge, validate Badge component
└── (blocks everything)

Wave 2 (After Wave 1):
├── Task 1: Fix .sidebar-start + .sidebar-start-active
├── Task 2: Fix .sidebar-end (add badge-colored support)
├── Task 3: Create .sidebar-badge internal component
└── (all independent of each other)

Wave 3 (After Wave 2):
├── Task 4: Fix sidebar-menu-item
├── Task 5: Fix sidebar-group-label (sm/lg)
├── Task 6: Fix sidebar-separator
├── Task 7: Fix sidebar-sub-item (add depth 0 and 3)
├── Task 8: Fix sidebar-card (add button + dismiss)
├── Task 9: Fix sidebar-search
├── Task 9b: Fix sidebar-menu-skeleton
└── (most are independent, 4 depends on 1-3)

Wave 4 (After Wave 3):
├── Task 10: Example — sidebar overview
├── Task 11: Example — sidebar scrollable
├── Task 12: Example — sidebar text-only
├── Task 13: Example — sidebar collapse-icon
├── Task 14: Example — sidebar nested (docs mode)
├── Task 15: Example — sidebar nested (icons mode) — part of same component set as 14
├── Task 16: Example — sidebar search
├── Task 17: Example — sidebar skeleton
├── Task 18: Example — sidebar mobile
├── Task 19: Example — sidebar group-sizes
├── Task 20: Example — sidebar badges
├── Task 20b: Example — sidebar footer-card
└── (each independent, all depend on Wave 3 components)

Wave 5 (After Wave 4):
├── Task 21: Preview section — light/dark panels for all examples
└── Task 22: AGENTS.md update
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 0 | None | ALL | None |
| 1 | 0 | 4, 10-20 | 2, 3 |
| 2 | 0 | 4, 10-20 | 1, 3 |
| 3 | 0 | 20 (badges example) | 1, 2 |
| 4 | 1, 2 | 10-20 | 5-9 |
| 5 | 0 | 10-20 | 4, 6-9 |
| 6 | 0 | 10-20 | 4, 5, 7-9 |
| 7 | 0 | 14-15, 18 | 4-6, 8-9 |
| 8 | 0 | 20b | 4-7, 9 |
| 9 | 0 | 16 | 4-8 |
| 10-20b | 4-9 | 21 | each other |
| 21 | 10-20b | 22 | None |
| 22 | None | None | 21 |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Agents |
|------|-------|-------------------|
| 1 | 0 | task(category="deep", load_skills=["dev-browser"], run_in_background=false) |
| 2 | 1, 2, 3 | task(category="deep", load_skills=[], run_in_background=true) × 3 |
| 3 | 4-9b | task(category="deep", load_skills=[], run_in_background=true) × 7 |
| 4 | 10-20b | task(category="deep", load_skills=["playwright"], run_in_background=true) × 12 |
| 5 | 21, 22 | task(category="unspecified-high", load_skills=["playwright"], run_in_background=false) |

---

## Shared Reference Data (for ALL tasks)

### Bridge API
```
Base URL: http://localhost:8767
POST /command — {"command":"NAME","params":{...}}
POST /batch — [{"command":"NAME","params":{...}}, ...]
GET /status — verify bridge is running
```

### Figma File
- **File ID**: NjWXNCiJeb6mfICN1IN7OR
- **Page**: Sidebar (6568:185519)
- **Sections**: Preview (6568:963474), Components (6568:963716), Examples (6568:963718), .internal (6568:963719)

### Icon Component IDs (from Icons page 2100:26850)
> These MUST be resolved in Task 0. Placeholder IDs shown here — replace with actual IDs found.
```
Home         → 6131:11611
Folder       → 6131:11580
FileDocument → 6131:11824
Analytics    → 6131:11833
Members      → 6131:11430
SettingsCog  → 6131:11968
Code         → 6131:11778
Terminal     → 6131:11446
Storage      → 6131:11772
Globe        → 6131:11632
ApiKeys      → 6131:12035
CreditCard   → 6131:11741
Search       → 6131:12024
ChevronDown  → 6131:11941
ChevronRight → 6131:11788
Plus         → 6131:11543
```

### Variable IDs (from AGENTS.md — verified)
```
COLORS:
  text/primary:                   VariableID:6037:164055
  text/secondary:                 VariableID:6037:164056
  text/tertiary:                  VariableID:6037:164057
  text/disabled:                  VariableID:6037:164065
  text/danger:                    VariableID:6037:164061
  surface:                        VariableID:6037:163865
  surface/secondary:              VariableID:6037:163866
  surface/tertiary:               VariableID:6037:163867
  ui/menu/item/background:        VariableID:6037:164137
  ui/menu/separator/background:   VariableID:6182:278380
  background/primary/ghost/hover: VariableID:6037:163968
  background/primary/ghost/active:  VariableID:6037:163976
  background/primary/ghost/selected: VariableID:6156:13296
  border:                         VariableID:6037:163984

SIZING:
  spacing/xs:           VariableID:6037:229946 (4px)
  spacing/sm:           VariableID:6037:229947 (6px)
  spacing/md:           VariableID:6037:229948 (8px)
  spacing/lg:           VariableID:6037:229949 (12px)
  spacing/xl:           VariableID:6037:229950 (16px)
  control/size/sm:      VariableID:6037:229964 (28px)
  control/size/md:      VariableID:6037:229965 (32px)
  control/size/lg:      VariableID:6037:229966 (36px)
  control/icon-size/sm: VariableID:6225:14677 (16px)
  control/icon-size/md: VariableID:6225:14678 (18px)
  control/icon-size/lg: VariableID:6225:14679 (20px)
  radius/sm:            VariableID:6037:229936 (6px)
  radius/md:            VariableID:6037:229937 (8px)
  radius/lg:            VariableID:6037:229938 (10px)
  radius/xl:            VariableID:6037:229939 (12px)
  radius/2xl:           VariableID:6037:229940
  menu/gutter:          VariableID:6177:14781 (6px)
  menu/item/gap:        VariableID:6177:14785 (6px)
  menu/item/radius:     VariableID:6177:14786 (6px)
  menu/item/padding/top-bottom: VariableID:6177:14783 (6px)
  menu/item/padding/left-right: VariableID:6177:14784 (8px)
  menu/separator/padding/top-bottom: VariableID:6177:14790 (6px)
  menu/slot-height:     VariableID:6181:278245 (20px)
  menu/icon-size/sm:    VariableID:6184:279525
  menu/icon-size/md:    VariableID:6184:279526
  menu/icon-size/lg:    VariableID:6184:279527

TYPOGRAPHY:
  size/text/xs:         VariableID:6003:702 (12px)
  size/text/sm:         VariableID:6003:703 (14px)
  size/text/md:         VariableID:6003:704 (16px)
  line/text/xs:         VariableID:6003:757 (16px)
  line/text/sm:         VariableID:6003:758 (20px)
  line/text/md:         VariableID:6003:759 (24px)
  weight/normal:        VariableID:6003:686
  weight/medium:        VariableID:6003:696
  weight/semibold:      VariableID:6003:690
  weight/bold:          VariableID:6003:688
  family/text:          VariableID:6003:700
  tracking/text/sm-normal: VariableID:6003:833
```

### React Demo Data — Exact Content per Example

**Shared data arrays:**
```
mainNavItems = [
  { icon: Home, label: "Overview" },
  { icon: Folder, label: "Projects", badge: "New" },
  { icon: FileDocument, label: "Assets" },
  { icon: Analytics, label: "Analytics" }
]

systemNavItems = [
  { icon: Members, label: "Team" },
  { icon: SettingsCog, label: "Settings" }
]

resourcesNavItems = [
  { icon: Code, label: "Logs" },
  { icon: Terminal, label: "Console" }
]
```

**Per-example content:**

1. **Overview**: Groups: "Project" (sm label) + "System" (sm label). Items: mainNavItems + systemNavItems. Active: "Overview". Badge "New" on "Projects" (uses `<Badge size="sm" color="info">`). Width: 240px (default). Collapsible: offcanvas. Has SidebarTrigger in footer.

2. **Scrollable**: Groups: "Project" (sm) + "System" (sm) + "Resources" (sm). Items: mainNavItems + systemNavItems + resourcesNavItems. Active: "Overview". Width: 240px. Height constrained to 500px to show scroll.

3. **Text-Only**: Groups: "Settings" (lg) + "Organization" (lg) + "People" (lg). Items: ["Your profile"] + ["General", "API keys", "Admin keys"] + ["People", "Projects", "Billing", "Limits", "Usage"]. NO icons. Active: "General". Width: 180px. Variant: docs. Collapsible: none.

4. **Collapse Modes**: Same as Overview (Project sm + System sm, mainNavItems + systemNavItems). Collapsible: icon. Shows expanded state AND collapsed icon-rail state side by side. Active: "Overview".

5. **Nested (docs mode, icons=false)**: 4 groups: "Getting Started" + "API Reference" + "Guides" + "SDKs & Libraries". Deep nesting up to 4 levels. Variant: docs. Width: 280px. Collapsible: none. NO icons. Uses SidebarMenuSubButton with indent depth. Active: "Introduction". Expanded: "Getting Started".

6. **Nested (icons mode, icons=true)**: Single group (no label). 6 parent items with icons: Dashboard (Home), Content (FileDocument), Users (Members), API (Code), Billing (CreditCard), Settings (SettingsCog). Each with sub-items at indent=1. Width: 280px. Uses SidebarMenuButton (not sub-button) for parents with chevron. Active: "Overview" under Dashboard. Expanded: "Dashboard".

7. **Search**: Groups: "Get started" + "Core concepts" + "Agents". Items: ["Overview", "Quickstart", "Models", "Pricing", "Libraries"] + ["Text generation", "Code generation", "Images and vision", "Structured output"] + ["Overview", "Build agents"]. Has SidebarInput with placeholder "Search" in SidebarHeader. NO icons. Variant: docs. Width: 220px. Collapsible: none. Uses SidebarMenuSubButton at indent=0.

8. **Skeleton**: 4 SidebarMenuSkeleton items with labelWidth: 70%, 55%, 80%, 45%. Width: 240px.

9. **Group Sizes**: Two modes via segmented control:
   - sm mode: Groups "Project" (sm) + "System" (sm). Items: [Overview/Home, Projects/Folder, Analytics/Analytics] + [Team/Members, Settings/SettingsCog]. WITH icons. Width: 200px. Active: "Overview".
   - lg mode: Groups "Getting Started" (lg) + "Components" (lg). Items: ["Introduction", "Installation", "Quick Start"] + ["Button", "Input", "Modal", "Sidebar"]. NO icons. Variant: docs. Width: 220px. Active: "Introduction".

10. **Badges**: Group: "Navigation" (default/lg label, no size prop specified). 8 items with icons:
    - Overview (Home) — no badge, active
    - API Reference (Code) — Badge "New" color=info
    - Playground (Terminal) — Badge "Beta" color=warning
    - Fine-tuning (SettingsCog) — Badge "3" color=info
    - Batch API (Storage) — Badge "Updated" color=discovery
    - Legacy Models (FileDocument) — Badge "Deprecated" color=danger
    - Usage (Analytics) — Badge "12" color=caution
    - Billing (CreditCard) — no badge
    Width: 240px. Collapsible: none. Has pill toggle control.

11. **Footer Cards**: Same nav as Overview (Project sm + System sm, mainNavItems + systemNavItems). Collapsible: icon. Footer contains:
    - SidebarCard (dismissible): title="Upgrade to Pro", content="Unlock higher rate limits, priority support, and advanced features.", footer=Button "View Plans" (size=sm, pill, color=primary)
    - SidebarTrigger

---

## TODOs

---

- [x] 0. Prerequisites — Resolve Icon IDs + Validate Badge Component + Verify Bridge ✅ DONE

  **What to do**:
  - Verify Bridge API is running: `GET http://localhost:8767/status`
  - Search Icons page (2100:26850) for 6 missing icon component IDs:
    - `Code` — search by name "code" in children of Icons page
    - `Terminal` — search by name "terminal"
    - `Storage` — search by name "storage"
    - `Globe` — search by name "globe"
    - `ApiKeys` — search by name "api-key" or "key"
    - `CreditCard` — search by name "credit-card" or "card"
  - Use `find-children` command with depth 2-3 to search the Icons page
  - Search the entire Figma file for a Badge COMPONENT_SET — check if it exists as a published component
  - Verify template components exist: `.title` (6330:78705), `.subtitle` (6151:90929), `.description` (6155:71546)
  - Record ALL found IDs in a temporary reference document at `/tmp/sidebar-icon-ids.json`

  **Must NOT do**:
  - Do NOT modify any existing components
  - Do NOT create any icons — only find existing ones

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: [`dev-browser`]
    - `dev-browser`: For navigating Bridge API endpoints systematically
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed — Bridge API is HTTP, not browser UI

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (Wave 1)
  - **Blocks**: ALL other tasks
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - Bridge API format: `curl -s -X POST http://localhost:8767/command -H "Content-Type: application/json" -d '{"command":"find-children","params":{"nodeId":"2100:26850","depth":3}}'`
  - Known icon IDs already found: Home=6131:11611, SettingsCog=6131:11968, Folder=6131:11580, FileDocument=6131:11824, Analytics=6131:11833, Members=6131:11430, Search=6131:12024

  **Documentation References**:
  - AGENTS.md: Page Node IDs section — Icons page = 2100:26850
  - AGENTS.md: Plugin Bridge Commands section — `find-children`, `get-node-props` usage

  **Acceptance Criteria**:
  - [ ] Bridge API responds to `GET http://localhost:8767/status` with OK
  - [ ] All 6 missing icon component IDs resolved and saved to `/tmp/sidebar-icon-ids.json`
  - [ ] Badge component existence verified (found or confirmed missing)
  - [ ] Template component IDs (6330:78705, 6151:90929, 6155:71546) verified

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Verify Bridge API is operational
    Tool: Bash (curl)
    Preconditions: Bridge server running
    Steps:
      1. curl -s http://localhost:8767/status
      2. Assert: response contains "ok" or "connected" or valid JSON
    Expected Result: Bridge is connected and responsive
    Evidence: Response body captured

  Scenario: All icon IDs resolved
    Tool: Bash (curl)
    Preconditions: Bridge connected
    Steps:
      1. curl -s -X POST http://localhost:8767/command -H "Content-Type: application/json" -d '{"command":"find-children","params":{"nodeId":"2100:26850","depth":2}}'
      2. Parse response for component names matching: code, terminal, storage, globe, key, credit-card
      3. For each match, extract the node ID
      4. Save to /tmp/sidebar-icon-ids.json
    Expected Result: JSON file with all 12 icon IDs (6 known + 6 newly found)
    Evidence: /tmp/sidebar-icon-ids.json file contents
  ```

  **Commit**: NO

---

- [x] 1. Fix .sidebar-start + .sidebar-start-active (.internal) ✅ DONE — all width/fill bindings applied

  **What to do**:
  - Query current state of .sidebar-start (6568:963837) and .sidebar-start-active (6568:963847) via Bridge
  - Verify all 3 variants exist for each: `type=icon lg`, `type=icon md`, `type=icon sm`
  - For each variant, verify:
    - Icon instance has `width` bound to corresponding `menu/icon-size/*` variable
    - Component has `paddingRight` bound to `menu/item/gap` (VariableID:6177:14785)
    - Component has `height` bound to `menu/slot-height` (VariableID:6181:278245)
  - For .sidebar-start-active: icon fill color should be bound to `text/primary` (VariableID:6037:164055)
  - For .sidebar-start (default): icon fill color should be bound to `text/secondary` (VariableID:6037:164056)
  - Fix any missing bindings
  - Ensure variants are laid out horizontally with spacing (NOT stacked)
  - Verify actual icon instances can be swapped (INSTANCE_SWAP support)

  **Must NOT do**:
  - Do NOT change the component set structure if it's already correct
  - Do NOT add new variants beyond icon lg/md/sm

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed for Bridge API work

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 3)
  - **Blocks**: Tasks 4, 10-20
  - **Blocked By**: Task 0

  **References**:

  **Pattern References**:
  - Menu reference `.start` component (6181:278140) — gold standard: 9 variants, icon wrapper with width binding to `menu/icon-size/*`, paddingRight to `menu/item/gap`, height to `menu/slot-height`
  - Current .sidebar-start node: 6568:963837, variants: 6568:963828 (lg), 6568:963829 (md), 6568:963830 (sm)
  - Current .sidebar-start-active node: 6568:963847, variants: 6568:963838 (lg), 6568:963839 (md), 6568:963840 (sm)

  **Variable References**:
  - `menu/icon-size/sm` → VariableID:6184:279525, `menu/icon-size/md` → VariableID:6184:279526, `menu/icon-size/lg` → VariableID:6184:279527
  - `menu/item/gap` → VariableID:6177:14785
  - `menu/slot-height` → VariableID:6181:278245
  - `text/secondary` → VariableID:6037:164056 (default icon color)
  - `text/primary` → VariableID:6037:164055 (active icon color)

  **Acceptance Criteria**:
  - [ ] .sidebar-start has 3 variants: `type=icon lg`, `type=icon md`, `type=icon sm`
  - [ ] .sidebar-start-active has 3 variants: same
  - [ ] All variants have paddingRight, height variable bindings
  - [ ] Icon instances have width binding to correct icon-size variable
  - [ ] Default icon color = text/secondary, active icon color = text/primary

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Verify .sidebar-start bindings
    Tool: Bash (curl)
    Steps:
      1. GET node props for each variant: 6568:963828, 6568:963829, 6568:963830
      2. GET bound variables for each
      3. Assert: paddingRight bound to VariableID:6177:14785
      4. Assert: height bound to VariableID:6181:278245
      5. Find icon child instance, check width binding matches icon-size variant
    Expected Result: All bindings present and correct
    Evidence: Binding maps captured for each variant
  ```

  **Commit**: NO (groups with Task 2, 3)

---

- [x] 2. Fix .sidebar-end (.internal) — Add Badge Support ✅ DONE — chevron/action fills bound to text/tertiary

  **What to do**:
  - Query current state of .sidebar-end (6568:963859) via Bridge
  - Verify 4 existing variants: `type=badge`, `type=notification`, `type=expand-arrow`, `type=action`
  - For the `type=badge` variant: this currently shows a count pill. Determine if Badge component exists in the Figma file (from Task 0 results):
    - **If Badge component exists**: Update the badge variant to use a Badge instance with size=sm. Make the badge color swappable via component properties.
    - **If Badge component does NOT exist**: Create a simplified badge representation: a small rounded pill frame with text and background color. Create sub-variants for each badge color needed: info (blue), warning (amber), discovery (teal), danger (red), caution (orange). Or keep the count pill and use fills directly.
  - For `type=expand-arrow` (chevron): verify icon is chevron-down or chevron-right, color bound to `text/tertiary`
  - For `type=action`: verify icon color bound to `text/tertiary`
  - All variants: `paddingLeft` → `menu/item/gap`, `height` → `menu/slot-height`
  - Ensure variants are NOT stacked

  **Must NOT do**:
  - Do NOT modify the Badge component on other pages
  - Do NOT create completely new internal components for this — add variants to existing .sidebar-end

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 1, 3)
  - **Blocks**: Tasks 4, 10-20
  - **Blocked By**: Task 0

  **References**:

  **Pattern References**:
  - Menu reference `.end` component (6181:278212) — wrapper with icon instance, width binding to submenu trigger icon size
  - Current .sidebar-end: 6568:963859, variants: badge (6568:963848), notification (6568:963849), expand-arrow (6568:963850), action (6568:963851)

  **Variable References**:
  - `menu/item/gap` → VariableID:6177:14785
  - `menu/slot-height` → VariableID:6181:278245
  - `text/tertiary` → VariableID:6037:164057

  **Acceptance Criteria**:
  - [ ] .sidebar-end has all 4 variants with correct bindings
  - [ ] Badge variant supports colored badge display (not just count pill)
  - [ ] Expand-arrow variant has chevron icon with text/tertiary color
  - [ ] All variants have paddingLeft and height bindings

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Verify .sidebar-end badge variant
    Tool: Bash (curl)
    Steps:
      1. GET node props for badge variant 6568:963848
      2. Assert: contains text or badge instance
      3. GET bound variables
      4. Assert: paddingLeft bound to VariableID:6177:14785
      5. Assert: height bound to VariableID:6181:278245
    Expected Result: Badge variant properly structured
    Evidence: Node props and bindings captured
  ```

  **Commit**: NO (groups with Task 1, 3)

---

- [x] 3. Create .sidebar-badge Internal Component ✅ DONE — 5 color variants created (6578:1431669)

  **What to do**:
  - **CONDITIONAL**: Only create if Task 0 confirms a Badge COMPONENT_SET exists in the Figma file
  - If Badge component exists: Create `.sidebar-badge` as a new COMPONENT_SET in .internal section (6568:963719)
  - Variants: one per badge color used in React demos:
    - `color=info` (blue — for "New", "3")
    - `color=warning` (amber — for "Beta")
    - `color=discovery` (teal — for "Updated")
    - `color=danger` (red — for "Deprecated")
    - `color=caution` (orange — for "12")
  - Each variant: Create instance of Badge component with size=sm, set color property
  - If Badge component does NOT exist: Create a simplified `.sidebar-badge` with manual pill styling:
    - Frame with auto-layout horizontal, paddingH=6px, paddingV=2px, radius=full
    - Text node with size/text/xs, weight/medium
    - Background fill per color variant (lookup Badge color tokens from variables)

  **Must NOT do**:
  - Do NOT create if Badge component doesn't exist AND no suitable replacement can be built with existing tokens
  - Do NOT add variants beyond the 5 colors used in React demos

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 1, 2)
  - **Blocks**: Task 20 (badges example)
  - **Blocked By**: Task 0

  **References**:

  **Pattern References**:
  - React Badge usage in SidebarDemos.tsx lines 104-109: `<Badge size="sm" color="info">New</Badge>`
  - AGENTS.md: `.internal` section rules — every component set must have variable bindings

  **Acceptance Criteria**:
  - [ ] `.sidebar-badge` COMPONENT_SET exists in .internal section
  - [ ] 5 color variants present (info, warning, discovery, danger, caution)
  - [ ] Each variant displays correct colored badge with text

  **Commit**: NO (groups with Tasks 1, 2)

---

- [x] 4. Fix sidebar-menu-item Component ✅ DONE — itemSpacing bound, label fills fixed (text/primary for default/hover/active, text/disabled for disabled), active fontStyle fixed to weight/normal

  **What to do**:
  - Query sidebar-menu-item (6568:963968) and verify 8 variants: state × size (default/hover/active/disabled × sm/md)
  - For EACH variant, verify and fix:
    - **Component-level bindings**:
      - `paddingLeft`, `paddingRight` → `menu/item/padding/left-right` (VariableID:6177:14784)
      - `paddingTop`, `paddingBottom` → `menu/item/padding/top-bottom` (VariableID:6177:14783)
      - All 4 corner radii → `menu/item/radius` (VariableID:6177:14786)
      - `itemSpacing` → `menu/item/gap` (VariableID:6177:14785)
      - `minHeight` → `control/size/sm` (sm) or `control/size/md` (md)
    - **Background frame** (MUST be FRAME type, NOT RECTANGLE):
      - Absolute positioned, x=0, y=0, STRETCH constraints
      - `fills` → `ui/menu/item/background` (VariableID:6037:164137)
      - All 4 corner radii → `menu/item/radius`
      - Opacity: 0 for default/disabled, 1 for hover/active
    - **Start instance** (.sidebar-start or .sidebar-start-active for active state):
      - References correct internal component
      - `paddingRight` → `menu/item/gap`
      - `height` → `menu/slot-height`
      - Active state: swap to .sidebar-start-active
    - **Label TEXT**:
      - `fontSize` → `size/text/sm` (VariableID:6003:703)
      - `lineHeight` → `line/text/sm` (VariableID:6003:758)
      - `fontFamily` → `family/text` (VariableID:6003:700)
      - `fontStyle` → `weight/normal` (VariableID:6003:686)
      - `letterSpacing` → `tracking/text/sm-normal` (VariableID:6003:833)
      - `fills` → `text/primary` (VariableID:6037:164055) for default/hover/active, `text/disabled` for disabled
      - `layoutGrow` = 1 (fill remaining space)
    - **End instance** (.sidebar-end):
      - References correct internal component
      - `paddingLeft` → `menu/item/gap`
      - `height` → `menu/slot-height`
    - **Disabled state**: Entire component opacity = 0.5
    - **Active state**: Background opacity = 1, fill → `background/primary/ghost/selected` (VariableID:6156:13296), start instance uses .sidebar-start-active
  - Boolean properties: `start adornment` and `end adornment` control visibility
  - Verify variants are laid out with spacing, NOT stacked

  **Must NOT do**:
  - Do NOT add new variant axes (only state × size)
  - Do NOT change the component set ID
  - Do NOT use RECTANGLE for backgrounds

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 5-9b)
  - **Blocks**: Tasks 10-20b (all examples)
  - **Blocked By**: Tasks 1, 2 (.internal components)

  **References**:

  **Pattern References**:
  - Menu reference `menu-item` (6181:278247) — complete gold standard with exact binding pattern
  - Menu reference background pattern: FRAME, absolute, opacity-based states, all radii bound
  - Current sidebar-menu-item: 6568:963968 with 8 variants

  **API/Type References**:
  - Active state background: `background/primary/ghost/selected` (VariableID:6156:13296) — NOT `ui/menu/item/background`
  - Disabled: opacity 0.5 on entire component (confirmed working pattern from prior fix session)

  **Acceptance Criteria**:
  - [ ] 8 variants exist: default/hover/active/disabled × sm/md
  - [ ] All backgrounds are FRAME type (verified via get-node-props → type === "FRAME")
  - [ ] Default bg opacity = 0, hover bg opacity = 1, active bg opacity = 1, disabled bg opacity = 0
  - [ ] Active state: bg fill = `background/primary/ghost/selected`, start = `.sidebar-start-active`
  - [ ] Disabled state: component opacity = 0.5
  - [ ] All text nodes have 6 variable bindings
  - [ ] All padding/radius bound to menu tokens
  - [ ] Variants NOT stacked (positioned with spacing)

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Verify sidebar-menu-item hover state background
    Tool: Bash (curl)
    Steps:
      1. GET children of hover/sm variant 6568:963914
      2. Find child named "background"
      3. Assert: type is "FRAME" (NOT "RECTANGLE")
      4. Assert: opacity is 1
      5. GET bound variables for background
      6. Assert: fills bound to VariableID:6037:164137
      7. Assert: all 4 corner radii bound to VariableID:6177:14786
    Expected Result: Background is FRAME with correct bindings and opacity=1
    Evidence: Node props and bindings captured

  Scenario: Verify sidebar-menu-item disabled state
    Tool: Bash (curl)
    Steps:
      1. GET node props for disabled/sm variant 6568:963950
      2. Assert: opacity is 0.5
      3. Find background child
      4. Assert: background opacity is 0
    Expected Result: Disabled state uses component-level opacity 0.5
    Evidence: Node props captured

  Scenario: Export sidebar-menu-item for visual check
    Tool: Bash (curl)
    Steps:
      1. POST export-node for component set 6568:963968 at scale 2
      2. Save base64 PNG to /tmp/sidebar-menu-item-export.png
      3. Verify file is non-empty and shows all 8 variants
    Expected Result: All variants visible, not stacked
    Evidence: /tmp/sidebar-menu-item-export.png
  ```

  **Commit**: NO (groups with Tasks 5-9b)

---

- [x] 5. Fix sidebar-group-label Component (sm/lg naming) ✅ DONE — renamed md→lg, sm lineHeight fixed to line/text/xs, chevron fills bound to text/tertiary

  **What to do**:
  - Query sidebar-group-label (6568:963993) — currently has 4 variants: size × collapsible
  - **CRITICAL**: If current variant axis uses `size=md`, rename to `size=lg`
  - Verify typography per variant:
    - **sm (collapsible=False)**: fontSize=12px (size/text/xs), fontStyle=weight/semibold, fills=text/tertiary, text-transform=UPPER
    - **sm (collapsible=True)**: Same as sm + chevron icon on right
    - **lg (collapsible=False)**: fontSize=14px (size/text/sm), fontStyle=weight/medium, fills=text/primary, normal case
    - **lg (collapsible=True)**: Same as lg + chevron icon on right
  - All text nodes must have full 6-binding typography set
  - Padding bindings: use menu/gutter or appropriate spacing tokens
  - Ensure variants NOT stacked

  **Must NOT do**:
  - Do NOT add new variants
  - Do NOT change from 4-variant structure

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 4, 6-9b)
  - **Blocks**: Tasks 10-20b
  - **Blocked By**: Task 0

  **References**:

  **Pattern References**:
  - Current component: 6568:963993 with 4 variants
  - Variants: sm/False (6568:964006), sm/True (6568:963971), md/False (6568:963987), md/True (6568:963989)
  - React: SidebarGroupLabel `size="sm"` = compact/tertiary/uppercase, `size="lg"` = larger/primary/normal

  **Variable References**:
  - sm text: size/text/xs (VariableID:6003:702), weight/semibold (VariableID:6003:690), text/tertiary (VariableID:6037:164057)
  - lg text: size/text/sm (VariableID:6003:703), weight/medium (VariableID:6003:696), text/primary (VariableID:6037:164055)

  **Acceptance Criteria**:
  - [ ] Variant axis uses `size=sm` and `size=lg` (NOT `size=md`)
  - [ ] sm variants: 12px, semibold, tertiary, uppercase
  - [ ] lg variants: 14px, medium, primary, normal case
  - [ ] All text nodes have 6 variable bindings
  - [ ] Collapsible variants have chevron icon

  **Commit**: NO

---

- [x] 6. Verify sidebar-separator Component ✅ DONE — correct. Gradient-fade=True uses hardcoded gradient (acceptable)

  **What to do**:
  - Query sidebar-separator (6568:963998)
  - Verify 2 variants: `gradient-fade=False`, `gradient-fade=True`
  - Verify line color bound to `ui/menu/separator/background` (VariableID:6182:278380)
  - Verify padding bound to `menu/separator/padding/top-bottom` (VariableID:6177:14790)
  - Fix any missing bindings
  - This is likely already correct per audit — quick verification

  **Must NOT do**:
  - Do NOT rebuild if already correct

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: Tasks 10-20b
  - **Blocked By**: Task 0

  **References**:
  - Current node: 6568:963998, variants: 6568:963994 (False), 6568:963996 (True)

  **Acceptance Criteria**:
  - [ ] 2 variants exist
  - [ ] Color bound to ui/menu/separator/background
  - [ ] Padding bound to separator token

  **Commit**: NO

---

- [x] 7. Fix sidebar-sub-item Component (add depth 0 and 3) ✅ DONE — 6 new variants created (depth=0/3), all bindings applied

  **What to do**:
  - Query sidebar-sub-item (6568:1025264) — currently has 6 variants: state × depth (default/hover/active × depth=1/depth=2)
  - Add missing variants:
    - `state=default, depth=0` — no indent (used in Search and Text-Only examples for flat sub-button items)
    - `state=hover, depth=0`
    - `state=active, depth=0`
    - `state=default, depth=3` — deepest indent (used in Nested example: response.output_item → added/done)
    - `state=hover, depth=3`
    - `state=active, depth=3`
  - Total: 12 variants (3 states × 4 depths)
  - For each depth, paddingLeft should increase progressively:
    - depth=0: `menu/item/padding/left-right` (8px)
    - depth=1: 8px + 12px = 20px (or use specific token if available)
    - depth=2: 8px + 24px = 32px
    - depth=3: 8px + 36px = 44px
  - Each variant structure:
    - HORIZONTAL auto-layout
    - Background FRAME (absolute, opacity-based states — same as menu-item)
    - Label TEXT with full typography bindings
    - `paddingRight` → `menu/item/padding/left-right`
    - `paddingTop/Bottom` → `menu/item/padding/top-bottom`
    - Radius → `menu/item/radius`
    - Active state: background opacity=1, fill=`background/primary/ghost/selected`
    - Hover state: background opacity=1, fill=`ui/menu/item/background`
  - Ensure variants NOT stacked

  **Must NOT do**:
  - Do NOT add depth > 3
  - Do NOT add disabled state (not used in React demos for sub-items)
  - Do NOT add icons to sub-items (React sub-buttons are text-only)

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: Tasks 14-15, 16, 18
  - **Blocked By**: Task 0

  **References**:

  **Pattern References**:
  - Current node: 6568:1025264, 6 variants
  - React: `SidebarMenuSubButton indent={depth as 0 | 1 | 2 | 3}` — 4 depth levels
  - AGENTS.md: sidebar-sub-item section — "Extra paddingLeft per depth level"

  **Acceptance Criteria**:
  - [ ] 12 variants exist: default/hover/active × depth 0/1/2/3
  - [ ] Each depth has progressively more paddingLeft
  - [ ] Active state has background opacity=1
  - [ ] All backgrounds are FRAME type
  - [ ] All text nodes have 6 variable bindings

  **Commit**: NO

---

- [x] 8. Fix sidebar-card Component (add Button + Dismiss) ✅ DONE — CTA button and dismiss × button added, all bindings applied

  **What to do**:
  - Query sidebar-card (6568:964005) — currently has 2 variants: size=sm/md
  - Each variant needs:
    - Container: `surface/secondary` background, `radius/md` corners
    - Title text: "Upgrade to Pro" — weight/medium, text/primary, fontSize → size/text/sm
    - Title should be a link-style element (underline or text/primary color)
    - Description text: "Unlock higher rate limits, priority support, and advanced features." — weight/normal, text/secondary, fontSize → size/text/sm
    - CTA button frame: Simulated pill button "View Plans" — small rounded frame with primary color fill, white text, radius/full
    - Dismiss (×) button: Small icon in top-right corner — close/x icon, text/tertiary color
    - Boolean property: `dismissible` controls × button visibility
  - Padding: spacing/md (8px) or spacing/lg (12px)
  - Gap between elements: spacing/sm (6px)
  - All text nodes: full 6-binding typography set

  **Must NOT do**:
  - Do NOT use an actual Button component instance unless it exists in the Figma file
  - Do NOT add size variants beyond sm/md

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 20b (footer-card example)
  - **Blocked By**: Task 0

  **References**:

  **Pattern References**:
  - React: SidebarDemos.tsx lines 969-981 — SidebarCard with SidebarCardTitleLink, SidebarCardContent, SidebarCardFooter, Button
  - Current node: 6568:964005 with 2 variants

  **Acceptance Criteria**:
  - [ ] Title text = "Upgrade to Pro"
  - [ ] Description text = "Unlock higher rate limits, priority support, and advanced features."
  - [ ] CTA button element = "View Plans"
  - [ ] Dismiss × button present (controlled by boolean property)
  - [ ] All text nodes have typography bindings
  - [ ] Background fill = surface/secondary

  **Commit**: NO

---

- [x] 9. Fix sidebar-search Component ✅ DONE — all checks passed, prior fix intact (icon, text, bindings all correct)

  **What to do**:
  - Query sidebar-search (6568:1025280) — currently has 2 variants: state=default/focused
  - Verify structure:
    - HORIZONTAL auto-layout
    - Search icon instance (use Search icon from Icons page)
    - Placeholder TEXT "Search" — text/tertiary color
    - Width: counterAxisSizingMode=FIXED at appropriate width (match container)
    - Padding bound to `menu/gutter` (VariableID:6177:14781)
    - Height: 32px or bound to control/size/md
  - Default state: border color = border token, background = surface
  - Focused state: border color = primary/accent, potential ring
  - All text bindings: full 6-binding set
  - This was fixed in a prior session — verify the fix is still intact

  **Must NOT do**:
  - Do NOT rebuild if already correct from prior session fix

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 16 (search example)
  - **Blocked By**: Task 0

  **References**:
  - Current node: 6568:1025280, variants: default (6568:1025272), focused (6568:1025276)
  - Prior fix session: ses_39d07769affemi35ccw4vWtXFQ — sidebar-search rebuilt with auto-layout and padding bindings

  **Acceptance Criteria**:
  - [ ] 2 variants exist: default, focused
  - [ ] Search icon present
  - [ ] Placeholder text "Search" with text/tertiary color
  - [ ] Padding bound to menu/gutter
  - [ ] Typography bindings complete

  **Commit**: NO

---

- [x] 9b. Fix sidebar-menu-skeleton Component ✅ DONE — rebuilt with HORIZONTAL layout, all bindings applied

  **What to do**:
  - Query sidebar-menu-skeleton (6568:1025271) via Bridge
  - Should contain shimmer/placeholder rectangles mimicking menu items
  - Structure: VERTICAL auto-layout with skeleton bars at varying widths
  - Each skeleton bar: rounded rectangle with `surface/secondary` or `surface/tertiary` fill
  - Heights should match control/size/sm (sm variant) or control/size/md (md variant)
  - React shows 4 skeleton items with `labelWidth`: 70%, 55%, 80%, 45% — the Figma component should represent one skeleton item (width configurable or fixed at representative %)
  - If timeout persists from audit, investigate node complexity

  **Must NOT do**:
  - Do NOT over-engineer — skeleton is a simple visual placeholder

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 17 (skeleton example)
  - **Blocked By**: Task 0

  **References**:
  - Node: 6568:1025271
  - React: SidebarMenuSkeleton with labelWidth prop

  **Acceptance Criteria**:
  - [ ] Component exists and renders (no bridge timeout)
  - [ ] Shows placeholder bar(s) with muted fill color
  - [ ] Height matches control size tokens

  **Commit**: NO

---

- [x] 10. Example — sidebar overview ✅ DONE — text-specific component variants created, all content matches React

  **What to do**:
  - Fix/rebuild the `sidebar overview` example (6568:1025569) with size=sm and size=md variants
  - **Exact content from React**:
    - Group 1: label "Project" (SidebarGroupLabel size="sm")
      - Item: Home icon + "Overview" — **isActive=true** (active state)
      - Item: Folder icon + "Projects" + Badge "New" (info color)
      - Item: FileDocument icon + "Assets"
      - Item: Analytics icon + "Analytics"
    - Separator
    - Group 2: label "System" (SidebarGroupLabel size="sm")
      - Item: Members icon + "Team"
      - Item: SettingsCog icon + "Settings"
  - Width: 240px (default sidebar width)
  - Each item uses `sidebar-menu-item` instance with appropriate state variant
  - "Overview" item uses `state=active` variant
  - "Projects" item has Badge "New" in end adornment slot
  - All other items use `state=default` variant
  - sm variant: all items use size=sm sidebar-menu-item instances
  - md variant: all items use size=md instances
  - Container: VERTICAL auto-layout, padding=menu/gutter

  **Must NOT do**:
  - Do NOT include items not in the React data (e.g., no "Dashboard", "Profile")
  - Do NOT use wrong icons (match React exactly)
  - Do NOT hardcode any colors or sizes

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: [`playwright`]
    - `playwright`: For screenshotting live site for visual comparison
  - **Skills Evaluated but Omitted**:
    - `dev-browser`: Playwright is better for screenshot comparison

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 11-20b)
  - **Blocks**: Task 21 (preview)
  - **Blocked By**: Tasks 4-6 (component fixes)

  **References**:

  **Pattern References**:
  - React: SidebarDemos.tsx lines 79-157 — SidebarBaseDemo
  - Data: mainNavItems (lines 58-63) + systemNavItems (lines 65-68)
  - Current node: 6568:1025569 with sm (6568:1025434) and md (6568:1025435) variants

  **Icon Assignments** (from React):
  - Overview → Home (6131:11611)
  - Projects → Folder (6131:11580)
  - Assets → FileDocument (6131:11824)
  - Analytics → Analytics (6131:11833)
  - Team → Members (6131:11430)
  - Settings → SettingsCog (6131:11968)

  **Acceptance Criteria**:
  - [ ] 2 variants: size=sm, size=md
  - [ ] 6 menu items with correct labels (Overview, Projects, Assets, Analytics, Team, Settings)
  - [ ] 6 different icons matching React assignments
  - [ ] "Overview" item is in active state
  - [ ] "Projects" item has "New" badge (info color)
  - [ ] 2 group labels: "Project" and "System" (both sm)
  - [ ] Separator between groups
  - [ ] Width = 240px

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Verify overview example content
    Tool: Bash (curl)
    Steps:
      1. Find all TEXT children in sm variant 6568:1025434
      2. Assert: text content includes "Project", "System", "Overview", "Projects", "Assets", "Analytics", "Team", "Settings"
      3. Find all instances — verify 6 menu-item instances
      4. Check "Overview" item instance variant = state=active
    Expected Result: All labels match React demo
    Evidence: Text content list captured

  Scenario: Visual comparison with live site
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to http://localhost:3000/docs/components/sidebar
      2. Scroll to "Overview" example section
      3. Screenshot the example at 1x scale
      4. Save to .sisyphus/evidence/task-10-overview-live.png
      5. Export Figma overview example: POST export-node for 6568:1025434 scale=2
      6. Save to .sisyphus/evidence/task-10-overview-figma.png
    Expected Result: Both screenshots show matching content/layout
    Evidence: .sisyphus/evidence/task-10-overview-live.png, .sisyphus/evidence/task-10-overview-figma.png
  ```

  **Commit**: NO (groups with other examples)

---

- [x] 11. Example — sidebar scrollable ✅ DONE — 3 groups, 8 items, title case labels, active state correct

  **What to do**:
  - Fix/rebuild `sidebar scrollable` (6568:1025750) with sm/md variants
  - **Exact content**:
    - Group 1: "Project" (sm label) — Overview (active, Home), Projects (Folder), Assets (FileDocument), Analytics (Analytics)
    - Group 2: "System" (sm label) — Team (Members), Settings (SettingsCog)
    - Group 3: "Resources" (sm label) — Logs (Code), Console (Terminal)
  - Width: 240px
  - Container height constrained (to imply scroll)

  **Recommended Agent Profile**: `deep`, skills: [`playwright`]
  **Parallelization**: Wave 4, independent

  **References**:
  - React: SidebarDemos.tsx lines 572-665 — SidebarScrollableDemo
  - Data: mainNavItems + systemNavItems + resourcesNavItems (lines 70-73)
  - Current node: 6568:1025750

  **Acceptance Criteria**:
  - [ ] 3 groups with correct labels
  - [ ] 8 items total with correct icons
  - [ ] "Overview" is active
  - [ ] Container suggests scrollable content (height constrained)

  **Commit**: NO

---

- [x] 12. Example — sidebar text-only ✅ DONE — NO icons, lg labels, 9 items, 180px width

  **What to do**:
  - Fix/rebuild `sidebar text-only` (6568:1025936) with sm/md variants
  - **Exact content**:
    - Group 1: "Settings" (lg label) — "Your profile"
    - Group 2: "Organization" (lg label) — "General" (active), "API keys", "Admin keys"
    - Group 3: "People" (lg label) — "People", "Projects", "Billing", "Limits", "Usage"
  - NO icons on any item
  - Width: 180px
  - Uses sidebar-menu-item instances WITHOUT start adornment (boolean=false)
  - Group labels use `size=lg` variant (14px, medium, primary)

  **Recommended Agent Profile**: `deep`, skills: [`playwright`]
  **Parallelization**: Wave 4, independent

  **References**:
  - React: SidebarDemos.tsx lines 671-721 — SidebarTextOnlyDemo
  - Current node: 6568:1025936

  **Acceptance Criteria**:
  - [ ] 3 groups with lg labels: "Settings", "Organization", "People"
  - [ ] 9 items total, NO icons
  - [ ] "General" is active
  - [ ] Width = 180px
  - [ ] Group labels use size=lg variant

  **Commit**: NO

---

- [x] 13. Example — sidebar collapse-icon ✅ DONE — side-by-side expanded + icon rail

  **What to do**:
  - Fix/rebuild `sidebar collapse-icon` (6568:1026074) with sm/md variants
  - Each variant should show TWO side-by-side representations:
    - LEFT: Expanded sidebar (same as Overview: Project/System groups with mainNavItems + systemNavItems)
    - RIGHT: Collapsed icon-rail (48-60px wide, icons only, no text)
  - Collapsed rail: each item shows only the icon centered, tooltip implied
  - Width of expanded: 240px, width of collapsed: ~48px

  **Recommended Agent Profile**: `deep`, skills: [`playwright`]
  **Parallelization**: Wave 4, independent

  **References**:
  - React: SidebarDemos.tsx lines 164-271 — SidebarCollapsibleIconDemo
  - Prior rebuild: collapse-icon md variant was rebuilt in session ses_39cfda6aeffewbPKgIDgKZLt0Z
  - Current node: 6568:1026074

  **Acceptance Criteria**:
  - [ ] Shows both expanded and collapsed states
  - [ ] Collapsed rail shows icons only
  - [ ] Content matches Overview (Project + System groups)

  **Commit**: NO

---

- [x] 14. Example — sidebar nested (docs mode, icons=false) ✅ DONE — docs-style nested navigation

  **What to do**:
  - The `sidebar nested` example (6568:1026154) should contain the docs-style nested navigation
  - sm/md variants
  - **Exact content** (icons=false mode):
    - Group 1: "Getting Started" label → expandable with 5 sub-items: Introduction (active), Installation, Quick Start, Configuration, Examples
    - Group 2: "API Reference" label → expandable with nested sub-items:
      - Responses → Create, Streaming (→ response.created, response.in_progress, response.completed, response.output_item (→ added, done)), Get, List, Delete
      - Chat Completions → Create, Streaming
      - Embeddings → Create, List
      - Models, Files, Images, Audio, Errors (flat sub-items)
    - Group 3: "Guides" label → 5 sub-items: Best Practices, Rate Limits, Authentication, Error Handling, Pagination
    - Group 4: "SDKs & Libraries" label → 4 sub-items: Python, Node.js, Go, Java
  - Uses sidebar-sub-item instances with depth 0-3
  - "Getting Started" is expanded, others collapsed
  - "Introduction" is active
  - NO icons
  - Width: 280px
  - Variant: docs style (may use different group label styling)

  **Recommended Agent Profile**: `deep`, skills: [`playwright`]
  **Parallelization**: Wave 4, independent

  **References**:
  - React: SidebarDemos.tsx lines 284-371 (nestedDocsSections data) + lines 440-566 (SidebarNestedDemo)
  - Current node: 6568:1026154

  **Acceptance Criteria**:
  - [ ] 4 groups with correct labels
  - [ ] "Getting Started" expanded showing 5 sub-items
  - [ ] API Reference shows deeply nested structure (visible when expanded)
  - [ ] Uses depth 0-3 sub-item variants
  - [ ] "Introduction" is active
  - [ ] Width = 280px

  **Commit**: NO

---

- [x] 15. Example — sidebar nested (icons mode, icons=true) ✅ DONE — separate icons-mode set created

  **What to do**:
  - Add additional variant(s) to `sidebar nested` (6568:1026154) for the icons mode
  - OR create this as a separate representation within the same example
  - **Exact content** (icons=true mode):
    - Single group (no label), 6 parent items with icons:
      - Dashboard (Home icon) → expanded → sub-items: Overview (active), Analytics, Reports, Metrics
      - Content (FileDocument icon) → collapsed → sub-items: Pages, Posts, Media Library, Templates
      - Users (Members icon) → collapsed → sub-items: All Users, Roles, Permissions, Invitations
      - API (Code icon) → collapsed → sub-items: API Keys, Webhooks, Logs
      - Billing (CreditCard icon) → collapsed → sub-items: Subscription, Invoices, Usage
      - Settings (SettingsCog icon) → collapsed → sub-items: General, Security, Integrations, Notifications
  - Parent items use sidebar-menu-item with chevron (expand-arrow) in end adornment
  - Sub-items use sidebar-sub-item at depth=1
  - "Dashboard" is expanded, "Overview" is active
  - Width: 280px

  **Recommended Agent Profile**: `deep`, skills: [`playwright`]
  **Parallelization**: Wave 4, depends on Task 7 (sub-item depth support)

  **References**:
  - React: SidebarDemos.tsx lines 373-438 (nestedIconsSections data)
  - React: Uses SidebarMenuButton + SidebarMenuChevron for parents, SidebarMenuSub for children

  **Acceptance Criteria**:
  - [ ] 6 parent items with correct icons
  - [ ] "Dashboard" expanded with 4 sub-items
  - [ ] "Overview" under Dashboard is active
  - [ ] Parent items have chevron icons
  - [ ] Sub-items at depth=1

  **Commit**: NO

---

- [x] 16. Example — sidebar search ✅ DONE — search input + 3 groups, 11 items

  **What to do**:
  - Fix/rebuild `sidebar search` (6568:1026401) with sm/md variants
  - **Exact content**:
    - Header: SidebarInput with placeholder "Search"
    - Group 1: "Get started" label → Overview (active), Quickstart, Models, Pricing, Libraries
    - Group 2: "Core concepts" label → Text generation, Code generation, Images and vision, Structured output
    - Group 3: "Agents" label → Overview, Build agents
  - NO icons on items
  - Uses sidebar-sub-item at depth=0 (flat sub-button style)
  - Width: 220px
  - Variant: docs
  - Search component at top (fixed header area)

  **Recommended Agent Profile**: `deep`, skills: [`playwright`]
  **Parallelization**: Wave 4, depends on Tasks 7, 9

  **References**:
  - React: SidebarDemos.tsx lines 727-787 — SidebarSearchDemo
  - Current node: 6568:1026401

  **Acceptance Criteria**:
  - [ ] Search input at top with "Search" placeholder
  - [ ] 3 groups: "Get started", "Core concepts", "Agents"
  - [ ] 11 items total, NO icons
  - [ ] "Overview" under "Get started" is active
  - [ ] Width = 220px
  - [ ] Uses sub-item depth=0 instances

  **Commit**: NO

---

- [x] 17. Example — sidebar skeleton ✅ DONE — 4 loading placeholders with varied widths

  **What to do**:
  - Fix/rebuild `sidebar skeleton` (6568:1026428) with sm/md variants
  - **Exact content**:
    - 4 skeleton placeholder items
    - Different label widths: 70%, 55%, 80%, 45%
    - Uses sidebar-menu-skeleton instances
  - Width: 240px

  **Recommended Agent Profile**: `quick`, skills: [`playwright`]
  **Parallelization**: Wave 4, depends on Task 9b

  **References**:
  - React: SidebarDemos.tsx lines 793-832 — SidebarSkeletonDemo
  - Current node: 6568:1026428

  **Acceptance Criteria**:
  - [ ] 4 skeleton items visible
  - [ ] Different widths (visually varied)

  **Commit**: NO

---

- [x] 18. Example — sidebar mobile ✅ DONE — phone mockup with mobile drawer content

  **What to do**:
  - Fix/rebuild `sidebar mobile` (6568:1026335) with sm/md variants
  - **Scope decision**: The React demo has 3 boolean controls (mobile, nested, icons = 8 combinations). For Figma, represent the **default mobile view** (mobile=true, nested=false, icons=true):
    - Phone frame: 375×667px with gray background
    - Header bar with hamburger menu button
    - Content area (rounded white card) showing the open menu:
      - Groups: Project (sm) + System (sm) + Resources (sm)
      - Items: mainNavItems + systemNavItems + resourcesNavItems (all with icons)
      - SidebarCard at bottom: "Upgrade to Pro" card
  - This is a static representation of the mobile drawer state (open)

  **Recommended Agent Profile**: `deep`, skills: [`playwright`]
  **Parallelization**: Wave 4, independent

  **References**:
  - React: SidebarDemos.tsx lines 1200-1728 — SidebarMobileDemo complex
  - Default mobile state: lines 1594-1648 — phone frame with SidebarMobileMenuButton + content
  - Current node: 6568:1026335

  **Acceptance Criteria**:
  - [ ] Phone frame dimensions: 375×667px
  - [ ] Shows open mobile menu state
  - [ ] Menu items match mainNavItems + systemNavItems + resourcesNavItems
  - [ ] Card at bottom

  **Commit**: NO

---

- [x] 19. Example — sidebar group-sizes ✅ DONE — sm vs lg labels side-by-side

  **What to do**:
  - Fix/rebuild `sidebar group-sizes` (6568:1026555) with sm/md variants
  - **Exact content**: Two sidebar representations side by side:
    - LEFT (sm mode): Groups "Project" (sm label) + "System" (sm label). Items: Overview/Home, Projects/Folder, Analytics/Analytics + Team/Members, Settings/SettingsCog. WITH icons. Width: 200px. Active: "Overview".
    - RIGHT (lg mode): Groups "Getting Started" (lg label) + "Components" (lg label). Items: Introduction, Installation, Quick Start + Button, Input, Modal, Sidebar. NO icons. Variant: docs. Width: 220px. Active: "Introduction".

  **Recommended Agent Profile**: `deep`, skills: [`playwright`]
  **Parallelization**: Wave 4, depends on Task 5

  **References**:
  - React: SidebarDemos.tsx lines 1004-1198 — SidebarHeaderSizesDemo
  - Data: dashboardSections (lines 1005-1008) + docsSectionsHeaderSizes (lines 1010-1013)
  - Current node: 6568:1026555

  **Acceptance Criteria**:
  - [ ] Two sidebars shown (sm and lg modes)
  - [ ] sm mode: 5 items with icons, sm group labels
  - [ ] lg mode: 7 items without icons, lg group labels
  - [ ] Correct widths: 200px and 220px

  **Commit**: NO

---

- [x] 20. Example — sidebar badges ✅ DONE — 8 items with 6 colored badges (layout needs refinement)

  **What to do**:
  - Fix/rebuild `sidebar badges` (6568:1026886) with sm/md variants
  - **Exact content**:
    - Group: "Navigation" (default label, no explicit size prop — uses default which is lg)
    - 8 items with icons:
      1. Overview (Home) — active, NO badge
      2. API Reference (Code) — Badge "New" (info/blue)
      3. Playground (Terminal) — Badge "Beta" (warning/amber)
      4. Fine-tuning (SettingsCog) — Badge "3" (info/blue)
      5. Batch API (Storage) — Badge "Updated" (discovery/teal)
      6. Legacy Models (FileDocument) — Badge "Deprecated" (danger/red)
      7. Usage (Analytics) — Badge "12" (caution/orange)
      8. Billing (CreditCard) — NO badge
  - Width: 240px
  - Each badge uses .sidebar-badge internal component (from Task 3) or Badge instance
  - Items use sidebar-menu-item with end adornment containing badge

  **Recommended Agent Profile**: `deep`, skills: [`playwright`]
  **Parallelization**: Wave 4, depends on Tasks 3, 4

  **References**:
  - React: SidebarDemos.tsx lines 838-907 — SidebarBadgesDemo
  - Badge data: lines 842-851

  **Acceptance Criteria**:
  - [ ] 8 items with correct icons
  - [ ] 6 badges with correct text and colors
  - [ ] "Overview" is active
  - [ ] Group label "Navigation"
  - [ ] Badges are visually distinct colors (not all same)

  **Commit**: NO

---

- [x] 20b. Example — sidebar footer-card ✅ DONE — Overview nav + upgrade card at bottom

  **What to do**:
  - Fix/rebuild `sidebar footer-card` (6568:1026887) with sm/md variants
  - **Exact content**:
    - Groups: "Project" (sm label) + "System" (sm label) — same as Overview
    - Items: mainNavItems + systemNavItems — same as Overview (active: "Overview")
    - Footer area: sidebar-card instance with:
      - Title: "Upgrade to Pro"
      - Description: "Unlock higher rate limits, priority support, and advanced features."
      - Button: "View Plans" (sm, pill, primary)
      - Dismissible (× button)
    - Below card: SidebarTrigger element

  **Recommended Agent Profile**: `deep`, skills: [`playwright`]
  **Parallelization**: Wave 4, depends on Tasks 4, 8

  **References**:
  - React: SidebarDemos.tsx lines 913-998 — SidebarFooterCardsDemo
  - Current node: 6568:1026887

  **Acceptance Criteria**:
  - [ ] Same nav as Overview (Project + System groups)
  - [ ] Footer card with exact text content
  - [ ] "View Plans" button visible
  - [ ] Dismiss × button visible

  **Commit**: NO

---

- [ ] 21. Preview Section — Light/Dark Panels for All 11 Examples

  **What to do**:
  - Rebuild the Preview section (6568:963474) following the AGENTS.md template exactly
  - Structure:
    ```
    SECTION → GROUP → FRAME (VERTICAL)
      INSTANCE ".title" (componentId: 6330:78705, variant: "notes + description")
        — title: "Sidebar", description: component description
      
      For each of the 11 examples:
        INSTANCE ".subtitle" (componentId: 6151:90929, variant: "Full width")
          — text: example name (e.g., "Overview", "Scrollable Content", etc.)
        INSTANCE ".description" (componentId: 6155:71546)
          — text: brief description
        FRAME "preview" (VERTICAL, paddingBottom → figma/preview/gap)
          FRAME "content" (HORIZONTAL, gap→spacing/xl, padding→spacing/xl, fill→surface/tertiary)
            FRAME "light" (VERTICAL, 1024px, fill→surface, stroke→border, radius→radius/2xl, gap→figma/group/gap)
              INSTANCE from examples (size=sm variant)
              FRAME "icon" (40×40, sun icon)
            FRAME "dark" (VERTICAL, 1024px, fill→surface, stroke→border, radius→radius/2xl, gap→figma/group/gap)
              INSTANCE from examples (size=sm variant)
              FRAME "icon" (40×40, moon icon)
    ```
  - 11 preview sections with subtitle/description/light/dark for:
    1. Overview
    2. Scrollable Content
    3. Text-Only Navigation
    4. Collapse Modes
    5. Nested Navigation
    6. Mobile Menu
    7. Search
    8. Skeleton
    9. Group Label Sizes
    10. Badges
    11. Footer Cards
  - Variable bindings for preview frames:
    - content: spacing/xl padding + itemSpacing, surface/tertiary fill
    - light/dark: breakpoints/lg width (VariableID:6155:67310), radius/2xl corners, surface fill, border stroke, figma/group/gap itemSpacing
    - preview: figma/preview/gap paddingBottom (VariableID:6413:82922)

  **Must NOT do**:
  - Do NOT create custom preview templates — use the existing .title/.subtitle/.description components
  - Do NOT modify the template components themselves

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`playwright`]
    - `playwright`: For final visual comparison screenshots

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 5 (sequential)
  - **Blocks**: None (final)
  - **Blocked By**: ALL example tasks (10-20b)

  **References**:

  **Pattern References**:
  - AGENTS.md: "Preview Section Structure (Standard Template)" — exact template with component IDs
  - Template component IDs: .title=6330:78705, .subtitle=6151:90929, .description=6155:71546
  - Variable bindings: figma/preview/gap=VariableID:6413:82922, figma/group/gap=VariableID:6193:27026

  **Acceptance Criteria**:
  - [ ] 11 preview subsections present
  - [ ] Each has light + dark panels
  - [ ] Light panels show surface background, dark panels show dark background
  - [ ] All instances reference correct example components
  - [ ] Variable bindings complete for all frames

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Verify preview section structure
    Tool: Bash (curl)
    Steps:
      1. GET children of preview section 6568:963474 depth=2
      2. Count .subtitle instances — should be 11
      3. Count "preview" frames — should be 11
      4. Each preview frame should have "content" child with "light" and "dark" subframes
    Expected Result: 11 complete preview blocks
    Evidence: Structure tree captured

  Scenario: Export full preview for visual check
    Tool: Bash (curl)
    Steps:
      1. Export preview section at scale 1
      2. Save to .sisyphus/evidence/task-21-preview-full.png
    Expected Result: All 11 examples visible in light/dark panels
    Evidence: .sisyphus/evidence/task-21-preview-full.png
  ```

  **Commit**: YES
  - Message: `feat(figma): rebuild sidebar page with all 11 examples`
  - Files: AGENTS.md changes (from Task 22)
  - Pre-commit: N/A (Figma changes are in the Figma file, not git)

---

- [ ] 22. Update AGENTS.md — FRAME vs RECTANGLE Pattern + Sidebar Architecture

  **What to do**:
  - Read current AGENTS.md
  - Apply the FRAME vs RECTANGLE update from draft (`.sisyphus/drafts/agents-md-update.md`):
    - Find the background frame section (around lines 91-94)
    - Replace with the enhanced version that documents FRAME requirement
  - Verify the Sidebar Component Architecture section is present and accurate
  - If any sidebar component details changed during this rebuild, update the architecture section
  - Specifically update:
    - `.internal` section: add `.sidebar-badge` component documentation
    - `Components` section: fix `sidebar-group-label` to say sm/lg (not sm/md)
    - Add `sidebar-menu-sub-button` if it was created as a new component

  **Must NOT do**:
  - Do NOT delete or modify non-sidebar sections of AGENTS.md
  - Do NOT add information about components that weren't built

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 21)
  - **Parallel Group**: Wave 5
  - **Blocks**: None
  - **Blocked By**: None (uses existing draft)

  **References**:
  - Draft: `.sisyphus/drafts/agents-md-update.md` — contains exact old/new text for FRAME pattern
  - Current AGENTS.md: `/Users/sergeytomashevsky/github/plexui-docs/AGENTS.md`

  **Acceptance Criteria**:
  - [ ] AGENTS.md contains "MUST be a FRAME node, NOT a RECTANGLE" text
  - [ ] sidebar-group-label documented as sm/lg (not sm/md)
  - [ ] .sidebar-badge documented in .internal section (if created)

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Verify AGENTS.md FRAME pattern documented
    Tool: Bash (grep)
    Steps:
      1. grep "FRAME.*not.*RECTANGLE" AGENTS.md (case insensitive)
      2. Assert: at least 1 match found
    Expected Result: FRAME vs RECTANGLE pattern is documented
    Evidence: grep output

  Scenario: Verify group-label naming
    Tool: Bash (grep)
    Steps:
      1. grep 'size.*sm.*lg' AGENTS.md in sidebar section
      2. Assert: sm/lg pattern present, NOT sm/md
    Expected Result: Correct naming documented
    Evidence: grep output
  ```

  **Commit**: YES
  - Message: `docs: update AGENTS.md with FRAME background pattern and sidebar architecture`
  - Files: `AGENTS.md`

---

## Commit Strategy

| After Task(s) | Message | Files | Verification |
|------------|---------|-------|--------------|
| 21 (all Figma work) | `feat(figma): rebuild sidebar page with all 11 examples` | N/A (Figma file) | Visual export comparison |
| 22 | `docs: update AGENTS.md with FRAME background pattern and sidebar architecture` | AGENTS.md | grep verification |

---

## Success Criteria

### Verification Commands
```bash
# Verify Bridge is running
curl -s http://localhost:8767/status

# Verify all 11 examples exist
curl -s -X POST http://localhost:8767/command -H "Content-Type: application/json" \
  -d '{"command":"find-children","params":{"nodeId":"6568:963718","depth":1}}' \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d.get('result',[])))"
# Expected: 11

# Verify AGENTS.md update
grep -c "FRAME.*RECTANGLE" AGENTS.md
# Expected: >= 1
```

### Final Checklist
- [ ] All 11 examples present in Examples section with sm/md variants
- [ ] All examples match React demo content exactly (text, icons, badges, structure)
- [ ] Preview section has 11 light/dark panels
- [ ] All components use FRAME backgrounds (not RECTANGLE)
- [ ] All variable bindings complete (0 hardcoded values)
- [ ] All variants laid out with spacing (not stacked)
- [ ] sidebar-group-label uses sm/lg naming
- [ ] sidebar-sub-item supports depth 0-3
- [ ] AGENTS.md updated with FRAME pattern and sidebar architecture
- [ ] Draft file deleted
