import { forwardRef } from 'react';
import { useComponentStyles } from '../../../hooks/useComponentStyles';
import { createAsChildContainer } from '../../../lib/asChildRenderer/asChildRender';
import { Atoms, MarginAtoms, atoms } from '../../../lib/css/atoms';
import { ButtonTheme } from '../../../lib/theme/componentThemes';
import { getAtomsAndProps } from '../../../lib/utils/atom-props';
import { classnames } from '../../../lib/utils/classnames';
import { HTMLElementProps } from '../../../lib/utils/utils';
import { Spinner } from '../../feedback/Spinner';
import * as styles from './Button.css';

export type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonTheme['variants']['variant'];
  intent?: ButtonTheme['variants']['intent'];
  size?: ButtonTheme['variants']['size'];
  inlineSize?: Atoms['inlineSize'];
  alignSelf?: Atoms['alignSelf'];
  loading?: boolean;
  startSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
  disabled?: boolean;
  asChild?: boolean;
  popovertarget?: string;
} & Omit<HTMLElementProps<HTMLButtonElement>, 'size'> &
  MarginAtoms;

const { Template, Slot } = createAsChildContainer({
  defaultElement: 'button',
  // Should have control over the props that are passed down to the elements that replace the Slot
  // Black or white list?
  inheritProps: ['type'],
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    variant,
    intent,
    size,
    startSlot,
    endSlot,
    loading,
    disabled,
    asChild,
    ...restProps
  },
  ref,
) {
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
      className={classnames(styles.buttonReset, buttonClassName, atoms(atomsProps), className)}
      {...otherProps}
    >
      {startSlot && <div>{startSlot}</div>}
      {loading && <Spinner size={size} />}
      <Slot>{children}</Slot>
      {endSlot && <div>{endSlot}</div>}
    </Template>
  );
});
