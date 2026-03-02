import React from 'react';
import { 
  X,
  Sparkles, 
  Infinity, 
  Users, 
  Lock, 
  ShieldCheck, 
  Video, 
  Share2,
  Crown,
  Check
} from 'lucide-react';

const SubscriptionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const features = [
    { icon: <Users size={18} />, text: "Invite unlimited participants to calls" },
    { icon: <Infinity size={18} />, text: "Unlimited video call duration" },
    { icon: <Sparkles size={18} />, text: "Advanced AI with GPT-4o" },
    { icon: <Video size={18} />, text: "HD video quality & recording" },
    
    { icon: <ShieldCheck size={18} />, text: "Priority 24/7 support" },
   
  ];

  return (
    <div className="fixed inset-0   bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-sans">
      <div className="w-full  max-w-[480px] bg-gradient-to-br from-[#f0f4ff] to-white rounded-[32px] border border-slate-200 shadow-2xl p-10 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-3 top-2 p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <X size={20} className="text-slate-400" />
        </button>

        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Crown size={20} className="text-amber-500" />
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Upgrade Required
              </span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Pro Plan</h2>
          </div>
          <span className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            Recommended
          </span>
        </div>

        {/* Pricing Section */}
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-2xl font-light text-slate-500 mr-1">₹</span>
            <span className="text-6xl font-bold text-slate-900 tracking-tighter">999</span>
            <div className="ml-3 text-slate-500 leading-tight">
              <p className="text-sm font-medium">INR /</p>
              <p className="text-xs">month (exclusive of GST)</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-700 font-medium mb-8">
          Invite users & unlock premium features
        </p>

        {/* Action Button */}
        <button className="w-full py-2  bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-200 mb-8 flex items-center justify-center gap-2">
          <Sparkles size={18} />
          Upgrade to Pro
        </button>

        {/* Features List */}
        <ul className="space-y-5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-4 text-slate-700">
              <span className="text-cyan-500 shrink-0 p-1 bg-cyan-50 rounded-lg">
                {feature.icon}
              </span>
              <span className="text-[15px] font-normal leading-relaxed">
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-2 pt-2 border-t border-slate-200 text-center">
          <button 
            onClick={onClose}
            className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;