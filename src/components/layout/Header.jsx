import { LogOut, User, ChevronDown, Camera } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ user, title, profileImage="https://www.caasaa.com/assets/images/Gajendra-singh-Caasaa.jpg", onImageChange }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
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
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should be less than 2MB');
        return;
      }

      // Check file type
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        alert('Only JPG, PNG or GIF files are allowed');
        return;
      }

      // Create preview URL and pass to parent
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
    <div className="border-b border-gray-200 backdrop-blur-md sticky top-0 z-30">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/jpeg,image/png,image/gif"
        className="hidden"
      />

      <div className="max-w-7xl mx-auto py-1 flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img src="/webkype-logo11.png" alt="Webkype" className="h-8 w-auto" />
          </button>
          <div className="hidden md:block h-6 w-px bg-gray-400"></div>
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">
            {title}
          </span>
        </div>

        {/* Right - User Profile & Logout */}
        <div className="flex items-center gap-4">
          {/* Profile Button with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              {/* Profile Avatar */}
              <div className="relative group">
                {profileImage || user?.avatar ? (
                  <img
                    src={profileImage || user?.avatar}
                    alt={user?.name || 'Profile'}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                    {getInitials(user?.name || 'Gajendra Singh')}
                  </div>
                )}
              </div>

              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.name || 'Gajendra Singh'}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email || 'gajendra@webkype.com'}
                </p>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-gray-200 shadow-lg py-2 z-50">
                {/* Profile Header with Image Upload */}
                 <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900">{user?.name || 'Gajendra Singh'}</p>
              <p className="text-xs text-gray-500">{user?.email || 'gajendra@webkype.com'}</p>
            </div>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    navigate('/profile');
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                >
                  <User size={16} className="text-gray-500" />
                  My Profile
                </button>

                <button
                  onClick={() => {
                    setShowDropdown(false);
                    navigate('/dashboard');
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
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
                    className="text-gray-500"
                  >
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                  </svg>
                  Dashboard
                </button>

                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
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