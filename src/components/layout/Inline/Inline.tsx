import { Atoms, MarginAtoms, PaddingAtoms, ResponsiveDisplayFlex } from '../../../lib/css/atoms';
import {
  AlignItemsMap,
  JustifyContentMap,
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
