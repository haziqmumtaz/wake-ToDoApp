import { httpClient } from '@/lib/http';
import type { Task } from '@/types/tasks';

export const taskApi = {
  getPaginatedTasks: async () => {
    const response = await httpClient.get<Task[]>('/tasks');
    return response;
  },
};
