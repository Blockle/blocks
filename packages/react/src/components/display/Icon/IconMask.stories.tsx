import preview from '../../../../../../.storybook/preview.js';
import type { HeroIconName } from './heroicons.js';
import { IconMask } from './IconMask.js';

function getIconUrl(name: HeroIconName): string {
  return `/heroicons/outline/${name}.svg`;
}

const meta = preview.meta({
  title: 'Display/IconMask',
  component: IconMask,
  argTypes: {
    src: {
      control: 'text',
    },
  },
});

export const Default = meta.story({
  args: {
    src: getIconUrl('academic-cap'),
  },
});
