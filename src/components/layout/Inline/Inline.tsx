import type {
  Atoms,
  MarginAtoms,
  PaddingAtoms,
  ResponsiveDisplayFlex,
} from '../../../lib/css/atoms';
import {
  type AlignItemsMap,
  type JustifyContentMap,
  alignItemsMap,
  justifyContentMap,
} from '../../../lib/css/flexbox/flexbox';
import { Box } from '../Box';

export type InlineProps = {
  alignX?: keyof JustifyContentMap;
  alignY?: keyof AlignItemsMap;
  tag?: 'div' | 'ul' | 'ol' | 'nav';
  children: React.ReactNode;
  className?: string;
  display?: ResponsiveDisplayFlex;
  space: Atoms['gap'];
  style?: React.CSSProperties;
} & MarginAtoms &
  PaddingAtoms;

export const Inline: React.FC<InlineProps> = ({
  alignX,
  alignY,
  tag: Tag = 'div',
  children,
  display = 'flex',
  space,
  ...props
}) => {
  return (
    <Box
      asChild
      display={display}
      gap={space}
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
