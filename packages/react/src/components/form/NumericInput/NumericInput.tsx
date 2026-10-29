'use client';

import { classnames, composeRefs } from '@blockle/blocks-core';
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
} & Omit<TextInputProps, 'startSlot' | 'endSlot'>;

const shiftMultiplier = 10;

const stepsFor = (event: React.MouseEvent | React.KeyboardEvent) =>
  event.shiftKey ? shiftMultiplier : 1;

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
  const { onKeyDown: consumerOnKeyDown } = props;

  const onDecrement = useCallback((event: React.MouseEvent) => {
    inputRef.current?.stepDown(stepsFor(event));
  }, []);

  const onIncrement = useCallback((event: React.MouseEvent) => {
    inputRef.current?.stepUp(stepsFor(event));
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      consumerOnKeyDown?.(event);

      if (event.defaultPrevented || !event.shiftKey) {
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        inputRef.current?.stepUp(stepsFor(event));
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        inputRef.current?.stepDown(stepsFor(event));
      }
    },
    [consumerOnKeyDown],
  );

  return (
    <TextInput
      {...props}
      ref={composeRefs(props.ref, inputRef)}
      inputClassName={classnames(styles.numericInput, props.inputClassName)}
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
    />
  );
};
