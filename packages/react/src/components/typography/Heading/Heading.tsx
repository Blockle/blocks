import {
  classnames,
  type HTMLElementProps,
  type MarginAtoms,
  type PaddingAtoms,
  type TextAtoms,
} from '@blockle/blocks-core';

import { Box } from '../../layout/Box/Box.js';
import { type TextColor, useTextColor } from '../useTextColor.js';
import * as styles from './heading.css.js';

export type HeadingProps = {
  className?: string;
  /** A text Color role, which follows the Color mode, or a fixed Palette color. */
  color?: TextColor;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
} & HTMLElementProps<HTMLHeadingElement> &
  Omit<TextAtoms, 'color'> &
  MarginAtoms &
  PaddingAtoms;

export const Heading: React.FC<HeadingProps> = ({
  className,
  color,
  level = 1,
  children,
  ...restProps
}) => {
  const textColor = useTextColor('heading', color);
  const Tag = `h${level}` as const;

  return (
    <Box
      asChild
      className={classnames(styles.heading, textColor.className, className)}
      color={textColor.atomColor}
      {...restProps}
    >
      <Tag>{children}</Tag>
    </Box>
  );
};
