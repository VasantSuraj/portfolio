# "Let's talk" form → WhatsApp: setup

_Updated 25 Oct 2026 (v54). The form now takes each world's own shape, but the setup is unchanged since v50: one function, a few environment variables._

Every page has a **Let's talk** button. Clicking it opens a contact form that belongs to the page's world (see the table below). Whatever it looks like, every form sends the same four fields to `/api/contact` (`api/contact.js`, a Vercel function), which forwards the message to your WhatsApp.

**Your number and keys are stored only in Vercel's Environment Variables.** They are never in the site's code, in the docs or in the repo, so nobody can see them. Keep it that way: never paste the number into a page, a commit message or a doc.

---

## 1. Files

| File | What it does |
|---|---|
| `site.js` | Loaded on every page. Holds the settings (`CONTACT`), the one `send()` that talks to `/api/contact`, the plain contact card, and the router that decides which form opens. |
| `talk/surface.js` | The form used on 3D surfaces (a sheet, a painting, a screen…). It builds the live HTML form and measures it; the page paints it into its world. |
| `talk/board.js` | The hanging wooden board on brass chains, used in the forest on the home page. |
| `talk/css3d.js`, `talk/room.js` | three.js helpers the board needs (vendored copies). |
| `api/contact.js` | Checks the message, blocks spam, sends it to WhatsApp. |
| Each page | Loads `site.js` last; its Let's talk button has `data-contact`. A page with its own scene also sets `window.__talkScene`. |

### Settings at the top of `site.js` (`CONTACT`)

| Key | Value | Meaning |
|---|---|---|
| `endpoint` | `/api/contact` | the Vercel function |
| `email` | `vasantsuraj02@gmail.com` | shown only if sending fails, with a Copy button |
| `title` | `Let's talk` | the form's heading |
| `intro` | "Tell me about your project. I reply on WhatsApp or email, usually within a day." | the line under the heading |
| `board` | `true` | `false` = always use the plain card instead of the hanging board |
| `simulate` | `false` | `true` pretends to send (0.9 s, then success). Only for previews where `/api/contact` doesn't exist, such as the Claude artifact copies. **Must be `false` in the repo.** |

---

## 2. Which form opens where

`site.js` decides in this order:

1. **The page's own scene.** If the page set `window.__talkScene` and the device can draw WebGL, it gets the first go: `__talkScene.open({ config, send, opener, fallback })`. If it returns `false`, it declined and the next step runs.
2. **The hanging board** (`talk/board.js`, loaded on first click) if `CONTACT.board` is true and WebGL works.
3. **The plain card**: a dark rounded dialog with the same fields. Also used if the board or a scene fails to load.

| Page | Let's talk | When sent |
|---|---|---|
| Home, at the hero | the portrait's particles leave the face and draw the form (title, field outlines, button, close ring); the words fade in over them. The form takes the visitor's hoodie colour. | the particles re-form into "Message sent"; closing sends them back into the face |
| Home, in the forest | the hanging plank board drops in on brass chains; the page blurs behind it | "Message sent" burned into the wood |
| Home, on the beach | the camera turns to a sea-glass bottle in the sand; "There's a letter in the bottle. Scroll (Swipe up) to pull it out." The letter unrolls with the form on it | it rolls up, goes back in the bottle, is thrown into the sea; note "Message received. I'll reply on WhatsApp or by email." |
| Reddit Keyword Alerts | a glass "new thread" card lights up above the alert line | a copy rides the line into the alert window as a new note "from the portfolio" (a generic note, never what the visitor typed) |
| Notion to Webflow (The Press) | a drawing board stands up at the far left end of the table; Inky hops over | Inky stamps the sheet RECEIVED |
| SEO Pre-Live Checks (gallery) | the camera glides to a commission painting on the far end wall; the form is painted on the canvas | a red dot appears on its museum label ("Let's talk / Vasant Suraj / Commission enquiry / OPEN FOR NEW WORK") |
| Auto Internal Linking (city) | a ticket machine on the plaza; the form is on its screen | it prints a ticket: "Ticket printed" |
| AI Blog Drafts (greenhouse) | an order pad on the east gable post | stamped RECEIVED: "Order received" |
| Webinar to Webflow (studio) | through the window into the vocal booth, to the lyric sheet on the music stand | the ON AIR sign lights up: "You're on air" |

On a device without WebGL, every page uses the plain card. If a scene can't draw its surface (for example the painting fails to load), it calls `fallback()` and the plain card opens.

---

## 3. The fields and the checks

