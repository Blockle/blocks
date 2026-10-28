'use client';

import {
  type Atoms,
  atomicProperties,
  type ComponentThemes,
} from '@blockle/blocks-core';

import { useComponentStyles } from '../../hooks/useComponentStyles/useComponentStyles.js';

export type TextColorRole = ComponentThemes['text']['variants']['color'];

export type TextColor = TextColorRole | Atoms['color'];

/**
 * Splits the `color` prop of Text and Heading: a Color role (`muted`) is
 * styled by the component theme and follows the Color mode, anything else is a
 * Palette atom that is passed on to Box. Without a color, `text.default` applies.
 */
export function useTextColor(
  component: 'text' | 'heading',
  color: TextColor,
): { className: string; atomColor: Atoms['color'] } {
  const isAtomColor =
    color !== undefined && color in atomicProperties.color.values;

  const className = useComponentStyles(
    component,
    {
      root: true,
      variants: { color: isAtomColor ? undefined : (color as TextColorRole) },
    },
    !isAtomColor,
  );

  return {
    className,
    atomColor: isAtomColor ? (color as Atoms['color']) : undefined,
  };
}
