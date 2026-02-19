import type { DeepExclude } from '../utils/typing/helpers.js';
import type { Intent } from './properties.js';

export type BaseAlertProps = {
  children?: React.ReactNode;
  intent?: Intent;
};

export type AlertTheme = {
  root: string;
  variants: DeepExclude<{
    intent: BaseAlertProps['intent'];
  }>;
};
