import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import SetTracker from '@/components/molecules/SetTracker';
import Timer from '@/components/molecules/Timer';
import ProgressRing from '@/components/atoms/ProgressRing';
import SkeletonLoader from '@/components/organisms/SkeletonLoader';
import ErrorState from '@/components/organisms/ErrorState';
import ApperIcon from '@/components/ApperIcon';
import { workoutPlanService, workoutLogService } from '@/services';

const Track = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [workout, setWorkout] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [completedSets, setCompletedSets] = useState({});
  const [isResting, setIsResting] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const workoutId = location.state?.workoutId;

  useEffect(() => {
    if (workoutId) {
      loadWorkout();
    } else {
      navigate('/plan');
    }
  }, [workoutId]);

  useEffect(() => {
    if (workoutStartTime && !isPaused) {
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - workoutStartTime) / 1000));
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [workoutStartTime, isPaused]);

  const loadWorkout = async () => {
    setLoading(true);
    setError(null);
    try {
      const plan = await workoutPlanService.getById(workoutId);
      setWorkout(plan);
      setWorkoutStartTime(Date.now());
    } catch (err) {
      setError(err.message || 'Failed to load workout');
      toast.error('Failed to load workout');
    } finally {
      setLoading(false);
    }
  };

  const handleSetComplete = async (setData) => {
    const exerciseKey = `${currentExerciseIndex}-${currentSet}`;
    const newCompletedSets = {
      ...completedSets,
      [exerciseKey]: setData
    };
    setCompletedSets(newCompletedSets);

    const currentExercise = workout.exercises[currentExerciseIndex];
    
    // Move to next set or exercise
    if (currentSet < currentExercise.sets) {
      setCurrentSet(currentSet + 1);
      setIsResting(true);
      toast.success(`Set ${currentSet} completed!`);
    } else {
      // Exercise complete
      toast.success(`${currentExercise.name} completed!`);
      
      if (currentExerciseIndex < workout.exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSet(1);
        setIsResting(false);
      } else {
        // Workout complete
        completeWorkout();
      }
    }
  };

  const handleWeightChange = (newWeight) => {
    if (!workout) return;
    
    const updatedExercises = [...workout.exercises];
    updatedExercises[currentExerciseIndex].weight = newWeight;
    
    setWorkout({
      ...workout,
      exercises: updatedExercises
    });
  };

  const handleRestComplete = () => {
    setIsResting(false);
    toast.success('Rest complete! Ready for your next set.');
  };

  const skipRest = () => {
    setIsResting(false);
  };

  const pauseWorkout = () => {
    setIsPaused(!isPaused);
    toast.info(isPaused ? 'Workout resumed' : 'Workout paused');
  };

  const completeWorkout = async () => {
    try {
      const workoutLog = {
        planId: workout.id,
        exercises: Object.entries(completedSets).map(([key, setData]) => {
          const [exerciseIndex, setNumber] = key.split('-');
          const exercise = workout.exercises[parseInt(exerciseIndex)];
          return {
            exerciseId: exercise.id,
            name: exercise.name,
            sets: [setData]
          };
        }),
        duration: elapsed,
        completed: true
      };

      await workoutLogService.create(workoutLog);
      toast.success('Workout completed! Great job! 🎉');
      navigate('/progress');
    } catch (err) {
      toast.error('Failed to save workout');
    }
  };

  const exitWorkout = () => {
    if (Object.keys(completedSets).length > 0) {
      if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
        navigate('/plan');
      }
    } else {
      navigate('/plan');
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="p-4 pb-24 max-w-full overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <SkeletonLoader count={2} type="card" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 pb-24 max-w-full overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <ErrorState
            message="Couldn't load workout"
            description={error}
            onRetry={loadWorkout}
          />
        </div>
      </div>
    );
  }

  if (!workout) return null;

  const currentExercise = workout.exercises[currentExerciseIndex];
  const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets, 0);
  const completedSetsCount = Object.keys(completedSets).length;
  const progress = (completedSetsCount / totalSets) * 100;

  return (
    <div className="p-4 pb-24 max-w-full overflow-hidden">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            icon="ArrowLeft"
            onClick={exitWorkout}
          >
            Exit
          </Button>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary font-display">
              {formatTime(elapsed)}
            </div>
            <div className="text-xs text-surface-400">
              {isPaused ? 'Paused' : 'Active'}
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            icon={isPaused ? "Play" : "Pause"}
            onClick={pauseWorkout}
          />
        </div>

        {/* Progress Ring */}
        <div className="flex justify-center">
<ProgressRing
            progress={progress}
            size={120}
            strokeWidth={8}
            color="#27AE60"
          >
            <div className="text-center">
<div className="text-lg font-bold text-text-readable-primary font-display">
                {currentExerciseIndex + 1}/{workout.exercises.length}
              </div>
              <div className="text-xs text-text-readable-secondary">exercises</div>
            </div>
          </ProgressRing>
        </div>

        {/* Current Exercise Info */}
        <div className="text-center">
<h2 className="text-xl font-semibold text-text-readable-primary mb-1 font-display">
            {currentExercise.name}
          </h2>
          <p className="text-text-readable-secondary">
            Exercise {currentExerciseIndex + 1} of {workout.exercises.length}
          </p>
        </div>

        {/* Rest Timer or Set Tracker */}
        <AnimatePresence mode="wait">
          {isResting ? (
            <Timer
              key="rest-timer"
              duration={currentExercise.rest}
              onComplete={handleRestComplete}
              onStop={skipRest}
              autoStart={true}
              title={`Rest Timer - Set ${currentSet - 1} Complete`}
            />
          ) : (
            <SetTracker
              key={`exercise-${currentExerciseIndex}-set-${currentSet}`}
              exercise={currentExercise}
              currentSet={currentSet}
              onSetComplete={handleSetComplete}
              onWeightChange={handleWeightChange}
            />
          )}
        </AnimatePresence>

        {/* Exercise Queue */}
<div className="bg-card rounded-2xl p-4 border border-surface-300">
<h3 className="text-sm font-medium text-text-readable-primary mb-3">
            Up Next
          </h3>
          
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {workout.exercises.slice(currentExerciseIndex + 1, currentExerciseIndex + 4).map((exercise, index) => (
              <div
                key={exercise.id}
                className="flex items-center gap-3 py-2 px-3 bg-surface-800 rounded-lg"
              >
                <div className="w-8 h-8 bg-surface-700 rounded-full flex items-center justify-center text-xs font-medium text-surface-400">
                  {currentExerciseIndex + index + 2}
                </div>
                
                <div className="flex-1 min-w-0">
<h4 className="text-sm font-medium text-text-readable-primary truncate">
                    {exercise.name}
                  </h4>
                  <p className="text-xs text-text-readable-secondary">
                    {exercise.sets} × {exercise.reps}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Tips */}
        <div className="bg-gradient-to-r from-accent/10 to-success/10 rounded-2xl p-4 border border-accent/20">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-accent/20 rounded-lg flex-shrink-0">
              <ApperIcon name="Lightbulb" size={16} className="text-accent" />
            </div>
            
            <div>
<h4 className="text-sm font-semibold text-text-readable-primary mb-1">
                Form Tip for {currentExercise.name}
              </h4>
              <p className="text-xs text-text-readable-secondary">
                Keep your core engaged and maintain proper breathing throughout the movement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;