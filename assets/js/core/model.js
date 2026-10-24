import { STORED_FIELDS, CUSTOM_UNIVERSITY_ID, MAX_MEMBERS } from './schema.js';
import { isIsoDate } from './format.js';

export const getIn = (obj, path) =>
  path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);

export function setIn(obj, path, value) {
  const keys = path.split('.');
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i += 1) {
    const k = keys[i];
    if (cur[k] == null || typeof cur[k] !== 'object') cur[k] = {};
    cur = cur[k];
  }
  cur[keys[keys.length - 1]] = value;
  return obj;
}

export function defaultState() {
  const state = {};
  for (const f of STORED_FIELDS) setIn(state, f.path, structuredClone(f.default));
  return state;
}

const MAX_LOGO_CHARS = 3_000_000;
const LOGO_RE = /^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/]+={0,2}$/;
export const isLogoDataUrl = (v) => typeof v === 'string' && v.length <= MAX_LOGO_CHARS && LOGO_RE.test(v);

// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const clean = (v, max, multiline) => {
  let s = String(v).replace(/\r\n?/g, '\n').replace(CONTROL_CHARS, '');
  if (!multiline) s = s.replace(/\n/g, ' ');
  return s.slice(0, max);
};

const INVALID = Symbol('invalid');

function coerce(field, value, env) {
  switch (field.type) {
    case 'text':
    case 'textarea':
    case 'department':
      return typeof value === 'string' ? clean(value, field.maxLength ?? 200, !!field.multiline) : INVALID;

    case 'segmented':
      return field.options.some((o) => o.value === value) ? value : INVALID;

    case 'select': {
      if (field.dynamicOptions === 'templates') {
        return (env.templateIds ?? []).includes(value) ? value : INVALID;
      }
      return field.options?.some((o) => o.value === value) ? value : INVALID;
    }

    case 'logoChoice':
      return value === CUSTOM_UNIVERSITY_ID || (env.universityIds ?? []).includes(value) ? value : INVALID;

    case 'range': {
      const n = typeof value === 'number' ? value : Number(value);
      if (!Number.isFinite(n)) return INVALID;
      const clamped = Math.min(field.max, Math.max(field.min, n));
      const snapped = field.min + Math.round((clamped - field.min) / field.step) * field.step;
      return Number(snapped.toFixed(4));
    }

    case 'date':
      return value === '' || isIsoDate(value) ? value : INVALID;

    case 'switch':
      return typeof value === 'boolean' ? value : INVALID;

    case 'logoUpload':
      return value === '' || isLogoDataUrl(value) ? value : INVALID;

    case 'members': {
      if (!Array.isArray(value)) return INVALID;
      const rows = value
        .filter((m) => m && typeof m === 'object')
        .slice(0, field.max ?? MAX_MEMBERS)
        .map((m) => ({
          name: typeof m.name === 'string' ? clean(m.name, 60, false) : '',
          id: typeof m.id === 'string' ? clean(m.id, 20, false) : '',
        }));
      return rows.length ? rows : [{ name: '', id: '' }];
    }

    default:
      return INVALID;
  }
}

/**
 * Turn untrusted input (a .gtcv file, localStorage…) into a valid state.
 * Only fields that exist in the schema survive; everything is clamped,
 * trimmed to length and type-checked. Unknown keys are dropped.
 *
 * env: { universityIds: string[], templateIds: string[] }
 */
export function sanitize(input, env = {}) {
  const state = defaultState();
  const warnings = [];
  if (input == null || typeof input !== 'object' || Array.isArray(input)) {
    return { state, warnings: ['The file had no cover data, so defaults were used.'] };
  }
  for (const field of STORED_FIELDS) {
    const raw = getIn(input, field.path);
    if (raw === undefined) continue;
    const value = coerce(field, raw, env);
    if (value === INVALID) {
      warnings.push(`Ignored an invalid value for “${field.label}”.`);
      continue;
    }
    setIn(state, field.path, value);
  }
  return { state, warnings };
}
