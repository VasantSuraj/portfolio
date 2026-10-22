# Vasant Suraj Portfolio — Complete Handoff

_Last updated: 22 Oct 2026. Current version: **v45-reddit-link**. This single document replaces the older HANDOFF.md, DOCS.md and BUILD.md. Read all of it before you change anything. The code is the source of truth. This document explains the code, the history and how Vasant likes to work._

---

## 0. Read this first (for a new AI session)

1. **What you need from Vasant to continue.** Ask him to attach these files:
   - `index.html`
   - `automations/reddit-keyword-alerts.html`
   - the `forest/` folder (26 textures) and the `portrait/` folder (3 files), or the GitHub repo
   - **`portfolio-full-history.zip`** (if he has it). It contains the git history with every version tag and the `backups/` folder, so "revert to …" requests work. Without it you only have the current files.
2. **Do not build anything until he says so.** When he asks for ideas, give 2–3 options with a recommendation and wait. He says "go", picks a number, or says "build".
3. **Back up before every change.** Copy the file to `backups/index-pre-vNN.html`, commit, and tag each approved state (`vNN-short-name`). He expects an instant revert.
4. **Smoothness beats everything.** In his words: "smoothernesss is more important". Camera travel must stay smooth. A small flicker is more acceptable to him than a heavier or slower scroll.
5. **"Revert to main version" means the git tag `main-version`.** That tag still points to **v40** (the beach as he first locked it, commit `bffe487`). Everything since (v41 to v45) was approved: he said "everything is fine" at v45. The tag was never moved, though. **Before acting on "revert to main version", confirm whether he means v40 or wants v45 made the new main.**
6. **Only the requested change.** He often ends with "only these changes" or "fix those alone". Change nothing else, and if you notice something else, mention it instead of fixing it.
7. Show results as screenshots (desktop 1440×900 and phone 390×844) and publish the preview artifact after each change.

---

## 1. Who and what

- **Owner:** Vasant Suraj, Senior Webflow Lead Developer at Factors.ai and an n8n automations engineer. Email **vasantsuraj02@gmail.com**, city **Bangalore**.
- **Goal:** an award-level portfolio (Lusion, Igloo, Bruno Simon tier). It is scroll-driven, 3D and interactive, uses very little text ("the design should speak"), and is built only with free tools.
- **Repo:** `github.com/VasantSuraj/portfolio`, deployed on **Vercel** with `vercel.json` = `{ "cleanUrls": true }`.
- **Preview artifacts (Claude, private):**
  - Current home preview: `claude.ai/artifact/XY8JbBbjVtt12NQNARJT5Z`. Version 25 = v45; it includes `automations/reddit-keyword-alerts.html` as a published file, so the Reddit card works in the preview.
  - Older previews from the first sessions: home `claude.ai/artifact/7WNoJjkBGnWR66LqTveksU`, Reddit page `claude.ai/artifact/NGZmASBaUwTbBicviNX19F`. These are out of date.
- **Live pages:** the home page and automation page 1, Reddit Keyword Alerts. Automation page 2, "The Press" (Notion to Webflow Publisher), is designed but not built.

---

## 2. How Vasant works (follow all of these)

1. **Concepts before code.** For anything new, give 2–3 distinct concepts with a recommendation and wait for his pick. Example: for the testimonials he picked "lanterns" over "hot-air balloons".
2. **"Don't build until I say."** He often asks for ideas only ("dont build anything until i say", "only start working on my command"). Respect it strictly.
3. **Show early.** He reviews from screenshots and writes short, specific notes, often with his own screenshots that have a cursor pointing at the problem.
4. **Back up before every change.** Use a git tag plus a copy in `backups/`. He reverts quickly when something feels worse ("revert to this point", "revert only that").
5. **Smoothness is non-negotiable.** Target 60 fps everywhere (the hero runs at 60; the forest was around 30–45 on his machine). When an fps fix made camera travel feel less smooth, he reverted it. Never trade smooth camera travel for fps.
6. **Be careful with lighting.** He rejected "brighter" changes twice: shadows visibly shifted, and night became too white. Change lighting only when asked, and in small steps.
7. **Keep it simple when in doubt.** He prefers one clear mechanism done smoothly over several clever ones.
8. **No repeated worlds across automation pages.** Each automation page needs its own world, palette, props and motion language. Type and UI chrome stay shared: Elms Sans, pills, captions, runbook layout.
9. **Content security.** Automation docs are internal company material, so use only cleared summaries.
   - Never include API keys, webhook URLs, credential names, internal IDs, channel names, colleague names, real post titles or the internal Notion link.
   - Write competitors as `<competitor>` and authors as `u/author`.
10. **No trademarked characters or logos as artwork.** A particle Reddit logo was requested and declined; use original props.
11. **No public input on the site.** He removed the feedback form: "what if someone random adds a wrong msging". Testimonials are curated by him only.
12. **He writes fast and informally, so read for intent.** Glossary:
    - "latern" = lantern
    - "cards on the lanterns" = the satin testimonial banners
    - "fliccker" = flicker
    - "main version" = the `main-version` tag
    - "the tube" = the old pink thread (removed)
    - "monitor" = the Slack panel on the Reddit page
    - "the 03 card" = the personal-projects group
    - "kind words" = the testimonials chapter

---

## 3. Current state at a glance (v45)

Scroll journey on the home page:

1. **Loader**: a 000→100 counter.
2. **Hero**: a WebGL2 particle portrait of Vasant (hoodie colour wheel, butterfly cursor).
3. **Rain**: scrolling makes the portrait shed from the bottom up into falling particles.
4. **Projects forest** (three.js): you walk *into* the screen along a winding forest path in early-evening light (or night). Three chapters (Webflow work 5, Automations 19, Personal projects 3), each with a big 3D title, then cards that alternate left and right while the camera turns to face each one. A counter sits bottom-left.
5. **Cliff and fall**: the forest ends at a broken cliff lip. The camera turns toward the headland and waterfall, looks over the edge, and falls about 40 m beside the waterfall.
6. **Beach, "04 Kind words"**: a sunset cove, or moonlit at night.
   - Each of 6 testimonials is **one big paper sky lantern** carrying a **satin banner on a V-bridle**.
   - Each lantern glides in low over the sea from the right, rises to just above the horizon (about 16 m out), and its banner **unrolls and stays open**.
   - It then lifts up and away to the left as the next arrives.
   - All six gather high over the sea and then **drift off and vanish**.
   - Plain ambient lanterns keep rising from the shore the whole time.
7. **Dusk to stars to footer**: the sun sets, the sky fills with stars, and the camera tilts up. The footer name **VASANT SURAJ** reveals letter by letter like stars, while **3 plain lanterns rise slowly close past (behind) the name** on a loop. The footer also shows the email, "Webflow developer · Automations engineer" and "Bangalore".

The header has the name mark (top-left), a day/night toggle, sound and Let's talk (top-right). The hoodie colour button sits bottom-left in the hero only.

---

## 4. Repository layout

```
/
├── index.html                                home page (≈204 KB, one file: CSS + classic script + ES module)
├── vercel.json                               { "cleanUrls": true }
├── automations/
│   └── reddit-keyword-alerts.html            automation page 1 (≈81 KB)
├── portrait/
│   ├── portrait-color.webp                   cut-out portrait colour (640 wide)
│   ├── portrait-depth.png                    depth map (bright = near)
│   └── portrait-hoodmask.png                 R = hoodie, G = drawstrings, B = skin bounce-light (loaded with ?v=4)
├── forest/                                   26 textures, ≈3.1 MB (list in §11)
├── thumbs/                                   card thumbnails — EMPTY in the working copy; Vasant keeps his own in the repo
└── backups/                                  (working repo only, not deployed) every version's index.html
```

`thumbs/` filenames the code expects: `benchmarks.jpg`, `campaign-offer.jpg`, `microsoft.jpg`, `prove-roi.jpg`, `routines.jpg` (Webflow work), and `nike.jpg`, `ilish.jpg`, `leaderboard.jpg` (personal). If an image is missing it is removed (`onerror="this.remove()"`) and the card shows its gradient tint.

**Deploying:** upload into the repo root and keep the folder structure. `index.html` loads `portrait/…`, `forest/…` and `thumbs/…` with relative paths. The Reddit page lives at `automations/reddit-keyword-alerts.html` and links back with `../index.html`.

**Last handover (21 Oct):** `vasant-portfolio.zip` containing `index.html`, `vercel.json`, `forest/` (26), `portrait/`, `automations/`. Vasant asked whether he needs to push everything. The minimum since his previous push is:
- `index.html`
- `automations/reddit-keyword-alerts.html`
- the 10 beach textures: `sand_dry_diff/nor/rough`, `sand_wet_diff`, `rock_a_diff/nor/rough`, `satin_diff/nor/rough`

Confirm with him that GitHub now matches v45.

---

## 5. Home page architecture (`index.html`)

### 5.1 File anatomy (line numbers approximate)

```
1–8      doctype, meta, Google Fonts (Elms Sans 100–900 + Archivo), title "Vasant Suraj"
9–204    <style>
206–209  <canvas #forestGL> (z1), <div #forestFx> (z1, grain + vignette), <canvas #gl> (z2, particles), <div #forestCss> (z3, CSS3D cards)
211–224  <main> (z3): .hero#top (100svh), .gap (40svh), section.forest#work (the runway; contains .flist), footer.foot#contact
226–236  aside.panel#panel (slide-in details for automations without a page)
238–262  .ui (z4): .mark, .actions (#mode day/night, #sound, Let's talk), .scroll hint, .fcount counter, .palette (hoodie wheel)
264–267  .loader (z6)
269      <canvas #fly> butterfly (z9)
272      Lenis 1.1.13 (jsDelivr)
273–838  classic IIFE script (data, forest layout, particles, butterfly, sound, palette, frame loop, boot)
839      importmap: three@0.169.0 (+ addons) from jsDelivr
840–2993 ES module: EZ-Tree (vendored, MIT), forest, beach, lanterns, banners, CSS3D, camera, moods, tick
```

**Layers (z-index):** forest canvas 1 < particles 2 < CSS3D cards and `main` 3 < UI 4 < loader 6 < butterfly 9 < panel 20 < fps readout 30.

**Click routing in 3D (fixed in v45):** `html.forest3d main{pointer-events:none}` and `html.forest3d main>*:not(.forest){pointer-events:auto}`. Before this fix, the transparent runway section covered the floating CSS3D cards and swallowed every click, so no card link or "Details" button worked in 3D. Cards are clickable only while facing the camera (`.fcard.on{pointer-events:auto}`).

### 5.2 Scrolling and the frame loop

- **Lenis 1.1.13** (`lerp 0.085`, `wheelMultiplier 0.95`, `smoothWheel`, no `syncTouch`). It is skipped for reduced motion or if the CDN fails, in which case native scroll is used. It is exposed as `window.__lenis`.
- **One frame loop** (classic script `frame()`):
  1. `lenis.raf(now)`
  2. all `window.__ticks` (the module's `tick`), so scroll and camera update in the same frame
  3. the loader, the butterfly and the particle draw
- **Anchor clicks** (`a[href^="#"]`) scroll with Lenis over 2.4 s.
- **Query flags:**
  - `?fps` (or `#fps`) shows the fps, ms of JS per frame and DPR (bottom-right).
  - `?snap` makes the camera jump instead of easing (used by the screenshot harness).

### 5.3 Hero particle portrait (raw WebGL2, unchanged since the first sessions)

- **Particles:** about 100–130k points sampled from `portrait-color.webp`:
  - step 1.2 px (2.0 on touch), jittered, alpha < 120 skipped
  - saturation ×1.25, gamma lift 0.68
  - depth relief ×0.42 from `portrait-depth.png`
- **Mask flags:** hoodie, cast and drawstring from `portrait-hoodmask.png`. Green pixels in the bottom 10 % count as hoodie.
- **Shader stages:**
  1. intro over 2.6 s
  2. release from the bottom up (`start = 0.04 + h01·1.1 + rand·0.08`)
  3. 55 % of particles rain and the rest dissolve
  4. rainers settle into a full-screen drifting field
  5. pointer/butterfly displacement field
  6. hoodie recolour that keeps shading; drawstrings stay white; skin bounce-light is neutralised
- **Forest hand-off:** `uForest` = `forest.mix()`. The particle layer is not drawn at all once `mix > 0.999`, which happens inside the forest.
- **Unused uniforms:** `uLineA`, `uLineB`, `uPath` and `aTarget` are leftovers from the removed thread. They are harmless.
- **Camera:** `fov 0.62` rad; the camera distance fits the portrait so it fills about 93 % of the height (70 % on narrow screens), anchored to the bottom.

### 5.4 Hoodie colour wheel, butterfly, sound, loader

- **Hoodie colour wheel** (`.palette`, bottom-left, hero only, hidden after half a screen of scroll):
  - a 220 px HSL wheel plus a lightness slider and an "Original" reset
  - the colour eases in (lerp 0.08)
  - saved in `localStorage('hoodie')` inside try/catch
- **Butterfly cursor** (`#fly`):
  - a 2D canvas with a spring-follow and wander
  - it banks, flaps at 3 Hz, and slows and grows over links and buttons
  - fine pointer only and not with reduced motion; the native cursor is kept
  - the particles react to the butterfly's position
- **Sound:** a Web Audio drone built from 4 oscillators plus filtered noise; the button toggles a 1.2 s fade.
- **Loader:**
  - the counter runs to 92 until the textures are built, then to 100
  - it shows "Assembling N particles of one person."
  - an 8 s watchdog stops it hanging
  - `reveal()` shows the mark, actions and palette

### 5.5 Data (top of the classic script)

**WORK (5)**: Factors.ai pages. All link out (`target=_blank`).
1. Benchmarks to Blueprints, `https://www.factors.ai/lp/benchmarks-to-blueprints-linkedin-report`
2. LinkedIn Campaign Offer, `/lp/linkedin-campaign-offer`
3. Microsoft Advertising Partner, `/partner/microsoft-advertising-partner`
4. Prove ROI — LinkedIn Partner, `/lp/prove-roi-linkedin-marketing-partner`
5. Routines, `/product/routines`

**AUTOMATIONS (19)**: n8n. Each entry has `name`, `cat`, `line`, `tags`, `one`, `trigger`, `outcome`, and an optional `url`.
- Without a `url`, the card is a `<button>` that opens the slide-in panel.
- With a `url`, it is an `<a>`. A relative URL opens in the same tab; an `http` URL opens in a new tab.

The 19, in order:
- Notion to Webflow Publisher
- SEO Pre-Live Checks
- Auto Internal Linking
- AI Blog Drafts
- Webinar to Webflow
- Video to Blog
- Voice to Blog
- Podcast to CMO Brief
- Cluster to Pillar Post
- Blog Refresh Engine
- Blog to Social and Ads
- Organic Social Engine
- Slack to Post Idea
- LinkedIn ICP Leaderboard
- **Reddit Keyword Alerts** (`url: 'automations/reddit-keyword-alerts.html'`; the only automation with a page so far)
- Competitive Intel System
- Marketing Ticket Desk
- Dev Tasks from Slack
- Docs to Notion Sync

**PERSONAL (3)**:
- Nike — Air Jordan concept: `https://nike-rm1r.vercel.app/`
- I-Lish: `https://i-lish-new.vercel.app/`
- LinkedIn Leaderboard: `https://linked-in-engagements-leader-board.vercel.app/`

**TESTIMONIALS (6, all SAMPLE copy)**. Each shows a "SAMPLE" tag. Name "Name Surname", company "Company".
1. "The landing page went from Figma to live in days, and it felt better than the design." (Marketing Lead)
2. "He automated a publishing process that used to take our team a full afternoon. Now it runs while we sleep." (Content Manager)
3. "Every interaction is thought through. Our pages finally feel like the product." (Product Marketer)
4. "Fast, calm, and always one step ahead of the brief." (Head of Growth)
5. "Our CMS is easy to use for the first time. Editors stopped asking for help." (Editor)
6. "The automations he built are invisible in the best way. Things just happen." (Operations Lead)

**To use real testimonials:** set `quote`, `name`, `role`, `company` and `sample: false`. Vasant said he would send the real ones. The count can change: the runway, banners and lanterns are all built from the array. The banner text auto-shrinks from 64 px down to 30 px to fit.

### 5.6 The scroll runway (screens, "s")

`section.forest` has height `(totalS + 1) × Hs` px, where Hs is the viewport height. On phones Hs is kept stable when the URL bar hides. The scroll position in screens is `s = (scrollY − top) / Hs`. Keys are built in the classic script. Current values (desktop, v45):

```
0:start@-0.70  1:edge-of-forest@0.00
2:title "01 Webflow work"@1.00   cards 3–7 @1.75 2.55 3.35 4.15 4.95        (first card +0.75 after title, then +0.80 each)
8:title "02 Automations"@5.80    cards 9–27 @6.55 … 16.45                    (+0.55 each)
28:title "03 Personal projects"@17.30  cards 29–31 @18.05 18.85 19.65        (+0.80 each)
32:edge@20.85  33:edge@21.20 (=fallS)     (+1.2 then +0.35; camera turns left to show headland + waterfall, off 0.3)
34:over@21.75 (ease in)  35:drop@22.65 (linear)  36:land@23.45 (ease out, =landS)
37–42: tm (testimonials) @24.40 25.15 25.90 26.65 27.40 28.15   (first +0.95, then +0.75 each)
43:sky@29.95 (=skyS = totalS)   (+1.8)
```

Chapter layout in world z: the forest path runs toward −z. `GAP = { title: 9, card: 9, cat: 15, cliff: 20 }`. The cliff sits at `cliffZ = lastCardZ − 20`.

**Arrow keys and PageUp/PageDown** jump between titles, cards, the landing and the testimonials while you are inside the runway. **Tabbing** to a card moves the camera to it.

**No-3D fallback:** if 3D hasn't started within 12 s, or WebGL fails, `html.no3d` shows a plain responsive grid of all cards and testimonials (`.flist`) and hides the 3D layers. In 3D mode `.flist` stays visually hidden for screen readers.

**Counter** (`.fcount`, bottom-left): category label plus a big number and a total, flipping at 140 ms. It is visible only between the first title and the cliff.

### 5.7 Forest renderer and moods (module)

- **Renderer:**
  - `WebGLRenderer` with antialias, ACES filmic, exposure 1.14, clear colour `#2a241f`
  - DPR `min(devicePixelRatio, 1.5)` on desktop and `1.25` on touch
  - **adaptive DPR:** after 90 frames, if more than half of frames take longer than 24 ms, DPR drops 0.15 (floor 0.8). The resize happens right before drawing, so there is no blank flash.
- **Shadows:** PCFSoft 2048², a box of ±50 m, `autoUpdate=false`. The shadow camera moves in steps of about 4 m (whole texels), so the map is redrawn only about once per 4 m walked and stays pixel-stable. On those frames every nearby tree is drawn so off-screen trees still cast. Shadows are off on touch devices.
- **Fog:** custom `ShaderChunk` patches. Exponential² fog plus a thin low ground mist, and fog colour darkening overhead (under the canopy).
- **Path:** `P(z) = 4.2·sin(0.034z) + 1.8·sin(0.077z + 1.3)`. The same curve is in GLSL as `pathX`. `pathYaw(z) = atan(dP)`.
- **Two moods** blended by the day/night switch (`night` 0/1, eased over about 1.2 s), defined in `MOOD.day` and `MOOD.night`:
  - Day = early evening, 6–7 pm: fog `#57493d`, density 0.022, warm sun `#ffc58a` that is softer inside the forest (1.55) and full strength near the cliff (3.0), amber glow, falling leaves on, fireflies off.
  - Night: fog `#0d1318`, density 0.029, exposure 1.3, bluish moonlight `#a9bcd6`, moon direction `MOON_DIR`, fireflies on (10), leaves off.
  - The day/night choice is remembered in `localStorage('forestMode')`.
- **Sky:** a back-faced sphere shader with a fog-to-high gradient, sun disc and glow, a beach band (`uBeach`), stars (`uStars`) and haze.
- **Ground:** a valley around the path (`groundH`) with mud textures tiled every 3.4 m and a paler trodden path via vertex colour.
- **Trees:**
  - Generated at load with **EZ-Tree** (vendored, MIT), normalised to unit height.

    | Key | Preset | Height | Notes |
    |---|---|---|---|
    | ash | Ash Large | 18–25 | |
    | aspen | Aspen Large | 17–24 | |
    | oak | Oak Medium | 14–19 | |
    | birch | Aspen Medium | 13–18 | birch bark |
    | pineL | Pine Large | 16–24 | |
    | pineM | Pine Medium | 11–16 | |
    | bushA, bushB | Bush 2 | ~1–1.7 | |

  - Bark materials: oak, pine and birch textures. Leaves: ash, oak, pine and aspen PNGs with `alphaToCoverage` and a gentle wind sway.
  - **Planting bands:**
    - 0 = path side, 3.4 m+ (wider near cards and titles)
    - 1 = 9–20 m
    - 2 = 20–54 m (always billboards)
    - 3 = bushes
    - The headland past the cliff is planted as well.
  - About **1,056 trees** on desktop.
  - **LOD:** full instanced meshes within `NEAR = [64, 60, 0, 26]` m by band (`[34, 28, 0, 16]` on touch). Beyond that, **baked billboards** (two crossed cards, render targets 512×1024, or 256 on touch) out to `FAR = 115` m.
    - Billboards are re-baked once all textures load (LoadingManager), then `warmUp()` pre-renders the first card and the beach off-screen so shaders compile before anyone scrolls.
    - Full trees are ready about 7 cards ahead, and there is no half-leaf stage.
    - Trees whose whole crown is outside the view cone are skipped. Trees closer than their own height are never skipped, which fixed blinking crowns.
    - LOD updates when the camera moves 0.5 m or turns 0.06 rad.
- **Atmosphere:**
  - ferns and low leaves along the path
  - additive **sun shafts**: a strong one at each chapter title with a light pool on the ground, plus random thinner ones
  - **10 fireflies** (night)
  - **falling leaves**: 26 on desktop, 14 on touch (evening)
  - CSS **grain and vignette** overlay `#forestFx`
- **Cards** (`CSS3DRenderer`, real HTML):
  - 16:9 media (thumbnail or tint), number, tag chips; body with category, name, line, and a foot with an "Open"/"Details" pill
  - placed 2.1 m left or right of the path (1.3 m on portrait), alternating with the first one on the left, at y 1.55
  - width from the screen: 270–560 px CSS, about 36 % of the view (76 % on portrait)
  - facing the camera stop; fogged to match the scene via `--fog`/`--fogc`
  - the facing card gets `.on`: a highlight, a cursor-driven tilt (±9°/±7°) and the Open pill
  - **Titles:** `NN / Chapter / "N pages · Factors.ai"`, sized from viewport width (44–132 px), at y 1.95, fading before you walk through them.
- **Camera in the forest:**
  - target z = `card.z + D`, with D 4.6 m (5.0 on portrait), and a yaw turn toward the card (`TURN` 0.86, or 1 on portrait)
  - titles: stop `TSTOP` 6.5 m (7.2) before the title
  - easing: z = `u·0.3 + smoothstep·0.7`; yaw = smootherstep
  - damping `kz = 7.5/s` and `ko = 4.5/s` (12/s with reduced motion)
  - pointer parallax adds small x/yaw/pitch
  - FOV 48° (60° on portrait, where aspect < 0.85)
- **Forest fade-in:** `mix = smooth(-0.65, 0, s)` sets the opacity of the forest canvas and the grain overlay while the portrait rain finishes.

### 5.8 Cliff, fall and beach

**Constants:**
- `B = cliffZ`, `BX = P(B)`
- sea level `SEA = −40`, with the forest floor at y ≈ 0
- headland face at `HEADX = BX − 10`
- waterfall at `FALLZ = B − 15`
- `SHORE = B − 17.3`

**The cliff edge:** `edgeZ(x)` makes a broken, uneven lip instead of a straight line. `headTop(x,z)` is the headland's top: the forest floor continues, a stream bed is cut in, and it slopes into the sea.

**Camera poses** (free poses `BP`, set in `fit()`):
- **edge:** two keys turn the camera left (off 0.3) to show the headland and waterfall.
- **over:** `{x: BX+0.3, y: 1.0, z: B−2.0, yaw: 0.22, pitch: −0.95}`, looking down over the edge.
- **drop:** `{x: cx+0.5, y: −24, z: cz+1, yaw: 0.3, pitch: −0.42}`, falling beside the waterfall.
- **land:** `cx = BX+3` (portrait +1.5), `cz = B−7` (portrait −9), `cy = sand+1.6`, yaw 0.1 (portrait 0), pitch 0.08 (portrait 0.05). This was moved back in v41 to show more of the cliff and beach.
- **tm[j]:** the same spot, yawing slightly toward each banner.
- **sky:** the same spot with pitch 0.55, looking up into the stars for the footer.

**Beach title** "04 / Kind words / 6 notes · samples": a CSS3D title over the sea. It fades in during the fall and out right after landing (`landS+0.1` to `+0.4`).

**Sand:** a 220×48 m plane following `sandH`. Dry sand (`sand_dry_*`) blends to wet sand (`sand_wet_diff`) per vertex through an `aWet` attribute in an `onBeforeCompile` patch; wet sand is also less rough. There are dunes under the cliff, and the cove drops into the sea under the waterfall.

**Rock:**
- `cliffFace()` builds the cliff under the forest edge and the headland face from noise-bulged strips with the `rock_a` (mossy rock) textures.
- There are 7 boulders at the waterfall's foot.

**Waterfall:**
- three layered falling sheets, 5.4, 4.2 and 2.8 m wide, with a noise shader for streaks, density and edges, tinted by the sky
- a stream across the headland feeding it
- two spray point systems: drifting mist and white water at the foot

**Sea:**
- a 5000×3000 plane with its own shader
- procedural wave normals, Fresnel sky reflection, sun-glitter path, shore foam (moving wave line) and foam where the waterfall lands, plus fog
- no lantern reflections

**Beach moods:**
- `BEACH.day` is a sunset: low `#e2a27c`, mid `#a0738a`, high `#2a2d4e`, sun `#ffa060`, glow 1.5.
- `BEACH.night` has a low moon (`BEACH_MOON`) and stars.
- `DUSK` is the final darkening.
- The beach blends in with `bk = smooth(fallS−1.3, fallS+0.2, s)`.
- The sun sinks as you walk the testimonials: `sun01 = smooth(landS, lastTmS, s)` moves the sun from y 0.11 to −0.03.
- The end blend `ek = smooth(lastTmS+0.35, skyS, s)` takes the sky to dusk and **stars** (`uStars = max(night·bk, ek)`).
- **Beach materials use the beach fog density `BD`, not the forest density.** This fixed a flat brown sea at the cliff edge.

**Performance:** at the beach the scene is about 284–293k triangles. The beach group is visible only from just before the cliff (`s > lastCardS − 0.3`).

### 5.9 Lanterns and testimonial banners (v41 to v44)

**Lantern model.** All lanterns are one instanced set of three meshes (`LM`):
- a paper body (`LatheGeometry`) with a custom shader: warm glow strongest low and through the middle, 4 bamboo ribs, crinkle, flicker, and an unlit look when glow is 0
- a dark wire ring plus cross wires
- a small fuel cell (flame)

They share an `aGlow` attribute. `setLantern(i, x, y, z, scale, glow, t)` places one.

**Instance count:** `NL = NAMB + NT + 3`:
- `NAMB` = 24 ambient (14 on touch)
- `NT` = 6 testimonial lanterns
- 3 "near" footer lanterns

**Ambient lanterns:**
- released along the shore on a 42 s life cycle, rising 0.85 m/s and drifting out to sea
- they spawn **outside** `x ∈ (BX−2, BX+8.5)` so they never cross the reading spot (v41)

**Testimonial lanterns: one lantern per note (v42).**
- A single larger lantern (scale `TSC(bw) = bw·0.52`) holds the banner's rod with a **V-bridle**: two cords from the rod ends up to the lantern's ring, height `BRIDLE(bw) = bw·0.42`.
- The banner is a **satin cloth** (`MeshPhysicalMaterial`):
  - `satin_nor` normals and `satin_rough`
  - sheen 0.3 (reduced from 0.7 in v44 so text isn't washed out)
  - emissive `#ffd2a0` with the canvas as emissive map, strength `glow·(0.45+0.35·night)`
- A vertex shader `bpos()` rolls and unrolls the cloth around the rod (`uUnroll`) and ripples it in the wind.

**Flight.** Scroll drives everything; there is no time-based progression. For each note j, `p = (s − tm.s)/0.75`:

| Phase | Window (p) | What happens |
|---|---|---|
| hidden | p < −1.6 | not drawn |
| glow fades in | −1.6 → −1.25 | lantern lights up (still off-screen) |
| **arrive** | `rise = smooth(−0.95, −0.35, p)` | from `lx = rx+12` (portrait +7), `lz = rz+2`, `ly = ry−2.2` — i.e. **in from the right, low over the water** — to the reading spot; height follows `ey = smooth(0.3, 1, rise)` so it stays low until late |
| banner visible | rise > 0.35 | rolled up while flying |
| **opens** | `unroll = smooth(−0.33, −0.06, p)` | unrolls on arrival and **never rolls back up** (v42) |
| reading | about −0.06 → 0.05 | still; slight bob |
| **lifts away** | `lift = smooth(0.05, 0.55, p)` | +15 m up, −8 m back (out to sea), −5 m left, clear of the next one coming in from the right |
| **gathers** | from `tm.s + 0.5625` to `skyS − 0.6` | smoothstep to a gathering point high over the sea: `gx = x0 + (j − 2.5)·6.5` (portrait 3.5), `gy = cy + 26 + (j%2)·3`, `gz = B − 80 − (j%3)·7` |
| **vanishes** | `vk = smooth(0.62, 1, ge)` | lantern and banner shrink to 0, rise `vk²·14` more and fade — only plain lanterns remain for the sky (v43) |

**Reading spot geometry:**
- distance `dR = 16` m (portrait 10.5) in front of the landing spot, moved back in v42
- `rx = x0 + side·0.9`, alternating sides (portrait centred)
- banner width `bw = clamp(viewWidth·0.28, 2.6, 5.0)` (portrait `viewWidth·0.8`), height `bh = bw·0.62`
- banner centre `ryC = cy + dR·0.075` (portrait 0.05), so the card sits just above the horizon and the lantern above it

**Banner art** (`drawBanner`, canvas 1024 × 1024·bh/bw):
- background: satin pattern under an ivory veil (0.74) with a sheen gradient, a sleeve band, a dashed stitch line and an inner frame
- **SAMPLE** pill at the top-right; the text column is narrowed by 210 px when the note is a sample so the words never hit it
- **Opening quote mark** “ at 150 px, weight 800, `#9a4a22`, at (46, 222)
- **Quote text** at weight **700**, `#1a1310`, from x 150 / top 168, auto-fit from 64 px down to 30, with a **closing ” appended** (v44)
- Name at weight 700, 38 px; role and company at weight 600, 32 px, `#4a3a2e`
- Redrawn when the satin image or fonts finish loading

**Near footer lanterns (v43):**
- 3 plain lanterns placed in **camera space**, so they hold their screen position while rising
- screen x: −0.42, −0.78 and 0.02 of the half-width
- distances 7, 10 and 13 m (×1.7 on portrait)
- loop speeds 0.045, 0.036 and 0.03 per second; each rises from below the screen to above it, fading at the ends
- they fade in with `smooth(0.35, 0.85, ek)`
- They pass **behind** the footer name, because the HTML sits above the canvas. This recreates what Vasant saw by chance and liked ("felt very 3d").

### 5.10 Footer

- `footer.foot#contact` is 100svh, aligned to the bottom.
- **`h1.starname` "VASANT / SURAJ"**: weight 800, `clamp(48px, 13.4vw, 220px)`, uppercase. Each letter fades in from blur with a random 0.15–1.75 s delay and a faint glow.
- **Row:** the email link `vasantsuraj02@gmail.com`, "Webflow developer · Automations engineer", "Bangalore".
- A footer-level `IntersectionObserver` (threshold 0.35) reveals everything inside it. This is a fix, because the last line sits too low for the generic observer.
- The 3D world stays behind the footer: the night sky, stars and rising lanterns.

### 5.11 Day/night toggle

The header button `#mode` (moon or sun icon) dispatches the `forestmode` event and saves `localStorage('forestMode')`. It blends forest, beach, lanterns, waterfall, stars and card fog together. Night beach: lanterns brighter (lant 1.4), moon low over the sea, stars.

---

## 6. Automation page 1: Reddit Keyword Alerts (`automations/reddit-keyword-alerts.html`)

Unchanged from the original build (v7.1) except for the v45 fixes listed at the end of this section.

- **Concept:** the automation shown as a **machine in a night landscape** over still black water. A fixed three.js 0.158 stage (importmap from jsDelivr; `EffectComposer` with bloom, `Reflector` water, `RoomEnvironment`). Scrolling a tall `#runway` (680svh) moves the camera between stations while the machine runs in real time. Below that is the written **runbook** (`#doc`).
- **Stations:**
  - 0 Hero
  - 1 **Clock** (schedule trigger; radar sweep every 4 s)
  - 2 **Lens** (watchlist, exact-phrase matching; matched cards lift onto the glowing alert line)
  - 3 **Gates**: amber "freshness window" (stale cards tumble off) and pink "de-dupe · seen before?" (repeats drop into a glass memory box)
  - 4 **Slack**: a monitor showing an `# alerts` window; a courier card every 3 s; five looping invented alerts
  - 5 End
- Labels are plain 3D text with no boxes. Mint `#a6dfd3`, blue `#5B9BF6`, pink `#FF8FD0`, amber `#ffb454`, Reddit orange `#ff6a3d`.
- **Environment:**
  - Reflector water at 40 % resolution (30 % on touch), refreshed on alternate frames, with ripple distortion
  - mist sheets, two ridge silhouettes, a haze band, `FogExp2`, twinkling stars, shooting stars every 3.5–8.5 s, dust
- **Rendering:** a 230-instance card stream (150 on touch) with a texture atlas, a GPU spark pool (900), and bloom threshold 0.9. DPR is capped at 1.5 and transmission renders at half resolution.
- **Camera:** six keyframes; each station **holds** while its caption shows. Time-based damping. `?snap` makes the camera jump. Portrait: FOV 54°, camera stepped back.
- **Runbook:**
  - a facts strip (Trigger: Schedule · Cadence: every few minutes · Stack: n8n · Reddit · Slack · Status: In production) and a sticky table of contents
  - sections: Problem, Flow (8 steps with n8n node types), Matching rules, Guardrails, The alert (Slack mock), Outcome, Operating it
- **Content safety:** all alerts are invented, `u/author`, `<competitor>`, generic terms. No internal identifiers anywhere.
- **v45 changes:**
  - added `<!doctype html>` and a viewport meta (it was missing both, so phones would have shown a zoomed-out desktop page)
  - the top-left "‹ Vasant Suraj" back link now goes to `../index.html` (it used to scroll to `#top`)
  - the "Let's talk" pill is now `mailto:vasantsuraj02@gmail.com` (it pointed to a missing `#contact`)
- **Still placeholder:** "Next automation → Competitive Intel System" (`#nextLink`, `#nextLink2`) has `href="#"` because that page doesn't exist yet.

---

## 7. Automation page 2, "The Press" (Notion to Webflow Publisher): designed, not built

The concept was approved in an early session. A scaffold (`auto-notion-webflow.html`: styles, UI layer, captions, runbook skeleton) was written in an **older working repo and is not in the current files**. Ask Vasant whether he has it; otherwise rebuild it.

- **World:** a warm paper-white studio in daylight. Cream `#efe9df`, real cast shadows, a long drafting table (no water), brass `#b8924a` and graphite machine parts, paper blocks with ink. Accents: Webflow blue `#4353ff` and coral stamp ink `#e8553d`. No bloom, ACES, light cream fog, CSS grain.
- **Stations:**
  - 0 Hero: the Notion page as a standing stack of paper blocks, with a big brass lever reading DRAFT / APPROVED
  - 1 Approve: the lever flips with a click; a light runs down the line; blocks peel onto a conveyor
  - 2 Convert: each block passes under a stamp head that presses an HTML tag (`<h2>`, `<p>`, `<ul>`, `<blockquote>`, `<pre>`, `<img>`) onto it; the texture swaps from Notion look to HTML look; images get a "re-hosted" mark
  - 3 Enrich: SEO plates (name, slug, meta title, meta description, OG image) drop into forge slots and light up blue
  - 4 Assemble: a Webflow CMS item fills field by field, then a blue DRAFT ribbon drops across it
  - 5 End: a paper receipt prints ("Draft created · preview link · posted to the content channel"), with a pull-back shot
- **Runbook:** Problem · Flow (Notion trigger → fetch page and blocks → convert → enrich → create Webflow draft → notify) · Mapping rules (Notion block to HTML table) · Guardrails (idempotent on re-approval, image upload failures, slug collisions, never auto-publish) · The result · Outcome · Operating it.
- **Motion:** mechanical and rhythmic (beats), not flowing. Idle motion is time-based; big moments are scroll-driven.
- **After building it:** set `url: 'automations/notion-to-webflow.html'` on that AUTOMATIONS entry.

---

## 8. Pending work and open items

1. **Real testimonials:** Vasant will send them. Replace the 6 sample entries and set `sample: false`.
2. **Confirm GitHub matches v45** (§4) and whether `main-version` should move to v45 (§0.5).
3. **Thumbnails** for the 5 Factors.ai pages and 3 personal projects (`thumbs/…`). The workspace couldn't reach factors.ai to capture them. Vasant has a `thumbs/` folder in his repo; check what's in it.
4. **Automation page 2, "The Press"**, then the other 17 automation pages. Offer 2–3 concepts each, with no repeated worlds. Wire each with a `url`.
5. **Ideas raised earlier and not built** (he asked for suggestions only):
   - a stronger **particle-portrait → forest connection** (how the rain hands over to the forest)
   - the **forest → footer connection**. The beach and sky now fill this; check whether he still wants more.
6. **Known small issue (v42 note):** while reading a later note, earlier cards heading to the gathering point can briefly peek at the very top edge. He was offered a fix and hasn't asked for it.
7. **Frame rate:** the hero runs at 60 fps. The forest was around 30–45 on his machine at v37.4, and he accepted that in exchange for smooth camera travel. The beach hasn't been measured on a real GPU, because the QA machine is software-rendered. Ask him to try `?fps` if performance comes up.
8. **Replace the slide-in panel** once every automation has its own page.
9. **Tidy-ups to do only if asked:**
   - stale CSS for the old decks and thread (`.band`, `.card`, `.frame`) and the outdated top CSS comment ("One page, one thread…")
   - unused particle uniforms from the thread
   - `.tcard` styles, used only by the no-3D fallback
10. **Optional:** the Pangram Sans Rounded font, if he supplies the files. Elms Sans is the current UI face.

---

## 9. Decisions log (do not reopen without him asking)

**Hero and early pages:**
- Hero = particle portrait → bottom-up dissolve → rain → field. **No name in the hero**; the name is in the footer. Rejected hero ideas: falling letters, an outline name with hover fill, particles morphing into the name, letter-by-letter over a long scroll, a bubble font, a glass title, a liquid "pour".
- The hoodie wheel recolours the hoodie only: strings stay white, no colour on skin.
- **Pink thread ("the tube") was dropped** when the forest came in. The **three shuffling decks were replaced** by the forest walk.

**Forest:**
- Cards alternate left/right with the camera turning to each. Clickable cards: the "Open" pill appears on the facing card.
- The counter stays bottom-left and changes as you scroll.
- A realistic forest, not green-heavy: early evening around 6–7 pm, warm but not sunny. Only about 5–10 fireflies, and at night only. The evening has falling leaves instead of light bugs. Lighter grain. Far trees must not look like an x-ray, and distant leaves must load in properly.
- Day/night toggle in the header, with a visible moon at the end.
- Webflow chapter title must not appear too early: titles and cards wait for the portrait rain.

**Performance and look:**
- **Lighting:** "brighter" versions rejected (v36.2, v36.3); shadows must not shift.
- **Performance:** resolution locking (v37.2) caused low fps, and the 60-fps leaf-card reduction (v38) made camera travel less smooth. Both were rejected, and **v37.4** became the approved forest base: v37.1 plus two minimal fixes.

**Cliff and beach:**
- The forest ends at a waterfall cliff and you fall to the beach. The cliff lip must not look square, the mountain must connect to the forest (the headland carries the forest on), and the sand and waterfall must look real (Poly Haven textures).
- **Testimonials are lanterns** (not hot-air balloons) and are **scroll-driven only**. No fire or flame streaks. Realistic paper lanterns.
- Banners: satin cloth that unrolls and moves in the wind.
- **No feedback form.**
- Testimonial cards were too close to the viewer, so v41 moved the camera back, put the banners over the water, made them rise higher and gather. v42 then went to **one lantern per card**, cards that don't close, farther away, opening on arrival. v43 made **card lanterns vanish at the gathering point**, with only blank lanterns going to the sky, and kept **lanterns rising close to the footer name**.
- v44: bold opening and closing quotes and dark, heavy text on the cards.

**Links and content:**
- The Reddit card must open its page in the same tab. Fixed for real in v45: the click layer.
- Footer: real email and city.

---

## 10. Version history (git tags in the working repo + `backups/`)

| Tag | What |
|---|---|
| `auto-reddit-v7.1`, `v31-thread-exit` | baseline from the first sessions (home with thread and decks; Reddit page v7.1) |
| `v32-forest-wip` | projects forest pass 1: three.js walk, CSS3D cards, chapter titles, counter; thread and decks removed |
| `v33-forest-real` | EZ-Tree trees with bark/leaf textures, mud ground, moonlight and shadows, far billboards, turning camera, 10 fireflies, grain |
| `v33.1-less-fog`, `v33.1-night` | less/darker fog; far trees as silhouettes; titles fade before you pass |
| `v34-evening` | early-evening look: low warm sun, long shadows, sun shafts, amber haze, winding path, re-bake after textures load |
| `v35-daynight`, `v35.1-fixes` | softer sun in the forest, full at the cliff; day/night switch; moon at the clearing; titles wait for the rain; falling leaves (evening) |
| `v36-smooth` | Lenis, one frame loop, portrait layer off in the forest, texel-snapped shadows, warm-up render, cheaper LOD, `?fps`, card tilt, arrow keys, doctype |
| `v36.1-night-shadows` | moonlight half as strong and bluer; far trees cast shadows; bigger shadow area |
| `v36.2-steady-leaves`, `v36.3`, `v36.4-reverted-to-v36.1` | steady-leaf LOD and brighter scenes → brightness rejected → reverted |
| `v37-trees-ready` | full trees about 7 cards ahead, no half-leaf stage |
| `v37.1-fps` | shadow map redrawn only on 4 m steps; off-view trees skipped (the "smooth travel" version) |
| `v37.2-no-flicker`, `v37.3` | resolution-lock and exact-view experiments (rejected: low fps / flicker) |
| `v38-60fps`, `v38.1-reverted-to-v37.1` | fewer leaf cards for 60 fps → camera less smooth → reverted |
| `v37.4` | **approved forest**: v37.1 + resolution change before drawing + near trees never skipped. Pushed to GitHub. |
| `pre-beach` | before the beach |
| `v39-beach` | first beach: fall beside the waterfall, cove, 6 sample lanterns with HTML notes, a feedback lantern (removed later), sun to stars, name in the stars, footer reveal fix |
| `pre-beach-v2`, `v40-beach-real` | real sand/rock/headland, stream + layered waterfall + spray, real lanterns, satin banners, no flames, form removed, footer email/city, Reddit `url` |
| **`main-version`** (= `bffe487`, v40 + unused textures removed) | **locked "main" by Vasant** |
| `v41-lantern-flight` | camera back; lantern pairs fly over the water, rise, unroll and gather on scroll |
| `v42-one-lantern` | one lantern per note on a V-bridle; cards stay open; read farther out (16 m); arrive from the sea on the right |
| `v43-lanterns-away` | note lanterns vanish once gathered; 3 plain lanterns rise close past the footer name |
| `v44-card-text` | bold “ ” quote marks, heavier and darker banner text, less sheen, text clear of the SAMPLE tag |
| `v45-reddit-link` | cards clickable in 3D (pointer-events fix); Reddit page: doctype, viewport, back link, mailto. **Current.** |

**Backups** (`backups/`): `index-vNN-….html` for every version, `index-pre-vNN.html` before each change, `index-MAIN.html` (= v40), `forest-MAIN/`, `reddit-keyword-alerts-pre-v45.html` and `reddit-keyword-alerts-v45.html`.

The git repo and tags exist only in the AI workspace. They are delivered as `portfolio-full-history.zip`; unzip it and run `git tag` to see them.

---

## 11. Assets and sources (all free)

**`forest/` (26 files):**

| Group | Files | Source |
|---|---|---|
| Bark | `bark_{oak,pine,birch}_{color,normal,roughness}.jpg` (512²) | the EZ-Tree project's texture set (github.com/dgreenheck/ez-tree); verify the licence if it matters |
| Leaves | `leaf_{ash,oak,pine,aspen}.png` (512², alpha) | EZ-Tree texture set |
| Forest floor | `mud_diff_1k.jpg`, `mud_nor_1k.jpg`, `mud_rough_1k.jpg` | Poly Haven **mud_forest** (CC0) |
| Dry sand | `sand_dry_diff.jpg` (1k), `sand_dry_nor.jpg` (1k), `sand_dry_rough.jpg` (512) | Poly Haven **aerial_beach_01** (CC0) |
| Wet sand | `sand_wet_diff.jpg` (1k) | Poly Haven **damp_beach_sand_02** (CC0); Vasant: "select the wet one" |
| Rock (cliff/headland/boulders) | `rock_a_diff.jpg`, `rock_a_nor.jpg` (1k), `rock_a_rough.jpg` (512) | Poly Haven **aerial_rocks_02** (CC0) |
| Satin (banners) | `satin_diff.jpg`, `satin_nor.jpg` (1k), `satin_rough.jpg` (512) | Poly Haven **crepe_satin** (CC0) |

Vasant also sent **rocky_terrain_03**, which is unused. The 4K Blender zips were downscaled to the sizes above.

- **Portrait:** made from Vasant's photo with u2net_human_seg (segmentation) and Depth Anything V2 small (depth). The hood mask was built offline with scipy flood fill.
- **Libraries:**
  - three.js r169 on the home page, r158 on the Reddit page (both from jsDelivr)
  - Lenis 1.1.13
  - EZ-Tree, vendored inline (MIT, licence text kept in the file)
  - Google Fonts: Elms Sans and Archivo

---

## 12. QA harness (how changes were checked)

The workspace runs Playwright with Chromium and software GL. The frame-rate readout means nothing there: it shows "0–3 fps". Compare **triangles and ms of JS** instead, and ask Vasant for real fps.

**Setup:**
- Serve the folder with `python3 -m http.server 8765` from the repo root. Restart it if it stops: background commands time out.
- In the QA folder, `npm i three@0.169.0` and copy `lenis.min.js` from npm `lenis@1.1.13/dist`. The sandbox can't reach jsDelivr or Google Fonts, so requests are routed to local copies and fonts are stubbed. **The fonts in screenshots are fallbacks, not Elms Sans.**
- Launch flags: `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist`.

**Scripts:**
- `shoot.js LABEL W H targets…` takes screenshots. Targets: `key=N` (index into `__forest.keys`), `s=N` (screens), `card=N`, `title=N`, `y=N` (pixels). Use `y=200000` for the footer. A label containing `night` sets night mode; a label starting with `phone` emulates mobile. It loads `index.html?snap&fps`, waits 9 s, then 14 s per target.
- `keys.js` prints all keys and page errors. Run it after every edit, because syntax errors (duplicate `const`) are common.
- `click.js` scrolls to the Reddit card and checks `elementFromPoint` and navigation.

**Gotchas:**
- `pkill -f` with a pattern that appears in your own command kills your shell.
- `page.route` plus a navigation can hang in this setup; check the request fired instead.

---

## 13. Deploy checklist

1. Back up and tag in the working repo.
2. Upload to GitHub, keeping the folder structure: `index.html`, `vercel.json`, `forest/*`, `portrait/*`, `automations/*`, and `thumbs/*` (Vasant's).
3. Vercel deploys automatically. `cleanUrls` serves `/automations/reddit-keyword-alerts`, and `.html` links redirect.
4. Spot-check:
   - the hero loads (counter reaches 100)
   - the forest appears after the rain
   - cards are clickable when facing
   - the Reddit card opens its page and its back arrow returns home
   - the fall, the beach lanterns, the footer stars and name
   - the day/night toggle
   - the phone layout

---

## 14. Conversation timeline of Vasant's requests (session of 20–22 Oct 2026)

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
16. Beach v1 feedback:
    - waterfall and sand not real; remove the fire/flame thing; realistic lanterns
    - beach start looks square; mountain disconnected
    - remove the feedback box
    - banners on lanterns with cloth unfolding in the wind
    - list the Poly Haven files first
    - email/city; Reddit card not linking
    - "only start working on my command"
17. Sent the sand/rock/terrain zips ("select the wet one"); a hot-air balloon idea was considered, then "lets keep laterns"; sent crepe satin; "if its lantern it should work on scroll only"; "go".
18. "testimonial cards are very close to the user… backup this as the main version" (v40 = main-version).

**Lantern refinements:**
19. Combine all three: camera back, banners over the water, lanterns rising higher, unrolling, scroll-linked flight to a gathering point (v41).
20. One lantern holding each card; don't close the cards; keep the behaviour; move it back, then open (v42).
21. Card lanterns disappear at a point, only blank lanterns go to the sky; he liked a lantern passing very close to the footer name and wanted that (v43).
22. Quote marks missing and card text not visible: fix those alone (v44).
23. "everything is fine, give the zip"; the Reddit card wasn't connected (v45 + zip).
24. "should i have to push all files into github ?" Answered: only the changed files, or the whole zip.
25. Asked for this complete handoff document.

---

## 15. Suggested first message for the new chat

> I'm continuing my portfolio (Vasant Suraj, github.com/VasantSuraj/portfolio). Attached: PORTFOLIO-HANDOFF.md (read all of it first), portfolio-full-history.zip (code + git tags + backups). Current version is v45. Don't build anything until I say. [Then the request.]
