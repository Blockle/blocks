import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
} from '@blockle/blocks-core';

export const heading: ThemeComponentsStyles['heading'] = makeComponentTheme(
  'heading',
  {
    compoundVariants: [
      {
        variants: { variant: 'title' },
        // TODO How to override css properties here?
        // <Heading variant="title" fontSize="small" /> - this breaks now, fontsize cannot be overridden
        style: atoms({
          fontWeight: 'bold',
          fontSize: 'large',
          color: 'text-800',
        }),
      },
      {
        variants: { variant: 'subtitle' },
        style: atoms({
          fontWeight: 'medium',
          fontSize: 'medium',
          color: 'text-500',
        }),
      },
    ],
  },
);
