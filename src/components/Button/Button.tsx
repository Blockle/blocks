import { forwardRef } from 'react';
import { useComponentStyles } from '../../hooks/useComponentStyles';
import { Atoms } from '../../lib/css/atoms';
import { ButtonTheme } from '../../lib/theme/componentThemes';
import { classnames } from '../../lib/utils/classnames';
import { HTMLElementProps } from '../../lib/utils/utils';
import { Box } from '../Box';
import { createSlot } from '../Slot/Slot';
import { Spinner } from '../Spinner';
import * as styles from './Button.css';

const Slot = createSlot('button');

// TODO How could we render a link variant of the button?
// Note, it should also work with Link component (next/link, ...)
export type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonTheme['variants']['variant'];
  intent?: ButtonTheme['variants']['intent'];
  size?: ButtonTheme['variants']['size'];
  width?: Atoms['width'];
  alignSelf?: Atoms['alignSelf'];
  loading?: boolean;
  startSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
  disabled?: boolean;
  asChild?: boolean;
} & Omit<HTMLElementProps<HTMLButtonElement>, 'size'>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    type = 'button',
    variant,
    intent,
    size,
    width,
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

  return (
    <Box
      ref={ref}
      asChild
      // as="button"
      className={classnames(styles.buttonReset, buttonClassName, className)}
      width={width}
      {...restProps}
    >
      <Slot asChild={asChild} type={type} disabled={disabled || loading}>
        {/* TODO PaddingRight values should not be hardcoded, could wrap children in a div and use gap? */}
        {startSlot && <Box paddingRight="medium">{startSlot}</Box>}
        {loading && <Spinner size={size} marginRight="medium" />}
        {children}
        {endSlot && <Box paddingLeft="medium">{endSlot}</Box>}
      </Slot>
    </Box>
  );
});
