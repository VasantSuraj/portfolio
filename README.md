# Vasant Suraj — portfolio

_Updated 25 Oct 2026. Current version: **v54-webinar** (commit `61f1173`), with these docs on top as **v55-docs**._

A scroll-driven 3D portfolio. It is a static site with no build step and no framework: every page is one HTML file with its CSS and JavaScript inline, plus shared scripts and texture folders. Host it on any static host (it runs on Vercel), or locally with `npx serve .` or `python3 -m http.server`.

Pages must be served over **http**, not opened as `file://`. WebGL loads textures and model files by request, and those requests fail from `file://`. The contact form only sends from the deployed Vercel site, because it needs the `/api/contact` function.

## What is on the site

| Page | World |
|---|---|
| `index.html` (home) | particle portrait → rain → 3D projects forest → cliff and fall → beach with testimonial lanterns → footer under the stars |
| `automations/reddit-keyword-alerts.html` | Reddit Keyword Alerts: a machine at night over still black water |
| `automations/notion-to-webflow.html` | Notion to Webflow Publisher: "The Press", a paper studio in daylight, with Inky |
| `automations/seo-pre-live-checks.html` | SEO Pre-Live Checks: "Opening Night", a dark museum gallery |
| `automations/auto-internal-linking.html` | Auto Internal Linking: a transit city at night, just after rain |
| `automations/ai-blog-drafts.html` | AI Blog Drafts: a greenhouse at dawn |
| `automations/webinar-to-webflow.html` | Webinar to Webflow: a recording studio at night |

Every page has a **Let's talk** button. It opens a contact form that belongs to that page's world (the particles, a hanging board, a bottle, a sheet of paper, a painting…). The message goes to WhatsApp through a Vercel function. The WhatsApp number and keys are never in the code: see `CONTACT-SETUP.md`.

## Files

```
index.html                    home page (≈236 KB: CSS + classic script + three.js module)
site.js                       shared on every page: the Let's talk button, the plain contact card, sending
api/contact.js                Vercel function: checks the message, blocks spam, sends it to WhatsApp
talk/                         Let's talk building blocks, loaded only on click
  surface.js                  the form for any 3D surface (measures the layout; the page paints it)
  board.js                    the hanging plank board on brass chains (used in the forest)
  css3d.js, room.js           three.js CSS3DRenderer and RoomEnvironment (r169), vendored
  wood_*, brass_*, chain.json textures and the chain-link model for the board
automations/                  one page per automation, each with its own world
  reddit-keyword-alerts.html  (92 KB)
  notion-to-webflow.html      (123 KB)
  seo-pre-live-checks.html    (105 KB)
  auto-internal-linking.html  (124 KB)
  ai-blog-drafts.html         (97 KB)
  webinar-to-webflow.html     (112 KB)
  city/                       45 files, 8.4 MB: textures + packed models for Auto Internal Linking
  greenhouse/                 23 files, 3.6 MB: textures, packed models, dawn sky for AI Blog Drafts
  studio/                     34 files, 3.6 MB: textures, packed models, studio light for Webinar to Webflow
portrait/                     3 files: the hero portrait's colour, depth and hoodie mask
forest/                       26 textures for the forest and beach (bark, leaves, mud, sand, rock, satin)
thumbs/                       project-card thumbnails (optional; see below)
vercel.json                   { "cleanUrls": true }
README.md                     this file
HANDOFF.md                    read first if you are continuing the work
DOCS.md                       what the site is, part by part
BUILD.md                      how it is built
CONTACT-SETUP.md              setting up the WhatsApp contact form
PORTFOLIO-HANDOFF.md          everything in one file, with the full timeline
```

The Reddit, Press and SEO pages have no asset folder: everything on them is drawn in code. The Press, the gallery and the Reddit page do load `talk/surface.js` for their Let's talk.

**Thumbnails** the home page looks for in `thumbs/`: `benchmarks.jpg`, `campaign-offer.jpg`, `microsoft.jpg`, `prove-roi.jpg`, `routines.jpg` (Webflow work), and `nike.jpg`, `ilish.jpg`, `leaderboard.jpg` (personal projects). A missing file is removed and the card shows its colour tint. The live repo has no `thumbs/` folder yet.

## External dependencies (loaded from CDNs at runtime)

- Google Fonts: **Elms Sans** (the site face) and Archivo (fallback) on every page. Also: **Caveat** (handwriting on tags, the ledger and sticky notes) on the AI Blog Drafts and Webinar pages; **Fraunces** on the SEO page and in `talk/board.js`
- **three.js 0.169** (jsDelivr) on the home page and in `talk/board.js`, `talk/css3d.js`, `talk/room.js`
- **Lenis 1.1.13** (jsDelivr) on the home page; if it fails to load, the page uses native scrolling
- **three.js 0.158** (jsDelivr, via an import map) on every automation page, with its addons: `EffectComposer`, `RenderPass`, `UnrealBloomPass`, `OutputPass`, `RoomEnvironment`, `RoundedBoxGeometry`, `Reflector`, `CSS3DRenderer`, `BufferGeometryUtils`

## Deploying

1. Upload into the repo root and **keep the folder structure**. Pages load `portrait/…`, `forest/…`, `talk/…`, `automations/<world>/…` and `site.js` by relative path.
2. Vercel deploys on every push. `cleanUrls` serves `/automations/reddit-keyword-alerts` and redirects the `.html` links.
3. The contact form needs the environment variables in `CONTACT-SETUP.md` (set once in Vercel, then redeploy).
4. Spot-check: the hero loads, the forest appears after the rain, a card opens its page, the back arrow returns to that card, Let's talk opens on each page.

When a new automation page ships, push: the page, its asset folder (if it has one) into `automations/`, and the updated `index.html` (its card's `url`).

## Query flags for testing

- `?fps` (or `#fps` on the home page): a frame-rate readout.
- `?snap`: the camera jumps instead of easing (used for screenshots).

## See also

- `HANDOFF.md`: read first if you are continuing the work
- `DOCS.md`: what the site is, part by part
- `BUILD.md`: how it is built
- `CONTACT-SETUP.md`: the WhatsApp contact form
- `PORTFOLIO-HANDOFF.md`: everything in one file, including the full timeline
