import { StoryObj, Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import TranslationPage from '.';

export default {
  title: 'Components/TranslationPage',
  component: TranslationPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof TranslationPage>;

export const Default: Story = {};
