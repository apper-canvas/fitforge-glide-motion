import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const ErrorState = ({
  message = "Something went wrong",
  description = "We encountered an error while loading your data.",
  onRetry,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`text-center py-12 px-6 ${className}`}
    >
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
        className="mb-6"
      >
        <ApperIcon 
          name="AlertTriangle" 
          size={64}
          className="text-error mx-auto"
        />
      </motion.div>
      
<h3 className="text-xl font-semibold text-text-readable-primary mb-2 font-display">
        {message}
      </h3>
      
      <p className="text-surface-400 mb-6 max-w-md mx-auto">
        {description}
      </p>
      
      {onRetry && (
        <Button
          variant="primary"
          icon="RefreshCw"
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default ErrorState;