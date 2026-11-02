import type { ThemeComponentsStyles } from '@blockle/blocks-core';

// Order matters: Tag must be imported after Link. `<Tag asChild><Link /></Tag>`
// puts both theme roots on one anchor, in the same layer at the same
// specificity, so the later rule wins. Tag has to win to keep its pill radius
// and font weight. Guarded by the Tag browser test "keeps its pill radius and
// font weight when composed onto a Link".
import { alert } from './alert.css.js';
import { button } from './button.css.js';
import { checkbox } from './checkbox.css.js';
import { dialog } from './dialog.css.js';
import { divider } from './divider.css.js';
import { drawer } from './drawer.css.js';
import { heading } from './heading.css.js';
import { icon } from './icon.css.js';
import { iconButton } from './iconButton.css.js';
import { label } from './label.css.js';
import { link } from './link.css.js';
import { menu } from './menu.css.js';
import { popover } from './popover.css.js';
import { progress } from './progress.css.js';
import { radio } from './radio.css.js';
import { select } from './select.css.js';
import { slider } from './slider.css.js';
import { spinner } from './spinner.css.js';
import { switchTheme } from './switch.css.js';
import { tabs } from './tabs.css.js';
import { tag } from './tag.css.js';
import { text } from './text.css.js';
import { textarea } from './textarea.css.js';
import { textInput } from './textInput.css.js';
import { toast } from './toast.css.js';
import { tooltip } from './tooltip.css.js';

export const components: ThemeComponentsStyles = {
  alert,
  button,
  checkbox,
  dialog,
  divider,
  drawer,
  heading,
  icon,
  iconButton,
  label,
  link,
  menu,
  popover,
  progress,
  radio,
  select,
  slider,
  spinner,
  switch: switchTheme,
  tabs,
  tag,
  text,
  textarea,
  textInput,
  toast,
  tooltip,
};
