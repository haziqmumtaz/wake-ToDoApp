import { useEffect, useState } from 'react';
import type { Task } from '@/types/tasks';
import { taskApi } from '../api';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    taskApi.getPaginatedTasks().then(setTasks);
  }, []);

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>
          <h3>{task.text}</h3>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
