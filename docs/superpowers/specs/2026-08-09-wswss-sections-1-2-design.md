# WSWSS Website — Sections 1–2 Design

## Scope

Build only the first two sections of the WSWSS product website. No later sections, product-feature layouts, commerce flows, or technology explanations are included. The experience uses HTML, CSS, GSAP, and ScrollTrigger only; it contains no video.

## Visual system

- Primary field: white and cool white.
- Brand accent: WSWSS turquoise/mint, approximately `#49C5B6`, used for brand and product cues.
- Text: near-black and cool gray.
- Red is reserved exclusively for the pen strike and handwritten WSWSS signature in Section 1.
- Avoid beige, pink, rose gold, cards, columns, feature bullets, sliders, and conventional cosmetics-site compositions.
- Typography is large, editorial, and sparse. Motion and a single face carry the narrative.

## Section 1 — CUT

### Content

The hero presents one continuous statement:

> วันนี้ แต่งหน้า สวยจัง

The word `แต่งหน้า` is crossed out by a thin red ballpoint/gel-pen line. The line must feel hand-drawn, slightly imperfect, and pressure-sensitive—not like a brush stroke or a standard CSS text decoration. A handwritten `WSWSS` signature continues from the strike so the brand is visibly responsible for the edit.

### Composition

- Full-viewport cool-white field.
- Minimal WSWSS mint brand/product cues, subordinate to the statement.
- The sentence remains legible and conceptually complete even before motion plays.
- No explanatory paragraph is added.

### Motion

- The hero settles in with restrained opacity and vertical movement.
- An SVG stroke draws across `แต่งหน้า` from left to right.
- The signature writes immediately after the strike as one authored gesture.
- Scrolling compresses the hero’s visual space and hands the viewer into Section 2 without introducing unrelated UI.

## Section 2 — REVEAL

### Content

Opening statement:

> Natural Makeup ไม่ควรเริ่มด้วยการปกปิดผิวจริง

Final payoff:

> เผยผิวให้สวย กว่าที่เคยเป็น

### Composition

- A pinned, full-viewport cinematic portrait replaces conventional section layout.
- A single close-up face is used throughout; visible skin texture is preserved.
- Text appears editorially over the image and changes hierarchy as the reveal progresses.
- The prototype may use an original editorial portrait generated for the site because the prior conversation’s attached source images are not present in the workspace.

### Visual states

1. **Covered:** translucent white and cool-gray cosmetic films hover just above the face. They have fine edge highlights and subtle reflections so they read as separate material, not skin.
2. **Peel:** the film layers lift sequentially. Corners curl, surfaces rotate in 3D, and layers move forward and away from the face. No hand appears. The motion avoids tearing, stretching flesh, or suggesting a peel-off mask.
3. **Real skin:** all films leave before any beautifying transition begins. The unchanged base portrait is briefly visible with pores, tonal variation, and natural texture.
4. **WSWSS skin:** the same base portrait becomes slightly brighter, fresher, and more even through restrained filter, light, and color adjustments. Texture remains visible, and no new opaque layer covers the skin.

### Implementation model

- One base portrait remains fixed as the skin source.
- Separate DOM film elements use CSS masks/clip paths, pseudo-elements, gradients, shadows, and 3D transforms.
- GSAP ScrollTrigger scrubs a timeline across the pinned section.
- The sequence is `COVER → PEEL → REAL SKIN pause → WSWSS SKIN → PAYOFF`.
- Desktop uses greater depth and rotation. Mobile uses shorter travel, reduced perspective, and fewer simultaneous effects while preserving the same narrative.
- `prefers-reduced-motion` removes the scrubbed peel and presents a clear static reveal with readable copy.

## Responsive behavior

- Thai headlines use fluid sizing and controlled wrapping.
- Hero strike geometry follows the measured word position rather than fixed page coordinates.
- Portrait crop prioritizes the eyes, cheek, and real-skin texture across aspect ratios.
- Touch devices require no drag, hover, or pointer-specific interaction; vertical scroll controls the full experience.
- Text maintains sufficient contrast against both covered and revealed portrait states.

## Verification criteria

- Only Sections 1 and 2 are present.
- No video, canvas animation, WebGL, before/after slider, cards, columns, or feature bullets are used.
- The strike resembles a thin pen and the signature visibly continues from it.
- Film layers read as translucent cosmetic sheets separated from the face.
- The real-skin pause occurs before beautification.
- Beautification changes the existing portrait rather than replacing or covering it.
- The complete sequence works with mouse, trackpad, and touch scrolling at desktop and mobile widths.
- Reduced-motion mode remains coherent and readable.
