import { StoryObj, Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

// components
import Topics from '@/components/Topics/Topics';

import { TopicProvider } from '@/contexts/TopicContext';

import { mockTopics } from '@/mocks/topics';

export default {
  title: 'Components/Topics',
  component: Topics,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <TopicProvider>
          <Story />
        </TopicProvider>
      </MemoryRouter>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof Topics>;

export const Default: Story = {
  args: {
    topics: mockTopics,
  },
};
