import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useTopicContext } from '@/contexts/TopicContext';
import Topics from '@/components/Topics/Topics';

jest.mock('@/contexts/TopicContext', () => ({
  useTopicContext: jest.fn(),
}));

describe('Topics Component', () => {
  const mockContextData = {
    topics: [
      {
        id: '1',
        name: 'Topic 1',
        quantity: 10,
      },
      { id: '2', name: 'Topic 2', quantity: 15 },
    ],
    isAdding: false,
  };

  beforeEach(() => {
    (useTopicContext as jest.Mock).mockReturnValue(mockContextData);
  });

  it('renders topic items correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Topics />
      </BrowserRouter>
    );
    const topicList = getByTestId('topic-item');
    const topicItems = topicList.querySelectorAll('li');

    expect(topicItems.length).toBe(mockContextData.topics.length);

    topicItems.forEach((item, index) => {
      expect(item).toHaveTextContent(mockContextData.topics[index].name);
    });
  });

  it('renders loading spinner when isAdding is true', () => {
    const mockContextDataWithLoadingSpinner = {
      ...mockContextData,
      isAdding: true,
    };

    (useTopicContext as jest.Mock).mockReturnValue(mockContextDataWithLoadingSpinner);

    const { getByTestId } = render(<Topics />);
    const loadingSpinner = getByTestId('loading-spinner');

    expect(loadingSpinner).toBeInTheDocument();
  });

  it('renders correct links to topic detail pages', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Topics />
      </BrowserRouter>
    );

    // Mock context data with two topics
    const mockContextData = {
      topics: [
        {
          id: '1',
          name: 'Topic 1',
          quantity: 10,
        },
        { id: '2', name: 'Topic 2', quantity: 15 },
      ],
      isAdding: false,
    };
    (useTopicContext as jest.Mock).mockReturnValue(mockContextData);

    const topicList = getByTestId('topic-item');

    const links = topicList.querySelectorAll('a');

    expect(links.length).toBe(mockContextData.topics.length);

    links.forEach((link, index) => {
      const topicId = mockContextData.topics[index].id;
      expect(link.getAttribute('href')).toBe(`/vocabularies/${topicId}`);
    });
  });
});
