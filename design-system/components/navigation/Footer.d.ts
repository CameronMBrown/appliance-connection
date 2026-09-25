import * as React from 'react';

export interface FooterRegion {
  name: string;
  phone: string;
  /** Dial string for the tel: href, e.g. "19052596545". */
  tel: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

/**
 * Site footer on the inverse (.on-dark) scope: brand + Contact Us CTA, both regional
 * phone numbers, a mini nav, and the legal line. Three ruled cells on desktop,
 * stacked full-width below 600px with a full-width CTA.
 */
export interface FooterProps {
  /** Real logo image src; omit for the wordmark alone. */
  logoSrc?: string;
  /** @default Durham Region + Peterborough */
  regions?: FooterRegion[];
  /** Mini nav. @default Services / About / Contact */
  links?: FooterLink[];
  /** Bottom-line utility links. @default Privacy / Legal */
  utility?: FooterLink[];
  /** @default "Contact Us" */
  ctaLabel?: string;
  /** @default "/contact/" */
  ctaHref?: string;
  /** @default the current year */
  year?: number;
  /** Called with the href instead of a real navigation (for SPA-style demos). */
  onNavigate?: (href: string) => void;
}

export declare function Footer(props: FooterProps): React.JSX.Element;
