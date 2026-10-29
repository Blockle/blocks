import {
  type AlignItemsMap,
  type Atoms,
  alignItemsMap,
  type HTMLElementProps,
} from '@blockle/blocks-core';

import { Box } from '../Box/Box.js';

export type StackProps = {
  alignX?: keyof AlignItemsMap;
  /**
   * Render the single child element instead of a `div`, with the layout
   * classes and attributes merged onto it. A `ul` or `ol` child keeps its
   * list markers unless `listStyle="none"` is passed. WebKit then no longer
   * exposes the element as a list, so pass `role="list"` when list
   * semantics matter.
   */
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLElement>;
  gap: Atoms['gap'];
  style?: React.CSSProperties;
} & Omit<Atoms, 'flexDirection' | 'gap'> &
  Omit<HTMLElementProps<HTMLElement>, 'children' | 'ref'>;

export const Stack: React.FC<StackProps> = ({
  asChild,
  display = 'flex',
  children,
  gap,
  alignX,
  ref,
  ...restProps
}) => {
  return (
    <Box
      asChild={asChild}
      display={display}
      gap={gap}
      flexDirection="column"
      alignItems={alignX ? alignItemsMap[alignX] : undefined}
      ref={ref as React.Ref<HTMLDivElement>}
      {...restProps}
    >
      {children}
    </Box>
  );
};
