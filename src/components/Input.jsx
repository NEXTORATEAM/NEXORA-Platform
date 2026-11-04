import React from 'react';

const Input = ({
  label,
  error,
  icon: Icon = null,
  type = 'text',
  placeholder,
  className = '',
  id,
  ...props
}) => {
  return (
    <div className={`w-full flex flex-col gap-1.5 font-tajawal text-right ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && typeof Icon === 'function' && (
          <div className="absolute right-3.5 text-brand-primary pointer-events-none flex items-center">
            <Icon size={20} />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`w-full bg-white dark:bg-slate-900 border ${
            error ? 'border-red-500 focus:ring-red-200' : 'border-brand-light/40 dark:border-slate-700 focus:border-brand-primary focus:ring-brand-soft/60'
          } rounded-xl py-2.5 ${Icon ? 'pr-11 pl-4' : 'px-4'} text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-4 transition-all duration-200 text-sm`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
};

export default Input;