import type { EditorBlock, PageData, Partner, ServiceCardAttrs } from '../lib/blocks/types';
import type { RegionSlug } from '../lib/site';

/**
 * Mock content shaped exactly like a resolved `editorBlocks` tree, keyed by URL
 * path. This proves the whole render pipeline before WordPress is wired.
 * When WP is live, content.ts swaps this out for a GraphQL fetch — routes and
 * renderers don't change.
 *
 * Page composition + copy follow the Claude Design templates
 * (design-system/templates/{homepage,location,contact}). Placeholder copy is
 * labelled as such in visible text — never passed off as real.
 */

// --- Shared content ---------------------------------------------------------

const SERVICES: Array<ServiceCardAttrs & { slug: string; subheading: string }> = [
  {
    slug: 'appliance-installation',
    title: 'Appliance installation',
    description: 'Every make and model, freestanding and built-in, with panels and venting.',
    subheading:
      'Freestanding and built-in — ranges, cooktops, wall ovens, dishwashers, OTR microwaves, laundry, and custom panels.',
  },
  {
    slug: 'gas-piping',
    title: 'Gas piping',
    description: 'Licensed gas fitting for ranges, dryers, BBQs and garage heaters.',
    subheading:
      'Licensed gas fitting for ranges, dryers, BBQs, garage & shop heaters, pool and water heaters — above and below grade.',
  },
  {
    slug: 'kitchens',
    title: 'Kitchens',
    description: 'Full kitchen work, from rough-in through to the finished install.',
    subheading: 'Full kitchen work, from rough-in through to the finished install — every appliance installed to code.',
  },
  {
    slug: 'laundry-rooms',
    title: 'Laundry rooms',
    description: 'Washers, dryers, venting and relocations, including upstairs moves.',
    subheading: 'Washers, dryers, venting and relocations, including upstairs moves.',
  },
  {
    slug: 'plumbing-fixtures',
    title: 'Plumbing fixtures',
    description: 'Sinks, taps, water lines and shut-offs, done to code.',
    subheading: 'Sinks, taps, water lines and shut-offs, done to code.',
  },
  {
    slug: 'heaters',
    title: 'Heaters',
    description: 'Shop and garage heaters, pool heaters and water heaters.',
    subheading: 'Shop and garage heaters, pool heaters and water heaters.',
  },
];

const serviceCards = (): EditorBlock[] =>
  SERVICES.map(({ title, description, slug }) => ({
    name: 'ac/service-card',
    attributes: { title, description, url: `/services/${slug}/` },
  }));

const STATS: EditorBlock = {
  name: 'ac/stat-block',
  attributes: {
    // Value is the headline, label finishes the thought. The years badge draws
    // the "30+", so the value doesn't repeat the number.
    stats: [
      { value: 'Years of experience', label: 'Installing appliances across Southern Ontario', art: 'years' },
      { value: 'Warranty', label: 'Covers every job we do', mark: true, art: 'warranty' },
      { value: 'Licensed & insured', label: 'Licensed for gas fitting and plumbing', mark: true, art: 'stamp' },
      { value: '1,000s', label: 'Of installs completed', art: 'handshake' },
    ],
  },
};

const PLACEHOLDER_QUOTES = [
  'They installed our double wall oven and cooktop in an afternoon — spotless, and it just worked.',
  'Ran a new gas line for the range and took the old one out. Showed up when they said they would.',
  'Whole laundry room moved upstairs. Clean work, fair price, no surprises on the bill.',
];

const testimonials = (cites: string[], heading: string, background: 'paper' | 'alt'): EditorBlock => ({
  name: 'ac/testimonials',
  attributes: {
    eyebrow: 'What customers say',
    heading,
    text: 'Placeholder quotes — swap in real ones before launch.',
    items: PLACEHOLDER_QUOTES.map((quote, i) => ({ quote, cite: cites[i] })),
    background,
  },
});

const contactCta = (heading: string, showPhone = false): EditorBlock => ({
  name: 'ac/cta-band',
  attributes: {
    heading,
    text: 'Questions, advice or a quote — we respond within 24 hours.',
    ctaLabel: 'Contact Us',
    ctaUrl: '/contact/',
    isDark: true,
    showPhone,
  },
});

