import type { PageData } from './blocks/types';
import { pages } from '../fixtures/pages';

/**
 * The content seam. Today it reads typed fixtures; when WordPress is live this
 * is the ONE place that switches to a WPGraphQL fetch (client.ts + queries.ts) —
 * routes and renderers stay identical. See docs/02-architecture.md.
 */

export function getPage(path: string): PageData | undefined {
  return pages[path];
}

/** Service slugs for the /services/[slug] route. */
export function getServiceSlugs(): string[] {
  return Object.keys(pages)
    .filter((p) => p.startsWith('/services/'))
    .map((p) => p.replace('/services/', ''));
}

/** Region hub slugs for the /[region] route. */
export function getRegionSlugs(): string[] {
  return Object.keys(pages)
    .filter((p) => /^\/(durham|peterborough)$/.test(p))
    .map((p) => p.slice(1));
}

/** City pages for the /[region]/[city] route. */
export function getCityParams(): Array<{ region: string; city: string }> {
  return Object.keys(pages)
    .filter((p) => /^\/(durham|peterborough)\/[^/]+$/.test(p))
    .map((p) => {
      const [, region, city] = p.split('/');
      return { region, city };
    });
}
