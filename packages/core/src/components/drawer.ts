import type { DeepExclude } from '../utils/typing/helpers.js';

export type BaseDrawerProps = {
  children?: React.ReactNode;
  placement: 'left' | 'right' | 'top' | 'bottom';
};

export type DrawerTheme = {
  root?: string;
  variants: DeepExclude<{
    placement: BaseDrawerProps['placement'];
  }>;
};
