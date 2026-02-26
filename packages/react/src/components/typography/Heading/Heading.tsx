import {
  classnames,
  type HTMLElementProps,
  type MarginAtoms,
  type PaddingAtoms,
  type TextAtoms,
} from '@blockle/blocks-core';

import { Box } from '../../layout/Box/Box.js';
import * as styles from './heading.css.js';

export type HeadingProps = {
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
} & HTMLElementProps<HTMLHeadingElement> &
  TextAtoms &
  MarginAtoms &
  PaddingAtoms;

export const Heading: React.FC<HeadingProps> = ({
  className,
  level = 1,
  children,
  ...restProps
}) => {
  const Tag = `h${level}` as const;

  return (
    <Box
      asChild
      className={classnames(styles.heading, className)}
      {...restProps}
    >
      <Tag>{children}</Tag>
    </Box>
  );
};
