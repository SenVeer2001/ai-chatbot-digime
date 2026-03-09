// components/editors/ResourcesEditor.jsx
import { useState } from 'react';
import { Files, Pencil, Save, X, Plus, Trash2, Upload, FileText, Download, Link2, ExternalLink } from 'lucide-react';

const ResourcesEditor = ({ lesson, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [resourcesData, setResourcesData] = useState({
        title: lesson?.title || 'Additional Resources',
        description: lesson?.description || 'Download helpful materials and resources.',
        resources: lesson?.resources || [
            { id: 1, name: 'Course Slides PDF', type: 'pdf', url: '#', size: '2.5 MB' },
            { id: 2, name: 'Code Examples', type: 'zip', url: '#', size: '1.2 MB' },
            { id: 3, name: 'External Tutorial', type: 'link', url: 'https://example.com', size: '' }
        ]
    });

    const [tempData, setTempData] = useState({ ...resourcesData });
    const [newResource, setNewResource] = useState({ name: '', type: 'pdf', url: '', size: '' });

    const handleEdit = () => { setTempData(JSON.parse(JSON.stringify(resourcesData))); setIsEditing(true); };
    const handleSave = () => { setResourcesData({ ...tempData }); onUpdate?.({ ...lesson, ...tempData }); setIsEditing(false); };
    const handleCancel = () => { setTempData(JSON.parse(JSON.stringify(resourcesData))); setIsEditing(false); };

    const addResource = () => {
        if (newResource.name.trim() && newResource.url.trim()) {
            setTempData({ ...tempData, resources: [...tempData.resources, { ...newResource, id: Date.now() }] });
            setNewResource({ name: '', type: 'pdf', url: '', size: '' });
        }
    };

    const getIcon = (type) => {
        if (type === 'link') return <ExternalLink size={16} className="text-blue-500" />;
        return <FileText size={16} className="text-amber-500" />;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex justify-between items-center border-b border-slate-100 p-3 bg-gradient-to-r from-amber-50 to-orange-50">
                <p className="font-medium text-sm text-slate-700 flex items-center gap-2">
                    <Files size={16} className="text-amber-500" />
                    Resources
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full font-medium">
                        {resourcesData.resources.length} files
                    </span>
                    {!isEditing && (
                        <button onClick={handleEdit} className="p-1.5 hover:bg-white/50 rounded-md text-slate-500 hover:text-amber-600">
                            <Pencil size={14} />
                        </button>
                    )}
                </div>
            </div>

            <div className="p-4 space-y-4">
                {!isEditing ? (
                    <>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">{resourcesData.title}</h3>
                            <p className="text-sm text-slate-500 mt-1">{resourcesData.description}</p>
                        </div>

                        <div className="space-y-2">
                            {resourcesData.resources.map((res) => (
                                <div key={res.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        {getIcon(res.type)}
                                        <div>
                                            <p className="text-sm font-medium text-slate-700">{res.name}</p>
                                            <p className="text-xs text-slate-400">{res.type.toUpperCase()} {res.size && `• ${res.size}`}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 hover:bg-white rounded-lg">
                                        {res.type === 'link' ? <ExternalLink size={14} className="text-blue-500" /> : <Download size={14} className="text-amber-500" />}
                                    </button>
                                </div>
                            ))}
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
                                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-amber-400 outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-1 block">Description</label>
                            <textarea
                                value={tempData.description}
                                onChange={(e) => setTempData({ ...tempData, description: e.target.value })}
                                rows={2}
                                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-amber-400 outline-none resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 block">Files & Links</label>
                            {tempData.resources.map((res, idx) => (
                                <div key={res.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
                                    {getIcon(res.type)}
                                    <span className="flex-1 text-sm text-slate-700">{res.name}</span>
                                    <span className="text-xs text-slate-400 bg-slate-200 px-2 py-0.5 rounded">{res.type}</span>
                                    <button onClick={() => setTempData({ ...tempData, resources: tempData.resources.filter((_, i) => i !== idx) })} className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Add Resource */}
                        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 space-y-3">
                            <p className="text-xs font-semibold text-amber-700 flex items-center gap-1">
                                <Plus size={12} /> Add New Resource
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    value={newResource.name}
                                    onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                                    placeholder="File name"
                                    className="border border-slate-200 rounded-lg p-2 text-sm outline-none"
                                />
                                <select
                                    value={newResource.type}
                                    onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                                    className="border border-slate-200 rounded-lg p-2 text-sm outline-none"
                                >
                                    <option value="pdf">PDF</option>
                                    <option value="zip">ZIP</option>
                                    <option value="doc">DOC</option>
                                    <option value="link">External Link</option>
                                </select>
                            </div>
                            <input
                                type="text"
                                value={newResource.url}
                                onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                                placeholder="URL or file path"
                                className="w-full border border-slate-200 rounded-lg p-2 text-sm outline-none"
                            />
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newResource.size}
                                    onChange={(e) => setNewResource({ ...newResource, size: e.target.value })}
                                    placeholder="Size (e.g., 2.5 MB)"
                                    className="flex-1 border border-slate-200 rounded-lg p-2 text-sm outline-none"
                                />
                                <button onClick={addResource} className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 flex items-center gap-1">
                                    <Plus size={14} /> Add
                                </button>
                            </div>
                        </div>

                        <button className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2">
                            <Upload size={14} /> Upload File
                        </button>

                        <div className="flex justify-end gap-2 pt-2">
                            <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">Cancel</button>
                            <button onClick={handleSave} className="px-4 py-2 text-sm font-medium bg-amber-500 text-white rounded-lg hover:bg-amber-600 flex items-center gap-1.5">
                                <Save size={14} /> Save Resources
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ResourcesEditor;