import type { MarginAtoms } from '../atoms/atomTypes.js';
import type { DeepExclude } from '../utils/typing/helpers.js';
import type { BaseAlertProps } from './alert.js';

export type BaseToastProps = {
  intent?: BaseAlertProps['intent'];
} & MarginAtoms;

export type ToastTheme = {
  root: string;
  variants: DeepExclude<{
    intent: BaseToastProps['intent'];
  }>;
};
