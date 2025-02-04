import { ThemeComponentsStyles } from '../../lib/theme/makeComponentTheme';
import { RecordLike } from '../../lib/utils/helpers';
import { useTheme } from '../useTheme';

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

export const useComponentStyleDefaultProps = <
  T extends keyof ThemeComponentsStyles,
>(
  name: T,
) => {
  const { components } = useTheme();
  const component = components[name];

  if (!component) {
    return {} as Components[T];
  }

  return (component.defaultVariants ?? {}) as Components[T];
};
