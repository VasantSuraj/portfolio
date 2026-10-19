# Vasant Suraj — portfolio: project documentation

_Status as of 19 Oct 2026. Two pages are live: the home page and the first automation page (Reddit Keyword Alerts). The second automation page (Notion to Webflow Publisher, "The Press") is designed and partly scaffolded, not yet built._

---

## 1. What this is

A scroll-driven, 3D portfolio for Vasant Suraj (Senior Webflow Lead Developer at Factors.ai, automations engineer). The design goal set at the start: award-level smoothness (Lusion as the reference), minimal text ("the design should speak"), everything interactive, built only with free tools, and no two pages sharing a visual concept.

The site has no build step and no framework. Each page is one self-contained HTML file with its CSS and JavaScript inline. The only runtime dependencies are Google Fonts and, on the automation page, three.js from a CDN.

## 2. Repository layout

```
/
├── index.html                               home page
├── automations/
│   └── reddit-keyword-alerts.html           automation page 1 (live)
│   └── notion-to-webflow.html               automation page 2 (in progress, not yet added)
├── portrait/
│   ├── portrait-color.webp                  hero portrait, cut out, real photo colours
│   ├── portrait-depth.png                   depth map (bright = near) used to give the particles 3D relief
│   └── portrait-hoodmask.png                R = hoodie, G = drawstrings, B = skin bounce-light; drives the colour wheel
├── thumbs/                                  deck thumbnails (to add; names listed in §6)
├── README.md                                how to run / deploy
├── DOCS.md                                  what each part is and means
└── BUILD.md                                 how it is built (tools, techniques, data flow)
```

Relative paths matter: `index.html` loads `portrait/...`, so keep `index.html` at the root next to the `portrait` folder.

## 3. Home page (`index.html`)

### 3.1 Structure, top to bottom
1. **Hero** – a WebGL2 particle portrait of Vasant built from the three textures in `portrait/`. Particles carry the real photo colours and are pushed in depth by the depth map, so the head and shoulders have relief and respond to the pointer with parallax. No name or heading in the hero; the name lives in the footer by decision.
2. **Dissolve → rain** – on scroll the particles release from the bottom of the figure upward, fall, and spread into a soft drifting particle field that stays behind the whole page. The field is the site's persistent background.
3. **Thread** – a sleek pink tube (SVG path, catmull-rom, drawn on with scroll) is introduced only when the Work section arrives, never while the hero is on screen. It weaves past each deck and, after the last deck, continues out of the right edge of the viewport about a third of a screen above the footer. It does not enter the footer.
4. **Three decks** (pinned "shuffling deck" showcases, one card centred at a time, numbered counter bottom-left, list on the right, role/stack/type on the left):
   - **Webflow work** – 5 Factors.ai pages (cards link to the live pages; thumbnails pending).
   - **Automations** – 19 n8n automations (summarised from the internal doc; cleared copy only).
   - **Personal projects** – 3 Vercel apps (cards link out).
5. **Footer** – large name, contact. The "Let's talk" pill in the header scrolls here.

### 3.2 Hoodie colour wheel
A palette button in the hero corner opens a full colour wheel that recolours only the hoodie. The mask makes this clean: hoodie pixels are tinted with their original shading preserved, drawstrings stay white for every colour, and the skin's bounce-light (the mint/blue cast under the chin) is neutralised so no colour leaks onto the face or neck. The bottom band of the figure was extended into the mask so no grey line remains below the hoodie.

### 3.3 Butterfly cursor
A small additive-canvas butterfly follows the native cursor with a spring lag, banks into turns, flaps faster when moving and slows and grows over links. Fine-pointer devices only; disabled for `prefers-reduced-motion`. The same module is used on every page.

### 3.4 Data
Deck content is three plain arrays near the top of the script (`WORK`, `AUTOMATIONS`, `PERSONAL`). Each entry has `name`, `cat`, `line`, `tags`, `one` (one-line summary), `trigger`, `outcome`, and optional `url`/`img`. Editing a card means editing one object.

### 3.5 Responsive
Breakpoints at 900 px and 760 px: the decks stack, the counter shrinks, the palette and sound pills collapse. The hero portrait re-anchors to the bottom on portrait screens.

## 4. Automation page 1: Reddit Keyword Alerts (`automations/reddit-keyword-alerts.html`)

### 4.1 Concept
The automation is shown as a **machine in a night landscape**. A fixed three.js stage; scrolling moves the camera from station to station while the machine keeps running in real time. Below the machine is the **runbook**, the written documentation of the automation.

### 4.2 The stations
| # | Station | What you see | What it means |
|---|---------|--------------|---------------|
| 0 | Hero | The whole machine over dark water, stream of Reddit cards entering from the left | Overview |
| 1 | Clock | Brass clock with glowing hand; every 4 s it fires a radar sweep across the water and a beam into the stream | The n8n schedule trigger |
| 2 | Lens | Large glass disc with the watchlist terms orbiting it; matched cards flash, spark and lift onto the glowing alert line; the rest sink and fade | Keyword / competitor matching, exact phrases |
| 3 | Gates | Amber dashed ring: stale cards tumble off ("too old"). Pink dashed ring: repeats drop down a chute into a glass memory box that ripples and fills ("already seen") | Freshness window and de-duplication |
| 4 | Slack | A Slack window on a monitor: `# alerts` channel with sidebar and composer. A single courier card leaves the gates every 3 s, rides the line, enters the monitor, and at that instant a new alert message slides in with a ping ring and a frame glow. Five different alerts loop. | The formatted alert |
| 5 | End | Pull-back shot and the outcome line | — |

