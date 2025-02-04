import { createContext, useContext, useEffect } from 'react';

type DialogContextValue = {
  setEnabled: (active: boolean) => void;
};

export const DialogContext = createContext<DialogContextValue | undefined>(
  undefined,
);

export const useNestedDialog = (open: boolean): boolean => {
  const parentDialog = useContext(DialogContext);

  useEffect(() => {
    if (!parentDialog || !open) {
      return;
    }

    parentDialog.setEnabled(false);

    return () => {
      parentDialog.setEnabled(true);
    };
  }, [parentDialog, open]);

  return !!parentDialog;
};
