import type { MarginAtoms } from '../atoms/atomTypes.js';
import type { DeepExclude, OptionalLiteral } from '../utils/typing/helpers.js';
import type { InputVariant } from './properties.js';

export type BaseTextInputProps = {
  variant: InputVariant;
  startSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
  type?: OptionalLiteral<
    'email' | 'number' | 'password' | 'tel' | 'text' | 'url'
  >;
} & MarginAtoms;

export type TextInputTheme = {
  root: string;
  input: string;
  variants: DeepExclude<{
    variant: BaseTextInputProps['variant'];
  }>;
};
