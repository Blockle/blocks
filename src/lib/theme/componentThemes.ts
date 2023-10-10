import { Atoms } from '../css/atoms';
import { IsUnion, RecordLike } from '../utils/helpers';

export type ButtonTheme = {
  base: string;
  variants: {
    variant: 'solid' | 'outline' | 'ghost';
    intent: 'neutral' | 'danger';
    size: 'small' | 'medium' | 'large';
    loading: boolean;
    disabled: boolean;
  };
};

export type LinkTheme = {
  base: string;
  variants: {
    variant: 'inherit' | 'primary' | 'secondary';
    underline: boolean;
  };
};

export type SpinnerTheme = {
  base: string;
  variants: {
    size: 'small' | 'medium' | 'large';
    color: Exclude<Atoms['color'], undefined>;
  };
};

export type DividerTheme = {
  base: string;
  variants: {
    color: Exclude<Atoms['color'], undefined>;
  };
};

export type DialogTheme = {
  base: string;
  backdrop: string;
  variants: {
    size: 'small' | 'medium' | 'large';
  };
};

export type InputTheme = {
  container: string;
  input: string;
  variants: {
    disabled: boolean;
    variant: 'solid' | 'outline'; // TODO Review naming
  };
};

export type CheckboxTheme = {
  base: string;
  icon: string;
};

export type RadioTheme = {
  base: string;
  icon: string;
};

export type ComponentThemes = {
  button: ButtonTheme;
  link: LinkTheme;
  spinner: SpinnerTheme;
  divider: DividerTheme;
  dialog: DialogTheme;
  input: InputTheme;
  checkbox: CheckboxTheme;
  radio: RadioTheme;
};

export type ComponentThemesProps = {
  [K in keyof ComponentThemes]: ComponentThemeProps<ComponentThemes[K]>;
};

// Change type to be used as argument of useComponentStyles
export type ComponentThemeProps<T extends RecordLike> = {
  [K in keyof T]?: T[K] extends RecordLike
    ? ComponentThemeProps<T[K]>
    : IsUnion<T[K]> extends true
    ? T[K]
    : T[K] extends string
    ? boolean
    : T[K];
};
