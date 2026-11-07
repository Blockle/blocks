'use client';

import {
  choiceGroupVars,
  classnames,
  getNameFromVanillaCSSVar,
} from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { useChoiceGroupContext } from './ChoiceGroupContext.js';
import * as styles from './choiceGroup.css.js';

type ChoiceLabel =
  | {
      /** The visible label */
      children: React.ReactNode;
      'aria-label'?: string;
    }
  | {
      children?: undefined;
      /** Names an icon-only or swatch Choice */
      'aria-label': string;
    };

export type ChoiceProps<V extends string = string> = {
  /** Any CSS colour, painted by the `swatch` variant */
  color?: string;
  className?: string;
  disabled?: boolean;
  ref?: React.Ref<HTMLInputElement>;
  style?: React.CSSProperties;
  value: V;
} & ChoiceLabel;

/**
 * One option of a ChoiceGroup. Pass the group's value union as the type
 * argument, `<Choice<Color> value="teal" />`, to check `value` against it.
 */
export function Choice<V extends string = string>({
  children,
  className,
  color,
  disabled = false,
  ref,
  style,
  value,
  'aria-label': ariaLabel,
}: ChoiceProps<V>) {
  const group = useChoiceGroupContext('Choice');
  const itemClassName = useComponentStyles('choiceGroup', 'item', {
    variant: group.variant,
  });
  const swatchClassName = useComponentStyles('choiceGroup', 'swatch');

  const itemStyle =
    color === undefined
      ? style
      : {
          ...style,
          [getNameFromVanillaCSSVar(choiceGroupVars.color)]: color,
        };

  return (
    <label
      className={classnames(styles.item, itemClassName, className)}
      style={itemStyle}
    >
      <input
        ref={ref}
        type="radio"
        className={styles.input}
        name={group.name}
        value={value}
        checked={group.value === value}
        disabled={group.disabled || disabled}
        required={group.required}
        aria-label={ariaLabel}
        onChange={() => group.setValue(value)}
      />
      {group.variant === 'swatch' ? (
        <span className={classnames(styles.swatch, swatchClassName)} />
      ) : null}
      {children}
    </label>
  );
}
