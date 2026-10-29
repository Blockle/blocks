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
   * Render the single child element instead of `tag`, with the layout
   * classes and attributes merged onto it. `tag` is then ignored, and so are
   * its defaults: the list-marker reset and the `start` check.
   */
  asChild?: boolean;
  /**
   * With `ul` or `ol`, the list markers are dropped (`listStyle="none"`).
   * WebKit then no longer exposes the element as a list, so pass
   * `role="list"` when list semantics matter. To show markers, pass a
   * `className` that sets `list-style` and `padding-inline-start`.
   * With `asChild`, markers depend on the child's own element and styles.
   */
  tag?: 'div' | 'section' | 'ul' | 'ol';
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLElement>;
  gap: Atoms['gap'];
  style?: React.CSSProperties;
  /**
   * Start prop is only valid when tag="ol". The numbering only shows once
   * markers are restored, see `tag`.
   */
  start?: number;
} & Omit<Atoms, 'flexDirection' | 'gap'> &
  Omit<HTMLElementProps<HTMLElement>, 'children' | 'ref' | 'start'>;

export const Stack: React.FC<StackProps> = ({
  asChild,
  tag: Tag = 'div',
  display = 'flex',
  children,
  gap,
  alignX,
  ref,
  ...restProps
}) => {
  if (
    import.meta.env.DEV &&
    !asChild &&
    restProps.start !== undefined &&
    Tag !== 'ol'
  ) {
    console.warn('Stack: "start" prop is only valid with tag="ol"');
  }

  const isList = !asChild && (Tag === 'ul' || Tag === 'ol');

  return (
    <Box
      asChild
      display={display}
      gap={gap}
      flexDirection="column"
      alignItems={alignX ? alignItemsMap[alignX] : undefined}
      listStyle={isList ? 'none' : undefined}
      ref={ref as React.Ref<HTMLDivElement>}
      {...restProps}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Box>
  );
};
