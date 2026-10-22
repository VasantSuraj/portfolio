# HANDOFF — read this first if you are continuing the work

_For a new collaborator or a new AI session. Updated 22 Oct 2026, current version **v45-reddit-link**._

Read in this order:
1. `HANDOFF.md` (this file)
2. `DOCS.md`: what the site is
3. `BUILD.md`: how it is built
4. the code itself: `index.html`, `automations/reddit-keyword-alerts.html`

`PORTFOLIO-HANDOFF.md` has all of it in one file, plus the full request timeline. The code is the source of truth; the docs explain it.

---

## 1. Who and what

- **Owner:** Vasant Suraj, Senior Webflow Lead Developer at Factors.ai, who also builds n8n automations. The site is his personal portfolio. Contact on the site: vasantsuraj02@gmail.com · Bangalore.
- **Goal:** an award-level portfolio (Lusion / Igloo / Bruno Simon tier). Scroll-driven, highly interactive and 3D, built only with free tools, with very little text ("the design should speak").
- **Live:** the home page and one automation page (Reddit Keyword Alerts). Repo `github.com/VasantSuraj/portfolio`, deployed on Vercel (`cleanUrls`). Development happens in Claude sessions with artifacts as previews; the repo files are the deliverable.
- **Home journey now** (DOCS.md §3 has the detail):
  1. particle portrait
  2. rain
  3. **3D projects forest** (walk into the screen; cards left and right; three chapters)
  4. **cliff and fall** beside a waterfall
  5. **beach "Kind words"**: each testimonial is one paper sky lantern carrying a satin banner, scroll-driven
  6. **dusk → stars → footer name**, with lanterns rising past it

## 2. How Vasant works (follow these)

1. **Concepts before code.** For anything new, give 2–3 distinct concepts with a recommendation and wait for his pick. He will say "go", choose a number, or say to build.
2. **"Don't build until I say."** When he asks for ideas or says "only start on my command", only propose. Respect this strictly.
3. **Show early.** Build the first part, show renders (desktop 1440×900 and phone 390×844), then continue. He reviews from screenshots, often his own with the cursor on the problem, and gives short, specific notes.
4. **Back up before every change.**
   - Copy to `backups/index-pre-vNN.html`, commit, and tag each approved state `vNN-name`.
   - He expects an instant revert ("revert to this point", "revert only that").
   - **"Revert to main version" = the git tag `main-version`.** It still points to **v40** (`bffe487`), the beach as he first locked it. v41–v45 were approved since ("everything is fine" at v45), but the tag was never moved. **Ask before acting whether he means v40 or wants v45 to become main.**
5. **Only the requested change.** "Only these changes", "fix those alone": touch nothing else. Mention other issues instead of fixing them.
6. **Smoothness is non-negotiable.** Quote: "smoothernesss is more important". Smooth camera travel beats a higher frame rate, and a small flicker is more tolerable than heavier scrolling. He wants 60 fps throughout (the hero is 60, the forest was about 30–45). Reduce cost before adding anything.
7. **Lighting:** "brighter" changes were rejected twice (shadows shifted, night too white). Change lighting only on request, in small steps.
8. **No repeats across pages.** Each automation page must have its own world, palette, props and motion language.
   - Page 1 is dark / water / night.
   - Page 2 must not be dark, and must not reuse water, stars, gates, courier cards or a Slack window.
   - Type and UI chrome (Elms Sans, pills, captions, runbook layout) stay the same so it reads as one portfolio.
9. **Keep it simple when in doubt.** He prefers one clear mechanism done smoothly over several clever ones.
10. **Security of content.**
    - Automation docs are internal company material: only cleared summaries.
    - Never include API keys, webhook URLs, credential names, internal IDs, channel names, colleague names, real post titles or the internal Notion link.
    - Competitors are `<competitor>`, authors are `u/author`.
11. **No trademarked characters or logos as artwork.** A particle Reddit logo was requested and declined; use original props instead.
12. **No public input on the site.** He removed the feedback form ("what if someone random adds a wrong msging"). He curates the testimonials himself.
13. He writes quickly and informally, so read for intent:
    - "latern" = lantern
    - "the cards on the lanterns" = the satin testimonial banners
    - "fliccker" = flicker
    - "main version" = the `main-version` tag
    - "the tube" = the old pink thread (removed)
    - "monitor" = the Slack panel on the Reddit page
    - "the 03 card" = personal projects

## 3. Decisions already made (do not reopen)

**Hero:**
- Particle portrait → dissolve from the bottom up → rain. **No name in the hero**; the name is in the footer, revealed like stars.
- The hoodie colour wheel recolours the hoodie only: drawstrings stay white, no colour on skin.

**Projects forest:**
- **The thread and the three shuffling decks are gone (20 Oct).** Projects are a **3D forest walk**:
  - cards alternate left and right, and the camera turns to face each
  - the facing card is clickable (Open/Details pill)
  - a counter sits bottom-left and changes with scroll
  - three chapter titles: 01 Webflow work (5), 02 Automations (19), 03 Personal projects (3)
- **Forest look:**
  - early evening (6–7 pm), warm but not sunny, softer sun inside the forest and full strength at the cliff
  - realistic EZ-Tree trees, not green-heavy, light fog
  - falling leaves in the evening; 10 fireflies and a moon at night
  - day/night toggle in the header, remembered per visitor
- **The approved forest base is v37.4.** Resolution locking and cutting leaf cards for 60 fps were rejected.

**Cliff, beach and testimonials:**
- The forest ends at a **waterfall cliff**, and the camera falls to a **beach**. The headland carries the forest on (no square edge, no disconnected mountain). The sand, rock and satin are real Poly Haven textures.
- **Testimonials = paper sky lanterns** (not hot-air balloons), **scroll-driven only**, no flames:
  - one lantern per note holding a satin banner on a V-bridle
  - it arrives from the right, low over the water, and its banner opens about 16 m out just above the horizon
  - the banner never closes
  - it lifts away; all the notes gather high over the sea and **then vanish**; only plain lanterns go to the sky
- **Footer:** "VASANT SURAJ" letter-by-letter like stars; email vasantsuraj02@gmail.com; Bangalore; **3 plain lanterns rise close past the name** (he liked the 3D feel).

**Pages and type:**
- Automations get **separate pages**, not slide-in panels. The panel stays only until each page exists. **Reddit's card opens its page in the same tab** (made to work in v45).
- Reddit page: machine + runbook below. Courier mechanism (one card per alert, 3 s), five looping alerts, plain-text labels (no boxes), water and mist ground, ridge silhouettes, shooting stars.
- Fonts: Elms Sans (UI) with an Archivo fallback, from Google Fonts. Pangram Sans Rounded was wanted but is unavailable unless he supplies the files.

## 4. Where things are

| Thing | Location |
|---|---|
| Home page | `index.html` (one file: CSS, classic script, three.js module) |
| Reddit page | `automations/reddit-keyword-alerts.html` |
| Portrait textures | `portrait/` (colour, depth, 3-channel hood mask) |
| Forest and beach textures | `forest/` (26 files: bark, leaves, mud, sand dry/wet, rock, satin; sources in BUILD.md §0 and PORTFOLIO-HANDOFF.md §11) |
| Card data | `WORK`, `AUTOMATIONS`, `PERSONAL` arrays near the top of the first script in `index.html` |
| Automation copy (19 entries) | the `AUTOMATIONS` array: `name, cat, line, tags, one, trigger, outcome`, plus `url` when a page exists (only Reddit so far) |
| Testimonials | the `TESTIMONIALS` array (6 **samples**, `sample: true`); replace the text and set `sample: false` |
| Forest layout, runway, counter | the `forest` IIFE in the first script (`window.__forest`) |
| 3D scene, beach, lanterns, banners, camera | the `<script type="module">` (BUILD.md §1.11–1.16) |
| Card thumbnails | `thumbs/` (names in README; Vasant keeps these in his repo) |
| Versions | git tags + `backups/` in the working repo, shared as `portfolio-full-history.zip` |
| Portrait tooling | `tools/portrait.py` in the old working repo (not in the deploy folder); models u2net_human_seg and Depth Anything V2 small (ONNX) |
| QA harness | Playwright scripts in the AI workspace (not shipped); BUILD.md §4 explains how to recreate them |

The original content source for the automations is a Google Doc Vasant wrote (one section per automation: problem, trigger, steps, nodes, outcome). Ask him for it when building a new page; the array entries are summaries of it.

## 5. Next up: automation page 2, Notion to Webflow Publisher ("The Press")

The concept is approved. A scaffold (styles, UI layer, captions, runbook skeleton) was written as `auto-notion-webflow.html` in the **old** working repo. **It is not in the current files**: ask Vasant whether he has it, or rebuild it. The 3D scene is the next job.

**World:**
- a warm paper-white studio in daylight: cream background `#efe9df`, real cast shadows (directional light with shadow maps)
- a long drafting table instead of water; brass `#b8924a` and graphite machine parts; paper blocks with ink
- accents: Webflow blue `#4353ff`, coral stamp ink `#e8553d`
- no bloom; ACES tone mapping; light fog in cream; grain overlay in CSS

**Stations** (scroll holds on each, like page 1):
0. **Hero:** the Notion page as a standing stack of paper blocks (title slab, paragraph slabs, image plate, code slab, callout, list), with a big physical lever beside it on a brass base reading DRAFT / APPROVED.
1. **Approve:** the lever flips with a mechanical click and a light runs down the line. Blocks begin to peel off the top of the stack one at a time onto a conveyor (rollers and a belt with scrolling stripes).
2. **Convert:** each block passes under a stamp head that comes down and presses an HTML tag onto it (`<h2>`, `<p>`, `<ul>`, `<blockquote>`, `<pre>`, `<img>`). The top texture swaps from the Notion look to the HTML look, with a small ink splash. Image blocks get a "re-hosted" mark.
3. **Enrich:** a side forge with five slots labelled name, slug, meta title, meta description, OG image. Plates drop into the slots (scroll-staggered) and light blue when filled.
4. **Assemble:** a Webflow CMS item (a vertical panel with field rows) fills. Converted blocks slide into the Post body rows and plates into their fields; then a blue "DRAFT" ribbon drops across the corner with a bounce.
5. **End:** a paper receipt prints out of the item's base ("Draft created · preview link · posted to the content channel"), with a pull-back shot.

**Runbook sections:** Problem · Flow (Notion trigger → fetch page and blocks → convert → enrich → create Webflow draft → notify) · Mapping rules (table: Notion block → HTML) · Guardrails (idempotent on re-approval, image upload failures, slug collisions, never auto-publish) · The result (mock CMS item) · Outcome · Operating it.

Motion must be mechanical and rhythmic (beats), not flowing. Keep all idle motion time-based and the big moments scroll-driven, as on page 1. When it's done, set `url: 'automations/notion-to-webflow.html'` on that entry.

## 6. Open items, in order

1. **Real testimonials:** Vasant will send them. Replace the 6 samples and set `sample: false`.
2. **Confirm** that GitHub matches v45. The zip handed over on 21 Oct contained `index.html`, `vercel.json`, `forest/`, `portrait/` and `automations/`; the minimum change since his last push is `index.html`, the Reddit page and the 10 beach textures. Also confirm whether `main-version` should move to v45.
3. **The Press** page, then the remaining **17 automation pages**, one concept each, always offered as 2–3 options first. Set each `url`.
4. **Thumbnails** for the 5 Factors.ai pages (screenshots) and the 3 personal projects.
5. **Ideas raised earlier, not built** (suggest only):
   - a stronger particle-portrait → forest hand-over
   - more forest → footer connection (the beach and sky largely cover this now)
6. **Small known issue** (offered, not requested): while reading a later note, earlier gathered cards can peek briefly at the top edge.
7. **Replace the slide-in panel** entirely once every automation has a page.
8. **Tidy-ups only if asked:**
   - stale CSS from the deck era (`.band`, `.card`, `.frame`) and the outdated top CSS comment
   - unused particle uniforms from the thread
   - "Next automation" links on the Reddit page are `#`
9. **Done since 19 Oct:**
   - footer real email and city, and the star-name reveal
   - Reddit card wired to its page
   - footer name treatment (letters arrive like stars)

## 7. Known constraints of the sandbox used so far

- **Network:** the AI workspace couldn't reach factors.ai (hence no thumbnails), Google Fonts or jsDelivr from the shell. Tests used local copies of three.js and Lenis and fallback fonts, so screenshots don't show Elms Sans. Hugging Face was also unreachable (models came from GitHub releases). The browser-side CDN loads work fine on the live site.
- **Rendering:** the sandbox renders on the CPU (SwiftShader), so it can't measure real fps; ask Vasant to open the page with `?fps`.
- **The git repo with tags lives only in the AI workspace,** which is temporary. It is handed over as `portfolio-full-history.zip`; bring that file to a new session to keep "revert to …" possible.

## 8. Artifact links (Claude)

- **Current home preview:** `claude.ai/artifact/XY8JbBbjVtt12NQNARJT5Z`. Version 25 = v45; it includes the Reddit page as a published file.
- **Older previews** from the first sessions (out of date): home `claude.ai/artifact/7WNoJjkBGnWR66LqTveksU` · Reddit page `claude.ai/artifact/NGZmASBaUwTbBicviNX19F`.

These are private previews; the repo is the deliverable.
