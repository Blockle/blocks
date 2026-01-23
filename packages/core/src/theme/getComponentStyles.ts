import type { ComponentThemesProps } from '../config/componentThemes.js';
import type { Theme } from '../theme/makeTheme.js';

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
  const variants = styleProps.variants;
  const componentVariants = component.variants;

  // Apply root styles (boolean props)
  for (const key in styleProps) {
    const value = styleProps[key];

    if (value === true) {
      const className = (component as Record<string, string>)[key];

      if (className) {
        classNames.push(className);
      }
    }
  }

  // No variants for component, return early
  if (!componentVariants) {
    return classNames.join(' ');
  }

  const defaultVariants = useDefaultVariants ? component.defaultVariants : null;

  for (const key in componentVariants) {
    const variantValue = variants?.[key] ?? defaultVariants?.[key];

    if (variantValue === undefined) continue;

    const variantConfig = componentVariants[key];

    if (typeof variantValue === 'boolean') {
      if (variantValue && typeof variantConfig === 'string') {
        classNames.push(variantConfig);
      }
    } else {
      const className = (variantConfig as Record<string, string>)[
        variantValue as string
      ];

      if (className) {
        classNames.push(className);
      }
    }
  }

  // Apply compound variants
  const { compoundVariants } = component;

  if (compoundVariants) {
    for (const compoundVariant of compoundVariants) {
      let matches = true;

      for (const key in compoundVariant.variants) {
        const expectedValue = compoundVariant.variants[key];
        const actualValue = variants?.[key] ?? defaultVariants?.[key];

        if (actualValue !== expectedValue) {
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
