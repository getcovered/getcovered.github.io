/**
 * The template contract — how GetCovered guarantees a template never misses a field.
 *
 * checkTemplate() renders a template with unmistakable test values and fails
 * loudly if it
 *   - does not read a field it should (and has not listed it in `ignores`),
 *   - reads a field but does not actually put it on the page,
 *   - lets typed text become markup (XSS),
 *   - forgets to use the alignment variable,
 *   - leaks CSS onto other templates.
 *
 * It runs in `npm test`, in CI, and (as warnings) in the browser console.
 * It has no DOM dependency on purpose.
 */
import { FIELD_BY_PATH, STORED_FIELDS, TEMPLATE_FIELDS, CUSTOM_UNIVERSITY_ID } from './schema.js';
import { defaultState, setIn } from './model.js';
import { createContext } from './context.js';
import { toMarkup, esc } from './html.js';
import { UNIVERSITIES } from '../data/universities.js';

export const TINY_PNG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

export const sentinel = (path) => `⟦${path}⟧`;
const EVIL = '<img src=x onerror=alert(1)>"\'&';
const MODES = ['individual', 'group'];
const TEXT_TYPES = new Set(['text', 'textarea', 'department']);

function buildState(mode, fill) {
  const s = defaultState();
  for (const f of STORED_FIELDS) if (TEXT_TYPES.has(f.type)) setIn(s, f.path, fill(f.path));
  s.submission.mode = mode;
  s.submission.date = '2031-02-03';
  s.university.id = CUSTOM_UNIVERSITY_ID;
  s.university.customName = fill('university.name');
  s.logo.custom = TINY_PNG;
  s.group.members = [0, 1].map((i) => ({
    name: fill(`group.members[${i}].name`),
    id: fill(`group.members[${i}].id`),
  }));
  return s;
}

function run(template, state) {
  const accessed = new Set();
  const ctx = createContext(state, { universities: UNIVERSITIES, track: (p) => accessed.add(p) });
  const result = template.render(ctx);
  if (!result || typeof result !== 'object' || typeof result.value !== 'string') {
    throw new Error('render() must return html`…` (import { html } from "../core/html.js")');
  }
  return { out: toMarkup(result), accessed };
}

function splitSelectors(head) {
  const parts = [];
  let depth = 0;
  let buf = '';
  for (const ch of head) {
    if (ch === '(' || ch === '[') depth += 1;
    if (ch === ')' || ch === ']') depth -= 1;
    if (ch === ',' && depth === 0) {
      parts.push(buf.trim());
      buf = '';
    } else buf += ch;
  }
  if (buf.trim()) parts.push(buf.trim());
  return parts;
}

/** Selectors in `css` that are not scoped to `[data-template="id"]`. */
export function unscopedSelectors(css, id) {
  const text = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const marker = `[data-template="${id}"]`;
  const bad = [];
  const stack = [];
  let buf = '';
  for (const ch of text) {
    if (ch === '{') {
      const head = buf.trim();
      buf = '';
      if (head.startsWith('@')) {
        stack.push(/^@(-webkit-)?(keyframes|font-face)/.test(head) ? 'skip' : 'group');
      } else if (stack[stack.length - 1] === 'skip') {
        stack.push('skip');
      } else {
        for (const sel of splitSelectors(head)) if (!sel.includes(marker)) bad.push(sel);
        stack.push('skip');
      }
    } else if (ch === '}') {
      stack.pop();
      buf = '';
    } else buf += ch;
  }
  return bad;
}

/** Returns a list of human-readable problems. Empty list = the template is sound. */
export function checkTemplate(template, { css = '' } = {}) {
  const problems = [];
  const say = (msg) => problems.push(`[${template?.id ?? '?'}] ${msg}`);

  if (!template || typeof template !== 'object') return ['Template must be an object.'];
  if (!/^[a-z][a-z0-9-]*$/.test(template.id ?? '')) say('`id` must be lowercase letters, digits and dashes.');
  if (!template.name || typeof template.name !== 'string') say('`name` is required.');
  if (!Number.isInteger(template.version) || template.version < 1) say('`version` must be a whole number, starting at 1.');
  if (typeof template.css !== 'string' || !template.css.endsWith('.css')) say('`css` must point to the template stylesheet.');
  if (typeof template.render !== 'function') say('`render(ctx)` is required.');
  if (problems.length) return problems;

  const ignores = template.ignores ?? {};
  for (const [path, reason] of Object.entries(ignores)) {
    if (!FIELD_BY_PATH[path]) say(`\`ignores\` lists "${path}", which is not a field.`);
    else if (typeof reason !== 'string' || reason.trim().length < 8) say(`\`ignores["${path}"]\` needs a real reason (a short sentence).`);
  }

  const required = TEMPLATE_FIELDS.filter((f) => !(f.path in ignores));

  for (const mode of MODES) {
    // 1. Every field must be read AND appear in the output.
    let probe;
    try {
      probe = run(template, buildState(mode, sentinel));
    } catch (err) {
      say(`render() threw in ${mode} mode: ${err.message}`);
      continue;
    }
    const { out, accessed } = probe;

    for (const f of required) {
      if (f.modes && !f.modes.includes(mode)) continue;
      if (!accessed.has(f.path)) {
        say(`never reads "${f.path}" (${mode} mode). Render it with ${f.use}, or list it in \`ignores\` with a reason.`);
        continue;
      }
      const missing = (what) => say(`reads "${f.path}" but ${what} is not in the output (${mode} mode).`);
      switch (f.probe) {
        case 'text':
          if (!out.includes(sentinel(f.path))) missing('its value');
          break;
        case 'date':
          if (!out.includes('3 February 2031')) missing('the date');
          break;
        case 'logo':
          if (!out.includes(TINY_PNG)) missing('the logo image');
          break;
        case 'members':
          for (const i of [0, 1]) {
            for (const k of ['name', 'id']) {
              if (!out.includes(sentinel(`group.members[${i}].${k}`))) missing(`member ${i + 1}'s ${k}`);
            }
          }
          break;
        default:
          break; // 'access' — reading it is the proof
      }
    }

    // 2. Typed text must never become markup.
    try {
      const evil = run(template, buildState(mode, () => EVIL)).out;
      if (evil.includes('<img src=x')) say(`typed text is injected as raw HTML (${mode} mode). Only interpolate values from ctx.f()/ctx.members() inside html\`\`.`);
    } catch (err) {
      say(`render() threw with unusual text (${mode} mode): ${err.message}`);
    }

    // 3. An empty cover must show lorem ipsum for the fields that have it.
    try {
      const empty = run(template, { ...defaultState(), submission: { ...defaultState().submission, mode } }).out;
      for (const f of required) {
        if (f.kind === 'virtual' || f.optional || !f.dummy || f.probe !== 'text' && f.probe !== 'date') continue;
        if (f.modes && !f.modes.includes(mode)) continue;
        if (!empty.includes(esc(f.dummy))) say(`shows nothing for an empty "${f.path}" (${mode} mode). Use ctx.f() so lorem ipsum appears.`);
      }
    } catch (err) {
      say(`render() threw on an empty cover (${mode} mode): ${err.message}`);
    }
  }

  // 4. Styling.
  for (const sel of unscopedSelectors(css, template.id)) {
    say(`CSS selector "${sel}" is not scoped. Start every selector with .gc-page[data-template="${template.id}"].`);
  }
  if (!('page.align' in ignores) && !/--gc-(align|justify)/.test(css)) {
    say('CSS never uses var(--gc-align) or var(--gc-justify), so "Content alignment" would do nothing.');
  }

  return problems;
}
