import type {
  ComponentThemeElement,
  ComponentThemes,
  ComponentThemeVariantsArg,
} from '../config/componentThemes.js';
import type { Theme } from '../theme/makeTheme.js';

/**
 * Returns the class names of one Element of a Component theme.
 *
 * Variant classes, default variants and compound variants are added if and
 * only if `variants` is passed, even as `{}`.
 */
export function getComponentStyles<T extends keyof ComponentThemes>(
  theme: Theme,
  name: T,
  element: ComponentThemeElement<T>,
  ...[variants]: ComponentThemeVariantsArg<T>
): string {
  const component = theme.components[name] as Record<string, unknown>;
  const classNames: string[] = [];

  const elementClassName = component[element];

  if (typeof elementClassName === 'string' && elementClassName) {
    classNames.push(elementClassName);
  }

  if (variants === undefined) {
    return classNames.join(' ');
  }

  const selected = variants as Record<string, unknown>;
  const defaultVariants = component.defaultVariants as
    | Record<string, unknown>
    | undefined;
  const componentVariants = component.variants as
    | Record<string, string | Record<string, string>>
    | undefined;

  for (const key in componentVariants) {
    const variantValue = selected[key] ?? defaultVariants?.[key];

    if (variantValue === undefined) continue;

    const variantConfig = componentVariants[key];

    if (typeof variantValue === 'boolean') {
      if (variantValue && typeof variantConfig === 'string') {
        classNames.push(variantConfig);
      }
    } else if (typeof variantConfig === 'object') {
      const className = variantConfig[variantValue as string];

      if (className) {
        classNames.push(className);
      }
    }
  }

  const compoundVariants = component.compoundVariants as
    | { variants: Record<string, unknown>; style: string }[]
    | undefined;

  if (compoundVariants) {
    for (const compoundVariant of compoundVariants) {
      let matches = true;

      for (const key in compoundVariant.variants) {
        const actualValue = selected[key] ?? defaultVariants?.[key];

        if (actualValue !== compoundVariant.variants[key]) {
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
