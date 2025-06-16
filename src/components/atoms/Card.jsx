import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  onClick,
  ...props
}) => {
  const variants = {
    default: 'bg-card border border-surface-600',
    primary: 'bg-card border border-primary/30',
    success: 'bg-card border border-success/30',
    warning: 'bg-card border border-warning/30',
    error: 'bg-card border border-error/30'
  };

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const cardClasses = `
    ${variants[variant]}
    ${paddings[padding]}
    rounded-xl transition-all duration-200
    ${hover ? 'hover:border-primary/50 cursor-pointer' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `.trim();

  const Component = onClick ? motion.div : 'div';
  const motionProps = onClick ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
  } : {};

  return (
    <Component
      className={cardClasses}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;