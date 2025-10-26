import useBaseApi from '@/lib/useBaseApi';
import useTaskStore from '@/stores/useTaskStore';
import { tasksApi } from '../api';

const useGetTaskCounts = () => {
  const { setTaskCounts } = useTaskStore();
  const { isLoading, error, execute } = useBaseApi();

  const fetchTaskCounts = async () => {
    const response = await execute(async () => tasksApi.getTaskCounts());
    if (response) setTaskCounts(response);
  };

  return { fetchTaskCounts, isLoading, error };
};

export default useGetTaskCounts;
