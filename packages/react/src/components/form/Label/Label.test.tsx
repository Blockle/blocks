import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { Label } from './Label.js';

describe('Label', () => {
  it('takes a theme size, not the native numeric size', () => {
    render(
      <>
        <Label size="small">Small</Label>
        {/* @ts-expect-error size is the theme size, not the native size attribute */}
        <Label size={4}>Numeric</Label>
      </>,
    );

    expect(screen.getByText('Small')).not.toHaveAttribute('size');
  });

  it('should render with storybook', () => {
    render(<Label>My label text</Label>);

    expect(screen.getByText('My label text')).toBeInTheDocument();
  });

  it('should be usable as a label', () => {
    render(
      <>
        <Label htmlFor="input">My label text</Label>
        <input id="input" />
      </>,
    );

    expect(screen.getByLabelText('My label text')).toBeInTheDocument();
  });
});
