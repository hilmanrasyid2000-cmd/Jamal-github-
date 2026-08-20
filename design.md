---
version: alpha
name: "Khroma Dark Immersive"
description: "Khroma is an AI-powered color tool for designers. Its homepage uses a near-black (#0c0c0e) full-bleed canvas as the primary surface, with large Instrument Serif display headings at 78px and Graphik as the workhorse sans-serif for body and UI text. The design is flat (no shadows), uses minimal border radii, and lets color swatches and palette previews serve as the primary visual content. White text dominates on the dark background, with accent colors (coral, yellow, violet) appearing as palette samples rather than structural UI tokens."
colors:
  palette-violet: "#4e42f9"
  palette-coral: "#f58f8d"
  palette-crimson: "#cb355f"
  palette-yellow: "#faf0a3"
  surface-base: "#0c0c0e"
  text-primary: "#ffffff"
  text-secondary: "#939dac"
  text-tertiary: "#646a85"
typography:
  display-hero:
    fontFamily: "Instrument Serif"
    fontSize: "78px"
    fontWeight: "400"
    lineHeight: "78px"
    letterSpacing: "-2px"
  display-large:
    fontFamily: "Instrument Serif"
    fontSize: "60px"
    fontWeight: "400"
    lineHeight: "60px"
  display-medium:
    fontFamily: "Instrument Serif"
    fontSize: "46px"
    fontWeight: "400"
    lineHeight: "46px"
  body-default:
    fontFamily: "Graphik"
    fontSize: "18px"
    fontWeight: "400"
    lineHeight: "27px"
  body-compact:
    fontFamily: "Graphik"
    fontSize: "18px"
    fontWeight: "400"
    lineHeight: "18px"
  body-small:
    fontFamily: "Graphik"
    fontSize: "16px"
    fontWeight: "400"
    lineHeight: "16px"
  ui-large:
    fontFamily: "Graphik"
    fontSize: "24px"
    fontWeight: "400"
    lineHeight: "65px"
rounded:
  sm: "5px"
  md: "10px"
  pill: "27px"
spacing:
  xs: "10px"
  sm: "13px"
  md: "15px"
  lg: "20px"
  xl: "40px"
  2xl: "50px"
  3xl: "60px"
  4xl: "70px"
  5xl: "80px"
  6xl: "100px"
  7xl: "136px"
  8xl: "150px"
  9xl: "160px"
---

## Overview

