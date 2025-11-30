import { type StyleRule, style } from '@vanilla-extract/css';

import type { ResponsiveValue } from '../../atoms/atomTypes.js';
import { minMediaQuery } from '../../css/breakpoint/breakpoint.js';
import { layers } from '../../css/layers.css.js';
import { classnames } from '../classnames/classnames.js';

type ResponsiveStyle<TKeys extends string | number> = Record<
  TKeys,
  [string, string, string, string]
>;

export function createResponsiveStyles<const TKeys extends string | number>(
  keys: TKeys[],
  styles: (key: TKeys) => StyleRule,
  layer = layers.molecule,
): ResponsiveStyle<TKeys> {
  const responsiveStyles = {} as ResponsiveStyle<TKeys>;

  for (const key of keys) {
    responsiveStyles[key] = [
      style({
        '@layer': {
          [layer]: styles(key),
        },
      }),
      style({
        '@layer': {
          [layer]: {
            '@media': {
              [minMediaQuery('tablet')]: styles(key),
            },
          },
        },
      }),
      style({
        '@layer': {
          [layer]: {
            '@media': {
              [minMediaQuery('desktop')]: styles(key),
            },
          },
        },
      }),
      style({
        '@layer': {
          [layer]: {
            '@media': {
              [minMediaQuery('wide')]: styles(key),
            },
          },
        },
      }),
    ];
  }

  return responsiveStyles;
}

export function getResponsiveStyle<
  TStyles extends ResponsiveStyle<TKeys>,
  TKeys extends string | number,
>(
  stylesMap: TStyles,
  value: ResponsiveValue<TKeys> | undefined,
): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return classnames(...value.map((v, index) => stylesMap[v][index]));
  } else {
    return stylesMap[value][0];
  }
}
