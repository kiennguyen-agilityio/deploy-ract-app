import { StoryObj, Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Homepage from '@/pages/HomePage/Homepage';

export default {
  title: 'Components/Homepage',
  component: Homepage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof Homepage>;

export const Default: Story = {};
