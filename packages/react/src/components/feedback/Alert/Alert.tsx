'use client';

import {
  type ComponentThemes,
  classnames,
  type HTMLElementProps,
} from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Button } from '../../form/Button/Button.js';
import { Box } from '../../layout/Box/Box.js';
import * as styles from './Alert.css.js';

type AlertTheme = ComponentThemes['alert'];

export type AlertProps = {
  children?: React.ReactNode;
  /**
   * Content placed at the end of the Alert, before the close button, such as
   * a `Button`. The children take the remaining width.
   */
  action?: React.ReactNode;
  intent?: AlertTheme['variants']['intent'];
  onRequestClose?: () => void;
  /**
   * Accessible name of the close button, rendered when `onRequestClose` is set.
   * Pass your own wording to translate it.
   * @default 'Close'
   */
  closeLabel?: string;
  /**
   * `alert` announces the message as urgent, for a message shown in response
   * to something that just happened. Use `status` for a lasting notice, such
   * as a banner that stays while a record is archived.
   * @default 'alert'
   */
  role?: 'alert' | 'status';
} & Omit<HTMLElementProps<HTMLDivElement>, 'action' | 'role'>;

export const Alert: React.FC<AlertProps> = ({
  intent = 'info',
  children,
  action,
  onRequestClose,
  closeLabel = 'Close',
  className,
  role = 'alert',
  ...restProps
}) => {
  const containerClassName = useComponentStyles('alert', {
    root: true,
    variants: { intent },
  });

  // Icon idea
  // Create a global config to customisation for components, like icons
  // const { icons } = useComponentConfig('alert');
  // const Icon = icons?.[intent] ?? null;
  // <Icon />

  return (
    <Box
      role={role}
      className={classnames(containerClassName, className)}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={action ? 2 : undefined}
      {...restProps}
    >
      <Box flexGrow={action ? 1 : undefined}>{children}</Box>

      {action}

      {onRequestClose ? (
        <Button
          variant="ghost"
          size="small"
          className={styles.closeButton}
          aria-label={closeLabel}
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </Button>
      ) : null}
    </Box>
  );
};
