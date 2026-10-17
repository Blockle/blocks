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
  tag?: 'div' | 'ul' | 'ol' | 'nav';
  children: React.ReactNode;
  className?: string;
  gap: Atoms['gap'];
  style?: React.CSSProperties;
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
      {...props}
    >
      <Tag>{children}</Tag>
    </Box>
  );
};
