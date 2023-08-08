import { fireEvent, render, waitFor } from '@testing-library/react';

// Components
import TopicTable, { Props } from '@/pages/TranslationPage/TopicTable/index';

// Mocks
import { mockVocabularies } from '@/mocks/topics';

const mockDeleteFn = jest.fn();

const ownProps: Props = {
  topicId: '1',
  onDelete: mockDeleteFn,
  vocabularies: mockVocabularies,
};

const setup = (overrideProps: Partial<Props> = {}) => {
  const props: Props = {
    ...ownProps,
    ...overrideProps,
  };

  return render(<TopicTable {...props} />);
};

describe('TopicTable', () => {
  it('renders the table element', () => {
    const { getByRole } = setup();

    const tableElement = getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  it('renders the table header element', () => {
    const { getByRole } = setup();

    const tableHeaderElement = getByRole('table');
    expect(tableHeaderElement).toBeInTheDocument();
  });

  it('renders correct number of rows', () => {
    const { getAllByRole } = setup();

    const rows = getAllByRole('row');
    expect(rows.length).toBe(mockVocabularies.length + 1);
  });

  it('renders topics data correctly', () => {
    const { getByText } = setup();

    mockVocabularies.forEach((item) => {
      expect(getByText(item.id)).toBeInTheDocument();
      expect(getByText(item.firstLanguage)).toBeInTheDocument();
      expect(getByText(item.secondLanguage)).toBeInTheDocument();
    });
  });

  it('renders delete buttons for each topic', () => {
    const { getAllByRole } = setup();

    const deleteButtons = getAllByRole('button', { name: '×' });
    expect(deleteButtons.length).toBe(mockVocabularies.length);
  });

  it('calls onDelete when the delete button is clicked', async () => {
    const { getAllByRole, getByText } = setup();

    const deleteButtons = getAllByRole('button', { name: '×' });

    for (const [index, deleteButton] of deleteButtons.entries()) {
      fireEvent.click(deleteButton);

      await waitFor(() => getByText('Confirm'));
      const confirmButton = getByText('Confirm');

      fireEvent.click(confirmButton);

      expect(mockDeleteFn).toHaveBeenNthCalledWith(index + 1, mockVocabularies[index].id);
    }
  });
});
