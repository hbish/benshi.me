# External Integrations

**Analysis Date:** 2026-01-11

## APIs & External Services

**Webmentions:**

- webmention.io - Social interactions and comments
  - SDK/Client: Custom fetch in `src/components/WebmentionFeed.astro`,
    `src/components/WebmentionCount.astro`
  - Auth: None required (public API)
  - Endpoints used: `https://webmention.io/api/mentions.jf2`
  - Files: `src/components/WebmentionFeed.astro`, `src/components/WebmentionCount.astro`,
    `src/components/CommentCTA.astro`

## Data Storage

**Databases:**

- Not detected - All content is file-based

**File Storage:**

- Local filesystem - All assets in `src/assets/` and `src/public/`
  - Images optimized via Sharp during build
  - No external CDN

**Caching:**

- Not detected

## Authentication & Identity

**Auth Provider:**

- Not detected - No authentication required

**OAuth Integrations:**

- None

## Monitoring & Observability

**Error Tracking:**

- None

**Analytics:**

- None detected (no Google Analytics, etc.)

**Logs:**

- Console output during build only

## CI/CD & Deployment

**Hosting:**

- Not configured - Static site can be deployed anywhere
  - Deployment target: User's choice (Vercel, Netlify, GitHub Pages, etc.)
  - Build output: `dist/` directory

**CI Pipeline:**

- Not detected - No GitHub Actions or other CI configured
  - Pre-commit hooks only via Husky

## Environment Configuration

**Development:**

- Required env vars: None
- Secrets location: Not applicable
- Mock/stub services: None needed

**Staging:**

- Not applicable - No separate environments

**Production:**

- Secrets management: Not applicable
- No environment-specific configuration

## Webhooks & Callbacks

**Incoming:**

- None

**Outgoing:**

- None - Webmentions are client-side fetch only

## Feed Generation

**RSS Feed:**

- `src/pages/rss.xml.js` - RSS endpoint
- `scripts/validate-rss.js` - RSS validation script
- Dependencies: `@astrojs/rss`, `rss-parser`, `fast-xml-parser`

**JSON Feed:**

- `src/pages/feed.json.js` - JSON Feed endpoint
- `scripts/validate-json-feed.js` - JSON Feed validation

## Content Sources

**Local File-Based Content Management:**

- `src/content/posts/` - Blog posts (organized by year)
- `src/content/notes/` - Short notes (organized by year)
- `src/content/pages/` - Static pages
- Schema: Zod-validated frontmatter defined in `src/content/config.ts`

---

_Integration audit: 2026-01-11_ _Update when adding/removing external services_
