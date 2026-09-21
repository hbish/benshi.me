---
name: benshi.me
description:
  Ben Shi's personal site — a marbled notebook of pragmatic notes on product, engineering, and
  learning.
colors:
  paper-light: '#ffffff'
  paper-secondary: '#f4f5f6'
  paper-dark: '#292929'
  paper-dark-secondary: '#3a3a3a'
  gruv-paper: '#f2e5bc'
  gruv-paper-secondary: '#f9f5d7'
  gruv-dark-paper: '#272727'
  fountain-pen-blue: '#103fea'
  fountain-pen-blue-hover: '#0a2bb8'
  fountain-pen-blue-dark: '#a0b3f8'
  fountain-pen-blue-dark-hover: '#bcc9fa'
  gruv-ink: '#7c6f64'
  graphite-text: '#606c76'
  graphite-text-dark: '#dcdee0'
  hairline: '#d1d1d1'
  hairline-dark: '#555555'
  gruv-hairline: '#d5c4a1'
typography:
  body:
    fontFamily: "Cardo, 'Iowan Old Style', Georgia, 'Times New Roman', serif"
  display:
    fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif"
  label:
    fontFamily: "'JetBrains Mono', ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace"
    fontSize: '0.75rem'
    letterSpacing: '0.1em'
    textTransform: 'uppercase'
components:
  nav-link:
    textColor: '{colors.graphite-text}'
    typography: '{typography.label}'
  nav-link-hover:
    textColor: '{colors.fountain-pen-blue}'
  social-icon:
    size: '40px'
    rounded: '8px'
    textColor: '{colors.graphite-text}'
  social-icon-hover:
    textColor: '{colors.fountain-pen-blue}'
---

# Design System: benshi.me

## Overview

**Creative North Star: "The Marbled Notebook"**

The site is a living notebook: paper grounds, one fountain-pen ink per theme, and a hand-marbled
suminagashi print as the homepage's opening page. Engineering is the water beneath the paper — a
real fluid simulation renders the print, and the visitor's pointer is the stylus. Nothing is
decorated; everything that moves is either the visitor's own hand or the ink settling from it.

Density is airy: generous margins, sparse ink (the homepage print holds ~25% coverage in its densest
register and dissolves to bare paper where text lives). The voice is quiet, pragmatic, warm to
friends.

**Key Characteristics:**

- Paper-first grounds in four themes (light, dark, gruv-light, gruv-dark); every theme is a
  first-class citizen.
- One accent ink per theme, derived from CSS custom properties; hue-rotated companions for duo-tone
  work.
- Ordered-dither halftone dots as the system's texture language; dots are hand-laid
  (fibre-jittered), never a printed screen.
- The engineering is the aesthetic: effects are real mechanics (fluid solver, density advection),
  never canned decoration.

## Colors

One confident ink on honest paper, per theme. The accent never exceeds small fractions of a surface;
its rarity is the point.

### Primary

- **Fountain-pen Blue** (#103fea light / #a0b3f8 dark / #7c6f64 gruv): the ink you refill your best
  pen with. Links, hover states, the marbled print's contour-ring veins.
- **Fountain-pen Blue, pressed** (#0a2bb8 / #bcc9fa): hover depth.

### Neutral

- **Paper** (#ffffff / #292929 / #f2e5bc / #272727): the ground; also the marbling's paper.
- **Secondary paper** (#f4f5f6 / #3a3a3a / #f9f5d7): inset surfaces.
- **Graphite** (#606c76 / #dcdee0): body text, icons.
- **Hairline** (#d1d1d1 / #555 / #d5c4a1): rules and borders.

**The One Ink Rule.** Exactly one accent hue per theme carries every accent use on a surface; the
hue-rotated companion may appear only inside the marbled print's duo-tone.

## Typography

**Body:** Cardo (Iowan Old Style, Georgia fallbacks) — a bookish serif for reading. **Display:**
Playfair Display — the name on the notebook's cover. **Label:** JetBrains Mono, uppercase,
letter-spaced 0.1em — the archival tab voice, used for nav and small labels only.

**The Notebook Hand Rule.** Serif carries voice; mono carries wayfinding. Mono never sets sentences.

## Layout

Landing: full-viewport sheet, lockup anchored lower-left with the marbled field occupying the
upper-right two-thirds (225° diagonal dissolve; 205° in portrait). Content pages use a single
reading column on paper grounds. Spacing rhythm is generous-above-heading, tight-below.

## Elevation & Depth

Flat. No shadows anywhere in the system. Depth, where it exists, is tonal: secondary paper insets
and hairline rules. The marbled print renders ink _body_ (density tonal ramp: paper grain → ring ink
→ wet-core ink) instead of elevation.

**The Flat Sheet Rule.** Surfaces are flat paper; nothing floats above the page.

## Shapes

Hairline borders and small radii (8px on icon affordances). The system's only organic geometry is
the print's contour rings; UI geometry stays rectangular and quiet.

## Components

### Navigation (landing menu / site nav)

- **Style:** mono uppercase labels, graphite text, fountain-pen hover. 44px minimum touch targets.
- **States:** hover → accent color only.

### Social icon row

- **Shape:** 8px radius, 40px box (44px on touch).
- **Hover:** accent color + 2px lift.

### DitherSky (signature)

The living suminagashi print: a 240×180 pigment density field advected by an 80×60 Navier–Stokes
solver, rendered as contour-ring veins through an 8×8 Bayer halftone with fibre jitter, in theme
inks. Loads as an ensō — one authored brush circle with an opening at the upper right, a heavy
pooled landing, a delicate thin sweep, and a small hanko seal on clear paper inside the lower left;
pointer strokes drop wet ink (darker cores) that the water combs into veins; the field relaxes back
to the frozen print (~11.5s half-life). Reduced motion and no-WebGL: the same print, static, painted
by a CPU path sharing the density field and banding math. WebGL context loss degrades to transparent
(paper shows through).

## Do's and Don'ts

### Do:

- **Do** derive every accent use from the theme CSS custom properties; themes switch client-side and
  all four must render natively.
- **Do** keep motion earned: water only under the visitor's hand. Entrances are near-instant; the
  marbling is the system's one authored mechanic.
- **Do** use the halftone dot language (fibre-jittered Bayer) for any texture; it is the site's
  recognizable grain.
- **Do** budget effects as real mechanics with reduced-motion and no-WebGL parity from the same
  data.

### Don't:

- **Don't** introduce a second accent hue, gradient fills, shadows, or glass effects; the notebook
  owns one ink and flat paper.
- **Don't** animate UI chrome; stillness is the default state and the print is the only surface that
  moves.
- **Don't** cover the lockup's clear lower-left margin with field content.
- **Don't** simulate at frame-rate: fixed 16ms wall-clock substeps. (Known bounded exception:
  pointer ink deposits once per frame, so 120Hz strokes carry ~2× energy over their 320ms life —
  capped by density clamps and the relax-to-seed.)
