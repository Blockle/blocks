import { ComponentThemeProps } from '../../lib/css/theme/componentThemes';
import { useTheme } from '../useTheme/useTheme';

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

  // TODO Default value for base
  if (props.base && component.base) {
    classNames.push(component.base);
  }

  const keys = Object.keys(props) as (keyof ComponentThemeProps[T])[];

  for (const key of keys) {
    let value = props[key];

    if (value === undefined && component.defaultVariants && component.defaultVariants[key]) {
      value = component.defaultVariants[key];
    }

    if (value === undefined) {
      continue;
    }

    if (!component.variants?.hasOwnProperty(key)) {
      continue;
    }

    const variant = component.variants[key][value];

    if (variant) {
      classNames.push(variant);
    }
  }

  // Compound variants
  if (component.compoundVariants) {
    for (const compoundVariant of component.compoundVariants) {
      const keys = Object.keys(compoundVariant.variants) as (keyof ComponentThemeProps[T])[];

      let matches = true;

      for (const key of keys) {
        const value = props[key];

        if (value === undefined) {
          continue;
        }

        if (value !== compoundVariant.variants[key]) {
          matches = false;
          break;
        }
      }

      if (matches) {
        classNames.push(compoundVariant.style);
      }
    }
  }

  return classNames.join(' ');
}
