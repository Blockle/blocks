import type { MarginAtoms } from '../atoms/atomTypes.js';
import type { DeepExclude } from '../utils/typing/helpers.js';
import type { InputVariant } from './properties.js';

export type BaseSelectProps = {
  variant: InputVariant;
  required?: boolean;
  disabled?: boolean;
} & MarginAtoms;

export type SelectTheme = {
  root?: string;
  select: string;
  icon: string;
  variants: DeepExclude<{
    variant: BaseSelectProps['variant'];
    required: BaseSelectProps['required'];
    disabled: BaseSelectProps['disabled'];
  }>;
};
