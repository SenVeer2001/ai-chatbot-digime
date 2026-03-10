// pages/congen/CoursePreviewPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    X, ChevronRight, ChevronLeft, ChevronDown, ChevronUp,
    PlayCircle, BookOpen, MessageCircle, Files, HelpCircle,
    Circle, Youtube, Download, ExternalLink, MessageSquare,
    ThumbsUp, Clock, CheckCircle, FileText, Award, ArrowLeft,
    Home
} from "lucide-react";
import { useApp } from "../../hooks/useApp";
import Header from "../../components/layout/Header";

// ==================== MAIN PREVIEW PAGE ====================
const CoursePreviewPage = () => {
    const navigate = useNavigate();
    const { user } = useApp();

    const [showFullTranscript, setShowFullTranscript] = useState(false);
    const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
    const [previewData, setPreviewData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load preview data from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem('congen_preview_data');
            if (saved) {
                const data = JSON.parse(saved);
                setPreviewData(data);
                setSelectedLessonIndex(data.selectedLessonIndex || 0);
            }
        } catch (e) {
            console.error('Error loading preview data:', e);
        }
        setLoading(false);
    }, []);

    // If no data, redirect back
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading preview...</p>
                </div>
            </div>
        );
    }

    if (!previewData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText size={32} className="text-slate-400" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">No Preview Data</h2>
                    <p className="text-slate-500 mb-6">Please go back to the editor to preview your course.</p>
                    <button
                        onClick={() => navigate('/congen/create?step=4')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                    >
                        Back to Editor
                    </button>
                </div>
            </div>
        );
    }

    const { formData, lessons, currentModule, currentYoutubeId, transcriptMain, transcriptReadMore } = previewData;
    const selectedLesson = lessons[selectedLessonIndex] || lessons[0];

    const getIcon = (type) => {
        const icons = {
            video: <PlayCircle size={14} className="text-blue-500" />,
            article: <BookOpen size={14} className="text-green-500" />,
            discussion: <MessageCircle size={14} className="text-purple-500" />,
            resources: <Files size={14} className="text-amber-500" />,
            quiz: <HelpCircle size={14} className="text-red-500" />
        };
        return icons[type] || <Circle size={14} />;
    };

    const getTypeLabel = (type) => {
        const labels = {
            video: 'Watch 3 min',
            article: 'Read 2 min',
            discussion: 'Discussion',
            resources: 'Resources',
            quiz: 'Quiz 5 min'
        };
        return labels[type] || type;
    };

    const handlePrevLesson = () => {
        if (selectedLessonIndex > 0) {
            setSelectedLessonIndex(selectedLessonIndex - 1);
        }
    };

    const handleNextLesson = () => {
        if (selectedLessonIndex < lessons.length - 1) {
            setSelectedLessonIndex(selectedLessonIndex + 1);
        }
    };

    const handleBackToEditor = () => {
        navigate('/congen/create?step=4');
    };

    // Render content based on lesson type
    const renderLessonContent = () => {
        if (!selectedLesson) return null;

        switch (selectedLesson.type) {
            case 'video':
                return (
                    <>
                        {/* VIDEO PREVIEW */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="flex justify-between items-center border-b border-slate-100 p-3 bg-slate-50/50">
                                <p className="font-medium text-sm text-slate-700 flex items-center gap-2">
                                    <Youtube size={16} className="text-red-500" />
                                    Video
                                </p>
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                    <Clock size={12} /> 3 min
                                </span>
                            </div>

                            <div className="p-4">
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
                            </div>
                        </div>

                        {/* TRANSCRIPT PREVIEW */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="flex justify-between items-center border-b border-slate-100 p-3 bg-slate-50/50">
                                <p className="font-medium text-sm text-slate-700 flex items-center gap-2">
                                    <FileText size={16} className="text-slate-500" />
                                    Transcript
                                </p>
                            </div>

                            <div className="p-4">
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {transcriptMain}
                                </p>

                                {transcriptReadMore && (
                                    <>
                                        <button
                                            onClick={() => setShowFullTranscript(!showFullTranscript)}
                                            className="mt-3 text-blue-500 text-sm font-medium flex items-center gap-1 hover:text-blue-600"
                                        >
                                            {showFullTranscript ? 'Show Less' : 'Read More'}
                                            {showFullTranscript ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                        </button>

                                        {showFullTranscript && (
                                            <p className="text-sm text-slate-600 leading-relaxed mt-3 pt-3 border-t border-slate-100">
                                                {transcriptReadMore}
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                );

            case 'article':
                return <ArticlePreview lesson={selectedLesson} />;

            case 'discussion':
                return <DiscussionPreview lesson={selectedLesson} />;

            case 'quiz':
                return <QuizPreview lesson={selectedLesson} />;

            case 'resources':
                return <ResourcesPreview lesson={selectedLesson} />;

            default:
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="flex justify-between items-center border-b border-slate-100 p-3 bg-slate-50/50">
                            <p className="font-medium text-sm text-slate-700 flex items-center gap-2">
                                {getIcon(selectedLesson?.type)}
                                <span className="capitalize">{selectedLesson?.type}</span>
                            </p>
                        </div>
                        <div className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
                            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                                {getIcon(selectedLesson?.type)}
                            </div>
                            <p className="text-sm font-medium text-slate-600">{selectedLesson?.title}</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen ">
            {/* Header */}
            <Header user={user} title="ConGen™" />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-12 gap-2">

                {/* LEFT PANEL - Course Navigation */}
                <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden max-h-[calc(100vh-50px)] flex flex-col thin-scrollbar">

                        {/* Module Info */}
                        <div className="p-4 border-b border-slate-100 flex-shrink-0">
                            <div className="flex gap-4">
                                <div className="w-20 h-20 flex-shrink-0">
                                    <img
                                        src={currentModule?.thumbnail || "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"}
                                        alt="Module Thumbnail"
                                        className="w-full h-full rounded-lg object-cover shadow-sm"
                                    />
                                </div>

                                <div className="flex flex-col flex-1 min-w-0">
                                    <div className="mb-1">
                                        <h2 className="text-blue-600 text-base font-medium leading-tight">
                                            Module: {currentModule?.id || 1}
                                        </h2>
                                        <h3 className="text-slate-700 text-sm font-normal leading-tight truncate">
                                            {currentModule?.name || 'Explore AI applications'}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Bar */}
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-600 text-xs mt-3">
                                <div className="flex items-center gap-1">
                                    <PlayCircle size={14} className="text-blue-500" />
                                    <span>{currentModule?.video || 0} videos</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <BookOpen size={14} className="text-green-500" />
                                    <span>{currentModule?.article || 0} reading</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <HelpCircle size={14} className="text-red-500" />
                                    <span>{currentModule?.quiz || 0} quiz</span>
                                </div>
                            </div>

                            {/* Progress */}
                            <div className="mt-3 flex items-center gap-3">
                                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 rounded-full transition-all"
                                        style={{ width: `${((selectedLessonIndex + 1) / lessons.length) * 100}%` }}
                                    />
                                </div>
                                <span className="text-xs text-slate-500 font-medium">
                                    {selectedLessonIndex + 1}/{lessons.length}
                                </span>
                            </div>
                        </div>

                        {/* Lesson List - Read Only */}
                        <div className="p-3 space-y-2 overflow-y-auto flex-1">
                            {lessons.map((lesson, idx) => (
                                <div
                                    key={lesson.id}
                                    onClick={() => setSelectedLessonIndex(idx)}
                                    className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer transition-all ${selectedLessonIndex === idx
                                        ? "border-blue-500 bg-blue-50"
                                        : "bg-gray-50 hover:bg-slate-100 border-slate-200"
                                        }`}
                                >
                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                        {/* Completion indicator */}
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${idx < selectedLessonIndex
                                            ? 'bg-green-100 text-green-600'
                                            : idx === selectedLessonIndex
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-slate-100 text-slate-400'
                                            }`}>
                                            {idx < selectedLessonIndex ? (
                                                <CheckCircle size={14} />
                                            ) : (
                                                <span className="text-xs font-medium">{idx + 1}</span>
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-slate-700 truncate">{lesson.title}</p>
                                            <p className="text-xs text-slate-500 flex items-center gap-1">
                                                {getIcon(lesson.type)}
                                                {getTypeLabel(lesson.type)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL - Content */}
                <div className="col-span-12 lg:col-span-8 space-y-4">

                    {/* Lesson Header */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-4 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    {getIcon(selectedLesson?.type)}
                                </div>
                                <div className="min-w-0">
                                    <h2 className="font-bold text-slate-800 text-base truncate">
                                        {selectedLesson?.title}
                                    </h2>
                                    <p className="text-xs text-slate-500 flex items-center gap-2">
                                        <span className="capitalize">{selectedLesson?.type}</span>
                                        <span>•</span>
                                        <span>Lesson {selectedLessonIndex + 1} of {lessons.length}</span>
                                    </p>
                                </div>
                            </div>


                              <button
                        onClick={handleBackToEditor}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Editor
                    </button>

                          
                        </div>
                    </div>

                    {/* Dynamic Content */}
                    {renderLessonContent()}

                    {/* Complete Lesson Button */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                        <button
                            onClick={handleNextLesson}
                            disabled={selectedLessonIndex === lessons.length - 1}
                            className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-slate-300 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                        >
                            {selectedLessonIndex === lessons.length - 1 ? (
                                <>
                                    <Award size={18} />
                                    Complete Module
                                </>
                            ) : (
                                <>
                                    <CheckCircle size={18} />
                                    Mark Complete & Continue
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ============================================
// PREVIEW COMPONENTS (Read-Only)
// ============================================

// Article Preview
const ArticlePreview = ({ lesson }) => {
    const articleContent = lesson?.content || {
        introduction: "Artificial Intelligence (AI) is revolutionizing the way we live and work. From smart assistants to autonomous vehicles, AI technologies are becoming an integral part of our daily lives.",
        sections: [
            {
                title: "What is AI?",
                content: "AI refers to computer systems designed to perform tasks that typically require human intelligence. These include learning, reasoning, problem-solving, and understanding natural language."
            },
            {
                title: "Applications of AI",
                content: "AI is being used across various industries including healthcare for diagnosis, finance for fraud detection, transportation for self-driving cars, and entertainment for personalized recommendations."
            },
            {
                title: "Future of AI",
                content: "As AI continues to evolve, we can expect more sophisticated applications that will transform industries and create new opportunities for innovation and growth."
            }
        ]
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex justify-between items-center border-b border-slate-100 p-3 bg-slate-50/50">
                <p className="font-medium text-sm text-slate-700 flex items-center gap-2">
                    <BookOpen size={16} className="text-green-500" />
                    Article
                </p>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12} /> 2 min read
                </span>
            </div>

            <div className="p-6 space-y-6">
                <p className="text-slate-600 leading-relaxed text-base">
                    {articleContent.introduction}
                </p>

                {articleContent.sections?.map((section, idx) => (
                    <div key={idx} className="space-y-2">
                        <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{section.content}</p>
                    </div>
                ))}

                <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-sm text-slate-500">
                        <span>Reading progress</span>
                        <span>100%</span>
                    </div>
                    <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Discussion Preview
const DiscussionPreview = ({ lesson }) => {
    const discussion = lesson?.discussion || {
        prompt: "How do you think AI will impact healthcare in the next 10 years? Share your thoughts and experiences.",
        guidelines: [
            "Be respectful and constructive",
            "Support your arguments with examples",
            "Engage with other participants' ideas"
        ]
    };

    const sampleComments = [
        {
            id: 1,
            author: "Sarah Johnson",
            avatar: "SJ",
            time: "2 hours ago",
            content: "I believe AI will revolutionize early disease detection. Machine learning algorithms can analyze medical images with incredible accuracy.",
            likes: 12
        },
        {
            id: 2,
            author: "Michael Chen",
            avatar: "MC",
            time: "1 hour ago",
            content: "Great point Sarah! I'd add that AI-powered chatbots will make healthcare more accessible, especially in remote areas.",
            likes: 8
        }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex justify-between items-center border-b border-slate-100 p-3 bg-slate-50/50">
                <p className="font-medium text-sm text-slate-700 flex items-center gap-2">
                    <MessageCircle size={16} className="text-purple-500" />
                    Discussion
                </p>
                <span className="text-xs text-slate-400">{sampleComments.length} responses</span>
            </div>

            <div className="p-6 space-y-6">
                <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-900 mb-2">Discussion Topic</h3>
                    <p className="text-purple-800">{discussion.prompt}</p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-medium text-slate-700 mb-2 text-sm">Discussion Guidelines</h4>
                    <ul className="space-y-1">
                        {discussion.guidelines.map((guideline, idx) => (
                            <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                                <CheckCircle size={12} className="text-green-500" />
                                {guideline}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="font-medium text-slate-700">Recent Responses</h4>
                    {sampleComments.map((comment) => (
                        <div key={comment.id} className="border border-slate-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                                    {comment.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium text-slate-800 text-sm">{comment.author}</span>
                                        <span className="text-xs text-slate-400">{comment.time}</span>
                                    </div>
                                    <p className="text-slate-600 text-sm">{comment.content}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <button className="text-xs text-slate-500 flex items-center gap-1 hover:text-blue-500">
                                            <ThumbsUp size={12} /> {comment.likes}
                                        </button>
                                        <button className="text-xs text-slate-500 flex items-center gap-1 hover:text-blue-500">
                                            <MessageSquare size={12} /> Reply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                    <textarea
                        placeholder="Share your thoughts..."
                        className="w-full border border-slate-200 rounded-lg p-3 text-sm resize-none bg-white"
                        rows={3}
                        disabled
                    />
                    <div className="flex justify-end mt-3">
                        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium opacity-50 cursor-not-allowed">
                            Post Comment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Quiz Preview
const QuizPreview = ({ lesson }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const quiz = lesson?.quiz || {
        questions: [
            {
                id: 1,
                question: "What does AI stand for?",
                options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Algorithmic Interface"],
                correct: 1
            },
            {
                id: 2,
                question: "Which of the following is an application of AI?",
                options: ["Word Processing", "Spreadsheets", "Voice Assistants", "Web Browsers"],
                correct: 2
            },
            {
                id: 3,
                question: "What is machine learning?",
                options: [
                    "A type of hardware",
                    "A subset of AI that learns from data",
                    "A programming language",
                    "A database system"
                ],
                correct: 1
            }
        ]
    };

    const handleSelectAnswer = (questionId, optionIndex) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex
        }));
    };

    const calculateScore = () => {
        let correct = 0;
        quiz.questions.forEach(q => {
            if (selectedAnswers[q.id] === q.correct) {
                correct++;
            }
        });
        return correct;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex justify-between items-center border-b border-slate-100 p-3 bg-slate-50/50">
                <p className="font-medium text-sm text-slate-700 flex items-center gap-2">
                    <HelpCircle size={16} className="text-red-500" />
                    Quiz
                </p>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12} /> {quiz.questions.length} questions
                </span>
            </div>

            <div className="p-6 space-y-6">
                {!showResults ? (
                    <>
                        {quiz.questions.map((q, qIdx) => (
                            <div key={q.id} className="border border-slate-200 rounded-lg p-4">
                                <p className="font-medium text-slate-800 mb-3">
                                    {qIdx + 1}. {q.question}
                                </p>
                                <div className="space-y-2">
                                    {q.options.map((option, oIdx) => (
                                        <label
                                            key={oIdx}
                                            className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${selectedAnswers[q.id] === oIdx
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name={`question-${q.id}`}
                                                checked={selectedAnswers[q.id] === oIdx}
                                                onChange={() => handleSelectAnswer(q.id, oIdx)}
                                                className="text-blue-500"
                                            />
                                            <span className="text-sm text-slate-700">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={() => setShowResults(true)}
                            disabled={Object.keys(selectedAnswers).length < quiz.questions.length}
                            className="w-full py-3 bg-red-500 hover:bg-red-600 disabled:bg-slate-300 text-white rounded-lg font-medium transition-colors"
                        >
                            Submit Quiz
                        </button>
                    </>
                ) : (
                    <>
                        <div className="text-center py-6">
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                <Award size={40} className="text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">
                                {calculateScore()} / {quiz.questions.length}
                            </h3>
                            <p className="text-slate-500 mt-1">Questions Correct</p>

                            <div className="mt-6 h-3 bg-slate-200 rounded-full overflow-hidden max-w-xs mx-auto">
                                <div
                                    className="h-full bg-green-500 rounded-full transition-all"
                                    style={{ width: `${(calculateScore() / quiz.questions.length) * 100}%` }}
                                />
                            </div>

                            <p className="text-sm text-slate-600 mt-4">
                                {calculateScore() === quiz.questions.length
                                    ? "Perfect score! 🎉"
                                    : calculateScore() >= quiz.questions.length / 2
                                        ? "Good job! Keep learning!"
                                        : "Keep practicing!"}
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                setShowResults(false);
                                setSelectedAnswers({});
                            }}
                            className="w-full py-3 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
                        >
                            Retry Quiz
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

// Resources Preview
const ResourcesPreview = ({ lesson }) => {
    const resources = lesson?.resources || [
        { id: 1, title: "AI Fundamentals Guide", type: "pdf", size: "2.4 MB", icon: "📄" },
        { id: 2, title: "Machine Learning Cheat Sheet", type: "pdf", size: "1.1 MB", icon: "📄" },
        { id: 3, title: "Supplementary Video Materials", type: "link", url: "https://example.com", icon: "🔗" },
        { id: 4, title: "Dataset for Practice", type: "zip", size: "15.8 MB", icon: "📦" }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex justify-between items-center border-b border-slate-100 p-3 bg-slate-50/50">
                <p className="font-medium text-sm text-slate-700 flex items-center gap-2">
                    <Files size={16} className="text-amber-500" />
                    Resources
                </p>
                <span className="text-xs text-slate-400">{resources.length} files</span>
            </div>

            <div className="p-6 space-y-3">
                <p className="text-sm text-slate-600 mb-4">
                    Download these supplementary materials to enhance your learning experience.
                </p>

                {resources.map((resource) => (
                    <div
                        key={resource.id}
                        className="flex items-center justify-between border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{resource.icon}</span>
                            <div>
                                <p className="font-medium text-slate-700 text-sm">{resource.title}</p>
                                <p className="text-xs text-slate-400 uppercase">
                                    {resource.type} {resource.size && `• ${resource.size}`}
                                </p>
                            </div>
                        </div>

                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                            {resource.type === 'link' ? (
                                <ExternalLink size={18} />
                            ) : (
                                <Download size={18} />
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoursePreviewPage;