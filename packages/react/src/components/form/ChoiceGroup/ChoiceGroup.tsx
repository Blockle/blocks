'use client';

import { classnames, type HTMLElementProps } from '@blockle/blocks-core';
import { useCallback, useId, useMemo, useState } from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import {
  ChoiceGroupContext,
  type ChoiceGroupVariant,
} from './ChoiceGroupContext.js';
import * as styles from './choiceGroup.css.js';

type ChoiceGroupLabel =
  | { 'aria-label': string; 'aria-labelledby'?: string }
  | { 'aria-label'?: string; 'aria-labelledby': string };

export type ChoiceGroupProps<V extends string = string> = {
  children?: React.ReactNode;
  /** The initially checked value when the group is uncontrolled */
  defaultValue?: V;
  /** Disables every Choice */
  disabled?: boolean;
  /** Radio name; the group generates one when left out */
  name?: string;
  /** Called with the value of the Choice that was checked */
  onValueChange?: (value: V) => void;
  ref?: React.Ref<HTMLDivElement>;
  required?: boolean;
  /** The checked value, for a controlled group */
  value?: V;
  /** `button` draws each Choice as a button, `swatch` as a colour swatch */
  variant?: ChoiceGroupVariant;
} & ChoiceGroupLabel &
  Omit<
    HTMLElementProps<HTMLDivElement>,
    | 'aria-label'
    | 'aria-labelledby'
    | 'children'
    | 'defaultValue'
    | 'name'
    | 'onChange'
    | 'ref'
    | 'required'
    | 'role'
    | 'value'
  >;

export function ChoiceGroup<V extends string = string>({
  children,
  className,
  defaultValue,
  disabled = false,
  name,
  onValueChange,
  required = false,
  value: controlledValue,
  variant = 'button',
  ...restProps
}: ChoiceGroupProps<V>) {
  const generatedName = useId();
  const [internalValue, setInternalValue] = useState<string | undefined>(
    defaultValue,
  );
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const rootClassName = useComponentStyles('choiceGroup', 'root');

  const setValue = useCallback(
    (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue as V);
    },
    [isControlled, onValueChange],
  );

  const context = useMemo(
    () => ({
      value,
      setValue,
      name: name ?? generatedName,
      variant,
      disabled,
      required,
    }),
    [value, setValue, name, generatedName, variant, disabled, required],
  );

  return (
    <ChoiceGroupContext.Provider value={context}>
      <div
        role="radiogroup"
        aria-required={required || undefined}
        aria-disabled={disabled || undefined}
        className={classnames(styles.root, rootClassName, className)}
        {...restProps}
      >
        {children}
      </div>
    </ChoiceGroupContext.Provider>
  );
}
