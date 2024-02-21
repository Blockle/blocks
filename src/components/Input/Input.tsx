import { forwardRef, useId } from 'react';
import { useComponentStyles } from '../../hooks/useComponentStyles';
import { classnames } from '../../lib/utils/classnames';
import { OptionalLiteral } from '../../lib/utils/helpers';
import { HTMLElementProps } from '../../lib/utils/utils';
import { Box } from '../layout/Box';
import * as styles from './input.css';

export type InputProps = {
  className?: string;
  name: string;
  type?: OptionalLiteral<'email' | 'number' | 'password' | 'tel' | 'text' | 'url'>;
  startSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
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

        <Box asChild width="full" overflow="hidden">
          <input
            id={id}
            ref={ref}
            name={name}
            type={type}
            placeholder={placeholder || label}
            className={classnames(styles.input, inputClassName)}
            {...restProps}
          />
        </Box>

        {endSlot}
      </Box>

      {/* <Text>Input error</Text> */}
    </Box>
  );
});
