const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** True for a real calendar date written as YYYY-MM-DD. */
export function isIsoDate(value) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? '');
  if (!m) return false;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const probe = new Date(Date.UTC(y, mo - 1, d));
  return probe.getUTCFullYear() === y && probe.getUTCMonth() === mo - 1 && probe.getUTCDate() === d;
}

/** "2031-02-03" -> "3 February 2031". Returns '' for anything else. */
export function formatDate(iso) {
  if (!isIsoDate(iso)) return '';
  const [y, mo, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[mo - 1]} ${y}`;
}

/** Today's date in the user's own time zone, as YYYY-MM-DD. */
export function todayIso(now = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export const inches = (n) => `${Number(n).toFixed(2)} in`;
