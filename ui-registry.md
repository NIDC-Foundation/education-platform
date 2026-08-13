# UI Registry

Tracks the visual patterns established across the dashboard sections (Admin, Donor, Scholar, Applicant portal) so new components stay consistent with what already exists. Established during the Scholar section UI polish pass — the reference baseline for Donor, Admin, and Applicant portal passes that follow.

## Baseline — Established 2026-08-07

Note: This baseline was established while polishing the Scholar section (all 11 pages + Messages workspace) in `app/(scholar)/scholar/**`. Same conventions apply project-wide to Admin/Donor/Applicant dashboards.

| Property | Correct class |
| --- | --- |
| Section card background | `bg-card` (default via `Card` component) |
| Section card border | `border-border/60` |
| Section card radius | default (`Card` component's built-in radius) |
| Hero/identity card background | `bg-gradient-to-br from-primary/8 via-background to-secondary/40` |
| Metric tile top border (accent) | `border-t-2` + `border-border/60` (pass as `className` to `MetricCard`) |
| Text — heading | `text-sm font-semibold` (CardTitle default) or `text-2xl font-semibold tracking-tight` for page/hero-level headings |
| Text — body | `text-sm text-muted-foreground` |
| Text — eyebrow/label | `text-xs uppercase tracking-[0.2em] text-muted-foreground` |
| Text — metric value | `text-3xl font-semibold leading-none tracking-tight` (or `text-2xl`/`text-lg` when the row has 5+ tiles) |
| Inset panel (on hero gradient) | `rounded-xl border bg-background/80 p-4` |
| Inset panel (on flat card) | `rounded-xl border bg-muted/20 p-4` |
| Divider-list row (table-like content inside a Card) | `<CardContent className="p-0">` + `<div className="divide-y divide-border/50">` + rows `px-6 py-4` |
| Status/timeline dot | `h-3 w-3 rounded-full` — `bg-primary` (completed), `bg-chart-5` (active/in-progress), `bg-muted-foreground/30` or `bg-border` (pending/upcoming) |

### Component: Section Card

File: any dashboard page (e.g. `app/(scholar)/scholar/**/page.tsx`)
Last updated: 2026-08-07

| Property | Class |
| --- | --- |
| Background | `bg-card` (default) |
| Border | `border-border/60` |
| Border radius | default `Card` radius |
| Text — primary | `CardTitle` default (`text-sm font-semibold` scale) |
| Text — secondary | `CardDescription` default (`text-muted-foreground`) |
| Spacing | `CardHeader`/`CardContent` defaults; use `space-y-4` or `space-y-6` between stacked items inside `CardContent` |
| Hover state | n/a (static container); interactive rows inside use `hover:bg-muted/30` |
| Shadow | none — border-only, no shadow on dashboard cards (shadows are reserved for modals/popovers) |
| Accent usage | icon before `CardTitle` text, `h-4 w-4 text-primary` |

**Pattern notes:** This is the default building block for every dashboard content section — stat details, tables, timelines, lists. Every dashboard page should be composed of `PageContainer` > one or more `Card`s in this style. Do not use raw `<div className="border rounded-xl overflow-hidden">` sections with `text-[11px]`/`text-[10px]` arbitrary sizing — that was the old pattern (found in Academic Journey, Milestones, Mentor Feedback, Funding Overview, Opportunities, Documents, Announcements, Messages before this pass) and has been fully replaced with `Card`-based markup using standard `text-xs`/`text-sm` sizes.

### Component: MetricCard

File: `components/cards/metric-card.tsx`
Last updated: 2026-08-07

| Property | Class |
| --- | --- |
| Background | transparent (sits directly on page/section background) |
| Border | `border-t-2` (color driven by `className` prop — pass `border-border/60` for the standard soft look; the component's own default `border-foreground` is too heavy for repeated use) |
| Border radius | none (no side/bottom border, so no radius needed) |
| Text — primary (value) | `text-3xl font-semibold leading-none tracking-tight text-foreground` |
| Text — secondary (title) | `text-[10px] font-bold uppercase tracking-widest text-muted-foreground` |
| Spacing | `px-5 py-6` (built into the component) |
| Hover state | none |
| Shadow | none |
| Accent usage | optional leading icon, `h-4 w-4 text-muted-foreground` |

**Pattern notes:** Always pass `className="border-border/60"` when using `MetricCard` in a stat grid — never leave the component's default `border-foreground` (too visually heavy when repeated across 3-6 tiles). Used for dashboard summary rows (Admin Dashboard, Scholar Dashboard, Academic Journey, Milestones, Funding Overview). Prefer this over building a one-off `Card`-based stat tile — several Scholar pages previously reimplemented stat tiles as ad hoc bordered `div`s or `Card`s; all were converted to `MetricCard` in this pass.

### Component: Hero/Identity Card

File: `app/(scholar)/scholar/page.tsx`, `app/(scholar)/scholar/profile/page.tsx`, `app/(scholar)/scholar/progress-reports/page.tsx`
Last updated: 2026-08-07

| Property | Class |
| --- | --- |
| Background | `bg-gradient-to-br from-primary/8 via-background to-secondary/40` |
| Border | `border-border/60` (on the outer `Card`) |
| Border radius | default `Card` radius |
| Text — primary | `text-2xl font-semibold tracking-tight` |
| Text — secondary | `text-sm leading-6 text-muted-foreground` |
| Spacing | `p-6 md:p-8` on `CardContent` |
| Inset panels | `rounded-xl border bg-background/80 p-4` (translucent so the gradient shows through) |
| Shadow | none |
| Accent usage | `Badge` components for status/id tags, `Avatar` with `bg-primary/12 text-primary` fallback |

**Pattern notes:** This replaces the old hardcoded `bg-[linear-gradient(135deg,rgba(90,200,120,0.12),...)]` / `rgba(15,118,110,0.12)` gradients that used off-brand teal/green RGB values disconnected from `globals.css` tokens. Every hero-style card should use this exact token-driven gradient — do not hand-roll new `rgba()` gradients. **Still outstanding:** the Admin Dashboard hero (`app/(admin)/admin/page.tsx`) still uses the old hardcoded teal `rgba()` gradient — fix when the Admin section pass happens.

### Component: Badge (semantic usage convention)

File: `components/ui/badge.tsx` (component itself unchanged — this documents *which variant to use for which meaning*)
Last updated: 2026-08-07

| Meaning | Variant | Resolves to |
| --- | --- | --- |
| Positive / primary / pinned / "Strong" sentiment | `default` | `bg-primary text-primary-foreground` |
| Neutral / normal priority / secondary sentiment | `secondary` | `bg-secondary text-secondary-foreground` |
| High priority / attention / "Watch" sentiment | `destructive` | `bg-destructive/10 text-destructive` — **note: `--destructive` resolves to Energy Orange `#FF9A1A` in this theme, not red** |
| Category tag / metadata label | `outline` | `border-border text-foreground` |

**Pattern notes:** Replaced hardcoded `bg-emerald-100 text-emerald-800`, `bg-amber-100 text-amber-800`, `bg-slate-100 text-slate-700` badge classes across Scholar Dashboard and Mentor Feedback with these token-driven variants. **Do not use raw Tailwind color classes on badges** — always map meaning to one of the four variants above. `StatusBadge` (`components/ui/status-badge.tsx`) is a separate, more granular component for record statuses (draft/verified/rejected/etc.) — it still uses hardcoded Tailwind colors (`emerald-100`, `amber-100`, `sky-100`, etc.) internally rather than design tokens. It's shared across Admin/Donor/Scholar and was left as-is in this pass (out of Scholar-section scope) — **flagged for a future token-conversion pass**, likely during the Admin section work since that's its heaviest user (tables).

### Component: Chart color tokens (Donut / Bar / Line charts)

File: `components/donor/transparency-charts.tsx`, used from `app/(donor)/donor/**`, `app/(admin)/admin/page.tsx`
Last updated: 2026-08-07

| Property | Class/value |
| --- | --- |
| Categorical series colors | `var(--chart-1)` through `var(--chart-5)`, cycled by index — never hardcoded hex |
| Two-state good/bad signal | `var(--primary)` (good) / `var(--destructive)` (needs attention) |
| Line chart default accent | `var(--primary)` (component default — override with an explicit `var(--chart-N)` only for deliberate visual variety on a page with multiple charts) |
| Empty-state donut fill | `var(--muted)` |

**Pattern notes:** `GrowthLineChart`, `DonutBreakdownChart`, and `HorizontalBarChart` (`components/donor/transparency-charts.tsx`) take a `color`/`accent` prop as a raw CSS color string — always pass a `var(--chart-N)`/`var(--primary)`/`var(--destructive)` token, never a hex literal (`#0284c7`, `#d97706`, `#7c3aed`, etc. were all found and replaced across the Donor section). Also fixed two real bugs while in this file: the chart accent default and the empty-donut fallback were wrapped in `hsl(var(--...))`, but this theme's tokens are hex/oklch literals, not HSL triplets — `hsl(#162E20)` is invalid CSS. Both now reference the token directly (`var(--primary)`, `var(--muted)`) with no `hsl()` wrapper. Same rule applies to any future chart component: don't wrap token vars in a color function unless you know the token's own format matches.

### Component: Table status pill (page-local `get*StatusVariant` functions)

File: pattern used across `app/(admin)/admin/{content,funding,impact-reports,programs,sponsors,users}/page.tsx`
Last updated: 2026-08-07

**Pattern notes:** Several Admin pages had a page-local `getXStatusClass(status)` helper returning a hardcoded `bg-emerald-100 text-emerald-800` / `bg-amber-100 text-amber-800` / `bg-red-100 text-red-800` string, rendered via a raw `<span>` instead of the `Badge` component. All were converted to `getXStatusVariant(status)` helpers returning `"default" | "secondary" | "destructive" | "outline"` and rendered with `<Badge variant={...}>`, following the same semantic mapping as the Scholar-section Badge convention above (positive→`default`, neutral→`secondary`, needs-attention→`destructive`). If you add a new status-driven page, follow this pattern — a small local function that returns a `Badge` variant, not a className string. **Gotcha hit while doing this conversion:** several pages render the same status pill in two places (a card list AND a table) — when replacing one occurrence, grep the whole file for the old function name before deleting it, since a second call site with different indentation will silently survive a find-and-replace and break the build (caught and fixed in `impact-reports` and `users` pages).

### Component: ReviewWorkspace document/decision states

File: `components/admin/review-workspace.tsx`
Last updated: 2026-08-07

**Pattern notes:** This is the Admin section's most important page (application review) and previously had the heaviest concentration of hardcoded colors: document status icons/badges (`emerald-500`/`amber-500`/`red-500`), the "Approve Scholar" button (hardcoded `bg-emerald-600` override — actually redundant, since `variant="default"` already renders as the theme's primary color and works correctly in dark mode, unlike the hardcoded override), and the Verify/Reject document action buttons. All converted to `text-primary`/`text-muted-foreground`/`text-destructive` and `bg-primary/5`, `bg-destructive/5` etc. Same verified→primary, pending→muted, rejected→destructive mapping as elsewhere in the registry.

### Component: Notification/alert type color mapping (info/warning/success/error)

File: `app/(portal)/notifications/page.tsx`, `app/(portal)/dashboard/page.tsx`
Last updated: 2026-08-07

| Type | Icon/text color | Background tint |
| --- | --- | --- |
| `success` | `text-primary` | `bg-primary/5 border-primary/20` |
| `warning` | `text-accent` | `bg-accent/10 border-accent/30` |
| `error` | `text-destructive` | `bg-destructive/5 border-destructive/20` |
| `info` | `text-muted-foreground` | `bg-muted/40 border-border` |

**Pattern notes:** Replaced hardcoded `blue-500`/`amber-500`/`emerald-500`/`red-500` (and their `-50`/`dark:` background variants) used for the 4-state notification `type` field. This is a 4-way version of the semantic mapping used throughout the registry (positive→primary, attention/highlight→accent, needs-correction→destructive, neutral→muted) — use this exact table anywhere else a `notifications.type` value needs a color.

### ⚠️ Do not use `chart-N` tokens for fixed status/semantic meaning

**This bit us once already — read before reusing any `var(--chart-N)` / `bg-chart-N` outside an actual chart.** The `chart-1`..`chart-5` tokens intentionally rotate to *different hues in light vs. dark mode* (they exist to give multi-series charts visual variety, not to carry meaning) — e.g. `chart-5` is orange (`#FF9A1A`) in light mode but a dark charcoal (`#1F2937`) in dark mode. Using `chart-5` for something like an "active"/"in-progress" status dot works fine in light mode and then silently loses all its visual signal in dark mode (a near-invisible dark dot on a dark background). This actually happened during the Scholar and Applicant-portal passes (`scholar/page.tsx` and `scholar/opportunities/page.tsx` timeline dots, the notification "warning" icon/card) and was caught and fixed while doing the `StatusBadge` conversion below — all four were switched from `chart-5` to `accent` (`#C6F20A`, fixed in both modes).

- **Use `chart-1`..`chart-5`**: only for actual chart/graph series data (`DonutBreakdownChart`, `HorizontalBarChart`, `GrowthLineChart` `items`/`color`/`accent` props) — see the "Chart color tokens" entry above.
- **Use `primary`/`secondary`/`destructive`/`accent`/`muted`**: for anything that needs to mean the same thing in both themes — status dots, badges, icons, alert tints.

### Component: StatusBadge & ApplicationStatusBadge (token conversion)

File: `components/ui/status-badge.tsx`, `components/ui/application-status-badge.tsx`
Last updated: 2026-08-07

These were the last major hardcoded-color holdouts, deliberately left alone during the Scholar/Donor/Admin/Applicant passes because they're multi-state (19 and 7 statuses respectively) shared components used across every section's tables. Converted now to a **4-tone system**, reusing the same semantic tokens as everywhere else in this registry instead of inventing new colors per status:

| Tone | Meaning | Class recipe |
| --- | --- | --- |
| Positive | good/completed outcome | `bg-primary/10 text-primary dark:bg-primary/20` |
| Progress | in queue / not yet decided | `bg-secondary text-secondary-foreground` |
| Negative | needs correction / bad outcome | `bg-destructive/10 text-destructive dark:bg-destructive/20` |
| Dormant | inactive / not started / archived | `bg-muted text-muted-foreground` |

**`StatusBadge`** (`status-badge.tsx`) maps its 19 statuses into these 4 tones (e.g. `active`/`verified`/`approved`/`completed`/`graduated` → Positive; `pending`/`submitted`/`in-progress`/`upcoming`/`scheduled`/`processing` → Progress; `rejected`/`expiring`/`flagged`/`suspended` → Negative; `inactive`/`draft`/`archived`/`closed` → Dormant).

**`ApplicationStatusBadge`** (`application-status-badge.tsx`) reads as a single-direction pipeline (`draft → submitted → under_review → shortlisted → interview_stage → accepted`, plus terminal `rejected`): `draft`→Dormant, `submitted`/`under_review`→Progress, `shortlisted`/`interview_stage`→Positive (10% tint), `accepted`→Positive (full-strength `bg-primary text-primary-foreground`, since it's the pipeline's terminal win state and should stand out from the earlier positive-trending stages), `rejected`→Negative.

**Deliberate tradeoff, stated plainly:** the old version gave every status a unique hue (8-9 distinct colors) so adjacent pipeline stages were distinguishable by color alone at a glance in a table. The 4-tone system means `shortlisted` and `interview_stage` now render as the *same* tint (and `submitted`/`under_review` likewise) — differentiating them relies on reading the label text, not color. This was a conscious call: the old palette wasn't reproducible with this brand's actual token set (only `primary`/`secondary`/`destructive`/`accent`/`muted` are guaranteed stable across light and dark mode — see the `chart-N` warning above), so "9 unique but partly made-up colors" was traded for "fewer colors, but every one of them is an actual token and correct in both themes." If finer-grained visual differentiation between pipeline stages turns out to matter more than token-purity in practice, the next step would be proposing new semantic tokens to the design system rather than reaching for more hardcoded hex/Tailwind colors.

## Known remaining inconsistencies (not yet fixed)

- `components/admin/admin-status.tsx` (`AdminStatusBadge`/`adminStatusClass`): still hardcoded Tailwind colors, but confirmed unused anywhere in `app/` — dead code, not rendered, left alone. Fix or delete if it's ever wired up.

## Status: all four sections + shared status components complete (2026-08-07)

Scholar → Donor → Admin → Applicant portal have all been through the layout/UX polish pass described in this registry, and the two cross-cutting shared status components (`StatusBadge`, `ApplicationStatusBadge`) have been converted to design tokens. Every dashboard page across the app now uses the `Card`-based section pattern, `MetricCard` for stat tiles, the token-driven hero gradient, `Badge`/`StatusBadge` semantic tones, and `var(--chart-N)` reserved strictly for real chart data. Future UI work anywhere in the dashboards should read this file first and match what's already here — the `chart-N` warning above is the single most important gotcha to carry forward.
