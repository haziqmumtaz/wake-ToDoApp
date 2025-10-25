import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import type { Task } from '@/types/tasks';
import { useCallback } from 'react';

interface TaskModalProps {
  task: Task | undefined;
  onClose: () => void;
  isOpen: boolean;
}

const TaskModal = ({ task, onClose, isOpen }: TaskModalProps) => {
  const handleModalSubmit = useCallback(() => {
    console.log('submit');
    onClose();
  }, [onClose, task]);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <Textarea placeholder="Task" value={task?.text} />
          </DialogDescription>
          <DialogFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleModalSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskModal;
