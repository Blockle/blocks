import { atomicProperties } from '@blockle/blocks-core';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { createIconMask } from './createIconMask.js';
import { type HeroIconName, heroIconNames } from './heroicons.js';
import { IconMask, type IconMaskProps } from './IconMask.js';

function getIconUrl(name: HeroIconName): string {
  return `/heroicons/outline/${name}.svg`;
}

// Create a HeroIcon component with the icon URL resolver
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

export const HeroIcons: StoryObj<typeof HeroIcon> = {
  render(props) {
    return <HeroIcon {...props} />;
  },
  args: {
    name: 'academic-cap',
  },
  argTypes: {
    name: {
      control: 'select',
      options: heroIconNames,
    },
    // @ts-expect-error src not in typing, but exists in runtime
    src: { table: { disable: true } },
  },
};
