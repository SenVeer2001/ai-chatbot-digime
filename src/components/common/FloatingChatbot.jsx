import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  // Detect dark mode preference
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setDarkMode(isDark);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const getBotResponse = (userText) => {
    const responses = [
      "That's a great question! How can I assist you further?",
      "I understand. Let me help you with that.",
      "Thanks for reaching out! Is there anything else I can help with?",
      "I'm here to help! Feel free to ask me anything.",
      "That sounds interesting! Tell me more.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 z-40 flex items-center justify-center ${
          isOpen
            ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
            : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
        }`}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={24} className="text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-24 right-6 w-96 max-w-sm h-[500px] rounded-2xl shadow-2xl flex flex-col transform transition-all duration-300 z-50 ${
            darkMode
              ? 'bg-gray-900 border border-gray-800'
              : 'bg-white border border-gray-200'
          }`}
        >
          {/* Header */}
          <div
            className={`px-6 py-5 rounded-t-2xl ${
              darkMode
                ? 'bg-gradient-to-r from-blue-600 to-blue-700'
                : 'bg-gradient-to-r from-blue-500 to-blue-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                  <MessageCircle size={20} className="text-blue-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-white text-sm">AI Assistant</h3>
                  <p className="text-blue-100 text-xs">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-700 rounded-full p-1 transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div
            className={`flex-1 overflow-y-auto p-4 space-y-4 ${
              darkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                } animate-fade-in`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? darkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-500 text-white'
                      : darkMode
                      ? 'bg-gray-700 text-gray-100'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <p className="text-sm break-words">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user'
                        ? 'text-blue-100'
                        : darkMode
                        ? 'text-gray-400'
                        : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            className={`px-4 py-4 border-t ${
              darkMode
                ? 'bg-gray-900 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex gap-2 items-end">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className={`flex-1 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  darkMode
                    ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500'
                    : 'bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={`p-2 rounded-lg transition-colors ${
                  inputValue.trim()
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styles for animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default FloatingChatbot;
