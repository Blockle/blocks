'use client';

import {
  classnames,
  composeRefs,
  type HTMLElementProps,
} from '@blockle/blocks-core';
import { useRef } from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import * as styles from './switch.css.js';

export type SwitchProps = {
  /**
   * The native change handler of the underlying input.
   * Read the new value from `event.target.checked`.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
} & Omit<HTMLElementProps<HTMLInputElement>, 'onChange'>;

// The input is the only source of truth for the checked state: themes style
// the track and thumb from `input:checked`, so the look follows the input
// however it was set (props, the user, a ref, or a form reset).
export const Switch: React.FC<SwitchProps> = ({
  className,
  ref,
  ...restProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const baseClassName = useComponentStyles('switch', 'root');
  const thumbClassName = useComponentStyles('switch', 'thumb');

  return (
    <>
      {/** biome-ignore lint/a11y/noStaticElementInteractions: no tabindex needed on div, Safari needs special setting enabled for keyboard navigation.. */}
      {/** biome-ignore lint/a11y/useKeyWithClickEvents: no tabindex needed on div, Safari needs special setting enabled for keyboard navigation.. */}
      <div
        className={classnames(className, styles.container, baseClassName)}
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
          ref={composeRefs(ref, inputRef)}
          {...restProps}
        />
        <div className={thumbClassName} />
      </div>
    </>
  );
};
