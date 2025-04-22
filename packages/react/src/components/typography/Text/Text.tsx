import {
  type HTMLElementProps,
  type MarginAtoms,
  type PaddingAtoms,
  type TextAtoms,
  classnames,
} from '@blockle/blocks-core';
import type React from 'react';
import { Box } from '../../layout/Box';
import * as styles from './text.css';

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
} & TextAtoms &
  MarginAtoms &
  PaddingAtoms &
  HTMLElementProps<HTMLSpanElement>;

export const Text = <T extends Tags = 'span'>({
  asChild,
  children,
  className,
  ref,
  tag,
  ...restProps
}: TextProps<T>) => {
  const Component = (tag ?? 'span') as Tags;

  return (
    <Box asChild className={classnames(styles.text, className)} {...restProps}>
      {asChild ? (
        children
      ) : (
        // biome-ignore lint/suspicious/noExplicitAny: Safe to assert ref as React.RefObject<any>
        <Component ref={ref as React.RefObject<any>}>{children}</Component>
      )}
    </Box>
  );
};
