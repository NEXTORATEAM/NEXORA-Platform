import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  disabled = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'font-tajawal font-medium transition-all duration-300 rounded-xl focus:outline-none flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100';
  
  const variants = {
    primary: 'bg-brand-darker text-white hover:bg-brand-dark shadow-md hover:shadow-lg',
    secondary: 'bg-brand-primary text-white hover:bg-brand-darker shadow-sm',
    accent: 'bg-brand-soft text-brand-darker hover:bg-brand-light hover:text-white font-semibold',
    outline: 'border-2 border-brand-primary text-brand-darker hover:bg-brand-primary hover:text-white',
    ghost: 'text-brand-darker hover:bg-brand-soft/50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg font-bold',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>جاري التحميل...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;