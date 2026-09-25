import * as React from 'react';

/**
 * One cell inside a ServiceGrid — square, thin-ink-outlined, text-first: an
 * optional index tag, title, one-line description, "Learn more" link. Inside a
 * ServiceGrid the cell drops its own outline and shares the grid's ruling.
 */
export interface ServiceCardProps {
  title?: string;
  description?: string;
  url?: string;
  /** Micro-label tag, e.g. "01" or "GAS" — sits above the title. */
  index?: string;
}

export declare function ServiceCard(props: ServiceCardProps): React.JSX.Element;
