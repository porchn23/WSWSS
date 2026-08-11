import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('Section 4 contains factory facts and supplied certificate previews', async () => {
  const html = await readFile(new URL('index.html', root), 'utf8');
  const css = await readFile(new URL('styles.css', root), 'utf8');

  assert.match(html, /class="formula-section" id="section-4"/);
  assert.match(html, /BEHIND THE FORMULA/);
  assert.match(html, /10-2-6800028677/);
  assert.match(html, /assets\/section4\/iso22716\.png/);
  assert.match(html, /class="product-destination formula-product" data-product-anchor/);
  assert.match(css, /\.formula-section\s*\{/);
  assert.match(css, /\.document-rail\s*\{/);
});
