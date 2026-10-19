# Vasant Suraj — portfolio

Static site, no build step. Serve the folder with any static host (Vercel, Netlify, GitHub Pages) or locally with `npx serve .`
(the portrait textures must be served over http, not opened as file://, because WebGL reads them).

```
index.html                               home: particle portrait, hoodie colour wheel, thread, three decks, footer
automations/reddit-keyword-alerts.html   Reddit Keyword Alerts: 3D machine + runbook
portrait/                                portrait textures used by the home hero (colour, depth, hood mask)
thumbs/                                  put the deck thumbnails here (see names below) — missing files just show the placeholder
```

Thumbnails the home page looks for in `thumbs/`:
benchmarks.jpg, campaign-offer.jpg, ilish.jpg, leaderboard.jpg, microsoft.jpg, nike.jpg, prove-roi.jpg, routines.jpg

External dependencies (loaded from CDNs at runtime):
- Google Fonts: Elms Sans, Archivo
- three.js 0.158 (jsDelivr) on the automation page

Both pages start with `<title>`; add `<!doctype html>`, `<meta charset="utf-8">` and a viewport meta if your host does not inject them
(the automation page already has its charset meta).

See also `DOCS.md` (what the site is, station by station) and `BUILD.md` (how it is built).
