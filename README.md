# Kingori Website

Public-facing editorial and portfolio website for Kingori. The visual direction is art-directed and
editorial: oversized typography, strong compositions, isolated objects, photography, asymmetry,
layering and restrained motion.

> **Status: Phase 3 — page composition.** Every page is composed (ADR 0014) on top of the design
> system (Phase 2). Content runs on the final schemas with a clearly marked placeholder dataset and
> labelled image slots (ADR 0013). The build refuses to enable indexing while any placeholder
> remains. Browse primitives and content status at `/design-system` while running `npm run dev`.

## Technology stack

| Concern         | Choice                                                    |
| --------------- | --------------------------------------------------------- |
| Framework       | Next.js 16 (App Router, Turbopack, typed routes)          |
| UI runtime      | React 19 (Server Components by default)                   |
| Language        | TypeScript 5 (`strict`, `noUncheckedIndexedAccess`)       |
| Styling         | CSS Modules + CSS custom-property design tokens, layered  |
| Linting         | ESLint 9 flat config (`eslint-config-next`) + layer rules |
| Unit/integration| Vitest + React Testing Library + jsdom                    |
| End-to-end      | Playwright (mobile + desktop projects)                    |
| Accessibility   | `@axe-core/playwright` scans in e2e (ADR 0012)            |
| Fonts           | Bricolage Grotesque + Newsreader, self-hosted (ADR 0007)  |
| Package manager | npm (lockfile: `package-lock.json`)                       |
| Runtime         | Node.js 24 (see `.nvmrc`)                                 |

No CMS, database, auth, analytics, state library, animation library or CSS framework is used.
Each would require an explicit architectural decision (see `docs/adr/`).

## Installation

```bash
nvm use            # Node 24
npm install
cp .env.example .env.local
npx playwright install chromium   # only needed for e2e tests
```

### Environment variables

| Variable               | Purpose                                                           | Default                 |
| ---------------------- | ----------------------------------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for canonical/OG URLs, robots and sitemap        | `http://localhost:3000` |
| `SITE_ALLOW_INDEXING`  | `"true"` enables indexing; anything else emits noindex + disallow | `false`                 |
| `ENABLE_DESIGN_SYSTEM_PREVIEW` | `"true"` serves `/design-system` in production builds (always on in dev) | `false` |
| `STATIC_EXPORT`        | `"true"` builds static files to `out/` (no image optimiser)       | `false`                 |
| `NEXT_PUBLIC_BASE_PATH` | Sub-path the site is served under, e.g. `/kingori`               | `""`                    |

All are read at build time. Set `SITE_ALLOW_INDEXING=true` **only** for the production deployment.

### Preview deployment (GitHub Pages)

Every push to `main` runs `.github/workflows/pages.yml`: lint, typecheck and tests, then a static
export published to https://geogreymbugua.github.io/kingori/. It is a preview: indexing stays off,
so robots.txt and page metadata keep search engines out while placeholder content remains.

## Commands

| Command              | Description                                          |
| -------------------- | ---------------------------------------------------- |
| `npm run dev`        | Development server at http://localhost:3000          |
| `npm run build`      | Production build                                     |
| `npm run start`      | Serve the production build                           |
| `npm run lint`       | ESLint, including architectural boundary rules       |
| `npm run typecheck`  | Generate route types, then `tsc --noEmit`            |
| `npm test`           | Unit + integration tests (Vitest, single run)        |
| `npm run test:watch` | Vitest in watch mode                                 |
| `npm run test:e2e`   | Builds, serves on port 3100 and runs Playwright      |
| `npm run check`      | lint → typecheck → test → build (pre-merge gate)     |

## Project structure

