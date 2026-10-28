'use client';

import {
  classnames,
  composeRefs,
  type HTMLElementProps,
} from '@blockle/blocks-core';
import { useRef, useState } from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import * as styles from './switch.css.js';

export type SwitchProps = {
  /**
   * The native change handler of the underlying input.
   * Read the new value from `event.target.checked`.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
} & Omit<HTMLElementProps<HTMLInputElement>, 'onChange'>;

export const Switch: React.FC<SwitchProps> = ({
  checked,
  className,
  defaultChecked,
  onChange,
  ref,
  ...restProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uncontrolledChecked, setUncontrolledChecked] = useState(
    defaultChecked ?? false,
  );
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : uncontrolledChecked;
  const baseClassName = useComponentStyles('switch', { root: true });
  const thumbClassName = useComponentStyles('switch', { thumb: true }, false);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledChecked(event.target.checked);
    }

    onChange?.(event);
  };

  return (
    <>
      {/** biome-ignore lint/a11y/noStaticElementInteractions: no tabindex needed on div, Safari needs special setting enabled for keyboard navigation.. */}
      {/** biome-ignore lint/a11y/useKeyWithClickEvents: no tabindex needed on div, Safari needs special setting enabled for keyboard navigation.. */}
      <div
        className={classnames(className, styles.container, baseClassName)}
        data-checked={isChecked}
        onClick={(event) => {
          // Clicks on the input itself (including those from a label or the
          // spacebar) already toggle it natively.
          if (event.target === inputRef.current) {
            return;
          }

          inputRef.current?.click();
        }}
      >
        <input
          type="checkbox"
          // biome-ignore lint/a11y/useAriaPropsForRole: a checkbox input exposes its checked state natively, aria-checked would only duplicate it
          role="switch"
          className={styles.input}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChangeHandler}
          ref={composeRefs(ref, inputRef)}
          {...restProps}
        />
        <div className={thumbClassName} data-checked={isChecked} />
      </div>
    </>
  );
};
