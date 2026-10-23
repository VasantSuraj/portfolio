/* site.js — shared across every page of the portfolio.
   One place to configure the "Let's talk" button. It opens the wooden board (talk/board.js, loaded on the first click)
   with the contact form on it; on a device without 3D it opens a plain contact card instead. Both send the message to
   /api/contact (a Vercel function), which forwards it to WhatsApp. The WhatsApp number never appears on the site.
   To use on a page: load this file, and give the button  data-contact  (its href stays as a fallback). */
(() => {
  'use strict';
  const CONTACT = {
    endpoint: '/api/contact',                 // the Vercel function in api/contact.js
    email: 'vasantsuraj02@gmail.com',         // shown only if sending fails, as a fallback
    title: "Let's talk",
    intro: 'Tell me about your project. I reply on WhatsApp or email, usually within a day.',
    board: true,                              // the wooden board; false = always the plain card
    simulate: false,                          // true only in previews where /api/contact does not exist
  };
  const BASE = (document.currentScript && document.currentScript.src) ? new URL('./', document.currentScript.src).href : './';
  if (window.__contactReady) return; window.__contactReady = true;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const css = `
  .ct-dialog{border:0;padding:0;margin:auto;background:transparent;color:#f1f1ee;max-width:min(520px,calc(100vw - 32px));width:100%;max-height:calc(100dvh - 32px);overflow:visible}
  .ct-dialog::backdrop{background:rgba(8,9,10,.62);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
  .ct-dialog[open]{animation:ct-in .42s cubic-bezier(.2,.7,.2,1)}
  @keyframes ct-in{from{opacity:0;transform:translateY(18px) scale(.98)}to{opacity:1;transform:none}}
  .ct-card{position:relative;background:#141518;border:1px solid #26282d;border-radius:24px;padding:28px 28px 26px;box-shadow:0 40px 90px -30px rgba(0,0,0,.7);font-family:'Elms Sans','Archivo','Helvetica Neue',Arial,sans-serif;max-height:calc(100dvh - 32px);overflow:auto}
  .ct-card h2{margin:0 0 8px;font-weight:500;font-size:30px;letter-spacing:-.02em;line-height:1.05}
  .ct-card .ct-intro{margin:0 0 22px;font-size:15px;line-height:1.5;color:#a3a5ab;max-width:42ch}
  .ct-close{all:unset;cursor:pointer;position:absolute;top:16px;right:16px;width:40px;height:40px;border-radius:999px;display:grid;place-items:center;color:#a3a5ab;transition:background .2s,color .2s}
  .ct-close:hover{background:#1f2125;color:#f1f1ee}
  .ct-close:focus-visible,.ct-send:focus-visible,.ct-copy:focus-visible{outline:2px solid #f1f1ee;outline-offset:3px}
  .ct-form{display:grid;gap:14px}
  .ct-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .ct-field{display:grid;gap:7px;min-width:0}
  .ct-field label{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#a3a5ab}
  .ct-field label i{font-style:normal;text-transform:none;letter-spacing:0;color:#6d6f75}
  .ct-field input,.ct-field textarea{font:inherit;font-size:16px;color:#f1f1ee;background:#0f1012;border:1px solid #2a2c31;border-radius:12px;padding:12px 14px;outline:none;transition:border-color .2s,box-shadow .2s;width:100%;box-sizing:border-box}
  .ct-field textarea{min-height:120px;resize:vertical;line-height:1.45}
  .ct-field input:focus,.ct-field textarea:focus{border-color:#a6dfd3;box-shadow:0 0 0 3px rgba(166,223,211,.15)}
  .ct-field input[aria-invalid=true],.ct-field textarea[aria-invalid=true]{border-color:#ff8a7a}
  .ct-err{font-size:13px;color:#ff8a7a;min-height:0}
  .ct-err:empty{display:none}
  .ct-hp{position:absolute!important;left:-10000px!important;width:1px;height:1px;overflow:hidden}
  .ct-foot{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-top:6px}
  .ct-note{font-size:12px;color:#6d6f75;max-width:30ch;line-height:1.4}
  .ct-send{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:12px;height:52px;padding:0 26px;border-radius:999px;background:#f1f1ee;color:#0d0d0d;font-weight:500;font-size:13px;letter-spacing:.08em;text-transform:uppercase;transition:transform .25s cubic-bezier(.2,.7,.2,1),opacity .2s}
  .ct-send:hover{transform:translateY(-2px)}
  .ct-send[disabled]{opacity:.6;cursor:progress;transform:none}
  .ct-send .ct-dot{width:5px;height:5px;border-radius:999px;background:#0d0d0d}
  .ct-send[disabled] .ct-dot{animation:ct-pulse .9s ease-in-out infinite}
  @keyframes ct-pulse{50%{opacity:.2}}
  .ct-status{display:none;padding:6px 0 2px}
  .ct-status h3{margin:0 0 8px;font-weight:500;font-size:24px;letter-spacing:-.02em}
  .ct-status p{margin:0 0 18px;font-size:15px;line-height:1.5;color:#a3a5ab}
  .ct-tick{width:48px;height:48px;border-radius:999px;background:#a6dfd3;display:grid;place-items:center;margin-bottom:16px;color:#0d0d0d}
  .ct-mail{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:6px}
  .ct-mail code{font-family:ui-monospace,Menlo,monospace;font-size:14px;background:#0f1012;border:1px solid #2a2c31;border-radius:10px;padding:9px 12px;user-select:all;overflow-wrap:anywhere}
  .ct-copy{all:unset;cursor:pointer;font-size:12px;letter-spacing:.08em;text-transform:uppercase;padding:10px 14px;border-radius:999px;box-shadow:inset 0 0 0 1px #2a2c31}
  .ct-card.is-done .ct-form,.ct-card.is-done .ct-intro{display:none}
  .ct-card.is-done .ct-status{display:block}
  @media (max-width:520px){.ct-card{padding:24px 20px 22px;border-radius:20px}.ct-row{grid-template-columns:1fr}.ct-card h2{font-size:26px}}
  @media (prefers-reduced-motion:reduce){.ct-dialog[open]{animation:none}.ct-send[disabled] .ct-dot{animation:none}}`;

  let dlg, card, form, sendBtn, statusEl, opener = null, openedAt = 0;
  function build() {
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    dlg = document.createElement('dialog'); dlg.className = 'ct-dialog'; dlg.setAttribute('aria-labelledby', 'ct-title');
    dlg.innerHTML = `
      <div class="ct-card" id="ct-card">
        <button class="ct-close" type="button" aria-label="Close"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 4l10 10M14 4 4 14"/></svg></button>
        <h2 id="ct-title">${CONTACT.title}</h2>
        <p class="ct-intro">${CONTACT.intro}</p>
        <form class="ct-form" id="ct-form" novalidate>
          <div class="ct-field"><label for="ct-name">Name</label><input id="ct-name" name="name" autocomplete="name" maxlength="80" required><span class="ct-err" id="ct-name-err"></span></div>
          <div class="ct-row">
            <div class="ct-field"><label for="ct-phone">Contact number</label><input id="ct-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="30" placeholder="+91 98765 43210" required><span class="ct-err" id="ct-phone-err"></span></div>
            <div class="ct-field"><label for="ct-email">Email</label><input id="ct-email" name="email" type="email" inputmode="email" autocomplete="email" maxlength="120" placeholder="you@company.com" required><span class="ct-err" id="ct-email-err"></span></div>
          </div>
          <div class="ct-field"><label for="ct-message">Message</label><textarea id="ct-message" name="message" maxlength="1500" required></textarea><span class="ct-err" id="ct-message-err"></span></div>
          <div class="ct-hp" aria-hidden="true"><label for="ct-company">Company</label><input id="ct-company" name="company" tabindex="-1" autocomplete="off"></div>
          <div class="ct-foot"><span class="ct-note">Your details are only used to reply to you.</span><button class="ct-send" type="submit">Send message <span class="ct-dot" aria-hidden="true"></span></button></div>
          <p class="ct-err" id="ct-form-err" role="alert"></p>
        </form>
        <div class="ct-status" id="ct-status" role="status" aria-live="polite"></div>
      </div>`;
    document.body.appendChild(dlg);
    card = dlg.querySelector('.ct-card'); form = dlg.querySelector('form'); sendBtn = dlg.querySelector('.ct-send'); statusEl = dlg.querySelector('#ct-status');
    dlg.querySelector('.ct-close').addEventListener('click', close);
    dlg.addEventListener('click', e => { if (e.target === dlg) close(); });          // click on the backdrop
    dlg.addEventListener('close', () => { document.documentElement.style.removeProperty('overflow'); if (window.__lenis) window.__lenis.start(); if (opener) opener.focus(); });
    form.addEventListener('submit', submit);
    form.querySelectorAll('input,textarea').forEach(el => el.addEventListener('blur', () => validate(el)));
    form.querySelectorAll('input,textarea').forEach(el => el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') validate(el); }));
  }
  const RULES = {
    name: v => v.trim().length >= 2 ? '' : 'Please add your name.',
    phone: v => /^\+?[\d\s().-]{7,25}$/.test(v.trim()) && v.replace(/\D/g, '').length >= 7 ? '' : 'Add a number with country code, like +91 98765 43210.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Add an email like you@company.com.',
    message: v => v.trim().length >= 5 ? '' : 'Write a short message.',
  };
  function validate(el) {
    const rule = RULES[el.name]; if (!rule) return true;
    const msg = rule(el.value); const err = dlg.querySelector('#ct-' + el.name + '-err');
    el.setAttribute('aria-invalid', msg ? 'true' : 'false'); if (msg) el.setAttribute('aria-describedby', err.id); else el.removeAttribute('aria-describedby');
    err.textContent = msg; return !msg;
  }
  function open(e) {
    if (e) e.preventDefault();
    if (!dlg) build();
    opener = e && e.currentTarget || document.activeElement;
    card.classList.remove('is-done'); statusEl.innerHTML = ''; dlg.querySelector('#ct-form-err').textContent = '';
    openedAt = Date.now();
    if (window.__lenis) window.__lenis.stop();
    document.documentElement.style.overflow = 'hidden';
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    setTimeout(() => dlg.querySelector('#ct-name').focus({ preventScroll: true }), reduce ? 0 : 60);
  }
  function close() { if (dlg && dlg.open) { if (typeof dlg.close === 'function') dlg.close(); else { dlg.removeAttribute('open'); dlg.dispatchEvent(new Event('close')); } } }
  function showStatus(ok, detail) {
    card.classList.add('is-done');
    statusEl.innerHTML = ok
      ? `<div class="ct-tick" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11.5l4 4 8-9"/></svg></div><h3>Message sent</h3><p>Thanks. I'll get back to you soon, on WhatsApp or by email.</p><button class="ct-send" type="button" data-ct-close>Close <span class="ct-dot" aria-hidden="true"></span></button>`
      : `<h3>That didn't go through</h3><p>${detail || 'Something went wrong on my side.'} You can email me directly instead:</p><div class="ct-mail"><code>${CONTACT.email}</code><button class="ct-copy" type="button">Copy email</button></div><p style="margin-top:14px"><button class="ct-copy" type="button" data-ct-retry>Try again</button></p>`;
    const c = statusEl.querySelector('[data-ct-close]'); if (c) { c.addEventListener('click', close); c.focus(); }
    const r = statusEl.querySelector('[data-ct-retry]'); if (r) r.addEventListener('click', () => { card.classList.remove('is-done'); statusEl.innerHTML = ''; dlg.querySelector('#ct-message').focus(); });
    const cp = statusEl.querySelector('.ct-copy:not([data-ct-retry])');
    if (cp) { cp.focus(); cp.addEventListener('click', async () => { try { await navigator.clipboard.writeText(CONTACT.email); cp.textContent = 'Copied'; } catch (_) { const range = document.createRange(); range.selectNodeContents(statusEl.querySelector('code')); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(range); cp.textContent = 'Selected, press copy'; } }); }
  }
  // one way of sending, used by the board and the plain card: { kind: 'ok' | 'field' | 'fail', field, error, detail }
  async function send(data) {
    data.page = location.pathname;
    if (CONTACT.simulate) { await new Promise(r => setTimeout(r, 900)); return { kind: 'ok' }; }
    try {
      const res = await fetch(CONTACT.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const out = await res.json().catch(() => ({}));
      if (res.ok && out.ok) return { kind: 'ok' };
      if (res.status === 429) return { kind: 'fail', detail: 'You just sent a message, so please wait a minute before sending another.' };
      if (res.status === 400 && out.field) return { kind: 'field', field: out.field, error: out.error };
      return { kind: 'fail', detail: 'Something went wrong on my side.' };
    } catch (_) { return { kind: 'fail', detail: 'The message could not be sent from this connection.' }; }
  }
  async function submit(e) {
    e.preventDefault();
    const fields = [...form.querySelectorAll('input[name]:not([name=company]),textarea')];
    const ok = fields.map(validate).every(Boolean);
    if (!ok) { const bad = fields.find(f => f.getAttribute('aria-invalid') === 'true'); if (bad) bad.focus(); return; }
    const data = Object.fromEntries(new FormData(form).entries());
    data.elapsed = Date.now() - openedAt;
    sendBtn.disabled = true; sendBtn.firstChild.textContent = 'Sending ';
    const r = await send(data);
    sendBtn.disabled = false; sendBtn.firstChild.textContent = 'Send message ';
    if (r.kind === 'ok') { form.reset(); fields.forEach(f => f.removeAttribute('aria-invalid')); showStatus(true); }
    else if (r.kind === 'field') { const el = form.querySelector(`[name="${r.field}"]`); if (el) { validate(el); el.focus(); } dlg.querySelector('#ct-form-err').textContent = r.error || 'Please check the highlighted field.'; }
    else showStatus(false, r.detail);
  }
  // the board, when the device can draw it; the plain card otherwise (or if the board fails to load)
  let boardOff = !CONTACT.board;
  const has3d = () => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (_) { return false; } };
  function openAny(e) {
    if (e) e.preventDefault();
    const by = e && e.currentTarget || document.activeElement;
    // a page whose world has its own place for the form (a painting in the gallery, a sheet on the press…) takes over here
    // (a scene can also say "not here" by returning false, and the board takes over)
    if (window.__talkScene && has3d()) { try { if (window.__talkScene.open({ config: CONTACT, send, opener: by, fallback: () => open({ preventDefault() {}, currentTarget: by }) }) !== false) return; } catch (err) { console.warn('[contact] scene unavailable:', err && err.message); } }
    if (boardOff || !has3d()) return open({ preventDefault() {}, currentTarget: by });
    import(BASE + 'talk/board.js')
      .then(m => m.open(CONTACT, { opener: by, send }))
      .catch(err => { console.warn('[contact] board unavailable, using the plain form:', err && err.message); boardOff = true; open({ preventDefault() {}, currentTarget: by }); });
  }
  // every "Let's talk" button on the page (and any added later)
  document.addEventListener('click', e => { const b = e.target.closest && e.target.closest('[data-contact]'); if (b) openAny({ preventDefault: () => e.preventDefault(), currentTarget: b }); });
  window.openContact = () => openAny();
})();
