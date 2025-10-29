'use client';

import { classnames, type HTMLElementProps } from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';

export type TextareaProps = {
  value: string;
  ref: React.RefObject<HTMLTextAreaElement>;
} & HTMLElementProps<HTMLTextAreaElement>;

export const Textarea: React.FC<TextareaProps> = ({
  ref,
  value,
  ...restProps
}) => {
  // const containerClassName = useComponentStyles(
  //   'input',
  //   { container: true },
  //   false,
  // );
  const inputClassName = useComponentStyles('input', {
    container: true,
    input: true,
  });

  return (
    <textarea
      ref={ref}
      value={value}
      className={classnames(inputClassName)}
      style={{
        resize: 'none',
        fieldSizing: 'content',
        maxHeight: 100,
        padding: 4,
        // minheight 2 lines
        minHeight: 'calc(3em + 8px)',
      }}
      {...restProps}
    />
  );
};
