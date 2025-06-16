import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ProgressRing from '@/components/atoms/ProgressRing';
import ApperIcon from '@/components/ApperIcon';

const Timer = ({
  duration = 60,
  onComplete,
  onStop,
  autoStart = false,
  title = "Rest Timer",
  className = ''
}) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeRemaining, onComplete]);

  const handleStart = () => {
    if (isCompleted) {
      setTimeRemaining(duration);
      setIsCompleted(false);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeRemaining(duration);
    setIsCompleted(false);
    onStop?.();
  };

  const handleSkip = () => {
    setIsRunning(false);
    setTimeRemaining(0);
    setIsCompleted(true);
    onComplete?.();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration - timeRemaining) / duration) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-card rounded-2xl p-6 text-center ${className}`}
    >
<h3 className="text-lg font-semibold text-surface-900 mb-4 font-display">
        {title}
      </h3>

      {/* Timer Ring */}
      <div className="flex justify-center mb-6">
        <ProgressRing
          progress={progress}
          size={140}
          strokeWidth={8}
          color={isCompleted ? '#10B981' : isRunning ? '#4F46E5' : '#64748b'}
          backgroundColor="#374151"
        >
          <div className="text-center">
<div className="text-3xl font-bold text-surface-900 font-display">
              {formatTime(timeRemaining)}
            </div>
<div className="text-sm text-surface-600 mt-1">
              {isCompleted ? 'Complete!' : isRunning ? 'Running' : 'Paused'}
            </div>
          </div>
        </ProgressRing>
      </div>

      {/* Timer Controls */}
      <div className="flex justify-center gap-3">
        {!isRunning && !isCompleted && (
          <Button
            variant="primary"
            icon="Play"
            onClick={handleStart}
          >
            {timeRemaining === duration ? 'Start' : 'Resume'}
          </Button>
        )}

        {isRunning && (
          <Button
            variant="secondary"
            icon="Pause"
            onClick={handlePause}
          >
            Pause
          </Button>
        )}

        {isCompleted && (
          <Button
            variant="success"
            icon="RotateCcw"
            onClick={handleStart}
          >
            Restart
          </Button>
        )}

        {(isRunning || timeRemaining < duration) && (
          <Button
            variant="ghost"
            icon="Square"
            onClick={handleStop}
          >
            Stop
          </Button>
        )}

        {isRunning && (
          <Button
            variant="ghost"
            icon="FastForward"
            onClick={handleSkip}
          >
            Skip
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Timer;