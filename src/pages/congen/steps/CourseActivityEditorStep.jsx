// CourseActivityEditorStep.jsx
import { useState, useEffect } from "react";
import {
    ArrowLeft, ArrowRight, ChevronRight, Eye, Edit3, Trash2,
    GripVertical, Plus, PlayCircle, BookOpen, MessageCircle,
    Files, HelpCircle, Circle, Save, Sparkles, Upload, Check, X,
    Youtube, Link, Pencil,
    ChevronLeft,
    Users
} from "lucide-react";
import AddActivityPopup from "../Addactivity";

// ⭐ NEW IMPORTS - Add these
import QuizEditor from "../editors/QuizEditor";
import ArticleEditor from "../editors/ArticleEditor";
import DiscussionEditor from "../editors/DiscussionEditor";
import ResourcesEditor from "../editors/ResourcesEditor";
import CoursePreviewMode from "../CoursePreviewPage";
import { useNavigate } from "react-router-dom";
import TeamEditor from "../editors/TeamEditor";

// Default YouTube video URL
const DEFAULT_YOUTUBE_URL = 'https://youtu.be/2uhJ75NcKsA';

// Default activity names for videos
const VIDEO_NAMES = [
    "Explore AI in life",
    "AI Drives Autonomous Vehicles",
    "AI transforming mobility",
    "AI is Transforming the Future of Retail",
    "AI and Retail Applications",
    "AI and Healthcare",
    "AI on Health and Well Being",
    "AI and Finance",
    "AI in Banking Systems",
    "Introduction to Machine Learning",
    "Deep Learning Fundamentals",
    "Neural Networks Explained",
    "Computer Vision Basics",
    "Natural Language Processing"
];

const ARTICLE_NAMES = [
    "AI and COVID-19 Impact",
    "Understanding AI Ethics",
    "AI in Modern Business",
    "Data Science Fundamentals",
    "AI Implementation Guide",
    "Machine Learning Best Practices"
];

const DISCUSSION_NAMES = [
    "AI on Health and Well Being",
    "Ethics in AI Development",
    "Future of AI Technology"
];
const TEAM_NAMES = [
    "Expert Team",
    "Module Instructors",
    "Course Mentors"
];

