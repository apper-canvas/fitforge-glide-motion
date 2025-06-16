import React from 'react';
import { motion } from 'framer-motion';

const ProgressRing = ({
  progress = 0,
  size = 120,
  strokeWidth = 8,
  color = '#059669',
  backgroundColor = '#166534',
  children,
  animated = true,
  className = ''
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? offset : circumference - (progress / 100) * circumference}
          strokeLinecap="round"
          initial={animated ? { strokeDashoffset: circumference } : false}
          animate={animated ? { strokeDashoffset: offset } : false}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>
      
      {/* Center content */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default ProgressRing;