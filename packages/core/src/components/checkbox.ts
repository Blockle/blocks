import type { DeepExclude } from '../utils/typing/helpers.js';

export type BaseCheckboxProps = {
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
};

export type CheckboxTheme = {
  root: string;
  icon: string;
  label: string;
  variants: DeepExclude<{
    required: BaseCheckboxProps['required'];
    disabled: BaseCheckboxProps['disabled'];
    error: BaseCheckboxProps['error'];
  }>;
};
