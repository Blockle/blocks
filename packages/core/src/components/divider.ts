import type { Atoms } from '../atoms/atoms.js';
import type { DeepExclude } from '../utils/typing/helpers.js';
import type { Size } from './properties.js';

export type BaseDividerProps = {
  size: Size;
  children?: React.ReactNode;
  alignment?: 'start' | 'center' | 'end';
  color?: Atoms['color'];
  columnGap?: Atoms['columnGap'];
};

export type DividerTheme = {
  root: string;
  variants: DeepExclude<{
    size: BaseDividerProps['size'];
    alignment: BaseDividerProps['alignment'];
  }>;
};
