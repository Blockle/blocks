import { Atoms, MarginAndPaddingAtoms } from '../../lib/css/atoms';
import { HTMLElementProps } from '../../lib/utils/utils';
import { Box } from '../Box';

export type HeadingProps = {
  className?: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  align?: Atoms['textAlign'];
  fontSize?: Atoms['fontSize'];
  fontWeight?: Atoms['fontWeight'];
  fontFamily?: Atoms['fontFamily'];
} & MarginAndPaddingAtoms &
  HTMLElementProps<HTMLHeadingElement>;

export const Heading: React.FC<HeadingProps> = ({
  className,
  level = 1,
  children,
  align,
  fontSize,
  fontWeight = 'strong',
  fontFamily,
  ...restProps
}) => {
  const as = `h${level}` as const;

  return (
    <Box
      as={as}
      className={className}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      fontSize={fontSize}
      textAlign={align}
      padding="none"
      margin="none"
      {...restProps}
    >
      {children}
    </Box>
  );
};
