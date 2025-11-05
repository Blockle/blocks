'use client';

import { type ComponentThemes, classnames } from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Button } from '../../form/Button/Button.js';
import { Box } from '../../layout/Box/Box.js';
import * as styles from './Alert.css.js';

type AlertTheme = ComponentThemes['alert'];

export type AlertProps = {
  children?: React.ReactNode;
  className?: string;
  intent?: AlertTheme['variants']['intent'];
  onRequestClose?: () => void;
  ref?: React.RefObject<HTMLDivElement>;
  style?: React.CSSProperties;
};

export const Alert: React.FC<AlertProps> = ({
  intent = 'info',
  children,
  onRequestClose,
  className,
  ref,
  style,
}) => {
  const containerClassName = useComponentStyles('alert', {
    base: true,
    variants: { intent },
  });

  // Icon idea
  // Create a global config to customisation for components, like icons
  // const { icons } = useComponentConfig('alert');
  // const Icon = icons?.[intent] ?? null;
  // <Icon />

  return (
    <Box
      ref={ref}
      role="alert"
      className={classnames(containerClassName, className)}
      style={style}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <div>{children}</div>

      <Button
        variant="ghost"
        size="small"
        className={styles.closeButton}
        onClick={() => onRequestClose?.()}
      >
        <svg
          role="presentation"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </Button>
    </Box>
  );
};
