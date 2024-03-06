import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useComponentStyles } from '../../../hooks/useComponentStyles';
import { SliderTheme } from '../../../lib/theme/componentThemes';
import { classnames } from '../../../lib/utils/classnames';
import * as styles from './slider.css';
import { usePointerProgress } from './usePointerProgress';

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
};

function getBoundValue(newValue: number, min: number, max: number, step: number) {
  // Round to the nearest step
  let value = Math.round(newValue / step) * step;
  // Clamp the value to the min and max
  value = Math.max(min, Math.min(max, value));

  return value;
}

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  orientation = 'horizontal',
  defaultValue = 0,
  onChange,
  value,
  name,
  size,
  colorScheme,
  ...restProps
}) => {
  const [internValue, setInternValue] = useState(
    getBoundValue(value ?? defaultValue, min, max, step),
  );

  const baseClass = useComponentStyles('slider', { base: true, variants: { size, colorScheme } });
  const trackClass = useComponentStyles('slider', { track: true }, false);
  const filledTrackClass = useComponentStyles('slider', { filledTrack: true }, false);
  const thumbClass = useComponentStyles('slider', { thumb: true }, false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Update the internal value when the value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setInternValue(getBoundValue(value, min, max, step));
    }
  }, [value, min, max, step]);

  // Notify the parent component when the value changes
  useEffect(() => {
    if (onChange && internValue !== value) {
      onChange(internValue);
    }
  }, [internValue, onChange, value]);

  usePointerProgress({
    container: containerRef,
    orientation,
    onChange(progress) {
      if (orientation === 'vertical') {
        progress = 1 - progress;
      }

      setInternValue(getBoundValue(max * progress, min, max, step));
    },
  });

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      // prevent scrolling
      event.preventDefault();
      event.stopPropagation();

      const specialKey = ['PageUp', 'PageDown'];
      const stepModifier =
        event.shiftKey || specialKey.includes(event.key) ? (max - min) / 10 : step;

      if (event.key === 'ArrowLeft' || event.key === 'ArrowDown' || event.key === 'PageDown') {
        // decrease value
        return setInternValue((value) => getBoundValue(value - stepModifier, min, max, step));
      }

      if (event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'PageUp') {
        // increase value
        return setInternValue((value) => getBoundValue(value + stepModifier, min, max, step));
      }

      if (event.key === 'Home') {
        return setInternValue(min);
      }

      if (event.key === 'End') {
        return setInternValue(max);
      }
    },
    [max, min, step],
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
            inlineSize: `${(internValue / max) * 100}%`,
          }}
        />
      </div>
      <div
        className={classnames(styles.thumb, thumbClass)}
        tabIndex={0}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={internValue}
        aria-orientation={orientation}
        style={{
          [orientation === 'horizontal' ? 'insetInlineStart' : 'insetInlineEnd']:
            `${(internValue / max) * 100}%`,
        }}
        onKeyDown={onKeyDown}
        {...restProps}
      />
      <input type="hidden" name={name} value={internValue} />
    </div>
  );
};
