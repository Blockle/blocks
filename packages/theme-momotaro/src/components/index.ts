import type { ThemeComponentsStyles } from '@blockle/blocks-core';

import { button } from './button.css.js';
import { checkbox } from './checkbox.css.js';
import { dialog } from './dialog.css.js';
import { divider } from './divider.css.js';
import { input } from './input.css.js';
import { label } from './label.css.js';
import { link } from './link.css.js';
import { popover } from './popover.css.js';
import { progress } from './progress.css.js';
import { radio } from './radio.css.js';
import { select } from './select.css.js';
import { slider } from './slider.css.js';
import { spinner } from './spinner.css.js';
import { switchTheme } from './switch.css.js';
import { tooltip } from './tooltip.css.js';

export const components: ThemeComponentsStyles = {
  button,
  checkbox,
  dialog,
  divider,
  input,
  label,
  link,
  popover,
  progress,
  radio,
  select,
  slider,
  spinner,
  switch: switchTheme,
  tooltip,
};
