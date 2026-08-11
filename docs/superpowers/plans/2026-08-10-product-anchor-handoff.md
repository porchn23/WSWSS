# Product Anchor Handoff Implementation Plan

> **For agentic workers:** Execute inline in the existing workspace; the user requested no browser testing.

**Goal:** Move one product visual reliably between section anchors at intentional reading thresholds on every viewport size.

**Architecture:** Keep the product at the active section anchor while idle. During a handoff, animate a fixed traveler from the current visible rectangle to the next live anchor rectangle, then reveal the destination anchor. Use separate forward and backward thresholds to prevent oscillation.

**Tech Stack:** GSAP, ScrollTrigger, HTML, CSS

## Global Constraints

- Preserve every existing section layout and product anchor position.
- Forward handoff occurs at 25% of viewport height.
- Backward handoff occurs at 32% of viewport height.
- At page top, Section 1 always owns the product.
- Resize and refresh recalculate all live anchor geometry.
- Do not run browser tests per user request.

### Task 1: Stateful product handoff

**Files:**
- Modify: `script.js`
- Modify: `outputs/wswss-sections-1-2/script.js`
- Modify: `index.html`
- Modify: `outputs/wswss-sections-1-2/index.html`

- [x] Keep one `activeIndex` as the product owner.
- [x] Add separate forward and backward ScrollTriggers.
- [x] Resolve the correct owner on load and refresh, forcing Section 1 at scroll top.
- [x] Retarget interrupted movement from the traveler's current visual rectangle.
- [x] Update the script cache version.
