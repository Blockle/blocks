'use client';

import { type Atoms, classnames } from '@blockle/blocks-core';

import { useComponentStyleDefaultProps } from '../../../hooks/useComponentStyles/useComponentStyleDefaultProps.js';
import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Box } from '../../layout/Box/Box.js';
import * as styles from './divider.css.js';

export type DividerProps = {
  className?: string;
  color?: Atoms['backgroundColor'];
  style?: React.CSSProperties;
};

export const Divider: React.FC<DividerProps> = ({
  className,
  color,
  ...restProps
}) => {
  const dividerClass = useComponentStyles('divider', { root: true });
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
