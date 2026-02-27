import { forwardRef } from 'react';

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      fullWidth = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-gradient-primary text-white hover:shadow-lg hover:shadow-blue-500/30',
      secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700',
      outline: 'border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800',
      danger: 'bg-red-500 text-white hover:bg-red-600',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
