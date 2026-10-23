/* talk/surface.js — the "Let's talk" form, for any surface in any world (a painting, a sheet of paper, a card…).
   No three.js here. It builds the live HTML form, measures where every word and field lands, and hands that layout to
   the page, which paints it into its own texture in its own style and lays the live fields over it (CSS3D).
   The sending itself comes from site.js (send), so the endpoint and the fallback email are configured in one place.

   const s = createSurface({ config, send, width, mobile, look: 'tb-look-paint', copy: {…}, onChange, onClose });
   s.el        the live form element (put it in a CSS3DObject)
   s.fw, s.fh  its size in CSS pixels (fixed for every state, so the surface never resizes)
   s.layout()  { texts: [{ el, kind, words: [{ w, x, y, h }], font, size, ls, up, glow }], fields: [{ x, y, w, h }], seals: [...] }
   s.setState('form' | 'sent' | 'error'), s.state, s.focusFirst(), s.destroy()
   onChange(reason) runs whenever the painted layout must be redrawn ('state' | 'messages'). */

const CSS = `
.tb-measure{position:fixed;left:-30000px;top:0;visibility:hidden;pointer-events:none}
.tb-face{box-sizing:border-box;position:relative;width:var(--fw);padding:var(--pad-t) var(--pad-x) var(--pad-b);display:flex;flex-direction:column;gap:18px;font-family:'Elms Sans','Archivo','Helvetica Neue',Arial,sans-serif;text-align:left;color:var(--tb-ink,#2a170a)}
.tb-face *{box-sizing:border-box}
.tb-face.tb-short{justify-content:center}
.tb-face.tb-short .tb-hd{position:absolute;top:calc(var(--pad-t) - 14px);right:calc(var(--pad-x) - 14px)}
.tb-hd{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
.tb-face h2,.tb-face h3{margin:0;font-family:var(--tb-display,'Fraunces',Georgia,'Times New Roman',serif);font-weight:var(--tb-display-w,800);font-size:50px;line-height:1;letter-spacing:var(--tb-display-ls,-.01em)}
.tb-face h3{font-size:40px}
.tb-intro,.tb-face p{margin:8px 0 0;font-size:16.5px;line-height:1.45;font-weight:700;max-width:34ch}
.tb-face p{margin:0}
.tb-form{display:flex;flex-direction:column;gap:6px;margin:0}
.tb-row{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.tb-f{display:flex;flex-direction:column;gap:8px;min-width:0}
.tb-f label{font-weight:800;font-size:12.5px;letter-spacing:.16em;text-transform:uppercase}
.tb-f input,.tb-f textarea{all:unset;box-sizing:border-box;width:100%;height:50px;padding:0 16px;font-family:'Elms Sans','Archivo','Helvetica Neue',Arial,sans-serif;font-size:17px;font-weight:500;color:var(--tb-field-ink,#f6ead6);border-radius:6px;caret-color:var(--tb-accent,#ff9a3c);transition:box-shadow .2s}
.tb-f textarea{height:118px;padding:13px 16px;line-height:1.45;resize:none;white-space:pre-wrap}
.tb-f input::placeholder,.tb-f textarea::placeholder{color:var(--tb-placeholder,rgba(246,234,214,.45))}
.tb-f input:focus,.tb-f textarea:focus{box-shadow:0 0 0 2px var(--tb-accent,#ff9a3c),0 0 18px var(--tb-accent-soft,rgba(255,154,60,.25))}
.tb-f.tb-bad input,.tb-f.tb-bad textarea{box-shadow:0 0 0 2px var(--tb-bad,#e0633a)}
.tb-msg{display:block;min-height:19px;font-size:13px;font-weight:800;line-height:19px}
.tb-foot{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-top:4px}
.tb-note{font-size:13px;font-weight:700;line-height:1.4;max-width:24ch}
.tb-hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
.tb-seal{width:76px;height:76px;display:block}
.tb-done{display:flex;flex-direction:column;gap:16px;align-items:flex-start}
.tb-btns{display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.tb-btn{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:10px;height:54px;padding:0 26px;border-radius:5px;font-family:'Elms Sans','Archivo','Helvetica Neue',Arial,sans-serif;font-weight:800;font-size:13.5px;letter-spacing:.14em;text-transform:uppercase;transition:transform .15s,filter .15s}
.tb-btn:active{transform:translateY(1px)}
.tb-btn[disabled]{cursor:progress}
.tb-knob{all:unset;cursor:pointer;flex:none;width:40px;height:40px;border-radius:50%;display:grid;place-items:center}
.tb-knob svg{width:14px;height:14px}
.tb-btn:focus-visible,.tb-knob:focus-visible,.tb-ghost:focus-visible{outline:2px solid var(--tb-accent,#ff9a3c);outline-offset:4px}
.tb-tag{display:inline-block;background:#efe2c8;color:#2a1a0d;border-radius:3px;padding:11px 14px;font-size:16px;font-weight:700;box-shadow:0 4px 10px rgba(0,0,0,.4);transform:rotate(-1.2deg);user-select:all;overflow-wrap:anywhere}
.tb-ghost{all:unset;cursor:pointer;font-weight:800;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;padding:14px 8px;text-decoration:underline;text-underline-offset:5px;color:var(--tb-ghost,#2a170a)}
.tb-live [data-paint]{color:transparent!important;text-shadow:none!important}
.tb-live .tb-seal{visibility:hidden}
.tb-face.tb-m{gap:12px}
.tb-face.tb-m h2{font-size:36px}.tb-face.tb-m h3{font-size:30px}
.tb-face.tb-m .tb-row{grid-template-columns:1fr;gap:4px}
.tb-face.tb-m .tb-form{gap:4px}
.tb-face.tb-m .tb-intro{font-size:14.5px;margin-top:6px}
.tb-face.tb-m .tb-f{gap:6px}
.tb-face.tb-m .tb-f input{height:46px}
.tb-face.tb-m .tb-f textarea{height:80px}
.tb-face.tb-m .tb-msg{min-height:16px;line-height:16px;font-size:12px}
.tb-face.tb-m .tb-foot{flex-direction:column;align-items:stretch;gap:12px}
.tb-face.tb-m .tb-btn{width:100%;height:50px}`;

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const RULES = {
  name: v => v.trim().length >= 2 || 'Please add your name.',
  phone: v => (/^\+?[\d\s().-]{7,25}$/.test(v.trim()) && v.replace(/\D/g, '').length >= 7) || 'Add a number with country code.',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Add an email like you@company.com.',
  message: v => v.trim().length >= 5 || 'Write a line or two about your project.'
};
let cssDone = false;
const saved = {};   // what the visitor typed survives closing and reopening (until it is sent)

