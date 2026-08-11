# Section 4 — Behind the Formula Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the fourth WSWSS content section with factory, quality-standard, notification, and document information using the assets already stored in `assets/section4`.

**Architecture:** Replace the existing Section 4 demo with one `section#section-4` that receives the existing shared product at its anchor. The section owns its markup and CSS only; the existing traveler continues to select standard product artwork for index 3. A document rail maps available images to previews and renders blank cards for unprovided records.

**Tech Stack:** Static HTML, CSS, GSAP ScrollTrigger, existing Node static tests.

## Global Constraints

- Do not modify Sections 1–3.
- Reuse `assets/section4/iso22716.png`, `iso9001.png`, `iso14001.png`, and `IMG_1249.jpg` through `IMG_1258.jpg` only.
- Use a blank document card for a record whose real image is not available.
- Keep white/cool-white and WSWSS mint styling; do not generate a new product asset.
- Preserve the existing shared-product traveler and standard artwork on Section 4 entry.

---

### Task 1: Lock the Section 4 content contract

**Files:**
- Create: `tests/section4.test.mjs`
- Test: `tests/section4.test.mjs`

**Interfaces:**
- Consumes: `index.html`, `styles.css`, `script.js`, `assets/section4/*`
- Produces: static contract assertions for Section 4 markup, document asset paths, and blank-state cards.

- [ ] **Step 1: Write the failing test**

```js
test('Section 4 contains the factory and document contract', async () => {
  const html = await readFile(new URL('index.html', root), 'utf8');
  assert.match(html, /id="section-4"/);
  assert.match(html, /BEHIND THE FORMULA/);
  assert.match(html, /10-2-6700041179/);
  assert.match(html, /assets\/section4\/iso22716\.png/);
  assert.match(html, /data-document-state="blank"/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/section4.test.mjs`

Expected: FAIL because the current Section 4 is only the demo handoff.

- [ ] **Step 3: Add the minimal test imports**

```js
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
```

- [ ] **Step 4: Run test to verify the test file is valid**

Run: `node --test tests/section4.test.mjs`

Expected: one intentional contract failure; no syntax error.

### Task 2: Replace the Section 4 demo with the credentials scene

**Files:**
- Modify: `index.html`
- Modify: `outputs/wswss-sections-1-2/index.html`
- Modify: `styles.css`
- Modify: `outputs/wswss-sections-1-2/styles.css`

**Interfaces:**
- Consumes: shared `[data-product-anchor]`, existing `.product-stack`, supplied Section 4 document images.
- Produces: `#section-4`, `.formula-stage`, `.formula-content`, `.formula-facts`, `.document-rail`, and `.document-card` elements.

- [ ] **Step 1: Replace the existing Section 4 demo markup**

```html
<section class="formula-section" id="section-4" aria-labelledby="section-4-title">
  <div class="formula-stage">
    <div class="formula-content">
      <p class="formula-index">04 / 06</p>
      <h2 id="section-4-title">BEHIND THE FORMULA</h2>
      <p class="formula-lead">เพราะความสวยที่แท้จริง เริ่มจากสิ่งที่ดีที่สุด</p>
      <div class="formula-facts"></div>
      <div class="document-rail"></div>
    </div>
    <figure class="product-destination formula-product" data-product-anchor aria-hidden="true"></figure>
  </div>
</section>
```

- [ ] **Step 2: Populate the four facts and document cards**

```html
<article class="formula-fact"><strong>MADE IN KOREA</strong><p>ผลิตในประเทศเกาหลี ภายใต้มาตรฐานสากล</p></article>
<article class="formula-fact"><strong>PRO YOU</strong><p>COSMETICS CO., LTD.</p></article>
<article class="formula-fact"><strong>ISO 22716 · 9001 · 14001</strong><p>Cosmetics GMP · Quality · Environmental Management</p></article>
<article class="formula-fact"><strong>10-2-6700041179</strong><p>เลขที่ใบรับจดแจ้งเครื่องสำอาง</p></article>
<figure class="document-card"><img src="assets/section4/iso22716.png" alt="ISO 22716 certificate" /></figure>
<figure class="document-card" data-document-state="blank"><span>DOCUMENT<br />PENDING</span></figure>
```

- [ ] **Step 3: Add the minimal CSS scene**

```css
.formula-section { min-height: clamp(38rem, 64svh, 48rem); overflow: hidden; background: #f8fbfa; }
.formula-stage { position: relative; min-height: inherit; isolation: isolate; }
.formula-content { width: min(calc(100% - 3rem), 70rem); margin: 0 auto; padding: clamp(4rem, 8vw, 7rem) 0 2rem; }
.document-rail { display: flex; gap: 1rem; overflow-x: auto; }
.document-card[data-document-state="blank"] { display: grid; place-items: center; background: rgba(255,255,255,.56); }
```

- [ ] **Step 4: Mirror the root HTML/CSS to the output copy and copy the `assets/section4` directory**

Run: `Copy-Item -Recurse -Force assets\section4 outputs\wswss-sections-1-2\assets\section4`

- [ ] **Step 5: Run the Section 4 static contract**

Run: `node --test tests/section4.test.mjs`

Expected: PASS.

### Task 3: Connect the existing product handoff and responsive treatment

**Files:**
- Modify: `script.js`
- Modify: `outputs/wswss-sections-1-2/script.js`
- Modify: `styles.css`
- Modify: `outputs/wswss-sections-1-2/styles.css`
- Test: `tests/section4.test.mjs`

**Interfaces:**
- Consumes: `#section-4 .formula-product[data-product-anchor]`, `productVariantForIndex(index)`.
- Produces: stable traveler destination at index 3, standard product artwork, and stacked narrow-portrait layout.

- [ ] **Step 1: Extend the failing test for the shared anchor and portrait rules**

```js
assert.match(html, /class="product-destination formula-product" data-product-anchor/);
assert.match(css, /@media \(orientation: portrait\) and \(max-width: 699px\)[\s\S]*\.formula-content/);
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/section4.test.mjs`

Expected: FAIL until the anchor and narrow portrait layout exist.

- [ ] **Step 3: Preserve standard product selection at index 3**

```js
function productVariantForIndex(index) {
  return index === 2 ? 'section3' : 'standard';
}
```

No change is required if this existing function remains exactly as shown.

- [ ] **Step 4: Add narrow portrait rules**

```css
@media (orientation: portrait) and (max-width: 699px) {
  .formula-section { min-height: 48rem; }
  .formula-content { width: min(calc(100% - 2rem), 30rem); padding-top: 3rem; }
  .formula-facts { grid-template-columns: 1fr; }
  .formula-product { top: auto; bottom: 1.25rem; }
}
```

- [ ] **Step 5: Run all static tests**

Run: `node --test tests/section3.test.mjs tests/section4.test.mjs`

Expected: all tests PASS.

- [ ] **Step 6: Verify root/output parity**

Run: `Get-FileHash index.html, outputs\wswss-sections-1-2\index.html, styles.css, outputs\wswss-sections-1-2\styles.css, script.js, outputs\wswss-sections-1-2\script.js`

Expected: each root/output pair has matching hashes.
