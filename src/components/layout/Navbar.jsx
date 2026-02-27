import { Menu, X, Moon, Sun, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const Navbar = ({ darkMode, onToggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AC</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              AI Chatbot
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onToggleDarkMode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-gray-600" />
              )}
            </button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLogout}
              className="flex gap-2"
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onToggleDarkMode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-gray-600" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLogout}
              fullWidth
              className="justify-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
