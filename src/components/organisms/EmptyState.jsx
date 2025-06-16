import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const EmptyState = ({
  title = "Nothing here yet",
  description = "Get started by adding your first item.",
  actionLabel = "Get Started",
  onAction,
  icon = "Package",
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`text-center py-12 px-6 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="mb-6"
      >
        <ApperIcon 
          name={icon} 
          size={64}
          className="text-surface-400 mx-auto"
        />
      </motion.div>
      
<h3 className="text-xl font-semibold text-text-readable-primary mb-2 font-display">
        {title}
</h3>
      
      <p className="text-text-readable-secondary mb-6 max-w-md mx-auto">
        {description}
      </p>
      {onAction && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;