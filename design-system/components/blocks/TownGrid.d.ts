import * as React from 'react';

export interface Town {
  name: string;
  /** Towns with their own page link; the rest render as plain service-area entries. */
  href?: string;
}

export interface TownRegion {
  name: string;
  /** Link to the regional hub page, e.g. "/durham/". */
  href?: string;
  /** Small right-aligned note, e.g. "Same-week booking". */
  note?: string;
  towns: (string | Town)[];
}

/**
 * Service-area coverage: one ruled cell per town under each regional heading.
 * Towns with a page become links; the rest are plain cells, so the grid can
 * list full coverage without faking pages that don't exist.
 */
export interface TownGridProps {
  regions?: TownRegion[];
}

export declare function TownGrid(props: TownGridProps): React.JSX.Element;
