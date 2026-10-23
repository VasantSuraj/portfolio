// api/contact.js — Vercel serverless function behind the "Let's talk" form.
// It checks the message and forwards it to your WhatsApp. Your number and keys live only in Vercel's
// Environment Variables (Project → Settings → Environment Variables), never in the site's code.
//
// Provider (WA_PROVIDER):
//   callmebot (default) — CALLMEBOT_PHONE (your number, e.g. +919876543210), CALLMEBOT_APIKEY
//   meta                — WhatsApp Cloud API: WA_TOKEN, WA_PHONE_NUMBER_ID, WA_TO (your number, digits only),
//                          optional WA_TEMPLATE (+ WA_TEMPLATE_LANG, default "en") with 4 body variables:
//                          {{1}} name · {{2}} phone · {{3}} email · {{4}} message
// Optional: ALLOWED_ORIGINS = comma-separated list (e.g. https://yourdomain.com,https://your-app.vercel.app)

const LIMITS = { name: 80, phone: 30, email: 120, message: 1500 };
const recent = new Map();                        // best-effort rate limit, per running instance
const WINDOW_MS = 60 * 1000;

const clean = (v, max) => String(v == null ? '' : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max);

function check(body) {
  const name = clean(body.name, LIMITS.name), phone = clean(body.phone, LIMITS.phone), email = clean(body.email, LIMITS.email), message = clean(body.message, LIMITS.message);
  if (name.length < 2) return { field: 'name', error: 'Please add your name.' };
  if (!/^\+?[\d\s().-]{7,25}$/.test(phone) || phone.replace(/\D/g, '').length < 7) return { field: 'phone', error: 'Please add a contact number with country code.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { field: 'email', error: 'Please add a valid email.' };
  if (message.length < 5) return { field: 'message', error: 'Please write a short message.' };
  return { data: { name, phone, email, message, page: clean(body.page, 120) } };
}

function originAllowed(req) {
  const origin = req.headers.origin; if (!origin) return true;            // same-origin form posts may omit it
  const list = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  try { const o = new URL(origin); if (list.length) return list.includes(o.origin); return o.host === req.headers.host; } catch (_) { return false; }
}

function text(d) {
  return `📩 New message from your portfolio\n\n👤 ${d.name}\n📞 ${d.phone}\n✉️ ${d.email}\n\n${d.message}${d.page ? `\n\n— sent from ${d.page}` : ''}`;
}

async function sendCallMeBot(d) {
  const phone = process.env.CALLMEBOT_PHONE, key = process.env.CALLMEBOT_APIKEY;
  if (!phone || !key) throw new Error('CallMeBot is not configured');
  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text(d))}&apikey=${encodeURIComponent(key)}`;
  const r = await fetch(url, { method: 'GET' });
  const body = await r.text();
  if (!r.ok || /error|invalid|not valid|wrong/i.test(body)) throw new Error('CallMeBot rejected the message: ' + body.slice(0, 200));
}

async function sendMeta(d) {
  const token = process.env.WA_TOKEN, id = process.env.WA_PHONE_NUMBER_ID, to = (process.env.WA_TO || '').replace(/\D/g, '');
  if (!token || !id || !to) throw new Error('WhatsApp Cloud API is not configured');
  const tpl = process.env.WA_TEMPLATE;
  const payload = tpl
    ? { messaging_product: 'whatsapp', to, type: 'template', template: { name: tpl, language: { code: process.env.WA_TEMPLATE_LANG || 'en' }, components: [{ type: 'body', parameters: [d.name, d.phone, d.email, d.message.slice(0, 900)].map(t => ({ type: 'text', text: t.replace(/\s*\n\s*/g, ' ') })) }] } }
    : { messaging_product: 'whatsapp', to, type: 'text', text: { body: text(d) } };
  const r = await fetch(`https://graph.facebook.com/v20.0/${id}/messages`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  if (!r.ok) throw new Error('WhatsApp Cloud API error: ' + (await r.text()).slice(0, 300));
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'Use POST.' }); }
  if (!originAllowed(req)) return res.status(403).json({ ok: false, error: 'Not allowed.' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (_) { body = {}; } }
  body = body || {};

  // bots: the hidden "company" field is filled, or the form was sent too fast to be human. Pretend it worked.
  if (clean(body.company, 200) || Number(body.elapsed) < 1500) return res.status(200).json({ ok: true });

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
  const now = Date.now();
  for (const [k, t] of recent) if (now - t > WINDOW_MS) recent.delete(k);
  if (ip && recent.has(ip)) return res.status(429).json({ ok: false, error: 'Please wait a minute before sending another message.' });

  const v = check(body);
  if (v.error) return res.status(400).json({ ok: false, field: v.field, error: v.error });

  try {
    if ((process.env.WA_PROVIDER || 'callmebot').toLowerCase() === 'meta') await sendMeta(v.data); else await sendCallMeBot(v.data);
    if (ip) recent.set(ip, now);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[contact]', err && err.message);
    return res.status(502).json({ ok: false, error: 'The message could not be delivered.' });
  }
};
