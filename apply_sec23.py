from pathlib import Path
import re

ROOT = Path(__file__).parent

icons = [
'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M10 28c4-12 8-17 12-17 5 0 8 7 8 14"/><path d="M13 31c5-5 10-7 16-6"/></svg>',
'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 21c4-6 8-9 12-9s8 3 12 9"/><path d="M10 27h20"/><path d="M15 32h10"/></svg>',
'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M11 8h18v24H11z"/><path d="M15 14h10M15 20h10M15 26h7"/></svg>',
'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 4C15 12 10 17 10 24a10 10 0 0 0 20 0C30 17 25 12 20 4Z"/><path d="M15 25c1 4 3 6 7 6"/></svg>',
'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 24c5-7 19-7 24 0"/><path d="M12 29c4-4 12-4 16 0"/><path d="M17 34h6"/></svg>',
]

langs = {
'index.html': {
 'prefix':'', 'benefits':['ไม่จับเส้นขน','ไม่เป็นขุย','ลดการติดเสื้อผ้า','กันน้ำยาวนาน','ล้างออกง่าย'],
 'kicker':'BRIGHT TONE-UP MOISTURE CREAM', 'payoff':'Tone-Up · Moisture · Primer · Whitening', 'aria':'4 คุณสมบัติหลักของผลิตภัณฑ์',
 'origin':'MOISTURE TONE-UP CREAM · MADE IN KOREA',
 'slides':[
   ('TONE-UP','ผิวดูกระจ่างใสขึ้นอย่างเป็นธรรมชาติ','Titanium Dioxide · Niacinamide','ช่วยให้โทนผิวดูสว่างขึ้น พร้อมฟินิชที่ดูเป็นธรรมชาติ ไม่ลอย ไม่เทา'),
   ('MOISTURE','เติมความชุ่มชื้น ให้ผิวนุ่มและสบาย','Glycerin · Butylene Glycol · Sodium Hyaluronate','สูตรมีสารให้ความชุ่มชื้นหลายชนิด ช่วยให้ผิวดูนุ่มลื่นและสบายผิว'),
   ('PRIMER','ช่วยให้ผิวดูเรียบเนียนและพรางรูขุมขน','Cyclopentasiloxane · Phenyl Trimethicone · Dimethicone Crosspolymer','Texture system ช่วยให้เนื้อครีมเกลี่ยลื่น แนบผิว และเตรียมผิวให้พร้อมสำหรับเมคอัพ'),
   ('WHITENING','ดูแลผิวให้ดูกระจ่างใส','Glutathione · Niacinamide · Tranexamic Acid · Ascorbyl Glucoside','Whitening Functional Cosmetics พร้อมสารสำคัญด้านความกระจ่างใส และยังมี Galactomyces Ferment Filtrate กับ Lactobacillus Ferment Filtrate ในสูตร'),
 ],
},
'en/index.html': {
 'prefix':'../', 'benefits':['Doesn’t catch on facial hair','No pilling','Reduced transfer to clothing','Long-lasting water resistance','Easy to cleanse'],
 'kicker':'BRIGHT TONE-UP MOISTURE CREAM', 'payoff':'Tone-Up · Moisture · Primer · Whitening', 'aria':'4 core product benefits',
 'origin':'MOISTURE TONE-UP CREAM · MADE IN KOREA',
 'slides':[
   ('TONE-UP','A naturally brighter-looking tone','Titanium Dioxide · Niacinamide','Helps skin look brighter with a natural-looking finish that does not appear ashy or overly white.'),
   ('MOISTURE','Hydrated, soft and comfortable-looking skin','Glycerin · Butylene Glycol · Sodium Hyaluronate','A moisture-focused formula that helps skin feel soft, smooth and comfortable.'),
   ('PRIMER','Smoother-looking skin with blurred pores','Cyclopentasiloxane · Phenyl Trimethicone · Dimethicone Crosspolymer','The texture system helps the cream glide smoothly, sit close to skin and prep it for makeup.'),
   ('WHITENING','Helps support brighter-looking skin','Glutathione · Niacinamide · Tranexamic Acid · Ascorbyl Glucoside','A whitening functional cosmetic formula that also contains Galactomyces Ferment Filtrate and Lactobacillus Ferment Filtrate.'),
 ],
},
'ko/index.html': {
 'prefix':'../', 'benefits':['잔털에 끼지 않음','밀림·각질 부각 없이','옷 묻어남 감소','오래가는 워터 레지스턴스','간편한 세안'],
 'kicker':'브라이트 톤업 모이스처 크림', 'payoff':'톤업 · 보습 · 프라이머 · 브라이트닝', 'aria':'제품의 4가지 핵심 기능',
 'origin':'수분 톤업 크림 · MADE IN KOREA',
 'slides':[
   ('TONE-UP','피부를 자연스럽게 더 화사하게','Titanium Dioxide · Niacinamide','피부 톤을 더 밝아 보이게 하면서도 들뜨거나 잿빛으로 보이지 않는 자연스러운 마무리를 돕습니다.'),
   ('MOISTURE','촉촉하고 부드럽고 편안한 피부 표현','Glycerin · Butylene Glycol · Sodium Hyaluronate','수분을 고려한 포뮬러로 피부를 부드럽고 매끄럽고 편안하게 가꾸어 줍니다.'),
   ('PRIMER','매끈한 피부 표현과 모공 블러 효과','Cyclopentasiloxane · Phenyl Trimethicone · Dimethicone Crosspolymer','텍스처 시스템이 부드럽게 펴 발리고 피부에 밀착되어 메이크업 전 피부를 정돈하는 데 도움을 줍니다.'),
   ('WHITENING','맑고 화사한 피부를 위한 브라이트닝 케어','Glutathione · Niacinamide · Tranexamic Acid · Ascorbyl Glucoside','미백 기능성 화장품 포뮬러이며 Galactomyces Ferment Filtrate와 Lactobacillus Ferment Filtrate도 함유되어 있습니다.'),
 ],
},
}

