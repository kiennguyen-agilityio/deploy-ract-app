import { fireEvent, render } from '@testing-library/react';
import Toast from '@/components/Toast/Toast';

const defaultProps = {
  status: 'success',
  message: 'Success message',
  onClose: jest.fn(),
};

const setup = (props = {}) => {
  const mergedProps = { ...defaultProps, ...props };

  return render(<Toast {...mergedProps} />);
};

describe('Toast component', () => {
  it('renders success toast correctly', () => {
    const { container, getByText } = setup();

    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toHaveClass('success');
    expect(getByText('Success message')).toBeInTheDocument();
  });

  it('renders error toast correctly', () => {
    const { container, getByText } = setup({ status: 'error', message: 'Error message' });

    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toHaveClass('error');
    expect(getByText('Error message')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByLabelText } = setup({ onClose: onCloseMock });
    const closeButton = getByLabelText('Close');

    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
