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

const ContentBlock: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...restProps
}) => {
  return (
    <Box padding={2} backgroundColor="primary-200" {...restProps}>
      {children}
    </Box>
  );
};

export const Default: StoryObj<GridProps> = {
  render(props) {
    return (
      <Grid {...props}>
        <GridItem asChild colSpan={4} rowSpan={2}>
          <ContentBlock>ColSpan 4, RowSpan 2</ContentBlock>
        </GridItem>
        <GridItem asChild colSpan={4}>
          <ContentBlock>ColSpan 4</ContentBlock>
        </GridItem>
        <GridItem asChild colSpan={4}>
          <ContentBlock>ColSpan 4</ContentBlock>
        </GridItem>

        <GridItem asChild colSpan={8}>
          <ContentBlock>colSpan 8</ContentBlock>
        </GridItem>

        <GridItem asChild colSpan={2}>
          <ContentBlock>colSpan 2</ContentBlock>
        </GridItem>
        <GridItem asChild colSpan={8}>
          <ContentBlock>colSpan 8</ContentBlock>
        </GridItem>
        <GridItem asChild colSpan={2}>
          <ContentBlock>colSpan 2</ContentBlock>
        </GridItem>
      </Grid>
    );
  },
  args: {
    gap: 2,
  },
};
