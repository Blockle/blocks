import { type Atoms, classnames } from '@blockle/blocks-core';

import { Box } from '../../layout/Box/Box.js';
import * as styles from './Skeleton.css.js';

export type SkeletonProps = {
  height?: string | number;
  circle?: boolean;
  className?: string;
  borderRadius?: Atoms['borderRadius'];
  backgroundColor?: Atoms['backgroundColor'];
};

export const Skeleton: React.FC<SkeletonProps> = ({
  height,
  circle = false,
  className,
  borderRadius = 1,
  backgroundColor = 'background-300',
}) => {
  return (
    <Box
      className={classnames(styles.skeleton, className)}
      borderRadius={circle ? 'full' : borderRadius}
      backgroundColor={backgroundColor}
      style={{ height, aspectRatio: circle ? '1 / 1' : undefined }}
    />
  );
};
