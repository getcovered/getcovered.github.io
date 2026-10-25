/**
 * Dhaka Thesis — Formal academic thesis cover page inspired by Dhaka University.
 * Features a classic outer border, centered academic hierarchy, and formal serif typography.
 */
import { html } from '../core/html.js';

export default {
  id: 'dhaka-thesis',
  name: 'Dhaka Thesis',
  version: 1,
  description: 'Formal academic cover with an outer border, centered typography, and stacked submission details.',
  css: 'assets/css/templates/dhaka-thesis.css',

  ignores: {},

  render(ctx) {
    const group = ctx.mode === 'group';

    const by = group
      ? html`
          <div class="dt-members">
            ${ctx.members().map(
              (m) => html`
                <div class="dt-member">
                  ${m.hasName ? html`<div class="dt-line dt-name">${m.name}</div>` : ''}
                  ${m.hasId ? html`<div class="dt-line dt-id">ID No. ${m.id}</div>` : ''}
                </div>
              `,
            )}
          </div>
        `
      : html`
          <div class="dt-line dt-name">${ctx.f('individual.name')}</div>
          <div class="dt-line dt-id">ID No. ${ctx.f('individual.id')}</div>
          <div class="dt-line">${ctx.f('individual.department')}</div>
          ${ctx.has('individual.extra') ? html`<div class="dt-line">${ctx.f('individual.extra')}</div>` : ''}
          <div class="dt-line">${ctx.f('university.name')}</div>
        `;

    return html`
      <div class="dt-frame">
        <header class="dt-header">
          <div class="dt-logo-wrap">${ctx.logo()}</div>
          <h1 class="dt-uni">${ctx.f('university.name')}</h1>
          <div class="dt-course-title">${ctx.f('course.title')}</div>
          <div class="dt-course-meta">
            ${ctx.f('course.code')} • Section ${ctx.f('course.section')}
            ${group ? html` • Group ${ctx.f('group.number')}` : ''} • ${ctx.f('submission.semester')}
          </div>
        </header>

        <section class="dt-work">
          <div class="dt-type">${ctx.f('assignment.type')}</div>
          <div class="dt-on">On</div>
          <div class="dt-title">“${ctx.f('assignment.title')}”</div>
        </section>

        <main class="dt-details">
          <section class="dt-block dt-to">
            <h2 class="dt-label">Submitted to:</h2>
            <div class="dt-line dt-name">${ctx.f('faculty.name')}</div>
            <div class="dt-line">${ctx.f('faculty.designation')}</div>
            <div class="dt-line">${ctx.f('faculty.department')}</div>
            <div class="dt-line">${ctx.f('university.name')}</div>
          </section>

          <section class="dt-block dt-by">
            <h2 class="dt-label">Submitted by:</h2>
            ${by}
          </section>
        </main>

        <footer class="dt-footer">
          <div class="dt-date">
            <strong>Date of Submission:</strong> ${ctx.f('submission.date')}
          </div>
        </footer>
      </div>
    `;
  },
};