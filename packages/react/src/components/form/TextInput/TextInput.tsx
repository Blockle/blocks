'use client';

import {
  classnames,
  type HTMLElementProps,
  type OptionalLiteral,
} from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Box } from '../../layout/Box/Box.js';
import * as styles from './TextInput.css.js';

export type TextInputProps = {
  className?: string;
  inputClassName?: string;
  endSlot?: React.ReactNode;
  name: string;
  ref?: React.Ref<HTMLInputElement>;
  startSlot?: React.ReactNode;
  type?: OptionalLiteral<
    'email' | 'number' | 'password' | 'tel' | 'text' | 'url'
  >;
  // helperText?: string;
} & Omit<HTMLElementProps<HTMLInputElement>, 'type'>;

export const TextInput: React.FC<TextInputProps> = ({
  className,
  inputClassName,
  endSlot,
  name,
  placeholder,
  ref,
  startSlot,
  type = 'text',
  ...restProps
}) => {
  const containerStyles = useComponentStyles(
    'textInput',
    { base: true },
    false,
  );
  const inputStyles = useComponentStyles('textInput', { input: true });

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        className={classnames(containerStyles, className)}
      >
        {startSlot}

        <input
          ref={ref}
          name={name}
          type={type}
          placeholder={placeholder}
          className={classnames(styles.input, inputStyles, inputClassName)}
          {...restProps}
        />

        {endSlot}
      </Box>

      {/* <Text>{helperText}</Text> */}
    </Box>
  );
};
