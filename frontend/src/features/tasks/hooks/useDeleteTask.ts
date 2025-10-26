import { useCallback } from 'react';
import { tasksApi } from '../api';

const useDeleteTask = () => {
  const deleteTask = useCallback(async (id: number) => {
    await tasksApi.deleteTask(id);
  }, []);

  return { deleteTask };
};

export default useDeleteTask;
