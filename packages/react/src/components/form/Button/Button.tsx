'use client';

import {
  type Atoms,
  atoms,
  type ComponentThemes,
  classnames,
  getAtomsAndProps,
  type HTMLElementProps,
  type MarginAtoms,
} from '@blockle/blocks-core';
import { createSlottable } from '@blockle/blocks-react-slot';
import type React from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Spinner } from '../../feedback/Spinner/Spinner.js';
import { Box } from '../../layout/Box/Box.js';
import * as styles from './Button.css.js';

type ButtonTheme = ComponentThemes['button'];

export type ButtonProps = {
  alignSelf?: Atoms['alignSelf'];
  asChild?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  endSlot?: React.ReactNode;
  inlineSize?: Atoms['inlineSize'];
  intent?: ButtonTheme['variants']['intent'];
  loading?: boolean;
  popovertarget?: string;
  ref?: React.Ref<HTMLButtonElement>;
  size?: ButtonTheme['variants']['size'];
  startSlot?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonTheme['variants']['variant'];
} & Omit<HTMLElementProps<HTMLButtonElement>, 'size'> &
  MarginAtoms;

const [Template, Slot] = createSlottable('button');

export const Button: React.FC<ButtonProps> = ({
  asChild,
  children,
  className,
  disabled,
  endSlot,
  intent,
  loading,
  ref,
  size,
  startSlot,
  type,
  variant,
  ...restProps
}) => {
  const buttonClassName = useComponentStyles('button', {
    base: true,
    variants: {
      variant,
      intent,
      size,
      disabled,
      loading,
    },
  });

  const [atomsProps, otherProps] = getAtomsAndProps(restProps);

  if (import.meta.env.DEV) {
    if (asChild && type !== undefined) {
      console.warn(
        'Button: The `type` prop is ignored when using `asChild`. Please set the `type` prop on the child component instead.',
      );
    }
  }

  return (
    <Template
      ref={ref}
      asChild={asChild}
      disabled={disabled || loading}
      className={classnames(
        styles.buttonReset,
        buttonClassName,
        atoms(atomsProps),
        className,
      )}
      // Do not pass type attribute if using asChild since child component may not support it
      type={asChild ? undefined : (type ?? 'button')}
      {...otherProps}
    >
      {startSlot && <Box display="inline-flex">{startSlot}</Box>}
      {loading && <Spinner size={size} />}
      <Slot>{children}</Slot>
      {endSlot && <Box display="inline-flex">{endSlot}</Box>}
    </Template>
  );
};
