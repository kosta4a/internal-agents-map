# Plan 013: Add company pages within the existing design

> Implementation authorized and completed on 2026-09-17. User subsequently
> authorized committing and pushing the implementation branch. No merge requested.
> Design fidelity is a completion gate, not optional polish.

## Status and baseline

- Priority P2; effort M; risk medium (publication contracts and visual regressions).
- Category: navigation and derived content.
- Planned on 2026-09-17 at `4e06083`, branch
  `codex/plan-012-agents-infrastructure`, worktree
  `/Users/nikola/dev/steel/internal-agents-map-plan-012`.
- Depends on Plan 012 and the user's subsequent UI removals. The original `main`
  checkout still has 40 records; it is not the implementation baseline.
- Current catalog: 56 records, 35 organizations; 22 organizations have one record.
- Pending, intentional edits in `CatalogDirectory.astro`, `agents/[id].astro`,
  `directory.ts`, `components.css`, and the collections/entry-page E2E tests remove
  redundant headings/navigation. Preserve these changes even if still uncommitted.
- First run `git status --short` and
  `git diff --stat 4e06083 -- src scripts tests routing-manifest.json plans`.
  Reconcile against this baseline; do not reset pending edits or start from old main.

## Why this matters

Company pages connect an organization's agent and infrastructure records without
making those records equivalent. A reader can click Airbnb in a record's Company
field to find Datako, Pascal and AirChat together. The page is a small, derived
index of existing research, not a new company profile or a separate destination
in the main navigation.

## Product contract

- Generate `/organizations/<company.id>` for each company referenced by a record.
  Use the existing stable company ID, never a slug derived from its display name.
- Link the Company value on every agent/infrastructure detail page to that URL.
  Keep the label `Company`; make only its value a normal text link.
- No Organizations menu item, organization directory/index, collection tabs,
  filter row, local search box, breadcrumb/type line, or new navigation strip.
- No new company cards/results in the command palette in this version. Existing
  company-name searches continue finding records; the shared global palette remains.
- Include company name, existing logo, and official website from the registry.
  Then list Agents and Infrastructure separately, omitting each empty section.
- A one-record organization still gets a real page, with one populated section.
  An infrastructure-only organization gets only Infrastructure, not an empty Agents
  heading or explanatory notice. Unreferenced registry entries get no route.
- Show only authored relationships between this company's records in an optional
  `Connections` section. Omit it if none exist. No same-company dependency inference.
- Pages derive from existing data; no authored biographies, promotional summaries,
  rankings, maturity scores, combined autonomy rating, or aggregate outcome metrics.
- Keep all current detail URLs and their HTML/Markdown/JSON representations intact.

## Design is the primary acceptance criterion

The executor must reuse the current design, not interpret this feature as a redesign.
`DESIGN.md` states:

> Use ABC Areal on every page. Default sizes: 20px titles, 16px headings, 14px body
> and controls, 12px metadata. Use regular (400) and medium (500) weights; inherit
> existing responsive overrides.

> Reuse the centered 684px content column, sticky header, sidebar, and desktop
> table of contents. Follow the shared mobile layout with 24px page padding.

> Keep catalog previews unboxed and fully clickable: title, muted summary, and
> rounded 14px tags. Keep search in the floating bottom pill.

Apply these constraints explicitly:

1. Use `SiteLayout` unchanged with no selected menu item (`current` omitted/null).
   Keep shared header, sidebar, footer, contribution invite and global search.
2. White background; existing Radix Sand tokens. Primary text Sand 12, secondary
   Sand 10, panels Sand 3, fine table rules Sand 6. No brand-colored backgrounds,
   gradients, banners, decorative illustrations, new fonts or custom icon sets.
3. Compact header: existing 40px logo treatment, one 20px H1 containing the company
   name, then a quiet website text link with the existing external-link icon.
   Do not repeat the company in a subtitle, add a stats strip, or enlarge the logo
   into a hero. Wordmark logos remain decorative beside the textual H1.
4. Reuse `AgentCard` for record previews, including its unboxed appearance, summary,
   tags, and full-card click target. Do not introduce boxed tiles, a grid, or a
   second card design. Keep existing card wording for the first version.
5. Use ordinary 16px H2 section headings, `Agents` and `Infrastructure`, only above
   populated groups. These headings distinguish records on company pages; do not
   restore the removed Agents heading on the main catalog.