/**
 * Retail partners. Shared by Home (both) and the region hubs (the one that sells
 * in that area), so contact details live in exactly one place.
 */
const PADDYS_MARKET: Partner = {
  name: 'Paddy’s Market — The Appliance Specialist',
  url: 'https://www.paddysmarket.ca/',
  logoUrl: '/logo/partners/paddys-market.png',
  area: 'Serving Durham Region',
  phone: '906.263.8369',
  tel: '19062638369',
  email: 'sales@paddysmarket.ca',
  address: ['2212 Taunton Rd', 'Hampton, ON L0B 1J0'],
  mapEmbedUrl:
    'https://www.openstreetmap.org/export/embed.html?bbox=-78.7560%2C43.9390%2C-78.7340%2C43.9510&layer=mapnik&marker=43.9450%2C-78.7450',
  directionsUrl: 'https://www.openstreetmap.org/search?query=2212%20Taunton%20Rd%2C%20Hampton%2C%20ON',
};

const PETERBOROUGH_APPLIANCES: Partner = {
  name: 'Peterborough Appliances',
  url: 'https://www.peterboroughappliances.com/',
  logoUrl: '/logo/partners/peterborough-appliances.png',
  area: 'Serving Peterborough',
  phone: '705.748.9781',
  tel: '17057489781',
  email: 'sales@peterboroughappliances.com',
  address: ['2849 Lakefield Rd', 'Selwyn, ON K9J 6X5'],
  mapEmbedUrl:
    'https://www.openstreetmap.org/export/embed.html?bbox=-78.3160%2C44.3390%2C-78.2940%2C44.3510&layer=mapnik&marker=44.3450%2C-78.3050',
  directionsUrl: 'https://www.openstreetmap.org/search?query=2849%20Lakefield%20Rd%2C%20Selwyn%2C%20ON',
};

/** Service-area map section — shared by Home and About. */
const SERVICE_MAP: EditorBlock = {
  name: 'ac/service-map',
  attributes: {
    eyebrow: 'Service areas',
    heading: 'Serving Southern Ontario for 30+ years',
    text: 'Outside this area? Give us a call anyways. We will do our best to fit you in.',
    durhamUrl: '/durham/',
    peterboroughUrl: '/peterborough/',
    kawarthaLakesUrl: '/kawartha-lakes/',
    northumberlandUrl: '/northumberland/',
    primaryLabel: 'Contact Us',
    primaryUrl: '/contact/',
  },
};

// --- Home (templates/homepage) ---------------------------------------------

/**
 * Home services stack. Photos are the WP-generated 3:4 sizes (225/768/1152/1536w)
 * of real jobsite shots; items without a photo yet fall back to the graph-paper
 * placeholder. Most-requested services lead.
 */
const WP_UPLOADS = 'http://localhost:10018/wp-content/uploads/2026/10';
const stackPhoto = (name: string, alt: string) => ({
  image: `${WP_UPLOADS}/${name}-768x1024.avif`,
  imageAlt: alt,
  imageSrcset: [225, 768, 1152, 1536]
    .map((w) => `${WP_UPLOADS}/${name}-${w}x${Math.round((w * 4) / 3)}.avif ${w}w`)
    .join(', '),
  imageWidth: 768,
  imageHeight: 1024,
});

const HOME_STACK: EditorBlock = {
  name: 'ac/stack',
  attributes: {
    heading: 'What we install',
    items: [
      {
        eyebrow: 'Appliance installation',
        title: 'Freestanding and built-in, installed right',
        body: 'Ranges, cooktops, wall ovens, dishwashers, OTR microwaves, laundry, and custom panels. Every make and model.',
        ...stackPhoto('stove-and-range-3', 'A freestanding range installed in a finished kitchen'),
        buttonText: 'Learn more',
        buttonUrl: '/services/appliance-installation/',
      },
      {
        eyebrow: 'Kitchens',
        title: 'From rough-in to the finished install',
        body: 'Full kitchen work, from rough-in through to the finished install, with every appliance installed to code.',
        ...stackPhoto('unfinished-kitchen', 'A kitchen mid-renovation, ready for appliances'),
        buttonText: 'Learn more',
        buttonUrl: '/services/kitchens/',
      },
      {
        eyebrow: 'Laundry rooms',
        title: 'Washers, dryers and venting, in the right place',
        body: 'Washers, dryers, venting and relocations, including upstairs moves.',
        ...stackPhoto('washer-dryer', 'A washer and dryer installed side by side'),
        buttonText: 'Learn more',
        buttonUrl: '/services/laundry-rooms/',
      },
      {
        eyebrow: 'Gas piping',
        title: 'Licensed gas fitting, above and below grade',
        body: 'Licensed gas fitting for ranges, dryers, BBQs, garage and shop heaters, and pool and water heaters.',
        buttonText: 'Learn more',
        buttonUrl: '/services/gas-piping/',
      },
      {
        eyebrow: 'Plumbing fixtures',
        title: 'Sinks, taps and shut-offs, done to code',
        body: 'Sinks, taps, water lines and shut-offs, installed cleanly and tested before we leave.',
        buttonText: 'Learn more',
        buttonUrl: '/services/plumbing-fixtures/',
      },
      {
        eyebrow: 'Heaters',
        title: 'Shop, garage, pool and water heaters',
        body: 'Shop and garage heaters, pool heaters and water heaters, gas-fitted and installed by a licensed crew.',
        buttonText: 'Learn more',
        buttonUrl: '/services/heaters/',
      },
    ],
  },
};


const home: PageData = {
  title: 'The Appliance Connection — Complete Home Appliance Installation',
  description: 'Licensed, insured appliance installation across Durham & Peterborough.',
  blocks: [
    {
      name: 'ac/hero',
      attributes: {
        // No heading → the arched wordmark leads.
        // Video renditions + poster live in the WP Media Library (set in the block),
        // so the fixture shows the labelled placeholder. See docs/04-dev-workflow.md → Hero video.
        subheading: 'Complete home appliance installations',
        primaryLabel: 'Our services',
        primaryShortLabel: 'Services',
        primaryUrl: '/services/',
        secondaryLabel: 'Contact Us',
        secondaryShortLabel: 'Contact',
        secondaryUrl: '/contact/',
        scrim: 'standard',
        showPhones: true,
      },
    },
    {
      name: 'ac/trust',
      attributes: {
        heading: 'Why homeowners choose The Appliance Connection',
        // Position decides the role: primary, secondary, secondary, tertiary.
        // Draft copy; every claim here is one the client already states.
        items: [
          {
            title: 'Years of experience',
            art: 'years',
            body: 'More than three decades of installing appliances means we have seen your problem before. Tight kitchens, old gas lines, awkward panel fits: we know how to handle them cleanly.',
          },
          {
            title: 'Fully licensed & insured',
            body: 'Gas and water connections carry real risk. We are licensed for the work and insured, so your home is protected.',
            art: 'licensed',
          },
          {
            title: 'All work warrantied',
            body: 'If something we installed is not right, we come back and fix it.',
            art: 'warranty',
          },
          {
            title: 'Locally owned and operated',
            body: 'The Appliance Connection is run by Craig Holmes, not a call centre. When you call, you reach the people who do the work.',
            art: 'ontario',
          },
        ],
      },
    },
    {
      name: 'ac/intro',
      attributes: {
        eyebrow: 'About us',
        heading: 'Complete Home Appliance Installations',
        paragraphs: [
          'Welcome to The Appliance Connection. We are your one stop shop for all your appliance installation and essential home service needs. We have a long list of services we provide and no job is too big or too small.',
          'We have over 30 years experience, we are fully licensed and insured and of course, we warranty all of our work. We will provide you with excellent service at a fair price.',
          'Please visit the <a href="/about/">About Us page</a> for more information of all of the services we provide.',
        ],
        photos: [
          { label: 'Photo — finished kitchen install' },
          { label: 'Photo — gas line' },
          { label: 'Photo — laundry' },
        ],
      },
    },
    HOME_STACK,
    SERVICE_MAP,
    {
      name: 'ac/partners',
      attributes: {
        heading: 'Our Selling Partners',
        background: 'alt',
        partners: [PADDYS_MARKET, PETERBOROUGH_APPLIANCES],
      },
    },
  ],
};

// --- Services ----------------------------------------------------------------

