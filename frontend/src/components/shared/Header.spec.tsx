import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import useTaskStore from '@/stores/useTaskStore';
import TaskModal from '@/features/tasks/components/TaskModal';

vi.mock('@/stores/useTaskStore');
vi.mock('@/features/tasks/components/TaskModal');

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

    (TaskModal as any).mockImplementation(({ isOpen, onClose }: any) =>
      isOpen ? <div data-testid="task-modal">Modal</div> : null
    );
  });

  it('renders title correctly', () => {
    render(<Header title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders uncompleted tasks badge', () => {
    render(<Header title="Test" />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders deleted tasks badge', () => {
    render(<Header title="Test" />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders completed tasks badge', () => {
    render(<Header title="Test" />);
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

    render(<Header title="Test" />);
    expect(screen.getAllByText('99+')).toHaveLength(3);
  });

  it('renders add todo button', () => {
    render(<Header title="Test" />);
    expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
  });

  it('opens modal when add todo button is clicked', async () => {
    render(<Header title="Test" />);
    const button = screen.getByRole('button', { name: /add todo/i });
    await userEvent.click(button);
    expect(mockSetIsModalOpen).toHaveBeenCalledWith(true);
  });

  it('renders modal when isModalOpen is true', () => {
    (useTaskStore as any).mockReturnValue({
      taskCounts: mockTaskCounts,
      isModalOpen: true,
      setIsModalOpen: mockSetIsModalOpen,
    });

    render(<Header title="Test" />);
    expect(screen.getByTestId('task-modal')).toBeInTheDocument();
  });

  it('does not render modal when isModalOpen is false', () => {
    render(<Header title="Test" />);
    expect(screen.queryByTestId('task-modal')).not.toBeInTheDocument();
  });
});
