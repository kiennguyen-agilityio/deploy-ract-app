import { fireEvent, render } from '@testing-library/react';
import Homepage from '@/pages/HomePage/index';

describe('Homepage', () => {
  it('renders the component without errors', () => {
    render(<Homepage />);
  });

  it('displays the correct heading text', () => {
    const { getByText } = render(<Homepage />);
    expect(getByText('Add & Select Topic')).toBeInTheDocument();
  });

  it('displays the correct subheading text', () => {
    const { getByText } = render(<Homepage />);
    expect(getByText('Please choose a topic or create a topic')).toBeInTheDocument();
  });

  it('renders a Button component', () => {
    const { getByText } = render(<Homepage />);
    expect(getByText('Add Topic')).toBeInTheDocument();
  });

  it('closes the modal when "Add Topic" button is clicked and modal is closed', () => {
    const { getByText, queryByText } = render(<Homepage />);

    expect(queryByText('Add New Modal Content')).toBeNull();

    fireEvent.click(getByText('Add Topic'));

    expect(getByText('Add New Topic')).toBeInTheDocument();

    fireEvent.click(getByText('×'));

    expect(queryByText('Add New Modal Content')).toBeNull();
  });
});
