// HelpPopup.jsx - Slide-in from right side
import React from 'react';
import { X, HelpCircle } from 'lucide-react';

const HelpPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const helpVideos = [
    {
      title: "What Is Article",
      videoUrl: "./avatar_iv.webm",
      description: "Learn how to create text-based learning modules with ConGen AI."
    },
    {
      title: "What Is Video",
      videoUrl: "./avatar_iv.webm",
      description: "Learn how to create video-based interactive sessions."
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Slide-in Panel from Right */}
      <div className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out animate-slide-in-right">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <HelpCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">How to Create Module Activity</h2>
              <p className="text-xs text-white/70">Watch these tutorials to get started</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="rounded-full p-2 hover:bg-white/20 transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-80px)] p-5 space-y-5">
          {helpVideos.map((item, index) => (
            <div 
              key={index}
              className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Video Title */}
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                <h3 className="text-base font-semibold text-slate-700">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
              </div>
              
              {/* Video Player */}
              <div className="aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src={item.videoUrl}
                  title={item.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ))}

          {/* Additional Help Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-700 font-medium mb-2">💡 Quick Tips</p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>• Drag and drop to reorder activities</li>
              <li>• Click pencil icon to edit any content</li>
              <li>• Use AI to generate content automatically</li>
              <li>• Preview before publishing your module</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default HelpPopup;