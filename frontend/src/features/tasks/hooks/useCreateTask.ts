import useTaskStore from '@/stores/useTaskStore';
import type { CreateTaskPayload } from '@/types/tasks';
import { tasksApi } from '../api';
import useBaseApi from '@/lib/useBaseApi';

const useCreateTask = () => {
  const { isLoading, error, execute } = useBaseApi();
  const { setTasks, currentPage, tasks } = useTaskStore();
  const createTask = async (task: CreateTaskPayload) => {
    const response = await execute(async () => tasksApi.createTask(task));
    if (currentPage == 1 && tasks.length < 10) {
      if (response) setTasks([...tasks, response]);
    }
  };

  return { createTask, isLoading, error };
};

export default useCreateTask;
