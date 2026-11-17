import type { BlocksIcons } from '../components/providers/BlocksProvider/context.js';
import {
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
} from './icons.js';

// Blocks' own Icon set, used for every key BlocksProvider's `icons` leaves
// out. Private, like the icons themselves (ADR-0010).
export const defaultIcons: BlocksIcons = {
  check: <CheckIcon />,
  chevronDown: <ChevronDownIcon />,
  minus: <MinusIcon />,
  plus: <PlusIcon />,
  close: <CloseIcon />,
};
