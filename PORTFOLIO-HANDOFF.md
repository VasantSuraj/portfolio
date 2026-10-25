# Vasant Suraj Portfolio — Complete Handoff

_Last updated: 25 Oct 2026. Current version: **v54-webinar** (`61f1173`); docs **v55-docs**. This single document contains everything in HANDOFF.md, DOCS.md, BUILD.md and CONTACT-SETUP.md, plus the deploy checklist and the full timeline of Vasant's requests. Read all of it before you change anything. The code is the source of truth; this document explains the code, the history and how Vasant likes to work._

Contents:
- Part 0. Read this first
- Part A. Handoff (who, rules, decisions, where things are, next up, open items)
- Part B. What the site is (DOCS)
- Part C. How it is built (BUILD)
- Part D. Let's talk → WhatsApp setup (CONTACT-SETUP)
- Part E. Deploy checklist
- Part F. Timeline of Vasant's requests
- Part G. Suggested first message for a new chat

Cross-references such as "BUILD.md §9" or "DOCS.md §4" point to the same section numbers in Part C (BUILD) and Part B (DOCS) of this file.

---

# Part 0. Read this first (for a new AI session)

1. **What you need from Vasant to continue.** Ask him to attach these, or to connect the GitHub repo `VasantSuraj/portfolio`:
   - `index.html`, `site.js`, `vercel.json`, `api/contact.js`
   - the `talk/` folder
   - the `automations/` folder (six pages, plus `city/`, `greenhouse/`, `studio/`)
   - the `forest/` (26 textures) and `portrait/` (3 files) folders
   - the history zip with the git tags and `backups/`, if he has one, so "revert to …" requests work. Without it you only have the current files (GitHub's own history still has every push).
2. **Do not build anything until he says so.** When he asks for ideas, give 2–3 options with a recommendation and wait. He says "go", picks a number, or says "build". If he says "go with your pick", explain the scene first and build after he approves.
3. **Back up before every change.** Tag `pre-<name>` before, tag the approved state after. He expects an instant revert.
4. **Smoothness beats everything.** In his words: "smoothernesss is more important".
5. **"Revert to main version" means the git tag `main-version`, now v45** (`f329252`). The first main is `main-version-v40`. Everything since v45 was approved too: **confirm whether he means v45 or the current state.**
6. **Only the requested change.** Change nothing else; mention other issues instead of fixing them.
7. **Each automation page gets its own realistic world and its own Let's talk**, built from Poly Haven assets he supplies.
8. **Never put his WhatsApp number in the site or docs**, and never include internal identifiers, names or channel names (Part A §2 rules 12–15).
9. Show results as screenshots (desktop 1440×900 and phone 390×844), publish the preview artifact after each change, and hand over files with where they go.

---

# Part A. Handoff

Read in this order:
1. `HANDOFF.md` (this file)
2. `DOCS.md`: what the site is, page by page
3. `BUILD.md`: how it is built
4. `CONTACT-SETUP.md`: the Let's talk form and WhatsApp
5. the code itself: `index.html`, `site.js`, `talk/surface.js`, the page you are working on in `automations/`

`PORTFOLIO-HANDOFF.md` has all of it in one file, plus the full request timeline. The code is the source of truth; the docs explain it.

---

## 1. Who and what

- **Owner:** Vasant Suraj, Senior Webflow Lead Developer at Factors.ai, who also builds n8n automations. The site is his personal portfolio. Contact on the site: vasantsuraj02@gmail.com · Bangalore. (His WhatsApp number is private: see §2, rule 14.)
- **Goal:** an award-level portfolio (Lusion / Igloo / Bruno Simon tier). Scroll-driven, highly interactive and 3D, built only with free tools, with very little text ("the design should speak").
- **Repo:** `github.com/VasantSuraj/portfolio`, branch `main`, deployed on **Vercel** (`cleanUrls`). Vasant pushes files himself through GitHub's "Add files via upload", so every hand-over is a set of files (and zips for asset folders) with the exact folder each goes in. The repo also shows GitHub Pages deployments; Vercel is the one that runs the contact function.
- **Live now:**
  - the **home page**: particle portrait → rain → 3D projects forest → cliff and fall → beach with testimonial lanterns → footer under the stars
  - **six automation pages**: Reddit Keyword Alerts, Notion to Webflow ("The Press"), SEO Pre-Live Checks ("Opening Night"), Auto Internal Linking (night city), AI Blog Drafts (greenhouse at dawn), Webinar to Webflow (recording studio)
  - **Let's talk** on every page, in each world's own form, sending to WhatsApp through `api/contact.js`
- **Development** happens in Claude sessions with artifacts as previews; the repo files are the deliverable. The working git repo with every tag lives in the AI workspace (`/home/claude/history/portfolio`, branch `master`); the live repo matched it in code at `61f1173`.

## 2. How Vasant works (follow these)

1. **Concepts before code.** For anything new, give 2–3 distinct concepts with a recommendation and wait for his pick. He will say "go", choose a number, or say to build. When he says **"go with your pick"**, explain the chosen scene first and **build only after he approves it**.
2. **"Don't build until I say."** When he asks for ideas or says "only start on my command", only propose. Respect this strictly.
3. **Show early.** Build the first part (a look test), show renders (desktop 1440×900 and phone 390×844), then continue. He reviews from screenshots, often his own with the cursor or circles on the problem ("ss1", "ss2"), and gives short, specific notes.
4. **Back up before every change.**
   - Tag before (`pre-<name>`) and after each approved state (`vNN-name` / `<page>-vN`), with copies in `backups/` where useful.
   - He expects an instant revert ("revert to this point", "revert only that").
   - **"Revert to main version" = the git tag `main-version`, which now points to v45** (`f329252`, moved on 22 Oct). The first locked main (v40) is `main-version-v40`. Everything after v45 (The Press, SEO, Let's talk, the city, greenhouse and studio) was approved too, so **ask whether he means v45 or the current state** before acting.
5. **Only the requested change.** "Only these changes", "fix those alone": touch nothing else. Mention other issues instead of fixing them.
6. **Smoothness is non-negotiable.** "smoothernesss is more important". Smooth camera travel beats a higher frame rate, and a small flicker is more tolerable than heavier scrolling. He wants 60 fps throughout (hero 60; forest about 30–45). Reduce cost before adding anything.
7. **Lighting:** "brighter" changes were rejected twice (shadows shifted, night too white). Change lighting only on request, in small steps.
8. **No repeats across pages.** Each automation page has its own world, palette, props and motion language. Type and UI chrome (Elms Sans, pills, captions, runbook layout, butterfly) stay the same so it reads as one portfolio. Worlds used so far: night machine over water · paper studio in daylight · museum gallery · night transit city · dawn greenhouse · night recording studio.
9. **Realistic worlds, like the forest**, not cartoonish like the Press. For each new page, ask him for Poly Haven assets (he downloads them and attaches the zips/EXRs); say exactly which you'd like, and offer a pick when he asks "which one to pick".
10. **Every page's Let's talk must belong to its world** and appear only when clicked. "lets talk is not related to the world fix it" was a rejection.
11. **Explain it visually.** He wants the automation's logic readable from the scene (e.g. the city: orange inbound and blue outbound lines, "Inbound linking done" / "Outbound linking done" messages, the sheet's three tabs on a board; the studio: the full YouTube → captions → transcript → Google Doc → Conversation → Webflow CMS journey). Text in the scene must be readable on screen (he asked for the greenhouse ledger to be filmed from straight above, and for darker ink when a sheet was white on white).
12. **Security of content.**
    - Automation docs are internal company material: only cleared summaries.
    - Never include API keys, webhook URLs, credential names, internal IDs, channel names (e.g. a Slack notifications channel), sheet names, workflow names, colleague names, writers' names ("dont mention name <writer names> and all be generic"), real post titles, domains, or the internal Notion link.
    - Competitors are `<competitor>`, authors are `u/author`. The Webflow "Conversations" collection name is fine (he used it himself).
    - No invented metrics: if a number isn't in his doc, leave it out.
13. **No trademarked characters or logos as artwork.** A particle Reddit logo was requested and declined; use original props (Inky is original).
14. **No public input on the site.** He removed the feedback form ("what if someone random adds a wrong msging"). He curates the testimonials himself. Let's talk is fine because it goes only to him.
15. **His WhatsApp number never goes in the site or the docs:** "i dont wanna share my wp contact with anyone". It lives only in Vercel env vars (`CALLMEBOT_PHONE`, `CALLMEBOT_APIKEY`, or the `WA_*` set).
16. **Hand-over format:** when he says "give files" / "give me the html file", send the changed files only, plus a zip of any new asset folder, and say where each goes ("push the city folder into `automations/`"; "`index.html` at the root"). He asks "should I push X into Y?" — answer plainly.
17. **Keep it simple when in doubt.** He prefers one clear mechanism done smoothly over several clever ones.
18. He writes quickly and informally, so read for intent:
    - "latern" = lantern; "the cards on the lanterns" = the satin testimonial banners
    - "fliccker" = flicker
    - "main version" = the `main-version` tag
    - "the tube" = the old pink thread (removed)
    - "monitor" = the Slack panel on the Reddit page
    - "the 03 card" = personal projects
    - "kind words" = the testimonials chapter
    - "wp" = WhatsApp
    - "ss1, ss2…" = his screenshots, in order
    - "the box" (studio) = the side cabinet the record comes out of
    - "webflow conversation" = the Conversations CMS collection / recap page

## 3. Decisions already made (do not reopen)

**Hero:**
- Particle portrait → dissolve from the bottom up → rain. **No name in the hero**; the name is in the footer, revealed like stars.
- The hoodie colour wheel recolours the hoodie only: drawstrings stay white, no colour on skin. It also colours the hero Let's talk form.

**Projects forest:**
- 3D forest walk; cards alternate left and right, the camera turns to face each; the facing card is clickable (Open/Details); counter bottom-left; three chapter titles: 01 Webflow work (5), 02 Automations (19), 03 Personal projects (3).
- Early evening (6–7 pm), realistic EZ-Tree trees, not green-heavy, light fog; falling leaves in the evening; 10 fireflies and a moon at night; day/night toggle remembered per visitor.
- **The approved forest base is v37.4.** Resolution locking and cutting leaf cards for 60 fps were rejected.

**Cliff, beach and testimonials:**
- The forest ends at a waterfall cliff; the camera falls to a beach; the headland carries the forest on. Real Poly Haven sand, rock and satin.
- **Testimonials = paper sky lanterns**, scroll-driven only, no flames: one lantern per note on a V-bridle; it arrives from the right low over the water, its banner opens about 16 m out just above the horizon and never closes; it lifts away; all the notes gather high over the sea and vanish; only plain lanterns go to the sky.
- **Footer:** "VASANT SURAJ" letter by letter like stars; email; Bangalore; 3 plain lanterns rise close past the name.

**Navigation:**
- Automations get **separate pages**, opened in the same tab. The panel stays only until each page exists.
- **Back arrow** on every automation page returns to the forest **at that page's card**, with **no loader**; it's a real browser back when the visitor came from home.

**Let's talk:**
- One sending path (`site.js` → `api/contact.js` → WhatsApp). Each world draws its own form: hero particles (in the hoodie colour), forest hanging board (weathered grey-brown wood), beach bottle and letter, Reddit glass card, Press drawing board with Inky's RECEIVED stamp, SEO commission painting with a red dot, city ticket machine, greenhouse order pad, studio lyric sheet with ON AIR.

**The automation pages** (details in DOCS.md):
- Reddit: machine + runbook; courier, five looping alerts, plain labels, water and mist, ridges, shooting stars.
- The Press: paper studio in daylight with Inky; the intro shows only the ink bottle, then an ink wipe; the lever is slow and eased to the scroll; two keys = *Approved to upload* + not yet *drafted to Webflow*.
- SEO: gallery on opening night; close-up visits then pull-back; one typeface; catalogue on a book rest; P0/P1 tags.
- City: inbound orange, outbound blue, Also read dotted; done messages; the board with the sheet's three tabs (all rows illustrative); refreshes left alone.
- Greenhouse: generic writers ("any writer with a style file"); Claude (not Gemini); ledger filmed from above; pots read left to right; failed run = brief not shared.
- Studio: the full journey on a strip and a wall sign; transcript written into the Doc on screen; readable printed transcript; the record comes **out of** the cabinet; host's name removed.

**Fonts:** Elms Sans (UI) with an Archivo fallback. Pangram Sans Rounded was wanted but is unavailable unless he supplies the files.

## 4. Where things are

| Thing | Location |
|---|---|
| Home page | `index.html` (one file: CSS, classic script, three.js module) |
| Automation pages | `automations/*.html` (six) |
| Their assets | `automations/city/`, `automations/greenhouse/`, `automations/studio/` (Reddit, Press and SEO are all code) |
| Let's talk | `site.js` (settings at the top), `talk/surface.js`, `talk/board.js` (+ `css3d.js`, `room.js`, wood/brass textures, `chain.json`), `api/contact.js` |
| Portrait textures | `portrait/` (colour, depth, 3-channel hood mask) |
| Forest and beach textures | `forest/` (26 files) |
| Card data | `WORK`, `AUTOMATIONS`, `PERSONAL` arrays near the top of the first script in `index.html` |
| Automation copy (19 entries) | `AUTOMATIONS`: `name, cat, line, tags, one, trigger, outcome`, plus `url` when a page exists (six so far) |
| Testimonials | `TESTIMONIALS` (6 **samples**, `sample: true`) |
| Let's talk router (home) | `window.__talkScene` in the classic script; beach bottle `window.__beachTalk` in the module |
| Card thumbnails | `thumbs/` (names in README; none in the live repo yet) |
| Versions | git tags + `backups/` in the working repo (AI workspace) |
| Build sources of the newest pages | `/home/claude/assets/{city,green,studio}/` in the AI workspace (`part1.html`, `shared.css`, `part2.js` or `head/body/tail.js`, `build.py`, `conv_*.py`) |
| QA harness | Playwright scripts in the AI workspace scratchpad `qa/` (BUILD.md §12) |
| Portrait tooling | `tools/portrait.py` in the old working repo; u2net_human_seg and Depth Anything V2 small (ONNX) |
| Hand-over folders | `/home/claude/out/{linking,drafts,webinar}/` (page, asset zip, `index.html`) |

The content source for each automation is a runbook Vasant pastes (or his Google Doc of all automations: problem, trigger, steps, nodes, outcome). Ask for it when building a new page; strip everything in §2 rule 12.

## 5. Next up

The remaining **13 automations** need pages, each with its own world (concepts first, then his Poly Haven assets):
Video to Blog · Voice to Blog · Podcast to CMO Brief · Cluster to Pillar Post · Blog Refresh Engine · Blog to Social and Ads · Organic Social Engine · Slack to Post Idea · LinkedIn ICP Leaderboard · Competitive Intel System · Marketing Ticket Desk · Dev Tasks from Slack · Docs to Notion Sync.

The natural next one is **Video to Blog** (the Webinar page's "Next automation" points to it) or **Competitive Intel System** (Reddit's points to it). Worlds already used are listed in §2 rule 8. Process: BUILD.md §15.

## 6. Open items, in order

1. **"Next automation" links still `#`** on five pages: Reddit → Competitive Intel System, SEO → Auto Internal Linking, Linking → AI Blog Drafts, Drafts → Webinar to Webflow, Webinar → Video to Blog. The middle three targets exist now; offer to wire them (don't do it unasked). The Press → SEO is wired.
2. **Real testimonials:** Vasant will send them. Replace the 6 samples and set `sample: false`.
3. **Thumbnails** for the 5 Factors.ai pages and the 3 personal projects (`thumbs/`); none in the live repo.
4. **Mic and cassette models** were never sent; the studio uses procedural ones. Offer to swap if he sends Poly Haven models.
5. **Contact setup:** confirm the Vercel env vars are set and a live test message arrived (CONTACT-SETUP.md). Previews can't send.
6. **Ideas raised earlier, not built** (suggest only): a stronger particle-portrait → forest hand-over; more forest → footer connection (the beach and sky largely cover this now).
7. **Small known issue** (offered, not requested): while reading a later testimonial, earlier gathered cards can peek briefly at the top edge.
8. **Replace the slide-in panel** entirely once every automation has a page.
9. **Tidy-ups only if asked:** stale CSS from the deck era (`.band`, `.card`, `.frame`) and the outdated top CSS comment; unused particle uniforms from the thread; the asset conversion scripts could be added to the repo under `tools/` so they don't depend on the AI workspace.

## 7. Known constraints of the sandbox used so far

- **Network:** the AI workspace can't reach jsDelivr, Google Fonts, factors.ai or most websites from the shell. Tests use local copies of three.js (0.158 and 0.169) and Lenis and fallback fonts, so **screenshots don't show Elms Sans**. Poly Haven files come from Vasant as attachments. The browser-side CDN loads work fine on the live site.
- **Rendering:** the sandbox renders on the CPU (SwiftShader), so it can't measure real fps; ask Vasant to open the page with `?fps`. Captions can lag a frame in screenshots.
- **The local server** (`python3 -m http.server 8765`) dies when background commands time out; restart it.
- **Blender:** `bpy` must be run with `python3 -I`.
- **Artifacts** block outside requests (`connect-src 'self'`) and have no `/api/contact`, so preview copies use `simulate: true`.
- **The git repo with tags lives only in the AI workspace,** which is temporary. If a new session needs "revert to …", ask Vasant for the history zip, or rebuild tags from his GitHub history.

## 8. Artifact links (Claude, private previews)

- Webinar to Webflow: `claude.ai/artifact/HG9oAuutrDeNuMnJfKzZsp`
- AI Blog Drafts: `claude.ai/artifact/GJVspZR6XrdBRRXKzVrfxW`
- Auto Internal Linking: `claude.ai/artifact/M2JRL5Yem1Jstm1e7n9kv3`
- Full site with the Let's talk worlds (23 Oct): `claude.ai/artifact/1FhbVuL6rbFqpKCKYsd6H2`
- Talk Board: `claude.ai/artifact/LiSmo123P7r6Nw3zSj1XbT` · Opening Night: `claude.ai/artifact/Y1vrHMnTTGbbKhuaHVhpbq` · Let's Talk Form: `claude.ai/artifact/Rc6LR37mQcEf8FrVLKRoLE` · The Press: `claude.ai/artifact/BXLNrytTFRESRy94hZfsro`
- Home v45: `claude.ai/artifact/XY8JbBbjVtt12NQNARJT5Z`
- Older, out of date: home `7WNoJjkBGnWR66LqTveksU` · Reddit `NGZmASBaUwTbBicviNX19F`

These are previews; the repo is the deliverable.

---

# Part B. What the site is (DOCS)

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
- Google Fonts (Elms Sans + Archivo everywhere; Caveat on the greenhouse and studio pages; Fraunces on the SEO page and the board)
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
│   ├── city/                                45 files: textures + packed models (page 4)
│   ├── greenhouse/                          23 files: textures, packed models, dawn HDRI (page 5)
│   └── studio/                              34 files: textures, packed models, studio HDRI (page 6)
├── portrait/
│   ├── portrait-color.webp                  hero portrait, cut out, real photo colours
│   ├── portrait-depth.png                   depth map (bright = near) for the particles' 3D relief
│   └── portrait-hoodmask.png                R = hoodie, G = drawstrings, B = skin bounce-light; drives the colour wheel
├── forest/                                  26 textures: bark ×9, leaves ×4, forest floor ×3, dry sand ×3, wet sand ×1, rock ×3, satin ×3
├── thumbs/                                  project-card thumbnails (not in the live repo yet; names in §8)
├── README.md, HANDOFF.md, DOCS.md, BUILD.md, CONTACT-SETUP.md, PORTFOLIO-HANDOFF.md
└── backups/                                 (working repo only, not deployed) copies of every version
```

Relative paths matter. `index.html` loads `portrait/…`, `forest/…`, `thumbs/…`, `talk/…` and `site.js`; each automation page loads `../site.js`, `../talk/surface.js` and its own folder (`city/`, `greenhouse/`, `studio/`).

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

"Next automation" links: The Press → SEO Pre-Live Checks (**wired**). All others are still `#`: Reddit → Competitive Intel System, SEO → Auto Internal Linking, Linking → AI Blog Drafts, Drafts → Webinar to Webflow, Webinar → Video to Blog. (The first three of these targets exist now and could be wired; ask first.)

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

## 11. Pending items
- **Real testimonials** to replace the six samples (`sample: false`).
- **Thumbnails** for the 5 Factors.ai pages and 3 personal projects: `thumbs/benchmarks.jpg, campaign-offer.jpg, microsoft.jpg, prove-roi.jpg, routines.jpg, nike.jpg, ilish.jpg, leaderboard.jpg`. A missing file falls back to the card's tint. There is no `thumbs/` folder in the live repo yet.
- **Thirteen automation pages** still to build, each with its own world: Video to Blog, Voice to Blog, Podcast to CMO Brief, Cluster to Pillar Post, Blog Refresh Engine, Blog to Social and Ads, Organic Social Engine, Slack to Post Idea, LinkedIn ICP Leaderboard, Competitive Intel System, Marketing Ticket Desk, Dev Tasks from Slack, Docs to Notion Sync. Set each entry's `url`.
- **"Next automation" links** still `#` on five pages (§4); three could be wired now.
- **Mic and cassette models** were never supplied; the studio uses procedural ones.
- Replace the slide-in panel once every automation has a page.
- Optional: Pangram Sans Rounded, if the font files are supplied (Elms Sans is the current UI face).

## 12. Decisions log (what was tried and dropped)

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

**Let's talk:**
- v50 started with one shared dialog on every page; talk-* made each world its own form; the forest got the hanging board, the hero the particles, the beach the bottle. "Lets talk is not related to the world" is a rejection reason: each new page needs a form that belongs to it and only appears on click.
- **The WhatsApp number must never be in the site**: "i dont wanna share my wp contact with anyone". It lives only in Vercel env vars.

## 13. Versioning
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
- Webinar to Webflow: `pre-webinar`, `pre-webinar-fix1`, `pre-webinar-home`, **`v54-webinar` (current)**

BUILD.md §9 and PORTFOLIO-HANDOFF.md have the full table. The repo with all tags lives in the AI workspace and is handed over as a history zip when asked.

## 14. Running locally
```
npx serve .          # or: python3 -m http.server 8765
```
Open the printed address (e.g. `http://localhost:3000`). Pages must be served over http, not opened as `file://`. The contact form can't send locally (no `/api/contact`); test it on Vercel.

---

# Part C. How it is built (BUILD)

Contents:
0. Stack at a glance
1. Home page (`index.html`), including its three Let's talk forms and the return from automation pages
2. The automation-page template (what every page shares)
3. Reddit Keyword Alerts
4. Notion to Webflow ("The Press")
5. SEO Pre-Live Checks ("Opening Night")
6. Auto Internal Linking (the city)
7. AI Blog Drafts (the greenhouse)
8. Webinar to Webflow (the studio)
9. Let's talk: `site.js`, `talk/surface.js`, `talk/board.js`, `api/contact.js`
10. Asset pipeline (Poly Haven → web textures, packed models, HDRIs)
11. Shared conventions
12. QA harness
13. Claude artifact previews
14. Version history
15. Adding the next automation page

---

## 0. Stack at a glance

| Layer | Choice | Why |
|---|---|---|
| Pages | Plain HTML, one file per page, CSS and JS inline | No build step, nothing to install, trivially hostable, easy to hand over |
| Home hero | **Raw WebGL2** (no library), one custom shader program, `gl.POINTS` | About 120k particles with per-particle logic; a library would add weight without helping |
| Home projects / beach | **three.js 0.169** (ES modules via an importmap from jsDelivr) + `CSS3DRenderer`, `BufferGeometryUtils.mergeGeometries` | A real 3D forest, beach and lanterns; HTML cards placed in 3D stay crisp and clickable |
| Trees | **EZ-Tree** by Daniel Greenheck (MIT), vendored inline, geometry only | Procedural, realistic trees generated at load, with no model files to download |
| Smooth scroll | **Lenis 1.1.13** (jsDelivr) on one shared frame loop | Smoothed scroll value read by the camera in the same frame; native scroll if it fails |
| Automation pages | **three.js 0.158** + addons: `EffectComposer`, `RenderPass`, `UnrealBloomPass`, `OutputPass`, `RoomEnvironment`, `RoundedBoxGeometry`, `Reflector`, `CSS3DRenderer`, `BufferGeometryUtils.mergeGeometries` | Real materials, lighting, shadows, post-processing and reflections without writing a renderer |
| Let's talk | `site.js` (classic script, every page) + `talk/surface.js` (ES module, no three.js) + `talk/board.js` (three.js 0.169) | One sending path and one set of settings; every world paints its own form |
| Contact backend | **Vercel serverless function** `api/contact.js` (Node, CommonJS) → CallMeBot or the WhatsApp Cloud API | Free; secrets stay in Vercel env vars, never in the site |
| Motion | Hand-rolled scroll→value mapping, `requestAnimationFrame`, time-based easing (`1 − exp(−k·dt)`) | Full control over the scrub; feels the same at any frame rate |
| Type | Elms Sans (UI) with an Archivo fallback, from Google Fonts; Caveat for handwriting; Fraunces in places | The approved face, loaded once |
| Textures and models | **Poly Haven (CC0)** for everything realistic: forest floor, sand, rock, satin, wood, brass, city, greenhouse and studio sets, two HDRIs; the EZ-Tree texture set for bark and leaves | Free, realistic; downscaled to 512–2048 px; models packed into compact JSON |
| Asset prep | Python: `bpy` (Blender as a module, run with `python3 -I`), `numpy`, `cv2`, `Pillow`, `scipy`; `onnxruntime` with **u2net_human_seg** and **Depth Anything V2 small** for the portrait | Free and local; converts .blend/.exr to web files |
| QA | Playwright + headless Chromium (SwiftShader software GL) | Renders every state as an image to review before publishing |
| Versioning | git tags + `backups/` copies | One-command revert to any approved state |

All tools are free. No paid services or licensed assets are used.

---

## 1. Home page (`index.html`)

### 1.1 File anatomy
```
<!doctype html>, <meta>, font <link>, <title>Vasant Suraj</title>
<style>         all CSS: tokens, forest cards/titles/counter, testimonial fallback cards, no3d fallback, panel, footer, UI, palette,
                loader (+ html.returning), Let's talk on the beach (.bthint, .bttoast, the letter's live fields),
                Let's talk at the hero (.tpfx: words and fields that fade in over the particles; --tb-hood colours), breakpoints
<canvas #forestGL>  fixed, z 1 — three.js forest + beach (opacity follows the forest mix)
<div #forestFx>     fixed, z 1 — CSS grain (SVG turbulence) + vignette over the forest
<canvas #gl>        fixed, z 2 — the particle portrait / rain / the hero Let's talk form
<div #forestCss>    fixed, z 3 — CSS3DRenderer layer: project cards, chapter titles, beach title
<main> (z 3)        .hero#top (100svh), .gap (40svh), section.forest#work (the tall runway, holds .flist), footer.foot#contact
<aside #panel>      slide-in details for automations without their own page (z 20)
<div .ui> (z 4)     .mark, .actions (#mode day/night, #sound, Let's talk [data-contact]), .scroll hint, .fcount counter, .palette (hoodie wheel)
<div .loader> (z 6) 000→100 counter
<canvas #fly>       butterfly cursor (z 9)
<script src=lenis>  Lenis 1.1.13
<script>            classic IIFE (lines ≈299–965): RETURN_SLUG → Lenis + scroll state → footer star-name split → data (WORK, AUTOMATIONS,
                    PERSONAL, TESTIMONIALS) → panel → forest layout (runway keys, cards, titles, counter, keyboard) → day/night switch
                    → WebGL2 particles (with the Let's talk form targets) → hoodie wheel → hero Let's talk + the router
                    → butterfly → sound → loader + frame loop → boot
<script importmap>  three@0.169.0 + three/addons
<script module>     (≈967–3294) EZ-Tree (vendored) → renderer/moods/fog/sky → ground → trees + billboards + LOD → ferns, light, shafts,
                    fireflies, falling leaves → beach (sand, rock, waterfall, spray, sea) → lanterns + banners → CSS3D
                    → fit() (sizes + camera poses) → camera path → applyMood() → the beach bottle Let's talk → tick()
<script src="site.js" defer>   Let's talk on every page (§9)
```

**Layers:** forest 1 < particles 2 < cards and `main` 3 < UI 4 < loader 6 < butterfly 9 < panel 20 < fps readout 30. The hanging board and the plain card sit above everything (z 2147483000 / a modal `<dialog>`).

**Click routing (v45):** `html.forest3d main{pointer-events:none}` plus `main>*:not(.forest){pointer-events:auto}`. The tall transparent runway would otherwise sit above the CSS3D cards and swallow their clicks; before v45, no card link or Details button worked in 3D. A card accepts clicks only while it faces the camera (`.fcard.on{pointer-events:auto}`; everything else is `pointer-events:none`).

**Anchor clicks:** `a[href^="#"]` go through Lenis, **except** links with `data-contact` (the Let's talk pill has `href="#contact"` as a no-JS fallback; with JS it opens the form instead of scrolling).

### 1.2 Portrait asset pipeline (`tools/portrait.py`, in the old working repo)
Input: one photo. Output: three textures in `portrait/`.

1. **Segmentation:** `u2net_human_seg.onnx` at 320×320 gives a subject mask. It is run again on the crop at higher resolution, the two masks are merged, then Gaussian-blurred (1.2 px) for soft edges.
2. **Crop:** head and shoulders, from 4 % above the top of the subject down to 60 % of its height. Width is the full extent of the subject inside that band ×1.06 (so the arms are never clipped), with a minimum of 0.9× the crop height.
3. **Depth:** `depth_anything_v2_vits.onnx` on the crop (inputs resized to multiples of 14). Depth is re-normalised inside the subject only (2nd–98th percentile) so the face uses the full range.
4. **Pack:** everything is resized to 640 px wide and written as `portrait-color.webp` (RGBA cutout, q90) and `portrait-depth.png` (8-bit, bright = near).
5. **Hood mask** (`portrait-hoodmask.png`, built with a second script using scipy; loaded as `?v=4`). Three channels:
   - **R = hoodie:** colour-classified pixels (green/blue above red, light enough), flood-filled into connected regions, and extended per column down to the crop line so no band is left below the hoodie.
   - **G = drawstrings:** thin bright vertical components (height ≥ 20 % of the image, width ≤ 10 %, in the lower 40 %).
   - **B = cast:** skin pixels carrying the hoodie's bounce light (the mint/blue tint under the chin and neck), cleared wherever R is set so the two never overlap.

Why a mask and not per-pixel colour tests at runtime: the first version guessed hoodie pixels in the shader and produced strays (blue on the face, white shoulders, a mint neck). A flood-filled mask prepared offline is exact and costs nothing at runtime.

### 1.3 Particle construction (`build()`)
- The three images are drawn to offscreen canvases and read with `getImageData`.
- The image is sampled on a grid (`step` = 1.2 px on desktop, 2.0 on touch devices) with a random jitter inside each cell so the grid never shows. Pixels with alpha < 120 are skipped.
- Per particle, the attributes are packed into `Float32Array`s and uploaded once (`STATIC_DRAW`) into a VAO:
  - `aPos`: x and y in model space; z from depth, ×0.42 relief
  - `aCol`: photo colour, saturation ×1.25 and a gamma lift of 0.68
  - `aRand`: three random numbers for release timing, rain speed and the rain/dissolve split
  - `aHood`: hoodie, cast and string flags from the mask, plus a fallback that treats green-ish pixels in the bottom 10 % as hoodie
  - `aTarget`: a leftover from the removed thread, zero-filled
  - `aFormA`, `aFormB`: where the particle sits in the Let's talk form (§1.19)
- The result is roughly 100–130k points on desktop, drawn with a single `gl.drawArrays(gl.POINTS)`.

### 1.4 The particle shader (one program, `VS` + `FS`)
**Uniforms:**
- projection, view and model matrices
- `uTime`; `uIntro` (0→1 over 2.6 s on load); `uConverge` (scroll in screens)
- `uShift`: scroll in model units, held still while inside the forest runway
- `uHalfW`/`uHalfH`, `uBaseY`
- `uMouse`, `uMouseVel`, `uRadius`, `uStrength` (pointer field)
- `uHood`, `uHoodOn` (recolour)
- `uForest`: the forest mix, 0→1

`uLineA/B`, `uPath`, `uPathN` and `uFade` are leftovers from the thread era and stay unused.

**Vertex stage, in order:**
1. **Intro:** particles arrive from a scattered state to their target over `uIntro` (eased).
2. **Release:** each particle has a start threshold `start = 0.04 + h01·1.1 + rand·0.08`, where `h01` is its height in the figure (0 = bottom). Scroll minus `start` is the particle's `drop`. Because `start` grows with height, the figure lets go **from the bottom up**.
3. **Two fates:** `rainer = step(0.45, rand.z)`, so 55 % of particles rain and the rest dissolve near where they were. Rainers spread to the full screen width and fall; dissolvers fade over a short `drop`.
4. **Field:** `toField = smoothstep(0.6, 1.3, drop)·rainer`. Rainers settle into a wrapped screen-space field. In the forest era, `alpha *= 1 − uForest·rainer`, so the field disappears as the forest fades in.
5. **Pointer:** a radial falloff around `uMouse` pushes particles along `uMouseVel`. The butterfly's position is used as the pointer.
6. **Hoodie recolour:**
   - `shade = clamp(lum/0.72, 0.3, 1.18)`
   - `tinted = uHood·shade`
   - `col = mix(aCol, tinted, aHood.x·(1−aHood.z)·uHoodOn)`
   - then `col = mix(col, skin, aHood.y·(1−aHood.x)·uHoodOn)` neutralises the bounce light
   - drawstrings (`aHood.z`) are excluded, so they stay white for every colour
7. Point size scales with viewport height and DPR; alpha fades with `drop` and the dissolve.

**Fragment stage:** a soft disc times alpha, premultiplied output. Blending is `ONE, ONE_MINUS_SRC_ALPHA` over a transparent canvas.

**Forest hand-off:** the frame loop doesn't draw the particles at all once `forest.mix() > 0.999`, and clears the canvas once.

### 1.5 Loader
A counter from 000 to 100 keeps the viewer informed while the three textures decode and the buffers are built. The target climbs to 92 until the build is done, then to 100. An 8 s watchdog reveals the page even if an image fails, and every step is wrapped in try/catch. `reveal()` fades in the mark, actions and palette and starts the intro. Coming back from an automation page, `html.returning` hides the counter and the page reveals at once in the forest (§1.22).

### 1.6 Hoodie colour wheel (`.palette`)
A 220 px canvas draws a full HSL wheel (hue by angle, saturation by radius), with a lightness slider. The pointer position maps through an HSL helper to RGB, which goes to `uHood`. `uHoodOn` and the colour are eased per frame (`lerp 0.08`). The choice is stored in `localStorage('hoodie')`, wrapped in try/catch because it is only a convenience. "Original" resets it. The palette hides after half a screen of scroll. Since v51.1 it also writes `--tb-hood` / `--tb-hood-ink` for the hero Let's talk form (§1.19).

### 1.7 Lenis and the frame loop
- **Lenis:** `new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true, syncTouch: false })`, skipped for reduced motion or if the script failed. Exposed as `window.__lenis`.
- **One loop:** `requestAnimationFrame(frame)` runs `lenis.raf(now)`, then every `window.__ticks[i](now)` (the module's `tick`), then the loader, butterfly, pointer easing and particle draw. Scroll, camera and UI therefore update in the same frame, which is the main smoothness fix from v36.
- **Anchors:** `a[href^="#"]` clicks go through `lenis.scrollTo(…, { duration: 2.4 })`.
- **Reveals:** `IntersectionObserver` on `.reveal`. The footer has its own observer (threshold 0.35) that reveals everything inside it, because its last line sits too low for the generic trigger.
- **Star name:** `.starname` is split into per-letter spans with random 0.15–1.75 s delays, which fade in from blur with a glow.
- **`?fps`:** shows "N fps · ms js · dpr" bottom-right.

### 1.8 Butterfly cursor (`fly`)
- Its own 2D canvas (`#fly`, z 9, `pointer-events: none`), DPR-aware.
- Mounted only when `(hover: hover) and (pointer: fine)` matches and reduced motion is off. It listens to `pointermove` and unmounts if the media query changes.
- **Motion:** the target is the pointer plus a slow Lissajous wander. Position follows with a spring (`follow 0.07`), heading comes from velocity with damped turning, and bank angle from heading change. Flap frequency is 3 Hz, slowed and enlarged over links and buttons (`closest('a, button, input')`).
- **Drawing:** two Bézier wings with a pink→blue gradient and a thin highlight, a body ellipse, antennae, and a blurred soft shadow. The native cursor is kept.

### 1.9 Sound
A Web Audio drone: 4 oscillators (55, 110.6, 164.5 and 220.9 Hz) with slow LFO detune through a 420 Hz low-pass, plus band-passed noise. The button fades the gain to 0.35 over 1.2 s, and off over 0.6 s.

### 1.10 Data and the scroll runway (classic script, `forest` IIFE)
**Data:** `WORK` (5), `AUTOMATIONS` (19), `PERSONAL` (3) and `TESTIMONIALS` (6 samples). Automations get a tint and a `k/v` meta block generated from `tags`, `trigger` and `cat`.

**Chapters:** `CATS = [Webflow work (per 0.8), Automations (per 0.55), Personal projects (per 0.8)]`.

**World spacing:** `GAP = { title: 9, card: 9, cat: 15, cliff: 20 }` metres along −z. `cliffZ = lastCardZ − 20`.

**Keys** (scroll position `s` in screens; values at v45):
```
-0.70 start (far outside) · 0.00 forest edge
title 01 @1.00 → cards @1.75 2.55 3.35 4.15 4.95
title 02 @5.80 → 19 cards @6.55 … 16.45 (+0.55)
title 03 @17.30 → cards @18.05 18.85 19.65
edge @20.85, edge @21.20 (= fallS) · over @21.75 (ease in) · drop @22.65 (linear) · land @23.45 (ease out, = landS)
tm ×6 @24.40 25.15 25.90 26.65 27.40 28.15 · sky @29.95 (= skyS = totalS)
```

**Runway height:** `(totalS + 1) × Hs` px, set as the CSS variable `--runway` on `section.forest`. `Hs` is the viewport height, kept stable on phones when the URL bar hides. `sAt(y) = (y − top)/Hs`. `mix(s) = smooth(−0.65, 0, s)` is the forest fade-in.

**Cards:**
- An `<a class="fcard">` when the entry has a `url`: `http…` opens a new tab with `rel=noopener`, a relative URL opens in the same tab. Otherwise a `<button>` that calls `panel.open()`.
- Markup: `.fc-media` (thumbnail `img` with `onerror` removal, number, tag chips) and `.fc-body` (category, name, line, foot with the trigger and the Open/Details pill).
- The facing card tilts toward the cursor (±9°/±7°).
- Tabbing to a card jumps the camera there.

**Testimonials:** `.tslot > figure.tcard` is used only by the no-3D fallback and screen readers. In 3D, the testimonials are drawn on the satin banners.

**Counter:** `setActive(g, visible)` flips the number, category and total with a 140 ms fade.

**Keyboard:** Arrow keys and PageUp/PageDown move to the next or previous stop (titles, cards, landing, testimonials) with Lenis over 1.3 s.

**Fallback:** if `html.forest3d` isn't set within 12 s, `html.no3d` shows the grid.

**Exposed:** `window.__forest = { CATS, keys, cards, titles, totalS, fallS, landS, skyS, tms, beachTitle, cliffZ, lastZ, sAt, top, mix, Hs, setActive, mode }`.

**Day/night switch:** `#mode` toggles 0/1, dispatches the `forestmode` event and saves to `localStorage('forestMode')`.

### 1.11 Forest renderer, moods and fog (module)
- **Renderer:** `WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })`, ACES filmic, exposure 1.14 (moods change it), clear colour `#2a241f`.
- **DPR:** `min(dpr, 1.5)` on desktop and `1.25` on touch. **Adaptive:** after 90 frames, if `slow > 0.5` (a running share of frames over 24 ms), DPR drops by 0.15 (floor 0.8). The resize runs right before `render()` in the same frame, so there is no blank flash (fixed in v37.4).
- **Shadows** (desktop only):
  - `PCFSoftShadowMap`, 2048², orthographic box ±50, far 190, bias −0.0005, normalBias 0.04, `autoUpdate = false`
  - the shadow centre is snapped to whole-texel steps of about 4 m along the light's axes; the map is redrawn only when that snapped key changes
  - on those frames `updateLod(…, all = true)` draws every nearby tree so off-screen trees still cast
  - result: pixel-stable shadows and one shadow pass per ~4 m instead of per frame
- **Fog:** the `ShaderChunk.fog_*` chunks are replaced. Exponential² fog `1 − exp(−d²·density²)`, plus a thin ground mist (`lowMist` below y 1.2, beyond 10–40 m), and the fog colour darkens above y 4–24 (under the canopy). World position goes through `vFogW`.
- **Path:** `P(z) = 4.2·sin(0.034z) + 1.8·sin(0.077z + 1.3)`, `pathYaw(z) = atan(P′(z))`. The same curve is in GLSL as `pathX()` for fireflies and leaves.
- **Moods** (`MOOD.day` = early evening, `MOOD.night`), blended by `night` (eased about 1.2 s) in `applyMood()`:
  - fog colour and density (day `#57493d` 0.022; night `#0d1318` 0.029)
  - exposure (1.14 / 1.3)
  - hemisphere sky and ground colour and intensity
  - sun colour (`#ffc58a` / moon `#a9bcd6`); intensity blended by `cliff` (softer inside the forest 1.55, full 3.0 near the cliff; night 1.9 → 2.6)
  - direction `SUN_DIR` → `MOON_DIR`
  - sky high colour, glow and disc
  - shaft strength
  - billboard tint
  - fill light (night)
  - fireflies (night 1, day 0) and falling leaves (day 1, night 0)
  - card fog colour `--fogc`
  - `applyMood` runs only when a key built from (night, cliff, beach, dusk, sun01) changes, not every frame.
- **Sky:** a back-faced 220 m sphere shader:
  - fog → `uHigh` gradient by height
  - sun disc (`uDisc`) and glow (`uGlow`)
  - beach band `uLow → uMid → uHighB` mixed by `uBeach`, with a horizon glow around the sunset
  - procedural twinkling stars (`uStars`)
  - haze

### 1.12 Ground, trees and LOD
- **Ground:** a 200 m wide plane from z 70 to the cliff, displaced by `groundH(x,z)`: a valley around the path plus noise. Mud textures (`mud_*_1k`) tile every 3.4 m. A vertex colour makes the path slightly paler (trodden). The near edge is clipped to the broken cliff lip `edgeZ(x)`.
- **Headland ground:** a second plane to the left of the cove using `headTop(x,z)`: the forest floor continues, a stream bed is cut in, and it slopes into the sea.
- **Bark and leaf materials:**
  - bark `MeshStandardMaterial` with colour, normal and roughness maps (oak, pine, birch)
  - leaves `alphaTest 0.32` + `alphaToCoverage`, double-sided, tinted
  - wind sway in the vertex shader (`onBeforeCompile`)
  - leaf shadow depth via `MeshDepthMaterial` with the alpha map
- **Species** (generated once at load, normalised to unit height, then instanced at a random height):

  | Key | EZ-Tree preset | Height (m) | Bark / leaf | Tweaks |
  |---|---|---|---|---|
  | ash | Ash Large | 18–25 | oak / ash | `branch.start.1 0.5`, 9 leaves |
  | aspen | Aspen Large | 17–24 | pine / aspen | |
  | oak | Oak Medium | 14–19 | oak / oak | `branch.start.1 0.45` |
  | birch | Aspen Medium | 13–18 | birch / aspen | |
  | pineL | Pine Large | 16–24 | pine / pine | leaves.count 22, size 1.7 |
  | pineM | Pine Medium | 11–16 | pine / pine | leaves.count 20, size 1.75 |
  | bushA | Bush 2 | 0.9–1.7 | oak / ash | |
  | bushB | Bush 2 | 0.8–1.5 | oak / oak | |

  On touch devices the leaf count drops to 60 % (with bigger leaves) and branch sections to 70 %. Leaf normals point outward from the crown centre for soft, even crown lighting.
- **Billboards:** each species is rendered once into a 512×1024 render target (256×512 on touch) with an orthographic camera and its own lights, then shown as two crossed cards. They are re-baked when the LoadingManager reports all textures loaded, and then `warmUp()` runs.
- **Planting** (seeded RNG, relative to the path):
  - band 0 path side from 3.4 m (wider near cards and titles)
  - band 1 at 9–20 m
  - band 2 at 20–54 m, always billboards
  - band 3 bushes
  - a sparse approach before the forest edge
  - the headland: three depth bands thinning toward its tip, kept clear of the stream
  - about 1,056 trees on desktop
- **LOD** (`updateLod`, re-run when the camera moves 0.5 m or turns 0.06 rad):
  - full instanced meshes for band 0/1/3 within `NEAR = [64, 60, 0, 26]` m (touch `[34, 28, 0, 16]`); otherwise a billboard, up to `FAR = 115` m
  - full trees are therefore ready about 7 cards ahead (v37); `FULL = 999` means there is no half-leaf stage
  - **view culling:** a tree is skipped only if its whole crown is outside the horizontal view cone (`HALF_H + 0.4`), using `asin(r/dist)`. Trees closer than `max(r + 2, height)` are never skipped, which fixed blinking crowns overhead (v37.4).
  - instance buffers use `DynamicDrawUsage` with `addUpdateRange` for only the used count
- **Ground cover:** about 1,100 instanced fern/leaf clumps (three crossed planes with the ash leaf texture), swaying, kept clear of cards.
- **Light:**
  - `HemisphereLight` (sky `#9aa8b6`, ground `#3a2c20`, 1.35)
  - `DirectionalLight` sun (shadows)
  - a night fill `PointLight` following the camera
- **Sun shafts:** additive vertical planes leaning along the light. A strong shaft and a ground light-pool at each chapter title (k 0.22, pool 0.42), plus random thinner shafts every 9–18 m. They fade near the camera and far away, and are hidden on the beach (`× (1 − bk)`).
- **Fireflies:** 10 points that recycle around the camera along the path, blinking (night only).
- **Falling leaves:** an instanced quad shader, 26 on desktop and 14 on touch, using a canvas texture of 3 leaf shapes (amber, ochre, olive). They tumble on two axes, fall over 8 m, and are fogged (evening only).
- **Grain:** `#forestFx::before`, an SVG `feTurbulence` noise at 0.14 opacity with `mix-blend-mode: overlay`, animated in 6 steps over 1.6 s, plus a radial vignette. Still with reduced motion.

### 1.13 CSS3D cards and titles, and the forest camera
- `CSS3DRenderer` in `#forestCss`. Cards and titles are `CSS3DObject`s.
- **`fit()`** runs on resize:
  - FOV 48° (60° when aspect < 0.85)
  - card offset `CX` 2.1 m (1.3), stop distance `D` 4.6 m (5.0), title stop `TSTOP` 6.5 m (7.2), turn factor `TURN` 0.86 (1)
  - card world width `CW = clamp(viewW·0.36, 1.5, 2.7)` (portrait `viewW·0.76`); CSS width 270–560 px; scaled to world size
  - cards at y 1.55, rotated to face their camera stop; `c.yawOff` = how far the camera turns from the path to face it
  - titles at y 1.95, font `clamp(W·0.085, 44, 132)` px
- **Per frame:** card visibility (−0.5 to 50 m ahead), opacity (gated until the portrait has rained away, fading in at 0.6–2.4 m and out at 40–52 m), card fog `--fog` from the scene fog, `.on` when the nearest card is within 1.6 m and the camera yaw is within 0.18 rad, title opacity.
- **Camera along the path** (`camTarget`):
  - finds the key pair around `s`; card → `{ z: card.z + D, off: yawOff }`, title → `{ z: title.z + TSTOP, off: 0 }`, edge → `{ z + 2.2, off: 0.3 }`
  - z easing `u·0.3 + smoothstep(u)·0.7`; yaw easing smootherstep
  - pose: `x = P(z)`, `y = 1.6`, `yaw = pathYaw(z − 3) + off`, pitch −0.02
  - damping toward the target `kz = 1 − e^(−7.5·dt)` and `ko = 1 − e^(−4.5·dt)` (12/s with reduced motion); `?snap` jumps
  - pointer parallax: x ±0.12, y ∓0.05, yaw ∓0.03, pitch ∓0.02
- **Free poses** (cliff and beach): the key `off` names `over/drop/land/tm/sky` map to `BP` poses `{x, y, z, yaw, pitch}`, interpolated with the key's ease (`in` = u², `lin`, `out` = 1−(1−u)²). The hand-over between the path and free poses converts the yaw offset, so there is no jump.

### 1.14 Cliff and beach (module, `beach` group)
**Constants:**
- `B = cliffZ`, `BX = P(B)`
- sea level `SEA = −40`, about 40 m below the forest floor
- `HEADX = BX − 10` (headland face)
- `FALLZ = B − 15` (waterfall)
- `SHORE = B − 17.3`

The `beach` group is visible only for `s > lastCardS − 0.3`.

**Sand:**
- a 220×48 m plane (280×110 segments; 140×60 on touch) on `sandH(x,z)`: a slope from the cliff foot, the cove under the waterfall dropping into the sea, soft dunes, and small ripples on the dry sand
- per-vertex `aWet` (from height and noise) blends `sand_dry_*` into `sand_wet_diff` in an `onBeforeCompile` patch; wet sand is less rough (0.55)
- `customProgramCacheKey 'sand'`

**Rock:**
- `cliffFace(cols, rows, topAt, out, uvAlong)` builds a strip from the lip down to y −46, bulged outward by three noise octaves, with vertex-colour darkening near the sand; `rock_a_*` textures, double-sided
- two faces: the cliff under the broken forest edge (x from HEADX to +100) and the headland face along the cove
- 7 noise-deformed icosahedron boulders at the waterfall's foot

**Waterfall:**
- `fallMaterial()`: a shader with 4 noise octaves scrolling down (`sqrt(d)` acceleration), wobbling edges, density to white water, tinted by the sky's mid colour plus sun, fogged
- three layered sheets (5.4 / 4.2 / 2.8 m wide, offset outward, curving away from the rock as they fall)
- a stream plane across the headland to the lip
- two `spray()` point systems: drifting mist and churning white water at the foot

**Sea:**
- a 5000×3000 plane with a custom shader
- procedural height from 3 noise octaves gives the normal, with the amplitude reduced with distance
- reflected-sky gradient (low/mid/high from the beach mood) mixed by Fresnel
- sun glitter `pow(spec, 420)·7 + pow(spec, 60)·0.55`
- shore darkening, a moving foam line at the shore, foam around the waterfall landing, fog
- no lantern reflections

**Beach mood** (`BEACH.day` sunset, `BEACH.night` moonlit, `DUSK`):
- `bk = smooth(fallS − 1.3, fallS + 0.2, s)` blends fog toward the low sky colour, the beach fog density (0.0034 / 0.0045), exposure, hemisphere, sun colour and intensity, and glow and disc
- the visible sun sinks with `sun01 = smooth(landS, lastTmS, s)` (direction y 0.11 → −0.03); at night it lerps to `BEACH_MOON`
- `ek = smooth(lastTmS + 0.35, skyS, s)` blends to `DUSK`, dims hemi and sun, removes the glow, and sets exposure toward 1.15
- stars `uStars = max(night·bk, ek)`
- the water, waterfall, spray and lantern uniforms follow
- **beach materials use the beach density `BD`, not the forest `DENS`**, which fixed a flat brown sea at the cliff edge

**Beach title** "04 / Kind words / N notes · samples": a CSS3D object over the sea, `dR + 5` m out. Opacity `smooth(fallS + 0.9, landS − 0.1) × (1 − smooth(landS + 0.1, landS + 0.4))`.

**Camera poses** (set in `fit()`):
- `over {x: BX+0.3, y: 1.0, z: B−2.0, yaw: 0.22, pitch: −0.95}`
- `drop {x: cx+0.5, y: −24, z: cz+1, yaw: 0.3, pitch: −0.42}`
- `land {x: cx, y: cy, z: cz, yaw: 0.1, pitch: 0.08}`, with `cx = BX+3` (portrait +1.5), `cz = B−7` (portrait −9), `cy = sand+1.6`
- `tm[j]`: the same spot, yawing half-way toward each banner
- `sky`: pitch 0.55

### 1.15 Lanterns and satin banners
**Instanced lanterns** (`LM`, three `InstancedMesh`es sharing an instanced `aGlow` attribute; `NL = NAMB + NT + 3`):
- **Paper body:** a `LatheGeometry` (8 profile points, 22 segments) with `lanternMat` (`ShaderMaterial`):
  - flicker, 4 bamboo ribs (`cos(u·4π)`), two-octave crinkle
  - the glow `low = (1 − y)^1.3` is brightest low inside and `face = (N·V)²` brightest straight through the middle
  - hot colour from deep orange to warm cream; an unlit look when `aGlow` is 0
  - its own fog with the beach density
  - this lighting model was rewritten to fix a washed-out cream look
- **Wire frame:** `mergeGeometries([ring torus, 2 cross wires])`, dark.
- **Fuel cell:** a small cylinder, emissive flame colour times `aGlow`.
- `setLantern(i, x, y, z, scale, glow, t)` composes the matrix with a slight wobble.

**Ambient lanterns** (`NAMB` 24, or 14 on touch):
- spawn along the shore with x outside `(BX − 2, BX + 8.5)`, so they never cross the reading spot (v41)
- life cycle 42 s: rise 0.85 m/s, drift seaward at 0.55–1.15 m/s, sway ±1.1 m, fade in and out

**Testimonial lanterns** (`NT` = number of testimonials, 6), **one per note** (v42):
- scale `TSC(bw) = bw·0.52`, hanging the banner by a **V-bridle**: `LineSegments` from the rod ends up to the lantern ring, height `BRIDLE(bw) = bw·0.42`
- banner group = satin mesh + rod (cylinder, width bw + 0.14) + cords

**Satin banner material:**
- `MeshPhysicalMaterial`: `map` and `emissiveMap` = a canvas texture, emissive `#ffd2a0`, `satin_nor` (scale 0.55), `satin_rough`, roughness 0.85, **sheen 0.3** (0.7 before v44, which washed out the text), `sheenRoughness 0.45`, double-sided
- the back faces are tinted plain
- `customProgramCacheKey 'banner'`
- `onBeforeCompile` injects `BANNER_GLSL bpos(uv)`: the cloth unrolls down from the rod by `uUnroll`, and the rest wraps into a roll whose radius grows with the rolled length. A wind ripple grows toward the hem. Normals are recomputed from neighbouring `bpos` samples.
- `PlaneGeometry(1, 1, 24, 34)`, sized per banner through the `uW`/`uH` uniforms

**Banner art** (`drawBanner`):
- canvas 1024 × round(1024·bh/bw)
- satin pattern under an ivory veil (0.74), a sheen gradient, the rod sleeve band, a dashed stitch line, an inner frame
- **SAMPLE** pill top-right when `sample` is true; the text column is narrowed by 210 px so the words never hit it
- opening **“** at 150 px weight 800 `#9a4a22`, at (46, 222)
- the quote with a closing **”** appended, weight **700**, `#1a1310`, x 150 / top 168, font auto-fitted from 64 px down to 30 px so the lines fit above the name area
- a short rule, then the name (700, 38 px) and "· role, company" (600, 32 px, `#4a3a2e`)
- redrawn on satin image load and on `document.fonts.ready`
- before v44 the text was weight 500 in a lighter colour and, with Elms Sans loaded, turned unreadably light at distance because of mipmapping

**Flight** (`updateBeach`, entirely scroll-driven). For note j, `p = (s − tm.s)/0.75`:

| Quantity | Formula | Meaning |
|---|---|---|
| visible | `p > −1.6` and not vanished | |
| glow `g` | `smooth(−1.6, −1.25, p) · (1 − vk)` | lights up before arriving |
| rise | `smooth(−0.95, −0.35, p)`, x/z eased `e = smoothstep(rise)`, y with `ey = smooth(0.3, 1, rise)` | from `(lx = rx + 12 [portrait 7], ly = ry − 2.2, lz = rz + 2)` — in from the right, low over the water — to the reading spot |
| banner shown | `rise > 0.35` | rolled while flying |
| unroll | `smooth(−0.33, −0.06, p)` | opens on arrival, **stays open** |
| lift | `smooth(0.05, 0.55, p)`: y + 15, z − 8, x − 5 | up and away, left, clear of the next |
| gather | `ge` = smoothstep of `(s − (tm.s + 0.5625)) / (skyS − 0.6 − …)` toward `gx = x0 + (j − (NT−1)/2)·6.5` (portrait 3.5), `gy = cy + 26 + (j%2)·3`, `gz = B − 80 − (j%3)·7` | all notes meet high over the sea |
| vanish | `vk = smooth(0.62, 1, ge)`: scale × (1 − vk), y + vk²·14, glow × (1 − vk) | card lanterns disappear; only plain lanterns stay (v43) |
| idle | small sin bob in x/y | |
| emissive | `g · (0.45 + 0.35·night)` | banners glow a little at night |

**Reading spot:**
- `dR = 16` m out (portrait 10.5); `rz = cz − dR`
- `rx = x0 + side·0.9` (portrait 0)
- banner width `bw = clamp(viewW(dR)·0.28, 2.6, 5.0)` (portrait `viewW·0.8`), `bh = bw·0.62`
- rod at `ry = ryC + bh/2`, with `ryC = cy + dR·0.075` (portrait 0.05), so the card sits just above the horizon
- `yaw` faces the camera

**Near footer lanterns** (`updateNear`, v43):
- 3 plain lanterns positioned in **camera space** through `camera.matrixWorld`, so they keep their screen position while the camera tilts
- `{nx: −0.42, d: 7, sp: 0.045}`, `{nx: −0.78, d: 10, sp: 0.036}`, `{nx: 0.02, d: 13, sp: 0.03}`, with d ×1.7 on portrait
- each loops from NDC y −1.25 to +1.35 with an end fade
- strength `smooth(0.35, 0.85, ek)`
- they render behind the footer HTML, so they pass behind the letters of the name

### 1.16 The tick (module)
1. `s = F.sAt()`; forest canvas and grain opacity = `mix(s)`; skip everything while the forest isn't live.
2. Camera target, then damped or free pose, then the camera position and rotation with pointer parallax; the sky follows the camera.
3. Night easing, then `applyMood` if its key changed.
4. Shadow-centre texel snap, then a shadow redraw only on a key change.
5. `updateLod`.
6. Cards, titles and the counter.
7. Beach: `updateBeach` + `updateNear`, and the beach-title opacity.
8. Adaptive DPR check.
9. `renderer.render(scene, camera)`, then `css.render(cssScene, camera)`.

**`warmUp()`:** after textures load, render the first card's view and the beach landing into small render targets, so every shader, texture and the shadow pass are compiled before anyone scrolls there.

### 1.17 Responsive and accessibility
- Portrait (aspect < 0.85) gets its own camera, card and banner numbers (above). The 760 px breakpoint shrinks the pills, counter and card text.
- Reduced motion: no Lenis, faster camera damping, no grain animation, the star name shows at once, no butterfly.
- A visually hidden `<p class="sr">` names the person. The cards list (`.flist`) stays in the DOM for screen readers in 3D. Pills have focus rings, and the cursor never replaces the native pointer.

### 1.18 Performance measures (home)
- One frame loop.
- `applyMood` runs only on change.
- The shadow map is redrawn only on 4 m texel-snapped steps.
- Trees are instanced, with billboards beyond 60 m and view-cone culling; LOD is recomputed only on 0.5 m or 0.06 rad changes; partial instance uploads.
- The particle layer isn't drawn inside the forest.
- The beach is drawn only from the cliff on.
- Lanterns are 3 instanced draw calls for all of them.
- Canvas textures are drawn once (and on font load).
- Adaptive DPR that resizes before drawing.
- `warmUp` pre-compiles everything.
- Measured triangle counts in the QA harness: forest at the first cards about 0.8–1.06M; beach about 284–293k.
- Real-machine fps (Vasant): hero 60; forest about 30–45 at v37.4. He accepted this over the alternatives because travel stayed smooth.

### 1.19 Let's talk at the hero (particles → form), v51 / v51.1
- **Extra particle attributes:** `aFormA` and `aFormB` (`vec4`: model-space x, y, z and a colour index) are two target buffers (`formBufA` / `formBufB`). Two buffers let the particles move from one layout to the next (form → "Message sent") with a crossfade `ab` instead of a jump.
- **`heroOpen({ config, send, opener })`:** stops Lenis, locks the page (`html.talking-hero`), imports `talk/surface.js` and creates a surface with `look: 'tb-look-particles'`, width 560 px (phones `min(344, innerWidth − 32)`), padding `36/40/34` px (phones `30/18/26`), after `document.fonts.load` for Elms Sans 600 and 800. The live form goes into a fixed `div.tpfx` centred on screen (top ≥ 84 px, 70 on phones).
- **`heroFormTargets(into)`:** draws the surface's `layout()` to an offscreen canvas in code colours: the title words in red (index 0), field outlines (rounded, 1.7 px) and the button in green (index 1), the round close button as a yellow ring (index 3), the sent-state seal in green. It reads back every lit pixel and gives each particle one: about 4.5 particles per lit pixel; the spares (index 9) drift around the form and fade. Screen pixels are converted to the portrait's model space with the camera's `tan(fov/2)`, `camDist` and `baseY`.
- **Shader:** each particle leaves the portrait on its own cue, swirls and settles into its form position; `talkP.k` eases 0→1 over 1.7 s (back over 1.4 s), `ab` over 1.2 s. The real words and live fields fade in over the particles 1.45 s after opening (`.tpfx.on`), and focus moves to the first field.
- **States:** the surface's `onChange('state')` flips to the other buffer, draws the new targets and crossfades (form → sent → form). Closing (✕, Escape) hides the words, sends the particles home and, 1.5 s later, unlocks the page and returns focus to the opener. Tab is trapped inside the form (`surf.trap`). Resizing re-centres it. Reduced motion makes every transition instant.
- **Hoodie colour (v51.1):** the wheel writes `--tb-hood` (the colour) and `--tb-hood-ink` (`#0d0d0d` when luminance > 0.55, else `#f6f6f3`) on `<html>`. The particles' outline colour, the labels, the focus ring and the button use them; "Original" removes both.

### 1.20 Let's talk on the beach (the bottle), talk-beach-v1
- `window.__beachTalk = { open: o => btOpen(o) }`, in the module.
- **`btOpen`:** creates a surface (`look: 'tb-look-letter'`, 560 px or 344 on phones), places a glass bottle with a cork in the sand a couple of metres ahead of the camera's right-turned pose, and the reading spot straight ahead at eye height, far enough for the letter to fit. Stage machine: `turn` (camera turns right to the bottle) → `bottle` (hint: "There's a letter in the bottle. **Scroll** / **Swipe up** to pull it out." + a "Pull the letter out" button) → `pull` (wheel `|deltaY|/900`, touch `|dy|/500`, ArrowDown/PageDown/Space +0.25 drive `bt.pullT` 0→1; the page itself doesn't scroll) → the letter slides out of the neck, rises in front of the camera and **unrolls** → form.
- **The letter:** a plane whose vertices are bent around a moving cylinder (`setRoll(k, w, h)`: 0 = flat, 1 = rolled tight at the top edge; it rolls from the bottom edge upward). `btLetterDraw()` paints the form as a letter: cream laid paper, brown ink, ruled boxes. The live fields follow the letter exactly (CSS3D).
- **On send** (`onSent`): stage `away`: it rolls up, slides back into the bottle, the cork goes in, the bottle is thrown into the sea with a splash, and the toast "Message received. I'll reply on WhatsApp or by email." (`.bttoast`, `role=status`). Escape or ✕ closes at any point (`btClose`).

### 1.21 The Let's talk router (`window.__talkScene`)
```js
window.__talkScene = { open: o => {
  const F = window.__forest, sNow = F ? (scrollY - F.top()) / F.Hs() : -9;
  if (gl && count && revealed && forest.mix() < 0.02 && converge < 0.5) { heroOpen(o); return true; }   // at the hero
  if (F && sNow >= F.landS - 0.15 && window.__beachTalk) { window.__beachTalk.open(o); return true; } // beach to footer
  return false;                                                                                      // forest: site.js → board
} };
```
`site.js` calls this first; `false` makes it open the hanging board (§9.3).

### 1.22 Returning from an automation page (v47, v48)
- At the top of the classic script: `RETURN_SLUG` from `location.hash` `#from-<slug>`, or from `sessionStorage.returnTo` (read once, then removed; also cleared on a `pageshow` from the back-forward cache). If set, `html.returning` is added.
- `html.returning .loader > *{display:none}` and a 0.45 s fade: no counter. The loader reveals immediately once the forest is up (`shown = target = 100; reveal()`).
- In the forest IIFE, the card whose `href` is `automations/<slug>.html` becomes the start position, so the page opens in the forest facing that card.
- On the automation pages: the back mark's `href` is `../index.html#from-<slug>`. A click handler checks `document.referrer`: if the visitor came from the home page (same origin, path `/`, `/index.html` or `/index`) and `history.length ≥ 2`, it stores `returnTo` and calls `history.back()` instead. In-page links (`a[href^="#"]`) are handled with `scrollIntoView`/`scrollTo` and `preventDefault`, so they never add history entries.

---

## 2. The automation-page template (what every page shares)

Every page in `automations/` has the same skeleton. Copy it for a new page; change the world, never the chrome.

```
<!doctype html> + charset + viewport, <title>, Google Fonts
<style>     tokens (:root), fixed UI, captions, hero title, end card, dots, scroll hint, runbook styles, breakpoints,
            and the page's Let's talk look (.tb-look-<name>) + its live-field overlay
<canvas #gl> (+ scrims / vignette)
<div .ui>   a#mark (‹ Vasant Suraj → ../index.html#from-<slug>), Let's talk [data-contact], hero title, .cap[data-i] captions,
            end card (outcome, stack chips, "Next automation → …" #nextLink), progress dots, scroll hint
<canvas #fly>, <div #runway> (680–1300svh), screen-reader <h1>
<section #doc>  the runbook (static HTML): facts <dl>, sticky <nav class="toc">, .sec sections, .steps, .rules, .stats, a note
<script>    classic UI script: scroll → progress → caption (CUT), reveals, toc highlight, the back-arrow/history logic.
            Works without WebGL.
<script type="importmap"> three@0.158.0 + three/addons from jsDelivr
<script type="module">    the 3D scene
<script src="../site.js" defer>
```

- **The bridge:** the UI script writes `window.__stage = { prog, station, doc }`; `prog = scrollY / (runway.height − innerHeight)`. The module reads it every frame.
- **Captions:** `CUT = [...]` holds the progress values where each caption starts; `.cap.on` marks the current one. The UI script also hides captions, end card, dots and hint (`.ui.off`) when the runbook is half on screen (`doc ≥ 0.5`); the mark and Let's talk stay.
- **Camera:** `KEY` holds named set-ups `{ pos, look }` (plus optional `close`, `pb`, `m`); `STATIONS` lists them at progress values, usually twice each so the camera **holds** across a caption and travels only in the gaps. `cameraAt(p)` finds the pair around `p`, eases with `easeIO` (cubic in-out) and lerps position and look. The camera then damps toward the target with `1 − exp(−k·dt)`; `?snap` sets the damping to 1.
- **Portrait screens** (`W/H < 0.85`): fov 58° instead of 40° (Reddit 54°/40°, The Press 50°/36°, SEO 56°/38°); close-ups (`close: 1`) step straight back along the view by `pb` (default 1.4), wide shots step back 25 %, clamped to stay inside the room; a key can carry its own phone framing `m: { pos, look }`, which then replaces it.
- **Pointer parallax:** a small offset from the pointer, eased.
- **Renderer:** `WebGLRenderer`, ACES filmic, sRGB output, DPR `min(1.5, dpr)` (1.25 on coarse pointers), pixel-ratio-aware composer, `resize()` sets fov per aspect.
- **Loading:** a `THREE.LoadingManager`; the scene shows when everything has arrived. Textures go through a `tex(name, srgb, repeat)` helper with anisotropy; models through `loadPacked(file)` (§10.2).
- **Canvas textures** (`canvasTex(w, h, draw)`) for anything with words: labels, screens, sheets, boards. They redraw once when the web fonts arrive.
- **Let's talk:** a `talk` object with `mode` (`off` / `in` / `on` / `out`), its own camera path (`talk.P`, eased over ~1.8 s) that takes over from the scroll camera while it is in charge (the scroll stays where it was), a `CSS3DRenderer` (`talk.cssR`) for the live form over the painted texture, and `window.__talkScene = { open }`. Escape closes. The surface comes from `../talk/surface.js` (§9.2).
- **The butterfly cursor**, the same code as the home page.

---

## 3. Reddit Keyword Alerts page (`automations/reddit-keyword-alerts.html`)

### 3.1 File anatomy
```
<!doctype html> + charset + viewport (added v45), <title>, fonts
<style>   tokens, fixed UI, captions, runbook styles, breakpoints
<canvas #gl> + .scrim + .vignette
<div .ui>  mark (‹ Vasant Suraj → ../index.html#from-reddit-keyword-alerts), Let's talk [data-contact], hero title, 4 captions (.cap[data-i]), end card, progress dots, scroll hint
<canvas #fly>, <div #runway> (680svh), screen-reader <h1>
<section #doc> the runbook (static HTML)
<script>   classic: UI layer (scroll → station, reveals, toc) — independent of WebGL
<script type="importmap"> three + three/addons from jsDelivr
<script type="module"> the 3D scene (+ the glass-card Let's talk, §3.13)
<script src="../site.js" defer>
```
The UI script runs first and alone, so the captions, runbook and navigation work even if WebGL or the CDN fails.

### 3.2 Renderer and post-processing
- `WebGLRenderer` (antialias off; the bloom pass supplies smoothing), clear colour `#0d0d0d`, ACES filmic tone mapping, exposure 1.05, `transmissionResolutionScale 0.5`, pixel ratio capped at 1.5.
- `scene.environment` = `PMREMGenerator.fromScene(new RoomEnvironment())`, so metals and glass have something to reflect. Per-material `envMapIntensity` is kept low (0.25–0.55) to avoid a washed-out look.
- Composer: `RenderPass → UnrealBloomPass(strength 0.5, radius 0.55, threshold 0.9) → OutputPass`. The high threshold means only emissive parts bloom (gates, hand, matched cards, sparks).
- Fog: `FogExp2(#0d0d0d, 0.035)`.
- Lights: hemisphere (0.45), a key directional (1.1), a blue rim (0.5), and a **focus `PointLight`** that lerps to the active station so it is always the brightest thing on screen.

### 3.3 World coordinates
Stations along x: `start −26, clock −10, lens −2, fresh 4, seen 8, slack 15, end 22`. The raw stream runs at `y = 0`, the alert line at `y = 1.7`, and the floor/water at `y = −1.15`.

### 3.4 Materials and helpers
- `metal(color, rough)`: `MeshStandardMaterial`, metalness 1.
- `glow(color, k)`: a standard material with `emissive = color` and `emissiveIntensity k` (what bloom picks up).
- `glass(color, opacity, extra)`: `MeshPhysicalMaterial` with `transmission 0.9`, `thickness 0.4`, `ior 1.45`, clearcoat; `depthWrite false`.
- `pill(text, color, size)`: a canvas-rendered text label (uppercase, letter-spaced, drop shadow, **no box**) on a `PlaneGeometry`. All labels are billboarded to the camera every frame.
- `stripes`: a tileable 256×8 canvas texture (one rounded bar) used as `emissiveMap`/`alphaMap` with a scrolling `offset`, for the flowing alert line and the spinning dashed gates.
- `roundRect()`: a canvas helper used by every texture.

### 3.5 Stations, mechanically
- **Clock:** metal torus, dark glossy face, 12 emissive ticks, an emissive hand on a pivot (`rotation.z = −phase·2π`, 4 s period), a centre sphere and a pedestal. At the top of each revolution, one of three ring meshes expands across the water with fading additive opacity (the radar sweep), a cone "beam" flashes, the hand's emissive spikes, and sparks fire.
- **Lens:** a 2.15-radius transmission glass disc, a metal ring, a thin emissive halo ring, and six `pill` labels orbiting (radius 1.55, slow rotation, billboarded). When a matched card crosses `X.lens`, the halo's emissive flares (eased `lensGlow`) and the disc opacity rises.
- **Gates** (`gate(color)`): a metal torus, an inner dashed torus (stripe texture, scrolling `offset.x`, emissive 1.6 rising to 4.6 on a hit) and a faint transmission disc. Amber at `X.fresh`, pink at `X.seen`.
- **Memory:** a `RoundedBoxGeometry` glass box, edge lines, 12 emissive slabs that become visible as cards are absorbed, a small tube "chute" from the gate down into the box, and a `memPulse` scale/opacity ripple on each absorb.
- **Slack:** a 1280×880 `CanvasTexture` on a plane (`toneMapped false`, so UI colours stay exact), a rounded dark backing box 0.07 behind it with `polygonOffset` (this removed the z-fighting flicker), a ping ring and dot at the corner, and a stand. The canvas draws window chrome (traffic lights, `# alerts`, description, member count, a sidebar with the active channel, composer) and a message list.

### 3.6 The card stream
- One **`InstancedMesh`** of 230 planes (150 on touch). The card art is a **texture atlas** (4×2 variants of a dark Reddit-style card: subreddit tag, two title bars, upvote arrow, two meta bars) drawn once to a canvas. A per-instance `aTile` attribute selects the tile, and `onBeforeCompile` patches the vertex shader to offset `vMapUv` by it.
- **Tint and glow:** per-instance colour is set with `setColorAt`. In the fragment shader (also patched), the emissive term adds `diffuse · max(0, length(vColor) − 1.3)`, so any instance whose colour is pushed above white glows and blooms. Dim stream cards use about 0.95 grey; matched cards mint ×1.9–2.7; stale amber ×1.9; repeats pink ×1.9.
- **Per card state** (`P[i]`): phase `u`, lane offsets, wobble, speed, and the flags `matched` (20 %), `stale` (30 % of matched) and `seen` (30 % of matched), plus `px` (last x) to detect station crossings without firing on wrap-around.
- **`updateCards(t)`** computes each card's x from time, then branches:
  - unmatched cards sink and fade after the lens
  - matched cards lift to the alert line (eased) and scale up briefly on the hit
  - stale cards tumble down after the amber gate
  - seen cards curve down into the memory box and are absorbed
  - survivors merge into the line just past the pink gate
- **Crossings fire effects:** lens → mint spark burst and halo flare; amber gate → amber sparks and gate flare; pink gate → pink sparks, gate flare and memory ripple.
- A separate single-instance **courier** mesh leaves the gates every 3 s (`CYCLE 3`, `RIDE 1.9 s`), rides an eased arc to the monitor and shrinks into it. Its arrival pushes the next alert into the Slack window and fires the ping ring, a brief emissive glow on the monitor frame, and a spark. Five alerts cycle, and the queue resets when the station is scrolled away.

### 3.7 Sparks
A pooled `Points` system (900 slots) with a `ShaderMaterial`. Attributes: `aVel`, `aCol`, `aLife` (born, duration). The vertex shader integrates position = `p0 + v·age + g·age²` on the GPU and sizes and fades by age; the fragment draws a soft disc; additive blending, no depth write. `fire(x, y, z, color, n, speed, dur, now)` writes into a ring buffer and flags the attributes for upload.

### 3.8 Environment
- **Water:** a `Reflector` (400×220 plane) with a **custom shader**.
  - The mirrored scene texture is sampled through `texture2DProj`, with UVs displaced by two scrolling samples of a tileable value-noise texture (ripples), multiplied to 55 % and added to a near-black base.
  - Tiny glints appear where both noise layers peak. Exponential fog is applied in the shader, because the Reflector material has no fog support of its own.
  - The render target is 40 % of the viewport (30 % on touch), and `onBeforeRender` is wrapped to refresh only on alternate frames.
- **Mist:** four large horizontal planes at different heights with a `ShaderMaterial` combining two scrolling noise samples and a radial mask; opacities 0.035–0.055.
- **Ridge:** a 240×140 `PlaneGeometry` displaced in JS with a 5-octave value-noise fbm. It has a far back ridge (two layered terms), low side shoulders and a faint rim behind the camera, with a dark matte material. The base sits under the water so the mountains reflect.
- **Haze:** a 700-unit-wide vertical gradient plane behind the ridge (`fog: false`, `toneMapped: false`).
- **Sky:** 520 `Points` far back with per-point twinkle in the shader. **Shooting stars** are three streak planes with a gradient-tail texture, fired every 3.5–8.5 s at a random position, angle, length and speed, fading with a sine envelope.
- **Dust:** 1400 faint points nearer the machine, for continuity with the home page's particle field.

### 3.9 Camera and scroll
- `KEY` holds six camera set-ups (`pos`, `look`, focus-light position). `STATIONS` duplicates each at two progress values, so the camera **holds** for the whole caption range and travels only in the gaps, with `smoothstep` easing between keyframes. Ranges: hero 0–.06, clock .15–.27, lens .34–.47, gates .54–.67, slack .74–.85, end .92–1.
- Progress comes from the UI script: `window.__stage.prog = scrollY / (runway.height − H)`. The module reads it every frame. The camera, look target and focus light lerp toward their targets with `1 − exp(−4.2·dt)`, which is frame-rate independent. A `?snap` query sets the lerp to 1 for the screenshot harness.
- Pointer parallax adds ±0.35 units of camera offset.
- Portrait screens (`W/H < 0.85`): field of view 54° instead of 40°, camera stepped back 4.5 units and raised, look target lowered so the machine sits above the caption; the hero title moves to the bottom in CSS.
- When the runbook scrolls into view (`doc ≥ 0.5`), `.ui.off` hides the captions, end card, dots and hint; the mark and Let's talk remain.

### 3.10 Performance measures
- instancing for all cards
- one draw call each for sparks, dust and stars
- canvas textures redrawn only when something changed: the Slack window redraws only while assembling or during the 2.4 s arrival animation, flagged by `slackState.dirty`
- reflection at reduced resolution, on alternate frames
- transmission at half resolution
- DPR ≤ 1.5
- a high bloom threshold, so the bloom buffer is mostly empty
- labels billboarded but otherwise static
- `frustumCulled = false` only where an object is updated in a shader

### 3.11 Runbook
Static HTML under the runway:
- a facts `<dl>` and a sticky `<nav class="toc">`
- sections `.sec` with `h3 > span` numbers
- `.steps`: grid rows with a coloured square tied to the station colour and the n8n node type in a mono chip
- `.rules` cards, a `.code` block, a `.msg` Slack mock, `.stats`, `.pills`

Reveal on scroll uses `IntersectionObserver` (`.rv → .in`), and a second observer highlights the current section in the nav.


### 3.12 Links (v45, v47, v48, v50)
- `#mark` → `../index.html#from-reddit-keyword-alerts` (aria-label "Back to the projects forest"); a real `history.back()` when the visitor came from home (§1.22)
- **Let's talk** → `data-contact` (it was a `mailto:` until v50)
- "Back to the machine" → `#top`, scrolled in place without a history entry
- "Next automation → Competitive Intel System" (`#nextLink`, `#nextLink2`) is still `#`

### 3.13 Let's talk: the glass thread card (talk-reddit-v1)
- A glass "new thread" card at `TC = (X.seen + 1.2, 4.3, 2.6)`, yaw `−0.12`, above the alert line past the seen gate. It isn't in the scene while you scroll.
- Let's talk fades it in (easeIO) and flies the camera to face it square on. The surface (`tb-look-glass`) is painted onto the card's canvas texture; the live fields sit over it with CSS3D.
- On send: a copy of the card drops onto the line, rides it like the courier into the Slack window and arrives as a new alert note "from the portfolio · just now" (ping ring, frame glow). The note is generic: what the visitor typed is never drawn; then the camera returns to the card. Close or Escape fades the card away and gives the camera back to the scroll.

---

## 4. Notion to Webflow, "The Press" (`automations/notion-to-webflow.html`)

### 4.1 Renderer
- `WebGLRenderer` with **shadows** (`PCFSoftShadowMap`, map 2048², 1024² on coarse pointers), ACES, exposure **0.9**, clear colour cream `#e9e1d3`, `Fog(cream, 34, 80)`. **No bloom.** Camera fov 36° (portrait 50°).
- `scene.environment` from `RoomEnvironment` through PMREM, kept low.
- Lights: a window key `DirectionalLight(0xfff0da, 2.2)` from the upper left (casts the shadows), a warm room fill `HemisphereLight(0xfff4e6, 0x9c8b73, 0.8)`, a cool bounce `DirectionalLight(0xdfe4ff, 0.35)` from the right.
- A CSS grain overlay; reduced motion stills it.

### 4.2 The studio and the table
- A paper sweep: floor running into a curved cove and a back wall, like a photo studio.
- The drafting table: a grid-paper top (canvas texture repeated `TL/4 × TD/4`), wooden edge, brass nosing, steel trestles. Stations sit along x on the one table.

### 4.3 Paper blocks
- One Notion page = **8 blocks** (title, paragraphs, list, quote, code, image…), cut from a **texture atlas** with two rows: row 0 the Notion look (white page, grey text bars, a drag handle), row 1 the HTML look (the tag in coral ink, tidy graphite lines, a closing tag). Pressing a block swaps its UV row.
- **The machine clock:** a mechanical beat. Each beat the belt indexes one slot, the next block peels off the page, and the stamp presses during the dwell. A page is 8 blocks, then a 2-beat page change while the next page rises out of the plinth (10 beats per page).
- When the camera reaches a station before the machine does, the press **fast-forwards** to the moment worth seeing.

### 4.4 Stations (x along the table) and motion
| Station | Build |
|---|---|
| 0 · page + board | the block stack on a plinth; behind it the Notion board (canvas texture) moving the card writing → approved → pushed |
| 1 · lever | two key barrels with lamps above and plates below on the front face; a pivot hub, a graphite arm and a brass ball. Inky turns both keys, then the lever comes down; a strip of lamps along the belt lights from the stack outward. The lever and Inky ease toward the scroll, never snap. |
| belt | indexing conveyor: the belt surface and rollers move only while indexing |
| 2 · stamp | a press head at `X.stamp`; the die plate on the crossbar shows the tag; a pool of coral droplets (`InstancedMesh` of small boxes) thrown out by each press |
| 3 · reference rack | two ink tokens per post (author, category) lift off the title block and drop into the socket of their match on blue plates |
| 4 · bind and file | the gather plate and rollers; straps and SEO plates bind the finished page; the **cabinet** in Webflow blue with a live CMS item on its face and an intake on the left; the DRAFT ribbon drops across the top-right corner |
| 5 · write back | two flaps report to Notion; the receipt (the Slack message) prints for the reviewer |

Camera keys: `hero, approve, convert, map, draft, write, end`. Runway 960svh; `CUT = [0.08, 0.325, 0.475, 0.615, 0.765, 0.89]`.

### 4.5 Inky and the intro
- Inky: an ink-blob character with squash and stretch, arms, a blink and a turn; a speech bubble (HTML, `#bubble`) follows its head. The cork is its hat.
- The intro (`html.intro`), on every visit unless `?nointro` or `?snap` (`?intro` forces it): only the bottle and its table are in the world. A soft coral ring on the table says "click me"; the cursor turns to a pointer over the bottle (raycast). Clicking the bottle or "Click the ink bottle" starts the spill; "Skip intro" jumps 6 s in.
- Timeline (seconds after the click): the bottle tips (0–0.42) and settles; the cork pops and flies; the ink spreads into a puddle (which stays as a stain) and gathers into Inky; "Hi! I'm Inky." (2.25–3.4), "I'll run the press for you." (3.4–4.3); a hop; then an **ink wipe** covers the screen from Inky, the press appears behind it, and the wipe opens around Inky at the lever; done at 5.3 s.
- During the intro the page is held at the top (`scrollRestoration = 'manual'`, scroll events reset to 0). An 8 s watchdog drops the intro if 3D never became ready.
- `window.__freezeIntro` is a screenshot hook (with `?snap`).

### 4.6 Let's talk: the drawing board (talk-press-v1)
- `TP = { x: −19.7, z: 0.6, tilt: −0.32 }`: a wooden backing that leans back on a strut (from two thirds up the back down to the table), the sheet on it, a brass clip at the top. Folded flat while you scroll; Let's talk stands it up with a back-out ease and flies the camera square onto the sheet, leaving room on the right for Inky.
- The sheet is the surface with `tb-look-print`: cream stock, black type, coral labels, ruled boxes.
- Inky hops over and stands on the table to the right, turned a little to the camera ("Write it here. I'll stamp it."). On send it picks up a rubber stamp (wooden handle, coral pad), presses it onto the sheet and lifts it away: **RECEIVED** at an angle, slightly uneven like a real stamp (where the stamp knocked the ink out, the paper shows through: `destination-out`). "Received!"

---

## 5. SEO Pre-Live Checks, "Opening Night" (`automations/seo-pre-live-checks.html`)

### 5.1 Renderer
- Shadows (`PCFSoftShadowMap`, 1024², 512² on coarse), ACES, exposure **1.15**, background `#0d1814`, `FogExp2(bg, 0.028)`, fov 38° (portrait 56°). **No bloom.** Environment reflections are used for the gilt and brass only.
- Light: a dim `HemisphereLight(0x5d7f73, 0x1a120c, 0.5)`; **six zone spotlights** (`SpotLight(0xffd6a0, …)`) that come on, and stay on, as you reach each zone; each item's own beam and pool snap on at its moment with a small flicker; a soft radial pool texture for light on walls and floor; point lights for the room and the painting.
- **Dust** in the beams: points drifting down each cone, visible only while it is lit.

### 5.2 The room
Museum-green walls with wainscot, chair rail and picture rail along the back wall (broken by the doorway), an oak floor, a dark ceiling with lighting track, and the side room through the door (ads live there). Velvet ropes. All the art is canvas textures (paintings, and the new page laid out like a webpage, framed like a painting), redrawn once the web fonts arrive.

### 5.3 Props by station
| Station | Build |
|---|---|
| 1 · arrive | pieces already on view behind a rope; the crate whose front panel hinges at the bottom and falls open; the page slides out, lifts and glides to its wall |
| 2 · label + poster | the wall label; two brass rulers under it with a sliding pointer that stops inside the allowed range (title 10–65, description 50–160); the exhibition poster (OG image) on an easel, with its own light |
| 3 · paperwork | the certificate (canonical); the catalogue: an open book on a **wooden book rest** (a slanted board on the plinth's front, a block propping the back) with a page that turns, plus the artist's signature and date in the painting's corner (the blog-only Article check); the floor map on a stand, lighting up room by room (BreadcrumbList) |
| 4 · captions + door | captions under the page's images (alt text); the door sign, blank until checked, spins round to show the rule; the side room with an ad page behind a velvet rope under PRIVATE VIEWING |
| 5 · checklist | the curator's lectern inside the back room; the checklist fills line by line, then gets stamped |
| tags and pins | a red P0 or amber P1 tag swings from a failed item; passed items get a small enamel pin |

Camera keys (v2: each item close up, then pull back): `hero, arrive, label, poster, cert, cat, map, paper, caps, door, doorway, inside, desk, end`. Runway 1300svh; `CUT = [0.05, 0.225, 0.405, 0.625, 0.765, 0.905]`. Portrait: close-ups step straight back along the view; wide shots centre the subject and step back. Everything big is scroll-driven and eased toward the scroll (wheel ticks never snap); dust, swinging tags and lamp flicker run on time.

### 5.4 Let's talk: the commission painting (talk-seo-v1, v1.1)
- `TALK = { x: ROOM.x1 − 0.07, z: back + 3.7, y: 1.86 }`, on the far end wall that the walk never faces, in a gilt frame.
- Let's talk flies the camera from wherever it is (out of the side room through the doorway if needed, then an easy arc across the hall) to stand square on, far enough back for the whole frame and a little room for the header. The scroll stays where it was.
- The form is painted (`tb-look-paint`): a dark green ground in broad strokes on a canvas weave, cream and ochre lettering with a little relief (a dark underside and, on the title, a lit edge); the fields are darker panels with a soft brushed edge, outlined in a thin ochre line.
- The museum label sits to the right, as museums hang them, in Elms Sans (v1.1, larger): "Let's talk / Vasant Suraj / Commission enquiry / OPEN FOR NEW WORK", with room for the **red dot**, which appears once sent.
- The painting's own light comes up as the camera arrives, and stays a while after it leaves.
- If the painting can't be made, the page is put back and the plain form opens (`fallback()`).

---

## 6. Auto Internal Linking, the city (`automations/auto-internal-linking.html`)

### 6.1 Renderer
- ACES, exposure **1.2**; fog colour linear `(0.030, 0.029, 0.034)` (a lit orange-grey haze), `FogExp2(…, 0.0024)`; camera fov 40°, near 0.3, far 2600.
- Bloom at **half resolution**: `UnrealBloomPass(W/2 × H/2, 0.38, 0.5, 0.95)` (toned down after the first look test: windows and bloom were too bright).
- Environment: a small generated night environment (dark sky, a sodium-orange horizon, scattered lit windows) for reflections.
- Lights: `HemisphereLight(0x46506a, 0x2a1d12, 0.7)`, a faint moon `DirectionalLight(0x8fa4c8, 0.22)`, the sky's own glow, and **real point lights only near the plaza** (warm `0xffb070` / `0xffc68c`, a red one for the signal). Everything else is faked.

### 6.2 City layout
- A grid of blocks (`PX 70`, `PZ 56` block pitch, `RW 12` road width, `NB 8` blocks each way). Roads run between them; the centre block is the plaza.
- **Ground:** wet asphalt (Poly Haven aerial_asphalt_01 at 2k; asphalt_02 is used on the roofs, which catch the city's glow), with a **`Reflector`** layer at `CURB + 0.012` on top that is strongest in the puddles (a puddle mask in the shader).
- Road markings: worn white centre dashes, stop lines and zebra crossings at every junction. Block slabs: paved sidewalks (brick_pavement_02) with a granite kerb; the station's stair steps and tactile strip in anti_slip_concrete.
- **Buildings:** brick (brick_wall_10) and glass; every window decided in the shader (`onBeforeCompile`): lit or dark, warm or cool, blinds, shops at street level. Per building a vector carries a seed, a style (0 brick, 1 glass, 2 old brick), the share of lit windows and a shop colour.
- **Sky:** a dome of low cloud lit orange from below by the city.
- **Street lamps:** instanced poles and heads (Poly Haven street_lamp_02 textures) with instanced **light pools** on the ground. **Traffic:** headlight and tail-light points moving along every road. Red aviation lights blink on the tallest roofs.
- **Models** (packed JSON, §10.2): wall lantern (`lamp_p.json`), street seating (`seating_p.json`), fire escape (`fire_p.json`).

### 6.3 The network and the lines
- Stations: a fixed scatter of junctions (seed 4242), denser in the middle of town (`rnd() < (r < 5 ? 0.42 : 0.2)`), about 70. Junction totems (instanced poles and signs with a link glyph); the **top-100 posts are interchanges** (instanced rings).
- **Lines** are flat glowing ribbons laid on the streets with filleted corners, routed along the road grid. A shader draws them growing (`uProg`), with a **minimum pixel width** so far lines never vanish. Colours: inbound orange `0xff8a1f`, outbound blue `0x3d86ff`, Also read a dotted pale orange `0xffcf8a`.
- **Tags in the air:** sprites showing the phrase each link was made on, constant size on screen, drawn on top so buildings never hide them.
- **Done messages:** HTML, top centre ("Inbound linking done", "Outbound linking done"); each arrives as its engine finishes and leaves as the scroll moves on.

### 6.4 The plaza
A paved square with a stair entrance, railings, benches and wall lanterns on the facades facing it; real lights for the plaza only. The totem "New post" with OUT and IN signal lamps (red → green). The departure board at `BOARD { x: −6.6, z: 6.4, ry: 0.45, w: 4.4, h: 2.3, y: 2.75 }`: a split-flap canvas with three tabs (KEYWORD REGISTER · TOP 100 BY CLICKS · LINK LOG), all rows illustrative. The older post's totem by the fire-escape building shows EDITED, then EDIT SKIPPED.

### 6.5 Scroll
Runway 1300svh; 7 captions; `CUT = [0.04, 0.15, 0.26, 0.36, 0.53, 0.68, 0.80, 0.92]`. Camera keys include `hero, plaza, in, out, refresh, end` plus the board shots; phone framings (`m`) keep the camera out of buildings on portrait screens.

### 6.6 Let's talk: the ticket machine
`TM = { x: −17, z: 18, ry: π/2 + 0.25 }` on the plaza, behind every camera of the walk; `talk.dur = 1.8` s glide. The form is on its screen (`tb-look-kiosk`), painted into the screen texture with the live fields over it. Sending prints a ticket, MESSAGE SENT (`copy.sentTitle: 'Ticket printed'`).

---

## 7. AI Blog Drafts, the greenhouse (`automations/ai-blog-drafts.html`)

### 7.1 Renderer and sky
- Shadows (`PCFSoftShadowMap`, 2048², 1024² on coarse), ACES, exposure **0.72**, `FogExp2(HAZE, 0.006)`, camera fov 40° (portrait 58°), near 0.05.
- Bloom at half resolution, very light: `(0.32, 0.6, threshold 1.4)`.
- **Light from the real sky:** Poly Haven **Spruit Dawn** (4K EXR) converted to `sky_env.json`: a 512×256 **RGBE** image as base64 with the sun's measured position. In JS it is decoded into a `HalfFloatType` `DataTexture` (`THREE.DataUtils.toHalfFloat`) and run through `pmrem.fromEquirectangular` → `scene.environment`.
- **The visible sky:** `sky_2k.jpg`, a 2048×1024 backdrop saved after scaling by `k = 1/(98th percentile)`; the shader multiplies it back by `SKYK = 1/0.2795`. It is **ground-projected**, so the greenhouse stands in the field instead of floating in a sphere.
- **The sun as a light:** `SUN = (0.735, 0.104, 0.670)` (the HDRI's sun), `SUNCOL (1.0, 0.72, 0.46)`, `DirectionalLight` 3.2 with shadows: long, low shadows through the frame. `HemisphereLight(0xbcd0e8, 0x6a5a44, 0.25)`.
- Dust in the sunlight (points).

### 7.2 The greenhouse
A timber dwarf wall (wood_planks), a painted steel frame, and **fogged glass**: a shader that mists the glass from the warm air inside, clearer near the top, with runs where drops have slid down.

### 7.3 The bench and props
- The bench is Poly Haven **wooden_picnic_table** (tabletop + bottom materials), the hero plant **potted_plant_04**, the can **watering_can_metal_01**, all packed JSON in `greenhouse/`.
- **The ledger** (canvas texture as an open book): columns Title / Primary / Secondary / Brief / Run Action / Blog Article Link; filmed from straight above (`ledger`, `ledger2` keys).
- **Pots:** 5, one per row, laid out left to right (mirrored from the first test, which read right to left); seed packets with briefs tied on (row 5's tag sealed red); plant markers that flip to YES together.
- **Plants:** grown by the shader and by instanced leaves (`InstancedMesh(leafG, leafM, …)`), from an outline (the stem) through sections (branches) to paragraphs (leaves); a brass word counter.
- **Voice tins** on the shelf (Voice A/B/C, "Any writer · + ADD A STYLE FILE"); the **grow lamp** on its rail (a `SpotLight`) moving pot to pot; the **crate** stamped GOOGLE DOCS by the door; the **bell** over the door; the **run log** clipboard by the failed pot (✕ Read brief · 403). Handwriting in Caveat.

### 7.4 Scroll
Runway 1300svh; 6 captions; `CUT = [0.05, 0.19, 0.33, 0.46, 0.66, 0.79, 0.91]`. Camera keys: `hero, door, inside, ledger, flag, voice, sow, grow1, row, crate, ledger2, fail, end`. Portrait close-ups step back but stay inside the glass (clamped to the greenhouse box and below the eave).

### 7.5 Let's talk: the order pad
An order pad on the far (east) gable post, which no shot faces. The camera glides down the greenhouse to it. The form is written on the pad's top sheet (`tb-look-order`) in dark ink. Sending stamps it RECEIVED ("Order received"). Bug fixed in 2a0af76: a trailing `// comment` had swallowed `g.add(paper)`, so the sheet was missing (white on white).

---

## 8. Webinar to Webflow, the studio (`automations/webinar-to-webflow.html`)

### 8.1 Renderer and light
- Shadows (1024², 512² on coarse), ACES, exposure **1.1**, camera fov 40° (portrait 58°), near 0.03, far 60.
- Bloom at half resolution `(0.42, 0.55, 0.9)` for the screens, LEDs and ON AIR.
- **Environment:** Poly Haven **Ferndale Studio 05** (1K EXR) → `studio_env.json` (RGBE), **desaturated and warmed offline** (`l·(1.0, 0.86, 0.72) + (s − l)·0.08`) to remove its purple cast, kept low because it is night.
- Lights: dim ceiling spots on the desk and rug (`SpotLight`), the screen's glow, a warm practical by the tape machine (`PointLight 0xffb070`), cool screen light (`0x9ab8ff`, `0xbfd2ff`), the booth lamp, a red `PointLight` for ON AIR (0 until sent).

### 8.2 The room
Plaster walls (plastered_wall_04), fabric panels, a slatted diffuser over the booth window (instanced slats), a marble-chequer floor (floor_tiles_06) under a rug. The booth behind the glass: fabric walls, a warm lamp, the mic, the music stand.

### 8.3 Props
- **Desk:** Poly Haven metal_office_desk; **chair:** modern_arm_chair_01; **TV:** Television_01 (playing the webinar); **boombox** on the record shelf. All packed JSON in `studio/`.
- **Console:** a sloped desk with 12 channel strips built from instanced knobs, caps, buttons and fader slots; a meter bridge with two VU meters (KEPT % · MATCH); a scribble strip (HOST / GUEST).
- **Request panel:** TRANSCRIPT / RECAP / PUBLISH with approve LEDs (emissive buttons).
- **The big screen:** a canvas app redrawn per step: `link` (with raw captions), `blocks`, `speakers`, `clean`, `doc` (the Google Doc being written), `recap`, `publish`, with the journey strip YouTube video → Captions → Transcript → Google Doc → Conversation → Webflow CMS on top.
- **Tape machine:** procedural cassette deck with the webinar's title; reels turn while captions are fetched; WAIT lamp blinks every 8 s.
- **Printer:** the cue sheet (the transcript) comes out; a readable top-down shot (`paper`). Bug fixed: a trailing comment had swallowed `pg.translate`/`rotateX`, so the sheet stood vertical.
- **Record:** the sleeve rises out of a slot in the side cabinet onto an easel (it used to appear from outside the box); liner card "CONVERSATION · Recap page"; a warning sticky note; at 07 the thumbnail is swapped and the record is filed on the CONVERSATIONS shelf.
- **Wall journey sign** above the shelf (in front of the fabric panels; its frame sits behind the sign plane), **ON AIR** over the booth window.
- The mic and the tape machine are built in code: no models were supplied.

### 8.4 Scroll
Runway 1300svh; 7 captions; `CUT = [0.05, 0.16, 0.27, 0.39, 0.52, 0.64, 0.77, 0.9]`. Camera keys: `hero, tape, screen, desk, meters, paper, recap, shelf, end`. The screen shot holds until its content is on (the first version moved off before the screen filled).

### 8.5 Let's talk: the lyric sheet
In the vocal booth: the camera goes through the window to the music stand, where the form is the lyric sheet (`tb-look-lyric`). Sending turns the ON AIR light on ("You're on air").

---

## 9. Let's talk: how it works

### 9.1 `site.js` (every page)
- An IIFE, guarded by `window.__contactReady`. `CONTACT = { endpoint, email, title, intro, board, simulate }` (CONTACT-SETUP.md §1). `BASE` is the folder of `site.js` itself, so `talk/board.js` resolves from any page depth.
- **`send(data)`** adds `data.page = location.pathname` and posts JSON to the endpoint. It returns `{ kind: 'ok' }`, `{ kind: 'field', field, error }` (400 with a field), or `{ kind: 'fail', detail }` (429 → wait a minute; other → "Something went wrong on my side."; network → "could not be sent from this connection"). With `simulate: true` it waits 0.9 s and returns ok.
- **The plain card:** a modal `<dialog class="ct-dialog">` built on first use, with name, contact number, email, message, a honeypot (`company`, hidden, `tabindex=-1`), a note "Your details are only used to reply to you." and "Send message". Blur-first validation, errors clear on input, focus returns to the opener, Lenis stopped and page scroll locked while open, backdrop click closes. Success: a tick and close; failure: "That didn't go through" with the email, **Copy** and **Try again**.
- **`openAny(e)`:** `window.__talkScene.open({ config, send, opener, fallback })` if the page has a scene and WebGL works, unless it returns `false`; else `import(BASE + 'talk/board.js').then(m => m.open(CONTACT, { opener, send }))`; else (no WebGL, `board: false`, or the import fails) the plain card.
- A delegated click listener catches every `[data-contact]` (including ones added later); `window.openContact()` opens it from code.

### 9.2 `talk/surface.js` (the form for any surface)
No three.js. `createSurface(o)`:
- **Options:** `config` (CONTACT), `send`, `width` (CSS px), `mobile`, `look` (a `tb-look-*` class), `pad` (`[top, x, bottom]`), `copy` (`sentTitle`, `sentText`, optional `knob` markup for the close button), `minHeight`, `onChange(reason)` (`'state'` | `'messages'`), `onClose`, `onSent`.
- **Faces:** `form` (title, intro, name, contact number + email in a row, message with "What are you building, and where can I help?", honeypot, note, Send message, a round ✕), `sent` (a seal, `sentTitle`, `sentText`, Close), `error` ("That didn't go through", the detail, "Try again, or email me directly:", the email as a tag, Copy email, Try again). The face height is fixed to the form's measured height, so the surface never resizes between states.
- **Returns** `{ el, fw, fh, state, layout(), setState(s), reset(), focusFirst(), trap(e), destroy() }`.
- **`layout()`:** measures an untransformed copy in an off-screen host and returns, in CSS px from the face's top-left: `texts` (every `[data-paint]` element: `kind` = title / intro / label / msg / note, `glow`, `words: [{ w, x, y, h }]`, `size`, `font(k)`, letter spacing), `fields` (the input boxes), `seals`, `buttons`. The page paints these into its own texture in its own style; the live element (`.tb-live`, whose painted words are transparent) sits exactly over it in a `CSS3DObject`, so typing, focus and caret are real.
- `drawWords(ctx, t, k, fn)` is a shared helper for painting a text block at scale `k`.
- Typed values survive closing and reopening (cleared after a successful send). Validation matches the server. `elapsed` is sent for the timing check.
- **Looks in use:** `tb-look-particles` (hero), `tb-look-letter` (beach), `tb-look-glass` (Reddit), `tb-look-print` (Press), `tb-look-paint` (SEO), `tb-look-kiosk` (city), `tb-look-order` (greenhouse), `tb-look-lyric` (studio). The board uses its own markup.

### 9.3 `talk/board.js` (the hanging board)
- Its own three.js 0.169 scene in a full-screen overlay (`.tb-root`, z 2147483000): a `WebGLRenderer` canvas, a `CSS3DRenderer` layer for the live form, and a veil that blurs and dims the page (`backdrop-filter: blur(11px) brightness(.74)`) over 1 s.
- A weathered plank board (Poly Haven **wood_shutter**, 2k colour and normal, 1k roughness; weathered grey-brown tint) hanging on **brass chains** (chain links from **brass_diya_lantern**, `chain.json` + brass textures), lit by a `RoomEnvironment`. It drops in and swings to rest.
- The form is baked into the wood: words burned into the grain, fields carved in, brass buttons; "Message sent" (`data-bake data-glow`) glows.
- `open(config, { opener, send })` / `close()`. Loaded only on the first click. If it fails, site.js uses the plain card from then on.

### 9.4 `api/contact.js` (the function)
CommonJS `module.exports = async (req, res)`, `Cache-Control: no-store`.
1. `POST` only (405 otherwise); origin check (`ALLOWED_ORIGINS` list, or same host; 403).
2. Parse JSON. **Honeypot** (`company`) filled or `elapsed < 1500` → 200 `{ ok: true }` and nothing sent.
3. **Rate limit:** an in-memory `Map` per IP, 60 s window → 429.
4. `check()`: strips control characters, trims, cuts to the limits (name 80, phone 30, email 120, message 1500, page 120) and validates → 400 `{ field, error }`.
5. Send with `WA_PROVIDER` (`callmebot` default → `GET api.callmebot.com/whatsapp.php?phone&text&apikey`, a reply containing "error/invalid/wrong" counts as failure; `meta` → `POST graph.facebook.com/v20.0/<id>/messages`, a template with 4 body parameters if `WA_TEMPLATE` is set, else plain text).
6. 200 `{ ok: true }`, or 502 with `[contact]` logged.

---

## 10. Asset pipeline (Poly Haven → the web)

All source assets are Poly Haven CC0, downloaded by Vasant and attached to the chat (Blender `.blend` zips and `.exr` HDRIs). The conversion scripts live in the AI workspace (`/home/claude/assets/{city,green,studio}/`), not in the repo; this section is enough to recreate them.

### 10.1 Textures (`conv_tex.py`)
- Run Blender as a Python module: **`python3 -I conv_tex.py`** (the `-I` flag stops Python importing stray files from the working folder).
- For each job `(source, out name, size, colour?)`: load the image with `bpy`, read the pixels, resize, and write JPEG (PNG for an opacity map). Colour maps are sRGB; **normal maps come from the `nor_gl` EXR** (OpenGL convention, matching three.js), roughness and metal maps are linear.
- Sizes: 1k for nearly everything, 2k for big surfaces seen up close (the city's aerial asphalt, the board's wood). File names: `<short>_{diff,nor,rough,metal}_<1k|2k>.jpg`.

### 10.2 Models (`conv_mesh.py` → `pack_mesh.py`)
1. `conv_mesh.py src dst prefix` (bpy): open the `.blend`, take each mesh object's evaluated mesh, apply its world matrix, triangulate (bmesh), and export per object and per material the positions, split normals and UVs, **converted from Blender's Z-up to Y-up** (`x, z, −y`).
2. `pack_mesh.py src dst [keep]`: de-duplicates vertices (key: position ×2000, normal ×100, UV ×4000, rounded) and writes compact JSON:
   ```
   { "<material>": { "parts": [ { "name", "lo": [x,y,z], "sc": [x,y,z], "n": vertexCount,
       "p":  base64 uint16 positions, quantised in the box lo..lo+sc,
       "nr": base64 int8 normals (×127),
       "uv": base64 int16 UVs (×8000, range −2..3),
       "i":  base64 uint16 indices (uint32 when n > 65535, flagged "i32": true) } ] } }
   ```
3. In the page, `loadPacked(file)` fetches it, decodes with `atob` (`b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0)).buffer`) and builds one `BufferGeometry` per part; materials come from the matching textures (`mm(key, base, { metal })`).
- Files: `city/lamp_p.json`, `seating_p.json`, `fire_p.json`; `greenhouse/potted_plant_04_p.json`, `wooden_picnic_table_p.json`, `watering_can_metal_01_p.json`; `studio/metal_office_desk_p.json`, `modern_arm_chair_01_p.json`, `Television_01_p.json`, `boombox_p.json`; `talk/chain.json`.

### 10.3 HDRIs (`conv_hdr.py`)
- Load the EXR with bpy, flip to top-row-first, find the sun as the brightest point of a blurred luminance map (stored as `sun: [u, v]`).
- **Lighting copy:** resize to 512×256 and pack as **RGBE** (shared exponent per pixel) → `{ w, h, sun, d: base64 }` JSON (`sky_env.json`, `studio_env.json`). Decoded in JS to a `HalfFloatType` `DataTexture`, then `pmrem.fromEquirectangular`.
- **Visible backdrop** (greenhouse only, `conv_sky2.py`): 2048×1024, scaled by `k = 1/98th-percentile`, clipped, sRGB, JPEG q88 (`sky_2k.jpg`); the shader undoes `k` (`SKYK`).
- Studio: the colour was desaturated and warmed in the conversion (§8.1).

### 10.4 Sources used
| Page | Poly Haven assets |
|---|---|
| Home | mud_forest, aerial_beach_01, damp_beach_sand_02, aerial_rocks_02, crepe_satin (rocky_terrain_03 sent, unused); bark/leaves from EZ-Tree |
| Board | wood_shutter, brass_diya_lantern (chain) |
| City | aerial_asphalt_01, asphalt_02, brick_pavement_02, anti_slip_concrete, brick_wall_10, street_lamp_02, modular_street_seating, modular_fire_escape |
| Greenhouse | spruit_dawn (HDRI, chosen by Vasant from two options), wood_planks, potted_plant_04, wooden_picnic_table, watering_can_metal_01 |
| Studio | ferndale_studio_05 (HDRI), metal_office_desk, modern_arm_chair_01, plastered_wall_04, floor_tiles_06, Television_01, boombox |

The Reddit, Press and SEO pages use no downloaded assets.

---

## 11. Shared conventions

**Colour tokens** live in `:root` on every page (`--bg, --ink, --ink-soft, --ink-mid, --pill, --pill-ink, --line, --card`, plus the page's accents, `--font`, `--mono`, `color-scheme`):

| Page | bg / ink | Accents |
|---|---|---|
| Home | `#0d0d0d` / `#f1f1ee`, soft ink `#8a8b90`, pill `#1a1b1e` | forest and beach colours in the `MOOD` / `BEACH` / `DUSK` objects; hero line mint `#a6dfd3` → blue `#5B9BF6` |
| Reddit | `#0d0d0d` / `#f1f1ee` | mint `#a6dfd3`, blue `#5B9BF6`, pink `#FF8FD0`, amber `#ffb454`, reddit orange `#ff6a3d` |
| The Press (light) | `#efe9df` / `#1c1a17` | Webflow blue `#4353ff`, coral `#e8553d`, brass `#b8924a`, graphite `#2d2c2b` |
| SEO gallery | `#12201b` / `#efe8da` | gilt `#c9a24a`, P0 `#d9483b`, P1 `#e8a33d`, pass `#7cc29a`; `--serif` Fraunces |
| City | `#0b0f15` / `#eef2f6` | amber `#ffb454`, cyan `#5fe0d0`, lilac `#b6a3ff`, red `#ff5a4f`, green `#4ade80`; lines: inbound `#ff8a1f`, outbound `#3d86ff`, also read `#ffcf8a` |
| Greenhouse | `#110e0b` / `#f4eee6` | amber `#f2b45a`, leaf `#8fc56b`, red `#e8644f`, green `#7fd17a` |
| Studio | `#0e0c10` / `#f3eee8` | amber/host `#ffb15a`, guest `#5fd4c4`, red `#ff5a4a`, green `#6fd88a` |

No two automation pages share a world.

**Type:** Elms Sans weights 100–900; headings weight 500 with tight tracking (−0.02 to −0.035 em); labels uppercase 12–13 px with 0.08–0.1 em tracking. The footer name is weight 800. Banner text is drawn on canvas at weight 700. Caveat (500/700) for handwriting in the greenhouse and studio. Monospace for node types and code.

**Motion rules:**
- scroll scrubs position, time drives idle motion; all per-frame easing is `dt`-based
- big moments ease toward the scroll and never snap on a wheel tick
- the testimonial lanterns are **scroll-only**, by request
- `prefers-reduced-motion` slows the machines, disables the cursor, smooth scroll and reveal animations, makes the camera settle faster, and makes the Let's talk transitions instant

**Accessibility:** a visually hidden `<h1>` describes each automation page, and the home keeps its card list for screen readers. Captions are real text, pills have focus rings, and the cursor never replaces the native pointer. Every Let's talk form is real HTML (labels, `aria-invalid`, `aria-describedby`, `role=dialog`, `aria-modal`, focus trap, Escape to close, focus returned to the button).

**Content rules:** no internal identifiers, credentials, webhook URLs, channel names, sheet names, workflow names, colleague or writer names, real post titles, domains or the internal Notion link; competitors and authors are placeholders. No public input forms on the site (Let's talk is private: it only goes to Vasant's WhatsApp, and no world ever displays what a visitor typed once it is sent). No trademarked logos or characters as artwork. **The WhatsApp number never appears in the code.**

**Coding gotcha (hit three times):** never append a `// comment` in the middle of a line when patching minified-style code. A trailing comment swallows everything after it on that line: it hid the greenhouse order pad's paper (`g.add(paper)`), stood the studio printer's sheet upright (`pg.translate` / `rotateX`) and hid the journey sign (`scene.add(m)`). Put comments on their own line or at the true end.

**Source of truth:** the three newest pages are built from source parts in the workspace (`/home/claude/assets/<city|green|studio>/part1.html` + `shared.css` + `part2.js`, the studio's `part2.js` assembled from `head.js` + `body.js` + `tail.js`) by `build.py`, which writes the final page into `automations/`. Patch the source parts, not only the built page, or the fix is lost on the next build. If the workspace is gone, the built page in the repo **is** the source.

---

## 12. QA harness (not shipped; lives in the AI workspace scratchpad `qa/`)

Playwright launches headless Chromium with `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist`, usually with `reducedMotion: 'reduce'` so transitions settle quickly. Pages load from a local static server: `cd repo; nohup python3 -m http.server 8765 --bind 127.0.0.1` (it stops when background commands time out; restart it).

The sandbox can't reach jsDelivr or Google Fonts, so requests are routed:
- `three@0.169.*` → `node_modules/three169` (npm `three@0.169.0`), `three@0.158.*` → `node_modules/three` (npm `three@0.158.0`)
- `lenis@*` → a local `lenis.min.js` from npm `lenis@1.1.13/dist`
- `fonts.g*` → an empty body
- `/api/contact` → `{"ok":true}` (or a mock that fails, to test the error face)

**Screenshots therefore use fallback fonts, not Elms Sans**, and the fps readout (0–3 fps) means nothing. Compare triangles and JS ms instead, and ask for real fps on Vasant's machine.

**Scripts** (environment variables drive them):
- `shoot.js LABEL W H targets…` (home): targets `key=N`, `s=N`, `card=N`, `title=N`, `y=N`; `night` in the label for night mode; `phone…` for mobile.
- `keys.js`: prints all runway keys and page errors. Run after every edit to catch syntax errors.
- `click.js`, `back.js`, `ret.js`: card clicks, the back arrow and the return-to-card.
- `city.js`, `gh.js`, `st.js` (and the older per-page ones): `V=w,h,tag,mobile` viewport, `P=0,0.1,…` runway progress values to shoot, `WAIT` seconds per shot, `BOOT` seconds to wait first, `EVAL` an expression to print. They load the page with `?snap`.
- `citytalk.js`, `ghtalk.js`, `sttalk.js`, `seotalk.js`, `pagetalk.js`, `herotalk.js`, `hoodtalk.js`, `beachtalk.js`, `board.js`, `form.js`: open Let's talk, fill the fields, send, screenshot each state, close.
- `intro.js`: the Press intro, frame by frame (`window.__freezeIntro`).
- `cspserve.py dir port`: a static server that adds the artifact preview's Content-Security-Policy, to test a preview copy before publishing (`citycsp.js`, `b3csp.js`).

**Checks before every hand-over:** desktop 1440×900 (or 1280×720) and phone 390×844, every caption, the runbook, Let's talk open/sent/closed, no page errors, no 4xx requests.

**Gotchas:**
- `pkill -f` with a pattern that appears in your own command kills your shell.
- `page.route` plus a click-navigation can hang; check that the navigation request fired instead.
- SwiftShader draws the UI captions a frame or two late in screenshots; it's an artefact, not a bug.

## 13. Claude artifact previews

Previews are private Claude artifacts. They are copies; **the repo files are the deliverable.**

How a page is published as a preview:
1. Copy the page and strip its first three lines (the artifact wrapper adds its own doctype and head).
2. Rewrite `../site.js` → `site.js`, `../talk/surface.js` → `./talk/surface.js`, and the back link → `#top`.
3. Copy `site.js` with `simulate: true` (previews have no `/api/contact` and block outside requests).
4. Publish with a files map and `root`, so `site.js`, `talk/surface.js` and the page's asset folder (`city/…`) are served next to it.
5. The preview's Content-Security-Policy is `connect-src 'self'`: never `fetch()` a `data:` URI. Packed models are separate files fetched from the same origin and decoded with `atob`.

| Preview | Link |
|---|---|
| Webinar to Webflow (studio) | `claude.ai/artifact/HG9oAuutrDeNuMnJfKzZsp` |
| AI Blog Drafts (greenhouse) | `claude.ai/artifact/GJVspZR6XrdBRRXKzVrfxW` |
| Auto Internal Linking (city) | `claude.ai/artifact/M2JRL5Yem1Jstm1e7n9kv3` |
| Full site with the Let's talk worlds (23 Oct) | `claude.ai/artifact/1FhbVuL6rbFqpKCKYsd6H2` |
| Talk Board (approved board look) | `claude.ai/artifact/LiSmo123P7r6Nw3zSj1XbT` |
| Opening Night (SEO) | `claude.ai/artifact/Y1vrHMnTTGbbKhuaHVhpbq` |
| Let's Talk Form (v50 plain card) | `claude.ai/artifact/Rc6LR37mQcEf8FrVLKRoLE` |
| The Press | `claude.ai/artifact/BXLNrytTFRESRy94hZfsro` |
| Home v45 | `claude.ai/artifact/XY8JbBbjVtt12NQNARJT5Z` |
| Older (out of date) | home `7WNoJjkBGnWR66LqTveksU`, Reddit `NGZmASBaUwTbBicviNX19F`, automations doc `SjAqh3swBonUVatCXyhBmB`, concept labs `UR29NwRVKufa7hBMvsH8pL`, `MzHJcDLao1D6XTzEe7ekLt` |

---

## 14. Version history (tags)

**Home, first sessions (old working repo):** `v4-outline-name, v5-morph-name, v6-letter-by-letter, v7-ribbon-pour, v8-thread, v9-stream-slider, v10-deck-showcase, v11-dissolve-rain, v12-glass-title, v13-funnel, v14-simple-rain, v15-persistent-field, v16-hoodie-palette, v17-responsive, v18-content, v31-thread-exit`.

**Home, forest and beach (current repo, most with `backups/index-<tag>.html`):**
- `v32-forest-wip`: three.js forest walk, CSS3D cards, chapter titles, counter; thread and decks removed
- `v33-forest-real`: EZ-Tree trees, bark/leaf textures, mud ground, moonlight and shadows, billboards, turning camera, fireflies, grain
- `v33.1-less-fog`, `v33.1-night`: less and darker fog, far-tree silhouettes, titles fade before you pass
- `v34-evening`: low warm sun, long shadows, sun shafts, amber haze, winding path, re-bake after textures load
- `v35-daynight`, `v35.1-fixes`: softer forest sun / full at the cliff, day/night switch, moon, titles wait for the rain, falling leaves
- `v36-smooth`: Lenis, one frame loop, portrait off in the forest, texel-snapped shadows, warm-up, cheaper LOD, `?fps`, tilt, arrow keys
- `v36.1-night-shadows`: softer and bluer moon, far trees cast shadows
- `v36.2-steady-leaves`, `v36.3`, `v36.4-reverted-to-v36.1`: brightness experiment, rejected and reverted
- `v37-trees-ready`: full trees about 7 cards ahead
- `v37.1-fps`: shadow redraw on 4 m steps, off-view trees skipped
- `v37.2-no-flicker`, `v37.3`: resolution-lock and exact-view experiments (rejected)
- `v38-60fps`, `v38.1-reverted-to-v37.1`: leaf-card reduction (rejected, travel less smooth)
- `v37.4`: approved forest (v37.1 + resize-before-draw + near trees never skipped)
- `pre-beach`, `v39-beach`, `pre-beach-v2`
- `v40-beach-real`: real sand, rock, headland, waterfall, lanterns, satin banners, form removed, footer email and city, Reddit link
- **`main-version-v40`** = `bffe487` (the first locked main; also `backups/index-MAIN-v40.html`)
- `v41-lantern-flight`, `v42-one-lantern`, `v43-lanterns-away`, `v44-card-text`
- `v45-reddit-link` = **`main-version`** (`f329252`, moved on 22 Oct in `0491e2a`)

**Since v45 (22–24 Oct):**
| Tag | Commit | What |
|---|---|---|
| `pre-press` | | before The Press |
| `press-v1` | 1a8efb2 | The Press preview: paper studio, two-key lever, block stack, indexing belt, stamp; full runbook. Not linked yet |
| `press-v2` | 32051f4 | Notion board start, reference rack, bind and file into the CMS cabinet with DRAFT ribbon, write-back flaps, receipt, end blur; story copy |
| `press-v2.1` | 6998562 | end text clears the header |
| `press-v3` = `v46-press-link` | 1a0da08 | Inky and the ink-bottle intro; Press back arrow to the forest card; home card opens the page |
| `press-v4` | 5a1a1f5 | intro shows only the bottle, then an ink wipe; slower lever; ink tokens and blue plates |
| `press-v4.1` | 463082b | intro keeps the page at the top |
| `v47-back-to-card` | 49ae2b8 | Reddit back arrow returns to the forest at its card |
| `pre-seo` | | |
| `v48-no-loader-back` | fd8050e | no loader coming back; real browser back from home; no history entries for in-page links |
| `seo-v1` = `v49-seo-link` | 2beea60 | SEO page (Opening Night); home card and Press next link wired |
| `seo-v2` | 6ea6ec3 | close-up visits, poster light, lectern in the back room, one typeface |
| `seo-v2.1` | a1863b1 | catalogue on a book rest |
| `v50-contact-form` | 884faa0 | shared Let's talk form → WhatsApp (site.js, api/contact.js, CONTACT-SETUP.md) |
| `pre-v50.1`, `v50.1-talk-label` | 15ec6cc | stray backslash in the Let's talk button |
| `pre-seo-talk`, `talk-seo-v1` | 28c081b | `talk/surface.js`, `talk/board.js`, SEO commission painting, the hand-off order in site.js |
| `pre-press-talk`, `talk-seo-v1.1` | f8cc827 | painting label in Elms Sans, plain-form fallback |
| `pre-reddit-talk`, `talk-press-v1` | eece7c7 | Press drawing board, Inky stamps RECEIVED |
| `pre-hero-talk`, `talk-reddit-v1` | b9353ac | Reddit glass thread card |
| `pre-beach-talk`, `talk-hero-v1` | 86e6968 | hero particles → form; the router; scenes can decline |
| `talk-beach-v1` | 9fa021a | beach bottle and letter |
| `talk-all-v1` | 371fa18 | forest board wood colour |
| `pre-v51`, `v51-lets-talk` | 67e9beb | all worlds' Let's talk together |
| `pre-v51.1`, `v51.1-hood-form` | 09105f8 | hero form takes the hoodie colour |
| `pre-linking` | | |
| — | 6376ce8 | city look test |
| — | 1ddee82 | inbound/outbound, done messages, the board's three tabs, phrase tags, ticket machine |
| `pre-linking-home`, **`v52-linking`** | d157f6f | home card opens Auto Internal Linking |
| `pre-drafts` | | |
| — | 196ccd3 | greenhouse look test |
| `pre-drafts-fix1` | 2a0af76 | ledger from above, order pad restored |
| `pre-drafts-home`, **`v53-drafts`** | 0d7821f | home card opens AI Blog Drafts; tag reads Claude |
| `pre-webinar` | | |
| — | 6e0a548 | studio look test |
| `pre-webinar-fix1` | 1572bce | journey strip and sign, Doc writing on screen, readable print, Conversation and CMS screens, record from the cabinet |
| `pre-webinar-home`, **`v54-webinar`** | 61f1173 | home card opens Webinar to Webflow. **Current** |
| `pre-docs`, `v55-docs` | | these docs |

`v52-linking`, `v53-drafts`, `v54-webinar` and `pre-docs` were added on 25 Oct to mark the approved states that had only `pre-*` tags.

**Reddit page:** `auto-reddit-v1` → `v2` (CDN fix, early captions) → `v3` (bloom, env, atlas cards, sparks, runbook) → `v3.1` (panel z-fight) → `v4` (ridge, haze, fog) → `v4.1` (stars, shooting stars) → `v5` (water + mist) → `v6` (Slack window, five alerts) → `v6.1` (perf) → `v7` (courier, plain labels) → `v7.1` (seen-gate label) → v45 (doctype, viewport, back link, mailto) → v47 (back to card) → v48 (history back) → v50 (shared form) → talk-reddit-v1.

**Backups** (`backups/`, working repo only): `index-*.html` for most home versions and `index-pre-vNN.html` before changes (to v50), `index-MAIN.html`, `index-MAIN-v40.html`, `forest-MAIN/`, `notion-to-webflow-press-v1…v4.html` and `-pre-v48/-pre-v50`, `reddit-keyword-alerts-pre-v45/v45/pre-v47/v47/pre-v48/pre-v50`, `seo-pre-live-checks-v1/v2/pre-v2/pre-v50/.pre-talk`. From the city on, git tags are the backups.

---

## 15. Adding the next automation page

1. **Concept first.** Offer 2–3 worlds with a recommendation and wait (or, if Vasant says "go with your pick", explain the chosen scene and wait for approval). It must not repeat any existing world (the table in DOCS.md §4), should be realistic like the forest, and needs a Let's talk that belongs to it.
2. **Assets.** List the Poly Haven assets you'd like (textures, models, an HDRI) and ask Vasant to send them; convert with §10. If something isn't sent (like the mic and cassette for the studio), build it in code and say so.
3. **Copy the template** (§2): doctype and viewport, the UI script with `CUT`, `__stage`, the back-link/history logic and in-page link handler, the import map (three@0.158.0), the runbook skeleton, the Let's talk `talk` object, the butterfly, `../site.js` last. Back mark → `../index.html#from-<slug>`.
4. **Content** comes from Vasant's runbook for that automation. Keep only cleared facts: no keys, webhook URLs, credential names, internal IDs, channel/sheet/workflow names, people's names, real post titles, domains. Write a "left out on purpose" note under the TOC. No invented metrics.
5. **Build in stages:** a look test of the world first, show screenshots (desktop + phone), then the full story, then fixes. Back up (tag `pre-<name>`) before each change.
6. **Wire it:** add the page (and its asset folder) under `automations/`, set `url: 'automations/<page>.html'` on the matching `AUTOMATIONS` entry in `index.html`, and set the previous page's "Next automation" link if Vasant wants it.
7. Review at 1440×900 and 390×844, publish the preview artifact (§13), deliver the files (page, asset zip, `index.html`), and tag the version.

---

# Part D. Let's talk → WhatsApp setup (CONTACT-SETUP)

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

---

# Part E. Deploy checklist

1. Back up and tag in the working repo.
2. Hand over only the changed files (plus a zip for any new asset folder) and say where each goes. Vasant uploads them to GitHub with "Add files via upload", keeping the folder structure:
   - root: `index.html`, `site.js`, `vercel.json`, the `.md` docs
   - `api/contact.js`
   - `talk/*`
   - `automations/*.html`, and the folders `automations/city/`, `automations/greenhouse/`, `automations/studio/` (unzipped **inside** `automations/`)
   - `forest/*`, `portrait/*`, and `thumbs/*` (his)
3. Vercel deploys automatically. `cleanUrls` serves `/automations/<page>` and redirects the `.html` links.
4. Contact form: the env vars in Part D are set once; redeploy after changing them.
5. Spot-check on the live site:
   - the hero loads (counter reaches 100) and Let's talk at the hero makes the particle form
   - the forest appears after the rain; cards are clickable when facing; Let's talk in the forest drops the board
   - each automation card opens its page; each page's back arrow returns to its card with no loader
   - on each automation page: the captions, the runbook, Let's talk (its own form), a test send
   - the fall, the beach lanterns, the bottle Let's talk, the footer stars and name
   - the day/night toggle
   - the phone layout
6. Send yourself one real test message from the live site after any change to `site.js`, `talk/` or `api/`.

---

# Part F. Timeline of Vasant's requests

## F.1 Session of 17–19 Oct (first sessions, summarised)
Concept labs and the first home page: outline-name and morph-name heroes (rejected), the pink thread, three shuffling decks, the dissolve-to-rain hero, the hoodie palette, responsive pass, content (`v4` … `v18`, `v31-thread-exit`). The Reddit Keyword Alerts page `auto-reddit-v1` … `v7.1`. The automations doc artifact. (Full detail lived in the old working repo.)

## F.2 Session of 20–22 Oct

**Building the forest:**
1. "read this documentation entirely", then: a forest scene for projects. Travel into the screen, messages per category, cards coming toward the user, forest moving outward; reference screenshot; Spline/three. Ask about skills first; "build only on my command".
2. Cards left and right, clickable transition; "pink thread drop it"; asked what the counter was. End with a waterfall cliff and a fall to the footer.
3. Keep the counter bottom-left, changing with scroll. Then: "nothing is visible" (fixed).
4. The forest was too basic and too green: wanted the camera turning to the cards, only 5–10 lights, realistic trees. Gave Poly Haven files (mud_forest), then "go".
5. "excellleeeeennttttttttt work !!!!" but too foggy, and distant trees looked like an x-ray.
6. Warmth like 6–7 pm, not sunny; back up first; less grainy texture; distant leaves loading; path turns.
7. Sun too strong on the left inside the forest, full at the cliff; dark/light toggle.
8. "cool you nailed it"; asked about improvements and "how lusion is soooooo smooth".
9. Do the improvements, plus: the moon missing at the end, the Webflow title too early, the particle→forest link (suggest), leaf fall instead of light bugs in light mode, the forest→footer connection (suggest only).

**Lighting and performance:**
10. Night too bright/white; shadows should load at the start.
11. Leaves shifting; light mode too dark → brighten both → "no revert the brightning part because i could see the shadows shift" → "revert to this point" (v36.1).
12. Stop the leaf shift; lock main; trees till card 7 ready; fps dropped.
13. Flicker entering personal projects; fps low; "whats the current frame rate ?? ans this before you work"; wants 60 fps throughout (the hero is 60, the forest about 30).
14. Camera travel not smooth → revert to v37.1 → "not the right version" → "no this is worse… flicker for every scroll" → settled on v37.4. "give me the files to push into github".

**The beach:**
15. Beach idea for testimonials after the fall (ideas only) → lanterns chosen, with dummy testimonials ("use your picks").
16. Beach v1 feedback: waterfall and sand not real; remove the fire/flame thing; realistic lanterns; beach start looks square; mountain disconnected; remove the feedback box; banners on lanterns with cloth unfolding in the wind; list the Poly Haven files first; email/city; Reddit card not linking; "only start working on my command".
17. Sent the sand/rock/terrain zips ("select the wet one"); a hot-air balloon idea was considered, then "lets keep laterns"; sent crepe satin; "if its lantern it should work on scroll only"; "go".
18. "testimonial cards are very close to the user… backup this as the main version" (v40 = main-version, now `main-version-v40`).

**Lantern refinements:**
19. Combine all three: camera back, banners over the water, lanterns rising higher, unrolling, scroll-linked flight to a gathering point (v41).
20. One lantern holding each card; don't close the cards; keep the behaviour; move it back, then open (v42).
21. Card lanterns disappear at a point, only blank lanterns go to the sky; he liked a lantern passing very close to the footer name and wanted that (v43).
22. Quote marks missing and card text not visible: fix those alone (v44).
23. "everything is fine, give the zip"; the Reddit card wasn't connected (v45 + zip).
24. "should i have to push all files into github ?" Answered: only the changed files, or the whole zip.
25. Asked for the complete handoff document (v45 docs).

## F.3 Session of 22–24 Oct (reconstructed from the commit log; the exact wording of these requests wasn't kept)

**The Press (22 Oct):**
26. `main-version` moved to v45; the old main kept as `main-version-v40`.
27. Build automation page 2 from his Notion-to-Webflow runbook → **The Press v1** (paper studio, two-key lever, block stack, belt, stamp, runbook) → **v2** (Notion board start, reference rack, bind and file into the CMS cabinet with a DRAFT ribbon, write-back flaps, the review receipt; story copy: writers never need Webflow, reviewers only review) → end text clears the header.
28. **Inky** (v3 = v46): the ink-bottle intro (click, spill, form, wave, hop to the press); Inky turns both keys and swings on the lever on scroll. Back arrow returns to the forest at its card; home card opens the page.
29. **v4**: the intro shows only the ink bottle, then an ink wipe opens onto the press; a slower lever (a longer approve station, eased to the scroll); ink tokens and blue plates on the match board. Then: the intro keeps the page at the top.
30. **v47**: Reddit's back arrow returns to the forest at its card too. **v48**: no loader when coming back; the back arrow is a real browser back when coming from home; in-page links don't add history entries.

**SEO Pre-Live Checks (23 Oct):**
31. **v49 / seo-v1** "Opening Night": crate from staging, live pieces skipped, measured wall label, OG poster, provenance (P0), catalogue + Article, floor-map breadcrumbs, captions (P1), robots door sign with the ad-page private room, checklist to Slack; runbook from his doc; home card and the Press next link wired.
32. **seo-v2**: the camera visits each item close up, then pulls back; the poster gets its own light; the checklist lectern inside the back room; one typeface. **v2.1**: the catalogue on a book rest.

**Let's talk (23 Oct):**
33. **v50**: a Let's talk contact form on every page that sends to his WhatsApp, with the number kept secret ("i dont wanna share my wp contact with anyone") → `site.js`, `api/contact.js`, CONTACT-SETUP.md. **v50.1**: stray backslash fix.
34. Let's talk should belong to each world: the forest's hanging board (wood colour matched to the approved preview), the SEO commission painting with a red dot, the Press drawing board where Inky stamps RECEIVED, the Reddit glass thread card riding into the alert window, the hero particles becoming the form, the beach bottle and letter. **v51**: all together. **v51.1**: the hero form takes the hoodie colour.

## F.4 Session of 23–25 Oct (his messages, close to verbatim)

**Auto Internal Linking (23 Oct):**
35. Build the next page from his runbook → a look test of the night transit city.
36. With his sheet screenshots: "see we have two type of linking inbound and outbound lets say orange lights are inbound and blue lights … need to explain the linking much more once the orange lights connect then inform inbound linking done as a msg comes and disappears on scroll and then diff color light connects inform other linking done i mean outbound linking and then what explains in ss1 and sharing the Original sheets ss 2 3 4 check that and expalin it visually and lets talk is not related to the world fix it" → orange inbound / blue outbound lines, done messages, the departure board with the sheet's three tabs, phrase tags, ticket-machine Let's talk.
37. "okay give me the html file" · "should push city folder into automations folder ?" (yes) · "okay give the index.html file which has linked the internal linking on forest" (v52-linking).

**AI Blog Drafts (24 Oct):**
38. "lets build next one AI Blog Drafts", with the runbooks for two writers: "these both are blog generators only diff is each has a diff authours writing style so we can say that we can turn this up for anyone with thier writing skill file and dont mention name <writer names> and all be generic before building first explain me the scene after my approval start building" → then "go with your pick itself".
39. HDRI screenshots + asset zips: "select which one from the first two ss rest added files"; then sent spruit_dawn_4k.exr. Assets: potted_plant_04, wooden_picnic_table, watering_can_metal_01, wood_planks.
40. "the book on table is not visible make the camera to straight upwards for the book alone so that contents on the books gets visible and also the lets talk content is not visible since its white paper isnalso white change the text colour and make it visible" → ledger from straight above; order-pad sheet restored with darker ink.
41. "give the files to push to github" (v53-drafts; the card's tag reads Claude).

**Webinar to Webflow (24 Oct):**
42. "lets build next Webinar → Transcript → Webflow Recap …" with the full runbook (the Supadata key, Webflow IDs, credential names and the host's name redacted).
43. Asset screenshots + desk, armchair, plaster, tiles, the Ferndale EXR: "there is no mic headphone speaker which one to pick"; then sent the Television and boombox zips. (Mic and cassette built in code.)
44. With screenshots: "ss1 this white screen before it comes the camera moves out of it so user cant see it and also i want more detailaing to show user that transcript is generated this is also not clearly visible to the user ss2 / ss3 there is some correction tha card comes wrong from the box its not coming from in the box and its coming from out of box / give more detailing to convey that out of yt video transcript is generated and then the user gets transcript doc and then from that there is a process of converting it into webflow conversation and pushing it to webflow cms" → journey strip and wall sign, the Doc written on screen, readable print from above, Conversation and CMS screens, the record rising out of the cabinet.
45. "give files" (v54-webinar).

**Docs (25 Oct):**
46. With a screenshot of the repo: "give me the full updated docs on these docs it cover everything everyyyyy single things and allllllll dont miss anything" → these six documents (v55-docs).

---

# Part G. Suggested first message for a new chat

> I'm continuing my portfolio (Vasant Suraj, github.com/VasantSuraj/portfolio). Attached: PORTFOLIO-HANDOFF.md (read all of it first) and my repo files (or the history zip with the git tags). Current version is v54-webinar. Don't build anything until I say. [Then the request, e.g. "next automation page: Video to Blog, here is the runbook".]
