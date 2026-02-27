import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    try {
      const isAuthed = localStorage.getItem('auth') === 'true';
      if (isAuthed) {
        navigate('/dashboard', { replace: true });
      }
    } catch {
      // ignore
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('authUser', JSON.stringify({ name, email }));
    } catch {
      // ignore
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to AI Chatbot</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sign in or create an account to continue</p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              mode === 'login'
                ? 'bg-white dark:bg-gray-900 text-blue-600'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              mode === 'register'
                ? 'bg-white dark:bg-gray-900 text-blue-600'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Register
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 text-white py-2 font-semibold hover:bg-blue-600 transition-all"
          >
            {mode === 'login' ? 'Login' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
