import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';

const SetTracker = ({
  exercise,
  currentSet = 1,
  onSetComplete,
  onWeightChange,
  className = ''
}) => {
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState(exercise.weight || 0);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleSetComplete = async () => {
    if (!reps || reps <= 0) return;
    
    setIsCompleting(true);
    
    const setData = {
      setNumber: currentSet,
      reps: parseInt(reps),
      weight: weight,
      completed: true
    };
    
    await onSetComplete?.(setData);
    onWeightChange?.(weight);
    
    // Reset for next set
    setReps('');
    setIsCompleting(false);
  };

  const targetReps = exercise.reps?.toString() || '0';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Card variant="primary" className="text-center">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-1 font-display">
            {exercise.name}
          </h3>
          <p className="text-surface-300">
            Set {currentSet} of {exercise.sets}
          </p>
          <p className="text-sm text-surface-400">
            Target: {targetReps} reps {weight > 0 && `@ ${weight}kg`}
          </p>
        </div>

        <div className="space-y-4">
          {/* Weight Input */}
          {exercise.weight > 0 && (
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setWeight(Math.max(0, weight - 2.5))}
                disabled={weight <= 0}
              >
                -2.5kg
              </Button>
              
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                placeholder="Weight"
                className="text-center"
              />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setWeight(weight + 2.5)}
              >
                +2.5kg
              </Button>
            </div>
          )}

          {/* Reps Input */}
          <div className="grid grid-cols-3 gap-3 items-center">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setReps(Math.max(0, parseInt(reps || 0) - 1).toString())}
              disabled={!reps || parseInt(reps) <= 0}
            >
              <ApperIcon name="Minus" size={24} />
            </Button>
            
            <div className="text-center">
              <Input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                placeholder="0"
                className="text-center text-2xl font-bold"
              />
              <p className="text-xs text-surface-400 mt-1">reps</p>
            </div>
            
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setReps((parseInt(reps || 0) + 1).toString())}
            >
              <ApperIcon name="Plus" size={24} />
            </Button>
          </div>

          {/* Quick rep buttons */}
          <div className="grid grid-cols-4 gap-2">
            {[8, 10, 12, 15].map(quickRep => (
              <Button
                key={quickRep}
                variant="ghost"
                size="sm"
                onClick={() => setReps(quickRep.toString())}
                className={reps === quickRep.toString() ? 'bg-primary/20 text-primary' : ''}
              >
                {quickRep}
              </Button>
            ))}
          </div>

          {/* Complete Set Button */}
          <Button
            variant="success"
            size="lg"
            fullWidth
            icon="Check"
            loading={isCompleting}
            disabled={!reps || parseInt(reps) <= 0}
            onClick={handleSetComplete}
          >
            Complete Set {currentSet}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default SetTracker;