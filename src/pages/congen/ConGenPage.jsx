// pages/ConGenPage.jsx
import {
  Plus, Play, Search, BookOpen, FileText, Briefcase, Scale,
  Calendar, Video, GraduationCap, Clock, ChevronRight,
  Users, BarChart3, ArrowRight,
  HelpCircle
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { useApp } from '../../hooks/useApp';
import Header from '../../components/layout/Header';

// Sample courses data
const sampleCourses = [
  {
    id: 1,
    title: "Machine Learning & Artificial Intelligence",
    badges: [{ text: "Placement", color: "bg-green-100 text-green-600" }, { text: "Job Ready", color: "bg-purple-100 text-purple-600" }],
    image: "https://images.pexels.com/photos/8294605/pexels-photo-8294605.jpeg?auto=format&fit=crop&q=80&w=400",
    duration: "30 Weeks",
    videos: "45+ Videos",
    level: "12 Pass",
    commitment: "6 hours/day",
    students: 1240,
    status: "published",
    type: "course"
  },
  {
    id: 2,
    title: "Certificate Program In Wealth Management",
    badges: [{ text: "Job Offer", color: "bg-blue-100 text-blue-600" }, { text: "Job Ready", color: "bg-purple-100 text-purple-600" }],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=400",
    duration: "40 hours",
    videos: "12+ Videos",
    level: "Graduate",
    commitment: "4 hours/day",
    students: 856,
    status: "published",
    type: "course"
  },
  {
    id: 3,
    title: "Non-Disclosure Agreement Template",
    badges: [{ text: "Legal", color: "bg-amber-100 text-amber-600" }],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400",
    duration: "Template",
    videos: "5 Pages",
    level: "Professional",
    commitment: "10 mins",
    students: 432,
    status: "published",
    type: "legal"
  },
  {
    id: 4,
    title: "Professional Resume - Tech Industry",
    badges: [{ text: "ATS Friendly", color: "bg-green-100 text-green-600" }, { text: "Modern", color: "bg-purple-100 text-purple-600" }],
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400",
    duration: "Template",
    videos: "2 Pages",
    level: "All Levels",
    commitment: "15 mins",
    students: 2150,
    status: "published",
    type: "resume"
  },
  {
    id: 5,
    title: "Corporate Training Presentation",
    badges: [{ text: "Enterprise", color: "bg-blue-100 text-blue-600" }],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400",
    duration: "Template",
    videos: "25 Slides",
    level: "Corporate",
    commitment: "30 mins",
    students: 1890,
    status: "draft",
    type: "corporate"
  },
  {
    id: 6,
    title: "Employment Contract Template",
    badges: [{ text: "Legal", color: "bg-amber-100 text-amber-600" }, { text: "Verified", color: "bg-green-100 text-green-600" }],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400",
    duration: "Template",
    videos: "8 Pages",
    level: "HR",
    commitment: "20 mins",
    students: 967,
    status: "published",
    type: "legal"
  }
];

// Content Card Component
const ContentCard = ({ content, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group"
  >
    {/* Image Section */}
    <div className="relative">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={content.image}
          alt={content.title}
          className="w-full h-full object-cover "
        />
      </div>

      {/* Status Badge */}
      <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${content.status === 'published'
          ? 'bg-green-500 text-white'
          : 'bg-amber-500 text-white'
        }`}>
        {content.status}
      </span>

      {/* Type Badge */}
      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-black/60 text-white backdrop-blur-sm">
        {content.type}
      </span>

      {/* Play Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all shadow-lg">
          <Play size={20} className="text-slate-700 ml-0.5" />
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-5 flex-1 flex flex-col">
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        {content.badges.map((badge, i) => (
          <span key={i} className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${badge.color}`}>
            {badge.text}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 className="font-bold text-slate-800 text-base mb-4 leading-snug line-clamp-2 flex-grow">
        {content.title}
      </h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-slate-500 mb-4">
        <div className="flex items-center gap-2 text-xs">
          <Calendar size={14} className="text-slate-400" />
          <span>{content.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <FileText size={14} className="text-slate-400" />
          <span>{content.videos}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <GraduationCap size={14} className="text-slate-400" />
          <span>{content.level}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Clock size={14} className="text-slate-400" />
          <span>{content.commitment}</span>
        </div>
      </div>

      {/* Users Count */}
      <div className="flex items-center gap-2 text-xs text-slate-400 pt-3 border-t border-slate-100">
        <Users size={14} />
        <span>{content.students.toLocaleString()} users</span>
      </div>
    </div>

    {/* Footer Button */}
    <button className="w-full py-3.5 text-blue-600 text-sm font-semibold flex items-center justify-center gap-1 border-t border-slate-100 hover:bg-blue-50/50 transition-colors group-hover:bg-blue-50">
      View Details <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
);

// Main ConGen Page
const ConGenPage = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const [contents, setContents] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('congenContents') || '[]');
      return saved.length ? saved : sampleCourses;
    } catch {
      return sampleCourses;
    }
  });

  const filteredContents = contents.filter((content) => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || content.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    try {
      localStorage.setItem('congenContents', JSON.stringify(contents));
    } catch { }
  }, [contents]);

  // Action Cards Data - Your 4 Cards
  const actionCards = [


    {
      id: 'corporate_content',
      title: 'Create Content',
      desc: 'Create professional presentations, reports, and corporate training materials.',
      Icon: Briefcase,
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100',
      onClick: () => navigate('/congen/content'),
    },
    {
      id: 'course_program',
      title: 'Course & Program',
      desc: 'Create engaging courses and educational programs with videos, quizzes, and certificates.',
      Icon: GraduationCap,
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      onClick: () => navigate('/congen/course'),
    },
    {
      id: 'legal_document',
      title: 'Legal Document',
      desc: 'Generate professional legal documents, contracts, and agreements with AI assistance.',
      Icon: Scale,
      gradient: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      iconBg: 'bg-amber-100',
      onClick: () => navigate('/congen/legal'),
    },
    {
      id: 'resume_builder',
      title: 'Resume Builder',
      desc: 'Build ATS-friendly resumes and cover letters that stand out to employers.',
      Icon: FileText,
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      onClick: () => navigate('/congen/resume'),
    },

  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'course', label: 'Courses' },
    { id: 'legal', label: 'Legal' },
    { id: 'resume', label: 'Resume' },
    { id: 'corporate', label: 'Corporate' },
  ];

  return (
    <div className="">
      {/* Header */}
      <Header user={user} title={"ConGen™"} />

      

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-5 space-y-6">



        {/* Action Cards - 4 Cards in Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {actionCards.map((card) => {
              const IconComponent = card.Icon;
              return (
                <button
                  key={card.id}
                  onClick={card.onClick}
                  className="group flex flex-col text-left rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white border border-slate-100 shadow-sm"
                >
                  {/* Icon Section */}
                  <div className={`h-32 p-4 flex items-center justify-center w-full ${card.bgColor}`}>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <IconComponent size={32} className="text-white" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-3 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-purple-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
                  </div>

                  {/* Arrow Footer */}
                  <div className="px-5 pb-5">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-400 group-hover:text-purple-500 transition-colors">
                      Get Started
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-slate-200"></div>

        {/* Content Library */}
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Your Content Library</h2>
              <p className="text-sm text-slate-500">{contents.length} items • {contents.filter(c => c.status === 'published').length} published</p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Filter Pills */}
              {/* <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200 overflow-x-auto">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      activeFilter === filter.id
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div> */}

              {/* Search */}
              <div className="flex items-center px-4 py-2.5 rounded-xl min-w-[300px] bg-white border border-slate-200">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ml-3 bg-transparent outline-none text-sm w-40 text-slate-800 placeholder-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Add New Content Card */}
            <button
              onClick={() => navigate('/congen/create')}
              className="min-h-[400px] rounded-2xl border-2 border-dashed border-slate-300 hover:border-purple-500 hover:bg-purple-50/50 flex flex-col items-center justify-center transition-all hover:scale-[1.02] group"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <Plus size={28} className="text-white" />
              </div>
              <p className="font-semibold text-slate-700 mb-1">Create New</p>
              <p className="text-sm text-slate-400">Click to get started</p>
            </button>

            {/* Content Cards */}
            {filteredContents.map((content) => (
              <ContentCard
                key={content.id}
                content={content}
                onClick={() => navigate(`/congen/${content.id}`, { state: { content } })}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredContents.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                <BookOpen size={32} className="text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-700 mb-2">No content found</h3>
              <p className="text-sm text-slate-500 mb-4">
                {searchQuery ? `No results for "${searchQuery}"` : "Start by creating your first content"}
              </p>
              <button
                onClick={() => navigate('/congen/create')}
                className="px-6 py-2.5 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition-colors inline-flex items-center gap-2"
              >
                <Plus size={18} />
                Create Content
              </button>
            </div>
          )}
        </section>

      </main>
    </div>
  );
};

export default ConGenPage;