import {
  type AlignItemsMap,
  type Atoms,
  alignItemsMap,
  type JustifyContentMap,
  justifyContentMap,
} from '@blockle/blocks-core';

import { Box } from '../Box/Box.js';

export type InlineProps = {
  alignX?: keyof JustifyContentMap;
  alignY?: keyof AlignItemsMap;
  /**
   * With `ul` or `ol`, the list markers are dropped (`listStyle="none"`).
   * WebKit then no longer exposes the element as a list, so pass
   * `role="list"` when list semantics matter.
   */
  tag?: 'div' | 'ul' | 'ol' | 'nav';
  children: React.ReactNode;
  className?: string;
  gap: Atoms['gap'];
  style?: React.CSSProperties;
  role?: React.AriaRole;
} & Omit<Atoms, 'flexDirection' | 'gap'>;

export const Inline: React.FC<InlineProps> = ({
  alignX,
  alignY,
  tag: Tag = 'div',
  children,
  display = 'flex',
  gap,
  ...props
}) => {
  return (
    <Box
      asChild
      display={display}
      gap={gap}
      flexDirection="row"
      justifyContent={alignX ? justifyContentMap[alignX] : undefined}
      alignItems={alignY ? alignItemsMap[alignY] : undefined}
      flexWrap="wrap"
      listStyle={Tag === 'ul' || Tag === 'ol' ? 'none' : undefined}
      {...props}
    >
      <Tag>{children}</Tag>
    </Box>
  );
};
