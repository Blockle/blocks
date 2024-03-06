import { useEffect } from 'react';

type PointerProgressOptions = {
  container: React.RefObject<HTMLElement>;
  orientation: 'horizontal' | 'vertical';
  onChange(progress: number): void;
};

export function getProgress(event: PointerEvent, rect: DOMRect): [x: number, y: number] {
  const { clientX, clientY } = event;
  const { width, height, left, top } = rect;

  const x = (clientX - left) / width;
  const y = (clientY - top) / height;

  return [x, y];
}

/**
 * Utility hook to track pointer events and calculate progress based on the pointer position.
 */
export function usePointerProgress({ container, orientation, onChange }: PointerProgressOptions) {
  useEffect(() => {
    const element = container.current;

    function pointerdown(event: PointerEvent) {
      event.preventDefault();
      event.stopPropagation();

      if (!element) {
        return;
      }

      const containerRect = element.getBoundingClientRect();
      const axisIndex = orientation === 'horizontal' ? 0 : 1;
      const progress = getProgress(event, containerRect);

      onChange(progress[axisIndex]);

      const pointermove = (event: PointerEvent) => {
        event.preventDefault();

        const progress = getProgress(event, containerRect);

        onChange(progress[axisIndex]);
      };

      const pointerup = () => {
        document.removeEventListener('pointermove', pointermove);
        document.removeEventListener('pointerup', pointerup);
      };

      document.addEventListener('pointermove', pointermove);
      document.addEventListener('pointerup', pointerup);
    }

    if (!element) {
      return;
    }

    element.addEventListener('pointerdown', pointerdown);

    return () => {
      element.removeEventListener('pointerdown', pointerdown);
    };
  }, [container, onChange, orientation]);
}
