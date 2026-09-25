import * as React from 'react';

/**
 * Centered closing pitch used to end a page — heading, one line of text, one
 * primary CTA. Defaults to the dark `.on-dark` band; set isDark={false} for a
 * light-ground variant mid-page.
 */
export interface CtaBandProps {
  heading?: string;
  text?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  /** @default true */
  isDark?: boolean;
}
