# WSWSS Sections 1–2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive two-section WSWSS campaign page whose CUT hero flows into a scroll-driven cosmetic-film REVEAL using CSS and GSAP only.

**Architecture:** A small static site keeps semantic content in `index.html`, visual states and responsive rules in `styles.css`, and timeline construction in `script.js`. A single portrait is reused as the persistent skin source while independent DOM film layers animate away; no second “after” image is introduced.

**Tech Stack:** HTML5, CSS custom properties/masks/clip-path/3D transforms, GSAP 3 + ScrollTrigger from CDN, SVG paths, Node built-in test runner.

## Global Constraints

- Build only Sections 1 and 2.
- Use HTML, CSS, GSAP, and ScrollTrigger only; no video, canvas animation, or WebGL.
- Use white/cool-white and WSWSS turquoise/mint approximately `#49C5B6`.
- Use red exclusively for the Section 1 pen strike and WSWSS signature.
- Do not use a before/after slider, cards, columns, or feature bullets.
- Preserve the sequence `COVER → PEEL → REAL SKIN pause → WSWSS SKIN → PAYOFF`.
- Provide mobile and `prefers-reduced-motion` behavior.
- The workspace is not a Git repository, so commit steps are omitted.

---

### Task 1: Semantic campaign shell and original portrait

**Files:**
- Create: `index.html`
- Create: `assets/wswss-portrait.png`
- Create: `tests/site.test.mjs`

**Interfaces:**
- Produces DOM hooks `.hero`, `.pen-path`, `.signature-path`, `.reveal`, `.skin-image`, `.film`, `.reveal-intro`, and `.reveal-payoff` for later styling and motion.

- [ ] **Step 1: Write the failing structural test**

Use Node assertions to load `index.html` and verify the two Thai statements, exactly two sections, film elements, SVG pen paths, portrait reference, and absence of video/canvas/slider markup.

- [ ] **Step 2: Run the test and verify failure**

Run `node --test tests/site.test.mjs`; expect failure because `index.html` does not exist.

- [ ] **Step 3: Generate the portrait and write minimal semantic markup**

Generate one close editorial portrait with natural visible texture and neutral lighting. Add only the CUT hero and REVEAL section, accessible labels, SVG strike/signature paths, three film layers, and GSAP/ScrollTrigger script tags.

- [ ] **Step 4: Run the structural test**

Run `node --test tests/site.test.mjs`; expect all structural assertions to pass.

### Task 2: CUT visual system and responsive composition

**Files:**
- Create: `styles.css`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes the semantic hooks from Task 1.
- Produces CSS custom properties `--mint`, `--ink`, `--paper`, and `--pen`; responsive hero geometry; SVG stroke styling.

- [ ] **Step 1: Add failing CSS contract tests**

Assert that `styles.css` defines `#49c5b6`, thin pen strokes, fluid headline sizing with `clamp()`, mobile media rules, and reduced-motion rules.

- [ ] **Step 2: Run tests and verify the new assertions fail**

Run `node --test tests/site.test.mjs`; expect missing stylesheet assertions.

- [ ] **Step 3: Implement the hero and visual tokens**

Create the cool-white canvas, sparse brand markers, oversized Thai statement, word-relative SVG strike, handwritten signature styling, and mobile wrapping without cards or columns.

- [ ] **Step 4: Run tests and verify pass**

Run `node --test tests/site.test.mjs`; expect all assertions to pass.

### Task 3: REVEAL film materials and skin states

**Files:**
- Modify: `styles.css`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes `.skin-image` and `.film[data-film]`.
- Produces layered film materials with `clip-path`, gradients, pseudo-element curl highlights, perspective, and the `.is-enhanced` skin state.

- [ ] **Step 1: Add failing material tests**

Assert the stylesheet contains `clip-path`, `perspective`, `transform-style: preserve-3d`, pseudo-elements for film edges, and a texture-preserving enhanced state.

- [ ] **Step 2: Run tests and verify failure**

Run `node --test tests/site.test.mjs`; expect missing material rules.

- [ ] **Step 3: Implement the portrait stage and film materials**

Pin a full-viewport visual stage; crop the portrait around the eyes and cheek; give three translucent white/cool-gray films distinct masks, highlights, shadows, and curl origins. Keep the portrait itself visible below all layers.

- [ ] **Step 4: Run tests and verify pass**

Run `node --test tests/site.test.mjs`; expect all assertions to pass.

### Task 4: GSAP scroll narrative and accessibility fallback

**Files:**
- Create: `script.js`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes GSAP, ScrollTrigger, and DOM hooks from Task 1.
- Produces `buildHeroTimeline()`, `buildRevealTimeline()`, and `applyReducedMotionState()`.

- [ ] **Step 1: Add failing motion contract tests**

Assert the script registers ScrollTrigger, defines the three functions, pins `.reveal`, scrubs the reveal timeline, animates films sequentially, pauses on real skin before enhancing, and activates the payoff last.

- [ ] **Step 2: Run tests and verify failure**

Run `node --test tests/site.test.mjs`; expect missing script assertions.

- [ ] **Step 3: Implement motion timelines**

Draw the strike and signature in sequence; transition into the pinned reveal; peel films using staggered `xPercent`, `yPercent`, `z`, `rotationX`, `rotationY`, and `rotationZ`; hold the bare portrait; then animate restrained brightness/saturation and reveal the payoff. Rebuild on responsive breakpoints with `gsap.matchMedia()`.

- [ ] **Step 4: Implement reduced-motion behavior**

Skip pinning and scrub motion when reduced motion is requested. Present the face without films, keep natural enhancement restrained, and show both statements in normal document flow.

- [ ] **Step 5: Run tests and verify pass**

Run `node --test tests/site.test.mjs`; expect all assertions to pass.

### Task 5: Visual and interaction verification

**Files:**
- Modify only if verification exposes defects: `index.html`, `styles.css`, `script.js`

**Interfaces:**
- Verifies the complete static page produced by Tasks 1–4.

- [ ] **Step 1: Run the full automated suite**

Run `node --test tests/site.test.mjs`; expect zero failures.

- [ ] **Step 2: Serve the site locally and inspect desktop**

Open the page at approximately 1440×900. Verify the strike/signature, film separation, real-skin pause, restrained enhancement, final payoff, and absence of horizontal overflow.

- [ ] **Step 3: Inspect mobile**

Open at approximately 390×844. Verify Thai wrapping, portrait crop, readable overlays, shorter peel travel, touch scrolling, and stable pinned behavior.

- [ ] **Step 4: Inspect reduced motion**

Emulate `prefers-reduced-motion: reduce`. Verify no scrubbed/pinned sequence is required to understand the page and all copy is visible.
