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
    <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden border border-gray-200 shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-500 p-4 text-center relative">
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <X size={16} className="text-white" />
        </button>
        <div className="w-10 h-10 mx-auto mb-2 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center">
          <Camera size={20} className="text-white" />
        </div>
        <h2 className="text-lg font-bold text-white">Recording Tips</h2>
        <p className="text-white/80 text-xs mt-0.5">Follow these for best results</p>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Pro Tip */}
        <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg mb-4">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Lightbulb size={16} className="text-white" />
          </div>
          <p className="text-xs text-amber-800">
            <span className="font-semibold">Pro Tip:</span> Good lighting and a quiet environment will significantly improve quality.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Do's */}
          <div className="p-3 rounded-xl bg-green-50 border border-green-200">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
              <h3 className="font-bold text-green-700 text-sm">Do's</h3>
            </div>
            <ul className="space-y-1.5 text-xs text-gray-700">
              <li className="flex items-start gap-1.5">
                <span className="text-green-500 mt-0.5">✓</span>
                Good lighting on face
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-green-500 mt-0.5">✓</span>
                Stable camera position
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-green-500 mt-0.5">✓</span>
                Clear background
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-green-500 mt-0.5">✓</span>
                Look at camera
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-green-500 mt-0.5">✓</span>
                Speak clearly
              </li>
            </ul>
          </div>

          {/* Don'ts */}
          <div className="p-3 rounded-xl bg-red-50 border border-red-200">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center">
                <X size={14} className="text-white" />
              </div>
              <h3 className="font-bold text-red-700 text-sm">Don'ts</h3>
            </div>
            <ul className="space-y-1.5 text-xs text-gray-700">
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 mt-0.5">✗</span>
                Wear hats/glasses
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 mt-0.5">✗</span>
                Move during recording
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 mt-0.5">✗</span>
                Dark or noisy room
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 mt-0.5">✗</span>
                Look away
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 mt-0.5">✗</span>
                Whisper or shout
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onContinue}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 text-sm"
          >
            I Understand
            <ArrowRight size={14} />
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
    { id: 2, title: 'Consent', icon: Camera },
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
      image: './mam.jpeg',
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
    <div className="min-h-screen pb-16">
      {/* Header */}
      <Header user={() => {}} title={"DigiMee™"} />

      {/* Compact Progress Steps */}
      {currentStep !== 1 && (
        <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-3xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <React.Fragment key={step.id}>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isActive
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-400'
                      }`}>
                        {isCompleted ? <Check size={14} /> : <Icon size={14} />}
                      </div>
                      <span className={`text-xs font-medium hidden sm:block ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>
                        {step.title}
                      </span>
                    </div>

                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 rounded-full ${
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
      <div className="max-w-7xl mx-auto px-4 pt-6">

        {/* Step 1: Overview */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-6">
              Follow these steps to create your replica
            </h2>

            {/* Three Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-8">

              {/* Card 1 */}
              <div className="flex flex-col">
                <div className="bg-gradient-to-br from-[#eefaf2] to-[#dcfce7] rounded-xl h-36 md:h-40 relative mb-3 flex items-center justify-center overflow-hidden border border-green-100">
                  <span className="absolute top-2 left-2 w-5 h-5 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-gray-400 shadow-sm">1</span>
                  <div className="relative scale-75">
                    <div className="w-12 h-14 bg-white/90 rounded shadow border border-white/50 absolute -left-10 -top-8 rotate-[-12deg] flex items-center justify-center">
                      <FileText size={16} className="text-gray-300" />
                    </div>
                    <div className="w-20 h-12 bg-gray-800 rounded-lg shadow-lg relative overflow-hidden flex items-center justify-center z-10 rotate-[6deg]">
                      <User size={20} className="text-gray-400" />
                    </div>
                    <div className="absolute -bottom-2 left-[-10px] bg-green-700 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-md z-20 flex items-center gap-0.5">
                      <Check size={8} /> CONSENT
                    </div>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-0.5">Consent Video</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Record a short video to authorize us to create your replica.
                </p>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col">
                <div className="bg-gradient-to-br from-[#fef5f9] to-[#fce7f3] rounded-xl h-36 md:h-40 relative mb-3 flex items-center justify-center overflow-hidden border border-pink-100">
                  <span className="absolute top-2 left-2 w-5 h-5 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-gray-400 shadow-sm">2</span>
                  <div className="relative w-28 h-16 bg-[#2D2A32] rounded-lg shadow-lg flex items-center justify-center border border-gray-700 scale-90">
                    <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-[7px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-md">
                      <div className="w-1 h-1 bg-white rounded-full"></div> REC
                    </div>
                    <User size={24} className="text-gray-400" />
                    <div className="absolute inset-0 border border-dashed border-white/30 rounded-lg m-1.5 rounded-full scale-75"></div>
                    <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1 text-[6px] text-white/50 px-1">
                      <span>Speaking - 1:00</span>
                      <span>Listening - 1:00</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-0.5">Training Video</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Teach your replica by reading a script to match your likeness.
                </p>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col">
                <div className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl h-36 md:h-40 relative mb-3 flex items-center justify-center overflow-hidden border border-blue-100">
                  <span className="absolute top-2 left-2 w-5 h-5 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-gray-400 shadow-sm">3</span>
                  <div className="relative w-28 h-16 bg-[#3B597B] rounded-lg shadow-lg flex items-center justify-center overflow-hidden border border-blue-900/20 scale-90">
                    <User size={32} className="text-blue-200/40" />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#1E3A8A]/90 backdrop-blur-md text-white text-[7px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap flex items-center gap-1 border border-blue-400/30">
                      <Clock size={8} /> GENERATING...
                    </div>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-0.5">Create Replica</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Use your replica for videos or real-time conversations.
                </p>
              </div>
            </div>

            {/* Bottom Form */}
            <div className="max-w-sm mx-auto flex flex-col items-center">
              <input
                type="text"
                value={avatarName}
                onChange={(e) => setAvatarName(e.target.value)}
                placeholder="Name your replica (e.g., John's Avatar)"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-center mb-4 focus:border-[#ff9eb5] focus:ring-2 focus:ring-[#ff9eb5]/20 outline-none transition-all text-gray-800 text-sm"
              />

              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-xs">
                  How to Record?
                </button>
                <button
                  onClick={handleGetStarted}
                  disabled={!avatarName.trim()}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors text-xs ${
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

        {/* Step 2: Consent Video */}
        {currentStep === 2 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden max-w-3xl mx-auto">
           

            <div className="p-5">
              {/* Recording Area */}
              <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center mb-4">
                <div className="text-center text-white">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center">
                    <Camera size={28} className="text-white/60" />
                  </div>
                  <p className="text-white/60 mb-3 text-sm">Camera preview will appear here</p>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 mx-auto text-sm">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    Start Recording
                  </button>
                </div>
              </div>

              {/* Script */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Read this script:</h3>
                <p className="text-gray-700 leading-relaxed italic text-sm">
                  "I, {avatarName || 'your name'}, hereby authorize the creation of my digital avatar.
                  I understand that this replica will be used for video generation and AI-powered interactions.
                  I confirm that I am the person in this video."
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 py-2.5 rounded-lg font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center justify-center gap-1.5 text-sm"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 text-sm"
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Training Video */}
        {currentStep === 3 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden max-w-3xl mx-auto">
           

            <div className="p-5">
              {/* Recording Area */}
              <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center mb-4">
                <div className="text-center text-white">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center">
                    <Mic size={28} className="text-white/60" />
                  </div>
                  <p className="text-white/60 mb-3 text-sm">Camera preview will appear here</p>
                  <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 mx-auto text-sm">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    Start Recording
                  </button>
                </div>
              </div>

              {/* Training Script */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">Training Script</h3>
                  <span className="text-xs text-gray-500">2-5 minutes</span>
                </div>
                <div className="space-y-2 text-gray-700 leading-relaxed text-sm">
                  <p>Hello, my name is {avatarName || 'your name'}. I'm excited to create my digital avatar today.</p>
                  <p>The quick brown fox jumps over the lazy dog. This sentence contains every letter.</p>
                  <p>I can speak naturally and expressively. My voice has unique qualities.</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 py-2.5 rounded-lg font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center justify-center gap-1.5 text-sm"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex-1 bg-gradient-to-r from-pink-600 to-purple-500 hover:from-pink-700 hover:to-purple-600 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 text-sm"
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Generate */}
        {currentStep === 4 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden max-w-3xl mx-auto">
           

            <div className="p-5">
              {/* Preview */}
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <User size={40} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{avatarName}</h3>
                  <p className="text-gray-600 text-sm">Your DigiMee Avatar</p>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Summary</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Avatar Name</span>
                    <span className="font-medium text-gray-900">{avatarName}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Consent Video</span>
                    <span className="text-green-600 flex items-center gap-1">
                      <Check size={14} /> Recorded
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Training Video</span>
                    <span className="text-green-600 flex items-center gap-1">
                      <Check size={14} /> Recorded
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 py-2.5 rounded-lg font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center justify-center gap-1.5 text-sm"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button
                  onClick={handleCreate}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 text-sm"
                >
                  <Sparkles size={16} />
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