# WSWSS Standard Container Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the Hero background full-bleed while constraining every important Section 1 element to one centered, standard-width content frame.

**Architecture:** Define a 1200px desktop content rail with fixed responsive gutters. Apply the same rail to the header, Hero body, and feature strip; position copy and product relative to that rail rather than the viewport.

**Tech Stack:** HTML, CSS, GSAP

## Global Constraints

- Section 1 only.
- Full-bleed background.
- Desktop container max-width 1200px.
- Desktop gutter 24px minimum; mobile gutter 16px.
- Keep the real product asset unchanged.

---

### Task 1: Center all important content on one rail

**Files:**
- Modify: `styles.css`
- Modify: `outputs/wswss-sections-1-2/styles.css`
- Modify: `index.html`
- Modify: `outputs/wswss-sections-1-2/index.html`

- [ ] Add shared container width variables.
- [ ] Center the header, Hero body, and feature strip at max-width 1200px.
- [ ] Reset copy and product offsets so they align to the container edges.
- [ ] Use 16px mobile gutters without constraining the full-bleed background.
- [ ] Visually inspect at 1440px desktop and 390px mobile widths.
