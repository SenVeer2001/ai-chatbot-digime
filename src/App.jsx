
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import FloatingChatbot from './components/common/FloatingChatbot';

import AuthPage from './pages/Auth';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/Home';
import DIGIMEPage from './pages/DIGIME';
import AICHAPage from './pages/AICHA';
import AICHADetailPage from './pages/AICHADetail';
import DIGIMEDetailPage from './pages/DIGIMEDetail';
import ProjectsPage from './pages/Projects';
import ToolsPage from './pages/Tools';
import CreateDigiMeePage from './components/digimee/CreateDigiMeePage';
import ThemeLayout from './components/layout/themeLayout';

const isAuthenticated = () => {
  try {
    return localStorage.getItem('auth') === 'true';
  } catch {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/auth" replace />;
};

function App() {
  return (
    < ThemeLayout>
    <AppProvider>
      <Router>
        <FloatingChatbot />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/digime" element={<ProtectedRoute><DIGIMEPage /></ProtectedRoute>} />
          <Route path="/digime/create" element={<ProtectedRoute><CreateDigiMeePage /></ProtectedRoute>} />
          <Route path="/digime/:id" element={<ProtectedRoute><DIGIMEDetailPage /></ProtectedRoute>} />
          <Route path="/aicha" element={<ProtectedRoute><AICHAPage /></ProtectedRoute>} />
          <Route path="/aicha/:id" element={<ProtectedRoute><AICHADetailPage /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
          <Route path="/tools" element={<ProtectedRoute><ToolsPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>

    </ThemeLayout>
  );
}

export default App;
