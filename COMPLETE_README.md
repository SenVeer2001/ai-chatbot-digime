# AI Chatbot Generator - SaaS Platform

A modern, production-ready React SaaS application for creating, configuring, and deploying AI-powered chatbots without coding. Built with React, Vite, Tailwind CSS, and React Router.

## 🌟 Features

- **Easy Chatbot Creation**: Intuitive UI for setting up chatbots with custom prompts
- **Knowledge Base Training**: Support for PDF uploads, image uploads, and text-based study materials
- **Live Chat Preview**: Real-time preview of chatbot interactions with mock AI responses
- **Embed Generation**: Automatic iframe embed code for website integration
- **Dark Mode**: Full dark mode support with system preference detection
- **Responsive Design**: Fully responsive UI that works on all devices
- **Modern UI**: Beautiful SaaS-style design with blue/purple gradients and smooth animations

## 🏗️ Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button.jsx           # Reusable button component
│   │   ├── Card.jsx             # Reusable card component
│   │   ├── ChatBubble.jsx        # Chat message bubble
│   │   ├── ChatWindow.jsx        # Interactive chat interface
│   │   ├── FileUpload.jsx        # Drag & drop file uploader
│   │   ├── Loader.jsx            # Loading spinner component
│   │   └── Select.jsx            # Custom select dropdown
│   └── layout/
│       ├── Navbar.jsx            # Top navigation bar
│       └── Sidebar.jsx           # Side navigation menu
├── pages/
│   ├── LandingPage.jsx           # Home page with hero & pricing
│   ├── DashboardPage.jsx         # Chatbot management dashboard
│   ├── CreateChatbotPage.jsx     # Chatbot creation form
│   └── ChatbotPreviewPage.jsx    # Chat preview & deployment
├── context/
│   └── ChatbotContext.jsx        # Global state management
├── hooks/
│   └── useChatbot.js             # Custom hook for context
├── utils/
│   └── mockData.js               # Mock data and utilities
├── App.jsx                       # Main app with routing
├── App.css                       # App-level styles
├── index.css                     # Global styles with Tailwind
├── main.jsx                      # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

The app will open at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## 📱 Pages & Features

### 1. Landing Page (`/`)
- Hero section with CTA
- Features showcase
- Pricing tiers
- Professional footer
- Smooth scroll navigation

### 2. Dashboard Page (`/dashboard`)
- View all created chatbots
- Filter by status (active/inactive)
- Quick access to chatbot details
- Create new chatbot button
- Responsive card grid layout

### 3. Create Chatbot Page (`/create`)
- **Basic Information**
  - Chatbot name and description
- **Configuration**
  - System prompt for AI behavior
  - Knowledge base/study material input
- **Training Materials**
  - PDF upload with drag & drop
  - Image upload with preview
  - Max file size validation
- **Loading State**: Shows during generation

### 4. Chatbot Preview Page (`/preview/:id`)
- **Chat Interface**
  - Live chat preview with AI responses
  - Message history
  - User input box
  - Real-time message rendering
- **Deployment Section**
  - Status indicator
  - Creation date
  - Chatbot ID
- **Embed Code**
  - Automatic iframe code generation
  - Copy to clipboard functionality
  - Syntax highlighted code block

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (from `#0ea5e9` to `#a855f7`)
- **Secondary**: Cyan to Blue gradient
- **Backgrounds**: White light, Dark gray dark
- **Borders**: Soft gray with dark mode support

### Components

#### Button Variants
- `primary`: Gradient blue button
- `secondary`: Neutral gray button
- `outline`: Border-only button
- `danger`: Red danger button

#### Button Sizes
- `sm`: Small (px-3 py-1.5)
- `md`: Medium (px-6 py-2.5)
- `lg`: Large (px-8 py-3)

#### Card Component
- Rounded corners with soft shadows
- Dark mode support
- Optional hover effect
- Flexible content layout

## 🔧 Technologies Used

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **React Router v6**: Navigation
- **Tailwind CSS**: Utility-first CSS
- **Lucide React**: Beautiful icons
- **PostCSS**: CSS processing

## 📊 State Management

### ChatbotContext
Manages global chatbot state:
- `chatbots`: List of created chatbots
- `currentChatbot`: Currently selected chatbot
- `createChatbot()`: Add new chatbot
- `updateChatbot()`: Modify existing chatbot
- `deleteChatbot()`: Remove chatbot
- `getChatbotById()`: Fetch specific chatbot

Usage with custom hook:
```jsx
import { useChatbot } from '@/hooks/useChatbot';

function Component() {
  const { chatbots, createChatbot } = useChatbot();
  // ...
}
```

## 🎯 Key Features Implementation

### File Upload
- Drag & drop support
- Multiple file support
- File size validation (10MB default)
- File type filtering
- Preview with icons
- Remove file functionality

### Chat Window
- Message bubbles with avatar
- Auto-scroll to latest message
- Typing indicators
- Mock AI response generation
- Timestamp support
- Read-only mode option

### Dark Mode
- System preference detection
- Toggle button in navbar
- Persists across navigation
- All components styled for dark mode

### Embed Code Generation
```javascript
// Example output
<iframe 
  src="https://yourdomain.com/chatbot/1" 
  width="400" 
  height="600"
  frameborder="0"
  allow="microphone *"
></iframe>
```

## 🔄 Mock Data & API Simulation

- Pre-populated dashboard with sample chatbots
- Simulated API calls with 2-second delay
- Mock AI response generator
- File processing simulation

## 🎪 Responsive Breakpoints

- **Mobile**: < 640px (full stack layout)
- **Tablet**: 640px - 1024px (optimized layout)
- **Desktop**: > 1024px (full sidebar + multi-column)

## 🌙 Dark Mode

Automatically detected from system preferences with manual toggle:
```jsx
<button onClick={onToggleDarkMode}>
  {darkMode ? <Sun /> : <Moon />}
</button>
```

## 📋 Form Validation

- Required field indicators
- Input validation on submit
- Error messages for file uploads
- Real-time character counts

## 🚀 Production Checklist

- [ ] Replace mock API calls with real endpoints
- [ ] Implement authentication/authorization
- [ ] Add error handling and user feedback
- [ ] Set up analytics tracking
- [ ] Configure API endpoints
- [ ] Add environment variables
- [ ] Implement WebSocket for real-time chat
- [ ] Add user onboarding tour
- [ ] Set up error logging
- [ ] Optimize images and assets

## 📝 Environment Variables

Create a `.env` file:
```
VITE_API_URL=https://api.example.com
VITE_APP_NAME=AI Chatbot
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🆘 Support

For support, questions, or suggestions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Built with ❤️ by Your Team**

Last updated: February 2025
