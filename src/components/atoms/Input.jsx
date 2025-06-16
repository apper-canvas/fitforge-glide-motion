import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = ({
  label,
  type = 'text',
  icon,
  error,
  helper,
  disabled = false,
  className = '',
  ...props
}) => {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-surface-200 mb-2"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon
              name={icon}
              size={18}
              className="text-surface-400"
            />
          </div>
        )}
        
        <input
          {...props}
          id={inputId}
          type={type}
          disabled={disabled}
          className={`
            w-full px-4 py-3 bg-surface-800 border border-surface-600 rounded-lg text-white placeholder-surface-400
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-error focus:ring-error' : ''}
          `}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-error flex items-center gap-1">
          <ApperIcon name="AlertCircle" size={14} />
          {error}
        </p>
      )}
      
      {helper && !error && (
        <p className="mt-1 text-sm text-surface-400">
          {helper}
        </p>
      )}
    </div>
  );
};

export default Input;