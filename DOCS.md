# Vasant Suraj — portfolio: project documentation

_Status as of 22 Oct 2026, version **v45-reddit-link**. Two pages are live: the home page and the first automation page (Reddit Keyword Alerts). The second automation page (Notion to Webflow Publisher, "The Press") is designed but not built._

---

## 1. What this is

A scroll-driven 3D portfolio for Vasant Suraj, Senior Webflow Lead Developer at Factors.ai and automations engineer.

The design goals set at the start:
- award-level smoothness, with Lusion as the reference
- minimal text ("the design should speak")
- everything interactive
- built only with free tools
- no two pages sharing a visual concept

The site has no build step and no framework. Each page is one self-contained HTML file with its CSS and JavaScript inline. Runtime dependencies:
- Google Fonts
- on the home page, three.js 0.169 and Lenis 1.1.13 from jsDelivr
- on the automation page, three.js 0.158 from jsDelivr

## 2. Repository layout

```
/
├── index.html                               home page
├── vercel.json                              { "cleanUrls": true }
├── automations/
│   └── reddit-keyword-alerts.html           automation page 1 (live)
│   └── notion-to-webflow.html               automation page 2 (planned, not yet added)
├── portrait/
│   ├── portrait-color.webp                  hero portrait, cut out, real photo colours
│   ├── portrait-depth.png                   depth map (bright = near) used to give the particles 3D relief
│   └── portrait-hoodmask.png                R = hoodie, G = drawstrings, B = skin bounce-light; drives the colour wheel
├── forest/                                  26 textures: bark ×9, leaves ×4, forest floor ×3, dry sand ×3, wet sand ×1, rock ×3, satin ×3
├── thumbs/                                  project-card thumbnails (names in §6)
├── README.md                                how to run / deploy
├── HANDOFF.md                               read first when continuing the work
├── DOCS.md                                  what each part is and means (this file)
├── BUILD.md                                 how it is built (tools, techniques, data flow)
└── PORTFOLIO-HANDOFF.md                     everything in one file, with the full timeline
```

Relative paths matter. `index.html` loads `portrait/…`, `forest/…` and `thumbs/…`, so keep it at the root next to those folders.

## 3. Home page (`index.html`)

### 3.1 Structure, top to bottom (the scroll journey)

1. **Loader:** a large 000→100 counter with "Assembling N particles of one person."

2. **Hero:** a WebGL2 particle portrait of Vasant built from the three textures in `portrait/`. The particles carry the real photo colours and are pushed in depth by the depth map, so the head and shoulders have relief and react to the pointer and the butterfly with parallax. There is no name or heading in the hero; by decision, the name lives in the footer.

3. **Dissolve → rain:** on scroll, the particles let go from the bottom of the figure upward and fall as rain. The particle layer fades out completely as the forest fades in.

4. **Projects forest:** a three.js forest. The page doesn't visibly move; scrolling walks the camera **into the screen** along a winding forest path.
   - It is early evening (6–7 pm): a low warm sun behind the trees, long shadows, soft amber haze, sun shafts, falling leaves. **Night mode** gives bluish moonlight, about 10 fireflies and a moon.
   - Three chapters, each opening with a big title floating over the path:
     - **01 Webflow work**: 5 Factors.ai pages, linking to the live pages
     - **02 Automations**: 19 n8n automations
     - **03 Personal projects**: 3 Vercel apps, linking out
   - Cards are real HTML placed in 3D. They alternate left and right, and the camera **turns to face each one**. The facing card lights up, tilts toward the cursor and shows an **Open** or **Details** pill.
   - Automations that have their own page open it (so far Reddit Keyword Alerts, in the same tab). The others open a slide-in details panel.
   - A **counter** bottom-left shows the chapter and card number.
   - Arrow keys and PageUp/PageDown step between cards.

5. **Cliff and fall:** the forest ends at a broken cliff lip.
   1. The camera turns left to show the **headland**, where the forest carries on, and a **stream that pours off it as a waterfall**.
   2. It looks over the edge.
   3. It falls about 40 m beside the waterfall to the sand.

