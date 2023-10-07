import { ComponentThemeProps } from '../../lib/css/theme/componentThemes';
import { useTheme } from '../useTheme/useTheme';

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function useComponentStyles<T extends keyof ComponentThemeProps>(
  name: T,
  props: ComponentThemeProps[T],
): string {
  const { components } = useTheme();
  const component = components[name];

  if (!component) {
    // TODO Dev only
    console.info(`Component ${name} is not defined in the theme`);
    return '';
  }

  const classNames: string[] = [];
  const propsWithDefaults = { ...props };

  // Apply default variants
  if (component.defaultVariants) {
    const keys = Object.keys(component.defaultVariants) as (keyof ComponentThemeProps[T])[];

    for (const key of keys) {
      if (propsWithDefaults[key] === undefined) {
        propsWithDefaults[key] = component.defaultVariants[key];
      }
    }
  }

  // Apply base styles
  if (propsWithDefaults.base && component.base) {
    classNames.push(component.base);
  }

  // No variants for component, return base styles
  if (!component.variants) {
    return classNames.join(' ');
  }

  const keys = Object.keys(propsWithDefaults) as (keyof ComponentThemeProps[T])[];

  for (const key of keys) {
    const value = propsWithDefaults[key];

    if (key === 'base' || value === undefined) {
      continue;
    }

    // Skip unknown variants
    if (!hasOwnProperty.call(component.variants, key)) {
      continue;
    }

    // Boolean variants
    if (typeof value === 'boolean') {
      if (value) {
        classNames.push(component.variants[key]);
      }
      continue;
    }

    // String union variants
    const variant = component.variants[key][value];

    if (variant) {
      classNames.push(variant);
    }
  }

  // Compound variants
  if (component.compoundVariants) {
    for (const compoundVariant of component.compoundVariants) {
      const keys = Object.keys(compoundVariant.variants) as (keyof ComponentThemeProps[T])[];

      const matches = keys.every((key) => {
        const value = propsWithDefaults[key];

        if (value === undefined) {
          return false;
        }

        return value === compoundVariant.variants[key];
      });

      if (matches) {
        classNames.push(compoundVariant.style);
      }
    }
  }

  return classNames.join(' ');
}
