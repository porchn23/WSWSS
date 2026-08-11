# WSWSS Hero Composition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recompose the existing WSWSS Section 1 so its scale, spacing, product color, and hierarchy match the approved reference.

**Architecture:** Keep the existing HTML and assets. Consolidate layout control in `styles.css`, anchor the real product from its base, and use GSAP only for entrance motion rather than structural positioning.

**Tech Stack:** HTML, CSS, GSAP

## Global Constraints

- Modify Section 1 only; do not add Section 2 or create a page.
- Keep the real product image and packaging unchanged.
- Red remains exclusive to the pen strike and signature.
- Verify visually at desktop and 390 × 844 mobile sizes.

---

### Task 1: Rebalance hero geometry

**Files:**
- Modify: `styles.css`
- Modify: `outputs/wswss-sections-1-2/styles.css`

- [ ] Replace layered product `top`/`height` scaling with a bottom-anchored width model.
- [ ] Tighten header, copy width, headline scale, and vertical rhythm against the reference.
- [ ] Reserve explicit space above the feature strip so content does not collide.

### Task 2: Restore product depth

**Files:**
- Modify: `styles.css`
- Modify: `outputs/wswss-sections-1-2/styles.css`

- [ ] Remove multiply compositing.
- [ ] Preserve the soft background feather while keeping the tube untouched.
- [ ] Add restrained color correction and a soft contact shadow.

### Task 3: Refine responsive composition

**Files:**
- Modify: `styles.css`
- Modify: `outputs/wswss-sections-1-2/styles.css`

- [ ] Set a dedicated mobile product scale and base position.
- [ ] Keep headline, strike, signature, support copy, CTA, and product visible in the first viewport.
- [ ] Visually inspect desktop and 390 × 844 mobile output, then correct only observed composition issues.
