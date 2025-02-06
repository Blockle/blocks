import type { Sprinkles } from '@blockle/blocks-core';
import { Box } from '../Box/Box';
import { type AlignItemsMap, alignItemsMap } from './flexbox';

export type StackProps = {
  alignX?: keyof AlignItemsMap;
  tag?: 'div' | 'section' | 'ul' | 'ol';
  children: React.ReactNode;
  className?: string;
  space: Sprinkles['gap'];
  style?: React.CSSProperties;
  role?: React.AriaRole;
  /**
   * Start prop is only valid when tag="ol"
   */
  start?: number;
};

// & MarginAtoms & PaddingAtoms;

export const Stack: React.FC<StackProps> = ({
  tag: Tag = 'div',
  space = 'none',
  children,
  alignX = 'left',
  ...restProps
}) => {
  return (
    <Box
      asChild
      display="flex"
      flexDirection="column"
      gap={space}
      alignItems={alignItemsMap[alignX]}
      {...restProps}
    >
      <Tag>{children}</Tag>
    </Box>
  );
};
