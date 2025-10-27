import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import Pagination from './Pagination';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

const meta = {
  title: 'Components/shared/Pagination',
  component: Pagination,
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
    totalPages: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Total number of pages',
    },
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Current page number',
    },
    onPageChange: {
      control: false,
      description: 'Callback function when page changes',
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Default(args) {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    useEffect(() => {
      setCurrentPage(args.currentPage);
    }, [args.currentPage]);

    return (
      <Pagination
        totalPages={args.totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
  args: {
    totalPages: 10,
    currentPage: 1,
    onPageChange: () => {},
  },
};

export const MiddlePage: Story = {
  render: function MiddlePage(args) {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    useEffect(() => {
      setCurrentPage(args.currentPage);
    }, [args.currentPage]);

    return (
      <Pagination
        totalPages={args.totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
  args: {
    totalPages: 20,
    currentPage: 10,
    onPageChange: () => {},
  },
};

export const LastPage: Story = {
  render: function LastPage(args) {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    useEffect(() => {
      setCurrentPage(args.currentPage);
    }, [args.currentPage]);

    return (
      <Pagination
        totalPages={args.totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
  args: {
    totalPages: 15,
    currentPage: 15,
    onPageChange: () => {},
  },
};

export const ManyPages: Story = {
  render: function ManyPages(args) {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    useEffect(() => {
      setCurrentPage(args.currentPage);
    }, [args.currentPage]);

    return (
      <Pagination
        totalPages={args.totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
  args: {
    totalPages: 100,
    currentPage: 50,
    onPageChange: () => {},
  },
};

export const FewPages: Story = {
  render: function FewPages(args) {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    useEffect(() => {
      setCurrentPage(args.currentPage);
    }, [args.currentPage]);

    return (
      <Pagination
        totalPages={args.totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
  args: {
    totalPages: 3,
    currentPage: 2,
    onPageChange: () => {},
  },
};