const servicesIndex: PageData = {
  title: 'Services — The Appliance Connection',
  description: 'Appliance installation, gas piping, kitchens, laundry rooms, plumbing fixtures and heaters.',
  blocks: [
    {
      name: 'ac/page-header',
      attributes: {
        eyebrow: 'Services',
        heading: 'Everything we install',
        intro: 'One crew for the whole job — no job too big or too small. Licensed, insured and warrantied.',
        illustrationUrl: '/illustrations/craig-harley-carrying-box.webp',
        illustrationAlt: 'Craig and Harley carrying an appliance box',
        primaryLabel: 'Contact Us',
        primaryUrl: '/contact/',
      },
    },
    STATS,
    {
      name: 'ac/service-grid',
      attributes: { eyebrow: 'What we do', heading: 'Every install, one crew', numbered: true },
      innerBlocks: serviceCards(),
    },
    contactCta('Have a question?'),
  ],
};

const servicePage = (s: (typeof SERVICES)[number]): PageData => ({
  title: `${s.title} — The Appliance Connection`,
  blocks: [
    {
      name: 'ac/page-header',
      attributes: {
        eyebrow: 'Service',
        heading: s.title,
        intro: s.subheading,
        illustrationUrl: '/illustrations/craig-harley-carrying-box.webp',
        illustrationAlt: 'Craig and Harley carrying an appliance box',
        primaryLabel: 'Contact Us',
        primaryUrl: '/contact/',
      },
    },
    STATS,
    contactCta('Have a question?'),
  ],
});

// --- Regions (templates/location) --------------------------------------------

interface RegionContent {
  /**
   * Durham and Peterborough are phone regions (their own number, `ac_region`
   * routing). The other service areas have no dedicated number yet, so their
   * pages carry no region and show no per-region phone button.
   */
  slug: RegionSlug | 'kawartha-lakes' | 'northumberland';
  name: string;
  short: string;
  intro: string;
  body: string;
  towns: (string | { name: string; href: string })[];
  /** Homeowner cites for the testimonials row; empty = the row stays empty (no invented quotes). */
  cites: string[];
  /** The retail partner that sells in this area, with the "Serving …" label for it. */
  partner: { partner: Partner; area: string };
  /** Header illustration, picked from the Media Library (ID + URL as the editor stores them). */
  art: { id: number; url: string; alt: string };
}

