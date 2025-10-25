import { FaCheckDouble, FaPlusCircle } from 'react-icons/fa';
import { Button } from '../ui/button';
import NumericBadge from './NumericBadge';
import { useState } from 'react';
import TaskModal from '@/features/tasks/components/TaskModal';

interface HeaderProps {
  title: string;
  uncompleted: number;
  deleted: number;
  completed: number;
}

export const Header = ({ title, uncompleted, deleted, completed }: HeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <header className="h-16 flex justify-between bg-white px-4 border-b">
        <div className="flex items-center gap-2">
          <FaCheckDouble size={34} />
          <p className="text-2xl font-bold">{title}</p>
        </div>
        <div className="flex items-center gap-3">
          <NumericBadge
            value={uncompleted}
            backgroundColor="#6241E1"
            tooltip="No. of Tasks uncompleted"
          />
          <NumericBadge value={deleted} backgroundColor="#E55251" tooltip="No. of Tasks deleted" />
          <NumericBadge
            value={completed}
            backgroundColor="#40CA28"
            tooltip="No. of Tasks completed"
            className="text-[black]"
          />
          <span className="h-5 w-0.5 bg-[#DBDEE0]"></span>
          <Button className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
            <FaPlusCircle size={16} color="white" />
            <p className="text-sm text-white">Add Todo</p>
          </Button>
        </div>
        <TaskModal task={undefined} onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} />
      </header>
    </>
  );
};
