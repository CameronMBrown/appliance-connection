import type { PageData } from '../lib/blocks/types';

/**
 * Mock content shaped exactly like a resolved `editorBlocks` tree, keyed by URL
 * path. This proves the whole render pipeline before WordPress is wired.
 * When WP is live, content.ts swaps this out for a GraphQL fetch — routes and
 * renderers don't change.
 */

const home: PageData = {
  title: 'The Appliance Connection — Complete Home Appliance Installation',
  description: 'Licensed, insured appliance installation across Durham & Peterborough.',
  blocks: [
    {
      name: 'ac/hero',
      attributes: {
        eyebrow: 'Durham & Peterborough, Ontario',
        heading: 'Complete home appliance installation, done right.',
        subheading:
          'Licensed, insured, and warrantied — 30+ years installing the built-ins a general handyman won’t touch.',
        primaryLabel: 'Request a quote',
        primaryUrl: '/contact',
        secondaryLabel: 'Our services',
        secondaryUrl: '/services/appliance-installation',
      },
    },
    {
      name: 'ac/service-grid',
      attributes: { heading: 'What we install' },
      innerBlocks: [
        {
          name: 'ac/service-card',
          attributes: {
            title: 'Appliance installation',
            description: 'Every make & model — freestanding and built-in, with custom panels and venting.',
            url: '/services/appliance-installation',
          },
        },
        {
          name: 'ac/service-card',
          attributes: {
            title: 'Gas piping',
            description: 'Licensed gas fitting for ranges, dryers, BBQs and garage heaters.',
            url: '/services/gas-piping',
          },
        },
        {
          name: 'ac/service-card',
          attributes: {
            title: 'Kitchens',
            description: 'Full kitchen renovations, from rough-in to finish.',
            url: '/services/kitchens',
          },
        },
      ],
    },
    {
      name: 'ac/cta-band',
      attributes: {
        heading: 'Booking your install?',
        text: 'Tell us what you need — we respond within 24 hours.',
        ctaLabel: 'Get a free quote',
        ctaUrl: '/contact',
        isDark: true,
      },
    },
  ],
};

const serviceApplianceInstall: PageData = {
  title: 'Appliance Installation — The Appliance Connection',
  blocks: [
    {
      name: 'ac/hero',
      attributes: {
        eyebrow: 'Service',
        heading: 'Appliance installation',
        subheading:
          'Freestanding and built-in — ranges, cooktops, wall ovens, dishwashers, OTR microwaves, laundry, and custom panels.',
        primaryLabel: 'Request a quote',
        primaryUrl: '/contact',
      },
    },
    {
      name: 'ac/cta-band',
      attributes: {
        heading: 'Ready to book?',
        text: 'Serving Durham & Peterborough. Licensed, insured, warrantied.',
        ctaLabel: 'Get a free quote',
        ctaUrl: '/contact',
        isDark: true,
      },
    },
  ],
};

const serviceGasPiping: PageData = {
  title: 'Gas Piping — The Appliance Connection',
  blocks: [
    {
      name: 'ac/hero',
      attributes: {
        eyebrow: 'Service',
        heading: 'Gas piping',
        subheading:
          'Licensed gas fitting for ranges, dryers, BBQs, garage & shop heaters, pool and water heaters — above and below grade.',
        primaryLabel: 'Request a quote',
        primaryUrl: '/contact',
      },
    },
  ],
};

const durham: PageData = {
  title: 'Appliance Installation in Durham Region — The Appliance Connection',
  blocks: [
    {
      name: 'ac/hero',
      attributes: {
        eyebrow: 'Durham Region',
        heading: 'Your Durham Region appliance installers',
        subheading: 'Oshawa, Whitby, Ajax, Pickering, Bowmanville and across Durham. Call 905·259·6545.',
        primaryLabel: 'Request a quote',
        primaryUrl: '/contact',
      },
    },
    {
      name: 'ac/service-grid',
      attributes: { heading: 'Services across Durham' },
      innerBlocks: [
        { name: 'ac/service-card', attributes: { title: 'Appliance installation', url: '/services/appliance-installation' } },
        { name: 'ac/service-card', attributes: { title: 'Gas piping', url: '/services/gas-piping' } },
        { name: 'ac/service-card', attributes: { title: 'Kitchens', url: '/services/kitchens' } },
      ],
    },
  ],
};

const peterborough: PageData = {
  title: 'Appliance Installation in Peterborough — The Appliance Connection',
  blocks: [
    {
      name: 'ac/hero',
      attributes: {
        eyebrow: 'Peterborough',
        heading: 'Your Peterborough appliance installers',
        subheading: 'Peterborough, Lakefield, Bridgenorth and the Kawarthas. Call 705·742·0306.',
        primaryLabel: 'Request a quote',
        primaryUrl: '/contact',
      },
    },
  ],
};

const durhamOshawa: PageData = {
  title: 'Appliance Installation in Oshawa — The Appliance Connection',
  blocks: [
    {
      name: 'ac/hero',
      attributes: {
        eyebrow: 'Durham Region · Oshawa',
        heading: 'Appliance installation in Oshawa',
        subheading: 'Same-day-quality installs for Oshawa homeowners. Licensed, insured, warrantied.',
        primaryLabel: 'Request a quote',
        primaryUrl: '/contact',
      },
    },
  ],
};

export const pages: Record<string, PageData> = {
  '/': home,
  '/services/appliance-installation': serviceApplianceInstall,
  '/services/gas-piping': serviceGasPiping,
  '/durham': durham,
  '/peterborough': peterborough,
  '/durham/oshawa': durhamOshawa,
};