6. Connections, when present, use the existing soft Sand related-links panel with
   14–16px corners. A compact list of explicit relationships is sufficient; no
   diagram, graph visualization, badges or invented company architecture narrative.
7. Use existing spacing: 8–16px inside components and 24–40px between groups.
   Do not alter global heading, card, sidebar, or page-shell spacing to fit this page.
8. Search stays the shared bottom-center floating pill. No company-scoped search,
   no inline/middle-of-page search, and no second launcher. Preserve Cmd+K reopen,
   focus handling, reduced motion and mobile clearance.
9. The existing table-of-contents logic can list populated sections on desktop;
   it already hides itself with fewer than two headings. Do not create another
   local menu or force it visible for one-section pages.
10. Preserve the user's recent removals everywhere: `.collection-nav`, `#search-all`,
    the main-list Agents H2, and the record header `Agents / Agent` paragraph.
    Keep Agentation disabled by default; it requires `ENABLE_ANNOTATIONS=1`.

Text wireframe, using the existing page shell (not a new design):

```text
[existing company logo]
Airbnb                         ← existing H1 scale
airbnb.com ↗                   ← quiet website link

Agents
[existing Datako preview]
[existing Pascal preview]

Infrastructure
[existing AirChat preview]

Connections                    ← only authored relations, if any
[existing related-link panel treatment]

[existing contribution invite and footer]
                    [existing floating search]
```

## Current implementation and reusable patterns

- `src/lib/catalog.ts`: normalized companies and approaches; each approach has
  `company_id` and derived `catalog_section`. Keep data schema 7 unchanged.
- `src/lib/companies.ts`: `requireCompany(catalog, id)` throws for an unknown ID;
  `companyView` supplies ID/name/logo/monogram. Use the registry's homepage directly;
  do not scrape one or extend authored YAML for this feature.
- `src/components/CompanyLogo.astro`: decorative image/monogram with a `size` prop.
- `src/components/AgentCard.astro`: accepts a `DirectoryCard`, links its H3 to
  `card.path`, shows `card.excerpt` and tags. Reuse without nested company links.
- `src/lib/entry-view.ts`: `directoryCards(catalog)` and typed relationship views.
  Use company IDs to select records. Authored relationships identify direction;
  inverse display labels are not additional relationships.
- `src/pages/agents/[id].astro`, current Company field:

  ```astro
  <div>
    <dt>Company</dt>
    <dd>{entry.company}</dd>
  </div>
  ```

  Replace only the DD content with a link using the company route helper and
  `entry.companyView.id`. Do not wrap the entire card/logo/header in another link.
- `src/lib/routes.ts`: `publicationRoutes(catalog, extraPaths)` currently assembles
  home + entry paths + guides/notes; `publicationRoute` requires HTML and Markdown.
  Extend this central inventory for organization paths exactly once.
- `src/pages/agents/[id].md.ts`: `getStaticPaths` plus a Markdown serializer and
  `Content-Type: text/markdown`; follow this for organization Markdown.
- `src/lib/metadata.ts`: reuse canonical URLs, `webPageNode` and `structuredData`.
  The existing publisher is Steel, not the featured company; do not replace it.
- `src/pages/sitemap.xml.ts` derives from the publication inventory. It intentionally
  has no fabricated lastmod dates. Preserve that behavior.
- `scripts/check_site.py`: `DIRECTORIES` currently allows `_astro`, `fonts`, `notes`,
  `agents`, `logos`; explicitly add `organizations`, retaining strict file checks.
- `src/scripts/contents.ts` discovers section IDs automatically; fewer than two
  sections hides the rail. `SiteLayout` already supplies a global floating launcher
  for pages other than the two collection indexes.

## Scope

Allowed implementation files:

- New `src/lib/organization-view.ts`, `src/pages/organizations/[id].astro`,
  `src/pages/organizations/[id].md.ts`.
- `src/lib/companies.ts`, `src/lib/routes.ts`, `src/lib/exports.ts` and
  `src/pages/agents/[id].astro` for derived view/link/export integration.
- `src/pages/llms.txt.ts` to describe the new Markdown pages using company names.
- `src/styles/components.css` only for small organization-scoped spacing rules if
  existing classes cannot express the layout; do not change shared selectors.
- `scripts/check_site.py`, generated `routing-manifest.json`, and relevant route,
  company/view/export/discovery/artifact tests; new organization unit/E2E tests.
