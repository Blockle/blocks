import type {
  ComponentThemes,
  ComponentThemesProps,
} from '../config/componentThemes.js';
import type { Theme } from '../theme/makeTheme.js';
import type { ComponentTheme } from './makeComponentTheme.js';

type VariantValue = string | boolean | number;

export function getComponentStyles<T extends keyof ComponentThemesProps>(
  theme: Theme,
  name: T,
  styleProps: ComponentThemesProps[T],
  useDefaultVariants = true,
): string {
  const component = theme.components[name];

  if (!component) {
    console.warn(`Component ${name} is not defined in the theme`);

    return '';
  }

  const classNames: string[] = [];
  const variants = styleProps.variants ?? {};
  const variantsWithDefaults = { ...variants } as Record<string, VariantValue>;

  // Apply root styles, root styles props are always boolean values
  for (const key in styleProps) {
    const value = styleProps[key];

    if (typeof value === 'boolean' && value) {
      classNames.push(
        // biome-ignore lint/suspicious/noExplicitAny: type assertion
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
