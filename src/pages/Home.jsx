import { Sparkles, Zap, Brain, TrendingUp, MessageSquare, User, ArrowRight, ChevronRight, Settings, Bell, Search, LayoutGrid, Star } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';

const HomePage = () => {
  const { user } = useApp();
  const navigate = useNavigate();

  const products = [
    {
      id: 'aicha',
      name: 'AICHA™️',
      description: 'AI-powered conversational chatbot that understands intent, context, and sentiment.',
      icon: MessageSquare,
      color: 'from-orange-400 to-orange-600',
      bgLight: 'from-orange-50 to-orange-100',
      shadowColor: 'shadow-orange-500/20',
      path: '/aicha',
      status: 'Active',
      stats: '2.5k conversations',
    },
    {
      id: 'digime',
      name: 'DigiMee™️',
      description: 'Create stunning digital avatars and virtual representations with AI.',
      icon: Zap,
      color: 'from-purple-400 to-purple-600',
      bgLight: 'from-purple-50 to-purple-100',
      shadowColor: 'shadow-purple-500/20',
      path: '/digime',
      status: 'Active',
      stats: '150 avatars',
    },
    {
      id: 'congen',
      name: 'ConGen™️',
      description: 'Generate and manage content at scale with intelligent automation.',
      icon: Sparkles,
      color: 'from-blue-400 to-blue-600',
      bgLight: 'from-blue-50 to-blue-100',
      shadowColor: 'shadow-blue-500/20',
      path: '#',
      status: 'Coming Soon',
      stats: null,
    },
    {
      id: 'aida',
      name: 'AIDA™️',
      description: 'Transform raw data into actionable insights with AI analytics.',
      icon: TrendingUp,
      color: 'from-pink-400 to-pink-600',
      bgLight: 'from-pink-50 to-pink-100',
      shadowColor: 'shadow-pink-500/20',
      path: '#',
      status: 'Coming Soon',
      stats: null,
    },
    {
      id: 'aicacrm',
      name: 'AICA-CRM™️',
      description: 'Intelligent customer relationship management powered by AI.',
      icon: Brain,
      color: 'from-green-400 to-green-600',
      bgLight: 'from-green-50 to-green-100',
      shadowColor: 'shadow-green-500/20',
      path: '#',
      status: 'Coming Soon',
      stats: null,
    },
  ];


  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header user={user}   title={"Dashboard"} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
        
        {/* Welcome Section */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
            
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                A Unified AI Products{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Ecosystem
                </span>
              </h1>
              <p className="text-gray-600 max-w-2xl">
                We engineer AI-native ecosystems that think, learn, and execute across your organization—at scale.
              </p>
            </div>

          
          </div>
        </div>

        {/* Products Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Products</h2>
          <button className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
            View all
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const Icon = product.icon;
            const isActive = product.path !== '#';
            
            return (
              <div
                key={product.id}
                onClick={() => isActive && navigate(product.path)}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-300 bg-white/70 backdrop-blur-xl border border-gray-200/80 hover:border-gray-300 hover:shadow-xl ${product.shadowColor} ${
                  isActive ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {product.status}
                  </span>
                </div>

                {/* Icon Area */}
                <div className={`h-40 bg-gradient-to-br ${product.bgLight} p-6 flex items-center justify-center relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/50 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/50 to-transparent rounded-full translate-y-1/2 -translate-x-1/2"></div>
                  </div>
                  
                  {/* Large Background Icon */}
                  <div className="absolute -right-6 -bottom-6 opacity-10">
                    <Icon size={140} className="text-gray-900" />
                  </div>
                  
                  {/* Main Icon */}
                  <div className={`relative z-10 w-20 h-20 bg-gradient-to-br ${product.color} rounded-2xl flex items-center justify-center shadow-lg ${product.shadowColor} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={36} className="text-white" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Stats or CTA */}
                  <div className="flex items-center justify-between">
                    {product.stats ? (
                      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                        {product.stats}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                    
                    {isActive && (
                      <button className="flex items-center gap-1.5 text-sm font-medium text-purple-600 group-hover:gap-2.5 transition-all">
                        Explore
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-5`}></div>
                </div>
              </div>
            );
          })}
        </div>


      

      </main>
    </div>
  );
};

export default HomePage;