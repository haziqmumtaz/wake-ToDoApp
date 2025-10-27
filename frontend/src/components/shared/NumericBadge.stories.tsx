import type { Meta, StoryObj } from '@storybook/react';
import NumericBadge from './NumericBadge';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

const meta = {
  title: 'Shared/NumericBadge',
  component: NumericBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    ),
  ],
  argTypes: {
    value: {
      control: 'text',
      description: 'The numeric value to display',
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color of the badge',
    },
    textColor: {
      control: 'color',
      description: 'Text color of the badge',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text displayed on hover',
    },
  },
} satisfies Meta<typeof NumericBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '5',
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
    tooltip: 'Default badge',
  },
};

export const Uncompleted: Story = {
  args: {
    value: '6',
    backgroundColor: '#6241E1',
    textColor: '#FFFFFF',
    tooltip: 'No. of Tasks uncompleted',
  },
};

export const Deleted: Story = {
  args: {
    value: '21',
    backgroundColor: '#E55251',
    textColor: '#FFFFFF',
    tooltip: 'No. of Tasks deleted',
  },
};

export const Completed: Story = {
  args: {
    value: '17',
    backgroundColor: '#40CA28',
    textColor: '#FFFFFF',
    tooltip: 'No. of Tasks completed',
  },
};

export const LargeNumber: Story = {
  args: {
    value: '1450',
    backgroundColor: '#6241E1',
    textColor: '#FFFFFF',
    tooltip: 'More than 99 tasks',
  },
};

export const WithoutTooltip: Story = {
  args: {
    value: '42',
    backgroundColor: '#6B7280',
    textColor: '#FFFFFF',
  },
};
