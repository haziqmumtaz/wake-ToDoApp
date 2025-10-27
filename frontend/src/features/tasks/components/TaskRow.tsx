import type { Task } from '@/types/tasks';
import { memo } from 'react';
import { FaCheckCircle, FaTrashAlt, FaRegCheckCircle } from 'react-icons/fa';
import { useGetTaskCounts, useGetTasks, useUpdateTask, useDeleteTask } from '../hooks';
import useTaskStore from '@/stores/useTaskStore';

interface TaskRowProps {
  task: Task;
  isLoading: boolean;
}

const TaskRow = memo(({ task,isLoading }: TaskRowProps) => {
  const { setTaskCounts, taskCounts, setSelectedTask, setIsModalOpen, currentPage } =
    useTaskStore();
  const { updateTask } = useUpdateTask();
  const { deleteTask } = useDeleteTask();
  const { fetchTasks } = useGetTasks();
  const { fetchTaskCounts } = useGetTaskCounts();

  const handleComplete = async () => {
    await updateTask({ ...task, completed: !task.completed });
    setTaskCounts({
      ...taskCounts,
      uncompleted: task.completed ? taskCounts.uncompleted + 1 : taskCounts.uncompleted - 1,
      completed: task.completed ? taskCounts.completed - 1 : taskCounts.completed + 1,
    });
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    await fetchTasks({ _page: currentPage, _limit: 10 });
    await fetchTaskCounts();
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  if(isLoading) {
    return (
      <div className="flex justify-center items-center gap-3 border-b p-4 select-none">
        <div className="w-4 h-4 animate-spin rounded-full border-2 border-gray-500 dark:border-gray-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-3 border-b p-4 select-none"
      style={{ cursor: 'pointer' }}
      onDoubleClick={e => handleDoubleClick(e)}
    >
 { task.completed ? (
        <FaCheckCircle
          size={24}
          color="black"
          className="flex-shrink-0 dark:fill-white"
          onClick={() => handleComplete()}
          onDoubleClick={e => e.stopPropagation()}
        />
      ) : (
        <FaRegCheckCircle
          size={24}
          color="#DBDEE0"
          className="flex-shrink-0 dark:fill-gray-500"
          onClick={() => handleComplete()}
          onDoubleClick={e => e.stopPropagation()}
        />
      )}
      <span
        className={`overflow-hidden text-ellipsis whitespace-nowrap text-end font-bold flex-1 min-w-0 text-black dark:text-white ${task.completed ? 'line-through' : ''}`}
      >
        {task.text}
      </span>
      <FaTrashAlt
        size={24}
        color="#CA0001"
        className="flex-shrink-0"
        onClick={() => handleDelete()}
        onDoubleClick={e => e.stopPropagation()}
      />
    </div>
  );
});

TaskRow.displayName = 'TaskRow';

export default TaskRow;
