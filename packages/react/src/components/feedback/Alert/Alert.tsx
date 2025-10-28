'use client';

import { type ComponentThemes, classnames } from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import * as styles from './Alert.css.js';

type AlertTheme = ComponentThemes['alert'];

export type AlertProps = {
  intent?: AlertTheme['variants']['intent'];
  children?: React.ReactNode;
};

export const Alert: React.FC<AlertProps> = ({ intent = 'info', children }) => {
  const containerClassName = useComponentStyles('alert', {
    base: true,
    variants: { intent },
  });

  return (
    <div
      role="alert"
      className={classnames(styles.container, containerClassName)}
    >
      {children}
    </div>
  );
};
