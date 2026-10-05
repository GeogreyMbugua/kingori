<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules

- Architecture, dependency rules and strategies: `README.md`. Decisions and rationale: `docs/adr/`.
- Layer boundaries are enforced by ESLint. Do not weaken `ALLOWED_IMPORTS` without a new ADR.
- Never invent biography, projects, clients, awards or assets. Mark placeholders with `status: "placeholder"`.
- Server Components by default. Add `"use client"` only for hooks or browser APIs.
- No raw design values in components. Use tokens from `src/styles/tokens.css`.
- Compose with the design-system primitives (`Section`, `Grid`, typography, `Button`/`Link`, `ImageFrame`) before writing new CSS. Typography roles are `data-type` attributes (ADR 0007).
- No CSS frameworks, design libraries, animation libraries or new font families without a new ADR.
- `src/content/demo` is for `/design-system` only (lint-enforced). Never use it on real pages.
- Page composition rules: ADR 0014. Content model and launch guard: ADR 0013. Never weaken `assertLaunchReady`.
- Before finishing: `npm run check`, plus `npm run test:e2e` when routes or behaviour change.
