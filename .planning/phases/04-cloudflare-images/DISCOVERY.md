# Phase 4 Discovery: Cloudflare Images Setup

**Date:** 2026-01-12 **Phase:** 04-cloudflare-images **Discovery Level:** Standard Research
(external API integration)

## Research Question

How do we integrate Cloudflare Images with an Astro static site for photo gallery functionality?

## Cloudflare Images API Overview

### Upload Methods

| Method                 | Description                     | Best For                             |
| ---------------------- | ------------------------------- | ------------------------------------ |
| Dashboard              | Manual upload via Cloudflare UI | Initial testing, one-off images      |
| URL Upload             | POST with image URL             | Migrating from existing CDN          |
| Direct Upload          | Multipart/form-data POST        | Scripted bulk uploads                |
| Direct Upload URL (v2) | Pre-signed URL                  | Client-side uploads without API keys |

### Key API Endpoints

**Upload via URL:**

```
POST https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v1
Headers: Authorization: Bearer {API_TOKEN}
Body: url={image_url}, requireSignedURLs={boolean}
```

**Upload via File (multipart):**

```
POST https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v1
Headers: Authorization: Bearer {API_TOKEN}
Body: file={binary_data}
```

**List Images:**

```
GET https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v1
```

### Image Constraints

- Max file size: 10 MB
- Max dimension: 12,000 pixels
- Max area: 100 megapixels
- Supported formats: PNG, GIF, JPEG, WebP, SVG, HEIC

### Image Serving

Once uploaded, images are served at:

```
https://{account_id}.cf-ipfs.com/{image_id}
// or with custom domain
https://{custom_domain}/cdn-cgi/imagedelivery/{account_id}/{image_id}/{variant}
```

## Integration Approach for Astro

### Recommended Strategy

1. **Content Collection Model**
   - Create `src/content/photos/` collection with Zod schema
   - Store Cloudflare Image IDs and metadata in frontmatter
   - Use Astro's build-time data fetching

2. **Upload Workflow**
   - Initial setup: Script to upload sample images via API
   - Store returned image IDs in content files
   - No runtime API calls (static site)

3. **Image Serving**
   - Use Cloudflare Images CDN URLs directly in markup
   - Optionally create variants for responsive sizes

### Data Structure

```typescript
// Photo entry structure
{
  id: 'cloudflare-image-id',
  title: 'Photo title',
  description: 'Description',
  collection: 'album-name',
  tags: ['tag1', 'tag2'],
  uploadedAt: Date,
  width: number,
  height: number,
  variants?: string[]  // Cloudflare variant names
}
```

## Decision Points

### 1. Upload Method

**Option A: Scripted API Upload (Recommended)**

- Write Node.js script using wrangler or fetch
- Upload images and generate content files automatically
- Pros: Programmatic, repeatable, version controlled
- Cons: Requires initial script setup

**Option B: Manual Dashboard Upload**

- Upload via Cloudflare dashboard
- Manually create content files with IDs
- Pros: Simple, no code needed
- Cons: Not repeatable, error-prone, manual metadata entry

**Decision:** Option A - Create upload script

### 2. Metadata Storage

**Option A: Content Collection (Recommended)**

- Zod-validated schema in `src/content/config.ts`
- One MDX file per photo with metadata
- Pros: Type-safe, follows existing patterns, git-tracked
- Cons: File overhead for many photos

**Option B: JSON Data File**

- Single `photos.json` with array of photo data
- Load and parse in Astro component
- Pros: Single file, simple
- Cons: No type safety, not following existing patterns

**Decision:** Option A - Content collection (matches existing posts/notes patterns)

### 3. Image Serving

**Option A: Direct Cloudflare URLs (Recommended)**

- Use `https://imagedelivery.net/{account}/{image}/{variant}` format
- Pros: Simple, CDN-optimized
- Cons: Requires custom domain for clean URLs

**Option B: Astro Image Component**

- Use `<Image />` with Cloudflare URLs
- Pros: Built-in optimization, lazy loading
- Cons: May conflict with Cloudflare's optimization

**Decision:** Option A initially, evaluate Astro Image in Phase 7

## API Authentication

Required: Cloudflare API Token with permissions:

- Account > Images > Edit
- Can be created at: https://dash.cloudflare.com/profile/api-tokens

## Next Steps

1. Create upload script for initial photos
2. Define photo content collection schema
3. Upload sample images to Cloudflare
4. Create initial photo content files
5. Verify images load correctly

## Open Questions

- What custom domain (if any) for images?
- Initial photo set to upload?
- Variant configuration (sizes needed)?

## References

- Cloudflare Images API:
  https://developers.cloudflare.com/api/resources/images/subresources/v1/methods/create/
- Upload methods: https://developers.cloudflare.com/images/upload-images/
- Astro content collections: Existing patterns in `src/content/config.ts`
