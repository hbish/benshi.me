# Cloudflare Pages Migration

## What This Is

Migrate the personal website (benshi.me) from Vercel to Cloudflare Pages. The site is an Astro-based
static site generator with blog posts, notes, and webmention integration. This migration enables
consolidation with existing Cloudflare services and leverages Cloudflare's edge network for improved
performance.

## Core Value

**Site deploys successfully on Cloudflare Pages and is ready for DNS cutover.**

The deployment must work correctly with all existing functionality (RSS feeds, webmentions, theming)
preserved.

## Requirements

### Validated

<!-- Inferred from existing codebase -->

- ✓ Static site generation with Astro 5.1.3 — existing
- ✓ Standard build process (pnpm build → dist/) — existing
- ✓ Markdown-based content with Zod validation — existing
- ✓ Custom domain support (benshi.me) — existing
- ✓ RSS/JSON feed generation — existing
- ✓ Webmention.io integration — existing
- ✓ Theme system (light/dark/gruv variants) — existing
- ✓ Image optimization via Sharp — existing

### Active

<!-- Current scope. Building toward these. -->

- [ ] Configure Cloudflare Pages project for Astro build
- [ ] Set up build command (pnpm build) and output directory (dist/)
- [ ] Configure custom domain (benshi.me) on Cloudflare Pages
- [ ] Verify all site functionality works (feeds, webmentions, theming)
- [ ] Confirm build succeeds consistently

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- DNS cutover — keeping Vercel active as backup during validation period
- Vercel cleanup — will clean up after Cloudflare deployment is validated
- Cloudflare Analytics — add later if needed
- Cloudflare D1, KV, or other services — not needed for static site
- Build optimizations — current build is sufficient

## Context

**Current state:**

- Site deployed on Vercel with standard Astro configuration
- No vercel.json config file (plain deployment)
- No environment variables required
- No redirects configured on Vercel
- Domain: benshi.me

**Migration drivers:**

- **Consolidation:** Already using Cloudflare for DNS/other services
- **Features:** Access to Cloudflare-specific capabilities if needed later
- **Performance:** Cloudflare's global edge network

**Technical details from codebase map:**

- Build: `pnpm build` outputs to `dist/`
- Node.js: 22.12.0 (via .tool-versions)
- Package manager: pnpm
- Framework: Astro 5.1.3 with MDX support
- Image optimization: Sharp 0.32.1

## Constraints

None — no timing constraints, no downtime requirements, no hard technical limitations.

## Key Decisions

| Decision                                | Rationale                                              | Outcome   |
| --------------------------------------- | ------------------------------------------------------ | --------- |
| Keep Vercel active during migration     | Maintain backup while validating Cloudflare deployment | — Pending |
| Standard Astro build (no custom config) | Keep migration simple, leverage Astro defaults         | — Pending |
| No environment variables needed         | Site is fully static, no external service deps         | — Pending |

---

_Last updated: 2026-01-11 after initialization_
