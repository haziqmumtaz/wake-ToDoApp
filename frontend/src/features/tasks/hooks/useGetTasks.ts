import useTaskStore from '@/stores/useTaskStore';
import type { PaginatedRequest } from '@/types/core';
import { tasksApi } from '../api';

const useGetTasks = () => {
  const { setTasks, setTotalPages } = useTaskStore();

  const fetchTasks = async (params: PaginatedRequest) => {
    const response = await tasksApi.getPaginatedTasks(params);
    setTasks(response.data);
    setTotalPages(response.totalPages);
  };

  return { fetchTasks };
};

export default useGetTasks;
