'use client';

import { createContext, useContext } from 'react';

export type ChoiceGroupVariant = 'button' | 'swatch';

export type ChoiceGroupContextValue = {
  /** The checked value, or undefined when nothing is checked */
  value: string | undefined;
  setValue: (value: string) => void;
  /** The radio name shared by every Choice, so they form one native group */
  name: string;
  variant: ChoiceGroupVariant;
  disabled: boolean;
  required: boolean;
};

export const ChoiceGroupContext = createContext<ChoiceGroupContextValue | null>(
  null,
);

export function useChoiceGroupContext(part: string): ChoiceGroupContextValue {
  const context = useContext(ChoiceGroupContext);

  if (!context) {
    throw new Error(`${part} must be rendered inside ChoiceGroup`);
  }

  return context;
}
