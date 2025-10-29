import type { Meta, StoryObj } from '@storybook/react-vite';

import { Skeleton, type SkeletonProps } from './Skeleton.js';

export default {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  argTypes: {},
} as Meta;

export const Default: StoryObj<SkeletonProps> = {
  render: (props) => {
    return <Skeleton {...props} />;
  },

  args: {},
};
