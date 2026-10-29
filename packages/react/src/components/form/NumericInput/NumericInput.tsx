'use client';

import { composeRefs } from '@blockle/blocks-core';
import { useCallback, useRef } from 'react';

import { IconButton } from '../IconButton/IconButton.js';
import { TextInput, type TextInputProps } from '../TextInput/TextInput.js';
import * as styles from './NumericInput.css.js';

export type NumericInputProps = {
  /**
   * Accessible name of the decrement button. Pass your own wording to translate it.
   * @default 'Decrease'
   */
  decrementLabel?: string;
  /**
   * Accessible name of the increment button. Pass your own wording to translate it.
   * @default 'Increase'
   */
  incrementLabel?: string;
  value?: number | string;
  min?: number;
  max?: number;
  step?: number;
} & TextInputProps;

const StepIcon: React.FC<{ path: string }> = ({ path }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d={path} />
  </svg>
);

export const NumericInput: React.FC<NumericInputProps> = ({
  decrementLabel = 'Decrease',
  incrementLabel = 'Increase',
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onDecrement = useCallback((event: React.MouseEvent) => {
    const size = event.shiftKey ? 10 : 1;
    inputRef.current?.stepDown(size);
  }, []);
  const onIncrement = useCallback((event: React.MouseEvent) => {
    const stepSize = event.shiftKey ? 10 : 1;
    inputRef.current?.stepUp(stepSize);
  }, []);
  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!event.shiftKey) {
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      inputRef.current?.stepUp(10);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      inputRef.current?.stepDown(10);
    }
  }, []);

  return (
    <TextInput
      ref={composeRefs(props.ref, inputRef)}
      inputClassName={styles.numericInput}
      type="number"
      startSlot={
        <IconButton
          label={decrementLabel}
          variant="ghost"
          size="small"
          onClick={onDecrement}
        >
          <StepIcon path="M5 12h14" />
        </IconButton>
      }
      endSlot={
        <IconButton
          label={incrementLabel}
          variant="ghost"
          size="small"
          onClick={onIncrement}
        >
          <StepIcon path="M12 5v14M5 12h14" />
        </IconButton>
      }
      onKeyDown={onKeyDown}
      {...props}
    />
  );
};
