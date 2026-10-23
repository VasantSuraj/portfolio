/* talk/board.js — the "Let's talk" board.
   A weathered plank board on brass chains drops in front of the page, the page blurs behind it, and the contact form
   sits on the wood: words burned into the grain, fields carved into it, brass buttons. site.js loads this file only when
   someone clicks "Let's talk", and keeps the settings and the sending (open(config, { opener, send })).
   Textures: wood_shutter (Poly Haven, CC0); chain links from brass_diya_lantern (Poly Haven, CC0). */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.min.js';
import { CSS3DRenderer, CSS3DObject } from './css3d.js';
import { RoomEnvironment } from './room.js';

const BASE = new URL('./', import.meta.url).href;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- styles (everything prefixed tb- so it never touches the page) ---------- */
const CSS = `
.tb-root{position:fixed;inset:0;z-index:2147483000;display:none;font-family:'Elms Sans','Archivo','Helvetica Neue',Arial,sans-serif}
.tb-root.on{display:block}
.tb-veil{position:absolute;inset:0;background:rgba(10,8,6,0);backdrop-filter:blur(0) brightness(1);-webkit-backdrop-filter:blur(0) brightness(1);transition:backdrop-filter 1s cubic-bezier(.3,.7,.2,1),-webkit-backdrop-filter 1s cubic-bezier(.3,.7,.2,1),background 1s}
.tb-root.blur .tb-veil{background:rgba(10,8,6,.22);backdrop-filter:blur(11px) brightness(.74) saturate(.9);-webkit-backdrop-filter:blur(11px) brightness(.74) saturate(.9)}
.tb-gl{position:absolute;inset:0;width:100%;height:100%;display:block}
.tb-css{position:absolute;inset:0}
.tb-wait{position:absolute;left:0;right:0;top:50%;text-align:center;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:rgba(241,235,226,.7)}
.tb-measure{position:fixed;left:-30000px;top:0;visibility:hidden;pointer-events:none}
.tb-face{box-sizing:border-box;position:relative;width:var(--fw);padding:var(--pad-t) var(--pad-x) var(--pad-b);display:flex;flex-direction:column;gap:18px;color:#2a170a;font-family:'Elms Sans','Archivo','Helvetica Neue',Arial,sans-serif;text-align:left}
.tb-face *{box-sizing:border-box}
.tb-face.tb-short{justify-content:center}
.tb-face.tb-short .tb-hd{position:absolute;top:calc(var(--pad-t) - 14px);right:calc(var(--pad-x) - 14px)}
.tb-hd{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
.tb-face h2,.tb-face h3{margin:0;font-family:'Fraunces',Georgia,'Times New Roman',serif;font-weight:800;font-size:50px;line-height:1;letter-spacing:-.01em}
.tb-face h3{font-size:40px}
.tb-intro,.tb-face p{margin:8px 0 0;font-size:16.5px;line-height:1.45;font-weight:700;max-width:34ch}
.tb-face p{margin:0}
.tb-form{display:flex;flex-direction:column;gap:6px;margin:0}
.tb-row{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.tb-f{display:flex;flex-direction:column;gap:8px;min-width:0}
.tb-f label{font-weight:800;font-size:12.5px;letter-spacing:.16em;text-transform:uppercase}
.tb-f input,.tb-f textarea{all:unset;box-sizing:border-box;width:100%;height:50px;padding:0 16px;font-family:'Elms Sans','Archivo','Helvetica Neue',Arial,sans-serif;font-size:17px;font-weight:500;color:#f6ead6;border-radius:6px;caret-color:#ff9a3c;transition:box-shadow .2s}
.tb-f textarea{height:118px;padding:13px 16px;line-height:1.45;resize:none;white-space:pre-wrap}
.tb-f input::placeholder,.tb-f textarea::placeholder{color:rgba(246,234,214,.45)}
.tb-f input:focus,.tb-f textarea:focus{box-shadow:0 0 0 2px rgba(255,154,60,.85),0 0 18px rgba(255,154,60,.25)}
.tb-f.tb-bad input,.tb-f.tb-bad textarea{box-shadow:0 0 0 2px rgba(224,99,58,.95)}
.tb-msg{display:block;min-height:19px;font-size:13px;font-weight:800;line-height:19px}
.tb-foot{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-top:4px}
.tb-note{font-size:13px;font-weight:700;line-height:1.4;max-width:24ch}
.tb-hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
.tb-seal{width:76px;height:76px;display:block}
.tb-done{display:flex;flex-direction:column;gap:16px;align-items:flex-start}
.tb-btns{display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.tb-brass{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:10px;height:54px;padding:0 26px;border-radius:5px;font-family:'Elms Sans','Archivo','Helvetica Neue',Arial,sans-serif;font-weight:800;font-size:13.5px;letter-spacing:.14em;text-transform:uppercase;color:#3a2808;text-shadow:0 1px 0 rgba(255,236,190,.55);
  background:radial-gradient(120% 140% at 25% 0%,rgba(255,240,200,.55),transparent 55%),repeating-linear-gradient(90deg,rgba(90,60,20,.10) 0 1px,transparent 1px 3px),linear-gradient(180deg,#e7c27a,#b98a3e 55%,#9a6f2c);
  box-shadow:inset 0 1px 0 rgba(255,245,210,.7),inset 0 -2px 0 rgba(80,52,14,.55),0 0 0 1px rgba(70,45,10,.75),0 6px 10px rgba(20,10,2,.55);filter:brightness(.8) saturate(.82);transition:transform .15s,filter .15s}
.tb-brass::before,.tb-brass::after{content:"";width:6px;height:6px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#f6dfa8,#7a5a22 70%);box-shadow:0 0 0 1px rgba(60,40,10,.6)}
.tb-brass:hover{filter:brightness(.88) saturate(.85)}
.tb-brass:active{transform:translateY(1px)}
.tb-brass[disabled]{cursor:progress;filter:brightness(.75) saturate(.6)}
.tb-knob{all:unset;cursor:pointer;flex:none;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 38% 32%,#f2d79c,#b98a3e 45%,#5b3f15 100%);box-shadow:0 3px 5px rgba(20,10,2,.6),inset 0 -2px 3px rgba(60,40,10,.6);filter:brightness(.8) saturate(.82)}
.tb-knob svg{width:14px;height:14px}
.tb-brass:focus-visible,.tb-knob:focus-visible{outline:2px solid #ff9a3c;outline-offset:4px}
.tb-tag{display:inline-block;background:#efe2c8;color:#2a1a0d;border-radius:3px;padding:11px 14px;font-size:16px;font-weight:700;box-shadow:0 4px 10px rgba(0,0,0,.4);transform:rotate(-1.2deg);user-select:all;filter:brightness(.88);overflow-wrap:anywhere}
.tb-ghost{all:unset;cursor:pointer;font-weight:800;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:#2a170a;padding:14px 8px;text-decoration:underline;text-underline-offset:5px}
.tb-ghost:focus-visible{outline:2px solid #ff9a3c;outline-offset:2px}
.tb-css [data-bake]{color:transparent!important;text-shadow:none!important}
.tb-css .tb-seal{visibility:hidden}
.tb-face.tb-m{gap:12px}
.tb-face.tb-m h2{font-size:36px}.tb-face.tb-m h3{font-size:30px}
.tb-face.tb-m .tb-row{grid-template-columns:1fr;gap:4px}
.tb-face.tb-m .tb-form{gap:4px}
.tb-face.tb-m .tb-intro{font-size:14.5px;margin-top:6px}
.tb-face.tb-m .tb-f{gap:6px}
.tb-face.tb-m .tb-f input{height:46px}
.tb-face.tb-m .tb-f textarea{height:80px}
.tb-face.tb-m .tb-msg{min-height:16px;line-height:16px;font-size:12px}
.tb-face.tb-m .tb-foot{flex-direction:column;align-items:stretch;gap:12px}
.tb-face.tb-m .tb-brass{width:100%;height:50px}
@media (prefers-reduced-motion:reduce){.tb-veil{transition:none}}`;

