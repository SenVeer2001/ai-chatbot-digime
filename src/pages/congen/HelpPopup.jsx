// HelpPopup.jsx - Slide-in from right side
import React, { useEffect, useState } from 'react';
import { X, HelpCircle } from 'lucide-react';

const HelpPopup = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to trigger animation
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  const helpVideos = [
    {
      title: "What is Module",
      videoUrl: "https://dynamic.heygen.ai/www/Home%20-%20Page%20-%20Rebrand/avatar_iv.mp4?updatedAt=1757984236000",
      description: "Learn how to create text-based learning modules with ConGen AI."
    },
    {
      title: "What is Article",
      videoUrl: "https://dynamic.heygen.ai/www/Home%20-%20Page%20-%20Rebrand/avatar_iv.mp4?updatedAt=1757984236000",
      description: "Learn how to create video-based interactive sessions."
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Slide-in Panel from Right */}
      <div 
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        
        {/* Header */}
        <div className="flex  justify-between px-5 mt-3">
          <div className="flex items-center gap-3">
           
            <div>
              <h2 className="text-xl font-semibold text-gray-800">How to Create Module Activity</h2>
              {/* <p className="text-xs text-white/70">Watch these tutorials to get started</p> */}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="rounded-full p-2 hover:bg-white/20 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-80px)] px-5 space-y-5">
          {helpVideos.map((item, index) => (
            <div 
              key={index}
              className=" bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Video Title */}
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                <h3 className="text-lg font-semibold text-slate-700">
                  {item.title}
                </h3>
                {/* <p className="text-xs text-slate-500 mt-0.5">{item.description}</p> */}
              </div>
              
              {/* Video Player */}
              <div className="px-5">
                <video
                  className="w-full h-full"
                  src={item.videoUrl}
                  autoPlay
                  loop
                  muted
                  
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          ))}

         
          
        </div>
      </div>
    </>
  );
};

export default HelpPopup;