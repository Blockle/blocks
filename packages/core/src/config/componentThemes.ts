import type { Atoms } from '../atoms/atoms.js';
import type { ColorRoles, Intent } from './themeTokens.js';

// Shared variant type definitions
type AlertIntent = Extract<Intent, 'danger' | 'info' | 'success' | 'warning'>;
type ButtonVariant = 'solid' | 'outline' | 'ghost';
type InputVariant = 'solid' | 'outline';
type Size = 'small' | 'medium' | 'large';
type IconSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
type SliderTooltipIntent = Extract<Intent, 'primary' | 'secondary'>;

/**
 * Where the toast stack sits on the screen: a side, and optionally which of
 * the screen's edges it lines up with (centred when left out).
 */
export type ToastPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end';

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
    // `inherit` uses the surrounding text color; it isn't an Intent
    intent:
      | Extract<
          Intent,
          'neutral' | 'primary' | 'secondary' | 'danger' | 'success'
        >
      | 'inherit';
    size: Size;
    loading: boolean;
    disabled: boolean;
  };
};

export type IconButtonTheme = {
  root: string;
  variants: {
    variant: ButtonVariant;
    intent: ButtonTheme['variants']['intent'];
    size: Size;
    shape: 'square' | 'circle';
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
    size: 1 | 2 | 3;
  };
};

export type DrawerTheme = {
  root?: string;
  variants: {
    placement: 'left' | 'right' | 'top' | 'bottom';
    size: Size;
  };
};

export type HeadingTheme = {
  root?: string;
  variants: {
    color: keyof ColorRoles['text'];
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
    // `inherit` uses the surrounding text color; it isn't an Intent
    intent: Extract<Intent, 'primary' | 'neutral'> | 'inherit';
    underline: boolean;
  };
};

export type MenuTheme = {
  list: string;
  item: string;
  itemIndicator: string;
  separator: string;
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

export type ChoiceGroupTheme = {
  // The wrapping row of choices
  root: string;
  // Each choice's label: the click target, drawn as a button or a swatch
  item: string;
  // The swatch inside an item of the `swatch` variant, painted with
  // `choiceGroupVars.color`
  swatch: string;
  variants: {
    variant: 'button' | 'swatch';
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
    size: Size;
  };
};

export type SliderTheme = {
  root: string;
  track: string;
  filledTrack: string;
  thumb: string;
  variants: {
    size: Size;
    intent: SliderTooltipIntent;
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

export type TagTheme = {
  root: string;
  startSlot: string;
  endSlot: string;
  variants: {
    intent: Intent;
    size: Size;
  };
};

// Only the look: Blocks' base styles own the layout, scrolling and the Tab
// indicator's positioning, motion guard and fallback bar
export type TabsTheme = {
  // The row of tabs; draws the baseline and sets `tabIndicatorVars`
  list: string;
  // The list inside a TabNav; the nav itself is the scrolling row
  navList?: string;
  // The Tab indicator: one bar per list that slides to the selected tab. Its
  // colour, thickness and motion come from `tabIndicatorVars`.
  indicator?: string;
  // The wrapper around a Tab's activation element and its Slots
  tab: string;
  // The Tab's activation element (a button, or a link in a TabNav)
  trigger: string;
  // Content before and after the activation element, inside the wrapper
  startSlot: string;
  endSlot: string;
  panel: string;
};

export type TextTheme = {
  root?: string;
  variants: {
    color: keyof ColorRoles['text'];
  };
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
  toast: string;
  variants: {
    placement: ToastPlacement;
  };
};

export type TooltipTheme = {
  root: string;
  variants: {
    intent: SliderTooltipIntent;
  };
};

export type ComponentThemes = {
  alert: AlertTheme;
  button: ButtonTheme;
  checkbox: CheckboxTheme;
  dialog: DialogTheme;
  divider: DividerTheme;
  drawer: DrawerTheme;
  heading: HeadingTheme;
  icon: IconTheme;
  iconButton: IconButtonTheme;
  label: LabelTheme;
  link: LinkTheme;
  menu: MenuTheme;
  popover: PopoverTheme;
  progress: ProgressTheme;
  choiceGroup: ChoiceGroupTheme;
  radio: RadioTheme;
  select: SelectTheme;
  slider: SliderTheme;
  spinner: SpinnerTheme;
  switch: SwitchTheme;
  tabs: TabsTheme;
  tag: TagTheme;
  text: TextTheme;
  textarea: TextareaTheme;
  textInput: TextInputTheme;
  toast: ToastTheme;
  tooltip: TooltipTheme;
};

/**
 * The Elements of a Component theme: its string keys, excluding `variants`.
 * Optional Elements are included.
 */
export type ComponentThemeElement<T extends keyof ComponentThemes> = Exclude<
  keyof ComponentThemes[T] & string,
  'variants'
>;

/**
 * The optional variants argument for one theme shape. It is only accepted for
 * themes that declare a `variants` key, even an optional one.
 */
export type ThemeVariantsArg<C> = 'variants' extends keyof C
  ? [variants?: Partial<NonNullable<C['variants']>>]
  : [];

/**
 * The optional variants argument of a call. It is only accepted for Component
 * themes that declare variants.
 */
export type ComponentThemeVariantsArg<T extends keyof ComponentThemes> =
  ThemeVariantsArg<ComponentThemes[T]>;
