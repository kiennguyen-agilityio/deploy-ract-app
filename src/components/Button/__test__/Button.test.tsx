import { render, screen, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from '@/components/Button/Button';

const setup = (props = {}) => {
  const defaultProps: ButtonProps = {
    label: 'Submit',
    variant: 'primary',
    onClick: jest.fn(),
    isLoading: false,
    ...props,
  };

  render(<Button {...defaultProps} />);
};

describe('Button component', () => {
  test('renders button correctly', () => {
    const label = 'Submit';
    setup();

    const buttonElement = screen.getByRole('button', {
      name: (content) => content.startsWith(label),
    });

    expect(buttonElement).toMatchSnapshot();
  });

  test('renders button with count when variant is primary', () => {
    const label = 'Submit';
    const count = 10;
    const buttonText = `${label} (${count})`;

    setup({ label, variant: 'primary', count });

    const buttonElement = screen.getByText(buttonText);

    expect(buttonElement).toMatchSnapshot();
  });

  test('renders button with secondary variant', () => {
    setup({ variant: 'secondary' });

    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toMatchSnapshot();
  });

  test('calls onClick handler when clicked', () => {
    const label = 'Submit';
    const handleClick = jest.fn();
    setup({ label, onClick: handleClick });

    const buttonElement = screen.getByRole('button', {
      name: (content) => content.startsWith(label),
    });
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders button with loading spinner when isLoading is true', () => {
    setup({ isLoading: true });

    const loaderElement = screen.getByRole('button');
    expect(loaderElement).toBeInTheDocument();
  });
});
