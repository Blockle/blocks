'use client';

import type React from 'react';
import { useEffect } from 'react';

type UseClickOutsideOptions = {
  enabled?: boolean;
};

export const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  onClickOutside: () => void,
  { enabled = true }: UseClickOutsideOptions = {},
): void => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Whether the pointer of the current click was pressed or released inside
    let pointerInside = false;

    // The path is fixed at dispatch, so it still holds a target that an
    // event handler removed from the DOM
    const isInside = (event: Event) =>
      ref.current !== null && event.composedPath().includes(ref.current);

    const onPointerDown = (event: PointerEvent) => {
      pointerInside = isInside(event);
    };

    const onPointerUp = (event: PointerEvent) => {
      pointerInside ||= isInside(event);
    };

    const onClick = (event: MouseEvent) => {
      const inside = pointerInside || isInside(event);

      pointerInside = false;

      if (ref.current && !inside) {
        onClickOutside();
      }
    };

    // Wait for the next frame to attach the event listeners
    // This is to prevent the click event that triggered this hook from being caught
    const rafId = requestAnimationFrame(() => {
      document.addEventListener('pointerdown', onPointerDown, true);
      document.addEventListener('pointerup', onPointerUp, true);
      document.addEventListener('click', onClick);
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('pointerup', onPointerUp, true);
      document.removeEventListener('click', onClick);
    };
  }, [ref, onClickOutside, enabled]);
};
