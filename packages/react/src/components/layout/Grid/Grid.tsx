import {
  type Atoms,
  classnames,
  type HTMLElementProps,
} from '@blockle/blocks-core';

import { Box } from '../Box/Box.js';
import * as styles from './Grid.css.js';

export type GridProps = {
  children?: React.ReactNode;
  /**
   * Lay out as many columns as fit, each at least this `space` step wide.
   * Replaces the default 12-column template; `GridItem` `colSpan` spans
   * auto-fill tracks.
   */
  minColumnWidth?: keyof typeof styles.minColumnWidth;
} & Omit<Atoms, 'flexDirection'> &
  Omit<HTMLElementProps<HTMLDivElement>, keyof Atoms>;

export const Grid: React.FC<GridProps> = ({
  children,
  display = 'grid',
  className,
  minColumnWidth,
  ...restProps
}) => {
  return (
    <Box
      display={display}
      className={classnames(
        minColumnWidth ? styles.minColumnWidth[minColumnWidth] : styles.grid,
        className,
      )}
      {...restProps}
    >
      {children}
    </Box>
  );
};
