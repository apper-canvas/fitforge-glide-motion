import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';
import { userProfileService } from '@/services';

const Setup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    goals: [],
    equipment: [],
    schedule: {
      daysPerWeek: 3,
      sessionDuration: 45,
      preferredTime: 'morning'
    }
  });
  const [loading, setLoading] = useState(false);

  const goalOptions = [
    { id: 'strength', name: 'Build Strength', icon: 'Zap', description: 'Increase muscle strength and power' },
    { id: 'muscle_gain', name: 'Muscle Growth', icon: 'TrendingUp', description: 'Build lean muscle mass' },
    { id: 'fat_loss', name: 'Lose Weight', icon: 'Target', description: 'Burn fat and get leaner' },
    { id: 'endurance', name: 'Endurance', icon: 'Activity', description: 'Improve cardiovascular fitness' },
    { id: 'flexibility', name: 'Flexibility', icon: 'RotateCcw', description: 'Increase mobility and flexibility' }
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

  const handleGoalToggle = (goalId) => {
    setProfile(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const handleEquipmentToggle = (equipmentId) => {
    setProfile(prev => ({
      ...prev,
      equipment: prev.equipment.includes(equipmentId)
        ? prev.equipment.filter(e => e !== equipmentId)
        : [...prev.equipment, equipmentId]
    }));
  };

  const handleScheduleChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [field]: value
      }
    }));
  };

  const handleComplete = async () => {
    if (profile.goals.length === 0) {
      toast.error('Please select at least one fitness goal');
      return;
    }

    if (profile.equipment.length === 0) {
      toast.error('Please select your available equipment');
      return;
    }

    setLoading(true);
    try {
      await userProfileService.create(profile);
      toast.success('Profile created successfully!');
      navigate('/plan');
    } catch (error) {
      toast.error('Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex items-center gap-4">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${step >= stepNum ? 'bg-primary text-white' : 'bg-surface-700 text-surface-400'}
            `}>
              {stepNum}
            </div>
            {stepNum < 3 && (
              <div className={`w-12 h-1 mx-2 ${step > stepNum ? 'bg-primary' : 'bg-surface-700'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderGoalsStep = () => (
    <motion.div
      key="goals"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="text-center mb-8">
<h2 className="text-3xl font-bold text-text-readable-primary mb-2 font-display">
          What are your fitness goals?
        </h2>
        <p className="text-surface-300">
          Select all that apply to create a personalized plan
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {goalOptions.map((goal) => (
          <Card
            key={goal.id}
            variant={profile.goals.includes(goal.id) ? 'primary' : 'default'}
            className="cursor-pointer transition-all duration-200"
            onClick={() => handleGoalToggle(goal.id)}
          >
            <div className="flex items-start gap-4">
              <div className={`
                p-3 rounded-lg
                ${profile.goals.includes(goal.id) ? 'bg-primary/20' : 'bg-surface-700'}
              `}>
                <ApperIcon
                  name={goal.icon}
                  size={24}
                  className={profile.goals.includes(goal.id) ? 'text-primary' : 'text-surface-400'}
                />
              </div>
              
              <div className="flex-1">
<h3 className="text-lg font-semibold text-text-readable-primary mb-1">
                  {goal.name}
                </h3>
                <p className="text-sm text-surface-400">
                  {goal.description}
                </p>
              </div>
              
              {profile.goals.includes(goal.id) && (
                <ApperIcon name="Check" size={20} className="text-primary" />
              )}
            </div>
          </Card>
        ))}
      </div>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={() => setStep(2)}
        disabled={profile.goals.length === 0}
      >
        Continue
      </Button>
    </motion.div>
  );

  const renderEquipmentStep = () => (
    <motion.div
      key="equipment"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="text-center mb-8">
<h2 className="text-3xl font-bold text-text-readable-primary mb-2 font-display">
          What equipment do you have?
        </h2>
        <p className="text-surface-300">
          This helps us create workouts you can actually do
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {equipmentOptions.map((equipment) => (
          <Card
            key={equipment.id}
            variant={profile.equipment.includes(equipment.id) ? 'primary' : 'default'}
            className="cursor-pointer text-center p-6 transition-all duration-200"
            onClick={() => handleEquipmentToggle(equipment.id)}
          >
            <div className={`
              w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center
              ${profile.equipment.includes(equipment.id) ? 'bg-primary/20' : 'bg-surface-700'}
            `}>
              <ApperIcon
                name={equipment.icon}
                size={24}
                className={profile.equipment.includes(equipment.id) ? 'text-primary' : 'text-surface-400'}
              />
            </div>
            
<h3 className="text-sm font-medium text-text-readable-primary">
              {equipment.name}
            </h3>
            
            {profile.equipment.includes(equipment.id) && (
              <div className="mt-2">
                <ApperIcon name="Check" size={16} className="text-primary mx-auto" />
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => setStep(1)}
        >
          Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => setStep(3)}
          disabled={profile.equipment.length === 0}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );

  const renderScheduleStep = () => (
    <motion.div
      key="schedule"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="text-center mb-8">
<h2 className="text-3xl font-bold text-text-readable-primary mb-2 font-display">
          Set your schedule
        </h2>
        <p className="text-surface-300">
          Help us plan the perfect workout frequency for you
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {/* Days per week */}
        <Card>
          <div className="mb-4">
<h3 className="text-lg font-semibold text-text-readable-primary mb-2">
              How many days per week?
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((days) => (
                <Button
                  key={days}
                  variant={profile.schedule.daysPerWeek === days ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => handleScheduleChange('daysPerWeek', days)}
                >
                  {days}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Session duration */}
        <Card>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-surface-950 mb-2">
              How long per session?
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {[30, 45, 60, 90].map((duration) => (
                <Button
                  key={duration}
                  variant={profile.schedule.sessionDuration === duration ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => handleScheduleChange('sessionDuration', duration)}
                >
                  {duration}m
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Preferred time */}
        <Card>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-surface-950 mb-2">
              Preferred workout time
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'morning', label: 'Morning' },
                { value: 'afternoon', label: 'Afternoon' },
                { value: 'evening', label: 'Evening' }
              ].map((time) => (
                <Button
                  key={time.value}
                  variant={profile.schedule.preferredTime === time.value ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => handleScheduleChange('preferredTime', time.value)}
                >
                  {time.label}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => setStep(2)}
        >
          Back
        </Button>
        <Button
          variant="success"
          size="lg"
          fullWidth
          loading={loading}
          onClick={handleComplete}
        >
          Complete Setup
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center"
          >
            <ApperIcon name="Dumbbell" size={32} className="text-white" />
          </motion.div>
          
<h1 className="text-4xl font-bold text-text-readable-primary mb-2 font-display">
            Welcome to FitForge AI
          </h1>
          <p className="text-surface-300">
            Let's create your personalized fitness plan
          </p>
        </div>

        {renderStepIndicator()}

        <div className="max-w-full overflow-hidden">
          {step === 1 && renderGoalsStep()}
          {step === 2 && renderEquipmentStep()}
          {step === 3 && renderScheduleStep()}
        </div>
      </div>
    </div>
  );
};

export default Setup;