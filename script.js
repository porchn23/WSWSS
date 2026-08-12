const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const copyrightYear = document.querySelector('#copyright-year');
if (copyrightYear) copyrightYear.textContent = String(new Date().getFullYear());

const translations = {
  en: {
    navProduct: 'PRODUCT', navReveal: 'SKIN REVEAL', navWhy: 'WHY WSWSS', navStandards: 'STANDARDS', navHow: 'HOW TO USE', headerOrder: 'ORDER NOW',
    heroToday: 'Today,', heroMakeup: 'makeup', heroBeautiful: 'looks beautiful.', heroBelief: 'Even without makeup, your skin can look beautiful and natural. WSWSS helps skin look brighter, moisturized, and comfortable all day.',
    revealPremise: 'Natural makeup should not begin by covering up real skin.', revealTitleOne: 'Reveal your beauty,', revealTitleTwo: 'beyond what it was before.', revealBenefitOne: 'Show real skin', revealBenefitTwo: 'No floating look', revealBenefitThree: 'No dull cast',
    fourBenefits: '4 benefits in one: Tone-Up · Moisture · Primer · Whitening — For skin that looks brighter, moisturized, smoother, and ready for makeup.',
    infoPayoff: 'Bright · Moisturized · Smooth', slideOneToneUp: 'Helps skin look brighter', slideOneMoisture: 'Helps replenish moisture', slideOneCopy: 'Together, they help skin look naturally brighter, moisturized, and smooth.',
    slideTwoTexture: 'Adheres smoothly to skin without catching on facial hair', slideTwoPrimerLabel: 'Primer', slideTwoPrimer: 'Prepares skin for makeup and helps blur pores', slideTwoCopy: 'For a smoother-looking finish without settling, caking, or pilling.',
    slideThreeSet: 'Once set, helps reduce transfer to clothing on contact', slideThreeTransfer: 'Helps reduce marks from fabric contact', slideThreeCopy: 'Feel confident throughout the day, even in dark clothing.',
    slideFourLong: 'Long-lasting for 8+ hours', slideFourWater: 'Water- and sweat-resistant all day', slideFourCopy: 'Water-resistant for 8+ hours and easy to cleanse with regular facial wash or soap.',
    formulaLead: 'True beauty starts with the best foundation.', formulaDescription: 'Made in South Korea by PROYOU COSMETICS, with factory-standard documents available for review.', notificationLabel: 'Thai cosmetic notification number', notificationCopy: 'Product information is properly notified.', formulaAssurance: 'Manufacturer factory standards: ISO 22716 (Cosmetics GMP) · ISO 9001 (Quality Management) · ISO 14001 (Environmental Management)',
    useIntro: 'Apply before sunscreen for brighter-, smoother-looking skin, less visible pores, and makeup that stays beautiful without dullness.', orderWswss: 'ORDER WSWSS', productDetails: 'View product details', footerProduct: 'Product', footerFeatures: 'Features', footerStandards: 'Standards & Manufacturer', footerHow: 'How to use',
    infoKicker: 'MOISTURE TONE-UP', infoOrigin: 'MOISTURE TONE-UP CREAM · MADE IN KOREA', manufacturerAddress: 'PROYOU COSMETICS CO., LTD. · 10, Gyeongsu-daero 391beon-gil, Uiwang-si, Gyeonggi-do, Republic of Korea · Business Registration No. 123-86-01534 · TEL +82-31-427-6181', documentsLabel: 'Factory standard documents',
    useStepOne: 'Dispense', useStepTwo: 'Pat', useStepThree: 'Blend', useStepOneCopy: 'Dispense a pearl-sized amount of cream.', useStepTwoCopy: 'Gently pat across the face and neck to help the cream adhere.', useStepThreeCopy: 'Blend gently for a smooth, natural-looking finish.',
    ctaTitleOne: 'Reveal your beauty', ctaTitleTwo: 'beyond what it was before.', ctaCopy: 'Bright, moisturized, smooth, and naturally healthy-looking skin.', ctaPriceLabel: 'Special offer', ctaPriceRegular: '490 THB', ctaPriceSale: 'Now 380 THB', lineQr: 'Add LINE for WSWSS news and special offers.',
  },
  ko: {
    navProduct: '제품', navReveal: '피부 표현', navWhy: 'WSWSS 특징', navStandards: '제조 기준', navHow: '사용 방법', headerOrder: '주문하기',
    heroToday: '오늘은', heroMakeup: '메이크업 없이도', heroBeautiful: '예뻐요.', heroBelief: '메이크업을 하지 않아도 자연스럽게 아름다운 피부. WSWSS가 피부를 밝고 촉촉하며 편안하게 가꿔줍니다.',
    revealPremise: '내추럴 메이크업은 본연의 피부를 가리는 것에서 시작하지 않습니다.', revealTitleOne: '피부 본연의 아름다움을', revealTitleTwo: '더 빛나게.', revealBenefitOne: '본연의 피부 표현', revealBenefitTwo: '들뜸 없는 피부', revealBenefitThree: '칙칙함 없는 피부',
    fourBenefits: '4가지 기능을 하나에: Tone-Up · Moisture · Primer · Whitening — 피부를 더 밝고 촉촉하며 매끈하게, 메이크업 준비까지.',
    infoPayoff: '맑게 · 촉촉하게 · 매끈하게', slideOneToneUp: '피부를 자연스럽게 화사하게', slideOneMoisture: '수분 충전', slideOneCopy: '함께 작용해 피부를 자연스럽게 밝고 촉촉하며 매끈하게 표현합니다.',
    slideTwoTexture: '잔털에 끼지 않고 피부에 매끈하게 밀착', slideTwoPrimerLabel: '프라이머', slideTwoPrimer: '메이크업 전 피부를 정돈하고 모공을 자연스럽게 블러', slideTwoCopy: '끼임, 뭉침, 들뜸 없이 더 매끈한 피부 표현을 돕습니다.',
    slideThreeSet: '밀착 후 옷에 묻어남을 줄여줍니다', slideThreeTransfer: '원단 접촉으로 인한 자국을 줄여줍니다', slideThreeCopy: '어두운 옷을 입는 날에도 편안하게 사용할 수 있습니다.',
    slideFourLong: '8시간 이상 지속', slideFourWater: '하루 종일 물과 땀에 강함', slideFourCopy: '8시간 이상 워터 레지스턴스, 일반 클렌저나 비누로 쉽게 세안할 수 있습니다.',
    formulaLead: '진정한 아름다움은 좋은 기준에서 시작됩니다.', formulaDescription: '대한민국 PROYOU COSMETICS에서 제조하며, 제조 공장 표준 문서를 확인할 수 있습니다.', notificationLabel: '태국 화장품 등록번호', notificationCopy: '제품 정보가 적법하게 등록되었습니다.', formulaAssurance: '제조 공장 표준: ISO 22716 (Cosmetics GMP) · ISO 9001 (Quality Management) · ISO 14001 (Environmental Management)',
    useIntro: '자외선 차단제 전에 사용하세요. 피부가 더 밝고 매끈해 보이며 모공을 자연스럽게 커버해 메이크업이 오래도록 예쁘게 유지됩니다.', orderWswss: 'WSWSS 주문하기', productDetails: '제품 자세히 보기', footerProduct: '제품', footerFeatures: '특징', footerStandards: '제조 기준 및 제조사', footerHow: '사용 방법',
    infoKicker: '수분 톤업', infoOrigin: '수분 톤업 크림 · MADE IN KOREA', manufacturerAddress: '㈜프로유화장품 · 경기도 의왕시 경수대로391번길 10 (오전동) · 사업자등록번호 123-86-01534 · TEL +82-31-427-6181', documentsLabel: '제조 공장 표준 문서',
    useStepOne: '덜기', useStepTwo: '두드리기', useStepThree: '펴 바르기', useStepOneCopy: '진주알 크기만큼 적당량을 덜어냅니다.', useStepTwoCopy: '얼굴과 목에 부드럽게 두드려 밀착시켜 줍니다.', useStepThreeCopy: '자연스럽고 매끈한 피부 표현을 위해 부드럽게 펴 바릅니다.',
    ctaTitleOne: '피부 본연의 아름다움을', ctaTitleTwo: '더 빛나게.', ctaCopy: '맑고 촉촉하며 매끈한, 자연스럽고 건강한 피부 표현.', ctaPriceLabel: '스페셜 프로모션', ctaPriceRegular: '490바트', ctaPriceSale: '380바트', lineQr: 'LINE을 추가하고 WSWSS 소식과 특별 혜택을 받아보세요.',
  },
};

