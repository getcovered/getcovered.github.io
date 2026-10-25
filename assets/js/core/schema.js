/**
 * THE SCHEMA — single source of truth for every piece of cover data.
 *
 * Everything else is derived from this list:
 *   - the editor builds its controls from it,
 *   - .gtcv files are validated against it,
 *   - templates are tested against it (see core/contract.js, docs/TEMPLATES.md),
 *   - docs/FIELDS.md is generated from it.
 *
 * To add a field, add ONE entry here, then run `npm test` and `npm run docs`.
 * The tests fail until the editor, the file format and every template agree.
 *
 * Field kinds
 *   content  Stored. A template MUST render it (or list it in `ignores`).
 *   virtual  Derived (not stored). A template MUST render it (or ignore it).
 *   source   Stored. Feeds a virtual field; templates never read it directly.
 *   layout   Stored. Applied by the core page engine through CSS variables.
 *   meta     Stored. App-level choice (e.g. which template).
 */

export const CUSTOM_UNIVERSITY_ID = 'custom';
export const DEFAULT_TEMPLATE_ID = 'classic';
export const MAX_MEMBERS = 12;

export const SECTIONS = [
  { id: 'template', title: 'Template', hint: 'Choose the design of your cover. Everything you type carries over.', open: true },
  { id: 'logo', title: 'University and logo', hint: 'Pick the logo for the top of the cover, then set its size and position.', open: true },
  { id: 'assignment', title: 'Assignment', hint: 'What you are handing in.', open: true },
  { id: 'course', title: 'Course', hint: 'Shown in the strip under the title.' },
  { id: 'faculty', title: 'Submitted to', hint: 'Your course teacher. Printed under “Submitted to”.' },
  { id: 'student', title: 'Submitted by', hint: 'Choose Group to list every member.' },
  { id: 'date', title: 'Date and semester' },
  { id: 'page', title: 'Page', hint: 'A4 paper, 210 × 297 mm. Margins start at 1 inch.' },
];

const isCustomUniversity = (s) => s.university.id === CUSTOM_UNIVERSITY_ID;
const isIndividual = (s) => s.submission.mode === 'individual';
const isGroup = (s) => s.submission.mode === 'group';

const LCR = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

export const FIELDS = [
  // ─── app-level ───────────────────────────────────────────────────────────
  {
    path: 'template', kind: 'meta', type: 'select', section: 'template',
    label: 'Template', default: DEFAULT_TEMPLATE_ID, dynamicOptions: 'templates',
    showIf: (_s, env) => (env?.templates?.length ?? 0) > 1,
  },

  // ─── logo ────────────────────────────────────────────────────────────────
  {
    path: 'university.id', kind: 'source', type: 'logoChoice', section: 'logo',
    label: 'University', default: 'nsu',
  },
  {
    path: 'university.customName', kind: 'source', type: 'text', section: 'logo',
    label: 'University name', placeholder: 'e.g. BRAC University', default: '', maxLength: 80,
    showIf: isCustomUniversity,
  },
  {
    path: 'logo.custom', kind: 'source', type: 'logoUpload', section: 'logo',
    label: 'Logo image', hint: 'PNG, JPG, WebP or GIF. It is resized on your device and never uploaded.',
    default: '', showIf: isCustomUniversity,
  },
  {
    path: 'logo.size', kind: 'layout', type: 'range', section: 'logo',
    label: 'Logo size', min: 40, max: 200, step: 5, unit: '%', default: 100,
  },
  {
    path: 'logo.position', kind: 'layout', type: 'segmented', section: 'logo',
    label: 'Logo position', options: LCR, default: 'center',
  },
  {
    path: 'university.name', kind: 'virtual', type: 'virtual', probe: 'text',
    label: 'University name', dummy: 'Lorem Ipsum University',
    doc: 'The chosen university\'s name (or the custom name typed in).',
    use: "ctx.f('university.name')",
  },
  {
    path: 'university.logo', kind: 'virtual', type: 'virtual', probe: 'logo',
    label: 'Logo', dummy: '(placeholder drawing)',
    doc: 'The logo, already sized and positioned for you. Always place it with ctx.logo().',
    use: 'ctx.logo()',
  },

  // ─── assignment ──────────────────────────────────────────────────────────
  {
    path: 'assignment.type', kind: 'content', type: 'text', section: 'assignment', probe: 'text',
    label: 'Type', placeholder: 'Assignment, Report, Lab report…', default: '', maxLength: 40,
    dummy: 'Lorem ipsum', doc: 'What kind of document this is, e.g. "Assignment".',
    use: "ctx.f('assignment.type')",
  },
  {
    path: 'assignment.title', kind: 'content', type: 'textarea', section: 'assignment', probe: 'text',
    label: 'Title', placeholder: 'A comprehensive report on…', default: '', maxLength: 200, multiline: true, rows: 2,
    dummy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', doc: 'Title of the work. May contain line breaks.',
    use: "ctx.f('assignment.title')",
  },

  // ─── course ──────────────────────────────────────────────────────────────
  {
    path: 'course.code', kind: 'content', type: 'text', section: 'course', probe: 'text', half: true,
    label: 'Course code', placeholder: 'e.g. ECO101', default: '', maxLength: 20,
    dummy: 'LOR101', doc: 'Course code, e.g. "ECO101".', use: "ctx.f('course.code')",
  },
  {
    path: 'course.section', kind: 'content', type: 'text', section: 'course', probe: 'text', half: true,
    label: 'Section', placeholder: 'e.g. 7', default: '', maxLength: 10,
    dummy: '1', doc: 'Section number only, without the word "Section".', use: "ctx.f('course.section')",
  },
  {
    path: 'course.title', kind: 'content', type: 'text', section: 'course', probe: 'text',
    label: 'Course title', placeholder: 'e.g. Introduction to Economics', default: '', maxLength: 80,
    dummy: 'Dolor sit amet', doc: 'Full course title.', use: "ctx.f('course.title')",
  },

  // ─── faculty ─────────────────────────────────────────────────────────────
  {
    path: 'faculty.name', kind: 'content', type: 'text', section: 'faculty', probe: 'text',
    label: 'Name', placeholder: 'Dr. / Mr. / Ms. …', default: '', maxLength: 60,
    dummy: 'Dr. Lorem Ipsum', doc: 'Teacher the work is submitted to.', use: "ctx.f('faculty.name')",
  },
  {
    path: 'faculty.designation', kind: 'content', type: 'text', section: 'faculty', probe: 'text',
    label: 'Designation', placeholder: 'e.g. Senior Lecturer', default: '', maxLength: 60,
    dummy: 'Senior Lecturer', doc: "Teacher's designation.", use: "ctx.f('faculty.designation')",
  },
  {
    path: 'faculty.department', kind: 'content', type: 'text', section: 'faculty', probe: 'text',
    label: 'Department', placeholder: 'e.g. Department of Economics', default: '', maxLength: 80,
    dummy: 'Department of Dolor', doc: "Teacher's department.", use: "ctx.f('faculty.department')",
  },

  // ─── submitted by ────────────────────────────────────────────────────────
  {
    path: 'submission.mode', kind: 'content', type: 'segmented', section: 'student', probe: 'access',
    label: 'Submission', default: 'individual',
    options: [{ value: 'individual', label: 'Individual' }, { value: 'group', label: 'Group' }],
    doc: 'Either "individual" or "group". Branch your layout on it.',
    use: "ctx.mode  // 'individual' | 'group'",
  },
  {
    path: 'individual.name', kind: 'content', type: 'text', section: 'student', probe: 'text', modes: ['individual'],
    label: 'Your name', placeholder: 'Full name', default: '', maxLength: 60,
    dummy: 'Lorem Ipsum Dolor', doc: "Student's name (individual mode).", use: "ctx.f('individual.name')",
    showIf: isIndividual,
  },
  {
    path: 'individual.id', kind: 'content', type: 'text', section: 'student', probe: 'text', modes: ['individual'],
    label: 'Your ID', placeholder: 'e.g. 2411234567', default: '', maxLength: 20, inputmode: 'numeric',
    dummy: '2411234567', doc: "Student ID (individual mode).", use: "ctx.f('individual.id')",
    showIf: isIndividual,
  },
  {
    path: 'individual.department', kind: 'content', type: 'department', section: 'student', probe: 'text', modes: ['individual'],
    label: 'Department', placeholder: 'e.g. Department of Economics', default: '', maxLength: 80,
    dummy: 'Department of Sit Amet', doc: "Student's department. Picked from the university's list, or typed.",
    use: "ctx.f('individual.department')", showIf: isIndividual,
  },
  {
    path: 'individual.extra', kind: 'content', type: 'textarea', section: 'student', probe: 'text', modes: ['individual'],
    label: 'Additional text', hint: 'Optional. It only appears on the cover when you fill it in.',
    placeholder: 'e.g. Batch 24, Evening program', default: '', maxLength: 160, multiline: true, rows: 2,
    doc: 'Optional free text. Render it only when ctx.has("individual.extra") is true.',
    use: "ctx.has('individual.extra') ? ctx.f('individual.extra') : ''", optional: true,
    showIf: isIndividual,
  },
  {
    path: 'group.number', kind: 'content', type: 'text', section: 'student', probe: 'text', modes: ['group'], half: true,
    label: 'Group number', placeholder: 'e.g. 3', default: '', maxLength: 10,
    dummy: '1', doc: 'Group number (group mode).', use: "ctx.f('group.number')",
    showIf: isGroup,
  },
  {
    path: 'group.members', kind: 'content', type: 'members', section: 'student', probe: 'members', modes: ['group'],
    label: 'Members', default: [{ name: '', id: '' }], max: MAX_MEMBERS,
    dummy: '(two sample members)', doc: 'List of { name, id } rows (group mode). Rows already skip empty entries.',
    use: 'ctx.members()  // [{ name, id }, …]',
    showIf: isGroup,
  },

  // ─── date and semester ───────────────────────────────────────────────────
  {
    path: 'submission.date', kind: 'content', type: 'date', section: 'date', probe: 'date', half: true,
    label: 'Submission date', default: '', quick: 'today',
    dummy: '1 January 2026', doc: 'Already formatted as "3 February 2031".', use: "ctx.f('submission.date')",
  },
  {
    path: 'submission.semester', kind: 'content', type: 'text', section: 'date', probe: 'text', half: true,
    label: 'Semester', placeholder: 'e.g. Fall 2026', default: '', maxLength: 30,
    dummy: 'Lorem 2026', doc: 'Semester and year, e.g. "Fall 2026".', use: "ctx.f('submission.semester')",
  },

  // ─── page ────────────────────────────────────────────────────────────────
  {
    path: 'page.linked', kind: 'layout', type: 'switch', section: 'page',
    label: 'Same margin on every side', default: true,
  },
  {
    path: 'page.margin', kind: 'layout', type: 'range', section: 'page',
    label: 'Margin', min: 0.5, max: 2.5, step: 0.05, unit: 'in', default: 1,
    guides: true, showIf: (s) => s.page.linked,
  },
  {
    path: 'page.marginX', kind: 'layout', type: 'range', section: 'page',
    label: 'Left and right margin', min: 0.5, max: 2.5, step: 0.05, unit: 'in', default: 1,
    guides: true, showIf: (s) => !s.page.linked,
  },
  {
    path: 'page.marginY', kind: 'layout', type: 'range', section: 'page',
    label: 'Top and bottom margin', min: 0.5, max: 2.5, step: 0.05, unit: 'in', default: 1,
    guides: true, showIf: (s) => !s.page.linked,
  },
  {
    path: 'page.align', kind: 'layout', type: 'segmented', section: 'page',
    label: 'Content alignment', options: LCR, default: 'center',
  },
];

export const FIELD_BY_PATH = Object.freeze(Object.fromEntries(FIELDS.map((f) => [f.path, f])));
export const STORED_FIELDS = FIELDS.filter((f) => f.kind !== 'virtual');
export const TEMPLATE_FIELDS = FIELDS.filter((f) => f.kind === 'content' || f.kind === 'virtual');
export const LAYOUT_FIELDS = FIELDS.filter((f) => f.kind === 'layout');
export const EDITOR_FIELDS = FIELDS.filter((f) => f.section);

/** Margins the page engine will actually use, in inches. */
export function effectiveMargins(page) {
  return page.linked
    ? { x: page.margin, y: page.margin }
    : { x: page.marginX, y: page.marginY };
}
