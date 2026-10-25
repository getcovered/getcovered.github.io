/**
 * Template registry — the template library.
 *
 * To add a template: write it (see _starter.js and docs/TEMPLATES.md),
 * import it here and add it to `templates`. The editor shows a template
 * picker automatically as soon as there is more than one.
 */
import { DEFAULT_TEMPLATE_ID } from '../core/schema.js';
import classic from './classic.js';
import dhakaThesis from './dhaka-thesis.js';

export const templates = [classic, dhakaThesis];

export const getTemplate = (id) =>
  templates.find((t) => t.id === id) ?? templates.find((t) => t.id === DEFAULT_TEMPLATE_ID) ?? templates[0];
