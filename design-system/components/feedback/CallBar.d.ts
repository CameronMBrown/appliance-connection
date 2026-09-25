import * as React from 'react';

export interface CallBarNumber {
  name: string;
  phone: string;
  tel: string;
}

/**
 * Always-ink bar pinning the phone numbers to the bottom of the viewport on
 * mobile — a tap-to-call affordance, independent of page theme.
 */
export interface CallBarProps {
  /** @default 'Contact Us' */
  label?: string;
  /** @default Durham + Peterborough */
  numbers?: CallBarNumber[];
}
