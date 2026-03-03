// pages/CreateContentPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Monitor, CheckCircle2, Star, Plus, Image as ImageIcon, Type, MousePointer2,
  ChevronRight, Sparkles, FolderUp, ArrowRight, ArrowLeft, GripVertical, 
  Trash2, PlayCircle, BookOpen, CheckSquare, Files, MessageCircle, 
  ChevronDown, Award, X, Upload, FileText, Video, Edit3, Eye, Save,
  Settings, Layers, BookMarked, Users, Clock, Calendar, Check
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import Header from '../../components/layout/Header';


// ==================== WELCOME SCREEN ====================
const WelcomeScreen = ({ onGetStarted }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Abstract Background Decorations */}
      <div className="absolute top-1/4 left-10 text-slate-200 pointer-events-none">
        <Plus size={20} />
      </div>
      <div className="absolute top-1/2 right-20 text-slate-200 pointer-events-none">
        <Plus size={20} />
      </div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-40"></div>

      {/* Main Modal Card */}
      <div className="w-full max-w-2xl bg-white rounded-[32px] shadow-2xl shadow-blue-100/50 p-10 md:p-12 flex flex-col items-center text-center relative z-10">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative flex items-center justify-center mb-3">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl skew-x-[-12deg] flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-2xl -skew-x-[-12deg]">C</span>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl absolute left-5 -z-10 skew-x-[-12deg] shadow-md"></div>
          </div>
          <span className="text-[11px] font-bold text-orange-500 tracking-[0.2em] uppercase">Content Generator</span>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 tracking-tight">
          Welcome to ConGen
        </h1>
        <p className="text-slate-500 text-sm max-w-md leading-relaxed mb-10">
          Create professional content with AI assistance. Build courses, documents, resumes, and corporate materials in minutes.
        </p>

        {/* Illustration Section */}
        <div className="relative w-full max-w-sm h-44 mb-10 flex justify-center items-end">
          {/* Laptop Centerpiece */}
          <div className="relative w-44 h-28 border-4 border-slate-200 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <CheckCircle2 size={48} className="text-green-500 fill-green-50" />
            <div className="absolute -bottom-2 w-52 h-1.5 bg-slate-200 rounded-full"></div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-2 left-8 w-10 h-10 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center">
            <Layers size={18} className="text-purple-400" />
          </div>
          <div className="absolute top-2 right-8 w-10 h-10 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center">
            <BookMarked size={18} className="text-orange-400" />
          </div>
          
          <div className="absolute top-0 left-1/4 p-2 text-orange-400">
            <Star size={18} fill="currentColor" />
          </div>
          <div className="absolute top-10 left-1/3 p-1.5 bg-white shadow-md border border-slate-100 rounded-lg text-cyan-500">
            <ImageIcon size={14} />
          </div>
          <div className="absolute top-8 right-1/4 p-1.5 bg-white shadow-md border border-slate-100 rounded-lg text-blue-500">
            <Type size={14} />
          </div>
          <div className="absolute bottom-10 left-1/4 p-1.5 bg-white shadow-md border border-slate-100 rounded-lg text-slate-400 tracking-tighter font-bold text-[8px]">
            TT
          </div>
          <div className="absolute bottom-12 right-1/3 w-3 h-3 rounded-full border-2 border-cyan-400"></div>
        </div>

        {/* Features List */}
        <div className="grid grid-cols-3 gap-4 w-full mb-8">
          {[
            { icon: Sparkles, label: 'AI Powered', color: 'text-purple-500' },
            { icon: Clock, label: 'Save Time', color: 'text-blue-500' },
            { icon: Award, label: 'Pro Quality', color: 'text-amber-500' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50">
              <item.icon size={20} className={item.color} />
              <span className="text-xs font-medium text-slate-600">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button 
          onClick={onGetStarted}
          className="w-full py-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-bold rounded-2xl hover:from-slate-900 hover:to-black transition-all tracking-wide text-sm shadow-lg shadow-slate-200 flex items-center justify-center gap-2"
        >
          Get Started
          <ArrowRight size={18} />
        </button>

        <p className="text-xs text-slate-400 mt-4">
          No credit card required • Free to start
        </p>
      </div>

      {/* Floating Hand Graphic */}
      <div className="absolute right-[8%] top-1/2 translate-y-8 hidden lg:block">
        <div className="relative">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl text-white shadow-xl rotate-12">
            <MousePointer2 size={28} fill="currentColor" />
          </div>
          <div className="absolute -left-12 top-0 w-10 h-16 border-2 border-slate-300 rounded-full border-dashed opacity-40"></div>
        </div>
      </div>
    </div>
  );
};

// ==================== STEP 1: ABOUT COURSE ====================
const AboutCourseStep = ({ formData, setFormData, onNext, onBack }) => {
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
    <div className="p-6 md:p-10">
      {/* Header Illustration & Title */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-14 h-10 border-2 border-slate-300 rounded-lg bg-slate-50"></div>
          <div className="relative">
            <ArrowRight className="text-slate-400" />
            <Sparkles className="absolute -top-4 -left-2 text-purple-400 w-5 h-5" />
          </div>
          <div className="w-14 h-14 bg-gradient-to-br from-purple-200 to-blue-200 rounded-xl flex items-center justify-center shadow-sm">
            <div className="w-10 h-10 bg-white/90 rounded-lg p-2">
              <div className="w-full h-1 bg-slate-200 mb-1 rounded"></div>
              <div className="w-2/3 h-1 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Let's start building your content</h1>
        <p className="text-slate-500 text-sm max-w-xl">Share your vision and source materials, and we'll create engaging content designed for your audience.</p>
      </div>

      {/* Form Section */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">Content Information</h2>
          <button className="flex items-center gap-2 px-4 py-1.5 border border-orange-400 text-orange-500 rounded-full text-sm font-medium hover:bg-orange-50 transition-colors">
            <Sparkles size={14} />
            Edit with AI
          </button>
        </div>

        {/* Input: Title */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">
            Enter Content Title <span className="text-red-500">*</span>
          </label>
          <input 
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Learn AI with Prof. Dutta"
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
          />
        </div>

        {/* Input: Style & Tone */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">
            Content Style & Tone 
            <span className="text-blue-500 text-[10px] ml-2 font-normal">(autogenerated)</span>
          </label>
          <input 
            type="text"
            value={formData.style}
            onChange={(e) => setFormData({ ...formData, style: e.target.value })}
            placeholder="Motivational, practical, career-driven"
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none"
          />
        </div>

        {/* Textarea: Target Audience */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">
            Target Audience 
            <span className="text-blue-500 text-[10px] ml-2 font-normal">(autogenerated)</span>
          </label>
          <textarea 
            rows={3}
            value={formData.audience}
            onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
            placeholder="Students, professionals, beginners who want to learn..."
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none"
          />
        </div>

        {/* Textarea: Learning Goals */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">
            Learning Goals 
            <span className="text-blue-500 text-[10px] ml-2 font-normal">(autogenerated)</span>
          </label>
          <textarea 
            rows={4}
            value={formData.goals}
            onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
            placeholder="Learners will understand core concepts, gain hands-on experience..."
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none"
          />
        </div>

        {/* Module Selection */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700">How Many Modules Do You Want?</label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                onClick={() => setSelectedModules(num)}
                className={`w-12 h-10 rounded-lg border-2 font-bold text-sm transition-all ${
                  selectedModules === num 
                    ? 'border-blue-500 bg-blue-50 text-blue-600' 
                    : 'border-slate-200 text-slate-400 hover:border-slate-300'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-blue-500">
            Each module can contain videos, articles, quizzes, and discussions.
          </p>
        </div>

        {/* File Upload Zone */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700">Upload Source Materials</label>
          <label className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-blue-300 transition-colors cursor-pointer group">
            <input type="file" multiple className="hidden" onChange={handleFileUpload} />
            <FolderUp size={40} className="text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-slate-600 font-medium text-sm">
              Drag & drop files or <span className="text-blue-500 underline">browse</span>
            </p>
            <p className="text-xs text-slate-400 mt-2">PDF, DOC, PPT, XLS (Max 3 MB each)</p>
          </label>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2 mt-4">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">{file.name}</p>
                      <p className="text-xs text-slate-400">{file.size}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setUploadedFiles(uploadedFiles.filter(f => f.id !== file.id))}
                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X size={16} className="text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Disclaimer & Footer */}
        <div className="pt-4 space-y-6">
          <div className="flex items-start gap-3">
            <input 
              type="checkbox" 
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1.5 rounded border-slate-300 text-orange-500 focus:ring-orange-400" 
            />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              <span className="text-red-400">All uploaded files will be used by AI to generate content.</span> By uploading, you confirm the materials are your own or you hold legal rights.
            </p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={onBack}
              className="flex-1 py-3.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Back
            </button>
            <button 
              onClick={handleNext}
              disabled={!formData.title || !agreed}
              className={`flex-1 py-3.5 font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
                formData.title && agreed
                  ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-lg shadow-orange-100 hover:scale-[1.02]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Generate Modules
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== STEP 2: MANAGE MODULES ====================
const ManageModulesStep = ({ formData, setFormData, onNext, onBack }) => {
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
    <div className="p-6 md:p-10">
      {/* Header Info */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">{formData.title || 'Your Content'}</h1>
        <p className="text-sm text-slate-500 max-w-3xl">
          {formData.goals || 'Manage your modules and set the number of activities for each.'}
        </p>
      </div>

      {/* Module Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-[12px] font-bold text-slate-700 border-b border-slate-200">
              <th className="p-4 w-1/3">Module Name</th>
              <th className="p-4 text-center w-20">Thumbnail</th>
              <th className="p-4 text-center">Article</th>
              <th className="p-4 text-center">Video</th>
              <th className="p-4 text-center">Quiz</th>
              <th className="p-4 text-center">Resources</th>
              <th className="p-4 text-center">Discussion</th>
              <th className="p-4 text-center w-24">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {modules.map((mod) => (
              <tr key={mod.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <GripVertical size={16} className="text-slate-300 cursor-grab flex-shrink-0" />
                    <input 
                      type="text" 
                      value={mod.name}
                      onChange={(e) => updateModule(mod.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:border-blue-400 outline-none"
                    />
                  </div>
                </td>
                <td className="p-4">
                  <button className="w-10 h-10 border border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-400 transition-all mx-auto">
                    <Plus size={16} />
                  </button>
                </td>
                <td className="p-4">
                  <input 
                    type="number" 
                    value={mod.article}
                    onChange={(e) => updateModule(mod.id, 'article', parseInt(e.target.value) || 0)}
                    className="w-14 p-2 border border-slate-200 rounded-lg text-center text-sm focus:border-blue-400 outline-none mx-auto block"
                  />
                </td>
                <td className="p-4">
                  <input 
                    type="number" 
                    value={mod.video}
                    onChange={(e) => updateModule(mod.id, 'video', parseInt(e.target.value) || 0)}
                    className="w-14 p-2 border border-slate-200 rounded-lg text-center text-sm focus:border-blue-400 outline-none mx-auto block"
                  />
                </td>
                <td className="p-4">
                  <input 
                    type="number" 
                    value={mod.quiz}
                    onChange={(e) => updateModule(mod.id, 'quiz', parseInt(e.target.value) || 0)}
                    className="w-14 p-2 border border-slate-200 rounded-lg text-center text-sm focus:border-blue-400 outline-none mx-auto block"
                  />
                </td>
                <td className="p-4">
                  <input 
                    type="number" 
                    value={mod.resources}
                    onChange={(e) => updateModule(mod.id, 'resources', parseInt(e.target.value) || 0)}
                    className="w-14 p-2 border border-slate-200 rounded-lg text-center text-sm focus:border-blue-400 outline-none mx-auto block"
                  />
                </td>
                <td className="p-4">
                  <input 
                    type="number" 
                    value={mod.discussion}
                    onChange={(e) => updateModule(mod.id, 'discussion', parseInt(e.target.value) || 0)}
                    className="w-14 p-2 border border-slate-200 rounded-lg text-center text-sm focus:border-blue-400 outline-none mx-auto block"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 hover:bg-orange-50 rounded-lg transition-colors">
                      <Sparkles size={16} className="text-orange-400" />
                    </button>
                    <button 
                      onClick={() => removeModule(mod.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} className="text-red-400" />
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
        className="mt-4 flex items-center gap-2 text-blue-500 text-sm font-bold hover:underline"
      >
        <Plus size={16} /> Add Module
      </button>

      {/* Footer Actions */}
      <div className="mt-10 flex gap-3">
        <button 
          onClick={onBack}
          className="flex-1 py-3.5 border border-orange-400 text-orange-500 font-semibold rounded-xl hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <button 
          onClick={handleNext}
          className="flex-1 py-3.5 bg-gradient-to-r from-orange-400 to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
          Generate Activities
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

// ==================== STEP 3: COURSE ACTIVITY ====================
const CourseActivityStep = ({ formData, setFormData, onNext, onBack }) => {
  const [expandedModule, setExpandedModule] = useState(1);

  const modules = formData.modules || [];

  const getActivityIcon = (type) => {
    const icons = {
      video: <PlayCircle size={16} className="text-blue-500" />,
      article: <BookOpen size={16} className="text-green-500" />,
      quiz: <CheckSquare size={16} className="text-purple-500" />,
      resources: <Files size={16} className="text-amber-500" />,
      discussion: <MessageCircle size={16} className="text-cyan-500" />
    };
    return icons[type] || <Files size={16} />;
  };

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Course Activities</h1>
        <p className="text-sm text-slate-500">Review and customize the generated activities for each module.</p>
      </div>

      {/* Modules Accordion */}
      <div className="space-y-4">
        {modules.map((mod) => (
          <div key={mod.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            {/* Module Header */}
            <button
              onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
              className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center font-bold text-blue-600">
                  {mod.id}
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-slate-800">{mod.name}</h3>
                  <div className="flex gap-3 mt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <PlayCircle size={12} /> {mod.video} videos
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={12} /> {mod.article} articles
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckSquare size={12} /> {mod.quiz} quiz
                    </span>
                  </div>
                </div>
              </div>
              <ChevronDown 
                size={20} 
                className={`text-slate-400 transition-transform ${expandedModule === mod.id ? 'rotate-180' : ''}`} 
              />
            </button>

            {/* Module Content */}
            {expandedModule === mod.id && (
              <div className="border-t border-slate-100 p-5 bg-slate-50/50">
                <div className="grid gap-3">
                  {/* Generate sample activities */}
                  {[
                    ...Array(mod.video).fill('video'),
                    ...Array(mod.article).fill('article'),
                    ...Array(mod.quiz).fill('quiz'),
                  ].map((type, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">
                        {getActivityIcon(type)}
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          defaultValue={`${type.charAt(0).toUpperCase() + type.slice(1)} ${i + 1}: Sample ${type} content`}
                          className="w-full text-sm font-medium text-slate-700 bg-transparent outline-none focus:bg-slate-50 px-2 py-1 rounded"
                        />
                        <p className="text-xs text-slate-400 px-2 capitalize">{type}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-slate-100 rounded-lg">
                          <Edit3 size={14} className="text-slate-400" />
                        </button>
                        <button className="p-2 hover:bg-orange-50 rounded-lg">
                          <Sparkles size={14} className="text-orange-400" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg">
                          <Trash2 size={14} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-4 flex items-center gap-2 text-blue-500 text-sm font-medium hover:underline">
                  <Plus size={16} /> Add Activity
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="mt-10 flex gap-3">
        <button 
          onClick={onBack}
          className="flex-1 py-3.5 border border-orange-400 text-orange-500 font-semibold rounded-xl hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <button 
          onClick={onNext}
          className="flex-1 py-3.5 bg-gradient-to-r from-orange-400 to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
          Preview Course
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

// ==================== STEP 4: PREVIEW ====================
const PreviewStep = ({ formData, onBack, onPublish }) => {
  const modules = formData.modules || [];

  return (
    <div className="p-6 md:p-10">
      {/* Course Header Card */}
      <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {formData.title?.charAt(0) || 'C'}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">{formData.title || 'Your Course'}</h1>
              <p className="text-sm text-slate-600 mt-1">Created with ConGen AI</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">CREATOR</p>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-bold shadow-md hover:bg-blue-600 transition-all">
            Set Course Price
          </button>
        </div>

        <div className="mt-6">
          <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase">
            Publish As : Individual + Group
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Calendar size={14} /> Registration
            </h3>
            <p className="text-xs text-slate-600">Start : {new Date().toLocaleDateString()}</p>
            <p className="text-xs text-slate-600">End : {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</p>
            <p className="text-xs text-slate-600">Batch No : IGS001</p>
            <p className="text-xs text-slate-600 font-medium">( Max 100 Students )</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-slate-600 font-bold">Course Fees : <span className="text-slate-400 line-through">$100</span></p>
            <p className="text-xs text-slate-600 font-bold">Discount : <span className="text-slate-400">$10</span></p>
            <p className="text-sm font-black text-slate-800">Payable Fees : $90</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-slate-600 font-bold flex items-center gap-2">
              <Users size={14} /> Batch Details
            </p>
            <p className="text-xs text-slate-600">Duration: {modules.length * 2} Weeks</p>
            <div className="flex items-center gap-2 mt-2 text-slate-700">
              <Award size={16} />
              <p className="text-xs font-bold">Certificate : <span className="font-medium">Provided</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
        {modules.map((mod, idx) => (
          <div key={mod.id} className={`p-5 flex items-center gap-5 ${idx !== modules.length - 1 ? 'border-b border-slate-100' : ''}`}>
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-blue-500">{mod.id}</span>
            </div>
            
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-800">
                <span className="text-blue-500">Module {mod.id}:</span> {mod.name.replace(`Module ${mod.id}: `, '')}
              </h4>
              <p className="text-xs font-bold text-slate-600 mt-2 mb-2">What's included</p>
              
              <div className="flex flex-wrap gap-4 text-slate-400 text-[11px] font-medium">
                <span className="flex items-center gap-1.5"><PlayCircle size={14}/> {mod.video} videos</span>
                <span className="flex items-center gap-1.5"><BookOpen size={14}/> {mod.article} readings</span>
                <span className="flex items-center gap-1.5"><CheckSquare size={14}/> {mod.quiz} quiz</span>
                <span className="flex items-center gap-1.5"><Files size={14}/> {mod.resources} resources</span>
                <span className="flex items-center gap-1.5"><MessageCircle size={14}/> {mod.discussion} discussion</span>
              </div>
            </div>

            <ChevronDown className="text-slate-300 flex-shrink-0" size={20} />
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Modules', value: modules.length, icon: Layers, color: 'text-purple-500' },
          { label: 'Total Videos', value: modules.reduce((acc, m) => acc + m.video, 0), icon: Video, color: 'text-blue-500' },
          { label: 'Total Quizzes', value: modules.reduce((acc, m) => acc + m.quiz, 0), icon: CheckSquare, color: 'text-green-500' },
          { label: 'Est. Duration', value: `${modules.length * 2}h`, icon: Clock, color: 'text-amber-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-slate-100">
            <stat.icon size={20} className={stat.color} />
            <p className="text-2xl font-bold text-slate-800 mt-2">{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="mt-10 flex gap-3">
        <button 
          onClick={onBack}
          className="flex-1 py-3.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <button className="px-6 py-3.5 border border-amber-400 text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition-colors flex items-center justify-center gap-2">
          <Save size={18} />
          Save Draft
        </button>
        <button 
          onClick={onPublish}
          className="flex-1 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-green-100 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
          <Check size={18} />
          Publish Course
        </button>
      </div>
    </div>
  );
};

// ==================== MAIN CREATE CONTENT PAGE ====================
const CreateContentPage = () => {
  const navigate = useNavigate();
  const { user } = useApp();
  
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    style: 'Professional, engaging, and easy to understand',
    audience: '',
    goals: '',
    moduleCount: 3,
    modules: [],
    files: []
  });

  const steps = [
    { id: 1, title: 'About Course' },
    { id: 2, title: 'Manage Module' },
    { id: 3, title: 'Course Activity' },
    { id: 4, title: 'Preview' },
  ];

  const handlePublish = () => {
    // Save to localStorage or API
    const savedCourses = JSON.parse(localStorage.getItem('congenContents') || '[]');
    const newCourse = {
      id: Date.now(),
      title: formData.title,
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4638d9f8e?auto=format&fit=crop&q=80&w=400',
      badges: [{ text: 'New', color: 'bg-green-100 text-green-600' }],
      duration: `${formData.modules.length * 2} Weeks`,
      videos: `${formData.modules.reduce((acc, m) => acc + m.video, 0)}+ Videos`,
      level: 'All Levels',
      commitment: '4 hours/day',
      students: 0,
      status: 'published',
      type: 'course',
      modules: formData.modules
    };
    
    localStorage.setItem('congenContents', JSON.stringify([...savedCourses, newCourse]));
    navigate('/congen');
  };

  // Show Welcome Screen
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header user={user} title="ConGen™" />
        <WelcomeScreen onGetStarted={() => setShowWelcome(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header user={user} title="ConGen™" />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-[28px] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          
          {/* Step Navigation */}
          <nav className="flex items-center justify-center gap-3 md:gap-4 py-6 border-b border-slate-100 text-[13px] font-medium px-4 overflow-x-auto">
            {steps.map((step, index) => {
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;
              
              return (
                <React.Fragment key={step.id}>
                  <div className={`flex items-center gap-2 whitespace-nowrap ${
                    isActive ? 'text-slate-900 font-bold' : isCompleted ? 'text-blue-500' : 'text-slate-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 size={16} className="text-blue-500 fill-blue-500" />
                    ) : (
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                        isActive ? 'border-slate-900 text-slate-900' : 'border-slate-300 text-slate-400'
                      }`}>
                        {step.id}
                      </span>
                    )}
                    <span className={isActive ? 'border-b-2 border-slate-900 pb-0.5' : ''}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight size={14} className="text-slate-300 flex-shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Step Content */}
          {currentStep === 1 && (
            <AboutCourseStep 
              formData={formData}
              setFormData={setFormData}
              onNext={() => setCurrentStep(2)}
              onBack={() => setShowWelcome(true)}
            />
          )}
          
          {currentStep === 2 && (
            <ManageModulesStep 
              formData={formData}
              setFormData={setFormData}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}
          
          {currentStep === 3 && (
            <CourseActivityStep 
              formData={formData}
              setFormData={setFormData}
              onNext={() => setCurrentStep(4)}
              onBack={() => setCurrentStep(2)}
            />
          )}
          
          {currentStep === 4 && (
            <PreviewStep 
              formData={formData}
              onBack={() => setCurrentStep(3)}
              onPublish={handlePublish}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateContentPage;