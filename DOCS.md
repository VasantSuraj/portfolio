# Vasant Suraj — portfolio: project documentation

_Status as of 3 Nov 2026, version **v59-voice-talk** (page and docs). Nine pages are live: the home page and eight automation pages (Reddit Keyword Alerts, Notion to Webflow, SEO Pre-Live Checks, Auto Internal Linking, AI Blog Drafts, Webinar to Webflow, Video to Blog, Voice to Blog). Every page has a Let's talk form that sends to WhatsApp, drawn in that page's own world. Eleven automations still use the slide-in panel._

This file says **what** each part is and what it means. `BUILD.md` says how it is built. `HANDOFF.md` says how to continue the work.

---

## 1. What this is

A scroll-driven 3D portfolio for Vasant Suraj, Senior Webflow Lead Developer at Factors.ai and n8n automations engineer.

The design goals set at the start:
- award-level smoothness, with Lusion as the reference (also Igloo, Bruno Simon)
- minimal text ("the design should speak")
- everything interactive
- built only with free tools and free (CC0) assets
- **no two pages sharing a world**: each automation page has its own place, palette, props and motion
- shared chrome so it reads as one portfolio: Elms Sans, pills, numbered captions, the runbook layout, the butterfly cursor

The site has no build step and no framework. Each page is one self-contained HTML file with its CSS and JavaScript inline. Shared pieces: `site.js` (Let's talk), `talk/` (the 3D forms), `api/contact.js` (the WhatsApp function).

Runtime dependencies:
- Google Fonts (Elms Sans + Archivo everywhere; Caveat on the greenhouse and studio pages; Fraunces on the SEO page and the board; Limelight on the Video to Blog title card; Courier Prime on the Voice to Blog teleprinter sheet)
- on the home page: three.js 0.169 and Lenis 1.1.13 from jsDelivr
- on the automation pages: three.js 0.158 from jsDelivr

## 2. Repository layout

```
/
├── index.html                               home page
├── site.js                                  Let's talk on every page: settings, router, plain card, sending
├── vercel.json                              { "cleanUrls": true }
├── api/
│   └── contact.js                           Vercel function: message → WhatsApp (secrets in env vars)
├── talk/
│   ├── surface.js                           the form for any 3D surface (pages paint it in their own style)
│   ├── board.js                             the hanging plank board on brass chains (forest)
│   ├── css3d.js                             three.js CSS3DRenderer r169 (vendored)
│   ├── room.js                              three.js RoomEnvironment r169 (vendored)
│   ├── wood_diff_2k.jpg, wood_nor_2k.jpg, wood_rough_1k.jpg     Poly Haven wood_shutter (CC0)
│   ├── brass_{diff,metal,nor,rough}_1k.jpg                      Poly Haven brass_diya_lantern (CC0)
│   └── chain.json                           chain-link mesh taken from brass_diya_lantern
├── automations/
│   ├── reddit-keyword-alerts.html           page 1: the machine at night over water
│   ├── notion-to-webflow.html               page 2: The Press (paper studio, Inky)
│   ├── seo-pre-live-checks.html             page 3: Opening Night (museum gallery)
│   ├── auto-internal-linking.html           page 4: transit city at night
│   ├── ai-blog-drafts.html                  page 5: greenhouse at dawn
│   ├── webinar-to-webflow.html              page 6: recording studio at night
│   ├── video-to-blog.html                   page 7: The Projection Booth (old cinema booth before the show)
│   ├── voice-to-blog.html                   page 8: The Tracking Station (desert at dusk)
│   ├── city/                                45 files: textures + packed models (page 4)
│   ├── greenhouse/                          23 files: textures, packed models, dawn HDRI (page 5)
│   ├── studio/                              34 files: textures, packed models, studio HDRI (page 6)
│   ├── booth/                               35 files, 6.0 MB: textures, packed models, booth light (page 7)
│   └── station/                             52 files, 7.1 MB: textures, packed models and scans, dusk light (page 8)
├── portrait/
│   ├── portrait-color.webp                  hero portrait, cut out, real photo colours
│   ├── portrait-depth.png                   depth map (bright = near) for the particles' 3D relief
│   └── portrait-hoodmask.png                R = hoodie, G = drawstrings, B = skin bounce-light; drives the colour wheel
├── forest/                                  26 textures: bark ×9, leaves ×4, forest floor ×3, dry sand ×3, wet sand ×1, rock ×3, satin ×3
├── thumbs/                                  project-card thumbnails (not in the live repo yet; names in §8)
├── README.md, HANDOFF.md, DOCS.md, BUILD.md, CONTACT-SETUP.md, PORTFOLIO-HANDOFF.md
└── backups/                                 (working repo only, not deployed) copies of every version
```

Relative paths matter. `index.html` loads `portrait/…`, `forest/…`, `thumbs/…`, `talk/…` and `site.js`; each automation page loads `../site.js`, `../talk/surface.js` and its own folder (`city/`, `greenhouse/`, `studio/`, `booth/`, `station/`).

---

## 3. Home page (`index.html`)

### 3.1 Structure, top to bottom (the scroll journey)

1. **Loader:** a large 000→100 counter with "Assembling N particles of one person." **Coming back from an automation page there is no loader** (v48): the page opens straight in the forest at the card you left from.

2. **Hero:** a WebGL2 particle portrait of Vasant built from the three textures in `portrait/`. The particles carry the real photo colours and are pushed in depth by the depth map, so the head and shoulders have relief and react to the pointer and the butterfly with parallax. There is no name or heading in the hero; by decision, the name lives in the footer.

3. **Dissolve → rain:** on scroll, the particles let go from the bottom of the figure upward and fall as rain. The particle layer fades out completely as the forest fades in.

4. **Projects forest:** a three.js forest. The page doesn't visibly move; scrolling walks the camera **into the screen** along a winding forest path.
   - It is early evening (6–7 pm): a low warm sun behind the trees, long shadows, soft amber haze, sun shafts, falling leaves. **Night mode** gives bluish moonlight, about 10 fireflies and a moon.
   - Three chapters, each opening with a big title floating over the path:
     - **01 Webflow work**: 5 Factors.ai pages, linking to the live pages
     - **02 Automations**: 19 n8n automations
     - **03 Personal projects**: 3 Vercel apps, linking out
   - Cards are real HTML placed in 3D. They alternate left and right, and the camera **turns to face each one**. The facing card lights up, tilts toward the cursor and shows an **Open** or **Details** pill.
   - **Six automations have their own page** and open it in the same tab: Notion to Webflow Publisher, SEO Pre-Live Checks, Auto Internal Linking, AI Blog Drafts, Webinar to Webflow, Reddit Keyword Alerts. The other 13 open a slide-in details panel.
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
  - **Let's talk**: opens the contact form for wherever you are (§3.3). Before v50 it scrolled to the footer.
- **Bottom-left, hero only:** the hoodie colour button.

### 3.3 Let's talk on the home page (three forms, one per place)
A small router on the page decides which form opens:

| Where you are | What happens |
|---|---|
| **At the hero** (portrait showing, forest not yet in) | The portrait's particles leave the face one by one, swirl, and settle into the form: they draw the title, the outlines of the fields, the button and the close ring. The small words, the labels and the live fields fade in as real text once the particles land. Sending re-forms the particles into "Message sent". Closing (✕ or Escape) sends them back into the face. **The form takes the hoodie colour** chosen on the wheel (outlines, labels, focus ring, button), with readable ink picked for light or dark colours. |
| **In the forest** (and anywhere else) | The **hanging board**: a weathered plank board on brass chains drops in front of the page while the page blurs behind it. The words are burned into the grain, the fields carved in, the buttons brass. Weathered grey-brown wood (fixed to match the approved preview in talk-all-v1). |
| **On the beach** (from just before the landing, to the footer) | The camera turns right to a **sea-glass bottle with a letter in it**, lying in the sand. A hint says "There's a letter in the bottle. Scroll to pull it out." (Swipe up on touch), with a "Pull the letter out" button. Scrolling pulls the cork and draws the letter out; it rises in front of you and unrolls, with the form on it. Sending rolls it back up, it slides into the bottle, the cork goes in, and the bottle is thrown into the sea. A note says "Message received. I'll reply on WhatsApp or by email." |

All three send through the same function (`CONTACT-SETUP.md`). Without WebGL the plain contact card opens instead.

### 3.4 Coming back from an automation page (v47, v48)
- Each automation page's back arrow links to `../index.html#from-<page>`. The home page reads that and **starts in the forest, facing that page's card**, with no loader and no counter animation.
- If you came to the automation page from the home page, the back arrow does a **real browser back** instead (so the scroll position and history are exactly as you left them). A `sessionStorage` note (`returnTo`) covers the case where the browser reloads the home page on back.
- In-page links on the automation pages (#doc, #top) don't add history entries, so "back" always means the forest.

### 3.5 Hoodie colour wheel
A palette button in the hero corner opens a full colour wheel that recolours only the hoodie. The mask keeps this clean:
- hoodie pixels are tinted with their original shading preserved
- drawstrings stay white for every colour
- the skin's bounce-light (the mint/blue cast under the chin) is neutralised, so no colour leaks onto the face or neck

There is a lightness slider, a hue input and an "Original" reset, and the choice is remembered. Since v51.1 it also colours the hero Let's talk form.

### 3.6 Butterfly cursor
A small pink→blue butterfly follows the native cursor with a spring lag. It banks into turns, flaps faster when moving, and slows and grows over links. It appears on fine-pointer devices only and is disabled for `prefers-reduced-motion`. The same module is used on every page.

### 3.7 Data
Card content is in plain arrays near the top of the first script:
- `WORK`, `AUTOMATIONS` and `PERSONAL`. Each entry has `name`, `cat`, `line`, and either `tags`, `one`, `trigger`, `outcome` (automations) or a role/stack/type block. The optional `url` and `img` fields are covered below.
- `TESTIMONIALS`: `quote`, `name`, `role`, `company`, `sample`.

Editing a card means editing one object. The forest runway, the chapters, the counter, and the lanterns and banners are all built from these arrays, so adding or removing entries just works.
- **Adding a page for an automation:** set `url: 'automations/<page>.html'` on its entry.
- **Real testimonials:** replace the six samples and set `sample: false`.
- The AI Blog Drafts card's tag reads **Claude** (it used to say Gemini), to match the real workflow.

The 19 automations, in order (★ = has its own page):
Notion to Webflow Publisher ★ · SEO Pre-Live Checks ★ · Auto Internal Linking ★ · AI Blog Drafts ★ · Webinar to Webflow ★ · Video to Blog · Voice to Blog · Podcast to CMO Brief · Cluster to Pillar Post · Blog Refresh Engine · Blog to Social and Ads · Organic Social Engine · Slack to Post Idea · LinkedIn ICP Leaderboard · Reddit Keyword Alerts ★ · Competitive Intel System · Marketing Ticket Desk · Dev Tasks from Slack · Docs to Notion Sync

### 3.8 Responsive
On portrait screens (phones): a wider field of view, cards and titles sized from the screen width, the camera stopping a little further back, and banners about 80 % of the screen width and centred. Lanterns arrive from the side over the water, and the footer lanterns are pushed further away so they don't swamp the screen. The 760 px breakpoint shrinks the header pills, the counter and the card text. The hero form is 344 px wide (or the screen minus 32 px) on phones and 560 px on desktop.

### 3.9 If 3D can't start
If WebGL fails, or 3D hasn't started within 12 s, the projects and testimonials appear as a plain responsive grid of cards. In 3D mode the same list stays available to screen readers. Let's talk falls back to the plain card.

---

## 4. The automation pages: what they share

Every automation page follows one pattern, so they feel like one portfolio while each world is different:

- **A fixed 3D stage** fills the screen. A tall invisible **runway** below it is what you scroll; scrolling moves the camera from station to station while the machine or world keeps living in real time.
- **Numbered captions** (`01 · Poll`, `02 · Match`…) appear one at a time on the left. Each station **holds** while its caption shows, and the camera travels only between captions, so you never land mid-move. Big moments are scroll-driven; idle life (dust, flicker, swaying) runs on time.
- A **hero title** first ("Automation · <category>", the name, one line, "Read the runbook"), and an **end card** at the end with the outcome, the stack chips and "Next automation → …".
- **Below the runway, the runbook**: the written documentation of the automation, with a facts strip (Trigger · Runs · Stack · one more), a sticky table of contents, numbered sections, step lists with the n8n node types, stats, and a note saying what was left out on purpose.
- **Header:** top-left "‹ Vasant Suraj" back arrow (returns to the forest at this page's card, §3.4); top-right **Let's talk**, which opens a form that belongs to the world (CONTACT-SETUP.md §2 has the table).
- **Phones:** the camera steps back and widens its field of view, and some shots have their own phone framing so nothing sits behind the caption.
- **The butterfly cursor** from the home page.
- **Content safety:** everything shown is illustrative. No API keys, webhook URLs, credential names, internal IDs, channel names, sheet names, workflow names, colleague names, writers' names, real post titles, domains or the internal Notion link. Competitors are `<competitor>`, authors `u/author`.

| # | Page | World | Palette / light | Runway | Captions |
|---|---|---|---|---|---|
| 1 | Reddit Keyword Alerts | a machine over still black water at night | mint, blue, pink, amber on near-black; bloom | 680svh | 4 |
| 2 | Notion to Webflow ("The Press") | a paper studio in daylight, drafting table, Inky | cream, brass, graphite, Webflow blue, coral ink; real shadows, no bloom | 960svh | 5 |
| 3 | SEO Pre-Live Checks ("Opening Night") | a dark museum gallery lit only by spotlights | museum green, oak, gilt, cream; shadows | 1300svh | 5 |
| 4 | Auto Internal Linking | a transit city at night just after rain | wet asphalt, sodium orange, inbound orange / outbound blue lines; bloom | 1300svh | 7 |
| 5 | AI Blog Drafts | a greenhouse at dawn | real dawn sky (HDRI), low gold sun, misted glass, greens; shadows | 1300svh | 6 |
| 6 | Webinar to Webflow | a recording studio control room at night | warm practical lamps, screen glow, booth light; shadows, light bloom | 1300svh | 7 |
| 7 | Video to Blog ("The Projection Booth") | an old cinema projection booth before the first show | late-afternoon sun through one window, warm shade, a pendant lamp; amber, green-grey steel; shadows, light bloom | 1300svh | 7 |
| 8 | Voice to Blog ("The Tracking Station") | a radio tracking station in the desert at dusk | a painted dusk sky going from sunset to first stars with the scroll, low orange sun, the hut lit from inside; signal amber, scope green; shadows, bloom | 1300svh | 7 |

"Next automation" links: The Press → SEO Pre-Live Checks (**wired**). All others are still `#`: Reddit → Competitive Intel System, SEO → Auto Internal Linking, Linking → AI Blog Drafts, Drafts → Webinar to Webflow, Webinar → Video to Blog, Video to Blog → Voice to Blog, Voice to Blog → Podcast to CMO Brief. (Five of these targets exist now and could be wired; ask first.)

---

## 5. Page 1: Reddit Keyword Alerts (`automations/reddit-keyword-alerts.html`)

### 5.1 Concept
The automation is shown as a **machine in a night landscape**: a fixed three.js stage over still black water. Scrolling moves the camera from station to station while the machine keeps running in real time.

### 5.2 The stations
| # | Caption | What you see | What it means |
|---|---------|--------------|---------------|
| 0 | Hero | The whole machine over dark water, with a stream of Reddit-style cards entering from the left | Overview |
| 1 | 01 · Poll — "Every few minutes, n8n sweeps Reddit." | A brass clock with a glowing hand; every 4 s it fires a radar sweep across the water and a beam into the stream | The n8n schedule trigger; "Most runs find nothing, and that is the point." |
| 2 | 02 · Match — "A watchlist of keywords and competitor names." | A large glass disc with the watchlist terms orbiting it; matched cards flash, spark and lift onto the glowing alert line, and the rest sink and fade | Keyword and competitor matching, exact phrases |
| 3 | 03 · Filter — "Only fresh threads. Never the same one twice." | Amber dashed ring: stale cards tumble off ("too old"). Pink dashed ring: repeats drop down a chute into a glass memory box that ripples and fills ("already seen") | Freshness window and de-duplication |
| 4 | 04 · Alert — "A formatted message lands in Slack." | A Slack-style window on a monitor: the `# alerts` channel with sidebar and composer. A single courier card leaves the gates every 3 s, rides the line and enters the monitor; a new alert message slides in with a ping ring and a frame glow. Five different alerts loop. | The formatted alert: linked title, subreddit, author, upvotes, comments, matched keyword, excerpt |
| 5 | End | Pull-back shot: "Threads reach the team within minutes of posting, not days later." | — |

Every label is plain text in 3D with no boxes: "schedule trigger", "watchlist · exact phrases", "freshness window", "de-dupe · seen before?", "seen-post memory", "slack · alerts channel".

### 5.3 Environment
- **Water:** a still black lake (three.js `Reflector`) reflecting every station, the stream, the ridge and the sky, with slow ripple distortion and faint glints.
- **Mist:** four thin drifting noise sheets just above the surface.
- **Atmosphere:** two layers of low mountain silhouettes, a soft haze band behind them, exponential fog.
- **Sky:** a faint twinkling starfield; a shooting star crosses behind the mountains every few seconds.
- **Rendering:** physically based materials, environment reflections, bloom (only emissive parts glow) and ACES tone mapping.

### 5.4 Let's talk
A glass **"new thread" card** lights up beside the alert line, just past the seen gate. It isn't there while you scroll; Let's talk brings it in and flies the camera to it. The form is on the card (`tb-look-glass`). Sending drops a copy onto the line; it rides to the alert window and arrives as a new note **"from the portfolio · just now"**: a generic note, never what the visitor typed (nothing a visitor writes is ever shown on the site). Then the camera returns to the card.

### 5.5 The runbook
Facts: **Trigger** Schedule · **Cadence** Every few minutes · **Stack** n8n · Reddit · Slack · **Status** In production.
Sections: 01 Problem · 02 Flow (8 numbered steps with the n8n node type under each) · 03 Matching rules (exact phrases, whole words, case and spacing ignored, first match wins, an illustrative pseudo-code block) · 04 Guardrails (freshness window, de-duplication, bounded fetches, fail quiet not silent) · 05 The alert (a mock Slack message) · 06 Outcome · 07 Operating it (add a keyword or subreddit, change the cadence or window, reset the memory).
Stats: **Minutes** from a thread being posted to the team seeing it, instead of days · **0** duplicate alerts · **1 list** to edit for a new keyword or competitor.
Note: "Internal identifiers, credentials and channel names are left out on purpose."

### 5.6 Copy and safety
All five Slack alerts are invented threads, the author is `u/author`, competitors appear as `<competitor>`, and the watchlist terms are generic.

---

## 6. Page 2: Notion to Webflow Publisher, "The Press" (`automations/notion-to-webflow.html`)

### 6.1 Concept
A **press in a warm paper studio in daylight**: a cream paper sweep (like a photo studio), a long drafting table with a grid top, brass nosing and steel trestles, real cast shadows from a window light on the upper left. Brass and graphite machine parts, paper blocks with ink. Accents: Webflow blue and coral stamp ink. No bloom. Motion is **mechanical and rhythmic** (beats), not flowing.

The press is run by **Inky**, a small ink character (original, no trademark).

### 6.2 The intro (every visit)
The page opens on **only an ink bottle** on the table, with a "Click the ink bottle" button and "Skip intro". Clicking the bottle (or the button):
1. the bottle tips over and settles with a bounce; the cork pops, flies, and lands on Inky's head as a hat
2. the ink spreads, then gathers back up into Inky, who forms, waves ("Hi! I'm Inky." · "I'll run the press for you.") and does a little hop
3. an **ink wipe** covers the screen from Inky; the press appears behind it, and the wipe opens again around Inky at the lever

The intro keeps the page at the top (it ignores restored scroll positions). `?nointro` or `?snap` skips it; `?intro` forces it. If 3D isn't ready within 8 s, the intro is dropped.

### 6.3 The stations
| # | Caption | What you see |
|---|---|---|
| 0 | Hero | The Notion page as a standing stack of paper blocks on a plinth, with the Notion board behind it (writing → approved → pushed) |
| 1 | **01 · Approve** — "Two keys, one lever." The press only moves when the post is set to *Approved to upload* and has not been *drafted to Webflow* yet. "Both, or nothing happens." | Two key barrels with lamps and plates; Inky turns both keys and swings on the lever as you scroll; the lever comes down and the light runs down the line from the stack outward. A long, slow station, eased to the scroll. |
| 2 | **02 · Convert** — "Notion blocks in, clean HTML out." | An indexing belt carries one block per beat under a stamp head; the die plate shows the tag being pressed (`<h2>`, `<p>`, `<ul>`, `<blockquote>`, `<pre>`, `<img>`), the block's face turns from the Notion look to the HTML look, and coral ink droplets fly. A page is 8 blocks, then a 2-beat page change while the next page rises from the plinth. |
| 3 | **03 · Map** — "Author and category, matched to Webflow." A name with no match stops the run with a reason. | The reference rack: two ink tokens (author, category) lift off the title block and drop into the socket of their match on blue plates |
| 4 | **04 · Bind and file** — "Every block, gathered into one Webflow draft." | Blocks gather on a plate, straps tighten, the SEO plates (slug, meta title, meta description, thumbnail) drop on top, and the bound page slides into the Webflow-blue **CMS cabinet**; a **DRAFT** ribbon drops across its corner. Never published by the machine. |
| 5 | **05 · Write back** — "Notion is told, and a human reviews." | Two flaps report to Notion: status *pushed to webflow*, *Drafted to Webflow* = Yes, so the post can never run twice. A receipt prints for the reviewer (the Slack message). |
| 6 | End | "From the better part of an hour per post to a Webflow draft in minutes. Writers never need Webflow access. Reviewers only review." |

When the camera arrives faster than the machine runs, the press fast-forwards to the moment worth seeing.

### 6.4 Let's talk
A fresh sheet clipped to a small **drawing board** at the far left end of the table. It is folded away while you scroll; Let's talk stands it up (it leans back on a strut, brass clip at the top) and flies the camera to it. Inky hops over ("Write it here. I'll stamp it."). The form is a printed sheet: cream stock, black type, coral labels, ruled boxes (`tb-look-print`). Once sent, Inky picks up a rubber stamp and stamps the sheet **RECEIVED** at an angle ("Received!").

### 6.5 The runbook
Facts: **Trigger** Notion status change · **Runs** On event · **Stack** n8n · Notion · Webflow · Slack · **Webflow access** Reviewers only.
Sections: 01 Problem · 02 Flow · 03 Mapping (Notion block → HTML) · 04 Guardrails · 05 The result · 06 Outcome · 07 Operating it.
Stats: **Minutes** from approval to a complete Webflow draft, instead of the better part of an hour · **Once** each post is pushed, guaranteed by the two-flag trigger · **0** Webflow logins or CMS training needed by writers.
Note: "Database names, channel names, credentials and internal identifiers are left out on purpose."

### 6.6 Versions
press-v1 (paper studio, two-key lever, block stack, belt, stamp; runbook) → press-v2 (Notion board start, reference rack, bind and file into the CMS cabinet with DRAFT ribbon, write-back flaps, receipt, end blur; story copy) → press-v2.1 (end text clears the header) → press-v3 = v46 (Inky and the ink-bottle intro; linked from home) → press-v4 (intro shows only the bottle, then an ink wipe; slower lever; ink tokens and blue plates) → press-v4.1 (intro keeps the page at the top) → talk-press-v1 (drawing board Let's talk).

---

## 7. Page 3: SEO Pre-Live Checks, "Opening Night" (`automations/seo-pre-live-checks.html`)

### 7.1 Concept
A new page arrives at a **museum gallery on opening night** and is checked before it goes on view. Museum-green walls with wainscot and picture rail, an oak floor, a dark ceiling with lighting track. The room is dim; six zone spotlights come on as you arrive, and each item gets its own beam of light with dust drifting in it. Failed items get a swinging **red P0** or **amber P1** tag; passed items get a small enamel pin. The camera visits each item close up, then pulls back (v2).

### 7.2 The stations
| # | Caption | What you see |
|---|---|---|
| 1 | **01 · Arrive** — "Only new pages come in." Publishing to the Webflow **staging** domain starts a run; pages already live on production are walked past. | The main hall: pieces already on view behind a velvet rope ("already on view · skipped"), and a **crate from staging**. Its front panel falls open, the new page (a blog post laid out like a webpage, framed like a painting) slides out, lifts and glides to its wall. |
| 2 | **02 · The label** — "Title, description and poster, measured." Meta title 10–65 characters, description 50–160, an OG image. | The **wall label** with two brass rulers under it: a pointer slides and stops inside the allowed range. The **exhibition poster** on an easel (the share card) with its own light. |
| 3 | **03 · The paperwork** — canonical, JSON-LD, BreadcrumbList, Article for blogs. "P0 · fix before publishing" | The **certificate of provenance** (canonical: "Without it the page can't open"); the **catalogue**, an open book on a wooden book rest whose page turns (JSON-LD, plus the artist's signature and date in the corner for the blog-only Article check); the **floor map** on a stand, lighting up room by room (breadcrumbs). |
| 4 | **04 · Captions and the door** — alt text; robots. "P1 · fix before go-live" | Captions under the page's images; the **door sign**, blank until checked, spins round to show the rule: normal pages *index, follow*; through the door, an ad page behind a velvet rope under **PRIVATE VIEWING** (*noindex, nofollow* is right for ads). |
| 5 | **05 · The checklist** — "What blocks launch, and what can wait." | Inside the back room, the curator's **lectern**: the checklist fills line by line, then gets stamped; every failure ranked P0 or P1 and posted to the SEO channel with its reason, the passed checks and any manual steps. |
| 6 | End | "Every new page is checked before it goes live, without anyone remembering to. P0 blocks launch. P1 waits for go-live. Ad pages can't slip through indexed." |

### 7.3 Let's talk
A **commission painting** on the far end wall, which the walk never faces. Let's talk glides the camera over to it (out of the side room through the doorway if needed); the scroll stays where it was. The form is painted on the canvas: a dark green ground in broad strokes on a canvas weave, cream and ochre lettering with a little relief, fields as darker brushed panels outlined in ochre (`tb-look-paint`). The painting has its own light. Beside it, a museum label in Elms Sans: "Let's talk / Vasant Suraj / Commission enquiry / OPEN FOR NEW WORK". Once sent, a **red dot** (sold) appears on the label. If the painting can't be made, the plain form opens.

### 7.4 The runbook
Facts: **Trigger** Webflow publish to staging · **Runs** On event · **Stack** n8n · Webflow · Slack · **Skips** Pages already live.
Sections: 01 Problem · 02 Flow · 03 The eight checks · 04 Priorities · 05 The report · 06 Guardrails · 07 Outcome · 08 Operating it.
Stats: **8** checks on every new page before production · **0** people who have to remember to run them · **2** opposite indexing rules applied automatically.
Note: "Domains, channel names and people's names are left out on purpose." One typeface (Elms Sans) for the page and the runbook since v2.

### 7.5 Versions
seo-v1 = v49 (the gallery; home card and Press next link wired) → seo-v2 (close-ups then pull-back; poster light; lectern in the back room; one typeface) → seo-v2.1 (catalogue on a book rest) → talk-seo-v1 / v1.1 (the commission painting).

---

## 8. Page 4: Auto Internal Linking (`automations/auto-internal-linking.html`)

### 8.1 Concept
**Every blog post is a station in a transit city at night, just after rain.** A new post opens like a new station, and the two linking engines lay lines to it across the city.
- Wet asphalt roads with puddle reflections, worn road markings, zebra crossings, paved sidewalks with granite kerbs.
- Brick and glass buildings whose windows are decided in a shader (lit or dark, warm or cool, blinds, shops at street level); low cloud lit orange from below; a faint moon.
- Sodium street lamps with pools of light, moving headlights and tail-lights on every road, aviation lights.
- About 70 stations: junction totems with a link-glyph sign; the top-100 posts are **interchanges**.
- **Line colours:** inbound **orange**, outbound **blue**, "Also read" a **dotted pale orange**. Floating tags show the phrase each link was made on (constant size on screen, never hidden by buildings).
- Real Poly Haven models: wall lanterns, street seating, a fire escape.

### 8.2 The plaza (the new station)
A paved square with a stair entrance, railings, benches and wall lanterns. A **totem** reads "New post" with two signal lamps, **OUT** and **IN**, which start red ("not linked yet") and turn green. A split-flap **departure board** shows the register with three tabs (all rows illustrative):
- **KEYWORD REGISTER**: slug · keywords · tag (`gsc` / `ai`)
- **TOP 100 BY CLICKS**: # · slug · clicks · category
- **LINK LOG**: time · source · keyword linked · target · direction

### 8.3 The stations
| # | Caption | What you see |
|---|---|---|
| 1 | **01 · Opening** — "A new post opens like a new station." Publishing a blog post in Webflow starts both engines; the post must be live, not a draft. | The plaza; OUT and IN lamps red |
| 2 | **02 · The register** — one row per post: its slug and a few short phrases; `gsc` for Search Console queries, `ai` for phrases Claude wrote | The board on the KEYWORD REGISTER tab |
| 3 | **03 · The top 100** — "The busiest posts are the interchanges." Only these can link back to a new one. | The board on TOP 100 BY CLICKS; the interchanges light up across the city |
| 4 | **04 · Inbound** — "The busiest posts link in." One link back per match on the matching phrase; same-category posts with no match get an Also read line (at most five, never the same post twice) | **Orange** lines grow from interchanges to the new station, with phrase tags; dotted Also read lines; the IN lamp turns; a message **"Inbound linking done"** comes in and leaves as you scroll on |
| 5 | **05 · Outbound** — "The new post links out." Links only in paragraph text, never headings, tables, code or captions | **Blue** lines grow out to older posts; the OUT lamp turns; **"Outbound linking done"** |
| 6 | **06 · The log** — every link appended: when, the post it sits in, the phrase, where it points, inbound or outbound | The board on LINK LOG |
| 7 | **07 · Refreshes** — "Edits to older posts are left alone." Both switches are already on, so nothing gets relinked | An older post's totem by the fire-escape building shows **EDITED**, then **EDIT SKIPPED** ("both switches on") |
| 8 | End | "Every new post is linked both ways within minutes of publishing. No editor involved. Refreshes never set it off. Every link is on record." |

### 8.4 Let's talk
A **ticket machine** on the plaza, behind every camera of the walk. Let's talk glides the camera to it (the scroll stays where it was). The form is on its screen (`tb-look-kiosk`). Sending prints a ticket: **"Ticket printed"** / MESSAGE SENT.

### 8.5 The runbook
Facts: **Trigger** Webflow publish of a new blog post · **Runs** On event, both engines · **Stack** n8n · Webflow CMS · Google Sheets · Search Console · Claude · **Skips** Refreshes of existing posts.
Sections: 01 Problem · 02 Flow · 03 The keyword register · 04 The two engines · 05 Guardrails · 06 Outcome · 07 Operating it.
Stats: **2** directions linked for every new post · **0** editors involved at publish time · **5** Also read lines at most per post, never repeated. (No invented metric was added.)
Note: "Post titles, sheet names and people's names are left out on purpose. Keywords and titles in the scene are illustrative."

### 8.6 Versions
Look test of the night city (6376ce8) → inbound/outbound with done messages, the board's three tabs, phrase tags, ticket-machine Let's talk (1ddee82) → home card wired (d157f6f, tag **v52-linking**).

---

## 9. Page 5: AI Blog Drafts (`automations/ai-blog-drafts.html`)

### 9.1 Concept
**A greenhouse at first light**: a low sun behind the glass, mist on the river, everything lit by the real dawn sky (Poly Haven HDRI "Spruit Dawn", ground-projected so the greenhouse stands in the field). Timber dwarf wall, painted steel frame, **misted glass** (clearer near the top, with runs where drops have slid down), long low shadows, dust in the sunlight. **Each blog draft is a plant grown from a brief.**

The writers are generic on purpose: the page says it can write in **anyone's voice who has a style file**. No writer is named.

### 9.2 What is on the bench
- **The ledger**: the Google Sheet as an open book at the end of the bench, columns *Title · Primary · Secondary · Brief · Run Action · Blog Article Link*. Shots of the ledger look straight down so it can be read.
- **Five pots**, one per row, read left to right, each with a seed packet and its brief tied on (row 5's tag sealed in red); **plant markers** that all flip to **YES** at once.
- **Voice tins** on the shelf against the glass: Voice A, Voice B, Voice C, and "Any writer · + ADD A STYLE FILE".
- A **grow lamp** on a rail that moves pot to pot.
- The **plants**, grown by the shader and instanced leaves: outline (the stem) → sections (branches) → paragraphs (leaves), with a brass **word counter**.
- A **crate stamped GOOGLE DOCS** by the door (where finished drafts go) and a **bell** over the door (Slack).
- The **failed pot**, with a "Brief not shared" tag and a clipboard run log: ✕ Read brief · 403.
- Real Poly Haven models: a potted plant, a wooden picnic table (the bench), a metal watering can.

### 9.3 The stations
| # | Caption | What you see |
|---|---|---|
| 1 | **01 · The sheet** — "Every blog starts as a row." Title, primary keyword, secondary keywords, a link to the SEO brief; the article link stays empty | The ledger from above |
| 2 | **02 · Flag the batch** — Run Action YES starts a blog. "Type the YESes in a spare column, then paste them in together. Typed one by one, they start some drafts before the other rows are ready." | The YES markers flip together |
| 3 | **03 · The voice** — "It writes in the writer's own voice." Claude reads the style file alongside the brief | The voice tins |
| 4 | **04 · One at a time** — flagged rows in turn; outline from the brief, each section, filled to 3,000–4,000 words. "Leave queued rows alone until it finishes." | The grow lamp moves pot to pot; plants grow; the word counter climbs |
| 5 | **05 · Delivered** — saved as a Google Doc, the row's article link fills itself in, a message lands in the team's Slack channel | The draft goes into the GOOGLE DOCS crate; the bell rings; the ledger link fills |
| 6 | **06 · When one fails** — "A failed run says where." Usually a brief that hasn't been shared; the n8n run log shows which step stopped and why | The failed pot and its run log ("brief not shared") |
| 7 | End | "A full draft in the writer's own voice, minutes after the row is flagged. Any writer with a style file. Every draft linked back in the sheet." |

### 9.4 Let's talk
An **order pad** hanging on the far (east) gable post, which no shot of the walk faces. Let's talk glides the camera down the greenhouse to it. The form is written on the pad's top sheet (`tb-look-order`) in dark ink (made darker in 2a0af76, when the sheet had rendered white-on-white). Sending stamps it **RECEIVED**: "Order received".

### 9.5 The runbook
Facts: **Trigger** Run Action set to YES in the sheet · **Runs** One row at a time, in order · **Stack** n8n · Claude · Google Sheets · Google Docs · Slack · **Output** A 3,000 to 4,000-word Google Doc per row.
Sections: 01 Problem · 02 The sheet · 03 Flow · 04 Writers' voices · 05 Guardrails · 06 Outcome · 07 Operating it.
Stats: **1** Google Doc per flagged row, linked back in the sheet · **3–4k** words per draft, in the writer's voice · **6** columns in the sheet, and the workflow fills the last one.
Note: "Writers' names, sheet names and channel names are left out on purpose. Titles and keywords in the scene are illustrative."

### 9.6 Versions
Look test (196ccd3) → ledger from straight above, order-pad sheet restored with darker ink (2a0af76) → home card wired, tag reads Claude (0d7821f, tag **v53-drafts**).

---

## 10. Page 6: Webinar to Webflow (`automations/webinar-to-webflow.html`)

### 10.1 Concept
**A recording studio at night.** A control room with plaster walls, fabric panels, a slatted diffuser over the booth window and a marble-chequer floor under a rug; through the glass, the **vocal booth** with fabric walls, a warm lamp, a mic and a music stand. Light comes from dim ceiling spots, the screens and a warm practical lamp by the tape machine, with the studio HDRI (Poly Haven "Ferndale Studio 05", warmed and desaturated so it has no purple cast) for reflections.

The webinar travels a **journey** that the page shows on a strip in the app and as a lit sign on the wall:
**YouTube video → Captions → Transcript → Google Doc → Conversation → Webflow CMS**

### 10.2 What is in the room
- The **mixing console**: a sloped desk with 12 channel strips, a scribble strip (HOST / GUEST) and a meter bridge with two VU meters, **KEPT %** and **MATCH** (the cleanup guard).
- The **request panel**: the three calls from the internal app, **TRANSCRIPT · RECAP · PUBLISH**, each lit when a person sends it (approve LEDs).
- The **big screen**: the internal app, redrawn for each step (link with the raw captions, blocks, speakers, clean, the Google Doc being written, the recap, publish), with the journey strip on top.
- The **TV** on the left, playing the webinar.
- A **cassette tape machine** with the webinar's title; its reels turn while the captions are fetched, and a WAIT lamp blinks every 8 s.
- The **printer**: the cue sheet (the transcript) comes out; seen from above so it can be read.
- The recap as a **record**: the sleeve rises out of a slot in the side cabinet, with a liner card "CONVERSATION · Recap page" and a warning sticky note; the **record shelf** labelled CONVERSATIONS on the right wall (the recap collection).
- The **journey sign** on the right wall above the shelf, **ON AIR** over the booth window, the **boombox** on the record shelf, monitor speakers toed in at the chair.
- Real Poly Haven models: the metal office desk, the modern armchair, the television, the boombox. The mic and the tape machine are built in code (no models were supplied).

### 10.3 The stations
| # | Caption | What you see |
|---|---|---|
| 1 | **01 · The link** — from an internal web app, a YouTube link goes to the transcript webhook; Supadata fetches the title and timestamped captions, checking every 8 seconds | TRANSCRIPT lit; the screen shows the link and the raw captions; the tape turns, WAIT blinks |
| 2 | **02 · Blocks** — caption cues merged into blocks of up to 18 seconds, split wherever the captions mark a new speaker with `>>` | Blocks on the screen |
| 3 | **03 · Speakers** — "The model names the speakers, never the words." Gemini returns only where the speaker changes and who; code applies the labels | HOST / GUEST on the scribble strip and the screen |
| 4 | **04 · Cleanup** — "Cleaned, but never shortened." Flash Lite strips fillers, typos and false starts in 16k-character batches; a batch that shrinks below 55 % or stops matching is thrown out and the original kept | The KEPT % and MATCH meters; "batch kept" / "reverted to the original" |
| 5 | **05 · Transcript** — timestamps, speaker names and a confidence header, saved as a Google Doc with SRT and JSON copies; the link comes back 2–4 minutes after the YouTube link went in | The Doc being written on screen; the printed transcript from above |
| 6 | **06 · Conversation** — Gemini writes the recap page as HTML (intro, guest bio, 6–10 themed sections, conclusion); code cleans it, rescues output cut off at the token limit, flags what the reviewer should check | RECAP lit; the record sleeve rises out of the cabinet slot and stands on its easel, with its liner card and sticky note |
| 7 | **07 · Webflow CMS** — once a person approves, mapped onto the Conversations collection's fields (slug, read time, guest, video link, thumbnail) and created as a CMS item; if the high-res thumbnail is rejected, the standard one goes in | PUBLISH lit; the CMS screen; the sleeve's thumbnail is swapped, then the record is filed on the CONVERSATIONS shelf |
| 8 | End | "A one-hour webinar becomes a named transcript and a draft recap page within minutes. A person approves every step. The words are never rewritten." |

### 10.4 Let's talk
In the **vocal booth**, behind the glass. Let's talk takes the camera through the window to the music stand, where the form is the **lyric sheet** (`tb-look-lyric`). Sending puts the **ON AIR** light on: "You're on air".

### 10.5 The runbook
Facts: **Trigger** Three webhooks from an internal web app: transcript, recap, publish · **Runs** On demand, with a person approving each step · **Stack** n8n · Gemini (3.5 Flash, 3.5 Flash Lite) · Supadata · Google Docs · Webflow CMS · **Output** A Google Doc transcript and a Webflow CMS recap item.
Sections: 01 Problem · 02 Flow · 03 Keeping the words · 04 Error handling · 05 Outcome.
Stats: **2–4 min** for a named, cleaned transcript (longer past an hour) · **55%** the shrink floor · **3** requests from the app, each approved by a person.
Note: "Names, keys, site and collection IDs and credential names are left out on purpose. The webinar, speakers and recap in the scene are illustrative." The host's name is removed. The Conversations collection name is shown (Vasant used it himself).

### 10.6 Versions
Look test of the studio (6e0a548) → journey strip and wall sign, transcript written into the Doc on screen, readable printed transcript from above, Conversation and CMS screens, record rises out of the cabinet (1572bce) → home card wired (61f1173, tag **v54-webinar**).

---

## 11. Page 7: Video to Blog, "The Projection Booth" (`automations/video-to-blog.html`)

### 11.1 Concept
**An old cinema projection booth before the first show.** A long, narrow booth with plaster walls, a painted dado and a worn plank floor. Late-afternoon sun comes in through one high window and lands on the floor between the desk and the projector; the rest is warm shade under a pendant lamp. Two ports in the front wall look down into the dark auditorium and its screen.

The workflow is the booth's work: the YouTube link comes in through the booking hatch as a slip, the soundtrack is read off the reel, the fillers are cut at the splicing bench, the draft is typed in the house voice and canned as reels for Notion, and the intercom tells the lobby it's ready.

The page covers the **video → blog** half of the workflow only (the same n8n workflow also has a blog → video branch, which isn't shown).

### 11.2 What is in the booth
- **The projector** on its pedestal: the lamphouse with glowing vents and a chimney to the roof, the mechanism head, the lens at the port, a reel above and one below with film ribbons between them, the sound head with its exciter lamp, and the reader the transcript spools out of. A **transcript tape** runs from the reader into a bin.
- **The splicing bench** (Poly Haven wooden table): rewinds, the splicer, a trim bin with paragraph-length strips.
- **The typewriter** on the desk (Poly Haven painted wooden table): the typed page is readable, a stack of finished pages beside it, and a word counter at 7,420 (illustrative).
- **The vault**: steel shelves of film cans; three new cans marked **DRAFT**, labelled **REEL 1/3, 2/3, 3/3**, the batches the post goes into Notion in.
- **The left wall**: the door with a PROJECTION ROOM sign; the **booking hatch** with its ledge and a spike of booking slips (the request); the **intercom** to the lobby, with a printed slip "NEW BLOG DRAFT / READY FOR REVIEW" (the Slack summary).
- **The right wall**: the **running order** chart (one reel at a time), and a "silent print" can on the tool chest: no captions, nothing to read.
- Poly Haven assets: **Vestibule** (HDRI, for reflections), wood_floor_worn, plastered_wall, damaged_plaster, rusty_metal_03 (repainted green-grey), wood_cabinet_worn_long, WoodenTable_03, painted_wooden_table, folding_wooden_stool, metal_tool_chest. The solitude_interior HDRI was sent but isn't used. The projector, reels, typewriter, intercom, cans and the auditorium are built in code.

### 11.3 The stations
| # | Caption | What you see |
|---|---|---|
| 1 | **01 · The request** — "One command, one link." `/video-to-blog` and a YouTube link in the team's Slack channel; the workflow answers straight away | Looking **down** onto the hatch ledge: the slip on the spike and the one that has just come through, stamped GOT IT · ON IT. (Vasant: the sideways view was hard to read, so it's filmed from above.) |
| 2 | **02 · The soundtrack** — "The video's words, read off the reel." Supadata fetches the transcript; the workflow waits thirty seconds, then reads it | The lamp strikes, the reels turn, the sound head and the transcript tape |
| 3 | **03 · The cut** — "Fillers out, paragraphs in." Ums, uhs and you-knows removed; paragraphs every five sentences | The splicing bench and the trim bin |
| 4 | **04 · The draft** — "A full article, in the house voice." SEO details, TL;DR, hook, sections, "In a nutshell", FAQs; 6,500 to 8,500 words | The typewriter, the typed page and the counter |
| 5 | **05 · Into Notion** — "Filed as a draft, never published." Slug, meta description, primary keyword, status draft; up to three batches of a hundred blocks | The three DRAFT cans on the vault shelf |
| 6 | **06 · The ping** — "The channel hears it's ready." Title, slug, keyword, word count, FAQ count and the Notion link | The intercom, its lamp blinking, and its printed slip |
| 7 | **07 · One reel at a time** — "Wait for the link before the next one." One conversion at a time; a video needs captions | The running order and the silent print on the chest |
| 8 | End | "A YouTube link in. A full blog draft in Notion." · "One command, one reel at a time. Every draft waits for a person to review it." |

### 11.4 Let's talk
**The feature presentation.** The camera goes out through the viewing port and down the auditorium to the screen: an Academy-ratio (1.37 : 1) screen in a proscenium, velvet curtains drawn back, a valance, footlights along the stage lip and raked rows of seats. The form is projected as a **silent-film title card** (`tb-look-reel`): the headline in Limelight, the rest in Elms Sans, cream on black inside a deco border, with film grain. Sending splices in the next card: a flash, two cue marks, then **"Message received"**. Escape or ✕ pulls the camera back out through the port to where the scroll left it.

### 11.5 The runbook
Facts: **Trigger** A Slack slash command with a YouTube link · **Runs** One video at a time · **Stack** n8n · Slack · Supadata · Claude · Notion · **Output** A Notion draft, 6,500 to 8,500 words.
Sections: 01 Problem · 02 Running it (the command, an illustrative Slack summary) · 03 Flow (8 steps with node types) · 04 The draft (its six parts) · 05 Guardrails · 06 Outcome · 07 Operating it.
Stats: **1** Slack command per video · **6.5–8.5k** words the draft is written to · **100** blocks per batch into Notion.
Note: "Channel names, database names, the writer's name and credentials are left out on purpose. The video, title and keywords in the scene are illustrative."

### 11.6 Versions
Look test of the booth (5653a1f, `video-look`) → the request filmed from above and the Let's talk title card (9e8f563, `video-talk-v1`) → home card wired (6648167, `video-handover` = **`v56-video-to-blog`**). The per-station story animations (the slip dropping through the hatch, the tape running, pages typing out, cans being shelved) are not built yet: the reels, lamp, screen and intercom lamp run.

---

## 12. Page 8: Voice to Blog, "The Tracking Station" (`automations/voice-to-blog.html`)

### 12.1 Concept
**A radio tracking station in the desert at dusk.** A 12 m dish stands on a concrete pad; beside it, a corrugated tin hut with a round roof, timber end walls and a lit window, whose far end looks out at the dish. Sand and gravel run out to low ridges; boulders, scrub and quiver trees come from Poly Haven's Namaqualand scans. It is the site's first open-sky world. The light follows the scroll: the sun is on the horizon at the top of the page and the first stars are out at the end.

The story: the dish locks on to a spoken brief; inside the hut the voice becomes words (the scope, the drum recorder, the transcript tape), the words are rewritten on the teleprinter, the draft is filed in the binder, and one message lamp lights for the direct message.

The tool is for anyone: **no "founder" anywhere** (Vasant: "dont mention founder anywhere its a tool any one can use"). The voice is "the house voice". The recorder isn't named on the page; its name (Voxlog) goes on only if Vasant says so.

### 12.2 What is at the station
**Outside:**
- **The dish**: a concrete pad and cable-pit lid, a tapered pedestal with a door and a ladder, the turntable, the alidade with two cheek plates carrying the elevation axle, a counterweight, the reflector (a paraboloid with 24 panel sectors and three seam rings), its back truss, a quadripod holding the feed at the focus, and a red warning light.
- **The hut**: galvanised tin with rust running down from the laps (made from rust_coarse_01), plank end walls, a concrete plinth and step, the door standing open, glowing windows.
- A mast with an amber **beacon** and a whip aerial, guy wires, blue fuel drums, a generator housing, the cable lying on the sand from the hut to the dish, and the worn gravel path between them.

**Inside the hut** (two pendant bulbs):
- **Three racks**: RECORDER (the drum turning under its pen, and the slot the transcript tape runs out of), SCOPE (the voice as a green trace), RECEIVER (the SIGNAL meter, the RECEIVING lamp, a row of level lamps).
- **The console shelf** with the **transmission slip**: "RECORDING 3:42 · PLAYED BACK", the title hint pencilled in, the two keyword boxes stamped **AUTO**.
- **The desk** (Poly Haven wooden_table_02) with the **teleprinter**: its paper rises from the platen and curls over the back (readable from the chair); the finished **printout** laid flat with its header block (title, keywords, word count, meta) and the start of the post; a desk lamp; the **MESSAGE** lamp. The chair is Poly Haven painted_wooden_chair_01.
- **The far wall**: the **STATION TIME** clock (its sweep hand stands still until Send and runs about 90 seconds by the ping), the time clock with a punched card, and the **binder rack**, the newest binder lying on top with an index card listing the seven Notion properties.

All titles and numbers in the scene are illustrative: "What a good weekly pipeline review looks like", pipeline review / sales forecasting, 6,140 words, recorded 17:42.

Poly Haven assets: **Rogland Sunset** (HDRI, for the light; the visible sky is painted to match its sun), gravelly_sand, sandy_gravel_02, rust_coarse_01 (turned into the hut's tin), concrete_floor_03, raw_plank_wall, namaqualand_boulder_02 and _04, namaqualand_rocks_01, quiver_tree_02, wild_rooibos_bush, wooden_table_02, painted_wooden_chair_01, barrel_03. Goegap Road and Quarry 02 were sent but aren't used. The dish, racks, teleprinter, clocks, binders, beacon and cables are built in code.

### 12.3 The stations
| # | Caption | What you see |
|---|---|---|
| 1 | **01 · The brief** — "Just talk." Open the recorder in its own browser tab, tap the mic, talk for two to five minutes; messy is fine | The dish swings off its park position and locks on, seen from in front of the bowl with the sunset behind the camera |
| 2 | **02 · The hints** — "Three boxes, all optional." The recording plays back; title hint and two keywords; anything blank is worked out | Inside, from above: the transmission slip, the title pencilled in, two AUTO stamps |
| 3 | **03 · Send** — "One button sends it all." The audio, the hints and the time it was recorded | The racks: the RECEIVING lamp, the level lamps, the drum turning; the clock starts |
| 4 | **04 · The words** — "Voice to text in seconds." Groq transcribes the whole recording | The scope trace and the transcript tape |
| 5 | **05 · The voice** — "Rewritten in the house voice." A full post of 5,000 to 7,000 words: direct, data-led, written like an operator; blank hints filled | The teleprinter and the printout on the desk |
| 6 | **06 · Into Notion** — "Filed as a draft." Title, primary and secondary keyword, 160-character meta description, word count, the time recorded, status Draft | The binder and its index card, the time clock |
| 7 | **07 · The ping** — "A direct message with the link." 60 to 90 seconds after Send: a Slack DM with the title, keyword, word count and link; Draft → Review by hand | Outside at the door: the hut against the afterglow, the window lit, the beacon flashing, the first stars |
| 8 | End | "Talk it through. Get a draft in Notion." · "A few minutes of talking becomes a full post in the house voice, about 90 seconds after Send. A person always reviews it." A high pull-back over the station |

The camera walks into the hut through the open door (01 → 02) and back out the same way (06 → 07); it never passes through a wall.

### 12.4 Let's talk
**The teleprinter.** "Let's talk" takes the camera into the hut (in by the door when it starts outside, round the mast side when it starts behind the hut) to the desk. A fresh sheet feeds up out of the teleprinter with the form typed on it, line by line, the paper rising as each line is typed: the header line ("INCOMING · date · time"), "LET'S TALK" struck twice, the intro, the labels in small capitals, ruled boxes with corner ticks and a dotted line to type on. Errors are typed in red. The live fields appear once the sheet is typed; what the visitor types shows in blue-black typewriter type.

**Send.** The visitor's words stay typed on the paper as the camera steps out of the door and up beside the hut; the dish tilts up and transmits (rings of light leave the feed, the feed glows, the red warning light and the beacon flash). The camera comes back in to a fresh sheet: the teleprinter types **MESSAGE RECEIVED** and the reply line under a red rubber stamp, RECEIVED and the visitor's own time, and the MESSAGE lamp on the desk lights. The whole trip takes about 7 seconds. ✕ or Escape at any moment goes back to wherever the scroll left the camera, out by the door if it has to.

**Reduced motion:** no trip; the sheet is typed at once and the reply replaces it in place. **Fallback:** if the scene can't be built, the plain card opens.

### 12.5 The runbook
Facts: **Trigger** A webhook from a browser recorder · **Runs** On demand, 60 to 90 seconds · **Stack** n8n · Groq · Claude · Notion · Slack · **Output** A Notion draft, 5,000 to 7,000 words.
Sections: 01 Problem · 02 Running it (seven steps and an illustrative "before Send" card) · 03 Flow (seven steps: Webhook · HTTP Request to Groq, Whisper large-v3 Turbo · Set · Claude · Code × 2 · If and HTTP Request × 2 · Merge and Slack) · 04 The draft (its fixed order and the seven Notion properties) · 05 If something fails (Executions tab, the mic blocked inside a Notion embed, Groq 401, Notion 401) · 06 Outcome · 07 Operating it.
Stats: **2–5 min** of talking · **5–7k** words the draft is written to · **60–90 s** from Send to the link.
Note: "Names, the database, the recorder's address and credentials are left out on purpose. The recording, title and keywords in the scene are illustrative." The writing prompt in the workflow names a person and a company: neither appears on the page.

### 12.6 Versions
Look test of the station (9c48f06, 47d7d46, `voice-look`) → the black half of the sky on Mac GPUs fixed, runbook and captions matched to the workflow JSON (acfb13a, `voice-look-2`) → home card wired (538eb0d, `v57-voice-to-blog`) → the teleprinter Let's talk (**`v59-voice-talk`**, current; on GitHub through pull request #2). Next: the story animations (the slip arriving, the tape and the teleprinter printing, the card being punched).

---

## 13. Pending items
- **Real testimonials** to replace the six samples (`sample: false`).
- **Thumbnails** for the 5 Factors.ai pages and 3 personal projects: `thumbs/benchmarks.jpg, campaign-offer.jpg, microsoft.jpg, prove-roi.jpg, routines.jpg, nike.jpg, ilish.jpg, leaderboard.jpg`. A missing file falls back to the card's tint. There is no `thumbs/` folder in the live repo yet.
- **Eleven automation pages** still to build, each with its own world: Podcast to CMO Brief, Cluster to Pillar Post, Blog Refresh Engine, Blog to Social and Ads, Organic Social Engine, Slack to Post Idea, LinkedIn ICP Leaderboard, Competitive Intel System, Marketing Ticket Desk, Dev Tasks from Slack, Docs to Notion Sync. Set each entry's `url`.
- **Voice to Blog:** the story animations; whether the recorder's name (Voxlog) may appear on the page.
- **Video to Blog:** the per-station story animations (§11.6).
- **"Next automation" links** still `#` on seven pages (§4); five could be wired now.
- Issues found in the two workflow JSON files were reported to Vasant in chat; they are workflow fixes, not site work.
- **Mic and cassette models** were never supplied; the studio uses procedural ones.
- Replace the slide-in panel once every automation has a page.
- Optional: Pangram Sans Rounded, if the font files are supplied (Elms Sans is the current UI face).

## 14. Decisions log (what was tried and dropped)

**Hero:**
- Rejected name reveals: falling letters, an outline name with hover fill, particles morphing into the name, letter-by-letter over a long scroll, a bubble font, a glass "Projects" title, a liquid "pour" into the name. The name moved to the footer, and the hero stays portrait → dissolve → rain.

**Projects section:**
- **Thread and decks:** the pink tube ("the thread") and the three shuffling decks were **removed** (20 Oct) when the projects became the 3D forest walk.
- **Forest look:** early evening (6–7 pm), warm but not sunny; not green-heavy; realistic generated trees; only 5–10 lights (fireflies), at night only; falling leaves in the evening; less fog; far trees that don't look like an x-ray; softer sun inside the forest, full strength at the cliff.
- **Lighting:** "brighter" versions were rejected twice (shadows visibly shifted, night too white). Change lighting only in small steps, on request.
- **Performance:** locking the resolution (v37.2) and cutting leaf cards for 60 fps (v38) were both rejected. v37.4 became the approved forest. Smooth camera travel matters more than a slightly higher frame rate.

**Beach and testimonials:**
- Lanterns chosen over hot-air balloons; they move with scroll only.
- Removed: fire/flame streaks and the **public feedback form** ("what if someone random adds a wrong message").
- Banners: satin cloth that unrolls in the wind. v41 camera back and gathering; v42 one lantern per card, cards stay open; v43 card lanterns vanish, plain lanterns past the footer name; v44 bold quote marks and dark text.

**Automation pages:**
- Reddit page: v1–v2 flat primitives; v3 real materials, bloom, the card atlas, sparks; water and mist replaced the grid floor (v5) after the sky (v4); the Slack card became a window with looping alerts (v6), then the courier (v7).
- A Reddit-logo particle header was declined (trademark).
- **Every page gets its own world, realistic like the forest, not cartoonish.** The Press is the one deliberately playful page (Inky); the city, greenhouse and studio were asked to be realistic and use Poly Haven assets Vasant supplies.
- Press: the intro shows only the ink bottle (v4), not the whole press; the lever was slowed down.
- SEO: v1 wide shots → v2 close-up visits; one typeface; catalogue lifted onto a book rest.
- City: the first look had over-bright windows and bloom (toned down); linking needed explaining visually (orange inbound, blue outbound, done messages, the sheet's three tabs on a board); the Let's talk had to belong to the world (ticket machine).
- Greenhouse: pots were mirrored to read left to right; the ledger is filmed from straight above; the order-pad text was invisible (white on white) and got dark ink; writers' names removed; Claude, not Gemini.
- Studio: the camera used to move off the screen before its content appeared; the transcript generation needed more detail; the record must come out of the cabinet, not from outside it; the YouTube → transcript → Doc → Conversation → Webflow CMS journey needed to be explicit.
- Video to Blog: three concepts were offered and Vasant said "go with your pick" (the booth). Only the video → blog half of the workflow is shown. The request shot first looked at the hatch from the side: "camera angle this showing sideways is not understandable so show this scene from top angle", so it now looks down. A black rectangle in early renders was a NaN pixel smeared by the bloom (fixed with a guard). The Let's talk had to belong to the booth: the form is projected on the auditorium screen as a title card. The first auditorium (wide screen, flat curtains, box seats) read as a dark modal and was rebuilt as a 1930s picture house.
- Voice to Blog: three concepts (a tracking station in the desert, a ship's wireless room, a monastery scriptorium); the station was picked because nothing else on the site is outdoors with open sky. "Founder" was taken off the home card and kept off the page: the tool is for anyone. The 1K HDRI is used for light only; the dusk sky is painted. On Vasant's Mac half the sky rendered black (a NaN from `pow()`), fixed on 3 Nov.

**Let's talk:**
- v50 started with one shared dialog on every page; talk-* made each world its own form; the forest got the hanging board, the hero the particles, the beach the bottle. "Lets talk is not related to the world" is a rejection reason: each new page needs a form that belongs to it and only appears on click.
- **The WhatsApp number must never be in the site**: "i dont wanna share my wp contact with anyone". It lives only in Vercel env vars.

## 15. Versioning
Every approved state is a git tag in the working repo, usually with copies in `backups/`.

**Home page:**
- `v4-outline-name` … `v18-content`, `v31-thread-exit`: old home with thread and decks
- `v32-forest-wip` … `v37.4`: the forest
- `v39-beach`, `v40-beach-real` (= `main-version-v40`, the beach as first locked)
- `v41-lantern-flight`, `v42-one-lantern`, `v43-lanterns-away`, `v44-card-text`, `v45-reddit-link` (= **`main-version`** since 22 Oct)
- `v47-back-to-card`, `v48-no-loader-back`, `v50-contact-form`, `v50.1-talk-label`, `v51-lets-talk`, `v51.1-hood-form`

**Automation pages:**
- Reddit: `auto-reddit-v1` … `v7.1`, v45 fixes, v47 back to card, `talk-reddit-v1`
- The Press: `press-v1` … `press-v4.1`, `v46-press-link`, `talk-press-v1`
- SEO: `seo-v1` / `v49-seo-link`, `seo-v2`, `seo-v2.1`, `talk-seo-v1`, `talk-seo-v1.1`
- Let's talk worlds: `talk-hero-v1`, `talk-beach-v1`, `talk-all-v1`
- Auto Internal Linking: `pre-linking`, `pre-linking-home`, **`v52-linking`**
- AI Blog Drafts: `pre-drafts`, `pre-drafts-fix1`, `pre-drafts-home`, **`v53-drafts`**
- Webinar to Webflow: `pre-webinar`, `pre-webinar-fix1`, `pre-webinar-home`, **`v54-webinar`**
- Docs: `pre-docs`, `v55-docs`; `v58-docs` (these)
- Video to Blog: `pre-video`, `video-look`, `pre-video-talk`, `video-talk-v1`, `pre-video-handover`, `video-handover` = **`v56-video-to-blog`**
- Voice to Blog: `pre-voice-card`, `pre-voice`, `voice-look`, `voice-look-2`, `pre-voice-home`, `v57-voice-to-blog`, `pre-voice-talk`, **`v59-voice-talk` (current)**

BUILD.md §16 and PORTFOLIO-HANDOFF.md have the full table. The repo with all tags lives in the AI workspace and is handed over as a history zip when asked.

## 16. Running locally
```
npx serve .          # or: python3 -m http.server 8765
```
Open the printed address (e.g. `http://localhost:3000`). Pages must be served over http, not opened as `file://`. The contact form can't send locally (no `/api/contact`); test it on Vercel.