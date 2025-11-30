import type { Atoms } from '@blockle/blocks-core';

import { Box } from '../Box/Box.js';
import * as styles from './Grid.css.js';

export type GridProps = {
  gap?: Atoms['gap'];
  rowGap?: Atoms['rowGap'];
  columnGap?: Atoms['columnGap'];
  children?: React.ReactNode;
};

export const Grid: React.FC<GridProps> = ({
  gap,
  rowGap,
  columnGap,
  children,
}) => {
  return (
    <Box
      display="grid"
      className={styles.grid}
      gap={gap}
      rowGap={rowGap}
      columnGap={columnGap}
    >
      {children}
    </Box>
  );
};
