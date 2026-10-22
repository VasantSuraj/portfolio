# How it is built — technical documentation

_Companion to `DOCS.md`, which says what the site is and what each part means. This file is the engineering view: tools, techniques, data flow, and the reasoning behind each choice. Current as of 22 Oct 2026, version **v45-reddit-link**._

---

## 0. Stack at a glance

| Layer | Choice | Why |
|---|---|---|
| Pages | Plain HTML, one file per page, CSS and JS inline | No build step, nothing to install, trivially hostable, easy to hand over |
| Home hero | **Raw WebGL2** (no library), one custom shader program, `gl.POINTS` | About 120k particles with per-particle logic; a library would add weight without helping |
| Home projects / beach | **three.js 0.169** (ES modules via an importmap from jsDelivr) + `CSS3DRenderer`, `BufferGeometryUtils.mergeGeometries` | A real 3D forest, beach and lanterns; HTML cards placed in 3D stay crisp and clickable |
| Trees | **EZ-Tree** by Daniel Greenheck (MIT), vendored inline, geometry only | Procedural, realistic trees generated at load, with no model files to download |
| Smooth scroll | **Lenis 1.1.13** (jsDelivr) on one shared frame loop | Smoothed scroll value read by the camera in the same frame; native scroll if it fails |
| Automation pages | **three.js 0.158** + addons: `EffectComposer`, `RenderPass`, `UnrealBloomPass`, `OutputPass`, `RoomEnvironment`, `RoundedBoxGeometry`, `Reflector` | Real materials, lighting, post-processing and reflections without writing a renderer |
| Motion | Hand-rolled scroll→value mapping, `requestAnimationFrame`, time-based easing (`1 − exp(−k·dt)`) | Full control over the scrub; feels the same at any frame rate |
| Type | Elms Sans (UI) with an Archivo fallback, from Google Fonts | The approved face, loaded once |
| Textures | Poly Haven (CC0) for the forest floor, sand, rock and satin; the EZ-Tree texture set for bark and leaves | Free, realistic, downscaled to 512–1024 px |
| Asset prep | Python: `onnxruntime`, `numpy`, `Pillow`, `scipy` with **u2net_human_seg** (segmentation) and **Depth Anything V2 small** (depth) | Free and local; produces the three portrait textures |
| QA | Playwright + headless Chromium (software GL) | Renders every state as an image to review before publishing |
| Versioning | git tags + `backups/` copies | One-command revert to any approved state |

All tools are free. No paid services or licensed assets are used.

---

## 1. Home page (`index.html`)

### 1.1 File anatomy
```
<!doctype html>, <meta>, font <link>, <title>Vasant Suraj</title>
<style>         all CSS: tokens, forest cards/titles/counter, testimonial fallback cards, no3d fallback, panel, footer, UI, palette, loader, breakpoints
<canvas #forestGL>  fixed, z 1 — three.js forest + beach (opacity follows the forest mix)
<div #forestFx>     fixed, z 1 — CSS grain (SVG turbulence) + vignette over the forest
<canvas #gl>        fixed, z 2 — the particle portrait / rain
<div #forestCss>    fixed, z 3 — CSS3DRenderer layer: project cards, chapter titles, beach title
<main> (z 3)        .hero#top (100svh), .gap (40svh), section.forest#work (the tall runway, holds .flist), footer.foot#contact
<aside #panel>      slide-in details for automations without their own page (z 20)
<div .ui> (z 4)     .mark, .actions (#mode day/night, #sound, Let's talk), .scroll hint, .fcount counter, .palette (hoodie wheel)
<div .loader> (z 6) 000→100 counter
<canvas #fly>       butterfly cursor (z 9)
<script src=lenis>  Lenis 1.1.13
<script>            classic IIFE: Lenis + scroll state → footer star-name split → data (WORK, AUTOMATIONS, PERSONAL, TESTIMONIALS)
                    → panel → forest layout (runway keys, cards, titles, counter, keyboard) → day/night switch
                    → WebGL2 particles → butterfly → sound → loader + palette + frame loop → boot
<script importmap>  three@0.169.0 + three/addons
<script module>     EZ-Tree (vendored) → renderer/moods/fog/sky → ground → trees + billboards + LOD → ferns, light, shafts,
                    fireflies, falling leaves → beach (sand, rock, waterfall, spray, sea) → lanterns + banners → CSS3D
                    → fit() (sizes + camera poses) → camera path → applyMood() → tick()
```

**Layers:** forest 1 < particles 2 < cards and `main` 3 < UI 4 < loader 6 < butterfly 9 < panel 20 < fps readout 30.

**Click routing (v45):** `html.forest3d main{pointer-events:none}` plus `main>*:not(.forest){pointer-events:auto}`. The tall transparent runway would otherwise sit above the CSS3D cards and swallow their clicks; before v45, no card link or Details button worked in 3D. A card accepts clicks only while it faces the camera (`.fcard.on{pointer-events:auto}`; everything else is `pointer-events:none`).

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
A counter from 000 to 100 keeps the viewer informed while the three textures decode and the buffers are built. The target climbs to 92 until the build is done, then to 100. An 8 s watchdog reveals the page even if an image fails, and every step is wrapped in try/catch. `reveal()` fades in the mark, actions and palette and starts the intro.

### 1.6 Hoodie colour wheel (`.palette`)
A 220 px canvas draws a full HSL wheel (hue by angle, saturation by radius), with a lightness slider. The pointer position maps through an HSL helper to RGB, which goes to `uHood`. `uHoodOn` and the colour are eased per frame (`lerp 0.08`). The choice is stored in `localStorage('hoodie')`, wrapped in try/catch because it is only a convenience. "Original" resets it. The palette hides after half a screen of scroll.

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

---

## 2. Reddit Keyword Alerts page (`automations/reddit-keyword-alerts.html`)

### 2.1 File anatomy
```
<!doctype html> + charset + viewport (added v45), <title>, fonts
<style>   tokens, fixed UI, captions, runbook styles, breakpoints
<canvas #gl> + .scrim + .vignette
<div .ui>  mark (← home, ../index.html), Let's talk (mailto), hero title, 4 captions (.cap[data-i]), end card, progress dots, scroll hint
<canvas #fly>, <div #runway> (680svh), screen-reader <h1>
<section #doc> the runbook (static HTML)
<script>   classic: UI layer (scroll → station, reveals, toc) — independent of WebGL
<script type="importmap"> three + three/addons from jsDelivr
<script type="module"> the 3D scene
```
The UI script runs first and alone, so the captions, runbook and navigation work even if WebGL or the CDN fails.

### 2.2 Renderer and post-processing
- `WebGLRenderer` (antialias off; the bloom pass supplies smoothing), clear colour `#0d0d0d`, ACES filmic tone mapping, exposure 1.05, `transmissionResolutionScale 0.5`, pixel ratio capped at 1.5.
- `scene.environment` = `PMREMGenerator.fromScene(new RoomEnvironment())`, so metals and glass have something to reflect. Per-material `envMapIntensity` is kept low (0.25–0.55) to avoid a washed-out look.
- Composer: `RenderPass → UnrealBloomPass(strength 0.5, radius 0.55, threshold 0.9) → OutputPass`. The high threshold means only emissive parts bloom (gates, hand, matched cards, sparks).
- Fog: `FogExp2(#0d0d0d, 0.026)`.
- Lights: hemisphere (0.45), a key directional (1.1), a blue rim (0.5), and a **focus `PointLight`** that lerps to the active station so it is always the brightest thing on screen.

### 2.3 World coordinates
Stations along x: `start −26, clock −10, lens −2, fresh 4, seen 8, slack 15, end 22`. The raw stream runs at `y = 0`, the alert line at `y = 1.7`, and the floor/water at `y = −1.15`.

