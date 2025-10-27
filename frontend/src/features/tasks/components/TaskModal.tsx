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
import { useTranslation } from 'react-i18next';

interface TaskModalProps {
  onClose: () => void;
  onSuccess?: () => void;
  isOpen: boolean;
}

const TaskModal = ({ onClose, onSuccess, isOpen }: TaskModalProps) => {
  const { createTask } = useCreateTask();
  const { updateTask } = useUpdateTask();
  const { fetchTasks } = useGetTasks();
  const { fetchTaskCounts } = useGetTaskCounts();
  const { setSelectedTask, selectedTask } = useTaskStore();
  const { t } = useTranslation();
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

      // Call onSuccess for new tasks only
      if (!isEditMode && onSuccess) {
        onSuccess();
      }

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
            <DialogTitle>
              {isEditMode ? t('taskModal.editTask') : t('taskModal.addTask')}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex flex-col items-center gap-2 items-start">
            <Textarea
              placeholder={t('taskModal.placeholder')}
              value={taskText}
              className={`text-black dark:text-white ${error ? 'border-red-500' : ''}`}
              onChange={e => {
                setTaskText(e.target.value);
                setError(null);
              }}
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {t('taskModal.charCount', { count: taskText.length })}
            </span>
            {error && <span className="text-red-500 text-sm mt-2">{error}</span>}
          </DialogDescription>
          <DialogFooter>
            <Button
              className="bg-white border border-black text-black hover:bg-gray-100 dark:bg-gray-500 dark:text-white"
              onClick={handleModalClose}
            >
              {t('taskModal.cancel')}
            </Button>
            <Button onClick={handleModalSubmit}>
              {isEditMode ? t('taskModal.update') : t('taskModal.submit')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskModal;
