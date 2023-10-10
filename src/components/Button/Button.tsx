import { forwardRef, ReactNode } from 'react';
import { Atoms } from '../../lib/css/atoms';
import { classnames } from '../../lib/utils/classnames';
import { HTMLElementProps } from '../../lib/utils/utils';
import { Box } from '../Box';
import * as styles from './Button.css';
import { useComponentStyles } from '../../hooks/useComponentStyles';
import { Spinner } from '../Spinner';
import { ButtonTheme } from '../../lib/theme/themeComponents';

// TODO Add support for href?
export type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonTheme['variants']['variant'];
  intent?: ButtonTheme['variants']['intent'];
  size?: ButtonTheme['variants']['size'];
  width?: Atoms['width'];
  alignSelf?: Atoms['alignSelf'];
  loading?: boolean;
  startSlot?: ReactNode;
  endSlot?: ReactNode;
  disabled?: boolean;
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
    ...restProps
  },
  ref,
) {
  const isLinkVariant = variant === 'link';
  const buttonClassName = useComponentStyles('button', {
    base: true,
    variants: {
      variant: isLinkVariant ? 'solid' : variant,
      intent,
      size,
      disabled,
      loading,
    },
  });
  // Use link styles when variant is "link"
  const linkClassName = useComponentStyles('link', {
    base: true,
    variants: { variant: 'primary' },
  });

  return (
    <Box
      ref={ref}
      as="button"
      className={classnames(
        styles.buttonReset,
        isLinkVariant ? linkClassName : buttonClassName,
        className,
      )}
      width={width}
      type={type}
      disabled={disabled || loading}
      {...restProps}
    >
      {/* TODO PaddingRight values should not be hardcoded, could wrap children in a div and use gap? */}
      {startSlot && <Box paddingRight="medium">{startSlot}</Box>}
      {loading && <Spinner size={size} marginRight="medium" />}
      {children}
      {endSlot && <Box paddingLeft="medium">{endSlot}</Box>}
    </Box>
  );
});
