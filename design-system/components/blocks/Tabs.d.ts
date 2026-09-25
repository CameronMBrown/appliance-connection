import * as React from 'react';

export interface TabItem {
  label: string;
  /** Panel body. Omit to supply panels as children instead, in tab order. */
  content?: React.ReactNode;
}

/**
 * Ruled tab strip over one boxed panel — the active tab reads as the panel's
 * surface with a wood cap. Arrow keys move between tabs; stacks below 600px.
 */
export interface TabsProps {
  tabs?: (string | TabItem)[];
  /** @default 0 */
  defaultIndex?: number;
  /** Accessible name for the tablist. @default "Section" */
  label?: string;
  onChange?: (index: number) => void;
  /** Panels in tab order, when `tabs` carries labels only. */
  children?: React.ReactNode;
}

export declare function Tabs(props: TabsProps): React.JSX.Element;
