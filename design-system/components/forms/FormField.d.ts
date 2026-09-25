import * as React from 'react';

/**
 * A single labeled text input with help copy or an inline error. The quote
 * form (name/contact/service/region/photo) is built from a stack of these.
 */
export interface FormFieldProps {
  id: string;
  label: string;
  /** @default 'text' */
  type?: string;
  placeholder?: string;
  /** Shown below the input when there's no error. */
  help?: string;
  /** Shown instead of help; also flags aria-invalid + red border. */
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}
