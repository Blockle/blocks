import { forwardRef } from 'react';
import { MarginAtoms, PaddingAtoms, TextAtoms } from '../../../lib/css/atoms';
import { classnames } from '../../../lib/utils/classnames';
import { HTMLElementProps } from '../../../lib/utils/utils';
import { Box } from '../../layout/Box';
import * as styles from './text.css';

export type TextProps = {
  children: React.ReactNode;
  tag?: 'span' | 'p' | 'strong' | 'em' | 'small' | 's' | 'del' | 'ins' | 'sub' | 'sup' | 'label';
  asChild?: boolean;
} & TextAtoms &
  MarginAtoms &
  PaddingAtoms &
  HTMLElementProps<HTMLSpanElement>;

export const Text: React.FC<TextProps> = forwardRef<HTMLSpanElement, TextProps>(function Text(
  { tag: Tag = 'span', asChild, children, className, ...restProps },
  ref,
) {
  return (
    <Box ref={ref} asChild className={classnames(styles.text, className)} {...restProps}>
      {asChild ? children : <Tag>{children}</Tag>}
    </Box>
  );
});
