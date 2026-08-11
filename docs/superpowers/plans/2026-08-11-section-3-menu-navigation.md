# Section 3 Menu Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Section 3 scroll normally and let visitors choose its four information states from an explicit menu.

**Architecture:** Remove Section 3's pinned ScrollTrigger. Keep its current fixed visual composition, but change the four tab labels to semantic buttons that call the existing `setInfoSlide` state renderer.

**Tech Stack:** Static HTML, CSS, GSAP.

## Global Constraints

- Do not change the shared product handoff, product position, or Section 3 background.
- Keep exactly four choices: `01 MOIST`, `02 SKIN-FIT`, `03 SET`, `04 WATER / CLEANSE`.
- Do not pin Section 3; page scroll must remain continuous.

---

### Task 1: Replace pinned slide selection with menu selection

**Files:**
- Modify: `index.html`, `styles.css`, `script.js`
- Test: `tests/section3.test.mjs`

- [x] **Step 1: Write a failing static test**

```js
assert.match(html, /<button type="button" data-info-tab="0"/);
assert.doesNotMatch(js, /pin: stage/);
```

- [x] **Step 2: Run the Section 3 test**

Run: `node --test tests/section3.test.mjs`

Expected: FAIL because the current tabs are spans and Section 3 is pinned.

- [x] **Step 3: Implement semantic menu buttons and remove the pin**

```js
tabs.forEach((tab) => tab.addEventListener('click', () => {
  setInfoSlide(Number(tab.dataset.infoTab));
}));
```

Keep `setInfoSlide(0, true)` as the initial visual state. Do not create a Section 3 ScrollTrigger.

- [x] **Step 4: Verify tests and JavaScript syntax**

Run: `node --test tests/section3.test.mjs; node --check script.js`

Expected: all tests pass and the syntax command exits 0.
