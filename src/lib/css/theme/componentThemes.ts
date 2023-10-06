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

// Export component themes union
export type ComponentThemeProps = OfUnion<ButtonThemeProps | LinkThemeProps>;
export type ComponentThemes = ButtonThemeComponent | LinkThemeComponent;
export type ComponentThemesMap = OfUnion<ComponentThemes>;

export type OfUnion<T extends { type: string }> = {
  [P in T['type']]: Omit<Extract<T, { type: P }>, 'type'>;
};
