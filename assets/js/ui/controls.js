/**
 * One control per field `type` used in core/schema.js.
 *
 * A control is a function (field, api) => { el, sync(state), labelFor? }
 *   api.id / api.labelId   ids for label wiring
 *   api.env                { universities, templates }
 *   api.get(state)         this field's value in a state
 *   api.set(value)         write it to the store (the editor skips our own sync)
 *   api.guides(on)         show or hide the page-margin guides
 *
 * Nothing here touches `document` at import time, so the test-suite can load it.
 */
import { el, icon } from './dom.js';
import { fileToLogo, LOGO_ACCEPT, LogoError } from './image.js';
import { flatDepartments } from '../data/universities.js';
import { inches, todayIso } from '../core/format.js';
import { CUSTOM_UNIVERSITY_ID, MAX_MEMBERS } from '../core/schema.js';

const assign = (input, value) => {
  if (input.value !== value) input.value = value;
};

function text(field, api) {
  const input = el('input', {
    type: 'text',
    id: api.id,
    placeholder: field.placeholder,
    maxlength: field.maxLength,
    inputmode: field.inputmode,
    autocomplete: 'off',
  });
  input.addEventListener('input', () => api.set(input.value));
  return { el: input, labelFor: api.id, sync: (s) => assign(input, api.get(s)) };
}

function textarea(field, api) {
  const input = el('textarea', {
    id: api.id,
    rows: field.rows ?? 2,
    placeholder: field.placeholder,
    maxlength: field.maxLength,
    autocomplete: 'off',
  });
  input.addEventListener('input', () => api.set(input.value));
  return { el: input, labelFor: api.id, sync: (s) => assign(input, api.get(s)) };
}

function segmented(field, api) {
  const group = el('div', { class: 'seg', role: 'radiogroup', 'aria-labelledby': api.labelId });
  const inputs = field.options.map((o) => {
    const input = el('input', { type: 'radio', name: api.id, value: o.value });
    input.addEventListener('change', () => input.checked && api.set(o.value));
    group.append(el('label', { class: 'seg-opt' }, input, el('span', { text: o.label })));
    return input;
  });
  return {
    el: group,
    sync(s) {
      const v = api.get(s);
      for (const i of inputs) i.checked = i.value === v;
    },
  };
}

function select(field, api) {
  const input = el('select', { id: api.id });
  const options = field.dynamicOptions === 'templates'
    ? api.env.templates.map((t) => ({ value: t.id, label: t.name }))
    : field.options;
  for (const o of options) input.append(el('option', { value: o.value, text: o.label }));
  input.addEventListener('change', () => api.set(input.value));
  return { el: input, labelFor: api.id, sync: (s) => assign(input, api.get(s)) };
}

function logoChoice(field, api) {
  const group = el('div', { class: 'cards', role: 'radiogroup', 'aria-labelledby': api.labelId });
  const options = [
    ...api.env.universities.map((u) => ({ value: u.id, label: u.name, logo: u.logo })),
    { value: CUSTOM_UNIVERSITY_ID, label: 'Another university' },
  ];
  const inputs = options.map((o) => {
    const input = el('input', { type: 'radio', name: api.id, value: o.value });
    input.addEventListener('change', () => input.checked && api.set(o.value));
    const mark = o.logo
      ? el('img', { class: 'card-logo', src: o.logo, alt: '', draggable: 'false' })
      : el('span', { class: 'card-logo card-logo--add' }, icon('plus', { size: 18 }));
    group.append(el('label', { class: 'card' }, input, mark, el('span', { class: 'card-name', text: o.label })));
    return input;
  });
  return {
    el: group,
    sync(s) {
      const v = api.get(s);
      for (const i of inputs) i.checked = i.value === v;
    },
  };
}

function logoUpload(field, api) {
  const picker = el('input', { type: 'file', accept: LOGO_ACCEPT, class: 'visually-hidden', tabindex: '-1', 'aria-hidden': 'true' });
  const thumb = el('img', { class: 'upload-thumb', alt: 'Your uploaded logo', draggable: 'false' });
  const frame = el('div', { class: 'upload-frame' }, thumb, icon('upload', { size: 18 }));
  const pick = el('button', { type: 'button', id: api.id, class: 'btn btn-ghost' }, 'Choose logo');
  const remove = el('button', { type: 'button', class: 'btn btn-ghost btn-danger' }, icon('trash'), 'Remove');
  const message = el('p', { class: 'field-error', role: 'alert', hidden: true });
  const row = el('div', { class: 'upload' }, frame, el('div', { class: 'upload-actions' }, pick, remove));

  const show = (value) => {
    const has = !!value;
    frame.classList.toggle('has-image', has);
    if (has) thumb.src = value;
    else thumb.removeAttribute('src');
    remove.hidden = !has;
    pick.firstChild.nodeValue = has ? 'Replace logo' : 'Choose logo';
  };
  const fail = (msg) => {
    message.textContent = msg;
    message.hidden = !msg;
  };

  pick.addEventListener('click', () => picker.click());
  remove.addEventListener('click', () => {
    api.set('');
    show('');
    fail('');
  });
  picker.addEventListener('change', async () => {
    const file = picker.files?.[0];
    picker.value = '';
    if (!file) return;
    pick.disabled = true;
    try {
      const { dataUrl } = await fileToLogo(file);
      api.set(dataUrl);
      show(dataUrl);
      fail('');
    } catch (err) {
      fail(err instanceof LogoError ? err.message : 'That image couldn’t be used. Try another one.');
    } finally {
      pick.disabled = false;
    }
  });

  return {
    el: el('div', {}, row, message, picker),
    labelFor: api.id,
    sync: (s) => show(api.get(s)),
  };
}

const formatRange = (field, n) => (field.unit === 'in' ? inches(n) : `${n}${field.unit ?? ''}`);

function range(field, api) {
  const input = el('input', { type: 'range', id: api.id, min: field.min, max: field.max, step: field.step });
  const out = el('output', { class: 'range-value', for: api.id });
  const paint = () => {
    const pct = ((Number(input.value) - field.min) / (field.max - field.min)) * 100;
    input.style.setProperty('--fill', `${pct}%`);
    out.textContent = formatRange(field, Number(input.value));
  };
  input.addEventListener('input', () => {
    paint();
    api.set(Number(input.value));
  });
  if (field.guides) {
    const on = () => api.guides(true);
    const off = () => api.guides(false);
    input.addEventListener('pointerdown', on);
    input.addEventListener('focus', on);
    input.addEventListener('pointerup', off);
    input.addEventListener('pointercancel', off);
    input.addEventListener('blur', off);
  }
  return {
    el: el('div', { class: 'range' }, input, out),
    labelFor: api.id,
    sync(s) {
      assign(input, String(api.get(s)));
      paint();
    },
  };
}

function date(field, api) {
  const input = el('input', { type: 'date', id: api.id });
  input.addEventListener('input', () => api.set(input.value));
  const nodes = [input];
  if (field.quick === 'today') {
    const today = el('button', { type: 'button', class: 'link-btn' }, 'Use today');
    today.addEventListener('click', () => {
      input.value = todayIso();
      api.set(input.value);
    });
    nodes.push(today);
  }
  return { el: el('div', { class: 'date' }, nodes), labelFor: api.id, sync: (s) => assign(input, api.get(s)) };
}

function toggle(field, api) {
  const input = el('input', { type: 'checkbox', role: 'switch', id: api.id });
  input.addEventListener('change', () => api.set(input.checked));
  return {
    el: el('span', { class: 'switch' }, input, el('span', { class: 'switch-track', 'aria-hidden': 'true' })),
    labelFor: api.id,
    sync(s) {
      input.checked = !!api.get(s);
    },
  };
}

const OTHER = '__other';

function department(field, api) {
  const picker = el('select', { id: api.id });
  const typed = el('input', {
    type: 'text',
    class: 'dept-typed',
    placeholder: field.placeholder,
    maxlength: field.maxLength,
    autocomplete: 'off',
    'aria-label': `${field.label}, type it`,
  });
  let universityId; // undefined until the first sync
  let list = [];
  let otherMode = false;

  const rebuild = (university) => {
    picker.replaceChildren(el('option', { value: '', text: 'Choose your department' }));
    for (const g of university.departments) {
      picker.append(el('optgroup', { label: g.group }, g.items.map((name) => el('option', { value: name, text: name }))));
    }
    picker.append(el('option', { value: OTHER, text: 'Other (type it)' }));
  };

  picker.addEventListener('change', () => {
    if (picker.value === OTHER) {
      otherMode = true;
      typed.hidden = false;
      typed.value = '';
      api.set('');
      typed.focus();
    } else {
      otherMode = false;
      typed.hidden = true;
      api.set(picker.value);
    }
  });
  typed.addEventListener('input', () => api.set(typed.value));

  return {
    el: el('div', { class: 'dept' }, picker, typed),
    labelFor: api.id,
    sync(state) {
      const university = api.env.universities.find((u) => u.id === state.university.id) ?? null;
      const value = api.get(state);
      if ((university?.id ?? null) !== universityId) {
        universityId = university?.id ?? null;
        list = flatDepartments(university);
        if (list.length) rebuild(university);
        otherMode = false;
      }
      if (!list.length) {
        picker.hidden = true;
        typed.hidden = false;
        assign(typed, value);
        return;
      }
      picker.hidden = false;
      if (value && list.includes(value)) otherMode = false;
      const other = otherMode || (value !== '' && !list.includes(value));
      picker.value = other ? OTHER : value;
      typed.hidden = !other;
      assign(typed, value);
    },
  };
}

function members(field, api) {
  const max = field.max ?? MAX_MEMBERS;
  const list = el('div', { class: 'members' });
  const add = el('button', { type: 'button', class: 'btn btn-ghost btn-add' }, icon('plus'), 'Add member');
  const count = el('span', { class: 'members-count' });
  let rows = [];

  const commit = (next) => {
    rows = next;
    api.set(next);
  };

  const build = () => {
    list.replaceChildren(
      ...rows.map((row, i) => {
        const name = el('input', {
          type: 'text', placeholder: 'Name', maxlength: 60, autocomplete: 'off', 'aria-label': `Member ${i + 1} name`,
        });
        const id = el('input', {
          type: 'text', placeholder: 'ID', maxlength: 20, inputmode: 'numeric', autocomplete: 'off', 'aria-label': `Member ${i + 1} ID`,
        });
        name.value = row.name;
        id.value = row.id;
        name.addEventListener('input', () => commit(rows.map((m, j) => (j === i ? { ...m, name: name.value } : m))));
        id.addEventListener('input', () => commit(rows.map((m, j) => (j === i ? { ...m, id: id.value } : m))));
        const del = rows.length > 1
          ? el('button', { type: 'button', class: 'icon-btn icon-btn--sm', 'aria-label': `Remove member ${i + 1}` }, icon('close', { size: 14 }))
          : null;
        del?.addEventListener('click', () => {
          commit(rows.filter((_, j) => j !== i));
          build();
        });
        return el('div', { class: 'member' }, el('span', { class: 'member-n', text: String(i + 1) }), name, id, del);
      }),
    );
    add.disabled = rows.length >= max;
    count.textContent = `${rows.length} of ${max}`;
  };

  add.addEventListener('click', () => {
    commit([...rows, { name: '', id: '' }]);
    build();
    list.lastElementChild?.querySelector('input')?.focus();
  });

  return {
    el: el('div', { role: 'group', 'aria-labelledby': api.labelId }, list, el('div', { class: 'members-foot' }, add, count)),
    sync(state) {
      const incoming = api.get(state);
      if (JSON.stringify(incoming) !== JSON.stringify(rows)) {
        rows = incoming;
        build();
      }
    },
  };
}

export const CONTROLS = {
  text,
  textarea,
  segmented,
  select,
  logoChoice,
  logoUpload,
  range,
  date,
  switch: toggle,
  department,
  members,
};
