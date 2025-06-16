import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Input from '@/components/atoms/Input';
import Badge from '@/components/atoms/Badge';
import SkeletonLoader from '@/components/organisms/SkeletonLoader';
import ErrorState from '@/components/organisms/ErrorState';
import ApperIcon from '@/components/ApperIcon';
import { userProfileService } from '@/services';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const userProfile = await userProfileService.getCurrent();
      setProfile(userProfile);
      setEditData(userProfile);
    } catch (err) {
      setError(err.message || 'Failed to load profile');
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const updatedProfile = await userProfileService.update(profile.id, editData);
      setProfile(updatedProfile);
      setEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditData(profile);
    setEditing(false);
  };

  const handleGoalToggle = (goalId) => {
    setEditData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const handleEquipmentToggle = (equipmentId) => {
    setEditData(prev => ({
      ...prev,
      equipment: prev.equipment.includes(equipmentId)
        ? prev.equipment.filter(e => e !== equipmentId)
        : [...prev.equipment, equipmentId]
    }));
  };

  const goalOptions = [
    { id: 'strength', name: 'Build Strength', icon: 'Zap' },
    { id: 'muscle_gain', name: 'Muscle Growth', icon: 'TrendingUp' },
    { id: 'fat_loss', name: 'Lose Weight', icon: 'Target' },
    { id: 'endurance', name: 'Endurance', icon: 'Activity' },
    { id: 'flexibility', name: 'Flexibility', icon: 'RotateCcw' }
  ];

  const equipmentOptions = [
    { id: 'bodyweight', name: 'Bodyweight', icon: 'User' },
    { id: 'dumbbells', name: 'Dumbbells', icon: 'Dumbbell' },
    { id: 'barbell', name: 'Barbell', icon: 'Minus' },
    { id: 'resistance_bands', name: 'Resistance Bands', icon: 'Minus' },
    { id: 'pull_up_bar', name: 'Pull-up Bar', icon: 'Minus' },
    { id: 'bench', name: 'Bench', icon: 'Square' },
    { id: 'kettlebells', name: 'Kettlebells', icon: 'Circle' },
    { id: 'gym_access', name: 'Full Gym', icon: 'Building' }
  ];

  if (loading) {
    return (
      <div className="p-4 pb-24 max-w-full overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-6">
          <SkeletonLoader count={3} type="card" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 pb-24 max-w-full overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <ErrorState
            message="Couldn't load profile"
            description={error}
            onRetry={loadProfile}
          />
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="p-4 pb-24 max-w-full overflow-hidden">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
<h1 className="text-2xl font-bold text-surface-950 font-display">
              Profile Settings
            </h1>
            <p className="text-surface-400">
              Manage your fitness preferences and goals
            </p>
          </div>
          
          {!editing && (
            <Button
              variant="primary"
              size="sm"
              icon="Edit"
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
          )}
        </div>

        {/* Stats Overview */}
        <Card>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary font-display">
                {profile.currentStreak || 0}
              </div>
<div className="text-sm text-surface-950">Current Streak</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary font-display">
                {profile.totalWorkouts || 0}
              </div>
              <div className="text-sm text-surface-950">Total Workouts</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-accent font-display">
                {profile.schedule?.daysPerWeek || 0}
              </div>
              <div className="text-sm text-surface-950">Days/Week</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-warning font-display">
                {profile.schedule?.sessionDuration || 0}m
              </div>
              <div className="text-sm text-surface-950">Per Session</div>
            </div>
          </div>
        </Card>

        {/* Fitness Goals */}
        <Card>
          <div className="flex justify-between items-center mb-4">
<h3 className="text-lg font-semibold text-surface-950 font-display">
              Fitness Goals
            </h3>
          </div>
          
          {editing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {goalOptions.map((goal) => (
                <motion.div
                  key={goal.id}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all
                    ${editData.goals?.includes(goal.id)
                      ? 'bg-primary/20 border border-primary/30'
                      : 'bg-surface-800 hover:bg-surface-700'
                    }
                  `}
                  onClick={() => handleGoalToggle(goal.id)}
                >
                  <ApperIcon
                    name={goal.icon}
                    size={20}
                    className={editData.goals?.includes(goal.id) ? 'text-primary' : 'text-surface-400'}
                  />
<span className="text-surface-950 font-medium">{goal.name}</span>
                  {editData.goals?.includes(goal.id) && (
                    <ApperIcon name="Check" size={16} className="text-primary ml-auto" />
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.goals?.map((goalId) => {
                const goal = goalOptions.find(g => g.id === goalId);
                return goal ? (
                  <Badge key={goalId} variant="primary" icon={goal.icon}>
                    {goal.name}
                  </Badge>
                ) : null;
              })}
            </div>
          )}
        </Card>

        {/* Available Equipment */}
        <Card>
          <div className="flex justify-between items-center mb-4">
<h3 className="text-lg font-semibold text-surface-950 font-display">
              Available Equipment
            </h3>
          </div>
          
          {editing ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {equipmentOptions.map((equipment) => (
                <motion.div
                  key={equipment.id}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer transition-all text-center
                    ${editData.equipment?.includes(equipment.id)
                      ? 'bg-secondary/20 border border-secondary/30'
                      : 'bg-surface-800 hover:bg-surface-700'
                    }
                  `}
                  onClick={() => handleEquipmentToggle(equipment.id)}
                >
                  <ApperIcon
                    name={equipment.icon}
                    size={20}
                    className={editData.equipment?.includes(equipment.id) ? 'text-secondary' : 'text-surface-400'}
                  />
<span className="text-sm text-surface-950 font-medium">{equipment.name}</span>
                  {editData.equipment?.includes(equipment.id) && (
                    <ApperIcon name="Check" size={14} className="text-secondary" />
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.equipment?.map((equipmentId) => {
                const equipment = equipmentOptions.find(e => e.id === equipmentId);
                return equipment ? (
                  <Badge key={equipmentId} variant="secondary" icon={equipment.icon}>
                    {equipment.name}
                  </Badge>
                ) : null;
              })}
            </div>
          )}
        </Card>

        {/* Workout Schedule */}
        <Card>
<h3 className="text-lg font-semibold text-surface-950 mb-4 font-display">
            Workout Schedule
          </h3>
          
          {editing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-200 mb-2">
                  Days per week
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((days) => (
                    <Button
                      key={days}
                      variant={editData.schedule?.daysPerWeek === days ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setEditData(prev => ({
                        ...prev,
                        schedule: { ...prev.schedule, daysPerWeek: days }
                      }))}
                    >
                      {days}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-200 mb-2">
                  Session duration
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[30, 45, 60, 90].map((duration) => (
                    <Button
                      key={duration}
                      variant={editData.schedule?.sessionDuration === duration ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setEditData(prev => ({
                        ...prev,
                        schedule: { ...prev.schedule, sessionDuration: duration }
                      }))}
                    >
                      {duration}m
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-200 mb-2">
                  Preferred time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'morning', label: 'Morning' },
                    { value: 'afternoon', label: 'Afternoon' },
                    { value: 'evening', label: 'Evening' }
                  ].map((time) => (
                    <Button
                      key={time.value}
                      variant={editData.schedule?.preferredTime === time.value ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setEditData(prev => ({
                        ...prev,
                        schedule: { ...prev.schedule, preferredTime: time.value }
                      }))}
                    >
                      {time.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-surface-800 rounded-lg">
<div className="text-lg font-bold text-primary font-display">
                  {profile.schedule?.daysPerWeek || 0}
                </div>
                <div className="text-sm text-surface-950">Days per week</div>
              </div>
              
              <div className="text-center p-4 bg-surface-800 rounded-lg">
                <div className="text-lg font-bold text-secondary font-display">
                  {profile.schedule?.sessionDuration || 0}m
                </div>
                <div className="text-sm text-surface-950">Per session</div>
              </div>
              
              <div className="text-center p-4 bg-surface-800 rounded-lg">
                <div className="text-lg font-bold text-accent font-display capitalize">
                  {profile.schedule?.preferredTime || 'Any'}
                </div>
                <div className="text-sm text-surface-950">Preferred time</div>
              </div>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        {editing && (
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              size="lg"
              fullWidth
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        )}

        {/* Danger Zone */}
        <Card variant="error">
<h3 className="text-lg font-semibold text-surface-950 mb-2 font-display">
            Reset Profile
          </h3>
          <p className="text-sm text-surface-950 mb-4">
            This will reset all your preferences and workout history. This action cannot be undone.
          </p>
          
          <Button
            variant="danger"
            size="sm"
            icon="RotateCcw"
            onClick={() => navigate('/setup')}
          >
            Reset & Start Over
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Profile;