import { useId } from 'react';
import { getComponentStyles } from '../../../lib/theme/store/theme';
import { classnames } from '../../../lib/utils/classnames';
import type { OptionalLiteral } from '../../../lib/utils/helpers';
import type { HTMLElementProps } from '../../../lib/utils/utils';
import { Box } from '../../layout/Box';
import * as styles from './input.css';

export type InputProps = {
  className?: string;
  endSlot?: React.ReactNode;
  name: string;
  ref?: React.Ref<HTMLInputElement>;
  startSlot?: React.ReactNode;
  type?: OptionalLiteral<
    'email' | 'number' | 'password' | 'tel' | 'text' | 'url'
  >;
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
  const containerClassName = getComponentStyles(
    'input',
    { container: true },
    false,
  );
  const inputClassName = getComponentStyles('input', { input: true });

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        className={classnames(containerClassName, className)}
      >
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
