import { RecordLike, IsUnion } from '../utils/helpers';
import { ThemeComponents } from './themeComponents';

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

type ComponentThemeToStyles<T extends RecordLike> = {
  [K in keyof T]?: T[K] extends RecordLike
    ? ComponentThemeToStyles<T[K]>
    : IsUnion<Exclude<T[K], undefined>> extends true
    ? Exclude<T[K], undefined> extends string | number
      ? ComponentThemeToStyles<Record<Exclude<T[K], undefined>, string>>
      : never
    : string;
};

export type ComponentThemeCompoundVariants<T extends RecordLike> = T['variants'] extends RecordLike
  ? {
      variants: {
        [K in keyof T['variants']]?: T['variants'][K];
      };
      style: string;
    }[]
  : never;

export type ComponentThemeDefaultVariants<T extends RecordLike> = T['variants'] extends RecordLike
  ? {
      [K in keyof T['variants']]?: T['variants'][K];
    }
  : never;

export type ComponentTheme<T extends RecordLike> = ComponentThemeToStyles<T> & {
  compoundVariants?: ComponentThemeCompoundVariants<T>;
  defaultVariants?: ComponentThemeDefaultVariants<T>;
};

export type ThemeComponentsStyles = {
  [K in keyof ThemeComponents]?: ComponentTheme<ThemeComponents[K]>;
};

export function makeComponentTheme<T extends keyof ThemeComponentsStyles>(
  component: T,
  componentTheme: ThemeComponentsStyles[T],
) {
  return componentTheme;
}
