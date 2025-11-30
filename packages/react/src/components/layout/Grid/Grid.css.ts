import { createResponsiveStyles } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const grid = style({
  gridTemplateColumns: 'repeat(12, 1fr)',
});

export const responsiveColSpanStyles = createResponsiveStyles(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  (value) => ({
    gridColumn: `span ${value} / span ${value}`,
  }),
);

export const responsiveRowSpanStyles = createResponsiveStyles(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  (value) => ({
    gridRow: `span ${value} / span ${value}`,
  }),
);
