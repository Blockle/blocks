import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { Checkbox } from './Checkbox.js';

describe('Checkbox', () => {
  it('should render with storybook', () => {
    render(<Checkbox name="checkbox" />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should render with a label when children are provided', () => {
    render(<Checkbox name="checkbox">My checkbox</Checkbox>);

    expect(
      screen.getByRole('checkbox', {
        name: 'My checkbox',
      }),
    ).toBeInTheDocument();
  });

  it('should pass name through to the input', () => {
    render(<Checkbox name="checkbox" />);

    expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'checkbox');
  });

  it('should render without a name', () => {
    render(<Checkbox />);

    expect(screen.getByRole('checkbox')).not.toHaveAttribute('name');
  });
});
