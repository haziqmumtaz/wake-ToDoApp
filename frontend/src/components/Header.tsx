import { FaCheckDouble } from 'react-icons/fa';

export const Header = () => {
  return (
    <header className="h-16 flex fixed top-0 left-0 right-0  bg-white px-4 border-b items-center">
      <div className="flex items-center gap-2">
        <FaCheckDouble size={34} />
        <p className="text-2xl font-bold">The Todo</p>
      </div>
    </header>
  );
};
