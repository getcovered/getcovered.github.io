/**
 * Editor layout control.
 *   Desktop  the editor is a side column; the toggle collapses it.
 *   Mobile   the editor is a bottom sheet over the preview. Tap or drag the handle;
 *            it snaps to peek / half / full, and the preview always refits above it.
 */
const MOBILE = '(max-width: 899px)';
const PEEK = 64;
const TOPBAR = 56;

export function createSheet({ app, editor, handle, toggle, onChange = () => {} }) {
  const mq = matchMedia(MOBILE);
  let snap = 'half';

  const heights = () => ({
    peek: PEEK,
    half: Math.round(Math.min(innerHeight * 0.48, 440)),
    full: Math.round(innerHeight - TOPBAR - 12),
  });

  function apply(height) {
    if (!mq.matches) {
      app.style.removeProperty('--sheet-h');
    } else {
      app.style.setProperty('--sheet-h', `${height ?? heights()[snap]}px`);
    }
    const open = mq.matches ? snap !== 'peek' : app.dataset.editor !== 'collapsed';
    handle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Hide editor' : 'Show editor');
    editor.inert = mq.matches ? false : app.dataset.editor === 'collapsed';
    onChange();
  }

  const setSnap = (next) => {
    snap = next;
    apply();
  };

  toggle.addEventListener('click', () => {
    if (mq.matches) {
      setSnap(snap === 'peek' ? 'half' : 'peek');
    } else {
      app.dataset.editor = app.dataset.editor === 'collapsed' ? '' : 'collapsed';
      apply();
    }
  });

  // Drag the handle; a tap (barely any movement) toggles instead.
  let drag = null;
  handle.addEventListener('pointerdown', (e) => {
    if (!mq.matches) return;
    handle.setPointerCapture(e.pointerId);
    drag = { y: e.clientY, start: editor.getBoundingClientRect().height, moved: 0 };
    editor.classList.add('dragging');
  });
  handle.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const h = heights();
    const dy = drag.y - e.clientY;
    drag.moved = Math.max(drag.moved, Math.abs(dy));
    apply(Math.min(h.full, Math.max(h.peek, drag.start + dy)));
  });
  const release = () => {
    if (!drag) return;
    const { moved } = drag;
    drag = null;
    editor.classList.remove('dragging');
    if (moved < 6) {
      setSnap(snap === 'peek' ? 'half' : 'peek');
      return;
    }
    const now = editor.getBoundingClientRect().height;
    const target = Object.entries(heights()).sort((a, b) => Math.abs(a[1] - now) - Math.abs(b[1] - now))[0][0];
    setSnap(target);
  };
  handle.addEventListener('pointerup', release);
  handle.addEventListener('pointercancel', release);

  mq.addEventListener('change', () => apply());
  addEventListener('resize', () => mq.matches && apply());
  apply();

  return { setSnap };
}
