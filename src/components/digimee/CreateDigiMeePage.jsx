// components/digimee/CreateDigiMeePage.jsx
import { ArrowRight, ArrowLeft, Camera, Mic, Zap, Check, X, Sparkles, User, Lightbulb, FileText, Clock } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../hooks/useApp';
import Header from '../layout/Header';

// Do's and Don'ts Popup Component
const TipsPopup = ({ onClose, onContinue }) => (
  <div 
    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    onClick={(e) => e.target === e.currentTarget && onClose()}
  >
    <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden border border-gray-200 shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-500 p-6 text-center relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <X size={20} className="text-white" />
        </button>
        <div className="w-14 h-14 mx-auto mb-3 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
          <Camera size={28} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Recording Tips</h2>
        <p className="text-white/80 text-sm mt-1">Follow these for best results</p>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Pro Tip */}
        <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Lightbulb size={20} className="text-white" />
          </div>
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Pro Tip:</span> Good lighting and a quiet environment will significantly improve quality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Do's */}
          <div className="p-5 rounded-2xl bg-green-50 border border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Check size={18} className="text-white" />
              </div>
              <h3 className="font-bold text-green-700">Do's</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                Good lighting on your face
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                Stable camera position
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                Clear background
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                Look directly at camera
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                Speak clearly and naturally
              </li>
            </ul>
          </div>

          {/* Don'ts */}
          <div className="p-5 rounded-2xl bg-red-50 border border-red-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <X size={18} className="text-white" />
              </div>
              <h3 className="font-bold text-red-700">Don'ts</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✗</span>
                Wear hats or sunglasses
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✗</span>
                Move during recording
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✗</span>
                Dark or noisy room
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✗</span>
                Look away from camera
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✗</span>
                Whisper or shout
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onContinue}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            I Understand
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Main Create Page Component
const CreateDigiMeePage = () => {
  const navigate = useNavigate();
  const { avatars } = useApp();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [showTipsPopup, setShowTipsPopup] = useState(false);
  const [avatarName, setAvatarName] = useState('');
  const [digimeAvatars, setDigimeAvatars] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('digimeList') || '[]');
      return saved.length ? saved : avatars;
    } catch {
      return avatars;
    }
  });

  const steps = [
    { id: 1, title: 'Overview', icon: Sparkles },
    { id: 2, title: 'Consent Video', icon: Camera },
    { id: 3, title: 'Training', icon: Mic },
    { id: 4, title: 'Generate', icon: Zap },
  ];

  const handleGetStarted = () => {
    setShowTipsPopup(true);
  };

  const handleTipsContinue = () => {
    setShowTipsPopup(false);
    setCurrentStep(2);
  };

  const handleCreate = () => {
    if (!avatarName.trim()) return;

    const newAvatar = {
      id: Math.max(...digimeAvatars.map((item) => item.id), 0) + 1,
      name: avatarName.trim(),
      image: '/api/placeholder/150/150',
      voiceId: `voice-${Date.now()}`,
      status: 'draft',
      createdAt: new Date(),
      createdAtIso: new Date().toISOString(),
      contexts: [],
      knowledge: [],
    };

    const updated = [...digimeAvatars, newAvatar];
    setDigimeAvatars(updated);
    localStorage.setItem('digimeList', JSON.stringify(updated));
    
    navigate('/digime');
  };

  return (
    <div className="min-h-screen  pb-20">
      {/* Header */}
       <Header user={()=>{}} title={"DigiMee™"}/> 

      {/* Progress Steps (Hidden on step 1 to match the clean UI of your screenshot) */}
      {currentStep !== 1 && (
        <div className="bg-white border-b border-gray-200 mb-8">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isCompleted 
                          ? 'bg-green-500 text-white' 
                          : isActive 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                            : 'bg-gray-100 text-gray-400'
                      }`}>
                        {isCompleted ? <Check size={24} /> : <Icon size={24} />}
                      </div>
                      <span className={`text-sm font-medium ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>
                        {step.title}
                      </span>
                    </div>
                    
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-4 rounded-full ${
                        currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="max-w-6xl mx-auto px-6 pt-12">
        
        {/* Step 1: Overview (Completely redesigned to match screenshot) */}
        {currentStep === 1 && (
          <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
              Follow these steps to create your replica
            </h2>

            {/* Three Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
              
              {/* Card 1 */}
              <div className="flex flex-col">
                <div className="bg-gradient-to-br from-[#eefaf2] to-[#dcfce7] rounded-[1.5rem] h-56 relative mb-5 flex items-center justify-center overflow-hidden border border-green-50 shadow-inner">
                  <span className="absolute top-4 left-4 w-7 h-7 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-400 shadow-sm">1</span>
                  {/* Abstract Graphic */}
                  <div className="relative">
                    <div className="w-16 h-20 bg-white/90 rounded shadow border border-white/50 absolute -left-12 -top-10 rotate-[-12deg] flex items-center justify-center">
                      <FileText size={24} className="text-gray-300" />
                    </div>
                    <div className="w-28 h-16 bg-gray-800 rounded-lg shadow-lg relative overflow-hidden flex items-center justify-center z-10 rotate-[6deg]">
                      <User size={28} className="text-gray-400" />
                    </div>
                    <div className="absolute -bottom-3 left-[-15px] bg-green-700 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md z-20 flex items-center gap-1">
                      <Check size={12} /> CONSENT
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Consent Video</h3>
                <p className="text-sm text-gray-500 leading-relaxed pr-4">
                  Record or upload a short video to authorize us to create your replica.
                </p>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col">
                <div className="bg-gradient-to-br from-[#fef5f9] to-[#fce7f3] rounded-[1.5rem] h-56 relative mb-5 flex items-center justify-center overflow-hidden border border-pink-50 shadow-inner">
                  <span className="absolute top-4 left-4 w-7 h-7 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-400 shadow-sm">2</span>
                  {/* Abstract Graphic */}
                  <div className="relative w-40 h-24 bg-[#2D2A32] rounded-xl shadow-lg flex items-center justify-center border border-gray-700">
                    <div className="absolute -top-3 -right-3 bg-pink-500 text-white text-[9px] font-bold px-2 py-1 rounded-md flex items-center gap-1.5 shadow-md">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div> REC
                    </div>
                    <User size={40} className="text-gray-400" />
                    <div className="absolute inset-0 border-[1.5px] border-dashed border-white/30 rounded-xl m-2 rounded-full scale-75"></div>
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 text-[8px] text-white/50 px-2">
                       <span>Speaking - 1:00</span>
                       <span>Listening - 1:00</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Training Video</h3>
                <p className="text-sm text-gray-500 leading-relaxed pr-4">
                  Teach your replica by reading a script to match your likeness, voice, and tone.
                </p>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col">
                <div className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-[1.5rem] h-56 relative mb-5 flex items-center justify-center overflow-hidden border border-blue-50 shadow-inner">
                  <span className="absolute top-4 left-4 w-7 h-7 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-400 shadow-sm">3</span>
                  {/* Abstract Graphic */}
                  <div className="relative w-40 h-24 bg-[#3B597B] rounded-xl shadow-lg flex items-center justify-center overflow-hidden border border-blue-900/20">
                    <User size={48} className="text-blue-200/40" />
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#1E3A8A]/90 backdrop-blur-md text-white text-[9px] font-bold px-3 py-1.5 rounded-md shadow-md whitespace-nowrap flex items-center gap-1.5 border border-blue-400/30">
                      <Clock size={12} /> GENERATING...
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Create Replica</h3>
                <p className="text-sm text-gray-500 leading-relaxed pr-4">
                  Use your replica to create videos or have real-time conversations.
                </p>
              </div>
            </div>

            {/* Bottom Form and Buttons */}
            <div className="max-w-md mx-auto flex flex-col items-center">
              {/* The input was added so you can still name the replica without breaking flow */}
              <input
                type="text"
                value={avatarName}
                onChange={(e) => setAvatarName(e.target.value)}
                placeholder="Name your replica (e.g., John's Avatar)"
                className="w-full px-5 py-3 rounded-xl border border-gray-200 text-center mb-6 focus:border-[#ff9eb5] focus:ring-2 focus:ring-[#ff9eb5]/20 outline-none transition-all text-gray-800"
              />
              
              <div className="flex items-center gap-4">
                <button className="px-6 py-3 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm">
                  How to Record?
                </button>
                <button
                  onClick={handleGetStarted}
                  disabled={!avatarName.trim()}
                  className={`px-8 py-3 rounded-lg font-semibold transition-colors text-sm ${
                    avatarName.trim()
                      ? 'bg-[#FF9FB6] hover:bg-[#ff8da8] text-white shadow-sm'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- The rest of your code remains unchanged --- */}
        
        {/* Step 2: Consent Video */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                <Camera size={40} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Consent Video</h2>
              <p className="text-white/80">Record a short video to authorize your replica</p>
            </div>

            <div className="p-8">
              {/* Recording Area */}
              <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center mb-6">
                <div className="text-center text-white">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                    <Camera size={40} className="text-white/60" />
                  </div>
                  <p className="text-white/60 mb-4">Camera preview will appear here</p>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 mx-auto">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    Start Recording
                  </button>
                </div>
              </div>

              {/* Script */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Read this script:</h3>
                <p className="text-gray-700 leading-relaxed italic">
                  "I, {avatarName || 'your name'}, hereby authorize the creation of my digital avatar. 
                  I understand that this replica will be used for video generation and AI-powered interactions. 
                  I confirm that I am the person in this video."
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 py-4 rounded-xl font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Training Video */}
        {currentStep === 3 && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-pink-600 to-pink-700 p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                <Mic size={40} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Training Video</h2>
              <p className="text-white/80">Read the script to train your AI voice and appearance</p>
            </div>

            <div className="p-8">
              {/* Recording Area */}
              <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center mb-6">
                <div className="text-center text-white">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                    <Mic size={40} className="text-white/60" />
                  </div>
                  <p className="text-white/60 mb-4">Camera preview will appear here</p>
                  <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 mx-auto">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    Start Recording
                  </button>
                </div>
              </div>

              {/* Training Script */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Training Script</h3>
                  <span className="text-sm text-gray-500">2-5 minutes</span>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>Hello, my name is {avatarName || 'your name'}. I'm excited to create my digital avatar today.</p>
                  <p>The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.</p>
                  <p>I can speak naturally and expressively. My voice has unique qualities that make it recognizable.</p>
                  <p>Thank you for watching this training video. I look forward to using my digital replica.</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 py-4 rounded-xl font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex-1 bg-gradient-to-r from-pink-600 to-purple-500 hover:from-pink-700 hover:to-purple-600 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Generate */}
        {currentStep === 4 && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                <Zap size={40} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Generate Your Avatar</h2>
              <p className="text-white/80">AI will create your digital replica</p>
            </div>

            <div className="p-8">
              {/* Preview */}
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                    <User size={64} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{avatarName}</h3>
                  <p className="text-gray-600">Your DigiMee Avatar</p>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Avatar Name</span>
                    <span className="font-medium text-gray-900">{avatarName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Consent Video</span>
                    <span className="text-green-600 flex items-center gap-1">
                      <Check size={16} /> Recorded
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Training Video</span>
                    <span className="text-green-600 flex items-center gap-1">
                      <Check size={16} /> Recorded
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 py-4 rounded-xl font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
                <button
                  onClick={handleCreate}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles size={20} />
                  Create DigiMee
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tips Popup */}
      {showTipsPopup && (
        <TipsPopup 
          onClose={() => setShowTipsPopup(false)} 
          onContinue={handleTipsContinue}
        />
      )}
    </div>
  );
};

export default CreateDigiMeePage;