import useTaskStore from '@/stores/useTaskStore';
import type { Task, UpdateTaskPayload } from '@/types/tasks';
import { tasksApi } from '../api';

const useUpdateTask = () => {
  const { tasks, setTasks } = useTaskStore();
  const updateTask = async (payload: UpdateTaskPayload) => {
    const response = await tasksApi.updateTask(payload);
    setTasks(tasks.map((task: Task) => (task.id === payload.id ? response : task)));
  };

  return { updateTask };
};

export default useUpdateTask;
