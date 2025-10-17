import type { ThemeTokens } from '../config/themeTokens.js';
import type { RecordToUnionPath } from '../utils/typing/helpers.js';

const ColorDelimiter = '-' as const;

type ColorUnion = RecordToUnionPath<
  ThemeTokens['color'],
  typeof ColorDelimiter
>;

export const makeVanillaTheme = (tokens: ThemeTokens) => {
  const color = {} as Record<ColorUnion, string>;

  for (const [colorName, colorValue] of Object.entries(tokens.color)) {
    if (typeof colorValue === 'string' || colorValue === null) {
      color[colorName as ColorUnion] = colorValue;
      continue;
    }

    for (const [shade, shadeValue] of Object.entries(colorValue)) {
      color[`${colorName}${ColorDelimiter}${shade}` as ColorUnion] = shadeValue;
    }
  }

  return {
    space: tokens.spacing as Record<keyof typeof tokens.spacing, string>,
    borderRadius: tokens.border.radius as Record<
      keyof typeof tokens.border.radius,
      string
    >,
    color,
    borderWidth: tokens.border.width as Record<
      keyof typeof tokens.border.width,
      string
    >,
    fontFamily: tokens.typography.fontFamily as Record<
      keyof typeof tokens.typography.fontFamily,
      string
    >,
    fontSize: tokens.typography.fontSize as Record<
      keyof typeof tokens.typography.fontSize,
      string
    >,
    fontWeight: tokens.typography.fontWeight as unknown as Record<
      keyof typeof tokens.typography.fontWeight,
      string
    >,
    lineHeight: tokens.typography.lineHeight as Record<
      keyof typeof tokens.typography.lineHeight,
      string
    >,
    transition: tokens.transition as Record<
      keyof typeof tokens.transition,
      string
    >,
    shadow: tokens.shadow as Record<keyof typeof tokens.shadow, string>,
    focus: {
      boxShadow: tokens.focus.boxShadow,
    },
  };
};
