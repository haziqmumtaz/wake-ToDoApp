import TaskModal from '@/features/tasks/components/TaskModal';
import useTaskStore from '@/stores/useTaskStore';
import useConfigStore from '@/stores/useConfigStore';
import { FaCheckDouble, FaPlusCircle, FaMoon, FaSun, FaCheckCircle } from 'react-icons/fa';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import NumericBadge from './NumericBadge';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { taskCounts, isModalOpen, setIsModalOpen } = useTaskStore();
  const { theme, toggleTheme, language, setLanguage } = useConfigStore();
  const { t } = useTranslation();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [shouldSlideOut, setShouldSlideOut] = useState(false);

  useEffect(() => {
    if (showSuccessAlert && !shouldSlideOut) {
      const timer = setTimeout(() => {
        setShouldSlideOut(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
          setShouldSlideOut(false);
        }, 300);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert, shouldSlideOut]);

  const handleTaskSuccess = () => {
    setShowSuccessAlert(true);
    setShouldSlideOut(false);
  };

  const handleLanguageToggle = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
  };

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  return (
    <>
      <header className="h-16 flex justify-between bg-white dark:bg-gray-800 px-4 border-b dark:border-gray-700 relative">
        <div className="flex items-center gap-2">
          <FaCheckDouble size={34} className="text-black dark:text-white" />
          <p className="text-2xl font-bold text-black dark:text-white">{t('app.title')}</p>
          <div className="flex items-center gap-1 ml-4">
            <button
              onClick={handleLanguageToggle}
              className={`px-2 py-1 text-sm font-medium transition-colors ${
                language === 'en'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
              }`}
            >
              EN
            </button>
            <span className="text-gray-400 dark:text-gray-600">|</span>
            <button
              onClick={handleLanguageToggle}
              className={`px-2 py-1 text-sm font-medium transition-colors ${
                language === 'ar'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
              }`}
            >
              AR
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <FaMoon size={20} />
            ) : (
              <FaSun size={20} className="dark:text-white" />
            )}
          </Button>
          <NumericBadge
            value={taskCounts.uncompleted.toString()}
            backgroundColor="#6241E1"
            tooltip={t('header.tasksUncompleted')}
          />
          <NumericBadge
            value={taskCounts.deleted.toString()}
            backgroundColor="#E55251"
            tooltip={t('header.tasksDeleted')}
          />
          <NumericBadge
            value={taskCounts.completed.toString()}
            backgroundColor="#40CA28"
            tooltip={t('header.tasksCompleted')}
          />
          <span className="h-5 w-0.5 bg-[#DBDEE0] dark:bg-gray-600"></span>
          <Button className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
            <FaPlusCircle size={16} />
            <p className="text-sm">{t('header.addTodo')}</p>
          </Button>
        </div>
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleTaskSuccess}
          isOpen={isModalOpen}
        />

        {showSuccessAlert && (
          <div
            className={cn(
              'absolute top-full left-4 mt-2 w-80 z-50',
              shouldSlideOut ? 'animate-slide-out-to-left' : 'animate-slide-in-from-left'
            )}
          >
            <Alert className="bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700">
              <FaCheckCircle className="text-green-600 dark:text-green-400" />
              <AlertTitle className="text-green-800 dark:text-green-200">
                {t('alerts.success')}
              </AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-300">
                {t('alerts.taskCreated')}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </header>
    </>
  );
};
