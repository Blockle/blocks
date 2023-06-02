import { Atoms, MarginAndPaddingAtoms, ResponsiveDisplayFlex } from '../../lib/css/atoms';
import {
  AlignItemsMap,
  JustifyContentMap,
  alignItemsMap,
  justifyContentMap,
} from '../../lib/css/flexbox/flexbox';
import { Box } from '../Box/Box';

export type InlineProps = {
  as?: 'div' | 'ul' | 'ol' | 'nav';
  children: React.ReactNode;
  alignX?: keyof JustifyContentMap;
  alignY?: keyof AlignItemsMap;
  gap: Atoms['gap'];
  display?: ResponsiveDisplayFlex;
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
