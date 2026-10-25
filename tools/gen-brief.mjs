// Builds docs/TEMPLATE-BRIEF.md: ONE self-contained file to give an AI together with an SVG wireframe.
// It is assembled from tools/brief-template.md plus the live schema and example templates,
// so it can never drift from the code.   npm run docs
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { buildFieldsDoc } from './gen-fields.mjs';

const root = new URL('../', import.meta.url);
const read = (rel) => readFile(new URL(rel, root), 'utf8');
const trimEnd = (s) => s.replace(/\s+$/, '');

export async function buildBrief() {
  const [shell, starterJs, starterCss, classicJs, classicCss] = await Promise.all([
    read('tools/brief-template.md'),
    read('assets/js/templates/_starter.js'),
    read('assets/css/templates/_starter.css'),
    read('assets/js/templates/classic.js'),
    read('assets/css/templates/classic.css'),
  ]);

  // Re-use the generated field reference, minus its own title and comment, one heading level lower.
  const fields = buildFieldsDoc()
    .split('\n')
    .slice(2)
    .join('\n')
    .replace(/^# .*\n+/m, '')
    .replace(/^## /gm, '#### ')
    .trim();

  const parts = {
    '{{FIELDS}}': fields,
    '{{STARTER_JS}}': trimEnd(starterJs),
    '{{STARTER_CSS}}': trimEnd(starterCss),
    '{{CLASSIC_JS}}': trimEnd(classicJs),
    '{{CLASSIC_CSS}}': trimEnd(classicCss),
  };
  let out = shell;
  for (const [key, value] of Object.entries(parts)) out = out.split(key).join(value);
  return `${trimEnd(out)}\n`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await writeFile(new URL('docs/TEMPLATE-BRIEF.md', root), await buildBrief());
  console.log('Wrote docs/TEMPLATE-BRIEF.md');
}
