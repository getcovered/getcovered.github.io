/**
 * Builds the whole editor from the schema. There is no hand-written form:
 * add a field to core/schema.js and it appears here.
 */
import { el, idFor, icon } from './dom.js';
import { SECTIONS, EDITOR_FIELDS } from '../core/schema.js';
import { getIn } from '../core/model.js';
import { CONTROLS } from './controls.js';

export function createEditor({ store, env, setGuides }) {
  const root = el('div', { class: 'sections' });
  const items = [];

  for (const section of SECTIONS) {
    const body = el('div', { class: 'fields' });

    for (const field of EDITOR_FIELDS.filter((f) => f.section === section.id)) {
      const id = idFor(field.path);
      const labelId = `${id}-label`;
      const api = {
        id,
        labelId,
        env,
        guides: setGuides,
        get: (state) => getIn(state, field.path),
        set: (value) => store.set(field.path, value, { source: field.path }),
      };
      const control = CONTROLS[field.type](field, api);
      const label = control.labelFor
        ? el('label', { class: 'label', id: labelId, for: control.labelFor, text: field.label })
        : el('div', { class: 'label', id: labelId, text: field.label });
      const wrap = el(
        'div',
        { class: `field field--${field.type}${field.half ? ' field--half' : ''}`, data: { path: field.path } },
        label,
        control.el,
        field.hint ? el('p', { class: 'hint', text: field.hint }) : null,
      );
      body.append(wrap);
      items.push({ field, wrap, control });
    }

    root.append(
      el(
        'details',
        { class: 'section', open: section.open },
        el('summary', {}, el('span', { class: 'section-title', text: section.title }), icon('chevron')),
        section.hint ? el('p', { class: 'section-hint', text: section.hint }) : null,
        body,
      ),
    );
  }

  return {
    root,
    /** Bring every control in line with the state; skip the one being typed in. */
    update(state, meta = {}) {
      for (const { field, wrap, control } of items) {
        if (meta.source !== field.path) control.sync(state);
        wrap.hidden = field.showIf ? !field.showIf(state, env) : false;
      }
    },
  };
}
