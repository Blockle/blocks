'use client';

import { classnames, type HTMLElementProps } from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Box } from '../../layout/Box/Box.js';
import * as styles from './Textarea.css.js';

export type TextareaProps = {
  value: string;
  ref: React.RefObject<HTMLTextAreaElement>;
} & HTMLElementProps<HTMLTextAreaElement>;

export const Textarea: React.FC<TextareaProps> = ({
  ref,
  value,
  ...restProps
}) => {
  const containerClassName = useComponentStyles(
    'textarea',
    { container: true },
    false,
  );
  const inputClassName = useComponentStyles('textarea', { input: true });

  return (
    <Box className={containerClassName}>
      <textarea
        ref={ref}
        value={value}
        className={classnames(styles.textarea, inputClassName)}
        {...restProps}
      />
    </Box>
  );
};
