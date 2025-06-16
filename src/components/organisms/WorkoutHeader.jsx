import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import { format } from 'date-fns';

const WorkoutHeader = ({
  workout,
  isActive = false,
  onStart,
  onPause,
  onComplete,
  currentExercise = 0,
  duration = 0,
  className = ''
}) => {
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = workout?.exercises ? (currentExercise / workout.exercises.length) * 100 : 0;

  return (
    <div className={`bg-card rounded-2xl p-6 ${className}`}>
      {/* Header info */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 font-display">
            Today's Workout
          </h1>
          <p className="text-surface-300">
            {format(new Date(), 'EEEE, MMMM do')}
          </p>
        </div>
        
        {isActive && (
          <div className="text-right">
            <div className="text-2xl font-bold text-primary font-display">
              {formatDuration(duration)}
            </div>
            <p className="text-xs text-surface-400">elapsed</p>
          </div>
        )}
      </div>

      {/* Workout details */}
      {workout && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-3 mb-3">
            <div className="flex items-center gap-1 text-surface-300">
              <ApperIcon name="Dumbbell" size={16} />
              <span className="text-sm">
                {workout.exercises?.length || 0} exercises
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-surface-300">
              <ApperIcon name="Clock" size={16} />
              <span className="text-sm">
                ~{workout.estimatedDuration} min
              </span>
            </div>
          </div>

          {/* Target muscles */}
          <div className="flex flex-wrap gap-1 mb-4">
            {workout.targetMuscles?.map((muscle, index) => (
              <Badge key={index} variant="accent" size="sm">
                {muscle}
              </Badge>
            ))}
          </div>

          {/* Progress bar */}
          <div className="relative">
            <div className="w-full bg-surface-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-xs text-surface-400 mt-1">
              {currentExercise} of {workout.exercises?.length || 0} exercises completed
            </p>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        {!isActive ? (
          <Button
            variant="primary"
            size="lg"
            fullWidth
            icon="Play"
            onClick={onStart}
          >
            Start Workout
          </Button>
        ) : (
          <>
            <Button
              variant="secondary"
              size="lg"
              icon="Pause"
              onClick={onPause}
            >
              Pause
            </Button>
            
            <Button
              variant="success"
              size="lg"
              fullWidth
              icon="CheckCircle"
              onClick={onComplete}
            >
              Complete Workout
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkoutHeader;