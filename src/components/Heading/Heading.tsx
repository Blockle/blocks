import { Atoms, MarginAtoms, PaddingAtoms, TextAtoms } from '../../lib/css/atoms';
import { classnames } from '../../lib/utils/classnames';
import { HTMLElementProps } from '../../lib/utils/utils';
import { Box } from '../Box';
import * as styles from './heading.css';

export type HeadingProps = {
  align?: Atoms['textAlign'];
  children: React.ReactNode;
  className?: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
} & TextAtoms &
  MarginAtoms &
  PaddingAtoms &
  HTMLElementProps<HTMLHeadingElement>;

export const Heading: React.FC<HeadingProps> = ({
  className,
  level = 1,
  children,
  ...restProps
}) => {
  const Tag = `h${level}` as const;

  return (
    <Box asChild className={classnames(styles.heading, className)} {...restProps}>
      <Tag>{children}</Tag>
    </Box>
  );
};
