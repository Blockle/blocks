'use client';

import { useEffect, useLayoutEffect } from 'react';

/**
 * useLayoutEffect is not avaible on server side use useEffect instead.
 */
export const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;
