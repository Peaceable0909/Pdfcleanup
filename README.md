<p align="center"><img src="assets/logo/pdfsort-logo.png" alt="PDFsort" width="360" /></p>

# PDFsort — student document organizer

Turn a messy pile of scans, photos and Word files into clean, correctly named PDFs — then edit, sign and
compress them. **Everything runs in the browser; no file is ever uploaded.**

| Page | What it does |
| --- | --- |
| [`index.html`](index.html) | Landing page |
| [`app.html`](app.html) | **Organizer** — drop in PDFs, photos and `.docx`; auto-name with on-device OCR; reorder, rotate, crop, sign; **compress** (Light / Balanced / Strong, optional grayscale); export one PDF per document or a ZIP |
| [`pdf-editor.html`](pdf-editor.html) | **PDF editor** — click text to edit it, add text, highlight, draw, shapes, whiteout, images, signature; rotate / reorder / delete / duplicate pages, blank pages, merge PDFs, page numbers, watermark |
| [`word-editor.html`](word-editor.html) | **Word editor** — open a `.docx`, edit, sign, download as Word or PDF |

The tools hand documents to each other: **Edit in PDF editor** (organizer) opens the selected document in the
PDF editor, and **Save to organizer** puts the edited PDF back. The files travel through the browser's
IndexedDB, never the network.

## Project layout

```
index.html  app.html  pdf-editor.html  word-editor.html   the four pages (each is self-contained)
404.html                                                  friendly "not found" page
manifest.webmanifest                                      lets it be added to a phone's home screen
assets/
  ios.css        shared iOS-style theme (loaded after each page's own styles)
  icons.js       shared line-icon set (<el data-icon="name">) + accessible labels
  handoff.js     organizer <-> PDF editor file handoff (IndexedDB)
  logo/          PDFsort logo (full, small, mark-only, original)
  icons/         app icon: favicon, apple-touch-icon, icon-192/512, maskable
.github/workflows/static.yml                              deploys the repo root to GitHub Pages
```

There is no build step: it is plain HTML, CSS and JavaScript. Third-party libraries load from a CDN
(pdf.js, pdf-lib, JSZip, Mammoth, html2canvas, Tesseract.js), so the first load needs a connection.

## Run it locally

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

(Opening the files directly with `file://` also works for most things, but a local server is closest to
how it behaves when deployed.)

## Deploy

Pushing to `main` publishes the site with GitHub Pages (`.github/workflows/static.yml`). In the repository
settings, **Pages → Source** must be set to **GitHub Actions**.

## Good to know

- Saved automatically in the browser (IndexedDB). **Start over** clears it.
- **Compression** turns pages into images, so text in compressed PDFs is no longer selectable. Choose
  *Off* to keep PDFs as they are.
- **PDF editor** hides the original text under a patch when you edit it — the old text is still inside the
  file, so don't use it for secure redaction. Password-protected PDFs must be unlocked first. Standard PDF
  fonts only (accented Latin works; Chinese or emoji become `?`, and it warns you).
