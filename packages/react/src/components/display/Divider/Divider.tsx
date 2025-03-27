'use client';

import { type Sprinkles, classnames } from '@blockle/blocks-core';
import {
  useComponentStyleDefaultProps,
  useComponentStyles,
} from '../../../hooks/useComponentStyles';
import { Box } from '../../layout/Box';
import * as styles from './divider.css';

export type DividerProps = {
  className?: string;
  color?: Sprinkles['backgroundColor'];
  style?: React.CSSProperties;
};

export const Divider: React.FC<DividerProps> = ({
  className,
  color,
  ...restProps
}) => {
  const dividerClass = useComponentStyles('divider', { base: true });
  const dividerDefaults = useComponentStyleDefaultProps('divider');

  return (
    <Box
      role="separator"
      inlineSize="full"
      backgroundColor={color ?? dividerDefaults.color}
      className={classnames(className, dividerClass, styles.divider)}
      {...restProps}
    />
  );
};
