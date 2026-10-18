import type {
  ColorRoles,
  PaletteTokens,
  SchemeTokens,
  ThemeTokens,
} from '../config/themeTokens.js';
import type { RecordLike, RecordToUnionPath } from '../utils/typing/helpers.js';

const ColorDelimiter = '-' as const;

type PaletteUnion = RecordToUnionPath<PaletteTokens, typeof ColorDelimiter>;

export type ThemeSchemes = {
  light: SchemeTokens;
  dark: SchemeTokens;
};

export type VanillaThemeInput = {
  tokens: ThemeTokens;
  palette: PaletteTokens;
  schemes: ThemeSchemes;
};

function addZeroToken<T extends RecordLike>(obj: T) {
  return {
    0: '0px',
    ...obj,
  } as Record<keyof T | 0, string>;
}

function flattenPalette(palette: PaletteTokens) {
  const flat = {} as Record<PaletteUnion, string>;

  for (const [colorName, colorValue] of Object.entries(palette)) {
    if (typeof colorValue === 'string' || colorValue === null) {
      flat[colorName as PaletteUnion] = colorValue;
      continue;
    }

    for (const [shade, shadeValue] of Object.entries(colorValue)) {
      flat[`${colorName}${ColorDelimiter}${shade}` as PaletteUnion] =
        shadeValue;
    }
  }

  return flat;
}

function makeSchemeValues(scheme: SchemeTokens) {
  return {
    color: { ...scheme.color } as Record<keyof ColorRoles, string>,
    shadow: scheme.shadow as Record<keyof SchemeTokens['shadow'], string>,
  };
}

/**
 * Maps theme input to CSS variable values.
 *
 * - `base` holds every value: scheme-independent tokens, the Palette and the light scheme.
 * - `dark` holds only the scheme-dependent values (Color roles and shadows).
 */
export const makeVanillaTheme = ({
  tokens,
  palette,
  schemes,
}: VanillaThemeInput) => {
  const light = makeSchemeValues(schemes.light);
  const dark = makeSchemeValues(schemes.dark);

  return {
    base: {
      space: addZeroToken(tokens.spacing),
      borderRadius: addZeroToken({
        ...tokens.border.radius,
        full: '9999px',
      }),
      color: light.color,
      palette: flattenPalette(palette),
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
      letterSpacing: tokens.typography.letterSpacing as Record<
        keyof typeof tokens.typography.letterSpacing,
        string
      >,
      transition: tokens.transition as Record<
        keyof typeof tokens.transition,
        string
      >,
      shadow: light.shadow,
    },
    dark,
  };
};
