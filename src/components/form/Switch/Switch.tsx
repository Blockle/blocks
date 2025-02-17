'use client';

import { useCallback, useEffect, useState } from 'react';
import { getComponentStyles } from '../../../lib/theme/store/theme';
import { classnames } from '../../../lib/utils/classnames';
import type { HTMLElementProps } from '../../../lib/utils/utils';
import * as styles from './switch.css';

export type SwitchProps = {
  onChange?: (value: boolean) => void;
  ref?: React.Ref<HTMLInputElement>;
} & Omit<HTMLElementProps<HTMLInputElement>, 'onChange'>;

export const Switch: React.FC<SwitchProps> = ({
  checked,
  className,
  defaultChecked,
  onChange,
  ref,
  ...restProps
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(
    defaultChecked || checked || false,
  );
  const baseClassName = getComponentStyles('switch', { base: true });
  const sliderClassName = getComponentStyles('switch', { slider: true }, false);

  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const toggle = useCallback(() => {
    setIsChecked((checked) => {
      const newValue = !checked;

      if (onChange) {
        onChange(newValue);
      }

      return newValue;
    });
  }, [onChange]);

  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(event.target.checked);

      if (onChange) {
        onChange(event.target.checked);
      }
    },
    [onChange],
  );

  return (
    <>
      {/* Note: no tabindex needed on div, Safari needs special setting enabled for keyboard navigation.. */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className={classnames(className, styles.container, baseClassName)}
        data-checked={isChecked}
        onClick={(event) => {
          // Pressing spacebar on input element causes click event,
          // but we don't want to toggle the switch in that case.
          if ((event.target as HTMLElement).tagName === 'INPUT') {
            return;
          }

          toggle();
        }}
      >
        <input
          ref={ref}
          type="checkbox"
          className={styles.input}
          checked={isChecked}
          onChange={onChangeHandler}
          {...restProps}
        />
        <div className={sliderClassName} data-checked={isChecked} />
      </div>
    </>
  );
};
