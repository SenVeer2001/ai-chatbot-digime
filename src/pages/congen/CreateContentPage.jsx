// pages/congen/CreateContentPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  CheckCircle2, ChevronRight, HelpCircle, Save, RefreshCw
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import Header from '../../components/layout/Header';
import { WelcomeScreen } from './CourseSteps';
import AboutCourseStep from './steps/AboutCourseStep';
import ManageModulesStep from './steps/ManageModulesStep';
import CourseActivityStep from './steps/CourseActivityStep';
import CourseActivityEditorStep from './steps/CourseActivityEditorStep';
import HelpPopup from './HelpPopup';

// Default form data
const DEFAULT_FORM_DATA = {
  title: 'Learn with AI',
  style: 'Motivational, practical, career-driven, and industry-oriented',
  audience: 'Students, fresh graduates, and working professionals in India who want to build strong AI fundamentals, develop practical skills, and prepare for careers in technology, data, automation, and emerging digital industries.',
  goals: 'Learners will understand core concepts of Artificial Intelligence, gain hands-on experience with real-world AI tools and applications, develop problem-solving and analytical skills, and build a clear career roadmap for roles such as AI Engineer, Data Analyst, Machine Learning Specialist, or Tech Entrepreneur.',
  moduleCount: 1,
  modules: [],
  files: []
};

// ==================== MAIN CREATE CONTENT PAGE ====================
const CreateContentPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useApp();

  // ✅ Get step from URL
  const getStepFromURL = () => {
    const step = searchParams.get('step');
    return step ? parseInt(step) : 0;
  };

  
  const getSavedFormData = () => {
    try {
      const saved = localStorage.getItem('congen_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_FORM_DATA, ...parsed };
      }
    } catch (e) {
      console.error('Error loading draft:', e);
    }
    return DEFAULT_FORM_DATA;
  };

  // State
  const [currentStep, setCurrentStep] = useState(getStepFromURL);
  const [formData, setFormData] = useState(getSavedFormData);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const steps = [
    { id: 0, title: 'Welcome', hidden: true },
    { id: 1, title: 'About' },
    { id: 2, title: 'Modules' },
    { id: 3, title: 'Activity' },
    { id: 4, title: 'Editor', hidden: true },
  ];

  // ✅ Save form data to localStorage
  useEffect(() => {
    localStorage.setItem('congen_draft', JSON.stringify(formData));
  }, [formData]);

  // ✅ Sync URL with step
  useEffect(() => {
    const urlStep = getStepFromURL();
    if (urlStep !== currentStep) {
      if (currentStep === 0) {
        // Remove step param for welcome
        searchParams.delete('step');
        setSearchParams(searchParams, { replace: true });
      } else {
        setSearchParams({ step: currentStep.toString() }, { replace: true });
      }
    }
  }, [currentStep]);

  // ✅ Listen for URL changes (browser back/forward)
  useEffect(() => {
    const urlStep = getStepFromURL();
    if (urlStep !== currentStep) {
      setCurrentStep(urlStep);
    }
  }, [searchParams]);



  const goToStep = (step) => {
    setCurrentStep(step);
    
    // Update URL
    if (step === 0) {
      searchParams.delete('step');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ step: step.toString() });
    }
  };

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
    
    // Clear draft
    localStorage.removeItem('congen_draft');
    localStorage.removeItem('congen_editor_state');
    
    navigate('/congen');
  };

  const handleStartFresh = () => {
    localStorage.removeItem('congen_draft');
    localStorage.removeItem('congen_editor_state');
    setFormData(DEFAULT_FORM_DATA);
    goToStep(0);
  };

  // Check if we have saved progress
  const hasSavedProgress = formData.modules.length > 0 || formData.title !== DEFAULT_FORM_DATA.title;

  // ==================== RENDER ====================

  // Step 0: Welcome Screen
  if (currentStep === 0) {
    return (
      <div>
        <Header user={user} title="ConGen™" />
        <WelcomeScreen onGetStarted={() => goToStep(1)} />
        
        {/* Show "Continue Draft" if saved progress exists */}
        {hasSavedProgress && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-slate-200 shadow-xl rounded-2xl p-4 flex items-center gap-4 z-50">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Save size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-slate-800 text-sm">You have a saved draft</p>
              <p className="text-xs text-slate-500">"{formData.title}" - {formData.modules.length} modules</p>
            </div>
            <button
              onClick={() => {
                // Go to last completed step
                if (formData.modules.length > 0) {
                  goToStep(3);
                } else {
                  goToStep(1);
                }
              }}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            >
              Continue
            </button>
            <button
              onClick={handleStartFresh}
              className="p-2 text-slate-400 hover:text-slate-600"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Step 4: Editor Screen
  if (currentStep === 4) {
    return (
      <div className="min-h-screen">
        <Header user={user} title="ConGen™" />
        <CourseActivityEditorStep
          formData={formData}
          setFormData={setFormData}
          onBack={() => goToStep(3)}
          onFinish={handleFinish}
        />
      </div>
    );
  }

  // Steps 1-3: About, Modules, Activity
  return (
    <div className="min-h-screen">
      <Header user={user} title="ConGen™" />

      {/* Help Button */}
      <button
        onClick={() => setIsHelpOpen(true)}
        className='fixed top-[100px] right-10 z-50 p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg'
      >
        <HelpCircle size={20} className="text-white" />
      </button>

      <HelpPopup isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      <div className="max-w-6xl mx-auto px-3 md:px-4 py-4">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">

          {/* ✅ Progress Navigation - Fixed Steps */}
          <nav className="flex items-center justify-center gap-2 md:gap-3 py-4 md:py-5 border-b border-slate-100 text-[11px] md:text-xs font-medium px-3 overflow-x-auto">
            {steps.filter(s => !s.hidden).map((step, index, filteredSteps) => {
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;

              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => {
                      // Can click completed steps to go back
                      if (isCompleted) {
                        goToStep(step.id);
                      }
                    }}
                    disabled={!isCompleted && !isActive}
                    className={`flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                      isActive 
                        ? 'text-slate-900 font-bold' 
                        : isCompleted 
                          ? 'text-blue-500 hover:text-blue-600 cursor-pointer' 
                          : 'text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={15} className="text-white fill-green-500" />
                    ) : (
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                        isActive 
                          ? 'border-slate-900 text-slate-900 bg-slate-900 text-white' 
                          : 'border-slate-300 text-slate-400'
                      }`}>
                        {step.id}
                      </span>
                    )}
                    <span className={isActive ? 'border-b-2 border-slate-900 pb-0.5' : ''}>
                      {step.title}
                    </span>
                  </button>
                  
                  {index < filteredSteps.length - 1 && (
                    <ChevronRight size={14} className="text-slate-300 flex-shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Step Content */}
          {currentStep === 1 && (
            <AboutCourseStep
              formData={formData}
              setFormData={setFormData}
              onNext={() => goToStep(2)}
              onBack={() => goToStep(0)}
            />
          )}

          {currentStep === 2 && (
            <ManageModulesStep
              formData={formData}
              setFormData={setFormData}
              onNext={() => goToStep(3)}
              onBack={() => goToStep(1)}
            />
          )}

          {currentStep === 3 && (
            <CourseActivityStep
              formData={formData}
              setFormData={setFormData}
              onNext={() => goToStep(4)}
              onBack={() => goToStep(2)}
            />
          )}
        </div>

        {/* ✅ Draft Auto-Save Banner */}
        {/* {hasSavedProgress && currentStep > 0 && currentStep < 4 && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-green-500" />
              <p className="text-sm text-green-700">Progress auto-saved</p>
            </div>
            <button
              onClick={handleStartFresh}
              className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center gap-1"
            >
              <RefreshCw size={14} />
              Reset
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CreateContentPage;