const REGIONS: RegionContent[] = [
  {
    slug: 'durham',
    name: 'Durham Region',
    short: 'Durham',
    intro:
      'Licensed, insured and warrantied — over 30 years installing built-in appliances, gas lines and laundry rooms across Durham Region.',
    body: 'We have been on Durham roads for over 30 years, from Pickering out to Bowmanville. Our selling partner here is Paddy’s Market, so if you still need the appliance we can point you there first.',
    towns: [
      'Oshawa',
      'Whitby',
      'Pickering',
      'Ajax',
      'Bowmanville',
      'Courtice',
      'Port Perry',
      'Uxbridge',
      'Brooklin',
      'Clarington',
    ],
    cites: ['Homeowner, Whitby', 'Homeowner, Oshawa', 'Homeowner, Pickering'],
    partner: { partner: PADDYS_MARKET, area: 'Serving Durham Region' },
    art: {
      id: 167,
      url: 'http://localhost:10018/wp-content/uploads/2026/09/durham-region.avif',
      alt: 'Craig, in a black cap and tool belt, stands beside a large blue Durham Region sign.',
    },
  },
  {
    slug: 'peterborough',
    name: 'Peterborough',
    short: 'Peterborough',
    intro:
      'Licensed, insured and warrantied — over 30 years installing built-in appliances, gas lines and laundry rooms across Peterborough and the Kawarthas.',
    body: 'We cover Peterborough and the townships around it, from Lakefield down to Millbrook. Our selling partner here is Peterborough Appliances, so if you still need the appliance we can point you there first.',
    towns: [
      'Lakefield',
      'Bridgenorth',
      'Ennismore',
      'Selwyn',
      'Douro',
      'Keene',
      'Millbrook',
      'Norwood',
      'Buckhorn',
      'Apsley',
    ],
    cites: ['Homeowner, Lakefield', 'Homeowner, Peterborough', 'Homeowner, Bridgenorth'],
    partner: { partner: PETERBOROUGH_APPLIANCES, area: 'Serving Peterborough' },
    art: {
      id: 168,
      url: 'http://localhost:10018/wp-content/uploads/2026/09/Peterborough.avif',
      alt: 'Craig and Harley peek over a Peterborough sign, with Craig waving.',
    },
  },
  {
    slug: 'kawartha-lakes',
    name: 'Kawartha Lakes',
    short: 'Kawartha Lakes',
    intro:
      'Licensed, insured and warrantied — over 30 years installing built-in appliances, gas lines and laundry rooms across the City of Kawartha Lakes.',
    body: 'We cover the City of Kawartha Lakes, from Lindsay out to Bobcaygeon and Fenelon Falls. Send a quote request or give us a call and we will confirm timing for your address.',
    towns: ['Lindsay', 'Bobcaygeon', 'Fenelon Falls', 'Omemee', 'Woodville', 'Coboconk', 'Kirkfield', 'Little Britain'],
    cites: [],
    partner: { partner: PETERBOROUGH_APPLIANCES, area: 'Serving Kawartha Lakes' },
    art: {
      id: 178,
      url: 'http://localhost:10018/wp-content/uploads/2026/09/Kawartha-Lakes.avif',
      alt: 'Craig and Harley run forward with open arms beneath the Kawartha Lakes logo.',
    },
  },
  {
    slug: 'northumberland',
    name: 'Northumberland',
    short: 'Northumberland',
    intro:
      'Licensed, insured and warrantied — over 30 years installing built-in appliances, gas lines and laundry rooms across Northumberland County.',
    body: 'We cover Northumberland County along the 401 corridor, from Port Hope and Cobourg out to Brighton and Campbellford. Send a quote request or give us a call and we will confirm timing for your address.',
    towns: ['Cobourg', 'Port Hope', 'Brighton', 'Colborne', 'Campbellford', 'Grafton', 'Warkworth', 'Hastings'],
    cites: [],
    partner: { partner: PADDYS_MARKET, area: 'Serving Northumberland' },
    art: {
      id: 181,
      url: 'http://localhost:10018/wp-content/uploads/2026/09/Northumberland.avif',
      alt: 'Craig and Harley peek over a Northumberland County sign, with Craig waving.',
    },
  },
];

const REGION_FAQS = [
  {
    question: 'Do you supply the appliance, or just install it?',
    answer:
      'Either. We install what you have already bought, and we work with a local selling partner if you would rather buy through one.',
  },
  {
    question: 'Are you licensed for gas?',
    answer: 'Yes. Gas fitting is licensed and insured, and every gas job is warrantied like the rest of our work.',
  },
  {
    question: 'How soon can you come out?',
    answer: 'We respond to quote requests within 24 hours and can usually book within the week.',
  },
  {
    question: 'Do you charge for travel within the region?',
    answer: 'Placeholder answer — confirm travel policy for outlying towns before launch.',
  },
];

