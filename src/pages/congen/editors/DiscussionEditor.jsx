// components/sections/DiscussionSection.jsx
import { useState, useRef } from 'react';
import { 
  MessageCircle, 
  MessageSquare, 
  ChevronRight, 
  MoreHorizontal, 
  CheckCircle, 
  Heart, 
  ThumbsUp, 
  Flag, 
  Send, 
  Plus,
  X,
  Eye,
  Users
} from 'lucide-react';

const DiscussionSection = ({ discussionRef }) => {
  const [showAnswerInput, setShowAnswerInput] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [newComment, setNewComment] = useState("");
  const answerInputRef = useRef(null);

  // Discussion data state
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "How to create admin dashboard for Investment and Finance",
      user: "David Warner",
      avatar: "https://i.pravatar.cc/150?img=11",
      time: "1 hr ago",
      description: "Share your thoughts and engage with fellow learners.",
      prompt: "You can easily find template for UI with best customize facility named 'Get Adminuiux'... I need help understanding the best approach for creating financial dashboards with real-time data visualization.",
      guidelines: [
        "Be respectful and constructive",
        "Support your answers with examples",
        "Engage with other responses"
      ],
      minWords: 50,
      tags: ["User Interface", "User Experience"],
      status: { answered: true, closed: true },
      likes: 1200,
      views: 152,
      watching: 256,
      likedBy: [
        "https://i.pravatar.cc/150?img=1",
        "https://i.pravatar.cc/150?img=2",
        "https://i.pravatar.cc/150?img=3",
        "https://i.pravatar.cc/150?img=4"
      ],
      answers: [
        {
          id: 1,
          user: "Jack Lee",
          avatar: "https://i.pravatar.cc/150?img=8",
          time: "2 min ago",
          content: "I found a solution to your problem. You can use modern UI frameworks like React with Tailwind CSS. There are many admin templates available that you can customize according to your needs. I recommend checking out AdminLTE or Tailwind Admin templates.",
          isCorrect: true,
          likes: 24
        },
        {
          id: 2,
          user: "Emma Wilson",
          avatar: "https://i.pravatar.cc/150?img=5",
          time: "15 min ago",
          content: "You should also consider using chart libraries like Chart.js or Recharts for financial data visualization. They work great with React and have excellent documentation.",
          isCorrect: false,
          likes: 12
        }
      ]
    },
    {
      id: 2,
      title: "Best practices for Neural Network optimization",
      user: "Rahul Verma",
      avatar: "https://i.pravatar.cc/150?img=12",
      time: "3 hours ago",
      description: "Learn and share optimization techniques for deep learning models.",
      prompt: "I'm working on a classification problem and my model is overfitting. I've tried dropout but it's not helping much. What other techniques can I use to reduce overfitting?",
      guidelines: [
        "Share your experience with specific techniques",
        "Include code examples if possible",
        "Mention any relevant research papers"
      ],
      minWords: 50,
      tags: ["Neural Networks", "Deep Learning", "Machine Learning"],
      status: { answered: false, closed: false },
      likes: 450,
      views: 89,
      watching: 120,
      likedBy: [
        "https://i.pravatar.cc/150?img=4",
        "https://i.pravatar.cc/150?img=5"
      ],
      answers: []
    }
  ]);

  // Format count helper
  const formatCount = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  // Scroll to answer input function
  const scrollToAnswerInput = (discussionId) => {
    setShowAnswerInput(discussionId);
    setTimeout(() => {
      if (answerInputRef.current) {
        answerInputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
        answerInputRef.current.querySelector('textarea')?.focus();
      }
    }, 100);
  };

  // Handle answer submit function
  const handleAnswerSubmit = (discussionId) => {
    if (!answerText.trim()) return;
    
    setDiscussions(prev => prev.map(disc => {
      if (disc.id === discussionId) {
        return {
          ...disc,
          answers: [
            ...disc.answers,
            {
              id: Date.now(),
              user: "You",
              avatar: "https://i.pravatar.cc/150?img=20",
              time: "Just now",
              content: answerText,
              isCorrect: false,
              likes: 0
            }
          ]
        };
      }
      return disc;
    }));
    
    setAnswerText("");
    setShowAnswerInput(null);
  };

  // Handle new discussion submit
  const handleNewDiscussion = () => {
    if (!newComment.trim()) return;
    
    const newDiscussion = {
      id: Date.now(),
      title: newComment.substring(0, 50) + (newComment.length > 50 ? '...' : ''),
      user: "You",
      avatar: "https://i.pravatar.cc/150?img=20",
      time: "Just now",
      description: "Share your thoughts and engage with fellow learners.",
      prompt: newComment,
      guidelines: [
        "Be respectful and constructive",
        "Support your answers with examples",
        "Engage with other responses"
      ],
      minWords: 50,
      tags: ["General"],
      status: { answered: false, closed: false },
      likes: 0,
      views: 0,
      watching: 1,
      likedBy: [],
      answers: []
    };
    
    setDiscussions(prev => [newDiscussion, ...prev]);
    setNewComment("");
  };

  return (
    <div 
      ref={discussionRef}
      id="discussion"
      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <MessageCircle size={20} className="text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Discussion Forum</h2>
            <p className="text-xs text-slate-500">Share your thoughts and engage with fellow learners</p>
          </div>
        </div>
        <button className="text-purple-600 flex items-center gap-1 text-sm font-semibold hover:underline">
          View All <ChevronRight size={16} />
        </button>
      </div>

      {/* Discussion Topics */}
      <div className="p-4 space-y-6">
        
        {/* New Discussion Input - Top */}
        <div className="border border-dashed border-purple-300 rounded-xl p-4 bg-purple-50/30">
          <p className="text-sm font-semibold text-purple-700 mb-3 flex items-center gap-2">
            <Plus size={16} /> Start a New Discussion
          </p>
          <textarea
            placeholder="Ask a question or share your thoughts..."
            className="w-full border border-purple-200 rounded-lg p-3 h-20 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 resize-none bg-white"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-between items-center mt-3">
            <p className="text-[10px] text-slate-400">
              {newComment.split(/\s+/).filter(Boolean).length} words
            </p>
            <button 
              onClick={handleNewDiscussion}
              disabled={!newComment.trim()}
              className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={14} />
              Post Question
            </button>
          </div>
        </div>

        {/* Discussion List */}
        {discussions.map((discussion) => (
          <div key={discussion.id} className="border border-slate-200 rounded-xl overflow-hidden">
            
            {/* Discussion Header */}
            <div className="p-4 bg-gradient-to-r from-slate-50 to-purple-50/30">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-bold text-purple-700 hover:text-purple-800 cursor-pointer flex-1 pr-4">
                  {discussion.title}
                </h3>
                <MoreHorizontal size={18} className="text-slate-400 cursor-pointer hover:text-slate-600 flex-shrink-0" />
              </div>

              {/* User Info & Status */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <img 
                    src={discussion.avatar} 
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm" 
                    alt={discussion.user} 
                  />
                  <div className="text-xs">
                    <p className="text-slate-400">Asked by</p>
                    <p className="font-semibold text-slate-700">
                      {discussion.user} 
                      <span className="font-normal text-slate-400 ml-1">• {discussion.time}</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 ml-auto">
                  {discussion.status.answered && (
                    <span className="bg-green-100 text-green-600 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle size={10} /> Answered
                    </span>
                  )}
                  {discussion.status.closed && (
                    <span className="bg-pink-100 text-pink-600 px-2.5 py-1 rounded-full text-[10px] font-bold">
                      Closed
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Discussion Content */}
            <div className="p-4">
              {/* Description */}
              <p className="text-sm text-slate-500 mb-3">{discussion.description}</p>

              {/* Discussion Prompt */}
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-100 mb-4">
                <p className="text-xs font-semibold text-purple-700 mb-2 flex items-center gap-1">
                  <MessageSquare size={12} /> Discussion Prompt
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">{discussion.prompt}</p>
              </div>

              {/* Guidelines */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-4">
                <p className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-1">
                  📋 Guidelines
                </p>
                <ul className="space-y-2">
                  {discussion.guidelines.map((g, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      {g}
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] text-slate-400 mt-3">
                  Minimum {discussion.minWords} words required
                </p>
              </div>

              {/* Tags */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {discussion.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      idx % 3 === 0 
                        ? 'bg-purple-100 text-purple-600' 
                        : idx % 3 === 1
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats & Actions */}
              <div className="flex items-center justify-between py-3 border-t border-b border-slate-100">
                <div className="flex items-center gap-4">
                  {/* Likes */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center">
                      <Heart size={14} className="text-pink-500" />
                    </div>
                    <div className="text-xs">
                      <p className="text-slate-400 italic">Liked by</p>
                      <p className="font-bold text-slate-700">{formatCount(discussion.likes)}</p>
                    </div>
                  </div>
                  
                  {/* Avatars */}
                  <div className="flex -space-x-2">
                    {discussion.likedBy.slice(0, 3).map((avatar, i) => (
                      <img 
                        key={i} 
                        src={avatar} 
                        className="w-7 h-7 rounded-full border-2 border-white object-cover" 
                        alt="" 
                      />
                    ))}
                    {discussion.likedBy.length > 3 && (
                      <span className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-slate-500">
                        +{discussion.likedBy.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Eye size={10} /> Views
                    </p>
                    <p className="text-xs font-bold text-slate-700">{discussion.views}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Users size={10} /> Watching
                    </p>
                    <p className="text-xs font-bold text-slate-700">{discussion.watching}</p>
                  </div>
                  <button 
                    onClick={() => scrollToAnswerInput(discussion.id)}
                    className="bg-purple-600 text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-purple-700 transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <MessageSquare size={14} />
                    Answer
                  </button>
                </div>
              </div>
            </div>

            {/* Answer Input - Shows on button click */}
            {showAnswerInput === discussion.id && (
              <div 
                ref={answerInputRef} 
                className="p-4 bg-gradient-to-r from-purple-50/50 to-violet-50/50 border-t border-purple-100"
              >
                <p className="text-xs font-semibold text-purple-700 mb-3 flex items-center gap-1">
                  ✍️ Write Your Answer
                </p>
                <textarea 
                  placeholder="Share your thoughts and insights..." 
                  className="w-full border border-purple-200 rounded-lg p-3 h-28 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 resize-none bg-white" 
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                />
                <div className="flex justify-between items-center mt-3">
                  <p className={`text-[10px] ${
                    answerText.split(/\s+/).filter(Boolean).length >= discussion.minWords 
                      ? 'text-green-500' 
                      : 'text-slate-400'
                  }`}>
                    {answerText.split(/\s+/).filter(Boolean).length} / {discussion.minWords} words minimum
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setShowAnswerInput(null);
                        setAnswerText("");
                      }}
                      className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-white text-slate-600"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => handleAnswerSubmit(discussion.id)}
                      disabled={!answerText.trim()}
                      className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={14} />
                      Submit Answer
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preview Section (when no answers) */}
            {discussion.answers.length === 0 && showAnswerInput !== discussion.id && (
              <div className="p-4 border-t border-slate-100">
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
            )}

            {/* Answers Section */}
            {discussion.answers.length > 0 && (
              <div className="p-4 bg-slate-50/50 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-500 mb-4 flex items-center gap-1">
                  💬 {discussion.answers.length} Response{discussion.answers.length > 1 ? 's' : ''}
                </p>
                
                <div className="space-y-3">
                  {discussion.answers.map((answer) => (
                    <div 
                      key={answer.id} 
                      className={`rounded-xl p-4 ${
                        answer.isCorrect 
                          ? 'bg-green-50 border border-green-200' 
                          : 'bg-white border border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={answer.avatar} 
                            className={`w-9 h-9 rounded-full object-cover border-2 ${
                              answer.isCorrect ? 'border-green-300' : 'border-slate-200'
                            }`} 
                            alt={answer.user} 
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-slate-800">{answer.user}</h4>
                              {answer.isCorrect && (
                                <span className="bg-lime-500 text-white text-[9px] px-2 py-0.5 rounded font-bold italic">
                                  ✓ Correct Answer
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400">{answer.time}</p>
                          </div>
                        </div>
                        <MoreHorizontal size={16} className="text-slate-400 cursor-pointer hover:text-slate-600" />
                      </div>
                      
                      <p className="text-sm text-slate-600 leading-relaxed mb-3">{answer.content}</p>
                      
                      {/* Answer Actions */}
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                          <ThumbsUp size={12} /> Like {answer.likes > 0 && `(${answer.likes})`}
                        </button>
                        <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                          <MessageSquare size={12} /> Reply
                        </button>
                        <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                          <Flag size={12} /> Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionSection;