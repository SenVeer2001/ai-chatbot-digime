export const generateMockResponse = (userInput) => {
  const responses = [
    'That\'s a great question! Based on my knowledge, I can help you with that.',
    'I understand. Let me provide you with some relevant information.',
    'That\'s an interesting point. Here\'s what I know about that topic.',
    'Thanks for asking! I\'m happy to explain that in detail.',
    'I can definitely help you with that. Let me break it down for you.',
    'Good question! This is actually covered in my training material.',
    'I appreciate the inquiry. Here\'s a comprehensive answer for you.',
    'Let me share my insights on that topic.',
  ];

  return responses[Math.floor(Math.random() * responses.length)];
};

export const generateEmbedCode = (chatbotId) => {
  return `<iframe 
  src="https://yourdomain.com/chatbot/${chatbotId}" 
  width="400" 
  height="600"
  frameborder="0"
  allow="microphone *"
  style="border: 1px solid #ccc; border-radius: 8px;"
></iframe>`;
};

export const mockChatbots = [
  {
    id: 1,
    name: 'Customer Support Bot',
    description: 'Handles customer inquiries',
    status: 'active',
    createdAt: new Date('2025-02-20'),
  },
  {
    id: 2,
    name: 'Product Assistant',
    description: 'Helps with product information',
    status: 'active',
    createdAt: new Date('2025-02-18'),
  },
  {
    id: 3,
    name: 'Knowledge Base Bot',
    description: 'Provides documentation',
    status: 'inactive',
    createdAt: new Date('2025-02-15'),
  },
];