```text
public/                     Static files served as-is (favicon, images/placeholders)
src/
├── app/                    Routing only: layouts, pages, metadata, robots, sitemap
│   ├── layout.tsx          Root layout: <html>, <body>, fonts, global CSS, root metadata
│   ├── not-found.tsx       Global 404 (renders the site shell)
│   ├── robots.ts           robots.txt, environment-gated
│   ├── sitemap.ts          sitemap.xml from navigation + content
│   ├── (site)/             Public site route group, shares the PageShell layout
│   │   ├── layout.tsx
│   │   ├── page.tsx        /
│   │   ├── about/          /about
│   │   ├── work/[slug]/    /work, /work/:slug
│   │   ├── media/[slug]/   /media, /media/:slug
│   │   └── contact/        /contact
│   └── (internal)/         Internal tooling, gated + noindex (ADR 0012)
│       └── design-system/  /design-system preview
├── assets/fonts/           Subset variable WOFF2 files + OFL licences (ADR 0007)
├── components/             Reusable, feature-agnostic visual primitives
│   ├── editorial/          IndexList, FigureSequence, Invitation (page-composition patterns)
│   ├── layout/             PageShell, Header, Footer, SkipLink, Grid/GridItem
│   ├── navigation/         PrimaryNav, NavLink (client)
│   ├── typography/         GiantTitle, DisplayHeading, Eyebrow, Text, EditorialQuote, Prose
│   ├── ui/                 Button, Link, Container, Section
│   ├── media/              MediaSlot, ImageFrame, ResponsiveImage, MediaPlaceholder, Video, AmbientVideo (client)
│   └── motion/             Reveal
├── features/               Page/domain compositions (home, about, work, media, contact, design-system)
├── content/                Typed editorial content (placeholder only)
│   └── demo/               Specimen copy for /design-system only (lint-isolated)
├── config/                 Application config: site identity, navigation, SEO defaults
├── lib/                    Framework-agnostic helpers: breakpoints, classnames, color, date, media, metadata, url
├── types/                  Shared contracts: content, media, navigation, site
└── styles/                 fonts.ts, tokens.css, typography.css, animations.css
tests/
├── unit/                   Pure functions and config
├── integration/            Components and routes rendered together
└── e2e/                    Real browser against the production build
docs/adr/                   Architecture decision records
```

Folders are created when their first real member exists. There is no `app/api` because no
endpoint exists yet.

## Architectural principles

1. **Routes are thin.** `page.tsx` handles params, metadata and `notFound()`, then renders one
   feature component.
2. **Strict layering, enforced by ESLint** (`no-restricted-imports` in `eslint.config.mjs`).
3. **Server Components by default.** `"use client"` only where browser APIs or hooks are needed.
   Today that is `NavLink` (`usePathname` for `aria-current`), `AmbientVideo` (playback and
   motion preference) and the preview-only `ContrastSample` (computed styles).
4. **Content is separate from presentation, and config is separate from content.**
5. **No raw design values in components.** Everything references semantic tokens in
   `src/styles/tokens.css`.
6. **No abstraction before a second use case.**

### Dependency rules

```text
app
 ↓
features ──→ content ──→ types
 ↓
components ──→ lib ──→ config ──→ types
```

| Layer        | May import from                                        |
| ------------ | ------------------------------------------------------ |
| `app`        | everything                                             |
| `features`   | own feature, `components`, `content`, `lib`, `types`   |
| `components` | `components`, `lib`, `types`                           |
| `lib`        | `lib`, `config`, `types`                               |
| `content`    | `content`, `types`                                     |
| `config`     | `config`, `types`                                      |
| `types`      | `types` (and type-only imports from `next`)            |

These must never happen, and lint fails if they do:

- `components` importing `features`, `content`, `config` or `app`. Components receive data via props.
- A feature importing another feature. Shared UI goes to `components`, shared data to `content`.
- `content`/`config`/`types` importing UI or helpers.
- Anything except `features/design-system` and `app/(internal)` importing `@/content/demo`.
- Parent-relative imports (`../`). Cross-folder imports use the `@/` alias so rules stay checkable.

## Content strategy

- Editorial content lives in `src/content/*.ts` as typed TypeScript modules (contracts in
  `src/types/content.ts`). Content is version-controlled, type-checked and statically rendered.
- Every content object carries `status: "placeholder" | "final"`. Missing images are
  `{ kind: "pending", description }` slots that render as labelled placeholders (ADR 0013).
- **No real biography, projects, clients, awards or media are invented.** A development dataset
  (three projects, three media items) exercises every page shape. Its copy describes what belongs
  in each field and makes no claims. Replace entries one by one, setting `status: "final"`.
