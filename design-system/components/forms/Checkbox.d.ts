import * as React from 'react';

/**
 * Square checkbox — ink outline, wood fill with an ink ✓ when checked. The
 * whole row is the label, with a 44px minimum target.
 */
export interface CheckboxProps {
  id: string;
  label?: string;
  /** Second line under the label. */
  help?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
}

export declare function Checkbox(props: CheckboxProps): React.JSX.Element;
