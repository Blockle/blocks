import {
  type Atoms,
  classnames,
  type HTMLElementProps,
} from '@blockle/blocks-core';

import { Box } from '../Box/Box.js';
import * as styles from './Grid.css.js';

export type GridProps = {
  children?: React.ReactNode;
} & Omit<Atoms, 'flexDirection'> &
  Omit<HTMLElementProps<HTMLDivElement>, keyof Atoms>;

export const Grid: React.FC<GridProps> = ({
  children,
  display = 'grid',
  className,
  ...restProps
}) => {
  return (
    <Box
      display={display}
      className={classnames(styles.grid, className)}
      {...restProps}
    >
      {children}
    </Box>
  );
};
