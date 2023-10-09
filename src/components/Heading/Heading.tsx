import { Atoms, MarginAndPaddingAtoms } from '../../lib/css/atoms';
import { HTMLElementProps } from '../../lib/utils/utils';
import { Box } from '../Box';

export type HeadingProps = {
  align?: Atoms['textAlign'];
  children: React.ReactNode;
  className?: string;
  fontFamily?: Atoms['fontFamily'];
  fontSize?: Atoms['fontSize'];
  fontWeight?: Atoms['fontWeight'];
  level: 1 | 2 | 3 | 4 | 5 | 6;
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
