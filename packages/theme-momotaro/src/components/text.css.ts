import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
} from '@blockle/blocks-core';

export const text: ThemeComponentsStyles['text'] = makeComponentTheme('text', {
  compoundVariants: [
    {
      variants: { variant: 'paragraph' },
      style: atoms({
        fontSize: 'medium',
        color: 'text-700',
      }),
    },
    {
      variants: { variant: 'label' },
      style: atoms({
        fontWeight: 'medium',
        fontSize: 'medium',
        color: 'text-500',
      }),
    },
  ],
});
