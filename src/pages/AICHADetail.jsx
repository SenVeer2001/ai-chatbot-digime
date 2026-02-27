import { ArrowLeft, Plus, Save, LogOut, User, Bot, Upload, FileText, Link2, MoreVertical, X, Send, Calendar, Clock, MessageCircle, Copy, AlertCircle, Check, Code, Globe, GlobeOff } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const AICHADetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { contexts, knowledgeBase, addKnowledge, user } = useApp();
  const botFromState = location.state?.bot;

  const [botName, setBotName] = useState(botFromState?.name || `AICHA ${id}`);
  const [botIconImage, setBotIconImage] = useState(botFromState?.image || null);
  const [selectedKnowledgeIds, setSelectedKnowledgeIds] = useState(botFromState?.knowledge || []);
  const [saveStatus, setSaveStatus] = useState('');
  const [activeTab, setActiveTab] = useState('general');

  const [roleText, setRoleText] = useState('');
  const [personaText, setPersonaText] = useState('Helpful, professional AI assistant');
  const [guardRailText, setGuardRailText] = useState('');

  const [isPublished, setIsPublished] = useState(botFromState?.status === 'active');
  const [copied, setCopied] = useState(false);

  // Modal states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [kbUploadName, setKbUploadName] = useState('');
  const [kbTextName, setKbTextName] = useState('');
  const [kbTextContent, setKbTextContent] = useState('');
  const [kbUrlName, setKbUrlName] = useState('');
  const [kbUrlValue, setKbUrlValue] = useState('');

  // Image states
  const [images, setImages] = useState([]);

  // Preview/Chat states
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSave = () => {
    setSaveStatus('Mappings saved for this session.');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const handleKbFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file || !kbUploadName.trim()) return;
    const fileType = file.name.endsWith('.docx') || file.name.endsWith('.doc') ? 'docx' : 'pdf';
    const created = addKnowledge({
      name: kbUploadName.trim(),
      type: fileType,
      size: `${Math.round(file.size / 1024)} KB`,
    });
    setSelectedKnowledgeIds((prev) => [...prev, created.id]);
    setShowUploadModal(false);
    setKbUploadName('');
  };

  const handleKbTextAdd = () => {
    if (!kbTextName.trim() || !kbTextContent.trim()) return;
    const created = addKnowledge({
      name: kbTextName.trim(),
      type: 'text',
      size: '—',
      content: kbTextContent.trim(),
    });
    setSelectedKnowledgeIds((prev) => [...prev, created.id]);
    setShowTextModal(false);
    setKbTextName('');
    setKbTextContent('');
  };

  const handleKbUrlAdd = () => {
    if (!kbUrlName.trim() || !kbUrlValue.trim()) return;
    const created = addKnowledge({
      name: kbUrlName.trim(),
      type: 'url',
      size: '—',
      source: kbUrlValue.trim(),
    });
    setSelectedKnowledgeIds((prev) => [...prev, created.id]);
    setShowUrlModal(false);
    setKbUrlName('');
    setKbUrlValue('');
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImages((prev) => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              name: file.name,
              src: e.target?.result,
              size: `${Math.round(file.size / 1024)} KB`,
            },
          ]);
        };
        reader.readAsDataURL(file);
      }
    });
    event.target.value = '';
  };

  const handleRemoveImage = (imageId) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleBotIconUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setBotIconImage(e.target?.result);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: chatInput,
      sender: 'user'
    };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: "I'm processing your request. This is a preview of how your chatbot will respond to users.",
        sender: 'bot'
      };
      setChatMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      let date;
      if (typeof dateString === 'string' && dateString.includes('-')) {
        const parts = dateString.split('-');
        date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      } else {
        date = new Date(dateString);
      }
      if (isNaN(date.getTime())) return 'N/A';
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  const handlePublishToggle = (publish) => {
    setIsPublished(publish);
    // Add your API call here to update the status
    // updateBotStatus(botId, publish ? 'active' : 'inactive');
  };

  const handleCopyWidget = () => {
    const widgetCode = `<script src="https://yoursite.com/widget.js" data-bot-id="${botFromState?.id}"></script>`;
    navigator.clipboard.writeText(widgetCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };



  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img src="/webkype-logo11.png" alt="Webkype" className="h-10 w-auto" />
            </button>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-50">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
                <User size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-600">{user?.email || 'user@example.com'}</p>
              </div>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem('auth');
                navigate('/');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-gray-600 hover:bg-gray-100"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="space-y-6 pb-10">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/aicha')}
                className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{botName}</h1>
                <p className="text-sm text-gray-600">Manage context and knowledge sources for this chatbot.</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium"
            >
              <Save size={18} />
              Save 
            </button>
          </div>

          {saveStatus && (
            <div className="px-4 py-3 rounded-lg bg-blue-50 text-blue-700">
              {saveStatus}
            </div>
          )}

          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-gray-200 overflow-x-auto">
            {[
              { id: 'general', label: 'General' },
              { id: 'persona', label: 'Persona' },
              { id: 'guardrail', label: 'Guard Rail' },
              { id: 'knowledgebase', label: 'Knowledge Base' },
              { id: 'images', label: 'Images' },
              { id: 'tools', label: 'Tools' },
              { id: 'preview', label: 'Preview' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="rounded-2xl p-6 border bg-white border-gray-200">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">General Settings</h2>
                <p className="text-sm text-gray-600">Configure basic information about your chatbot.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Left - Settings */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Chatbot Name</label>
                    <input
                      type="text"
                      value={botName}
                      onChange={(e) => setBotName(e.target.value)}
                      placeholder="Enter chatbot name"
                      className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Chatbot Icon</label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden bg-gray-100 border border-gray-300">
                          {botIconImage ? (
                            <img src={botIconImage} alt="Bot Icon" className="w-full h-full object-cover" />
                          ) : (
                            <Bot size={32} className="text-blue-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">{botIconImage ? 'Custom Icon' : 'Default Bot Icon'}</p>
                          <p className="text-xs text-gray-500">Represents your chatbot</p>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBotIconUpload}
                        className="w-full px-3 py-2 rounded-lg border bg-white border-gray-300 text-gray-900"
                      />
                      {botIconImage && (
                        <button
                          onClick={() => setBotIconImage(null)}
                          className="w-full px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-900 hover:bg-gray-200"
                        >
                          Remove Icon
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right - Bot Info */}

              </div>
            </div>
          )}

          {/* Persona Tab */}
          {activeTab === 'persona' && (
            <div className="rounded-2xl p-6 border bg-white border-gray-200">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">Persona</h2>
                <p className="text-sm text-gray-600">Define the personality and behavior of your AI assistant.</p>
              </div>
              <div className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Role</label>
                  <input
                    type="text"
                    value={roleText}
                    onChange={(e) => setRoleText(e.target.value)}
                    placeholder="e.g., Customer Support Agent, Sales Assistant..."
                    className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Persona Description</label>
                  <textarea
                    value={personaText}
                    onChange={(e) => setPersonaText(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border bg-white border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the personality traits, communication style..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Guard Rail Tab */}
          {activeTab === 'guardrail' && (
            <div className="rounded-2xl p-6 border bg-white border-gray-200">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">Guard Rails</h2>
                <p className="text-sm text-gray-600">Set boundaries and safety guidelines for your AI assistant.</p>
              </div>
              <div className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Safety Guidelines</label>
                  <textarea
                    value={guardRailText}
                    onChange={(e) => setGuardRailText(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border bg-white border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Define topics to avoid, response limitations, and safety protocols..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Knowledge Base Tab */}
          {activeTab === 'knowledgebase' && (
            <div className="rounded-2xl p-8 border bg-white border-gray-200">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2 text-gray-900">Knowledge Base</h2>
                <p className="text-sm text-gray-600">Give your chatbot contextual knowledge by adding documents and other data sources</p>
              </div>

              {/* Add Data Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-6 text-gray-900">Add Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div
                    onClick={() => setShowUploadModal(true)}
                    className="rounded-lg border-2 p-6 cursor-pointer transition-all hover:border-blue-500 border-gray-200 bg-gray-50 hover:bg-blue-50"
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100">
                        <Upload size={24} className="text-blue-500" />
                      </div>
                      <h4 className="font-semibold text-gray-900">Upload data</h4>
                      <p className="text-sm text-gray-600">PDFs, Docs, Excels, PPTs or Markdown</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setShowTextModal(true)}
                    className="rounded-lg border-2 p-6 cursor-pointer transition-all hover:border-blue-500 border-gray-200 bg-gray-50 hover:bg-blue-50"
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100">
                        <FileText size={24} className="text-blue-500" />
                      </div>
                      <h4 className="font-semibold text-gray-900">Create text source</h4>
                      <p className="text-sm text-gray-600">Type or paste plain text</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setShowUrlModal(true)}
                    className="rounded-lg border-2 p-6 cursor-pointer transition-all hover:border-blue-500 border-gray-200 bg-gray-50 hover:bg-blue-50"
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100">
                        <Link2 size={24} className="text-blue-500" />
                      </div>
                      <h4 className="font-semibold text-gray-900">Add link</h4>
                      <p className="text-sm text-gray-600">Link to a live data source</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* All Data Sources */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-gray-900">All Data Sources</h3>
                <div className="space-y-3">
                  {knowledgeBase.length > 0 ? (
                    knowledgeBase.map((source) => (
                      <div
                        key={source.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          {source.type === 'pdf' && <FileText size={20} className="text-red-500" />}
                          {source.type === 'url' && <Link2 size={20} className="text-blue-500" />}
                          {source.type === 'text' && <FileText size={20} className="text-gray-500" />}
                          <div>
                            <p className="font-medium text-gray-900">{source.name}</p>
                            <p className="text-xs text-gray-600">{source.type.toUpperCase()} • {source.size}</p>
                          </div>
                        </div>
                        <button className="p-2 rounded-lg transition-all hover:bg-gray-200 text-gray-600">
                          <MoreVertical size={20} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                      <p className="text-sm text-gray-600">No data sources added yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Images Tab */}
          {activeTab === 'images' && (
            <div className="rounded-2xl p-6 border bg-white border-gray-200">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">Images & Media</h2>
                <p className="text-sm text-gray-600">Add avatars and visual assets for your chatbot.</p>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700">Upload Images</label>
                  <div className="rounded-lg border-2 border-dashed p-8 text-center cursor-pointer transition-all hover:border-blue-500 border-gray-300 bg-gray-50 hover:bg-blue-50">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload size={32} className="mx-auto mb-3 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900">Drag and drop images here or click to upload</p>
                      <p className="text-xs text-gray-600">Supported formats: PNG, JPG, GIF, WebP</p>
                    </label>
                  </div>
                </div>

                {images.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-4 text-gray-700">Uploaded Images ({images.length})</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {images.map((image) => (
                        <div key={image.id} className="rounded-lg overflow-hidden border border-gray-200">
                          <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                            <img src={image.src} alt={image.name} className="w-full h-full object-cover" />
                            <button
                              onClick={() => handleRemoveImage(image.id)}
                              className="absolute top-2 right-2 p-1 rounded-full transition-all bg-red-100 text-red-600 hover:bg-red-200"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <div className="p-3 bg-gray-50">
                            <p className="text-xs font-medium truncate text-gray-900">{image.name}</p>
                            <p className="text-xs text-gray-600">{image.size}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {images.length === 0 && (
                  <div className="text-center py-8 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                    <p className="text-sm text-gray-600">No images uploaded yet</p>
                  </div>
                )}
              </div>
            </div>
          )}



          {/* Tools Tab */}
          {activeTab === 'tools' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="rounded-2xl p-6 border bg-white border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Connect LMS Platforms</h2>
                <p className="text-sm mt-2 text-gray-600">Deploy AICHA across learning management systems.</p>

                <div className="mt-6 space-y-4">
                  {[
                    { name: 'Canvas LMS', description: 'Publish AICHA in Canvas modules and assignments.' },
                    { name: 'Moodle', description: 'Enable AICHA inside Moodle courses via LTI integration.' },
                  ].map((tool) => (
                    <div key={tool.name} className="p-4 rounded-xl border bg-gray-50 border-gray-200 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                        <p className="text-sm mt-1 text-gray-600">{tool.description}</p>
                      </div>
                      <button className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap bg-blue-100 text-blue-700 hover:bg-blue-200">
                        Connect
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-6 border bg-white border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Integration Checklist</h2>
                <ul className="mt-4 space-y-3 text-sm text-gray-700">
                  <li>1. Click Connect to generate your LTI credentials.</li>
                  <li>2. Copy the launch URL, client ID, and secret.</li>
                  <li>3. Paste them into your Canvas or Moodle admin panel.</li>
                  <li>4. Assign the tool to a course module.</li>
                  <li>5. Students can now access AICHA in their courses!</li>
                </ul>
                <div className="mt-5 p-4 rounded-lg bg-gray-100 text-gray-700">
                  LTI 1.3 support is ready. More integrations coming soon.
                </div>
              </div>
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="rounded-2xl border  border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-white">
                <h2 className="text-xl font-semibold text-gray-900">Chatbot Preview</h2>
                <p className="text-sm mt-1 text-gray-600">Test your chatbot interface and interactions</p>
              </div>

              <div className="flex items-center justify-between gap-6 p-4">
                {/* Chat Window */}
                <div className="rounded-xl border w-full bg-gray-50 border-gray-200 overflow-hidden flex flex-col" style={{ height: '500px' }}>
                  {/* Chat Header */}
                  <div className="p-4 border-b bg-white border-gray-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      {botIconImage || botFromState?.image ? (
                        <img src={botIconImage || botFromState?.image} alt={botName} className="w-full h-full object-cover" />
                      ) : (
                        <Bot size={24} className="text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{botName}</h3>
                      <p className="text-xs text-gray-600">Online</p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((message) => (
                      <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                          }`}>
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 rounded-xl bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600"
                      >
                        <Send size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preview Settings */}
                <div className="relative p-6 rounded-2xl border bg-white border-gray-200 shadow-lg">
                  {/* Circular Image at Top - Positioned to overflow */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      {/* Outer ring with gradient */}
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1">
                        {/* White ring */}
                        <div className="w-full h-full rounded-full bg-white p-2">
                          {/* Image container */}
                          <div className="w-full h-full rounded-full overflow-hidden shadow-xl">
                            {botIconImage || botFromState?.image ? (
                              <img
                                src={botIconImage || botFromState?.image}
                                alt={botName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                <Bot size={48} className="text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Status indicator badge */}
                      <div className="absolute -bottom-1 -right-1">
                        <div className={`w-8 h-8 rounded-full border-4 border-white flex items-center justify-center ${botFromState?.status === 'active' ? 'bg-green-500' : 'bg-amber-500'
                          }`}>
                          <div className={`w-2 h-2 rounded-full bg-white ${botFromState?.status === 'active' ? 'animate-pulse' : ''
                            }`}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content - with top padding for the image */}
                  <div className="pt-20">
                    {/* Title */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{botName}</h3>
                      <p className="text-sm text-gray-500">Chatbot Assistant</p>
                    </div>

                    {/* Info Grid */}
                    <div className="space-y-4">
                      {/* Created Date */}
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                          <Calendar size={18} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Created</p>
                          <p className="text-sm font-medium text-gray-900">{formatDate(botFromState?.createdAt)}</p>
                        </div>
                      </div>

                      {/* Last Updated */}
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                          <Clock size={18} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Last Updated</p>
                          <p className="text-sm font-medium text-gray-900">{formatDate(botFromState?.updatedAt)}</p>
                        </div>
                      </div>

                      {/* Conversations */}
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <MessageCircle size={18} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Conversations</p>
                          <p className="text-sm font-medium text-gray-900">{botFromState?.conversations || 0} total</p>
                        </div>
                      </div>

                      {/* Status Badge */}
                   <div className="flex items-center justify-between gap-4 pt-4 min-w-[350px]">

  {/* Toggle Switch */}
  <div className="flex items-center gap-3">
    <button
      onClick={() => setIsPublished(!isPublished)}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        isPublished ? 'bg-green-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
          isPublished ? 'left-5' : 'left-0.5'
        }`}
      />
    </button>
    <span className={`text-sm font-medium ${isPublished ? 'text-green-600' : 'text-red-600'}`}>
      {isPublished ? 'Published' : 'Unpublished'}
    </span>
  </div>

  {/* Copy Widget Button */}
  <button
    onClick={handleCopyWidget}
    className="py-2 px-4 text-sm font-medium rounded-lg border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 flex items-center gap-2"
  >
    {copied ? <Check size={16} /> : <Copy size={16} />}
    {copied ? 'Copied!' : 'Copy Widget'}
  </button>

</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload File</h3>
              <button onClick={() => setShowUploadModal(false)} className="p-1 rounded hover:bg-gray-200">
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">File Name</label>
                <input
                  type="text"
                  value={kbUploadName}
                  onChange={(e) => setKbUploadName(e.target.value)}
                  placeholder="Enter a name for this file"
                  className="w-full px-3 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Select File</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.md"
                  onChange={handleKbFileUpload}
                  className="w-full px-3 py-2 rounded-lg border bg-white border-gray-300 text-gray-900"
                />
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Text Modal */}
      {showTextModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Text Content</h3>
              <button onClick={() => setShowTextModal(false)} className="p-1 rounded hover:bg-gray-200">
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Source Name</label>
                <input
                  type="text"
                  value={kbTextName}
                  onChange={(e) => setKbTextName(e.target.value)}
                  placeholder="Enter a name"
                  className="w-full px-3 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Content</label>
                <textarea
                  value={kbTextContent}
                  onChange={(e) => setKbTextContent(e.target.value)}
                  placeholder="Type or paste your text..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                />
              </div>
              <div className="flex gap-2">
                <button onClick={handleKbTextAdd} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                  Add
                </button>
                <button onClick={() => { setShowTextModal(false); setKbTextName(''); setKbTextContent(''); }} className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* URL Modal */}
      {showUrlModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Link</h3>
              <button onClick={() => setShowUrlModal(false)} className="p-1 rounded hover:bg-gray-200">
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Link Name</label>
                <input
                  type="text"
                  value={kbUrlName}
                  onChange={(e) => setKbUrlName(e.target.value)}
                  placeholder="Enter a name"
                  className="w-full px-3 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">URL</label>
                <input
                  type="url"
                  value={kbUrlValue}
                  onChange={(e) => setKbUrlValue(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                />
              </div>
              <div className="flex gap-2">
                <button onClick={handleKbUrlAdd} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                  Add
                </button>
                <button onClick={() => { setShowUrlModal(false); setKbUrlName(''); setKbUrlValue(''); }} className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AICHADetailPage;