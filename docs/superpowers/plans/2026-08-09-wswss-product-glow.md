# WSWSS Product Glow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a restrained white glow that remains directly behind the WSWSS tube at every responsive breakpoint.

**Architecture:** Implement the glow as `.product-shot::before` inside the product figure's existing isolated stacking context. Keep `.product-shot::after` as the separate grounding shadow, and use percentage-based geometry so the glow scales and moves with the product rather than the viewport.

**Tech Stack:** HTML5, CSS, PowerShell regression check, in-app browser visual verification

## Global Constraints

- Modify only the subtle highlight behind the existing product image in Section 1.
- Do not change the background asset, product asset, copy, header, navigation, or layout.
- Peak opacity must remain approximately 20–25% with a broad feathered edge.
- No overlay or reduced opacity may be added to `.hero-scene`.
- Desktop and mobile must use the same product-attached positioning model.

---

### Task 1: Product-attached highlight

**Files:**
- Modify: `styles.css` in the `.product-shot` rules
- Modify: `outputs/wswss-sections-1-2/styles.css` with the identical production rule
- Modify: `index.html` cache query version
- Modify: `outputs/wswss-sections-1-2/index.html` cache query version
- Modify: `work/test-bg-unmasked.ps1`

**Interfaces:**
- Consumes: `.product-shot` isolated stacking context and `.product-shot img` at `z-index: 1`
- Produces: `.product-shot::before` highlight below the product image; retains `.product-shot::after` grounding shadow

- [ ] **Step 1: Extend the regression check and verify it fails**

Add assertions requiring a `.product-shot::before` block with `z-index: 0`, a white radial gradient, percentage-based geometry, and opacity no greater than `0.25`. Continue asserting that `.hero::after` and reduced `.hero-scene` opacity do not exist.

Run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File '.\work\test-bg-unmasked.ps1'
```

Expected: FAIL because `.product-shot::before` does not exist.

- [ ] **Step 2: Add the minimal product-attached glow**

Add this rule immediately before the existing `.product-shot::after` rule in both CSS copies:

```css
.product-shot::before {
  content: "";
  position: absolute;
  z-index: 0;
  top: 13%;
  right: 8%;
  bottom: 14%;
  left: 8%;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.24) 0 34%, rgba(255, 255, 255, 0.13) 54%, transparent 76%);
  filter: blur(8px);
}
```

Keep `.product-shot img` at `z-index: 1`. Keep `.product-shot::after` unchanged at `z-index: 0`; its bottom-only geometry prevents overlap with the body glow.

- [ ] **Step 3: Update cache versions and run regression checks**

Increment the CSS and script query version in both HTML copies from `20260809-16` to `20260809-17`.

Run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File '.\work\test-bg-unmasked.ps1'
```

Expected: PASS confirming the product glow exists and no hero-level mask returned.

Compare source/output hashes for `index.html` and `styles.css`. Expected: each source file matches its output copy.

- [ ] **Step 4: Verify the rendered placement**

Open `http://127.0.0.1:4173/?glow=17` and inspect at 1280×720 and 390×844.

Expected on desktop: glow remains centered behind the upper-middle tube body and does not cover the headline, flower, or sphere.

Expected on mobile: glow scales and moves with the product; it does not remain at a viewport-fixed coordinate.

- [ ] **Step 5: Record completion without a commit**

This workspace is not a Git repository. Report the verified files and rendered sizes instead of claiming a commit.