Khroma is an AI-powered color tool for designers. Its homepage uses a near-black (#0c0c0e) full-bleed canvas as the primary surface, with large Instrument Serif display headings at 78px and Graphik as the workhorse sans-serif for body and UI text. The design is flat (no shadows), uses minimal border radii, and lets color swatches and palette previews serve as the primary visual content. White text dominates on the dark background, with accent colors (coral, yellow, violet) appearing as palette samples rather than structural UI tokens.

**Signature traits:**
- Dual typeface system: Pairs Instrument Serif and Graphik across the type hierarchy.
- Soft, rounded geometry: Generous corner rounding up to 27px.

## Colors

The palette uses 8 validated color tokens across 1 theme profile. Semantic roles stay attached to observed usage so generation agents can choose accents without inventing new color meaning.

**Semantic naming:**
- **surface-background** maps to `surface-base`: Role "background" is grounded by usage context "Primary page background and hero canvas — near-black, full-bleed".
- **action-text** maps to `text-primary`: Role "text" is grounded by usage context "All headings, body copy, nav links, and CTA text on dark backgrounds".
- **content-text** maps to `text-secondary`: Role "text" is grounded by usage context "Secondary descriptive text, footer metadata, muted labels".
- **content-accent** maps to `palette-coral`: Role "accent" is grounded by usage context "Color swatch sample — palette preview accent, not a structural UI token".

### Primary Brand
- **Palette Violet** (#4e42f9): Brand-adjacent violet used in palette samples and potentially CTA highlights. Role: primary.
- **Palette Coral** (#f58f8d): Color swatch sample — palette preview accent, not a structural UI token. Role: accent.
- **Palette Crimson** (#cb355f): Color swatch sample — palette preview accent in footer zone. Role: accent.
- **Palette Yellow** (#faf0a3): Color swatch sample — palette preview accent in footer zone. Role: accent.

### Text Scale
- **Text Primary** (#ffffff): All headings, body copy, nav links, and CTA text on dark backgrounds. Role: text.
- **Text Secondary** (#939dac): Secondary descriptive text, footer metadata, muted labels. Role: text.
- **Text Tertiary** (#646a85): Lowest-hierarchy text, footer fine print, disabled states. Role: text.

### Surface & Shadows
- **Surface Base** (#0c0c0e): Primary page background and hero canvas — near-black, full-bleed. Role: background.

## Typography

Typography uses Instrument Serif, Graphik across extracted hierarchy roles. Keep hierarchy mapped to these token rows before adding decorative type styles.

Mixes Instrument Serif and Graphik for visual contrast. Sizes range from 16px to 78px.

### Font Roles
- **Headline Font**: Instrument Serif
- **Body Font**: Graphik (with Inter / system sans-serif fallback)

### Type Scale Evidence
| Role | Font | Size | Weight | Line Height | Letter Spacing | Stack / Features | Notes |
|------|------|------|--------|-------------|----------------|------------------|-------|
| Primary hero heading — large editorial display type with tight negative tracking | Instrument Serif | 78px | 400 | 78px | -2px | Instrument Serif | Extracted token |
| Section-level display headings | Instrument Serif | 60px | 400 | 60px | normal | Instrument Serif | Extracted token |
| Sub-section headings and feature callouts | Instrument Serif | 46px | 400 | 46px | normal | Instrument Serif | Extracted token |
| Primary body copy and descriptive text | Graphik | 18px | 400 | 27px | normal | Graphik, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, Helvetica, Arial, sans-serif | Extracted token |
| Navigation links, labels, and compact UI text | Graphik | 18px | 400 | 18px | normal | Graphik, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, Helvetica, Arial, sans-serif | Extracted token |
| Secondary UI text, captions, footer copy | Graphik | 16px | 400 | 16px | normal | Graphik, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, Helvetica, Arial, sans-serif | Extracted token |
| Large UI labels or feature callout text with generous line height | Graphik | 24px | 400 | 65px | normal | Graphik, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, Helvetica, Arial, sans-serif | Extracted token |

## Layout

Responsive system uses 2 breakpoint tier(s): mobile, wide.

This system uses a 10px base grid with scale values 10, 13, 15, 20, 40, 50, 60, 70, 80, 100, 136, 150, 160.

### Responsive Strategy
- **mobile (<= 1124px)**: Constrain layout for small viewports and prioritize vertical stacking.
- **wide (>= 1600px)**: Stretch composition with generous gutters and wider layout spans.

### Spacing System
| Token | Value | Px | Notes |
|------|-------|----|-------|
| xs | 10px | 10 | Extracted spacing token |
| sm | 13px | 13 | Extracted spacing token |
| md | 15px | 15 | Extracted spacing token |
| lg | 20px | 20 | Extracted spacing token |
| xl | 40px | 40 | Extracted spacing token |
| 2xl | 50px | 50 | Extracted spacing token |
| 3xl | 60px | 60 | Extracted spacing token |
| 4xl | 70px | 70 | Extracted spacing token |
| 5xl | 80px | 80 | Extracted spacing token |
| 6xl | 100px | 100 | Extracted spacing token |
| 7xl | 136px | 136 | Extracted spacing token |
| 8xl | 150px | 150 | Extracted spacing token |
| 9xl | 160px | 160 | Extracted spacing token |

## Elevation & Depth

Keep depth flat unless validated shadow or interaction evidence appears in the extraction payload. Do not invent shadows beyond this evidence boundary.

### Shadow Evidence
| Shadow Token | Layers | Details |
|--------------|--------|---------|
| n/a | 0 | Flat design (no drop shadows) |

### Interaction Signals
| Theme | Signal | Evidence |
|-------|--------|----------|
| Light | outline-color | rgb(255, 255, 255) ; rgb(100, 106, 133) ; rgb(147, 157, 172) |
| Light | outline-width | 3px |
| Light | outline-offset | 0px |
| Light | transform | matrix(1, 0, 0, 1, 0, 0) ; matrix(0.707107, 0.707107, -0.707107, 0.707107, 0, 0) |

## Shapes

Shape language maps directly to rounded tokens. Keep component corners consistent with the role mapping below before introducing bespoke geometry.

### Radius Roles
| Token | Value | Px | Role Mapping |
|------|-------|----|--------------|
| sm | 5px | 5 | Subtle corner |
| md | 10px | 10 | Control corner |
| pill | 27px | 27 | Large surface corner |

### Geometry Evidence
| Radius Token | Shape | Units |
|--------------|-------|-------|
| sm | 5px | px |
| md | 10px | px |
| pill | 27px | px |

## Components

(none detected)

## Do's and Don'ts

Guardrails protect Dual typeface system, Soft, rounded geometry without adding unsupported visual claims.

| Do | Don't |
|----|---------|
| Do maintain consistent spacing using the base grid | Don't make unsupported claims about absent visual features |
| Do maintain WCAG AA contrast ratios (4.5:1 for normal text) | Don't mix rounded and sharp corners in the same view |
| Do use the primary color only for the single most important action per screen |  |
| Do verify evidence before writing new design-system guidance |  |

## Responsive Evidence

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Breakpoint 1 | <= 768px | (max-width: 768px) |
| Breakpoint 2 | <= 1124px | (max-width: 1124px) |
| Desktop | >= 1600px | (min-width: 1600px) |
| Desktop | >= 1820px | (min-width: 1820px) |
