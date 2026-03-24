// components/layout/Header.jsx
import { LogOut, User, ChevronDown, Camera, Sun, Moon, Coins, Plus, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Header = ({
  user,
  title,
  profileImage = "https://www.caasaa.com/assets/images/Gajendra-singh-Caasaa.jpg",
  onImageChange,
  credits = 250.00 // Default credits value
}) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreditDropdown, setShowCreditDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const creditDropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (creditDropdownRef.current && !creditDropdownRef.current.contains(event.target)) {
        setShowCreditDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/');
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should be less than 2MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        alert('Only JPG, PNG or GIF files are allowed');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (onImageChange) {
          onImageChange(reader.result, file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Get user initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className={`border-b rounded-lg backdrop-blur-md sticky top-0 z-30 transition-colors duration-300 ${isDarkMode
        ? 'bg-gray-900/50 border-gray-800'
        : 'bg-[#f9f1f1] border-gray-200'
      }`}>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/jpeg,image/png,image/gif"
        className="hidden"
      />

      <div className="px-4 py-1 flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img
              src={isDarkMode ? "/webkype-logo11.png" : "/webkype-logo11.png"}
              alt="Webkype"
              className="h-8 w-auto"
            />
          </button>
          <div className={`hidden md:block h-6 w-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-400'}`}></div>
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">
            {title}
          </span>
        </div>

        {/* Right - Credits, Dark Mode & Profile */}
        <div className="flex items-center gap-3">

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2.5 rounded-xl transition-all duration-300 ${isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                : 'bg-white hover:bg-gray-50 border border-gray-200'
              }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <div className="relative w-5 h-5">
              <Sun
                size={20}
                className={`absolute inset-0 transition-all duration-300 text-yellow-500 ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
                  }`}
              />
              <Moon
                size={20}
                className={`absolute inset-0 transition-all duration-300 ${isDarkMode ? 'opacity-0 -rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100 text-gray-600'
                  }`}
              />
            </div>
          </button>


          <div className="relative" ref={creditDropdownRef}>
            <button
              onClick={() => navigate('/credits')} // ← Direct navigation instead of dropdown
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${isDarkMode
                  ? 'bg-gray-800 border-gray-700 hover:border-gray-600 text-white'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm text-gray-900'
                }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-yellow-500/20' : 'bg-yellow-100'
                }`}>
                <Coins size={16} className="text-yellow-600" />
              </div>
              <div className="hidden sm:block text-left">
                <p className={`text-[10px] font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Credits
                </p>
                <p className="text-sm font-bold">
                  ${credits.toFixed(2)}
                </p>
              </div>
              {/* <ChevronRight
                size={14}
                className={isDarkMode ? 'text-gray-400' : 'text-gray-400'}
              /> */}
            </button>
          </div>


          {/* Profile Button with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all ${isDarkMode
                  ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
            >
              {/* Profile Avatar */}
              <div className="relative group">
                {profileImage || user?.avatar ? (
                  <img
                    src={profileImage || user?.avatar}
                    alt={user?.name || 'Profile'}
                    className={`w-10 h-10 rounded-full object-cover border-2 shadow-sm ${isDarkMode ? 'border-gray-700' : 'border-white'
                      }`}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                    {getInitials(user?.name || 'Gajendra Singh')}
                  </div>
                )}
              </div>

              <div className="hidden sm:block text-left">
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user?.name || 'Gajendra Singh'}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {user?.email || 'gajendra@webkype.com'}
                </p>
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform ${showDropdown ? 'rotate-180' : ''} ${isDarkMode ? 'text-gray-400' : 'text-gray-400'
                  }`}
              />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className={`absolute right-0 mt-2 w-72 rounded-xl border shadow-xl py-2 z-50 ${isDarkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
                }`}>
                {/* Profile Header */}
                <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {user?.name || 'Gajendra Singh'}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {user?.email || 'gajendra@webkype.com'}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setShowDropdown(false);
                    navigate('/profile');
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 ${isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <User size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                  My Profile
                </button>

                <button
                  onClick={() => {
                    setShowDropdown(false);
                    navigate('/dashboard');
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 ${isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                  >
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                  </svg>
                  Dashboard
                </button>

                {/* Dark Mode Toggle in Dropdown */}
                <button
                  onClick={toggleDarkMode}
                  className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between ${isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    {isDarkMode ? (
                      <Sun size={16} className="text-yellow-500" />
                    ) : (
                      <Moon size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                    )}
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </div>
                  {/* Toggle Switch */}
                  <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${isDarkMode ? 'bg-purple-600' : 'bg-gray-300'
                    }`}>
                    <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${isDarkMode ? 'translate-x-4' : 'translate-x-0'
                      }`} />
                  </div>
                </button>

                <div className={`border-t mt-2 pt-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <button
                    onClick={handleLogout}
                    className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 ${isDarkMode
                        ? 'text-red-400 hover:bg-red-900/30'
                        : 'text-red-600 hover:bg-red-50'
                      }`}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;