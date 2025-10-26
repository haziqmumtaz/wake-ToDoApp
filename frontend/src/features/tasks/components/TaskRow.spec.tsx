import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskRow from './TaskRow';
import type { Task } from '@/types/tasks';

// Create mock functions
const mockFetchTasks = vi.fn();
const mockFetchTaskCounts = vi.fn();
const mockUpdateTask = vi.fn();
const mockDeleteTask = vi.fn();
const mockSetTaskCounts = vi.fn();
const mockSetSelectedTask = vi.fn();
const mockSetIsModalOpen = vi.fn();

// Mock the hooks
vi.mock('../hooks', () => ({
  useGetTasks: () => ({
    fetchTasks: mockFetchTasks,
  }),
  useGetTaskCounts: () => ({
    fetchTaskCounts: mockFetchTaskCounts,
  }),
  useUpdateTask: () => ({
    updateTask: mockUpdateTask,
  }),
  useDeleteTask: () => ({
    deleteTask: mockDeleteTask,
  }),
}));

// Mock the store
vi.mock('@/stores/useTaskStore', () => ({
  default: () => ({
    setTaskCounts: mockSetTaskCounts,
    taskCounts: { uncompleted: 5, completed: 3, deleted: 2 },
    setSelectedTask: mockSetSelectedTask,
    setIsModalOpen: mockSetIsModalOpen,
    currentPage: 1,
  }),
}));

describe('TaskRow', () => {
  const mockTask: Task = {
    id: 1,
    text: 'Test Task',
    completed: false,
    deleted: false,
    createdAt: '2025-01-01T00:00:00Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders task text', () => {
    render(<TaskRow task={mockTask} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('displays task with line-through when completed', () => {
    const completedTask: Task = { ...mockTask, completed: true };
    render(<TaskRow task={completedTask} />);
    const taskText = screen.getByText('Test Task');
    expect(taskText).toHaveClass('line-through');
  });

  it('renders all three elements: checkbox, text, and delete', () => {
    const { container } = render(<TaskRow task={mockTask} />);
    const svgElements = container.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThanOrEqual(2); // At least checkbox and trash icon
  });

  it('calls updateTask and setTaskCounts when clicking checkbox for incomplete task', async () => {
    const { container } = render(<TaskRow task={mockTask} />);
    const svgElements = container.querySelectorAll('svg');
    const checkbox = svgElements[0];

    fireEvent.click(checkbox);

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockUpdateTask).toHaveBeenCalledWith({
      ...mockTask,
      completed: true,
    });
    expect(mockSetTaskCounts).toHaveBeenCalledWith({
      uncompleted: 4,
      completed: 4,
      deleted: 2,
    });
  });

  it('calls updateTask and setTaskCounts when clicking checkbox for completed task', async () => {
    const completedTask: Task = { ...mockTask, completed: true };
    const { container } = render(<TaskRow task={completedTask} />);
    const svgElements = container.querySelectorAll('svg');
    const checkbox = svgElements[0];

    fireEvent.click(checkbox);

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockUpdateTask).toHaveBeenCalledWith({
      ...completedTask,
      completed: false,
    });
    expect(mockSetTaskCounts).toHaveBeenCalledWith({
      uncompleted: 6,
      completed: 2,
      deleted: 2,
    });
  });

  it('calls deleteTask, fetchTasks, and fetchTaskCounts when clicking trash icon', async () => {
    const { container } = render(<TaskRow task={mockTask} />);
    const svgElements = container.querySelectorAll('svg');
    const trashIcon = svgElements[1];

    fireEvent.click(trashIcon);

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockDeleteTask).toHaveBeenCalledWith(mockTask.id);
    expect(mockFetchTasks).toHaveBeenCalledWith({ _page: 1, _limit: 10 });
    expect(mockFetchTaskCounts).toHaveBeenCalled();
  });

  it('calls setSelectedTask and setIsModalOpen when double-clicking row', () => {
    const { container } = render(<TaskRow task={mockTask} />);
    const row = container.firstChild as HTMLElement;

    fireEvent.dblClick(row);

    expect(mockSetSelectedTask).toHaveBeenCalledWith(mockTask);
    expect(mockSetIsModalOpen).toHaveBeenCalledWith(true);
  });

  it('handles click and double-click on completed task checkbox', async () => {
    const completedTask: Task = { ...mockTask, completed: true };
    const { container } = render(<TaskRow task={completedTask} />);
    const svgElements = container.querySelectorAll('svg');
    const checkbox = svgElements[0];

    // Click to uncomplete
    fireEvent.click(checkbox);
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockUpdateTask).toHaveBeenCalled();

    // Double-click should not trigger modal
    fireEvent.dblClick(checkbox);
    expect(mockSetIsModalOpen).not.toHaveBeenCalled();
  });

  it('handles click and double-click on delete icon', async () => {
    const { container } = render(<TaskRow task={mockTask} />);
    const svgElements = container.querySelectorAll('svg');
    const deleteIcon = svgElements[1];

    // Click to delete
    fireEvent.click(deleteIcon);
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockDeleteTask).toHaveBeenCalled();

    // Double-click should not trigger modal
    fireEvent.dblClick(deleteIcon);
    expect(mockSetIsModalOpen).not.toHaveBeenCalled();
  });
});
