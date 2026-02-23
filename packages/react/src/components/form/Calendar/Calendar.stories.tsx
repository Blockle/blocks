import preview from '../../../../../../.storybook/preview.js';
import { Calendar } from './Calendar.js';

const meta = preview.meta({
  title: 'Form/Calendar',
  component: Calendar,
  argTypes: {
    weekStart: {
      control: 'select',
      options: ['sunday', 'monday'],
    },
  },
});

export const Default = meta.story({
  args: {},
});
