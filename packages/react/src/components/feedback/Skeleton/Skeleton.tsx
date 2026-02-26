import {
  type Atoms,
  classnames,
  type HTMLElementProps,
} from '@blockle/blocks-core';

import { Box } from '../../layout/Box/Box.js';
import * as styles from './Skeleton.css.js';

export type SkeletonProps = {
  height?: string | number;
  circle?: boolean;
  borderRadius?: Atoms['borderRadius'];
  backgroundColor?: Atoms['backgroundColor'];
} & HTMLElementProps<HTMLDivElement>;

export const Skeleton: React.FC<SkeletonProps> = ({
  height,
  circle = false,
  className,
  borderRadius = 1,
  backgroundColor = 'background-300',
  style,
  ...restProps
}) => {
  return (
    <Box
      className={classnames(styles.skeleton, className)}
      borderRadius={circle ? 'full' : borderRadius}
      backgroundColor={backgroundColor}
      style={{
        ...style,
        height,
        aspectRatio: circle ? '1 / 1' : undefined,
      }}
      {...restProps}
    />
  );
};
