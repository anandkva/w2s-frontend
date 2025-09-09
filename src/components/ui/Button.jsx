import React from 'react';

const Button = ({ 
  children, 
  loading = false, 
  variant = 'primary', 
  size = 'default',
  disabled = false,
  onClick,
  ...props 
}) => {
  const baseClasses = `
    inline-flex items-center justify-center space-x-2 
    font-medium transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    rounded-lg
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-orange-600 via-yellow-600 to-red-700
      hover:from-orange-700 hover:via-yellow-700 hover:to-red-800
      text-white shadow-lg hover:shadow-xl
      focus:ring-orange-500
    `,
    secondary: `
      bg-gray-100 hover:bg-gray-200 
      text-gray-700 border border-gray-300
      focus:ring-gray-500
    `,
    danger: `
      bg-red-600 hover:bg-red-700 
      text-white shadow-lg hover:shadow-xl
      focus:ring-red-500
    `,
    outline: `
      bg-transparent border-2 border-orange-600 
      text-orange-600 hover:bg-orange-600 hover:text-white
      focus:ring-orange-500
    `,
  };

  const sizes = {
    small: 'px-3 py-2 text-sm',
    default: 'px-4 py-3 text-base w-full',
    large: 'px-6 py-4 text-lg w-full',
  };

  const isDisabled = loading || disabled;

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${
        isDisabled ? 'opacity-75 cursor-not-allowed' : ''
      }`}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current opacity-75"></div>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;