// ManageModulesStep.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  GripVertical, Plus, Sparkles, Trash2, ArrowLeft, ArrowRight, 
  Image as ImageIcon, X, Upload, Check, RefreshCw, Wand2
} from 'lucide-react';

// ==================== AI GENERATE POPUP ====================
const AIGenerateModal = ({ module, onClose, onTryAgain }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTryAgain = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      onTryAgain(module.id);
      onClose();
    }, 1500);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-400 to-amber-500 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Wand2 size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Edit Module</h3>
                <p className="text-white/70 text-xs">AI-powered content generation</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Module Info */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Sparkles size={20} className="text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 truncate">{module?.name}</p>
              <p className="text-xs text-slate-400">Module {module?.id}</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>About the Module:</strong> AI will generate an optimized and engaging description for each course module.
            </p>
          </div>

          {/* AI Animation */}
          {isGenerating && (
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-6 h-6 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin"></div>
              <span className="text-sm text-slate-600">Generating content...</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex gap-3">
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="flex-1 py-2.5 text-sm font-medium border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleTryAgain}
            disabled={isGenerating}
            className="flex-1 py-2.5 text-sm font-bold bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-xl hover:from-orange-500 hover:to-amber-600 flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw size={16} className={isGenerating ? 'animate-spin' : ''} />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== THUMBNAIL UPLOAD MODAL ====================
const ThumbnailModal = ({ module, onClose, onSave }) => {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(module?.thumbnail || null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleSave = () => {
    onSave(module.id, previewUrl);
    onClose();
  };

  const handleRemove = () => {
    setPreviewUrl(null);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <ImageIcon size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Module Thumbnail</h3>
                <p className="text-white/70 text-xs truncate max-w-[200px]">{module?.name}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {previewUrl ? (
            <div className="relative mb-4">
              <img 
                src={previewUrl} 
                alt="Thumbnail preview" 
                className="w-full h-48 object-cover rounded-xl border border-slate-200"
              />
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors mb-4 ${
                dragActive 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-slate-300 hover:border-purple-400 hover:bg-purple-50/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
              />
              <Upload size={32} className="mx-auto text-purple-500 mb-3" />
              <p className="text-sm text-slate-600 font-medium">
                Drag & drop an image or <span className="text-purple-500">browse</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          )}

          {/* Sample Images */}
          <div className="mb-4">
            <p className="text-xs font-medium text-slate-500 mb-2">Or choose from samples:</p>
            <div className="grid grid-cols-4 gap-2">
              {[
                'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop',
                'https://images.unsplash.com/photo-1620712943543-bcc4638d9f8e?w=100&h=100&fit=crop',
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
                'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&h=100&fit=crop',
              ].map((url, i) => (
                <button
                  key={i}
                  onClick={() => setPreviewUrl(url)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    previewUrl === url ? 'border-purple-500 ring-2 ring-purple-200' : 'border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <img src={url} alt={`Sample ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-medium border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 text-sm font-bold bg-purple-500 text-white rounded-xl hover:bg-purple-600 flex items-center justify-center gap-1.5"
          >
            <Check size={16} />
            Save Thumbnail
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== DEFAULT MODULE NAMES ====================
const DEFAULT_MODULE_NAMES = [
  "Explore AI applications and benefits",
  "Examine risks and ethics of AI",
  "Identify possible applications of AI",
  "Understanding Machine Learning basics",
  "Deep dive into Neural Networks",
  "Natural Language Processing fundamentals",
  "Computer Vision and Image Recognition",
  "AI in Business and Industry",
  "Building AI-powered solutions",
  "Future of Artificial Intelligence",
  "AI Tools and Frameworks",
  "Practical AI Projects",
  "AI Ethics and Governance",
  "Data Science for AI",
  "AI Integration Strategies"
];

// ==================== MANAGE MODULES STEP ====================
export const ManageModulesStep = ({ formData, setFormData, onNext, onBack }) => {
  
  // Generate modules with meaningful names
  const generateModules = (count) => {
    const moduleCount = Math.max(1, count || 1);
    return Array.from({ length: moduleCount }, (_, i) => ({
      id: i + 1,
      name: DEFAULT_MODULE_NAMES[i] || `Module ${i + 1}: Advanced Topic`,
      thumbnail: null,
      article: 2,
      video: 5,
      quiz: 1,
      resources: 1,
      discussion: 1
    }));
  };

  const [modules, setModules] = useState(() => {
    if (formData.modules && formData.modules.length > 0) {
      return formData.modules;
    }
    return generateModules(formData.moduleCount);
  });

  const [thumbnailModule, setThumbnailModule] = useState(null);
  const [aiGenerateModule, setAiGenerateModule] = useState(null);
  
  // Drag and Drop States
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  useEffect(() => {
    if (formData.moduleCount && (!formData.modules || formData.modules.length === 0)) {
      setModules(generateModules(formData.moduleCount));
    }
  }, [formData.moduleCount]);

  // Drag and Drop Handlers
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

    const newModules = [...modules];
    const draggedModule = newModules[draggedIndex];
    
    newModules.splice(draggedIndex, 1);
    newModules.splice(dropIndex, 0, draggedModule);
    
    // Update IDs to maintain order
    const reorderedModules = newModules.map((mod, idx) => ({
      ...mod,
      id: idx + 1
    }));
    
    setModules(reorderedModules);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const addModule = () => {
    const newIndex = modules.length;
    const newId = newIndex + 1;
    setModules([
      ...modules,
      {
        id: newId,
        name: DEFAULT_MODULE_NAMES[newIndex] || `New Module: Topic ${newId}`,
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
      const filteredModules = modules.filter(m => m.id !== id);
      // Re-order IDs
      const reorderedModules = filteredModules.map((mod, idx) => ({
        ...mod,
        id: idx + 1
      }));
      setModules(reorderedModules);
    }
  };

  const updateModule = (id, field, value) => {
    const sanitizedValue = typeof value === 'number' ? Math.max(0, value) : value;
    setModules(modules.map(m => m.id === id ? { ...m, [field]: sanitizedValue } : m));
  };

  const handleSaveThumbnail = (moduleId, thumbnailUrl) => {
    setModules(modules.map(m => m.id === moduleId ? { ...m, thumbnail: thumbnailUrl } : m));
  };

  const handleAIGenerate = (moduleId) => {
    // Generate new AI content for the module
    const randomNames = [
      "Understanding AI fundamentals",
      "Machine Learning in practice",
      "Deep Learning applications",
      "AI for data analysis",
      "Intelligent automation systems",
      "AI-powered decision making",
      "Building smart applications"
    ];
    const newName = randomNames[Math.floor(Math.random() * randomNames.length)];
    setModules(modules.map(m => m.id === moduleId ? { ...m, name: newName } : m));
  };

  const handleNext = () => {
    setFormData({ ...formData, modules });
    onNext();
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-1.5">
          {formData.title || 'Learn Ai with Prof.Dutta'}
        </h1>
        <p className="text-xs text-slate-500 max-w-6xl line-clamp-2">
          {formData.goals || 'Learners will understand core concepts of Artificial Intelligence and develop problem solving skills.'}
        </p>
        
      </div>

      {/* Modules Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 text-[11px] font-bold text-slate-700 border-b border-slate-200">
              <th className="p-3 w-1/3">Module Name</th>
              <th className="p-3 text-center w-20">Thumbnail</th>
              <th className="p-3 text-center w-16">Article</th>
              <th className="p-3 text-center w-16">Video</th>
              <th className="p-3 text-center w-16">Quiz</th>
              <th className="p-3 text-center w-16">Resources</th>
              <th className="p-3 text-center w-16">Discussion</th>
              <th className="p-3 text-center w-20">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {modules.map((mod, index) => (
              <tr 
                key={mod.id} 
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                className={`hover:bg-slate-50/50 transition-all ${
                  dragOverIndex === index && draggedIndex !== index 
                    ? 'border-t-2 border-t-blue-500 bg-blue-50/30' 
                    : ''
                } ${draggedIndex === index ? 'opacity-50' : ''}`}
              >
                {/* Module Name */}
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 flex-shrink-0">
                      <GripVertical size={14} />
                    </div>
                    <span className="text-xs text-slate-400 font-medium w-5 flex-shrink-0">{index + 1}.</span>
                    <input 
                      type="text" 
                      value={mod.name}
                      onChange={(e) => updateModule(mod.id, 'name', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white focus:border-blue-400 outline-none"
                    />
                  </div>
                </td>

                {/* Thumbnail */}
                <td className="p-3">
                  <button 
                    onClick={() => setThumbnailModule(mod)}
                    className={`w-10 h-10 border rounded-lg flex items-center justify-center mx-auto overflow-hidden transition-all ${
                      mod.thumbnail 
                        ? 'border-purple-300 hover:border-purple-500' 
                        : 'border-dashed border-slate-300 hover:border-blue-400 hover:text-blue-400 text-slate-400'
                    }`}
                  >
                    {mod.thumbnail ? (
                      <img src={mod.thumbnail} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Plus size={14} />
                    )}
                  </button>
                </td>

                {/* Article */}
                <td className="p-3">
                  <input 
                    type="number" 
                    value={mod.article}
                    min={0}
                    onChange={(e) => updateModule(mod.id, 'article', parseInt(e.target.value) || 0)}
                    className="w-12 p-1.5 text-xs border border-slate-200 rounded-lg text-center focus:border-blue-400 outline-none mx-auto block"
                  />
                </td>

                {/* Video */}
                <td className="p-3">
                  <input 
                    type="number" 
                    value={mod.video}
                    min={0}
                    onChange={(e) => updateModule(mod.id, 'video', parseInt(e.target.value) || 0)}
                    className="w-12 p-1.5 text-xs border border-slate-200 rounded-lg text-center focus:border-blue-400 outline-none mx-auto block"
                  />
                </td>

                {/* Quiz */}
                <td className="p-3">
                  <input 
                    type="number" 
                    value={mod.quiz}
                    min={0}
                    onChange={(e) => updateModule(mod.id, 'quiz', parseInt(e.target.value) || 0)}
                    className="w-12 p-1.5 text-xs border border-slate-200 rounded-lg text-center focus:border-blue-400 outline-none mx-auto block"
                  />
                </td>

                {/* Resources */}
                <td className="p-3">
                  <input 
                    type="number" 
                    value={mod.resources}
                    min={0}
                    onChange={(e) => updateModule(mod.id, 'resources', parseInt(e.target.value) || 0)}
                    className="w-12 p-1.5 text-xs border border-slate-200 rounded-lg text-center focus:border-blue-400 outline-none mx-auto block"
                  />
                </td>

                {/* Discussion */}
                <td className="p-3">
                  <input 
                    type="number" 
                    value={mod.discussion}
                    min={0}
                    onChange={(e) => updateModule(mod.id, 'discussion', parseInt(e.target.value) || 0)}
                    className="w-12 p-1.5 text-xs border border-slate-200 rounded-lg text-center focus:border-blue-400 outline-none mx-auto block"
                  />
                </td>

                {/* Actions */}
                <td className="p-3">
                  <div className="flex items-center justify-center gap-1.5">
                    <button 
                      onClick={() => setAiGenerateModule(mod)}
                      className="p-1.5 hover:bg-orange-50 rounded-lg transition-colors"
                      title="Generate with AI"
                    >
                      <Sparkles size={14} className="text-orange-400" />
                    </button>
                    <button 
                      onClick={() => removeModule(mod.id)}
                      disabled={modules.length <= 1}
                      className={`p-1.5 rounded-lg transition-colors ${
                        modules.length <= 1 
                          ? 'opacity-30 cursor-not-allowed' 
                          : 'hover:bg-red-50'
                      }`}
                      title={modules.length <= 1 ? 'At least 1 module required' : 'Delete module'}
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

      {/* Add Module Button */}
      <button 
        onClick={addModule}
        className="mt-3 flex items-center gap-1.5 text-blue-500 text-xs font-bold hover:underline"
      >
        <Plus size={14} /> Add Module
      </button>

      {/* Summary */}
      {/* <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex flex-wrap gap-4 text-xs text-slate-600">
          <span><strong className="text-slate-700">{modules.length}</strong> Modules</span>
          <span><strong className="text-slate-700">{modules.reduce((acc, m) => acc + (m.video || 0), 0)}</strong> Videos</span>
          <span><strong className="text-slate-700">{modules.reduce((acc, m) => acc + (m.article || 0), 0)}</strong> Articles</span>
          <span><strong className="text-slate-700">{modules.reduce((acc, m) => acc + (m.quiz || 0), 0)}</strong> Quizzes</span>
          <span><strong className="text-slate-700">{modules.reduce((acc, m) => acc + (m.resources || 0), 0)}</strong> Resources</span>
          <span><strong className="text-slate-700">{modules.reduce((acc, m) => acc + (m.discussion || 0), 0)}</strong> Discussions</span>
        </div>
      </div> */}

      {/* Action Buttons */}
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
          disabled={modules.length === 0}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            modules.length > 0
              ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-lg shadow-orange-100 hover:scale-[1.02]'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Generate Activities
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Thumbnail Modal */}
      {thumbnailModule && (
        <ThumbnailModal
          module={thumbnailModule}
          onClose={() => setThumbnailModule(null)}
          onSave={handleSaveThumbnail}
        />
      )}

      {/* AI Generate Modal */}
      {aiGenerateModule && (
        <AIGenerateModal
          module={aiGenerateModule}
          onClose={() => setAiGenerateModule(null)}
          onTryAgain={handleAIGenerate}
        />
      )}
    </div>
  );
};

export default ManageModulesStep;