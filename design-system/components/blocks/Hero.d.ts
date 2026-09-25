import * as React from 'react';

export interface HeroPhone {
  /** Label, e.g. "Phone Durham Region". */
  label: string;
  phone: string;
  /** Dial string for the tel: href, e.g. "19052596545". */
  tel: string;
}

/**
 * Page-top video hero. The frame is 16:9 (hero videos are 16:9) so the whole
 * video shows on desktop; a min-height keeps room for the title on narrow
 * screens, where the video covers and crops its sides. Past 1600px the frame
 * stops growing and floats on the ink band with a white rule, padding and a
 * drop shadow. Leads with the arched Wordmark unless a `heading` is given.
 */
export interface HeroProps {
  /** Plain display headline. When set, replaces the arched wordmark (unless `wordmark` is forced true). */
  heading?: string;
  /** Force the arched wordmark on/off. @default true when no `heading` */
  wordmark?: boolean;
  /** Benguiat sub-line; scales with the title. */
  subheading?: string;
  /** Looping, muted 16:9 background video. Paused for prefers-reduced-motion. */
  videoUrl?: string;
  /** Still frame shown before the video plays (and under reduced motion). */
  posterUrl?: string;
  /** Still-photo fallback when there's no video; omit both for the placeholder. */
  imageUrl?: string;
  primaryLabel?: string;
  /** Shorter label shown below 640px, e.g. "Services". Screen readers always get the full label. */
  primaryShortLabel?: string;
  primaryUrl?: string;
  secondaryLabel?: string;
  /** Shorter label shown below 640px, e.g. "Contact". */
  secondaryShortLabel?: string;
  secondaryUrl?: string;
  /** Darkening over the media — use "strong" for bright footage. @default "standard" */
  scrim?: 'standard' | 'strong';
  /** Optional phone strip under the frame. @default [] */
  phones?: HeroPhone[];
}

export declare function Hero(props: HeroProps): React.JSX.Element;
