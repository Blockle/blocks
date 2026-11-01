'use client';

import type { HTMLElementProps } from '@blockle/blocks-core';
import { useCallback, useId, useMemo, useState } from 'react';

import { TabsContext } from './TabsContext.js';

export type TabsProps = {
  children?: React.ReactNode;
  /** The initially selected tab when the selection is uncontrolled */
  defaultValue?: string;
  /** Called with the value of the tab that is selected */
  onValueChange?: (value: string) => void;
  ref?: React.Ref<HTMLDivElement>;
  /** The selected tab, for a controlled selection */
  value?: string;
} & Omit<
  HTMLElementProps<HTMLDivElement>,
  'children' | 'defaultValue' | 'ref' | 'value'
>;

export const Tabs: React.FC<TabsProps> = ({
  children,
  defaultValue,
  onValueChange,
  value: controlledValue,
  ...restProps
}) => {
  const baseId = useId();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const setValue = useCallback(
    (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange],
  );

  const context = useMemo(
    () => ({ value, setValue, baseId }),
    [value, setValue, baseId],
  );

  return (
    <TabsContext.Provider value={context}>
      <div {...restProps}>{children}</div>
    </TabsContext.Provider>
  );
};
