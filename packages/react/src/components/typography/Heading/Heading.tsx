import {
  type ComponentThemes,
  classnames,
  type HTMLElementProps,
  type MarginAtoms,
  type PaddingAtoms,
  type TextAtoms,
} from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Box } from '../../layout/Box/Box.js';
import * as styles from './heading.css.js';

type HeadingTheme = ComponentThemes['heading'];

export type HeadingProps = {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: HeadingTheme['variants']['variant'];
} & TextAtoms &
  MarginAtoms &
  PaddingAtoms &
  HTMLElementProps<HTMLHeadingElement>;

export const Heading: React.FC<HeadingProps> = ({
  className,
  level = 1,
  variant,
  children,
  ...restProps
}) => {
  const Tag = `h${level}` as const;
  const headingClassName = useComponentStyles('heading', {
    variants: {
      variant,
    },
  });

  return (
    <Box
      asChild
      className={classnames(styles.heading, headingClassName, className)}
      {...restProps}
    >
      <Tag>{children}</Tag>
    </Box>
  );
};
