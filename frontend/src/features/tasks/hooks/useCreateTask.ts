import useTaskStore from '@/stores/useTaskStore';
import type { CreateTaskPayload } from '@/types/tasks';
import { tasksApi } from '../api';

const useCreateTask = () => {
  const { setTasks, currentPage, tasks } = useTaskStore();
  const createTask = async (task: CreateTaskPayload) => {
    const response = await tasksApi.createTask(task);
    if (currentPage == 1 && tasks.length < 10) {
      setTasks([...tasks, response]);
    }
  };

  return { createTask };
};

export default useCreateTask;
