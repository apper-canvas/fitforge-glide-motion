import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  color = 'primary',
  className = ''
}) => {
  const colorClasses = {
    primary: 'text-primary border-primary/30',
    secondary: 'text-secondary border-secondary/30',
    success: 'text-success border-success/30',
    warning: 'text-warning border-warning/30',
    error: 'text-error border-error/30',
    accent: 'text-accent border-accent/30'
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-surface-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={className}
    >
      <Card className={`border ${colorClasses[color].split(' ')[1]} relative overflow-hidden`}>
        {/* Background pattern */}
        <div className="absolute top-0 right-0 opacity-5">
          <ApperIcon name={icon} size={80} />
        </div>

        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg bg-${color}/20`}>
              <ApperIcon
                name={icon}
                size={20}
                className={colorClasses[color].split(' ')[0]}
              />
            </div>
            
            {trend && trendValue && (
              <div className={`flex items-center gap-1 ${getTrendColor()}`}>
                <ApperIcon name={getTrendIcon()} size={14} />
                <span className="text-sm font-medium">{trendValue}</span>
              </div>
            )}
          </div>

          {/* Value */}
          <div className="mb-2">
<h3 className="text-2xl font-bold text-text-readable-primary font-display">
{value}
            </h3>
            <p className="text-text-readable-primary text-sm">
              {title}
            </p>
          </div>

{/* Subtitle */}
          {subtitle && (
            <p className="text-xs text-text-readable-secondary">
              {subtitle}
            </p>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;