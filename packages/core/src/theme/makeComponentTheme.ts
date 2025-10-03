/**
 * Helper generic to convert a component theme to a styles object
 *
 * export type ThemeIn = {
 *  base: string;
 *  variants: {
 *    intent: 'neutral' | 'danger';
 *    level?: 1 | 2;
 *    loading: boolean;
 *  };
 * };
 * export type ThemeOut = {
 *  base: string;
 *  variants: {
 *    intent: Record<'neutral' | 'danger', string>;
 *    level?: Record<1 | 2, string>;
 *    loading: string;
 *  };
 * };
 */

import type { ComponentThemes } from '../config/componentThemes.js';
import type { RecordLike } from '../utils/typing/helpers.js';

// string | number is used to define objects
// boolean is used to define a single style
type VariantsToStyle<T extends RecordLike> = {
  [K in keyof T]?: T[K] extends string | number
    ? Partial<Record<T[K], string>>
    : T[K] extends boolean
      ? string
      : never;
};

/**
 * ComponentThemeToStyles is a helper type to define the props passed to useComponentStyles.
 */
export type ComponentThemeToStyles<T extends RecordLike> = Omit<
  T,
  'variants'
> & {
  variants?: T['variants'] extends RecordLike
    ? VariantsToStyle<T['variants']>
    : never;
};

export type ComponentThemeCompoundVariants<T extends RecordLike> =
  T['variants'] extends RecordLike
    ? {
        variants: {
          [K in keyof T['variants']]?: T['variants'][K];
        };
        style: string;
      }[]
    : never;

export type ComponentThemeDefaultVariants<T extends RecordLike> =
  T['variants'] extends RecordLike
    ? {
        [K in keyof T['variants']]?: T['variants'][K];
      }
    : never;

export type ComponentTheme<T extends RecordLike> = ComponentThemeToStyles<T> & {
  compoundVariants?: ComponentThemeCompoundVariants<T>;
  defaultVariants?: ComponentThemeDefaultVariants<T>;
};

export type ThemeComponentsStyles = {
  [K in keyof ComponentThemes]?: ComponentTheme<ComponentThemes[K]>;
};

export function makeComponentTheme<T extends keyof ThemeComponentsStyles>(
  component: T,
  componentTheme: Exclude<ThemeComponentsStyles[T], undefined>,
) {
  return componentTheme;
}
