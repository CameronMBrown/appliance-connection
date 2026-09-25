import * as React from 'react';

/**
 * A row of real-credential badges (years in business, licenses, warranty).
 * Data-driven — only render a badge when there's a genuine credential behind
 * it; never used to fake trust.
 */
export interface TrustBarProps {
  /** @default ['30+ years','Licensed & insured','Certified plumber','Every job warrantied'] */
  items?: string[];
}
