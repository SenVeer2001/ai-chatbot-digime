// pages/congen/CourseDetailsPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Play, Star, ChevronDown, ChevronUp, ChevronRight, Clock, Users,
  BookOpen, Award, Download, ExternalLink, MessageCircle, ThumbsUp,
  Share2, Heart, PlayCircle, CheckCircle, Lock, FileText, Video,
  HelpCircle, Files, Calendar, Globe, BarChart3, Target, Bookmark,
  ArrowLeft, Send, Reply, MoreHorizontal, Flag, Edit3, Trash2,
  Hourglass, Hash, BarChart2, ClipboardList, Quote, MoreVertical,
  UploadCloud, Table, X, Eye, Puzzle, Presentation, Smartphone,
  ShoppingCart, ChevronLeft, Image as ImageIcon
} from "lucide-react";
import { useApp } from "../../hooks/useApp";
import Header from "../../components/layout/Header";

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Footer from "../Footer";

// ==================== MAIN COURSE DETAILS PAGE ====================
export default function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useApp();

  const [expandedModules, setExpandedModules] = useState([1]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  // Section refs for scroll navigation
  const aboutRef = useRef(null);
  const reviewsRef = useRef(null);
  const discussionRef = useRef(null);
  const resourcesRef = useRef(null);
  const navRef = useRef(null);
  const answerInputRef = useRef(null);

  // Active section tracking
  const [activeSection, setActiveSection] = useState("about");
  const [isNavSticky, setIsNavSticky] = useState(false);

  // Discussion state
  const [showAnswerInput, setShowAnswerInput] = useState(null);
  const [answerText, setAnswerText] = useState("");

  // Resources state
  const [resources, setResources] = useState([
    { id: 1, name: "Home1-presentation.png", type: "image", url: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg" },
    { id: 2, name: "UI-Design-Guide.png", type: "image", url: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg" },
    { id: 3, name: "Wireframes.png", type: "image", url: "https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg" },
    { id: 4, name: "Course-Notes.pdf", type: "pdf", url: "#" },
    { id: 5, name: "Data-Sheet.xls", type: "xls", url: "#" },
  ]);
  const fileInputRef = useRef(null);


  const getLessonIcon = (type) => {
    const icons = {
      video: <PlayCircle size={14} className="text-blue-500" />,
      article: <FileText size={14} className="text-green-500" />,
      quiz: <HelpCircle size={14} className="text-orange-500" />,
      discussion: <MessageCircle size={14} className="text-purple-500" />,
      resources: <Files size={14} className="text-amber-500" />
    };
    return icons[type] || <PlayCircle size={14} className="text-gray-400" />;
  };
  // Sample course data
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
      name: "Priya Sharma",
      role: "Software Developer, Mumbai",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      date: "2 weeks ago",
      title: "Excellent course for beginners!",
      content: "Prof. Dutta explains complex concepts in a very simple manner. The hands-on projects really helped me understand AI better. Highly recommended!",
      helpful: 45,
      replies: 3
    },
    {
      id: 2,
      name: "Amit Kumar",
      role: "Data Scientist, Bangalore",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      date: "1 month ago",
      title: "Best AI course on the platform",
      content: "I've taken many AI courses before, but this one stands out. The depth of content and practical examples are unmatched. Worth every penny!",
      helpful: 38,
      replies: 1
    },
    {
      id: 3,
      name: "Sarah Chen",
      role: "ML Engineer, Singapore",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 4,
      date: "1 month ago",
      title: "Great content, could use more exercises",
      content: "The theoretical explanations are fantastic. I would love to see more coding exercises and projects. Overall, a solid course for learning AI fundamentals.",
      helpful: 22,
      replies: 2
    },
    {
      id: 4,
      name: "Rajesh Patel",
      role: "Student, Delhi",
      avatar: "https://i.pravatar.cc/150?img=33",
      rating: 5,
      date: "3 weeks ago",
      title: "Perfect for career transition",
      content: "I transitioned from web development to AI with this course. The step-by-step approach made it easy to follow along.",
      helpful: 31,
      replies: 5
    },
    {
      id: 5,
      name: "Lisa Wong",
      role: "Product Manager, Hong Kong",
      avatar: "https://i.pravatar.cc/150?img=9",
      rating: 4,
      date: "2 months ago",
      title: "Comprehensive and well-structured",
      content: "Even as a non-technical person, I could grasp the AI concepts. Great for understanding AI from a business perspective too.",
      helpful: 18,
      replies: 0
    }
  ];

  // Discussion data
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "How to create admin dashboard for Investment and Finance",
      user: "David Warner",
      avatar: "https://i.pravatar.cc/150?img=11",
      time: "1 hr ago",
      content: "You can easily find template for UI with best customize facility named 'Get Adminuiux'... no matter if its correct discussion or not. I need help understanding the best approach for creating financial dashboards.",
      tags: ["User Interface", "User Experience"],
      status: { answered: true, closed: true },
      likes: 1200,
      views: 152,
      watching: 256,
      likedBy: [
        "https://i.pravatar.cc/150?img=1",
        "https://i.pravatar.cc/150?img=2",
        "https://i.pravatar.cc/150?img=3"
      ],
      answers: [
        {
          id: 1,
          user: "Jack Lee",
          avatar: "https://i.pravatar.cc/150?img=8",
          time: "2 min ago",
          content: "I found a solution to your problem. You can use modern UI frameworks like React with Tailwind CSS. There are many admin templates available that you can customize according to your needs.",
          isCorrect: true
        },
        {
          id: 2,
          user: "Emma Wilson",
          avatar: "https://i.pravatar.cc/150?img=5",
          time: "15 min ago",
          content: "You should also consider using chart libraries like Chart.js or Recharts for financial data visualization.",
          isCorrect: false
        }
      ]
    },
    {
      id: 2,
      title: "Best practices for Neural Network optimization",
      user: "Rahul Verma",
      avatar: "https://i.pravatar.cc/150?img=12",
      time: "3 hours ago",
      content: "I'm working on a classification problem and my model is overfitting. I've tried dropout but it's not helping much. Any suggestions?",
      tags: ["Neural Networks", "Deep Learning"],
      status: { answered: false, closed: false },
      likes: 450,
      views: 89,
      watching: 120,
      likedBy: [
        "https://i.pravatar.cc/150?img=4",
        "https://i.pravatar.cc/150?img=5"
      ],
      answers: []
    }
  ]);

  // Top courses data
  const topCourses = [
    { id: 1, title: "Design with McGrow", author: "By McGrow and Hills", price: "115.00", oldPrice: "150.00", rating: "4.0", reviews: "251", image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg" },
    { id: 2, title: "UX Universal Risk", author: "By Will Gill", price: "80.00", oldPrice: "120.00", rating: "5.0", reviews: "315", image: "https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg" },
    { id: 3, title: "Design for Good and People", author: "By Max Johnson", price: "90.00", oldPrice: "150.00", rating: "4.0", reviews: "352", image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg", highlighted: true },
    { id: 4, title: "Fundamental of UX Design", author: "By Walter Smith", price: "75.00", oldPrice: "110.00", rating: "4.5", reviews: "156", image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg" },
    { id: 5, title: "UX Research and Wireframing", author: "By Will Gill", price: "80.00", oldPrice: "120.00", rating: "4.5", reviews: "156", image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" },
  ];

  // Features data
  const features = [
    { title: "Quality Education", desc: "Reliable and High Quality Education", icon: <Eye size={20} />, bgColor: "bg-pink-600" },
    { title: "Puzzleroom", desc: "World Class Problem Solving Environment", icon: <Puzzle size={20} />, bgColor: "bg-orange-500" },
    { title: "Video Lectures", desc: "Video Lectures and Self-Learning", icon: <PlayCircle size={20} />, bgColor: "bg-green-600" },
    { title: "Presentation", desc: "Weekly Presentation and Orientation", icon: <Presentation size={20} />, bgColor: "bg-blue-600" },
    { title: "Result Oriented", desc: "Exam and Test along with Preparation", icon: <ClipboardList size={20} />, bgColor: "bg-yellow-500" },
    { title: "Progress Tracking", desc: "Notes and Maintain Syllabus Progress", icon: <BookOpen size={20} />, bgColor: "bg-emerald-500" },
    { title: "Parent Orientation", desc: "Guiding Parents with Latest Teaching Methods", icon: <Users size={20} />, bgColor: "bg-indigo-600" },
    { title: "Transparency", desc: "100% Tracking with Mobile Application", icon: <Smartphone size={20} />, bgColor: "bg-amber-800" },
  ];

  // Navigation items
  const navItems = [
    { id: "about", label: "About", icon: BookOpen, ref: aboutRef },
    { id: "reviews", label: "Reviews", icon: Star, ref: reviewsRef },
    { id: "discussion", label: "Discussion", icon: MessageCircle, ref: discussionRef },
    { id: "resources", label: "Resources", icon: Files, ref: resourcesRef }
  ];

  // Calculate progress
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = modules.reduce((acc, m) => acc + m.lessons.filter(l => l.completed).length, 0);
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const sectionRefs = {
      about: aboutRef,
      reviews: reviewsRef,
      discussion: discussionRef,
      resources: resourcesRef
    };

    const targetRef = sectionRefs[sectionId];
    if (targetRef?.current) {
      const navHeight = 140;
      const elementPosition = targetRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Scroll to answer input
  const scrollToAnswerInput = (discussionId) => {
    setShowAnswerInput(discussionId);
    setTimeout(() => {
      if (answerInputRef.current) {
        answerInputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
        answerInputRef.current.querySelector('textarea')?.focus();
      }
    }, 100);
  };

  // Handle answer submit
  const handleAnswerSubmit = (discussionId) => {
    if (!answerText.trim()) return;

    setDiscussions(prev => prev.map(disc => {
      if (disc.id === discussionId) {
        return {
          ...disc,
          answers: [
            ...disc.answers,
            {
              id: Date.now(),
              user: "You",
              avatar: "https://i.pravatar.cc/150?img=20",
              time: "Just now",
              content: answerText,
              isCorrect: false
            }
          ]
        };
      }
      return disc;
    }));

    setAnswerText("");
    setShowAnswerInput(null);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const fileType = file.type.includes('image') ? 'image' :
        file.name.endsWith('.pdf') ? 'pdf' :
          file.name.endsWith('.xls') || file.name.endsWith('.xlsx') ? 'xls' : 'file';

      const newResource = {
        id: Date.now() + Math.random(),
        name: file.name,
        type: fileType,
        url: URL.createObjectURL(file)
      };

      setResources(prev => [...prev, newResource]);
    });
    e.target.value = '';
  };

  // Handle resource delete
  const handleDeleteResource = (resourceId) => {
    setResources(prev => prev.filter(r => r.id !== resourceId));
  };

  const toggleModule = (moduleId) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };


  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const navTop = navRef.current.getBoundingClientRect().top;
        setIsNavSticky(navTop <= 80);
      }

      const sections = [
        { id: "about", ref: aboutRef },
        { id: "reviews", ref: reviewsRef },
        { id: "discussion", ref: discussionRef },
        { id: "resources", ref: resourcesRef }
      ];

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const sectionTop = section.ref.current.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Format likes count
  const formatCount = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  // Get resource icon
  const getResourceIcon = (type) => {
    switch (type) {
      case 'pdf':
        return (
          <div className="w-full h-full bg-red-500 rounded-xl flex flex-col items-center justify-center text-white">
            <FileText size={32} />
            <span className="text-xs font-bold mt-1">PDF</span>
          </div>
        );
      case 'xls':
        return (
          <div className="w-full h-full bg-green-600 rounded-xl flex flex-col items-center justify-center text-white">
            <Table size={32} />
            <span className="text-xs font-bold mt-1">XLS</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="">
      <Header user={user} title="ConGen™" />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-3">

          {/* ==================== LEFT SECTION ==================== */}
          <div className="col-span-12 lg:col-span-8 space-y-3">

            {/* Course Header */}
            <div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden">
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



                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsSaved(!isSaved)}
                      className={`p-2 rounded-lg border transition-colors ${isSaved
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

            {/* ==================== STICKY NAVIGATION ==================== */}
            <div
              ref={navRef}
              className={`bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 ${isNavSticky
                ? 'lg:sticky lg:top-[60px] lg:z-20 lg:shadow-lg'
                : ''
                }`}
            >
              <div className="flex overflow-x-auto scrollbar-hide">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${activeSection === item.id
                      ? "border-blue-500 bg-blue-500 rounded-md text-white bg-blue-50/50"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                      }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ==================== ABOUT SECTION ==================== */}
            <div
              ref={aboutRef}
              id="about"
              className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden p-6"
            >
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">About This Course</h2>
                </div>

                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {course.description}
                </p>

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
            </div>

            {/* ==================== REVIEWS SECTION ==================== */}
            <div
              ref={reviewsRef}
              id="reviews"
              className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star size={20} className="text-yellow-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Student Reviews</h2>
                </div>
                <button className="text-blue-600 flex items-center gap-1 text-sm font-semibold hover:underline">
                  View All <ChevronRight size={16} />
                </button>
              </div>

              {/* Rating Summary */}
              <div className="flex items-center gap-8 p-6 bg-slate-50 rounded-xl mb-6">
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

              {/* Swiper Reviews - IMPROVED */}
              {/* <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                pagination={{
                  clickable: true,
                  el: '.reviews-pagination',
                  bulletClass: 'swiper-pagination-bullet custom-bullet',
                  bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active',
                }}
                navigation={{
                  nextEl: '.reviews-next',
                  prevEl: '.reviews-prev',
                }}
                breakpoints={{
                  640: { slidesPerView: 1.2 },
                  768: { slidesPerView: 2 },
                }}
                className="!pb-4"
              >
                {reviews.map((review) => (
                  <SwiperSlide key={review.id}>
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                      <div>
                        <Quote className="text-blue-500 mb-3" size={28} strokeWidth={2} />
                        <h6 className="font-medium text-slate-800 mb-2">{review.title}</h6>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {review.content}
                        </p>
                        <div className="flex items-center gap-2 mb-4">
                          {renderStars(review.rating, 14)}
                          <span className="text-xs text-slate-400">{review.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover bg-gray-200"
                        />
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm leading-tight">{review.name}</h4>
                          <p className="text-xs text-blue-500/70 font-medium">{review.role}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper> */}

              {/* Custom Navigation & Pagination */}
              {/* <div className="flex items-center justify-center gap-4 mt-6">
                <button className="reviews-prev w-10 h-10 rounded-full bg-white border-2 border-blue-500 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all shadow-md hover:shadow-lg disabled:opacity-50">
                  <ChevronLeft size={20} />
                </button>

               

                <button className="reviews-next w-10 h-10 rounded-full bg-white border-2 border-blue-500 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all shadow-md hover:shadow-lg disabled:opacity-50">
                  <ChevronRight size={20} />
                </button>
              </div> */}

              {/* All Reviews List */}
              <div className="mt-8 space-y-4">
                <h4 className="font-semibold text-slate-800">
                  All Reviews ({course.reviewCount.toLocaleString()})
                </h4>

                {reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="border border-slate-200 rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h5 className="font-medium text-slate-800">{review.name}</h5>
                            <p className="text-xs text-slate-500">{review.role}</p>
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

            {/* ==================== DISCUSSION SECTION ==================== */}
            <div
              ref={discussionRef}
              id="discussion"
              className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MessageCircle size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Discussion</h2>
                </div>
                <button className="text-blue-600 flex items-center gap-1 text-sm font-semibold hover:underline">
                  View All <ChevronRight size={16} />
                </button>
              </div>

              {/* Discussion List */}
              <div className="space-y-6">
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="border border-gray-200 rounded-xl p-6">
                    {/* Discussion Header */}
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-blue-600 hover:underline cursor-pointer">
                        {discussion.title}
                      </h3>
                      <MoreVertical size={20} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                    </div>

                    {/* User Info & Status */}
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <img src={discussion.avatar} className="w-10 h-10 rounded-full object-cover" alt={discussion.user} />
                      <div className="text-sm">
                        <p className="text-gray-400">Asked by</p>
                        <p className="font-bold text-gray-800">
                          {discussion.user}
                          <span className="font-normal text-gray-400 ml-2">{discussion.time}</span>
                        </p>
                      </div>
                      <div className="ml-auto flex gap-2">
                        {discussion.status.answered && (
                          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold">Answered</span>
                        )}
                        {discussion.status.closed && (
                          <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-bold">Closed</span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {discussion.content}
                    </p>

                    {/* Tags */}
                    <div className="flex gap-2 mb-6 flex-wrap">
                      {discussion.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${idx % 2 === 0 ? 'bg-pink-50 text-pink-500' : 'bg-orange-50 text-orange-500'
                            }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats & Actions */}
                    <div className="flex items-center justify-between border-t border-b py-4 mb-6">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full border-2 border-pink-200 flex items-center justify-center text-pink-500">
                            <Heart size={16} />
                          </div>
                          <div className="text-xs">
                            <p className="text-gray-400 italic">Liked by</p>
                            <p className="font-bold">{formatCount(discussion.likes)}</p>
                          </div>
                        </div>
                        <div className="flex -space-x-2">
                          {discussion.likedBy.slice(0, 3).map((avatar, i) => (
                            <img key={i} src={avatar} className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="" />
                          ))}
                          {discussion.likedBy.length > 3 && (
                            <span className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500">
                              +{discussion.likedBy.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-center text-xs">
                        <div>
                          <p className="text-gray-400">Views</p>
                          <p className="font-bold">{discussion.views}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Watching</p>
                          <p className="font-bold">{discussion.watching}</p>
                        </div>
                        <button
                          onClick={() => scrollToAnswerInput(discussion.id)}
                          className="border border-blue-600 text-blue-600 px-6 py-1.5 rounded-lg font-bold hover:bg-blue-50 transition-colors"
                        >
                          Answer
                        </button>
                      </div>
                    </div>

                    {/* Answer Input - Shows on button click */}
                    {showAnswerInput === discussion.id && (
                      <div ref={answerInputRef} className="mb-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                        <textarea
                          placeholder="Write your answer..."
                          className="w-full border border-slate-200 rounded-lg p-3 h-24 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
                          value={answerText}
                          onChange={(e) => setAnswerText(e.target.value)}
                        />
                        <div className="flex justify-between items-center mt-3">
                          <button
                            onClick={() => handleAnswerSubmit(discussion.id)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
                          >
                            <Send size={14} />
                            Submit Answer
                          </button>
                          <button
                            onClick={() => {
                              setShowAnswerInput(null);
                              setAnswerText("");
                            }}
                            className="text-red-500 border border-red-500 py-1.5 px-2  font-bold text-sm rounded-lg hover:bg-red-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Answers */}
                    <div className="space-y-4">
                      {discussion.answers.map((answer) => (
                        <div
                          key={answer.id}
                          className={`rounded-xl p-4 ${answer.isCorrect
                            ? 'bg-green-50/50 border border-green-100'
                            : 'bg-slate-50 border border-slate-100'
                            }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex gap-3">
                              <img src={answer.avatar} className="w-8 h-8 rounded-lg object-cover" alt={answer.user} />
                              <div>
                                <h4 className="font-bold text-sm text-gray-800">{answer.user}</h4>
                                <p className="text-[10px] text-gray-400">{answer.time}</p>
                              </div>
                            </div>
                            <MoreVertical size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                          </div>
                          {answer.isCorrect && (
                            <span className="inline-block bg-lime-500 text-white text-[10px] px-2 py-0.5 rounded-md font-bold mb-3 italic">
                              ✓ Correct Answer
                            </span>
                          )}
                          <p className="text-gray-600 text-sm leading-relaxed">{answer.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ==================== RESOURCES SECTION ==================== */}
            <div
              ref={resourcesRef}
              id="resources"
              className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden p-6"
            >
              <div

                className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden"
              >
                {/* Section Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <BookOpen size={20} className="text-indigo-600" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Course Curriculum</h2>
                  </div>
                  <p className="text-sm text-slate-500">
                    {modules.length} modules • {totalLessons} lessons • {course.duration} total
                  </p>
                </div>

                {/* Modules List */}
                <div className="border-t border-slate-100">
                  {modules.map((module, idx) => {
                    const isOpen = expandedModules.includes(module.id);
                    const moduleProgress = Math.round((module.completed / module.lessonsCount) * 100);
                    const isCompleted = moduleProgress === 100;

                    return (
                      <div key={module.id} className="border-b border-gray-100 last:border-none">
                        {/* Module Header */}
                        <div
                          onClick={() => toggleModule(module.id)}
                          className={`p-5 flex gap-4 cursor-pointer transition-all ${isOpen ? 'bg-blue-50/50' : 'bg-white hover:bg-gray-50'
                            }`}
                        >

                          <div className="relative">
                            <img
                              src={`https://images.pexels.com/photos/${3861969 + idx * 100}/pexels-photo-${3861969 + idx * 100}.jpeg`}
                              alt={module.title}
                              className="w-20 h-20 rounded-xl object-cover"
                              onError={(e) => {
                                e.target.src = "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg";
                              }}
                            />

                            {moduleProgress > 0 && (
                              <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-sm">{moduleProgress}%</span>
                              </div>
                            )}
                          </div>


                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <h3 className="text-blue-600 font-bold text-base leading-tight pr-4">
                                {module.title}
                              </h3>
                              {isCompleted && (
                                <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap">
                                  ✓ Completed
                                </span>
                              )}
                            </div>

                            <p className="text-gray-700 font-semibold text-xs mb-2">What's included</p>

                            <div className="flex flex-wrap gap-3 text-gray-500 text-xs">
                              <span className="flex items-center gap-1">
                                <PlayCircle size={14} className="text-blue-500" />
                                {module.lessons.filter(l => l.type === 'video').length} videos
                              </span>
                              <span className="flex items-center gap-1">
                                <BookOpen size={14} className="text-green-500" />
                                {module.lessons.filter(l => l.type === 'article').length} reading
                              </span>
                              <span className="flex items-center gap-1">
                                <FileText size={14} className="text-orange-500" />
                                {module.lessons.filter(l => l.type === 'quiz').length} quiz
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={14} className="text-purple-500" />
                                {module.duration}
                              </span>
                            </div>
                          </div>


                          <div className="flex items-center">
                            {isOpen ? (
                              <ChevronUp size={24} className="text-blue-600" />
                            ) : (
                              <ChevronDown size={24} className="text-gray-400" />
                            )}
                          </div>
                        </div>


                        {isOpen && (
                          <div className="bg-white border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">

                            <div className="px-5 py-4 flex justify-between items-center bg-slate-50/50">
                              <p className="text-gray-800 font-semibold text-sm">
                                Module Price : <span className="text-blue-600 font-bold">$140.00</span>
                              </p>
                              <div className="flex items-center gap-3">
                                {isCompleted ? (
                                  <span className="bg-lime-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                                    <CheckCircle size={14} />
                                    Completed
                                  </span>
                                ) : moduleProgress > 0 ? (
                                  <button onClick={() => { navigate("/congen/preview") }} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-1">
                                    <Play size={14} />
                                    Resume
                                  </button>
                                ) : (
                                  <button onClick={() => { navigate("/congen/preview") }} className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-green-700 transition-colors flex items-center gap-1">
                                    <Play size={14} />
                                    Start
                                  </button>
                                )}
                              </div>
                            </div>


                            {/* <div className="px-5 pb-4">
                              <div className="space-y-2">
                                {module.lessons.map((lesson, lessonIdx) => {
                                  const isLocked = !isEnrolled && lessonIdx > 0;

                                  return (
                                    <div
                                      key={lesson.id}
                                      className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${lesson.completed
                                        ? 'bg-green-50 border border-green-100'
                                        : isLocked
                                          ? 'bg-gray-50 border border-gray-100 opacity-60'
                                          : 'bg-white border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30'
                                        }`}
                                      onClick={() => {
                                        if (!isLocked) {
                                          const globalIndex = modules
                                            .slice(0, idx)
                                            .reduce((acc, m) => acc + m.lessons.length, 0) + lessonIdx;
                                          setActiveLessonIndex(globalIndex);
                                        }
                                      }}
                                    >
                                     
                                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${lesson.completed
                                        ? 'bg-green-500 text-white'
                                        : isLocked
                                          ? 'bg-gray-200 text-gray-400'
                                          : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        {lesson.completed ? (
                                          <CheckCircle size={16} />
                                        ) : isLocked ? (
                                          <Lock size={14} />
                                        ) : (
                                          String(lessonIdx + 1).padStart(2, '0')
                                        )}
                                      </div>

                                    
                                      <div className="flex-1">
                                        <h4 className={`text-sm font-medium ${lesson.completed ? 'text-green-700' : isLocked ? 'text-gray-400' : 'text-gray-800'
                                          }`}>
                                          {lesson.title}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-0.5">
                                          {getLessonIcon(lesson.type)}
                                          <span className="text-xs text-gray-400 capitalize">{lesson.type}</span>
                                          {lesson.duration && (
                                            <>
                                              <span className="text-gray-300">•</span>
                                              <span className="text-xs text-gray-400">{lesson.duration}</span>
                                            </>
                                          )}
                                        </div>
                                      </div>

                                     
                                      <div>
                                        {lesson.completed ? (
                                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                            <CheckCircle size={16} className="text-green-600" />
                                          </div>
                                        ) : isLocked ? (
                                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                            <Lock size={14} className="text-gray-400" />
                                          </div>
                                        ) : (
                                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors">
                                            <Play size={14} className="text-blue-600" />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div> */}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>


              </div>
            </div>


            <div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden p-6">


              <div className="flex justify-between items-center mb-6 ">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Files size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Resources</h2>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-600 flex items-center gap-1 text-sm font-semibold hover:underline"
                >
                  Upload File <UploadCloud size={16} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                  accept="image/*,.pdf,.xls,.xlsx,.doc,.docx"
                />
              </div>

              {/* Resources Grid */}
              <div className="flex gap-4 overflow-x-auto py-2  thin-scrollbar">
                {resources.map((resource) => (
                  <div key={resource.id} className="min-w-[120px] text-center relative group">
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteResource(resource.id)}
                      className="absolute -top-2 -right-2 z-10 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
                    >
                      <X size={14} />
                    </button>

                    {/* Resource Preview */}
                    <div className="w-[100px] h-[100px] mx-auto mb-2 rounded-xl overflow-hidden">
                      {resource.type === 'image' ? (
                        <img
                          src={resource.url}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                          alt={resource.name}
                        />
                      ) : (
                        getResourceIcon(resource.type)
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 truncate max-w-[100px] mx-auto">
                      {resource.name}
                    </p>
                  </div>
                ))}

                {/* Upload Placeholder */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="min-w-[120px] cursor-pointer"
                >
                  <div className="w-[100px] h-[100px] mx-auto mb-2 rounded-xl border-2 border-dashed  flex flex-col items-center justify-center  border-blue-400 text-blue-500 transition-colors">
                    <UploadCloud size={24} />
                    <span className="text-[10px] mt-1">Upload</span>
                  </div>
                </div>
              </div>
            </div>






          </div>

          {/* ==================== RIGHT SIDEBAR ==================== */}
          <div className="col-span-12 lg:col-span-4 space-y-3 lg:sticky lg:top-[92px] lg:self-start">

            {/* Course Progress Card */}
            <div className="bg-slate-50 rounded-xl p-5">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg text-slate-800">Course Progress</h2>
                {/* <span className="text-blue-600 font-bold text-lg">{progressPercent}%</span> */}
              </div>

              {/* Main Progress Bar */}
              <div className="w-full bg-slate-200 h-3 rounded-full mb-6">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300 relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  {/* Percentage inside bar (optional) */}
                  {progressPercent > 15 && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white">
                      {progressPercent}%
                    </span>
                  )}
                </div>
              </div>

              {/* Lessons List */}
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 thin-scrollbar">
                {modules.map((module) => (
                  module.lessons.slice(0, 4).map((lesson, lessonIdx) => {
                    const globalIndex = modules.slice(0, modules.indexOf(module)).reduce((acc, m) => acc + m.lessons.length, 0) + lessonIdx;
                    const lessonNumber = String(globalIndex + 1).padStart(2, '0');
                    const isActive = globalIndex === activeLessonIndex;
                    const isLocked = !isEnrolled && globalIndex > 0;

                    return (
                      <div
                        key={`${module.id}-${lesson.id}`}
                        onClick={() => { if (!isLocked) setActiveLessonIndex(globalIndex); }}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${isActive
                            ? "bg-blue-500 text-white shadow-md"
                            : lesson.completed
                              ? "bg-green-50 border border-green-200"
                              : "bg-white border border-slate-200 hover:border-blue-300"
                          }`}
                      >
                        {/* Number */}
                        <div className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold flex-shrink-0 ${isActive
                            ? "bg-white/20 text-white"
                            : lesson.completed
                              ? "bg-green-500 text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}>
                          {lesson.completed ? <CheckCircle size={16} /> : lessonNumber}
                        </div>

                        {/* Title */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${isActive ? "text-white" : lesson.completed ? "text-green-700" : "text-slate-700"
                            }`}>
                            {lesson.title}
                          </p>
                          <p className={`text-xs ${isActive ? "text-blue-100" : "text-slate-400"
                            }`}>
                            {lesson.duration || "3 min"}
                          </p>
                        </div>

                        {/* Icon */}
                        <div className="flex-shrink-0">
                          {isLocked ? (
                            <Lock size={16} className={isActive ? "text-white/70" : "text-slate-400"} />
                          ) : lesson.completed ? (
                            <CheckCircle size={16} className={isActive ? "text-white" : "text-green-500"} />
                          ) : (
                            <Play size={16} className={isActive ? "text-white" : "text-blue-500"} />
                          )}
                        </div>
                      </div>
                    );
                  })
                ))}
              </div>

              {/* Bottom Stats */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200 text-xs text-slate-500">
                <span>{completedLessons} of {totalLessons} completed</span>
                {/* <span className="text-blue-600 font-medium">{progressPercent}% Complete</span> */}
              </div>
            </div>

            {/* Subscription Cards */}
            <div className="space-y-4">
              <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-md overflow-hidden">
                <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -right-20"></div>
                <div className="absolute w-56 h-56 bg-white/10 rounded-full top-10 right-10"></div>
                <h2 className="text-xl font-semibold mb-6 relative z-10">Subscribe as Individual</h2>
                <div className="space-y-3 text-sm relative z-10">
                  <div className="flex items-center gap-3"><Clock size={18} /> 60 hours</div>
                  <div className="flex items-center gap-3"><ClipboardList size={18} /> 4 Assignments</div>
                  <div className="flex items-center gap-3"><BarChart2 size={18} /> Beginners</div>
                </div>
                <div className="flex justify-between items-center mt-8 relative z-10">
                  <h3 className="text-2xl font-bold">$ 25.00 <span className="text-blue-200 text-lg">/Year</span></h3>
                  <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors">Enrol Now</button>
                </div>
              </div>

              <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-md overflow-hidden">
                <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -right-20"></div>
                <div className="absolute w-56 h-56 bg-white/10 rounded-full top-10 right-10"></div>
                <h2 className="text-xl font-semibold mb-6 relative z-10">Subscribe to Batch</h2>
                <div className="space-y-3 text-sm relative z-10">
                  <div className="flex items-center gap-3"><Calendar size={18} /> Start : 01 Mar 2026</div>
                  <div className="flex items-center gap-3"><Calendar size={18} /> End : 15 Mar 2026</div>
                  <div className="flex items-center gap-3"><Hash size={18} /> Batch No : IGS001</div>
                  <div className="flex items-center gap-3"><Users size={18} /> Max 100 Students</div>
                  <div className="flex items-center gap-3"><Hourglass size={18} /> Duration : 3 Weeks</div>
                </div>
                <div className="flex justify-between items-center mt-8 relative z-10">
                  <h3 className="text-2xl font-bold">$ 25.00 <span className="text-blue-200 text-lg">/Year</span></h3>
                  <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors">Enrol Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== TOP COURSES SECTION ==================== */}
        <section className="mt-12">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">Top courses in Development</h2>
            <p className="text-sm text-gray-500">
              Inspired by your journey to the learning
              <span className="bg-lime-200 text-lime-700 text-[10px] px-2 py-0.5 rounded-full font-bold ml-2">New</span>
            </p>
          </div>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={16}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: '.courses-pagination',
            }}
            navigation={{
              nextEl: '.courses-next',
              prevEl: '.courses-prev',
            }}
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            className="!pb-4"
          >
            {topCourses.map((course) => (
              <SwiperSlide key={course.id}>
                <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-all">
                  <div className="p-4 flex-1">
                    <h3 className="text-sm font-bold mb-1 truncate text-blue-600">{course.title}</h3>
                    <p className="text-[10px] text-gray-400 mb-3">{course.author}</p>
                    <div className="rounded-lg overflow-hidden mb-4">
                      <img src={course.image} alt={course.title} className="w-full h-24 object-cover" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-gray-800">${course.price}</span>
                      <span className="text-xs text-gray-400 line-through">${course.oldPrice}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold text-gray-800">{course.rating}</span>
                      <span className="text-[10px] text-gray-400">({course.reviews} Reviews)</span>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex gap-2">
                      <button className="p-1.5 border rounded-full text-pink-500 border-pink-100 hover:bg-pink-50">
                        <Heart size={14} />
                      </button>
                      <button className="p-1.5 border rounded-full text-blue-500 border-blue-100 hover:bg-blue-50">
                        <Share2 size={14} />
                      </button>
                    </div>
                    <button className={`p-2 rounded-lg ${course.highlighted ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-blue-600 border border-blue-100 hover:bg-blue-50'}`}>
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button className="courses-prev w-8 h-8 rounded-full bg-white border border-blue-500 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">
              <ChevronLeft size={16} />
            </button>
            <div className="courses-pagination flex items-center gap-1"></div>
            <button className="courses-next w-8 h-8 rounded-full bg-white border border-blue-500 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* ==================== FEATURES SECTION ==================== */}
        <section className="mt-8 mb-2">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800">Our Features</h2>
            <p className="text-sm text-gray-500">Facilities that provide with our in school courses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-md shadow-sm flex items-center gap-4 border border-transparent hover:border-blue-100 hover:shadow-md transition-all"
              >
                <div className={`${feature.bgColor} text-white p-3 rounded-full flex-shrink-0`}>
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">{feature.title}</h4>
                  <p className="text-[11px] text-gray-500 leading-tight mt-1">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>



    </div>
  );
}