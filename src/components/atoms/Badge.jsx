import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
const variants = {
    default: 'bg-surface-200 text-text-readable-primary',
    primary: 'bg-primary/20 text-primary border border-primary/50',
    secondary: 'bg-secondary/20 text-secondary border border-secondary/50',
    success: 'bg-success/20 text-success border border-success/50',
    warning: 'bg-warning/20 text-warning border border-warning/50',
    error: 'bg-error/20 text-error border border-error/50',
    accent: 'bg-accent/20 text-accent border border-accent/50'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2'
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  const badgeClasses = `
    inline-flex items-center font-medium rounded-full
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim();

  return (
    <span className={badgeClasses} {...props}>
      {icon && (
        <ApperIcon
          name={icon}
          size={iconSizes[size]}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;