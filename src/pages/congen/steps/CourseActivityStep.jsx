// CourseActivityStep.jsx
import React, { useState } from 'react';
import {
    ChevronDown, ChevronUp, Video, BookOpen, FileText, MessageCircle,
    PlayCircle, CheckSquare, Calendar, Users, Award, Clock, Layers,
    ArrowLeft, ArrowRight, SkipForward, Check, Edit3, RefreshCw, Files,
    DollarSign  // ⭐ ADD THIS - THIS WAS MISSING!
} from 'lucide-react';
import CoursePriceModal from '../CoursePriceModal';

// ==================== COURSE ACTIVITY STEP ====================
export const CourseActivityStep = ({ formData, setFormData, onNext, onBack }) => {
    const modules = formData.modules || [];
    const [openModule, setOpenModule] = useState(modules[0]?.id || 1);

    // Modal State
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [savedPriceData, setSavedPriceData] = useState(null);

    // Handle save from modal
    const handleSavePriceData = (data) => {

        setSavedPriceData(data);
    };

    // Format date for display
    const formatDate = (dateStr) => {
        if (!dateStr) return 'Not Set';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    // Get course type label
    const getCourseTypeLabel = () => {
        if (!savedPriceData?.courseType) return 'Not Set';
        const labels = {
            'individual': 'Individual Course',
            'group': 'Group Course',
            'both': 'Individual + Group'
        };
        return labels[savedPriceData.courseType] || 'Not Set';
    };

    const toggleModule = (id) => {
        setOpenModule(openModule === id ? null : id);
    };

    // Module descriptions for expanded view
    const getModuleDescription = (mod) => {
        const descriptions = {
            1: "You will learn how the program is structured, what project management is and what a project manager does, how to apply your skills from previous work experience to project management roles.",
            2: "This module covers the ethical considerations and potential risks associated with AI implementation. You'll explore real-world case studies and learn frameworks for responsible AI development.",
            3: "Explore practical applications of AI across various industries. Learn to identify opportunities where AI can create value and understand implementation strategies.",
        };
        return descriptions[mod.id] || `This module covers ${mod.name}. You will gain comprehensive understanding of the concepts and practical skills needed to apply them in real-world scenarios.`;
    };

    return (
        <div className="p-4 md:p-6">

            {/* ⭐ MODAL - Place at top */}
            <CoursePriceModal
                isOpen={showPriceModal}
                onClose={() => setShowPriceModal(false)}
                onSave={handleSavePriceData}
                initialData={savedPriceData}
            />


            <div className="bg-gradient-to-r from-blue-200 to-blue-300 rounded-2xl p-4 md:p-6 mb-6 shadow-sm">

                {/* Top Row */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                        <h2 className="text-lg md:text-xl font-semibold text-slate-800">
                            Course : {formData.title || 'Learn AI With Prof. Dutta'}
                        </h2>

                        <div className="flex items-center gap-3 mt-3">
                            <img
                                src="/teacher.jpg"
                                alt="Creator"
                                className="w-12 h-12 rounded-lg object-cover bg-blue-400"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                                {'GS'}
                            </div>
                            <div>
                                <p className="font-medium text-sm text-slate-800">Gajendra Singh</p>
                                <p className="text-xs text-slate-600">Creator</p>
                            </div>
                        </div>
                    </div>

                    {/* ⭐ SET COURSE PRICE BUTTON */}
                    <button
                        type="button"
                        onClick={() => {
                            console.log('Button clicked!'); // Debug
                            setShowPriceModal(true);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
                    >
                        {/* <DollarSign size={16} /> */}
                        {savedPriceData ? 'Edit Course Price' : 'Set Course Price'}
                    </button>
                </div>

                <hr className="my-4 border-blue-300/50" />

                {/* Badge */}
                <span className={`text-white text-xs font-bold px-3 py-1 rounded-md inline-block ${savedPriceData ? 'bg-blue-500' : 'bg-slate-400'
                    }`}>
                    Publish As : {getCourseTypeLabel()}
                </span>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 mt-5 text-sm gap-6">

                    {/* Registration */}
                    <div className="space-y-1">
                        <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                            <Calendar size={14} /> Registration
                        </p>
                        <p className="text-slate-700">
                            Start : {savedPriceData ? formatDate(savedPriceData.groupRegStart) : '01 Mar 2026'}
                        </p>
                        <p className="text-slate-700">
                            End : {savedPriceData ? formatDate(savedPriceData.groupRegEnd) : '15 Mar 2026'}
                        </p>
                        <p className="text-slate-700">
                            Batch No : {savedPriceData?.batchNo || 'IGS001'}
                        </p>

                        <p className="text-slate-800 font-medium">
                            Duration : {savedPriceData?.duration || `${modules.length} Weeks`}
                        </p>
                    </div>

                    {/* Fees */}
                    <div className="space-y-1">
                        <p className="text-slate-700">
                            Course Fees : <span className="line-through text-slate-400">
                                ${savedPriceData?.courseFees || 100}
                            </span>
                        </p>
                        <p className="text-slate-700">
                            Discount : <span className="text-green-600">
                                ${savedPriceData?.discount || 10}
                            </span>
                        </p>
                        <p className="text-slate-900 font-bold text-lg">
                            Payable Fees : ${savedPriceData?.finalPrice || 90}
                        </p>
                    </div>

                    {/* Batch */}
                    <div className="space-y-1">
                        <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                            <Users size={14} /> Batch
                        </p>
                        <p className="text-slate-700">
                            Start : {savedPriceData ? formatDate(savedPriceData.batchStart) : '01 Mar 2026'}
                        </p>
                        <p className="text-slate-700">
                            End : {savedPriceData ? formatDate(savedPriceData.batchEnd) : '15 Mar 2026'}
                        </p>
                        <p className="text-slate-800 font-medium flex items-center gap-1.5">
                            <Award size={14} className="text-amber-500" />
                            Certificate : {savedPriceData?.certificate ? 'Provided' : 'Not Provided'}
                        </p>
                    </div>
                </div>
            </div>


            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 mb-6">

                {modules.map((mod, idx) => (
                    <div key={mod.id} className={idx !== modules.length - 1 ? 'border-b border-slate-100' : ''}>

                        {/* Module Header - Clickable */}
                        <div
                            onClick={() => toggleModule(mod.id)}
                            className={`flex justify-between items-center p-4 cursor-pointer transition-colors ${openModule === mod.id ? 'bg-blue-50' : 'hover:bg-slate-50'
                                }`}
                        >
                            <div className="flex gap-4 items-center">
                                {/* Thumbnail */}
                                <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                    {mod.thumbnail ? (
                                        <img src={mod.thumbnail} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-xl font-bold text-blue-500">{mod.id}</span>
                                    )}
                                </div>

                                <div>
                                    {/* Module Title */}
                                    <div className="flex justify-between w-full items-center text-sm font-medium">

                                        {/* <span className="text-blue-600">Module: {mod.id}</span> */}
                                        <span className="text-slate-800 ">{mod.name}</span>

                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className="border border-slate-300 text-slate-600 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-slate-100 transition-colors flex items-center gap-2"
                                        >
                                            <Edit3 size={14} />
                                            Edit
                                        </button>
                                    </div>

                                    {/* What's Included */}
                                    <p className="text-xs text-slate-500 mt-1">What's included</p>

                                    {/* Stats */}
                                    <div className="flex flex-wrap gap-3 text-xs mt-1 text-slate-600">
                                        <span className="flex items-center gap-1">
                                            <Video size={12} className="text-blue-500" /> {mod.video} videos
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <BookOpen size={12} className="text-green-500" /> {mod.article} readings
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FileText size={12} className="text-purple-500" /> {mod.quiz} quiz
                                        </span>
                                        {mod.discussion > 0 && (
                                            <span className="flex items-center gap-1">
                                                <MessageCircle size={12} className="text-amber-500" /> {mod.discussion} discussion
                                            </span>
                                        )}
                                        {mod.resources > 0 && (
                                            <span className="flex items-center gap-1">
                                                <Files size={12} className="text-cyan-500" /> {mod.resources} resources
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Chevron */}
                            <div className="flex-shrink-0 text-slate-400">
                                {openModule === mod.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                        </div>

                        {/* Dropdown Content - Expanded */}
                        {openModule === mod.id && (
                            <div className="p-6 bg-slate-50 border-t border-slate-100">

                                {/* Module Overview */}
                                <h3 className="font-semibold text-slate-800 mb-2">Module Overview</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {getModuleDescription(mod)}
                                </p>

                                {/* Action Row */}
                                <div className="mt-5 flex flex-col md:flex-row items-start md:items-center gap-4">

                                    {/* Buttons */}
                                    <div className="flex items-center gap-3">
                                        <button onClick={onNext} className="border border-blue-500 text-blue-600 px-4 py-2 rounded-full text-xs font-medium hover:bg-blue-50 transition-colors flex items-center gap-2">
                                            Update Module Activity
                                        </button>
                                    </div>

                                    {/* Warning Text */}
                                    <p className="text-red-500 text-xs max-w-6xl leading-relaxed">
                                        "On the next screen, ConGen will generate all module activities such as Articles, Quizzes, Videos, etc.
                                        You can review, edit, re-order and re-write them using AI."
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>


            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={onBack}
                    className="flex-1 py-3 text-sm border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                    <ArrowLeft size={16} />
                    Back
                </button>

                <button onClick={onNext} className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-green-100 hover:scale-[1.02] transition-all flex items-center justify-center gap-2" > <Check size={16} /> Publish Course </button>
            </div>

        </div>
    );
};

export default CourseActivityStep;