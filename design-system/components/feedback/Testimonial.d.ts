import * as React from 'react';

/**
 * A homeowner testimonial — display-serif quote with a warm brass left rule.
 * The only place a rule/border-accent pattern appears in this brand.
 */
export interface TestimonialProps {
  quote: string;
  /** Attribution line, e.g. "Homeowner, Whitby". */
  cite: string;
}
