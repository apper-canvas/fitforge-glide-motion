import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import Button from '@/components/atoms/Button';
import ExerciseCard from '@/components/molecules/ExerciseCard';
import WorkoutHeader from '@/components/organisms/WorkoutHeader';
import SkeletonLoader from '@/components/organisms/SkeletonLoader';
import ErrorState from '@/components/organisms/ErrorState';
import EmptyState from '@/components/organisms/EmptyState';
import ApperIcon from '@/components/ApperIcon';
import { workoutPlanService, userProfileService } from '@/services';

const Plan = () => {
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadTodayPlan();
    loadProfile();
  }, []);

  const loadTodayPlan = async () => {
    setLoading(true);
    setError(null);
    try {
      const plan = await workoutPlanService.getTodayPlan();
      setWorkout(plan);
    } catch (err) {
      setError(err.message || 'Failed to load workout plan');
      toast.error('Failed to load today\'s workout');
    } finally {
      setLoading(false);
    }
  };

  const loadProfile = async () => {
    try {
      const userProfile = await userProfileService.getCurrent();
      setProfile(userProfile);
    } catch (err) {
      // If no profile exists, redirect to setup
      navigate('/setup');
    }
  };

  const generateNewPlan = async () => {
    setGenerating(true);
    try {
      const preferences = {
        goals: profile?.goals || [],
        equipment: profile?.equipment || [],
        schedule: profile?.schedule || {}
      };
      
      const newPlan = await workoutPlanService.generatePlan(preferences);
      setWorkout(newPlan);
      toast.success('New workout generated!');
    } catch (err) {
      toast.error('Failed to generate new workout');
    } finally {
      setGenerating(false);
    }
  };

  const startWorkout = () => {
    if (!workout) return;
    navigate('/track', { state: { workoutId: workout.id } });
  };

  if (loading) {
    return (
      <div className="p-4 pb-24 max-w-full overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6">
          <SkeletonLoader count={1} type="card" />
          <SkeletonLoader count={4} type="exercise" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 pb-24 max-w-full overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <ErrorState
            message="Couldn't load your workout"
            description={error}
            onRetry={loadTodayPlan}
          />
        </div>
      </div>
    );
  }

  if (!workout || !workout.exercises?.length) {
    return (
      <div className="p-4 pb-24 max-w-full overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <EmptyState
            title="No workout plan today"
            description="Let our AI create a personalized workout for you based on your goals and equipment."
            actionLabel="Generate Workout"
            onAction={generateNewPlan}
            icon="Dumbbell"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 max-w-full overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Workout Header */}
        <WorkoutHeader
          workout={workout}
          onStart={startWorkout}
        />

        {/* Generate New Plan Button */}
        <div className="flex justify-between items-center">
<h2 className="text-xl font-semibold text-text-readable-primary font-display">
            Today's Exercises
          </h2>
          
          <Button
            variant="ghost"
            size="sm"
            icon="Shuffle"
            loading={generating}
            onClick={generateNewPlan}
          >
            Generate New
          </Button>
        </div>

        {/* Exercise List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={workout.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {workout.exercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ExerciseCard
                  exercise={exercise}
                  onStart={() => startWorkout()}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Workout Summary */}
        <div className="bg-card rounded-2xl p-6 border border-surface-600">
<h3 className="text-lg font-semibold text-text-readable-primary mb-4 font-display">
            Workout Summary
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary font-display">
{workout.exercises?.length || 0}
              </div>
              <div className="text-sm text-text-readable-secondary">Exercises</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary font-display">
{workout.exercises?.reduce((total, ex) => total + ex.sets, 0) || 0}
              </div>
              <div className="text-sm text-text-readable-secondary">Total Sets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent font-display">
~{workout.estimatedDuration}
              </div>
              <div className="text-sm text-text-readable-secondary">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning font-display">
{workout.targetMuscles?.length || 0}
              </div>
              <div className="text-sm text-text-readable-secondary">Muscle Groups</div>
            </div>
          </div>
        </div>

        {/* AI Tips */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/20 rounded-lg flex-shrink-0">
              <ApperIcon name="Sparkles" size={20} className="text-primary" />
            </div>
            
            <div>
<h3 className="text-lg font-semibold text-text-readable-primary mb-2 font-display">
AI Coach Tips
              </h3>
              <ul className="space-y-2 text-text-readable-secondary text-sm">
                <li className="flex items-start gap-2">
                  <ApperIcon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Focus on proper form over heavy weights</span>
                </li>
                <li className="flex items-start gap-2">
                  <ApperIcon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Take full rest periods between sets for best results</span>
                </li>
                <li className="flex items-start gap-2">
                  <ApperIcon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Stay hydrated throughout your workout</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;