const regionHub = (r: RegionContent): PageData => {
  const phoneRegion: RegionSlug | undefined = r.slug === 'durham' || r.slug === 'peterborough' ? r.slug : undefined;
  return {
  title: `Appliance Installation in ${r.name} — The Appliance Connection`,
  region: phoneRegion,
  blocks: [
    {
      name: 'ac/page-header',
      attributes: {
        eyebrow: 'Service area',
        heading: `Appliance installation in ${r.name}`,
        intro: r.intro,
        illustrationId: r.art.id,
        illustrationUrl: r.art.url,
        illustrationAlt: r.art.alt,
        primaryLabel: 'Contact Us',
        primaryUrl: '/contact/',
        showPhone: Boolean(phoneRegion),
      },
    },
    STATS,
    {
      name: 'ac/service-grid',
      attributes: {
        eyebrow: 'What we do here',
        heading: 'Every install, one crew',
        text: 'The same work across the whole region — no job too big or too small.',
        linkLabel: 'All services',
        linkUrl: '/services/',
        numbered: true,
        background: 'alt',
      },
      innerBlocks: serviceCards(),
    },
    {
      name: 'ac/media-text',
      attributes: {
        heading: 'Local crew, local calls',
        paragraphs: [
          r.body,
          'We quote flat rates before the work starts, we clean up after ourselves, and we warranty everything we install. Same crew on the truck every time — you will know who is coming.',
        ],
        imageUrl: '/illustrations/harley-dolly-fridge.webp',
        imageAlt: 'Delivering an appliance',
      },
    },
    {
      name: 'ac/town-grid',
      attributes: {
        eyebrow: 'Coverage',
        heading: 'Towns we cover',
        text: 'All on the route — town pages are coming, this is the full list for now.',
        regions: [{ name: r.name, note: phoneRegion ? 'Same-week booking' : undefined, towns: r.towns }],
        background: 'alt',
        primaryLabel: 'Contact Us',
        primaryUrl: '/contact/',
        showPhone: Boolean(phoneRegion),
      },
    },
    r.cites.length > 0
      ? testimonials(r.cites, 'Recent work nearby', 'paper')
      : // Locked Location template needs the block; no items = nothing renders.
        { name: 'ac/testimonials', attributes: { heading: 'Recent work nearby', items: [], background: 'paper' } },
    {
      name: 'ac/faq',
      attributes: { eyebrow: 'Before you book', heading: 'Frequently asked questions', items: REGION_FAQS },
    },
    {
      name: 'ac/partners',
      attributes: {
        heading: 'Our Selling Partner',
        background: 'paper',
        partners: [{ ...r.partner.partner, area: r.partner.area }],
      },
    },
    contactCta(`Need a hand in ${r.short}?`, Boolean(phoneRegion)),
  ],
  };
};

/**
 * City pages. Decision 10 + the doorway-page warning in docs/03: each city page
 * must carry genuinely unique local content before launch. Until the client
 * supplies it, these say so in visible copy rather than faking it.
 *
 * Same 9-block skeleton as the hubs: the Location post type locks its block
 * template (ac-core), so every location carries every section. Sections left
 * empty (local story, towns, quotes, FAQ) don't render.
 */
const cityPage = (region: RegionSlug, town: string): PageData => ({
  title: `Appliance Installation in ${town} — The Appliance Connection`,
  region,
  blocks: [
    {
      name: 'ac/page-header',
      attributes: {
        eyebrow: region === 'durham' ? 'Durham Region' : 'Peterborough',
        heading: `Appliance installation in ${town}`,
        intro: `Placeholder — unique ${town} content (local jobs, nearby projects, local testimonials) goes here before launch.`,
        illustrationUrl: '/illustrations/craig-harley-waving.webp',
        illustrationAlt: 'Craig and Harley',
        primaryLabel: 'Contact Us',
        primaryUrl: '/contact/',
        showPhone: true,
      },
    },
    STATS,
    {
      name: 'ac/service-grid',
      attributes: {
        eyebrow: `What we do in ${town}`,
        heading: 'Every install, one crew',
        linkLabel: 'All services',
        linkUrl: '/services/',
        numbered: true,
        background: 'alt',
      },
      innerBlocks: serviceCards(),
    },
    { name: 'ac/media-text', attributes: {} },
    { name: 'ac/town-grid', attributes: {} },
    { name: 'ac/testimonials', attributes: {} },
    { name: 'ac/faq', attributes: {} },
    { name: 'ac/partners', attributes: {} },
    contactCta(`Need a hand in ${town}?`, true),
  ],
});

// --- Contact (templates/contact) ---------------------------------------------

