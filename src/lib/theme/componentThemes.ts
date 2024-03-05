import { Atoms } from '../css/atoms';
import { RecordLike } from '../utils/helpers';

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
  base?: string;
  variants: {
    color: Exclude<Atoms['color'], undefined>;
  };
};

export type DialogTheme = {
  backdrop: string;
  dialog: string;
  variants: {
    size: 'small' | 'medium' | 'large';
  };
};

export type InputTheme = {
  container: string;
  input: string;
  variants: {
    variant: 'solid' | 'outline'; // TODO Review naming
    disabled: boolean;
    required: boolean;
  };
};

export type CheckboxTheme = {
  base: string;
  icon: string;
  label: string;
  variants: {
    required: boolean;
  };
};

export type RadioTheme = {
  base: string;
  icon: string;
  label: string;
};

export type LabelTheme = {
  base: string;
  variants: {
    size: 'small' | 'medium' | 'large';
    required: boolean;
  };
};

export type ProgressTheme = {
  base: string;
  bar: string;
  variants: {
    indeterminate: boolean;
  };
};

export type SwitchTheme = {
  base: string;
  slider: string;
};

export type DropdownTheme = {
  base: string;
  variants: {
    variant: 'solid' | 'outline';
  };
};

export type SelectTheme = {
  wrapper?: string;
  select: string;
  icon: string;
  variants: {
    variant: 'solid' | 'outline';
  };
};

export type SliderTheme = {
  base: string;
  track: string;
  filledTrack: string;
  thumb: string;
};

export type ComponentThemes = {
  button: ButtonTheme;
  checkbox: CheckboxTheme;
  dialog: DialogTheme;
  divider: DividerTheme;
  dropdown: DropdownTheme;
  input: InputTheme;
  label: LabelTheme;
  link: LinkTheme;
  progress: ProgressTheme;
  radio: RadioTheme;
  select: SelectTheme;
  spinner: SpinnerTheme;
  switch: SwitchTheme;
  slider: SliderTheme;
};

/**
 * ComponentThemeProps is a helper type to define the props passed to useComponentStyles.
 */
export type ComponentThemeProps<T extends RecordLike> = Omit<
  {
    [K in keyof T]?: Exclude<T[K], undefined> extends string ? boolean : never;
  },
  'variants'
> & {
  variants?: T['variants'] extends RecordLike ? Partial<T['variants']> : never;
};

export type ComponentThemesProps = {
  [K in keyof ComponentThemes]: ComponentThemeProps<ComponentThemes[K]>;
};
