/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import useTaskStore from '@/stores/useTaskStore';
import useConfigStore from '@/stores/useConfigStore';
import TaskModal from '@/features/tasks/components/TaskModal';

vi.mock('@/stores/useTaskStore');
vi.mock('@/stores/useConfigStore');
vi.mock('@/features/tasks/components/TaskModal');
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: { type: 'languageDetector' },
}));

describe('Header', () => {
  let mockSetIsModalOpen: ReturnType<typeof vi.fn>;
  let mockTaskCounts: { uncompleted: number; completed: number; deleted: number };

  beforeEach(() => {
    mockSetIsModalOpen = vi.fn();
    mockTaskCounts = {
      uncompleted: 5,
      completed: 10,
      deleted: 2,
    };

    (useTaskStore as any).mockReturnValue({
      taskCounts: mockTaskCounts,
      isModalOpen: false,
      setIsModalOpen: mockSetIsModalOpen,
    });

    (useConfigStore as any).mockReturnValue({
      theme: 'light',
      language: 'en',
      toggleTheme: vi.fn(),
      setLanguage: vi.fn(),
    });

    (TaskModal as any).mockImplementation(({ isOpen }: any) =>
      isOpen ? <div data-testid="task-modal">Modal</div> : null
    );
  });

  it('renders title correctly', () => {
    render(<Header />);
    expect(screen.getByText('app.title')).toBeInTheDocument();
  });

  it('renders uncompleted tasks badge', () => {
    render(<Header />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders deleted tasks badge', () => {
    render(<Header />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders completed tasks badge', () => {
    render(<Header />);
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('displays 99+ for values over 99', () => {
    (useTaskStore as any).mockReturnValue({
      taskCounts: {
        uncompleted: 100,
        completed: 200,
        deleted: 150,
      },
      isModalOpen: false,
      setIsModalOpen: mockSetIsModalOpen,
    });

    render(<Header />);
    expect(screen.getAllByText('99+')).toHaveLength(3);
  });

  it('renders add todo button', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: 'header.addTodo' })).toBeInTheDocument();
  });

  it('opens modal when add todo button is clicked', async () => {
    render(<Header />);
    const button = screen.getByRole('button', { name: 'header.addTodo' });
    await userEvent.click(button);
    expect(mockSetIsModalOpen).toHaveBeenCalledWith(true);
  });

  it('renders modal when isModalOpen is true', () => {
    (useTaskStore as any).mockReturnValue({
      taskCounts: mockTaskCounts,
      isModalOpen: true,
      setIsModalOpen: mockSetIsModalOpen,
    });

    render(<Header />);
    expect(screen.getByTestId('task-modal')).toBeInTheDocument();
  });

  it('does not render modal when isModalOpen is false', () => {
    render(<Header />);
    expect(screen.queryByTestId('task-modal')).not.toBeInTheDocument();
  });
});
