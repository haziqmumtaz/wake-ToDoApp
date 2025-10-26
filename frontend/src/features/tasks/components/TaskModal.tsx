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
import useTaskStore from '@/stores/useTaskStore';
import { useEffect, useState } from 'react';
import { useCreateTask, useGetTaskCounts, useGetTasks, useUpdateTask } from '../hooks';
import { validateCreateTask } from '../api/schemas';
import { ZodError } from 'zod';

interface TaskModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const TaskModal = ({ onClose, isOpen }: TaskModalProps) => {
  const { createTask } = useCreateTask();
  const { updateTask } = useUpdateTask();
  const { fetchTasks } = useGetTasks();
  const { fetchTaskCounts } = useGetTaskCounts();
  const { setSelectedTask, selectedTask } = useTaskStore();
  const [taskText, setTaskText] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTaskText(selectedTask.text || '');
    setIsEditMode(!!selectedTask.id);
    setError(null); // Clear error when modal opens with a new task
  }, [selectedTask]);

  const handleModalSubmit = async () => {
    try {
      setError(null);

      // Validate the input
      const taskPayload = {
        text: taskText,
        completed: isEditMode ? selectedTask.completed : false,
        deleted: isEditMode ? selectedTask.deleted : false,
        createdAt: new Date().toISOString(),
      };

      // Validate with Zod schema
      const validatedData = validateCreateTask(taskPayload);

      if (isEditMode) {
        // Update existing task
        await updateTask({
          id: selectedTask.id,
          text: validatedData.text,
          completed: validatedData.completed,
          deleted: validatedData.deleted,
        });
        await fetchTasks({ _page: 1, _limit: 10 });
        await fetchTaskCounts();
      } else {
        // Create new task
        await createTask(validatedData);
        await fetchTasks({ _page: 1, _limit: 10 });
        await fetchTaskCounts();
      }

      setSelectedTask({ id: 0, text: '', completed: false, deleted: false, createdAt: '' });
      setTaskText('');
      setError(null);
      onClose();
    } catch (err) {
      if (err instanceof ZodError) {
        // Format Zod errors for display
        const errorMessage = err.issues.map((e: { message: string }) => e.message).join(', ');
        setError(errorMessage);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleModalClose = () => {
    setSelectedTask({ id: 0, text: '', completed: false, deleted: false, createdAt: '' });
    setTaskText('');
    setError(null);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleModalClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Task' : 'Add Task'}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="flex flex-col items-center gap-2 items-start">
              <Textarea
                placeholder="Task"
                value={taskText}
                className={`text-black ${error ? 'border-red-500' : ''}`}
                onChange={e => {
                  setTaskText(e.target.value);
                  setError(null); // Clear error when user types
                }}
              />
              <div className="flex flex-col items-center gap-2 items-start">
                <span className="text-sm text-gray-500"> {taskText.length} / 50</span>
                {error && <span className="text-red-500 text-sm mt-2">{error}</span>}
              </div>
            </div>
          </DialogDescription>
          <DialogFooter>
            <Button onClick={handleModalClose}>Cancel</Button>
            <Button onClick={handleModalSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskModal;
