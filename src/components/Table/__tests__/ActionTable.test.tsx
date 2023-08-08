import { render, fireEvent } from '@testing-library/react';
import ActionTable from '../ActionTable';

describe('Action', () => {
  it('renders button correctly', () => {
    const onDeleteMock = jest.fn();

    const { getByText } = render(<ActionTable onDelete={onDeleteMock} />);

    const deleteButton = getByText('×');
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveClass('btn-delete');
  });

  it('calls onDelete when button is clicked', () => {
    const onDeleteMock = jest.fn();

    const { getByText } = render(<ActionTable onDelete={onDeleteMock} />);
    const deleteButton = getByText('×');
    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });
});
