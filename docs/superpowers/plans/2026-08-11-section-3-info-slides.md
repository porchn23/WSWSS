# Section 3 Info Slides Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Section 3 demo with a four-step moisture information sequence and add placeholder Sections 4–5 for product handoff.

**Architecture:** Section 3 owns a fixed scene made from the supplied water background and three supplied Section 3 product assets. Scroll progress selects one of four copy states without moving the background or product. The existing traveler swaps between the standard and Section 3 product stack at the midpoint of Section transitions.

**Tech Stack:** HTML, CSS, GSAP, ScrollTrigger, Node test runner.

## Global Constraints

- Use only assets in `assets/session3/` for the Section 3 visual.
- Section 3 has four scroll-selected data slides; Section 4 starts immediately after slide 4.
- Only Section 3 uses the alternate product image; Sections 1, 2, 4, and 5 use the standard product image.
- Preserve the existing shared traveler action and product anchor system.
- Do not run browser tests unless the user requests them.

### Task 1: Add static Section 3–5 markup and styles

**Files:**
- Modify: `index.html`, `styles.css`
- Modify: `outputs/wswss-sections-1-2/index.html`, `outputs/wswss-sections-1-2/styles.css`
- Test: `tests/section3.test.mjs`

- [x] Write a failing static-contract test for five sections, four Section 3 slides, and the supplied image paths.
- [x] Replace the existing Section 3 demo markup with the moisture information scene and append Sections 4–5 demo anchors.
- [x] Add visual rules for the fixed water scene, information panel, product stack, tab row, and demo handoff sections.
- [x] Run `node --test tests/section3.test.mjs` and confirm the static contract passes.

### Task 2: Add scroll slide selection and product-image handoffs

**Files:**
- Modify: `script.js`, `outputs/wswss-sections-1-2/script.js`
- Test: `tests/section3.test.mjs`

- [x] Extend the handoff state to select the Section 3 product during the Section 2 → 3 journey and the standard product during the Section 3 → 4 journey.
- [x] Add a pinned ScrollTrigger for the four Section 3 copy states, changing only copy and active tab state.
- [x] Run `node --test tests/section3.test.mjs` and confirm the contract passes.
