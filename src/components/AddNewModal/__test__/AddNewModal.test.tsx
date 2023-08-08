import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddNewTopicModal, { Props } from '@/components/AddNewModal/AddNewModal';

jest.mock('@/contexts/TopicContext', () => ({
  useTopicContext: () => ({
    onAddTopic: jest.fn(),
    isLoading: false,
  }),
}));

const mockOnClose = jest.fn();

const renderComponent = (props: Partial<Props> = {}) => {
  const defaultProps: Props = {
    onClose: mockOnClose,
  };
  return render(<AddNewTopicModal {...defaultProps} {...props} />);
};

describe('AddNewTopicModal', () => {
  test('renders correctly', () => {
    render(<AddNewTopicModal onClose={() => {}} />);

    expect(screen.getByText('Add New Topic')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter topic name')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  test('calls onClose when Done button is clicked', async () => {
    const handleClose = jest.fn();

    render(<AddNewTopicModal onClose={handleClose} />);

    const input = screen.getByPlaceholderText('Enter topic name');
    fireEvent.change(input, { target: { value: 'English' } });

    const doneButton = screen.getByText('Done');
    fireEvent.click(doneButton);

    // Wait for the async function to finish before asserting the handleClose function
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  test('calls onAddTopic with correct value when form is submitted', async () => {
    const onAddTopic = jest.fn();
    const handleClose = jest.fn();
    jest.spyOn(require('@/contexts/TopicContext'), 'useTopicContext').mockReturnValue({
      onAddTopic,
      isLoading: false,
    });

    render(<AddNewTopicModal onClose={handleClose} />);

    const input = screen.getByPlaceholderText('Enter topic name');
    fireEvent.change(input, { target: { value: 'car' } });

    const form = screen.getByTestId('topic-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(onAddTopic).toHaveBeenCalledWith('car');
    });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('enables the "Done" button when not loading', () => {
    // Mock the context without loading state (back to the default state)
    jest.mock('@/contexts/TopicContext', () => ({
      useTopicContext: () => ({
        onAddTopic: jest.fn(),
        isLoading: false,
      }),
    }));

    const { getByText } = renderComponent();

    // Find the "Done" button and check if it is enabled
    const doneButton = getByText('Done') as HTMLButtonElement;
    expect(doneButton).not.toBeDisabled();
  });
});
