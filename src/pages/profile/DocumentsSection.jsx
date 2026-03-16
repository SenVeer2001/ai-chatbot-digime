// pages/profile/DocumentsSection.jsx
import React, { useState, useRef } from 'react';
import {
  FileText,
  Upload,
  Folder,
  Image,
  File,
  FileSpreadsheet,
  Trash2,
  Download,
  Eye,
  Search,
  Grid,
  List,
  X,
  Clock,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

const DocumentsSection = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const categories = [
    { id: 'all', label: 'All Documents', icon: Folder, count: 12 },
    { id: 'contracts', label: 'Contracts', icon: FileText, count: 4 },
    { id: 'invoices', label: 'Invoices', icon: FileSpreadsheet, count: 3 },
    { id: 'identity', label: 'Identity', icon: File, count: 2 },
    { id: 'images', label: 'Images', icon: Image, count: 3 }
  ];

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Service Agreement 2024.pdf',
      category: 'contracts',
      size: '2.4 MB',
      type: 'pdf',
      uploadedAt: '2024-01-15',
      status: 'verified',
      thumbnail: null
    },
    {
      id: 2,
      name: 'Invoice_January.pdf',
      category: 'invoices',
      size: '156 KB',
      type: 'pdf',
      uploadedAt: '2024-01-10',
      status: 'pending',
      thumbnail: null
    },
    {
      id: 3,
      name: 'Company_Logo.png',
      category: 'images',
      size: '340 KB',
      type: 'image',
      uploadedAt: '2024-01-08',
      status: 'verified',
      thumbnail: '/api/placeholder/200/150'
    },
    {
      id: 4,
      name: 'NDA_Template.docx',
      category: 'contracts',
      size: '89 KB',
      type: 'doc',
      uploadedAt: '2024-01-05',
      status: 'verified',
      thumbnail: null
    },
    {
      id: 5,
      name: 'ID_Proof.jpg',
      category: 'identity',
      size: '1.2 MB',
      type: 'image',
      uploadedAt: '2024-01-03',
      status: 'verified',
      thumbnail: '/api/placeholder/200/150'
    },
    {
      id: 6,
      name: 'Tax_Document_2023.pdf',
      category: 'invoices',
      size: '456 KB',
      type: 'pdf',
      uploadedAt: '2024-01-01',
      status: 'expired',
      thumbnail: null
    }
  ]);

  const [uploadFiles, setUploadFiles] = useState([]);
  const [uploadCategory, setUploadCategory] = useState('');

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText size={24} className="text-red-500" />;
      case 'doc': return <FileText size={24} className="text-blue-500" />;
      case 'image': return <Image size={24} className="text-purple-500" />;
      case 'spreadsheet': return <FileSpreadsheet size={24} className="text-orange-500" />;
      default: return <File size={24} className="text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'verified':
        return (
          <span className="flex items-center gap-1 text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
            <CheckCircle size={12} /> Verified
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
            <Clock size={12} /> Pending
          </span>
        );
      case 'expired':
        return (
          <span className="flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            <AlertTriangle size={12} /> Expired
          </span>
        );
      default:
        return null;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: formatFileSize(file.size),
      type: getFileType(file.type),
      progress: 0,
      status: 'uploading'
    }));
    setUploadFiles([...uploadFiles, ...newFiles]);
    setShowUploadModal(true);
    
    newFiles.forEach(newFile => {
      simulateUpload(newFile.id);
    });
  };

  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadFiles(prev => 
          prev.map(f => f.id === fileId ? { ...f, progress: 100, status: 'complete' } : f)
        );
      } else {
        setUploadFiles(prev => 
          prev.map(f => f.id === fileId ? { ...f, progress } : f)
        );
      }
    }, 300);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileType = (mimeType) => {
    if (mimeType.includes('pdf')) return 'pdf';
    if (mimeType.includes('image')) return 'image';
    if (mimeType.includes('word') || mimeType.includes('document')) return 'doc';
    if (mimeType.includes('sheet') || mimeType.includes('excel')) return 'spreadsheet';
    return 'other';
  };

  const handleCompleteUpload = () => {
    const completedFiles = uploadFiles.filter(f => f.status === 'complete');
    const newDocs = completedFiles.map(f => ({
      id: Date.now() + Math.random(),
      name: f.name,
      category: uploadCategory || 'contracts',
      size: f.size,
      type: f.type,
      uploadedAt: new Date().toISOString().split('T')[0],
      status: 'pending',
      thumbnail: f.type === 'image' ? URL.createObjectURL(f.file) : null
    }));
    
    setDocuments([...newDocs, ...documents]);
    setUploadFiles([]);
    setUploadCategory('');
    setShowUploadModal(false);
  };

  const handleDeleteDocument = (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(d => d.id !== docId));
    }
  };

  const removeUploadFile = (fileId) => {
    setUploadFiles(uploadFiles.filter(f => f.id !== fileId));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 bg-gray-50">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Documents</h2>
            <p className="text-sm text-gray-500">Upload and manage your documents securely</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            <Upload size={16} />
            Upload Document
          </button>
        </div>
      </div>


      <div className="p-5">
        <div className="grid grid-cols-12 gap-5">
          {/* Categories Sidebar */}
          <div className="col-span-12 md:col-span-3">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-1">
              <p className="text-xs font-bold text-gray-500 uppercase px-3 py-2">Categories</p>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-gray-200 text-gray-800'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <cat.icon size={16} />
                    <span className="text-sm font-medium">{cat.label}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    selectedCategory === cat.id
                      ? 'bg-gray-300 text-gray-700'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          
          <div className="col-span-12 md:col-span-9">
            
            <div className="flex items-center justify-between mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>

           
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 mb-4 text-center transition-colors ${
                isDragging
                  ? 'border-gray-400 bg-gray-100'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Upload size={32} className={`mx-auto mb-3 ${isDragging ? 'text-gray-600' : 'text-gray-400'}`} />
              <p className="text-sm font-medium text-gray-700 mb-1">
                Drag and drop files here
              </p>
              <p className="text-xs text-gray-500 mb-3">or</p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Browse Files
              </button>
              <p className="text-xs text-gray-400 mt-3">
                Supported: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 20MB)
              </p>
            </div>

            {/* Documents */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group"
                  >
                   
                    <div className="h-32 bg-gray-50 flex items-center justify-center relative">
                      {doc.thumbnail ? (
                        <img src={doc.thumbnail} alt={doc.name} className="w-full h-full object-cover" />
                      ) : (
                        getFileIcon(doc.type)
                      )}
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                          <Eye size={16} className="text-gray-700" />
                        </button>

                        <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors ">
                          <Download size={16} className="text-gray-700 " />
                        </button>

                        <button 
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="p-2 bg-white rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Trash2 size={16} className="text-gray-700" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="p-3">
                      <p className="text-sm font-semibold text-gray-800 truncate mb-1">{doc.name}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{doc.size}</span>
                        {getStatusBadge(doc.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {getFileIcon(doc.type)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{doc.name}</p>
                        <p className="text-xs text-gray-500">
                          {doc.size} • Uploaded {doc.uploadedAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {getStatusBadge(doc.status)}
                      <div className="flex items-center gap-1">
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                          <Eye size={16} className="text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                          <Download size={16} className="text-gray-500" />
                        </button>
                        <button 
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} className="text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <Folder size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No documents found</h3>
                <p className="text-sm text-gray-500 ">
                  {searchQuery ? 'Try a different search term' : 'Upload your first document to get started'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-[500px] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Upload Documents</h3>
                <p className="text-sm text-gray-500">Add files to your document library</p>
              </div>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadFiles([]);
                }}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
                >
                  <option value="">Select a category</option>
                  {categories.filter(c => c.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* File Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                  isDragging ? 'border-gray-400 bg-gray-100' : 'border-gray-200'
                }`}
              >
                <Upload size={28} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">Drop files here or click to browse</p>
                <input
                  type="file"
                  id="modal-file-input"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <label
                  htmlFor="modal-file-input"
                  className="text-sm text-gray-700 font-semibold cursor-pointer hover:underline"
                >
                  Browse Files
                </label>
              </div>

              {/* Upload Queue */}
              {uploadFiles.length > 0 && (
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {uploadFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full transition-all ${
                                file.status === 'complete' ? 'bg-gray-700' : 'bg-gray-500'
                              }`}
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            {file.status === 'complete' ? (
                              <CheckCircle size={14} className="text-gray-700" />
                            ) : (
                              `${Math.round(file.progress)}%`
                            )}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeUploadFile(file.id)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <X size={14} className="text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadFiles([]);
                }}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteUpload}
                disabled={uploadFiles.length === 0 || uploadFiles.some(f => f.status !== 'complete')}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  uploadFiles.length > 0 && uploadFiles.every(f => f.status === 'complete')
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Complete Upload ({uploadFiles.filter(f => f.status === 'complete').length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsSection;