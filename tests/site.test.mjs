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
  assert.match(html, /styles\.css\?v=20260812-58/);
  assert.match(html, /script\.js\?v=20260812-32/);
  assert.match(html, /"@type"\s*:\s*"Product"/);
  assert.match(html, /"offers"\s*:\s*\{[\s\S]*"@type"\s*:\s*"Offer"/);
  assert.match(html, /"priceCurrency"\s*:\s*"THB"/);
  assert.match(html, /"price"\s*:\s*"380"/);
  assert.match(html, /"availability"\s*:\s*"https:\/\/schema\.org\/InStock"/);
  assert.match(html, /"additionalProperty"\s*:\s*\[[\s\S]*"name"\s*:\s*"Tone-Up"[\s\S]*"name"\s*:\s*"Moisture"[\s\S]*"name"\s*:\s*"Primer"[\s\S]*"name"\s*:\s*"Whitening"/);
  assert.match(html, /class="use-price"><span[^>]*>โปรพิเศษ<\/span> <del[^>]*>490 บาท<\/del> <strong[^>]*>เหลือ 380 บาท<\/strong>/);
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

test('Section 2 keeps the right half of its transparent background art visible from the left edge of the site frame without a fade mask', async () => {
  const css = await readFile(new URL('styles.css', root), 'utf8');

  const section2Art = css.slice(css.lastIndexOf('/* Centre the Section 2 artwork'));
  assert.match(section2Art, /\.reveal-face\s*\{[\s\S]*left:\s*max\(100px, calc\(50% - var\(--content-max\) \/ 2 \+ 100px\)\);[\s\S]*width:\s*auto;[\s\S]*height:\s*100%;[\s\S]*object-fit:\s*contain;[\s\S]*transform:\s*translate\(-50%, 80px\) scale\(1\.4\);/);
  assert.doesNotMatch(css, /(?:-webkit-)?mask-image:\s*linear-gradient\(to right/);
});

test('Section 2 copy stays attached to the product and is not reset on a same-section ScrollTrigger refresh', async () => {
  const js = await readFile(new URL('script.js', root), 'utf8');
  const css = await readFile(new URL('styles.css', root), 'utf8');

  assert.match(js, /const productRect = anchors\[1\]\.getBoundingClientRect\(\);[\s\S]*visibleProductInset = 132;[\s\S]*rightPx = stageRect\.right - productRect\.left - visibleProductInset;[\s\S]*availableCopyWidth = Math\.max\(0, productRect\.left - stageRect\.left - 24\);[\s\S]*copyWidth = Math\.min\(window\.innerWidth \* 0\.41, 464, availableCopyWidth\)/);
  assert.match(js, /const copyTop = Math\.max\(8, productRect\.top - stageRect\.top - 12\);[\s\S]*const copyLeft = productRect\.left - stageRect\.left \+ productRect\.width \/ 2;[\s\S]*yPercent: -100/);
  assert.match(js, /if \(visible === isCopyVisible\) return;/);
  assert.match(js, /currentPosition \?\?= \{[\s\S]*left: sourceRect\.left \+ window\.scrollX,[\s\S]*top: sourceRect\.top \+ window\.scrollY/);
  assert.match(js, /const targetPosition = \{[\s\S]*left: targetRect\.left \+ window\.scrollX,[\s\S]*top: targetRect\.top \+ window\.scrollY/);
  assert.match(js, /gsap\.killTweensOf\(anchors\);[\s\S]*gsap\.set\(anchors, \{ autoAlpha: 0 \}\);/);
  assert.match(js, /const arrivalPoint = 0\.82/);
  assert.match(js, /const overshootDistance = Math\.min\(22, Math\.max\(10, travelDistance \* 0\.025\)\)/);
  assert.match(js, /targetPosition\.top \+ directionY \* overshootDistance/);
  assert.match(js, /if \(journeyTween\) \{[\s\S]*const travelerStyle = getComputedStyle\(traveler\);[\s\S]*startingOpacity = Number\.parseFloat\(travelerStyle\.opacity\);[\s\S]*journeyTween\.kill\(\);/);
  assert.doesNotMatch(js, /queuedIndex/);
  assert.match(js, /duration:\s*0\.68,[\s\S]*ease:\s*'power1\.inOut'/);
  assert.match(js, /interpolate\(currentPosition\.left, overshootPosition\.left, motionProgress\)[\s\S]*interpolate\(overshootPosition\.left, targetPosition\.left, motionProgress\)/);
  assert.match(js, /const lift = arriving \? Math\.sin\(Math\.PI \* motionProgress\) \* arcHeight : 0/);
  assert.match(js, /const fadeOpacity = progress < 0\.5[\s\S]*interpolate\(startingOpacity, 0,[\s\S]*interpolate\(0, 1,/);
  assert.doesNotMatch(js, /back\.out\(1\.25\)/);
  assert.doesNotMatch(js, /const blur = gsap\.utils\.interpolate\(0, 6/);
  assert.match(js, /onLeaveBack: \(\) => \{ if \(triggersReady\) moveProductTo\(anchorIndex - 1\); \}/);
  assert.doesNotMatch(js, /onEnterBack:/);
  assert.doesNotMatch(js, /ScrollTrigger\.addEventListener\('scrollEnd'/);
  assert.doesNotMatch(js, /window\.addEventListener\('scroll',[\s\S]*moveProductTo\(nextIndex\)/);
  assert.match(js, /const readingLine = window\.innerHeight \* 0\.28/);
  assert.match(css, /\.product-traveler\s*\{[\s\S]*position:\s*absolute;/);
});

test('Section 2 ends with the four-in-one product benefit summary', async () => {
  const html = await readFile(new URL('index.html', root), 'utf8');
  const css = await readFile(new URL('styles.css', root), 'utf8');
  const section2 = html.match(/<section class="reveal-section"[\s\S]*?<\/section>/)?.[0] ?? '';
  const section4 = html.match(/<section class="formula-section"[\s\S]*?<\/section>/)?.[0] ?? '';

  assert.match(section2, /class="reveal-product-benefits"[\s\S]*4 คุณสมบัติในหนึ่งเดียว:.*Tone-Up · Moisture · Primer · Whitening/);
  assert.doesNotMatch(section4, /4 คุณสมบัติในหนึ่งเดียว/);
  assert.match(css, /\.reveal-product-benefits\s*\{[^}]*left:\s*50%;[^}]*text-align:\s*center;[^}]*transform:\s*translateX\(-50%\)/);
  assert.match(css, /#reveal \.product-destination\s*\{\s*bottom:\s*3\.3rem;/);
  assert.match(css, /\.reveal-product-benefits\s*\{[^}]*bottom:\s*\.8rem;[^}]*transform:\s*none/);
  assert.match(css, /#reveal\.reveal-section\s*\{\s*height:\s*clamp\(29rem, calc\(72svh \+ 2rem\), 38rem\)/);
});

test('language switcher supplies Thai, English, and Korean content with a header order action', async () => {
  const html = await readFile(new URL('index.html', root), 'utf8');
  const js = await readFile(new URL('script.js', root), 'utf8');

  assert.match(html, /class="header-order" href="https:\/\/lin\.ee\/sGY1qQP"/);
  assert.match(html, /data-language="th" href="\/">ไทย/);
  assert.match(html, /data-language="en" href="\/en\/">English/);
  assert.match(html, /data-language="ko" href="\/ko\/">한국어/);
  assert.match(js, /const translations = \{[\s\S]*en:\s*\{[\s\S]*ko:\s*\{/);
  assert.match(js, /localStorage\.setItem\('wswss-language', language\)/);
});

test('English and Korean are crawlable, fully static locale pages', async () => {
  const [english, korean] = await Promise.all([
    readFile(new URL('en/index.html', root), 'utf8'),
    readFile(new URL('ko/index.html', root), 'utf8'),
  ]);

  for (const [html, language, url, ogLocale] of [
    [english, 'en', 'https://www.wswss.com/en/', 'en_US'],
    [korean, 'ko', 'https://www.wswss.com/ko/', 'ko_KR'],
  ]) {
    assert.match(html, new RegExp(`<html lang="${language}" data-static-language="${language}"`));
    assert.match(html, new RegExp(`rel="canonical" href="${url}"`));
    assert.match(html, new RegExp(`property="og:locale" content="${ogLocale}"`));
    assert.match(html, /hreflang="th" href="https:\/\/www\.wswss\.com\/"/);
    assert.match(html, /hreflang="en" href="https:\/\/www\.wswss\.com\/en\/"/);
    assert.match(html, /hreflang="ko" href="https:\/\/www\.wswss\.com\/ko\/"/);
    assert.match(html, /hreflang="x-default" href="https:\/\/www\.wswss\.com\/"/);
    assert.match(html, /src="\.\.\/script\.js\?v=20260812-32"/);
  }

  assert.doesNotMatch(english, /[ก-๙]|[가-힣]/);
  assert.doesNotMatch(korean, /[ก-๙]/);
});

test('English and Korean typography is compact enough for the existing responsive sections', async () => {
  const css = await readFile(new URL('styles.css', root), 'utf8');

  assert.match(css, /html\[data-language="en"\] \.use-cta-copy h2, html\[data-language="ko"\] \.use-cta-copy h2 \{ font-size: clamp\(1\.5rem, 2\.7vw, 2\.5rem\)/);
  assert.match(css, /html\[data-language="en"\] \.info-slide strong, html\[data-language="ko"\] \.info-slide strong \{ font-size: clamp\(\.72rem, \.9vw, \.88rem\)/);
  assert.match(css, /overflow-wrap: anywhere/);
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
  assert.match(html, /ลงก่อนกันแดด ผิวดูใสขึ้น เรียบเนียนขึ้น รูขุมขนดูเล็กลง เมคอัพสวยไม่ดรอป/);
});

test('crawler discovery files expose the canonical site to search and AI crawlers', async () => {
  const robots = await readFile(new URL('robots.txt', root), 'utf8');
  const sitemap = await readFile(new URL('sitemap.xml', root), 'utf8');
  const llms = await readFile(new URL('llms.txt', root), 'utf8');

  assert.match(robots, /User-agent: OAI-SearchBot[\s\S]*Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/www\.wswss\.com\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/www\.wswss\.com\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/www\.wswss\.com\/en\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/www\.wswss\.com\/ko\/<\/loc>/);
  assert.match(sitemap, /พรพรร WSWSS/);
  assert.match(llms, /พรพรร WSWSS/);
  assert.match(llms, /10-2-6800028677/);
  assert.match(llms, /ISO 22716 \(Cosmetics GMP\)/);
  assert.match(llms, /Tone-Up \(ผิวดูกระจ่างใสอย่างเป็นธรรมชาติ\)/);
});

test('portrait mobile keeps Section 4 and 5 products inside their own stages', async () => {
  const css = await readFile(new URL('styles.css', root), 'utf8');
  const finalContract = css.slice(css.lastIndexOf('/* Final responsive contract'));

  assert.match(finalContract, /@media \(orientation: portrait\) and \(max-width: 699px\)[\s\S]*#section-4 \.formula-product,[\s\S]*#section-5 \.use-product\s*\{[\s\S]*top:\s*auto;[\s\S]*bottom:\s*max\(1rem, env\(safe-area-inset-bottom\)\);/);
});
