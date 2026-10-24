# Writing a template

A template decides how a cover looks. GetCovered handles everything else: the editor, saving, the A4 page,
margins, alignment, the logo's size and position, and printing.

The one rule: **a template must show every field**, and the tests prove it. If you forget one, `npm test`
names it and tells you the line to paste.

## Make one in five steps

1. Copy the starter:
   ```bash
   cp assets/js/templates/_starter.js   assets/js/templates/my-template.js
   cp assets/css/templates/_starter.css assets/css/templates/my-template.css
   ```
2. In `my-template.js` change `id` (lowercase letters, digits, dashes), `name`, `description` and `css`.
3. In `my-template.css` replace `starter` with your id in every selector (`.gc-page[data-template="my-template"]`).
4. Register it in `assets/js/templates/registry.js`:
   ```js
   import myTemplate from './my-template.js';
   export const templates = [classic, myTemplate];
   ```
   A template picker appears in the editor as soon as there is more than one.
5. Run `npm test`. Fix what it lists. Run `npm start` and look at it, including **Group** mode and the
   alignment and margin controls.

## The template object

```js
import { html } from '../core/html.js';

export default {
  id: 'my-template',
  name: 'My template',
  version: 1,
  description: 'One line for people choosing a template.',
  css: 'assets/css/templates/my-template.css',
  ignores: {},                 // see "Leaving a field out"
  render(ctx) { return html`…`; },
};
```

`render(ctx)` returns `html\`…\``. Anything you put inside `${…}` is escaped automatically, so typed text can
never become markup.

## What `ctx` gives you

| Call | Returns |
| --- | --- |
| `ctx.f('course.code')` | Safe markup for one field. Shows lorem ipsum while the field is empty. |
| `ctx.has('individual.extra')` | `true` only when the person filled the field in (for optional text). |
| `ctx.members()` | Group rows as `[{ name, id, hasName, hasId }]`, empty rows already removed. |
| `ctx.logo()` | The logo, already sized and positioned. Always place it with this. |
| `ctx.mode` | `'individual'` or `'group'`. Branch your layout on it. |

Every field, what it means and exactly how to render it is listed in [FIELDS.md](FIELDS.md).
A path that does not exist throws an error that names the closest real ones.

## Styling rules

- Start **every** selector with `.gc-page[data-template="your-id"]`. Unscoped selectors fail the tests, so
  templates can never break each other or the app.
- Use `var(--gc-align)` for text alignment and `var(--gc-justify)` for flex alignment, so the editor's
  "Content alignment" works. (Ignoring `page.align` is possible, with a reason, see below.)
- Set `--gc-logo-base` to the logo height you want at 100% size. Do not size the logo yourself.
- The page is an A4 flex column that already has the margins applied. Use `flex: 1` and `margin-top: auto`
  to push blocks to the bottom.
- Never set `width` and `height` on images or the logo; that is how logos get squeezed.
- Fonts: the page defaults to Book Antiqua (with a bundled lookalike). Set `font-family` only if you must.
- Lines that only contain lorem ipsum can be hidden when printing, as the Classic template does.

## Leaving a field out

If a layout genuinely has no room for a field, say so, with a reason:

```js
ignores: { 'faculty.designation': 'This layout only has room for the teacher’s name.' },
```

A reason of fewer than eight characters is rejected. Ignored fields are still collected by the editor and saved
in `.gtcv` files, so nothing is lost if someone later switches template.

## What `npm test` checks for every template

- every field is read and actually appears on the page, in individual and in group mode;
- typed text such as `<img src=x onerror=…>` comes out harmless;
- an empty cover shows lorem ipsum, not blanks;
- all CSS is scoped to the template, and alignment is honoured.

While running locally, the same checks print as console warnings in the browser.

## A prompt for an AI assistant

Copy this, fill in the last line, and paste the result into your assistant together with
`assets/js/templates/_starter.js`, `assets/css/templates/_starter.css` and `docs/FIELDS.md`.

```text
I am adding a template to GetCovered, a vanilla HTML/CSS/JS app that makes A4 cover pages for university
assignments. Write two files: assets/js/templates/<id>.js and assets/css/templates/<id>.css.

Rules you must follow:
- Copy the structure of the attached _starter.js and _starter.css exactly.
- render(ctx) returns html`...` from ../core/html.js. Read data ONLY through ctx.f(path), ctx.has(path),
  ctx.members(), ctx.logo() and ctx.mode. Never build HTML by string concatenation.
- Render EVERY field listed in the attached FIELDS.md under "Fields a template must render", in both
  individual and group mode. Optional text (individual.extra) is rendered only when ctx.has() is true.
  If a field truly cannot fit, list it under `ignores` with a one-sentence reason.
- Every CSS selector must begin with .gc-page[data-template="<id>"]. Use var(--gc-align) and
  var(--gc-justify) for alignment and set --gc-logo-base for the logo. Do not set the page size or margins.
- No JavaScript outside render(). No external fonts, images or URLs. Keep it printable on one A4 page.
- Finish by telling me the line to add to assets/js/templates/registry.js.

The design I want: <describe the layout, fonts, rules, spacing and mood here>
```

Then run `npm test` and paste any messages back to the assistant.
