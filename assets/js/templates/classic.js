/**
 * Classic — the original BYCP cover, kept as it was.
 *
 *   logo
 *   ASSIGNMENT TYPE
 *   ───────── TITLE ─────────
 *   COURSE CODE │ COURSE TITLE │ SEC
 *            SEMESTER
 *   Submitted to:  │  Submitted by:
 *   …              │  …
 *            Submission date
 */
import { html } from '../core/html.js';

export default {
  id: 'classic',
  name: 'Classic',
  version: 1,
  description: 'Ruled title, course strip, and a split “submitted to / submitted by” block.',
  css: 'assets/css/templates/classic.css',

  // Fields this template deliberately leaves off the page, each with a reason.
  ignores: {},

  render(ctx) {
    const group = ctx.mode === 'group';

    const sectionCell = group
      ? html`SEC ${ctx.f('course.section')} / GRP ${ctx.f('group.number')}`
      : html`SEC ${ctx.f('course.section')}`;

    const by = group
      ? ctx.members().map(
          (m) => html`
            ${m.hasName ? html`<div class="cl-line">${m.name}</div>` : ''}
            ${m.hasId ? html`<div class="cl-line">${m.id}</div>` : ''}
          `,
        )
      : html`
          <div class="cl-line">${ctx.f('individual.name')}</div>
          <div class="cl-line">${ctx.f('individual.id')}</div>
          <div class="cl-line">${ctx.f('individual.department')}</div>
          ${ctx.has('individual.extra') ? html`<div class="cl-line">${ctx.f('individual.extra')}</div>` : ''}
          <div class="cl-line">${ctx.f('university.name')}</div>
        `;

    return html`
      <div class="cl-logo">${ctx.logo()}</div>

      <div class="cl-head">
        <span class="cl-type">${ctx.f('assignment.type')}</span>
        <span class="cl-title">${ctx.f('assignment.title')}</span>
      </div>

      <table class="cl-strip">
        <tbody>
          <tr class="cl-strip-main">
            <td class="cl-code">${ctx.f('course.code')}</td>
            <td class="cl-course">${ctx.f('course.title')}</td>
            <td class="cl-sec">${sectionCell}</td>
          </tr>
          <tr class="cl-strip-term">
            <td colspan="3">${ctx.f('submission.semester')}</td>
          </tr>
        </tbody>
      </table>

      <div class="cl-submitted">
        <section class="cl-half cl-to">
          <h2 class="cl-label">Submitted to:</h2>
          <div class="cl-line">${ctx.f('faculty.name')}</div>
          <div class="cl-line">${ctx.f('faculty.designation')}</div>
          <div class="cl-line">${ctx.f('faculty.department')}</div>
          <div class="cl-line">${ctx.f('university.name')}</div>
        </section>
        <div class="cl-rule" aria-hidden="true"></div>
        <section class="cl-half cl-by">
          <h2 class="cl-label">Submitted by:</h2>
          ${by}
        </section>
      </div>

      <div class="cl-date">${ctx.f('submission.date')}</div>
    `;
  },
};