6. **Beach, "04 Kind words":** a cove facing a sunset over the sea, or a moonlit sky in night mode. It has real dry and wet sand, mossy rock cliffs, boulders, a layered waterfall with white water and spray, and a shimmering sea with foam.
   - **Plain paper sky lanterns** keep rising from the shore and drifting out to sea.
   - **Each testimonial is one big paper lantern carrying a satin banner** on a V-shaped cord. As you scroll:
     1. it glides in low over the water from the right
     2. it rises to just above the horizon, about 16 m out
     3. its banner **unrolls** so you can read it (opening and closing quote marks, the quote, name · role, company)
     4. it lifts up and away to the left while the next one comes in
   - Banners **never roll back up**. Once all six have gathered high over the sea, **the card lanterns drift off and disappear**, leaving only the plain lanterns going up into the sky.
   - The sun sinks while you read. The six current testimonials are **samples**, each with a SAMPLE tag; Vasant will send the real ones.

7. **Dusk → stars → footer:** the sun sets, the sky fills with stars and the camera tilts up.
   - The footer shows **VASANT SURAJ** in huge type, the letters appearing one by one like stars.
   - It also shows the email (vasantsuraj02@gmail.com), "Webflow developer · Automations engineer" and "Bangalore".
   - **Three plain lanterns rise slowly past the name**, close to the camera and behind the letters, on a loop. This gives the end its depth.

### 3.2 Header and controls
- **Top-left:** the name mark (scrolls to the top).
- **Top-right:**
  - **day/night toggle**: a moon or sun icon that switches the forest, beach and sky to night (moon, stars, fireflies, glowing lanterns); remembered per visitor
  - **sound**: a soft ambient drone
  - **Let's talk**: scrolls to the footer
- **Bottom-left, hero only:** the hoodie colour button.

### 3.3 Hoodie colour wheel
A palette button in the hero corner opens a full colour wheel that recolours only the hoodie. The mask keeps this clean:
- hoodie pixels are tinted with their original shading preserved
- drawstrings stay white for every colour
- the skin's bounce-light (the mint/blue cast under the chin) is neutralised, so no colour leaks onto the face or neck

There is a lightness slider and an "Original" reset, and the choice is remembered.

### 3.4 Butterfly cursor
A small pink→blue butterfly follows the native cursor with a spring lag. It banks into turns, flaps faster when moving, and slows and grows over links. It appears on fine-pointer devices only and is disabled for `prefers-reduced-motion`. The same module is used on every page.

### 3.5 Data
Card content is in plain arrays near the top of the first script:
- `WORK`, `AUTOMATIONS` and `PERSONAL`. Each entry has `name`, `cat`, `line`, and either `tags`, `one`, `trigger`, `outcome` (automations) or a role/stack/type block. The optional `url` and `img` fields are covered below.
- `TESTIMONIALS`: `quote`, `name`, `role`, `company`, `sample`.

Editing a card means editing one object. The forest runway, the chapters, the counter, and the lanterns and banners are all built from these arrays, so adding or removing entries just works.
- **Adding a page for an automation:** set `url: 'automations/<page>.html'` on its entry.
- **Real testimonials:** replace the six samples and set `sample: false`.

### 3.6 Responsive
On portrait screens (phones): a wider field of view, cards and titles sized from the screen width, the camera stopping a little further back, and banners about 80 % of the screen width and centred. Lanterns arrive from the side over the water, and the footer lanterns are pushed further away so they don't swamp the screen. The 760 px breakpoint shrinks the header pills, the counter and the card text.

### 3.7 If 3D can't start
If WebGL fails, or 3D hasn't started within 12 s, the projects and testimonials appear as a plain responsive grid of cards. In 3D mode the same list stays available to screen readers.

## 4. Automation page 1: Reddit Keyword Alerts (`automations/reddit-keyword-alerts.html`)

### 4.1 Concept
The automation is shown as a **machine in a night landscape**: a fixed three.js stage. Scrolling moves the camera from station to station while the machine keeps running in real time. Below the machine is the **runbook**, the written documentation of the automation.

### 4.2 The stations
| # | Station | What you see | What it means |
|---|---------|--------------|---------------|
| 0 | Hero | The whole machine over dark water, with a stream of Reddit cards entering from the left | Overview |
| 1 | Clock | A brass clock with a glowing hand; every 4 s it fires a radar sweep across the water and a beam into the stream | The n8n schedule trigger |
| 2 | Lens | A large glass disc with the watchlist terms orbiting it; matched cards flash, spark and lift onto the glowing alert line, and the rest sink and fade | Keyword and competitor matching, exact phrases |
| 3 | Gates | Amber dashed ring: stale cards tumble off ("too old"). Pink dashed ring: repeats drop down a chute into a glass memory box that ripples and fills ("already seen") | Freshness window and de-duplication |
| 4 | Slack | A Slack window on a monitor: the `# alerts` channel with sidebar and composer. A single courier card leaves the gates every 3 s, rides the line and enters the monitor; at that instant a new alert message slides in with a ping ring and a frame glow. Five different alerts loop. | The formatted alert |
| 5 | End | Pull-back shot and the outcome line | — |

Every label is plain text in 3D with no boxes: "schedule trigger", "watchlist · exact phrases", "freshness window", "de-dupe · seen before?", "seen-post memory", "slack · alerts channel".

### 4.3 Environment
- **Water:** a still black lake (three.js `Reflector`) reflecting every station, the stream, the ridge and the sky, with slow ripple distortion and faint glints. The reflection renders at 40 % resolution on desktop and 30 % on phones, and refreshes on alternate frames.
- **Mist:** four thin drifting noise sheets just above the surface.
- **Atmosphere:** two layers of low mountain silhouettes at the far edge, a soft haze band behind them, and exponential fog so the floor and ridges fade out instead of ending.
- **Sky:** a faint twinkling starfield; a shooting star crosses behind the mountains every 4–8 s.
- **Rendering:** physically based materials, environment reflections, bloom (restrained threshold, so only emissive parts glow) and ACES tone mapping. Pixel ratio capped at 1.5, glass refraction at half resolution.

### 4.4 Copy and safety
All content is illustrative: the five Slack alerts are invented threads, the author is `u/author`, competitors appear as `<competitor>`, and the watchlist terms are generic. No channel names, keys, webhook URLs, internal IDs or people's names appear anywhere, and the internal Notion is not linked.

### 4.5 The runbook (on the page, below the machine)
It opens with a facts strip (Trigger: Schedule · Cadence: every few minutes · Stack: n8n · Reddit · Slack · Status: In production) and a sticky section nav. Then:
1. Problem
2. Flow: 8 numbered steps with the n8n node type under each
3. Matching rules: exact phrases, whole words, case and spacing ignored, first match wins, with an illustrative pseudo-code block
4. Guardrails: freshness window, de-duplication, bounded fetches, fail quiet not silent
5. The alert: a mock Slack message
6. Outcome
7. Operating it: how to add a keyword or a subreddit, change the cadence or window, and reset the memory

### 4.6 Scroll model
A tall invisible `runway` drives the camera. Progress 0–1 maps to six camera keyframes, and each station **holds** while its caption is on screen; travel happens only in the gaps, so you never land mid-move. Below the runway the page scrolls normally into the runbook, and the fixed captions fade out when the runbook arrives. Camera easing is time-based, so it feels the same at any frame rate. On portrait screens the camera steps back and the field of view widens.

### 4.7 Links (fixed in v45)
- The top-left **"‹ Vasant Suraj"** returns to the home page (`../index.html`).
- **Let's talk** opens an email to vasantsuraj02@gmail.com.
- The home page's Reddit card opens this page in the same tab.
- "Next automation → Competitive Intel System" is still a placeholder (`#`) until that page exists.

## 5. Automation page 2: Notion to Webflow Publisher (planned)

The chosen concept is **The Press**, a deliberately different world from page 1:
- a warm paper-white studio in daylight with real cast shadows
- a drafting table instead of water
- brass and graphite machine parts, paper blocks with ink
- Webflow blue and a coral stamp ink as the accents
- mechanical, rhythmic motion instead of a flowing stream

**Planned stations:**
1. **Approve:** a physical lever flips Draft → Approved.
2. **Convert:** blocks peel off the Notion page stack one at a time and pass under a stamp head that turns each into its HTML tag.
3. **Enrich:** SEO plates (name, slug, meta title, meta description, OG image) drop into forge slots.
4. **Assemble:** a Webflow CMS item fills field by field, then a "Draft" ribbon drops across it.
5. **End:** a paper receipt prints out instead of a Slack window.

**Runbook sections:** Problem, Flow, Mapping rules (block → HTML table), Guardrails (idempotency, re-approval, failed images), The result, Outcome, Operating it.

