'use client';

import type { ComponentThemes } from '@blockle/blocks-core';
import { useContext, useEffect, useId } from 'react';

import { ToastContext } from './ToastContext.js';

type ToastTheme = ComponentThemes['toast'];

export type ToastProps = {
  children?: React.ReactNode;
  duration?: number;
  intent?: ToastTheme['variants']['intent'];
  onRequestClose: () => void;
  open: boolean;
};

export const Toast: React.FC<ToastProps> = ({
  intent = 'neutral',
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: The dependencies are correct
  useEffect(() => {
    if (open) {
      context.add({
        id: toastId,
        intent,
        duration,
        children,
        onRequestClose,
      });
    } else {
      context.remove(toastId);
    }
  }, [duration, intent, open, children, onRequestClose]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: The dependencies are correct
  useEffect(() => {
    return () => {
      context.remove(toastId);
    };
  }, []);

  return null;
};
