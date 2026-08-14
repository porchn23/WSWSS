(() => {
  'use strict';

  const STORAGE_KEY = 'wswss-consent-v1';
  const DEFAULTS = Object.freeze({ necessary: true, analytics: false, marketing: false });
  let memoryConsent = null;
  let previousFocus = null;

  const COPY = {
    th: {
      title: 'เราให้คุณเลือก',
      intro: 'เว็บไซต์ใช้เทคโนโลยีที่จำเป็นเพื่อให้เว็บไซต์ทำงานและจดจำการตั้งค่าของคุณ การวิเคราะห์และการตลาดจะทำงานเฉพาะเมื่อคุณอนุญาต',
      acceptAll: 'ยอมรับทั้งหมด', necessaryOnly: 'เฉพาะที่จำเป็น', settings: 'ตั้งค่า',
      dialogTitle: 'ตั้งค่าความเป็นส่วนตัว', close: 'ปิด',
      dialogIntro: 'เลือกประเภทการจัดเก็บข้อมูลที่คุณอนุญาตได้ คุกกี้หรือพื้นที่จัดเก็บที่จำเป็นจะเปิดอยู่เสมอเพื่อให้เว็บไซต์ทำงานและจดจำการตั้งค่าของคุณ',
      necessaryText: 'จำเป็นต่อการทำงานของเว็บไซต์และการจดจำการตั้งค่าที่คุณเลือก',
      analyticsText: 'สำหรับวัดผลการใช้งานเว็บไซต์ ปัจจุบัน WSWSS ยังไม่ได้เปิดใช้งานเครื่องมือ Analytics',
      marketingText: 'สำหรับการวัดผลหรือปรับโฆษณา ปัจจุบัน WSWSS ยังไม่ได้เปิดใช้งานเครื่องมือ Marketing tracking',
      necessaryAria: 'Necessary เปิดใช้งานเสมอ', analyticsAria: 'อนุญาต Analytics', marketingAria: 'อนุญาต Marketing',
      save: 'บันทึกการตั้งค่า'
    },
    en: {
      title: 'Your choice',
      intro: 'This website uses necessary technology to function and remember your settings. Analytics and Marketing will only run if you allow them.',
      acceptAll: 'Accept all', necessaryOnly: 'Necessary only', settings: 'Settings',
      dialogTitle: 'Privacy settings', close: 'Close',
      dialogIntro: 'Choose which optional storage categories you allow. Necessary storage always stays on so the website can function and remember your settings.',
      necessaryText: 'Required for website functionality and to remember the settings you choose.',
      analyticsText: 'Used to measure website usage. WSWSS does not currently use Analytics tools.',
      marketingText: 'Used to measure or tailor advertising. WSWSS does not currently use Marketing tracking.',
      necessaryAria: 'Necessary is always enabled', analyticsAria: 'Allow Analytics', marketingAria: 'Allow Marketing',
      save: 'Save settings'
    },
    ko: {
      title: '직접 선택하세요',
      intro: '웹사이트는 작동과 설정 기억에 필요한 기술을 사용합니다. Analytics와 Marketing은 이용자가 허용한 경우에만 작동합니다.',
      acceptAll: '모두 허용', necessaryOnly: '필수만', settings: '설정',
      dialogTitle: '개인정보 설정', close: '닫기',
      dialogIntro: '허용할 선택형 저장 항목을 선택할 수 있습니다. Necessary 저장은 웹사이트 작동과 설정 기억을 위해 항상 활성화됩니다.',
      necessaryText: '웹사이트 기능 및 선택한 설정을 기억하는 데 필요합니다.',
      analyticsText: '웹사이트 이용 측정용입니다. 현재 WSWSS는 Analytics 도구를 사용하지 않습니다.',
      marketingText: '광고 성과 측정 또는 최적화용입니다. 현재 WSWSS는 Marketing tracking을 사용하지 않습니다.',
      necessaryAria: 'Necessary는 항상 활성화됨', analyticsAria: 'Analytics 허용', marketingAria: 'Marketing 허용',
      save: '설정 저장'
    }
  };

  function language() {
    const raw = (document.documentElement.lang || 'th').toLowerCase();
    if (raw.startsWith('ko')) return 'ko';
    if (raw.startsWith('en')) return 'en';
    return 'th';
  }

  function normalize(value) {
    return {
      necessary: true,
      analytics: Boolean(value?.analytics),
      marketing: Boolean(value?.marketing),
      updatedAt: typeof value?.updatedAt === 'string' ? value.updatedAt : null,
    };
  }

  function readConsent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return memoryConsent;
      return normalize(JSON.parse(raw));
    } catch (_) {
      return memoryConsent;
    }
  }

  function saveConsent(next) {
    const value = { ...normalize(next), updatedAt: new Date().toISOString() };
    memoryConsent = value;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); } catch (_) { /* memory fallback */ }
    document.dispatchEvent(new CustomEvent('wswss:consentchange', { detail: { ...value } }));
    return value;
  }

  function buildUI() {
    if (document.querySelector('.cookie-consent-root')) return;
    const t = COPY[language()];
    const root = document.createElement('div');
    root.className = 'cookie-consent-root';
    root.innerHTML = `
      <section class="cookie-consent-banner" aria-labelledby="cookie-banner-title" hidden>
        <div class="cookie-consent-banner__head"><div>
          <h2 id="cookie-banner-title">${t.title}</h2>
          <p>${t.intro}</p>
        </div></div>
        <div class="cookie-consent-actions">
          <button class="cookie-consent-button cookie-consent-button--primary" data-cookie-action="accept-all" type="button">${t.acceptAll}</button>
          <button class="cookie-consent-button" data-cookie-action="necessary-only" type="button">${t.necessaryOnly}</button>
          <button class="cookie-consent-button cookie-consent-button--mint" data-cookie-action="customize" type="button">${t.settings}</button>
        </div>
      </section>
      <section class="cookie-consent-dialog" aria-hidden="true" hidden>
        <div class="cookie-consent-backdrop" data-cookie-action="close"></div>
        <div class="cookie-consent-panel" role="dialog" aria-modal="true" aria-labelledby="cookie-dialog-title" aria-describedby="cookie-dialog-description">
          <div class="cookie-consent-panel__top"><div>
            <p class="legal-kicker">COOKIE CONTROL</p>
            <h2 id="cookie-dialog-title">${t.dialogTitle}</h2>
          </div><button class="cookie-consent-close" data-cookie-action="close" type="button" aria-label="${t.close}">×</button></div>
          <p class="cookie-consent-panel__intro" id="cookie-dialog-description">${t.dialogIntro}</p>
          <div class="cookie-preference">
            <div><strong>Necessary</strong><span>${t.necessaryText}</span></div>
            <label class="cookie-toggle cookie-toggle--locked"><input type="checkbox" checked disabled aria-label="${t.necessaryAria}"><i></i></label>
          </div>
          <div class="cookie-preference">
            <div><strong>Analytics</strong><span>${t.analyticsText}</span></div>
            <label class="cookie-toggle"><input id="wswss-consent-analytics" type="checkbox" aria-label="${t.analyticsAria}"><i></i></label>
          </div>
          <div class="cookie-preference">
            <div><strong>Marketing</strong><span>${t.marketingText}</span></div>
            <label class="cookie-toggle"><input id="wswss-consent-marketing" type="checkbox" aria-label="${t.marketingAria}"><i></i></label>
          </div>
          <div class="cookie-consent-panel__actions">
            <button class="cookie-consent-button" data-cookie-action="necessary-only" type="button">${t.necessaryOnly}</button>
            <button class="cookie-consent-button cookie-consent-button--primary" data-cookie-action="save" type="button">${t.save}</button>
          </div>
        </div>
      </section>`;
    document.body.appendChild(root);

    const banner = root.querySelector('.cookie-consent-banner');
    const dialog = root.querySelector('.cookie-consent-dialog');
    const analytics = root.querySelector('#wswss-consent-analytics');
    const marketing = root.querySelector('#wswss-consent-marketing');

    function syncInputs() {
      const current = readConsent() || DEFAULTS;
      analytics.checked = Boolean(current.analytics);
      marketing.checked = Boolean(current.marketing);
    }
    function hideBanner() { banner.hidden = true; }
    function showBanner() { banner.hidden = false; }
    function openPreferences(opener) {
      previousFocus = opener || document.activeElement;
      syncInputs();
      dialog.hidden = false;
      dialog.setAttribute('aria-hidden', 'false');
      document.documentElement.style.overflow = 'hidden';
      window.setTimeout(() => root.querySelector('.cookie-consent-close')?.focus(), 0);
    }
    function closePreferences() {
      dialog.hidden = true;
      dialog.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
    }
    function commit(next) {
      saveConsent(next);
      hideBanner();
      closePreferences();
    }

    root.addEventListener('click', (event) => {
      const button = event.target.closest('[data-cookie-action]');
      if (!button) return;
      const action = button.dataset.cookieAction;
      if (action === 'accept-all') commit({ necessary: true, analytics: true, marketing: true });
      if (action === 'necessary-only') commit({ necessary: true, analytics: false, marketing: false });
      if (action === 'customize') openPreferences(button);
      if (action === 'save') commit({ necessary: true, analytics: analytics.checked, marketing: marketing.checked });
      if (action === 'close') closePreferences();
    });

    document.addEventListener('click', (event) => {
      const opener = event.target.closest('.js-cookie-settings');
      if (!opener) return;
      event.preventDefault();
      openPreferences(opener);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !dialog.hidden) closePreferences();
      if (event.key !== 'Tab' || dialog.hidden) return;
      const focusables = [...dialog.querySelectorAll('button:not([disabled]), input:not([disabled])')].filter((el) => !el.hidden);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });

    window.WSWSSConsent = {
      get: () => ({ ...(readConsent() || DEFAULTS) }),
      openPreferences: () => openPreferences(document.activeElement),
    };

    if (!readConsent()) showBanner();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildUI, { once: true });
  else buildUI();
})();
