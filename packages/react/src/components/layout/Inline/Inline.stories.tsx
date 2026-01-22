import { atomicProperties } from '@blockle/blocks-core';

import preview from '../../../../../../.storybook/preview.js';
import { Inline } from './Inline.js';

const meta = preview.meta({
  title: 'Layout/Inline',
  component: Inline,
  argTypes: {
    gap: {
      name: 'gap',
      control: 'select',
      options: Object.keys(atomicProperties.gap.values),
    },
  },
});

export const Default = meta.story({
  args: {
    gap: 2,
    children: (
      <>
        <div style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          1
        </div>
        <div style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          2
        </div>
        <div style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          3
        </div>
        <div style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          4
        </div>
        <div style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          5
        </div>
        <div style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          6
        </div>
        <div style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          7
        </div>
        <div style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          8
        </div>
        <div style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          9
        </div>
      </>
    ),
  },
});

export const List = meta.story({
  args: {
    gap: 2,
    children: (
      <>
        <li style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          1
        </li>
        <li style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          2
        </li>
        <li style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          3
        </li>
      </>
    ),
    tag: 'ol',
  },
});
