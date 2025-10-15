import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { render } from '../../../testUtils/testUtils.js';
import { Divider } from './Divider.js';

describe('Divider', () => {
  it('should render with storybook', async () => {
    render(<Divider />);

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