export function createSurface(o) {
  if (!cssDone) { const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st); cssDone = true; }
  const C = o.config, look = o.look || '', m = !!o.mobile;
  const copy = Object.assign({ sentTitle: 'Message sent', sentText: "Thanks. I'll get back to you soon, on WhatsApp or by email.", knob: '' }, o.copy || {});
  const X = `<button class="tb-knob" type="button" data-close aria-label="Close">${copy.knob || `<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`}</button>`;
  let state = 'form', failText = '', openedAt = Date.now();
  const faces = {
    form: () => `<div class="tb-face ${look}${m ? ' tb-m' : ''}">
  <div class="tb-hd"><div><h2 data-paint="title" id="tb-title">${esc(C.title)}</h2><p class="tb-intro" data-paint="intro">${esc(C.intro)}</p></div>${X}</div>
  <form class="tb-form" novalidate>
    <div class="tb-f"><label data-paint="label" for="tb-name">Name</label><input data-field id="tb-name" name="name" autocomplete="name" maxlength="80"><span class="tb-msg" data-paint="msg" id="tb-e-name"></span></div>
    <div class="tb-row">
      <div class="tb-f"><label data-paint="label" for="tb-phone">Contact number</label><input data-field id="tb-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="30" placeholder="+91 98765 43210"><span class="tb-msg" data-paint="msg" id="tb-e-phone"></span></div>
      <div class="tb-f"><label data-paint="label" for="tb-email">Email</label><input data-field id="tb-email" name="email" type="email" inputmode="email" autocomplete="email" maxlength="120" placeholder="you@company.com"><span class="tb-msg" data-paint="msg" id="tb-e-email"></span></div>
    </div>
    <div class="tb-f"><label data-paint="label" for="tb-message">Message</label><textarea data-field id="tb-message" name="message" maxlength="1500" placeholder="What are you building, and where can I help?"></textarea><span class="tb-msg" data-paint="msg" id="tb-e-message"></span></div>
    <div class="tb-hp" aria-hidden="true"><label for="tb-company">Company</label><input id="tb-company" name="company" tabindex="-1" autocomplete="off"></div>
    <div class="tb-foot"><span class="tb-note" data-paint="note">Your details are only used to reply to you.</span><button class="tb-btn" type="submit">Send message</button></div>
  </form></div>`,
    sent: () => `<div class="tb-face tb-short ${look}${m ? ' tb-m' : ''}"><div class="tb-hd"><span></span>${X}</div>
  <div class="tb-done" role="status"><svg class="tb-seal" data-seal viewBox="0 0 76 76" aria-hidden="true"></svg>
  <h3 data-paint="title" data-glow id="tb-title">${esc(copy.sentTitle)}</h3><p data-paint="intro" data-glow>${esc(copy.sentText)}</p>
  <button class="tb-btn" type="button" data-close>Close</button></div></div>`,
    error: () => `<div class="tb-face tb-short ${look}${m ? ' tb-m' : ''}"><div class="tb-hd"><span></span>${X}</div>
  <div class="tb-done" role="alert"><h3 data-paint="title" id="tb-title">That didn't go through</h3><p data-paint="intro">${esc(failText || 'Your message is still here.')} Try again, or email me directly:</p>
  <span class="tb-tag" data-mail>${esc(C.email)}</span>
  <div class="tb-btns"><button class="tb-btn" type="button" data-copy>Copy email</button><button class="tb-ghost" type="button" data-retry>Try again</button></div></div></div>`
  };
  const host = document.createElement('div'); host.className = 'tb-measure'; host.setAttribute('aria-hidden', 'true'); document.body.appendChild(host);
  const pad = f => { f.style.setProperty('--pad-t', (o.pad && o.pad[0]) || (m ? '40px' : '58px')); f.style.setProperty('--pad-x', (o.pad && o.pad[1]) || (m ? '24px' : '54px')); f.style.setProperty('--pad-b', (o.pad && o.pad[2]) || (m ? '40px' : '52px')); };
  const fw = Math.round(o.width);
  const measureEl = st => { host.innerHTML = faces[st](); const f = host.firstElementChild; f.style.setProperty('--fw', fw + 'px'); pad(f); return f; };
  const fh = Math.max(o.minHeight || 0, measureEl('form').offsetHeight);
  const live = document.createElement('div'); live.className = 'tb-live';
  const api = { el: live, fw, fh, get state() { return state; } };

  function mount() {
    live.innerHTML = faces[state](); const f = live.firstElementChild;
    f.style.setProperty('--fw', fw + 'px'); f.style.height = fh + 'px'; pad(f);
    f.setAttribute('role', 'dialog'); f.setAttribute('aria-modal', 'true'); f.setAttribute('aria-labelledby', 'tb-title');
    const form = f.querySelector('form');
    if (form) {
      Object.entries(saved).forEach(([k, v]) => { const el = form.querySelector(`[name=${k}]`); if (el) el.value = v; });
      Object.keys(RULES).forEach(k => { const el = form.querySelector(`[name=${k}]`);
        el.addEventListener('blur', () => { if (!live.contains(el) || !el.value) return; const was = sig(); check(k); if (sig() !== was) o.onChange && o.onChange('messages'); });
        el.addEventListener('input', () => { if (!live.contains(el)) return; saved[k] = el.value; if (el.closest('.tb-f').classList.contains('tb-bad')) { const was = sig(); check(k); if (sig() !== was) o.onChange && o.onChange('messages'); } });
      });
      form.addEventListener('submit', submit);
    }
    f.addEventListener('click', e => {
      if (e.target.closest('[data-close]')) o.onClose && o.onClose();
      else if (e.target.closest('[data-retry]')) setState('form');
      else if (e.target.closest('[data-copy]')) { const btn = e.target.closest('[data-copy]'), ok = () => { btn.textContent = 'Copied'; setTimeout(() => btn.textContent = 'Copy email', 1600); };
        const sel = () => { const s = getSelection(), r = document.createRange(); r.selectNodeContents(f.querySelector('[data-mail]')); s.removeAllRanges(); s.addRange(r); btn.textContent = 'Selected, press copy'; };
        try { navigator.clipboard.writeText(C.email).then(ok, sel); } catch (_) { sel(); } }
    });
  }
  const sig = () => [...live.querySelectorAll('.tb-msg')].map(x => x.textContent).join('|');
  function setMsg(k, text) {
    const el = live.querySelector(`[name=${k}]`), msg = live.querySelector('#tb-e-' + k); if (!el || !msg) return;
    el.closest('.tb-f').classList.toggle('tb-bad', !!text); msg.textContent = text || ''; el.setAttribute('aria-invalid', String(!!text));
    if (text) el.setAttribute('aria-describedby', 'tb-e-' + k); else el.removeAttribute('aria-describedby');
  }
  function check(k) { const el = live.querySelector(`[name=${k}]`), r = RULES[k](el.value); setMsg(k, r === true ? '' : r); return r === true; }
  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget, bad = Object.keys(RULES).filter(k => !check(k)); o.onChange && o.onChange('messages');
    if (bad.length) { form.querySelector(`[name=${bad[0]}]`).focus({ preventScroll: true }); return; }
    const data = Object.fromEntries(new FormData(form).entries()); data.elapsed = Date.now() - openedAt;
    const b = form.querySelector('.tb-btn'); b.disabled = true; b.textContent = 'Sending…';
    let r; try { r = await o.send(data); } catch (_) { r = { kind: 'fail', detail: 'The message could not be sent from this connection.' }; }
    if (!live.contains(b)) return;
    b.disabled = false; b.textContent = 'Send message';
    if (r.kind === 'ok') { Object.keys(saved).forEach(k => delete saved[k]); setState('sent'); o.onSent && o.onSent(); }
    else if (r.kind === 'field') { setMsg(r.field, r.error || 'Please check this field.'); o.onChange && o.onChange('messages'); const el = form.querySelector(`[name="${r.field}"]`); if (el) el.focus({ preventScroll: true }); }
    else { failText = r.detail || ''; setState('error'); }
  }
  function setState(s) { state = s; mount(); o.onChange && o.onChange('state'); api.focusFirst(); }

  // where everything sits, in CSS px from the face's top-left (measured on an untransformed copy)
  api.layout = () => {
    const f = measureEl(state); f.style.height = fh + 'px';
    live.querySelectorAll('.tb-msg').forEach(s => { const t = f.querySelector('#' + s.id); if (t) t.textContent = s.textContent; });
    const R = f.getBoundingClientRect(), rel = b => ({ x: b.left - R.left, y: b.top - R.top, w: b.width, h: b.height });
    const texts = [...f.querySelectorAll('[data-paint]')].map(el => {
      const cs = getComputedStyle(el), words = [], walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n;
      while ((n = walker.nextNode())) { const re = /\S+/g; let mm; while ((mm = re.exec(n.data))) { const r = document.createRange(); r.setStart(n, mm.index); r.setEnd(n, mm.index + mm[0].length); const b = rel(r.getBoundingClientRect()); words.push({ w: cs.textTransform === 'uppercase' ? mm[0].toUpperCase() : mm[0], x: b.x, y: b.y, h: b.h, wd: b.w }); } }
      return { el, kind: el.dataset.paint, glow: el.hasAttribute('data-glow'), words, size: parseFloat(cs.fontSize), font: (k = 1) => `${cs.fontStyle === 'italic' ? 'italic ' : ''}${cs.fontWeight} ${parseFloat(cs.fontSize) * k}px ${cs.fontFamily}`, ls: parseFloat(cs.letterSpacing) || 0 };
    });
    return { texts, fields: [...f.querySelectorAll('[data-field]')].map(el => rel(el.getBoundingClientRect())), seals: [...f.querySelectorAll('[data-seal]')].map(el => rel(el.getBoundingClientRect())), buttons: [...f.querySelectorAll('.tb-btn,.tb-knob')].map(el => rel(el.getBoundingClientRect())) };
  };
  api.setState = setState;
  api.reset = () => { state = 'form'; failText = ''; openedAt = Date.now(); mount(); o.onChange && o.onChange('state'); };
  api.focusFirst = () => { const f = live.querySelector('input:not([tabindex])') || live.querySelector('.tb-btn') || live.querySelector('button'); f && f.focus({ preventScroll: true }); };
  api.trap = e => {   // keep Tab inside the form while it is open
    if (e.key !== 'Tab') return; const f = [...live.querySelectorAll('input:not([tabindex]),textarea,button')]; if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus({ preventScroll: true }); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus({ preventScroll: true }); }
  };
  api.destroy = () => { host.remove(); live.remove(); };
  mount();
  return api;
}

/* drawing helpers the worlds share */
export function drawWords(ctx, t, k, fn) {
  ctx.font = t.font(k); ctx.textBaseline = 'middle'; try { ctx.letterSpacing = (t.ls * k) + 'px'; } catch (_) {}
  for (const w of t.words) fn(w.w, w.x * k, (w.y + w.h / 2) * k, w);
  try { ctx.letterSpacing = '0px'; } catch (_) {}
}
