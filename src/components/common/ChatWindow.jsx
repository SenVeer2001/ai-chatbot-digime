import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ChatBubble from './ChatBubble';
import { generateMockResponse } from '../../utils/mockData';

const ChatWindow = ({ chatbotConfig, readOnly = false }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi! I'm ${chatbotConfig?.name || 'your AI chatbot'}. How can I help you today?`,
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading || readOnly) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateMockResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {chatbotConfig?.name || 'Chat Preview'}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {chatbotConfig?.description || 'Test your chatbot here'}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <ChatBubble
            key={message.id}
            message={message.text}
            isBot={message.isBot}
          />
        ))}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {!readOnly && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
