'use client';

import { classnames, type HTMLElementProps } from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Box } from '../../layout/Box/Box.js';
import * as styles from './Textarea.css.js';

export type TextareaProps = {
  value?: string;
  /**
   * If true, the textarea will grow in height to fit its content.
   */
  grow?: boolean;
  /**
   * The maximum height the textarea can grow to when `grow` is true.
   */
  maxHeight?: string | number;
  containerProps?: HTMLElementProps<HTMLDivElement>;
  // helperText: React.ReactNode;
} & HTMLElementProps<HTMLTextAreaElement>;

export const Textarea: React.FC<TextareaProps> = ({
  ref,
  value,
  grow,
  maxHeight,
  containerProps,
  ...restProps
}) => {
  const containerClassName = useComponentStyles(
    'textarea',
    { root: true },
    false,
  );
  const inputClassName = useComponentStyles('textarea', { input: true });
  const {
    className: containerClassNameFromProps,
    style: containerStyleFromProps,
    ...containerRestProps
  } = containerProps || {};

  return (
    <Box
      className={classnames(containerClassName, containerClassNameFromProps)}
      style={{
        maxHeight: grow ? maxHeight : undefined,
        ...containerStyleFromProps,
      }}
      {...containerRestProps}
    >
      <textarea
        ref={ref}
        value={value}
        className={classnames(
          styles.textarea,
          grow && styles.fieldSizingEnabled,
          inputClassName,
        )}
        {...restProps}
      />
    </Box>
  );
};
