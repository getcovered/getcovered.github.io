/**
 * STARTER TEMPLATE — copy this file to make a new template.
 *
 *   1. cp assets/js/templates/_starter.js   assets/js/templates/my-template.js
 *      cp assets/css/templates/_starter.css assets/css/templates/my-template.css
 *   2. Change `id`, `name`, `css` below (id = lowercase letters, digits, dashes).
 *   3. Replace the starter id in the CSS: .gc-page[data-template="starter"] → "my-template"
 *   4. Register it in assets/js/templates/registry.js
 *   5. Run `npm test`. It lists every field you forgot, with the line to paste.
 *
 * Full guide, including a ready-made AI prompt: docs/TEMPLATES.md
 *
 * This file is NOT registered, so it never shows in the app. It is still
 * tested on every `npm test`, so it can never fall out of date.
 */
import { html } from '../core/html.js';

export default {
  id: 'starter',
  name: 'Starter',
  version: 1,
  description: 'A minimal, complete template to copy.',
  css: 'assets/css/templates/_starter.css',

  // A field you really don't want on the page goes here WITH a reason.
  // Anything not listed must be rendered, or `npm test` fails.
  //   ignores: { 'faculty.designation': 'This layout only has room for the name.' },
  ignores: {},

  render(ctx) {
    const group = ctx.mode === 'group';

    const people = group
      ? ctx.members().map((m) => html`<li>${m.hasName ? m.name : ''} ${m.hasId ? m.id : ''}</li>`)
      : html`
          <li>${ctx.f('individual.name')}</li>
          <li>${ctx.f('individual.id')}</li>
          <li>${ctx.f('individual.department')}</li>
          ${ctx.has('individual.extra') ? html`<li>${ctx.f('individual.extra')}</li>` : ''}
        `;

    return html`
      ${ctx.logo()}
      <h1 class="st-type">${ctx.f('assignment.type')}</h1>
      <p class="st-title">${ctx.f('assignment.title')}</p>

      <p class="st-course">
        ${ctx.f('course.code')} ${ctx.f('course.title')}, section ${ctx.f('course.section')}
        ${group ? html`, group ${ctx.f('group.number')}` : ''}
      </p>

      <p>${ctx.f('university.name')}</p>
      <p>
        ${ctx.f('faculty.name')}, ${ctx.f('faculty.designation')},
        ${ctx.f('faculty.department')}
      </p>
      <ul class="st-people">${people}</ul>

      <p class="st-date">${ctx.f('submission.semester')}, ${ctx.f('submission.date')}</p>
    `;
  },
};