- `docs/site.md` for route/maintenance documentation and `plans/` for review results.

Out of scope: company/agent YAML, source archives, catalog schema changes, new
research, new dependencies, public logo/font assets, token/layout stylesheets,
sidebar/menu changes, palette result groups, directory redesign, and deployments.
Do not modify DESIGN.md to justify a visual deviation. New organization JSON APIs
and an `/organizations` index are not needed.

## Implementation steps

### 1. Derive the view and routes

Create one shared organization view: resolved registry company, official homepage,
stable path, cards grouped by `catalog_section`, and deduplicated authored
relationships whose endpoints both belong to this company. Deterministic order
should follow the existing catalog sort. Count an agent family as one record.

Use existing type labels for structural type. Relationship labels should retain
meaning: `Built on`, `Component of`, `Related implementation`; do not relabel
related-to as uses. Link each endpoint to its detail page, where evidence lives.
Deduplicate duplicate representations of the same relationship without inventing
reverse dependencies. Harvey SOC/Spectre must never become built-on by proximity.

Add `organizationPath(companyId)` and referenced-company publication paths to
`routes.ts`. Validate safe IDs and unique paths. Unknown company IDs should fail
view construction; unknown public slugs should be 404, never an empty company page.
Do not add the same paths again through `contentPaths()`.

Verify: focused Vitest company/view/route tests pass; fixtures demonstrate Airbnb
(2 agents,1 infrastructure), Harvey (separate related systems), Stripe (one agent),
and Databricks (one infrastructure, no Agents section). Catalog membership is not
hard-coded in production logic.

### 2. Render the page and Company link

Implement the compact layout specified above using the shared view, existing
SiteLayout/CompanyLogo/AgentCard and related-panel classes. Static HTML must contain
all links and records without JavaScript. Add the Company-field link on every
record page. Preserve other header metadata and existing back links.

Before expanding tests, capture the existing page styles and the new Airbnb page
at desktop and mobile sizes and visually compare. If the company page needs new
shared styles, first seek an existing component; avoid broad styling changes.

Verify: `npm run check` exits 0; local Airbnb Company link reaches the new page;
no menu/nav/search/breadcrumb regressions; no overflow at 390px width.

### 3. Complete publication and Markdown parity

Create matching organization Markdown using the same view: name, homepage,
nonempty groups with record names/summaries/links, and the same relationships.
It is an index; do not duplicate full record claims or their research ledgers.
Link the Company in individual record Markdown too, without dropping metadata.

Use the existing routing manifest and canonical/Markdown alternate mechanisms.
Add organization directory allowance and organization route/membership checks to
`check_site.py`, rather than weakening artifact validation. Sitemap includes each
organization once; llms.txt exposes the organization Markdown URLs using real
registry names (e.g. Airbnb, not slug-derived branding). No schema version bump.
Existing content negotiation and `.html` redirects should work via the manifest;
verify rather than adding a second routing mechanism.

Verify: `npm run build` and `uv run --locked python scripts/check_site.py --root dist`
exit 0. With the unchanged current dataset, inventory increases from 68 to 103
canonical routes (35 organization pages). Treat these as baseline checks, not
hard-coded production totals. Every new route has both HTML and Markdown.

### 4. Verify function and design, then record the result

Unit tests should verify grouping, referenced-company selection, empty sections,
unknown IDs, stable URLs, relationship scope/direction/deduplication, and HTML/MD
view parity. Follow `tests/web/routes.test.ts` and existing exports/company tests.
Artifact tests must catch omitted company pages and unrelated records on a page.

Add focused `tests/e2e/organizations.spec.ts`: Company link from Datako; Airbnb
membership and group headings; Harvey no invented dependency; Stripe/Databricks
single-section cases; missing slug; no Organizations menu entry; functioning
record links; no-JS browsing. Verify canonical, Markdown alternate and sitemap
coverage using the current publication test conventions.

Design review is required at 1280×900 and 390×844 for Airbnb, Harvey, Stripe,
Databricks, and one long company/record name. Also compare the existing Agents
index and a record page before/after. Inspect actual screenshots, not just test
pass counts. Record screenshot paths and observations in the completion section.
Check Areal type/scale, white/Sand palette, 684px maximum column, 24px mobile page
padding, unboxed previews, matching spacing, long-text wrapping, keyboard focus,
reduced motion, and exactly one bottom search launcher. At both widths test
Cmd+K open/close/reopen and navigate record → company → another record.

