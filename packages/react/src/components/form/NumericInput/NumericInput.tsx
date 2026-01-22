import { composeRefs } from '@blockle/blocks-core';
import { useCallback, useRef } from 'react';

import { Button } from '../Button/Button.js';
import { TextInput, type TextInputProps } from '../TextInput/TextInput.js';
import * as styles from './NumericInput.css.js';

export type NumericInputProps = {
  value?: number | string;
  min?: number;
  max?: number;
  step?: number;
} & TextInputProps;

export const NumericInput: React.FC<NumericInputProps> = (props) => {
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
        <Button variant="ghost" size="small" onClick={onDecrement}>
          -
        </Button>
      }
      endSlot={
        <Button variant="ghost" size="small" onClick={onIncrement}>
          +
        </Button>
      }
      onKeyDown={onKeyDown}
      {...props}
    />
  );
};
