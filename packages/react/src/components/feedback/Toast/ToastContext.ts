import { createContext } from 'react';

import type { AlertProps } from '../Alert/Alert.js';

export type Toast = {
  id: string;
  duration?: number;
  children?: React.ReactNode;
  intent?: AlertProps['intent'];
};

export type ToastContextType = {
  add: (toast: Toast) => void;
  remove: (id: string) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);
