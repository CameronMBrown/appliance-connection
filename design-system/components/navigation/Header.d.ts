import * as React from 'react';

export interface HeaderNavItem {
  label: string;
  href: string;
  /** Dropdown links. The parent href is the section landing page (clicking the trigger goes there), so don't repeat it here unless it is a real peer (e.g. Durham under Service Areas). */
  children?: HeaderNavItem[];
  /** Desktop nav only: the label is a button that opens the dropdown instead of linking to `href` (for groupings with no landing page, e.g. Service Areas). Requires `children`. */
  toggleOnly?: boolean;
  /** Small icon shown beside the link in the dropdown / drawer (service links). */
  icon?: string;
}

export interface HeaderPhone {
  name: string;
  phone: string;
  /** Dial string for the tel: href, e.g. "19052596545". */
  tel: string;
}

/**
 * Site header: wordmark, primary nav with hover menus on the three hub sections,
 * and a standing Contact Us CTA. Below 1040px the nav and CTA collapse into a Menu
 * button that opens a full-width drawer (expandable sections, both phone
 * numbers, CTA); the wordmark drops below 420px.
 */
export interface HeaderProps {
  /** @default the full site tree (Home/Services/Durham/Peterborough/About/Contact) */
  nav?: HeaderNavItem[];
  /** Shown in the mobile drawer only. @default Durham + Peterborough */
  phones?: HeaderPhone[];
  /** Real logo image src; omit to fall back to the "AC" monogram box. */
  logoSrc?: string;
  /** @default "Contact Us" */
  ctaLabel?: string;
  /** @default "/contact/" */
  ctaHref?: string;
  /** Marks the matching top-level link as the current page. */
  currentPath?: string;
  /** Start with the mobile drawer open (specimen/demo use). */
  defaultOpen?: boolean;
  /** href of the drawer section to start expanded (specimen/demo use). */
  defaultSection?: string;
  /** Called with the href instead of a real navigation (for SPA-style demos). */
  onNavigate?: (href: string) => void;
}

export declare function Header(props: HeaderProps): React.JSX.Element;
