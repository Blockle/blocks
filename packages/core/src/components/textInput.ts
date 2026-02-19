import type { Atoms } from '../atoms/atoms.js';
import type { MarginAtoms } from '../atoms/atomTypes.js';
import type { DeepExclude } from '../utils/typing/helpers.js';
import type { Size } from './properties.js';

export type BaseTextareaProps = {
  size?: Size;
  color?: Atoms['color'];
  grow?: boolean;
} & MarginAtoms;

export type TextareaTheme = {
  root: string;
  input: string;
  variants: DeepExclude<{
    size: BaseTextareaProps['size'];
    grow: BaseTextareaProps['grow'];
  }>;
};
