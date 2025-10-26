import Pagination from '@/components/shared/Pagination';
import useTaskStore from '@/stores/useTaskStore';
import { useEffect } from 'react';
import TaskRow from '../components/TaskRow';
import { useGetTaskCounts, useGetTasks } from '../hooks';

const Tasks = () => {
  const { fetchTasks } = useGetTasks();
  const { fetchTaskCounts } = useGetTaskCounts();
  const { tasks, totalPages, currentPage, setCurrentPage } = useTaskStore();

  // Only fetch on mount and when currentPage changes
  useEffect(() => {
    fetchTasks({ _page: currentPage, _limit: 10 });
    fetchTaskCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className="flex  lg:w-[35%] w-full flex-col gap-3">
      <div className="flex flex-col border min-h-[64vh] shadow-md">
        {tasks.map(task => (
          <TaskRow key={task.id} task={task} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          totalPages={totalPages}
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
