import * as styles from './Grid.css.js';

type GridSizes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type GridItemProps = {
  children?: React.ReactNode;
  size: GridSizes; // TODO Should be response array too?
};

export const GridItem: React.FC<GridItemProps> = ({ children, size }) => {
  return <div className={styles.gridSize[size]}>{children}</div>;
};
