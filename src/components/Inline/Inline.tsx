import { Atoms, MarginAndPaddingAtoms, ResponsiveDisplayFlex } from '../../lib/css/atoms';
import {
  AlignItemsMap,
  JustifyContentMap,
  alignItemsMap,
  justifyContentMap,
} from '../../lib/css/flexbox/flexbox';
import { Box } from '../Box/Box';

export type InlineProps = {
  alignX?: keyof JustifyContentMap;
  alignY?: keyof AlignItemsMap;
  as?: 'div' | 'ul' | 'ol' | 'nav';
  children: React.ReactNode;
  className?: string;
  display?: ResponsiveDisplayFlex;
  gap: Atoms['gap'];
  style?: React.CSSProperties;
} & MarginAndPaddingAtoms;

export const Inline: React.FC<InlineProps> = ({
  alignX,
  alignY,
  as = 'div',
  children,
  display = 'flex',
  gap,
  ...props
}) => {
  return (
    <Box
      as={as}
      display={display}
      gap={gap}
      flexDirection="row"
      justifyContent={alignX ? justifyContentMap[alignX] : undefined}
      alignItems={alignY ? alignItemsMap[alignY] : undefined}
      flexWrap="wrap"
      {...props}
    >
      {children}
    </Box>
  );
};
