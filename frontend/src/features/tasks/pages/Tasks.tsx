import { useEffect, useState } from 'react';
import TaskRow from '../components/TaskRow';
import Pagination from '@/components/shared/Pagination';
import { tasksApi } from '../api';
import type { Task } from '@/types/tasks';

const Tasks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    tasksApi.getPaginatedTasks().then(response => setTasks(response));
  }, []);

  return (
    <div className="flex  lg:w-[35%] flex-col gap-3">
      <div className="flex flex-col border min-h-[60vh] shadow-md ">
        {tasks.map(task => (
          <TaskRow key={task.id} task={task} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          totalPages={10}
          currentPage={currentPage}
          onPageChange={page => {
            setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default Tasks;
