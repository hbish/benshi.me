# TODO: Replicate hbish.com Blog in Astro

Based on analysis of the current Astro codebase and comparison with the target hbish.com blog, here are the tasks needed to complete the migration:

## High Priority

### 🚀 Content Collections & Migration
- [x] **Set up proper content collections for posts, pages, and notes** ✅ COMPLETED
  - ✅ Update `src/content/config.ts` to include pages and notes collections
  - ✅ Define proper schemas for each content type
  - ✅ Ensure frontmatter consistency across all content

### 🔗 Page Routing
- [x] **Create proper page routing for /about, /now, /work, /talks, /uses, /notes** ✅ COMPLETED
  - ✅ Set up dynamic routing for pages collection
  - ✅ Create individual page templates
  - ✅ Ensure proper URL structure matches hbish.com

### 📝 Notes Collection
- [x] **Add notes collection to content config and create notes listing page** ✅ COMPLETED
  - ✅ Configure notes collection in config.ts
  - ✅ Create `/notes` page with chronological listing
  - ✅ Set up proper routing for individual notes
  - ✅ Handle notes organized by year folders

### 🏠 Homepage Layout
- [x] **Fix homepage layout to match hbish.com styling and structure** ✅ COMPLETED
  - ✅ Improve post listing layout and typography
  - ✅ Add proper year grouping for posts
  - ✅ Enhanced reading time display
  - ✅ Added post descriptions/excerpts

## Medium Priority

### 📄 Post Template Enhancement
- [ ] **Enhance post template with proper metadata and reading time**
  - Improve post header with date formatting
  - Fix reading time display integration
  - Add proper article schema markup
  - Enhance typography and spacing

### 🎨 Theme System
- [ ] **Implement theme switcher (light/dark/gruv-light/gruv-dark)**
  - Create theme toggle component
  - Implement CSS custom properties for themes
  - Add theme persistence (localStorage)
  - Match hbish.com theme variants

### 💬 Comments System
- [ ] **Fix and properly configure Cusdis commenting system**
  - Configure proper page IDs and URLs
  - Test comment functionality
  - Style comment section to match site design

### 📡 RSS Feed
- [ ] **Set up RSS feed generation**
  - Configure @astrojs/rss integration
  - Create RSS endpoint at /rss.xml
  - Include proper metadata and content

### 🔍 SEO Optimization
- [ ] **Add proper SEO meta tags and schema markup**
  - Implement OpenGraph tags
  - Add Twitter Card metadata
  - Include structured data (JSON-LD)
  - Optimize meta descriptions and titles

## Low Priority

### 🎨 Styling Refinement
- [ ] **Refine CSS styling to match hbish.com aesthetic**
  - Fine-tune typography and spacing
  - Improve mobile responsiveness
  - Add subtle animations and transitions
  - Polish sidebar and navigation styling

### ⚡ Performance Optimization
- [ ] **Optimize images and performance**
  - Implement proper image optimization
  - Add lazy loading for images
  - Optimize bundle size
  - Improve Core Web Vitals scores

## Notes

### Current State Analysis
- ✅ Basic Astro setup with posts collection working
- ✅ Sidebar with profile and navigation configured
- ✅ Reading time plugin functional
- ✅ Basic responsive layout in place
- ✅ Some content already migrated from hbish.com
- ✅ **Content collections properly configured for posts, pages, and notes**
- ✅ **All static pages properly routed and functional**
- ✅ **Notes collection configured with chronological listing**
- ✅ **Homepage layout improved with reading time and excerpts**

### Key Missing Features
- ❌ Theme switcher functionality missing
- ❌ RSS feed not set up
- ❌ Enhanced SEO and metadata missing
- ❌ Comments system needs configuration
- ❌ Some styling refinements needed

### Technical Considerations
- The site uses Tailwind CSS for styling
- Reading time is calculated via remark plugin
- Content is organized by year in folders
- Images are stored in `/public/media/`
- Currently using Cusdis for comments

### Target Features from hbish.com
- Theme switcher with 4 variants
- Clean, minimal design
- Chronological post and notes listing
- Proper metadata and reading times
- IndieWeb microformats
- RSS feed
- Comment system integration