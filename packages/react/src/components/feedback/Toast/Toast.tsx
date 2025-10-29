'use client';

import { type ComponentThemes, classnames } from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import * as styles from './Toast.css.js';

type ToastTheme = ComponentThemes['toast'];

export type ToastProps = {
  children?: React.ReactNode;
  duration?: number;
  intent?: ToastTheme['variants']['intent'];
  onRequestClose?: () => void;
  open?: boolean;
};

export const Toast: React.FC<ToastProps> = ({
  intent = 'neutral',
  children,
}) => {
  const containerClassName = useComponentStyles('toast', {
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
