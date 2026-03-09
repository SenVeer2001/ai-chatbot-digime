// components/editors/QuizEditor.jsx
import { useState } from 'react';
import { 
    HelpCircle, Pencil, Save, X, Plus, Trash2, Check, 
    GripVertical, Sparkles, Clock, Award, ChevronDown, 
    ChevronUp, Copy
} from 'lucide-react';

const QuizEditor = ({ lesson, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [expandedQuestion, setExpandedQuestion] = useState(0);
    const [showAddQuestion, setShowAddQuestion] = useState(false);
    
    const [quizData, setQuizData] = useState({
        title: lesson?.title || 'Module Quiz',
        description: lesson?.description || 'Test your understanding of the concepts covered in this module.',
        timeLimit: lesson?.timeLimit || 10,
        passingScore: lesson?.passingScore || 70,
        questions: lesson?.questions || [
            {
                id: 1,
                question: 'What is Artificial Intelligence?',
                options: [
                    'A type of computer hardware',
                    'Simulation of human intelligence by machines',
                    'A programming language',
                    'A database management system'
                ],
                correctAnswer: 1,
                explanation: 'AI refers to the simulation of human intelligence in machines.'
            },
            {
                id: 2,
                question: 'Which of the following is a type of Machine Learning?',
                options: [
                    'Supervised Learning',
                    'Manual Learning',
                    'Static Learning',
                    'Fixed Learning'
                ],
                correctAnswer: 0,
                explanation: 'Supervised Learning is one of the main types of ML.'
            }
        ]
    });

    const [tempData, setTempData] = useState({ ...quizData });
    const [newQuestion, setNewQuestion] = useState({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
    });

    const handleEdit = () => {
        setTempData(JSON.parse(JSON.stringify(quizData)));
        setIsEditing(true);
    };

    const handleSave = () => {
        setQuizData({ ...tempData });
        onUpdate?.({ ...lesson, ...tempData });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempData(JSON.parse(JSON.stringify(quizData)));
        setIsEditing(false);
        setShowAddQuestion(false);
    };

    const updateQuestion = (qIndex, field, value) => {
        const updated = [...tempData.questions];
        updated[qIndex] = { ...updated[qIndex], [field]: value };
        setTempData({ ...tempData, questions: updated });
    };

    const updateOption = (qIndex, optIndex, value) => {
        const updated = [...tempData.questions];
        updated[qIndex].options[optIndex] = value;
        setTempData({ ...tempData, questions: updated });
    };

    const setCorrectAnswer = (qIndex, optIndex) => {
        const updated = [...tempData.questions];
        updated[qIndex].correctAnswer = optIndex;
        setTempData({ ...tempData, questions: updated });
    };

    const deleteQuestion = (qIndex) => {
        if (tempData.questions.length > 1) {
            const updated = tempData.questions.filter((_, i) => i !== qIndex);
            setTempData({ ...tempData, questions: updated });
        }
    };

    const duplicateQuestion = (qIndex) => {
        const newQ = { ...JSON.parse(JSON.stringify(tempData.questions[qIndex])), id: Date.now() };
        const updated = [...tempData.questions];
        updated.splice(qIndex + 1, 0, newQ);
        setTempData({ ...tempData, questions: updated });
    };

    const addNewQuestion = () => {
        if (newQuestion.question.trim() && newQuestion.options.every(opt => opt.trim())) {
            const updated = [...tempData.questions, { ...newQuestion, id: Date.now() }];
            setTempData({ ...tempData, questions: updated });
            setNewQuestion({ question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' });
            setShowAddQuestion(false);
            setExpandedQuestion(updated.length - 1);
        }
    };

    const moveQuestion = (fromIndex, direction) => {
        const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
        if (toIndex < 0 || toIndex >= tempData.questions.length) return;
        const updated = [...tempData.questions];
        [updated[fromIndex], updated[toIndex]] = [updated[toIndex], updated[fromIndex]];
        setTempData({ ...tempData, questions: updated });
        setExpandedQuestion(toIndex);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-100 p-3 bg-gradient-to-r from-red-50 to-orange-50">
                <p className="font-medium text-sm text-slate-700 flex items-center gap-2">
                    <HelpCircle size={16} className="text-red-500" />
                    Quiz / Assessment
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                        {quizData.questions.length} Questions
                    </span>
                    {!isEditing && (
                        <button onClick={handleEdit} className="p-1.5 hover:bg-white/50 rounded-md text-slate-500 hover:text-red-600">
                            <Pencil size={14} />
                        </button>
                    )}
                </div>
            </div>

            <div className="p-4 space-y-4">
                {/* VIEW MODE */}
                {!isEditing ? (
                    <>
                        {/* Quiz Info */}
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-800 mb-1">{quizData.title}</h3>
                            <p className="text-sm text-slate-500 mb-3">{quizData.description}</p>
                            <div className="flex flex-wrap gap-4 text-xs">
                                <div className="flex items-center gap-1 text-slate-600">
                                    <Clock size={12} className="text-blue-500" />
                                    <span>{quizData.timeLimit} min</span>
                                </div>
                                <div className="flex items-center gap-1 text-slate-600">
                                    <Award size={12} className="text-green-500" />
                                    <span>Pass: {quizData.passingScore}%</span>
                                </div>
                                <div className="flex items-center gap-1 text-slate-600">
                                    <HelpCircle size={12} className="text-red-500" />
                                    <span>{quizData.questions.length} Questions</span>
                                </div>
                            </div>
                        </div>

                        {/* Questions Preview */}
                        <div className="space-y-3">
                            {quizData.questions.map((q, qIndex) => (
                                <div key={q.id} className="border border-slate-200 rounded-lg overflow-hidden">
                                    <div 
                                        className="p-3 bg-slate-50 flex items-center justify-between cursor-pointer hover:bg-slate-100"
                                        onClick={() => setExpandedQuestion(expandedQuestion === qIndex ? -1 : qIndex)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">
                                                {qIndex + 1}
                                            </span>
                                            <p className="text-sm font-medium text-slate-700 line-clamp-1">{q.question}</p>
                                        </div>
                                        {expandedQuestion === qIndex ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </div>
                                    
                                    {expandedQuestion === qIndex && (
                                        <div className="p-4 space-y-2 border-t border-slate-100">
                                            {q.options.map((opt, optIndex) => (
                                                <div 
                                                    key={optIndex}
                                                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                                                        q.correctAnswer === optIndex 
                                                            ? 'bg-green-50 border-green-300' 
                                                            : 'bg-white border-slate-200'
                                                    }`}
                                                >
                                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                                        q.correctAnswer === optIndex 
                                                            ? 'bg-green-500 text-white' 
                                                            : 'bg-slate-200 text-slate-600'
                                                    }`}>
                                                        {String.fromCharCode(65 + optIndex)}
                                                    </span>
                                                    <span className="text-sm text-slate-700">{opt}</span>
                                                    {q.correctAnswer === optIndex && <Check size={14} className="ml-auto text-green-600" />}
                                                </div>
                                            ))}
                                            
                                            {q.explanation && (
                                                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                                    <p className="text-xs font-semibold text-blue-700 mb-1">💡 Explanation</p>
                                                    <p className="text-xs text-blue-600">{q.explanation}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    /* EDIT MODE */
                    <>
                        {/* Quiz Settings */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div>
                                <label className="text-xs font-medium text-slate-600 mb-1 block">Quiz Title</label>
                                <input
                                    type="text"
                                    value={tempData.title}
                                    onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
                                    className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:border-red-400 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-600 mb-1 block">Time Limit (min)</label>
                                <input
                                    type="number"
                                    value={tempData.timeLimit}
                                    onChange={(e) => setTempData({ ...tempData, timeLimit: parseInt(e.target.value) || 0 })}
                                    className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:border-red-400 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-600 mb-1 block">Passing Score (%)</label>
                                <input
                                    type="number"
                                    value={tempData.passingScore}
                                    onChange={(e) => setTempData({ ...tempData, passingScore: parseInt(e.target.value) || 0 })}
                                    className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:border-red-400 outline-none"
                                />
                            </div>
                            <div className="flex items-end">
                                <span className="text-xs text-slate-500">{tempData.questions.length} questions</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-1 block">Description</label>
                            <textarea
                                value={tempData.description}
                                onChange={(e) => setTempData({ ...tempData, description: e.target.value })}
                                rows={2}
                                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-red-400 outline-none resize-none"
                            />
                        </div>

                        {/* Questions Header */}
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-slate-700">Questions ({tempData.questions.length})</h4>
                            <button
                                onClick={() => setShowAddQuestion(true)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600"
                            >
                                <Plus size={12} /> Add Question
                            </button>
                        </div>

                        {/* Question Cards */}
                        {tempData.questions.map((q, qIndex) => (
                            <div key={q.id} className={`border rounded-xl overflow-hidden ${expandedQuestion === qIndex ? 'border-red-300 shadow-md' : 'border-slate-200'}`}>
                                <div 
                                    className={`p-3 flex items-center gap-3 cursor-pointer ${expandedQuestion === qIndex ? 'bg-red-50' : 'bg-slate-50 hover:bg-slate-100'}`}
                                    onClick={() => setExpandedQuestion(expandedQuestion === qIndex ? -1 : qIndex)}
                                >
                                    <GripVertical size={14} className="text-slate-400" />
                                    <span className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">
                                        Q{qIndex + 1}
                                    </span>
                                    <p className="flex-1 text-sm font-medium text-slate-700 line-clamp-1">
                                        {q.question || 'Untitled Question'}
                                    </p>
                                    
                                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                        <button onClick={() => moveQuestion(qIndex, 'up')} disabled={qIndex === 0} className="p-1 hover:bg-white rounded text-slate-400 disabled:opacity-30">
                                            <ChevronUp size={14} />
                                        </button>
                                        <button onClick={() => moveQuestion(qIndex, 'down')} disabled={qIndex === tempData.questions.length - 1} className="p-1 hover:bg-white rounded text-slate-400 disabled:opacity-30">
                                            <ChevronDown size={14} />
                                        </button>
                                        <button onClick={() => duplicateQuestion(qIndex)} className="p-1 hover:bg-white rounded text-slate-400 hover:text-blue-500">
                                            <Copy size={14} />
                                        </button>
                                        <button onClick={() => deleteQuestion(qIndex)} className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-500" disabled={tempData.questions.length <= 1}>
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                    
                                    {expandedQuestion === qIndex ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </div>

                                {expandedQuestion === qIndex && (
                                    <div className="p-4 space-y-4 border-t border-slate-100 bg-white">
                                        <div>
                                            <label className="text-xs font-medium text-slate-600 mb-1 block">Question</label>
                                            <textarea
                                                value={q.question}
                                                onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                                                rows={2}
                                                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-red-400 outline-none resize-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-xs font-medium text-slate-600 mb-2 block">
                                                Options <span className="text-green-600">(Click to mark correct)</span>
                                            </label>
                                            <div className="space-y-2">
                                                {q.options.map((opt, optIndex) => (
                                                    <div 
                                                        key={optIndex}
                                                        onClick={() => setCorrectAnswer(qIndex, optIndex)}
                                                        className={`flex items-center gap-2 p-2 rounded-lg border-2 cursor-pointer ${
                                                            q.correctAnswer === optIndex ? 'border-green-400 bg-green-50' : 'border-slate-200 hover:border-slate-300'
                                                        }`}
                                                    >
                                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                                                            q.correctAnswer === optIndex ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-600'
                                                        }`}>
                                                            {String.fromCharCode(65 + optIndex)}
                                                        </span>
                                                        <input
                                                            type="text"
                                                            value={opt}
                                                            onChange={(e) => { e.stopPropagation(); updateOption(qIndex, optIndex, e.target.value); }}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="flex-1 bg-transparent border-none outline-none text-sm"
                                                            placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                                                        />
                                                        {q.correctAnswer === optIndex && <Check size={16} className="text-green-600 flex-shrink-0" />}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-medium text-slate-600 mb-1 block">Explanation</label>
                                            <textarea
                                                value={q.explanation}
                                                onChange={(e) => updateQuestion(qIndex, 'explanation', e.target.value)}
                                                rows={2}
                                                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-red-400 outline-none resize-none"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Add New Question Form */}
                        {showAddQuestion && (
                            <div className="border-2 border-dashed border-red-300 rounded-xl p-4 bg-red-50/50 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-red-700 flex items-center gap-2">
                                        <Plus size={14} /> Add New Question
                                    </h4>
                                    <button onClick={() => setShowAddQuestion(false)} className="text-slate-400 hover:text-slate-600">
                                        <X size={16} />
                                    </button>
                                </div>

                                <textarea
                                    value={newQuestion.question}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                                    rows={2}
                                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none bg-white"
                                    placeholder="Enter your question..."
                                />

                                <div className="space-y-2">
                                    {newQuestion.options.map((opt, optIndex) => (
                                        <div 
                                            key={optIndex}
                                            onClick={() => setNewQuestion({ ...newQuestion, correctAnswer: optIndex })}
                                            className={`flex items-center gap-2 p-2 rounded-lg border-2 cursor-pointer bg-white ${
                                                newQuestion.correctAnswer === optIndex ? 'border-green-400' : 'border-slate-200'
                                            }`}
                                        >
                                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                                newQuestion.correctAnswer === optIndex ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-600'
                                            }`}>
                                                {String.fromCharCode(65 + optIndex)}
                                            </span>
                                            <input
                                                type="text"
                                                value={opt}
                                                onChange={(e) => {
                                                    const opts = [...newQuestion.options];
                                                    opts[optIndex] = e.target.value;
                                                    setNewQuestion({ ...newQuestion, options: opts });
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex-1 bg-transparent border-none outline-none text-sm"
                                                placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <textarea
                                    value={newQuestion.explanation}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                                    rows={2}
                                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none bg-white"
                                    placeholder="Explanation (optional)..."
                                />

                                <div className="flex gap-2">
                                    <button
                                        onClick={addNewQuestion}
                                        disabled={!newQuestion.question.trim() || newQuestion.options.some(o => !o.trim())}
                                        className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-1"
                                    >
                                        <Check size={14} /> Add Question
                                    </button>
                                    <button onClick={() => setShowAddQuestion(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* AI Generate */}
                        <button className="w-full py-2.5 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 text-sm font-medium hover:bg-purple-50 flex items-center justify-center gap-2">
                            <Sparkles size={14} /> Generate Questions with AI
                        </button>

                        {/* Save/Cancel */}
                        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                            <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
                                Cancel
                            </button>
                            <button onClick={handleSave} className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-1.5">
                                <Save size={14} /> Save Quiz
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuizEditor;