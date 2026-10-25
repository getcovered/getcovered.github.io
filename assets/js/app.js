import { defaultState } from './core/model.js';
import { createStore } from './core/store.js';
import { createDraft } from './core/persist.js';
import { parse, GtcvError, GTCV } from './core/gtcv.js';
import { APP } from './core/meta.js';
import { UNIVERSITIES } from './data/universities.js';
import { templates } from './templates/registry.js';
import { icon } from './ui/dom.js';
import { createEditor } from './ui/editor.js';
import { createPreview } from './ui/preview.js';
import { createSheet } from './ui/sheet.js';
import { createToasts, confirmDialog } from './ui/feedback.js';
import { saveCover, printPdf } from './ui/export.js';

const $ = (id) => document.getElementById(id);

const parseEnv = { universityIds: UNIVERSITIES.map((u) => u.id), templateIds: templates.map((t) => t.id) };
const editorEnv = { universities: UNIVERSITIES, templates };

const storage = {
  getItem: (k) => window.localStorage.getItem(k),
  setItem: (k, v) => window.localStorage.setItem(k, v),
  removeItem: (k) => window.localStorage.removeItem(k),
};

// ── icons in static markup ───────────────────────────────────────────────────
document.querySelectorAll('[data-icon]').forEach((node) => node.prepend(icon(node.dataset.icon)));

// ── state ────────────────────────────────────────────────────────────────────
const toast = createToasts($('toasts'));
const statusText = { saving: 'Saving…', saved: 'Saved on this device', failed: 'Couldn’t save in this browser' };
const draft = createDraft({
  storage,
  env: parseEnv,
  onStatus(status) {
    $('save-status').textContent = statusText[status] ?? '';
    $('save-status').dataset.status = status;
  },
});

const restored = draft.load();
const store = createStore(restored ?? defaultState());
const isPristine = () => JSON.stringify(store.state) === JSON.stringify(defaultState());

// ── editor and preview ───────────────────────────────────────────────────────
const preview = createPreview({
  stage: $('preview'),
  frame: $('frame'),
  sheet: $('sheet'),
  page: $('page'),
  universities: UNIVERSITIES,
});
const editor = createEditor({ store, env: editorEnv, setGuides: preview.setGuides });
$('editor-mount').append(editor.root);

let frameQueued = false;
store.subscribe((state, meta) => {
  editor.update(state, meta);
  draft.save(state);
  if (!frameQueued) {
    frameQueued = true;
    requestAnimationFrame(() => {
      frameQueued = false;
      preview.render(store.state);
    });
  }
});
editor.update(store.state);
preview.render(store.state);
if (restored) $('save-status').textContent = 'Restored your last cover';

createSheet({
  app: $('app'),
  editor: $('editor'),
  handle: $('sheet-handle'),
  toggle: $('editor-toggle'),
  onChange: () => preview.fit(),
});

// ── open, save, PDF ──────────────────────────────────────────────────────────
async function openFile(file) {
  if (!file) return;
  try {
    if (file.size > GTCV.maxChars) throw new GtcvError('That file is too large to be a cover. Choose a .gtcv file.');
    const { state, warnings, legacy } = parse(await file.text(), parseEnv);
    if (!isPristine()) {
      const ok = await confirmDialog({
        title: 'Open this cover?',
        body: 'The cover you are editing now will be replaced. Save it first if you want to keep it.',
        confirm: 'Open',
      });
      if (!ok) return;
    }
    store.replace(state);
    toast(legacy ? `Opened ${file.name}. It was made with the original BYCP, so it was converted.` : `Opened ${file.name}.`, { kind: 'success' });
    if (warnings.length) toast(`${warnings.length} value${warnings.length === 1 ? ' was' : 's were'} not valid and ${warnings.length === 1 ? 'was' : 'were'} left out.`, { kind: 'info', timeout: 8000 });
  } catch (err) {
    toast(err instanceof GtcvError ? err.message : 'That file couldn’t be opened.', { kind: 'error', timeout: 8000 });
  }
}

$('open-btn').addEventListener('click', () => $('file-input').click());
$('file-input').addEventListener('change', (e) => {
  const [file] = e.target.files;
  e.target.value = '';
  openFile(file);
});
$('save-btn').addEventListener('click', () => toast(`Saved ${saveCover(store.state)}. Open it here any time to keep editing.`, { kind: 'success' }));

let printHinted = false;
$('pdf-btn').addEventListener('click', () => {
  if (!printHinted) {
    printHinted = true;
    toast('In the print window, set the destination to “Save as PDF”.', { timeout: 6000 });
  }
  printPdf(store.state);
});

addEventListener('dragover', (e) => {
  if (e.dataTransfer?.types?.includes('Files')) e.preventDefault();
});
addEventListener('drop', (e) => {
  const file = e.dataTransfer?.files?.[0];
  if (!file) return;
  e.preventDefault();
  openFile(file);
});

$('reset-btn').addEventListener('click', async () => {
  const ok = await confirmDialog({
    title: 'Start a new cover?',
    body: 'This clears everything you have typed. Save a .gtcv file first if you might want it back.',
    confirm: 'Clear cover',
    danger: true,
  });
  if (!ok) return;
  draft.clear();
  store.replace(defaultState());
  $('save-status').textContent = '';
  toast('Started a fresh cover.');
});

// ── theme ────────────────────────────────────────────────────────────────────
const root = document.documentElement;
function paintTheme() {
  const dark = root.dataset.theme !== 'light';
  const btn = $('theme-btn');
  btn.replaceChildren(icon(dark ? 'sun' : 'moon'));
  btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0f1115' : '#ffffff');
}
$('theme-btn').addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  try {
    localStorage.setItem('getcovered:theme', root.dataset.theme);
  } catch {
    /* the choice just won't be remembered */
  }
  paintTheme();
});
paintTheme();

$('app-version').textContent = `v${APP.version}`;

// ── reveal ───────────────────────────────────────────────────────────────────
// Everything stays hidden behind the splash until the first paint is final:
// fonts, the template's CSS and the logo are in. A 2.5 s cap keeps a slow font from blocking.
const settled = Promise.all([
  preview.whenReady(),
  document.fonts.load('400 15px "Instrument Sans"'),
  document.fonts.load('600 15px "Instrument Sans"'),
  document.fonts.load('700 15px "Instrument Sans"'),
  document.fonts.load('12pt "GC Cover"'),
  document.fonts.load('bold 12pt "GC Cover"'),
]).catch(() => {});
await Promise.race([settled, new Promise((resolve) => setTimeout(resolve, 2500))]);
preview.fit();
requestAnimationFrame(() => {
  root.setAttribute('data-ready', '');
  setTimeout(() => $('splash')?.remove(), 400);
});
