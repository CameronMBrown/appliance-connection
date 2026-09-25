import * as React from 'react';

/**
 * Section wrapper for a set of ServiceCard tiles — optional heading, then an
 * auto-fit responsive grid (min 16rem per tile).
 */
export interface ServiceGridProps {
  heading?: string;
  /** One or more <ServiceCard> elements. */
  children?: React.ReactNode;
}