suffixes=['One','Two','Three','Four','Five']
slide_keys=[('slideToneUpResult','slideToneUpIngredients','slideToneUpCopy'),('slideMoistureResult','slideMoistureIngredients','slideMoistureCopy'),('slidePrimerResult','slidePrimerIngredients','slidePrimerCopy'),('slideWhiteningResult','slideWhiteningIngredients','slideWhiteningCopy')]

for rel,d in langs.items():
    p=ROOT/rel; text=p.read_text(encoding='utf-8'); pre=d['prefix']
    lis=[]
    for i,(label,icon) in enumerate(zip(d['benefits'],icons)):
        lis.append(f'''                <li>\n                  {icon}\n                  <span data-i18n="revealBenefit{suffixes[i]}">{label}</span>\n                </li>''')
    sec2=f'''<section class="reveal-section" id="reveal" aria-label="Product performance">\n        <div class="reveal-stage">\n          <img class="reveal-face" src="{pre}assets/wswss-bg-section2.webp" loading="lazy" decoding="async" alt="" aria-hidden="true" />\n          <div class="reveal-copy">\n            <div class="reveal-text">\n              <ul class="reveal-benefits">\n{chr(10).join(lis)}\n              </ul>\n            </div>\n          </div>\n          <figure class="product-destination" data-product-anchor aria-hidden="true">\n            <span class="product-stack">\n              <img class="product-image is-active" data-product-variant="standard" src="{pre}assets/wswss-product-cutout.webp" loading="eager" fetchpriority="low" decoding="async" alt="" />\n              <img class="product-image product-image--section3" data-product-variant="section3" src="{pre}assets/session3/WSWSS-PD001.webp?v=20260812-01" loading="eager" fetchpriority="low" decoding="async" alt="" />\n            </span>\n          </figure>\n        </div>\n      </section>'''
    slides=[]
    for i,(title,result,ings,copy) in enumerate(d['slides']):
        rk,ik,ck=slide_keys[i]; active=' is-active' if i==0 else ''
        slides.append(f'''              <article class="info-slide{active}" data-info-slide="{i}">\n                <p class="info-slide-label">{title}</p>\n                <div class="info-slide-grid">\n                  <div><span>{title}</span><strong data-i18n="{rk}">{result}</strong></div>\n                  <b>+</b>\n                  <div><span>FORMULA HIGHLIGHTS</span><strong data-i18n="{ik}">{ings}</strong></div>\n                </div>\n                <p data-i18n="{ck}">{copy}</p>\n              </article>''')
    sec3=f'''<section class="info-section" id="section-3" aria-labelledby="section-3-title">\n        <div class="info-stage">\n          <img class="info-bg" src="{pre}assets/session3/bg.webp" loading="lazy" decoding="async" fetchpriority="low" alt="" aria-hidden="true" />\n          <div class="info-content">\n            <p class="info-kicker" data-i18n="infoKicker">{d['kicker']}</p>\n            <h2 id="section-3-title">4 CORE BENEFITS</h2>\n            <p class="info-payoff" data-i18n="infoPayoff">{d['payoff']}</p>\n            <div class="info-panel" aria-live="polite">\n{chr(10).join(slides)}\n            </div>\n            <div class="info-tabs" aria-label="{d['aria']}">\n              <button class="is-active" type="button" data-info-tab="0" aria-pressed="true">01 TONE-UP</button>\n              <button type="button" data-info-tab="1" aria-pressed="false">02 MOISTURE</button>\n              <button type="button" data-info-tab="2" aria-pressed="false">03 PRIMER</button>\n              <button type="button" data-info-tab="3" aria-pressed="false">04 WHITENING</button>\n            </div>\n            <p class="info-origin" data-i18n="infoOrigin">{d['origin']}</p>\n          </div>\n          <figure class="product-destination info-product" data-product-anchor aria-hidden="true">\n            <img class="info-cream info-cream--dollop" src="{pre}assets/session3/product02.webp" loading="lazy" decoding="async" fetchpriority="low" alt="" />\n            <span class="product-stack">\n              <img class="product-image" data-product-variant="standard" src="{pre}assets/wswss-product-cutout.webp" loading="eager" fetchpriority="low" decoding="async" alt="" />\n              <img class="product-image product-image--section3" data-product-variant="section3" src="{pre}assets/session3/WSWSS-PD001.webp?v=20260812-01" loading="eager" fetchpriority="low" decoding="async" alt="" />\n            </span>\n          </figure>\n        </div>\n      </section>'''

    # Replace section reveal through immediately before section 3.
    m2=re.search(r'<section\b[^>]*\bid="reveal"[^>]*>',text); m3=re.search(r'<section\b[^>]*\bid="section-3"[^>]*>',text)
    assert m2 and m3 and m2.start()<m3.start(), rel
    text=text[:m2.start()]+sec2+'\n\n      '+text[m3.start():]
    # Replace section 3 through immediately before section 4.
    m3=re.search(r'<section\b[^>]*\bid="section-3"[^>]*>',text); m4=re.search(r'<section\b[^>]*\bid="section-4"[^>]*>',text)
    assert m3 and m4 and m3.start()<m4.start(), rel
    text=text[:m3.start()]+sec3+'\n\n      '+text[m4.start():]
    text=text.replace('script.js?v=20260812-40','script.js?v=20260812-41')
    p.write_text(text,encoding='utf-8')

