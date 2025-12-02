import { atomicProperties } from '@blockle/blocks-core';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Box } from '../Box/Box.js';
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
        <GridItem asChild colSpan={2}>
          <Box padding={2} backgroundColor="primary-200">
            colSpan=2
          </Box>
        </GridItem>
        <GridItem asChild colSpan={6}>
          <Box padding={2} backgroundColor="primary-200">
            colSpan=6
          </Box>
        </GridItem>
        <GridItem asChild colSpan={4}>
          <Box padding={2} backgroundColor="primary-200">
            colSpan=4
          </Box>
        </GridItem>
      </Grid>
    );
  },
  args: {
    gap: 2,
  },
};

export const RowSpan: StoryObj<GridProps> = {
  render(props) {
    return (
      <Grid {...props}>
        <GridItem asChild colSpan={4} rowSpan={2}>
          <Box padding={2} backgroundColor="primary-200">
            colSpan=4, rowSpan=2
          </Box>
        </GridItem>
        <GridItem asChild colSpan={4}>
          <Box padding={2} backgroundColor="primary-200">
            colSpan=4
          </Box>
        </GridItem>
        <GridItem asChild colSpan={4}>
          <Box padding={2} backgroundColor="primary-200">
            colSpan=4
          </Box>
        </GridItem>

        <GridItem asChild colSpan={8}>
          <Box padding={2} backgroundColor="primary-200">
            colSpan=8
          </Box>
        </GridItem>

        <GridItem asChild colSpan={2}>
          <Box padding={2} backgroundColor="primary-200">
            colSpan=2
          </Box>
        </GridItem>
        <GridItem asChild colSpan={8}>
          <Box padding={2} backgroundColor="primary-200">
            colSpan=8
          </Box>
        </GridItem>
        <GridItem asChild colSpan={2}>
          <Box padding={2} backgroundColor="primary-200">
            colSpan=2
          </Box>
        </GridItem>
      </Grid>
    );
  },
  args: {
    gap: 2,
  },
};

export const Responsive: StoryObj<GridProps> = {
  render(props) {
    return (
      <Grid {...props}>
        <GridItem asChild colSpan={[6, 2, 10]}>
          <Box padding={2} backgroundColor="primary-200">
            colSpan=[6, 2, 10]
          </Box>
        </GridItem>
        <GridItem asChild colSpan={[6, 10, 2]}>
          <Box padding={2} backgroundColor="primary-200">
            colSpan=[6, 10, 2]
          </Box>
        </GridItem>

        <GridItem asChild colSpan={4} rowSpan={[2, 1]}>
          <Box padding={2} backgroundColor="primary-200">
            colSpan=4, rowSpan=[2, 1]
          </Box>
        </GridItem>
        <GridItem asChild colSpan={8}>
          <Box padding={2} backgroundColor="primary-200">
            colSpan=8
          </Box>
        </GridItem>

        <GridItem asChild colSpan={[8, 12]}>
          <Box padding={2} backgroundColor="primary-200">
            colSpan=[8, 12]
          </Box>
        </GridItem>
      </Grid>
    );
  },
  args: {
    gap: 2,
  },
};
