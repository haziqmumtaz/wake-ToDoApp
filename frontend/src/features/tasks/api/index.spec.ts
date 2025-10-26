/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { tasksApi } from './index';
import { httpClient } from '@/lib/http';
import type { Task, TaskCounts } from '@/types/tasks';
import type { PaginatedResponse, PaginatedRequest } from '@/types/core';

vi.mock('@/lib/http');

describe('tasksApi', () => {
  const mockTasks: Task[] = [
    {
      id: 2,
      text: 'Complete the React project',
      completed: true,
      deleted: false,
      createdAt: '2025-02-03T13:00:00Z',
    },
    {
      id: 25,
      text: 'Task 2345',
      completed: false,
      deleted: false,
      createdAt: '2025-10-26T20:57:08.766Z',
    },
    {
      id: 21,
      text: 'Test 10',
      completed: true,
      deleted: false,
      createdAt: '2025-10-26T18:08:17.435Z',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPaginatedTasks', () => {
    it('calls httpClient.get with correct endpoint and params', async () => {
      const mockParams: PaginatedRequest = { _page: 1, _limit: 10 };
      const mockResponse: PaginatedResponse<Task> = {
        data: mockTasks,
        totalPages: 10,
      };

      (httpClient.get as any).mockResolvedValue(mockResponse);

      const result = await tasksApi.getPaginatedTasks(mockParams);

      expect(httpClient.get).toHaveBeenCalledWith('/tasks', { params: mockParams });
      expect(result).toEqual(mockResponse);
      expect(result.data).toHaveLength(3);
      expect(result.data[0].id).toBe(2);
      expect(result.data[0].text).toBe('Complete the React project');
    });

    it('handles pagination params correctly', async () => {
      const mockParams: PaginatedRequest = { _page: 2, _limit: 5 };
      const mockResponse: PaginatedResponse<Task> = {
        data: [mockTasks[1], mockTasks[2]],
        totalPages: 10,
      };

      (httpClient.get as any).mockResolvedValue(mockResponse);

      const result = await tasksApi.getPaginatedTasks(mockParams);

      expect(httpClient.get).toHaveBeenCalledWith('/tasks', { params: mockParams });
      expect(result.data).toHaveLength(2);
      expect(result.totalPages).toBe(10);
    });
  });

  describe('getTaskCounts', () => {
    it('calls httpClient.get with correct endpoint', async () => {
      const mockResponse: TaskCounts = {
        uncompleted: 5,
        completed: 10,
        deleted: 2,
      };

      (httpClient.get as any).mockResolvedValue(mockResponse);

      const result = await tasksApi.getTaskCounts();

      expect(httpClient.get).toHaveBeenCalledWith('/counts');
      expect(result).toEqual(mockResponse);
      expect(result.uncompleted).toBe(5);
      expect(result.completed).toBe(10);
    });
  });

  describe('updateTask', () => {
    it('calls httpClient.put with correct endpoint and payload for completed task', async () => {
      const mockPayload = {
        id: 2,
        text: 'Complete the React project',
        completed: true,
      };

      const mockResponse: Task = {
        id: 2,
        text: 'Complete the React project',
        completed: true,
        deleted: false,
        createdAt: '2025-02-03T13:00:00Z',
      };

      (httpClient.put as any).mockResolvedValue(mockResponse);

      const result = await tasksApi.updateTask(mockPayload);

      expect(httpClient.put).toHaveBeenCalledWith('/tasks/2', mockPayload);
      expect(result).toEqual(mockResponse);
      expect(result.completed).toBe(true);
    });

    it('calls httpClient.put with correct endpoint and payload for incomplete task', async () => {
      const mockPayload = {
        id: 25,
        text: 'Task 2345 - Updated',
        completed: true,
      };

      const mockResponse: Task = {
        id: 25,
        text: 'Task 2345 - Updated',
        completed: true,
        deleted: false,
        createdAt: '2025-10-26T20:57:08.766Z',
      };

      (httpClient.put as any).mockResolvedValue(mockResponse);

      const result = await tasksApi.updateTask(mockPayload);

      expect(httpClient.put).toHaveBeenCalledWith('/tasks/25', mockPayload);
      expect(result.completed).toBe(true);
    });
  });

  describe('deleteTask', () => {
    it('calls httpClient.delete with correct endpoint', async () => {
      (httpClient.delete as any).mockResolvedValue(undefined);

      await tasksApi.deleteTask(21);

      expect(httpClient.delete).toHaveBeenCalledWith('/tasks/21');
    });

    it('handles deletion of multiple tasks', async () => {
      (httpClient.delete as any).mockResolvedValue(undefined);

      await tasksApi.deleteTask(2);
      expect(httpClient.delete).toHaveBeenCalledWith('/tasks/2');

      await tasksApi.deleteTask(25);
      expect(httpClient.delete).toHaveBeenCalledWith('/tasks/25');
    });
  });

  describe('createTask', () => {
    it('calls httpClient.post with correct endpoint and payload', async () => {
      const mockPayload = {
        text: 'New task from test',
        completed: false,
        deleted: false,
        createdAt: '2025-10-26T22:00:00Z',
      };

      const mockResponse: Task = {
        id: 100,
        text: 'New task from test',
        completed: false,
        deleted: false,
        createdAt: '2025-10-26T22:00:00Z',
      };

      (httpClient.post as any).mockResolvedValue(mockResponse);

      const result = await tasksApi.createTask(mockPayload);

      expect(httpClient.post).toHaveBeenCalledWith('/tasks', mockPayload);
      expect(result).toEqual(mockResponse);
      expect(result.id).toBe(100);
      expect(result.completed).toBe(false);
    });

    it('creates task with completed status', async () => {
      const mockPayload = {
        text: 'Pre-completed task',
        completed: true,
        deleted: false,
        createdAt: '2025-10-26T22:00:00Z',
      };

      const mockResponse: Task = {
        id: 101,
        text: 'Pre-completed task',
        completed: true,
        deleted: false,
        createdAt: '2025-10-26T22:00:00Z',
      };

      (httpClient.post as any).mockResolvedValue(mockResponse);

      const result = await tasksApi.createTask(mockPayload);

      expect(result.completed).toBe(true);
      expect(result.text).toBe('Pre-completed task');
    });
  });
});
