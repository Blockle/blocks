import { FC } from 'react';
import { SpinnerTheme } from '../../lib/css/theme/componentThemes';
import { MarginAtoms } from '../../lib/css/atoms';
import { useComponentStyles } from '../../hooks/useComponentStyles/useComponentStyles';
import { Box } from '../Box';
import { classnames } from '../../lib/utils/classnames';

export type SpinnerProps = {
  className?: string;
  size?: SpinnerTheme['variants']['size'];
  color?: SpinnerTheme['variants']['color'];
} & MarginAtoms;

export const Spinner: FC<SpinnerProps> = ({ className, size, color, ...restProps }) => {
  const spinnerClassName = useComponentStyles('spinner', { base: true, size, color });

  return <Box color={color} className={classnames(spinnerClassName, className)} {...restProps} />;
};
