// components/preview/ResourcesPreview.jsx
import { Files, FileText, Download, ExternalLink } from 'lucide-react';

const ResourcesPreview = ({ lesson }) => {
    const resourcesData = {
        title: lesson?.title || 'Additional Resources',
        description: lesson?.description || 'Download helpful materials and resources.',
        resources: lesson?.resources || [
            { id: 1, name: 'Course Slides PDF', type: 'pdf', url: '#', size: '2.5 MB' },
            { id: 2, name: 'Code Examples', type: 'zip', url: '#', size: '1.2 MB' },
            { id: 3, name: 'External Tutorial', type: 'link', url: 'https://example.com', size: '' },
            { id: 4, name: 'Cheat Sheet', type: 'pdf', url: '#', size: '500 KB' }
        ]
    };

    const getIcon = (type) => {
        if (type === 'link') return <ExternalLink size={18} className="text-blue-500" />;
        return <FileText size={18} className="text-amber-500" />;
    };

    const getTypeColor = (type) => {
        const colors = {
            pdf: 'bg-red-100 text-red-600',
            zip: 'bg-purple-100 text-purple-600',
            doc: 'bg-blue-100 text-blue-600',
            link: 'bg-green-100 text-green-600'
        };
        return colors[type] || 'bg-gray-100 text-gray-600';
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <Files size={20} className="text-amber-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">{resourcesData.title}</h3>
                        <p className="text-xs text-gray-500">{resourcesData.description}</p>
                    </div>
                </div>
            </div>

            {/* Resources List */}
            <div className="p-4 space-y-3">
                {resourcesData.resources.map((res) => (
                    <div 
                        key={res.id} 
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 hover:border-gray-200 transition-all cursor-pointer group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                                {getIcon(res.type)}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600">
                                    {res.name}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${getTypeColor(res.type)}`}>
                                        {res.type}
                                    </span>
                                    {res.size && (
                                        <span className="text-xs text-gray-400">{res.size}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all">
                            {res.type === 'link' ? (
                                <ExternalLink size={16} className="text-blue-500" />
                            ) : (
                                <Download size={16} className="text-amber-500" />
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourcesPreview;