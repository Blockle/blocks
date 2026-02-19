import type { Atoms } from '../atoms/atoms.js';
import type { MarginAtoms } from '../atoms/atomTypes.js';
import type { DeepExclude } from '../utils/typing/helpers.js';
import type { IconSize } from './properties.js';

export type BaseIconProps = {
  size?: IconSize;
  color?: Atoms['color'];
  display?: Atoms['display'];
} & MarginAtoms;

export type IconTheme = {
  root: string;
  variants: DeepExclude<{
    size: BaseIconProps['size'];
  }>;
};
