import { createVar } from '@vanilla-extract/css';

/**
 * Set on each `Choice` item by the component from its `color` prop. A
 * `choiceGroup` theme paints the swatch with it.
 */
export const choiceGroupVars = {
  /** Any CSS colour, as passed to the `Choice` */
  color: createVar('choice-color'),
};
