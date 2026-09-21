# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Friends and internet acquaintances keeping up with Ben's notes and photos. They arrive from shared
links and casual browsing; warmth matters more than signal-density. Secondary: engineering and
product peers who judge craft within seconds.

## Product Purpose

benshi.me is Ben Shi's personal site — pragmatic notes on product, engineering, and learning, plus
photography. The homepage's job is craft proof: visitors should feel "this person builds with
unusual care" and click into the writing.

## Positioning

A personal site whose background is a real-time fluid simulation rendered as ordered-dither halftone
— the engineering is the medium, not a decoration.

## Operating Context

Astro static site, Tailwind v4, deployed to Cloudflare Pages. Writing, photos, about, work, uses,
now, archive, tags routes. Four themes (light, dark, gruv-light, gruv-dark) switched client-side via
html class + localStorage.

## Capabilities and Constraints

- Homepage background: CPU Navier–Stokes solver (80×60 Stam grid) + pointer trail, rendered through
  WebGL with a CPU static fallback and reduced-motion static frame.
- Binding (user-confirmed 2026-09-20): the ordered-dither halftone dot character stays through any
  background restyle — the scene it draws may be replaced, the dot language may not.
- Binding: quiet and fast — no autoplaying busyness, no jank on mid-range laptops, instant first
  paint under the effect.
- Binding: all four themes each get a native-feeling rendition of the background.

## Brand Commitments

Voice: pragmatic, understated. The incumbent landing lockup (name, italic tagline, mono menu, icon
row) is durable content.

## Evidence on Hand

Real content throughout src/content (writing, notes, photos); existing theme palettes in CSS custom
properties; the incumbent DitherSky component (arc + starfield + blooms scene) as pre-replacement
reference.

## Product Principles

1. The engineering is the aesthetic — effects must be real mechanics, never canned decoration.
2. Quiet at rest, alive under the hand: nothing moves unless the visitor moves.
3. Every theme is a first-class citizen of the background.
4. Craft is the funnel: the homepage proves care, the writing keeps the visitor.
