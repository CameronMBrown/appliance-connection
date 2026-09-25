import * as React from 'react';

/**
 * The standard section opener: eyebrow, heading, optional sub-line, and an
 * optional right-aligned link, all sitting on one ink rule.
 */
export interface SectionHeaderProps {
  eyebrow?: string;
  heading?: string;
  /** One line of sub-copy under the heading. */
  text?: string;
  linkLabel?: string;
  linkHref?: string;
  /** Heading level for document outline. @default 2 */
  level?: 1 | 2 | 3 | 4;
}

export declare function SectionHeader(props: SectionHeaderProps): React.JSX.Element;
