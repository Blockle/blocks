import type { MarginAtoms } from '../atoms/atomTypes.js';
import type { DeepExclude } from '../utils/typing/helpers.js';
import type { ColorScheme, Size } from './properties.js';

export type BaseSliderProps = {
  size?: Size;
  colorScheme?: ColorScheme;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
} & MarginAtoms;

export type SliderTheme = {
  root: string;
  track: string;
  filledTrack: string;
  thumb: string;
  variants: DeepExclude<{
    size: BaseSliderProps['size'];
    colorScheme: BaseSliderProps['colorScheme'];
    disabled: BaseSliderProps['disabled'];
    orientation: BaseSliderProps['orientation'];
  }>;
};
