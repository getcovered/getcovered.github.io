# GetCovered

Cover pages for university assignments. Fill in a form, get a clean A4 cover as a vector PDF.
Free, private (nothing is uploaded), and built with plain HTML, CSS and JavaScript: no framework, no build step.

GetCovered is the rebuilt version of [BYCP, Build Your Cover Page](https://github.com/getcovered/bycp-legacy-codebase).
Old BYCP `.json` files still open and are converted automatically.

## What it does

- **Two panes.** The editor on the left (a bottom sheet on phones) is the single source of truth. The preview on the right is the page that gets exported, scaled evenly so nothing is squeezed or stretched.
- **Save and reopen.** *Save* downloads a `.gtcv` file; *Open* (or drag it onto the page) brings it back for editing. Your work is also kept in this browser, so a refresh loses nothing.
- **Vector A4 PDF.** *Download PDF* uses the browser's print-to-PDF at exact A4 size. Text and ruled lines stay sharp at any zoom. Choose "Save as PDF" as the destination.
- **Individual or group.** Group covers take a group number and up to 12 members.
- **Your university.** NSU is built in, with its logo and department list. For another university, choose "Another university", type its name and upload its logo. The image is resized on your device and never leaves it.
- **Page setup.** A4, margins that start at 1 inch (one margin for all sides, or separate side and top/bottom), and left, center or right alignment. Dashed guides appear while you drag a margin.
- **Dark mode by default**, with a light theme one click away.
- **Empty fields show lorem ipsum** in the preview so you can judge the layout. Placeholder text is left out of the PDF.

## Run it

```bash
npm start        # serves http://localhost:8080  (needs Node 18+, no install step)
npm test         # schema, file format and template checks
npm run docs     # regenerates docs/FIELDS.md from the schema
```

Open the site through a server (as above). Browsers will not load ES modules from `file://`.

## Deploy

Push to `main`. `.github/workflows/pages.yml` runs the tests and publishes the site to GitHub Pages.
In the repository settings, set **Pages → Source** to **GitHub Actions**. All paths are relative, so it works
both at a custom domain and at `https://<user>.github.io/<repo>/`.

## How it is organised

```
index.html
assets/
  css/            fonts, tokens, app chrome, page engine (A4 + print), templates/
  js/
    core/         schema.js (the single list of fields), model, .gtcv format, template contract
    templates/    one file per template + registry.js
    data/         universities.js (names, logos, departments)
    ui/           controls, editor, preview, bottom sheet, export
    app.js        wires it together
docs/             TEMPLATES.md, GTCV.md, FIELDS.md (generated)
tests/run.mjs     zero-dependency test runner
```

The key idea: **`assets/js/core/schema.js` is the only place a piece of cover data is defined.**
The editor, the `.gtcv` validation, the field docs and the template tests are all derived from it.

## Adding things

| I want to… | Do this |
| --- | --- |
| Add a **template** | Follow [docs/TEMPLATES.md](docs/TEMPLATES.md). It includes a ready-made prompt for an AI assistant. `npm test` tells you every field your template forgot. |
| Add a **field** | Add one entry to `FIELDS` in `core/schema.js`, then `npm test` (it fails until every template renders the field) and `npm run docs`. |
| Add a **university** | Add an entry to `assets/js/data/universities.js` and put its logo in `assets/img/`. |
| Change the **file format** | See [docs/GTCV.md](docs/GTCV.md): bump the version and add a migration. |

## Privacy and security

Everything runs in your browser. There is no server and no analytics. Opened files are validated and cleaned
field by field (unknown keys are dropped, text is length-limited, only real image data is accepted for logos),
and every value is HTML-escaped before it reaches the page. A Content Security Policy blocks inline scripts
and third-party requests.

## Licence

MIT. Instrument Sans is under the SIL Open Font License; TeX Gyre Pagella is under the GUST Font License
(licence files are next to the fonts).
