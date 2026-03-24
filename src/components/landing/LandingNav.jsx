// components/landing/LandingNav.jsx
import { useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';

const LandingNav = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <nav className={`sticky top-0 z-40 backdrop-blur-xl border-b shadow-lg transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-gray-700/50' 
        : 'bg-gradient-to-r from-white/20 to-white/10 border-white/20'
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img 
            src={isDarkMode ? "/webkype-logo11.png" : "/webkype-logo11.png"} 
            alt="Webkype" 
            className="h-10 w-auto" 
          />
        </div>

        {/* Right Side - Dark Mode Toggle & CTA */}
        <div className="flex items-center gap-3">
          
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className={`relative p-2.5 rounded-xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
                : 'bg-white/80 hover:bg-white border border-gray-200'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <div className="relative w-5 h-5">
              <Sun 
                size={20} 
                className={`absolute inset-0 transition-all duration-300 text-yellow-500 ${
                  isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
                }`}
              />
              <Moon 
                size={20} 
                className={`absolute inset-0 transition-all duration-300 ${
                  isDarkMode ? 'opacity-0 -rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100 text-gray-600'
                }`}
              />
            </div>
          </button>

          {/* Get Started Button */}
          <Button 
            onClick={() => navigate('/auth')} 
            size="md"
            className={isDarkMode ? 'shadow-purple-500/25' : ''}
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;