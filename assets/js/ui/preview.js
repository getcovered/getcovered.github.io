/**
 * The preview is the page itself: the same markup and CSS that get printed.
 * It is only ever scaled uniformly, so nothing is squeezed or stretched.
 */
import { toMarkup } from '../core/html.js';
import { createContext } from '../core/context.js';
import { effectiveMargins } from '../core/schema.js';
import { checkTemplate } from '../core/contract.js';
import { getTemplate } from '../templates/registry.js';

export const PAGE_W = 793.7008; // 210 mm at 96 dpi
export const PAGE_H = 1122.5197; // 297 mm at 96 dpi
const MAX_SCALE = 1.25;
const JUSTIFY = { left: 'flex-start', center: 'center', right: 'flex-end' };
const DEV = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);

export function createPreview({ stage, frame, sheet, page, universities }) {
  const loaded = new Set();
  let guideTimer = 0;

  function ensureCss(template) {
    if (loaded.has(template.id)) return;
    loaded.add(template.id);
    document.head.append(
      Object.assign(document.createElement('link'), {
        rel: 'stylesheet',
        href: template.css,
        id: `gc-template-${template.id}`,
      }),
    );
    if (DEV) {
      // The same checks as `npm test`, as console warnings while you build a template.
      fetch(template.css)
        .then((r) => r.text())
        .then((css) => checkTemplate(template, { css }))
        .then((problems) => problems.forEach((p) => console.warn(`[GetCovered template] ${p}`)))
        .catch(() => {});
    }
  }

  function render(state) {
    const template = getTemplate(state.template);
    ensureCss(template);

    const { x, y } = effectiveMargins(state.page);
    sheet.style.setProperty('--gc-mx', x);
    sheet.style.setProperty('--gc-my', y);
    sheet.style.setProperty('--gc-align', state.page.align);
    sheet.style.setProperty('--gc-justify', JUSTIFY[state.page.align] ?? JUSTIFY.center);

    page.dataset.template = template.id;
    try {
      page.innerHTML = toMarkup(template.render(createContext(state, { universities })));
    } catch (err) {
      console.error(err);
      page.textContent = 'This template could not be drawn. Try another one.';
    }
  }

  function fit() {
    const cs = getComputedStyle(stage);
    const w = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const h = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    if (w <= 0 || h <= 0) return;
    const scale = Math.min(w / PAGE_W, h / PAGE_H, MAX_SCALE);
    frame.style.width = `${PAGE_W * scale}px`;
    frame.style.height = `${PAGE_H * scale}px`;
    sheet.style.transform = `scale(${scale})`;
  }

  new ResizeObserver(fit).observe(stage);
  fit();

  return {
    render,
    fit,
    /** Dashed margin guides, shown while a margin slider is in use. */
    setGuides(on) {
      clearTimeout(guideTimer);
      if (on) stage.classList.add('show-guides');
      else guideTimer = setTimeout(() => stage.classList.remove('show-guides'), 700);
    },
  };
}
