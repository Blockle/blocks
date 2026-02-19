import type { RecordLike } from '../utils/typing/helpers.js';
import type { AlertTheme, BaseAlertProps } from './alert.js';
import type { BaseButtonProps, ButtonTheme } from './button.js';
import type { BaseCheckboxProps, CheckboxTheme } from './checkbox.js';
import type { BaseDialogProps, DialogTheme } from './dialog.js';
import type { BaseDividerProps, DividerTheme } from './divider.js';
import type { BaseDrawerProps, DrawerTheme } from './drawer.js';
import type { BaseIconProps, IconTheme } from './icon.js';
import type { BaseLabelProps, LabelTheme } from './label.js';
import type { BaseLinkProps, LinkTheme } from './link.js';
import type { BasePopoverProps, PopoverTheme } from './popover.js';
import type { BaseProgressProps, ProgressTheme } from './progress.js';
import type { BaseRadioProps, RadioTheme } from './radio.js';
import type { BaseSelectProps, SelectTheme } from './select.js';
import type { BaseSliderProps, SliderTheme } from './slider.js';
import type { BaseSpinnerProps, SpinnerTheme } from './spinner.js';
import type { BaseSwitchProps, SwitchTheme } from './switch.js';
import type { BaseTextInputProps, TextInputTheme } from './textarea.js';
import type { BaseTextareaProps, TextareaTheme } from './textInput.js';
import type { BaseToastProps, ToastTheme } from './toast.js';
import type { BaseTooltipProps, TooltipTheme } from './tooltip.js';

type ComponentData<TTheme extends RecordLike, TProps extends RecordLike> = {
  theme: TTheme;
  props: TProps;
};

export type ComponentThemes = {
  alert: ComponentData<AlertTheme, BaseAlertProps>;
  button: ComponentData<ButtonTheme, BaseButtonProps>;
  checkbox: ComponentData<CheckboxTheme, BaseCheckboxProps>;
  dialog: ComponentData<DialogTheme, BaseDialogProps>;
  divider: ComponentData<DividerTheme, BaseDividerProps>;
  drawer: ComponentData<DrawerTheme, BaseDrawerProps>;
  icon: ComponentData<IconTheme, BaseIconProps>;
  label: ComponentData<LabelTheme, BaseLabelProps>;
  link: ComponentData<LinkTheme, BaseLinkProps>;
  popover: ComponentData<PopoverTheme, BasePopoverProps>;
  progress: ComponentData<ProgressTheme, BaseProgressProps>;
  radio: ComponentData<RadioTheme, BaseRadioProps>;
  select: ComponentData<SelectTheme, BaseSelectProps>;
  slider: ComponentData<SliderTheme, BaseSliderProps>;
  spinner: ComponentData<SpinnerTheme, BaseSpinnerProps>;
  switch: ComponentData<SwitchTheme, BaseSwitchProps>;
  textarea: ComponentData<TextareaTheme, BaseTextareaProps>;
  textInput: ComponentData<TextInputTheme, BaseTextInputProps>;
  toast: ComponentData<ToastTheme, BaseToastProps>;
  tooltip: ComponentData<TooltipTheme, BaseTooltipProps>;
};

/**
 * ComponentThemeProps is a helper type to define the props passed to useComponentStyles.
 */
export type ComponentThemeProps<
  T extends ComponentData<RecordLike, RecordLike>,
> = Omit<
  {
    [K in keyof T['theme']]?: Exclude<T['theme'][K], undefined> extends string
      ? boolean
      : never;
  },
  'variants'
> & {
  variants?: T['theme']['variants'] extends RecordLike
    ? Partial<T['props']['variants']>
    : never;
};

export type ComponentThemesProps = {
  [K in keyof ComponentThemes]: ComponentThemeProps<ComponentThemes[K]>;
};
