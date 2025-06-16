import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ count = 3, type = 'card', className = '' }) => {
  const renderSkeleton = (index) => {
    switch (type) {
      case 'exercise':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl p-4 border border-surface-600"
          >
            <div className="animate-pulse">
              <div className="flex justify-between items-start mb-3">
                <div className="h-6 bg-surface-700 rounded w-3/4"></div>
                <div className="w-8 h-8 bg-surface-700 rounded-full"></div>
              </div>
              
              <div className="flex gap-3 mb-3">
                <div className="h-4 bg-surface-700 rounded w-16"></div>
                <div className="h-4 bg-surface-700 rounded w-20"></div>
                <div className="h-4 bg-surface-700 rounded w-18"></div>
              </div>
              
              <div className="flex gap-1">
                <div className="h-6 bg-surface-700 rounded-full w-16"></div>
                <div className="h-6 bg-surface-700 rounded-full w-20"></div>
              </div>
            </div>
          </motion.div>
        );

      case 'stat':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl p-4 border border-surface-600"
          >
            <div className="animate-pulse">
              <div className="flex justify-between items-center mb-3">
                <div className="w-10 h-10 bg-surface-700 rounded-lg"></div>
                <div className="h-4 bg-surface-700 rounded w-12"></div>
              </div>
              
              <div className="h-8 bg-surface-700 rounded w-20 mb-2"></div>
              <div className="h-4 bg-surface-700 rounded w-full"></div>
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl p-6 border border-surface-600"
          >
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-surface-700 rounded w-3/4"></div>
              <div className="h-4 bg-surface-700 rounded w-1/2"></div>
              <div className="h-4 bg-surface-700 rounded w-2/3"></div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {[...Array(count)].map((_, index) => renderSkeleton(index))}
    </div>
  );
};

export default SkeletonLoader;