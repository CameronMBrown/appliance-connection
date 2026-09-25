import * as React from 'react';

export interface QuoteFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/**
 * The contact-page quote request: name, email, phone, message. Validates on
 * blur and on submit (email format, 10-digit phone when given), then swaps the
 * whole panel for a success state with a "send another" reset.
 */
export interface QuoteFormProps {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  submitLabel?: string;
  successHeading?: string;
  successText?: string;
  /** Called with the values once validation passes; the success state shows either way. */
  onSubmit?: (values: QuoteFormValues) => void;
}

export declare function QuoteForm(props: QuoteFormProps): React.JSX.Element;
