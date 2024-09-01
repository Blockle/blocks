import { render } from '@testing-library/react';
import { createAsChildTemplate } from './createAsChildTemplate';

const { Template, Slot } = createAsChildTemplate('div');

type TestComponentProps = {
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const TestComponent: React.FC<TestComponentProps> = ({ children, asChild, className }) => {
  return (
    <Template asChild={asChild} className={className}>
      <Slot>{children}</Slot>
    </Template>
  );
};

const AdvancedTestComponent: React.FC<TestComponentProps> = ({ children, asChild, className }) => {
  return (
    <Template asChild={asChild} className={className}>
      <span>A</span>
      <Slot>{children}</Slot>
      <span>B</span>
    </Template>
  );
};

describe('asChildRenderer', () => {
  it('should render the default element', () => {
    const { getByText, container } = render(<TestComponent>Default</TestComponent>);
    const targetElement = container.firstElementChild as HTMLElement;

    expect(getByText('Default')).toBeInTheDocument();
    expect(targetElement.nodeName).toBe('DIV');
    expect(targetElement.textContent).toBe('Default');
  });

  it('should render the default element with className', () => {
    const { getByText, container } = render(
      <TestComponent className="test">Default</TestComponent>,
    );
    const targetElement = container.firstElementChild as HTMLElement;

    expect(getByText('Default')).toBeInTheDocument();
    expect(targetElement).toHaveClass('test');
  });

  it('should render the child element', () => {
    const { getByText, container } = render(
      <TestComponent asChild className="test">
        <a href="#">Link</a>
      </TestComponent>,
    );
    const targetElement = container.firstElementChild as HTMLElement;

    expect(getByText('Link')).toBeInTheDocument();
    // Check node type
    expect(targetElement.nodeName).toBe('A');
    expect(targetElement.textContent).toBe('Link');
    expect(targetElement).toHaveClass('test');
    expect(targetElement).toHaveAttribute('href', '#');
  });

  it('should render the child element with className', () => {
    const { getByText, container } = render(
      <TestComponent asChild className="test">
        <a href="#" className="link">
          Link
        </a>
      </TestComponent>,
    );
    const targetElement = container.firstElementChild as HTMLElement;

    expect(getByText('Link')).toBeInTheDocument();
    // Check node type
    expect(targetElement.nodeName).toBe('A');
    expect(targetElement).toHaveClass('test');
    expect(targetElement).toHaveClass('link');
  });

  it("should render a child component that doesn't support children", () => {
    const { container } = render(
      <TestComponent asChild>
        <img src="fake.png" />
      </TestComponent>,
    );
    const targetElement = container.firstElementChild as HTMLElement;

    // Check node type
    expect(targetElement.nodeName).toBe('IMG');
    expect(targetElement).toHaveAttribute('src', 'fake.png');
  });

  it('should render the child element with multiple children', () => {
    const { getByText, container } = render(
      <AdvancedTestComponent asChild className="test">
        <a href="#">Link</a>
      </AdvancedTestComponent>,
    );
    const targetElement = container.firstElementChild as HTMLElement;

    expect(getByText('Link')).toBeInTheDocument();
    // Check node type
    expect(targetElement.nodeName).toBe('A');
    expect(targetElement).toHaveClass('test');
    expect(targetElement.textContent).toBe('ALinkB');
  });

  it('should throw an error if more than one child is passed and asChild is enabled', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <TestComponent asChild>
        <a href="#">Link</a>
        <a href="#">Link</a>
      </TestComponent>,
    );

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0]).toMatch('When using asChild, only one child is allowed');

    spy.mockRestore();
  });

  it('should throw an error if no children are passed and asChild is enabled', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<TestComponent asChild />);

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0]).toMatch('When using asChild, at least one child is required');

    spy.mockRestore();
  });
});
