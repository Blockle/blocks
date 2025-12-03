import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Button } from './Button.js';
import { HeroIcon } from '../../display/Icon/IconMask.stories.js';

const meta = {
  title: 'Form/Button',
  component: Button,
  argTypes: {},
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (props) => {
    return <Button {...props} />;
  },

  args: {
    children: 'Button',
    onClick: action('button-clicked'),
  },
};

export const LinkButton: Story = {
  render: (props) => {
    return <Button {...props} />;
  },

  args: {
    children: (
      <a href="https://google.com" target="_blank" rel="noreferrer">
        Link text
      </a>
    ),
    asChild: true,
    onClick: action('link-clicked'),
  },
};

export const Icons: Story = {
  render: (props) => {
    return <Button {...props} />;
  },

  args: {
    children: 'Button with icons',
    startSlot: <HeroIcon name="academic-cap" size="small" />,
    endSlot: <HeroIcon name="arrow-right" size="small" />,
  },
};
