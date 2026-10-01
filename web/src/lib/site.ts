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
  /** Desktop header: clicking the label opens the dropdown instead of navigating. */
  toggleOnly?: boolean;
  /** Service icon URL — filled in for service links from SERVICE_ICONS / WP `ac_icon`. */
  icon?: string;
}

/**
 * Fallback service icons, keyed by service path (with trailing slash). The live
 * ones are each Service's `ac_icon` meta (a WP media-library URL); these copies
 * in web/public stand in when WordPress isn't connected.
 */
export const SERVICE_ICONS: Record<string, string> = {
  '/services/appliance-installation/': '/icons/services/appliance-installation.png',
  '/services/gas-piping/': '/icons/services/gas-piping.png',
  '/services/heaters/': '/icons/services/heaters.png',
  '/services/kitchens/': '/icons/services/kitchens.png',
  '/services/laundry-rooms/': '/icons/services/laundry-rooms.png',
  '/services/plumbing-fixtures/': '/icons/services/plumbing-fixtures.png',
};

/** Attach service icons to any nav link that points at a service. */
export const withIcons = (items: NavItem[], icons: Record<string, string>): NavItem[] =>
  items.map((i) => ({
    ...i,
    ...(icons[i.href] && { icon: icons[i.href] }),
    ...(i.children && { children: withIcons(i.children, icons) }),
  }));

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
      { label: 'Appliance installation', href: '/services/appliance-installation/' },
      { label: 'Gas piping', href: '/services/gas-piping/' },
      { label: 'Kitchens', href: '/services/kitchens/' },
      { label: 'Laundry rooms', href: '/services/laundry-rooms/' },
      { label: 'Plumbing fixtures', href: '/services/plumbing-fixtures/' },
      { label: 'Heaters', href: '/services/heaters/' },
    ],
  },
  {
    // v1 scope: the four service-area hubs. Town pages/links come back later.
    label: 'Service Areas',
    href: '/durham/',
    toggleOnly: true,
    children: [
      { label: 'Durham Region', href: '/durham/' },
      { label: 'Peterborough', href: '/peterborough/' },
      { label: 'Kawartha Lakes', href: '/kawartha-lakes/' },
      { label: 'Northumberland', href: '/northumberland/' },
    ],
  },
  { label: 'About', href: '/about/' },
  // No "Contact" item here — the header CTA ("Contact Us") already covers it.
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
 * The top-level nav href a path belongs to, so /peterborough/ still marks
 * "Service Areas" as current even though the item's own href is /durham/.
 */
export function navSection(pathname: string, nav: NavItem[] = NAV): string {
  const p = navPath(pathname);
  if (p === '/') return '/';
  const top = nav.find(
    (item) =>
      (item.href !== '/' && p.startsWith(item.href)) ||
      item.children?.some((c) => c.href !== '/' && p.startsWith(c.href)),
  );
  return top ? top.href : p;
}
