import {
  type AlignItemsMap,
  type Atoms,
  alignItemsMap,
  type HTMLElementProps,
  type JustifyContentMap,
  justifyContentMap,
} from '@blockle/blocks-core';

import { Box } from '../Box/Box.js';

export type InlineProps = {
  alignX?: keyof JustifyContentMap;
  alignY?: keyof AlignItemsMap;
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

export const Inline: React.FC<InlineProps> = ({
  alignX,
  alignY,
  asChild,
  children,
  display = 'flex',
  gap,
  ref,
  ...props
}) => {
  return (
    <Box
      asChild={asChild}
      display={display}
      gap={gap}
      flexDirection="row"
      justifyContent={alignX ? justifyContentMap[alignX] : undefined}
      alignItems={alignY ? alignItemsMap[alignY] : undefined}
      flexWrap="wrap"
      ref={ref as React.Ref<HTMLDivElement>}
      {...props}
    >
      {children}
    </Box>
  );
};
