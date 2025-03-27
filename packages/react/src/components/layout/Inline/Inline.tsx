import {
  type AlignItemsMap,
  type JustifyContentMap,
  type MarginSprinkles,
  type PaddingSprinkles,
  type ResponsiveDisplayFlex,
  type Sprinkles,
  alignItemsMap,
  justifyContentMap,
} from '@blockle/blocks-core';
import { Box } from '../Box';

export type InlineProps = {
  alignX?: keyof JustifyContentMap;
  alignY?: keyof AlignItemsMap;
  tag?: 'div' | 'ul' | 'ol' | 'nav';
  children: React.ReactNode;
  className?: string;
  display?: ResponsiveDisplayFlex;
  spacing: Sprinkles['gap'];
  style?: React.CSSProperties;
} & MarginSprinkles &
  PaddingSprinkles;

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
