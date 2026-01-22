import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { VisuallyHidden } from './VisuallyHidden.js';

describe('VisuallyHidden', () => {
  it('should render with storybook', () => {
    render(<VisuallyHidden>This text is visually hidden</VisuallyHidden>);

    expect(
      screen.getByText('This text is visually hidden'),
    ).toBeInTheDocument();
  });
});
