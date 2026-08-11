# WSWSS Hero Composition Refinement

## Scope

Refine Section 1 only, in the existing page. The supplied WSWSS reference screenshot is the visual authority. Do not add Section 2 or create another page.

## Composition

- Keep the header compact and visually quiet.
- Use a left editorial zone for the headline, belief statement, and CTA; keep consistent left alignment.
- Use a right product zone with the real product anchored to the marble pedestal instead of floating from percentage-based top offsets.
- Preserve intentional negative space between copy and product without leaving the center visually empty.
- Keep the feature strip readable and complete at the bottom; it must not cover the product base.

## Product Treatment

- Use `assets/wswss-product.png` without regenerating or altering packaging.
- Remove `mix-blend-mode: multiply`, which washes out mint and neutral shadows.
- Restore dimension with normal compositing, restrained contrast/saturation, and a soft contact shadow.
- Feather only the pale rectangular image background; never clip the tube silhouette.
- Desktop: product occupies approximately 17–19% of viewport width and sits on the pedestal.
- Mobile: product remains fully visible at lower right, balanced against the two-line headline.

## Responsive Hierarchy

- Desktop first viewport shows header, complete headline treatment, belief text, CTA, product, and feature strip.
- Mobile first viewport shows logo, headline with strike/signature, supporting copy, CTA, and complete product without crowding.
- Scale and spacing use a small number of explicit breakpoint rules rather than layered percentage offsets.

## Verification

Use visual inspection at desktop and 390 × 844 mobile sizes. Confirm color, product silhouette, pedestal contact, spacing balance, and visibility of all intended details.
