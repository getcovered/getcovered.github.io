import { getIn, setIn } from './model.js';

/**
 * Tiny observable store. The editor writes to it, everything else listens.
 * `state` is always a complete, valid cover (see model.sanitize).
 */
export function createStore(initial) {
  let state = initial;
  const listeners = new Set();

  const emit = (meta) => listeners.forEach((fn) => fn(state, meta));

  return {
    get state() {
      return state;
    },
    get: (path) => getIn(state, path),
    /** Change one field. `meta.source` lets listeners skip their own writes. */
    set(path, value, meta = {}) {
      if (typeof value !== 'object' && getIn(state, path) === value) return;
      setIn(state, path, value);
      emit({ path, ...meta });
    },
    /** Swap in a whole new state (opening a file, resetting). */
    replace(next, meta = {}) {
      state = next;
      emit({ path: '*', ...meta });
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
