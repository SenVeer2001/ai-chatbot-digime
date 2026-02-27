import { Moon, Sun, Bell } from 'lucide-react';
import { useApp } from '../../hooks/useApp';

const TopNavbar = () => {
  const { darkMode, setDarkMode, user } = useApp();

  return (
    <div className={`fixed top-0 left-64 right-0 h-16 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b flex items-center justify-between px-8 z-40`}>
      <div className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Hi {user.name}, what will you create?
      </div>

      <div className="flex items-center gap-4">
        <button className={`p-2 rounded-lg transition-all ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
          <Bell size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
          <div className="text-right">
            <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</div>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.email}</div>
          </div>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
