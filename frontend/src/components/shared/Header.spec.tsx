/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';
import { Header } from './Header';
import useTaskStore from '@/stores/useTaskStore';
import useConfigStore from '@/stores/useConfigStore';
import TaskModal from '@/features/tasks/components/TaskModal';

vi.mock('@/stores/useTaskStore');
vi.mock('@/stores/useConfigStore');
vi.mock('@/features/tasks/components/TaskModal');
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: { type: 'languageDetector' },
}));

describe('Header', () => {
  let mockSetIsModalOpen: ReturnType<typeof vi.fn>;
  let mockTaskCounts: { uncompleted: number; completed: number; deleted: number };

  beforeEach(() => {
    mockSetIsModalOpen = vi.fn();
    mockTaskCounts = {
      uncompleted: 5,
      completed: 10,
      deleted: 2,
    };

    (useTaskStore as any).mockReturnValue({
      taskCounts: mockTaskCounts,
      isModalOpen: false,
      setIsModalOpen: mockSetIsModalOpen,
    });

    (useConfigStore as any).mockReturnValue({
      theme: 'light',
      language: 'en',
      toggleTheme: vi.fn(),
      setLanguage: vi.fn(),
    });

    (TaskModal as any).mockImplementation(({ isOpen }: any) =>
      isOpen ? <div data-testid="task-modal">Modal</div> : null
    );
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders title correctly', () => {
    render(<Header />);
    expect(screen.getByText('app.title')).toBeInTheDocument();
  });

  it('renders uncompleted tasks badge', () => {
    render(<Header />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders deleted tasks badge', () => {
    render(<Header />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders completed tasks badge', () => {
    render(<Header />);
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('displays 99+ for values over 99', () => {
    (useTaskStore as any).mockReturnValue({
      taskCounts: {
        uncompleted: 100,
        completed: 200,
        deleted: 150,
      },
      isModalOpen: false,
      setIsModalOpen: mockSetIsModalOpen,
    });

    render(<Header />);
    expect(screen.getAllByText('99+')).toHaveLength(3);
  });

  it('renders add todo button', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: 'header.addTodo' })).toBeInTheDocument();
  });

  it('opens modal when add todo button is clicked', async () => {
    render(<Header />);
    const button = screen.getByRole('button', { name: 'header.addTodo' });
    await userEvent.click(button);
    expect(mockSetIsModalOpen).toHaveBeenCalledWith(true);
  });

  it('renders modal when isModalOpen is true', () => {
    (useTaskStore as any).mockReturnValue({
      taskCounts: mockTaskCounts,
      isModalOpen: true,
      setIsModalOpen: mockSetIsModalOpen,
    });

    render(<Header />);
    expect(screen.getByTestId('task-modal')).toBeInTheDocument();
  });

  it('does not render modal when isModalOpen is false', () => {
    render(<Header />);
    expect(screen.queryByTestId('task-modal')).not.toBeInTheDocument();
  });

  describe('Language toggle', () => {
    it('calls setLanguage when language button is clicked', async () => {
      const mockSetLanguage = vi.fn();
      (useConfigStore as any).mockReturnValue({
        theme: 'light',
        language: 'ar',
        toggleTheme: vi.fn(),
        setLanguage: mockSetLanguage,
      });

      render(<Header />);
      const buttons = screen
        .getAllByRole('button')
        .filter(btn => btn.textContent === 'EN' || btn.textContent === 'AR');
      const enButton = buttons.find(btn => btn.textContent === 'EN');
      if (enButton) {
        await userEvent.click(enButton);
        expect(mockSetLanguage).toHaveBeenCalledWith('en');
      }
    });

    it('applies correct styling based on language', () => {
      (useConfigStore as any).mockReturnValue({
        theme: 'light',
        language: 'en',
        toggleTheme: vi.fn(),
        setLanguage: vi.fn(),
      });

      render(<Header />);
      const buttons = screen
        .getAllByRole('button')
        .filter(btn => btn.textContent === 'EN' || btn.textContent === 'AR');
      const enButton = buttons.find(btn => btn.textContent === 'EN');
      const arButton = buttons.find(btn => btn.textContent === 'AR');
      expect(enButton).toHaveClass('text-blue-600');
      expect(arButton).toHaveClass('text-gray-400');
    });
  });

  describe('Theme toggle', () => {
    it('displays moon icon in light theme', () => {
      (useConfigStore as any).mockReturnValue({
        theme: 'light',
        language: 'en',
        toggleTheme: vi.fn(),
        setLanguage: vi.fn(),
      });

      render(<Header />);
      const themeButton = screen.getByLabelText('Toggle theme');
      expect(themeButton.querySelector('svg')).toBeInTheDocument();
    });

    it('displays sun icon with dark class in dark theme', () => {
      (useConfigStore as any).mockReturnValue({
        theme: 'dark',
        language: 'en',
        toggleTheme: vi.fn(),
        setLanguage: vi.fn(),
      });

      render(<Header />);
      const themeButton = screen.getByLabelText('Toggle theme');
      const sunIcon = themeButton.querySelector('svg');
      expect(sunIcon).toBeInTheDocument();
      expect(sunIcon).toHaveClass('dark:text-white');
    });

    it('calls toggleTheme when theme button is clicked', async () => {
      const mockToggleTheme = vi.fn();
      (useConfigStore as any).mockReturnValue({
        theme: 'light',
        language: 'en',
        toggleTheme: mockToggleTheme,
        setLanguage: vi.fn(),
      });

      render(<Header />);
      const themeButton = screen.getByLabelText('Toggle theme');
      await userEvent.click(themeButton);
      expect(mockToggleTheme).toHaveBeenCalled();
    });
  });

  describe('Language attribute updates', () => {
    it('sets document dir to rtl when language is Arabic', () => {
      (useConfigStore as any).mockReturnValue({
        theme: 'light',
        language: 'ar',
        toggleTheme: vi.fn(),
        setLanguage: vi.fn(),
      });

      render(<Header />);
      expect(document.documentElement.getAttribute('dir')).toBe('rtl');
      expect(document.documentElement.getAttribute('lang')).toBe('ar');
    });

    it('sets document dir to ltr when language is English', () => {
      (useConfigStore as any).mockReturnValue({
        theme: 'light',
        language: 'en',
        toggleTheme: vi.fn(),
        setLanguage: vi.fn(),
      });

      render(<Header />);
      expect(document.documentElement.getAttribute('dir')).toBe('ltr');
      expect(document.documentElement.getAttribute('lang')).toBe('en');
    });
  });

  describe('Success alert - handleTaskSuccess', () => {
    it('sets showSuccessAlert to true and shouldSlideOut to false when called (lines 34-36)', async () => {
      let onSuccessCallback: (() => void) | undefined;

      (TaskModal as any).mockImplementation(({ onSuccess }: any) => {
        onSuccessCallback = onSuccess;
        return <div data-testid="task-modal">Modal</div>;
      });

      render(<Header />);

      // Trigger the success callback
      if (onSuccessCallback) {
        await act(async () => {
          onSuccessCallback!();
        });
      }

      // The alert should now be rendered
      await waitFor(() => {
        expect(screen.getByText('alerts.success')).toBeInTheDocument();
      });
    });

    it('applies animate-slide-in-from-left class initially (lines 121-125)', async () => {
      let onSuccessCallback: (() => void) | undefined;

      (TaskModal as any).mockImplementation(({ onSuccess }: any) => {
        onSuccessCallback = onSuccess;
        return <div data-testid="task-modal">Modal</div>;
      });

      const { container } = render(<Header />);

      if (onSuccessCallback) {
        await act(async () => {
          onSuccessCallback!();
        });
      }

      await waitFor(() => {
        const alertContainer = container.querySelector('.animate-slide-in-from-left');
        expect(alertContainer).toBeInTheDocument();
      });
    });

    it('does not render alert initially (lines 121-136)', () => {
      render(<Header />);
      expect(screen.queryByText('alerts.success')).not.toBeInTheDocument();
    });
  });

  describe('Language toggle - handleLanguageToggle', () => {
    it('calls setLanguage with ar when toggling from en to ar (lines 39-41)', async () => {
      const mockSetLanguage = vi.fn();
      (useConfigStore as any).mockReturnValue({
        theme: 'light',
        language: 'en',
        toggleTheme: vi.fn(),
        setLanguage: mockSetLanguage,
      });

      render(<Header />);
      const buttons = screen.getAllByRole('button');
      const arButton = buttons.find(btn => btn.textContent === 'AR');

      if (arButton) {
        await userEvent.click(arButton);
        expect(mockSetLanguage).toHaveBeenCalledWith('ar');
      }
    });

    it('calls setLanguage with en when toggling from ar to en', async () => {
      const mockSetLanguage = vi.fn();
      (useConfigStore as any).mockReturnValue({
        theme: 'light',
        language: 'ar',
        toggleTheme: vi.fn(),
        setLanguage: mockSetLanguage,
      });

      render(<Header />);
      const buttons = screen.getAllByRole('button');
      const enButton = buttons.find(btn => btn.textContent === 'EN');

      if (enButton) {
        await userEvent.click(enButton);
        expect(mockSetLanguage).toHaveBeenCalledWith('en');
      }
    });
  });

  describe('Button styling (lines 61, 71, 90)', () => {
    it('applies text-gray-400 to EN button when language is ar (line 61)', () => {
      (useConfigStore as any).mockReturnValue({
        theme: 'light',
        language: 'ar',
        toggleTheme: vi.fn(),
        setLanguage: vi.fn(),
      });

      render(<Header />);
      const buttons = screen.getAllByRole('button');
      const enButton = buttons.find(btn => btn.textContent === 'EN');
      expect(enButton).toHaveClass('text-gray-400');
    });

    it('applies text-blue-600 to AR button when language is ar (line 71)', () => {
      (useConfigStore as any).mockReturnValue({
        theme: 'light',
        language: 'ar',
        toggleTheme: vi.fn(),
        setLanguage: vi.fn(),
      });

      render(<Header />);
      const buttons = screen.getAllByRole('button');
      const arButton = buttons.find(btn => btn.textContent === 'AR');
      expect(arButton).toHaveClass('text-blue-600');
    });

    it('applies dark:text-white to sun icon in dark theme (line 90)', () => {
      (useConfigStore as any).mockReturnValue({
        theme: 'dark',
        language: 'en',
        toggleTheme: vi.fn(),
        setLanguage: vi.fn(),
      });

      render(<Header />);
      const themeButton = screen.getByLabelText('Toggle theme');
      const sunIcon = themeButton.querySelector('svg');
      expect(sunIcon).toHaveClass('dark:text-white');
    });
  });
});
