/**
 * Export the Astro fixtures (web/src/fixtures/pages.ts + nav/phones from
 * web/src/lib/site.ts) to content.json, the input for seed.php.
 *
 * Why: the fixtures are the design-approved content. Seeding WordPress from
 * them means the CMS starts with exactly what the templates show, and the
 * fixtures stay as the offline fallback.
 *
 * Run from the repo root: node cms/scripts/seed/export-fixtures.mjs
 */
import { build } from 'esbuild';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const out = fileURLToPath(new URL('./content.json', import.meta.url));

const result = await build({
  stdin: {
    contents: `
      export { pages } from './web/src/fixtures/pages.ts';
      export { NAV, PHONES } from './web/src/lib/site.ts';
    `,
    resolveDir: root,
    loader: 'ts',
  },
  bundle: true,
  format: 'esm',
  platform: 'node',
  write: false,
});

const mod = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
writeFileSync(out, JSON.stringify({ pages: mod.pages, nav: mod.NAV, phones: mod.PHONES }, null, 2) + '\n');
console.log(`Wrote ${Object.keys(mod.pages).length} pages → ${out}`);
