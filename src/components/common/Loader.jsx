import { Loader as LoaderIcon } from 'lucide-react';

const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <LoaderIcon
      className={`animate-spin text-blue-500 ${sizes[size]} ${className}`}
    />
  );
};

const Loader = ({ fullScreen = false, text = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-soft-xl">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-700 dark:text-gray-300">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Spinner size="lg" className="mb-4" />
      <p className="text-gray-600 dark:text-gray-400">{text}</p>
    </div>
  );
};

export { Spinner };
export default Loader;
