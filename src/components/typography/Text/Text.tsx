import React from 'react';
import { MarginAtoms, PaddingAtoms, TextAtoms } from '../../../lib/css/atoms';
import { classnames } from '../../../lib/utils/classnames';
import { HTMLElementProps } from '../../../lib/utils/utils';
import { Box } from '../../layout/Box';
import * as styles from './text.css';

type Tags =
  | 'span'
  | 'p'
  | 'strong'
  | 'em'
  | 'small'
  | 's'
  | 'del'
  | 'ins'
  | 'sub'
  | 'sup'
  | 'label';

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
  const Component = tag ?? 'span';

  return (
    <Box
      ref={asChild ? undefined : (ref as unknown as React.RefObject<HTMLDivElement>)}
      asChild
      className={classnames(styles.text, className)}
      {...restProps}
    >
      {asChild ? children : <Component ref={ref}>{children}</Component>}
    </Box>
  );
};
