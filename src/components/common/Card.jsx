const Card = ({
  children,
  className = '',
  hover = false,
  onClick,
  ...props
}) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
        shadow-soft dark:shadow-soft-lg p-6
        ${hover ? 'cursor-pointer transition-all duration-300 hover:shadow-soft-lg hover:border-blue-300 dark:hover:border-blue-500' : ''}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
