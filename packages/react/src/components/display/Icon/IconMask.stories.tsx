import { atomicProperties } from '@blockle/blocks-core';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { createIconMask, IconMask, type IconMaskProps } from './IconMask.js';

const exampleIcons = [
  'academic-cap',
  'arrow-down-tray',
  'bars-3-bottom-right',
  'command-line',
  'magnifying-glass',
  'x-mark',
] as const;

type Icons = (typeof exampleIcons)[number];

function getIconUrl(name: Icons): string {
  return `/heroicons/outline/${name}.svg`;
}

const HeroIcon = createIconMask(getIconUrl);

export default {
  title: 'Display/IconMask',
  component: IconMask,
  argTypes: {
    color: {
      control: 'select',
      options: Object.keys(atomicProperties.color.values),
    },
  },
} as Meta;

export const Default: StoryObj<IconMaskProps> = {
  render(props) {
    return <IconMask {...props} />;
  },
  args: {
    src: getIconUrl('academic-cap'),
  },
};

export const Hero: StoryObj<typeof HeroIcon> = {
  render(props) {
    return <HeroIcon {...props} />;
  },
  args: {
    name: 'academic-cap',
  },
  argTypes: {
    name: {
      control: 'select',
      options: exampleIcons,
    },
  },
};