| Field | Rule (browser and server) | Limit |
|---|---|---|
| Name | at least 2 characters | 80 |
| Contact number | `+` and digits, spaces, `( ) . -`; at least 7 digits; "Add a number with country code, like +91 98765 43210." | 30 |
| Email | `you@company.com` shape | 120 |
| Message | at least 5 characters | 1500 |

Errors show on blur and clear as soon as the field is fixed. The server checks everything again and, if a field is wrong, the form highlights that field with the server's message.

What WhatsApp receives (CallMeBot, or the Cloud API without a template):

```
📩 New message from your portfolio

👤 <name>
📞 <phone>
✉️ <email>

<message>

— sent from /automations/<page>
```

The last line says which page it came from (`location.pathname`).

---

## 4. Option A: CallMeBot (free, 5 minutes)

1. Check the current CallMeBot WhatsApp number on callmebot.com (WhatsApp section) and save it in your phone's contacts.
2. From your WhatsApp, send it: `I allow callmebot to send me messages`
3. It replies with your **API key**. If nothing arrives within 2 minutes, try again after 24 hours.
4. In Vercel: **Project → Settings → Environment Variables**, add:
   - `CALLMEBOT_PHONE` = your number with country code (format like `+91…`)
   - `CALLMEBOT_APIKEY` = the key from step 3
5. Redeploy (Deployments → ⋯ → Redeploy), then send yourself a test from the live site.

CallMeBot is the default provider: you don't need `WA_PROVIDER` for it.

## 5. Option B: official WhatsApp Cloud API (Meta)

1. Create an app at developers.facebook.com, add the WhatsApp product, and note the **Phone number ID** and a **permanent access token** (System User token).
2. Optional but recommended: create a message template with four body variables: `{{1}}` name, `{{2}}` phone, `{{3}}` email, `{{4}}` message. Wait for approval. Without a template the function sends a plain text message, which Meta only delivers inside a 24-hour customer window.
3. In Vercel, add:
   - `WA_PROVIDER` = `meta`
   - `WA_TOKEN` = the access token
   - `WA_PHONE_NUMBER_ID` = the phone number ID
   - `WA_TO` = your WhatsApp number, digits only
   - `WA_TEMPLATE` = the template's name, and `WA_TEMPLATE_LANG` if it isn't `en`
4. Redeploy and test.

The function calls `graph.facebook.com/v20.0/<phone number id>/messages`. With a template, the message body is cut to 900 characters.

You can switch between A and B at any time by changing these variables. The site doesn't change.

## 6. Optional

- `ALLOWED_ORIGINS` = `https://yourdomain.com,https://your-project.vercel.app`, to accept messages only from your own site. Without it, the function accepts posts whose origin matches its own host (and posts with no origin header).

---

## 7. Spam protection (already built in)

- **Honeypot:** a hidden "Company" field that only bots fill in. Their messages get a fake success and are dropped.
- **Timing:** messages sent less than 1.5 s after the form opened are dropped the same way.
- **Rate limit:** one message per visitor (IP) per minute. A second one gets "You just sent a message, so please wait a minute before sending another." (best effort, per running instance)
- **Length limits** on every field, control characters stripped, and the phone and email checks.
- `POST` only (anything else gets 405); a disallowed origin gets 403.

## 8. Responses (what the form does with them)

| Function answer | Form shows |
|---|---|
| 200 `{ ok: true }` | the world's "sent" moment |
| 400 `{ field, error }` | that field highlighted with the message |
| 429 | "That didn't go through" with the wait-a-minute note |
| 502 or anything else | "That didn't go through. Something went wrong on my side. You can email me directly instead:" with the email and a **Copy** button, so the lead isn't lost |
| network failure | the same, with "The message could not be sent from this connection." |

## 9. If a message doesn't arrive

- Vercel → your project → **Logs**: failed sends are logged as `[contact] …` with the reason (for example "CallMeBot is not configured").
- Check the variable names exactly, and that you redeployed after adding them.
- **The form can't send from a Claude preview.** Previews block outside requests and have no `/api/contact`; their copies of `site.js` use `simulate: true`, so they only pretend. Always test on the live Vercel site.

## 10. Adding Let's talk to a new page

1. Give the page a button with `data-contact` and `aria-haspopup="dialog"` (its `href` stays as a fallback).
2. Load `../site.js` last (`<script src="../site.js" defer></script>`).
3. For a form in the page's world: import `../talk/surface.js`, create the surface with a `look` class and `copy` (`sentTitle`, `sentText`), paint its `layout()` into the world's texture, lay the live form over it with a `CSS3DObject`, and set `window.__talkScene = { open }`. BUILD.md §4 explains how.
