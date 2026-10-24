/**
 * The render context handed to every template.
 *
 * A template never reads raw state. It asks the context for fields by path:
 *
 *   ctx.f('course.code')     safe markup for one field, with lorem ipsum when empty
 *   ctx.has('individual.extra')   true when the person actually filled it in
 *   ctx.members()            group rows, empty ones removed
 *   ctx.logo()               the logo, sized and positioned for you
 *   ctx.mode                 'individual' | 'group'
 *
 * Because every read goes through here, the test-suite can see exactly which
 * fields a template used (see contract.js), and a typo in a path throws.
 */
import { raw, esc } from './html.js';
import { FIELD_BY_PATH, CUSTOM_UNIVERSITY_ID, FIELDS } from './schema.js';
import { getIn } from './model.js';
import { formatDate } from './format.js';

const JUSTIFY = { left: 'flex-start', center: 'center', right: 'flex-end' };

const dummySpan = (text) => `<span class="gc-dummy">${esc(text)}</span>`;

const DUMMY_MEMBERS = [
  { name: 'Lorem Ipsum', id: '2411234567' },
  { name: 'Dolor Sit', id: '2421234567' },
];

const PLACEHOLDER_LOGO = `<svg class="gc-logo-ph gc-dummy" viewBox="0 0 100 122" aria-hidden="true"><ellipse cx="50" cy="61" rx="46" ry="57" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="6 5"/><path d="M30 52c7-5 14-5 20 0 6-5 13-5 20 0v22c-7-5-14-5-20 0-6-5-13-5-20 0z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg>`;

export function createContext(state, { universities = [], track = () => {} } = {}) {
  const university = universities.find((u) => u.id === state.university.id) ?? null;

  const real = (path) => {
    switch (path) {
      case 'university.name':
        return university ? university.name : String(state.university.customName ?? '').trim();
      case 'submission.date':
        return formatDate(state.submission.date);
      default: {
        const v = getIn(state, path);
        return typeof v === 'string' ? v.trim() : '';
      }
    }
  };

  const known = (path) => {
    const def = FIELD_BY_PATH[path];
    if (!def) {
      const near = FIELDS.map((f) => f.path).filter((p) => p.split('.')[0] === path.split('.')[0]);
      throw new Error(`Unknown field "${path}". Fields in that group: ${near.join(', ') || '(none)'}. See docs/FIELDS.md.`);
    }
    return def;
  };

  const lines = (text) => text.split('\n').map((l) => l.trim()).filter(Boolean).map(esc).join('<br>');

  const ctx = {
    /** 'individual' or 'group'. */
    get mode() {
      track('submission.mode');
      return state.submission.mode === 'group' ? 'group' : 'individual';
    },

    /** True when the person typed something into this field. */
    has(path) {
      known(path);
      track(path);
      return real(path) !== '';
    },

    /** Safe markup for a single-value field. */
    f(path) {
      const def = known(path);
      if (path === 'group.members' || path === 'university.logo' || path === 'submission.mode') {
        throw new Error(`"${path}" is not a plain text field. Use: ${def.use}`);
      }
      track(path);
      const value = real(path);
      if (value) return raw(def.multiline ? lines(value) : esc(value));
      return def.dummy ? raw(dummySpan(def.dummy)) : raw('');
    },

    /**
     * Group rows as [{ name, id, hasName, hasId }]. name/id are safe markup;
     * rows with nothing in them are already dropped. Show an empty-state sample
     * (lorem ipsum) when nobody has been added yet.
     */
    members() {
      track('group.members');
      const rows = (state.group.members ?? [])
        .map((m) => ({ name: String(m.name ?? '').trim(), id: String(m.id ?? '').trim() }))
        .filter((m) => m.name || m.id);
      if (!rows.length) {
        return DUMMY_MEMBERS.map((m) => ({
          name: raw(dummySpan(m.name)), id: raw(dummySpan(m.id)), hasName: true, hasId: true,
        }));
      }
      return rows.map((m) => ({
        name: raw(esc(m.name)),
        id: raw(esc(m.id)),
        hasName: m.name !== '',
        hasId: m.id !== '',
      }));
    },

    /** The logo block. Size and position from the editor are already applied. */
    logo() {
      track('university.logo');
      const size = Math.min(200, Math.max(40, Number(state.logo.size) || 100));
      const justify = JUSTIFY[state.logo.position] ?? JUSTIFY.center;
      const style = `--gc-logo-scale:${size / 100};justify-content:${justify}`;
      const src = university ? university.logo : state.logo.custom;
      if (!src) return raw(`<div class="gc-logo" style="${style}">${PLACEHOLDER_LOGO}</div>`);
      const alt = `${real('university.name') || 'University'} logo`;
      return raw(`<div class="gc-logo" style="${style}"><img src="${esc(src)}" alt="${esc(alt)}" draggable="false"></div>`);
    },

    isCustomUniversity: state.university.id === CUSTOM_UNIVERSITY_ID,
    esc,
  };
  return ctx;
}
