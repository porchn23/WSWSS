import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('all internal navigation targets exist and no placeholder legal links remain', async () => {
  const html = await readFile(new URL('index.html', root), 'utf8');
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  const fragments = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);

  assert.ok(fragments.length > 0);
  for (const fragment of fragments) assert.ok(ids.has(fragment), `missing #${fragment}`);
  assert.doesNotMatch(html, /href="#(?:about|privacy|terms)"/);
});

test('SEO and AI discovery metadata describe the approved product without SPF claims', async () => {
  const html = await readFile(new URL('index.html', root), 'utf8');

  assert.match(html, /<title>[^<]*พรพรร[^<]*WSWSS/i);
  assert.match(html, /name="description"[^>]*พรพรร[^>]*WSWSS/i);
  assert.match(html, /name="robots"/i);
  assert.match(html, /rel="canonical"[^>]*https:\/\/www\.wswss\.com\//i);
  assert.match(html, /property="og:title"/i);
  assert.match(html, /property="og:image:width" content="2023"/i);
  assert.match(html, /name="twitter:card"/i);
  assert.match(html, /rel="apple-touch-icon"[^>]*assets\/favicon_io\/apple-touch-icon\.png/i);
  assert.match(html, /rel="manifest"[^>]*assets\/favicon_io\/site\.webmanifest/i);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /"@type"\s*:\s*"Product"/);
  assert.match(html, /ครีมโทนอัพเกาหลี/);
  assert.doesNotMatch(html, /SPF\s*50/i);
});

test('responsive product destinations are CSS-owned and use one shared size token', async () => {
  const css = await readFile(new URL('styles.css', root), 'utf8');
  const js = await readFile(new URL('script.js', root), 'utf8');

  assert.match(css, /--shared-product-width\s*:/);
  assert.match(css, /\.product-shot[\s\S]*\.product-destination[\s\S]*width:\s*var\(--shared-product-width\)/);
  assert.doesNotMatch(js, /anchors\.slice\(1\)[\s\S]{0,180}width:\s*sourceRect\.width/);
  assert.doesNotMatch(js, /anchors\.slice\(1\)[\s\S]{0,180}left:\s*sourceRect\.left/);
});

test('approved sections and product assets remain present', async () => {
  const html = await readFile(new URL('index.html', root), 'utf8');

  for (const id of ['product', 'reveal', 'section-3', 'section-4', 'section-5']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.equal((html.match(/data-product-anchor/g) ?? []).length, 5);
  assert.match(html, /assets\/wswss-product-cutout\.png/);
  assert.match(html, /assets\/session3\/WSWSS-PD001\.png/);
  assert.match(html, /https:\/\/lin\.ee\/sGY1qQP/);
});

test('crawler discovery files expose the canonical site to search and AI crawlers', async () => {
  const robots = await readFile(new URL('robots.txt', root), 'utf8');
  const sitemap = await readFile(new URL('sitemap.xml', root), 'utf8');
  const llms = await readFile(new URL('llms.txt', root), 'utf8');

  assert.match(robots, /User-agent: OAI-SearchBot[\s\S]*Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/www\.wswss\.com\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/www\.wswss\.com\/<\/loc>/);
  assert.match(sitemap, /พรพรร WSWSS/);
  assert.match(llms, /พรพรร WSWSS/);
  assert.match(llms, /10-2-6800028677/);
});

test('portrait mobile keeps Section 4 and 5 products inside their own stages', async () => {
  const css = await readFile(new URL('styles.css', root), 'utf8');
  const finalContract = css.slice(css.lastIndexOf('/* Final responsive contract'));

  assert.match(finalContract, /@media \(orientation: portrait\) and \(max-width: 699px\)[\s\S]*#section-4 \.formula-product,[\s\S]*#section-5 \.use-product\s*\{[\s\S]*top:\s*auto;[\s\S]*bottom:\s*max\(1rem, env\(safe-area-inset-bottom\)\);/);
});
