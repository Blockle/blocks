'use client';

import {
  atoms,
  type ComponentThemes,
  classnames,
  getAtomsAndProps,
  type HTMLElementProps,
  type MarginAtoms,
} from '@blockle/blocks-core';
import { createSlottable } from '@blockle/blocks-react-slot';
import type React from 'react';
import { cloneElement, isValidElement } from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Spinner } from '../../feedback/Spinner/Spinner.js';
import { buttonReset } from '../Button/Button.css.js';

type IconButtonTheme = ComponentThemes['iconButton'];

export type IconButtonProps = {
  asChild?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  intent?: IconButtonTheme['variants']['intent'];
  /**
   * Accessible name of the button, rendered as `aria-label`
   */
  label: string;
  loading?: boolean;
  shape?: IconButtonTheme['variants']['shape'];
  size?: IconButtonTheme['variants']['size'];
  type?: 'button' | 'submit' | 'reset';
  variant?: IconButtonTheme['variants']['variant'];
} & Omit<HTMLElementProps<HTMLButtonElement>, 'size'> &
  MarginAtoms;

const [Template, Slot] = createSlottable('button');

export const IconButton: React.FC<IconButtonProps> = ({
  asChild,
  children,
  className,
  disabled,
  intent,
  label,
  loading,
  shape,
  size,
  type,
  variant,
  ...restProps
}) => {
  const iconButtonClassName = useComponentStyles('iconButton', {
    root: true,
    variants: {
      variant,
      intent,
      size,
      shape,
      disabled,
      loading,
    },
  });

  const [atomsProps, otherProps] = getAtomsAndProps(restProps);

  if (import.meta.env.DEV) {
    if (asChild && type !== undefined) {
      console.warn(
        'IconButton: The `type` prop is ignored when using `asChild`. Please set the `type` prop on the child component instead.',
      );
    }
  }

  const spinner = <Spinner size={size} />;
  let content = children;

  // The spinner takes the icon's place; with asChild the icon lives inside the child element
  if (loading) {
    content =
      asChild && isValidElement(children)
        ? cloneElement(children, undefined, spinner)
        : spinner;
  }

  return (
    <Template
      asChild={asChild}
      aria-label={label}
      disabled={disabled || loading}
      className={classnames(
        buttonReset,
        iconButtonClassName,
        atoms(atomsProps),
        className,
      )}
      type={asChild ? undefined : (type ?? 'button')}
      {...otherProps}
    >
      <Slot>{content}</Slot>
    </Template>
  );
};
