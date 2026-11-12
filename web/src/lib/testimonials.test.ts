// Run: node --test web/src/lib/testimonials.test.ts   (Node 22+, native TS stripping)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { citeFor, quoteText, selectTestimonials } from './testimonials.ts';
import type { Testimonial } from './blocks/types';

const t = (slug: string, over: Partial<Testimonial> = {}): Testimonial => ({
  slug,
  author: slug,
  quote: `quote ${slug}`,
  regions: [],
  appliances: [],
  ...over,
});

const all = [
  t('old-durham', { regions: ['durham'], date: '2024-01-01' }),
  t('new-durham', { regions: ['durham'], date: '2025-06-01' }),
  t('featured-durham', { regions: ['durham'], date: '2023-01-01', featured: true }),
  t('microwave', { appliances: ['microwave'], date: '2025-01-01' }),
  t('microwave-durham', { appliances: ['microwave'], regions: ['durham'], date: '2022-01-01' }),
  t('draft', { regions: ['durham'], status: 'draft', date: '2026-01-01' }),
  t('untagged', { date: '2026-02-01' }),
];

test('region page: region matches only, featured then newest, drafts excluded', () => {
  const out = selectTestimonials(all, {}, { region: 'durham', appliances: [] });
  assert.deepEqual(
    out.map((x) => x.slug),
    ['featured-durham', 'new-durham', 'old-durham', 'microwave-durham'],
  );
});

test('appliance+region outranks appliance outranks region', () => {
  const out = selectTestimonials(all, { limit: 6 }, { region: 'durham', appliances: ['microwave'] });
  assert.deepEqual(
    out.map((x) => x.slug),
    ['microwave-durham', 'microwave', 'featured-durham', 'new-durham', 'old-durham'],
  );
});

test('page with no tags: everything, featured then newest, limit applied', () => {
  const out = selectTestimonials(all, { limit: 2 }, { appliances: [] });
  assert.deepEqual(
    out.map((x) => x.slug),
    ['featured-durham', 'untagged'],
  );
});

test('page with tags but no matches renders nothing', () => {
  assert.deepEqual(selectTestimonials(all, {}, { region: 'peterborough', appliances: [] }), []);
});

test('block filter overrides the page match', () => {
  const out = selectTestimonials(all, { filterAppliance: 'microwave' }, { region: 'peterborough', appliances: [] });
  assert.deepEqual(
    out.map((x) => x.slug),
    ['microwave', 'microwave-durham'],
  );
});

test('manual mode: pinned order, skips unknown and drafts', () => {
  const out = selectTestimonials(all, { mode: 'manual', pinned: ['untagged', 'draft', 'nope', 'microwave'] });
  assert.deepEqual(
    out.map((x) => x.slug),
    ['untagged', 'microwave'],
  );
});

test('all mode: no filtering, even on a page that has tags', () => {
  const out = selectTestimonials(all, { mode: 'all' }, { region: 'peterborough', appliances: [] });
  assert.deepEqual(
    out.map((x) => x.slug),
    ['featured-durham', 'untagged', 'new-durham', 'microwave', 'old-durham', 'microwave-durham'],
  );
});

test('region mode: only that region, ignores appliance tags', () => {
  const out = selectTestimonials(all, { mode: 'region' }, { region: 'durham', appliances: ['microwave'] });
  assert.deepEqual(
    out.map((x) => x.slug),
    ['featured-durham', 'new-durham', 'old-durham', 'microwave-durham'],
  );
  assert.deepEqual(selectTestimonials(all, { mode: 'region', filterRegion: 'peterborough' }), []);
});

test('service mode: only the service tag, ignores region', () => {
  const out = selectTestimonials(all, { mode: 'service', filterAppliance: 'microwave' }, { region: 'durham', appliances: [] });
  assert.deepEqual(
    out.map((x) => x.slug),
    ['microwave', 'microwave-durham'],
  );
});

test('region / service mode with nothing to match on renders nothing', () => {
  assert.deepEqual(selectTestimonials(all, { mode: 'region' }, { appliances: ['microwave'] }), []);
  assert.deepEqual(selectTestimonials(all, { mode: 'service' }, { region: 'durham', appliances: [] }), []);
});

test('citeFor: author - town, or author alone', () => {
  assert.equal(citeFor(t('a', { author: 'Homeowner', town: 'Whitby', source: 'Google review' })), 'Homeowner - Whitby');
  assert.equal(citeFor(t('b', { author: 'Peter Teefs', source: 'HomeStars review' })), 'Peter Teefs');
});

test('quoteText decodes entities and strips tags', () => {
  assert.equal(quoteText('<p>I&#039;ve had it &amp; I&#x27;d say &quot;great&quot;.</p>\n'), 'I\'ve had it & I\'d say "great".');
  assert.equal(quoteText('<p>One.</p>\n<p>Two.</p>'), 'One. Two.');
  assert.equal(quoteText('<p>a &amp;#039; b</p>'), 'a &#039; b');
  assert.equal(quoteText('<p>it&rsquo;s</p>'), 'it\u2019s');
});
