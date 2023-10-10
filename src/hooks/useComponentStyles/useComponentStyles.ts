import { ThemeComponents, ThemeComponentsProps } from '../../lib/theme/themeComponents';
import { useTheme } from '../useTheme/useTheme';

export function useComponentStyles<T extends keyof ThemeComponentsProps>(
  name: T,
  props: ThemeComponentsProps[T],
  useDefaultVariants = true,
): string {
  const { components } = useTheme();
  const component = components[name];

  if (!component) {
    console.warn(`Component ${name} is not defined in the theme`);

    return '';
  }

  const classNames: string[] = [];
  const variants = props.variants ?? {};
  const variantsWithDefaults = { ...variants };

  // Apply root styles, root styles props are always boolean values
  for (const key in props) {
    const value = props[key];

    if (typeof value === 'boolean' && value) {
      classNames.push(component[key]);
    }
  }

  // No variants for component, return base styles
  if (!component.variants) {
    return classNames.join(' ');
  }

  // Apply default variants
  if (useDefaultVariants && component.defaultVariants) {
    const keys = Object.keys(component.defaultVariants) as (keyof ThemeComponents[T])[];

    for (const key of keys) {
      if (variantsWithDefaults[key] === undefined) {
        variantsWithDefaults[key] = component.defaultVariants[key];
      }
    }
  }

  // Apply variant styles
  const keys = Object.keys(variantsWithDefaults) as (keyof ThemeComponents[T])[];

  for (const key of keys) {
    const value = variantsWithDefaults[key];

    if (value === undefined) {
      continue;
    }

    if (typeof value === 'boolean') {
      if (value && component.variants[key]) {
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

  // Apply compound variants
  if (component.compoundVariants) {
    for (const compoundVariant of component.compoundVariants) {
      const keys = Object.keys(compoundVariant.variants) as (keyof ThemeComponents[T])[];

      const matches = keys.every((key) => {
        const value = variantsWithDefaults[key];

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
