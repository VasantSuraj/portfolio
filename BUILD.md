# How it is built — technical documentation

_Companion to `DOCS.md` (what the site is and what each part means). This file is the engineering view: tools, techniques, data flow, and the reasoning behind each choice. Current as of 19 Oct 2026._

---

## 0. Stack at a glance

| Layer | Choice | Why |
|---|---|---|
| Pages | Plain HTML, one file per page, CSS + JS inline | No build step, nothing to install, trivially hostable, easy to hand over |
| Home hero | **Raw WebGL2** (no library), one custom shader program, `gl.POINTS` | ~120k particles with per-particle logic; a library would add weight without helping |
| Automation pages | **three.js 0.158** (ES modules via import map from jsDelivr) + addons: `EffectComposer`, `RenderPass`, `UnrealBloomPass`, `OutputPass`, `RoomEnvironment`, `RoundedBoxGeometry`, `Reflector` | Real materials, lighting, post-processing and reflections without writing a renderer |
| 2D line work | Inline **SVG** path (the thread) | Crisp at any DPI, cheap to animate with `stroke-dasharray` |
| Motion | Hand-rolled scroll→value mapping, `requestAnimationFrame`, time-based easing | Full control over the scrub; no dependency |
| Type | Elms Sans (UI) with Archivo fallback, Google Fonts | The approved face; loaded once |
| Asset prep | Python: `onnxruntime`, `numpy`, `Pillow`, `scipy` with **u2net_human_seg** (segmentation) and **Depth Anything V2 small** (depth) | Free, local, produces the three portrait textures |
| QA | Playwright + headless Chromium (software GL) | Renders every state as an image to review before publishing |
| Versioning | git tags + `backups/` copies | One-command revert to any approved state |

All tools are free. No paid services or licensed assets are used.

---

## 1. Home page (`index.html`)

### 1.1 File anatomy
```
<title>, <meta>, font <link>
<style>      all CSS: tokens, hero, decks (.show/.pcard), palette, panel, footer, breakpoints
<canvas #gl> fixed, z 2 — the particle portrait / rain field
<svg .thread> fixed, z 1 — the tube
<main>       .hero, #work .show, #automations .show, #personal .show, .foot
<div .ui>    fixed overlay: mark, sound pill, Let's talk, scroll hint, .palette (colour wheel)
<div #panel> slide-in detail (automations; to be replaced by pages)
<canvas #fly> butterfly cursor, z 9
<script>     one IIFE: data arrays → helpers → thread → decks → WebGL → cursor → loader → palette → frame loop
```

### 1.2 Portrait asset pipeline (`tools/portrait.py`)
Input: one photo. Output: three textures in `portrait/`.

1. **Segmentation** – `u2net_human_seg.onnx` at 320×320 gives a subject mask; it is run again on the crop at higher resolution and the two masks are merged, then Gaussian-blurred (1.2 px) for soft edges.
2. **Crop** – head and shoulders: from 4 % above the top of the subject down to 60 % of its height; width is the full extent of the subject inside that band ×1.06 (so the arms are never clipped), minimum 0.9× the crop height.
3. **Depth** – `depth_anything_v2_vits.onnx` on the crop (inputs resized to multiples of 14). Depth is re-normalised inside the subject only (2nd–98th percentile) so the face uses the full range.
4. **Pack** – everything is resized to 640 px wide; written as `portrait-color.webp` (RGBA cutout, q90), `portrait-depth.png` (8-bit, bright = near).
5. **Hood mask** (`portrait-hoodmask.png`, built with a second script using scipy) – three channels:
   - **R = hoodie**: colour-classified pixels (green/blue above red, light enough), flood-filled into connected regions, extended per column down to the crop line so no band is left below the hoodie;
   - **G = drawstrings**: thin bright vertical components (height ≥ 20 % of the image, width ≤ 10 %, in the lower 40 %);
   - **B = cast**: skin pixels carrying the hoodie's bounce light (mint/blue tint under the chin and neck), cleared wherever R is set so the two never overlap.

Why a mask and not per-pixel colour tests at runtime: the first version guessed hoodie pixels in the shader and produced strays (blue on the face, white shoulders, a mint neck). A flood-filled mask prepared offline is exact and costs nothing at runtime.

### 1.3 Particle construction (`build()`)
- The three images are drawn to offscreen canvases and read with `getImageData`.
- The image is sampled on a grid (`step` = 1.2 px on desktop, 2.0 on touch devices) with a random jitter inside each cell so the grid never shows. Pixels with alpha < 120 are skipped.
- Per particle, four attributes are packed into `Float32Array`s and uploaded once (`STATIC_DRAW`) into a VAO:
  - `aPos` (x, y in model space; z from depth, ×0.42 relief),
  - `aCol` (photo colour, saturation ×1.25 and a gamma lift of 0.68 so the particles read as the photo under additive-free blending),
  - `aRand` (three random numbers used for release timing, rain speed and the rain/dissolve split),
  - `aHood` (hoodie / cast / string flags from the mask, plus a fallback that treats green-ish pixels in the bottom 10 % as hoodie).
- Result: roughly 100–130k points on desktop, drawn with a single `gl.drawArrays(gl.POINTS)`.

### 1.4 The shader (one program, `VS` + `FS`)
Uniforms: projection/view/model, `uTime`, `uIntro` (0→1 over 2.6 s on load), `uShift` (scroll in model units), `uHalfW/uHalfH` (visible half-extents at the portrait's depth), `uMouse/uMouseVel/uRadius/uStrength` (pointer field), `uHood/uHoodOn` (recolour).

Vertex stage, in order:
1. **Intro** – particles arrive from a scattered state to their target over `uIntro` (eased).
2. **Release** – each particle has a start threshold `start = 0.04 + h01·1.1 + rand·0.08` where `h01` is its height in the figure (0 = bottom). Scroll `s` minus `start` is the particle's `drop`. Because `start` grows with height, the figure lets go **from the bottom up**.
3. **Two fates** – `rainer = step(0.45, rand.z)`: 55 % of particles rain, the rest dissolve near where they were. Rainers gain downward velocity, lateral spread and a slow drift; dissolvers fade over a short `drop`.
4. **Field** – `toField = smoothstep(0.6, 1.3, drop)·rainer`: rainers settle into a wrapped field that covers the whole viewport (`mod` on y with `uShift`, so it scrolls with the page and never runs out). This is the persistent background behind the decks.
5. **Pointer** – a radial falloff around `uMouse` pushes particles along `uMouseVel` (fluid-feeling displacement; the butterfly's position is used as the pointer so the field reacts to it).
6. **Hoodie recolour** – `shade = clamp(lum/0.72, 0.3, 1.18)`; `tinted = uHood·shade` (so folds and highlights survive the recolour); `col = mix(aCol, tinted, aHood.x·(1−aHood.z)·uHoodOn)` then `col = mix(col, skin, aHood.y·(1−aHood.x)·uHoodOn)` neutralises the bounce light. Drawstrings (`aHood.z`) are excluded, so they stay white for every colour.
7. Point size scales with viewport height and DPR; alpha fades with `drop` and the dissolve.

Fragment stage: a soft disc (`smoothstep` on distance from the point centre) × alpha, premultiplied output.

Blending is `ONE, ONE_MINUS_SRC_ALPHA` over a transparent canvas, so the particles sit on the CSS background and the page behind them stays readable.

### 1.5 Loader
A counter from 000 to 100 keeps the viewer informed while the three textures decode and the buffers are built. The build runs off the critical path (no long synchronous loops before first paint), an 8 s watchdog reveals the page even if an image fails, and every step is wrapped in try/catch. An earlier version stalled at 092 because target assignment ran synchronously; that is why the work is split.

### 1.6 Hoodie colour wheel (`.palette`)
A canvas draws a full hue ring (conic) with lightness toward the centre. Pointer position → hue/lightness → RGB via an HSL helper → `uHood`. `uHoodOn` and the colour are eased per frame (`lerp 0.08`) so switching is smooth. The choice is stored in `localStorage` (wrapped in try/catch; it is a convenience only).

### 1.7 The thread (`buildThread()` / `headLength()`)
- One `<path>` in a fixed SVG sized to the full document height; stroke width is `clamp(2.6vw, 16px, 44px)`; a vertical gradient fill.
- Waypoints are computed from the DOM: it starts just off the left edge above the Work section (so it is never visible during the hero), places points alternating left/right (`W·0.12` / `W·0.88`) down each pinned deck (one per ~1.3 screens), then after the last deck pushes a single point past the right edge (`W·1.14`) at a y clamped above the footer, so the stroke leaves the frame in one motion and never enters the footer.
- The points are turned into a smooth path with a **Catmull-Rom → cubic Bézier** conversion (tension 0.62).
- **Draw-on**: `stroke-dasharray = totalLen`, and `stroke-dashoffset` is set each frame from `headLength()`, which maps scroll position to a length along the path using a length→(x, y) lookup table sampled every 6 px. The head is gated so nothing is drawn until `scrollY > 0.98·H`.
- Rebuilt on resize and after fonts load (positions depend on layout).

### 1.8 Decks (`makeShow(id, DATA)`)
- Each deck is a `section.show` whose height is `(N−1)·per + 100svh` (`per` = 0.6 screens per card when N > 8, else 0.85) with a sticky inner stage, so the stage is pinned while the page scrolls through N−1 steps.
- Progress through the section → `prog`; the active card is `Math.round(prog)`; each card's transform (x offset, rotation, scale, z-index, opacity) is a function of `i − prog`, which gives the shuffling-deck feel and keeps the numbering locked to the centred card.
- Cards are `<a>` when the item has a `url` (Webflow and personal projects) and `<button>` otherwise (automations, which open the detail panel until their pages exist). The right-hand list highlights the active item; the left meta block (role / stack / type) updates on change.
- Content is data-driven from `WORK`, `AUTOMATIONS`, `PERSONAL`.

### 1.9 Butterfly cursor (`fly`)
- Own 2D canvas (`#fly`, z 9, `pointer-events: none`), DPR-aware.
- Mounted only when `(hover: hover) and (pointer: fine)` matches and reduced motion is off; listens to `pointermove`; unmounts if the media query changes.
- Motion: the target is the pointer plus a slow Lissajous wander; position follows with a spring (`follow 0.07`); heading from velocity with damped turning; bank angle from heading change; flap frequency 3 Hz, slowed and enlarged over links/buttons (`hover` state from `closest('a, button, input')`).
- Drawing: two Bézier wings with a pink→blue gradient and a thin highlight, a body ellipse, antennae, and a blurred soft shadow. The native cursor is kept.

### 1.10 Frame loop and performance
One `requestAnimationFrame` loop updates the loader, the pointer (eased, with velocity), the small camera rotation (parallax from pointer), the WebGL uniforms and draw, the butterfly, and the thread offset. Scroll-dependent CSS (deck transforms, reveals) runs in a passive scroll handler plus `IntersectionObserver` for section reveals. DPR is capped at 2 for the canvases. Touch devices get a coarser particle grid.

### 1.11 Responsive
Breakpoints 900 px and 760 px. The portrait is bottom-anchored (`uBaseY`) and sized from viewport height; decks stack and simplify; the palette, sound pill and scroll hint collapse; type scales with `clamp()`.

---

## 2. Reddit Keyword Alerts page (`automations/reddit-keyword-alerts.html`)

### 2.1 File anatomy
```
<style>   tokens, fixed UI, captions, runbook styles, breakpoints
<canvas #gl> + .scrim + .vignette
<div .ui>  mark, Let's talk, hero title, 4 captions (.cap[data-i]), end card, progress dots, scroll hint
<canvas #fly>, <div #runway> (680svh), screen-reader <h1>
<section #doc> the runbook (static HTML)
<script>   classic: UI layer (scroll → station, reveals, toc) — independent of WebGL
<script type="importmap"> three + three/addons from jsDelivr
<script type="module"> the 3D scene
```
The UI script runs first and alone, so captions, the runbook and navigation work even if WebGL or the CDN fails.

### 2.2 Renderer and post-processing
- `WebGLRenderer` (antialias off; bloom pass supplies smoothing), clear colour `#0d0d0d`, ACES filmic tone mapping, exposure 1.05, `transmissionResolutionScale 0.5`, pixel ratio capped at 1.5.
- `scene.environment` = `PMREMGenerator.fromScene(new RoomEnvironment())` so metals and glass have something to reflect; per-material `envMapIntensity` is kept low (0.25–0.55) to avoid the washed-out look.
- Composer: `RenderPass → UnrealBloomPass(strength 0.5, radius 0.55, threshold 0.9) → OutputPass`. The high threshold means only emissive parts bloom (gates, hand, matched cards, sparks).
- Fog: `FogExp2(#0d0d0d, 0.026)`.
- Lights: hemisphere (0.45), a key directional (1.1), a blue rim (0.5), and a **focus `PointLight`** that lerps to the active station so it is always the brightest thing on screen.

### 2.3 World coordinates
Stations along x: `start −26, clock −10, lens −2, fresh 4, seen 8, slack 15, end 22`. The raw stream runs at `y = 0`; the alert line at `y = 1.7`; the floor/water at `y = −1.15`.

### 2.4 Materials and helpers
- `metal(color, rough)` – `MeshStandardMaterial`, metalness 1.
- `glow(color, k)` – standard material with `emissive = color`, `emissiveIntensity k` (what bloom picks up).
- `glass(color, opacity, extra)` – `MeshPhysicalMaterial` with `transmission 0.9`, `thickness 0.4`, `ior 1.45`, clearcoat; `depthWrite false`.
- `pill(text, color, size)` – a canvas-rendered text label (uppercase, letter-spaced, drop shadow, **no box**) on a `PlaneGeometry`; all labels are billboarded to the camera every frame.
- `stripes` – a tileable 256×8 canvas texture (one rounded bar) used as `emissiveMap`/`alphaMap` with scrolling `offset` for the flowing alert line and the spinning dashed gates.
- `roundRect()` – canvas helper used by every texture.

### 2.5 Stations, mechanically
- **Clock** – metal torus, dark glossy face, 12 emissive ticks, an emissive hand on a pivot (`rotation.z = −phase·2π`, 4 s period), centre sphere, pedestal. At the top of each revolution: one of three ring meshes starts expanding across the water with fading additive opacity (the radar sweep), a cone "beam" flashes, the hand's emissive spikes, and sparks fire.
- **Lens** – a 2.15-radius transmission glass disc, a metal ring, a thin emissive halo ring, six `pill` labels orbiting (radius 1.55, slow rotation, billboarded). When a matched card crosses `X.lens` the halo's emissive flares (eased `lensGlow`) and the disc opacity rises.
- **Gates** (`gate(color)`) – metal torus + inner dashed torus (stripe texture, `offset.x` scrolling, emissive 1.6 → up to 4.6 on a hit) + faint transmission disc. Amber at `X.fresh`, pink at `X.seen`.
- **Memory** – `RoundedBoxGeometry` glass box, edge lines, 12 emissive slabs that become visible as cards are absorbed, a small tube "chute" from the gate down into the box, a `memPulse` scale/opacity ripple on each absorb.
- **Slack** – a 1280×880 `CanvasTexture` on a plane (`toneMapped false` so UI colours stay exact), a rounded dark backing box 0.07 behind it with `polygonOffset` (this removed the z-fighting flicker), a ping ring + dot at the corner, a stand. The canvas draws window chrome (traffic lights, `# alerts`, description, member count, sidebar with the active channel, composer) and a message list.

### 2.6 The card stream
- One **`InstancedMesh`** of 230 planes (150 on touch). The card art is a **texture atlas** (4×2 variants of a dark Reddit-style card: subreddit tag, two title bars, upvote arrow, two meta bars) drawn once to a canvas. A per-instance `aTile` attribute selects the tile; `onBeforeCompile` patches the vertex shader to offset `vMapUv` by it.
- Tint and glow: per-instance colour is set with `setColorAt`. In the fragment shader (also patched) the emissive term adds `diffuse · max(0, length(vColor) − 1.3)`, so any instance whose colour is pushed above white glows and blooms. Dim stream cards use ~0.95 grey; matched cards use mint ×1.9–2.7; amber ×1.9 for stale; pink ×1.9 for repeats.
- Per card state (`P[i]`): phase `u`, lane offsets, wobble, speed, and the flags `matched` (20 %), `stale` (30 % of matched), `seen` (30 % of matched), plus `px` (last x) to detect station crossings without firing on wrap-around.
- `updateCards(t)` computes each card's x from time, then branches: unmatched sink and fade after the lens; matched lift to the alert line (eased) and scale up briefly on the hit; stale ones tumble down after the amber gate; seen ones curve down into the memory box and are absorbed; survivors merge into the line just past the pink gate.
- **Crossings** fire effects: lens → mint spark burst + halo flare; amber gate → amber sparks + gate flare; pink gate → pink sparks + gate flare + memory ripple.
- A separate single-instance **courier** mesh departs the gates every 3 s (`CYCLE 3`, `RIDE 1.9 s`), rides an eased arc to the monitor and shrinks into it; its arrival pushes the next alert into the Slack window, fires the ping ring, a brief emissive glow on the monitor frame, and a spark. Five alerts cycle; the queue resets when the station is scrolled away.

### 2.7 Sparks
A pooled `Points` system (900 slots) with a `ShaderMaterial`: attributes `aVel`, `aCol`, `aLife (born, duration)`. The vertex shader integrates position = `p0 + v·age + g·age²` on the GPU and sizes/fades by age; the fragment draws a soft disc; additive blending, no depth write. `fire(x, y, z, color, n, speed, dur, now)` writes into a ring buffer and flags the attributes for upload.

### 2.8 Environment
- **Water** – `Reflector` (400×220 plane) with a **custom shader**: the mirrored scene texture is sampled through `texture2DProj` with UVs displaced by two scrolling samples of a tileable value-noise texture (ripples), multiplied to 55 % and added to a near-black base, plus tiny glints where both noise layers peak, with exponential fog applied in the shader (the Reflector material has no fog support of its own). The render target is 40 % of the viewport (30 % on touch) and `onBeforeRender` is wrapped to refresh only on alternate frames.
- **Mist** – four large horizontal planes at different heights with a `ShaderMaterial` combining two scrolling noise samples and a radial mask; opacities 0.035–0.055.
- **Ridge** – a 240×140 `PlaneGeometry` displaced in JS with a 5-octave value-noise fbm: a far back ridge (two layered terms), low side shoulders, a faint rim behind the camera; dark matte material; the base sits under the water so the mountains reflect.
- **Haze** – a 700-unit-wide vertical gradient plane behind the ridge (`fog: false`, `toneMapped: false`).
- **Sky** – 520 `Points` far back with per-point twinkle in the shader; **shooting stars** are three streak planes with a gradient-tail texture, fired every 3.5–8.5 s at a random position, angle, length and speed, fading with a sine envelope.
- **Dust** – 1400 faint points nearer the machine for continuity with the home page's particle field.

### 2.9 Camera and scroll
- `KEY` holds six camera set-ups (`pos`, `look`, focus-light position). `STATIONS` duplicates each at two progress values so the camera **holds** for the whole caption range (hero 0–.06, clock .15–.27, lens .34–.47, gates .54–.67, slack .74–.85, end .92–1) and travels only in the gaps, with `smoothstep` easing between keyframes.
- Progress comes from the UI script (`window.__stage.prog`) = `scrollY / (runway.height − H)`. The module reads it every frame; the camera, look target and focus light lerp toward their targets with `1 − exp(−4.2·dt)` (frame-rate independent). A `?snap` query sets the lerp to 1 for the screenshot harness.
- Pointer parallax adds ±0.35 units of camera offset.
- Portrait screens (`W/H < 0.85`): field of view 54° instead of 40°, camera stepped back 4.5 units and raised, look target lowered so the machine sits above the caption; the hero title moves to the bottom in CSS.
- When the runbook scrolls into view (`doc ≥ 0.5`), `.ui.off` hides captions, end card, dots and hint; mark and Let's talk remain.

### 2.10 Performance measures
Instancing for all cards; one draw call for sparks, dust, stars; canvas textures redrawn only when something changed (the Slack window redraws only while assembling or during the 2.4 s arrival animation, flagged by `slackState.dirty`); reflection at reduced resolution on alternate frames; transmission at half resolution; DPR ≤ 1.5; bloom threshold high so the bloom buffer is mostly empty; labels billboarded but static otherwise; `frustumCulled = false` only where an object is updated in a shader.

### 2.11 Runbook
Static HTML under the runway: facts `<dl>`, sticky `<nav class="toc">`, sections `.sec` with `h3 > span` numbers, `.steps` (grid rows with a coloured square tied to the station colour and the n8n node type in a mono chip), `.rules` cards, a `.code` block, a `.msg` Slack mock, `.stats`, `.pills`. Reveal on scroll with `IntersectionObserver` (`.rv → .in`), and a second observer highlights the current section in the nav.

---

## 3. Shared conventions
- **Colour tokens** live in `:root`; the Reddit page's accents are mint `#a6dfd3`, blue `#5B9BF6`, pink `#FF8FD0`, amber `#ffb454`, Reddit orange `#ff6a3d`. The Press page uses a different set (cream `#efe9df`, Webflow blue `#4353ff`, coral `#e8553d`, brass `#b8924a`) on purpose: no two automation pages share a world.
- **Type** – Elms Sans weights 100–900; headings weight 500 with tight tracking (−0.02 to −0.035 em); labels uppercase 12–13 px with 0.08–0.1 em tracking.
- **Motion rules** – scroll scrubs position, time drives idle motion; all per-frame easing is `dt`-based; `prefers-reduced-motion` slows the machines (×0.4), disables the cursor and the reveal animations.
- **Accessibility** – a visually hidden `<h1>` describes each automation page; captions are real text; interactive pills have focus rings; the cursor never replaces the native pointer.
- **Content rules** – no internal identifiers, credentials, webhook URLs, channel names or colleague names; competitors and authors are placeholders; the internal Notion is never linked.

---

## 4. QA harness (not shipped; lives in the working scratchpad)
Playwright launches headless Chromium with `--use-gl=swiftshader`, serves the page from a local folder with the fonts and three.js swapped to local copies (the sandbox cannot reach Google Fonts or the CDN), scrolls to given progress values (or `#ids` in the runbook), waits, and screenshots. Scripts exist for the home hero, the decks, the footer tail, the Reddit stations at desktop and phone sizes, and concept copies. Every published version was reviewed this way first; console errors and page errors are collected and printed.

## 5. Version history (tags)
Home: `v4-outline-name, v5-morph-name, v6-letter-by-letter, v7-ribbon-pour, v8-thread, v9-stream-slider, v10-deck-showcase, v11-dissolve-rain, v12-glass-title, v13-funnel, v14-simple-rain, v15-persistent-field, v16-hoodie-palette, v17-responsive, v18-content, v31-thread-exit`.
Reddit page: `auto-reddit-v1` (first machine) → `v2` (CDN fix, early captions) → `v3` (bloom, env, atlas cards, sparks, runbook) → `v3.1` (panel z-fight) → `v4` (ridge, haze, fog) → `v4.1` (stars, shooting stars) → `v5` (water + mist) → `v6` (Slack window, five alerts) → `v6.1` (perf) → `v7` (courier, plain labels) → `v7.1` (seen-gate label).

## 6. Adding the next automation page
1. Copy the structure of the Reddit file (UI script, import map, runbook skeleton); replace tokens, scene and copy. Do **not** reuse the environment or station props: each page needs its own world.
2. Keep `#runway` for the scrubbed part and `#doc` for the runbook; keep `window.__stage` as the bridge between the UI script and the module.
3. Add the page under `automations/`, then set `url` on the matching entry in the home page's `AUTOMATIONS` array so the deck card links to it.
4. Review at 1440×900 and 390×844 before publishing; tag the version.
