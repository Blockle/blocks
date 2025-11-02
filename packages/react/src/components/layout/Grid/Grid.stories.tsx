import { atomicProperties } from '@blockle/blocks-core';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Grid, type GridProps } from './Grid.js';
import { GridItem } from './GridItem.js';

export default {
  title: 'Layout/Grid',
  component: Grid,
  argTypes: {
    gap: {
      control: 'select',
      options: Object.keys(atomicProperties.gap.values),
    },
    rowGap: {
      control: 'select',
      options: Object.keys(atomicProperties.rowGap.values),
    },
    columnGap: {
      control: 'select',
      options: Object.keys(atomicProperties.columnGap.values),
    },
  },
} as Meta;

export const Default: StoryObj<GridProps> = {
  render(props) {
    return (
      <Grid {...props}>
        <GridItem size={4}>Item 1</GridItem>
        <GridItem size={4}>Item 2</GridItem>
        <GridItem size={4}>Item 3</GridItem>

        <GridItem size={4}>Item 4</GridItem>
        <GridItem size={8}>Item 5</GridItem>

        <GridItem size={2}>Item 6</GridItem>
        <GridItem size={8}>Item 7</GridItem>
        <GridItem size={2}>Item 8</GridItem>
      </Grid>
    );
  },
  args: {
    gap: 0,
  },
};
