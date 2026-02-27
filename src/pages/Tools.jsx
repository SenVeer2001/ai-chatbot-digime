import { Search } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useApp } from '../hooks/useApp';

const ToolsPage = () => {
  const { darkMode } = useApp();

  const tools = [
    { name: 'Video Podcast', description: 'Create professional podcasts' },
    { name: 'Batch Mode', description: 'Process multiple videos' },
    { name: 'Instant Highlights', description: 'Auto-generate highlights' },
    { name: 'Product Placement', description: 'Add products to videos' },
    { name: 'Image Generator', description: 'Create visuals with AI' },
    { name: 'Face Swap', description: 'Advanced face synthesis' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Tools</h1>

        <div className="relative">
          <Search size={20} className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search tools..."
            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-xl'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className={`w-12 h-12 rounded-lg mb-4 ${darkMode ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' : 'bg-gradient-to-br from-blue-100 to-purple-100'}`}></div>
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tool.name}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ToolsPage;
