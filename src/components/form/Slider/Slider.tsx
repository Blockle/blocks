import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useComponentStyles } from '../../../hooks/useComponentStyles';
import { classnames } from '../../../lib/utils/classnames';
import * as styles from './slider.css';
import { usePointerProgress } from './usePointerProgress';

export type SliderProps = {
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
};

function getBoundValue(newValue: number, min: number, max: number, step: number) {
  let value = Math.round(newValue / step) * step;
  value = Math.max(min, Math.min(max, value));

  // Round to the nearest step
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
  ...restProps
}) => {
  const [internValue, setInternValue] = useState(
    getBoundValue(value ?? defaultValue, min, max, step),
  );

  const baseClass = useComponentStyles('slider', { base: true }, false);
  const trackClass = useComponentStyles('slider', { track: true }, false);
  const filledTrackClass = useComponentStyles('slider', { filledTrack: true }, false);
  const thumbClass = useComponentStyles('slider', { thumb: true }, false);

  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setInternValue(getBoundValue(value, min, max, step));
    }
  }, [value, min, max, step]);

  useEffect(() => {
    if (onChange && internValue !== value) {
      onChange(internValue);
    }
  }, [internValue, onChange, value]);

  usePointerProgress({
    container: containerRef,
    target: thumbRef,
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
        ref={thumbRef}
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
    </div>
  );
};

// export const Example = () => {
//   return (
//     <Slider>
//       <SliderThumb />
//     </Slider>
//   );
// };
