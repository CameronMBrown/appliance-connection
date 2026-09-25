import * as React from 'react';

export interface Stat {
  /** The big Benguiat line — "30+", "Licensed". */
  value: string;
  label: string;
  /** Prefix a wood ✓ cell — for credentials rather than counts. */
  mark?: boolean;
}

/**
 * Credential row: ruled cells sharing one ink outline, each a display-size
 * value over a line of plain copy.
 */
export interface StatBlockProps {
  /** @default 30+ years / Licensed / Warrantied / 1000s of installs */
  stats?: Stat[];
}

export declare function StatBlock(props: StatBlockProps): React.JSX.Element;
