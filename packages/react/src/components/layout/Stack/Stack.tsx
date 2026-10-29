import {
  type AlignItemsMap,
  type Atoms,
  alignItemsMap,
} from '@blockle/blocks-core';

import { Box } from '../Box/Box.js';

export type StackProps = {
  alignX?: keyof AlignItemsMap;
  /**
   * With `ul` or `ol`, the list markers are dropped (`listStyle="none"`).
   * WebKit then no longer exposes the element as a list, so pass
   * `role="list"` when list semantics matter.
   */
  tag?: 'div' | 'section' | 'ul' | 'ol';
  children: React.ReactNode;
  className?: string;
  gap: Atoms['gap'];
  style?: React.CSSProperties;
  role?: React.AriaRole;
  /**
   * Start prop is only valid when tag="ol"
   */
  start?: number;
} & Omit<Atoms, 'flexDirection' | 'gap'>;

export const Stack: React.FC<StackProps> = ({
  tag: Tag = 'div',
  display = 'flex',
  children,
  gap,
  alignX,
  ...restProps
}) => {
  if (import.meta.env.DEV && restProps.start !== undefined && Tag !== 'ol') {
    console.warn('Stack: "start" prop is only valid with tag="ol"');
  }

  return (
    <Box
      asChild
      display={display}
      gap={gap}
      flexDirection="column"
      alignItems={alignX ? alignItemsMap[alignX] : undefined}
      listStyle={Tag === 'ul' || Tag === 'ol' ? 'none' : undefined}
      {...restProps}
    >
      <Tag>{children}</Tag>
    </Box>
  );
};
