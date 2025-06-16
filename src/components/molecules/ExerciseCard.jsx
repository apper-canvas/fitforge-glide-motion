import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const ExerciseCard = ({
  exercise,
  isActive = false,
  isCompleted = false,
  onStart,
  className = ''
}) => {
  const getMuscleGroupColor = (muscleGroup) => {
    const colors = {
      chest: 'primary',
      back: 'secondary',
      shoulders: 'accent',
      arms: 'warning',
      legs: 'success',
      core: 'error',
      biceps: 'warning',
      triceps: 'warning',
      quadriceps: 'success',
      hamstrings: 'success',
      glutes: 'success',
      calves: 'success',
      abs: 'error'
    };
    return colors[muscleGroup] || 'default';
  };

  const primaryMuscleGroup = exercise.muscleGroups?.[0] || 'general';
  const borderColor = getMuscleGroupColor(primaryMuscleGroup);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Card
        variant={isActive ? 'primary' : isCompleted ? 'success' : 'default'}
        className={`
          relative overflow-hidden
          ${isActive ? 'ring-2 ring-primary/50' : ''}
          ${isCompleted ? 'ring-2 ring-success/50' : ''}
        `}
        hover={!isActive && !isCompleted}
        onClick={onStart}
      >
        {/* Status indicator */}
        <div className="absolute top-4 right-4">
          {isCompleted ? (
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <ApperIcon name="Check" size={16} className="text-white" />
            </div>
          ) : isActive ? (
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-pulse">
              <ApperIcon name="Play" size={16} className="text-white" />
</div>
          ) : (
<div className="w-8 h-8 bg-surface-300 rounded-full flex items-center justify-center opacity-50">
              <ApperIcon name="Clock" size={16} className="text-text-readable-primary" />
            </div>
          )}
        </div>

        <div className="pr-12">
          {/* Exercise name */}
<h3 className="text-lg font-semibold text-text-readable-primary mb-2 font-display">
            {exercise.name}
          </h3>

{/* Exercise details */}
          <div className="flex flex-wrap gap-3 mb-3">
<div className="flex items-center gap-1 text-text-readable-primary">
              <ApperIcon name="Repeat" size={16} />
              <span className="text-sm">
                {exercise.sets} × {exercise.reps}
              </span>
            </div>
{exercise.weight > 0 && (
              <div className="flex items-center gap-1 text-text-readable-primary">
                <ApperIcon name="Weight" size={16} />
                <span className="text-sm">{exercise.weight}kg</span>
              </div>
            )}
)}
            
            <div className="flex items-center gap-1 text-text-readable-primary">
              <ApperIcon name="Timer" size={16} />
              <span className="text-sm">{exercise.rest}s rest</span>
            </div>
          </div>

          {/* Muscle groups */}
          <div className="flex flex-wrap gap-1">
            {exercise.muscleGroups?.slice(0, 3).map((muscle, index) => (
              <Badge
                key={index}
                variant={getMuscleGroupColor(muscle)}
                size="sm"
              >
                {muscle}
              </Badge>
            ))}
            {exercise.muscleGroups?.length > 3 && (
              <Badge variant="default" size="sm">
                +{exercise.muscleGroups.length - 3}
              </Badge>
            )}
          </div>
        </div>

{/* Active indicator bar */}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </Card>
    </motion.div>
  );
};

export default ExerciseCard;