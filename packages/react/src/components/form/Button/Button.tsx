import type React from 'react';
import { useComponentStyles } from '../../../hooks/useComponentStyles';

import {
  type ComponentThemes,
  type HTMLElementProps,
  type MarginSprinkles,
  type Sprinkles,
  classnames,
  getAtomsAndProps,
  sprinkles,
} from '@blockle/blocks-core';
import { createSlottable } from '@blockle/blocks-react-slot';
import { Spinner } from '../../feedback/Spinner';
import * as styles from './Button.css';

type ButtonTheme = ComponentThemes['button'];

export type ButtonProps = {
  alignSelf?: Sprinkles['alignSelf'];
  asChild?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  endSlot?: React.ReactNode;
  inlineSize?: Sprinkles['inlineSize'];
  intent?: ButtonTheme['variants']['intent'];
  loading?: boolean;
  popovertarget?: string;
  ref?: React.Ref<HTMLButtonElement>;
  size?: ButtonTheme['variants']['size'];
  startSlot?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonTheme['variants']['variant'];
} & Omit<HTMLElementProps<HTMLButtonElement>, 'size'> &
  MarginSprinkles;

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

  return (
    <Template
      ref={ref}
      asChild={asChild}
      disabled={disabled || loading}
      className={classnames(
        styles.buttonReset,
        buttonClassName,
        sprinkles(atomsProps),
        className,
      )}
      {...otherProps}
    >
      {startSlot && <div>{startSlot}</div>}
      {loading && <Spinner size={size} />}
      <Slot>{children}</Slot>
      {endSlot && <div>{endSlot}</div>}
    </Template>
  );
};
