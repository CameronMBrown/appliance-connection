import * as React from 'react';

export interface RadioOption {
  value: string;
  label: string;
}

/**
 * Radio set drawn as ruled cells sharing one ink outline — square markers with
 * a wood centre when selected. Stacks below 560px when `row`.
 */
export interface RadioGroupProps {
  /** Shared input name — required for single-select behaviour. */
  name: string;
  legend?: string;
  options?: (string | RadioOption)[];
  value?: string;
  /** Called with the selected option's value. */
  onChange?: (value: string) => void;
  help?: string;
  /** Lay the options out in one row (2–3 short options). @default false */
  row?: boolean;
}

export declare function RadioGroup(props: RadioGroupProps): React.JSX.Element;
