import { el, icon } from './dom.js';

/** Small messages at the bottom of the screen. */
export function createToasts(host) {
  return function toast(message, { kind = 'info', timeout = 5000 } = {}) {
    const close = el('button', { type: 'button', class: 'toast-x', 'aria-label': 'Dismiss message' }, icon('close', { size: 14 }));
    const node = el('div', { class: `toast toast--${kind}`, role: kind === 'error' ? 'alert' : 'status' }, el('span', { text: message }), close);
    const remove = () => node.remove();
    close.addEventListener('click', remove);
    host.append(node);
    if (timeout) setTimeout(remove, timeout);
  };
}

/** A modal yes/no question. Resolves to true when the person confirms. */
export function confirmDialog({ title, body, confirm = 'Continue', danger = false }) {
  return new Promise((resolve) => {
    const dialog = el(
      'dialog',
      { class: 'dialog' },
      el(
        'form',
        { method: 'dialog' },
        el('h2', { text: title }),
        el('p', { text: body }),
        el(
          'div',
          { class: 'dialog-actions' },
          el('button', { class: 'btn', value: 'cancel', text: 'Cancel' }),
          el('button', { class: `btn ${danger ? 'btn-danger-solid' : 'btn-primary'}`, value: 'ok', text: confirm }),
        ),
      ),
    );
    dialog.addEventListener('close', () => {
      resolve(dialog.returnValue === 'ok');
      dialog.remove();
    });
    document.body.append(dialog);
    dialog.showModal();
  });
}
