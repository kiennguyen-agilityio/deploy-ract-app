import { StoryObj, Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import LoadingSpinner from './index';

export default {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = {};
