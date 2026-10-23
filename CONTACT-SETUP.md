# "Let's talk" form → WhatsApp: setup

The "Let's talk" button on every page opens one shared contact form (`site.js`). The form sends the message to `/api/contact` (`api/contact.js`, a Vercel function), which forwards it to your WhatsApp. Your number and keys are stored only in Vercel's settings. They are never in the site's code, so nobody can see them.

## Files

| File | What it does |
|---|---|
| `site.js` | The form, used by every page. Change the intro text or fallback email at the top (`CONTACT`). |
| `api/contact.js` | Checks the message, blocks spam, sends it to WhatsApp. |
| Each page | Loads `site.js`; its "Let's talk" button has `data-contact`. New pages need only the same two things. |

## Option A: CallMeBot (free, 5 minutes)

1. Check the current CallMeBot WhatsApp number on callmebot.com (WhatsApp section) and save it in your phone's contacts.
2. From your WhatsApp, send it: `I allow callmebot to send me messages`
3. It replies with your **API key**. If nothing arrives within 2 minutes, try again after 24 hours.
4. In Vercel: **Project → Settings → Environment Variables**, add:
   - `CALLMEBOT_PHONE` = your number with country code, for example `+919876543210`
   - `CALLMEBOT_APIKEY` = the key from step 3
5. Redeploy (Deployments → ⋯ → Redeploy), then send yourself a test from the live site.

## Option B: official WhatsApp Cloud API (Meta)

1. Create an app at developers.facebook.com, add the WhatsApp product, and note the **Phone number ID** and a **permanent access token** (System User token).
2. Create a message template with four body variables: `{{1}}` name, `{{2}}` phone, `{{3}}` email, `{{4}}` message. Wait for approval.
3. In Vercel, add:
   - `WA_PROVIDER` = `meta`
   - `WA_TOKEN` = the access token
   - `WA_PHONE_NUMBER_ID` = the phone number ID
   - `WA_TO` = your WhatsApp number, digits only, for example `919876543210`
   - `WA_TEMPLATE` = the template's name (and `WA_TEMPLATE_LANG` if it isn't `en`)
4. Redeploy and test.

You can switch between A and B at any time by changing these variables. The site doesn't change.

## Optional

- `ALLOWED_ORIGINS` = `https://yourdomain.com,https://your-project.vercel.app`, to accept messages only from your own site.

## Spam protection (already built in)

- A hidden field that only bots fill in. Their messages are dropped quietly.
- Messages sent faster than a person could type are dropped.
- One message per visitor per minute.
- Length limits on every field, and checks on the phone number and email.

## If a message doesn't arrive

- Vercel → your project → **Logs**: failed sends are logged as `[contact] …` with the reason.
- The visitor sees "That didn't go through" with your email and a Copy button, so the lead isn't lost.
- The form can't send from the Claude preview, which blocks it. Test on the live Vercel site.
