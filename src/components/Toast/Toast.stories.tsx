import { StoryObj, Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Toast from './Toast';

export default {
  title: 'Components/Toast',
  component: Toast,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    status: 'success',
    message: 'Success message',
    onClose: () => {},
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    message: 'Error message',
    onClose: () => {},
  },
};
