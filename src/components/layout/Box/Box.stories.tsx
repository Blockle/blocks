import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import {
  responsiveProperties,
  unresponsiveProperties,
} from '../../../lib/css/atoms/atomicProperties';
import { Box, BoxProps } from './Box';

export default {
  title: 'Layout/Box',
  component: Box,
  argTypes: {
    color: {
      control: 'select',
      options: Object.keys(unresponsiveProperties.color),
    },
    backgroundColor: {
      control: 'select',
      options: Object.keys(unresponsiveProperties.color),
    },
    padding: {
      control: 'select',
      options: Object.keys(responsiveProperties.padding),
    },
  },
} as Meta;

export const Default: StoryObj<BoxProps> = {
  render(props) {
    return <Box {...props} />;
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    expect(canvas.getByText('Box contents')).toBeInTheDocument();
  },
  args: {
    children: 'Box contents',
  },
};

export const AsChild: StoryObj<BoxProps> = {
  render(props) {
    return <Box {...props} />;
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const link = canvas.getByText('Link text');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://google.com');
    expect(link.tagName).toEqual('A');
  },
  args: {
    asChild: true,
    color: 'primary',
    children: (
      <a
        href="https://google.com"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          event.preventDefault();
          console.log('Link clicked');
        }}
      >
        Link text
      </a>
    ),
  },
};