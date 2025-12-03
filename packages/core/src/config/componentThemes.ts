import type { Atoms } from '../atoms/atoms.js';
import type { RecordLike } from '../utils/typing/helpers.js';

/**
 * Theming options for components.
 */

export type AlertTheme = {
  base: string;
  variants: {
    intent: 'error' | 'info' | 'success' | 'warning';
  };
};

export type ButtonTheme = {
  base: string;
  variants: {
    variant: 'solid' | 'outline' | 'ghost';
    intent: 'primary' | 'secondary' | 'danger' | 'success';
    size: 'small' | 'medium' | 'large';
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
    size: 'small' | 'medium' | 'large';
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
    size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  };
};

export type LabelTheme = {
  base: string;
  variants: {
    size: 'small' | 'medium' | 'large';
    required: boolean;
  };
};

export type LinkTheme = {
  base: string;
  variants: {
    variant: 'inherit' | 'primary' | 'secondary';
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
  variants: {
    size: 'small' | 'medium' | 'large';
    colorScheme: 'primary' | 'secondary';
    disabled: boolean;
  };
};

export type SpinnerTheme = {
  base: string;
  variants: {
    size: 'small' | 'medium' | 'large';
    color: Exclude<Atoms['color'], undefined>;
  };
};

export type SwitchTheme = {
  base: string;
  thumb: string;
};

export type TextareaTheme = {
  container: string;
  input: string;
};

export type TextInputTheme = {
  container: string;
  input: string;
  variants: {
    variant: 'solid' | 'outline'; // TODO Review naming
  };
};

export type ToastTheme = {
  base: string;
  variants: {
    intent: 'neutral' | 'error' | 'info' | 'success' | 'warning';
  };
};

export type TooltipTheme = {
  base: string;
  variants: {
    colorScheme: 'primary' | 'secondary';
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
