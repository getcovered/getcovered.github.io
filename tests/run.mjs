// Zero-dependency test runner:  npm test
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { FIELDS, SECTIONS, FIELD_BY_PATH, STORED_FIELDS, EDITOR_FIELDS, CUSTOM_UNIVERSITY_ID } from '../assets/js/core/schema.js';
import { defaultState, sanitize, getIn, setIn, isLogoDataUrl } from '../assets/js/core/model.js';
import { serialize, parse, fromBycp, fileBase, GTCV, GtcvError } from '../assets/js/core/gtcv.js';
import { html, raw, esc, toMarkup } from '../assets/js/core/html.js';
import { createContext } from '../assets/js/core/context.js';
import { checkTemplate, unscopedSelectors, TINY_PNG } from '../assets/js/core/contract.js';
import { createDraft } from '../assets/js/core/persist.js';
import { createStore } from '../assets/js/core/store.js';
import { formatDate, isIsoDate, todayIso } from '../assets/js/core/format.js';
import { UNIVERSITIES } from '../assets/js/data/universities.js';
import { templates } from '../assets/js/templates/registry.js';
import starter from '../assets/js/templates/_starter.js';
import classic from '../assets/js/templates/classic.js';
import { CONTROLS } from '../assets/js/ui/controls.js';
import { buildFieldsDoc } from '../tools/gen-fields.mjs';
import { buildBrief } from '../tools/gen-brief.mjs';
import { APP } from '../assets/js/core/meta.js';

const ENV = { universityIds: UNIVERSITIES.map((u) => u.id), templateIds: templates.map((t) => t.id) };
const ROOT = new URL('../', import.meta.url);
const read = (rel) => readFile(new URL(rel, ROOT), 'utf8');

const tests = [];
const test = (name, fn) => tests.push({ name, fn });

// ── schema ──────────────────────────────────────────────────────────────────
test('schema: paths are unique and every stored field has a default', () => {
  const seen = new Set();
  for (const f of FIELDS) {
    assert.ok(!seen.has(f.path), `duplicate field path ${f.path}`);
    seen.add(f.path);
  }
  for (const f of STORED_FIELDS) assert.ok('default' in f, `${f.path} has no default`);
});

test('schema: template-facing fields document how to render them', () => {
  for (const f of FIELDS.filter((x) => x.kind === 'content' || x.kind === 'virtual')) {
    assert.ok(f.doc && f.use && f.probe, `${f.path} needs doc, use and probe`);
    if (!f.optional && f.probe !== 'access') assert.ok(f.dummy, `${f.path} needs a lorem ipsum dummy`);
  }
});

test('schema: every editor field belongs to a real section', () => {
  const ids = new Set(SECTIONS.map((s) => s.id));
  for (const f of EDITOR_FIELDS) assert.ok(ids.has(f.section), `${f.path} → unknown section ${f.section}`);
  for (const s of SECTIONS) assert.ok(EDITOR_FIELDS.some((f) => f.section === s.id), `section ${s.id} is empty`);
});

test('schema: no stored field is missing from the editor', () => {
  for (const f of STORED_FIELDS) assert.ok(f.section, `${f.path} is stored but has no editor section`);
});

test('editor: every field type has a control', () => {
  for (const f of EDITOR_FIELDS) assert.ok(CONTROLS[f.type], `no control for type "${f.type}" (${f.path})`);
});

// ── model ───────────────────────────────────────────────────────────────────
function fullState() {
  const s = defaultState();
  for (const f of STORED_FIELDS) {
    if (f.type === 'text' || f.type === 'textarea' || f.type === 'department') setIn(s, f.path, `v:${f.path}`.slice(0, f.maxLength));
    if (f.type === 'range') setIn(s, f.path, f.max);
    if (f.type === 'segmented') setIn(s, f.path, f.options[f.options.length - 1].value);
  }
  s.page.linked = false;
  s.submission.date = '2030-05-06';
  s.university.id = CUSTOM_UNIVERSITY_ID;
  s.logo.custom = TINY_PNG;
  s.group.members = [{ name: 'A', id: '1' }, { name: 'B', id: '2' }, { name: 'C', id: '3' }];
  return s;
}

test('model: defaults survive sanitising unchanged', () => {
  assert.deepEqual(sanitize(defaultState(), ENV).state, defaultState());
});

test('model: values are clamped, snapped, trimmed and type-checked', () => {
  const { state, warnings } = sanitize({
    logo: { size: 9999, position: 'diagonal' },
    page: { linked: 'yes', margin: 0.123 },
    assignment: { type: 'x'.repeat(500), title: 42 },
    submission: { date: '2030-02-31', mode: 'group' },
    university: { id: 'atlantis' },
    logoSpoof: 1,
  }, ENV);
  assert.equal(state.logo.size, 200);
  assert.equal(state.logo.position, 'center');
  assert.equal(state.page.linked, true);
  assert.equal(state.page.margin, 0.5, 'margin clamps to the minimum');
  assert.equal(state.assignment.type.length, 40);
  assert.equal(state.assignment.title, '');
  assert.equal(state.submission.date, '');
  assert.equal(state.submission.mode, 'group');
  assert.equal(state.university.id, 'nsu');
  assert.ok(warnings.length >= 5);
  assert.equal('logoSpoof' in state, false);
});

test('model: logo uploads must be real image data URLs', () => {
  assert.ok(isLogoDataUrl(TINY_PNG));
  for (const bad of ['javascript:alert(1)', 'data:text/html;base64,PHNjcmlwdD4=', 'data:image/svg+xml;base64,PHN2Zz4=', 'https://evil.test/x.png', 'data:image/png;base64,AA" onerror="x']) {
    assert.equal(isLogoDataUrl(bad), false, bad);
  }
});

test('model: members are capped, cleaned, and never empty', () => {
  const many = Array.from({ length: 40 }, (_, i) => ({ name: `n${i}`, id: `${i}` }));
  assert.equal(sanitize({ group: { members: many } }, ENV).state.group.members.length, 12);
  assert.deepEqual(sanitize({ group: { members: [] } }, ENV).state.group.members, [{ name: '', id: '' }]);
  assert.deepEqual(sanitize({ group: { members: ['x', null, { name: 5 }] } }, ENV).state.group.members, [{ name: '', id: '' }]);
});

test('model: prototype pollution has no effect', () => {
  const evil = JSON.parse('{"__proto__":{"polluted":true},"constructor":{"prototype":{"polluted":true}},"assignment":{"__proto__":{"polluted":true}}}');
  sanitize(evil, ENV);
  assert.equal({}.polluted, undefined);
});

// ── .gtcv ───────────────────────────────────────────────────────────────────
test('gtcv: a full cover round-trips exactly', () => {
  const state = fullState();
  const { state: back, warnings, legacy } = parse(serialize(state), ENV);
  assert.deepEqual(back, state);
  assert.deepEqual(warnings, []);
  assert.equal(legacy, false);
});

test('gtcv: the file is readable JSON with a clear envelope', () => {
  const file = JSON.parse(serialize(defaultState(), new Date('2026-10-24T10:00:00Z')));
  assert.equal(file.format, 'gtcv');
  assert.equal(file.version, GTCV.version);
  assert.equal(file.app, 'GetCovered');
  assert.equal(file.appVersion, APP.version);
  assert.equal(file.savedAt, '2026-10-24T10:00:00.000Z');
  for (const f of STORED_FIELDS) assert.notEqual(getIn(file.data, f.path), undefined, `${f.path} missing from .gtcv`);
});

test('gtcv: bad files give clear errors', () => {
  assert.throws(() => parse('not json', ENV), GtcvError);
  assert.throws(() => parse('{"hello":1}', ENV), /isn’t a GetCovered cover/);
  assert.throws(() => parse('[1,2]', ENV), GtcvError);
  assert.throws(() => parse(JSON.stringify({ format: 'gtcv', version: 99, data: {} }), ENV), /newer GetCovered/);
  assert.throws(() => parse(JSON.stringify({ format: 'gtcv', data: {} }), ENV), /damaged/);
  assert.throws(() => parse('x'.repeat(GTCV.maxChars + 1), ENV), /too large/);
});

test('gtcv: old BYCP files are converted', () => {
  const old = {
    leftMargin: '1.3', assignmentType: 'Report', assignmentTitle: 'T', courseCode: 'ECO101', courseTitle: 'Econ',
    section: '7', semester: 'Fall 2026', facultyName: 'Dr. A', facultyDesignation: 'Lecturer', facultyDepartment: 'Dept',
    submissionType: 'group', studentName: '', studentId: '', studentDept: '',
    groupMembers: [{ name: 'A', id: '1' }], submissionDate: '2026-08-01',
  };
  const { state, legacy } = parse(JSON.stringify(old), ENV);
  assert.equal(legacy, true);
  assert.equal(state.assignment.type, 'Report');
  assert.equal(state.submission.mode, 'group');
  assert.equal(state.group.number, '7');
  assert.equal(state.course.section, '');
  assert.equal(state.page.marginX, 1.3);
  assert.equal(state.page.linked, false);
  assert.deepEqual(state.group.members, [{ name: 'A', id: '1' }]);
  assert.equal(fromBycp(old).individual.name, '');
});

test('gtcv: file names are safe and readable', () => {
  const s = defaultState();
  assert.equal(fileBase(s), 'assignment_cover');
  s.assignment.type = 'Lab Report #2';
  s.course.code = '../ECO 101';
  assert.equal(fileBase(s), 'lab-report-2_eco-101');
});

// ── rendering ───────────────────────────────────────────────────────────────
test('html: values are escaped, nested html is not double-escaped', () => {
  const evil = '<img src=x onerror=alert(1)>"\'&';
  const out = toMarkup(html`<p title="${evil}">${evil}</p>`);
  assert.ok(!out.includes('<img'));
  assert.ok(out.includes('&lt;img'));
  assert.equal(toMarkup(html`<b>${html`<i>${'a&b'}</i>`}</b>`), '<b><i>a&amp;b</i></b>');
  assert.equal(toMarkup(html`${[1, html`<u>2</u>`, null, false]}`), '1<u>2</u>');
  assert.equal(esc(raw('<x>').value), '&lt;x&gt;');
});

test('context: empty fields show lorem ipsum, filled fields show real text', () => {
  const s = defaultState();
  const empty = createContext(s, { universities: UNIVERSITIES });
  assert.match(toMarkup(empty.f('course.code')), /gc-dummy">LOR101</);
  assert.equal(empty.has('course.code'), false);
  s.course.code = '  ECO<101> ';
  const filled = createContext(s, { universities: UNIVERSITIES });
  assert.equal(toMarkup(filled.f('course.code')), 'ECO&lt;101&gt;');
  assert.equal(filled.has('course.code'), true);
});

test('context: optional text stays out until filled; line breaks survive', () => {
  const s = defaultState();
  assert.equal(toMarkup(createContext(s, { universities: UNIVERSITIES }).f('individual.extra')), '');
  s.individual.extra = 'Batch 24\n\n Evening ';
  assert.equal(toMarkup(createContext(s, { universities: UNIVERSITIES }).f('individual.extra')), 'Batch 24<br>Evening');
});

test('context: unknown paths and wrong accessors fail loudly', () => {
  const ctx = createContext(defaultState(), { universities: UNIVERSITIES });
  assert.throws(() => ctx.f('course.cod'), /Unknown field "course.cod"/);
  assert.throws(() => ctx.f('group.members'), /ctx\.members\(\)/);
  assert.throws(() => ctx.f('university.logo'), /ctx\.logo\(\)/);
});

test('context: members drop empty rows, or show samples when nobody is listed', () => {
  const s = defaultState();
  s.group.members = [{ name: 'Ava', id: '' }, { name: '', id: '' }, { name: '', id: '77' }];
  const rows = createContext(s, { universities: UNIVERSITIES }).members();
  assert.equal(rows.length, 2);
  assert.deepEqual([rows[0].hasName, rows[0].hasId, rows[1].hasName, rows[1].hasId], [true, false, false, true]);
  s.group.members = [{ name: '', id: '' }];
  assert.equal(createContext(s, { universities: UNIVERSITIES }).members().length, 2);
});

test('context: logo applies size and position, and never a distorting width', () => {
  const s = defaultState();
  s.logo.size = 150;
  s.logo.position = 'right';
  const out = toMarkup(createContext(s, { universities: UNIVERSITIES }).logo());
  assert.match(out, /--gc-logo-scale:1\.5/);
  assert.match(out, /justify-content:flex-end/);
  assert.ok(!/width=|height=/.test(out), 'the image must not get fixed width/height attributes');
  s.university.id = CUSTOM_UNIVERSITY_ID;
  assert.match(toMarkup(createContext(s, { universities: UNIVERSITIES }).logo()), /gc-logo-ph/);
});

test('format: dates', () => {
  assert.equal(formatDate('2031-02-03'), '3 February 2031');
  assert.equal(formatDate('2031-02-30'), '');
  assert.equal(isIsoDate('2024-02-29'), true);
  assert.equal(isIsoDate('2023-02-29'), false);
  assert.match(todayIso(), /^\d{4}-\d{2}-\d{2}$/);
});

// ── templates: the contract ─────────────────────────────────────────────────
async function cssFor(template) {
  return read(template.css);
}

for (const template of [...templates, starter]) {
  test(`template "${template.id}": renders every field correctly`, async () => {
    const problems = checkTemplate(template, { css: await cssFor(template) });
    assert.deepEqual(problems, [], `\n${problems.join('\n')}`);
  });
}

test('registry: ids are unique and the default template exists', () => {
  const ids = templates.map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.includes('classic'));
});

test('contract catches: a template that forgets a field', async () => {
  const forgetful = {
    ...classic, id: 'classic',
    render: (ctx) => classic.render({ ...ctx, f: (p) => (p === 'faculty.designation' ? raw('') : ctx.f(p)), has: ctx.has, members: ctx.members, logo: ctx.logo }),
  };
  const problems = checkTemplate(forgetful, { css: await cssFor(classic) });
  assert.ok(problems.some((p) => p.includes('"faculty.designation"') && p.includes('never reads')), problems.join('\n'));
});

test('contract catches: a template that reads a field but never prints it', async () => {
  const silent = {
    ...classic,
    render: (ctx) => classic.render({ ...ctx, f: (p) => { const v = ctx.f(p); return p === 'course.title' ? raw('') : v; }, has: ctx.has, members: ctx.members, logo: ctx.logo }),
  };
  const problems = checkTemplate(silent, { css: await cssFor(classic) });
  assert.ok(problems.some((p) => p.includes('"course.title"') && p.includes('not in the output')), problems.join('\n'));
});

test('contract catches: a template that drops the group members', async () => {
  const lazy = {
    ...classic,
    render: (ctx) => classic.render({ ...ctx, members: () => { ctx.members(); return []; }, f: ctx.f, has: ctx.has, logo: ctx.logo }),
  };
  const problems = checkTemplate(lazy, { css: await cssFor(classic) });
  assert.ok(problems.some((p) => p.includes('"group.members"')), problems.join('\n'));
});

test('contract: ignoring a field is allowed only with a reason', async () => {
  const css = await cssFor(classic);
  const skip = (ctx) => classic.render({ ...ctx, f: (p) => (p === 'faculty.designation' ? raw('') : ctx.f(p)), has: ctx.has, members: ctx.members, logo: ctx.logo });
  assert.ok(checkTemplate({ ...classic, render: skip, ignores: { 'faculty.designation': 'x' } }, { css }).some((p) => p.includes('needs a real reason')));
  assert.ok(checkTemplate({ ...classic, render: skip, ignores: { 'nope.field': 'Not a real field at all.' } }, { css }).some((p) => p.includes('not a field')));
  assert.deepEqual(checkTemplate({ ...classic, render: skip, ignores: { 'faculty.designation': 'This layout has no room for it.' } }, { css }), []);
});

test('contract catches: unscoped CSS and ignored alignment', () => {
  assert.deepEqual(unscopedSelectors('.gc-page[data-template="t"] .a, .b{color:red} @media print{.c{x:y}} @keyframes k{from{a:b}to{a:c}}', 't'), ['.b', '.c']);
  const problems = checkTemplate(classic, { css: '.gc-page[data-template="classic"] .a{color:red} .leak{color:blue}' });
  assert.ok(problems.some((p) => p.includes('".leak" is not scoped')));
  assert.ok(problems.some((p) => p.includes('--gc-align')));
});

test('contract: a render() that throws is reported, not thrown', () => {
  const problems = checkTemplate({ ...classic, render: () => { throw new Error('boom'); } }, { css: '--gc-align' });
  assert.ok(problems.some((p) => p.includes('threw') && p.includes('boom')));
});

// ── persistence and store ───────────────────────────────────────────────────
test('draft: saves, loads, survives a broken or full browser store', async () => {
  const data = new Map();
  const storage = { getItem: (k) => data.get(k) ?? null, setItem: (k, v) => data.set(k, v), removeItem: (k) => data.delete(k) };
  const statuses = [];
  const draft = createDraft({ storage, env: ENV, delay: 1, onStatus: (s) => statuses.push(s) });
  assert.equal(draft.load(), null);
  const s = fullState();
  draft.save(s);
  await new Promise((r) => setTimeout(r, 20));
  assert.deepEqual(draft.load(), s);
  assert.deepEqual(statuses, ['saving', 'saved']);

  data.set(draft.key, '{broken');
  assert.equal(draft.load(), null);

  const full = createDraft({ storage: { ...storage, setItem() { throw new Error('quota'); } }, env: ENV, delay: 1, onStatus: (x) => statuses.push(x) });
  full.save(s);
  await new Promise((r) => setTimeout(r, 20));
  assert.equal(statuses.at(-1), 'failed');
});

test('store: notifies on change, ignores no-ops', () => {
  const store = createStore(defaultState());
  const seen = [];
  const off = store.subscribe((_s, meta) => seen.push(meta.path));
  store.set('course.code', 'A');
  store.set('course.code', 'A');
  store.set('page.margin', 1.5);
  store.replace(defaultState());
  off();
  store.set('course.code', 'B');
  assert.deepEqual(seen, ['course.code', 'page.margin', '*']);
});

// ── docs and housekeeping ───────────────────────────────────────────────────
test('docs: FIELDS.md matches the schema (run `npm run docs`)', async () => {
  let current = '';
  try { current = await read('docs/FIELDS.md'); } catch { /* handled below */ }
  assert.equal(current.replace(/\r\n/g, '\n'), buildFieldsDoc(), 'docs/FIELDS.md is out of date. Run: npm run docs');
});

test('docs: TEMPLATE-BRIEF.md matches the schema and example templates (run `npm run docs`)', async () => {
  let current = '';
  try { current = await read('docs/TEMPLATE-BRIEF.md'); } catch { /* handled below */ }
  assert.equal(current.replace(/\r\n/g, '\n'), await buildBrief(), 'docs/TEMPLATE-BRIEF.md is out of date. Run: npm run docs');
});

test('startup: index.html preloads every script the app imports', async () => {
  const seen = new Set();
  const walk = async (rel) => {
    if (seen.has(rel)) return;
    seen.add(rel);
    const src = await read(`assets/js/${rel}`);
    for (const m of src.matchAll(/(?:import|export)[^'"]*?from\s+['"](\.[^'"]+)['"]/g)) {
      const next = new URL(m[1], new URL(`assets/js/${rel}`, ROOT)).pathname.split('/assets/js/')[1];
      await walk(next);
    }
  };
  await walk('app.js');
  seen.delete('app.js');
  const page = await read('index.html');
  const listed = new Set([...page.matchAll(/rel="modulepreload"\s+href="assets\/js\/([^"]+)"/g)].map((m) => m[1]));
  // Template files are optional in the list so adding a template stays a two-file job plus the registry.
  const optional = (f) => f.startsWith('templates/') && f !== 'templates/registry.js';
  const missing = [...seen].filter((f) => !listed.has(f) && !optional(f));
  const extra = [...listed].filter((f) => !seen.has(f));
  assert.deepEqual(missing, [], `add to index.html as modulepreload: ${missing.join(', ')}`);
  assert.deepEqual(extra, [], `modulepreload for a script nothing imports: ${extra.join(', ')}`);
});

test('housekeeping: package and app versions agree', async () => {
  assert.equal(JSON.parse(await read('package.json')).version, APP.version);
});

test('housekeeping: assets referenced by data exist', async () => {
  for (const u of UNIVERSITIES) await read(u.logo).catch(() => assert.fail(`missing logo ${u.logo}`)).then(() => {});
  assert.ok(FIELD_BY_PATH['template']);
});

// ── run ─────────────────────────────────────────────────────────────────────
let failed = 0;
for (const t of tests) {
  try {
    await t.fn();
    console.log(`  ok  ${t.name}`);
  } catch (err) {
    failed += 1;
    console.log(`FAIL  ${t.name}\n${String(err.message).split('\n').map((l) => `      ${l}`).join('\n')}`);
  }
}
console.log(`\n${tests.length - failed} of ${tests.length} passed`);
process.exit(failed ? 1 : 0);
