/**
 * .gtcv — the GetCovered cover file.
 *
 * A .gtcv file is plain JSON:
 *
 *   {
 *     "format": "gtcv",
 *     "version": 1,
 *     "app": "GetCovered",
 *     "appVersion": "2.0.0",
 *     "savedAt": "2026-10-24T16:00:00.000Z",
 *     "data": { …every stored schema field… }
 *   }
 *
 * See docs/GTCV.md. Old BYCP .json files are still accepted and converted.
 */
import { sanitize } from './model.js';
import { APP } from './meta.js';

export const GTCV = Object.freeze({
  format: 'gtcv',
  version: 1,
  extension: '.gtcv',
  mime: 'application/json',
  maxChars: 6_000_000,
});

export class GtcvError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GtcvError';
  }
}

/**
 * Migrations upgrade `data` from version N to N+1.
 * When you change the file format: bump GTCV.version, add MIGRATIONS[oldVersion].
 */
export const MIGRATIONS = {
  // 1: (data) => ({ ...data, newField: '' }),   // example: v1 -> v2
};

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

export function serialize(state, now = new Date()) {
  return `${JSON.stringify(
    {
      format: GTCV.format,
      version: GTCV.version,
      app: APP.name,
      appVersion: APP.version,
      savedAt: now.toISOString(),
      data: state,
    },
    null,
    2,
  )}\n`;
}

const looksLikeBycp = (o) =>
  isObject(o) && o.format === undefined && ('courseCode' in o || 'assignmentType' in o || 'studentName' in o);

/** Convert a file saved by the original BYCP app into GetCovered data. */
export function fromBycp(old) {
  const group = old.submissionType === 'group';
  const left = Number(old.leftMargin);
  return {
    assignment: { type: old.assignmentType, title: old.assignmentTitle },
    course: { code: old.courseCode, title: old.courseTitle, section: group ? '' : old.section },
    faculty: { name: old.facultyName, designation: old.facultyDesignation, department: old.facultyDepartment },
    submission: { mode: group ? 'group' : 'individual', date: old.submissionDate, semester: old.semester },
    individual: { name: old.studentName, id: old.studentId, department: old.studentDept },
    group: { number: group ? old.section : '', members: old.groupMembers },
    page: Number.isFinite(left)
      ? { linked: false, marginX: left, marginY: 1, margin: 1 }
      : undefined,
  };
}

function migrate(version, data) {
  let v = version;
  let out = data;
  while (v < GTCV.version) {
    const step = MIGRATIONS[v];
    if (!step) throw new GtcvError(`This cover uses an old format (v${version}) that can't be upgraded.`);
    out = step(out);
    v += 1;
  }
  return out;
}

/**
 * Parse the text of a .gtcv (or legacy BYCP .json) file.
 * Returns { state, warnings, legacy }. Throws GtcvError with a message that is
 * safe to show to the person.
 */
export function parse(text, env = {}) {
  if (typeof text !== 'string' || text.length > GTCV.maxChars) {
    throw new GtcvError('That file is too large to be a cover. Choose a .gtcv file.');
  }
  let obj;
  try {
    obj = JSON.parse(text);
  } catch {
    throw new GtcvError('That file isn’t a GetCovered cover. Choose a .gtcv file.');
  }

  let data;
  let legacy = false;
  if (isObject(obj) && obj.format === GTCV.format) {
    if (!Number.isInteger(obj.version) || obj.version < 1) {
      throw new GtcvError('This cover file is damaged: its format version is missing.');
    }
    if (obj.version > GTCV.version) {
      throw new GtcvError(`This cover was saved by a newer GetCovered (format v${obj.version}). Reload the app to update, then open it again.`);
    }
    data = migrate(obj.version, obj.data);
  } else if (looksLikeBycp(obj)) {
    data = fromBycp(obj);
    legacy = true;
  } else {
    throw new GtcvError('That file isn’t a GetCovered cover. Choose a .gtcv file.');
  }

  const { state, warnings } = sanitize(data, env);
  return { state, warnings, legacy };
}

const slug = (s, fallback) =>
  String(s ?? '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || fallback;

/** "report_eco101" — used for .gtcv and PDF file names. */
export const fileBase = (state) =>
  `${slug(state.assignment.type, 'assignment')}_${slug(state.course.code, 'cover')}`;
