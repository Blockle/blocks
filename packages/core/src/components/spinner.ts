import type { Atoms } from '../atoms/atoms.js';
import type { MarginAtoms } from '../atoms/atomTypes.js';
import type { DeepExclude } from '../utils/typing/helpers.js';
import type { Size } from './properties.js';

export type BaseSpinnerProps = {
  size?: Size;
  color?: Atoms['color'];
} & MarginAtoms;

export type SpinnerTheme = {
  root: string;
  variants: DeepExclude<{
    size: BaseSpinnerProps['size'];
  }>;
};
