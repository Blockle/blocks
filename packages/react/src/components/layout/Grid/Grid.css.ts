import { createResponsiveStyles, layers, vars } from '@blockle/blocks-core';
import { style, styleVariants } from '@vanilla-extract/css';

export const grid = style({
  gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
});

// Unlayered like `grid`: apply one or the other, never both, so the template
// keeps the same precedence for existing users.
export const minColumnWidth = styleVariants(
  {
    1: vars.space[1],
    2: vars.space[2],
    3: vars.space[3],
    4: vars.space[4],
    5: vars.space[5],
    6: vars.space[6],
    7: vars.space[7],
    8: vars.space[8],
  },
  (width) => ({
    gridTemplateColumns: `repeat(auto-fill, minmax(${width}, 1fr))`,
  }),
);

export const responsiveColSpanStyles = createResponsiveStyles(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  (value) => ({
    gridColumn: `span ${value} / span ${value}`,
  }),
  layers.molecule,
);

export const responsiveRowSpanStyles = createResponsiveStyles(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  (value) => ({
    gridRow: `span ${value} / span ${value}`,
  }),
  layers.molecule,
);
