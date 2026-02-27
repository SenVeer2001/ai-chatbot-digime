import { useParams, useNavigate } from 'react-router-dom';
import { Copy, Check, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import ChatWindow from '../components/common/ChatWindow';
import { useChatbot } from '../hooks/useChatbot';
import { generateEmbedCode } from '../utils/mockData';

const ChatbotPreviewPage = ({ darkMode, onToggleDarkMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getChatbotById } = useChatbot();
  const [copied, setCopied] = useState(false);

  const chatbot = getChatbotById(parseInt(id));

  if (!chatbot) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
          <main className="flex-1 flex items-center justify-center">
            <Card className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Chatbot not found
              </h2>
              <Button onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </Button>
            </Card>
          </main>
        </div>
      </div>
    );
  }

  const embedCode = generateEmbedCode(chatbot.id);

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {chatbot.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Preview and deploy your chatbot
                </p>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Chat Preview */}
              <div className="lg:col-span-2">
                <Card className="h-96 lg:h-[600px] flex flex-col">
                  <ChatWindow chatbotConfig={chatbot} />
                </Card>
              </div>

              {/* Deployment Section */}
              <div className="space-y-6">
                {/* Info Card */}
                <Card>
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      Chatbot Info
                    </h2>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Status
                        </p>
                        <span className="inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          {chatbot.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Created
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                          {new Date(chatbot.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          ID
                        </p>
                        <p className="text-sm font-mono text-gray-900 dark:text-white mt-1">
                          {chatbot.id}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Deploy Button */}
                <Button
                  size="lg"
                  fullWidth
                  className="gap-2 justify-center"
                  onClick={() => alert('Deploy functionality would connect to your backend')}
                >
                  <Deploy size={20} />
                  Deploy
                </Button>

                {/* Embed Code */}
                <Card>
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      Embed Code
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Copy the code below and paste it into your website
                    </p>

                    <div className="relative bg-gray-900 dark:bg-gray-950 rounded-lg p-4 font-mono text-xs text-gray-300 overflow-x-auto max-h-48 overflow-y-auto">
                      <code className="text-green-400">
                        {embedCode}
                      </code>
                      <button
                        onClick={handleCopyEmbed}
                        className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <Check size={16} className="text-green-400" />
                        ) : (
                          <Copy size={16} className="text-gray-400" />
                        )}
                      </button>
                    </div>

                    <Button
                      fullWidth
                      onClick={handleCopyEmbed}
                      className="gap-2 justify-center"
                    >
                      <Copy size={18} />
                      {copied ? 'Copied!' : 'Copy Embed Code'}
                    </Button>
                  </div>
                </Card>

                {/* Settings Card */}
                <Card>
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      Configuration
                    </h2>
                    <div className="space-y-3 text-sm">
                      <div className="pb-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-400 font-semibold mb-1">
                          Prompt
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                          {chatbot.prompt}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 font-semibold mb-1">
                          Training Files
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          {(chatbot.files?.pdfs?.length || 0) + (chatbot.files?.images?.length || 0)} files
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Edit Button */}
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => alert('Edit functionality would open the create form')}
                >
                  Edit Chatbot
                </Button>
              </div>
            </div>

            {/* Response Preview */}
            <Card className="mt-8">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Study Material Preview
              </h2>
              <div className="max-h-48 overflow-y-auto">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm">
                  {chatbot.studyMaterial || 'No study material added'}
                </p>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatbotPreviewPage;
