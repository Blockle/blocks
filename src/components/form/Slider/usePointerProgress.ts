import { useEffect } from 'react';

type PointerProgressOptions = {
  container: React.RefObject<HTMLElement>;
  target: React.RefObject<HTMLElement>;
  orientation: 'horizontal' | 'vertical';
  onChange(progress: number): void;
};

/**
 * Utility hook to track pointer events and calculate progress based on the pointer position.
 */
export function usePointerProgress({
  container,
  target,
  orientation,
  onChange,
}: PointerProgressOptions) {
  useEffect(() => {
    function pointerdown(event: PointerEvent) {
      event.preventDefault();
      event.stopPropagation();

      const element = target.current!;
      const containerElement = container.current;

      if (!containerElement) {
        return;
      }

      const containerRect = containerElement.getBoundingClientRect();
      const containerSize =
        orientation === 'horizontal' ? containerRect.width : containerRect.height;
      const containerStart = orientation === 'horizontal' ? containerRect.left : containerRect.top;

      const targetRect = element.getBoundingClientRect();
      const targetSize = orientation === 'horizontal' ? targetRect.width : targetRect.height;

      const pointermove = (event: PointerEvent) => {
        event.preventDefault();

        const position = orientation === 'horizontal' ? event.clientX : event.clientY;
        const progress =
          (position - containerStart - targetSize / 2) / (containerSize - targetSize);

        onChange(progress);
      };

      const pointerup = () => {
        document.removeEventListener('pointermove', pointermove);
        document.removeEventListener('pointerup', pointerup);
      };

      document.addEventListener('pointermove', pointermove);
      document.addEventListener('pointerup', pointerup);
    }

    if (target.current) {
      const element = target.current;

      element.addEventListener('pointerdown', pointerdown);

      return () => {
        element?.removeEventListener('pointerdown', pointerdown);
      };
    }
  }, [container, onChange, orientation, target]);
}
