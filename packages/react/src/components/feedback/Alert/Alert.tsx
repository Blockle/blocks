'use client';

import {
  type ComponentThemes,
  classnames,
  type HTMLElementProps,
} from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Box } from '../../layout/Box/Box.js';

type AlertTheme = ComponentThemes['alert'];

export type AlertProps = {
  children?: React.ReactNode;
  /**
   * Content placed after the message, such as a `Button`, or an `IconButton`
   * to dismiss the Alert. The message takes the remaining width.
   */
  endSlot?: React.ReactNode;
  intent?: AlertTheme['variants']['intent'];
  /**
   * `alert` announces the message as urgent, for a message shown in response
   * to something that just happened. Use `status` for a lasting notice, such
   * as a banner that stays while a record is archived.
   * @default 'alert'
   */
  role?: 'alert' | 'status';
  /**
   * Content placed before the message, such as an icon
   */
  startSlot?: React.ReactNode;
} & Omit<HTMLElementProps<HTMLDivElement>, 'role'>;

export const Alert: React.FC<AlertProps> = ({
  intent = 'info',
  children,
  className,
  endSlot,
  role = 'alert',
  startSlot,
  ...restProps
}) => {
  const containerClassName = useComponentStyles('alert', {
    root: true,
    variants: { intent },
  });

  return (
    <Box
      role={role}
      className={classnames(containerClassName, className)}
      display="flex"
      alignItems="center"
      gap={2}
      {...restProps}
    >
      {startSlot}

      <Box flexGrow={1}>{children}</Box>

      {endSlot}
    </Box>
  );
};