Every label is plain text in 3D (no boxes): "schedule trigger", "watchlist · exact phrases", "freshness window", "de-dupe · seen before?", "seen-post memory", "slack · alerts channel".

### 4.3 Environment
- **Water**: a still black lake (three.js `Reflector`) reflecting every station, the stream, the ridge and the sky, with slow ripple distortion and faint glints. The reflection renders at 40 % resolution on desktop, 30 % on phones, and refreshes on alternate frames.
- **Mist**: four thin drifting noise sheets just above the surface.
- **Atmosphere**: two layers of low mountain silhouettes at the far edge, a soft haze band behind them, exponential fog so the floor and ridges fade out instead of ending.
- **Sky**: a faint twinkling starfield; a shooting star crosses behind the mountains every 4–8 s.
- **Rendering**: physically based materials, environment reflections, bloom (restrained threshold so only emissive parts glow), ACES tone mapping. Pixel ratio capped at 1.5, glass refraction at half resolution.

### 4.4 Copy and safety
All content is illustrative: the five Slack alerts are invented threads, the author is `u/author`, competitors appear as `<competitor>`, the watchlist terms are generic. No channel names, keys, webhook URLs, internal IDs or people names appear anywhere, and the internal Notion is not linked.

### 4.5 The runbook (on the page, below the machine)
Facts strip (trigger / cadence / stack / status), sticky section nav, then:
1. Problem
2. Flow – 8 numbered steps with the n8n node type under each
3. Matching rules – exact phrases, whole words, case/spacing ignored, first match wins, with an illustrative pseudo-code block
4. Guardrails – freshness window, de-duplication, bounded fetches, fail quiet not silent
5. The alert – a mock Slack message
6. Outcome
7. Operating it – how to add a keyword, a subreddit, change cadence or window, reset the memory

### 4.6 Scroll model
A tall invisible `runway` drives the camera: progress 0–1 maps to six camera keyframes, and each station **holds** while its caption is on screen (travel only happens in the gaps), so you never land mid-move. Below the runway the page scrolls normally into the runbook; the fixed captions fade out when the runbook arrives. Camera easing is time-based, so it feels the same at any frame rate; portrait screens step the camera back and raise the field of view.

## 5. Automation page 2: Notion to Webflow Publisher (in progress)

Concept chosen: **The Press**. A deliberately different world from page 1: a warm paper-white studio in daylight with real cast shadows, a drafting table instead of water, brass and graphite machine parts, paper blocks with ink, Webflow blue and a coral stamp ink as the accents. Mechanical, rhythmic motion instead of a flowing stream.

Planned stations: **Approve** (a physical lever flips Draft → Approved) → **Convert** (blocks peel off the Notion page stack one at a time and pass under a stamp head that turns each into its HTML tag) → **Enrich** (SEO plates — name, slug, meta title, meta description, OG image — drop into forge slots) → **Assemble** (a Webflow CMS item fills field by field, then a "Draft" ribbon drops across it) → **End** (a paper receipt prints out instead of a Slack window). Runbook sections: Problem, Flow, Mapping rules (block → HTML table), Guardrails (idempotency, re-approval, failed images), The result, Outcome, Operating it.

The page scaffold (styles, UI layer, captions, runbook skeleton) is written; the 3D scene is next.

## 6. Pending items
- **Thumbnails** for the 5 Factors.ai pages and 3 personal projects → `thumbs/benchmarks.jpg, campaign-offer.jpg, ilish.jpg, leaderboard.jpg, microsoft.jpg, nike.jpg, prove-roi.jpg, routines.jpg`. Missing files fall back to the placeholder.
- Wire the **automation deck cards** on the home page to their pages (they still open the slide-in panel). Reddit → `automations/reddit-keyword-alerts.html`.
- Remaining **17 automation pages**, each with its own concept (no repeats).
- **Footer**: real email and city; the footer name reveal design is deferred.
- Optional: Pangram Sans Rounded if the font files are supplied (Elms Sans is the current UI face).

## 7. Decisions log (what was tried and dropped)
- Hero name reveal: falling letters, outline name with hover fill, particles morphing into the name, letter-by-letter over a long scroll, a bubble font, a glass "Projects" title, a liquid "pour" into the name — all rejected; the name moved to the footer and the hero stays portrait → dissolve → rain.
- Thread: the portrait-becomes-tube hand-over was dropped; the tube now arrives on its own with the Work section, no loop or twist.
- Reddit page v1–v2 used flat primitives; v3 rebuilt it with real materials, bloom, the card atlas and sparks. The grid floor was replaced by water + mist (v5) after the sky was added (v4). The Slack card became a real Slack window with looping alerts (v6) and the courier mechanism (v7).
- For page 2, a Reddit-logo particle header was declined (trademark); the page gets an original particle/press concept instead.

## 8. Versioning
Every approved state is a git tag in the working repo (`v4-outline-name` … `v18-content`, `v31-thread-exit` for the home page; `auto-reddit-v1` … `auto-reddit-v7.1` for the Reddit page) with a copy in `backups/`. Any version can be restored in one command.

## 9. Running locally
```
npx serve .          # or any static server
```
Open `http://localhost:3000`. The pages must be served over http, not opened as `file://`, because WebGL loads the portrait textures with fetch.
