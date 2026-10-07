/**
 * Shapes for blocks coming from WPGraphQL Content Blocks (`editorBlocks`).
 * Hand-written for now (fixtures-first); once WP is live these will be replaced /
 * augmented by GraphQL Codegen output. See docs/02-architecture.md.
 *
 * Each interface mirrors a block.json in cms/plugins/ac-blocks/src/<block>/.
 * Array attributes (towns, faqs, partners…) are `type: "array"` in block.json.
 */
import type { Phone, RegionSlug } from '../site';

export interface EditorBlock<A = Record<string, unknown>> {
  /** e.g. "ac/hero" */
  name: string;
  attributes: A;
  innerBlocks?: EditorBlock[];
}

/** Page-level context every renderer receives alongside its attributes. */
export interface BlockContext {
  /** Page's region, if it has one (location pages). */
  region?: RegionSlug;
  /** Both region phones, the page's own region first (from WordPress when connected). */
  phones?: Phone[];
  /** Service path (e.g. "/services/gas-piping/") → icon URL, for service cards. */
  serviceIcons?: Record<string, string>;
}

/** Shared by the ruled section bands — paper or the alt (off-white) ground. */
export type Background = 'paper' | 'alt';

/** The standard section opener (design-system SectionHeader). */
export interface SectionHeaderAttrs {
  eyebrow?: string;
  heading?: string;
  text?: string;
  linkLabel?: string;
  linkUrl?: string;
}

export interface HeroVideoSource {
  url: string;
  /** `video/webm` or `video/mp4`. */
  mime: string;
  /** Rendition width in px. Several files (one per codec) share each width. */
  width: number;
}

export interface HeroAttrs {
  /** Plain display headline. Empty = the arched wordmark leads instead. */
  heading?: string;
  subheading?: string;
  /** Video renditions from the WP Media Library (see web/scripts/encode-hero-video.mjs). */
  videoSources?: HeroVideoSource[];
  /** Poster = the LCP image. srcset lists WP-generated sizes of the same 16:9 image. */
  posterUrl?: string;
  posterSrcset?: string;
  posterWidth?: number;
  posterHeight?: number;
  primaryLabel?: string;
  /** Shorter label below 640px, e.g. "Services". */
  primaryShortLabel?: string;
  primaryUrl?: string;
  secondaryLabel?: string;
  secondaryShortLabel?: string;
  secondaryUrl?: string;
  scrim?: 'standard' | 'strong';
  /** Phone strip under the frame (both regions, page region first). */
  showPhones?: boolean;
}

export interface PageHeaderAttrs {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  /** Media Library attachment ID, set when the image is picked in the editor. */
  illustrationId?: number;
  illustrationUrl?: string;
  illustrationAlt?: string;
  primaryLabel?: string;
  primaryUrl?: string;
  /** Adds a "Call <region>" phone button using the page's region number. */
  showPhone?: boolean;
}

/** One bento cell. Position decides the role: 0 primary, 1-2 secondary, 3 tertiary. */
export interface TrustCell {
  title: string;
  body?: string;
  /** Named decorative graphic drawn in code (components/trust-art/). */
  art?: 'years' | 'licensed' | 'warranty' | 'ontario';
}

export interface TrustAttrs {
  /** Visually hidden h2 that gives the section its place in the page outline. */
  heading?: string;
  /** Real credentials only — the section renders nothing when empty. */
  items?: TrustCell[];
}

/** One stack card. Eyebrow, title and body are required; photo and button are optional. */
export interface StackItem {
  eyebrow: string;
  title: string;
  body?: string;
  /** Without a photo the card shows the graph-paper placeholder. */
  image?: string;
  imageAlt?: string;
  /** WP's generated sizes as a `srcset` string, so phones get the small file. */
  imageSrcset?: string;
  imageWidth?: number;
  imageHeight?: number;
  buttonText?: string;
  buttonUrl?: string;
}

export interface StackAttrs {
  /** Visually hidden h2 that gives the section its place in the page outline. */
  heading?: string;
  /** 3 to 8 cards; later cards stack over earlier ones as you scroll. */
  items?: StackItem[];
}

export interface PhotoSlot {
  url?: string;
  alt?: string;
  /** Placeholder tag shown until a real photo is supplied. */
  label?: string;
}

export interface IntroAttrs {
  eyebrow?: string;
  heading?: string;
  /** Paragraphs; inline HTML (links, bold) from the editor's RichText. */
  paragraphs?: string[];
  /** One large photo + two small, per the homepage template. */
  photos?: PhotoSlot[];
}

export interface Partner {
  name: string;
  url?: string;
  logoUrl?: string;
  /** e.g. "Serving Durham Region" */
  area?: string;
  phone?: string;
  tel?: string;
  email?: string;
  /** Address lines, e.g. ["2212 Taunton Rd", "Hampton, ON L0B 1J0"]. */
  address?: string[];
  /** OpenStreetMap embed URL for the small map. */
  mapEmbedUrl?: string;
  directionsUrl?: string;
}

export interface PartnersAttrs {
  heading?: string;
  partners?: Partner[];
  background?: Background;
}

export interface Stat {
  value: string;
  label: string;
  mark?: boolean;
  /** Small still graphic from components/trust-art/; replaces the ✓. */
  art?: 'years' | 'licensed' | 'warranty' | 'stamp' | 'handshake';
}

export interface StatBlockAttrs {
  stats?: Stat[];
}

export interface ServiceMapAttrs extends SectionHeaderAttrs {
  /** Page URL per region; empty/undefined = the region is drawn but not linked. */
  durhamUrl?: string;
  peterboroughUrl?: string;
  kawarthaLakesUrl?: string;
  northumberlandUrl?: string;
  /** CTA under the map: Contact button label/URL. Empty label = no button. */
  primaryLabel?: string;
  primaryUrl?: string;
  background?: Background;
}

export interface ServiceGridAttrs extends SectionHeaderAttrs {
  /** Number the cards 01, 02… (index tag above each title). */
  numbered?: boolean;
  background?: Background;
}

export interface ServiceCardAttrs {
  title?: string;
  description?: string;
  url?: string;
  /** Icon URL. Usually left empty: the card falls back to its service's icon. */
  icon?: string;
  /** Micro-label above the title; ServiceGrid fills it when `numbered`. */
  index?: string;
}

export interface MediaTextAttrs {
  heading?: string;
  /** Paragraphs; inline HTML (links, bold) from the editor's RichText. */
  paragraphs?: string[];
  /** Media Library attachment ID, set when the image is picked in the editor. */
  imageId?: number;
  imageUrl?: string;
  imageAlt?: string;
  /** Which side the illustration sits on at desktop width (above 900px). */
  imagePosition?: 'right' | 'left';
  /** Where the illustration sits once the layout stacks (900px and below). Always centred. */
  mobileImagePosition?: 'below' | 'above';
  /** `dark` = ink band, white text, illustration framed in a white box. */
  background?: Background | 'dark';
}

export interface Town {
  name: string;
  href?: string;
}

export interface TownRegion {
  name: string;
  href?: string;
  note?: string;
  towns: (string | Town)[];
}

export interface TownGridAttrs extends SectionHeaderAttrs {
  regions?: TownRegion[];
  background?: Background;
  /** CTA: Contact button label/URL. Empty label + no phone = no CTA. */
  primaryLabel?: string;
  primaryUrl?: string;
  /** Adds a "Call <region>" phone button using the page's region number. */
  showPhone?: boolean;
}

export interface TestimonialItem {
  quote: string;
  /** "Homeowner, {town}" — never a full name. */
  cite: string;
}

export interface TestimonialsAttrs extends SectionHeaderAttrs {
  items?: TestimonialItem[];
  background?: Background;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqAttrs extends SectionHeaderAttrs {
  items?: FaqItem[];
  footnote?: string;
  background?: Background;
}

export interface HoursRow {
  day: string;
  time: string;
}

export interface ContactAttrs {
  formEyebrow?: string;
  formHeading?: string;
  formIntro?: string;
  hours?: HoursRow[];
  hoursNote?: string;
  areaText?: string;
}

export interface CtaBandAttrs {
  heading?: string;
  text?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  isDark?: boolean;
  /** Adds an outline button with the page region's phone number. */
  showPhone?: boolean;
}

/** A renderable page: title + a flat list of top-level blocks. */
export interface PageData {
  title: string;
  description?: string;
  region?: RegionSlug;
  blocks: EditorBlock[];
}
