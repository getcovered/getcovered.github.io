import { serialize, parse } from './gtcv.js';

const KEY = 'getcovered:draft';

/**
 * Keeps the current cover in this browser so a refresh never loses work.
 * `storage` is injectable so it can be tested without a browser.
 */
export function createDraft({ storage, env, onStatus = () => {}, delay = 500 }) {
  let timer = 0;

  const safe = (fn, fallback) => {
    try {
      return fn();
    } catch {
      return fallback;
    }
  };

  return {
    load() {
      const text = safe(() => storage.getItem(KEY), null);
      if (!text) return null;
      try {
        return parse(text, env).state;
      } catch {
        return null;
      }
    },
    save(state) {
      clearTimeout(timer);
      onStatus('saving');
      timer = setTimeout(() => {
        try {
          storage.setItem(KEY, serialize(state));
          onStatus('saved');
        } catch {
          onStatus('failed');
        }
      }, delay);
    },
    clear() {
      clearTimeout(timer);
      safe(() => storage.removeItem(KEY));
    },
    key: KEY,
  };
}
