'use client';

import { useContext, useEffect, useId } from 'react';

import { ToastContext } from './ToastContext.js';

export type ToastProps = {
  children?: React.ReactNode;
  duration?: number;
  onRequestClose: () => void;
  open: boolean;
};

export const Toast: React.FC<ToastProps> = ({
  children,
  duration,
  onRequestClose,
  open,
}) => {
  const toastId = useId();
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('Toast must be used within a ToastProvider');
  }

  useEffect(() => {
    if (open) {
      context.add({
        id: toastId,
        duration,
        children,
        onRequestClose,
      });
    } else {
      context.remove(toastId);
    }
  }, [duration, open, children, onRequestClose, context, toastId]);

  useEffect(() => {
    return () => {
      context.remove(toastId);
    };
  }, [context, toastId]);

  return null;
};
