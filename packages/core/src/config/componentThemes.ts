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
  base: string;
  variants: {
    intent: AlertIntent;
  };
};

export type ButtonTheme = {
  base: string;
  variants: {
    variant: ButtonVariant;
    intent: 'primary' | 'secondary' | 'danger' | 'success';
    size: Size;
    loading: boolean;
    disabled: boolean;
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

export type DialogTheme = {
  dialog: string;
  variants: {
    size: Size;
  };
};

export type DividerTheme = {
  base?: string;
  variants: {
    color: Exclude<Atoms['color'], undefined>;
  };
};

export type IconTheme = {
  base: string;
  variants: {
    size: IconSize;
  };
};

export type LabelTheme = {
  base: string;
  variants: {
    size: Size;
    required: boolean;
  };
};

export type LinkTheme = {
  base: string;
  variants: {
    variant: LinkVariant;
    underline: boolean;
  };
};

export type PopoverTheme = {
  base: string;
};

export type ProgressTheme = {
  base: string;
  bar: string;
  variants: {
    indeterminate: boolean;
  };
};

export type RadioTheme = {
  base: string;
  icon: string;
  label: string;
};

export type SelectTheme = {
  base?: string;
  select: string;
  icon: string;
  variants: {
    variant: InputVariant;
  };
};

export type SliderTheme = {
  base: string;
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
  base: string;
  variants: {
    size: Size;
    color: Exclude<Atoms['color'], undefined>;
  };
};

export type SwitchTheme = {
  base: string;
  thumb: string;
};

export type TextareaTheme = {
  base: string;
  input: string;
};

export type TextInputTheme = {
  base: string;
  input: string;
  variants: {
    variant: InputVariant;
  };
};

export type ToastTheme = {
  base: string;
  variants: {
    intent: ToastIntent;
  };
};

export type TooltipTheme = {
  base: string;
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
