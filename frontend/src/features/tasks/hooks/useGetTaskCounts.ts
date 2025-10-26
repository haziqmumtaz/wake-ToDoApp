import useTaskStore from '@/stores/useTaskStore';
import { tasksApi } from '../api';

const useGetTaskCounts = () => {
  const { setTaskCounts } = useTaskStore();
  const fetchTaskCounts = async () => {
    const response = await tasksApi.getTaskCounts();
    setTaskCounts(response);
  };

  return { fetchTaskCounts };
};

export default useGetTaskCounts;