A scaffold (`auto-notion-webflow.html`: styles, UI layer, captions, runbook skeleton) was written in an older working repo. **It is not in the current files.** Ask Vasant whether he has it; otherwise rebuild it.

## 6. Pending items
- **Real testimonials** to replace the six samples (`sample: false`).
- **Thumbnails** for the 5 Factors.ai pages and 3 personal projects: `thumbs/benchmarks.jpg, campaign-offer.jpg, microsoft.jpg, prove-roi.jpg, routines.jpg, nike.jpg, ilish.jpg, leaderboard.jpg`. A missing file falls back to the card's tint.
- **The Press** page, then the remaining **17 automation pages**, each with its own concept and no repeats. Set each entry's `url` so its card opens the page.
- Replace the slide-in panel once every automation has a page.
- Optional: Pangram Sans Rounded, if the font files are supplied (Elms Sans is the current UI face).
- Done since 19 Oct:
  - the footer now has the real email and city, and the name arrives like stars
  - the Reddit card opens its page

## 7. Decisions log (what was tried and dropped)

**Hero:**
- Rejected name reveals: falling letters, an outline name with hover fill, particles morphing into the name, letter-by-letter over a long scroll, a bubble font, a glass "Projects" title, a liquid "pour" into the name. The name moved to the footer, and the hero stays portrait → dissolve → rain.

**Projects section:**
- **Thread and decks:** the pink tube ("the thread") and the three shuffling decks were **removed** (20 Oct) when the projects became the 3D forest walk.
- **Forest look:**
  - early evening (6–7 pm), warm but not sunny; not green-heavy; realistic generated trees
  - only 5–10 lights (fireflies), at night only; falling leaves instead of light bugs in the evening
  - less fog, and far trees that don't look like an x-ray
  - softer sun inside the forest, full strength at the cliff
- **Lighting:** "brighter" versions were rejected twice (shadows visibly shifted, night too white). Change lighting only in small steps, on request.
- **Performance:**
  - Locking the resolution (v37.2) and cutting leaf cards for 60 fps (v38) were both rejected. They gave low fps or flicker, or made camera travel less smooth.
  - v37.4 (v37.1 + two minimal fixes) became the approved forest.
  - Smooth camera travel matters more than a slightly higher frame rate.

**Beach and testimonials:**
- **Testimonials:** lanterns were chosen over hot-air balloons, and they move with scroll only.
- **Removed:** fire/flame streaks and the **public feedback form** ("what if someone random adds a wrong message").
- **Banners:** satin cloth that unrolls in the wind.
- **Lantern iterations:**
  - v41: cards were too close, so the camera moved back and pairs of lanterns flew over the water and gathered.
  - v42: one lantern per card, cards that stay open, read farther out.
  - v43: card lanterns vanish at the gathering point; plain lanterns rise close past the footer name.
  - v44: bold quote marks and dark, heavy text.

**Reddit page:**
- v1–v2 used flat primitives; v3 rebuilt it with real materials, bloom, the card atlas and sparks.
- The grid floor was replaced by water and mist (v5) after the sky was added (v4).
- The Slack card became a real Slack window with looping alerts (v6), then the courier mechanism (v7).
- For page 2, a Reddit-logo particle header was declined (trademark); the page gets an original concept instead.

## 8. Versioning
Every approved state is a git tag in the working repo with a copy in `backups/`.

**Home page:**
- `v4-outline-name` … `v18-content`, `v31-thread-exit`: old home with thread and decks, from the first sessions
- `v32-forest-wip` … `v37.4`: the forest
- `v39-beach`, `v40-beach-real` (= **`main-version`**, the state Vasant locked as "main")
- `v41-lantern-flight`, `v42-one-lantern`, `v43-lanterns-away`, `v44-card-text`, **`v45-reddit-link` (current)**

**Reddit page:** `auto-reddit-v1` … `auto-reddit-v7.1`, plus the v45 link fixes.

The repo with all tags is distributed as `portfolio-full-history.zip`. BUILD.md §5 has the full tag list.

## 9. Running locally
```
npx serve .          # or: python3 -m http.server 8765
```
Open the printed address (e.g. `http://localhost:3000`). The pages must be served over http, not opened as `file://`, because WebGL loads the textures with fetch.
