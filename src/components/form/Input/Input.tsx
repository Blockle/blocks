import { useId } from 'react';
import { useComponentStyles } from '../../../hooks/useComponentStyles';
import { classnames } from '../../../lib/utils/classnames';
import { OptionalLiteral } from '../../../lib/utils/helpers';
import { HTMLElementProps } from '../../../lib/utils/utils';
import { Box } from '../../layout/Box';
import * as styles from './input.css';

export type InputProps = {
  className?: string;
  endSlot?: React.ReactNode;
  name: string;
  ref?: React.Ref<HTMLInputElement>;
  startSlot?: React.ReactNode;
  type?: OptionalLiteral<'email' | 'number' | 'password' | 'tel' | 'text' | 'url'>;
} & Omit<HTMLElementProps<HTMLInputElement>, 'type'>;

export const Input: React.FC<InputProps> = ({
  className,
  endSlot,
  name,
  placeholder,
  ref,
  startSlot,
  type = 'text',
  ...restProps
}) => {
  const id = useId();
  const containerClassName = useComponentStyles('input', { container: true }, false);
  const inputClassName = useComponentStyles('input', { input: true });

  return (
    <Box>
      <Box display="flex" alignItems="center" className={classnames(containerClassName, className)}>
        {startSlot}

        <input
          id={id}
          ref={ref}
          name={name}
          type={type}
          placeholder={placeholder}
          className={classnames(styles.input, inputClassName)}
          {...restProps}
        />

        {endSlot}
      </Box>

      {/* <Text>Input error</Text> */}
    </Box>
  );
};
