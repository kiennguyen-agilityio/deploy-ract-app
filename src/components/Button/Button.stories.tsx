import type { Meta, StoryObj } from '@storybook/react';
import Button from '.';

const meta: Meta<typeof Button> = {
  component: Button,
};

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
  },
};

export const secondary: Story = {
  args: {
    label: 'Button',
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    label: 'Button',
    variant: 'tertiary',
  },
};

export default meta;