export const CourseActivityEditorStep = ({ formData, onBack, onFinish }) => {
    const modules = formData.modules || [];
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
    const [openAddActivity, setOpenAddActivity] = useState(false);
    const navigate = useNavigate();
    // Edit States
    const [isEditingVideo, setIsEditingVideo] = useState(false);
    const [isEditingTranscript, setIsEditingTranscript] = useState(false);

    // Inline title editing state
    const [editingLessonId, setEditingLessonId] = useState(null);
    const [editingTitleText, setEditingTitleText] = useState('');

    // Temp states for editing
    const [tempYoutubeUrl, setTempYoutubeUrl] = useState('');
    const [tempTranscriptMain, setTempTranscriptMain] = useState('');
    const [tempTranscriptReadMore, setTempTranscriptReadMore] = useState('');

    // Drag and Drop States
    const [lessons, setLessons] = useState([]);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    // Transcript states
    const [transcriptMain, setTranscriptMain] = useState("This video explains how Artificial Intelligence works in real-world applications and how businesses can use automation, data analysis, and smart decision-making systems to improve productivity and growth across different industries including healthcare, education, and marketing.");
    const [transcriptReadMore, setTranscriptReadMore] = useState("In the advanced section, we also explore machine learning models, training datasets, AI tools, and how future technologies will impact job roles and business strategies globally.");

    const currentModule = modules[currentModuleIndex] || modules[0];


    const getYoutubeVideoId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    // Generate lessons for current module with meaningful names
    const generateLessons = (mod) => {
        if (!mod) return [];
        const lessonsList = [];

        // Add videos with meaningful names
        for (let i = 0; i < mod.video; i++) {
            lessonsList.push({
                id: `v${i}`,
                title: VIDEO_NAMES[i % VIDEO_NAMES.length],
                type: 'video',
                duration: '3 min',
                youtubeUrl: ''
            });
        }

        // Add articles with meaningful names
        for (let i = 0; i < mod.article; i++) {
            lessonsList.push({
                id: `a${i}`,
                title: ARTICLE_NAMES[i % ARTICLE_NAMES.length],
                type: 'article',
                duration: '2 min'
            });
        }

        // Add discussion
        if (mod.discussion > 0) {
            lessonsList.push({
                id: 'd0',
                title: DISCUSSION_NAMES[0],
                type: 'discussion',
                duration: ''
            });
        }

        // Add resources
        if (mod.resources > 0) {
            lessonsList.push({
                id: 'r0',
                title: 'Additional Resources',
                type: 'resources',
                duration: ''
            });
        }


        // Add team to lessons
        lessonsList.push({
            id: 't0',
            title: TEAM_NAMES[0],
            type: 'team',
            duration: ''
        });

        // Add quizzes
        for (let i = 0; i < mod.quiz; i++) {
            lessonsList.push({
                id: `q${i}`,
                title: `Module Quiz ${i + 1}`,
                type: 'quiz',
                duration: '5 min'
            });
        }

        return lessonsList;
    };

    // Initialize lessons when module changes
    useEffect(() => {
        setLessons(generateLessons(currentModule));
        setSelectedLessonIndex(0);
        resetAllEditStates();
    }, [currentModuleIndex]);

    // Reset edit state when lesson changes
    useEffect(() => {
        resetAllEditStates();
    }, [selectedLessonIndex]);

    const resetAllEditStates = () => {
        setIsEditingVideo(false);
        setIsEditingTranscript(false);
        setEditingLessonId(null);
        setEditingTitleText('');
        setTempYoutubeUrl('');
        setTempTranscriptMain('');
        setTempTranscriptReadMore('');
    };

    const selectedLesson = lessons[selectedLessonIndex] || lessons[0];
    const progress = Math.round(((currentModuleIndex + 1) / modules.length) * 100);

    // Get current lesson's YouTube ID - use default if none provided
    const currentYoutubeId = selectedLesson?.youtubeUrl
        ? getYoutubeVideoId(selectedLesson.youtubeUrl)
        : getYoutubeVideoId(DEFAULT_YOUTUBE_URL);

    // Handle YouTube URL submission
    const handleYoutubeUrlSubmit = () => {
        const videoId = getYoutubeVideoId(tempYoutubeUrl);
        if (videoId || tempYoutubeUrl === '') {
            const newLessons = [...lessons];
            if (newLessons[selectedLessonIndex]) {
                newLessons[selectedLessonIndex].youtubeUrl = tempYoutubeUrl;
                setLessons(newLessons);
            }
            setIsEditingVideo(false);
            setTempYoutubeUrl('');
        } else {
            alert('Please enter a valid YouTube URL');
        }
    };

    const handleEditVideoClick = () => {
        setIsEditingVideo(true);
        setTempYoutubeUrl(selectedLesson?.youtubeUrl || '');
    };

    const handleCancelVideoEdit = () => {
        setIsEditingVideo(false);
        setTempYoutubeUrl('');
    };


    const handleEditTranscriptClick = () => {
        setIsEditingTranscript(true);
        setTempTranscriptMain(transcriptMain);
        setTempTranscriptReadMore(transcriptReadMore);
    };

    const handleSaveTranscript = () => {
        setTranscriptMain(tempTranscriptMain);
        setTranscriptReadMore(tempTranscriptReadMore);
        setIsEditingTranscript(false);
    };

    const handleCancelTranscriptEdit = () => {
        setIsEditingTranscript(false);
        setTempTranscriptMain('');
        setTempTranscriptReadMore('');
    };


    const handleInlineTitleEdit = (lessonId, currentTitle) => {
        setEditingLessonId(lessonId);
        setEditingTitleText(currentTitle);
    };

    const handleInlineTitleSave = () => {
        const newLessons = lessons.map(lesson =>
            lesson.id === editingLessonId ? { ...lesson, title: editingTitleText } : lesson
        );
        setLessons(newLessons);
        setEditingLessonId(null);
        setEditingTitleText('');
    };

    const handleInlineTitleCancel = () => {
        setEditingLessonId(null);
        setEditingTitleText('');
    };

    // ⭐ NEW: Handle lesson update from editors
    const handleLessonUpdate = (updatedLesson) => {
        const newLessons = lessons.map((lesson, idx) =>
            idx === selectedLessonIndex ? { ...lesson, ...updatedLesson } : lesson
        );
        setLessons(newLessons);
    };

    // Drag and Drop Functions
    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        e.currentTarget.style.opacity = '0.5';
    };

    const handleDragEnd = (e) => {
        e.currentTarget.style.opacity = '1';
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (draggedIndex !== index) {
            setDragOverIndex(index);
        }
    };

    const handleDragLeave = () => {
        setDragOverIndex(null);
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();

        if (draggedIndex === null || draggedIndex === dropIndex) {
            setDragOverIndex(null);
            return;
        }

        const newLessons = [...lessons];
        const draggedLesson = newLessons[draggedIndex];

        newLessons.splice(draggedIndex, 1);
        newLessons.splice(dropIndex, 0, draggedLesson);

        setLessons(newLessons);

        if (selectedLessonIndex === draggedIndex) {
            setSelectedLessonIndex(dropIndex);
        } else if (draggedIndex < selectedLessonIndex && dropIndex >= selectedLessonIndex) {
            setSelectedLessonIndex(selectedLessonIndex - 1);
        } else if (draggedIndex > selectedLessonIndex && dropIndex <= selectedLessonIndex) {
            setSelectedLessonIndex(selectedLessonIndex + 1);
        }

        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const getIcon = (type) => {
        const icons = {
            video: <PlayCircle size={12} className="text-blue-500" />,
            article: <BookOpen size={12} className="text-green-500" />,
            discussion: <MessageCircle size={12} className="text-purple-500" />,
            resources: <Files size={12} className="text-amber-500" />,
            quiz: <HelpCircle size={12} className="text-red-500" />,
            team: <Users size={12} className="text-indigo-500" /> // ADD THIS
        };
        return icons[type] || <Circle size={12} />;
    };

    const handlePreviewClick = () => {
        // Save preview data to localStorage
        const previewData = {
            formData,
            lessons,
            currentModule,
            selectedLessonIndex,
            currentYoutubeId,
            transcriptMain,
            transcriptReadMore
        };
        localStorage.setItem('congen_preview_data', JSON.stringify(previewData));

        // Navigate to preview page (opens in same tab)
        navigate('/congen/preview');

        // OR: Open in new tab
        // window.open('/congen/preview', '_blank');
    };
    const getTypeLabel = (type) => {
        const labels = {
            video: 'Watch 3 min',
            article: 'Read 2 min',
            discussion: 'Discussion',
            resources: 'Resources',
            quiz: 'Quiz 5 min',
            team: 'Expert Team' // ADD THIS
        };
        return labels[type] || type;
    };

    const handleNextModule = () => {
        if (currentModuleIndex < modules.length - 1) {
            setCurrentModuleIndex(currentModuleIndex + 1);
        } else {
            onFinish();
        }
    };

    const handlePrevModule = () => {
        if (currentModuleIndex > 0) {
            setCurrentModuleIndex(currentModuleIndex - 1);
        }
    };


    const renderLessonContent = () => {
        if (!selectedLesson) return null;

        switch (selectedLesson.type) {
            case 'video':
                return (
                    <>
                        {/* VIDEO SECTION - Existing Code */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="flex justify-between items-center border-b border-slate-100 p-3 bg-slate-50/50">
                                <p className="font-medium text-sm text-slate-700 flex items-center gap-2">
                                    <Youtube size={16} className="text-red-500" />
                                    Video
                                </p>
                                {!isEditingVideo && (
                                    <button
                                        onClick={handleEditVideoClick}
                                        className="p-1.5 hover:bg-slate-200 rounded-md text-slate-500 hover:text-blue-500 transition-colors"
                                    >
                                        <Pencil size={14} />
                                    </button>
                                )}
                            </div>

                            <div className="p-4">
                                {!isEditingVideo && (
                                    <div className="rounded-lg overflow-hidden bg-black">
                                        <iframe
                                            className="w-full h-[300px] md:h-[400px] lg:h-[500px]"
                                            src={`https://www.youtube.com/embed/${currentYoutubeId}`}
                                            title="YouTube video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                )}

                                {isEditingVideo && (
                                    <div className="space-y-3">
                                        {getYoutubeVideoId(tempYoutubeUrl) && (
                                            <div className="rounded-lg overflow-hidden bg-black">
                                                <iframe
                                                    className="w-full h-[300px] md:h-[400px] lg:h-[500px]"
                                                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(tempYoutubeUrl)}`}
                                                    title="YouTube video preview"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            </div>
                                        )}

                                        <div className="flex gap-2">
                                            <div className="flex-1 relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                    <Link size={14} className="text-slate-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Paste YouTube link here... "
                                                    value={tempYoutubeUrl}
                                                    onChange={(e) => setTempYoutubeUrl(e.target.value)}
                                                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 pl-9 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none"
                                                />
                                            </div>
                                            <button
                                                onClick={handleYoutubeUrlSubmit}
                                                className="bg-green-500 text-white px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                                            >
                                                <Check size={16} />
                                            </button>
                                            <button
                                                onClick={handleCancelVideoEdit}
                                                className="bg-slate-200 text-slate-600 px-4 rounded-lg hover:bg-slate-300 transition-colors flex items-center justify-center"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>

                                        <p className="text-[10px] text-slate-400">
                                            Leave empty to use default video. Supported formats: youtube.com/watch?v=..., youtu.be/...
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* TRANSCRIPT SECTION - Existing Code */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="flex justify-between items-center border-b border-slate-100 p-3 bg-slate-50/50">
                                <p className="font-medium text-sm text-slate-700">Transcript</p>
                                {!isEditingTranscript && (
                                    <button
                                        onClick={handleEditTranscriptClick}
                                        className="p-1.5 hover:bg-slate-200 rounded-md text-slate-500 hover:text-blue-500 transition-colors"
                                    >
                                        <Pencil size={14} />
                                    </button>
                                )}
                            </div>

                            <div className="p-4 space-y-4">
                                {!isEditingTranscript && (
                                    <>
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 mb-1">Transcript (Main)</p>
                                            <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
                                                {transcriptMain}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 mb-1">Read More Text</p>
                                            <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
                                                {transcriptReadMore}
                                            </p>
                                        </div>
                                    </>
                                )}

                                {isEditingTranscript && (
                                    <>
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 mb-1">Transcript (Main)</p>
                                            <textarea
                                                className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-blue-400 outline-none resize-none"
                                                rows={4}
                                                value={tempTranscriptMain}
                                                onChange={(e) => setTempTranscriptMain(e.target.value)}
                                                placeholder="Enter main transcript..."
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 mb-1">Read More Text</p>
                                            <textarea
                                                className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-blue-400 outline-none resize-none"
                                                rows={3}
                                                value={tempTranscriptReadMore}
                                                onChange={(e) => setTempTranscriptReadMore(e.target.value)}
                                                placeholder="Enter additional content..."
                                            />
                                        </div>

                                        <div className="flex justify-end gap-2 pt-2">
                                            <button
                                                onClick={handleCancelTranscriptEdit}
                                                className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSaveTranscript}
                                                className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-1.5"
                                            >
                                                <Save size={14} /> Save
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                );

            case 'article':
                return <ArticleEditor lesson={selectedLesson} onUpdate={handleLessonUpdate} />;

            case 'discussion':
                return <DiscussionEditor lesson={selectedLesson} onUpdate={handleLessonUpdate} />;

            case 'quiz':
                return <QuizEditor lesson={selectedLesson} onUpdate={handleLessonUpdate} />;

            case 'resources':
                return <ResourcesEditor lesson={selectedLesson} onUpdate={handleLessonUpdate} />;

            case 'team':
                return <TeamEditor lesson={selectedLesson} onUpdate={handleLessonUpdate} />;

            default:
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="flex justify-between items-center border-b border-slate-100 p-3 bg-slate-50/50">
                            <p className="font-medium text-sm text-slate-700 flex items-center gap-2">
                                {getIcon(selectedLesson?.type)}
                                <span className="capitalize">{selectedLesson?.type}</span>
                            </p>
                            <button className="p-1.5 hover:bg-slate-200 rounded-md text-slate-500">
                                <Pencil size={14} />
                            </button>
                        </div>
                        <div className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
                            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                                {getIcon(selectedLesson?.type)}
                            </div>
                            <p className="text-sm font-medium text-slate-600">{selectedLesson?.title}</p>
                            <p className="text-xs text-slate-400 mt-1">Content editor coming soon</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen md:p-6">
            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-2 items-start">

                {/* ⭐ LEFT PANEL - STICKY/FIXED */}
                <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-6 lg:self-start">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden max-h-[calc(100vh-48px)] flex flex-col thin-scrollbar">

                        {/* Module Header */}
                        <div className="p-4 border-b border-slate-100 flex-shrink-0">
                            <div className="flex gap-4">
                                {/* Module Thumbnail */}
                                <div className="w-20 h-20 flex-shrink-0">
                                    <img
                                        src={currentModule.thumbnail || "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"}
                                        alt="Module Thumbnail"
                                        className="w-full h-full rounded-lg object-cover shadow-sm"
                                    />
                                </div>

                                <div className="flex flex-col flex-1 min-w-0">
                                    {/* Module Title Section */}
                                    <div className="mb-1">
                                        <h2 className="text-blue-600 text-base font-medium leading-tight">
                                            Module: {currentModule?.id || 1}
                                        </h2>
                                        <h3 className="text-blue-600 text-sm font-normal leading-tight truncate">
                                            {currentModule?.name || 'Explore AI applications and benefits'}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            <h6 className="text-slate-700 font-semibold text-[12px] mb-1 mt-2">
                                Module Activity
                            </h6>

                            {/* Stats Bar */}
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-600 text-xs mb-1">
                                <div className="flex items-center gap-1">
                                    <PlayCircle size={14} className="text-blue-500" />
                                    <span className="font-medium">{currentModule?.video || 0} videos</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <BookOpen size={14} className="text-green-500" />
                                    <span className="font-medium">{currentModule?.article || 0} reading</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <HelpCircle size={14} className="text-red-500" />
                                    <span className="font-medium">{currentModule?.quiz || 0} quiz</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Files size={14} className="text-amber-500" />
                                    <span className="font-medium">{currentModule?.resources || 0} resources</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageCircle size={14} className="text-purple-500" />
                                    <span className="font-medium">{currentModule?.discussion || 0} discussion</span>
                                </div>
                                {/* ✅ ADD TEAM STAT */}
                                <div className="flex items-center gap-1">
                                    <Users size={14} className="text-indigo-500" />
                                    <span className="font-medium">{currentModule?.team || 1} team</span>
                                </div>
                            </div>

                            <p className="text-rose-500 text-[12px] leading-snug">
                                You can manage module activities edit, reorder, delete, or recreate manually or via Congen AI.
                            </p>

                            {/* Progress Bar */}
                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-xs text-slate-500">Module {currentModuleIndex + 1} of {modules.length}</span>
                                <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
                                </div>
                            </div>
                        </div>

                        <div className="p-3 space-y-2 overflow-y-auto flex-1">
                            {lessons.map((lesson, idx) => (
                                <div
                                    key={lesson.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, idx)}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={(e) => handleDragOver(e, idx)}
                                    onDragLeave={handleDragLeave}
                                    onDrop={(e) => handleDrop(e, idx)}
                                    onClick={() => {
                                        setSelectedLessonIndex(idx);
                                        setEditingLessonId(null);
                                    }}
                                    className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer transition-all ${selectedLessonIndex === idx
                                        ? "border-blue-500 bg-blue-50"
                                        : "bg-gray-50 hover:bg-slate-100 border-slate-200"
                                        } ${dragOverIndex === idx && draggedIndex !== idx ? 'border-t-4 border-t-blue-500' : ''}`}
                                >
                                    <div className="flex items-center gap-2 min-w-0 flex-1">
                                        <div className="text-slate-400 flex-shrink-0 cursor-grab active:cursor-grabbing">
                                            <GripVertical size={14} />
                                        </div>

                                        {/* Title - View or Edit Mode */}
                                        {editingLessonId === lesson.id ? (
                                            <div className="flex-1 min-w-0 flex items-center gap-1">
                                                <input
                                                    type="text"
                                                    value={editingTitleText}
                                                    onChange={(e) => setEditingTitleText(e.target.value)}
                                                    className="flex-1 px-2 py-1 text-sm border border-blue-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-100 bg-white"
                                                    autoFocus
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleInlineTitleSave();
                                                    }}
                                                    className="p-1 text-green-600 hover:bg-green-50 rounded"
                                                >
                                                    <Check size={12} />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleInlineTitleCancel();
                                                    }}
                                                    className="p-1 text-slate-500 hover:bg-slate-100 rounded"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm text-slate-700 truncate">{lesson.title}</p>
                                                <p className="text-xs text-slate-500">{getTypeLabel(lesson.type)}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2 text-slate-400 flex-shrink-0">
                                        {editingLessonId !== lesson.id && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleInlineTitleEdit(lesson.id, lesson.title);
                                                }}
                                                className="p-1 hover:bg-slate-200 rounded"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                        )}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (lessons.length > 1) {
                                                    setLessons(lessons.filter((_, i) => i !== idx));
                                                    if (selectedLessonIndex === idx && idx > 0) {
                                                        setSelectedLessonIndex(idx - 1);
                                                    }
                                                }
                                            }}
                                            className="p-1 hover:bg-red-100 rounded"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Add Lesson Button */}
                            <button
                                onClick={() => setOpenAddActivity(true)}
                                className="w-full p-2 text-xs font-medium text-blue-500 flex items-center justify-center gap-1.5 hover:bg-blue-50 rounded-lg border border-dashed border-blue-300 mt-2">
                                <Plus size={14} /> Add Activity
                            </button>
                        </div>
                    </div>
                </div>

                {/* ⭐ RIGHT PANEL - SCROLLABLE */}
                <div className="col-span-12 lg:col-span-8 space-y-4">

                    {/* Top Header Bar */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-4 py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                            <button onClick={onBack} className="p-1.5 hover:bg-slate-100 rounded-lg">
                                <ArrowLeft size={16} className="text-slate-500" />
                            </button>
                            <div className="min-w-0">
                                <h2 className="font-bold text-slate-800 text-sm truncate">{formData.title}</h2>
                                <p className="text-[10px] text-slate-400">Editing: {selectedLesson?.title}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handlePreviewClick}  // ✅ Changed from setShowPreview(true)
                                className="flex items-center gap-1.5 px-3 py-1.5 border border-blue-400 text-blue-500 rounded-lg text-[11px] font-bold hover:bg-blue-50"
                            >
                                <Eye size={12} /> Preview
                            </button>
                            <button
                                onClick={handlePrevModule}
                                disabled={currentModuleIndex === 0}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold ${currentModuleIndex === 0
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    : 'border border-blue-400 text-blue-500 rounded-lg'
                                    }`}
                            >
                                <ChevronLeft size={12} />
                                Previous Module
                            </button>

                            <button
                                onClick={handleNextModule}
                                className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 hover:bg-blue-700 shadow-sm"
                            >
                                {currentModuleIndex < modules.length - 1 ? 'Next Module' : 'Finish'}
                                <ChevronRight size={12} />
                            </button>
                        </div>
                    </div>

                   
                    {renderLessonContent()}

                </div>
            </div>


            <AddActivityPopup
                isOpen={openAddActivity}
                onClose={() => setOpenAddActivity(false)}
            />
        </div>
    );
};

export default CourseActivityEditorStep;