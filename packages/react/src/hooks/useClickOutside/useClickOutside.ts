'use client';

import type React from 'react';
import { useEffect, useRef } from 'react';

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.js';

type UseClickOutsideOptions = {
  enabled?: boolean;
};

export const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  onClickOutside: () => void,
  { enabled = true }: UseClickOutsideOptions = {},
): void => {
  // Read the latest callback from a ref, so a new inline callback on each
  // render keeps the listeners, and the state of a press, in place
  const onClickOutsideRef = useRef(onClickOutside);

  useIsomorphicLayoutEffect(() => {
    onClickOutsideRef.current = onClickOutside;
  }, [onClickOutside]);

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
      // A click without a pointer press (detail 0), such as a keyboard
      // activation, ignores the state a stopped or cancelled press left behind
      const fromPointer = event.detail > 0;
      const inside = (fromPointer && pointerInside) || isInside(event);

      pointerInside = false;

      if (ref.current && !inside) {
        onClickOutsideRef.current();
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
  }, [ref, enabled]);
};