Run `npm run verify` to completion. Fix relevant failures; do not weaken existing
assertions or claim live production verification. Update index only after review.

## Commands

- Dependencies only if missing: `npm ci` and `uv sync --locked` (existing lockfiles).
- Typecheck: `npm run check` → exit 0.
- Focused unit tests: `npx vitest run tests/web/organizations.test.ts tests/web/routes.test.ts tests/web/exports.test.ts`
  → all pass (create the named organization test file).
- Build: `npm run build` → route artifacts generated; no missing Markdown files.
- Artifact check: `uv run --locked python scripts/check_site.py --root dist` → exit 0.
- Focused browser tests after build: `npx playwright test tests/e2e/organizations.spec.ts`
  → all applicable projects pass, only established project skips.
- Final gate: `npm run verify` → generated-data, coverage, archive, Astro/TypeScript,
  unit, build/artifact, Python, Ruff, privacy, local-link, browser and diff checks pass.
- Final diff: `git diff --check` → no output. Do not claim tests were run during planning.

## Done criteria and review order

1. Design review passes every constraint above. A working but visually inconsistent
   page is unfinished, even if all automated tests pass.
2. Every referenced company has one generated page; every record Company value
   links to it. No new main-menu destination or organization index was introduced.
3. Both collections are represented accurately; empty groups hidden, no inferred
   dependencies, no new company claims, no outcomes aggregated across records.
4. Existing card interactions/search/layout and all explicit UI removals survive.
5. HTML/Markdown/discovery/manifest/artifact validation agree; old URLs/exports work.
6. Full verify passes; completion notes contain visual evidence and known limits.
7. Only authorized scope changed, with pre-existing pending edits preserved.

## Git, stop conditions and maintenance

Implement on top of the reviewed Plan 012 work plus the pending user removals.
If using a fresh isolated worktree, carry that exact pending baseline across before
starting; do not silently drop it. Do not merge/push/deploy without authorization.
Local commit messages follow the repository's descriptive style, e.g.
`Add company pages linked from record metadata`.

Stop the affected step and report if IDs do not resolve, relationships require new
source attribution, publication requires an undocumented export-contract change,
or the requested layout cannot reuse the existing design without altering shared
styles. Ordinary route/test integration is expected and should be handled directly.

Future records should appear automatically through company_id; renamed display
names must not change URLs. New registry-only companies should not create empty
pages. The decision in Plan 007 to defer company hubs is superseded only by this
small derived-page scope. Rich company profiles, a company directory, dashboard
statistics, and extra palette groups remain deferred.

## Completion record

APPROVED on 2026-09-17. Generated 35 organization pages with matching Markdown;
all 56 record Company fields link to them. Membership uses existing company IDs,
empty groups are omitted, and authored relationships retain their meaning.
Publication inventory now holds 103 canonical routes; build emits 104 HTML pages
including the 404 page. No data/schema/source-archive changes were required.

Executor and independent reviewer full `npm run verify` runs both passed:
162 Vitest, 14 negotiation, 204 Python and 540 browser tests, with 48 expected
browser-project skips. Data/coverage/archive, Astro/TypeScript, artifact parity,
Ruff, privacy, local-link and whitespace checks passed. Independent full log:
`/tmp/company-independent-verify.log`.

Desktop 1280×900 and mobile 390×844 visual review covered Airbnb, Harvey, Stripe,
Databricks and Y Combinator plus the existing directory and Datako page.
Screenshots: `/tmp/company-pages-before/`, `/tmp/company-pages-after/` and
`/tmp/company-pages-viewport/`. Review corrected inherited record-section margins
inside catalog previews and made relationship rows compact and wrapping. Final
review confirmed existing Areal typography, 684px desktop column, 24px mobile
padding, unboxed previews, one fixed search launcher and no overflow. Keyboard,
reduced-motion and repeated Cmd+K checks passed. The removed navigation row,
search-all link, directory Agents heading and record breadcrumb remain absent.

All 326 baseline research, archive, logo, design-token/layout and DESIGN.md files
remained byte-identical. Original data and record URLs remain intact. This is not
a security, dependency or performance audit. Commit/push is separately authorized;
this completion record does not claim merge or production deployment.
