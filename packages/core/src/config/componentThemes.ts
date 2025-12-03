import type { Atoms } from '../atoms/atoms.js';
import type { RecordLike } from '../utils/typing/helpers.js';

// Shared variant type definitions
type Intent = 'error' | 'info' | 'success' | 'warning';
type AlertIntent = Intent;
type ToastIntent = 'neutral' | Intent;
type ButtonVariant = 'solid' | 'outline' | 'ghost';
type InputVariant = 'solid' | 'outline';
type LinkVariant = 'inherit' | 'primary' | 'secondary';
type Size = 'small' | 'medium' | 'large';
type IconSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
type ColorScheme = 'primary' | 'secondary';

/**
 * Theming options for components.
 */

export type AlertTheme = {
  root: string;
  variants: {
    intent: AlertIntent;
  };
};

export type ButtonTheme = {
  root: string;
  variants: {
    variant: ButtonVariant;
    intent: 'primary' | 'secondary' | 'danger' | 'success';
    size: Size;
    loading: boolean;
    disabled: boolean;
  };
};

export type CheckboxTheme = {
  root: string;
  icon: string;
  label: string;
  variants: {
    required: boolean;
  };
};

export type DialogTheme = {
  dialog: string;
  variants: {
    size: Size;
  };
};

export type DividerTheme = {
  root?: string;
  variants: {
    color: Exclude<Atoms['color'], undefined>;
  };
};

export type IconTheme = {
  root: string;
  variants: {
    size: IconSize;
  };
};

export type LabelTheme = {
  root: string;
  variants: {
    size: Size;
    required: boolean;
  };
};

export type LinkTheme = {
  root: string;
  variants: {
    variant: LinkVariant;
    underline: boolean;
  };
};

export type PopoverTheme = {
  root: string;
};

export type ProgressTheme = {
  root: string;
  bar: string;
  variants: {
    indeterminate: boolean;
  };
};

export type RadioTheme = {
  root: string;
  icon: string;
  label: string;
};

export type SelectTheme = {
  root?: string;
  select: string;
  icon: string;
  variants: {
    variant: InputVariant;
  };
};

export type SliderTheme = {
  root: string;
  track: string;
  filledTrack: string;
  thumb: string;
  variants: {
    size: Size;
    colorScheme: ColorScheme;
    disabled: boolean;
  };
};

export type SpinnerTheme = {
  root: string;
  variants: {
    size: Size;
    color: Exclude<Atoms['color'], undefined>;
  };
};

export type SwitchTheme = {
  root: string;
  thumb: string;
};

export type TextareaTheme = {
  root: string;
  input: string;
};

export type TextInputTheme = {
  root: string;
  input: string;
  variants: {
    variant: InputVariant;
  };
};

export type ToastTheme = {
  root: string;
  variants: {
    intent: ToastIntent;
  };
};

export type TooltipTheme = {
  root: string;
  variants: {
    colorScheme: ColorScheme;
  };
};

export type ComponentThemes = {
  alert: AlertTheme;
  button: ButtonTheme;
  checkbox: CheckboxTheme;
  dialog: DialogTheme;
  divider: DividerTheme;
  icon: IconTheme;
  label: LabelTheme;
  link: LinkTheme;
  popover: PopoverTheme;
  progress: ProgressTheme;
  radio: RadioTheme;
  select: SelectTheme;
  slider: SliderTheme;
  spinner: SpinnerTheme;
  switch: SwitchTheme;
  textarea: TextareaTheme;
  textInput: TextInputTheme;
  toast: ToastTheme;
  tooltip: TooltipTheme;
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
