import { Header } from '@/components/shared/Header';
import Tasks from '@/features/tasks/pages/Tasks';

function App() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header title="The Todo" uncompleted={10} deleted={10} completed={10} />
      <main className="flex-grow">
        <div className="h-full flex justify-center p-8">
          <Tasks />
        </div>
      </main>
    </div>
  );
}

export default App;
