import { Atoms, MarginAndPaddingAtoms } from '../../lib/css/atoms';
import { Box } from '../Box/Box';

export type TextProps = {
  children: React.ReactNode;
  as?: 'span' | 'p' | 'strong' | 'em' | 'small' | 's' | 'del' | 'ins' | 'sub' | 'sup';
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
} & MarginAndPaddingAtoms;
//  &  HTMLProps<HTMLSpanElement>;

export const Text: React.FC<TextProps> = ({
  as = 'span',
  children,
  color,
  fontSize,
  fontWeight,
  fontFamily,
  textAlign,
  ...restProps
}) => {
  return (
    <Box
      as={as}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontFamily={fontFamily}
      textAlign={textAlign}
      padding="none"
      margin="none"
      {...restProps}
    >
      {children}
    </Box>
  );
};
