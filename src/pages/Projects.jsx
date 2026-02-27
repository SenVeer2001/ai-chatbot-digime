import { Plus, FolderPlus } from 'lucide-react';
import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useApp } from '../hooks/useApp';

const ProjectsPage = () => {
  const { projects, folders, addFolder, darkMode } = useApp();
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folderName, setFolderName] = useState('');

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      addFolder({ name: folderName, access: 'private' });
      setFolderName('');
      setShowFolderModal(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Projects</h1>
          <button
            onClick={() => setShowFolderModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            <FolderPlus size={20} />
            New Folder
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className={`rounded-xl border-2 border-dashed p-8 cursor-pointer transition-all ${darkMode ? 'border-gray-700 hover:bg-gray-800/50' : 'border-gray-300 hover:bg-gray-50'}`}>
            <div className="text-center">
              <FolderPlus size={40} className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Create folder</p>
            </div>
          </div>

          {folders.map(folder => (
            <div
              key={folder.id}
              className={`rounded-xl p-6 cursor-pointer transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-yellow-50 hover:bg-yellow-100'} border ${darkMode ? 'border-gray-700' : 'border-yellow-200'}`}
            >
              <FolderPlus size={32} className={`mb-3 ${darkMode ? 'text-gray-600' : 'text-yellow-600'}`} />
              <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{folder.name}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{folder.items} items</p>
            </div>
          ))}

          {projects.map(project => (
            <div
              key={project.id}
              className={`rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-xl'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className={`h-32 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              <div className="p-4">
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.name}</h4>
                <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.type}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${project.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showFolderModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`rounded-2xl max-w-md w-full ${darkMode ? 'bg-gray-900' : 'bg-white'} p-8`}>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Create Folder</h2>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Folder Name</label>
                  <input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder="My Projects"
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Access Level</label>
                  <select className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}>
                    <option>Private</option>
                    <option>Shared</option>
                    <option>Public</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleCreateFolder}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setShowFolderModal(false);
                      setFolderName('');
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

export default ProjectsPage;
