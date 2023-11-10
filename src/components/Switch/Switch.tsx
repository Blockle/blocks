import { forwardRef, useCallback, useEffect, useState } from 'react';
import { useComponentStyles } from '../../hooks/useComponentStyles';
import { classnames } from '../../lib/utils/classnames';
import { HTMLElementProps } from '../../lib/utils/utils';
import * as styles from './switch.css';

export type SwitchProps = {
  onChange?: (value: boolean) => void;
} & Omit<HTMLElementProps<HTMLInputElement>, 'onChange'>;

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { className, checked, onChange, defaultChecked, ...restProps },
  ref,
) {
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked || checked || false);
  const baseClassName = useComponentStyles('switch', { base: true });
  const sliderClassName = useComponentStyles('switch', { slider: true });

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
      <div
        className={classnames(className, styles.container, baseClassName)}
        data-checked={isChecked}
        onClick={(event) => {
          // Keyboard input on input element causes click event,
          // but we don't want to toggle twice
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
});
