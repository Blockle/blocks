import type {
  ComponentThemeElement,
  ComponentThemes,
  ComponentThemeVariantsArg,
} from '../config/componentThemes.js';
import type { Theme } from '../theme/makeTheme.js';

type LooseComponentTheme = {
  variants?: Record<string, string | Record<string, string>>;
  defaultVariants?: Record<string, unknown>;
  compoundVariants?: { variants: Record<string, unknown>; style: string }[];
  [element: string]: unknown;
};

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
  // The one loose view of the typed theme; everything below reads through it
  const component = theme.components[name] as LooseComponentTheme;
  const classNames: string[] = [];

  const elementClassName = component[element];

  if (typeof elementClassName === 'string' && elementClassName) {
    classNames.push(elementClassName);
  }

  if (variants === undefined) {
    return classNames.join(' ');
  }

  const effective: Record<string, unknown> = {
    ...component.defaultVariants,
    ...Object.fromEntries(
      Object.entries(variants).filter(([, value]) => value !== undefined),
    ),
  };

  for (const key in component.variants) {
    const variantValue = effective[key];

    if (variantValue === undefined) {
      continue;
    }

    const variantConfig = component.variants[key];

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

  for (const compoundVariant of component.compoundVariants ?? []) {
    const matches = Object.entries(compoundVariant.variants).every(
      ([key, value]) => effective[key] === value,
    );

    if (matches) {
      classNames.push(compoundVariant.style);
    }
  }

  return classNames.join(' ');
}
