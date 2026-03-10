// components/preview/ArticlePreview.jsx
import { Clock, BookOpen } from 'lucide-react';

const ArticlePreview = ({ lesson }) => {
    const articleData = {
        title: lesson?.title || 'Explore AI Applications and Benefits',
        subtitle: lesson?.subtitle || 'AI and COVID-19 (2020)',
        coverImage: lesson?.coverImage || 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1000&q=80',
        estimatedTime: lesson?.estimatedTime || '5 min read',
        sections: lesson?.sections || [
            {
                id: 1,
                heading: 'Introduction',
                content: 'The COVID-19 pandemic created an unprecedented global health crisis. Artificial Intelligence supported healthcare systems, governments, and researchers by enabling faster diagnosis, data-driven decisions, and improved patient care.'
            },
            {
                id: 2,
                heading: 'Benefits of AI',
                content: 'AI improved healthcare efficiency, reduced operational costs, enhanced public awareness through automated systems, and enabled faster, more accurate decision-making during the pandemic response.'
            },
            {
                id: 3,
                heading: 'Conclusion',
                content: 'In conclusion, AI has proven to be a valuable tool in addressing global challenges. Its applications in healthcare, education, and various industries continue to grow and evolve.'
            }
        ]
    };

    return (
        <div className="space-y-4">
            {/* Header Banner */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {articleData.coverImage && (
                    <img 
                        src={articleData.coverImage} 
                        alt="Cover" 
                        className="w-full h-48 md:h-56 object-cover"
                    />
                )}
                <div className="p-6">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">{articleData.title}</h2>
                    <p className="text-sm text-gray-400 mt-1">{articleData.subtitle}</p>
                    <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-gray-500 flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                            <Clock size={12} /> {articleData.estimatedTime}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                            <BookOpen size={12} /> {articleData.sections.length} sections
                        </span>
                    </div>
                </div>
            </div>

            {/* Sections */}
            {articleData.sections.map((section, index) => (
                <div 
                    key={section.id} 
                    className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                >
                    <div className="p-4 border-b border-gray-50 bg-gray-50/50 rounded-t-lg">
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
                                {index + 1}
                            </span>
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-tight">
                                {section.heading}
                            </h3>
                        </div>
                    </div>
                    <div className="p-6">
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {section.content}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ArticlePreview;