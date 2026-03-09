// AboutCourseStep.jsx
import React, { useState } from 'react';
import { 
  Sparkles, FolderUp, ArrowRight, ArrowLeft, FileText, X, 
  Settings, Trash2, AlertTriangle, Check, Upload
} from 'lucide-react';

// ==================== SETTINGS POPUP ====================
const SettingsModal = ({ file, onClose, onSave }) => {
  const [fileName, setFileName] = useState(file?.name || '');
  const [useForAI, setUseForAI] = useState(true);
  const [priority, setPriority] = useState('normal');

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Settings size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg">File Settings</h3>
                <p className="text-white/70 text-xs">Configure file options</p>
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
        <div className="p-5 space-y-4">
          {/* File Info */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText size={20} className="text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 truncate">{file?.name}</p>
              <p className="text-xs text-slate-400">{file?.size || 'Unknown size'}</p>
            </div>
          </div>

          {/* File Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Display Name</label>
            <input 
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-blue-400 outline-none"
            />
          </div>

          {/* Use for AI */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-slate-700">Use for AI Generation</p>
              <p className="text-xs text-slate-400">Include this file in content generation</p>
            </div>
            <button 
              onClick={() => setUseForAI(!useForAI)}
              className={`relative w-12 h-6 rounded-full transition-colors ${useForAI ? 'bg-green-500' : 'bg-slate-300'}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${useForAI ? 'left-6' : 'left-0.5'}`} />
            </button>
          </div>

          {/* Priority */}
          {/* <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Priority Level</label>
            <div className="flex gap-2">
              {['low', 'normal', 'high'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg capitalize transition-colors ${
                    priority === p 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div> */}
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
            onClick={() => {
              onSave({ ...file, name: fileName, useForAI, priority });
              onClose();
            }}
            className="flex-1 py-2.5 text-sm font-bold bg-blue-500 text-white rounded-xl hover:bg-blue-600 flex items-center justify-center gap-1.5"
          >
            <Check size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== DELETE CONFIRMATION POPUP ====================
const DeleteConfirmModal = ({ file, onClose, onDelete }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl">
        {/* Content */}
        <div className="p-6 text-center">
          {/* Warning Icon */}
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle size={32} className="text-red-500" />
          </div>

          <h3 className="text-lg font-bold text-slate-800 mb-2">Delete File?</h3>
          
          <p className="text-sm text-slate-500 mb-2">
            Are you sure you want to delete this file?
          </p>
          
          {/* File Info */}
          <div className="flex items-center justify-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4">
            <FileText size={18} className="text-slate-400" />
            <p className="text-sm font-medium text-slate-700 truncate">{file?.name}</p>
          </div>
          
          <p className="text-xs text-slate-400">
            This action cannot be undone.
          </p>
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
            onClick={() => {
              onDelete(file.id);
              onClose();
            }}
            className="flex-1 py-2.5 text-sm font-bold bg-red-500 text-white rounded-xl hover:bg-red-600 flex items-center justify-center gap-1.5"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== ABOUT COURSE STEP ====================
export const AboutCourseStep = ({ formData, setFormData, onNext, onBack }) => {
  const [selectedModules, setSelectedModules] = useState(formData.moduleCount || 1);
  const [uploadedFiles, setUploadedFiles] = useState(formData.files || [
    // Default placeholder files
    { id: 1, name: 'WhatsApp Image.jpeg', size: '1.2 MB', type: 'image/jpeg', checked: true },
    { id: 2, name: 'WhatsApp Image (1).jpeg', size: '0.8 MB', type: 'image/jpeg', checked: true },
    { id: 3, name: 'Recording.mp4', size: '2.5 MB', type: 'video/mp4', checked: true },
  ]);
  const [agreed, setAgreed] = useState(false);
  
  // Popup states
  const [settingsFile, setSettingsFile] = useState(null);
  const [deleteFile, setDeleteFile] = useState(null);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.type,
      checked: true
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const handleDeleteFile = (fileId) => {
    setUploadedFiles(uploadedFiles.filter(f => f.id !== fileId));
  };

  const handleToggleFile = (fileId) => {
    setUploadedFiles(uploadedFiles.map(f => 
      f.id === fileId ? { ...f, checked: !f.checked } : f
    ));
  };

  const handleSaveSettings = (updatedFile) => {
    setUploadedFiles(uploadedFiles.map(f => 
      f.id === updatedFile.id ? updatedFile : f
    ));
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
      {/* Header with Image */}
      <div className="flex flex-col items-center text-center mb-6">
        {/* Placeholder for image from public folder */}
        <div className="flex justify-center mb-4 gap-4">
          <img 
            src="/c2c-illustration.svg" 
            alt="Course Builder"
            className="w-30 h-20 object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        
        <h1 className="text-xl font-semibold text-gray-800 mb-1">
          Let's start building your course together
        </h1>
        <p className="text-gray-500 text-sm mt-1 max-w-xl">
          Share your vision and source materials, and we'll create engaging lessons designed for your learners.
        </p>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-gray-800">Course information</h2>
          <button className="border border-yellow-400 text-yellow-500 px-3 py-1 rounded-full text-sm hover:bg-yellow-50 transition-colors flex items-center gap-1.5">
            <Sparkles size={14} />
            Edit with AI
          </button>
        </div>

        {/* Course Title */}
        <div className="mb-4">
          <label className="text-sm font-medium text-slate-700">
            Enter Course Title <span className="text-red-500">*</span>
          </label>
          <input 
            type="text"
            value={formData.title || 'Learn with AI'}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border border-slate-200 rounded-md p-2 mt-1 text-sm focus:border-blue-400 outline-none"
          />
        </div>

        {/* Content Style & Tone */}
        <div className="mb-4">
          <label className="text-sm font-medium text-slate-700">
            Content Style & Tone <span className="text-blue-500 text-xs">(autogenerated)</span>
          </label>
          <textarea 
            rows={2}
            value={formData.style || 'Motivational, practical, career-driven, and industry-oriented'}
            onChange={(e) => setFormData({ ...formData, style: e.target.value })}
            className="w-full border border-slate-200 rounded-md p-2 mt-1 text-sm focus:border-blue-400 outline-none resize-none"
          />
        </div>

        {/* Target Audience */}
        <div className="mb-4">
          <label className="text-sm font-medium text-slate-700">
            Target Audience / Learner / User <span className="text-blue-500 text-xs">(autogenerated)</span>
          </label>
          <textarea 
            rows={3}
            value={formData.audience || 'Students, fresh graduates, and working professionals in India who want to build strong AI fundamentals, develop practical skills, and prepare for careers in technology, data, automation, and emerging digital industries.'}
            onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
            className="w-full border border-slate-200 rounded-md p-2 mt-1 text-sm focus:border-blue-400 outline-none resize-none"
          />
        </div>

        {/* Learning Goals */}
        <div className="mb-6">
          <label className="text-sm font-medium text-slate-700">
            Learning Goals <span className="text-blue-500 text-xs">(autogenerated)</span>
          </label>
          <textarea 
            rows={3}
            value={formData.goals || 'Learners will understand core concepts of Artificial Intelligence and develop problem solving skills.'}
            onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
            className="w-full border border-slate-200 rounded-md p-2 mt-1 text-sm focus:border-blue-400 outline-none resize-none"
          />
        </div>

        {/* Modules Selection */}
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-700 mb-2">
            How Many Modules You Want To Create Within Module
          </p>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                onClick={() => setSelectedModules(num)}
                className={`w-10 h-10 border rounded-md text-sm font-medium transition-all ${
                  selectedModules === num 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'border-blue-400 text-blue-500 hover:bg-blue-50'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="text-xs text-blue-500 mt-2">
            The next stage involves managing each modules activities Videos, Articles, Quizes, and Discussions either manually or via AI.
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-6">
          <label className="text-sm font-medium text-slate-700 mb-2 block">
            Upload Your Source material
          </label>
          <label className="border-2 border-dashed border-slate-300 rounded-lg p-10 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-colors block">
            <input type="file" multiple className="hidden" onChange={handleFileUpload} />
            <FolderUp className="mx-auto text-blue-500 mb-2" size={30} />
            <p className="text-sm text-gray-600">
              Drag & drop any source materials or 
              <span className="text-blue-600 ml-1 cursor-pointer hover:underline">
                choose file
              </span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Supported file types: PDF, XLS, DOC, PPT (Maximum 3 MB per file)
            </p>
          </label>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2 mb-4">
            {uploadedFiles.map((file) => (
              <div 
                key={file.id} 
                className="flex justify-between items-center border border-slate-200 rounded-md p-2.5 text-sm bg-white hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <input 
                    type="checkbox" 
                    checked={file.checked}
                    onChange={() => handleToggleFile(file.id)}
                    className="rounded border-slate-300 text-blue-500 focus:ring-blue-400"
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-slate-700 truncate">{file.name}</p>
                    <p className="text-xs text-slate-400">{file.size}</p>
                  </div>
                </div>

                <div className="flex gap-2 text-gray-400 flex-shrink-0">
                  <button 
                    onClick={() => setSettingsFile(file)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors hover:text-blue-500"
                    title="Settings"
                  >
                    <Settings size={16} />
                  </button>
                  <button 
                    onClick={() => setDeleteFile(file)}
                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors hover:text-red-500"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div className="flex items-start gap-2 mb-6">
          <input 
            type="checkbox" 
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 rounded border-slate-300 text-blue-500 focus:ring-blue-400" 
          />
          <p className="text-xs text-red-500 leading-relaxed">
            All uploaded source files will be used by Congen AI to generate course content. By uploading, you confirm the materials are your own or you hold full legal rights, and they do not violate any copyright or third-party rights.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button 
            onClick={onBack}
            className="px-6 py-2.5 text-sm border border-slate-200 text-slate-600 font-medium rounded-full hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button 
            onClick={handleNext}
            disabled={!(formData.title || 'Learn With AI') || !agreed}
            className={`px-6 py-2.5 text-sm font-medium rounded-full flex items-center gap-1.5 transition-all ${
              (formData.title || 'Learn with AI') && agreed
                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Generate Course Module
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Settings Popup */}
      {settingsFile && (
        <SettingsModal 
          file={settingsFile}
          onClose={() => setSettingsFile(null)}
          onSave={handleSaveSettings}
        />
      )}

      {/* Delete Confirmation Popup */}
      {deleteFile && (
        <DeleteConfirmModal 
          file={deleteFile}
          onClose={() => setDeleteFile(null)}
          onDelete={handleDeleteFile}
        />
      )}
    </div>
  );
};

export default AboutCourseStep;