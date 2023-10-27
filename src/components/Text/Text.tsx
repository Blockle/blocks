import { forwardRef } from 'react';
import { Atoms, MarginAndPaddingAtoms } from '../../lib/css/atoms';
import { classnames } from '../../lib/utils/classnames';
import { HTMLElementProps } from '../../lib/utils/utils';
import { Box } from '../Box/Box';
import * as styles from './text.css';

export type TextProps = {
  children: React.ReactNode;
  as?: 'span' | 'p' | 'strong' | 'em' | 'small' | 's' | 'del' | 'ins' | 'sub' | 'sup';
  asChild?: boolean;
  color?: Atoms['color'];
  fontSize?: Atoms['fontSize'];
  fontWeight?: Atoms['fontWeight'];
  fontFamily?: Atoms['fontFamily'];
  textAlign?: Atoms['textAlign'];
  fontStyle?: Atoms['fontStyle'];
  textDecoration?: Atoms['textDecoration'];
  lineHeight?: Atoms['lineHeight'];
  whiteSpace?: Atoms['whiteSpace'];
  wordWrap?: Atoms['wordWrap'];
  wordBreak?: Atoms['wordBreak'];
} & MarginAndPaddingAtoms &
  HTMLElementProps<HTMLSpanElement>;

export const Text: React.FC<TextProps> = forwardRef<HTMLSpanElement, TextProps>(function Text(
  {
    as = 'span',
    asChild,
    children,
    color,
    fontSize,
    fontWeight,
    fontFamily,
    textAlign,
    className,
    ...restProps
  },
  ref,
) {
  const Tag = as;

  return (
    <Box
      ref={ref}
      asChild
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontFamily={fontFamily}
      textAlign={textAlign}
      className={classnames(styles.text, className)}
      {...restProps}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Box>
  );
});
