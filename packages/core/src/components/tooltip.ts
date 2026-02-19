import type { DeepExclude } from '../utils/typing/helpers.js';
import type { BasePopoverProps } from './popover.js';
import type { ColorScheme } from './properties.js';

export type BaseTooltipProps = {
  colorScheme?: ColorScheme;
  position?: BasePopoverProps['position'];
};

export type TooltipTheme = {
  root: string;
  variants: DeepExclude<{
    colorScheme: BaseTooltipProps['colorScheme'];
  }>;
};
