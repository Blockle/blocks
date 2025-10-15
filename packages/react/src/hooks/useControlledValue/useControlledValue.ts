'use client';

import { useCallback, useEffect, useState } from 'react';

function noopTransform<T>(value: T) {
  return value;
}

type ControlledValue<T> =
  | {
      value?: T;
      defaultValue: T;
      onChange?: (value: T) => void;
      transformValue?: (value: T) => T;
    }
  | {
      value: T;
      defaultValue?: T;
      onChange: (value: T) => void;
      transformValue?: (value: T) => T;
    };

export function useControlledValue<T>({
  defaultValue,
  value,
  onChange,
  transformValue = noopTransform,
}: ControlledValue<T>): [T, (value: T) => void] {
  const [internValue, setInternValue] = useState(defaultValue);
  const currentValue = ((onChange ? value : internValue) ?? defaultValue) as T;

  const setValue = useCallback(
    function setValue(value: T) {
      const nextValue = transformValue(value);

      if (onChange) {
        onChange(nextValue);
      } else {
        setInternValue(nextValue);
      }
    },
    [onChange, transformValue],
  );

  // Warn if the component is in controlled mode but no value is provided
  if (!import.meta.env.PROD) {
    // biome-ignore lint/correctness/useHookAtTopLevel: false positive
    useEffect(() => {
      if (onChange && value === undefined) {
        console.error('Slider is in controlled mode but no value is provided');
      }
    }, [onChange, value]);
  }

  return [transformValue(currentValue), setValue];
}
