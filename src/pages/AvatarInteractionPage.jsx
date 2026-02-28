import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  User, Book, Code, Copy, FileText, 
  MicOff, MessageSquare, 
  Send, X, Video, VideoOff,
  Link2, File, Check, Clock, Zap, Bot,
  Mic, Upload, Plus, Trash2, Edit3, ExternalLink,
  Terminal, Key, RefreshCw, Play, Globe,
  Database, Settings, CheckCircle,
  Eye, EyeOff, MoreVertical, ArrowLeft,
  Activity, AudioLines, ChevronUp, BookOpen, Code2, Github, BarChart3,
  Search, Menu, Calendar, MessageCircle, Save, ZoomIn, ZoomOut, Maximize2
} from 'lucide-react';

const AvatarInteractionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const avatarData = location.state?.avatar;
  
  const [activeTab, setActiveTab] = useState('avatar');
  const [activeMode, setActiveMode] = useState('chat');
  const [developerSubTab, setDeveloperSubTab] = useState('overview');
  const [knowledgeSubTab, setKnowledgeSubTab] = useState('general');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [avatarZoom, setAvatarZoom] = useState(1);

  // Video & Audio States
  const [userVideoEnabled, setUserVideoEnabled] = useState(false);
  const [userMicEnabled, setUserMicEnabled] = useState(false);
  const [userStream, setUserStream] = useState(null);
  const userVideoRef = useRef(null);

  // States
  const [isListening, setIsListening] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [showApiKey, setShowApiKey] = useState({});
  const [saveStatus, setSaveStatus] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  // Knowledge Base States
  const [botName, setBotName] = useState('Ann Therapist');
  const [botIconImage, setBotIconImage] = useState(null);
  const [roleText, setRoleText] = useState('Customer Support Agent');
  const [personaText, setPersonaText] = useState('Friendly and professional AI assistant');
  const [guardRailText, setGuardRailText] = useState('Do not discuss sensitive topics');
  const [images, setImages] = useState([]);

  const [avatar] = useState({
    id: avatarData?.id || 1,
    name: avatarData?.name || 'Ann Therapist',
    role: 'AI Assistant',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    conversations: 1247
  });

  const [messages, setMessages] = useState([
    { id: 1, sender: 'user', text: 'hi', time: '10:30 AM' },
    { id: 2, sender: 'avatar', text: `Hello! I'm ${avatar.name}. How can I help you today?`, time: '10:30 AM' },
  ]);

  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: `Hello! I'm ${avatar.name}. How can I assist you today?` },
  ]);

  const [knowledgeBase] = useState([
    { id: 1, name: 'Product Documentation.pdf', type: 'pdf', size: '2.4 MB', status: 'active', lastUpdated: '2 days ago' },
    { id: 2, name: 'FAQ Database', type: 'text', size: '—', status: 'active', lastUpdated: '5 days ago' },
    { id: 3, name: 'Support Articles', type: 'url', size: '—', status: 'active', lastUpdated: '1 week ago' },
  ]);

  const [apiKeys] = useState([
    { id: 1, name: 'Production Key', key: 'sk_live_xxxxx...xxxxx', created: 'Jan 15, 2024', lastUsed: '2 hours ago' },
    { id: 2, name: 'Development Key', key: 'sk_test_xxxxx...xxxxx', created: 'Jan 10, 2024', lastUsed: '1 day ago' },
  ]);

  const tabs = [
    { id: 'avatar', label: 'Avatars', icon: User },
    { id: 'knowledge', label: 'Knowledge Base', icon: Book },
    { id: 'developer', label: 'Developers', icon: Terminal },
  ];

  const developerResources = [
    { title: "API Documentation", description: "Get started with detailed API guides.", icon: <BookOpen className="text-blue-400 w-6 h-6" /> },
    { title: "LiveAvatar SDK", description: "Access tools to enhance your development.", icon: <Code2 className="text-blue-400 w-6 h-6" /> },
    { title: "GitHub Demo", description: "See example implementations.", icon: <Github className="text-blue-400 w-6 h-6" /> }
  ];

  // ========== VIDEO FIX: useEffect to set video source ==========
  useEffect(() => {
    if (userVideoRef.current && userStream) {
      userVideoRef.current.srcObject = userStream;
      userVideoRef.current.play().catch(err => console.log('Video play error:', err));
    }
  }, [userStream, userVideoEnabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (userStream) {
        userStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [userStream]);

  // Zoom Controls
  const handleZoomIn = () => setAvatarZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setAvatarZoom(prev => Math.max(prev - 0.2, 0.8));
  const handleResetZoom = () => setAvatarZoom(1);

  // ========== FIXED: Toggle User Video ==========
  const toggleUserVideo = async () => {
    if (!userVideoEnabled) {
      try {
        // Request camera permission
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          }, 
          audio: userMicEnabled 
        });
        
        setUserStream(stream);
        setUserVideoEnabled(true);
        
        // Set video source immediately
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
          await userVideoRef.current.play();
        }
        
        console.log('Camera started successfully');
      } catch (err) {
        console.error('Camera Error:', err);
        alert('Could not access camera. Please check permissions.');
      }
    } else {
      // Stop video
      if (userStream) {
        userStream.getVideoTracks().forEach(track => {
          track.stop();
          console.log('Video track stopped');
        });
        
        if (!userMicEnabled) {
          userStream.getTracks().forEach(track => track.stop());
          setUserStream(null);
        }
      }
      setUserVideoEnabled(false);
    }
  };

  // ========== FIXED: Toggle User Mic ==========
  const toggleUserMic = async () => {
    if (!userMicEnabled) {
      try {
        if (userStream && userVideoEnabled) {
          // Add audio track to existing stream
          const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const audioTrack = audioStream.getAudioTracks()[0];
          userStream.addTrack(audioTrack);
          setUserMicEnabled(true);
        } else {
          // Create new stream with audio
          const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: true, 
            video: userVideoEnabled 
          });
          setUserStream(stream);
          setUserMicEnabled(true);
          
          if (userVideoEnabled && userVideoRef.current) {
            userVideoRef.current.srcObject = stream;
          }
        }
        console.log('Microphone started');
      } catch (err) {
        console.error('Mic Error:', err);
        alert('Could not access microphone. Please check permissions.');
      }
    } else {
      // Stop mic
      if (userStream) {
        userStream.getAudioTracks().forEach(track => {
          track.stop();
          console.log('Audio track stopped');
        });
        
        if (!userVideoEnabled) {
          userStream.getTracks().forEach(track => track.stop());
          setUserStream(null);
        }
      }
      setUserMicEnabled(false);
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInputMessage('');

    setTimeout(() => {
      const avatarResponse = {
        id: Date.now() + 1,
        sender: 'avatar',
        text: "I understand. Let me help you with that...",
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, avatarResponse]);
    }, 1500);
  };

  const handlePreviewMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { id: Date.now(), sender: 'user', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: "Thank you! I'm here to help." }]);
    }, 1000);
  };

  const handleSave = () => {
    setSaveStatus('Saving...');
    setTimeout(() => {
      setSaveStatus('Saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyWidget = () => handleCopyCode(`<script src="https://api.liveavatar.com/widget.js" data-bot-id="${avatar.id}"></script>`);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      src: URL.createObjectURL(file)
    }));
    setImages([...images, ...newImages]);
  };

  const handleRemoveImage = (id) => setImages(images.filter(img => img.id !== id));

  const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const getFileIcon = (type) => {
    const icons = { pdf: <FileText size={20} className="text-red-500" />, doc: <File size={20} className="text-blue-500" />, url: <Link2 size={20} className="text-green-500" />, text: <FileText size={20} className="text-gray-500" /> };
    return icons[type] || <File size={20} className="text-gray-500" />;
  };

  // ==================== AVATAR TAB ====================
  const renderAvatarTab = () => (
    <div className="flex flex-row gap-4 flex-1 overflow-hidden h-full">
      
      {/* LEFT: User Video */}
      <div className="w-56 flex-shrink-0 flex flex-col gap-4">
        {/* User Camera */}
        <div className="relative w-full h-80 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg bg-slate-900">
          {/* Video Element - Always render it */}
          <video
            ref={userVideoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${userVideoEnabled ? 'block' : 'hidden'}`}
            style={{ transform: 'scaleX(-1)' }}
          />
          
          {/* Placeholder when camera is off */}
          {!userVideoEnabled && (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
              <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center mb-3">
                <User size={40} className="text-slate-400" />
              </div>
              <span className="text-sm text-slate-400 font-medium">Camera Off</span>
              <span className="text-xs text-slate-500 mt-1">Click button to enable</span>
            </div>
          )}
          
          {/* User Info Badge */}
          <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md px-3 py-2 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${userVideoEnabled ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
              <span className="text-xs text-white font-medium">You</span>
            </div>
            <div className="flex items-center gap-2">
              {!userMicEnabled && <MicOff size={14} className="text-red-400" />}
              {!userVideoEnabled && <VideoOff size={14} className="text-red-400" />}
            </div>
          </div>
        </div>

        {/* Video/Audio Controls */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <button 
            onClick={toggleUserVideo}
            className={`w-full flex items-center justify-center gap-3 p-3 rounded-xl font-medium transition-all ${
              userVideoEnabled 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-red-100 text-red-600 hover:bg-red-200 border border-red-200'
            }`}
          >
            {userVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
            <span className="text-sm">
              {userVideoEnabled ? 'Camera On' : 'Turn On Camera'}
            </span>
          </button>
          
          <button 
            onClick={toggleUserMic}
            className={`w-full flex items-center justify-center gap-3 p-3 rounded-xl font-medium transition-all ${
              userMicEnabled 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-red-100 text-red-600 hover:bg-red-200 border border-red-200'
            }`}
          >
            {userMicEnabled ? <Mic size={20} /> : <MicOff size={20} />}
            <span className="text-sm">
              {userMicEnabled ? 'Mic On' : 'Turn On Mic'}
            </span>
          </button>

          {/* Status */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Status:</span>
              <span className={`font-medium ${userVideoEnabled || userMicEnabled ? 'text-green-600' : 'text-slate-400'}`}>
                {userVideoEnabled || userMicEnabled ? 'Connected' : 'Ready'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER: Avatar Video */}
      <div className="flex-1 relative bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <div className="relative w-full h-full">
          <div 
            className="w-full h-full flex items-center justify-center transition-transform duration-300 overflow-hidden"
            style={{ transform: `scale(${avatarZoom})` }}
          >
            <img 
              src={avatar.image} 
              alt={avatar.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-1.5 bg-black/50 backdrop-blur-md rounded-xl p-1.5">
            <button onClick={handleZoomIn} className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors">
              <ZoomIn size={16} />
            </button>
            <button onClick={handleResetZoom} className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors">
              <Maximize2 size={16} />
            </button>
            <button onClick={handleZoomOut} className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors">
              <ZoomOut size={16} />
            </button>
          </div>

          {/* Timer */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
            <Clock size={14} />
            Time: 01:45
          </div>

          {/* Avatar Name */}
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-white font-semibold">{avatar.name}</span>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-xl p-1.5 rounded-xl">
              <button className="p-2.5 bg-white/10 text-white rounded-lg hover:bg-white/20">
                <ChevronUp size={18} />
              </button>
              <button onClick={() => navigate(-1)} className="p-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600">
                <X size={18} />
              </button>
            </div>

            <div className="flex bg-white rounded-xl p-1 shadow-lg">
              <button 
                onClick={() => setActiveMode('chat')}
                className={`p-2.5 rounded-lg transition-all ${activeMode === 'chat' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-cyan-500'}`}
              >
                <MessageSquare size={18} />
              </button>
              <button 
                onClick={() => setActiveMode('voice')}
                className={`p-2.5 rounded-lg transition-all ${activeMode === 'voice' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-cyan-500'}`}
              >
                <AudioLines size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Chat */}
      <div className="w-96 flex-shrink-0 flex flex-col bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
        {activeMode === 'chat' ? (
          <>
            <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-cyan-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-200">
                    <img src={avatar.image} alt={avatar.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{avatar.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online
                    </p>
                  </div>
                </div>
                <button className="p-1.5 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
                  <X size={14} />
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-50/50">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 overflow-hidden ${
                    message.sender === 'user' ? 'bg-slate-200 text-slate-600' : 'border-2 border-cyan-200'
                  }`}>
                    {message.sender === 'user' ? 'U' : <img src={avatar.image} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div className={`flex-1 text-sm leading-relaxed ${
                    message.sender === 'user' ? 'text-slate-600' : 'text-slate-700 bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100'
                  }`}>
                    {message.text}
                    <p className="text-xs text-slate-400 mt-1">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100 bg-white">
              <div className="flex items-center bg-slate-100 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-cyan-500/30">
                <input 
                  type="text" 
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..." 
                  className="bg-transparent flex-1 text-sm outline-none text-slate-600 placeholder-slate-400"
                />
                <button onClick={handleSendMessage} className="ml-2 p-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-50 to-white">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-cyan-200 mb-6">
              <img src={avatar.image} alt={avatar.name} className="w-full h-full object-cover" />
            </div>
            
            <div className={`relative ${isListening ? 'animate-pulse' : ''}`}>
              {isListening && (
                <>
                  <div className="absolute inset-0 w-36 h-36 -m-2 rounded-full bg-cyan-300 animate-ping opacity-20"></div>
                  <div className="absolute inset-0 w-36 h-36 -m-2 rounded-full bg-cyan-400 animate-ping opacity-10" style={{ animationDelay: '0.3s' }}></div>
                </>
              )}
              
              <button 
                onClick={() => setIsListening(!isListening)}
                className={`relative w-32 h-32 rounded-full flex items-center justify-center shadow-2xl ${
                  isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-cyan-500 hover:bg-cyan-600'
                }`}
              >
                {isListening ? <MicOff size={40} className="text-white" /> : <Mic size={40} className="text-white" />}
              </button>
            </div>
            
            <p className="text-slate-700 mt-6 font-semibold">{isListening ? 'Listening...' : 'Tap to speak'}</p>
            <p className="text-slate-400 text-sm mt-1">{isListening ? 'Tap to stop' : `Talk with ${avatar.name}`}</p>
            
            {isListening && (
              <div className="flex items-center gap-1 mt-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1 bg-cyan-500 rounded-full animate-pulse" style={{ height: `${Math.random() * 24 + 12}px`, animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // ==================== KNOWLEDGE TAB ====================
  const renderKnowledgeTab = () => (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{avatar.name}</h1>
            <p className="text-sm text-gray-600 mt-1">Manage knowledge sources</p>
          </div>
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 font-medium">
            <Save size={18} /> Save
          </button>
        </div>

        {saveStatus && <div className="px-4 py-3 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">{saveStatus}</div>}

        <div className="flex gap-1 border-b border-gray-200">
          {['general', 'persona', 'guardrail', 'knowledgebase', 'images', 'preview'].map((tab) => (
            <button
              key={tab}
              onClick={() => setKnowledgeSubTab(tab)}
              className={`px-4 py-3 font-medium border-b-2 capitalize ${knowledgeSubTab === tab ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
            >
              {tab === 'knowledgebase' ? 'Knowledge Base' : tab}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          {knowledgeSubTab === 'general' && (
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold mb-4">General Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Chatbot Name</label>
                  <input type="text" value={avatar.name} readOnly className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Avatar</label>
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-300">
                    <img src={avatar.image} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {knowledgeSubTab === 'persona' && (
            <div className="max-w-2xl space-y-4">
              <h2 className="text-xl font-semibold mb-4">Persona</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <input type="text" value={roleText} onChange={(e) => setRoleText(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-300" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea value={personaText} onChange={(e) => setPersonaText(e.target.value)} rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-300" />
              </div>
            </div>
          )}

          {knowledgeSubTab === 'guardrail' && (
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold mb-4">Guard Rails</h2>
              <textarea value={guardRailText} onChange={(e) => setGuardRailText(e.target.value)} rows={6} className="w-full px-4 py-3 rounded-xl border border-gray-300" placeholder="Safety guidelines..." />
            </div>
          )}

          {knowledgeSubTab === 'knowledgebase' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Knowledge Base</h2>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[{ icon: Upload, title: 'Upload', desc: 'PDFs, Docs' }, { icon: FileText, title: 'Text', desc: 'Type or paste' }, { icon: Link2, title: 'Link', desc: 'Add URL' }].map((item, i) => (
                  <button key={i} className="p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
                    <item.icon size={28} className="text-blue-500 mx-auto mb-3" />
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {knowledgeBase.map((source) => (
                  <div key={source.id} className="flex items-center justify-between p-4 rounded-xl border bg-gray-50">
                    <div className="flex items-center gap-3">
                      {getFileIcon(source.type)}
                      <div>
                        <p className="font-medium">{source.name}</p>
                        <p className="text-xs text-gray-500">{source.type.toUpperCase()} • {source.size}</p>
                      </div>
                    </div>
                    <MoreVertical size={18} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {knowledgeSubTab === 'images' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Images</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50">
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="img-upload" />
                <label htmlFor="img-upload" className="cursor-pointer">
                  <Upload size={32} className="mx-auto mb-3 text-gray-400" />
                  <p className="font-medium">Upload images</p>
                </label>
              </div>
              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-6">
                  {images.map((img) => (
                    <div key={img.id} className="relative group">
                      <img src={img.src} alt="" className="w-full h-32 object-cover rounded-lg" />
                      <button onClick={() => handleRemoveImage(img.id)} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {knowledgeSubTab === 'preview' && (
            <div className="flex gap-6">
              <div className="flex-1 max-w-md">
                <div className="bg-white rounded-2xl border shadow-lg overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-500 relative">
                    <img src={avatar.image} alt="" className="w-full h-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-2xl font-bold text-white">{avatar.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white/90 text-sm">Online</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                      <Calendar size={18} className="text-blue-500" />
                      <div>
                        <p className="text-xs text-gray-500">Created</p>
                        <p className="text-sm font-semibold">{formatDate(avatar.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-100">
                      <MessageCircle size={18} className="text-green-500" />
                      <div>
                        <p className="text-xs text-gray-500">Conversations</p>
                        <p className="text-sm font-semibold">{avatar.conversations}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setIsPublished(!isPublished)} className={`w-11 h-6 rounded-full transition-colors ${isPublished ? 'bg-green-500' : 'bg-gray-300'}`}>
                          <span className={`block w-5 h-5 bg-white rounded-full shadow transition-all ${isPublished ? 'translate-x-5' : 'translate-x-0.5'}`} />
                        </button>
                        <span className={`text-sm font-medium ${isPublished ? 'text-green-600' : 'text-gray-600'}`}>{isPublished ? 'Published' : 'Draft'}</span>
                      </div>
                      <button onClick={handleCopyWidget} className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
                        {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-white rounded-2xl border shadow-lg flex flex-col max-h-[600px]">
                <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-cyan-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img src={avatar.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{avatar.name}</h4>
                      <p className="text-xs text-gray-600">Test Chat</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${msg.sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'bg-white border'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handlePreviewMessage()}
                      placeholder="Type..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border"
                    />
                    <button onClick={handlePreviewMessage} className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ==================== DEVELOPER TAB ====================
  const renderDeveloperTab = () => (
    <div className="flex-1 flex flex-col overflow-hidden bg-white rounded-3xl shadow-sm border">
      <div className="flex justify-center py-8 border-b">
        <div className="inline-flex bg-slate-100 p-1 rounded-xl">
          {['Overview', 'API Key', 'Embed', 'Usage'].map((tab) => (
            <button
              key={tab}
              onClick={() => setDeveloperSubTab(tab.toLowerCase().replace(' ', ''))}
              className={`px-6 py-2 text-sm font-medium rounded-lg ${developerSubTab === tab.toLowerCase().replace(' ', '') ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full">
        {developerSubTab === 'overview' && (
          <>
            <p className="text-slate-500 mb-10">Integrate LiveAvatar into your system via API.</p>
            <h2 className="font-bold text-lg mb-6">API Resources</h2>
            <div className="grid grid-cols-3 gap-6">
              {developerResources.map((item, i) => (
                <div key={i} className="p-8 border rounded-2xl hover:shadow-lg cursor-pointer group">
                  <div className="mb-6 p-3 bg-blue-50 w-fit rounded-xl group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {developerSubTab === 'apikey' && (
          <div className="space-y-4">
            <h2 className="font-bold text-lg mb-6">API Keys</h2>
            {apiKeys.map((key) => (
              <div key={key.id} className="p-6 border rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center"><Key size={18} className="text-amber-500" /></div>
                  <div><p className="font-semibold">{key.name}</p><p className="text-xs text-slate-400">Created {key.created}</p></div>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-sm bg-slate-900 text-green-400 px-4 py-3 rounded-xl font-mono">{showApiKey[key.id] ? 'sk_live_abcdef123456789' : key.key}</code>
                  <button onClick={() => setShowApiKey({...showApiKey, [key.id]: !showApiKey[key.id]})} className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
                    {showApiKey[key.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button onClick={() => handleCopyCode(key.key)} className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            ))}
            <button className="w-full p-6 border-2 border-dashed rounded-2xl hover:border-blue-400 hover:bg-blue-50/50 flex items-center justify-center gap-2">
              <Plus size={20} /> Create New Key
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'avatar': return renderAvatarTab();
      case 'knowledge': return renderKnowledgeTab();
      case 'developer': return renderDeveloperTab();
      default: return renderAvatarTab();
    }
  };

  return (
    <div className="flex flex-col h-screen  overflow-hidden font-sans">
      <header className="border-b border-slate-100 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-lg"><ArrowLeft size={18} className="text-slate-500" /></button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200">
              <img src={avatar.image} alt={avatar.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-800">{avatar.name}</span>
              <p className="text-xs text-slate-500">{avatar.role}</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 mx-1 rounded-lg text-sm font-medium ${activeTab === tab.id ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
                  <Icon size={18} /> <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg text-xs font-medium">
              <span className="bg-slate-300 text-white px-1.5 py-0.5 rounded">Free</span> 10 credits
            </div>
            <div className="flex items-center gap-3 px-3 py-1.5 cursor-pointer hover:bg-slate-50 rounded-lg">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-slate-200">
                <img src={avatar.image} alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block text-sm">
                <p className="font-semibold text-slate-800">Support Bot</p>
                <p className="text-slate-400 text-xs">Free</p>
              </div>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <Menu size={20} />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 py-2 border-t">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium ${activeTab === tab.id ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'}`}>
                  <Icon size={18} /> {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </header>

      <main className="flex-1 overflow-hidden p-6 ">
        <div className="h-full">{renderContent()}</div>
      </main>
    </div>
  );
};

export default AvatarInteractionPage;