### 2.4 Materials and helpers
- `metal(color, rough)`: `MeshStandardMaterial`, metalness 1.
- `glow(color, k)`: a standard material with `emissive = color` and `emissiveIntensity k` (what bloom picks up).
- `glass(color, opacity, extra)`: `MeshPhysicalMaterial` with `transmission 0.9`, `thickness 0.4`, `ior 1.45`, clearcoat; `depthWrite false`.
- `pill(text, color, size)`: a canvas-rendered text label (uppercase, letter-spaced, drop shadow, **no box**) on a `PlaneGeometry`. All labels are billboarded to the camera every frame.
- `stripes`: a tileable 256×8 canvas texture (one rounded bar) used as `emissiveMap`/`alphaMap` with a scrolling `offset`, for the flowing alert line and the spinning dashed gates.
- `roundRect()`: a canvas helper used by every texture.

### 2.5 Stations, mechanically
- **Clock:** metal torus, dark glossy face, 12 emissive ticks, an emissive hand on a pivot (`rotation.z = −phase·2π`, 4 s period), a centre sphere and a pedestal. At the top of each revolution, one of three ring meshes expands across the water with fading additive opacity (the radar sweep), a cone "beam" flashes, the hand's emissive spikes, and sparks fire.
- **Lens:** a 2.15-radius transmission glass disc, a metal ring, a thin emissive halo ring, and six `pill` labels orbiting (radius 1.55, slow rotation, billboarded). When a matched card crosses `X.lens`, the halo's emissive flares (eased `lensGlow`) and the disc opacity rises.
- **Gates** (`gate(color)`): a metal torus, an inner dashed torus (stripe texture, scrolling `offset.x`, emissive 1.6 rising to 4.6 on a hit) and a faint transmission disc. Amber at `X.fresh`, pink at `X.seen`.
- **Memory:** a `RoundedBoxGeometry` glass box, edge lines, 12 emissive slabs that become visible as cards are absorbed, a small tube "chute" from the gate down into the box, and a `memPulse` scale/opacity ripple on each absorb.
- **Slack:** a 1280×880 `CanvasTexture` on a plane (`toneMapped false`, so UI colours stay exact), a rounded dark backing box 0.07 behind it with `polygonOffset` (this removed the z-fighting flicker), a ping ring and dot at the corner, and a stand. The canvas draws window chrome (traffic lights, `# alerts`, description, member count, a sidebar with the active channel, composer) and a message list.

### 2.6 The card stream
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

### 2.7 Sparks
A pooled `Points` system (900 slots) with a `ShaderMaterial`. Attributes: `aVel`, `aCol`, `aLife` (born, duration). The vertex shader integrates position = `p0 + v·age + g·age²` on the GPU and sizes and fades by age; the fragment draws a soft disc; additive blending, no depth write. `fire(x, y, z, color, n, speed, dur, now)` writes into a ring buffer and flags the attributes for upload.

### 2.8 Environment
- **Water:** a `Reflector` (400×220 plane) with a **custom shader**.
  - The mirrored scene texture is sampled through `texture2DProj`, with UVs displaced by two scrolling samples of a tileable value-noise texture (ripples), multiplied to 55 % and added to a near-black base.
  - Tiny glints appear where both noise layers peak. Exponential fog is applied in the shader, because the Reflector material has no fog support of its own.
  - The render target is 40 % of the viewport (30 % on touch), and `onBeforeRender` is wrapped to refresh only on alternate frames.
- **Mist:** four large horizontal planes at different heights with a `ShaderMaterial` combining two scrolling noise samples and a radial mask; opacities 0.035–0.055.
- **Ridge:** a 240×140 `PlaneGeometry` displaced in JS with a 5-octave value-noise fbm. It has a far back ridge (two layered terms), low side shoulders and a faint rim behind the camera, with a dark matte material. The base sits under the water so the mountains reflect.
- **Haze:** a 700-unit-wide vertical gradient plane behind the ridge (`fog: false`, `toneMapped: false`).
- **Sky:** 520 `Points` far back with per-point twinkle in the shader. **Shooting stars** are three streak planes with a gradient-tail texture, fired every 3.5–8.5 s at a random position, angle, length and speed, fading with a sine envelope.
- **Dust:** 1400 faint points nearer the machine, for continuity with the home page's particle field.

### 2.9 Camera and scroll
- `KEY` holds six camera set-ups (`pos`, `look`, focus-light position). `STATIONS` duplicates each at two progress values, so the camera **holds** for the whole caption range and travels only in the gaps, with `smoothstep` easing between keyframes. Ranges: hero 0–.06, clock .15–.27, lens .34–.47, gates .54–.67, slack .74–.85, end .92–1.
- Progress comes from the UI script: `window.__stage.prog = scrollY / (runway.height − H)`. The module reads it every frame. The camera, look target and focus light lerp toward their targets with `1 − exp(−4.2·dt)`, which is frame-rate independent. A `?snap` query sets the lerp to 1 for the screenshot harness.
- Pointer parallax adds ±0.35 units of camera offset.
- Portrait screens (`W/H < 0.85`): field of view 54° instead of 40°, camera stepped back 4.5 units and raised, look target lowered so the machine sits above the caption; the hero title moves to the bottom in CSS.
- When the runbook scrolls into view (`doc ≥ 0.5`), `.ui.off` hides the captions, end card, dots and hint; the mark and Let's talk remain.

### 2.10 Performance measures
- instancing for all cards
- one draw call each for sparks, dust and stars
- canvas textures redrawn only when something changed: the Slack window redraws only while assembling or during the 2.4 s arrival animation, flagged by `slackState.dirty`
- reflection at reduced resolution, on alternate frames
- transmission at half resolution
- DPR ≤ 1.5
- a high bloom threshold, so the bloom buffer is mostly empty
- labels billboarded but otherwise static
- `frustumCulled = false` only where an object is updated in a shader

### 2.11 Runbook
Static HTML under the runway:
- a facts `<dl>` and a sticky `<nav class="toc">`
- sections `.sec` with `h3 > span` numbers
- `.steps`: grid rows with a coloured square tied to the station colour and the n8n node type in a mono chip
- `.rules` cards, a `.code` block, a `.msg` Slack mock, `.stats`, `.pills`

Reveal on scroll uses `IntersectionObserver` (`.rv → .in`), and a second observer highlights the current section in the nav.

### 2.12 Links (v45)
- `.mark` → `../index.html` (aria-label "Back to Vasant Suraj")
- "Let's talk" → `mailto:vasantsuraj02@gmail.com`
- "Back to the machine" → `#top`
- "Next automation → Competitive Intel System" (`#nextLink`, `#nextLink2`) is still `#`

---

## 3. Shared conventions
- **Colour tokens** live in `:root`.
  - Home: bg `#0d0d0d`, ink `#f1f1ee`, soft ink `#8a8b90`, pill `#1a1b1e`. The forest and beach colours live in the `MOOD`/`BEACH`/`DUSK` objects.
  - Reddit page accents: mint `#a6dfd3`, blue `#5B9BF6`, pink `#FF8FD0`, amber `#ffb454`, Reddit orange `#ff6a3d`.
  - The Press page will use a different set on purpose (cream `#efe9df`, Webflow blue `#4353ff`, coral `#e8553d`, brass `#b8924a`): no two automation pages share a world.
- **Type:** Elms Sans weights 100–900; headings weight 500 with tight tracking (−0.02 to −0.035 em); labels uppercase 12–13 px with 0.08–0.1 em tracking. The footer name is weight 800. Banner text is drawn on canvas at weight 700.
- **Motion rules:**
  - scroll scrubs position, time drives idle motion; all per-frame easing is `dt`-based
  - the testimonial lanterns are **scroll-only**, by request
  - `prefers-reduced-motion` slows the machines (×0.4), disables the cursor, smooth scroll and reveal animations, and makes the camera settle faster
- **Accessibility:** a visually hidden `<h1>` describes each automation page, and the home keeps its card list for screen readers. Captions are real text, interactive pills have focus rings, and the cursor never replaces the native pointer.
- **Content rules:** no internal identifiers, credentials, webhook URLs, channel names or colleague names; competitors and authors are placeholders; the internal Notion is never linked. No public input forms. No trademarked logos or characters as artwork.

