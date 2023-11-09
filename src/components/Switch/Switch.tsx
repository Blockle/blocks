import { forwardRef, useRef } from 'react';
import { composeRefs } from '../../lib/react/react';
import { classnames } from '../../lib/utils/classnames';
import { HTMLElementProps } from '../../lib/utils/utils';
import * as styles from './switch.css';

export type SwitchProps = HTMLElementProps<HTMLInputElement>;

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { className, ...restProps },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {/* Note: no tabindex needed on div, Safari needs special setting enabled for keyboard navigation.. */}
      <div
        className={classnames(className, styles.container)}
        onClick={() => {
          // .click() changes the checked state of the input and triggers onChange
          // Workaround for react state handling
          if (inputRef.current) {
            inputRef.current.click();
          }
        }}
        onKeyDown={(event) => {
          if (event.key === ' ') {
            event.preventDefault();

            // .click() changes the checked state of the input and triggers onChange
            // Workaround for react state handling
            if (inputRef.current) {
              inputRef.current.click();
            }
          }
        }}
      >
        <input
          ref={composeRefs(ref, inputRef)}
          type="checkbox"
          className={styles.input}
          {...restProps}
        />
        <div className={styles.slider}></div>
      </div>
    </>
  );
});