- **Launch guard:** `SITE_ALLOW_INDEXING=true` fails the build while any placeholder or pending
  asset remains. `/design-system` lists what is outstanding.
- Detail routes prerender only known slugs (`dynamicParams = false`); everything else returns 404.
- `config/` is not editorial. It holds site identity, navigation and SEO defaults.
- Content is read through small selectors (`getProjectBySlug`), so the source can later move to
  MDX or a CMS without touching features.

## Asset strategy

Assets are added to `public/` as they arrive, using this layout:

```text
public/
├── images/{people,projects,editorial,objects,placeholders}/
├── video/
├── icons/
└── textures/
```

- **Images.** Render through `components/media/ImageFrame` (art-directed crops, captions) or
  `ResponsiveImage` (both wrap `next/image`). Art-direction rules are in
  [ADR 0011](docs/adr/0011-media-art-direction.md). Both require an `ImageAsset` with intrinsic `width`/`height` (no layout shift) and either `alt` text or
  an explicit `decorative: true`. Blank alt on an informative image throws.
- **`sizes`.** Build with `buildSizes()` from `lib/media` so it matches the project breakpoints.
- **Loading.** Images lazy-load by default. Only the above-the-fold LCP image sets `preload`.
- **Formats.** next/image serves AVIF then WebP. Supply high-quality source files (≥ 2× the
  largest rendered width). Transparent cutouts must be PNG or WebP with alpha.
- **Video.** `VideoAsset` requires a poster, a text description and ordered sources (WebM/MP4).
  Captions (`.vtt`) are required for meaningful audio. Self-hosted video goes in `public/video/`.
- **Fonts.** Loaded with `next/font/local` from `src/assets/fonts/` (`src/styles/fonts.ts`), not
  `public/fonts/`. They are self-hosted with metric-adjusted fallbacks and no layout shift.

## Colour system

Dark-first brand palette (full rationale and contrast table in
[ADR 0006](docs/adr/0006-brand-colour-palette.md)).

| Role                  | Brand colour   | HEX       | Semantic token               |
| --------------------- | -------------- | --------- | ---------------------------- |
| Primary background    | Deep Navy      | `#000030` | `--color-background`         |
| Secondary dark surface| Midnight Navy  | `#101040` | `--color-surface`            |
| Supporting graphic    | Muted Purple   | `#302050` | `--color-surface-raised`     |
| Structural accent     | Blue           | `#003090` | `--color-surface-structural`, `--color-border` |
| Editorial accent      | Hot Pink       | `#C03070` | `--color-accent` (+ `-hover`, `-active`, `-subtle`, `-contrast`, `-text`) |
| Energy / emphasis     | Coral Red      | `#E05050` | `--color-emphasis`           |
| Warm accent           | Orange         | `#F07040` | `--color-warm`, `--color-focus-ring` |
| Primary light text    | Soft White     | `#F0F0F0` | `--color-text`               |
| Secondary light text  | Lavender White | `#E8E8F0` | `--color-text-secondary`     |

Rules:

- Components use `--color-*` tokens only, never `--brand-*` or HEX.
- `--color-accent` (hot pink) is for display type, graphics and indicators. Use
  `--color-accent-text` for pink body text or links.
- Wrap light editorial sections in `data-surface="inverse"`. All semantic tokens remap
  automatically. Blue structural blocks inside them need `data-surface="default"`.
- No gradients. Colour is composed as flat fields: navy grounds, one dominant accent per
  composition, and warm accents used sparingly for emphasis.
- Every contract is verified by `tests/unit/styles/contrast.test.ts`.

## Design system

Tokens live in `src/styles/tokens.css`. Components reference semantic tokens only. Browse
everything at `/design-system` (dev, or a production build with `ENABLE_DESIGN_SYSTEM_PREVIEW=true`).

