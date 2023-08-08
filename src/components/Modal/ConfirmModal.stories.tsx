import { StoryObj, Meta } from '@storybook/react';

import ConfirmModal from '.';

export default {
  title: 'Components/ConfirmModal',
  component: ConfirmModal,
} as Meta;

type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {
  args: {
    title: 'This is title',
  },
};
