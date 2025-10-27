import useBaseApi from '@/lib/useBaseApi';
import useTaskStore from '@/stores/useTaskStore';
import type { Task } from '@/types/tasks';
import { tasksApi } from '../api';

const useUpdateTask = () => {
  const { isLoading, error, execute } = useBaseApi();
  const { tasks, setTasks } = useTaskStore();
  const updateTask = async (payload: Task) => {
    const response = await execute(async () => tasksApi.updateTask(payload));
    if (response) setTasks(tasks.map((task: Task) => (task.id === payload.id ? response : task)));
  };

  return { updateTask, isLoading, error };
};

export default useUpdateTask;
