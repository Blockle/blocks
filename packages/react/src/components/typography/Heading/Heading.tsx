import {
  type HTMLElementProps,
  type MarginSprinkles,
  type PaddingSprinkles,
  type TextSprinkles,
  classnames,
} from '@blockle/blocks-core';
import { Box } from '../../layout/Box';
import * as styles from './heading.css';

export type HeadingProps = {
  children: React.ReactNode;
  className?: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
} & TextSprinkles &
  MarginSprinkles &
  PaddingSprinkles &
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
