import { style } from '@vanilla-extract/css';

type GridSizes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

function createGridSize(size: GridSizes) {
  if (size === 0) {
    return style({
      display: 'none',
      flex: `0 0 0%`,
      maxWidth: `0%`,
    });
  }

  return style({
    flex: `0 0 ${(size / 12) * 100}%`,
    maxWidth: `${(size / 12) * 100}%`,
  });
}

export const gridSize = {
  0: createGridSize(0),
  1: createGridSize(1),
  2: createGridSize(2),
  3: createGridSize(3),
  4: createGridSize(4),
  5: createGridSize(5),
  6: createGridSize(6),
  7: createGridSize(7),
  8: createGridSize(8),
  9: createGridSize(9),
  10: createGridSize(10),
  11: createGridSize(11),
  12: createGridSize(12),
} satisfies Record<GridSizes, string>;

// export const gridSize = {
//   0: style({
//     flex: `0 0 0%`,
//     maxWidth: `0%`,
//   }),}
