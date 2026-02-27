import { Plus, Upload, FileText, Trash2, MoreVertical, Search, File } from 'lucide-react';
import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useApp } from '../hooks/useApp';
import { mockApi } from '../services/mockApi';

const KnowledgeBasePage = () => {
  const { knowledgeBase, addKnowledge, deleteKnowledge, darkMode } = useApp();
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    for (let file of files) {
      try {
        const result = await mockApi.uploadFile(file);
        addKnowledge(result);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
    setUploading(false);
  };

  const filteredKnowledge = knowledgeBase.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Knowledge Base</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <label className={`rounded-xl border-2 border-dashed p-6 cursor-pointer transition-all ${darkMode ? 'border-gray-700 hover:bg-gray-800/50' : 'border-gray-300 hover:bg-gray-50'}`}>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
              accept=".pdf,.doc,.docx,.xlsx,.pptx,.md"
            />
            <div className="text-center">
              <Upload size={32} className={`mx-auto mb-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Upload Files</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>PDF, DOCX, XLSX, PPTX</p>
            </div>
          </label>

          <div className={`rounded-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} cursor-pointer hover:shadow-lg transition-all`}>
            <div className="text-center">
              <FileText size={32} className={`mx-auto mb-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Create Text</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Paste or type</p>
            </div>
          </div>

          <div className={`rounded-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} cursor-pointer hover:shadow-lg transition-all`}>
            <div className="text-center">
              <Plus size={32} className={`mx-auto mb-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add URL</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Web scraping</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search size={20} className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search knowledge base..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
            />
          </div>
        </div>

        <div className={`rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} overflow-hidden`}>
          {filteredKnowledge.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredKnowledge.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all">
                  <div className="flex items-center gap-3 flex-1">
                    <File size={24} className={darkMode ? 'text-gray-600' : 'text-gray-400'} />
                    <div className="flex-1">
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.size} • {item.uploadedAt.toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                      <MoreVertical size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                    </button>
                    <button
                      onClick={() => deleteKnowledge(item.id)}
                      className={`p-2 rounded-lg text-red-500 ${darkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-50'}`}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>No knowledge base items yet</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default KnowledgeBasePage;