---

## 4. QA harness (not shipped; lives in the AI workspace scratchpad)
Playwright launches headless Chromium with `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist`. It loads pages from a local static server (`python3 -m http.server 8765`), with three.js, Lenis and fonts swapped for local copies because the sandbox cannot reach jsDelivr or Google Fonts. **Screenshots therefore use fallback fonts, not Elms Sans**, and the fps readout (0–3 fps) means nothing. Compare triangles and JS ms instead, and ask for real fps on Vasant's machine.

**To recreate:**
1. `npm i three@0.169.0` in the QA folder.
2. Copy `lenis.min.js` from npm `lenis@1.1.13/dist`.
3. Route `three@0.169.0/*`, `three@0.158.0/*` (served from the same 0.169 copy) and `lenis@*` to the local files, and return an empty body for `fonts.g*`.

**Scripts:**
- `shoot.js LABEL W H targets…`: targets are `key=N`, `s=N`, `card=N`, `title=N` or `y=N`. It loads `index.html?snap&fps`, waits 9 s, then 14 s per target. `night` in the label switches to night mode; a `phone…` label emulates mobile.
- `keys.js`: prints all runway keys and page errors. Run it after every edit to catch syntax errors such as a duplicated `const`.
- `click.js`: scrolls to the Reddit card, reports `elementFromPoint` at its centre, and checks that navigation fires.
- Older scripts: hero, decks, footer tail, Reddit stations at desktop and phone sizes, and perf/cull/flicker probes.

**Gotchas:**
- The background server stops after the background time limit; restart it.
- `pkill -f` with a pattern that appears in your own command kills your shell.
- `page.route` plus a click-navigation can hang; check that the navigation request fired instead.

Every published version was reviewed this way first, at 1440×900 and 390×844.

## 5. Version history (tags)

**Home, first sessions (old working repo):** `v4-outline-name, v5-morph-name, v6-letter-by-letter, v7-ribbon-pour, v8-thread, v9-stream-slider, v10-deck-showcase, v11-dissolve-rain, v12-glass-title, v13-funnel, v14-simple-rain, v15-persistent-field, v16-hoodie-palette, v17-responsive, v18-content, v31-thread-exit`.

**Home, forest and beach (current repo, all with `backups/index-<tag>.html`):**
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
- `pre-beach`
- `v39-beach`: first beach
- `pre-beach-v2`
- `v40-beach-real`: real sand, rock, headland, waterfall, lanterns, satin banners, form removed, footer email and city, Reddit link
- **`main-version`** = `bffe487` (v40 + unused textures removed)
- `v41-lantern-flight`, `v42-one-lantern`, `v43-lanterns-away`, `v44-card-text`
- **`v45-reddit-link` (current)**

**Reddit page:** `auto-reddit-v1` (first machine) → `v2` (CDN fix, early captions) → `v3` (bloom, env, atlas cards, sparks, runbook) → `v3.1` (panel z-fight) → `v4` (ridge, haze, fog) → `v4.1` (stars, shooting stars) → `v5` (water + mist) → `v6` (Slack window, five alerts) → `v6.1` (perf) → `v7` (courier, plain labels) → `v7.1` (seen-gate label) → v45 fixes (doctype, viewport, back link, mailto).

## 6. Adding the next automation page
1. Copy the structure of the Reddit file: doctype and viewport, UI script, import map, runbook skeleton. Replace the tokens, scene and copy. Do **not** reuse the environment or station props: each page needs its own world.
2. Keep `#runway` for the scrubbed part and `#doc` for the runbook. Keep `window.__stage` as the bridge between the UI script and the module. The back mark goes to `../index.html`, and Let's talk to the mailto.
3. Add the page under `automations/`, then set `url` on the matching entry in the home page's `AUTOMATIONS` array, so the forest card opens it in the same tab.
4. Review at 1440×900 and 390×844 before publishing, and tag the version.
