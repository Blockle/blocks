import type { Atoms, HTMLElementProps } from '@blockle/blocks-core';

import { Box } from '../Box/Box.js';
import * as styles from './Grid.css.js';

export type GridProps = {
  children?: React.ReactNode;
  columnGap?: Atoms['columnGap'];
  gap?: Atoms['gap'];
  ref?: React.Ref<HTMLDivElement>;
  rowGap?: Atoms['rowGap'];
} & HTMLElementProps<HTMLDivElement>;

export const Grid: React.FC<GridProps> = ({
  children,
  columnGap,
  gap,
  rowGap,
  ...restProps
}) => {
  return (
    <Box
      display="grid"
      className={styles.grid}
      gap={gap}
      rowGap={rowGap}
      columnGap={columnGap}
      {...restProps}
    >
      {children}
    </Box>
  );
};
