'use client';

import { useCallback, useEffect, useState } from 'react';

function noopTransform<T>(value: T) {
  return value;
}

type ControlledValue<T> = {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
  transformValue?: (value: T) => T;
};

export function useControlledValue<T>({
  defaultValue,
  value,
  onChange,
  transformValue = noopTransform,
}: ControlledValue<T>): [T, (value: T) => void] {
  const [internValue, setInternValue] = useState(defaultValue);
  const currentValue = (onChange ? value : internValue) ?? defaultValue;

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
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (onChange && value === undefined) {
        console.error('Slider is in controlled mode but no value is provided');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  }

  return [transformValue(currentValue), setValue];
}
