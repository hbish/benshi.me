# Phase 4: Cloudflare Images Setup - Context

**Gathered:** 2026-01-12 **Status:** Ready for planning

<vision>
## How This Should Work

Instead of Cloudflare Images (the proprietary image service), I want to use Cloudflare R2 for object
storage with a Custom Domain CDN in front. R2 gives me S3-compatible storage with zero egress fees
when served through Cloudflare's network.

The workflow: drop photos in a folder, run a custom upload script, images go to R2 and get served
through my custom domain CDN. No per-GB costs — just storage.

</vision>

<essential>
## What Must Be Nailed

- **Cost efficiency** — Zero egress fees by serving R2 content through Cloudflare CDN
- **Custom domain CDN** — Images served at my own domain (e.g., images.benshi.me or similar)
- **Upload automation** — Custom Node.js script that uploads to R2 and generates metadata

</essential>

<boundaries>
## What's Out of Scope

- Full image optimization and variants — defer to Phase 7
- Advanced responsive images — defer to Phase 7
- Lazy loading — defer to Phase 7
- Lightbox functionality — defer to Phase 7
- Masonry grid UI — defer to Phase 6

This phase is about: uploads to R2 + basic thumbnail generation, serving via CDN.

</boundaries>

<specifics>
## Specific Ideas

- Custom upload script (not S3 CLI tools like awscli or rclone)
- Thumbnail generation during upload (basic — full optimization comes later)
- S3-compatible API for R2 means I have flexibility to change tools later

</specifics>

<notes>
## Additional Context

This is a pivot from the original plan which used Cloudflare Images (the proprietary service). R2 +
Custom Domain CDN offers better cost control (zero egress) and more flexibility since it's
S3-compatible.

The photos content collection schema already exists in `src/content/config.ts` — that work is done
and compatible with R2 (just storing image IDs/paths instead of Cloudflare Image IDs).

</notes>

---

_Phase: 04-cloudflare-images_ _Context gathered: 2026-01-12_
