// pages/CreateContentPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2, Star, Plus, Image as ImageIcon, Type, MousePointer2,
  ChevronRight, Sparkles, FolderUp, ArrowRight, ArrowLeft, GripVertical,
  Trash2, PlayCircle, BookOpen, CheckSquare, Files, MessageCircle,
  ChevronDown, Award, X, FileText, Video, Edit3, Save,
  Layers, BookMarked, Users, Clock, Calendar, Check, Circle,
  HelpCircle, Eye, SkipForward, Upload,
  RotateCcw, Pause, Volume2, VolumeX, Maximize2, Play, RefreshCw
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import Header from '../../components/layout/Header';
import { PreviewStep, WelcomeScreen } from './CourseSteps';
import AboutCourseStep from './steps/AboutCourseStep';
import ManageModulesStep from './steps/ManageModulesStep';
import CourseActivityStep from './steps/CourseActivityStep';
import CourseActivityEditorStep from './steps/CourseActivityEditorStep';

// ==================== MAIN CREATE CONTENT PAGE ====================
const CreateContentPage = () => {
  const navigate = useNavigate();
  const { user } = useApp();

  const [showWelcome, setShowWelcome] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: 'Learn with AI',
    style: 'Motivational, practical, career-driven, and industry-oriented',
    audience: 'Students, fresh graduates, and working professionals in India who want to build strong AI fundamentals.',
    goals: 'Learners will understand core concepts of Artificial Intelligence, gain hands-on experience with real-world AI tools and applications, develop problem-solving and analytical skills, and build a clear career roadmap for roles such as AI Engineer, Data Analyst, Machine Learning Specialist, or Tech Entrepreneur.',
    moduleCount: 1, // Start with 1 instead of 3
    modules: [],
    files: []
  });

  const steps = [
    { id: 1, title: 'About' },
    { id: 2, title: 'Modules' },
    { id: 3, title: 'Activity' },
    { id: 4, title: 'Preview' },
    { id: 5, title: 'Editor' },
  ];

  const handlePublish = () => setCurrentStep(5);
  const handleSkip = () => setCurrentStep(5);

  const handleFinish = () => {
    const savedCourses = JSON.parse(localStorage.getItem('congenContents') || '[]');
    const newCourse = {
      id: Date.now(),
      title: formData.title,
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4638d9f8e?auto=format&fit=crop&q=80&w=400',
      badges: [{ text: 'New', color: 'bg-green-100 text-green-600' }],
      duration: `${formData.modules.length * 2} Weeks`,
      videos: `${formData.modules.reduce((acc, m) => acc + m.video, 0)}+ Videos`,
      level: 'All Levels',
      commitment: '4 hours/day',
      students: 0,
      status: 'published',
      type: 'course',
      modules: formData.modules
    };

    localStorage.setItem('congenContents', JSON.stringify([...savedCourses, newCourse]));
    navigate('/congen');
  };

  if (showWelcome) {
    return (
      <div className="">
        <Header user={user} title="ConGen™" />
        <WelcomeScreen onGetStarted={() => setShowWelcome(false)} />
      </div>
    );
  }

  if (currentStep === 5) {
    return (
      <div className="min-h-screen ">
        <Header user={user} title="ConGen™" />
        <CourseActivityEditorStep
          formData={formData}
          onBack={() => setCurrentStep(4)}
          onFinish={handleFinish}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <Header user={user} title="ConGen™" />

      <div className="max-w-6xl mx-auto px-3 md:px-4 py-4">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">

          <nav className="flex items-center justify-center gap-2 md:gap-3 py-4 md:py-5 border-b border-slate-100 text-[11px] md:text-xs font-medium px-3 overflow-x-auto">
            {steps.slice(0, 3).map((step, index) => {
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;

              return (
                <React.Fragment key={step.id}>
                  <div className={`flex items-center gap-1.5 whitespace-nowrap ${isActive ? 'text-slate-900 font-bold' : isCompleted ? 'text-blue-500' : 'text-slate-400'
                    }`}>
                    {isCompleted ? (
                      <CheckCircle2 size={15} className="text-white fill-green-500" />
                    ) : (
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center text-[9px] font-bold ${isActive ? 'border-slate-900 text-slate-900' : 'border-slate-300 text-slate-400'
                        }`}>
                        {step.id}
                      </span>
                    )}
                    <span className={isActive ? 'border-b-2 border-slate-900 pb-0.5' : ''}>
                      {step.title}
                    </span>
                  </div>
                  {index < 2 && (
                    <ChevronRight size={14} className="text-slate-500 flex-shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {currentStep === 1 && (
            <AboutCourseStep
              formData={formData}
              setFormData={setFormData}
              onNext={() => setCurrentStep(2)}
              onBack={() => setShowWelcome(true)}
            />
          )}

          {currentStep === 2 && (
            <ManageModulesStep
              formData={formData}
              setFormData={setFormData}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <CourseActivityStep
              formData={formData}
              setFormData={setFormData}
              onNext={() => setCurrentStep(4)}  // or handle publish
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && (
            <PreviewStep
              formData={formData}
              onBack={() => setCurrentStep(3)}
              onSkip={handleSkip}
              onPublish={handlePublish}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateContentPage;