import { Atoms } from '../atoms';
import { CreateComponentTheme, CreateThemeProps } from './makeComponentTheme';

// Define button theme
export type ButtonTheme = {
  type: 'button';
  variants: {
    variant: 'solid' | 'outline' | 'ghost' | 'link';
    intent: 'neutral' | 'danger';
    size: 'small' | 'medium' | 'large';
  };
};

export type ButtonThemeProps = CreateThemeProps<ButtonTheme>;
type ButtonThemeComponent = CreateComponentTheme<ButtonTheme>;

// Define link theme
export type LinkTheme = {
  type: 'link';
  variants: {
    variant: 'inherit' | 'primary' | 'secondary';
    underline: boolean;
  };
};

export type LinkThemeProps = CreateThemeProps<LinkTheme>;
type LinkThemeComponent = CreateComponentTheme<LinkTheme>;

// Define spinner theme
export type SpinnerTheme = {
  type: 'spinner';
  variants: {
    size: 'small' | 'medium' | 'large';
    color: Exclude<Atoms['color'], undefined>;
  };
};

export type SpinnerThemeProps = CreateThemeProps<SpinnerTheme>;
type SpinnerThemeComponent = CreateComponentTheme<SpinnerTheme>;

// Export component themes union
export type ComponentThemeProps = UnionThemesToRecord<
  ButtonThemeProps | LinkThemeProps | SpinnerThemeProps
>;
export type ComponentThemes = ButtonThemeComponent | LinkThemeComponent | SpinnerThemeComponent;
export type ComponentThemesMap = UnionThemesToRecord<ComponentThemes>;

// TODO Rename me
type UnionThemesToRecord<T extends { type: string }> = {
  [P in T['type']]: Omit<Extract<T, { type: P }>, 'type'>;
};