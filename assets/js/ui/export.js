import { serialize, fileBase, GTCV } from '../core/gtcv.js';

/** Hand a text file to the browser's download. */
export function download(name, text, type = GTCV.mime) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function saveCover(state) {
  const name = `${fileBase(state)}${GTCV.extension}`;
  download(name, serialize(state));
  return name;
}

/**
 * The PDF is the browser's own print-to-PDF of the A4 page, so text and the
 * ruled lines stay vector. The file name comes from the page title.
 */
export async function printPdf(state) {
  try {
    await document.fonts.ready;
  } catch {
    /* printing still works without it */
  }
  const original = document.title;
  const restore = () => {
    document.title = original;
    removeEventListener('afterprint', restore);
  };
  document.title = fileBase(state);
  addEventListener('afterprint', restore);
  setTimeout(restore, 10_000);
  window.print();
}
