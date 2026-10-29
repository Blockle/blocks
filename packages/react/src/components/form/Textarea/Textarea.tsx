'use client';

import {
  type Atoms,
  classnames,
  type HTMLElementProps,
} from '@blockle/blocks-core';

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
   * The maximum block size the container can grow to when `grow` is true.
   * The container stops at this limit and scrolls, while the `<textarea>`
   * itself keeps growing inside it.
   */
  maxBlockSize?: string | number;
  /**
   * If true, the wrapper stretches to its parent's block size and the
   * `<textarea>` is at least as tall as the wrapper. Combine with `grow` to
   * give textareas side by side, such as in a `Grid`, equal heights.
   */
  fill?: boolean;
  /**
   * Props for the wrapper element. Accepts the same atoms as `Box`.
   */
  containerProps?: Omit<HTMLElementProps<HTMLDivElement>, keyof Atoms> & Atoms;
  // helperText: React.ReactNode;
} & HTMLElementProps<HTMLTextAreaElement>;

export const Textarea: React.FC<TextareaProps> = ({
  ref,
  value,
  grow,
  maxBlockSize,
  fill,
  containerProps,
  ...restProps
}) => {
  const containerClassName = useComponentStyles(
    'textarea',
    { root: true },
    false,
  );
  const inputClassName = useComponentStyles('textarea', { input: true });
  const { className, ...inputProps } = restProps;
  const {
    className: containerClassNameFromProps,
    style: containerStyleFromProps,
    ...containerRestProps
  } = containerProps || {};

  return (
    <Box
      className={classnames(
        containerClassName,
        fill && styles.containerFill,
        containerClassNameFromProps,
      )}
      style={{
        maxHeight: grow ? maxBlockSize : undefined,
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
          fill && styles.textareaFill,
          inputClassName,
          className,
        )}
        {...inputProps}
      />
    </Box>
  );
};
