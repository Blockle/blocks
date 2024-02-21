import { useComponentStyles } from '../../../hooks/useComponentStyles';
import { MarginAtoms } from '../../../lib/css/atoms';
import { SpinnerTheme } from '../../../lib/theme/componentThemes';
import { classnames } from '../../../lib/utils/classnames';
import { Box } from '../../layout/Box';

export type SpinnerProps = {
  className?: string;
  color?: SpinnerTheme['variants']['color'];
  size?: SpinnerTheme['variants']['size'];
  style?: React.CSSProperties;
} & MarginAtoms;

export const Spinner: React.FC<SpinnerProps> = ({ className, size, color, ...restProps }) => {
  const spinnerClassName = useComponentStyles('spinner', { base: true, variants: { size, color } });

  return <Box color={color} className={classnames(spinnerClassName, className)} {...restProps} />;
};
