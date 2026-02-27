import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import FileUpload from '../components/common/FileUpload';
import Loader from '../components/common/Loader';
import { useChatbot } from '../hooks/useChatbot';
import { ArrowRight } from 'lucide-react';

const CreateChatbotPage = ({ darkMode, onToggleDarkMode }) => {
  const navigate = useNavigate();
  const { createChatbot } = useChatbot();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    prompt: '',
    studyMaterial: '',
    pdfFiles: [],
    imageFiles: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePDFUpload = (files) => {
    setFormData(prev => ({
      ...prev,
      pdfFiles: files.filter(f => f.type === 'application/pdf'),
    }));
  };

  const handleImageUpload = (files) => {
    setFormData(prev => ({
      ...prev,
      imageFiles: files.filter(f => f.type.startsWith('image/')),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.prompt.trim()) {
      alert('Please fill in the chatbot name and prompt');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newChatbot = createChatbot({
        name: formData.name,
        description: formData.description,
        prompt: formData.prompt,
        studyMaterial: formData.studyMaterial,
        files: {
          pdfs: formData.pdfFiles.map(f => f.name),
          images: formData.imageFiles.map(f => f.name),
        },
      });

      setIsLoading(false);
      navigate(`/preview/${newChatbot.id}`);
    }, 2000);
  };

  if (isLoading) {
    return <Loader fullScreen text="Generating your chatbot..." />;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Create New Chatbot
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Configure your AI chatbot with custom prompts and knowledge base
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <Card>
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Basic Information
                  </h2>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Chatbot Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Customer Support Bot"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Brief description of your chatbot"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </Card>

              {/* Chatbot Configuration */}
              <Card>
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Configuration
                  </h2>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      System Prompt *
                    </label>
                    <textarea
                      name="prompt"
                      value={formData.prompt}
                      onChange={handleInputChange}
                      placeholder="Define how your chatbot should behave. e.g., 'You are a helpful customer service representative...'"
                      rows="6"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      This determines how your chatbot responds to users
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Study Material / Knowledge Base
                    </label>
                    <textarea
                      name="studyMaterial"
                      value={formData.studyMaterial}
                      onChange={handleInputChange}
                      placeholder="Paste your knowledge base, documentation, FAQ, or any relevant text information..."
                      rows="6"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      This helps your chatbot answer questions more accurately
                    </p>
                  </div>
                </div>
              </Card>

              {/* File Uploads */}
              <Card>
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Training Materials
                  </h2>

                  <FileUpload
                    label="Upload PDF Files"
                    accept=".pdf,application/pdf"
                    multiple
                    onFilesSelected={handlePDFUpload}
                  />

                  <FileUpload
                    label="Upload Images"
                    accept="image/*"
                    multiple
                    onFilesSelected={handleImageUpload}
                  />
                </div>
              </Card>

              {/* Submit */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  size="lg"
                  className="gap-2"
                >
                  Generate Chatbot
                  <ArrowRight size={20} />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateChatbotPage;
