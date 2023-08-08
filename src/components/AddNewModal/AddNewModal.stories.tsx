import { StoryObj, Meta } from '@storybook/react';

import Modal from '@/components/AddNewModal/AddNewModal';

export default {
  title: 'Components/AddNewModal',
  component: Modal,
} as Meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    onClose: () => {
      console.log('close Modal');
    },
  },
};
