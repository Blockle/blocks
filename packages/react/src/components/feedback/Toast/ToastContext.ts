'use client';

import { createContext } from 'react';

import type { AlertProps } from '../Alert/Alert.js';

export type Toast = {
  id: string;
  /**
   * Milliseconds before the toast removes itself. The countdown pauses while
   * any toast is hovered or focused, or the page is hidden. Leave it out to
   * keep the toast until it's closed, and always leave it out when the toast
   * contains an action, such as an "Undo" button.
   */
  duration?: number;
  children?: React.ReactNode;
  intent?: AlertProps['intent'];
};

export type ToastContextType = {
  add: (toast: Toast) => void;
  remove: (id: string) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);
