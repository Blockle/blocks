import type { RecordLike } from '../../utils/helpers';
import type { ComponentThemes, ComponentThemesProps } from '../componentThemes';
import type {
  ComponentTheme,
  ThemeComponentsStyles,
} from '../makeComponentTheme';
import type { Theme } from '../makeTheme';

let currentTheme: Theme | null = null;

export function setTheme(theme: Theme) {
  currentTheme = theme;
}

export function getTheme(): Theme {
  if (!currentTheme) {
    throw new Error('No theme has been set. Use setTheme() to set a theme.');
  }

  return currentTheme;
}

// ------------------------------

type VariantValue = string | boolean | number;

export function getComponentStyles<T extends keyof ComponentThemesProps>(
  name: T,
  props: ComponentThemesProps[T],
  useDefaultVariants = true,
) {
  const { components } = getTheme();
  const component = components[name];

  if (!component) {
    console.warn(`Component ${name} is not defined in the theme`);

    return '';
  }

  const classNames: string[] = [];
  const variants = props.variants ?? {};
  const variantsWithDefaults = { ...variants } as Record<string, VariantValue>;

  // Apply root styles, root styles props are always boolean values
  for (const key in props) {
    const value = props[key];

    if (typeof value === 'boolean' && value) {
      classNames.push(
        // biome-ignore lint/suspicious/noExplicitAny: This is a type assertion for a dynamic key
        (component as unknown as ComponentTheme<any>)[key] as string,
      );
    }
  }

  // No variants for component, return base styles
  if (!component.variants) {
    return classNames.join(' ');
  }

  // Apply default variants
  const { defaultVariants } = component;

  if (useDefaultVariants && defaultVariants) {
    const keys = Object.keys(defaultVariants) as string[];

    for (const key of keys) {
      if (variantsWithDefaults[key] === undefined && defaultVariants[key]) {
        variantsWithDefaults[key] = defaultVariants[key] as VariantValue;
      }
    }
  }

  // Apply variant styles
  const keys = Object.keys(variantsWithDefaults) as string[];
  const componentVariants = component.variants as Record<string, string>;

  for (const key of keys) {
    const value = variantsWithDefaults[key as string];

    if (value === undefined || componentVariants[key] === undefined) {
      continue;
    }

    if (typeof value === 'boolean') {
      if (value && componentVariants[key]) {
        classNames.push(componentVariants[key]);
      }
      continue;
    }

    // String union variants
    const variant = (
      componentVariants[key] as unknown as Record<string, string>
    )[value];

    if (variant) {
      classNames.push(variant);
    }
  }

  // Apply compound variants
  const { compoundVariants } = component;

  if (compoundVariants) {
    for (const compoundVariant of compoundVariants) {
      const keys = Object.keys(
        compoundVariant.variants,
      ) as (keyof ComponentThemes[T])[];

      const matches = keys.every((key) => {
        const value = variantsWithDefaults[key as string];

        if (value === undefined) {
          return false;
        }

        return value === compoundVariant.variants[key as string];
      });

      if (matches) {
        classNames.push(compoundVariant.style);
      }
    }
  }

  return classNames.join(' ');
}

// ------------------------------

type ThemeComponentsStylesRequired = Required<ThemeComponentsStyles>;
type Components = {
  [K in keyof ThemeComponentsStylesRequired]: ThemeComponentsStylesRequired[K] extends RecordLike
    ? Required<
        ThemeComponentsStylesRequired[K]
      >['defaultVariants'] extends RecordLike
      ? ThemeComponentsStylesRequired[K]['defaultVariants'] extends undefined
        ? never
        : Exclude<
            ThemeComponentsStylesRequired[K]['defaultVariants'],
            undefined
          >
      : never
    : never;
};

export function getComponentStyleDefaults<
  T extends keyof ThemeComponentsStyles,
>(name: T) {
  const { components } = getTheme();
  const component = components[name];

  if (!component) {
    return {} as Components[T];
  }

  return (component.defaultVariants ?? {}) as Components[T];
}
