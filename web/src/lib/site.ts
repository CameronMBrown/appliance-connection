/**
 * Site-wide constants: phones, regions, primary nav. One place so the header,
 * footer, call bar and region pages always agree (decision 3: correct phone
 * per page). Nav shape matches the design system's Header `nav` prop.
 */

export type RegionSlug = 'durham' | 'peterborough';

export interface Phone {
  /** Region label, e.g. "Durham Region". */
  name: string;
  /** Display form, e.g. "905.259.6545". */
  phone: string;
  /** Dial string for tel: hrefs, e.g. "19052596545". */
  tel: string;
}

export const PHONES: Record<RegionSlug, Phone> = {
  durham: { name: 'Durham Region', phone: '905.259.6545', tel: '19052596545' },
  peterborough: { name: 'Peterborough', phone: '705.742.0306', tel: '17057420306' },
};

/** Both regions, Durham first — the default when a page has no region. */
export const ALL_PHONES: Phone[] = [PHONES.durham, PHONES.peterborough];

/**
 * Phones for a page: its own region first, so the right number leads.
 * `phones` is the live set (from the WordPress region hubs); PHONES is the
 * fallback when WordPress isn't connected.
 */
export function phonesFor(region?: RegionSlug, phones: Record<RegionSlug, Phone> = PHONES): Phone[] {
  const first: RegionSlug = region ?? 'durham';
  const other: RegionSlug = first === 'durham' ? 'peterborough' : 'durham';
  return [phones[first], phones[other]];
}

export const LOGO_SRC = '/logo/truck-logo-detailed.png';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/**
 * Fallback navigation (used when WordPress isn't connected). The live menus are
 * edited in WP → Appearance → Menus (locations: primary, footer, legal).
 */
export const NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services/',
    children: [
      { label: 'All services', href: '/services/' },
      { label: 'Appliance installation', href: '/services/appliance-installation/' },
      { label: 'Gas piping', href: '/services/gas-piping/' },
      { label: 'Kitchens', href: '/services/kitchens/' },
      { label: 'Laundry rooms', href: '/services/laundry-rooms/' },
      { label: 'Plumbing fixtures', href: '/services/plumbing-fixtures/' },
      { label: 'Heaters', href: '/services/heaters/' },
    ],
  },
  {
    label: 'Durham',
    href: '/durham/',
    children: [
      { label: 'Durham Region', href: '/durham/' },
      { label: 'Oshawa', href: '/durham/oshawa/' },
      { label: 'Whitby', href: '/durham/whitby/' },
      { label: 'Pickering', href: '/durham/pickering/' },
    ],
  },
  {
    label: 'Peterborough',
    href: '/peterborough/',
    children: [
      { label: 'Peterborough', href: '/peterborough/' },
      { label: 'Lakefield', href: '/peterborough/lakefield/' },
      { label: 'Bridgenorth', href: '/peterborough/bridgenorth/' },
      { label: 'Ennismore', href: '/peterborough/ennismore/' },
    ],
  },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export const FOOTER_LINKS: NavItem[] = [
  { label: 'Services', href: '/services/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export const LEGAL_LINKS: NavItem[] = [
  { label: 'Privacy', href: '/privacy/' },
  { label: 'Legal', href: '/legal/' },
];

/** Normalise a path to the nav's trailing-slash form, for aria-current. */
export function navPath(pathname: string): string {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

/**
 * The top-level nav href a path belongs to, so /durham/oshawa/ still marks
 * "Durham" as current.
 */
export function navSection(pathname: string, nav: NavItem[] = NAV): string {
  const p = navPath(pathname);
  if (p === '/') return '/';
  const top = nav.find((item) => item.href !== '/' && p.startsWith(item.href));
  return top ? top.href : p;
}
