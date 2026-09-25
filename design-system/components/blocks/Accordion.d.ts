import * as React from 'react';

export interface AccordionItem {
  question: string;
  answer: string;
}

/**
 * FAQ list: full-width ruled rows inside one ink box, with a square +/– tick on
 * the right that fills wood when the row is open. One row open at a time
 * unless `allowMultiple`.
 */
export interface AccordionProps {
  items?: AccordionItem[];
  /** Let several rows stay open at once. @default false */
  allowMultiple?: boolean;
  /** Indexes open on first render. @default [] */
  defaultOpen?: number[];
}

export declare function Accordion(props: AccordionProps): React.JSX.Element;