function setupLanguageSwitcher() {
  const trigger = document.querySelector('.language');
  const menu = document.querySelector('.language-menu');
  const options = [...document.querySelectorAll('.language-menu [data-language]')];
  if (!trigger || !menu || !options.length) return;
  const staticLanguage = document.documentElement.dataset.staticLanguage;

  if (staticLanguage) {
    trigger.childNodes[0].nodeValue = `${staticLanguage.toUpperCase()} `;
    options.forEach((option) => option.setAttribute('aria-current', String(option.dataset.language === staticLanguage)));
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const isOpen = !menu.hidden;
      menu.hidden = isOpen;
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
    options.forEach((option) => option.addEventListener('click', (event) => {
      event.stopPropagation();
      menu.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.language-switcher')) {
        menu.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
    return;
  }
  const originalText = new Map([...document.querySelectorAll('[data-i18n]')].map((element) => [element, element.textContent]));

  const applyLanguage = (language) => {
    const dictionary = translations[language] || {};
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const translation = dictionary[element.dataset.i18n];
      element.textContent = translation || originalText.get(element);
    });
    document.documentElement.lang = language === 'ko' ? 'ko' : language;
    document.documentElement.dataset.language = language;
    trigger.childNodes[0].nodeValue = `${language.toUpperCase()} `;
    options.forEach((option) => option.setAttribute('aria-current', String(option.dataset.language === language)));
    localStorage.setItem('wswss-language', language);
  };

  trigger.addEventListener('click', () => {
    const isOpen = !menu.hidden;
    menu.hidden = isOpen;
    trigger.setAttribute('aria-expanded', String(!isOpen));
  });
  options.forEach((option) => option.addEventListener('click', () => {
    applyLanguage(option.dataset.language);
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.language-switcher')) {
      menu.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
  applyLanguage(localStorage.getItem('wswss-language') || 'th');
}

setupLanguageSwitcher();

function applyReducedMotionState() {
  document.documentElement.classList.add('reduced-motion');
}

function buildHeroTimeline() {
  gsap.set(['.pen-path', '.signature-path', '.signature-tail'], {
    strokeDasharray: 1,
    strokeDashoffset: 1,
  });
  gsap.set('.signature-text', { opacity: 0, x: -7 });

  return gsap.timeline({ defaults: { ease: 'power2.out' } })
    .from('.site-header', { y: -10, opacity: 0, duration: 0.4 })
    .from('.hero-title > span', { yPercent: 12, stagger: 0.04, duration: 0.48 }, '-=0.24')
    .from('.product-shot', { yPercent: 5, duration: 0.56 }, '-=0.42')
    .add(() => document.querySelector('.product-shot').classList.add('is-visible'), '-=0.1')
    .to('.pen-path', { strokeDashoffset: 0, duration: 0.46, ease: 'none' }, '-=0.28')
    .to('.signature-path', { strokeDashoffset: 0, duration: 0.2, ease: 'none' }, '-=0.1')
    .to('.signature-text', { opacity: 1, x: 0, duration: 0.26, ease: 'power1.out' }, '-=0.1')
    .to('.signature-tail', { strokeDashoffset: 0, duration: 0.18, ease: 'none' }, '-=0.16')
    .from(['.brand-belief', '.story-button'], { y: 8, stagger: 0.05, duration: 0.34 }, '-=0.38')
    .from('.feature-item', { y: 6, opacity: 0, stagger: 0.025, duration: 0.26 }, '-=0.22');
}

function productVariantForIndex(index) {
  return index === 2 ? 'section3' : 'standard';
}

function setProductVariant(container, variant) {
  if (!container) return;

  const images = [...container.querySelectorAll('[data-product-variant]')];
  if (!images.length) return;

  gsap.killTweensOf(images);
  images.forEach((image) => image.classList.toggle('is-active', image.dataset.productVariant === variant));
  gsap.set(images, { opacity: (index, element) => (element.dataset.productVariant === variant ? 1 : 0) });
}

function getActiveProductImage(container) {
  return container.querySelector('.product-image.is-active') || container.querySelector('img');
}

function productImageFilter(image, blur = 0) {
  const isSection3Product = image?.dataset.productVariant === 'section3';
  const saturation = isSection3Product ? 1.14 : 1.12;
  const contrast = isSection3Product ? 1.01 : 1.015;
  const brightness = 1.0868;
  return `saturate(${saturation}) contrast(${contrast}) brightness(${brightness}) blur(${blur}px)`;
}

function buildInfoSlides() {
  const section = document.querySelector('#section-3');
  const slides = [...section?.querySelectorAll('[data-info-slide]') ?? []];
  const tabs = [...section?.querySelectorAll('[data-info-tab]') ?? []];
  const counter = section?.querySelector('.info-counter');

  if (!section || slides.length !== 4) return;

  let activeSlide = -1;

  function setInfoSlide(index, immediate = false) {
    const next = Math.max(0, Math.min(slides.length - 1, index));
    if (next === activeSlide) return;

    const outgoing = slides[activeSlide];
    const incoming = slides[next];

    if (outgoing) {
      outgoing.classList.remove('is-active');
      if (immediate) gsap.set(outgoing, { autoAlpha: 0, y: 8 });
      else gsap.to(outgoing, { autoAlpha: 0, y: -8, duration: 0.16, overwrite: true, ease: 'power1.out' });
    }

    incoming.classList.add('is-active');
    if (immediate) gsap.set(incoming, { autoAlpha: 1, y: 0 });
    else gsap.fromTo(incoming, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.24, overwrite: true, ease: 'power2.out' });

    tabs.forEach((tab) => {
      const isActive = Number(tab.dataset.infoTab) === next;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-pressed', String(isActive));
    });
    if (counter) counter.textContent = `${String(next + 1).padStart(2, '0')} / 04`;
    activeSlide = next;
  }

  setInfoSlide(0, true);
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    setInfoSlide(Number(tab.dataset.infoTab));
  }));
}

function buildRevealTransition() {
  gsap.registerPlugin(ScrollTrigger);

  const anchors = gsap.utils.toArray('[data-product-anchor]');
  const traveler = document.querySelector('.product-traveler');
  const revealCopy = document.querySelector('.reveal-copy');
  const revealStage = document.querySelector('.reveal-stage');
  const copyItems = gsap.utils.toArray('.reveal-title span, .reveal-premise, .reveal-benefits');

  if (anchors.length < 2 || !traveler) return;

  let activeIndex = 0;
  let journeyTween = null;
  let triggersReady = false;
  let resizeFrame = 0;
  let isCopyVisible = false;

  gsap.set(revealCopy, { autoAlpha: 0, scale: 0.985 });
  gsap.set(copyItems, { autoAlpha: 0, y: 20 });
  gsap.set(anchors.slice(1), { autoAlpha: 0 });
  gsap.set(traveler, { display: 'none' });

  function syncAnchorSizes() {
    // Destination geometry belongs to CSS. Clearing legacy inline geometry here
    // prevents GSAP refreshes from overriding device-specific layout rules.
    gsap.set(anchors.slice(1), { clearProps: 'width,left,right' });

    if (revealCopy) {
      gsap.set(revealCopy, {
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
      });

      const useCenteredLayout = window.innerWidth >= 700 || window.innerWidth > window.innerHeight;

      if (useCenteredLayout) {
        // Product artwork has transparent padding around the visible tube.
        // Overlap its layout frame so the copy sits against the visible product,
        // rather than leaving a misleading empty gap on wide/landscape screens.
        const stage = revealStage || anchors[1].closest('section');
        const stageRect = stage.getBoundingClientRect();
        const productRect = anchors[1].getBoundingClientRect();
        const visibleProductInset = 132;
        const rightPx = stageRect.right - productRect.left - visibleProductInset;
        const availableCopyWidth = Math.max(0, productRect.left - stageRect.left - 24);
        const copyWidth = Math.min(window.innerWidth * 0.41, 464, availableCopyWidth);

        gsap.set(revealCopy, {
          top: '50%',
          left: 'auto',
          right: rightPx,
          width: copyWidth,
          xPercent: 0,
          yPercent: -50,
        });
      } else if (revealStage && anchors[1]) {
        const copyWidth = Math.min(window.innerWidth - 32, 400);
        const stage = revealStage;
        const stageRect = stage.getBoundingClientRect();
        const productRect = anchors[1].getBoundingClientRect();
        // Keep the card within Section 2 even after the product is raised to
        // make room for the benefit summary below it.
        const copyTop = Math.max(8, productRect.top - stageRect.top - 12);
        const copyLeft = productRect.left - stageRect.left + productRect.width / 2;

        gsap.set(revealCopy, {
          top: copyTop,
          left: copyLeft,
          right: 'auto',
          width: copyWidth,
          xPercent: -50,
          yPercent: -100,
        });
      }
    }
  }

  function setCopyVisible(visible, immediate = false) {
    if (visible === isCopyVisible) return;
    isCopyVisible = visible;

    if (immediate) {
      gsap.set(revealCopy, {
        autoAlpha: visible ? 1 : 0,
        scale: visible ? 1 : 0.985,
      });
      gsap.set(copyItems, {
        autoAlpha: visible ? 1 : 0,
        y: visible ? 0 : 16,
      });
      return;
    }

    gsap.to(revealCopy, {
      autoAlpha: visible ? 1 : 0,
      scale: visible ? 1 : 0.985,
      duration: visible ? 0.34 : 0.16,
      ease: 'power2.out',
      overwrite: true,
    });

    gsap.to(copyItems, {
      autoAlpha: visible ? 1 : 0,
      y: visible ? 0 : 16,
      duration: visible ? 0.42 : 0.18,
      delay: visible ? 0.08 : 0,
      stagger: visible ? 0.08 : 0,
      ease: 'power2.out',
      overwrite: true,
    });
  }

  function moveProductTo(nextIndex) {
    if (nextIndex < 0 || nextIndex >= anchors.length) return;
    if (nextIndex === activeIndex) return;

    let currentPosition;
    let startingOpacity = 1;
    let sourceVariant = productVariantForIndex(activeIndex);
    if (journeyTween) {
      // Retarget from the product's exact current document position. Fast
      // scrolling across multiple sections therefore produces one direct move
      // to the latest section, not a delayed chain through stale destinations.
      const travelerStyle = getComputedStyle(traveler);
      currentPosition = {
        left: Number.parseFloat(travelerStyle.left),
        top: Number.parseFloat(travelerStyle.top),
        width: Number.parseFloat(travelerStyle.width),
      };
      startingOpacity = Number.parseFloat(travelerStyle.opacity);
      sourceVariant = getActiveProductImage(traveler)?.dataset.productVariant || sourceVariant;
      journeyTween.kill();
      journeyTween = null;
    }

    const targetVariant = productVariantForIndex(nextIndex);
    const sourceRect = anchors[activeIndex].getBoundingClientRect();

    syncAnchorSizes();
    const targetRect = anchors[nextIndex].getBoundingClientRect();
    currentPosition ??= {
      left: sourceRect.left + window.scrollX,
      top: sourceRect.top + window.scrollY,
      width: sourceRect.width,
    };
    const targetPosition = {
      left: targetRect.left + window.scrollX,
      top: targetRect.top + window.scrollY,
      width: targetRect.width,
    };
    gsap.killTweensOf(anchors);
    gsap.set(anchors, { autoAlpha: 0 });
    gsap.set(traveler, {
      display: 'block',
      left: currentPosition.left,
      top: currentPosition.top,
      width: currentPosition.width,
      opacity: startingOpacity,
    });
    setProductVariant(traveler, sourceVariant, true);
    activeIndex = nextIndex;
    setCopyVisible(false);

    // Both endpoints use document coordinates. The product therefore scrolls
    // with the page while travelling instead of chasing a moving viewport
    // target and jumping across sections.
    const travelState = { progress: 0 };
    let productSwapped = sourceVariant === targetVariant;
    const travelDistance = Math.hypot(
      targetPosition.left - currentPosition.left,
      targetPosition.top - currentPosition.top,
    );
    const arcHeight = Math.min(64, Math.max(24, travelDistance * 0.045));
    const arrivalPoint = 0.82;
    const overshootDistance = Math.min(22, Math.max(10, travelDistance * 0.025));
    const directionX = travelDistance ? (targetPosition.left - currentPosition.left) / travelDistance : 0;
    const directionY = travelDistance ? (targetPosition.top - currentPosition.top) / travelDistance : 0;
    const overshootPosition = {
      left: targetPosition.left + directionX * overshootDistance,
      top: targetPosition.top + directionY * overshootDistance,
    };

    journeyTween = gsap.to(travelState, {
      progress: 1,
      duration: 0.68,
      ease: 'power1.inOut',
      overwrite: true,
      onUpdate: () => {
        const progress = travelState.progress;
        const arriving = progress < arrivalPoint;
        const motionProgress = arriving
          ? progress / arrivalPoint
          : (progress - arrivalPoint) / (1 - arrivalPoint);
        const left = arriving
          ? gsap.utils.interpolate(currentPosition.left, overshootPosition.left, motionProgress)
          : gsap.utils.interpolate(overshootPosition.left, targetPosition.left, motionProgress);
        const top = arriving
          ? gsap.utils.interpolate(currentPosition.top, overshootPosition.top, motionProgress)
          : gsap.utils.interpolate(overshootPosition.top, targetPosition.top, motionProgress);
        const lift = arriving ? Math.sin(Math.PI * motionProgress) * arcHeight : 0;
        const sizeProgress = Math.min(progress / arrivalPoint, 1);
        const fadeOpacity = progress < 0.5
          ? gsap.utils.interpolate(startingOpacity, 0, progress / 0.5)
          : gsap.utils.interpolate(0, 1, (progress - 0.5) / 0.5);
        gsap.set(traveler, {
          left,
          top: top - lift,
          width: gsap.utils.interpolate(currentPosition.width, targetPosition.width, sizeProgress),
          opacity: fadeOpacity,
        });
        if (!productSwapped && progress >= 0.5) {
          setProductVariant(traveler, targetVariant, true);
          productSwapped = true;
        }
      },
      onComplete: () => {
        gsap.set(traveler, { display: 'none', opacity: 1 });
        gsap.set(anchors, { autoAlpha: 0 });
        setProductVariant(anchors[activeIndex], productVariantForIndex(activeIndex), true);
        gsap.set(anchors[activeIndex], { autoAlpha: 1 });
        anchors.forEach((a, i) => a.classList.toggle('is-visible', i === activeIndex));
        journeyTween = null;
        if (activeIndex === 1) setCopyVisible(true);
      },
    });
  }

  function resolveActiveIndex() {
    if (window.scrollY <= 1) return 0;

    const readingLine = window.innerHeight * 0.28;
    let resolvedIndex = 0;

    anchors.slice(1).forEach((anchor, index) => {
      const section = anchor.closest('section');
      if (section && section.getBoundingClientRect().top <= readingLine) {
        resolvedIndex = index + 1;
      }
    });

    return resolvedIndex;
  }

  function settleProductAt(nextIndex) {
    if (journeyTween) {
      journeyTween.kill();
      journeyTween = null;
    }

    activeIndex = nextIndex;
    syncAnchorSizes();
    gsap.set(traveler, { display: 'none' });
    gsap.set(anchors, { autoAlpha: 0 });
    setProductVariant(anchors[activeIndex], productVariantForIndex(activeIndex), true);
    gsap.set(anchors[activeIndex], { autoAlpha: 1 });
    anchors.forEach((a, i) => a.classList.toggle('is-visible', i === activeIndex));
    setCopyVisible(activeIndex === 1, true);
  }

  syncAnchorSizes();

  anchors.slice(1).forEach((anchor, index) => {
    const section = anchor.closest('section');
    const anchorIndex = index + 1;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top 28%',
      invalidateOnRefresh: true,
      onEnter: () => { if (triggersReady) moveProductTo(anchorIndex); },
      onLeaveBack: () => { if (triggersReady) moveProductTo(anchorIndex - 1); },
    });
  });

  ScrollTrigger.addEventListener('refreshInit', syncAnchorSizes);

  window.addEventListener('resize', () => {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(() => {
      syncAnchorSizes();
      ScrollTrigger.refresh();
    });
  });

  ScrollTrigger.refresh();
  settleProductAt(resolveActiveIndex());
  triggersReady = true;

  window.addEventListener('load', () => {
    syncAnchorSizes();
    ScrollTrigger.refresh();
  }, { once: true });
}

function buildDocumentModal() {
  const modal = document.querySelector('.document-modal');
  const modalImage = modal?.querySelector('.document-modal__image');
  const modalTitle = modal?.querySelector('.document-modal__title');
  const closeButton = modal?.querySelector('.document-modal__close');
  const cards = document.querySelectorAll('.document-card[role="button"]');
  if (!modal || !modalImage || !modalTitle || !closeButton || !cards.length) return;

  let opener = null;
  const close = () => {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    opener?.focus();
  };
  const open = (card) => {
    const image = card.querySelector('img');
    if (!image) return;
    opener = card;
    modalImage.src = image.currentSrc || image.src;
    modalImage.alt = image.alt;
    modalTitle.textContent = image.alt;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    closeButton.focus();
  };

  cards.forEach((card) => {
    card.addEventListener('click', () => open(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(card);
      }
    });
  });
  closeButton.addEventListener('click', close);
  modal.addEventListener('click', (event) => { if (event.target === modal) close(); });
  window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !modal.hidden) close(); });
}

buildDocumentModal();

if (!window.gsap || prefersReducedMotion.matches) {
  applyReducedMotionState();
} else {
  buildHeroTimeline();
  if (window.ScrollTrigger) {
    buildInfoSlides();
    buildRevealTransition();
  } else {
    applyReducedMotionState();
  }
}
