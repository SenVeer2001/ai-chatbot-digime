import React, { useState } from 'react';
import { X, Copy, Cpu, Eye, MessageSquare, AudioLines, Check, Sparkles } from 'lucide-react';

const templates = [
  {
    id: 'cs',
    title: 'Customer Support',
    description: 'Resolve issues with personalized, patient, and always-available support.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
    role: 'Customer Support Specialist',
    systemPrompt: `You're a customer success specialist on a live video call. Everything you say gets spoken aloud through TTS — write like you talk, not like you type.

THIS IS A SPOKEN CONVERSATION. You're on a video call. The person sees your face and hears your voice. Be friendly, patient, and helpful.

Key behaviors:
- Listen actively and acknowledge concerns
- Provide clear, step-by-step solutions
- Follow up to ensure satisfaction
- Escalate complex issues appropriately`,
    llm: 'GPT-4o',
    perception: 'raven-1',
    tts: 'ElevenLabs - Natural',
  },
  {
    id: 'sc',
    title: 'Sales Coach',
    description: "Offer scalable 1:1 coaching that's engaging and empathetic.",
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    role: 'Sales Coach',
    systemPrompt: `You are an experienced sales coach helping sales representatives improve their skills. You provide personalized feedback, role-play scenarios, and actionable advice.

Your coaching style:
- Encouraging and constructive
- Focus on specific, measurable improvements
- Use real examples and scenarios
- Celebrate wins while addressing areas for growth`,
    llm: 'GPT-4o',
    perception: 'raven-1',
    tts: 'ElevenLabs - Confident',
  },
  {
    id: 'sdr',
    title: 'Sales Development Rep',
    description: 'Qualify inbound leads with engaging and consistent conversations.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    role: 'Sales Development Representative',
    systemPrompt: `You are a Sales Development Representative (SDR) responsible for qualifying inbound leads. Your goal is to understand prospect needs and determine if they're a good fit.

Your approach:
- Ask discovery questions naturally
- Listen for pain points and buying signals
- Qualify based on budget, authority, need, and timeline
- Schedule qualified leads for demos`,
    llm: 'GPT-4o',
    perception: 'raven-1',
    tts: 'ElevenLabs - Professional',
  },
  {
    id: 'int',
    title: 'Interviewer',
    description: 'Screen candidates with a consistent and friendly interview process.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    role: 'HR Interviewer',
    systemPrompt: `You are a professional HR interviewer conducting initial candidate screenings. Your goal is to assess candidates fairly and consistently while making them feel comfortable.

Interview guidelines:
- Start with warm introductions
- Ask behavioral and situational questions
- Evaluate cultural fit and technical skills
- Provide clear next steps at the end`,
    llm: 'GPT-4o',
    perception: 'raven-1',
    tts: 'ElevenLabs - Friendly',
  },
  {
    id: 'tutor',
    title: 'AI Tutor',
    description: 'Personalized learning assistance for students of all levels.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    role: 'Educational Tutor',
    systemPrompt: `You are a patient and encouraging AI tutor helping students learn. Adapt your teaching style to each student's level and learning pace.

Teaching approach:
- Break complex topics into simple concepts
- Use examples and analogies
- Encourage questions and curiosity
- Celebrate progress and effort`,
    llm: 'GPT-4o',
    perception: 'raven-1',
    tts: 'ElevenLabs - Warm',
  },
  {
    id: 'health',
    title: 'Health Assistant',
    description: 'Provide wellness guidance and health information support.',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop',
    role: 'Health & Wellness Guide',
    systemPrompt: `You are a health and wellness assistant providing general information and guidance. Always remind users to consult healthcare professionals for medical advice.

Your role:
- Share general wellness tips
- Encourage healthy habits
- Provide emotional support
- Direct to professionals when needed`,
    llm: 'GPT-4o',
    perception: 'raven-1',
    tts: 'ElevenLabs - Calm',
  },
];

