import { Header } from '@/components/shared/Header';
import Tasks from '@/features/tasks/pages/Tasks';

function App() {
  return (
    <div className="h-screen w-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow bg-white dark:bg-gray-900">
        <div className="h-full flex justify-center p-8">
          <Tasks />
        </div>
      </main>
    </div>
  );
}

export default App;
