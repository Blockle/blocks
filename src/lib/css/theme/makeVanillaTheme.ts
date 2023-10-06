import { BlocksTokens } from './tokenType';

export const makeVanillaTheme = (tokens: BlocksTokens) => {
  return {
    space: tokens.space as Record<keyof typeof tokens.space, string>,
    borderRadius: tokens.border.radius as Record<keyof typeof tokens.border.radius, string>,
    color: tokens.color as Record<keyof typeof tokens.color, string>,
    borderWidth: tokens.border.width as Record<keyof typeof tokens.border.width, string>,
    fontFamily: tokens.typography.fontFamily as Record<
      keyof typeof tokens.typography.fontFamily,
      string
    >,
    fontSize: tokens.typography.fontSize as Record<keyof typeof tokens.typography.fontSize, string>,
    fontWeight: tokens.typography.fontWeight as unknown as Record<
      keyof typeof tokens.typography.fontWeight,
      string
    >,
    lineHeight: tokens.typography.lineHeight as Record<
      keyof typeof tokens.typography.lineHeight,
      string
    >,
    transition: tokens.transition as Record<keyof typeof tokens.transition, string>,
    shadow: tokens.shadow as Record<keyof typeof tokens.shadow, string>,
    focus: {
      boxShadow: tokens.focus.boxShadow,
    },
  };
};