sp=ROOT/'script.js'; s=sp.read_text(encoding='utf-8')
en_new="""    revealBenefitOne: 'Doesn’t catch on facial hair', revealBenefitTwo: 'No pilling', revealBenefitThree: 'Reduced transfer to clothing', revealBenefitFour: 'Long-lasting water resistance', revealBenefitFive: 'Easy to cleanse',
    infoPayoff: 'Tone-Up · Moisture · Primer · Whitening',
    slideToneUpResult: 'A naturally brighter-looking tone', slideToneUpIngredients: 'Titanium Dioxide · Niacinamide', slideToneUpCopy: 'Helps skin look brighter with a natural-looking finish that does not appear ashy or overly white.',
    slideMoistureResult: 'Hydrated, soft and comfortable-looking skin', slideMoistureIngredients: 'Glycerin · Butylene Glycol · Sodium Hyaluronate', slideMoistureCopy: 'A moisture-focused formula that helps skin feel soft, smooth and comfortable.',
    slidePrimerResult: 'Smoother-looking skin with blurred pores', slidePrimerIngredients: 'Cyclopentasiloxane · Phenyl Trimethicone · Dimethicone Crosspolymer', slidePrimerCopy: 'The texture system helps the cream glide smoothly, sit close to skin and prep it for makeup.',
    slideWhiteningResult: 'Helps support brighter-looking skin', slideWhiteningIngredients: 'Glutathione · Niacinamide · Tranexamic Acid · Ascorbyl Glucoside', slideWhiteningCopy: 'A whitening functional cosmetic formula that also contains Galactomyces Ferment Filtrate and Lactobacillus Ferment Filtrate.',"""
