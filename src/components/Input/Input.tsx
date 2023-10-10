import { ReactNode, forwardRef, useId } from 'react';
import { OptionalLiteral } from '../../lib/utils/helpers';
import * as styles from './input.css';
import { HTMLElementProps } from '../../lib/utils/utils';
import { useComponentStyles } from '../../hooks/useComponentStyles';
import { Box } from '../Box';
import { classnames } from '../../lib/utils/classnames';

export type InputProps = {
  className?: string;
  name: string;
  type?: OptionalLiteral<'email' | 'number' | 'password' | 'tel' | 'text' | 'url'>;
  startSlot?: ReactNode;
  endSlot?: ReactNode;
  label: string;
} & Omit<HTMLElementProps<HTMLInputElement>, 'type'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, name, type = 'text', startSlot, endSlot, label, placeholder, ...restProps },
  ref,
) {
  const id = useId();
  const containerClassName = useComponentStyles('input', { container: true }, false);
  const inputClassName = useComponentStyles('input', { input: true });

  return (
    <Box>
      {/* <Label htmlFor={id}>{label}</Label> */}

      <Box display="flex" alignItems="center" className={classnames(containerClassName, className)}>
        {startSlot}

        <Box
          as="input"
          id={id}
          ref={ref}
          name={name}
          type={type}
          placeholder={placeholder || label}
          width="full"
          overflow="hidden"
          className={classnames(styles.input, inputClassName)}
          {...restProps}
        />

        {endSlot}
      </Box>

      {/* <Text>Input error</Text> */}
    </Box>
  );
});
