import type { Task } from '@/types/tasks';
import { FaCheckCircle, FaTrashAlt, FaRegCheckCircle } from 'react-icons/fa';
// import { tasksApi } from '../api';

interface TaskRowProps {
  task: Task;
}

const TaskRow = ({ task }: TaskRowProps) => {
  const handleComplete = () => {
    // tasksApi.updateTask(id, { completed: !task.completed });
  };
  const handleDelete = () => {
    // tasksApi.deleteTask(id);
  };
  return (
    <div className="flex items-center justify-between border-b p-4 gap-3">
      {task.completed ? (
        <FaCheckCircle size={24} color="black" cursor="pointer" onClick={() => handleComplete()} />
      ) : (
        <FaRegCheckCircle
          size={24}
          color="#DBDEE0"
          cursor="pointer"
          onClick={() => handleComplete()}
        />
      )}
      <div className="flex items-center gap-4">
        <span
          className={`overflow-hidden text-ellipsis whitespace-nowrap font-bold ${task.completed ? 'line-through' : ''}`}
        >
          {task.text}
        </span>
        <FaTrashAlt size={24} color="#CA0001" cursor="pointer" onClick={() => handleDelete()} />
      </div>
    </div>
  );
};

export default TaskRow;
