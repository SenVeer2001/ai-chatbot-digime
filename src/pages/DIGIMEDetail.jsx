import { ArrowLeft, Plus, Save, LogOut, User, Bot, Upload, FileText, Link2, MoreVertical, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import Header from '../components/layout/Header';

const DIGIMEDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, contexts, knowledgeBase, addContext, addKnowledge, user } = useApp();
  const avatarFromState = location.state?.avatar;

  const [avatarName] = useState(avatarFromState?.name || `DIGIME ${id}`);
  const [selectedKnowledgeIds, setSelectedKnowledgeIds] = useState(avatarFromState?.knowledge || []);
  const [saveStatus, setSaveStatus] = useState('');
  const [activeTab, setActiveTab] = useState('persona');

  const [newKnowledgeName, setNewKnowledgeName] = useState('');
  const [newKnowledgeType, setNewKnowledgeType] = useState('pdf');
  const [newKnowledgeUrl, setNewKnowledgeUrl] = useState('');
  const [newKnowledgeText, setNewKnowledgeText] = useState('');
  const [uploadingName, setUploadingName] = useState('');
  const [roleText, setRoleText] = useState('');
  const [personaText, setPersonaText] = useState('Helpful, professional AI avatar');
  const [guardRailText, setGuardRailText] = useState('');
  
  // Modal states for Knowledge Base
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

  const mappedContexts = useMemo(
    () => contexts.map(context => ({
      ...context,
      label: context.name,
      description: context.opening || context.intro || ''
    })),
    [contexts]
  );

  const handleToggleKnowledge = (knowledgeId) => {
    setSelectedKnowledgeIds((prev) =>
      prev.includes(knowledgeId) ? prev.filter(id => id !== knowledgeId) : [...prev, knowledgeId]
    );
  };

  const handleAddKnowledge = () => {
    if (!newKnowledgeName.trim()) return;
    const created = addKnowledge({
      name: newKnowledgeName.trim(),
      type: newKnowledgeType,
      size: '—',
      source: newKnowledgeType === 'url' ? newKnowledgeUrl.trim() : undefined,
      content: newKnowledgeType === 'text' ? newKnowledgeText.trim() : undefined,
    });
    setSelectedKnowledgeIds((prev) => [...prev, created.id]);
    setNewKnowledgeName('');
    setNewKnowledgeType('pdf');
    setNewKnowledgeUrl('');
    setNewKnowledgeText('');
  };

  const handleUploadPdf = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const fileType = newKnowledgeType === 'docx' ? 'docx' : 'pdf';
    const created = addKnowledge({
      name: file.name,
      type: fileType,
      size: `${Math.round(file.size / 1024)} KB`,
    });
    setSelectedKnowledgeIds((prev) => [...prev, created.id]);
    setUploadingName(file.name);
    event.target.value = '';
  };

  const handleSave = () => {
    setSaveStatus('Mappings saved for this session.');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  // Knowledge Base Modal Handlers
  const handleKbFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file || !kbUploadName.trim()) return;
    
    const created = addKnowledge({
      name: kbUploadName.trim(),
      type: file.type.includes('pdf') ? 'pdf' : 'docx',
      size: `${Math.round(file.size / 1024)} KB`,
    });
    setSelectedKnowledgeIds((prev) => [...prev, created.id]);
    setKbUploadName('');
    setShowUploadModal(false);
    event.target.value = '';
  };

  const handleKbTextAdd = () => {
    if (!kbTextName.trim() || !kbTextContent.trim()) return;
    
    const created = addKnowledge({
      name: kbTextName.trim(),
      type: 'text',
      size: `${kbTextContent.length} chars`,
      content: kbTextContent.trim(),
    });
    setSelectedKnowledgeIds((prev) => [...prev, created.id]);
    setKbTextName('');
    setKbTextContent('');
    setShowTextModal(false);
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
    setKbUrlName('');
    setKbUrlValue('');
    setShowUrlModal(false);
  };

  // Image Upload Handler
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: Date.now() + Math.random(),
          name: file.name,
          src: e.target?.result,
          size: `${Math.round(file.size / 1024)} KB`,
        };
        setImages((prev) => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
    
    event.target.value = '';
  };

  const handleRemoveImage = (imageId) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
    <Header user={()=>{}} title={"AICHA™"}/>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-12 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/digime')}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{avatarName}</h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage persona, knowledge, and tools for this avatar.</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium"
          >
            <Save size={18} />
            Save Mapping
          </button>
        </div>

        {saveStatus && (
          <div className={`px-4 py-3 rounded-lg ${darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>
            {saveStatus}
          </div>
        )}

        <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800">
          {[
            { id: 'persona', label: 'Persona' },
            { id: 'guardrail', label: 'Guard Rail' },
            { id: 'knowledgebase', label: 'Knowledge Base' },
            { id: 'images', label: 'Images' },
            { id: 'tools', label: 'Tools' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-500'
                  : `border-transparent ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'persona' && (
          <div className="w-full">
            <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="mb-6">
                <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Persona Settings</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Define the personality and behavior of your DIGIME avatar
                </p>
              </div>

              <div className="space-y-6">
                {/* Role */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Role
                  </label>
                  <input
                    type="text"
                    value={roleText}
                    onChange={(e) => setRoleText(e.target.value)}
                    placeholder="e.g., Virtual Assistant, Customer Support Agent"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>

                {/* Persona Description */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Persona Description
                  </label>
                  <textarea
                    value={personaText}
                    onChange={(e) => setPersonaText(e.target.value)}
                    rows={6}
                    placeholder="Describe the personality, tone, and characteristics..."
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guardrail' && (
          <div className="w-full">
            <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="mb-6">
                <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Guard Rails</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Set boundaries and safety guidelines for your avatar
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Safety Guidelines
                  </label>
                  <textarea
                    value={guardRailText}
                    onChange={(e) => setGuardRailText(e.target.value)}
                    rows={8}
                    placeholder="Define what the avatar should and shouldn't do, topics to avoid, ethical guidelines..."
                    className={`w-full px-4 py-2 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'knowledgebase' && (
          <div className="w-full space-y-6">
            {/* Add Data Section */}
            <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add Data</h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                {/* Upload Data Card */}
                <button
                  onClick={() => setShowUploadModal(true)}
                  className={`p-6 rounded-xl border-2 border-dashed transition-all text-left ${
                    darkMode
                      ? 'border-gray-700 hover:border-blue-500 hover:bg-gray-800'
                      : 'border-gray-300 hover:border-blue-500 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
                    <Upload size={24} className="text-blue-500" />
                  </div>
                  <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Upload data</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    PDF, DOC, or other files
                  </p>
                </button>

                {/* Create Text Source Card */}
                <button
                  onClick={() => setShowTextModal(true)}
                  className={`p-6 rounded-xl border-2 border-dashed transition-all text-left ${
                    darkMode
                      ? 'border-gray-700 hover:border-blue-500 hover:bg-gray-800'
                      : 'border-gray-300 hover:border-blue-500 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-3">
                    <FileText size={24} className="text-green-500" />
                  </div>
                  <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Create text source</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Add custom text content
                  </p>
                </button>

                {/* Add Link Card */}
                <button
                  onClick={() => setShowUrlModal(true)}
                  className={`p-6 rounded-xl border-2 border-dashed transition-all text-left ${
                    darkMode
                      ? 'border-gray-700 hover:border-blue-500 hover:bg-gray-800'
                      : 'border-gray-300 hover:border-blue-500 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
                    <Link2 size={24} className="text-purple-500" />
                  </div>
                  <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add link</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Import from URL
                  </p>
                </button>
              </div>
            </div>

            {/* All Data Sources */}
            <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>All Data Sources</h2>
              
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search sources..."
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div className="space-y-2">
                {knowledgeBase.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-gray-50 hover:bg-gray-100'
                    } transition-all`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                        {item.type === 'pdf' && <FileText size={20} className="text-red-500" />}
                        {item.type === 'url' && <Link2 size={20} className="text-blue-500" />}
                        {item.type === 'text' && <FileText size={20} className="text-green-500" />}
                      </div>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.type.toUpperCase()} • {item.size}
                        </p>
                      </div>
                    </div>
                    <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                      <MoreVertical size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                    </button>
                  </div>
                ))}
                {knowledgeBase.length === 0 && (
                  <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    No data sources yet. Add your first source above.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="w-full">
            <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="mb-6">
                <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Image Gallery</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Upload and manage images for your avatar
                </p>
              </div>

              {/* Upload Area */}
              <label className={`block mb-6 p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                darkMode
                  ? 'border-gray-700 hover:border-blue-500 hover:bg-gray-800'
                  : 'border-gray-300 hover:border-blue-500 hover:bg-gray-50'
              }`}>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="text-center">
                  <Upload size={48} className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                  <p className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Click to upload images
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    PNG, JPG, GIF, WebP (max 5MB each)
                  </p>
                </div>
              </label>

              {/* Image Grid */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className={`relative group rounded-lg overflow-hidden border ${
                        darkMode ? 'border-gray-700' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={image.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => handleRemoveImage(image.id)}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <div className={`p-2 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <p className={`text-xs truncate ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {image.name}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {image.size}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {images.length === 0 && (
                <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  No images uploaded yet
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="w-full space-y-6">
            <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Connect LMS Platforms</h2>
              <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Integrate your DIGIME avatar with learning management systems
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className={`p-5 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Canvas LMS</h3>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Embed DIGIME in Canvas courses and modules
                  </p>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium">
                    Connect Canvas
                  </button>
                </div>

                <div className={`p-5 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Moodle</h3>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Deploy DIGIME in Moodle courses via LTI
                  </p>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium">
                    Connect Moodle
                  </button>
                </div>
              </div>

              <div className={`rounded-xl p-5 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Integration Checklist</h3>
                <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Obtain LTI credentials from your LMS admin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Configure launch URL and consumer key</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Test integration in a sandbox course</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Deploy to production courses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Monitor usage and student engagement</span>
                  </li>
                </ul>
              </div>

              <div className={`mt-5 p-4 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                LTI 1.3 support is ready. More integrations coming soon.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upload File Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl max-w-lg w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Upload File</h3>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  File Name
                </label>
                <input
                  type="text"
                  value={kbUploadName}
                  onChange={(e) => setKbUploadName(e.target.value)}
                  placeholder="Enter a name for this file"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Select File
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleKbFileUpload}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <button
                onClick={() => setShowUploadModal(false)}
                className={`w-full px-4 py-2 rounded-lg ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                } transition-all`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Text Modal */}
      {showTextModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl max-w-lg w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add Text Source</h3>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Source Name
                </label>
                <input
                  type="text"
                  value={kbTextName}
                  onChange={(e) => setKbTextName(e.target.value)}
                  placeholder="Enter a name"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Content
                </label>
                <textarea
                  value={kbTextContent}
                  onChange={(e) => setKbTextContent(e.target.value)}
                  rows={6}
                  placeholder="Paste or type your content here..."
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleKbTextAdd}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowTextModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg ${
                    darkMode
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  } transition-all`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add URL Modal */}
      {showUrlModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl max-w-lg w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add URL</h3>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Link Name
                </label>
                <input
                  type="text"
                  value={kbUrlName}
                  onChange={(e) => setKbUrlName(e.target.value)}
                  placeholder="Enter a name"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  URL
                </label>
                <input
                  type="url"
                  value={kbUrlValue}
                  onChange={(e) => setKbUrlValue(e.target.value)}
                  placeholder="https://example.com"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleKbUrlAdd}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowUrlModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg ${
                    darkMode
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  } transition-all`}
                >
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

export default DIGIMEDetailPage;