ko_new="""    revealBenefitOne: '잔털에 끼지 않음', revealBenefitTwo: '밀림·각질 부각 없이', revealBenefitThree: '옷 묻어남 감소', revealBenefitFour: '오래가는 워터 레지스턴스', revealBenefitFive: '간편한 세안',
    infoPayoff: '톤업 · 보습 · 프라이머 · 브라이트닝',
    slideToneUpResult: '피부를 자연스럽게 더 화사하게', slideToneUpIngredients: 'Titanium Dioxide · Niacinamide', slideToneUpCopy: '피부 톤을 더 밝아 보이게 하면서도 들뜨거나 잿빛으로 보이지 않는 자연스러운 마무리를 돕습니다.',
    slideMoistureResult: '촉촉하고 부드럽고 편안한 피부 표현', slideMoistureIngredients: 'Glycerin · Butylene Glycol · Sodium Hyaluronate', slideMoistureCopy: '수분을 고려한 포뮬러로 피부를 부드럽고 매끄럽고 편안하게 가꾸어 줍니다.',
    slidePrimerResult: '매끈한 피부 표현과 모공 블러 효과', slidePrimerIngredients: 'Cyclopentasiloxane · Phenyl Trimethicone · Dimethicone Crosspolymer', slidePrimerCopy: '텍스처 시스템이 부드럽게 펴 발리고 피부에 밀착되어 메이크업 전 피부를 정돈하는 데 도움을 줍니다.',
    slideWhiteningResult: '맑고 화사한 피부를 위한 브라이트닝 케어', slideWhiteningIngredients: 'Glutathione · Niacinamide · Tranexamic Acid · Ascorbyl Glucoside', slideWhiteningCopy: '미백 기능성 화장품 포뮬러이며 Galactomyces Ferment Filtrate와 Lactobacillus Ferment Filtrate도 함유되어 있습니다.',"""
# replace only the old reveal/slide translation cluster within each language dictionary
s,n1=re.subn(r"    revealPremise: 'Natural makeup should not begin by covering up real skin\.',.*?    slideFourLong: 'Long-lasting for 8\+ hours'.*?\n", en_new+'\n', s, count=1, flags=re.S)
s,n2=re.subn(r"    revealPremise: '내추럴 메이크업은 본연의 피부를 가리는 것에서 시작하지 않습니다\.',.*?    slideFourLong: '8시간 이상 지속'.*?\n", ko_new+'\n', s, count=1, flags=re.S)
assert n1==1 and n2==1, (n1,n2)
s=s.replace("infoKicker: 'MOISTURE TONE-UP'", "infoKicker: 'BRIGHT TONE-UP MOISTURE CREAM'")
s=s.replace("infoKicker: '수분 톤업'", "infoKicker: '브라이트 톤업 모이스처 크림'")
sp.write_text(s,encoding='utf-8')
