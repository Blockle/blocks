import { useCallback, useContext, useMemo } from 'react';

import { type Toast, ToastContext } from './ToastContext.js';

export type ToastProps = Omit<Toast, 'id'> & {
  id?: Toast['id'];
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('Toast must be used within a ToastProvider');
  }

  const showToast = useCallback(
    (props: ToastProps) => {
      context.add({
        children: props.children,
        duration: props.duration,
        id: props.id ?? crypto.randomUUID(),
        intent: props.intent,
      });
    },
    [context],
  );

  const removeToast = useCallback(
    (id: string) => {
      context.remove(id);
    },
    [context],
  );

  return useMemo(
    () => ({
      showToast,
      removeToast,
    }),
    [showToast, removeToast],
  );
};
