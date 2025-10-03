'use client';

import {
  type ComponentThemes,
  classnames,
  getBoundValue,
  roundToPrecision,
} from '@blockle/blocks-core';
import type React from 'react';
import { useCallback, useRef } from 'react';
import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { useControlledValue } from '../../../hooks/useControlledValue/useControlledValue.js';
import * as styles from './slider.css.js';
import { usePointerProgress } from './usePointerProgress.js';

// Supported keys for keyboard navigation of the slider
const usableKeys = new Set([
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
  'PageUp',
  'PageDown',
  'Home',
  'End',
]);

type SliderTheme = ComponentThemes['slider'];

export type SliderProps = {
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  orientation?: 'horizontal' | 'vertical';
  'aria-labelledby'?: string;
  'aria-valuetext'?: string;
  'aria-label'?: string;
  size: SliderTheme['variants']['size'];
  colorScheme: SliderTheme['variants']['colorScheme'];
  disabled?: boolean;
  // TODO Precision?
  precision?: number;
};

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 0.01,
  orientation = 'horizontal',
  defaultValue = 0,
  onChange,
  value,
  name,
  size,
  colorScheme,
  disabled,
  precision = 2,
  ...restProps
}) => {
  const baseClass = useComponentStyles('slider', {
    base: true,
    variants: { size, colorScheme, disabled },
  });
  const trackClass = useComponentStyles('slider', { track: true }, false);
  const filledTrackClass = useComponentStyles(
    'slider',
    { filledTrack: true },
    false,
  );
  const thumbClass = useComponentStyles('slider', { thumb: true }, false);

  const containerRef = useRef<HTMLDivElement>(null);

  const [currentValue, setValue] = useControlledValue({
    defaultValue,
    value,
    onChange,
    transformValue: (value) =>
      roundToPrecision(getBoundValue(value, min, max, step), precision),
  });

  usePointerProgress({
    container: containerRef,
    orientation,
    onChange(progress) {
      if (orientation === 'vertical') {
        progress = 1 - progress;
      }

      setValue(max * progress);
    },
  });

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      // Only handle supported keys
      if (!usableKeys.has(event.key)) {
        return;
      }

      // prevent scrolling
      event.preventDefault();
      event.stopPropagation();

      const specialKey = ['PageUp', 'PageDown'];
      const stepModifier =
        event.shiftKey || specialKey.includes(event.key)
          ? (max - min) / 10
          : step;

      if (
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowDown' ||
        event.key === 'PageDown'
      ) {
        // decrease value
        return setValue(currentValue - stepModifier);
      }

      if (
        event.key === 'ArrowRight' ||
        event.key === 'ArrowUp' ||
        event.key === 'PageUp'
      ) {
        // increase value
        return setValue(currentValue + stepModifier);
      }

      if (event.key === 'Home') {
        return setValue(min);
      }

      if (event.key === 'End') {
        return setValue(max);
      }
    },
    [max, min, step, setValue, currentValue],
  );

  return (
    <div
      ref={containerRef}
      className={classnames(
        styles.container,
        orientation === 'vertical' ? styles.containerVertical : '',
        baseClass,
      )}
    >
      <div className={classnames(styles.track, trackClass)}>
        <div
          className={classnames(styles.filledTrack, filledTrackClass)}
          style={{
            inlineSize: `${(currentValue / max) * 100}%`,
          }}
        />
      </div>
      <button
        type="button"
        className={classnames(styles.thumb, thumbClass)}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={currentValue}
        aria-orientation={orientation}
        style={{
          [orientation === 'horizontal'
            ? 'insetInlineStart'
            : 'insetInlineEnd']: `${(currentValue / max) * 100}%`,
        }}
        onKeyDown={onKeyDown}
        {...restProps}
      />
      <input
        type="hidden"
        disabled={disabled}
        name={name}
        value={currentValue}
      />
    </div>
  );
};
