import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('Section 3 supplies four moisture information states and the Section 4–5 handoff targets', async () => {
  const html = await readFile(new URL('index.html', root), 'utf8');

  assert.match(html, /<section class="info-section" id="section-3"/);
  assert.equal((html.match(/data-info-slide/g) ?? []).length, 4);
  assert.match(html, /assets\/session3\/bg\.png/);
  assert.match(html, /assets\/session3\/WSWSS-PD001\.png/);
  assert.doesNotMatch(html, /assets\/session3\/product01\.png/);
  assert.match(html, /assets\/session3\/product02\.png/);
  assert.doesNotMatch(html, /assets\/session3\/product03\.png/);
  assert.match(html, /<section class="formula-section" id="section-4"/);
  assert.doesNotMatch(html, /class="info-counter"/);
  assert.match(html, /<section class="use-section" id="section-5"/);
});

test('Section 3 interaction selects four information states and swaps product art in transit', async () => {
  const html = await readFile(new URL('index.html', root), 'utf8');
  const js = await readFile(new URL('script.js', root), 'utf8');

  assert.match(js, /function buildInfoSlides\(/);
  assert.match(js, /data-info-slide/);
  assert.match(js, /section-3/);
  assert.match(js, /setProductVariant/);
  assert.match(html, /<button[^>]*data-info-tab="0"/);
  assert.match(js, /tab\.addEventListener\('click'/);
  assert.doesNotMatch(js, /pin: stage/);
});

test('Section 3 switches to its dedicated artwork midway through the travelling handoff', async () => {
  const js = await readFile(new URL('script.js', root), 'utf8');

  assert.match(js, /const targetVariant = productVariantForIndex\(nextIndex\);/);
  assert.match(js, /setProductVariant\(traveler, sourceVariant, true\);/);
  assert.match(js, /progress >= 0\.5[\s\S]*setProductVariant\(traveler, targetVariant, true\);/);
});

test('cream artwork is taken out of product layout flow', async () => {
  const css = await readFile(new URL('styles.css', root), 'utf8');

  assert.match(css, /\.info-product > \.info-cream--dollop\s*\{[^}]*position:\s*absolute;/s);
  assert.match(css, /\.info-product > \.info-cream--dollop\s*\{[^}]*width:\s*45\.287424%;/s);
  assert.match(css, /\.info-cream--dollop\s*\{[^}]*top:\s*93\.56166%;[^}]*left:\s*14\.92001%;[^}]*transform:\s*scaleX\(-1\);/s);
  assert.doesNotMatch(css, /\.info-cream--dollop\s*\{[^}]*translate\(/s);
  assert.match(css, /\.info-product > \.info-cream--dollop\s*\{[^}]*filter:\s*brightness\(1\.1\);/s);
  assert.match(css, /\.info-product\.is-visible \.info-cream--dollop\s*\{[^}]*opacity:\s*1;/s);
});
