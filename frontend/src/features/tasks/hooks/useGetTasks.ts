import useBaseApi from '@/lib/useBaseApi';
import useTaskStore from '@/stores/useTaskStore';
import type { PaginatedRequest } from '@/types/core';
import { tasksApi } from '../api';

const useGetTasks = () => {
  const { isLoading, error, execute } = useBaseApi();
  const { setTasks, setTotalPages } = useTaskStore();

  const fetchTasks = async (params: PaginatedRequest) => {
    const response = await execute(async () => tasksApi.getPaginatedTasks(params));
    if (response) {
      setTasks(response.data);
      setTotalPages(response.totalPages);
    }
  };

  return { fetchTasks, isLoading, error };
};

export default useGetTasks;
