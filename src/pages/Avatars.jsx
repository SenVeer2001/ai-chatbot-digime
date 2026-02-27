import { Plus, Play, Settings, Trash2 } from 'lucide-react';
import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useApp } from '../hooks/useApp';

const AvatarsPage = () => {
  const { avatars, darkMode } = useApp();
  const [tab, setTab] = useState('my');

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Avatars</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
            <Plus size={20} />
            Create Avatar
          </button>
        </div>

        <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
          {['my', 'public'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-3 font-medium transition-all border-b-2 ${
                tab === t
                  ? 'border-blue-500 text-blue-500'
                  : `border-transparent ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`
              }`}
            >
              {t === 'my' ? 'My Avatars' : 'Public Avatars'}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {avatars.map(avatar => (
            <div
              key={avatar.id}
              className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:shadow-lg transition-all`}
            >
              <div className={`h-48 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full"></div>
              </div>

              <div className="p-6">
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{avatar.name}</h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Voice ID: {avatar.voiceId}</p>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                    <Play size={16} />
                    Preview
                  </button>
                  <button className={`px-3 py-2 rounded-lg transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                    <Settings size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className={`rounded-2xl border-2 border-dashed ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-50'} flex items-center justify-center min-h-96 cursor-pointer hover:bg-opacity-70 transition-all`}>
            <div className="text-center">
              <Plus size={40} className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Create new avatar</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AvatarsPage;
