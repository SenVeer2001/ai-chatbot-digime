export const mockApi = {
  generateChatResponse: async (message) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const responses = [
      'That\'s a great question! Let me help you with that.',
      'Based on your input, here\'s what I can suggest...',
      'I understand. Here\'s the solution to your problem.',
      'Thanks for asking. Let me provide you with the details.',
      'That\'s interesting. Here\'s what I think about it.',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  },

  uploadFile: async (file) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return {
      id: Math.random(),
      name: file.name,
      type: file.type.split('/')[1],
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      uploadedAt: new Date(),
    };
  },

  createAvatar: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      id: Math.random(),
      ...data,
      createdAt: new Date(),
    };
  },

  createContext: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return {
      id: Math.random(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  },

  getProjects: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return [];
  },
};
