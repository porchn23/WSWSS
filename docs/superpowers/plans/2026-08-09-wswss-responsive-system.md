# WSWSS Responsive System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the two-state responsive CSS with a standard four-range system that keeps Section 1 composed at every common viewport size.

**Architecture:** Preserve the 1200px centered content rail and full-bleed background. Use desktop defaults, a 992–1199 laptop range, a 768–991 tablet range, and a ≤767 mobile range; product position and Hero height change by range instead of sharing mobile offsets.

**Tech Stack:** HTML, CSS, GSAP

## Global Constraints

- Section 1 only.
- Product source remains `wswss-product-cutout.png`.
- No masks or generated replacement packaging.
- Product color adjustment is limited to `saturate(1.16)` and `contrast(1.02)`.
- Verify widths 1280, 1024, 912, 768, 430, 390, and 360px.

---

### Task 1: Standardize responsive ranges

**Files:**
- Modify: `styles.css`
- Modify: `outputs/wswss-sections-1-2/styles.css`
- Modify: `index.html`
- Modify: `outputs/wswss-sections-1-2/index.html`

- [ ] Keep desktop defaults for widths ≥1200px.
- [ ] Add laptop scaling for 992–1199px without changing composition.
- [ ] Use a two-zone tablet composition at 768–991px with hidden navigation, a wrapped headline, 680–760px Hero height, and a product fully inside the content rail.
- [ ] Use the current full-height mobile composition only at widths ≤767px.
- [ ] Add the restrained product color filter and retain native sharpness.
- [ ] Visually inspect the specified viewport widths and correct observed overflow only.
