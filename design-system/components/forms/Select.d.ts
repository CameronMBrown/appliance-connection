import * as React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Native select with the system's square caret cell on the right edge — the
 * arrow is a CSS-drawn chevron, not an icon font.
 */
export interface SelectProps {
  id: string;
  label?: string;
  /** Strings or {value,label} pairs. */
  options?: (string | SelectOption)[];
  /** Empty-value first option, e.g. "Choose a service". */
  placeholder?: string;
  help?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

export declare function Select(props: SelectProps): React.JSX.Element;
