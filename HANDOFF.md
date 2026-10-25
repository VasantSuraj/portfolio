# HANDOFF — read this first if you are continuing the work

_For a new collaborator or a new AI session. Updated 25 Oct 2026, current version **v54-webinar** (`61f1173`), docs **v55-docs**._

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
