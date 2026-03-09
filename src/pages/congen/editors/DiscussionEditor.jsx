// components/editors/DiscussionEditor.jsx
import { useState } from 'react';
import { MessageCircle, Pencil, Save, X, Plus, Sparkles, ThumbsUp, MessageSquare, MoreHorizontal } from 'lucide-react';

const DiscussionEditor = ({ lesson, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [discussionData, setDiscussionData] = useState({
        title: lesson?.title || 'Discussion Topic',
        description: lesson?.description || 'Share your thoughts and engage with fellow learners.',
        prompt: lesson?.prompt || 'What are your thoughts on how AI will impact your industry?',
        guidelines: lesson?.guidelines || ['Be respectful', 'Support with examples', 'Engage with others'],
        minWords: lesson?.minWords || 50
    });

    const [tempData, setTempData] = useState({ ...discussionData });
    const [newGuideline, setNewGuideline] = useState('');

    const handleEdit = () => { setTempData({ ...discussionData }); setIsEditing(true); };
    const handleSave = () => { setDiscussionData({ ...tempData }); onUpdate?.({ ...lesson, ...tempData }); setIsEditing(false); };
    const handleCancel = () => { setTempData({ ...discussionData }); setIsEditing(false); };

    const addGuideline = () => {
        if (newGuideline.trim()) {
            setTempData({ ...tempData, guidelines: [...tempData.guidelines, newGuideline.trim()] });
            setNewGuideline('');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex justify-between items-center border-b border-slate-100 p-3 bg-gradient-to-r from-purple-50 to-violet-50">
                <p className="font-medium text-sm text-slate-700 flex items-center gap-2">
                    <MessageCircle size={16} className="text-purple-500" />
                    Discussion Forum
                </p>
                {!isEditing && (
                    <button onClick={handleEdit} className="p-1.5 hover:bg-white/50 rounded-md text-slate-500 hover:text-purple-600">
                        <Pencil size={14} />
                    </button>
                )}
            </div>

            <div className="p-4 space-y-4">
                {!isEditing ? (
                    <>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">{discussionData.title}</h3>
                            <p className="text-sm text-slate-500 mt-1">{discussionData.description}</p>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                            <p className="text-xs font-semibold text-purple-700 mb-2 flex items-center gap-1">
                                <MessageSquare size={12} /> Discussion Prompt
                            </p>
                            <p className="text-sm text-slate-700">{discussionData.prompt}</p>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                            <p className="text-xs font-semibold text-slate-700 mb-3">📋 Guidelines</p>
                            <ul className="space-y-2">
                                {discussionData.guidelines.map((g, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                        <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs flex-shrink-0">
                                            {idx + 1}
                                        </span>
                                        {g}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Preview */}
                        <div className="border-t border-slate-200 pt-4 mt-4">
                            <p className="text-xs font-semibold text-slate-500 mb-3">💬 Preview:</p>
                            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                                    <div>
                                        <p className="text-xs font-medium text-slate-700">Student Name</p>
                                        <p className="text-[10px] text-slate-400">2 hours ago</p>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 italic">Student responses will appear here...</p>
                                <div className="flex gap-3 mt-2 text-[10px] text-slate-400">
                                    <span className="flex items-center gap-1"><ThumbsUp size={10} /> Like</span>
                                    <span className="flex items-center gap-1"><MessageSquare size={10} /> Reply</span>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-1 block">Title</label>
                            <input
                                type="text"
                                value={tempData.title}
                                onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
                                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-purple-400 outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-1 block">Description</label>
                            <textarea
                                value={tempData.description}
                                onChange={(e) => setTempData({ ...tempData, description: e.target.value })}
                                rows={2}
                                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-purple-400 outline-none resize-none"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-1 block">Discussion Prompt</label>
                            <textarea
                                value={tempData.prompt}
                                onChange={(e) => setTempData({ ...tempData, prompt: e.target.value })}
                                rows={3}
                                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-purple-400 outline-none resize-none"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Guidelines</label>
                            <div className="space-y-2 mb-2">
                                {tempData.guidelines.map((g, idx) => (
                                    <div key={idx} className="flex items-center gap-2 bg-slate-50 rounded-lg p-2">
                                        <span className="text-sm text-slate-600 flex-1">{g}</span>
                                        <button onClick={() => setTempData({ ...tempData, guidelines: tempData.guidelines.filter((_, i) => i !== idx) })} className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded">
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newGuideline}
                                    onChange={(e) => setNewGuideline(e.target.value)}
                                    placeholder="Add guideline..."
                                    className="flex-1 border border-slate-200 rounded-lg p-2 text-sm focus:border-purple-400 outline-none"
                                    onKeyPress={(e) => e.key === 'Enter' && addGuideline()}
                                />
                                <button onClick={addGuideline} className="px-3 py-2 bg-purple-100 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-200">Add</button>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-1 block">Minimum Words</label>
                            <input
                                type="number"
                                value={tempData.minWords}
                                onChange={(e) => setTempData({ ...tempData, minWords: parseInt(e.target.value) || 0 })}
                                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-purple-400 outline-none"
                            />
                        </div>
                        <button className="w-full py-2.5 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 text-sm font-medium hover:bg-purple-50 flex items-center justify-center gap-2">
                            <Sparkles size={14} /> Generate Prompt with AI
                        </button>
                        <div className="flex justify-end gap-2 pt-2">
                            <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">Cancel</button>
                            <button onClick={handleSave} className="px-4 py-2 text-sm font-medium bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center gap-1.5">
                                <Save size={14} /> Save Discussion
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DiscussionEditor;