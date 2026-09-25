import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';

// Repo root (this config lives in web/). Allows Vite's dev server to read the
// shared design tokens in ../design-system when they're imported.
const repoRoot = fileURLToPath(new URL('..', import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://theapplianceconnection.ca',
  // Static output by default (SSG) — see docs/02-architecture.md for the why.
  integrations: [react()],
  vite: {
    server: {
      fs: { allow: [repoRoot] },
    },
  },
});
