import { Plus, Edit2, Trash2, Copy, Settings } from 'lucide-react';
import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useApp } from '../hooks/useApp';

const ContextsPage = () => {
  const { contexts, addContext, deleteContext, darkMode } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    opening: '',
    prompt: '',
    urls: [],
    persona: '',
  });

  const handleSave = () => {
    if (formData.name.trim()) {
      addContext(formData);
      setFormData({ name: '', opening: '', prompt: '', urls: [], persona: '' });
      setShowModal(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contexts</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            <Plus size={20} />
            New Context
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contexts.map(context => (
            <div
              key={context.id}
              className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:shadow-lg transition-all`}
            >
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{context.name}</h3>
              <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{context.prompt}</p>

              <div className={`text-xs mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                <div>Created: {context.createdAt.toLocaleDateString()}</div>
                <div>Updated: {context.updatedAt.toLocaleDateString()}</div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setFormData(context);
                    setEditingId(context.id);
                    setShowModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button className={`px-3 py-2 rounded-lg transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  <Copy size={16} />
                </button>
                <button
                  onClick={() => deleteContext(context.id)}
                  className={`px-3 py-2 rounded-lg transition-all text-red-500 ${darkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-50'}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`rounded-2xl max-w-2xl w-full max-h-96 overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-white'} p-8`}>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {editingId ? 'Edit Context' : 'Create New Context'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Context Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Customer Support"
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Opening Intro</label>
                  <input
                    type="text"
                    value={formData.opening}
                    onChange={(e) => setFormData({ ...formData, opening: e.target.value })}
                    placeholder="Hi, how can I help?"
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Prompt</label>
                  <textarea
                    value={formData.prompt}
                    onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                    placeholder="System prompt for the AI..."
                    className={`w-full px-4 py-2 rounded-lg border resize-none h-24 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                  ></textarea>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Persona</label>
                  <input
                    type="text"
                    value={formData.persona}
                    onChange={(e) => setFormData({ ...formData, persona: e.target.value })}
                    placeholder="e.g., Professional, Friendly"
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditingId(null);
                      setFormData({ name: '', opening: '', prompt: '', urls: [], persona: '' });
                    }}
                    className={`px-6 py-2 rounded-lg transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ContextsPage;
