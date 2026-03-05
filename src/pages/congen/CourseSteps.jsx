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
      
      <div className="absolute top-1/4 left-10 text-slate-200 pointer-events-none">
        <Plus size={16} />
      </div>
      <div className="absolute top-1/2 right-20 text-slate-200 pointer-events-none">
        <Plus size={16} />
      </div>
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-30"></div>

      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl shadow-blue-100/50 p-6 md:p-10 flex flex-col items-center text-center relative z-10">
        
        <div className="flex flex-col items-center mb-6">
          <div className="relative flex items-center justify-center mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl skew-x-[-12deg] flex items-center justify-center shadow-lg">
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
          Create professional content with AI assistance. Build courses, documents, resumes, and corporate materials in minutes.
        </p>

        <div className="relative w-full max-w-sm h-36 mb-8 flex justify-center items-end">
          <div className="relative w-36 h-24 border-4 border-slate-200 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <CheckCircle2 size={40} className="text-green-500 fill-green-50" />
            <div className="absolute -bottom-1.5 w-44 h-1 bg-slate-200 rounded-full"></div>
          </div>

          <div className="absolute top-2 left-8 w-9 h-9 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center">
            <Layers size={16} className="text-purple-400" />
          </div>
          <div className="absolute top-2 right-8 w-9 h-9 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center">
            <BookMarked size={16} className="text-orange-400" />
          </div>
          
          <div className="absolute top-0 left-1/4 p-1.5 text-orange-400">
            <Star size={16} fill="currentColor" />
          </div>
          <div className="absolute top-8 left-1/3 p-1 bg-white shadow-md border border-slate-100 rounded-lg text-cyan-500">
            <ImageIcon size={12} />
          </div>
          <div className="absolute top-6 right-1/4 p-1 bg-white shadow-md border border-slate-100 rounded-lg text-blue-500">
            <Type size={12} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full mb-6">
          {[
            { icon: Sparkles, label: 'AI Powered', color: 'text-purple-500' },
            { icon: Clock, label: 'Save Time', color: 'text-blue-500' },
            { icon: Award, label: 'Pro Quality', color: 'text-amber-500' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-slate-50">
              <item.icon size={18} className={item.color} />
              <span className="text-[11px] font-medium text-slate-600">{item.label}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={onGetStarted}
          className="w-full py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-bold rounded-xl hover:from-slate-900 hover:to-black transition-all text-sm shadow-lg shadow-slate-200 flex items-center justify-center gap-2"
        >
          Get Started
          <ArrowRight size={16} />
        </button>

        <p className="text-[11px] text-slate-400 mt-3">
          No credit card required • Free to start
        </p>
      </div>

      <div className="absolute right-[8%] top-1/2 translate-y-8 hidden lg:block">
        <div className="relative">
          <div className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl text-white shadow-xl rotate-12">
            <MousePointer2 size={24} fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== STEP 1: ABOUT COURSE ====================
export  const AboutCourseStep = ({ formData, setFormData, onNext, onBack }) => {
  const [selectedModules, setSelectedModules] = useState(formData.moduleCount || 3);
  const [uploadedFiles, setUploadedFiles] = useState(formData.files || []);
  const [agreed, setAgreed] = useState(false);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.type
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const handleNext = () => {
    setFormData({
      ...formData,
      moduleCount: selectedModules,
      files: uploadedFiles
    });
    onNext();
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col items-center text-center mb-6">  
        <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-1.5">Let's start building your content</h1>
        <p className="text-slate-500 text-sm max-w-xl leading-relaxed">Share your vision and source materials.</p>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-slate-800">Content Information</h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-orange-400 text-orange-500 rounded-full text-xs font-medium hover:bg-orange-50 transition-colors">
            <Sparkles size={12} />
            Edit with AI
          </button>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700">
            Content Title <span className="text-red-500">*</span>
          </label>
          <input 
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Learn AI with Prof. Dutta"
            className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700">
            Style & Tone 
            <span className="text-blue-500 text-[10px] ml-1.5 font-normal">(autogenerated)</span>
          </label>
          <input 
            type="text"
            value={formData.style}
            onChange={(e) => setFormData({ ...formData, style: e.target.value })}
            placeholder="Motivational, practical"
            className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-600 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700">
            Target Audience 
            <span className="text-blue-500 text-[10px] ml-1.5 font-normal">(autogenerated)</span>
          </label>
          <textarea 
            rows={2}
            value={formData.audience}
            onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
            placeholder="Students, professionals, beginners..."
            className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-600 resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700">
            Learning Goals 
            <span className="text-blue-500 text-[10px] ml-1.5 font-normal">(autogenerated)</span>
          </label>
          <textarea 
            rows={3}
            value={formData.goals}
            onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
            placeholder="Learners will understand core concepts..."
            className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-600 resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Number of Modules</label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                onClick={() => setSelectedModules(num)}
                className={`w-10 h-10 rounded-lg border-2 font-bold text-xs transition-all ${
                  selectedModules === num 
                    ? 'border-blue-500 bg-blue-50 text-blue-600' 
                    : 'border-slate-200 text-slate-400 hover:border-slate-300'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-blue-500">
            Each module can contain videos, articles, quizzes, and discussions.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Upload Source Materials</label>
          <label className="border-2 border-dashed border-slate-200 rounded-xl p-6 md:p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-blue-300 transition-colors cursor-pointer group">
            <input type="file" multiple className="hidden" onChange={handleFileUpload} />
            <FolderUp size={32} className="text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-slate-600 font-medium text-xs text-center">
              Drag & drop files or <span className="text-blue-500 underline">browse</span>
            </p>
            <p className="text-[10px] text-slate-400 mt-1">PDF, DOC, PPT, XLS (Max 3 MB)</p>
          </label>

          {uploadedFiles.length > 0 && (
            <div className="space-y-1.5 mt-3">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-blue-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-700 truncate">{file.name}</p>
                      <p className="text-[10px] text-slate-400">{file.size}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setUploadedFiles(uploadedFiles.filter(f => f.id !== file.id))}
                    className="p-1 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                  >
                    <X size={14} className="text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-3 space-y-4">
          <div className="flex items-start gap-2">
            <input 
              type="checkbox" 
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-orange-500 focus:ring-orange-400 flex-shrink-0" 
            />
            <p className="text-[10px] text-slate-500 leading-relaxed">
              <span className="text-red-400">All uploaded files will be used by AI to generate content.</span> By uploading, you confirm ownership.
            </p>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={onBack}
              className="flex-1 py-2.5 text-sm border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <button 
              onClick={handleNext}
              disabled={!formData.title || !agreed}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                formData.title && agreed
                  ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-lg shadow-orange-100 hover:scale-[1.02]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Generate Modules
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== STEP 2: MANAGE MODULES ====================
export const ManageModulesStep = ({ formData, setFormData, onNext, onBack }) => {
  const [modules, setModules] = useState(
    formData.modules || Array.from({ length: formData.moduleCount || 3 }, (_, i) => ({
      id: i + 1,
      name: `Module ${i + 1}: Topic ${i + 1}`,
      thumbnail: null,
      article: 2,
      video: 5,
      quiz: 1,
      resources: 1,
      discussion: 1
    }))
  );

  const addModule = () => {
    setModules([
      ...modules,
      {
        id: modules.length + 1,
        name: `Module ${modules.length + 1}: New Topic`,
        thumbnail: null,
        article: 1,
        video: 3,
        quiz: 1,
        resources: 1,
        discussion: 1
      }
    ]);
  };

  const removeModule = (id) => {
    if (modules.length > 1) {
      setModules(modules.filter(m => m.id !== id));
    }
  };

  const updateModule = (id, field, value) => {
    setModules(modules.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleNext = () => {
    setFormData({ ...formData, modules });
    onNext();
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-1.5">{formData.title || 'Your Content'}</h1>
        <p className="text-xs text-slate-500 max-w-3xl line-clamp-2">
          {formData.goals || 'Manage your modules and set the number of activities.'}
        </p>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 text-[11px] font-bold text-slate-700 border-b border-slate-200">
              <th className="p-3 w-1/3">Module Name</th>
              <th className="p-3 text-center w-16">Thumb</th>
              <th className="p-3 text-center w-20">Article</th>
              <th className="p-3 text-center w-20">Video</th>
              <th className="p-3 text-center w-20">Quiz</th>
              <th className="p-3 text-center w-20">Resources</th>
              <th className="p-3 text-center w-20">Discussion</th>
              <th className="p-3 text-center w-20">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {modules.map((mod) => (
              <tr key={mod.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <GripVertical size={14} className="text-slate-300 cursor-grab flex-shrink-0" />
                    <input 
                      type="text" 
                      value={mod.name}
                      onChange={(e) => updateModule(mod.id, 'name', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white focus:border-blue-400 outline-none"
                    />
                  </div>
                </td>
                <td className="p-3">
                  <button className="w-8 h-8 border border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-400 transition-all mx-auto">
                    <Plus size={14} />
                  </button>
                </td>
                <td className="p-3">
                  <input 
                    type="number" 
                    value={mod.article}
                    min={0}
                    onChange={(e) => updateModule(mod.id, 'article', parseInt(e.target.value) || 0)}
                    className="w-12 p-1.5 text-xs border border-slate-200 rounded-lg text-center focus:border-blue-400 outline-none mx-auto block"
                  />
                </td>
                <td className="p-3">
                  <input 
                    type="number" 
                    value={mod.video}
                    min={0}
                    onChange={(e) => updateModule(mod.id, 'video', parseInt(e.target.value) || 0)}
                    className="w-12 p-1.5 text-xs border border-slate-200 rounded-lg text-center focus:border-blue-400 outline-none mx-auto block"
                  />
                </td>
                <td className="p-3">
                  <input 
                    type="number" 
                    value={mod.quiz}
                    min={0}
                    onChange={(e) => updateModule(mod.id, 'quiz', parseInt(e.target.value) || 0)}
                    className="w-12 p-1.5 text-xs border border-slate-200 rounded-lg text-center focus:border-blue-400 outline-none mx-auto block"
                  />
                </td>
                <td className="p-3">
                  <input 
                    type="number" 
                    value={mod.resources}
                    min={0}
                    onChange={(e) => updateModule(mod.id, 'resources', parseInt(e.target.value) || 0)}
                    className="w-12 p-1.5 text-xs border border-slate-200 rounded-lg text-center focus:border-blue-400 outline-none mx-auto block"
                  />
                </td>
                <td className="p-3">
                  <input 
                    type="number" 
                    value={mod.discussion}
                    min={0}
                    onChange={(e) => updateModule(mod.id, 'discussion', parseInt(e.target.value) || 0)}
                    className="w-12 p-1.5 text-xs border border-slate-200 rounded-lg text-center focus:border-blue-400 outline-none mx-auto block"
                  />
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-center gap-1.5">
                    <button className="p-1.5 hover:bg-orange-50 rounded-lg transition-colors">
                      <Sparkles size={14} className="text-orange-400" />
                    </button>
                    <button 
                      onClick={() => removeModule(mod.id)}
                      className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button 
        onClick={addModule}
        className="mt-3 flex items-center gap-1.5 text-blue-500 text-xs font-bold hover:underline"
      >
        <Plus size={14} /> Add Module
      </button>

      <div className="mt-6 flex gap-2">
        <button 
          onClick={onBack}
          className="flex-1 py-2.5 text-sm border border-orange-400 text-orange-500 font-semibold rounded-xl hover:bg-orange-50 transition-colors flex items-center justify-center gap-1.5"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <button 
          onClick={handleNext}
          className="flex-1 py-2.5 text-sm bg-gradient-to-r from-orange-400 to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
        >
          Generate Activities
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

// ==================== STEP 3: COURSE ACTIVITY ====================
export const CourseActivityStep = ({ formData, setFormData, onNext, onBack }) => {
  const [expandedModule, setExpandedModule] = useState(1);
  const modules = formData.modules || [];

  const getActivityIcon = (type) => {
    const icons = {
      video: <PlayCircle size={14} className="text-blue-500" />,
      article: <BookOpen size={14} className="text-green-500" />,
      quiz: <CheckSquare size={14} className="text-purple-500" />,
      resources: <Files size={14} className="text-amber-500" />,
      discussion: <MessageCircle size={14} className="text-cyan-500" />
    };
    return icons[type] || <Files size={14} />;
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-1.5">Course Activities</h1>
        <p className="text-xs text-slate-500">Review and customize the generated activities.</p>
      </div>

      <div className="space-y-3">
        {modules.map((mod) => (
          <div key={mod.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center font-bold text-blue-600 text-sm flex-shrink-0">
                  {mod.id}
                </div>
                <div className="text-left min-w-0">
                  <h3 className="font-bold text-sm text-slate-800 truncate">{mod.name}</h3>
                  <div className="flex gap-2.5 mt-0.5 text-[10px] text-slate-400 flex-wrap">
                    <span className="flex items-center gap-1">
                      <PlayCircle size={10} /> {mod.video}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={10} /> {mod.article}
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckSquare size={10} /> {mod.quiz}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronDown 
                size={18} 
                className={`text-slate-400 transition-transform flex-shrink-0 ${expandedModule === mod.id ? 'rotate-180' : ''}`} 
              />
            </button>

            {expandedModule === mod.id && (
              <div className="border-t border-slate-100 p-4 bg-slate-50/50">
                <div className="grid gap-2">
                  {[
                    ...Array(mod.video).fill('video'),
                    ...Array(mod.article).fill('article'),
                    ...Array(mod.quiz).fill('quiz'),
                  ].map((type, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                        {getActivityIcon(type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          defaultValue={`${type.charAt(0).toUpperCase() + type.slice(1)} ${i + 1}`}
                          className="w-full text-xs font-medium text-slate-700 bg-transparent outline-none focus:bg-slate-50 px-2 py-1 rounded"
                        />
                        <p className="text-[10px] text-slate-400 px-2 capitalize">{type}</p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg">
                          <Edit3 size={12} className="text-slate-400" />
                        </button>
                        <button className="p-1.5 hover:bg-orange-50 rounded-lg">
                          <Sparkles size={12} className="text-orange-400" />
                        </button>
                        <button className="p-1.5 hover:bg-red-50 rounded-lg">
                          <Trash2 size={12} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-3 flex items-center gap-1.5 text-blue-500 text-xs font-medium hover:underline">
                  <Plus size={14} /> Add Activity
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <button 
          onClick={onBack}
          className="flex-1 py-2.5 text-sm border border-orange-400 text-orange-500 font-semibold rounded-xl hover:bg-orange-50 transition-colors flex items-center justify-center gap-1.5"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <button 
          onClick={onNext}
          className="flex-1 py-2.5 text-sm bg-gradient-to-r from-orange-400 to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
        >
          Preview Course
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

// ==================== STEP 4: PREVIEW ====================
export const PreviewStep = ({ formData, onBack, onSkip, onPublish }) => {
  const modules = formData.modules || [];

  return (
    <div className="p-4 md:p-6">
      <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-4 md:p-6 mb-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
              {formData.title?.charAt(0) || 'C'}
            </div>
            <div className="min-w-0">
              <h1 className="text-base md:text-lg font-bold text-slate-800 truncate">{formData.title || 'Your Course'}</h1>
              <p className="text-xs text-slate-600 mt-0.5">Created with ConGen AI</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-xs font-bold shadow-md hover:bg-blue-600 transition-all flex-shrink-0">
            Set Price
          </button>
        </div>

        <div className="mt-4">
          <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase">
            Individual + Group
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Calendar size={12} /> Registration
            </h3>
            <p className="text-[11px] text-slate-600">Start: {new Date().toLocaleDateString()}</p>
            <p className="text-[11px] text-slate-600">Batch: IGS001</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] text-slate-600 font-bold">Fees: <span className="text-slate-400 line-through">$100</span></p>
            <p className="text-sm font-black text-slate-800">Payable: $90</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] text-slate-600 font-bold flex items-center gap-1.5">
              <Users size={12} /> Batch
            </p>
            <p className="text-[11px] text-slate-600">Duration: {modules.length * 2} Weeks</p>
            <div className="flex items-center gap-1.5 text-slate-700">
              <Award size={14} />
              <p className="text-[11px] font-bold">Certificate: Yes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 mb-4">
        {modules.map((mod, idx) => (
          <div key={mod.id} className={`p-4 flex items-center gap-3 ${idx !== modules.length - 1 ? 'border-b border-slate-100' : ''}`}>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-bold text-blue-500">{mod.id}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-800 truncate">
                <span className="text-blue-500">Module {mod.id}:</span> {mod.name.replace(`Module ${mod.id}: `, '')}
              </h4>
              
              <div className="flex flex-wrap gap-2.5 text-slate-400 text-[10px] font-medium mt-1.5">
                <span className="flex items-center gap-1"><PlayCircle size={10}/> {mod.video}</span>
                <span className="flex items-center gap-1"><BookOpen size={10}/> {mod.article}</span>
                <span className="flex items-center gap-1"><CheckSquare size={10}/> {mod.quiz}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Modules', value: modules.length, icon: Layers, color: 'text-purple-500' },
          { label: 'Videos', value: modules.reduce((acc, m) => acc + m.video, 0), icon: Video, color: 'text-blue-500' },
          { label: 'Quizzes', value: modules.reduce((acc, m) => acc + m.quiz, 0), icon: CheckSquare, color: 'text-green-500' },
          { label: 'Duration', value: `${modules.length * 2}h`, icon: Clock, color: 'text-amber-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-3 border border-slate-100">
            <stat.icon size={16} className={stat.color} />
            <p className="text-lg font-bold text-slate-800 mt-1.5">{stat.value}</p>
            <p className="text-[10px] text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button 
          onClick={onBack}
          className="flex-1 py-2.5 text-sm border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <button 
          onClick={onSkip}
          className="px-4 py-2.5 text-sm border border-amber-400 text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition-colors flex items-center justify-center gap-1.5"
        >
          <SkipForward size={16} />
          Skip
        </button>
        <button 
          onClick={onPublish}
          className="flex-1 py-2.5 text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-green-100 hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
        >
          <Check size={16} />
          Publish
        </button>
      </div>
    </div>
  );
};

// ==================== STEP 5: COURSE ACTIVITY EDITOR WITH VIDEO & DRAG-DROP ====================
export const CourseActivityEditorStep = ({ formData, onBack, onFinish }) => {
  const modules = formData.modules || [];
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  
  // Video Player States - ONE VIDEO FOR ALL
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Drag and Drop States
  const [lessons, setLessons] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  
  const currentModule = modules[currentModuleIndex] || modules[0];

  // *** SINGLE VIDEO URL FROM PUBLIC FOLDER ***
  const VIDEO_URL = '/AvatarGirl.mp4'; // Place your video in public folder

  // Generate lessons for current module
  const generateLessons = (mod) => {
    if (!mod) return [];
    const lessons = [];
    for (let i = 0; i < mod.video; i++) {
      lessons.push({ 
        id: `v${i}`, 
        title: `Video ${i + 1}: ${mod.name.split(':')[1]?.trim() || 'Introduction'}`, 
        type: 'video', 
        duration: '3 min'
      });
    }
    for (let i = 0; i < mod.article; i++) {
      lessons.push({ id: `a${i}`, title: `Article ${i + 1}: Reading Material`, type: 'article', duration: '2 min' });
    }
    if (mod.discussion > 0) {
      lessons.push({ id: 'd0', title: 'Discussion Forum', type: 'discussion', duration: '' });
    }
    if (mod.resources > 0) {
      lessons.push({ id: 'r0', title: 'Additional Resources', type: 'resources', duration: '' });
    }
    for (let i = 0; i < mod.quiz; i++) {
      lessons.push({ id: `q${i}`, title: `Module Quiz ${i + 1}`, type: 'quiz', duration: '5 min' });
    }
    return lessons;
  };

  // Initialize lessons when module changes
  useEffect(() => {
    setLessons(generateLessons(currentModule));
    setSelectedLessonIndex(0);
  }, [currentModuleIndex]);

  const selectedLesson = lessons[selectedLessonIndex] || lessons[0];
  const progress = Math.round(((currentModuleIndex + 1) / modules.length) * 100);

  // Video control functions
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log('Play error:', err));
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setVideoLoaded(true);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (videoRef.current && duration) {
      videoRef.current.currentTime = pos * duration;
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Drag and Drop Functions
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDragOverIndex(null);
      return;
    }

    const newLessons = [...lessons];
    const draggedLesson = newLessons[draggedIndex];
    
    newLessons.splice(draggedIndex, 1);
    newLessons.splice(dropIndex, 0, draggedLesson);
    
    setLessons(newLessons);
    
    if (selectedLessonIndex === draggedIndex) {
      setSelectedLessonIndex(dropIndex);
    } else if (draggedIndex < selectedLessonIndex && dropIndex >= selectedLessonIndex) {
      setSelectedLessonIndex(selectedLessonIndex - 1);
    } else if (draggedIndex > selectedLessonIndex && dropIndex <= selectedLessonIndex) {
      setSelectedLessonIndex(selectedLessonIndex + 1);
    }
    
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const getIcon = (type) => {
    const icons = {
      video: <PlayCircle size={12} className="text-blue-500" />,
      article: <BookOpen size={12} className="text-green-500" />,
      discussion: <MessageCircle size={12} className="text-purple-500" />,
      resources: <Files size={12} className="text-amber-500" />,
      quiz: <HelpCircle size={12} className="text-red-500" />
    };
    return icons[type] || <Circle size={12} />;
  };

  const handleNextModule = () => {
    if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    } else {
      onFinish();
    }
  };

  const handlePrevModule = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-7xl mx-auto bg-slate-50 rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onBack} className="p-1.5 hover:bg-slate-100 rounded-lg">
            <ArrowLeft size={16} className="text-slate-500" />
          </button>
          <div className="min-w-0">
            <h2 className="font-bold text-slate-800 text-sm truncate">{formData.title}</h2>
            <p className="text-[10px] text-slate-400">Module {currentModuleIndex + 1} of {modules.length}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center">
            <span className="text-[9px] font-bold text-blue-600">{progress}%</span>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-blue-400 text-blue-500 rounded-lg text-[11px] font-bold hover:bg-blue-50">
            <Eye size={12} /> Preview
          </button>
          <button 
            onClick={handleNextModule}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 hover:bg-blue-700 shadow-sm"
          >
            {currentModuleIndex < modules.length - 1 ? 'Next Module' : 'Finish'} 
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with Drag & Drop */}
        <aside className="w-72 bg-white border-r border-slate-100 flex flex-col overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-100 flex gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center font-bold text-blue-600 text-sm flex-shrink-0">
              {currentModule?.id || 1}
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-bold text-blue-500 uppercase">Module {currentModule?.id || 1}</p>
              <h3 className="text-[11px] font-bold text-slate-800 truncate">{currentModule?.name?.split(':')[1]?.trim() || 'Module Content'}</h3>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5 bg-slate-50/30">
            {lessons.map((lesson, idx) => (
              <div 
                key={lesson.id} 
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, idx)}
                onClick={() => setSelectedLessonIndex(idx)}
                className={`bg-white p-2.5 rounded-lg border shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all cursor-move ${
                  selectedLessonIndex === idx ? 'border-blue-400 bg-blue-50' : 'border-slate-100'
                } ${dragOverIndex === idx && draggedIndex !== idx ? 'border-t-4 border-t-blue-500' : ''}`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="text-slate-400 flex-shrink-0 cursor-grab active:cursor-grabbing">
                    <GripVertical size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-slate-700 leading-snug truncate">{lesson.title}</p>
                    <div className="flex items-center gap-1.5 text-[9px] text-slate-400 mt-0.5">
                      {getIcon(lesson.type)} 
                      <span className="capitalize">{lesson.type}</span>
                      {lesson.duration && <span>• {lesson.duration}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <button onClick={(e) => e.stopPropagation()} className="p-1 hover:bg-slate-100 rounded">
                    <Edit3 size={12} className="text-slate-400" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setLessons(lessons.filter((_, i) => i !== idx));
                      if (selectedLessonIndex === idx && idx > 0) {
                        setSelectedLessonIndex(idx - 1);
                      }
                    }}
                    className="p-1 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={12} className="text-red-400" />
                  </button>
                </div>
              </div>
            ))}
            
            <button className="w-full p-2 text-[10px] font-medium text-blue-500 flex items-center justify-center gap-1.5 hover:bg-blue-50 rounded-lg border border-dashed border-blue-200 mt-2">
              <Plus size={12} /> Add Lesson
            </button>
          </div>

          <div className="p-3 border-t border-slate-100 bg-white flex gap-2">
            <button 
              onClick={handlePrevModule}
              disabled={currentModuleIndex === 0}
              className={`flex-1 py-2 text-[10px] font-bold rounded-lg flex items-center justify-center gap-1 ${
                currentModuleIndex === 0 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <ArrowLeft size={12} /> Prev
            </button>
            <button 
              onClick={handleNextModule}
              className="flex-1 py-2 text-[10px] font-bold bg-blue-500 text-white rounded-lg flex items-center justify-center gap-1 hover:bg-blue-600"
            >
              {currentModuleIndex < modules.length - 1 ? 'Next' : 'Finish'} <ArrowRight size={12} />
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
          
          {/* Video Section - SINGLE VIDEO */}
          <div className="bg-white rounded-xl border max-h-[500px]  border-slate-200 overflow-hidden shadow-sm">
            <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                {getIcon(selectedLesson?.type)}
                {selectedLesson?.type || 'Content'}
              </span>
              <div className="flex items-center gap-2">
                <button className="p-1.5 border border-slate-200 rounded-md hover:bg-white text-slate-400">
                  <Edit3 size={12} />
                </button>
              </div>
            </div>
            
            {selectedLesson?.type === 'video' ? (
              <div className="aspect-video bg-slate-900 flex items-center justify-center relative group ">
                
                {/* Single Video Element */}
                <video
                  ref={videoRef}
                  className={`w-full h-full object-cover ${videoLoaded && !videoError ? 'block' : 'hidden'}`}
                  onLoadedData={() => setVideoLoaded(true)}
                  onLoadedMetadata={handleLoadedMetadata}
                  onTimeUpdate={handleTimeUpdate}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  onError={() => setVideoError(true)}
                  playsInline
                >
                  <source src={VIDEO_URL} type="video/mp4" />
                </video>

                {/* Loading State */}
                {!videoLoaded && !videoError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                    <div className="text-center">
                      <div className="w-10 h-10 border-3 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto mb-3"></div>
                      <p className="text-white/60 text-xs">Loading video...</p>
                    </div>
                  </div>
                )}

                {/* Error State */}
                {videoError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                    <div className="text-center">
                      <div className="w-14 h-14 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <PlayCircle size={28} className="text-red-400" />
                      </div>
                      <p className="text-white/80 text-sm font-medium">Video not found</p>
                      <p className="text-white/50 text-[11px] mt-1">Place video at: public/sample-video.mp4</p>
                    </div>
                  </div>
                )}

                {/* Video Controls */}
                {videoLoaded && !videoError && (
                  <>
                    {/* Play/Pause Overlay */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={togglePlay}
                    >
                      <div className="w-16 h-16 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                        {isPlaying ? (
                          <Pause size={32} className="text-white" />
                        ) : (
                          <Play size={32} className="text-white ml-1" />
                        )}
                      </div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* Progress Bar */}
                      <div 
                        className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer mb-3 group/progress"
                        onClick={handleSeek}
                      >
                        <div 
                          className="h-full bg-red-500 rounded-full relative"
                          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                        >
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full scale-0 group-hover/progress:scale-100 transition-transform"></div>
                        </div>
                      </div>

                      {/* Control Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button onClick={togglePlay} className="p-1.5 text-white hover:text-white/80 transition-colors">
                            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                          </button>
                          
                          <button onClick={toggleMute} className="p-1.5 text-white/80 hover:text-white transition-colors">
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                          </button>

                          <span className="text-[11px] text-white/80 font-medium">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </span>
                        </div>

                        <button onClick={handleFullscreen} className="p-1.5 text-white/80 hover:text-white transition-colors">
                          <Maximize2 size={16} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  {getIcon(selectedLesson?.type)}
                </div>
                <p className="text-sm font-medium text-slate-600">{selectedLesson?.title}</p>
                <p className="text-xs text-slate-400 mt-1">Edit content below</p>
              </div>
            )}
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Content Editor</span>
              <button className="flex items-center gap-1.5 px-2.5 py-1 border border-orange-300 text-orange-500 rounded-lg text-[10px] font-bold hover:bg-orange-50">
                <Sparkles size={10} /> Generate with AI
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 block">Title</label>
                <input 
                  type="text"
                  value={selectedLesson?.title || ''}
                  onChange={(e) => {
                    const newLessons = [...lessons];
                    if (newLessons[selectedLessonIndex]) {
                      newLessons[selectedLessonIndex].title = e.target.value;
                      setLessons(newLessons);
                    }
                  }}
                  className="w-full px-3 py-2 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-400"
                />
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 block">Description / Transcript</label>
                <textarea 
                  className="w-full p-3 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg outline-none leading-relaxed focus:border-blue-400"
                  rows={4}
                  placeholder="Enter content description or transcript..."
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <button className="px-4 py-2 text-[11px] font-bold border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
                  Cancel
                </button>
                <button className="px-5 py-2 text-[11px] font-bold bg-lime-500 text-white rounded-lg hover:bg-lime-600 shadow-sm flex items-center gap-1.5">
                  <Save size={12} /> Save
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors flex flex-col items-center gap-2">
              <Upload size={16} className="text-blue-500" />
              <span className="text-[10px] font-medium text-slate-600">Upload Video</span>
            </button>
            <button className="p-3 bg-white border border-slate-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors flex flex-col items-center gap-2">
              <BookOpen size={16} className="text-green-500" />
              <span className="text-[10px] font-medium text-slate-600">Add Reading</span>
            </button>
            <button className="p-3 bg-white border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors flex flex-col items-center gap-2">
              <HelpCircle size={16} className="text-purple-500" />
              <span className="text-[10px] font-medium text-slate-600">Add Quiz</span>
            </button>
            <button className="p-3 bg-white border border-slate-200 rounded-lg hover:border-amber-300 hover:bg-amber-50 transition-colors flex flex-col items-center gap-2">
              <MessageCircle size={16} className="text-amber-500" />
              <span className="text-[10px] font-medium text-slate-600">Discussion</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
