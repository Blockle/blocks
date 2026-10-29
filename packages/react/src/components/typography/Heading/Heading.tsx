'use client';

import {
  type Atoms,
  classnames,
  type HTMLElementProps,
  type MarginAtoms,
  type PaddingAtoms,
  type TextAtoms,
} from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Box } from '../../layout/Box/Box.js';
import type { TextColor, TextColorRole } from '../textColor.js';
import {
  type TextOverflowProps,
  textOverflowClassName,
} from '../textOverflow.js';
import * as styles from './heading.css.js';

export type HeadingProps = {
  className?: string;
  /** A text Color role, which follows the Color mode, or a fixed Palette color. */
  color?: TextColor;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
} & TextOverflowProps &
  HTMLElementProps<HTMLHeadingElement> &
  Omit<TextAtoms, 'color'> &
  MarginAtoms &
  PaddingAtoms;

export const Heading: React.FC<HeadingProps> = ({
  className,
  color,
  level = 1,
  lineClamp,
  truncate,
  children,
  ...restProps
}) => {
  const themeClassName = useComponentStyles('heading', {
    root: true,
    variants: { color: color as TextColorRole },
  });
  const Tag = `h${level}` as const;

  return (
    <Box
      asChild
      className={classnames(
        styles.heading,
        themeClassName,
        textOverflowClassName('Heading', { lineClamp, truncate }),
        className,
      )}
      color={color as Atoms['color']}
      {...restProps}
    >
      <Tag>{children}</Tag>
    </Box>
  );
};
