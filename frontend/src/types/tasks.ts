export type Task = {
  id: number;
  text: string;
  completed: boolean;
  deleted: boolean;
  createdAt: string;
};

export type CreateTaskPayload = Omit<Task, 'id'>;
export type UpdateTaskPayload = Partial<Omit<Task, 'createdAt'>>;

export type TaskStatus = 'completed' | 'uncompleted' | 'deleted';

export type TaskCounts = { [key in TaskStatus]: number };
