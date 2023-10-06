import { ComponentThemes } from './componentThemes';

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
      [VariantGroup in keyof T['variants']]?: T['variants'][VariantGroup];
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

export const makeComponentTheme = <T extends ComponentThemes>(options: T) => options;
