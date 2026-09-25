import * as React from 'react';

/**
 * The brand wordmark. `arched` is the signature lockup — "APPLIANCE CONNECTION"
 * set on a shallow arch with a small horizontal "THE" resting above its left
 * end; it fills its container's width and scales with it, so size it by
 * sizing the parent. `flat` is the compact lockup for tight spaces (primary
 * nav, footer): small "THE" above and left of a "APPLIANCE" / "CONNECTION" on
 * two lines. Both carry an accessible name of "The Appliance Connection".
 */
export interface WordmarkProps {
  /** @default "arched" */
  variant?: 'arched' | 'flat';
  /** light = white on dark/video grounds; dark = ink on paper. @default "light" */
  tone?: 'light' | 'dark';
  /** Semi-flat offset shadow — ink behind light, wood behind dark. Keep on over video. @default true */
  shadow?: boolean;
  /** Element to render — use "h1" when the mark is the page title. @default "span" */
  as?: 'h1' | 'h2' | 'p' | 'span' | 'div';
  /** Flat variant only: CSS font-size of the main line ("THE" is half). Inherits when omitted. */
  size?: string;
}

export declare function Wordmark(props: WordmarkProps): React.JSX.Element;
