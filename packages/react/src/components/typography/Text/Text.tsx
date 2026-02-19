import {
  type ComponentThemes,
  classnames,
  type HTMLElementProps,
  type MarginAtoms,
  type PaddingAtoms,
  type TextAtoms,
} from '@blockle/blocks-core';
import type React from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Box } from '../../layout/Box/Box.js';
import * as styles from './text.css.js';

type TextTheme = ComponentThemes['text'];

type Tags =
  | 'del'
  | 'em'
  | 'ins'
  | 'label'
  | 'p'
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
  variant?: TextTheme['variants']['variant'];
} & TextAtoms &
  MarginAtoms &
  PaddingAtoms &
  Omit<HTMLElementProps<HTMLSpanElement>, 'children' | 'ref'>;

export const Text = <T extends Tags = 'span'>({
  asChild,
  children,
  className,
  ref,
  tag,
  variant,
  ...restProps
}: TextProps<T>) => {
  const Component = (tag ?? 'span') as Tags;
  const textClassName = useComponentStyles('text', {
    variants: {
      variant,
    },
  });

  return (
    <Box
      asChild
      className={classnames(styles.text, textClassName, className)}
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