| Area        | What exists                                                                  | Decision |
| ----------- | ---------------------------------------------------------------------------- | -------- |
| Colour      | Brand primitives, semantic tokens, accent family, status, inverse surface     | ADR 0006 |
| Typography  | Bricolage Grotesque + Newsreader; 13 `data-type` roles; fluid `clamp()` scale | ADR 0007 |
| Layout      | Spacing scale, section rhythm, containers, 4/8/12 grid (`Grid`, `GridItem`)    | ADR 0008 |
| Motion      | 3 durations, 3 easings, CSS-only `Reveal`, global reduced-motion override     | ADR 0009 |
| Navigation  | Always-visible nav, no menu button                                           | ADR 0010 |
| Media       | `ImageFrame` ratios + focal points, `MediaPlaceholder`, `Video`               | ADR 0011 |

Component usage:

- **Headings:** `GiantTitle` (one oversized word or phrase, can be `decorative`),
  `DisplayHeading` (explicit `as` level, `display` or `heading-xl` size), bare `h1`–`h3` for
  everything else. Wrap a word in `<em>` for the serif-italic accent.
- **Text:** `Text` (`body-lg`, `body`, `body-sm`, `caption`, `meta`), `Eyebrow`, `EditorialQuote`,
  `Prose` for long-form flow.
- **Actions:** `Button` (`primary` once per view, `secondary`, `quiet`) for actions; `Link`
  (`inline`, `cta`, `nav`) for navigation. External links open in the same tab.
- **Structure:** `Section` (width, spacing, surface, label) wrapping `Grid`/`GridItem`.

## Responsive strategy

Mobile-first. Base styles target the smallest screen. Larger layouts are added with `min-width`
queries. Each tier gets its own composition rather than a scaled-down desktop layout.

| Tier          | Query               | ≈ px at 16px | Grid columns |
| ------------- | ------------------- | ------------ | ------------ |
| Mobile        | base (no query)     | < 768        | 4            |
| Tablet        | `(min-width: 48em)` | ≥ 768        | 8            |
| Desktop       | `(min-width: 64em)` | ≥ 1024       | 12           |
| Large desktop | `(min-width: 90em)` | ≥ 1440       | 12           |

- Breakpoints use `em`, so layouts adapt when users enlarge their default font size.
- `src/lib/breakpoints.ts` is the source of truth. CSS can't read custom properties in media
  queries, so stylesheets use literal values, and `tests/unit/styles/breakpoints.test.ts` fails if
  any stylesheet uses a breakpoint not defined there.
- Typography and spacing are fluid (`clamp()` with a `rem` floor), so most scaling happens without
  breakpoints. Breakpoints are for composition changes.

## Accessibility baseline

- Semantic landmarks: `header`/`nav[aria-label="Primary"]`/`main`/`footer`. `<html lang>` comes
  from config.
- The skip link is the first tab stop and moves focus to `<main>`.
- Visible `:focus-visible` ring from tokens on every interactive element.
- One `h1` per page (asserted in tests). Headings descend without skipping levels.
- `aria-current="page"` on the current nav item and `"true"` on its parent section.
- Type-enforced alt text strategy (see Asset strategy).
- `prefers-reduced-motion` zeroes motion tokens and neutralises animations globally.
- Colour contracts (AAA body text, AA secondary text, 3:1 for indicators) are test-enforced.
- Interactive elements are native `<a>`/`<button>`. No click handlers on non-interactive elements.
- Touch targets are at least 44×44px for buttons, CTA and nav links.
- Ambient video never autoplays under reduced motion and always has a pause control.
- Automated axe scans (WCAG 2.2 AA) run on every route and the preview, on mobile and desktop.
  Further e2e checks cover 320px reflow, touch targets and visible focus (ADR 0012). Manual
  screen-reader review is still required before launch.

## SEO baseline

- Root metadata (`lib/metadata#createRootMetadata`): `metadataBase`, title template, description,
  Open Graph defaults and environment-gated `robots`.
- Pages use `createPageMetadata({ title, description, path })`, which sets an absolute canonical URL
  and re-applies the shared Open Graph fields, because Next.js merges metadata shallowly.
- `robots.txt` disallows everything unless `SITE_ALLOW_INDEXING=true`.
- `sitemap.xml` is generated from primary navigation plus all content slugs.
- SEO copy is placeholder (`config/seo.ts`).

## Architecture decisions

See [`docs/adr/`](docs/adr/) for the reasoning behind routing, layering, styling, content and
testing choices.
