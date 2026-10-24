/**
 * Auto-escaping html`` tag.
 *
 * Every interpolated value is HTML-escaped unless it was produced by html``
 * itself (or wrapped in raw()). Templates therefore cannot inject markup by
 * accident, no matter what a student types into the editor.
 */
const RAW = Symbol('gc.raw');

export const raw = (value) => ({ [RAW]: true, value: String(value ?? '') });

export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function part(value) {
  if (value == null || value === false) return '';
  if (Array.isArray(value)) return value.map(part).join('');
  if (typeof value === 'object' && value[RAW]) return value.value;
  return esc(value);
}

export function html(strings, ...values) {
  let out = '';
  strings.forEach((chunk, i) => {
    out += chunk;
    if (i < values.length) out += part(values[i]);
  });
  return raw(out);
}

/** Turn the result of html`` (or a plain string) into a string of markup. */
export const toMarkup = (value) => part(value);
