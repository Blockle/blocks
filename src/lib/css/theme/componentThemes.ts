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

// Define divider theme
export type DividerTheme = {
  type: 'divider';
  variants: {
    color: Exclude<Atoms['color'], undefined>;
  };
};

export type DividerThemeProps = CreateThemeProps<DividerTheme>;
type DividerThemeComponent = CreateComponentTheme<DividerTheme>;

// Define dialog theme
export type DialogTheme = {
  type: 'dialog';
  variants: {
    backdrop: boolean;
  };
};

export type DialogThemeProps = CreateThemeProps<DialogTheme>;
type DialogThemeComponent = CreateComponentTheme<DialogTheme>;

// Export component themes union
export type ComponentThemeProps = UnionThemesToRecord<
  ButtonThemeProps | LinkThemeProps | SpinnerThemeProps | DividerThemeProps | DialogThemeProps
>;
export type ComponentThemes =
  | ButtonThemeComponent
  | LinkThemeComponent
  | SpinnerThemeComponent
  | DividerThemeComponent
  | DialogThemeComponent;
export type ComponentThemesMap = UnionThemesToRecord<ComponentThemes>;

type UnionThemesToRecord<T extends { type: string }> = {
  [P in T['type']]: Omit<Extract<T, { type: P }>, 'type'>;
};
