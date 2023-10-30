import { Atoms, MarginAndPaddingAtoms } from '../../lib/css/atoms';
import { classnames } from '../../lib/utils/classnames';
import { HTMLElementProps } from '../../lib/utils/utils';
import { Box } from '../Box';
import * as styles from './heading.css';

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
  const Tag = `h${level}` as const;

  return (
    <Box
      asChild
      className={classnames(styles.heading, className)}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      fontSize={fontSize}
      textAlign={align}
      {...restProps}
    >
      <Tag>{children}</Tag>
    </Box>
  );
};
