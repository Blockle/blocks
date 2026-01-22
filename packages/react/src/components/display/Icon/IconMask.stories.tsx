import { atomicProperties } from '@blockle/blocks-core';

import preview from '../../../../../../.storybook/preview.js';
import type { HeroIconName } from './heroicons.js';
import { IconMask } from './IconMask.js';

const meta = preview.meta({
  title: 'Display/IconMask',
  component: IconMask,
  argTypes: {
    color: {
      control: 'select',
      options: Object.keys(atomicProperties.color.values),
    },
  },
});

function getIconUrl(name: HeroIconName): string {
  return `/heroicons/outline/${name}.svg`;
}

export const Default = meta.story({
  args: {
    src: getIconUrl('academic-cap'),
  },
});

// TODO Fix me
// export const HeroIcons = meta.story({
//   render(props) {
//     return <HeroIcon {...props} />;
//   },
//   args: {
//     name: 'academic-cap',
//   },
//   argTypes: {
//     name: {
//       control: 'select',
//       options: heroIconNames,
//     },
//     // @ts-expect-error src not in typing, but exists in runtime
//     src: { table: { disable: true } },
//   },
// });
