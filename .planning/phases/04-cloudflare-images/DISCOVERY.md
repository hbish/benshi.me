# Phase 4 Discovery: Cloudflare R2 Storage Setup

**Date:** 2026-01-12 **Phase:** 04-cloudflare-images **Discovery Level:** Standard Research
(external API integration)

## Research Question

How do we integrate Cloudflare R2 object storage with a custom domain CDN for a photo gallery in an
Astro static site?

## Why R2 Instead of Cloudflare Images

**Decision:** Use R2 object storage instead of Cloudflare Images (proprietary service).

**Rationale:**

- Zero egress fees when served through Cloudflare CDN
- S3-compatible API provides flexibility
- Cost-effective for growing photo collections
- Custom domain CDN for better branding

## Cloudflare R2 Overview

### Upload Methods

| Method        | Description            | Best For              |
| ------------- | ---------------------- | --------------------- |
| AWS SDK v3    | S3-compatible API      | Scripted bulk uploads |
| wrangler CLI  | Command-line interface | Manual operations     |
| Direct upload | PutObject API call     | Client-side uploads   |

### Key R2 API Details

**S3-Compatible Endpoint:**

```
https://{account_id}.r2.cloudflarestorage.com
```

**Configuration for AWS SDK v3:**

```javascript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const S3 = new S3Client({
  region: 'auto', // Required by SDK but not used by R2
  endpoint: `https://{ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: '{R2_ACCESS_KEY_ID}',
    secretAccessKey: '{R2_SECRET_ACCESS_KEY}',
  },
})

await S3.send(
  new PutObjectCommand({
    Bucket: 'benshi-photos',
    Key: 'photos/sample.jpg',
    Body: fileBuffer,
    ContentType: 'image/jpeg',
  })
)
```

### Bucket Management via Wrangler

```bash
# Create bucket
pnpm wrangler r2 bucket create benshi-photos

# List buckets
pnpm wrangler r2 bucket list

# Add custom domain
pnpm wrangler r2 bucket domain add benshi-photos --domain photos.benshi.me --zone-id {ZONE_ID}

# List objects
pnpm wrangler r2 object list benshi-photos
```

### Custom Domain Configuration

**Custom domain setup:**

1. Create R2 bucket
2. Get zone ID for custom domain (wrangler zones)
3. Add custom domain to bucket via CLI or dashboard
4. DNS is automatically configured (CNAME record created)

**Custom domain options:**

- Custom domain (recommended): `photos.benshi.me` — Full CDN features, WAF, caching
- r2.dev subdomain: `benshi-photos.r2.dev` — Development only, limited features

### Image Serving

Once uploaded, images are served at:

```
https://photos.benshi.me/{object_key}
```

Example: `https://photos.benshi.me/photos/sample.jpg`

### Object Constraints

- Max file size: 5 GB per object (via single-part upload)
- Supported formats: All image formats (PNG, GIF, JPEG, WebP, SVG, HEIC, etc.)
- No dimension limits (unlike Cloudflare Images)

## Integration Approach for Astro

### Recommended Strategy

1. **Content Collection Model**
   - Create `src/content/photos/` collection with Zod schema
   - Store R2 object keys and metadata in frontmatter
   - Use Astro's build-time data fetching

2. **Upload Workflow**
   - Node.js script using AWS SDK v3
   - Upload images to R2 bucket
   - Generate .mdx files with object keys
   - No runtime API calls (static site)

3. **Image Serving**
   - Use custom domain CDN URLs directly in markup
   - `https://photos.benshi.me/{id}` where `id` is the R2 object key

### Data Structure

```typescript
// Photo entry structure
{
  id: 'photos/sample.jpg',        // R2 object key
  title: 'Sample Photo',
  description: 'Description',
  collection: 'album-name',
  tags: ['tag1', 'tag2'],
  uploadedAt: Date,
  width: number,
  height: number,
  variant?: string,                // Optional thumbnail path
}
```

## Decision Points

### 1. Storage Service

**Option A: Cloudflare R2 (Selected)**

- S3-compatible API
- Zero egress fees via Cloudflare CDN
- Cost-effective storage
- Pros: Cost control, flexibility, S3-compatible
- Cons: Requires bucket setup

**Option B: Cloudflare Images**

- Proprietary image service
- Built-in optimization/variants
- Pros: Simpler setup, image processing
- Cons: Per-GB costs, less flexibility

**Decision:** Option A — R2 for cost efficiency and flexibility

### 2. Metadata Storage

**Option A: Content Collection (Selected)**

- Zod-validated schema in `src/content/config.ts`
- One MDX file per photo with metadata
- Pros: Type-safe, follows existing patterns, git-tracked
- Cons: File overhead for many photos

**Option B: JSON Data File**

- Single `photos.json` with array of photo data
- Pros: Single file, simple
- Cons: No type safety, not following existing patterns

**Decision:** Option A — Content collection (matches existing posts/notes patterns)

### 3. Upload Method

**Option A: AWS SDK v3 (Selected)**

- S3-compatible API
- Pros: Standard, well-documented, flexible
- Cons: Additional dependency

**Option B: wrangler CLI**

- Wraps R2 API
- Pros: No additional dependencies
- Cons: Requires spawning processes, less control

**Decision:** Option A — AWS SDK v3 for programmatic control

## API Authentication

Required: R2 API Token with permissions:

- Account > Cloudflare R2 > Edit
- Create at: https://dash.cloudflare.com/profile/api-tokens

Environment variables needed:

```
R2_ACCESS_KEY_ID=your_access_key_id
R2_SECRET_ACCESS_KEY=your_secret_access_key
CLOUDFLARE_ACCOUNT_ID=your_account_id
```

## Next Steps

1. Create R2 bucket via wrangler CLI
2. Add custom domain for CDN access
3. Rewrite upload script to use AWS SDK v3
4. Update photos schema for R2 object keys
5. Upload sample images to R2
6. Create photos index page
7. Verify images load from custom domain CDN

## Open Questions

- Custom domain confirmed: `photos.benshi.me`?
- Initial photo set to upload?
- Thumbnail generation approach (deferred to Phase 7)?

## References

- Cloudflare R2 API:
  https://developers.cloudflare.com/api/resources/r2/subresources/buckets/methods/create/
- S3 API compatibility: https://developers.cloudflare.com/r2/api/s3 compatibility/
- Custom domains: https://developers.cloudflare.com/r2/buckets/public-buckets/
- Astro content collections: Existing patterns in `src/content/config.ts`
