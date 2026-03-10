// components/preview/VideoPreview.jsx
import { PlayCircle, Clock, BookOpen } from 'lucide-react';

const VideoPreview = ({ lesson, youtubeId, transcriptMain, transcriptReadMore }) => {
    return (
        <div className="space-y-4">
            {/* Video Player */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <PlayCircle size={18} className="text-red-500" />
                        <h3 className="text-sm font-bold text-gray-700">{lesson?.title || 'Video Lesson'}</h3>
                    </div>
                </div>
                <div className="bg-black">
                    <iframe
                        className="w-full h-[300px] md:h-[400px] lg:h-[500px]"
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
                <div className="p-4 flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                        <Clock size={12} /> 3 min watch
                    </span>
                </div>
            </div>

            {/* Transcript */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <BookOpen size={16} className="text-green-500" />
                        Transcript
                    </h3>
                </div>
                <div className="p-6 space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {transcriptMain}
                    </p>
                    {transcriptReadMore && (
                        <div className="border-t border-gray-100 pt-4">
                            <p className="text-xs font-semibold text-gray-500 mb-2">Read More</p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {transcriptReadMore}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoPreview;