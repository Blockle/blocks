export type Toast = {
  id: string;
  duration?: number;
  onRequestClose: () => void;
  children?: React.ReactNode;
};

export type ToastContextType = {
  add: (toast: Toast) => void;
  remove: (id: string) => void;
};

import { createContext } from 'react';

export const ToastContext = createContext<ToastContextType | null>(null);
