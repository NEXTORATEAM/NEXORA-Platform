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
        <label htmlFor={id} className="text-sm font-semibold text-[#021024]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {/* التحقق من أن Icon عبارة عن دالة/مكون صالح وليست كالكائن */}
        {Icon && typeof Icon === 'function' && (
          <div className="absolute right-3.5 text-[#5483B3] pointer-events-none flex items-center">
            <Icon size={20} />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`w-full bg-white border ${
            error ? 'border-red-500 focus:ring-red-200' : 'border-[#7DA0CA]/40 focus:border-[#5483B3] focus:ring-[#C1E8FF]/60'
          } rounded-xl py-2.5 ${Icon ? 'pr-11 pl-4' : 'px-4'} text-[#021024] placeholder-[#7DA0CA]/70 focus:outline-none focus:ring-4 transition-all duration-200 text-sm`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
};

export default Input;