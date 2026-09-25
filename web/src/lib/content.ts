import type { PageData } from './blocks/types';
import { pages as fixturePages } from '../fixtures/pages';
import { gqlQuery } from './graphql/client';
import { EDITOR_BLOCKS, normaliseBlocks } from './graphql/blocks';
import { FOOTER_LINKS, LEGAL_LINKS, NAV, PHONES, type NavItem, type Phone, type RegionSlug } from './site';

/**
 * The content seam. With WPGRAPHQL_URL set (web/.env), every page, the menus
 * and the region phones come from WordPress. Without it, the typed fixtures
 * stand in, so the site still builds offline or without Local running.
 *
 * Routes and renderers don't care which source answered.
 *
 * URL scheme (mirrored in cms/mu-plugins/ac-core/headless.php):
 *   page          /  (front page)  ·  /{slug}
 *   ac_service    /services/{slug}
 *   ac_location   /{hub}  ·  /{hub}/{town}
 * Keys have no trailing slash ('/' for home).
 */

export interface SiteData {
  nav: NavItem[];
  footerLinks: NavItem[];
  legalLinks: NavItem[];
  phones: Record<RegionSlug, Phone>;
}

const useWordPress = Boolean(import.meta.env.WPGRAPHQL_URL);

// ---------------------------------------------------------------------------
// WordPress
// ---------------------------------------------------------------------------

const SEO = 'title seoTitle seoDescription';

const ALL_CONTENT = /* GraphQL */ `
  query AllContent {
    pages(first: 100) {
      nodes { ${SEO} slug uri isFrontPage ${EDITOR_BLOCKS} }
    }
    services(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes { ${SEO} slug ${EDITOR_BLOCKS} }
    }
    locations(first: 100) {
      nodes {
        ${SEO} slug phone
        parent { node { slug } }
        regions { nodes { slug } }
        ${EDITOR_BLOCKS}
      }
    }
    primary: menuItems(first: 100, where: { location: PRIMARY }) { nodes { ...Item } }
    footer: menuItems(first: 100, where: { location: FOOTER }) { nodes { ...Item } }
    legal: menuItems(first: 100, where: { location: LEGAL }) { nodes { ...Item } }
  }
  fragment Item on MenuItem { id parentId label url order }
`;

interface WpNode {
  title: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  slug: string;
  editorBlocks: Parameters<typeof normaliseBlocks>[0];
}
interface WpMenuItem {
  id: string;
  parentId: string | null;
  label: string;
  url: string;
  order: number;
}
interface AllContent {
  pages: { nodes: (WpNode & { uri: string; isFrontPage: boolean })[] };
  services: { nodes: WpNode[] };
  locations: {
    nodes: (WpNode & {
      phone?: string | null;
      parent?: { node: { slug: string } } | null;
      regions: { nodes: { slug: string }[] };
    })[];
  };
  primary: { nodes: WpMenuItem[] };
  footer: { nodes: WpMenuItem[] };
  legal: { nodes: WpMenuItem[] };
}

const SUFFIX = ' — The Appliance Connection';

const toPage = (n: WpNode, region?: RegionSlug): PageData => ({
  title: n.seoTitle || `${n.title}${SUFFIX}`,
  description: n.seoDescription || undefined,
  region,
  blocks: normaliseBlocks(n.editorBlocks),
});

const isRegion = (slug?: string): slug is RegionSlug => slug === 'durham' || slug === 'peterborough';

/** Flat WP menu items (parentId links) → the nested NavItem tree the header takes. */
function toNav(items: WpMenuItem[]): NavItem[] {
  const sorted = [...items].sort((a, b) => a.order - b.order);
  const byId = new Map(sorted.map((i) => [i.id, { label: i.label, href: i.url } as NavItem]));
  const roots: NavItem[] = [];
  for (const i of sorted) {
    const node = byId.get(i.id)!;
    const parent = i.parentId ? byId.get(i.parentId) : undefined;
    if (parent) (parent.children ??= []).push(node);
    else roots.push(node);
  }
  return roots;
}

/** "905.259.6545" → tel digits with country code, e.g. "19052596545". */
const telFor = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 ? `1${digits}` : digits;
};

async function loadFromWordPress(): Promise<{ pages: Record<string, PageData>; site: SiteData }> {
  const data = await gqlQuery<AllContent>(ALL_CONTENT);
  const pages: Record<string, PageData> = {};

  for (const p of data.pages.nodes) {
    const path = p.isFrontPage ? '/' : p.uri.replace(/\/$/, '');
    pages[path] = toPage(p);
  }
  for (const s of data.services.nodes) {
    pages[`/services/${s.slug}`] = toPage(s);
  }

  const phones: Record<RegionSlug, Phone> = { ...PHONES };
  for (const l of data.locations.nodes) {
    const hub = l.parent?.node.slug;
    // The ac_region term is the source of truth; the hub slug is the fallback.
    const region = l.regions.nodes.map((r) => r.slug).find(isRegion) ?? [hub, l.slug].find(isRegion);
    pages[hub ? `/${hub}/${l.slug}` : `/${l.slug}`] = toPage(l, region);
    // Region hubs carry the region's phone number (ac_phone meta).
    if (!hub && isRegion(l.slug) && l.phone) {
      phones[l.slug] = { ...PHONES[l.slug], phone: l.phone, tel: telFor(l.phone) };
    }
  }

  const site: SiteData = {
    nav: data.primary.nodes.length ? toNav(data.primary.nodes) : NAV,
    footerLinks: data.footer.nodes.length ? toNav(data.footer.nodes) : FOOTER_LINKS,
    legalLinks: data.legal.nodes.length ? toNav(data.legal.nodes) : LEGAL_LINKS,
    phones,
  };
  return { pages, site };
}

// ---------------------------------------------------------------------------
// Public API — one fetch per build, shared by every page (module-level cache).
// ---------------------------------------------------------------------------

let cache: Promise<{ pages: Record<string, PageData>; site: SiteData }> | undefined;

function load() {
  // `astro dev` renders on each request: skip the cache there so a WP edit
  // shows on refresh. `astro build` fetches once for all pages.
  if (import.meta.env.DEV) cache = undefined;
  cache ??= useWordPress
    ? loadFromWordPress()
    : Promise.resolve({
        pages: fixturePages,
        site: { nav: NAV, footerLinks: FOOTER_LINKS, legalLinks: LEGAL_LINKS, phones: PHONES },
      });
  return cache;
}

export async function getPage(path: string): Promise<PageData | undefined> {
  return (await load()).pages[path];
}

/** Every routable path except '/', for the catch-all route's getStaticPaths. */
export async function getPaths(): Promise<string[]> {
  return Object.keys((await load()).pages).filter((p) => p !== '/');
}

export async function getSite(): Promise<SiteData> {
  return (await load()).site;
}
