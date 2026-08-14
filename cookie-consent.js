(() => {
  'use strict';

  const STORAGE_KEY = 'wswss-consent-v1';
  const DEFAULTS = Object.freeze({ necessary: true, analytics: false, marketing: false });
  let memoryConsent = null;
  let previousFocus = null;

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
    const root = document.createElement('div');
    root.className = 'cookie-consent-root';
    root.innerHTML = `
      <section class="cookie-consent-banner" aria-labelledby="cookie-banner-title" hidden>
        <div class="cookie-consent-banner__head">
          <div>
            <h2 id="cookie-banner-title">เราให้คุณเลือก</h2>
            <p>เว็บไซต์ใช้เทคโนโลยีที่จำเป็นเพื่อให้เว็บไซต์ทำงานและจดจำการตั้งค่าของคุณ การวิเคราะห์และการตลาดจะทำงานเฉพาะเมื่อคุณอนุญาต</p>
          </div>
        </div>
        <div class="cookie-consent-actions">
          <button class="cookie-consent-button cookie-consent-button--primary" data-cookie-action="accept-all" type="button">ยอมรับทั้งหมด</button>
          <button class="cookie-consent-button" data-cookie-action="necessary-only" type="button">เฉพาะที่จำเป็น</button>
          <button class="cookie-consent-button cookie-consent-button--mint" data-cookie-action="customize" type="button">ตั้งค่า</button>
        </div>
      </section>
      <section class="cookie-consent-dialog" aria-hidden="true" hidden>
        <div class="cookie-consent-backdrop" data-cookie-action="close"></div>
        <div class="cookie-consent-panel" role="dialog" aria-modal="true" aria-labelledby="cookie-dialog-title" aria-describedby="cookie-dialog-description">
          <div class="cookie-consent-panel__top">
            <div>
              <p class="legal-kicker">COOKIE CONTROL</p>
              <h2 id="cookie-dialog-title">ตั้งค่าความเป็นส่วนตัว</h2>
            </div>
            <button class="cookie-consent-close" data-cookie-action="close" type="button" aria-label="ปิด">×</button>
          </div>
          <p class="cookie-consent-panel__intro" id="cookie-dialog-description">เลือกประเภทการจัดเก็บข้อมูลที่คุณอนุญาตได้ คุกกี้หรือพื้นที่จัดเก็บที่จำเป็นจะเปิดอยู่เสมอเพื่อให้เว็บไซต์ทำงานและจดจำการตั้งค่าของคุณ</p>
          <div class="cookie-preference">
            <div><strong>Necessary</strong><span>จำเป็นต่อการทำงานของเว็บไซต์และการจดจำการตั้งค่าที่คุณเลือก</span></div>
            <label class="cookie-toggle cookie-toggle--locked"><input type="checkbox" checked disabled aria-label="Necessary เปิดใช้งานเสมอ"><i></i></label>
          </div>
          <div class="cookie-preference">
            <div><strong>Analytics</strong><span>สำหรับวัดผลการใช้งานเว็บไซต์ ปัจจุบัน WSWSS ยังไม่ได้เปิดใช้งานเครื่องมือ Analytics</span></div>
            <label class="cookie-toggle"><input id="wswss-consent-analytics" type="checkbox" aria-label="อนุญาต Analytics"><i></i></label>
          </div>
          <div class="cookie-preference">
            <div><strong>Marketing</strong><span>สำหรับการวัดผลหรือปรับโฆษณา ปัจจุบัน WSWSS ยังไม่ได้เปิดใช้งานเครื่องมือ Marketing tracking</span></div>
            <label class="cookie-toggle"><input id="wswss-consent-marketing" type="checkbox" aria-label="อนุญาต Marketing"><i></i></label>
          </div>
          <div class="cookie-consent-panel__actions">
            <button class="cookie-consent-button" data-cookie-action="necessary-only" type="button">เฉพาะที่จำเป็น</button>
            <button class="cookie-consent-button cookie-consent-button--primary" data-cookie-action="save" type="button">บันทึกการตั้งค่า</button>
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
