import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { IconButton } from './IconButton.js';

const icon = <svg data-testid="icon" />;

describe('IconButton', () => {
  it('uses the label as its accessible name', () => {
    render(<IconButton label="Close">{icon}</IconButton>);

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('requires a label', () => {
    // @ts-expect-error: label is required
    render(<IconButton>{icon}</IconButton>);
  });

  it('defaults the type to button', () => {
    render(<IconButton label="Close">{icon}</IconButton>);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('accepts another type', () => {
    render(
      <IconButton label="Send" type="submit">
        {icon}
      </IconButton>,
    );

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('is disabled when disabled is set', () => {
    render(
      <IconButton label="Close" disabled>
        {icon}
      </IconButton>,
    );

    expect(screen.getByRole('button', { name: 'Close' })).toBeDisabled();
  });

  it('replaces the icon with a spinner while loading', () => {
    render(
      <IconButton label="Save" loading>
        {icon}
      </IconButton>,
    );

    expect(screen.getByTestId('blocks-spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('is disabled and keeps its name while loading', () => {
    render(
      <IconButton label="Save" loading>
        {icon}
      </IconButton>,
    );

    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('renders as its child with asChild', () => {
    render(
      <IconButton label="Home" asChild>
        <a href="/home">{icon}</a>
      </IconButton>,
    );

    const link = screen.getByRole('link', { name: 'Home' });

    expect(link).toHaveAttribute('href', '/home');
    expect(link).not.toHaveAttribute('type');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('replaces the icon inside its child with a spinner while loading with asChild', () => {
    render(
      <IconButton label="Home" asChild loading>
        <a href="/home">{icon}</a>
      </IconButton>,
    );

    const link = screen.getByRole('link', { name: 'Home' });

    expect(link).toContainElement(screen.getByTestId('blocks-spinner'));
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('warns when a type is passed with asChild', () => {
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    render(
      <IconButton label="Home" asChild type="submit">
        <a href="/home">{icon}</a>
      </IconButton>,
    );

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'IconButton: The `type` prop is ignored when using `asChild`. Please set the `type` prop on the child component instead.',
    );

    consoleWarnSpy.mockRestore();
  });

  it('passes HTML attributes and className to the button', () => {
    render(
      <IconButton label="Close" className="custom-class" data-test="value">
        {icon}
      </IconButton>,
    );

    const button = screen.getByRole('button');

    expect(button).toHaveClass('custom-class');
    expect(button).toHaveAttribute('data-test', 'value');
  });
});
