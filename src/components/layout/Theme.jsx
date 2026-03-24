// components/Theme.jsx
import React from 'react';
import { useTheme } from '../../context/ThemeContext';


function Theme({ children }) {
  const { isDarkMode } = useTheme();

  return (
    <div className="relative min-h-screen">
      {/* Conic gradient background - Dark mode ke according change hoga */}
      <div 
        className={`conic-gradient-bg transition-colors duration-500 ${
          isDarkMode ? 'dark-bg' : 'light-bg'
        }`} 
      />
      
      {/* Glass layout overlay */}
      <div 
        className={`fixed inset-0 z-0 glass-layout transition-colors duration-500 ${
          isDarkMode ? 'glass-layout-dark' : 'glass-layout-light'
        }`} 
      />
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default Theme;