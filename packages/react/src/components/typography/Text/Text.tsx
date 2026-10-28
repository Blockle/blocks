import {
  type Atoms,
  classnames,
  type HTMLElementProps,
  type MarginAtoms,
  type PaddingAtoms,
  type TextAtoms,
} from '@blockle/blocks-core';
import type React from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Box } from '../../layout/Box/Box.js';
import type { TextColor, TextColorRole } from '../textColor.js';
import * as styles from './text.css.js';

type Tags =
  | 'cite'
  | 'code'
  | 'del'
  | 'em'
  | 'ins'
  | 'kbd'
  | 'label'
  | 'mark'
  | 'p'
  | 'q'
  | 's'
  | 'small'
  | 'span'
  | 'strong'
  | 'sub'
  | 'sup';

export type TextProps<Tag extends Tags = 'span'> = {
  asChild?: boolean;
  children: React.ReactNode;
  ref?: React.Ref<HTMLElementTagNameMap[Tag]>;
  tag?: Tag;
  /** A text Color role, which follows the Color mode, or a fixed Palette color. */
  color?: TextColor;
} & Omit<HTMLElementProps<HTMLSpanElement>, 'children' | 'ref'> &
  Omit<TextAtoms, 'color'> &
  MarginAtoms &
  PaddingAtoms;

export const Text = <T extends Tags = 'span'>({
  asChild,
  children,
  className,
  color,
  ref,
  tag,
  ...restProps
}: TextProps<T>) => {
  const Component = (tag ?? 'span') as Tags;
  const themeClassName = useComponentStyles('text', {
    root: true,
    variants: { color: color as TextColorRole },
  });

  return (
    <Box
      asChild
      className={classnames(styles.text, themeClassName, className)}
      color={color as Atoms['color']}
      {...restProps}
    >
      {asChild ? (
        children
      ) : (
        // biome-ignore lint/suspicious/noExplicitAny: Safe to assert ref as React.RefObject<any>
        <Component ref={ref as React.RefObject<any>}>{children}</Component>
      )}
    </Box>
  );
};
