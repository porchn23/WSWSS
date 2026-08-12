from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(__file__).parent
expected = {
    'index.html': {
        'benefits': ['ไม่จับเส้นขน', 'ไม่เป็นขุย', 'ลดการติดเสื้อผ้า', 'กันน้ำยาวนาน', 'ล้างออกง่าย'],
        'tabs': ['01 TONE-UP', '02 MOISTURE', '03 PRIMER', '04 WHITENING'],
        'ingredients': ['Titanium Dioxide', 'Glycerin', 'Sodium Hyaluronate', 'Cyclopentasiloxane', 'Glutathione', 'Tranexamic Acid', 'Ascorbyl Glucoside'],
    },
    'en/index.html': {
        'benefits': ['Doesn’t catch on facial hair', 'No pilling', 'Reduced transfer to clothing', 'Long-lasting water resistance', 'Easy to cleanse'],
        'tabs': ['01 TONE-UP', '02 MOISTURE', '03 PRIMER', '04 WHITENING'],
        'ingredients': ['Titanium Dioxide', 'Glycerin', 'Sodium Hyaluronate', 'Cyclopentasiloxane', 'Glutathione', 'Tranexamic Acid', 'Ascorbyl Glucoside'],
    },
    'ko/index.html': {
        'benefits': ['잔털에 끼지 않음', '밀림 없이', '옷 묻어남 감소', '오래가는 워터 레지스턴스', '간편한 세안'],
        'tabs': ['01 TONE-UP', '02 MOISTURE', '03 PRIMER', '04 WHITENING'],
        'ingredients': ['Titanium Dioxide', 'Glycerin', 'Sodium Hyaluronate', 'Cyclopentasiloxane', 'Glutathione', 'Tranexamic Acid', 'Ascorbyl Glucoside'],
    },
}

for rel, exp in expected.items():
    html = (ROOT / rel).read_text(encoding='utf-8')
    soup = BeautifulSoup(html, 'html.parser')
    reveal = soup.select_one('#reveal')
    assert reveal, rel
    benefits = [x.get_text(' ', strip=True) for x in reveal.select('.reveal-benefits li')]
    assert benefits == exp['benefits'], (rel, benefits)
    assert not reveal.select_one('.reveal-product-benefits'), f'{rel}: old four-benefits footer still exists'
    assert not reveal.select_one('.reveal-premise'), f'{rel}: old reveal premise still exists'
    assert not reveal.select_one('.reveal-title'), f'{rel}: old reveal title still exists'

    section3 = soup.select_one('#section-3')
    tabs = [b.get_text(' ', strip=True) for b in section3.select('.info-tabs button')]
    assert tabs == exp['tabs'], (rel, tabs)
    assert section3.select_one('#section-3-title').get_text(' ', strip=True) == '4 CORE BENEFITS'
    text = section3.get_text(' ', strip=True)
    for ing in exp['ingredients']:
        assert ing in text, (rel, ing)

script = (ROOT / 'script.js').read_text(encoding='utf-8')
for needle in ['revealBenefitFour', 'revealBenefitFive', 'slideToneUpIngredients', 'slideMoistureIngredients', 'slidePrimerIngredients', 'slideWhiteningIngredients']:
    assert needle in script, needle

# Guard the animation/ownership contracts that must remain intact.
for needle in ['duration: 0.58', 'const arrivalPoint = 0.82', 'const transitionTravelOpacity = 0', 'resolveActiveIndex', 'settledIndex', 'targetIndex']:
    assert needle in script, f'missing animation/ownership contract: {needle}'

print('Section 2/3 regression checks passed')
