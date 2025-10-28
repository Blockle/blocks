import type { Atoms } from '@blockle/blocks-core';

import { Box } from '../Box/Box.js';

export type GridProps = {
  gap?: Atoms['gap'];
  rowGap?: Atoms['rowGap'];
  columnGap?: Atoms['columnGap'];
  children?: React.ReactNode;
};

export const Grid: React.FC<GridProps> = ({
  gap = 0,
  rowGap = 0,
  columnGap = 0,
  children,
}) => {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={gap}
      rowGap={rowGap}
      columnGap={columnGap}
    >
      {children}
    </Box>
  );
};
