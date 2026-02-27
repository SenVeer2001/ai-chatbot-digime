import { createContext, useState, useCallback } from 'react';

export const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [chatbots, setChatbots] = useState([
    {
      id: 1,
      name: 'Customer Support Bot',
      description: 'Handles customer inquiries',
      prompt: 'You are a helpful customer support assistant...',
      studyMaterial: 'Sample study material...',
      createdAt: new Date('2025-02-20'),
      status: 'active',
    },
    {
      id: 2,
      name: 'Product Assistant',
      description: 'Helps with product information',
      prompt: 'You are a product expert...',
      studyMaterial: 'Product documentation...',
      createdAt: new Date('2025-02-18'),
      status: 'active',
    },
  ]);

  const [currentChatbot, setCurrentChatbot] = useState(null);

  const createChatbot = useCallback((chatbotData) => {
    const newChatbot = {
      id: Math.max(...chatbots.map(c => c.id), 0) + 1,
      ...chatbotData,
      createdAt: new Date(),
      status: 'active',
    };
    setChatbots(prev => [...prev, newChatbot]);
    setCurrentChatbot(newChatbot);
    return newChatbot;
  }, [chatbots]);

  const updateChatbot = useCallback((id, updates) => {
    setChatbots(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates } : c))
    );
    if (currentChatbot?.id === id) {
      setCurrentChatbot(prev => ({ ...prev, ...updates }));
    }
  }, [currentChatbot]);

  const deleteChatbot = useCallback((id) => {
    setChatbots(prev => prev.filter(c => c.id !== id));
    if (currentChatbot?.id === id) {
      setCurrentChatbot(null);
    }
  }, [currentChatbot]);

  const getChatbotById = useCallback((id) => {
    return chatbots.find(c => c.id === id);
  }, [chatbots]);

  const value = {
    chatbots,
    currentChatbot,
    setCurrentChatbot,
    createChatbot,
    updateChatbot,
    deleteChatbot,
    getChatbotById,
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};
