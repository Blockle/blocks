import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { Spinner } from './Spinner.js';

describe('Spinner', () => {
  it('should render', () => {
    render(<Spinner />);

    expect(screen.getByTestId('blocks-spinner')).toBeInTheDocument();
  });
});