const TemplateModal = ({ isOpen, onClose, onSelectTemplate }) => {
  const [selected, setSelected] = useState('cs');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const selectedTemplate = templates.find(t => t.id === selected);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUseTemplate = () => {
    onSelectTemplate(selectedTemplate);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-sans">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 text-center relative border-b border-slate-100">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full mb-3">
            <Sparkles size={14} className="text-cyan-500" />
            <span className="text-xs font-semibold text-cyan-600">Quick Start</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800">Choose a Template</h2>
          <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto leading-relaxed">
            Pick a template to pre-fill the persona form. You can customize everything after.
          </p>
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <X size={18} className="text-slate-400" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Left Side: Template List */}
          <div className="w-1/2 border-r border-slate-100 overflow-y-auto p-6 space-y-3 bg-slate-50/30">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Available Templates ({templates.length})
            </p>
            {templates.map((t) => (
              <div 
                key={t.id}
                onClick={() => setSelected(t.id)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex gap-4 ${
                  selected === t.id 
                    ? 'border-cyan-400 bg-white shadow-lg shadow-cyan-100' 
                    : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-md'
                }`}
              >
                <img 
                  src={t.avatar} 
                  alt={t.title} 
                  className={`w-12 h-12 rounded-full object-cover ring-2 ${
                    selected === t.id ? 'ring-cyan-400' : 'ring-slate-200'
                  }`} 
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-800">{t.title}</h4>
                    {selected === t.id && (
                      <Check size={14} className="text-cyan-500" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">{t.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Detailed Preview */}
          <div className="w-1/2 bg-white overflow-y-auto p-6 space-y-4">
            {/* Template Header */}
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <img 
                src={selectedTemplate?.avatar} 
                alt={selectedTemplate?.title} 
                className="w-16 h-16 rounded-full object-cover ring-4 ring-cyan-100" 
              />
              <div>
                <h3 className="text-lg font-bold text-slate-800">{selectedTemplate?.title}</h3>
                <p className="text-sm text-slate-500">{selectedTemplate?.role}</p>
              </div>
            </div>

            {/* System Prompt Section */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative">
              <div className="flex justify-between items-center mb-3">
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">System Prompt</h5>
                <button 
                  onClick={() => handleCopy(selectedTemplate?.systemPrompt)}
                  className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  {copied ? (
                    <Check size={14} className="text-green-500" />
                  ) : (
                    <Copy size={14} className="text-slate-400" />
                  )}
                </button>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line max-h-40 overflow-y-auto">
                {selectedTemplate?.systemPrompt}
              </p>
            </div>

            {/* Configuration Cards */}
            <div className="grid grid-cols-2 gap-3">
              <ConfigCard 
                icon={<Cpu size={14}/>} 
                title="LLM" 
                items={[
                  { label: 'Model', value: selectedTemplate?.llm },
                  { label: 'Inference', value: 'Enabled' }
                ]} 
              />
              <ConfigCard 
                icon={<Eye size={14}/>} 
                title="Perception" 
                items={[
                  { label: 'Model', value: selectedTemplate?.perception }
                ]} 
              />
            </div>
            
            <ConfigCard 
              icon={<MessageSquare size={14}/>} 
              title="Conversation Flow" 
              items={[
                { label: 'Turn Detection', value: 'sparrow-1' },
                { label: 'Patience Level', value: 'High' },
                { label: 'Interruptibility', value: 'Medium' }
              ]} 
            />

            <ConfigCard 
              icon={<AudioLines size={14}/>} 
              title="Text-To-Speech" 
              items={[
                { label: 'Engine', value: selectedTemplate?.tts },
                { label: 'Emotion', value: 'Enabled' }
              ]} 
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-slate-50">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleUseTemplate}
            className="px-8 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-cyan-200 flex items-center gap-2"
          >
            <Sparkles size={16} />
            Use This Template
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const ConfigCard = ({ icon, title, items }) => (
  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
    <div className="flex items-center gap-2 mb-3">
      <span className="text-slate-400">{icon}</span>
      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{title}</h5>
    </div>
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex justify-between items-center">
          <span className="text-xs text-slate-400">{item.label}</span>
          <span className="text-xs font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-100">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default TemplateModal;