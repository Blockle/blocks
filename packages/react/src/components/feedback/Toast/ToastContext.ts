export type Toast = {
  id: string;
  intent: 'neutral' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onRequestClose: () => void;
  children?: React.ReactNode;
};

export type ToastContextType = {
  add: (toast: Toast) => void;
  remove: (id: string) => void;
  toasts: Toast[];
};

import { createContext } from 'react';

export const ToastContext = createContext<ToastContextType | null>(null);
