---
version: alpha
name: "Frequency-Based Extraction"
description: "Design tokens extracted from frequency analysis without LLM interpretation."
colors:
  low-confidence: "#ed462d"
  text: "#f0ede6"
  text-2: "#22c55e"
  text-3: "#0000ee"
  local-accent: "#ffffff"
  local-accent-2: "#0a0a0a"
  local-accent-3: "#050505"
  local-accent-4: "#000000"
  local-accent-5: "#767676"
typography:
  type-1:
    fontFamily: "Instrument Sans"
    fontSize: "16px"
    fontWeight: "400"
  type-2:
    fontFamily: "Chivo Mono"
    fontSize: "12px"
    fontWeight: "400"
    letterSpacing: "1.44px"
  type-3:
    fontFamily: "Geist Pixel Square"
    fontSize: "12.8px"
    fontWeight: "400"
    letterSpacing: "1.28px"
  type-4:
    fontFamily: "Chivo Mono"
    fontSize: "11.2px"
    fontWeight: "400"
    lineHeight: "20.16px"
  type-5:
    fontFamily: "Geist Pixel Square"
    fontSize: "9.6px"
    fontWeight: "400"
    lineHeight: "14.4px"
    letterSpacing: "0.96px"
rounded:
  radius-1: "1px"
  radius-2: "6px"
  radius-3: "10px"
spacing:
  space-1: "32px"
  space-2: "24px"
  space-3: "12px"
  space-4: "63.3px"
  space-5: "16px"
  space-6: "8px"
  space-7: "20px"
  space-8: "48px"
  space-9: "9.6px"
  space-10: "64px"
---

## Overview

Design tokens extracted from frequency analysis without LLM interpretation.

**Signature traits:**
- Evidence was insufficient to extract distinctive signature traits for this system.

## Colors

The palette uses 9 validated color tokens across 1 theme profile. Semantic roles stay attached to observed usage so generation agents can choose accents without inventing new color meaning.

