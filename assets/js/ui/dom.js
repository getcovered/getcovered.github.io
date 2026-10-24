/** Tiny element builder: el('button', { class: 'btn', on: { click } }, 'Save') */
export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value == null || value === false) continue;
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key === 'on') for (const [evt, fn] of Object.entries(value)) node.addEventListener(evt, fn);
    else if (key === 'data') for (const [k, v] of Object.entries(value)) node.dataset[k] = v;
    else node.setAttribute(key, value === true ? '' : value);
  }
  for (const child of children.flat()) {
    if (child == null || child === false) continue;
    node.append(child.nodeType ? child : document.createTextNode(String(child)));
  }
  return node;
}

export const idFor = (path) => `gc-${path.replace(/\./g, '-')}`;

const SVG_NS = 'http://www.w3.org/2000/svg';

/** icon('plus') — small 16px stroke icons used across the UI. */
const ICONS = {
  plus: 'M8 3v10M3 8h10',
  close: 'M4 4l8 8M12 4l-8 8',
  check: 'M3.5 8.5l3 3 6-7',
  chevron: 'M4 6l4 4 4-4',
  upload: 'M8 11V3m0 0L5 6m3-3l3 3M3 13h10',
  trash: 'M3.5 5h9M6.5 5V3.5h3V5M5 5l.5 8h5L11 5',
  panel: 'M2.5 3.5h11v9h-11zM6.5 3.5v9',
  more: 'M3.5 8h.01M8 8h.01M12.5 8h.01',
  open: 'M2.5 12.5v-8h4l1.5 1.5h5.5v6.5z',
  save: 'M8 2.5v7.5m0 0L5 7m3 3l3-3M3 13h10',
  minus: 'M3 8h10',
  guides: 'M2.5 2.5h11v11h-11zM5 5h6v6H5z',
  sun: 'M8 5.2a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zM8 1.5v1.3M8 13.2v1.3M1.5 8h1.3M13.2 8h1.3M3.4 3.4l.9.9M11.7 11.7l.9.9M3.4 12.6l.9-.9M11.7 4.3l.9-.9',
  moon: 'M13 9.6A5.5 5.5 0 116.4 3 4.4 4.4 0 0013 9.6z',
  reset: 'M3 8a5 5 0 105-5H5.5M5.5 3L3.5 5l2 2',
  print: 'M4.5 6V2.5h7V6M4.5 11.5h-2v-5h11v5h-2M4.5 9.5h7v4h-7z',
};

export function icon(name, { size = 16 } = {}) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 16 16');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.5');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.classList.add('icon');
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', ICONS[name] ?? ICONS.plus);
  svg.append(path);
  return svg;
}
