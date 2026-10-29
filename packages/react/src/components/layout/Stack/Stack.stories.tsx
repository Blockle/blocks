import {
  alignItemsMap,
  atomicProperties,
  justifyContentMap,
} from '@blockle/blocks-core';

import preview from '../../../../../../.storybook/preview.js';
import { Box } from '../Box/Box.js';
import { Stack } from './Stack.js';

const meta = preview.meta({
  title: 'Layout/Stack',
  component: Stack,
  argTypes: {
    alignX: {
      control: 'select',
      options: Object.keys(alignItemsMap),
    },
    alignY: {
      control: 'select',
      options: Object.keys(justifyContentMap),
    },
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

export const AlignY = meta.story({
  args: {
    gap: 2,
    alignY: 'between',
    style: { blockSize: '240px' },
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
    asChild: true,
    gap: 2,
    listStyle: 'none',
    role: 'list',
    children: (
      <ol>
        <li style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          1
        </li>
        <li style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          2
        </li>
        <li style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          3
        </li>
      </ol>
    ),
  },
});

export const AsChild = meta.story({
  args: {
    asChild: true,
    gap: 2,
    children: (
      <section aria-label="Comments">
        <Box backgroundColor="danger-700" padding={2}>
          1
        </Box>
        <Box backgroundColor="danger-600" padding={2}>
          2
        </Box>
      </section>
    ),
  },
});
