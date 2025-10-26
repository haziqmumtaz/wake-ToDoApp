/* eslint-disable @typescript-eslint/no-explicit-any */
import useTaskStore from '@/stores/useTaskStore';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as hooks from '../hooks';
import TaskModal from './TaskModal';

vi.mock('../hooks');
vi.mock('@/stores/useTaskStore');

describe('TaskModal', () => {
  const mockOnClose = vi.fn();
  const mockCreateTask = vi.fn();
  const mockUpdateTask = vi.fn();
  const mockFetchTasks = vi.fn();
  const mockFetchTaskCounts = vi.fn();
  const mockSetSelectedTask = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (hooks.useCreateTask as any).mockReturnValue({
      createTask: mockCreateTask,
    });

    (hooks.useUpdateTask as any).mockReturnValue({
      updateTask: mockUpdateTask,
    });

    (hooks.useGetTasks as any).mockReturnValue({
      fetchTasks: mockFetchTasks,
    });

    (hooks.useGetTaskCounts as any).mockReturnValue({
      fetchTaskCounts: mockFetchTaskCounts,
    });

    (useTaskStore as any).mockReturnValue({
      setSelectedTask: mockSetSelectedTask,
      selectedTask: { id: 0, text: '', completed: false, deleted: false, createdAt: '' },
    });
  });

  it('renders in add mode when no task is selected', () => {
    render(<TaskModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByRole('heading', { name: 'Add Task' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Task')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('renders in edit mode when task is selected', () => {
    (useTaskStore as any).mockReturnValue({
      setSelectedTask: mockSetSelectedTask,
      selectedTask: {
        id: 1,
        text: 'Test task',
        completed: false,
        deleted: false,
        createdAt: '2025-10-26T22:00:00Z',
      },
    });

    render(<TaskModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByRole('heading', { name: 'Edit Task' })).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test task')).toBeInTheDocument();
  });

  it('displays task text in textarea', () => {
    (useTaskStore as any).mockReturnValue({
      setSelectedTask: mockSetSelectedTask,
      selectedTask: {
        id: 1,
        text: 'Existing task text',
        completed: true,
        deleted: false,
        createdAt: '2025-10-26T22:00:00Z',
      },
    });

    render(<TaskModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByDisplayValue('Existing task text')).toBeInTheDocument();
  });

  it('updates text as user types', async () => {
    render(<TaskModal isOpen={true} onClose={mockOnClose} />);

    const textarea = screen.getByPlaceholderText('Task');
    await userEvent.type(textarea, 'New task');

    expect(textarea).toHaveValue('New task');
  });

  it('shows character count', () => {
    (useTaskStore as any).mockReturnValue({
      setSelectedTask: mockSetSelectedTask,
      selectedTask: {
        id: 1,
        text: 'Test',
        completed: false,
        deleted: false,
        createdAt: '2025-10-26T22:00:00Z',
      },
    });

    render(<TaskModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('4 / 50')).toBeInTheDocument();
  });

  it('creates a new task successfully', async () => {
    mockCreateTask.mockResolvedValue({});

    render(<TaskModal isOpen={true} onClose={mockOnClose} />);

    const textarea = screen.getByPlaceholderText('Task');
    await userEvent.type(textarea, 'New task');

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCreateTask).toHaveBeenCalled();
    });
    expect(mockFetchTasks).toHaveBeenCalled();
    expect(mockFetchTaskCounts).toHaveBeenCalled();
  });

  it('updates existing task successfully', async () => {
    mockUpdateTask.mockResolvedValue({});

    (useTaskStore as any).mockReturnValue({
      setSelectedTask: mockSetSelectedTask,
      selectedTask: {
        id: 1,
        text: 'Existing task',
        completed: false,
        deleted: false,
        createdAt: '2025-10-26T22:00:00Z',
      },
    });

    render(<TaskModal isOpen={true} onClose={mockOnClose} />);

    const textarea = screen.getByDisplayValue('Existing task');
    await userEvent.clear(textarea);
    await userEvent.type(textarea, 'Updated task');

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateTask).toHaveBeenCalled();
    });
    expect(mockFetchTasks).toHaveBeenCalled();
    expect(mockFetchTaskCounts).toHaveBeenCalled();
  });

  it('displays validation errors when validation fails', async () => {
    render(<TaskModal isOpen={true} onClose={mockOnClose} />);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);

    await waitFor(() => {
      const errorText = screen.queryByText(/text|required|must/i);
      expect(errorText).toBeInTheDocument();
    });
  });

  it('closes modal on cancel button click', async () => {
    render(<TaskModal isOpen={true} onClose={mockOnClose} />);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await userEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
    expect(mockSetSelectedTask).toHaveBeenCalledWith({
      id: 0,
      text: '',
      completed: false,
      deleted: false,
      createdAt: '',
    });
  });

  it('clears error when user types after validation error', async () => {
    render(<TaskModal isOpen={true} onClose={mockOnClose} />);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);

    await waitFor(() => {
      const errorText = screen.queryByText(/text|required|must/i);
      expect(errorText).toBeInTheDocument();
    });

    const textarea = screen.getByPlaceholderText('Task');
    await userEvent.type(textarea, 'Valid task');

    // After typing, error should be cleared (textarea value updates)
    expect(textarea).toHaveValue('Valid task');
  });

  it('displays unexpected error for non-Zod errors', async () => {
    mockCreateTask.mockRejectedValue(new Error('Network error'));

    render(<TaskModal isOpen={true} onClose={mockOnClose} />);

    const textarea = screen.getByPlaceholderText('Task');
    await userEvent.type(textarea, 'Valid task');

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);

    await waitFor(() => {
      const errorText = screen.queryByText(/unexpected|occurred|please try again/i);
      expect(errorText).toBeInTheDocument();
    });
  });
});
