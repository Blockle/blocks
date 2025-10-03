import {
  type HTMLElementProps,
  type MarginAtoms,
  type PaddingAtoms,
  type TextAtoms,
  classnames,
} from '@blockle/blocks-core';
import { Box } from '../../layout/Box/Box.js';
import * as styles from './heading.css.js';

export type HeadingProps = {
  children: React.ReactNode;
  className?: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
} & TextAtoms &
  MarginAtoms &
  PaddingAtoms &
  HTMLElementProps<HTMLHeadingElement>;

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
