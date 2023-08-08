import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { mockVocabularies } from '@/mocks/topics';

// components
import TopicTable from '.';

export default {
  title: 'Components/TopicTable',
  component: TopicTable,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof TopicTable>;

const handleDelete = () => {
  console.log('handleDelete');
};

export const Default: Story = {
  args: {
    vocabularies: mockVocabularies,
    onDelete: handleDelete,
  },
};
