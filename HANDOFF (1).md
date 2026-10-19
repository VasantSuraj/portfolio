# HANDOFF — read this first if you are continuing the work

_For a new collaborator or a new AI session. Read in this order: HANDOFF.md (this) → DOCS.md (what the site is) → BUILD.md (how it is built) → the code itself (`index.html`, `automations/reddit-keyword-alerts.html`). The code is the source of truth; the docs explain it._

---

## 1. Who and what

- **Owner**: Vasant Suraj, Senior Webflow Lead Developer at Factors.ai, also builds n8n automations. The site is his personal portfolio.
- **Goal**: an award-level (Lusion / Igloo / Bruno Simon tier), scroll-driven, highly interactive 3D portfolio, built only with free tools, with very little text ("the design should speak").
- **Live**: home page and one automation page (Reddit Keyword Alerts). Repo: `github.com/VasantSuraj/portfolio`, deployed on Vercel. Development happened as Claude artifacts; the repo files are the current state.

## 2. How Vasant works (follow these)

1. **Concepts before code.** For anything new, give 2–3 distinct concepts with a recommendation and wait for his pick. He will say "go" or choose a number.
2. **Show early.** Build the first station / hero, show a render, then continue. He reviews from screenshots and gives short, specific notes.
3. **Back up before every change.** Every approved state gets a git tag and a copy in `backups/`. He expects instant revert.
4. **No repeats across pages.** Each automation page must have its own world, palette, props and motion language. Page 1 is dark / water / night; page 2 must not be dark, must not reuse water, stars, gates, courier cards or a Slack window. Type and UI chrome (Elms Sans, pills, captions, runbook layout) stay the same so it reads as one portfolio.
5. **Keep it simple when in doubt.** Many elaborate hero ideas were rejected (see DOCS.md §7). He prefers one clear mechanism done smoothly over several clever ones.
6. **Smoothness is non-negotiable.** If a change makes scroll feel heavier, he will say so; reduce cost before adding anything else.
7. **Security of content.** Automation docs are internal company material. Only cleared summaries. Never include API keys, webhook URLs, credential names, internal IDs, channel names, colleague names, real post titles or the internal Notion link. Competitors are `<competitor>`, authors are `u/author`.
8. **No trademarked characters/logos as artwork** (a particle Reddit logo was requested and declined; original props instead).
9. He writes quickly and informally; read for intent. "The tube" = the pink thread. "Monitor" = the Slack panel. "The 03 card" = the third deck (personal projects).

## 3. Decisions already made (do not reopen)

- Hero: particle portrait → dissolve from the bottom up → rain → persistent particle field. **No name in the hero**; the name is in the footer.
- Hoodie colour wheel recolours the hoodie only; drawstrings stay white; no colour on skin.
- The thread appears only with the Work section, never during the hero; after the last deck it continues out of the **right** edge in one stroke and never enters the footer.
- Decks: three (Webflow work 5, Automations 19, Personal 3), huyml.co-style shuffling deck with counter. Active = centred card.
- Automations get **separate pages**, not slide-in panels. The panel stays only until each page exists.
- Reddit page: machine + runbook below. Courier mechanism (one card per alert, 3 s), five looping alerts, labels are plain text (no boxes), water + mist ground, ridge silhouettes, shooting stars.
- Fonts: Elms Sans (UI) + Archivo fallback from Google Fonts. Pangram Sans Rounded was wanted but is unavailable unless he supplies files.

## 4. Where things are

| Thing | Location |
|---|---|
| Home page | `index.html` |
| Reddit page | `automations/reddit-keyword-alerts.html` |
| Portrait textures | `portrait/` (colour, depth, 3-channel hood mask) |
| Deck data | `WORK`, `AUTOMATIONS`, `PERSONAL` arrays near the top of the script in `index.html` |
| Automation copy (19 entries) | the `AUTOMATIONS` array: `name, cat, line, tags, one, trigger, outcome`, `url` when a page exists |
| Deck thumbnails | `thumbs/` (empty; names in README) |
| Portrait tooling | `tools/portrait.py` in the working repo (not in the deploy folder); models: u2net_human_seg, Depth Anything V2 small (ONNX) |
| QA harness | Playwright scripts in the working scratchpad (not shipped); see BUILD.md §4 to recreate |

The original content source for the automations is a Google Doc Vasant wrote (one section per automation: problem, trigger, steps, nodes, outcome). Ask him for it when building a new page; the array entries are summaries of it.

## 5. In progress: automation page 2 — Notion to Webflow Publisher ("The Press")

Approved concept, scaffold written (styles, UI layer, captions, runbook skeleton in `auto-notion-webflow.html` in the working repo; not yet in the deploy folder). The 3D scene is the next job.

**World**: warm paper-white studio in daylight. Cream background `#efe9df`, real cast shadows (directional light with shadow maps), a long drafting table instead of water, brass `#b8924a` and graphite machine parts, paper blocks with ink. Accents: Webflow blue `#4353ff`, coral stamp ink `#e8553d`. No bloom; ACES tone mapping; light fog in cream. Grain overlay in CSS.

**Stations** (scroll holds on each, like page 1):
0. **Hero** – the Notion page as a standing stack of paper blocks (title slab, paragraph slabs, image plate, code slab, callout, list), a big physical lever beside it on a brass base reading DRAFT / APPROVED.
1. **Approve** – the lever flips with a mechanical click; a light runs down the line. Blocks begin to peel off the top of the stack one at a time onto a conveyor (rollers + a belt with scrolling stripes).
2. **Convert** – each block passes under a stamp head that comes down and presses an HTML tag onto it (`<h2>`, `<p>`, `<ul>`, `<blockquote>`, `<pre>`, `<img>`); the top texture swaps from Notion look to HTML look; a small ink splash. Image blocks get a "re-hosted" mark.
3. **Enrich** – a side forge with five slots labelled name, slug, meta title, meta description, OG image; plates drop into the slots (scroll-staggered) and light blue when filled.
4. **Assemble** – a Webflow CMS item (vertical panel with field rows) fills: converted blocks slide into the Post body rows, plates into their fields; then a blue "DRAFT" ribbon drops across the corner with a bounce.
5. **End** – a paper receipt prints out of the item's base ("Draft created · preview link · posted to the content channel"); pull-back shot.

**Runbook sections**: Problem · Flow (Notion trigger → fetch page + blocks → convert → enrich → create Webflow draft → notify) · Mapping rules (table: Notion block → HTML) · Guardrails (idempotent on re-approval, image upload failures, slug collisions, never auto-publish) · The result (mock CMS item) · Outcome · Operating it.

Motion must be mechanical and rhythmic (beats), not flowing. Keep all idle motion time-based, big moments scroll-driven, as on page 1.

## 6. After that (in order)

1. Wire the Press page into the home deck (`url` on the Notion to Webflow entry).
2. Remaining 17 automation pages, one concept each, always offered as 2–3 options first.
3. Thumbnails for the 5 Factors.ai pages (screenshots) and 3 personal projects.
4. Footer: real email and city; footer name treatment (deferred design).
5. Replace the slide-in panel entirely once every automation has a page.

## 7. Known constraints of the sandbox used so far
The AI workspace could not reach factors.ai (hence no thumbnails), Google Fonts or jsDelivr from the shell (tests used local copies), or Hugging Face (models were fetched from GitHub releases). The browser-side CDN loads work fine on the live site.

## 8. Artifact links (Claude)
Home: `claude.ai/artifact/7WNoJjkBGnWR66LqTveksU` · Reddit page: `claude.ai/artifact/NGZmASBaUwTbBicviNX19F`. These are private previews; the repo is the deliverable.
