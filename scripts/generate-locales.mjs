import { readFile, writeFile } from 'node:fs/promises';

const rootHtml = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const appScript = await readFile(new URL('../script.js', import.meta.url), 'utf8');
const translationsSource = appScript.match(/const translations = (\{[\s\S]*?\n\};)\n\nfunction setupLanguageSwitcher/);
if (!translationsSource) throw new Error('Could not locate translation dictionary.');
const translations = Function(`return ${translationsSource[1]}`)();

const locales = {
  en: {
    url: 'https://www.wswss.com/en/',
    title: 'WSWSS Bright Tone-Up Moisture Cream | Korean Tone-Up Cream',
    description: 'WSWSS Bright Tone-Up Moisture Cream is a Korean 4-in-1 tone-up, moisture, primer and whitening cream for brighter-, smoother-looking skin.',
    productDescription: 'A lightweight Korean tone-up moisture cream that helps skin look brighter, moisturized, smooth and natural.',
    keywords: 'WSWSS, Bright Tone-Up Moisture Cream, Korean tone-up cream, moisturizing tone-up cream, primer cream, natural makeup',
    imageAlt: 'WSWSS Bright Tone-Up Moisture Cream',
    category: 'Korean tone-up and facial skincare cream',
    alternateName: 'WSWSS Korean Tone-Up Cream',
    properties: ['Helps skin look naturally brighter', 'Helps replenish moisture', 'Helps prepare skin for makeup and blur pores', 'Helps skin look brighter'],
    faceAlt: 'Natural-looking healthy skin',
    ogLocale: 'en_US',
    languageCode: 'en',
  },
  ko: {
    url: 'https://www.wswss.com/ko/',
    title: 'WSWSS 브라이트 톤업 모이스처 크림 | 한국 톤업 크림',
    description: 'WSWSS 브라이트 톤업 모이스처 크림은 피부를 화사하고 촉촉하며 매끈하게 표현하는 한국 4-in-1 톤업·보습·프라이머·브라이트닝 크림입니다.',
    productDescription: '피부를 자연스럽게 화사하고 촉촉하며 매끈하게 표현하는 가벼운 사용감의 한국 톤업 모이스처 크림입니다.',
    keywords: 'WSWSS, 브라이트 톤업 모이스처 크림, 한국 톤업 크림, 보습 톤업 크림, 프라이머 크림, 내추럴 메이크업',
    imageAlt: 'WSWSS 브라이트 톤업 모이스처 크림',
    category: '한국 톤업 및 페이셜 스킨케어 크림',
    alternateName: 'WSWSS 한국 톤업 크림',
    properties: ['피부를 자연스럽게 화사하게 표현', '수분 충전', '메이크업 전 피부를 정돈하고 모공을 자연스럽게 블러', '피부를 더 화사하게 표현'],
    faceAlt: '자연스럽고 건강해 보이는 피부',
    ogLocale: 'ko_KR',
    languageCode: 'ko',
  },
};

const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const hreflang = () => [
  '    <link rel="alternate" hreflang="th" href="https://www.wswss.com/" />',
  '    <link rel="alternate" hreflang="en" href="https://www.wswss.com/en/" />',
  '    <link rel="alternate" hreflang="ko" href="https://www.wswss.com/ko/" />',
  '    <link rel="alternate" hreflang="x-default" href="https://www.wswss.com/" />',
].join('\n');

for (const [language, locale] of Object.entries(locales)) {
  const dictionary = translations[language];
  let output = rootHtml
    .replace('<html lang="th" data-static-language="th">', `<html lang="${language}" data-static-language="${language}" data-language="${language}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${locale.title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(" \/>)/, `$1${locale.description}$2`)
    .replace(/(<meta name="keywords" content=")[^"]*(" \/>)/, `$1${locale.keywords}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(" \/>)/, `$1${locale.title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(" \/>)/, `$1${locale.description}$2`)
    .replace(/(<meta property="og:locale" content=")[^"]*(" \/>)/, `$1${locale.ogLocale}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(" \/>)/, `$1${locale.url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(" \/>)/, `$1${locale.title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(" \/>)/, `$1${locale.description}$2`)
    .replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${locale.url}" />`)
    .replace(/(?:\s*<link rel="alternate" hreflang="(?:th|en|ko|x-default)" href="[^"]+" \/>)+/, `\n${hreflang()}`)
    .replace(/("description": ")[^"]*(")/, `$1${locale.productDescription}$2`)
    .replace(/("inLanguage": ")[^"]*(")/, `$1${locale.languageCode}$2`)
    .replace(/(href|src)="assets\//g, '$1="../assets/')
    .replace('href="styles.css?', 'href="../styles.css?')
    .replace('src="script.js?', 'src="../script.js?')
    .replaceAll('พรพรร WSWSS Bright Tone-Up Moisture Cream', locale.imageAlt)
    .replaceAll('WSWSS — Whitening Solution With Skin Specialist', locale.imageAlt)
    .replaceAll('ผิวจริงที่ยังคงรายละเอียดและความเป็นธรรมชาติ', locale.faceAlt)
    .replaceAll('"alternateName": "พรพรร"', '"alternateName": "WSWSS"')
    .replaceAll('"name": "พรพรร WSWSS"', '"name": "WSWSS"')
    .replaceAll('"alternateName": "พรพรร WSWSS ครีมโทนอัพเกาหลี"', `"alternateName": "${locale.alternateName}"`)
    .replaceAll('"category": "ครีมโทนอัพและผลิตภัณฑ์บำรุงผิวหน้า"', `"category": "${locale.category}"`)
    .replaceAll('"value": "ช่วยให้ผิวดูกระจ่างใสอย่างเป็นธรรมชาติ"', `"value": "${locale.properties[0]}"`)
    .replaceAll('"value": "ช่วยเติมความชุ่มชื้น"', `"value": "${locale.properties[1]}"`)
    .replaceAll('"value": "ช่วยเตรียมผิวก่อนแต่งหน้าและเบลอรูขุมขน"', `"value": "${locale.properties[2]}"`)
    .replaceAll('"value": "ช่วยให้ผิวดูกระจ่างใส"', `"value": "${locale.properties[3]}"`);

  if (language === 'en') output = output.replaceAll('"alternateName": "㈜프로유화장품"', '"alternateName": "PROYOU COSMETICS"');

  output = output.replace(/<(\w+)([^>]*\bdata-i18n="([^"]+)"[^>]*)>[\s\S]*?<\/\1>/g, (full, tag, attributes, key) => {
    const value = dictionary[key];
    return value == null ? full : `<${tag}${attributes}>${escapeHtml(value)}</${tag}>`;
  });

  // Locale names are intentionally shown as ISO-like codes on non-Thai pages,
  // preventing Thai/Korean text from being mixed into the English source.
  output = output
    .replace(/(<a role="menuitem" data-language="th"[^>]*>)[\s\S]*?(<\/a>)/, '$1TH$2')
    .replace(/(<a role="menuitem" data-language="en"[^>]*>)[\s\S]*?(<\/a>)/, '$1EN$2')
    .replace(/(<a role="menuitem" data-language="ko"[^>]*>)[\s\S]*?(<\/a>)/, '$1KO$2');

  await writeFile(new URL(`../${language}/index.html`, import.meta.url), output);
}