/* ---------- the plank texture lines up with these numbers (measured from the wood_shutter map) ---------- */
const SEAMS = [0.1484, 0.2954, 0.4409, 0.5557, 0.7026, 0.8501, 0.9976];   // plank joints across one tile
const NAIL_V = 1 - 973 / 2048;                                             // the row of nail heads, height within the tile
const MPP = 0.0017;                                                        // metres per CSS pixel on the board

let C, API, ready = null, isOpen = false, opener = null, openedAt = 0, state = 'form', failText = '';
let root, veil, glCanvas, cssHost, measureHost, waitEl;
let renderer, cssR, scene, camera, rig, board, cssObj = null, liveFace = null, mobile = false, B = null;
let woodImg, woodNor, woodRough, woodColorTex, brass, sideMat, chainData, leafTex, leafMat, key, sun;
const saved = {};

/* ---------- faces ---------- */
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const X = `<button class="tb-knob" type="button" data-close aria-label="Close"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12" stroke="#3a2808" stroke-width="2.4" stroke-linecap="round"/></svg></button>`;
const faces = {
  form: m => `<div class="tb-face${m ? ' tb-m' : ''}">
  <div class="tb-hd"><div><h2 data-bake id="tb-title">${esc(C.title)}</h2><p class="tb-intro" data-bake>${esc(C.intro)}</p></div>${X}</div>
  <form class="tb-form" novalidate>
    <div class="tb-f"><label data-bake for="tb-name">Name</label><input data-recess id="tb-name" name="name" autocomplete="name" maxlength="80"><span class="tb-msg" data-bake id="tb-e-name"></span></div>
    <div class="tb-row">
      <div class="tb-f"><label data-bake for="tb-phone">Contact number</label><input data-recess id="tb-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="30" placeholder="+91 98765 43210"><span class="tb-msg" data-bake id="tb-e-phone"></span></div>
      <div class="tb-f"><label data-bake for="tb-email">Email</label><input data-recess id="tb-email" name="email" type="email" inputmode="email" autocomplete="email" maxlength="120" placeholder="you@company.com"><span class="tb-msg" data-bake id="tb-e-email"></span></div>
    </div>
    <div class="tb-f"><label data-bake for="tb-message">Message</label><textarea data-recess id="tb-message" name="message" maxlength="1500" placeholder="What are you building, and where can I help?"></textarea><span class="tb-msg" data-bake id="tb-e-message"></span></div>
    <div class="tb-hp" aria-hidden="true"><label for="tb-company">Company</label><input id="tb-company" name="company" tabindex="-1" autocomplete="off"></div>
    <div class="tb-foot"><span class="tb-note" data-bake>Your details are only used to reply to you.</span><button class="tb-brass" type="submit">Send message</button></div>
  </form></div>`,
  sent: m => `<div class="tb-face tb-short${m ? ' tb-m' : ''}"><div class="tb-hd"><span></span>${X}</div>
  <div class="tb-done" role="status"><svg class="tb-seal" data-seal viewBox="0 0 76 76" aria-hidden="true"></svg>
  <h3 data-bake data-glow id="tb-title">Message sent</h3><p data-bake data-glow>Thanks. I'll get back to you soon, on WhatsApp or by email.</p>
  <button class="tb-brass" type="button" data-close>Close</button></div></div>`,
  error: m => `<div class="tb-face tb-short${m ? ' tb-m' : ''}"><div class="tb-hd"><span></span>${X}</div>
  <div class="tb-done" role="alert"><h3 data-bake id="tb-title">That didn't go through</h3><p data-bake>${esc(failText || 'Your message is still here.')} Try again, or email me directly:</p>
  <span class="tb-tag" data-mail>${esc(C.email)}</span>
  <div class="tb-btns"><button class="tb-brass" type="button" data-copy>Copy email</button><button class="tb-ghost" type="button" data-retry>Try again</button></div></div></div>`
};

/* ---------- one-time setup ---------- */
function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function domSetup() {
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  if (!document.querySelector('link[href*="family=Fraunces"]')) { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Elms+Sans:wght@400..800&family=Fraunces:opsz,wght@9..144,600..800&display=swap'; document.head.appendChild(l); }
  root = document.createElement('div'); root.className = 'tb-root';
  root.innerHTML = `<div class="tb-veil"></div><canvas class="tb-gl" aria-hidden="true"></canvas><div class="tb-css"></div><p class="tb-wait">Cutting the board…</p>`;
  measureHost = document.createElement('div'); measureHost.className = 'tb-measure'; measureHost.setAttribute('aria-hidden', 'true');
  document.body.append(root, measureHost);
  veil = root.querySelector('.tb-veil'); glCanvas = root.querySelector('.tb-gl'); cssHost = root.querySelector('.tb-css'); waitEl = root.querySelector('.tb-wait');
  // a click anywhere off the board closes it
  root.addEventListener('click', e => { if (isOpen && !e.target.closest('.tb-face')) close(); });
  document.addEventListener('keydown', e => {
    if (!isOpen || !liveFace) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    if (e.key === 'Tab') { const f = [...liveFace.querySelectorAll('input:not([tabindex]),textarea,button')]; if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus({ preventScroll: true }); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus({ preventScroll: true }); } }
  });
  let rt, lastW = innerWidth;
  addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => {
    if (!B) return;
    // a phone keyboard opening only changes the height: keep the board as it is
    if (innerWidth === lastW && liveFace && liveFace.contains(document.activeElement) && mobile) return;
    lastW = innerWidth; if ((innerWidth < 640) !== mobile) buildBoard(); else fit();
  }, 150); });
}

async function assetsSetup() {
  renderer = new THREE.WebGLRenderer({ canvas: glCanvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(1.75, devicePixelRatio || 1));
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  cssR = new CSS3DRenderer(); cssHost.appendChild(cssR.domElement);
  scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(28, 1, 0.05, 40);
  const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture; scene.environmentIntensity = 0.2;
  // dusk under the canopy: a dim sky bounce, a soft warm key from the front, the low sun behind as a rim, the forest's brown fog
  scene.fog = new THREE.Fog(0x57493d, 0.5, 16);
  scene.add(new THREE.HemisphereLight(0xd6b994, 0x1d150f, 0.95));
  key = new THREE.DirectionalLight(0xe0c6a6, 1.45); key.position.set(-1.6, 2.4, 3.4); key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024); Object.assign(key.shadow.camera, { left: -1.5, right: 1.5, top: 2, bottom: -2, near: .5, far: 10 }); key.shadow.bias = -0.0004; key.shadow.normalBias = 0.01;
  sun = new THREE.DirectionalLight(0xffb070, 2.2); sun.position.set(2.6, 2.0, -2.2);
  scene.add(key, key.target, sun, sun.target);
  rig = new THREE.Group(); board = new THREE.Group(); rig.add(board); scene.add(rig);

  const tl = new THREE.TextureLoader(), aniso = renderer.capabilities.getMaxAnisotropy();
  const load = (u, srgb) => new Promise((res, rej) => tl.load(BASE + u, t => { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = aniso; if (srgb) t.colorSpace = THREE.SRGBColorSpace; res(t); }, undefined, () => rej(new Error('could not load ' + u))));
  let brassDiff, brassNor, brassRough, brassMetal;
  [woodImg, woodNor, woodRough, brassDiff, brassNor, brassRough, brassMetal, chainData] = await Promise.all([
    new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('could not load the wood')); i.src = BASE + 'wood_diff_2k.jpg'; }),
    load('wood_nor_2k.jpg'), load('wood_rough_1k.jpg'),
    load('brass_diff_1k.jpg', true), load('brass_nor_1k.jpg'), load('brass_rough_1k.jpg'), load('brass_metal_1k.jpg'),
    fetch(BASE + 'chain.json').then(r => { if (!r.ok) throw new Error('chain ' + r.status); return r.json(); }),
    document.fonts ? Promise.all([document.fonts.load('800 50px Fraunces'), document.fonts.load('800 13px "Elms Sans"')]).catch(() => {}) : null
  ]);
  for (const t of [brassDiff, brassNor, brassRough, brassMetal]) { t.flipY = false; t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; t.needsUpdate = true; }
  woodColorTex = new THREE.Texture(woodImg); woodColorTex.colorSpace = THREE.SRGBColorSpace; woodColorTex.wrapS = woodColorTex.wrapT = THREE.RepeatWrapping; woodColorTex.needsUpdate = true;
  brass = new THREE.MeshStandardMaterial({ map: brassDiff, normalMap: brassNor, roughnessMap: brassRough, metalnessMap: brassMetal, metalness: 1, roughness: 1, color: 0xd8c3a0 });
  sideMat = new THREE.MeshStandardMaterial({ map: woodColorTex, normalMap: woodNor, roughnessMap: woodRough, color: 0x9a7a62 });
  // canopy shade: soft leaf shadows over the face, drifting slowly
  const lc = document.createElement('canvas'); lc.width = lc.height = 512;
  { const g = lc.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, 512, 512); g.filter = 'blur(14px)';
    for (let i = 0; i < 40; i++) for (const dx of [-512, 0, 512]) for (const dy of [-512, 0, 512]) { const R = mulberry(1000 + i);
      const x = R() * 512 + dx, y = R() * 512 + dy, r = 14 + R() * 46, a = .5 + R() * .6, rot = R() * 3, v = Math.round(150 + R() * 40);
      g.fillStyle = `rgb(${v},${v - 6},${v - 12})`; g.beginPath(); g.ellipse(x, y, r, r * a, rot, 0, 7); g.fill(); }
    g.filter = 'none'; }
  leafTex = new THREE.CanvasTexture(lc); leafTex.colorSpace = THREE.SRGBColorSpace; leafTex.wrapS = leafTex.wrapT = THREE.RepeatWrapping;
  leafMat = new THREE.MeshBasicMaterial({ map: leafTex, blending: THREE.MultiplyBlending, premultipliedAlpha: true, transparent: true, depthWrite: false, fog: false, toneMapped: false });
}

/* ---------- building the board to fit the form ---------- */
function setPad(f) { f.style.setProperty('--pad-t', mobile ? '40px' : '58px'); f.style.setProperty('--pad-x', mobile ? '24px' : '54px'); f.style.setProperty('--pad-b', mobile ? '40px' : '52px'); }
function measureFace(st, fw) { measureHost.innerHTML = faces[st](mobile); const f = measureHost.firstElementChild; f.style.setProperty('--fw', fw + 'px'); setPad(f); return f; }
function snapWidth(target, P) {
  const uL = SEAMS[0] + 0.001, joints = [];
  for (let t = 0; t < 4; t++) for (const s of SEAMS) joints.push((t + s - uL) * P);
  let best = joints[0]; for (const j of joints) if (j > 0.2 && Math.abs(j - target) < Math.abs(best - target)) best = j;
  return { W: best - 0.002, uL };
}
let chainMeshes = [];
function buildBoard() {
  board.clear(); if (B) { B.tex.dispose(); B.glowTex.dispose(); }
  mobile = innerWidth < 640;
  const target = mobile ? 0.62 : 1.12;
  // the tile is stretched so its row of nails lands twice, along the top and the bottom, like two battens
  let P = 1, W, uL, fw, fh, H;
  for (let it = 0; it < 4; it++) { ({ W, uL } = snapWidth(target, P)); fw = Math.round(W / MPP); fh = measureFace('form', fw).offsetHeight; H = fh * MPP; P = H - 0.068; }
  ({ W, uL } = snapWidth(target, P)); fw = Math.round(W / MPP);
  const D = 0.038, offU = uL + W / (2 * P), offV = NAIL_V - (H / 2 - 0.034) / P;
  // outline: square top, each plank ends at its own length at the bottom, one chipped corner
  const R = mulberry(19), xs = [-W / 2];
  for (let t = 0; t < 4; t++) for (const s of SEAMS) { const x = (t + s - uL) * P - W / 2; if (x > -W / 2 + .01 && x < W / 2 - .01) xs.push(x); }
  xs.push(W / 2);
  const sh = new THREE.Shape(); sh.moveTo(-W / 2, H / 2); sh.lineTo(-W / 2, -H / 2 + .006);
  for (let i = 0; i < xs.length - 1; i++) { const y = -H / 2 + (R() - .5) * .022; sh.lineTo(xs[i] + .001, y); sh.lineTo(xs[i + 1] - .001, y + (R() - .5) * .006); }
  sh.lineTo(W / 2, H / 2 - .014); sh.lineTo(W / 2 - .012, H / 2); sh.lineTo(-W / 2 + .004, H / 2);
  const geo = new THREE.ExtrudeGeometry(sh, { depth: D, bevelEnabled: true, bevelThickness: .003, bevelSize: .003, bevelSegments: 2, curveSegments: 1 }); geo.translate(0, 0, -D / 2);
  const k = Math.min(3, 2048 / Math.max(fw, fh));
  const cv = document.createElement('canvas'); cv.width = Math.round(fw * k); cv.height = Math.round(fh * k);
  const aniso = renderer.capabilities.getMaxAnisotropy();
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = aniso; tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping; tex.repeat.set(1 / W, 1 / H); tex.offset.set(.5, .5);
  const glowCv = document.createElement('canvas'); glowCv.width = cv.width / 2; glowCv.height = cv.height / 2;
  const glowTex = new THREE.CanvasTexture(glowCv); glowTex.colorSpace = THREE.SRGBColorSpace; glowTex.repeat.copy(tex.repeat); glowTex.offset.copy(tex.offset); glowTex.wrapS = glowTex.wrapT = THREE.ClampToEdgeWrapping;
  const nor = woodNor.clone(), rough = woodRough.clone(); for (const t of [nor, rough]) { t.repeat.set(1 / P, 1 / P); t.offset.set(offU, offV); t.needsUpdate = true; }
  const frontMat = new THREE.MeshStandardMaterial({ color: 0xece2d6, map: tex, normalMap: nor, normalScale: new THREE.Vector2(1.1, 1.1), roughnessMap: rough, emissiveMap: glowTex, emissive: 0x000000, emissiveIntensity: 0 });
  const sides = sideMat.clone(); sides.map = woodColorTex.clone(); sides.map.repeat.set(1 / P, 1 / P); sides.map.offset.set(offU, offV); sides.map.needsUpdate = true;
  const mesh = new THREE.Mesh(geo, [frontMat, sides]); mesh.castShadow = mesh.receiveShadow = true; board.add(mesh);
  const ax = W / 2 - (mobile ? .09 : .14);
  for (const sx of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.TorusGeometry(.017, .0048, 12, 28), brass); eye.position.set(sx * ax, H / 2 + .02, 0); eye.castShadow = true; board.add(eye);
    const shank = new THREE.Mesh(new THREE.CylinderGeometry(.005, .005, .018, 10), brass); shank.position.set(sx * ax, H / 2 + .002, 0); board.add(shank);
    const washer = new THREE.Mesh(new THREE.CylinderGeometry(.011, .011, .003, 20), brass); washer.position.set(sx * ax, H / 2 + .0015, 0); board.add(washer);
  }
  const shade = new THREE.Mesh(new THREE.PlaneGeometry(W + .01, H + .01), leafMat); shade.position.z = D / 2 + .0034; shade.renderOrder = 2; board.add(shade);
  leafTex.repeat.set(W / 1.6, H / 1.6);
  B = { W, H, D, P, uL, offV, fw, fh, cv, ctx: cv.getContext('2d'), tex, glowCv, glowTex, frontMat, ax };
  buildChains();
  liveFace = null; mountFace();
  fit();
}
function buildChains() {
  const S = 4.2, PITCH = .0072 * S, LEN = 3.2;
  const pick = n => { const d = chainData[n], g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(d.p, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(d.n, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(d.uv, 2)); g.setIndex(d.i);
    return g.scale(S, S, S); };
  const gA = pick('linkA'), gB = pick('linkB'), n = Math.ceil(LEN / PITCH), half = Math.ceil(n / 2), R = mulberry(5), dummy = new THREE.Object3D();
  for (const sx of [-1, 1]) for (const [g, off] of [[gA, 0], [gB, 1]]) {
    const im = new THREE.InstancedMesh(g, brass, half); im.castShadow = true; im.frustumCulled = false;
    for (let i = 0; i < half; i++) { const j = i * 2 + off; dummy.position.set(sx * B.ax, B.H / 2 + .035 + j * PITCH, 0); dummy.rotation.set(0, (R() - .5) * .25, (R() - .5) * .05); dummy.updateMatrix(); im.setMatrixAt(i, dummy.matrix); }
    board.add(im);
  }
}

/* ---------- burning words into the wood ---------- */
function woodBase(ctx) {
  // same mapping as the normal map: u' = uL + (x + W/2)/P across, v' = y/P + offV up; canvas y = 0 is the board top
  const { W, H, P, uL, offV, cv } = B, kM = cv.width / W;
  const p = ctx.createPattern(woodImg, 'repeat'), s = kM * P / woodImg.width;
  p.setTransform(new DOMMatrix([s, 0, 0, s, -uL * woodImg.width * s, (H / (2 * P) + offV - 1) * woodImg.height * s]));
  ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = p; ctx.fillRect(0, 0, cv.width, cv.height);
  // weathered, the way the approved look was made: the shading below is laid on in 'saturation' mode, which also drains
  // most of the orange out of the wood (the dusk light puts the warmth back)
  ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = 'rgba(128,128,128,.2)'; ctx.fillRect(0, 0, cv.width, cv.height);
  const gv = ctx.createLinearGradient(0, 0, 0, cv.height); gv.addColorStop(0, 'rgb(255,255,255)'); gv.addColorStop(1, 'rgb(212,204,194)'); ctx.fillStyle = gv; ctx.fillRect(0, 0, cv.width, cv.height);
  const gr = ctx.createRadialGradient(cv.width / 2, cv.height * .45, Math.min(cv.width, cv.height) * .35, cv.width / 2, cv.height * .45, Math.max(cv.width, cv.height) * .75);
  gr.addColorStop(0, 'rgb(255,255,255)'); gr.addColorStop(1, 'rgb(214,206,196)'); ctx.fillStyle = gr; ctx.fillRect(0, 0, cv.width, cv.height);
  ctx.globalCompositeOperation = 'source-over';
}
function words(el, rootEl) {
  const out = [], walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), rr = rootEl.getBoundingClientRect(); let n;
  while ((n = walker.nextNode())) { const re = /\S+/g; let m; while ((m = re.exec(n.data))) { const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length); const b = r.getBoundingClientRect(); out.push({ w: m[0], x: b.left - rr.left, y: b.top - rr.top, h: b.height }); } }
  return out;
}
function burnText(ctx, el, rootEl, k, glow) {
  const cs = getComputedStyle(el), size = parseFloat(cs.fontSize) * k, up = cs.textTransform === 'uppercase', red = el.classList.contains('tb-msg');
  ctx.font = `${cs.fontWeight} ${size}px ${cs.fontFamily}`; ctx.textBaseline = 'middle'; try { ctx.letterSpacing = ((parseFloat(cs.letterSpacing) || 0) * k) + 'px'; } catch (_) {}
  const list = words(el, rootEl), ink = red ? 'rgb(60,10,4)' : 'rgb(18,9,3)';
  for (const pass of glow ? ['glow'] : ['halo', 'char', 'lip']) for (const w of list) {
    const t = up ? w.w.toUpperCase() : w.w, x = w.x * k, y = (w.y + w.h / 2) * k;
    if (pass === 'halo') { ctx.globalCompositeOperation = 'multiply'; ctx.shadowColor = 'rgba(80,40,12,.55)'; ctx.shadowBlur = size * .35; ctx.fillStyle = 'rgb(120,78,48)'; ctx.fillText(t, x, y); ctx.shadowBlur = 0; }
    if (pass === 'char') { ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = ink; ctx.fillText(t, x, y); ctx.fillText(t, x, y); }
    if (pass === 'lip') { ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = 'rgba(255,214,160,.16)'; ctx.fillText(t, x, y + Math.max(1, size * .05)); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = ink; ctx.fillText(t, x, y); }
    if (pass === 'glow') { ctx.globalCompositeOperation = 'lighter'; ctx.shadowColor = 'rgba(255,120,30,1)'; ctx.shadowBlur = size * .5; ctx.fillStyle = 'rgb(255,150,60)'; ctx.fillText(t, x, y); ctx.shadowBlur = 0; }
  }
  ctx.globalCompositeOperation = 'source-over'; try { ctx.letterSpacing = '0px'; } catch (_) {}
}
function recess(ctx, el, rootEl, k) {
  const rr = rootEl.getBoundingClientRect(), b = el.getBoundingClientRect();
  const x = (b.left - rr.left) * k, y = (b.top - rr.top) * k, w = b.width * k, h = b.height * k, r = 6 * k;
  ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgb(92,64,46)'; ctx.fill(); ctx.clip();
  ctx.lineWidth = 6 * k; ctx.shadowColor = 'rgba(20,8,2,.9)'; ctx.shadowBlur = 7 * k; ctx.shadowOffsetX = 1.5 * k; ctx.shadowOffsetY = 3 * k;
  ctx.strokeStyle = 'rgb(40,22,10)'; ctx.beginPath(); ctx.roundRect(x - 3 * k, y - 3 * k, w + 6 * k, h + 6 * k, r); ctx.stroke(); ctx.restore();
  ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.strokeStyle = 'rgba(255,214,160,.16)'; ctx.lineWidth = 1.4 * k; ctx.beginPath(); ctx.moveTo(x + r, y + h + .8 * k); ctx.lineTo(x + w - r, y + h + .8 * k); ctx.stroke(); ctx.restore();
}
function seal(ctx, el, rootEl, k, glow) {
  const rr = rootEl.getBoundingClientRect(), b = el.getBoundingClientRect(), cx = (b.left - rr.left + b.width / 2) * k, cy = (b.top - rr.top + b.height / 2) * k, R = b.width / 2 * k * .86;
  ctx.save(); ctx.lineCap = ctx.lineJoin = 'round';
  const stroke = (col, wd, blur, sc) => { ctx.shadowColor = sc || 'transparent'; ctx.shadowBlur = blur; ctx.strokeStyle = col; ctx.lineWidth = wd;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx - R * .42, cy + R * .02); ctx.lineTo(cx - R * .1, cy + R * .34); ctx.lineTo(cx + R * .46, cy - R * .3); ctx.stroke(); };
  if (glow) { ctx.globalCompositeOperation = 'lighter'; stroke('rgb(255,150,60)', 5 * k, 14 * k, 'rgba(255,120,30,1)'); }
  else { ctx.globalCompositeOperation = 'multiply'; stroke('rgb(120,78,48)', 9 * k, 8 * k, 'rgba(80,40,12,.6)'); stroke('rgb(18,9,3)', 5 * k, 0); }
  ctx.restore();
}
function bake() {
  if (!B) return;
  const m = measureFace(state, B.fw); m.style.height = B.fh + 'px';
  liveFace.querySelectorAll('.tb-msg').forEach(s => { const t = m.querySelector('#' + s.id); if (t) t.textContent = s.textContent; });
  const ctx = B.ctx, k = B.cv.width / B.fw;
  woodBase(ctx);
  m.querySelectorAll('[data-recess]').forEach(el => recess(ctx, el, m, k));
  m.querySelectorAll('[data-bake]').forEach(el => burnText(ctx, el, m, k));
  m.querySelectorAll('[data-seal]').forEach(el => seal(ctx, el, m, k));
  B.tex.needsUpdate = true;
  const g = B.glowCv.getContext('2d'), kg = B.glowCv.width / B.fw; g.globalCompositeOperation = 'source-over'; g.fillStyle = '#000'; g.fillRect(0, 0, B.glowCv.width, B.glowCv.height);
  m.querySelectorAll('[data-glow]').forEach(el => burnText(g, el, m, kg, true));
  m.querySelectorAll('[data-seal]').forEach(el => seal(g, el, m, kg, true));
  B.glowTex.needsUpdate = true;
  kick();
}

/* ---------- the live form on the wood ---------- */
const RULES = {
  name: v => v.trim().length >= 2 || 'Please add your name.',
  phone: v => (/^\+?[\d\s().-]{7,25}$/.test(v.trim()) && v.replace(/\D/g, '').length >= 7) || 'Add a number with country code.',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Add an email like you@company.com.',
  message: v => v.trim().length >= 5 || 'Write a line or two about your project.'
};
const msgSig = () => [...liveFace.querySelectorAll('.tb-msg')].map(m => m.textContent).join('|');
function setMsg(f, text) {
  const el = liveFace.querySelector(`[name=${f}]`), msg = liveFace.querySelector('#tb-e-' + f); if (!el || !msg) return;
  el.closest('.tb-f').classList.toggle('tb-bad', !!text); msg.textContent = text || ''; el.setAttribute('aria-invalid', String(!!text));
  if (text) el.setAttribute('aria-describedby', 'tb-e-' + f); else el.removeAttribute('aria-describedby');
}
function check(f) { const el = liveFace.querySelector(`[name=${f}]`), res = RULES[f](el.value); setMsg(f, res === true ? '' : res); return res === true; }
function mountFace() {
  if (cssObj) board.remove(cssObj);
  const wrap = document.createElement('div'); wrap.innerHTML = faces[state](mobile); liveFace = wrap.firstElementChild;
  liveFace.style.setProperty('--fw', B.fw + 'px'); liveFace.style.height = B.fh + 'px'; setPad(liveFace);
  liveFace.setAttribute('role', 'dialog'); liveFace.setAttribute('aria-modal', 'true'); liveFace.setAttribute('aria-labelledby', 'tb-title');
  cssObj = new CSS3DObject(liveFace); cssObj.scale.setScalar(MPP); cssObj.position.set(0, 0, B.D / 2 + .0035); board.add(cssObj);
  const form = liveFace.querySelector('form');
  if (form) {
    Object.entries(saved).forEach(([k, v]) => { const el = form.querySelector(`[name=${k}]`); if (el) el.value = v; });
    Object.keys(RULES).forEach(f => { const el = form.querySelector(`[name=${f}]`);
      el.addEventListener('blur', () => { if (!liveFace.contains(el) || !el.value) return; const was = msgSig(); check(f); if (msgSig() !== was) bake(); });
      el.addEventListener('input', () => { if (!liveFace.contains(el)) return; saved[f] = el.value; if (el.closest('.tb-f').classList.contains('tb-bad')) { const was = msgSig(); check(f); if (msgSig() !== was) bake(); } });
    });
    form.addEventListener('submit', submit);
  }
  liveFace.addEventListener('click', e => {
    if (e.target.closest('[data-close]')) close();
    else if (e.target.closest('[data-retry]')) setState('form');
    else if (e.target.closest('[data-copy]')) { const btn = e.target.closest('[data-copy]'), ok = () => { btn.textContent = 'Copied'; setTimeout(() => btn.textContent = 'Copy email', 1600); };
      const sel = () => { const s = getSelection(), r = document.createRange(); r.selectNodeContents(liveFace.querySelector('[data-mail]')); s.removeAllRanges(); s.addRange(r); btn.textContent = 'Selected, press copy'; };
      try { navigator.clipboard.writeText(C.email).then(ok, sel); } catch (_) { sel(); } }
  });
  bake();
}
async function submit(e) {
  e.preventDefault();
  const form = e.currentTarget, bad = Object.keys(RULES).filter(f => !check(f)); bake();
  if (bad.length) { form.querySelector(`[name=${bad[0]}]`).focus({ preventScroll: true }); return; }
  const data = Object.fromEntries(new FormData(form).entries()); data.elapsed = Date.now() - openedAt;
  const b = form.querySelector('.tb-brass'); b.disabled = true; b.textContent = 'Sending…';
  let r; try { r = await API.send(data); } catch (_) { r = { kind: 'fail', detail: 'The message could not be sent from this connection.' }; }
  if (!liveFace || !liveFace.contains(b)) return;
  b.disabled = false; b.textContent = 'Send message';
  if (r.kind === 'ok') { Object.keys(saved).forEach(k => delete saved[k]); setState('sent'); }
  else if (r.kind === 'field') { setMsg(r.field, r.error || 'Please check this field.'); bake(); const el = form.querySelector(`[name="${r.field}"]`); if (el) el.focus({ preventScroll: true }); }
  else { failText = r.detail || ''; setState('error'); }
}
function setState(s) {
  state = s; mountFace();
  if (s === 'sent' && !reduce) glowT = 0;
  focusFirst();
}
function focusFirst() { const f = liveFace.querySelector('input:not([tabindex])') || liveFace.querySelector('.tb-brass') || liveFace.querySelector('button'); f && f.focus({ preventScroll: true }); }

/* ---------- camera ---------- */
function fit() {
  const w = innerWidth, h = innerHeight; renderer.setSize(w, h, false); cssR.setSize(w, h); camera.aspect = w / h;
  const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const topPx = mobile ? 72 : 76, botPx = mobile ? 24 : 40, free = (h - topPx - botPx) / h;   // clear of the site header
  const needH = B.H / free * (mobile ? 1.0 : 1.12), needW = B.W * (mobile ? 1.08 : 1.3);
  const d = Math.max(needH / (2 * t), needW / (2 * t * camera.aspect)), visH = 2 * t * d, lift = -((topPx - botPx) / h) * visH / 2;
  camera.position.set(0, lift + .02, d); camera.lookAt(0, lift, 0); camera.updateProjectionMatrix();
  renderer.shadowMap.needsUpdate = true; kick();
}

/* ---------- motion ---------- */
let anim = null, glowT = -1, running = false, last = 0, leafT = 0;
function kick() { if (!running && root.classList.contains('on')) { running = true; last = performance.now(); requestAnimationFrame(frame); } }
function frame(now) {
  const dt = Math.min(.04, (now - last) / 1000); last = now; let busy = false;
  if (anim) { busy = anim(dt) !== false; if (!busy) anim = null; }
  if (glowT >= 0 && B) { glowT += dt; const k = Math.max(0, 1 - glowT / 2.2), fl = 1 + Math.sin(glowT * 31) * .06 + Math.sin(glowT * 17) * .05;
    B.frontMat.emissive.setRGB(1, 1, 1); B.frontMat.emissiveIntensity = 2.4 * k * k * fl; busy = true; if (k <= 0) { glowT = -1; B.frontMat.emissiveIntensity = 0; } }
  if (isOpen && !reduce) { leafT += dt; leafTex.offset.set(Math.sin(leafT * .11) * .06 + leafT * .004, Math.sin(leafT * .17 + 1) * .04); busy = true; }   // a slow breeze in the canopy
  renderer.shadowMap.autoUpdate = !!anim;
  renderer.render(scene, camera); cssR.render(scene, camera);
  if (busy && root.classList.contains('on')) requestAnimationFrame(frame); else running = false;
}
function drop() {
  root.classList.remove('blur'); rig.visible = true;
  if (reduce) { rig.position.set(0, 0, 0); rig.rotation.set(0, 0, 0); root.classList.add('blur'); renderer.shadowMap.needsUpdate = true; kick(); focusFirst(); return; }
  let y = B.H + 1.4, vy = 0, th = -.06, vth = 0, tw = .05, vtw = 0, landed = false, t = 0, focused = false;
  anim = dt => {
    t += dt;
    for (let i = 0; i < 4; i++) { const h = dt / 4;
      vy += (-110 * y - 13 * vy) * h; y += vy * h;
      vth += (-14 * th - 1.9 * vth) * h; th += vth * h;
      vtw += (-9 * tw - 2.2 * vtw) * h; tw += vtw * h;
      if (!landed && y < .01) { landed = true; vth += .11; vtw += .05; root.classList.add('blur'); } }
    const P = B.H / 2 + 3.2; rig.position.set(Math.sin(th) * P, y + P - Math.cos(th) * P, 0); rig.rotation.set(0, tw, th);   // swings from where the chains are hung, far above
    if (t > 1 && !focused) { focused = true; focusFirst(); }
    if (t > 3.5 && Math.abs(th) < .0006 && Math.abs(y) < .0005 && Math.abs(tw) < .0006) { rig.position.set(0, 0, 0); rig.rotation.set(0, 0, 0); renderer.shadowMap.needsUpdate = true; return false; }
  };
  kick();
}

/* ---------- open / close ---------- */
export async function open(config, api) {
  C = config; API = api; opener = api && api.opener || document.activeElement;
  if (!root) domSetup();
  if (isOpen) return;
  isOpen = true; openedAt = Date.now();
  if (window.__lenis) window.__lenis.stop();
  document.documentElement.style.overflow = 'hidden';
  root.classList.add('on'); requestAnimationFrame(() => root.classList.add('blur'));
  if (!ready) { waitEl.hidden = false; ready = assetsSetup(); }
  try { await ready; } catch (err) { ready = null; root.classList.remove('on', 'blur'); isOpen = false; document.documentElement.style.removeProperty('overflow'); if (window.__lenis) window.__lenis.start(); throw err; }
  waitEl.hidden = true;
  if (!isOpen) return;
  state = 'form'; failText = '';
  if (!B || (innerWidth < 640) !== mobile) buildBoard(); else { mountFace(); fit(); }
  drop();
}
export function close() {
  if (!isOpen) return;
  isOpen = false; root.classList.remove('blur');
  const done = () => { root.classList.remove('on'); document.documentElement.style.removeProperty('overflow'); if (window.__lenis) window.__lenis.start(); if (opener && opener.focus) opener.focus({ preventScroll: true }); };
  if (!B || reduce) { if (rig) rig.visible = false; done(); return; }
  let t = 0; const y0 = rig.position.y;
  anim = dt => { t += dt; const k = Math.min(1, t / .55); rig.position.y = y0 + k * k * k * (B.H + 1.6); if (k >= 1) { rig.visible = false; done(); return false; } };
  kick();
}
