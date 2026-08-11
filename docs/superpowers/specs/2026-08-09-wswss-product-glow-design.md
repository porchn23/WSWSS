# WSWSS Product Glow Design

## Scope

Adjust only the subtle highlight behind the existing product image in Section 1. Do not change the background asset, product asset, copy, header, navigation, or layout.

## Approved visual treatment

- Add one soft white elliptical glow behind the product.
- Attach the glow to `.product-shot`, not `.hero`, so it follows the product at every responsive breakpoint.
- Center it behind the tube's upper-middle body, where it separates the white packaging from the background.
- Keep it restrained: approximately 20–25% peak opacity with a broad feathered edge.
- Keep the glow narrower than the product composition so it does not cover the headline, flower, or glass sphere.
- Preserve the existing small grounding shadow below the tube as a separate effect.

## Implementation boundary

Use `.product-shot::before` for the highlight and retain `.product-shot::after` for the existing grounding shadow. The highlight must remain below the product image through the existing isolated stacking context. Responsive behavior comes from percentage-based positioning and dimensions inside `.product-shot`; no viewport-anchored coordinates are allowed.

## Verification

- Desktop: the glow sits directly behind the tube and does not float toward the page edge.
- Mobile: the glow scales and moves with the tube.
- The product remains above the glow and the grounding shadow remains visible below it.
- No overlay or reduced opacity is reintroduced on `.hero-scene`.
