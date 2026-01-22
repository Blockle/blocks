import { atomicProperties } from '@blockle/blocks-core';

import preview from '../../../../../../.storybook/preview.js';
import { Box } from '../Box/Box.js';
import { Stack } from './Stack.js';

const meta = preview.meta({
  title: 'Layout/Stack',
  component: Stack,
  argTypes: {
    gap: {
      name: 'gap',
      type: 'string',
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
        <Box backgroundColor="danger-700" padding={2}>
          1
        </Box>
        <Box backgroundColor="danger-600" padding={2}>
          2
        </Box>
        <Box backgroundColor="danger-500" padding={2}>
          3
        </Box>
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
