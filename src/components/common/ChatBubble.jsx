import { Bot, User } from 'lucide-react';

const ChatBubble = ({ message, isBot = false }) => {
  return (
    <div className={`flex gap-3 mb-4 animate-slide-up ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
          <Bot size={18} className="text-white" />
        </div>
      )}

      <div
        className={`
          max-w-xs lg:max-w-md rounded-lg px-4 py-2 break-words
          ${isBot
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none'
            : 'bg-gradient-primary text-white rounded-br-none'
          }
        `}
      >
        <p className="text-sm">{message}</p>
      </div>

      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
          <User size={18} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
