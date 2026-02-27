import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Select = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full px-4 py-2 bg-white dark:bg-gray-800
          border border-gray-300 dark:border-gray-600 rounded-lg
          flex items-center justify-between hover:border-blue-400
          transition-colors ${className}
        `}
        {...props}
      >
        <span className="text-left">
          {options.find(opt => opt.value === value)?.label || placeholder}
        </span>
        <ChevronDown size={18} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-soft-lg z-50">
          {options.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`
                w-full px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-gray-700
                border-b border-gray-100 dark:border-gray-700 last:border-b-0
                ${value === option.value ? 'bg-blue-50 dark:bg-gray-700 font-semibold' : ''}
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
