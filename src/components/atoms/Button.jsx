import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 focus:ring-primary shadow-lg shadow-primary/25",
    secondary: "bg-surface-700 text-white hover:bg-surface-600 focus:ring-surface-500 border border-surface-600",
    success: "bg-gradient-to-r from-success to-accent text-white hover:from-success/90 hover:to-accent/90 focus:ring-success shadow-lg shadow-success/25",
    danger: "bg-gradient-to-r from-error to-red-600 text-white hover:from-error/90 hover:to-red-600/90 focus:ring-error shadow-lg shadow-error/25",
    ghost: "text-surface-300 hover:text-white hover:bg-surface-700 focus:ring-surface-500",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm gap-1.5",
    md: "px-4 py-3 text-base gap-2",
    lg: "px-6 py-4 text-lg gap-2.5",
    xl: "px-8 py-5 text-xl gap-3"
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24
  };

  const isDisabled = disabled || loading;

  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim();

  const renderIcon = (position) => {
    if (!icon || iconPosition !== position) return null;
    
    return (
      <ApperIcon
        name={icon}
        size={iconSizes[size]}
        className={loading ? 'animate-spin' : ''}
      />
    );
  };

  const handleClick = (e) => {
    if (isDisabled || !onClick) return;
    onClick(e);
  };

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      className={buttonClasses}
      onClick={handleClick}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <ApperIcon
          name="Loader2"
          size={iconSizes[size]}
          className="animate-spin"
        />
      )}
      {!loading && renderIcon('left')}
      {children}
      {!loading && renderIcon('right')}
    </motion.button>
  );
};

export default Button;