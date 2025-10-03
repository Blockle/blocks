import {
  type AlignItemsMap,
  type Atoms,
  type JustifyContentMap,
  type MarginAtoms,
  type PaddingAtoms,
  alignItemsMap,
  justifyContentMap,
} from '@blockle/blocks-core';
import { Box } from '../Box/Box.js';

export type InlineProps = {
  alignX?: keyof JustifyContentMap;
  alignY?: keyof AlignItemsMap;
  tag?: 'div' | 'ul' | 'ol' | 'nav';
  children: React.ReactNode;
  className?: string;
  display?: Atoms['display'];
  spacing: Atoms['gap'];
  style?: React.CSSProperties;
} & MarginAtoms &
  PaddingAtoms;

export const Inline: React.FC<InlineProps> = ({
  alignX,
  alignY,
  tag: Tag = 'div',
  children,
  display = 'flex',
  spacing,
  ...props
}) => {
  return (
    <Box
      asChild
      display={display}
      gap={spacing}
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
