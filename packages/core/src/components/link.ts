import type { MarginAtoms } from '../atoms/atomTypes.js';
import type { DeepExclude } from '../utils/typing/helpers.js';
import type { LinkVariant } from './properties.js';

export type BaseLinkProps = {
  variant: LinkVariant;
  underline: boolean;
} & MarginAtoms;

export type LinkTheme = {
  root: string;
  variants: DeepExclude<{
    variant: BaseLinkProps['variant'];
  }>;
};
