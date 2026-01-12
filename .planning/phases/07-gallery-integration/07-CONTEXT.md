# Phase 7: Gallery Integration - Context

**Gathered:** 2026-01-12 **Status:** Ready for planning

<vision>
## How This Should Work

The album pages should feel consistent with the blog — same centered, readable layout. When you land
on an album, it loads fast and the images fill in smoothly as you scroll. No jarring replacements,
no layout jumping.

The album detail page should be a 60% width container (like blog posts) with photos in a 2-column
grid. Images have skeleton placeholders while loading, then fade in smoothly.

No lightbox — clicking an image opens it directly on the CDN.

</vision>

<essential>
## What Must Be Nailed

- **No layout shift** — The grid must stay stable as images load. Skeletons reserve the right space.
- **Fast initial paint** — Page should be interactive quickly, images fill in progressively.
- **Consistency with blog** — Album pages should feel like they belong with the blog (same Container
  patterns, similar proportions).

</essential>

<boundaries>
## What's Out of Scope

- **No lightbox** — Images link directly to CDN, no modal viewer
- **No pagination** — All photos on one page, even for large albums
- **No image optimization** — Using Cloudflare Images as-is, no custom compression/format logic

</boundaries>

<specifics>
## Specific Ideas

- **Layout**: 60% width container for album detail (matching blog post `max-w-[85%]` feel), 2-column
  grid for photos
- **Loading**: Skeleton placeholder (gray box) while image loads, then smooth fade-in
- **Consistency**: Both album index and album detail should match blog page patterns
- **Inspiration**: https://anirudh.fi/photos/vietnam-winter-2025/ — simple, clean presentation

</specifics>

<notes>
## Additional Context

User emphasized performance — the page should load quickly with images filling in progressively. The
inspiration site shows a clean vertical flow, but we're adapting it to a 2-column grid within a
narrow container.

Key differentiator from Phase 6 is polish — not just functional, but feels intentional and smooth.

</notes>

---

_Phase: 07-gallery-integration_ _Context gathered: 2026-01-12_