### Text Scale
- **Text** (#f0ede6): Frequency rank #1 (209 occurrences); token importance textCandidate: repeated text-role usage (209 hits). Role: text. {authored: rgba(240, 237, 230, 0.016), space: rgb, alpha: 0.016}
- **Text-2** (#22c55e): Frequency rank #5 (10 occurrences); token importance textCandidate: repeated text-role usage (10 hits). Role: text. {authored: rgb(34, 197, 94), space: rgb}
- **Text-3** (#0000ee): Frequency rank #6 (8 occurrences); token importance textCandidate: repeated text-role usage (8 hits). Role: text. {authored: rgb(0, 0, 238), space: rgb}

### Interactive
- **Local-accent** (#ffffff): Frequency rank #2 (19 occurrences); token importance localAccent: localized usage with limited global footprint. Role: border. {authored: rgb(255, 255, 255), space: rgb, alpha: 0.02}
- **Local-accent-2** (#0a0a0a): Frequency rank #3 (18 occurrences); token importance localAccent: localized usage with limited global footprint. Role: border. {authored: rgb(10, 10, 10), space: rgb, alpha: 0.15}
- **Local-accent-3** (#050505): Frequency rank #7 (1 occurrences); token importance localAccent: localized usage with limited global footprint. Role: border. {authored: rgb(5, 5, 5), space: rgb}
- **Local-accent-4** (#000000): Frequency rank #8 (1 occurrences); token importance localAccent: localized usage with limited global footprint. Role: border. {authored: rgb(0, 0, 0), space: rgb}
- **Local-accent-5** (#767676): Frequency rank #9 (1 occurrences); token importance localAccent: localized usage with limited global footprint. Role: border. {authored: rgb(118, 118, 118), space: rgb}

### Surface & Shadows
- **Low-confidence** (#ed462d): Frequency rank #4 (12 occurrences); token importance lowConfidence: insufficient confidence from deterministic signals. Role: background. {authored: rgb(237, 70, 45), space: rgb, alpha: 0.2}

## Typography

Typography uses Instrument Sans, Chivo Mono, Geist Pixel Square across extracted hierarchy roles. Keep hierarchy mapped to these token rows before adding decorative type styles.

Mixes Instrument Sans and Chivo Mono and Geist Pixel Square for visual contrast. Sizes range from 9.6px to 16px.

### Type Scale Evidence
| Role | Font | Size | Weight | Line Height | Letter Spacing | Stack / Features | Notes |
|------|------|------|--------|-------------|----------------|------------------|-------|
| Frequency rank #1 | Instrument Sans | 16px | 400 | normal | normal | Instrument Sans, system-ui, sans-serif | Extracted token |
| Frequency rank #2 | Chivo Mono | 12px | 400 | normal | 1.44px | Chivo Mono, monospace | Extracted token |
| Frequency rank #3 | Geist Pixel Square | 12.8px | 400 | normal | 1.28px | Geist Pixel Square, monospace | Extracted token |
| Frequency rank #4 | Chivo Mono | 11.2px | 400 | 20.16px | normal | Chivo Mono, monospace | Extracted token |
| Frequency rank #5 | Geist Pixel Square | 9.6px | 400 | 14.4px | 0.96px | Geist Pixel Square, monospace | Extracted token |

## Layout

Layout rhythm is inferred from spacing tokens and responsive breakpoint evidence.

### Spacing System
| Token | Value | Px | Notes |
|------|-------|----|-------|
| space-6 | 8px | 8 | Extracted spacing token |
| space-9 | 9.6px | 9.6 | Extracted spacing token |
| space-3 | 12px | 12 | Extracted spacing token |
| space-5 | 16px | 16 | Extracted spacing token |
| space-7 | 20px | 20 | Extracted spacing token |
| space-2 | 24px | 24 | Extracted spacing token |
| space-1 | 32px | 32 | Extracted spacing token |
| space-8 | 48px | 48 | Extracted spacing token |
| space-4 | 63.3px | 63.3 | Extracted spacing token |
| space-10 | 64px | 64 | Extracted spacing token |

## Elevation & Depth

Keep depth flat unless validated shadow or interaction evidence appears in the extraction payload. Do not invent shadows beyond this evidence boundary.

### Shadow Evidence
| Shadow Token | Layers | Details |
|--------------|--------|---------|
| n/a | 0 | No validated shadow payload |

### Interaction Signals
| Theme | Signal | Evidence |
|-------|--------|----------|
| Light | backdrop-filter | blur(8px) |
| Light | outline-color | oklch(0.9465 0.0099 87.47) ; oklch(0.6329 0.2075 31.49) ; oklch(0.1448 0 0) |
| Light | outline-width | 3px |
| Light | outline-offset | 0px |
| Light | transform | matrix(1, 0, 0, 1, 0, 0) ; matrix(0, 1, -1, 0, 705, -225) ; matrix(0.25, 0, 0, 0.25, 157, 157) |

## Shapes

Shape language maps directly to rounded tokens. Keep component corners consistent with the role mapping below before introducing bespoke geometry.

### Radius Roles
| Token | Value | Px | Role Mapping |
|------|-------|----|--------------|
| radius-1 | 1px | 1 | Hairline corner |
| radius-2 | 6px | 6 | Subtle corner |
| radius-3 | 10px | 10 | Control corner |

### Geometry Evidence
| Radius Token | Shape | Units |
|--------------|-------|-------|
| radius-1 | 1px | px |
| radius-2 | 6px | px |
| radius-3 | 10px | px |

## Components

(none detected)

## Do's and Don'ts

Guardrails tie generation choices back to validated tokens, component patterns, and evidence-backed hierarchy.

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
| Breakpoint 2 | <= 1024px | (max-width: 1024px) |
| Breakpoint 3 | <= 1280px | (max-width: 1280px) |
| Tablet | 769-1024px | (max-width: 1024px) and (min-width: 769px) |
