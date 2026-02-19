import type { MarginAtoms } from '../atoms/atomTypes.js';

export type BasePopoverProps = {
  underline: boolean;
  position: 'top' | 'right' | 'bottom' | 'left';
  sticky: boolean;
} & MarginAtoms;

export type PopoverTheme = {
  root: string;
};
