import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

const meta = {
  title: 'Shared/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'The main header component showing app title, task counts, and action buttons. The language toggle (EN | AR) and theme toggle are functional.',
      },
    },
  },
};
