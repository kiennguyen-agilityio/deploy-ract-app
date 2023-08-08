import { Topic, Vocabulary } from 'interfaces/topic';

export const mockVocabularies: Vocabulary[] = [
  {
    id: '1',
    firstLanguage: 'Hello',
    secondLanguage: 'Xin chào',
    topicId: '3',
  },
  {
    id: '2',
    firstLanguage: 'Goodbye',
    secondLanguage: 'Tạm biệt',
    topicId: '2',
  },
  {
    id: '3',
    firstLanguage: 'Water',
    secondLanguage: 'Nước',
    topicId: '1',
  },
];

export const mockTopics: Topic[] = [
  {
    id: '1',
    name: 'School',
    quantity: 2,
  },
  {
    id: '2',
    name: 'Laptop',
    quantity: 1,
  },
  {
    id: '3',
    name: 'Fruit',
    quantity: 1,
  },
];
