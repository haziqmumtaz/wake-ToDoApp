import './App.css';
import { Header } from '@/components/Header';
import TaskList from '@/features/tasks/pages/TaskList';

function App() {
  return (
    <>
      <Header />
      <TaskList />
    </>
  );
}

export default App;
