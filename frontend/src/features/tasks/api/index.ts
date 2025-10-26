import { httpClient } from '@/lib/http';
import type { PaginatedRequest, PaginatedResponse } from '@/types/core';
import type { CreateTaskPayload, Task, TaskCounts, UpdateTaskPayload } from '@/types/tasks';

const tasksApi = {
  getPaginatedTasks: async (params: PaginatedRequest) => {
    const response = await httpClient.get<PaginatedResponse<Task>>(`/tasks`, { params });
    return response;
  },
  getTaskCounts: async () => {
    const response = await httpClient.get<TaskCounts>('/counts');
    return response;
  },
  updateTask: async (payload: UpdateTaskPayload) => {
    const response = await httpClient.put<Task>(`/tasks/${payload.id}`, payload);
    return response;
  },
  deleteTask: async (id: number) => {
    const response = await httpClient.delete<void>(`/tasks/${id}`);
    return response;
  },
  createTask: async (payload: CreateTaskPayload) => {
    const response = await httpClient.post<Task>('/tasks', payload);
    return response;
  },
};

export default tasksApi;
