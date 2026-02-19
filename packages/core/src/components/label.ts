import type { MarginAtoms } from '../atoms/atomTypes.js';
import type { DeepExclude } from '../utils/typing/helpers.js';
import type { Size } from './properties.js';

export type BaseLabelProps = {
  size?: Size;
  required?: boolean;
  children?: React.ReactNode;
  asSpan?: boolean;
} & MarginAtoms;

export type LabelTheme = {
  root: string;
  variants: DeepExclude<{
    size: BaseLabelProps['size'];
    required: BaseLabelProps['required'];
  }>;
};
