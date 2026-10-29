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
   * Render the single child element instead of `tag`, with the layout
   * classes and attributes merged onto it. `tag` is then ignored, and so is
   * its list-marker reset.
   */
  asChild?: boolean;
  /**
   * With `ul` or `ol`, the list markers are dropped (`listStyle="none"`).
   * WebKit then no longer exposes the element as a list, so pass
   * `role="list"` when list semantics matter. To show markers, pass a
   * `className` that sets `list-style` and `padding-inline-start`.
   * With `asChild`, markers depend on the child's own element and styles.
   */
  tag?: 'div' | 'ul' | 'ol' | 'nav';
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
  tag: Tag = 'div',
  children,
  display = 'flex',
  gap,
  ref,
  ...props
}) => {
  const isList = !asChild && (Tag === 'ul' || Tag === 'ol');

  return (
    <Box
      asChild
      display={display}
      gap={gap}
      flexDirection="row"
      justifyContent={alignX ? justifyContentMap[alignX] : undefined}
      alignItems={alignY ? alignItemsMap[alignY] : undefined}
      flexWrap="wrap"
      listStyle={isList ? 'none' : undefined}
      ref={ref as React.Ref<HTMLDivElement>}
      {...props}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Box>
  );
};
