import { FC } from 'react';
import { MarginAtoms } from '../../lib/css/atoms';
import { useComponentStyles } from '../../hooks/useComponentStyles';
import { Box } from '../Box';
import { classnames } from '../../lib/utils/classnames';
import { SpinnerTheme } from '../../lib/theme/themeComponents';

export type SpinnerProps = {
  className?: string;
  color?: SpinnerTheme['variants']['color'];
  size?: SpinnerTheme['variants']['size'];
  style?: React.CSSProperties;
} & MarginAtoms;

export const Spinner: FC<SpinnerProps> = ({ className, size, color, ...restProps }) => {
  const spinnerClassName = useComponentStyles('spinner', { base: true, size, color });

  return <Box color={color} className={classnames(spinnerClassName, className)} {...restProps} />;
};
