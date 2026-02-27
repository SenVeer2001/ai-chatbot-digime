import { Plus, Play, Search, LogOut, User, Sparkles, Video, Layers, ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const DIGIMEPage = () => {
  const { avatars, user } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const [digimeAvatars, setDigimeAvatars] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('digimeList') || '[]');
      return saved.length ? saved : avatars;
    } catch {
      return avatars;
    }
  });

  const filteredAvatars = digimeAvatars.filter((avatar) =>
    avatar.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    try {
      localStorage.setItem('digimeList', JSON.stringify(digimeAvatars));
    } catch {}
  }, [digimeAvatars]);

  const actionCards = [
    {
      id: 'create_persona',
      title: 'Create Persona',
      desc: 'Design a unique AI character',
      Icon: Sparkles,
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      onClick: () => navigate('/aicha/1'), // Navigate to page
    },
    {
      id: 'create_digimee',
      title: 'Create DigiMee',
      desc: 'Build your digital twin avatar',
      Icon: User,
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      onClick: () => navigate('/digime/create'), // Navigate to page
    },
    {
      id: 'video_podcast',
      title: 'Video Podcast',
      desc: 'Turn photo & script into video',
      Icon: Video,
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      onClick: () => {},
    },
    {
      id: 'batch_mode',
      title: 'Batch Mode',
      desc: 'Studio quality videos in minutes',
      Icon: Layers,
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      onClick: () => {},
    }
  ];

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="border-b border-gray-200  backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="hover:opacity-80 transition-opacity">
              <img src="/webkype-logo11.png" alt="Webkype" className="h-8 w-auto" />
            </button>
            <div className="hidden md:block h-6 w-px bg-gray-300"></div>
            <span className="hidden md:block text-sm font-medium text-gray-500">DigiMee™</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-gray-200">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
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
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-3 text-gray-900">
            DigiMee™ <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Studio</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            Create AI-powered digital avatars in minutes
          </p>
        </div>

        {/* Action Cards */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {actionCards.map((card) => {
              const IconComponent = card.Icon;
              return (
                <button
                  key={card.id}
                  onClick={card.onClick}
                  className="group flex flex-col text-left rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white border border-gray-100 shadow-sm h-full"
                >
                  <div className={`h-36 p-4 flex items-center justify-center w-full ${card.bgColor}`}>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <IconComponent size={32} className="text-white" />
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow justify-center">
                    <h3 className="font-bold text-lg mb-1 text-gray-900 group-hover:text-purple-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-500">{card.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gray-200"></div>

        {/* Library */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Library</h2>
              <p className="text-sm text-gray-600">{digimeAvatars.length} avatars</p>
            </div>
            <div className="flex items-center px-4 py-3 rounded-xl bg-white border border-gray-200">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ml-3 bg-transparent outline-none text-sm w-60 text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Add New */}
            <button
              onClick={() => navigate('/digime/create')}
              className="aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-300 hover:border-purple-500 hover:bg-purple-50 flex flex-col items-center justify-center transition-all hover:scale-105"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3 shadow-lg">
                <Plus size={28} className="text-white" />
              </div>
              <p className="font-semibold text-gray-700">New Avatar</p>
            </button>

            {/* Avatars */}
            {filteredAvatars.map((avatar, i) => (
              <button
                key={avatar.id}
                onClick={() => navigate(`/digime/${avatar.id}`, { state: { avatar } })}
                className="aspect-[3/4] rounded-2xl overflow-hidden relative group shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 flex items-center justify-center">
                  <User size={40} className="text-white/80" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-opacity">
                    <Play size={20} className="text-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 px-4 py-3 rounded-xl backdrop-blur-md bg-white/95 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <p className="text-sm font-semibold truncate text-gray-900">{avatar.name}</p>
                  </div>
                </div>
                {i === 0 && (
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <Sparkles size={16} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DIGIMEPage;