import Pagination from '@/components/shared/Pagination';
import useTaskStore from '@/stores/useTaskStore';
import { useEffect } from 'react';
import TaskRow from '../components/TaskRow';
import { useGetTaskCounts, useGetTasks } from '../hooks';

const Tasks = () => {
  const { fetchTasks, isLoading, error } = useGetTasks();
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
      <div className="flex flex-col border min-h-[66vh] shadow-md">
        {isLoading && (
          <div className="flex flex-col gap-2 justify-center items-center h-full">
            <div className="w-4 h-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" />
            <span className="text-gray-500">Loading tasks...</span>
          </div>
        )}

        {error && (
          <div className="p-4 flex flex-col gap-2 justify-center items-center h-full">
            <span className="text-center text-red-500">Error: {error}</span>
          </div>
        )}
        {tasks.map(task => (
          <TaskRow key={task.id} task={task} />
        ))}
      </div>
      {tasks.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={page => {
              setCurrentPage(page);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Tasks;
