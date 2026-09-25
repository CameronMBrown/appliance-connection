import * as React from 'react';

/**
 * The one clickable action used everywhere — solid brass primary CTA, ink
 * outline secondary, or an inline ghost link. Colour is reserved for primary.
 */
export interface ButtonProps {
  /** Visual treatment. @default 'primary' */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Renders an <a> when set; otherwise a <button>. */
  href?: string;
  onClick?: () => void;
  /** @default 'button' */
  type?: 'button' | 'submit';
  disabled?: boolean;
  children: React.ReactNode;
}
