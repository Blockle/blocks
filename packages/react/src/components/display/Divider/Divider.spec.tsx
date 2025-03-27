import { composeStories } from '@storybook/react';
import { screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';
import * as stories from './Divider.stories';

const { Default: Divider } = composeStories(stories);

describe('Divider', () => {
  it('should render with storybook', async () => {
    // render(<Divider />);
    await Divider.run();

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
