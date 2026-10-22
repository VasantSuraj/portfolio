Vasant Suraj — portfolio

Updated 22 Oct 2026 · current version v45-reddit-link.

A static site with no build step. Serve the folder with any static host (Vercel, Netlify, GitHub Pages), or locally with npx serve . or python3 -m http.server. Pages must be served over http, not opened as file://: WebGL reads the portrait and forest textures, and those requests fail from file://.

index.html                               home: particle portrait → rain → 3D projects forest → cliff fall → beach with
                                         testimonial lanterns → footer under the stars
automations/reddit-keyword-alerts.html   Reddit Keyword Alerts: 3D machine + runbook
portrait/                                portrait textures for the home hero (colour, depth, hood mask)
forest/                                  26 textures for the forest and beach (bark, leaves, mud, sand, rock, satin)
thumbs/                                  project-card thumbnails (names below) — a missing file just shows the card's colour tint
vercel.json                              { "cleanUrls": true }

Thumbnails the home page looks for in thumbs/: benchmarks.jpg, campaign-offer.jpg, microsoft.jpg, prove-roi.jpg, routines.jpg (Webflow work) · nike.jpg, ilish.jpg, leaderboard.jpg (personal projects)

External dependencies, loaded from CDNs at runtime:

Google Fonts: Elms Sans, Archivo
three.js 0.169 (jsDelivr) on the home page: forest, beach, lanterns
Lenis 1.1.13 (jsDelivr) on the home page: smooth scroll; if it fails to load, the page falls back to native scrolling
three.js 0.158 (jsDelivr) on the automation page

Both pages start with <!doctype html>, a charset meta and a viewport meta. The Reddit page got its doctype and viewport in v45.

Deploying: upload into the repo root and keep the folder structure (index.html loads portrait/…, forest/… and thumbs/… by relative path). The Reddit page links back with ../index.html. Vercel's cleanUrls serves /automations/reddit-keyword-alerts.

Query flags for testing: ?fps shows a frame-rate readout. ?snap makes the camera jump instead of easing (used for screenshots).

See also:

HANDOFF.md: read first if you are continuing the work
DOCS.md: what the site is, part by part
BUILD.md: how it is built
PORTFOLIO-HANDOFF.md: everything in one file, including the full timeline
