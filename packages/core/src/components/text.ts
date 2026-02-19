import type { DeepExclude } from '../utils/typing/helpers.js';

export type BaseTextProps = {
  variant?: 'body' | 'body2' | 'caption' | 'label' | 'code';
};

export type TextTheme = {
  root?: string;
  variants: DeepExclude<{
    variant: BaseTextProps['variant'];
  }>;
};