const contact: PageData = {
  title: 'Contact Us — The Appliance Connection',
  description: 'Questions, advice or a quote — we respond within 24 hours.',
  blocks: [
    {
      name: 'ac/page-header',
      attributes: {
        heading: 'Contact us',
        intro:
          'Questions, advice or a quote — send us a message and we will get back to you within 24 hours. Prefer to talk it through? Call the number for your region.',
        illustrationUrl: '/illustrations/craig-and-harley.webp',
        illustrationAlt: 'Craig and Harley, The Appliance Connection',
      },
    },
    {
      name: 'ac/contact',
      attributes: {
        hours: [
          { day: 'Mon–Fri', time: '7:00am – 6:00pm' },
          { day: 'Saturday', time: 'By appointment' },
          { day: 'Sunday', time: 'Closed' },
        ],
        hoursNote: 'Placeholder hours — confirm before launch.',
        areaText:
          'Durham Region and Peterborough, Ontario. Not sure if you are in range? Call and ask — we will tell you straight.',
      },
    },
    {
      name: 'ac/testimonials',
      attributes: {
        eyebrow: 'What customers say',
        heading: 'Recent installs',
        text: 'Placeholder quotes — swap in real ones before launch.',
        items: PLACEHOLDER_QUOTES.map((quote, i) => ({
          quote,
          cite: ['Homeowner, Whitby', 'Homeowner, Oshawa', 'Homeowner, Lakefield'][i],
        })),
        background: 'alt',
      },
    },
    {
      name: 'ac/faq',
      attributes: {
        eyebrow: 'Before you book',
        heading: 'Frequently asked questions',
        background: 'paper',
        footnote: 'Still have a question? Call us or send it through the form above.',
        items: [
          {
            question: 'Do you supply the appliance, or just install it?',
            answer:
              'Either. We install what you have already bought, and we work with Paddy’s Market in Durham and Peterborough Appliances in Peterborough if you would rather buy through a partner.',
          },
          REGION_FAQS[1],
          REGION_FAQS[2],
          {
            question: 'What does a quote cost?',
            answer: 'Nothing. Quotes are free and flat-rate, given before we start, so there are no hourly surprises.',
          },
          {
            question: 'Do you take the old appliance away?',
            answer: 'Placeholder answer — confirm removal and disposal policy before launch.',
          },
        ],
      },
    },
  ],
};

// --- About -------------------------------------------------------------------
// No Claude Design template yet — composed from the same blocks.

const about: PageData = {
  title: 'About — The Appliance Connection',
  blocks: [
    {
      name: 'ac/page-header',
      attributes: {
        eyebrow: 'About',
        heading: 'Thirty years of doing it right',
        intro:
          'The Appliance Connection has installed complete home appliances across Durham and Peterborough for over 30 years — licensed, insured, and warrantied. Owner story, credentials, and the trucks go here (real content + photos to follow).',
        illustrationUrl: '/illustrations/craig-and-harley.webp',
        illustrationAlt: 'Craig and Harley, The Appliance Connection',
        primaryLabel: 'Contact Us',
        primaryUrl: '/contact/',
      },
    },
    STATS,
    {
      name: 'ac/media-text',
      attributes: {
        heading: 'Proudly Canadian',
        paragraphs: [
          'The Appliance Connection has been Canadian owned and operated for over 30 years. When you book with us, you’re dealing with the people who own the business and answer for the work.',
          'Thousands of installs later, our standard hasn’t changed: do the job right, leave your home clean, and stand behind every install. Your satisfaction is on us, and if something isn’t right, we make it right.',
        ],
        imageId: 205,
        imageUrl: 'http://localhost:10018/wp-content/uploads/2026/09/proudly-canadian.avif',
        imageAlt: 'Cartoon Craig in red, maple leaf shaped sunglasses. He is proudly holding a waving Canadian flag',
        background: 'dark',
      },
    },
    SERVICE_MAP,
    contactCta('Have a question?'),
  ],
};

// --- Utility pages -------------------------------------------------------------

const legalPage = (heading: string, eyebrow: string): PageData => ({
  title: `${heading} — The Appliance Connection`,
  blocks: [
    {
      name: 'ac/page-header',
      attributes: {
        eyebrow,
        heading,
        intro: `Placeholder — the ${heading.toLowerCase()} text is still to be supplied before launch.`,
      },
    },
  ],
});

// --- Route table -------------------------------------------------------------

export const pages: Record<string, PageData> = {
  '/': home,
  '/services': servicesIndex,
  ...Object.fromEntries(SERVICES.map((s) => [`/services/${s.slug}`, servicePage(s)])),
  ...Object.fromEntries(REGIONS.map((r) => [`/${r.slug}`, regionHub(r)])),
  // v1 scope: hub pages only. cityPage() stays defined, unused, for when
  // sub-region pages/nav links come back.
  '/about': about,
  '/contact': contact,
  '/privacy': legalPage('Privacy policy', 'Privacy'),
  '/legal': legalPage('Legal', 'Legal'),
};
