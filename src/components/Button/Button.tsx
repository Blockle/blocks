import { forwardRef, ReactNode } from 'react';
import { Atoms } from '../../lib/css/atoms';
import { classnames } from '../../lib/utils/classnames';
import { HTMLElementProps } from '../../lib/utils/utils';
import { Box } from '../Box';
import * as styles from './Button.css';

// TODO Add support for href?
export type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  intent?: 'default' | 'warning';
  size?: 'small' | 'medium' | 'large';
  width?: Atoms['width'];
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
    variant = 'solid',
    intent = 'default',
    size = 'medium',
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
  const buttonClassName = ''; /*useComponentStyles('button', {
    base: true,
    variant: isLinkVariant ? 'solid' : variant,
    intent,
    size,
  });*/
  // Use link styles when variant is "link"
  const linkClassName = ''; // useComponentStyles('link', { base: true, variant: 'primary' });

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
      {startSlot && <Box paddingRight="medium">{startSlot}</Box>}
      {loading && /* <Spinner size={size} marginRight="medium" /> */ <div>spinner</div>}
      {children}
      {endSlot && <Box paddingLeft="medium">{endSlot}</Box>}
    </Box>
  );
});
