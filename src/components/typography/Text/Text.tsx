import React from 'react';
import { MarginAtoms, PaddingAtoms, TextAtoms } from '../../../lib/css/atoms';
import { classnames } from '../../../lib/utils/classnames';
import { HTMLElementProps } from '../../../lib/utils/utils';
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Component ref={ref as React.RefObject<any>}>{children}</Component>
      )}
    </Box>
  );
};
