import type { DeepExclude } from '../utils/typing/helpers.js';
import type { Size } from './properties.js';

export type BaseDialogProps = {
  size: Size;
  children?: React.ReactNode;
};

export type DialogTheme = {
  dialog: string;
  variants: DeepExclude<{
    size: BaseDialogProps['size'];
  }>;
};
