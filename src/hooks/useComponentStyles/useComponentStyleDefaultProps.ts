import { ComponentThemeProps } from '../../lib/css/theme/componentThemes';
import { useTheme } from '../useTheme';

export const useComponentStyleDefaultProps = <T extends keyof ComponentThemeProps>(
  name: T,
): ComponentThemeProps[T] => {
  const { components } = useTheme();
  const component = components[name];

  return component?.defaultVariants ?? {};
};
