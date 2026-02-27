import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useChatbot } from '../hooks/useChatbot';
import { useState } from 'react';

const DashboardPage = ({ darkMode, onToggleDarkMode }) => {
  const navigate = useNavigate();
  const { chatbots, setCurrentChatbot } = useChatbot();
  const [filter, setFilter] = useState('all');

  const filteredChatbots = filter === 'all'
    ? chatbots
    : chatbots.filter(c => c.status === filter);

  const handleChatbotClick = (chatbot) => {
    setCurrentChatbot(chatbot);
    navigate(`/preview/${chatbot.id}`);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  My Chatbots
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Create and manage your AI chatbots
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => navigate('/create')}
                className="gap-2 justify-center"
              >
                <Plus size={20} />
                Create New Chatbot
              </Button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-8 flex-wrap">
              {['all', 'active', 'inactive'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-colors capitalize
                    ${filter === tab
                      ? 'bg-gradient-primary text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  {tab === 'all' ? 'All' : tab === 'active' ? 'Active' : 'Inactive'}
                </button>
              ))}
            </div>

            {/* Chatbots Grid */}
            {filteredChatbots.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChatbots.map(chatbot => (
                  <Card
                    key={chatbot.id}
                    hover
                    onClick={() => handleChatbotClick(chatbot)}
                    className="flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                          {chatbot.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {chatbot.description}
                        </p>
                      </div>
                      <span
                        className={`
                          px-3 py-1 rounded-full text-xs font-semibold
                          ${chatbot.status === 'active'
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                          }
                        `}
                      >
                        {chatbot.status}
                      </span>
                    </div>

                    <div className="flex-1" />

                    <div className="text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
                      Created {new Date(chatbot.createdAt).toLocaleDateString()}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="mb-4">
                  <Plus size={48} className="mx-auto text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No chatbots yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Create your first AI chatbot to get started
                </p>
                <Button onClick={() => navigate('/create')}>
                  Create Chatbot
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
