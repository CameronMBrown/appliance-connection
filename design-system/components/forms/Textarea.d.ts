import * as React from 'react';

/** Multi-line text input — same label/help/error anatomy as FormField. */
export interface TextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  /** Hint under the field; replaced by `error` when invalid. */
  help?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  /** @default 5 */
  rows?: number;
}

export declare function Textarea(props: TextareaProps): React.JSX.Element;
