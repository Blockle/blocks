import type React from 'react';
import { createAsChildTemplate } from '../../../lib/asChildRenderer/createAsChildTemplate';
import { type Atoms, type MarginAtoms, atoms } from '../../../lib/css/atoms';
import type { ButtonTheme } from '../../../lib/theme/componentThemes';
import { getComponentStyles } from '../../../lib/theme/store/theme';
import { getAtomsAndProps } from '../../../lib/utils/atom-props';
import { classnames } from '../../../lib/utils/classnames';
import type { HTMLElementProps } from '../../../lib/utils/utils';
import { Spinner } from '../../feedback/Spinner';
import * as styles from './Button.css';

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

const { Template, Slot } = createAsChildTemplate('button');

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
  const buttonClassName = getComponentStyles('button', {
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
        atoms(atomsProps),
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
