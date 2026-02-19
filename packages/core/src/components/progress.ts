import type { MarginAtoms } from '../atoms/atomTypes.js';
import type { DeepExclude } from '../utils/typing/helpers.js';

export type BaseProgressProps = {
  indeterminate: boolean;
} & MarginAtoms;

export type ProgressTheme = {
  root: string;
  bar: string;
  variants: DeepExclude<{
    indeterminate: BaseProgressProps['indeterminate'];
  }>;
};
