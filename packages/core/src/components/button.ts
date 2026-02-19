import type { MarginAtoms } from '../atoms/atomTypes.js';
import type { Atoms } from '../index.js';
import type { DeepExclude } from '../utils/typing/helpers.js';
import type { ButtonVariant, Intent, Size } from './properties.js';

export type BaseButtonProps = {
  alignSelf?: Atoms['alignSelf'];
  children?: React.ReactNode;
  disabled?: boolean;
  endSlot?: React.ReactNode;
  inlineSize?: Atoms['inlineSize'];
  intent?: Intent;
  loading?: boolean;
  popovertarget?: string;
  size?: Size;
  startSlot?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
} & MarginAtoms;

export type ButtonTheme = {
  root: string;
  variants: DeepExclude<{
    variant: BaseButtonProps['variant'];
    intent: BaseButtonProps['intent'];
    size: BaseButtonProps['size'];
    loading: BaseButtonProps['loading'];
    disabled: BaseButtonProps['disabled'];
  }>;
};
