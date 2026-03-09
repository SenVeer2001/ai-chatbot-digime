import { 
  CheckCircle2, Star, Plus, Image as ImageIcon, Type, MousePointer2,
  ChevronRight, Sparkles, FolderUp, ArrowRight, ArrowLeft, GripVertical, 
  Trash2, PlayCircle, BookOpen, CheckSquare, Files, MessageCircle, 
  ChevronDown, Award, X, FileText, Video, Edit3, Save,
  Layers, BookMarked, Users, Clock, Calendar, Check, Circle,
  HelpCircle, Eye, SkipForward, Upload,
  RotateCcw, Pause, Volume2, VolumeX, Maximize2, Play, RefreshCw
} from 'lucide-react';
import { useEffect, useRef, useState } from "react";

// ==================== WELCOME SCREEN ====================
export const WelcomeScreen = ({ onGetStarted }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Enhanced background curves with animation */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
        viewBox="0 0 1200 600"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Animated gradient definitions */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#756af7" stopOpacity="0.8">
              <animate attributeName="stop-color" values="#756af7; #9b5af7; #756af7" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#9b5af7" stopOpacity="0.4">
              <animate attributeName="stop-color" values="#9b5af7; #c47af7; #9b5af7" dur="4s" repeatCount="indefinite" />
            </stop>
          </linearGradient>

          <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="gradient3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0.2" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Smooth flowing curves with animation */}
        <path
          d="M-100 300 Q 150 100, 400 250 T 800 280 Q 1000 320, 1300 200"
          stroke="url(#gradient1)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow)"
        >
          <animate
            attributeName="d"
            values="M-100 300 Q 150 100, 400 250 T 800 280 Q 1000 320, 1300 200;
                    M-100 280 Q 150 150, 400 220 T 800 300 Q 1000 280, 1300 220;
                    M-100 300 Q 150 100, 400 250 T 800 280 Q 1000 320, 1300 200"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>

        <path
          d="M-100 200 Q 300 50, 600 180 T 1000 160 Q 1150 200, 1300 140"
          stroke="url(#gradient2)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        >
          <animate
            attributeName="d"
            values="M-100 200 Q 300 50, 600 180 T 1000 160 Q 1150 200, 1300 140;
                    M-100 220 Q 300 80, 600 200 T 1000 180 Q 1150 220, 1300 160;
                    M-100 200 Q 300 50, 600 180 T 1000 160 Q 1150 200, 1300 140"
            dur="10s"
            repeatCount="indefinite"
          />
        </path>

        <path
          d="M-100 400 Q 200 480, 500 420 T 900 450 Q 1100 400, 1300 480"
          stroke="url(#gradient3)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="8 12"
          fill="none"
          opacity="0.6"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="40"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>

        {/* Decorative circles with pulse animation */}
        <circle cx="200" cy="150" r="4" fill="#756af7" opacity="0.6">
          <animate attributeName="r" values="4; 6; 4" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6; 0.9; 0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="600" cy="250" r="5" fill="#60a5fa" opacity="0.5">
          <animate attributeName="r" values="5; 7; 5" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5; 0.8; 0.5" dur="4s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="950" cy="180" r="3" fill="#f472b6" opacity="0.7">
          <animate attributeName="r" values="3; 5; 3" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7; 1; 0.7" dur="3.5s" repeatCount="indefinite" />
        </circle>

        {/* Additional flowing line */}
        <path
          d="M0 500 C 200 450, 400 550, 600 480 S 1000 420, 1200 500"
          stroke="#c47af7"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          fill="none"
          opacity="0.4"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-24"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      
      {/* Enhanced floating elements */}
      <div className="absolute top-1/4 left-10 text-purple-300 pointer-events-none animate-pulse">
        <Plus size={20} strokeWidth={2.5} />
      </div>
      <div className="absolute top-1/2 right-20 text-blue-300 pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}>
        <Plus size={20} strokeWidth={2.5} />
      </div>
      <div className="absolute top-1/3 left-1/3 text-pink-300 pointer-events-none animate-pulse" style={{ animationDelay: '0.5s' }}>
        <Plus size={16} strokeWidth={2.5} />
      </div>
      
      {/* Enhanced blur orbs with animation */}
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full blur-3xl opacity-15 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl shadow-purple-100/50 p-6 md:p-10 flex flex-col items-center text-center relative z-10 backdrop-blur-sm bg-white/95">
        
        <div className="flex flex-col items-center mb-6">
          <div className="relative flex items-center justify-center mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl skew-x-[-12deg] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
              <span className="text-white font-black text-xl -skew-x-[-12deg]">C</span>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl absolute left-4 -z-10 skew-x-[-12deg] shadow-md"></div>
          </div>
          <span className="text-[10px] font-bold text-orange-500 tracking-[0.2em] uppercase">Content Generator</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 tracking-tight">
          Welcome to ConGen
        </h1>
        <p className="text-slate-500 text-sm max-w-md leading-relaxed mb-8">
         You've successfully started your free trial! Before diving in, please answer a few questions to help us tailor your experience.
        </p>

        <div className="relative w-full max-w-sm h-36 mb-8 flex justify-center items-end">
          <div className="relative w-36 h-24 border-4 border-slate-200 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <CheckCircle2 size={40} className="text-green-500 fill-green-50" />
            <div className="absolute -bottom-1.5 w-44 h-1 bg-slate-200 rounded-full"></div>
          </div>

          <div className="absolute top-2 left-8 w-9 h-9 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center hover:scale-110 transition-transform">
            <Layers size={16} className="text-purple-400" />
          </div>
          <div className="absolute top-2 right-8 w-9 h-9 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center hover:scale-110 transition-transform">
            <BookMarked size={16} className="text-orange-400" />
          </div>
          
          <div className="absolute top-0 left-1/4 p-1.5 text-orange-400 animate-pulse">
            <Star size={16} fill="currentColor" />
          </div>
          <div className="absolute top-8 left-1/3 p-1 bg-white shadow-md border border-slate-100 rounded-lg text-cyan-500 hover:scale-110 transition-transform">
            <ImageIcon size={12} />
          </div>
          <div className="absolute top-6 right-1/4 p-1 bg-white shadow-md border border-slate-100 rounded-lg text-blue-500 hover:scale-110 transition-transform">
            <Type size={12} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full mb-6">
          {[
            { icon: Sparkles, label: 'AI Powered', color: 'text-purple-500' },
            { icon: Clock, label: 'Save Time', color: 'text-blue-500' },
            { icon: Award, label: 'Pro Quality', color: 'text-amber-500' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <item.icon size={18} className={item.color} />
              <span className="text-[11px] font-medium text-slate-600">{item.label}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={onGetStarted}
          className="w-full py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-bold rounded-xl hover:from-slate-900 hover:to-black transition-all text-sm shadow-lg shadow-slate-200 flex items-center justify-center gap-2 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
        >
          Get Started
          <ArrowRight size={16} />
        </button>

      
      </div>

      <div className="absolute right-[8%] top-1/2 translate-y-8 hidden lg:block">
        <div className="relative animate-bounce-slow">
          <div className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl text-white shadow-xl rotate-12 hover:rotate-0 transition-transform">
            <MousePointer2 size={24} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Add this to your global CSS or Tailwind config */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(8px); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};






// ==================== last me hoga  ====================


