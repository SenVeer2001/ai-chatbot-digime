import { Plus, MessageCircle, Settings, Trash2, Copy, Search, LogOut, User, Grid3X3, List, Calendar, Clock, Eye, Sparkles, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const AICHAPage = () => {
  const { contexts, knowledgeBase, user } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBotName, setNewBotName] = useState('');

  // Sample images for chatbots
  const sampleImages = [
    'https://www.caasaa.com/assets/images/Gajendra-singh-Caasaa.jpg',
    'https://www.caasaa.com/assets/images/caasaa-team1.avif',
    'https://www.caasaa.com/assets/images/caasaa-team3.webp',
    'https://www.caasaa.com/assets/images/caasaa-team4.webp',
    'https://www.caasaa.com/assets/images/mariyammam-caasaa.jpeg',
    'https://www.caasaa.com/assets/images/ashwinisir-caasaa.jpg',
    'https://www.caasaa.com/assets/images/shaktisir-caasaa.jpeg',
  ];

  // Static default chatbots
  const defaultChatbots = [
    {
      id: 1,
      name: 'Support Bot',
      image: sampleImages[0],
      conversations: 234,
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-18',
    },
    {
      id: 2,
      name: 'Sales Assistant',
      image: sampleImages[1],
      conversations: 567,
      status: 'active',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-19',
    },
    {
      id: 3,
      name: 'HR Helper',
      image: sampleImages[2],
      conversations: 89,
      status: 'active',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-17',
    },
    {
      id: 4,
      name: 'FAQ Assistant',
      image: sampleImages[3],
      conversations: 156,
      status: 'active',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-16',
    },
    {
      id: 5,
      name: 'Product Guide',
      image: sampleImages[4],
      conversations: 312,
      status: 'active',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-20',
    },
    {
      id: 6,
      name: 'Technical Support',
      image: sampleImages[5],
      conversations: 445,
      status: 'active',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-19',
    },
  ];

  const [chatbots, setChatbots] = useState(defaultChatbots);

  const handleCreateChatbot = () => {
    if (!newBotName.trim()) return;

    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const newBot = {
      id: Math.max(...chatbots.map((bot) => bot.id), 0) + 1,
      name: newBotName.trim(),
      image: sampleImages[chatbots.length % sampleImages.length],
      conversations: 0,
      status: 'incomplete', // New bots start as incomplete
      createdAt: dateStr,
      updatedAt: dateStr,
    };

    // Add new bot at the BEGINNING of the array
    setChatbots([newBot, ...chatbots]);
    setNewBotName('');
    setShowCreateModal(false);
  };

  const handleDeleteBot = (id, e) => {
    e.stopPropagation();
    setChatbots(chatbots.filter((bot) => bot.id !== id));
  };

  const filteredChatbots = chatbots.filter((bot) =>
    bot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      if (isNaN(date.getTime())) {
        return 'N/A';
      }

      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    if (status === 'active') {
      return (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          Active
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700">
        {/* <AlertCircle size={14} /> */}
        Incomplete
      </div>
    );
  };

  // Action Button Component
  const ActionButton = ({ status, onClick }) => {
    if (status === 'incomplete') {
      return (
        <button
          onClick={onClick}
          className="text-sm font-medium text-nowrap text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
        >
          <Sparkles size={14} />
          Update Knowledge
        </button>
      );
    }
    return (
      <button
        onClick={onClick}
        className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
      >
        <Settings size={14} />
        Reconfigure
      </button>
    );
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="border-b border-gray-200  backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img src="/webkype-logo11.png" alt="Webkype" className="h-8 w-auto" />
            </button>
            <div className="hidden md:block h-6 w-px bg-gray-300"></div>
            <span className="hidden md:block text-sm font-medium text-gray-500">AICHA™</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-gray-200">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
            <button
              onClick={() => { localStorage.removeItem('auth'); navigate('/'); }}
              className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <LogOut size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              AICHA™ <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Chatbots</span>
            </h1>
            <p className="text-gray-600 mt-1">
              Create intelligent chatbots with custom contexts and knowledge sources
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all font-medium shadow-lg shadow-blue-500/25"
          >
            <Plus size={20} />
            Create AICHA
          </button>
        </div>

        {/* Search and View Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search chatbots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 p-1 bg-white border border-gray-200 rounded-xl shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid3X3 size={18} />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List size={18} />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mb-6">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{filteredChatbots.length}</span> chatbots
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-green-600">{filteredChatbots.filter(b => b.status === 'active').length}</span> active
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-amber-600">{filteredChatbots.filter(b => b.status === 'incomplete').length}</span> incomplete
          </p>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Add New Card */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="aspect-[4/5] rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 flex flex-col items-center justify-center transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                <Plus size={28} className="text-white" />
              </div>
              <p className="font-semibold text-gray-700">New Chatbot</p>
              <p className="text-sm text-gray-400">Create AICHA</p>
            </button>

            {/* Chatbot Cards */}
            {filteredChatbots.map((bot) => (
              <div
                key={bot.id}
                onClick={() => navigate(`/aicha/${bot.id}`, { state: { bot } })}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Image Area */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  {bot.image ? (
                    <img
                      src={bot.image}
                      alt={bot.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                        <MessageCircle size={40} className="text-white" />
                      </div>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/aicha/${bot.id}`, { state: { bot } });
                      }}
                      className="p-3 bg-white rounded-xl shadow-lg hover:scale-110 transition-transform"
                    >
                      <Eye size={20} className="text-gray-700" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/aicha/${bot.id}`, { state: { bot } });
                      }}
                      className="p-3 bg-white rounded-xl shadow-lg hover:scale-110 transition-transform"
                    >
                      <Settings size={20} className="text-gray-700" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteBot(bot.id, e)}
                      className="p-3 bg-white rounded-xl shadow-lg hover:scale-110 transition-transform"
                    >
                      <Trash2 size={20} className="text-red-500" />
                    </button>
                  </div>

                  {/* Status Badge - Top Left */}
                  {/* <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg ${
                    bot.status === 'active'
                      ? 'bg-green-500 text-white'
                      : 'bg-amber-500 text-white'
                  }`}>
                    {bot.status === 'active' ? (
                      <>
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                        Active
                      </>
                    ) : (
                      <>
                        <AlertCircle size={12} />
                        Incomplete
                      </>
                    )}
                  </div> */}

                  {/* Conversations Badge - Top Right */}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full flex items-center gap-1 shadow-lg">
                    <MessageCircle size={12} />
                    {bot.conversations}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-3 truncate">{bot.name}</h3>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={14} className="text-blue-500" />
                      <span>Created: <span className="text-gray-700 font-medium">{formatDate(bot.createdAt)}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={14} className="text-green-500" />
                      <span>Updated: <span className="text-gray-700 font-medium">{formatDate(bot.updatedAt)}</span></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <StatusBadge status={bot.status} />
                    <ActionButton 
                      status={bot.status}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/aicha/${bot.id}`, { state: { bot } });
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
              <div className="col-span-4 lg:col-span-3">Name</div>
              <div className="col-span-2 hidden lg:block">Status</div>
              <div className="col-span-2 hidden lg:block">Created</div>
              <div className="col-span-2 hidden lg:block">Updated</div>
              <div className="col-span-2 hidden sm:block">Conversations</div>
              <div className="col-span-4 sm:col-span-2 lg:col-span-1 text-right">Actions</div>
            </div>

            {/* Table Body */}
            {filteredChatbots.map((bot, index) => (
              <div
                key={bot.id}
                onClick={() => navigate(`/aicha/${bot.id}`, { state: { bot } })}
                className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-blue-50 transition-colors cursor-pointer ${
                  index !== filteredChatbots.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                {/* Name with Image */}
                <div className="col-span-4 lg:col-span-3 flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                    {bot.image ? (
                      <img src={bot.image} alt={bot.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                        <MessageCircle size={24} className="text-blue-500" />
                      </div>
                    )}
                    {/* Status indicator on image */}
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white ${
                      bot.status === 'active' ? 'bg-green-500' : 'bg-amber-500'
                    }`}>
                      {bot.status === 'active' ? (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      ) : (
                        <AlertCircle size={10} className="text-white" />
                      )}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{bot.name}</h3>
                    <p className="text-sm text-gray-500 lg:hidden">
                      {formatDate(bot.updatedAt)}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-2 hidden lg:block">
                  <StatusBadge status={bot.status} />
                </div>

                {/* Created Date */}
                <div className="col-span-2 hidden lg:flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={14} className="text-blue-400" />
                  {formatDate(bot.createdAt)}
                </div>

                {/* Updated Date */}
                <div className="col-span-2 hidden lg:flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={14} className="text-green-400" />
                  {formatDate(bot.updatedAt)}
                </div>

                {/* Conversations */}
                <div className="col-span-2 hidden sm:block">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                    <MessageCircle size={14} />
                    {bot.conversations}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-4 sm:col-span-2 lg:col-span-1 flex items-center justify-end gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/aicha/${bot.id}`, { state: { bot } });
                    }}
                    className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
                    title="View"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/aicha/${bot.id}`, { state: { bot } });
                    }}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                    title="Settings"
                  >
                    <Settings size={16} />
                  </button>
                  <button
                    onClick={(e) => handleDeleteBot(bot.id, e)}
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {filteredChatbots.length === 0 && (
              <div className="py-16 text-center">
                <Search size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium text-gray-600">No chatbots found</p>
                <p className="text-sm text-gray-400">Try a different search term</p>
              </div>
            )}
          </div>
        )}

        {/* Empty State for Grid */}
        {viewMode === 'grid' && filteredChatbots.length === 0 && searchQuery && (
          <div className="text-center py-16">
            <Search size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium text-gray-600">No chatbots found</p>
            <p className="text-sm text-gray-400">Try a different search term</p>
          </div>
        )}
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowCreateModal(false)}
        >
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                <MessageCircle size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Create New AICHA</h2>
              <p className="text-white/80 text-sm mt-1">Build your intelligent chatbot</p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chatbot Name
                </label>
                <input
                  type="text"
                  value={newBotName}
                  onChange={(e) => setNewBotName(e.target.value)}
                  placeholder="e.g., Support Bot"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  autoFocus
                />
              </div>

              {/* Info */}
              <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                <AlertCircle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">New chatbots start as incomplete</p>
                  <p className="text-xs text-amber-600 mt-0.5">You'll need to update the knowledge base to activate</p>
                </div>
              </div>

              {/* Quick Suggestions */}
              <div>
                <p className="text-xs text-gray-400 mb-2">Suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {['Support Bot', 'Sales Assistant', 'FAQ Helper', 'Onboarding Bot'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setNewBotName(suggestion)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 hover:bg-blue-100 hover:text-blue-600 text-gray-600 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateChatbot}
                  disabled={!newBotName.trim()}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    newBotName.trim()
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Plus size={18} />
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AICHAPage;