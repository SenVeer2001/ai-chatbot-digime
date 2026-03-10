// pages/congen/CourseDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Play, Star, ChevronDown, ChevronUp, ChevronRight, Clock, Users,
  BookOpen, Award, Download, ExternalLink, MessageCircle, ThumbsUp,
  Share2, Heart, PlayCircle, CheckCircle, Lock, FileText, Video,
  HelpCircle, Files, Calendar, Globe, BarChart3, Target, Bookmark,
  ArrowLeft, Send, Reply, MoreHorizontal, Flag, Edit3, Trash2,
  Hourglass,
  Hash,
  BarChart2,
  ClipboardList
} from "lucide-react";
import { useApp } from "../../hooks/useApp";
import Header from "../../components/layout/Header";

// ==================== MAIN COURSE DETAILS PAGE ====================
export default function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useApp();

  const [activeTab, setActiveTab] = useState("about");
  const [expandedModules, setExpandedModules] = useState([1]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [newComment, setNewComment] = useState("");

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  // Sample course data - replace with API call
  const course = {
    id: 1,
    title: "Learn with AI: From Basics to Mastery",
    subtitle: "Master Artificial Intelligence from basics to advanced applications",
    thumbnail: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
    videoUrl: "https://www.youtube.com/embed/2uhJ75NcKsA",
    instructor: {
      name: "Prof. Rajesh Dutta",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      title: "AI Research Scientist",
      students: 12500,
      courses: 8,
      rating: 4.9
    },
    rating: 4.8,
    reviewCount: 2847,
    students: 15420,
    duration: "24 hours",
    lessons: 48,
    level: "Intermediate",
    language: "English",
    lastUpdated: "December 2024",
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    description: `This comprehensive course will take you from AI fundamentals to advanced machine learning techniques. You'll learn how to build intelligent systems, understand neural networks, and apply AI to real-world problems.

    By the end of this course, you'll have hands-on experience with Python, TensorFlow, and various AI frameworks. Whether you're a beginner or looking to advance your skills, this course provides everything you need.`,
    whatYouWillLearn: [
      "Understand core AI and ML concepts",
      "Build neural networks from scratch",
      "Implement deep learning algorithms",
      "Work with real-world datasets",
      "Deploy AI models to production",
      "Master Python for AI development"
    ],
    requirements: [
      "Basic programming knowledge",
      "Understanding of mathematics (linear algebra, calculus)",
      "Python basics (recommended but not required)",
      "Laptop with internet connection"
    ],
    tags: ["AI", "Machine Learning", "Deep Learning", "Python", "TensorFlow"]
  };

  const modules = [
    {
      id: 1,
      title: "Introduction to AI",
      duration: "2h 30m",
      lessonsCount: 8,
      completed: 3,
      lessons: [
        { id: 1, title: "What is Artificial Intelligence?", type: "video", duration: "15:30", completed: true },
        { id: 2, title: "History of AI", type: "video", duration: "12:45", completed: true },
        { id: 3, title: "AI Applications Today", type: "video", duration: "18:20", completed: true },
        { id: 4, title: "Types of AI Systems", type: "video", duration: "14:10", completed: false },
        { id: 5, title: "Module 1 Quiz", type: "quiz", duration: "10 min", completed: false },
        { id: 6, title: "AI Ethics Reading", type: "article", duration: "8 min", completed: false },
        { id: 7, title: "Discussion: Future of AI", type: "discussion", duration: "", completed: false },
        { id: 8, title: "Additional Resources", type: "resources", duration: "", completed: false }
      ]
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      duration: "4h 15m",
      lessonsCount: 12,
      completed: 0,
      lessons: [
        { id: 9, title: "Introduction to ML", type: "video", duration: "20:15", completed: false },
        { id: 10, title: "Supervised Learning", type: "video", duration: "25:30", completed: false },
        { id: 11, title: "Unsupervised Learning", type: "video", duration: "22:45", completed: false },
        { id: 12, title: "Regression Analysis", type: "video", duration: "28:10", completed: false }
      ]
    },
    {
      id: 3,
      title: "Neural Networks Deep Dive",
      duration: "5h 45m",
      lessonsCount: 15,
      completed: 0,
      lessons: [
        { id: 13, title: "Neural Network Basics", type: "video", duration: "30:00", completed: false },
        { id: 14, title: "Activation Functions", type: "video", duration: "18:45", completed: false },
        { id: 15, title: "Backpropagation", type: "video", duration: "35:20", completed: false }
      ]
    },
    {
      id: 4,
      title: "Deep Learning with TensorFlow",
      duration: "6h 20m",
      lessonsCount: 18,
      completed: 0,
      lessons: [
        { id: 16, title: "TensorFlow Setup", type: "video", duration: "15:00", completed: false },
        { id: 17, title: "Building Your First Model", type: "video", duration: "45:30", completed: false }
      ]
    }
  ];

  const reviews = [
    {
      id: 1,
      user: "Priya Sharma",
      avatar: "PS",
      rating: 5,
      date: "2 weeks ago",
      title: "Excellent course for beginners!",
      content: "Prof. Dutta explains complex concepts in a very simple manner. The hands-on projects really helped me understand AI better. Highly recommended!",
      helpful: 45,
      replies: 3
    },
    {
      id: 2,
      user: "Amit Kumar",
      avatar: "AK",
      rating: 5,
      date: "1 month ago",
      title: "Best AI course on the platform",
      content: "I've taken many AI courses before, but this one stands out. The depth of content and practical examples are unmatched. Worth every penny!",
      helpful: 38,
      replies: 1
    },
    {
      id: 3,
      user: "Sarah Chen",
      avatar: "SC",
      rating: 4,
      date: "1 month ago",
      title: "Great content, could use more exercises",
      content: "The theoretical explanations are fantastic. I would love to see more coding exercises and projects. Overall, a solid course for learning AI fundamentals.",
      helpful: 22,
      replies: 2
    }
  ];

  const discussions = [
    {
      id: 1,
      user: "Rahul Verma",
      avatar: "RV",
      time: "3 hours ago",
      title: "How to handle overfitting in neural networks?",
      content: "I'm working on a classification problem and my model is overfitting. I've tried dropout but it's not helping much. Any suggestions?",
      replies: 8,
      likes: 15,
      answered: true
    },
    {
      id: 2,
      user: "Meera Patel",
      avatar: "MP",
      time: "1 day ago",
      title: "Best practices for data preprocessing",
      content: "Can someone share their workflow for preprocessing data before feeding it to ML models? I'm particularly interested in handling missing values.",
      replies: 12,
      likes: 23,
      answered: true
    },
    {
      id: 3,
      user: "John Smith",
      avatar: "JS",
      time: "2 days ago",
      title: "GPU vs CPU for training models",
      content: "Is it worth investing in a GPU for this course? Or can I complete all assignments with just my laptop's CPU?",
      replies: 5,
      likes: 8,
      answered: false
    }
  ];

  const resources = [
    { id: 1, title: "AI Fundamentals Handbook", type: "pdf", size: "4.2 MB", icon: "📄" },
    { id: 2, title: "Python Cheat Sheet for AI", type: "pdf", size: "1.8 MB", icon: "📄" },
    { id: 3, title: "TensorFlow Quick Reference", type: "pdf", size: "2.1 MB", icon: "📄" },
    { id: 4, title: "Course Datasets", type: "zip", size: "156 MB", icon: "📦" },
    { id: 5, title: "Jupyter Notebooks", type: "zip", size: "45 MB", icon: "📦" },
    { id: 6, title: "Additional Reading Materials", type: "link", url: "#", icon: "🔗" }
  ];

  // Calculate progress
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = modules.reduce((acc, m) => acc + m.lessons.filter(l => l.completed).length, 0);
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getLessonIcon = (type) => {
    const icons = {
      video: <PlayCircle size={16} className="text-blue-500" />,
      article: <FileText size={16} className="text-green-500" />,
      quiz: <HelpCircle size={16} className="text-red-500" />,
      discussion: <MessageCircle size={16} className="text-purple-500" />,
      resources: <Files size={16} className="text-amber-500" />
    };
    return icons[type] || <PlayCircle size={16} />;
  };

  const renderStars = (rating, size = 14) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <Header user={user} title="ConGen™" />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-3">

          {/* ==================== LEFT SECTION ==================== */}
          <div className="col-span-12 lg:col-span-8 space-y-3">

            {/* Course Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Back Button & Breadcrumb */}
              <div className="px-6 pt-4 flex items-center gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ArrowLeft size={18} className="text-slate-600" />
                </button>
                <div className="text-sm text-slate-500">
                  <span className="hover:text-blue-500 cursor-pointer">Courses</span>
                  <ChevronRight size={14} className="inline mx-1" />
                  <span className="hover:text-blue-500 cursor-pointer">AI & Machine Learning</span>
                  <ChevronRight size={14} className="inline mx-1" />
                  <span className="text-slate-700">{course.title}</span>
                </div>
              </div>

              {/* Course Title & Info */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                      {course.title}
                    </h1>
                   

                    {/* Course Meta */}
                   

                    {/* Instructor Info */}
                    <div className="flex items-center gap-3 mt-4">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          Created by <span className="text-blue-600 hover:underline cursor-pointer">{course.instructor.name}</span>
                        </p>
                        <p className="text-xs text-slate-500">{course.instructor.title}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {course.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsSaved(!isSaved)}
                      className={`p-2 rounded-lg border transition-colors ${
                        isSaved
                          ? 'bg-red-50 border-red-200 text-red-500'
                          : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <Heart size={20} className={isSaved ? 'fill-red-500' : ''} />
                    </button>
                    <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Player */}
              <div className="px-6 pb-6">
                <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={course.videoUrl}
                    title="Course Preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

             
            </div>

            {/* ==================== TABS SECTION ==================== */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-slate-200 overflow-x-auto">
                {[
                  { id: "about", label: "About", icon: BookOpen },
                  { id: "reviews", label: "Reviews", icon: Star },
                  { id: "discussion", label: "Discussion", icon: MessageCircle },
                  { id: "resources", label: "Resources", icon: Files }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50/50"
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">

                {/* ABOUT TAB */}
                {activeTab === "about" && (
                  <div className="space-y-8">
                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-3">About This Course</h3>
                      <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                        {course.description}
                      </p>
                    </div>

                    {/* What You'll Learn */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">What You'll Learn</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.whatYouWillLearn.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                            <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">Requirements</h3>
                      <ul className="space-y-2">
                        {course.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                            <span className="text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Instructor */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">Your Instructor</h3>
                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                        <img
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">{course.instructor.name}</h4>
                          <p className="text-sm text-slate-500 mb-3">{course.instructor.title}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <Star size={14} className="text-yellow-500 fill-yellow-500" />
                              <span>{course.instructor.rating} Rating</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={14} />
                              <span>{course.instructor.students.toLocaleString()} Students</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <PlayCircle size={14} />
                              <span>{course.instructor.courses} Courses</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* REVIEWS TAB */}
                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    {/* Rating Summary */}
                    <div className="flex items-center gap-8 p-6 bg-slate-50 rounded-xl">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-slate-800">{course.rating}</div>
                        <div className="mt-2">{renderStars(course.rating, 18)}</div>
                        <p className="text-sm text-slate-500 mt-1">Course Rating</p>
                      </div>
                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const percent = star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : star === 2 ? 1 : 1;
                          return (
                            <div key={star} className="flex items-center gap-3">
                              <div className="flex items-center gap-1 w-12">
                                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                <span className="text-sm text-slate-600">{star}</span>
                              </div>
                              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-yellow-400 rounded-full"
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                              <span className="text-sm text-slate-500 w-12">{percent}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Review List */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-slate-800">
                          {course.reviewCount.toLocaleString()} Reviews
                        </h4>
                        <select className="text-sm border border-slate-200 rounded-lg px-3 py-2">
                          <option>Most Recent</option>
                          <option>Most Helpful</option>
                          <option>Highest Rated</option>
                          <option>Lowest Rated</option>
                        </select>
                      </div>

                      {reviews.map((review) => (
                        <div key={review.id} className="border border-slate-200 rounded-xl p-5">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                              {review.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h5 className="font-medium text-slate-800">{review.user}</h5>
                                  <div className="flex items-center gap-2 mt-1">
                                    {renderStars(review.rating, 12)}
                                    <span className="text-xs text-slate-400">{review.date}</span>
                                  </div>
                                </div>
                                <button className="p-1 hover:bg-slate-100 rounded">
                                  <MoreHorizontal size={16} className="text-slate-400" />
                                </button>
                              </div>
                              <h6 className="font-medium text-slate-800 mb-2">{review.title}</h6>
                              <p className="text-sm text-slate-600 leading-relaxed">{review.content}</p>
                              <div className="flex items-center gap-4 mt-4">
                                <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-500">
                                  <ThumbsUp size={14} />
                                  Helpful ({review.helpful})
                                </button>
                                <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-500">
                                  <Reply size={14} />
                                  Reply ({review.replies})
                                </button>
                                <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-red-500">
                                  <Flag size={14} />
                                  Report
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      <button className="w-full py-3 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50">
                        Load More Reviews
                      </button>
                    </div>
                  </div>
                )}

                {/* DISCUSSION TAB */}
                {activeTab === "discussion" && (
                  <div className="space-y-6">
                    {/* New Discussion Input */}
                    <div className="border border-slate-200 rounded-xl p-4">
                      <textarea
                        placeholder="Ask a question or start a discussion..."
                        className="w-full border border-slate-200 rounded-lg p-3 text-sm resize-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none"
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <div className="flex justify-end mt-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
                          <Send size={14} />
                          Post Question
                        </button>
                      </div>
                    </div>

                    {/* Discussion List */}
                    <div className="space-y-4">
                      {discussions.map((discussion) => (
                        <div key={discussion.id} className="border border-slate-200 rounded-xl p-5">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                              {discussion.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-medium text-slate-800">{discussion.user}</h5>
                                    {discussion.answered && (
                                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                        Answered
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-xs text-slate-400">{discussion.time}</span>
                                </div>
                              </div>
                              <h6 className="font-semibold text-slate-800 mb-2 hover:text-blue-600 cursor-pointer">
                                {discussion.title}
                              </h6>
                              <p className="text-sm text-slate-600 line-clamp-2">{discussion.content}</p>
                              <div className="flex items-center gap-4 mt-4">
                                <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-500">
                                  <ThumbsUp size={14} />
                                  {discussion.likes}
                                </button>
                                <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-500">
                                  <MessageCircle size={14} />
                                  {discussion.replies} replies
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* RESOURCES TAB */}
                {activeTab === "resources" && (
                  <div className="space-y-4">
                    <p className="text-slate-600 mb-6">
                      Download these supplementary materials to enhance your learning experience.
                    </p>

                    {resources.map((resource) => (
                      <div
                        key={resource.id}
                        className="flex items-center justify-between border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">{resource.icon}</span>
                          <div>
                            <h5 className="font-medium text-slate-800">{resource.title}</h5>
                            <p className="text-xs text-slate-400 uppercase">
                              {resource.type} {resource.size && `• ${resource.size}`}
                            </p>
                          </div>
                        </div>
                        <button className="p-3 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                          {resource.type === 'link' ? (
                            <ExternalLink size={20} />
                          ) : (
                            <Download size={20} />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

      
         {/* ==================== RIGHT SIDEBAR ==================== */}
<div className="col-span-12 lg:col-span-4 space-y-3 lg:sticky lg:top-[92px] lg:self-start ">

  {/* ==================== COURSE PROGRESS CARD ==================== */}
  <div className="bg-slate-50 rounded-2xl p-5">
    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-semibold text-lg text-slate-800">Course Progress</h2>
      <span className="text-red-500 font-bold text-lg">{progressPercent}%</span>
    </div>

    {/* Top Progress Bar */}
    <div className="w-full bg-slate-300 h-2 rounded-full mb-6">
      <div 
        className="bg-red-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${progressPercent}%` }}
      />
    </div>

    {/* Lesson List */}
    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1 thin-scrollbar 0">
      {modules.map((module) => (
        module.lessons.map((lesson, lessonIdx) => {
          const globalIndex = modules.slice(0, modules.indexOf(module)).reduce((acc, m) => acc + m.lessons.length, 0) + lessonIdx;
          const lessonNumber = String(globalIndex + 1).padStart(2, '0');
          const isActive = globalIndex === activeLessonIndex;
          const isLocked = !isEnrolled && globalIndex > 0;
          
          // Calculate lesson progress (mock - you can replace with real data)
          const lessonProgress = lesson.completed ? 100 : isActive ? 40 : 0;
          
          // Get lesson type label
          const getTypeLabel = (type) => {
            const labels = {
              video: 'Video',
              article: 'Article',
              quiz: 'Quiz',
              discussion: 'Discussion',
              resources: 'Resources'
            };
            return labels[type] || type;
          };

          // Get duration display
          const getDuration = (type, duration) => {
            if (type === 'video') {
              return { start: '0:00min', end: duration || '6:00min' };
            }
            return { start: '0:00min', end: duration || '5:00min' };
          };

          const time = getDuration(lesson.type, lesson.duration);

          return (
            <div 
              key={`${module.id}-${lesson.id}`} 
              className="flex gap-3 items-start cursor-pointer"
              onClick={() => {
                if (!isLocked) {
                  setActiveLessonIndex(globalIndex);
                }
              }}
            >
              {/* Number Badge */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-lg flex-shrink-0 transition-colors ${
                  isActive 
                    ? "bg-red-500 text-white" 
                    : lesson.completed 
                      ? "bg-green-500 text-white"
                      : "bg-slate-200 text-slate-600"
                }`}
              >
                {lesson.completed ? (
                  <CheckCircle size={20} />
                ) : (
                  lessonNumber
                )}
              </div>

              {/* Card */}
              <div
                className={`flex-1 p-4 rounded-xl border relative transition-all ${
                  isActive 
                    ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-200" 
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Play / Lock Icon */}
                <div className="absolute right-4 top-4">
                  {isLocked ? (
                    <Lock size={18} className={isActive ? "text-white" : "text-slate-400"} />
                  ) : lesson.completed ? (
                    <CheckCircle size={18} className={isActive ? "text-white" : "text-green-500"} />
                  ) : (
                    <Play size={18} className={isActive ? "text-white" : "text-red-500"} />
                  )}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-sm mb-1 pr-8">{lesson.title}</h3>

                {/* Type */}
                <p className={`text-xs ${isActive ? "text-red-100" : "text-slate-400"}`}>
                  {getTypeLabel(lesson.type)}
                </p>

                {/* Time */}
                <div className={`flex justify-between text-xs mt-2 ${isActive ? "text-red-100" : "text-slate-500"}`}>
                  <span>{time.start}</span>
                  <span>{time.end}</span>
                </div>

                {/* Progress Bar */}
                <div className={`w-full h-2 rounded-full mt-2 ${isActive ? "bg-red-300" : "bg-slate-200"}`}>
                  <div
                    className={`h-2 rounded-full transition-all ${isActive ? "bg-white" : "bg-red-500"}`}
                    style={{ width: `${lessonProgress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })
      ))}
    </div>
  </div>

   <div className="space-y-6 w-full max-w-md">

      {/* Card 1 */}
      <div className="relative bg-gradient-to-br from-red-600 to-red-700 text-white p-6 rounded-xl overflow-hidden">

        {/* Background circles */}
        <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -right-20"></div>
        <div className="absolute w-56 h-56 bg-white/10 rounded-full top-10 right-10"></div>

        <h2 className="text-xl font-semibold mb-6">Subscribe as Individual</h2>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <Clock size={18} /> 60 hours
          </div>

          <div className="flex items-center gap-3">
            <ClipboardList size={18} /> 4 Assignments
          </div>

          <div className="flex items-center gap-3">
            <BarChart2 size={18} /> Beginners
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <h3 className="text-2xl font-bold">$ 25.00 <span className="text-red-200 text-lg">/Year</span></h3>

          <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium">
            Enrol Now
          </button>
        </div>
      </div>


      {/* Card 2 */}
      <div className="relative bg-gradient-to-br from-red-600 to-red-700 text-white p-6 rounded-xl overflow-hidden">

        {/* Background circles */}
        <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -right-20"></div>
        <div className="absolute w-56 h-56 bg-white/10 rounded-full top-10 right-10"></div>

        <h2 className="text-xl font-semibold mb-6">Subscribe to Batch</h2>

        <div className="space-y-3 text-sm">

          <div className="flex items-center gap-3">
            <Calendar size={18} /> Start : 01 Mar 2026
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={18} /> End : 15 Mar 2026
          </div>

          <div className="flex items-center gap-3">
            <Hash size={18} /> Batch No : IGS001
          </div>

          <div className="flex items-center gap-3">
            <Users size={18} /> Max 100 Students
          </div>

          <div className="flex items-center gap-3">
            <Hourglass size={18} /> Duration : 3 Weeks
          </div>

        </div>

        <div className="flex justify-between items-center mt-8">
          <h3 className="text-2xl font-bold">$ 25.00 <span className="text-red-200 text-lg">/Year</span></h3>

          <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium">
            Enrol Now
          </button>
        </div>

      </div>

    </div>

</div>
        </div>
      </div>
    </div>
  );
}