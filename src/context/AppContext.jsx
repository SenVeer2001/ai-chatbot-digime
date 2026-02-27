import { createContext, useState, useCallback } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user] = useState({
    name: 'Gajendra Singh',
    email: 'gajendra@webkype.com',
    credits: 450,
  });

  const [avatars, setAvatars] = useState([
    {
      id: 1,
      name: 'Professional Avatar',
      image: '/api/placeholder/150/150',
      voiceId: 'voice-1',
      status: 'active',
      createdAt: new Date('2026-02-15'),
    },
    {
      id: 2,
      name: 'Friendly Avatar',
      image: '/api/placeholder/150/150',
      voiceId: 'voice-2',
      status: 'active',
      createdAt: new Date('2026-02-10'),
    },
  ]);

  const [contexts, setContexts] = useState([
    {
      id: 1,
      name: 'Customer Support Context',
      opening: 'Hi! How can I help you today?',
      prompt: 'You are a helpful customer support agent...',
      urls: ['https://example.com/support'],
      persona: 'Professional, helpful, patient',
      createdAt: new Date('2026-02-20'),
      updatedAt: new Date('2026-02-22'),
    },
  ]);

  const [knowledgeBase, setKnowledgeBase] = useState([
    {
      id: 1,
      name: 'Product Documentation',
      type: 'pdf',
      size: '2.5 MB',
      uploadedAt: new Date('2026-02-18'),
    },
    {
      id: 2,
      name: 'FAQ Database',
      type: 'text',
      size: '1.2 MB',
      uploadedAt: new Date('2026-02-20'),
    },
  ]);

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Support Bot',
      type: 'chatbot',
      status: 'published',
      thumbnail: '/api/placeholder/200/120',
      lastEdited: new Date('2026-02-22'),
    },
    {
      id: 2,
      name: 'Product Video',
      type: 'video',
      status: 'draft',
      thumbnail: '/api/placeholder/200/120',
      lastEdited: new Date('2026-02-21'),
    },
  ]);

  const [folders, setFolders] = useState([
    {
      id: 1,
      name: 'My Projects',
      access: 'private',
      items: 3,
    },
  ]);

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      role: 'ai',
      content: 'Hello! How can I assist you today?',
      timestamp: new Date(),
    },
  ]);

  const [darkMode, setDarkMode] = useState(false);

  const addContext = useCallback((contextData) => {
    const newContext = {
      id: Math.max(...contexts.map(c => c.id), 0) + 1,
      ...contextData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setContexts(prev => [...prev, newContext]);
    return newContext;
  }, [contexts]);

  const updateContext = useCallback((id, updates) => {
    setContexts(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c))
    );
  }, []);

  const deleteContext = useCallback((id) => {
    setContexts(prev => prev.filter(c => c.id !== id));
  }, []);

  const addKnowledge = useCallback((file) => {
    const newKnowledge = {
      id: Math.max(...knowledgeBase.map(k => k.id), 0) + 1,
      ...file,
      uploadedAt: new Date(),
    };
    setKnowledgeBase(prev => [...prev, newKnowledge]);
    return newKnowledge;
  }, [knowledgeBase]);

  const deleteKnowledge = useCallback((id) => {
    setKnowledgeBase(prev => prev.filter(k => k.id !== id));
  }, []);

  const addProject = useCallback((projectData) => {
    const newProject = {
      id: Math.max(...projects.map(p => p.id), 0) + 1,
      ...projectData,
      lastEdited: new Date(),
    };
    setProjects(prev => [...prev, newProject]);
    return newProject;
  }, [projects]);

  const addFolder = useCallback((folderData) => {
    const newFolder = {
      id: Math.max(...folders.map(f => f.id), 0) + 1,
      ...folderData,
      items: 0,
    };
    setFolders(prev => [...prev, newFolder]);
    return newFolder;
  }, [folders]);

  const addChatMessage = useCallback((message) => {
    setChatMessages(prev => [...prev, { ...message, timestamp: new Date() }]);
  }, []);

  const clearChat = useCallback(() => {
    setChatMessages([
      {
        id: 1,
        role: 'ai',
        content: 'Hello! How can I assist you today?',
        timestamp: new Date(),
      },
    ]);
  }, []);

  const value = {
    user,
    avatars,
    contexts,
    knowledgeBase,
    projects,
    folders,
    chatMessages,
    darkMode,
    setDarkMode,
    addContext,
    updateContext,
    deleteContext,
    addKnowledge,
    deleteKnowledge,
    addProject,
    addFolder,
    addChatMessage,
    clearChat,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
