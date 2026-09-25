import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';

// Repo root (this config lives in web/). Allows Vite's dev server to read the
// design system in ../design-system (tokens, base CSS, React components).
const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const designSystem = fileURLToPath(new URL('../design-system', import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://theapplianceconnection.ca',
  // Static output by default (SSG) — see docs/02-architecture.md for the why.
  integrations: [react()],
  vite: {
    resolve: {
      // `@ds/...` = the Claude Design mirror. Interactive components (Header,
      // Hero wordmark, Accordion, QuoteForm) are imported straight from it.
      alias: { '@ds': designSystem },
    },
    server: {
      fs: { allow: [repoRoot] },
    },
  },
});
