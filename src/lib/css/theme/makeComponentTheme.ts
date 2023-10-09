import { ComponentThemesMap } from './componentThemes';

type Theme = {
  type: string;
  variants?: Record<string, string | boolean>;
};

export type CreateComponentTheme<T extends Theme> = {
  type: T['type'];
  base?: string;
  variants?: {
    [VariantGroup in keyof T['variants']]?: T['variants'][VariantGroup] extends string
      ? {
          [Variant in T['variants'][VariantGroup]]?: string;
        }
      : string;
  };
  compoundVariants?: Array<{
    style: string;
    variants: {
      [VariantGroup in keyof T['variants']]?: T['variants'][VariantGroup] extends string
        ? T['variants'][VariantGroup]
        : boolean;
    };
  }>;
  defaultVariants?: {
    [VariantGroup in keyof T['variants']]?: T['variants'][VariantGroup] extends string
      ? T['variants'][VariantGroup]
      : boolean;
  };
};

export type CreateThemeProps<T extends Theme> = {
  [K in keyof T['variants']]?: T['variants'][K] extends string ? T['variants'][K] : boolean;
} & {
  type: T['type'];
  base?: boolean;
};

export const makeComponentTheme = <
  T extends keyof ComponentThemesMap,
  const O extends ComponentThemesMap[T],
>(
  name: T,
  options: O,
) => options;
