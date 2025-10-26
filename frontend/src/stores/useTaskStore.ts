import { create } from 'zustand';
import type { Task, TaskCounts } from '@/types/tasks';

interface ITaskStore {
  taskCounts: TaskCounts;
  tasks: Task[];
  selectedTask: Task;
  totalPages: number;
  currentPage: number;
  isModalOpen: boolean;
  setTaskCounts: (counts: TaskCounts) => void;
  setTasks: (tasks: Task[]) => void;
  setSelectedTask: (task: Task) => void;
  setTotalPages: (totalPages: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

const useTaskStore = create<ITaskStore>(set => ({
  taskCounts: { deleted: 0, completed: 0, uncompleted: 0 },
  tasks: [],
  selectedTask: { id: 0, text: '', completed: false, deleted: false, createdAt: '' },
  totalPages: 0,
  currentPage: 1,
  isModalOpen: false,
  setTotalPages: (totalPages: number) => set({ totalPages }),
  setTaskCounts: (counts: TaskCounts) => set({ taskCounts: counts }),
  setTasks: (tasks: Task[]) => set({ tasks }),
  setSelectedTask: (task: Task) => set({ selectedTask: task }),
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  setIsModalOpen: (isOpen: boolean) => set({ isModalOpen: isOpen }),
}));

export default useTaskStore;
