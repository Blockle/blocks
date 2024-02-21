import {
  useComponentStyleDefaultProps,
  useComponentStyles,
} from '../../../hooks/useComponentStyles';
import { Atoms } from '../../../lib/css/atoms';
import { classnames } from '../../../lib/utils/classnames';
import { Box } from '../Box';
import * as styles from './divider.css';

export type DividerProps = {
  className?: string;
  color?: Atoms['backgroundColor'];
  style?: React.CSSProperties;
};

export const Divider: React.FC<DividerProps> = ({ className, color, ...restProps }) => {
  const dividerClass = useComponentStyles('divider', { base: true });
  const dividerDefaults = useComponentStyleDefaultProps('divider');

  return (
    <Box
      role="separator"
      width="full"
      backgroundColor={color ?? dividerDefaults.color}
      className={classnames(className, dividerClass, styles.divider)}
      {...restProps}
    />
  );
};
