import { type HTMLElementProps, classnames } from '@blockle/blocks-core';
import { useCallback, useEffect, useState } from 'react';
import { useComponentStyles } from '../../../hooks/useComponentStyles';
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
  const baseClassName = useComponentStyles('switch', { base: true });
  const sliderClassName = useComponentStyles('switch', { slider: true }, false);

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
      {/* biome-ignore lint/a11y/useKeyWithClickEvents:
          no tabindex needed on div, Safari needs special setting enabled for keyboard navigation.. */}
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
