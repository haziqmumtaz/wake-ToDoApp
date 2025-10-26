import { tasksApi } from '../api';
import useBaseApi from '@/lib/useBaseApi';

const useDeleteTask = () => {
  const { isLoading, error, execute } = useBaseApi();
  const deleteTask = async (id: number) => {
    const response = await execute(async () => tasksApi.deleteTask(id));
    if (response) return response;
  };

  return { deleteTask, isLoading, error };
};

export default useDeleteTask;
