// components/editors/ArticleEditor.jsx
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { 
    BookOpen, Pencil, Save, X, Sparkles, Image, Plus, 
    Trash2, GripVertical, ChevronDown, ChevronUp, Clock
} from 'lucide-react';

// Quill Editor Modules Configuration
const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean']
    ],
};

const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'list', 'bullet', 'indent',
    'blockquote', 'code-block', 'link', 'image'
];

// Mini Quill for smaller sections
const miniQuillModules = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link'],
        ['clean']
    ],
};

const ArticleEditor = ({ lesson, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [expandedSection, setExpandedSection] = useState(0);
    
    const [articleData, setArticleData] = useState({
        title: lesson?.title || 'Article Title',
        coverImage: lesson?.coverImage || 'https://images.pexels.com/photos/36285980/pexels-photo-36285980.jpeg',
        estimatedTime: lesson?.estimatedTime || '5 min read',
        sections: lesson?.sections || [
            {
                id: 1,
                heading: 'Introduction',
                content: 'The COVID-19 pandemic created an unprecedented global health crisis. Artificial Intelligence supported healthcare systems, governments, and researchers by enabling faster diagnosis, data-driven decisions, and improved patient care.'
            },
            {
                id: 2,
                heading: 'Role of AI During the COVID-19 Pandemic',
                content: 'AI helped detect outbreak trends, analyze X-rays and CT scans, optimize hospital resource allocation, and accelerate drug and vaccine development through advanced machine learning models.'
            },
             {
                id: 3,
                heading: 'Benefits of AI',
                content: 'AI improved healthcare efficiency, reduced operational costs, enhanced public awareness through automated systems, and enabled faster, more accurate decision-making during the pandemic response.'
            },
            {
                id: 4,
                heading: 'Conclusion',
                content: 'The COVID-19 pandemic demonstrated the transformative potential of Artificial Intelligence in global healthcare. Despite challenges such as privacy concerns and infrastructure gaps, AI proved to be a powerful tool in building a more resilient and responsive healthcare system.'
            }
        ]
    });

    const [tempData, setTempData] = useState(JSON.parse(JSON.stringify(articleData)));
    const [showAddSection, setShowAddSection] = useState(false);
    const [newSectionHeading, setNewSectionHeading] = useState('');

    const handleEdit = () => { 
        setTempData(JSON.parse(JSON.stringify(articleData))); 
        setIsEditing(true); 
        setExpandedSection(0);
    };

    const handleSave = () => { 
        setArticleData(JSON.parse(JSON.stringify(tempData))); 
        onUpdate?.({ ...lesson, ...tempData }); 
        setIsEditing(false); 
    };

    const handleCancel = () => { 
        setTempData(JSON.parse(JSON.stringify(articleData))); 
        setIsEditing(false);
        setShowAddSection(false);
        setNewSectionHeading('');
    };

    // Section handlers
    const updateSection = (sectionId, field, value) => {
        const updated = tempData.sections.map(s => 
            s.id === sectionId ? { ...s, [field]: value } : s
        );
        setTempData({ ...tempData, sections: updated });
    };

    const addSection = () => {
        if (newSectionHeading.trim()) {
            const newSection = {
                id: Date.now(),
                heading: newSectionHeading.trim(),
                content: '<p>Start writing your content here...</p>'
            };
            setTempData({ 
                ...tempData, 
                sections: [...tempData.sections, newSection] 
            });
            setNewSectionHeading('');
            setShowAddSection(false);
            setExpandedSection(tempData.sections.length);
        }
    };

    const deleteSection = (sectionId) => {
        if (tempData.sections.length > 1) {
            const updated = tempData.sections.filter(s => s.id !== sectionId);
            setTempData({ ...tempData, sections: updated });
        }
    };

    const moveSection = (index, direction) => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= tempData.sections.length) return;
        
        const updated = [...tempData.sections];
        [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
        setTempData({ ...tempData, sections: updated });
        setExpandedSection(newIndex);
    };

    const duplicateSection = (index) => {
        const sectionToCopy = tempData.sections[index];
        const newSection = {
            ...JSON.parse(JSON.stringify(sectionToCopy)),
            id: Date.now(),
            heading: `${sectionToCopy.heading} (Copy)`
        };
        const updated = [...tempData.sections];
        updated.splice(index + 1, 0, newSection);
        setTempData({ ...tempData, sections: updated });
        setExpandedSection(index + 1);
    };

    // Calculate total read time based on content
    const calculateReadTime = () => {
        const totalContent = tempData.sections.reduce((acc, s) => acc + s.content, '');
        const wordCount = totalContent.replace(/<[^>]*>/g, '').split(/\s+/).length;
        const minutes = Math.ceil(wordCount / 200); // 200 words per minute
        return `${minutes} min read`;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="flex justify-end items-center border-b border-slate-100 p-3 bg-gradient-to-r from-green-50 to-emerald-50">
               
                <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                        {articleData.sections.length} Sections
                    </span>
                    {!isEditing && (
                        <button 
                            onClick={handleEdit} 
                            className="p-1.5 hover:bg-white/50 rounded-md text-slate-500 hover:text-green-600"
                        >
                            <Pencil size={14} />
                        </button>
                    )}
                </div>
            </div>

            <div className="p-2 space-y-4">
                
                {!isEditing ? (
                    <>
                        {/* Cover Image */}
                        {articleData.coverImage && (
                            <div className="rounded-lg overflow-hidden h-48 bg-slate-100">
                                <img 
                                    src={articleData.coverImage|| "https://images.pexels.com/photos/36285980/pexels-photo-36285980.jpeg"} 
                                    alt="Cover" 
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                        )}

                        {/* Title & Meta */}
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">{articleData.title}</h3>
                            <div className="flex items-center gap-4 mt-2">
                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                    <Clock size={12} /> {articleData.estimatedTime}
                                </p>
                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                    <BookOpen size={12} /> {articleData.sections.length} sections
                                </p>
                            </div>
                        </div>


                        {/* Sections Content */}
                        <div className="space-y-6 ">
                            {articleData.sections.map((section, idx) => (
                                <div key={section.id} className="border-l-2 border-green-400 pl-2  ">
                                    <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] font-bold">
                                            {idx + 1}
                                        </span>
                                        {section.heading}
                                    </h4>
                                    <p className='ml-8 text-sm '>
                                        {section.content} 
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    
                    <>
                        {/* Cover Image */}
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                                <Image size={14} /> Cover Image URL
                            </label>
                            <input
                                type="text"
                                value={tempData.coverImage}
                                onChange={(e) => setTempData({ ...tempData, coverImage: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-green-400 outline-none mt-1"
                            />
                            {tempData.coverImage && (
                                <div className="mt-2 rounded-lg overflow-hidden h-32 bg-slate-100">
                                    <img 
                                        src={tempData.coverImage} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-1 block">Article Title</label>
                            <input
                                type="text"
                                value={tempData.title}
                                onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
                                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-semibold focus:border-green-400 outline-none"
                            />
                        </div>

                        {/* Estimated Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-1 block">Read Time</label>
                                <input
                                    type="text"
                                    value={tempData.estimatedTime}
                                    onChange={(e) => setTempData({ ...tempData, estimatedTime: e.target.value })}
                                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-green-400 outline-none"
                                />
                            </div>
                            <div className="flex items-end">
                                <button 
                                    onClick={() => setTempData({ ...tempData, estimatedTime: calculateReadTime() })}
                                    className="px-3 py-2 text-xs bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200"
                                >
                                    Auto Calculate
                                </button>
                            </div>
                        </div>

                        {/* Sections Header */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                            <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                Article Sections ({tempData.sections.length})
                            </h4>
                            <button
                                onClick={() => setShowAddSection(true)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600"
                            >
                                <Plus size={12} /> Add Section
                            </button>
                        </div>

                        {/* Sections Editor */}
                        <div className="space-y-3">
                            {tempData.sections.map((section, idx) => (
                                <div 
                                    key={section.id} 
                                    className={`border rounded-xl overflow-hidden transition-all ${
                                        expandedSection === idx ? 'border-green-300 shadow-md' : 'border-slate-200'
                                    }`}
                                >
                                    {/* Section Header */}
                                    <div 
                                        className={`p-3 flex items-center gap-3 cursor-pointer ${
                                            expandedSection === idx ? 'bg-green-50' : 'bg-slate-50 hover:bg-slate-100'
                                        }`}
                                        onClick={() => setExpandedSection(expandedSection === idx ? -1 : idx)}
                                    >
                                        <div className="text-slate-400 cursor-grab">
                                            <GripVertical size={14} />
                                        </div>
                                        <span className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                                            {idx + 1}
                                        </span>
                                        <input
                                            type="text"
                                            value={section.heading}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                updateSection(section.id, 'heading', e.target.value);
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex-1 bg-transparent border-none outline-none text-sm font-semibold text-slate-700"
                                            placeholder="Section heading..."
                                        />
                                        
                                        {/* Quick Actions */}
                                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                            <button
                                                onClick={() => moveSection(idx, 'up')}
                                                disabled={idx === 0}
                                                className="p-1 hover:bg-white rounded text-slate-400 disabled:opacity-30"
                                            >
                                                <ChevronUp size={14} />
                                            </button>
                                            <button
                                                onClick={() => moveSection(idx, 'down')}
                                                disabled={idx === tempData.sections.length - 1}
                                                className="p-1 hover:bg-white rounded text-slate-400 disabled:opacity-30"
                                            >
                                                <ChevronDown size={14} />
                                            </button>
                                            <button
                                                onClick={() => duplicateSection(idx)}
                                                className="p-1 hover:bg-white rounded text-slate-400 hover:text-blue-500 text-xs"
                                            >
                                                Copy
                                            </button>
                                            <button
                                                onClick={() => deleteSection(section.id)}
                                                className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-500"
                                                disabled={tempData.sections.length <= 1}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        
                                        {expandedSection === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </div>

                                   
                                    {expandedSection === idx && (
                                        <div className="p-4 border-t border-slate-100 bg-white">
                                            <label className="text-xs font-medium text-slate-600 mb-2 block">
                                                Section Content
                                            </label>
                                            <div className="border border-slate-200 rounded-lg overflow-hidden">
                                                <ReactQuill
                                                    theme="snow"
                                                    value={section.content}
                                                    onChange={(value) => updateSection(section.id, 'content', value)}
                                                    modules={quillModules}
                                                    formats={quillFormats}
                                                    className="bg-white"
                                                    style={{ minHeight: '200px' }}
                                                />
                                            </div>
                                            
                                            {/* Word Count */}
                                            <p className="text-[10px] text-slate-400 mt-2 text-right">
                                                {section.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(w => w).length} words
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Add New Section */}
                        {showAddSection && (
                            <div className="border-2 border-dashed border-green-300 rounded-xl p-4 bg-green-50/50 space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-green-700 flex items-center gap-2">
                                        <Plus size={14} /> Add New Section
                                    </h4>
                                    <button 
                                        onClick={() => { setShowAddSection(false); setNewSectionHeading(''); }}
                                        className="text-slate-400 hover:text-slate-600"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    value={newSectionHeading}
                                    onChange={(e) => setNewSectionHeading(e.target.value)}
                                    placeholder="Enter section heading..."
                                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-green-400 outline-none bg-white"
                                    autoFocus
                                    onKeyPress={(e) => e.key === 'Enter' && addSection()}
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={addSection}
                                        disabled={!newSectionHeading.trim()}
                                        className="flex-1 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 disabled:opacity-50 flex items-center justify-center gap-1"
                                    >
                                        <Plus size={14} /> Add Section
                                    </button>
                                    <button
                                        onClick={() => { setShowAddSection(false); setNewSectionHeading(''); }}
                                        className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* AI Generate Button */}
                        <button className="w-full py-2.5 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 text-sm font-medium hover:bg-purple-50 flex items-center justify-center gap-2">
                            <Sparkles size={14} /> Generate Article with AI
                        </button>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                            <button 
                                onClick={handleCancel} 
                                className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSave} 
                                className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-1.5"
                            >
                                <Save size={14} /> Save Article
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Custom Styles for Quill */}
            <style jsx global>{`
                .ql-container {
                    min-height: 150px;
                    font-size: 14px;
                }
                .ql-editor {
                    min-height: 150px;
                }
                .ql-toolbar {
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                    background: #f8fafc;
                }
                .ql-container {
                    border-bottom-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                }
                .prose ul {
                    list-style-type: disc;
                    padding-left: 1.5rem;
                }
                .prose ol {
                    list-style-type: decimal;
                    padding-left: 1.5rem;
                }
                .prose blockquote {
                    border-left: 4px solid #10b981;
                    padding-left: 1rem;
                    font-style: italic;
                    color: #64748b;
                }
                .prose code {
                    background: #f1f5f9;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 0.875em;
                }
                .prose pre {
                    background: #1e293b;
                    color: #e2e8f0;
                    padding: 1rem;
                    border-radius: 8px;
                    overflow-x: auto;
                }
            `}</style>
        </div>
    );
};

export default ArticleEditor;