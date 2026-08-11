const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

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
    .from('.hero-title > span', { yPercent: 12, opacity: 0, stagger: 0.04, duration: 0.48 }, '-=0.24')
    .from('.product-shot', { yPercent: 5, opacity: 0, duration: 0.56 }, '-=0.42')
    .add(() => document.querySelector('.product-shot').classList.add('is-visible'), '-=0.1')
    .to('.pen-path', { strokeDashoffset: 0, duration: 0.46, ease: 'none' }, '-=0.28')
    .to('.signature-path', { strokeDashoffset: 0, duration: 0.2, ease: 'none' }, '-=0.1')
    .to('.signature-text', { opacity: 1, x: 0, duration: 0.26, ease: 'power1.out' }, '-=0.1')
    .to('.signature-tail', { strokeDashoffset: 0, duration: 0.18, ease: 'none' }, '-=0.16')
    .from(['.brand-belief', '.story-button'], { y: 8, opacity: 0, stagger: 0.05, duration: 0.34 }, '-=0.38')
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
        // Position the box's right edge at the product's left edge so the product
        // slightly overlaps the box. Computed from the real product position.
        const stage = revealStage || anchors[1].closest('section');
        const stageRect = stage.getBoundingClientRect();
        const productRect = anchors[1].getBoundingClientRect();
        const rightPx = stageRect.right - productRect.left - 12;

        gsap.set(revealCopy, {
          top: '50%',
          left: 'auto',
          right: rightPx,
          width: Math.min(window.innerWidth * 0.41, 464),
          xPercent: 0,
          yPercent: -50,
        });
      } else if (revealStage && anchors[1]) {
        const copyWidth = Math.min(window.innerWidth - 32, 400);

        gsap.set(revealCopy, {
          top: 16,
          left: '50%',
          right: 'auto',
          width: copyWidth,
          xPercent: -50,
          yPercent: 0,
        });
      }
    }
  }

  function setCopyVisible(visible, immediate = false) {
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
    if (nextIndex === activeIndex && !journeyTween) return;

    if (journeyTween) journeyTween.kill();

    const sourceVariant = productVariantForIndex(activeIndex);
    const targetVariant = productVariantForIndex(nextIndex);
    const useTargetFromStart = targetVariant === 'section3';
    const travelerIsVisible = getComputedStyle(traveler).display !== 'none';
    const currentRect = travelerIsVisible
      ? traveler.getBoundingClientRect()
      : anchors[activeIndex].getBoundingClientRect();

    syncAnchorSizes();

    gsap.set(anchors, { autoAlpha: 0 });
    gsap.set(traveler, {
      display: 'block',
      left: currentRect.left,
      top: currentRect.top,
      width: currentRect.width,
    });
    setProductVariant(traveler, useTargetFromStart ? targetVariant : sourceVariant);
    // Start sharp so there is no pop from the anchor to the traveler.
    const startingProduct = getActiveProductImage(traveler);
    gsap.set(startingProduct, {
      filter: productImageFilter(startingProduct),
      opacity: 1,
    });

    activeIndex = nextIndex;
    setCopyVisible(false);

    const travelState = { progress: 0 };
    let productSwapped = useTargetFromStart || sourceVariant === targetVariant;

    journeyTween = gsap.to(travelState, {
      progress: 1,
      duration: 0.72,
      ease: 'back.out(1.25)',
      overwrite: true,
      onUpdate: () => {
        const liveTarget = anchors[activeIndex].getBoundingClientRect();
        gsap.set(traveler, {
          left: gsap.utils.interpolate(currentRect.left, liveTarget.left, travelState.progress),
          top: gsap.utils.interpolate(currentRect.top, liveTarget.top, travelState.progress),
          width: gsap.utils.interpolate(currentRect.width, liveTarget.width, travelState.progress),
        });

        if (!productSwapped && travelState.progress >= 0.46) {
          // The art changes while the shared product is at peak blur/low opacity,
          // avoiding a visible cut between two different product cutouts.
          setProductVariant(traveler, targetVariant);
          productSwapped = true;
        }

        // Blur swells mid-journey and returns to sharp on arrival (sine curve),
        // so the product starts and ends crisp with no visible pop.
        const swell = Math.sin(travelState.progress * Math.PI);
        const blur = gsap.utils.interpolate(0, 6, swell);
        const opacity = gsap.utils.interpolate(1, 0.55, swell);
        const movingProduct = getActiveProductImage(traveler);
        gsap.set(movingProduct, {
          filter: productImageFilter(movingProduct, blur),
          opacity,
        });
      },
      onComplete: () => {
        gsap.set(traveler, { display: 'none' });
        gsap.set(anchors, { autoAlpha: 0 });
        setProductVariant(anchors[activeIndex], productVariantForIndex(activeIndex), true);
        gsap.set(anchors[activeIndex], { autoAlpha: 1 });
        anchors.forEach((a, i) => a.classList.toggle('is-visible', i === activeIndex));
        if (activeIndex === 1) setCopyVisible(true);
        journeyTween = null;
      },
    });
  }

  function resolveActiveIndex() {
    if (window.scrollY <= 1) return 0;

    const readingLine = window.innerHeight * 0.25;
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
      start: 'top 25%',
      invalidateOnRefresh: true,
      onEnter: () => {
        if (triggersReady) moveProductTo(anchorIndex);
      },
    });

    ScrollTrigger.create({
      trigger: section,
      start: 'top 32%',
      invalidateOnRefresh: true,
      onLeaveBack: () => {
        if (triggersReady) moveProductTo(anchorIndex - 1);
      },
    });
  });

  ScrollTrigger.addEventListener('refreshInit', syncAnchorSizes);
  ScrollTrigger.addEventListener('refresh', () => {
    if (triggersReady) settleProductAt(resolveActiveIndex());
  });

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
    if (triggersReady) settleProductAt(resolveActiveIndex());
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
