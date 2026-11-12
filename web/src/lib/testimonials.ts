import type { PageMatch, Testimonial, TestimonialsAttrs } from './blocks/types';

/**
 * Pick which testimonials an `ac/testimonials` block shows. Pure: no I/O, so
 * it is unit-testable (see testimonials.test.ts).
 *
 * all     → every published testimonial, featured then newest. No filtering
 *           (About, Contact, the generic installation page).
 * region  → only testimonials tagged with the region: the block's override,
 *           else the page's own region. Region pages.
 * service → only testimonials tagged with the service term: the block's
 *           override, else the page's appliance terms. Service pages.
 * manual  → exactly the pinned slugs, in order (unknown / unpublished skipped).
 * auto    → legacy: match on whichever tags the page offers (appliance+region >
 *           appliance > region); a page with no tags gets everything.
 * region / service with no term to match on render nothing, never "everything".
 * Empty result = the block renders nothing (trust modules are data-driven).
 */
export function selectTestimonials(
  all: Testimonial[],
  attrs: Pick<TestimonialsAttrs, 'mode' | 'limit' | 'pinned' | 'filterRegion' | 'filterAppliance'>,
  match: PageMatch = { appliances: [] },
): Testimonial[] {
  const published = all.filter((t) => !t.status || t.status === 'publish');

  if (attrs.mode === 'manual') {
    const bySlug = new Map(published.map((t) => [t.slug, t]));
    return (attrs.pinned ?? []).flatMap((slug) => bySlug.get(slug) ?? []);
  }

  const limit = Math.max(1, attrs.limit ?? 20);
  const region = attrs.filterRegion || match.region;
  const appliances = attrs.filterAppliance ? [attrs.filterAppliance] : match.appliances;

  const regionHit = (t: Testimonial) => (region ? t.regions.includes(region) : false);
  const applianceHit = (t: Testimonial) => appliances.some((a) => t.appliances.includes(a));

  let score: (t: Testimonial) => number;
  if (attrs.mode === 'all') {
    score = () => 1;
  } else if (attrs.mode === 'region') {
    score = (t) => (regionHit(t) ? 1 : 0);
  } else if (attrs.mode === 'service') {
    score = (t) => (applianceHit(t) ? 1 : 0);
  } else {
    const hasTags = Boolean(region) || appliances.length > 0;
    score = (t) => (hasTags ? (applianceHit(t) ? 2 : 0) + (regionHit(t) ? 1 : 0) : 1);
  }

  const scored = published.map((t) => ({ t, score: score(t) })).filter((x) => x.score > 0);

  scored.sort(
    (a, b) =>
      b.score - a.score ||
      Number(Boolean(b.t.featured)) - Number(Boolean(a.t.featured)) ||
      (b.t.date ?? '').localeCompare(a.t.date ?? '') ||
      a.t.slug.localeCompare(b.t.slug),
  );
  return scored.slice(0, limit).map((x) => x.t);
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  lsquo: '\u2018',
  rsquo: '\u2019',
  ldquo: '\u201C',
  rdquo: '\u201D',
  ndash: '\u2013',
  mdash: '\u2014',
  hellip: '\u2026',
};

/**
 * WPGraphQL returns the quote as rendered HTML ("<p>I&#039;ve…</p>"). Turn it
 * back into plain text: strip tags (paragraph ends become a space) and decode
 * entities, so apostrophes etc. show as characters, not "&#039;".
 * One pass over the entities, so "&amp;#039;" correctly yields "&#039;".
 */
export function quoteText(html: string): string {
  return html
    .replace(/<\/p>\s*/gi, ' ')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&(?:#(\d+)|#x([0-9a-f]+)|([a-z]+));/gi, (m, dec, hex, name) => {
      if (dec) return String.fromCodePoint(Number(dec));
      if (hex) return String.fromCodePoint(parseInt(hex, 16));
      return NAMED_ENTITIES[name.toLowerCase()] ?? m;
    })
    .trim();
}

/** "Homeowner - Whitby": author, plus the town when known. */
export function citeFor(t: Testimonial): string {
  return t.town ? `${t.author} - ${t.town}` : t.author;
}
