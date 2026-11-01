import { createVar } from '@vanilla-extract/css';

/**
 * The look of the Tab indicator, set by a `tabs` Component theme on its `list`.
 * Blocks positions and moves the bar; these say how it looks and how it moves.
 * Both the moving Tab indicator and the static fallback bar, drawn where CSS
 * anchor positioning is unsupported, use them.
 */
export const tabIndicatorVars = {
  /** The bar's colour */
  color: createVar('tab-indicator-color'),
  /** The bar's thickness, such as `2px` */
  thickness: createVar('tab-indicator-thickness'),
  /** How long the slide to a newly selected tab takes, such as `200ms` */
  duration: createVar('tab-indicator-duration'),
  /** The easing of that slide, such as `ease-in-out` */
  easing: createVar('tab-indicator-easing'),
};
