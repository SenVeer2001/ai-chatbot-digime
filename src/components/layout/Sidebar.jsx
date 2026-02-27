import { Home, Sparkles, Book, Archive, FolderOpen, Wrench, Settings, LogOut, CreditCard, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../hooks/useApp';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, darkMode } = useApp();
  const [showWorkspace, setShowWorkspace] = useState(false);

  const menuItems = [
    { icon: Home, label: 'HOME', path: '/dashboard' },
    { icon: Sparkles, label: 'DIGIME', path: '/digime' },
    { icon: Book, label: 'AICHA', path: '/aicha' },
    { icon: Wrench, label: 'TOOLS', path: '/tools' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`fixed left-0 top-0 h-screen w-64 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} border-r flex flex-col`}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <img src="/webkype-logo11.png" alt="Webkype" className="h-8 w-auto" />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive(item.path)
                ? 'bg-blue-500 text-white'
                : darkMode
                ? 'text-gray-400 hover:bg-gray-800'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="border-t border-gray-200 dark:border-gray-800 p-4 space-y-3">
        <div className={`px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
          <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-blue-900'}`}>{user.credits}</div>
          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Credits left</div>
        </div>

        <button className="w-full flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium">
          <CreditCard size={16} />
          Upgrade
        </button>

        <div className="relative">
          <button
            onClick={() => setShowWorkspace(!showWorkspace)}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all ${
              darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            <span className="text-sm font-medium">Workspace</span>
            <ChevronDown size={16} />
          </button>

          {showWorkspace && (
            <div className={`absolute bottom-full left-0 right-0 mb-2 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-2`}>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-700/50 rounded text-sm">Default</button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-700/50 rounded text-sm">Settings</button>
            </div>
          )}
        </div>

        <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
          darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
        }`}>
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
