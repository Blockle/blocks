export type GridItemProps = {
  children?: React.ReactNode;
  size: number; // TODO Should be response array too
};

export const GridItem: React.FC<GridItemProps> = ({ children, size }) => {
  return <div style={{ width: `${(size / 12) * 100}%` }}>{children}</div>;
};
