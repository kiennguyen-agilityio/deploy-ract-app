import { render } from '@testing-library/react';

import ConfirmModal from '..';

const ownProps = {
  isOpen: true,
  onClose: jest.fn(),
  title: 'Delete Vocabulary',
  onCancel: jest.fn(),
  onConfirm: jest.fn(),
};

const setup = (overrideProps = {}) => {
  const props = {
    ...ownProps,
    ...overrideProps,
  };

  return render(<ConfirmModal {...props} />);
};

describe('ConfirmModal', () => {
  test('renders modal with the correct title', () => {
    const { getByText } = setup();

    expect(getByText(ownProps.title)).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const { getByText } = setup();
    const closeButton = getByText('×');
    closeButton.click();

    expect(ownProps.onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onCancel when Cancel button is clicked', () => {
    const { getByText } = setup();
    const cancelButton = getByText('Close');
    cancelButton.click();

    expect(ownProps.onCancel).toHaveBeenCalledTimes(1);
  });

  test('calls onConfirm when Confirm button is clicked', () => {
    const { getByText } = setup();
    const confirmButton = getByText('Confirm');
    confirmButton.click();

    expect(ownProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  test('does not render modal when isOpen is false', () => {
    const { container } = setup({ isOpen: false });

    // Test that the component returns null and the modal is not rendered
    expect(container.firstChild).toBeNull();
  });
});
