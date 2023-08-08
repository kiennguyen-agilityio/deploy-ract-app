import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  component: Input,
};

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    title: 'Input',
    variant: 'primary',
  },
};

export const secondary: Story = {
  args: {
    title: 'Input',
    variant: 'secondary',
  },
};

export default meta;
