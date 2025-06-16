import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { endOfWeek, format, startOfWeek, subDays } from "date-fns";
import StatCard from "@/components/organisms/StatCard";
import ProgressChart from "@/components/organisms/ProgressChart";
import SkeletonLoader from "@/components/organisms/SkeletonLoader";
import ErrorState from "@/components/organisms/ErrorState";
import EmptyState from "@/components/organisms/EmptyState";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { userProfileService, workoutLogService } from "@/services";

const Progress = () => {
  const navigate = useNavigate();
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('week'); // week, month, all

  useEffect(() => {
    loadData();
  }, [timeRange]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [logs, userProfile] = await Promise.all([
        workoutLogService.getRecent(50),
        userProfileService.getCurrent()
      ]);
      
      setWorkoutLogs(logs);
      setProfile(userProfile);
    } catch (err) {
      setError(err.message || 'Failed to load progress data');
      toast.error('Failed to load progress data');
    } finally {
      setLoading(false);
    }
  };

  const getFilteredLogs = () => {
    const now = new Date();
    
    switch (timeRange) {
      case 'week':
        const weekStart = startOfWeek(now);
        const weekEnd = endOfWeek(now);
        return workoutLogs.filter(log => {
          const logDate = new Date(log.date);
          return logDate >= weekStart && logDate <= weekEnd;
        });
      
      case 'month':
        const monthStart = subDays(now, 30);
        return workoutLogs.filter(log => new Date(log.date) >= monthStart);
      
      default:
        return workoutLogs;
    }
  };

  const calculateStats = () => {
    const filteredLogs = getFilteredLogs();
    const completedWorkouts = filteredLogs.filter(log => log.completed);
    
    const totalWorkouts = completedWorkouts.length;
    const totalDuration = completedWorkouts.reduce((sum, log) => sum + (log.duration || 0), 0);
    const avgDuration = totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;
    
    const totalSets = completedWorkouts.reduce((sum, log) => {
      return sum + log.exercises.reduce((exerciseSum, exercise) => {
        return exerciseSum + (exercise.sets?.length || 0);
      }, 0);
    }, 0);

    // Calculate streak
    const sortedLogs = [...workoutLogs]
      .filter(log => log.completed)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    let currentStreak = 0;
    let lastWorkoutDate = null;
    
    for (const log of sortedLogs) {
      const logDate = new Date(log.date);
      const today = new Date();
      const daysDiff = Math.floor((today - logDate) / (1000 * 60 * 60 * 24));
      
      if (lastWorkoutDate === null) {
        if (daysDiff <= 1) {
          currentStreak = 1;
          lastWorkoutDate = logDate;
        } else {
          break;
        }
      } else {
        const daysBetween = Math.floor((lastWorkoutDate - logDate) / (1000 * 60 * 60 * 24));
        if (daysBetween <= 1) {
          currentStreak++;
          lastWorkoutDate = logDate;
        } else {
          break;
        }
      }
    }

    return {
      totalWorkouts,
      avgDuration,
      totalSets,
      currentStreak
    };
  };

  const getChartData = () => {
    const filteredLogs = getFilteredLogs();
    const completedWorkouts = filteredLogs.filter(log => log.completed);
    
    // Group by date and count workouts
    const dailyCounts = {};
    
    completedWorkouts.forEach(log => {
      const date = format(new Date(log.date), 'yyyy-MM-dd');
      dailyCounts[date] = (dailyCounts[date] || 0) + 1;
    });

    return Object.entries(dailyCounts).map(([date, count]) => ({
      date,
      value: count
    }));
  };

  const renderStreakCalendar = () => {
    const today = new Date();
    const days = [];
    
    // Generate last 42 days (6 weeks)
    for (let i = 41; i >= 0; i--) {
      const date = subDays(today, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const hasWorkout = workoutLogs.some(log => 
        log.completed && format(new Date(log.date), 'yyyy-MM-dd') === dateStr
      );
      
      days.push({
        date,
        dateStr,
        hasWorkout,
        isToday: i === 0
      });
    }

    return (
      <Card>
        <div className="mb-4">
<h3 className="text-lg font-semibold text-text-readable-primary font-display">
            Workout Calendar
          </h3>
          <p className="text-sm text-surface-400">
            Last 6 weeks of activity
          </p>
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
<div key={day} className="text-xs text-text-readable-primary text-center p-1 font-medium">
              {day}
            </div>
          ))}
          
          {days.map((day, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className={`
                w-8 h-8 rounded-md flex items-center justify-center text-xs font-medium transition-all
                ${day.hasWorkout 
                  ? 'bg-success text-white' 
                  : day.isToday 
                    ? 'bg-primary text-white ring-2 ring-primary/50' 
                    : 'bg-surface-700 text-surface-400 hover:bg-surface-600'
                }
              `}
            >
              {format(day.date, 'd')}
            </motion.div>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-600">
          <div className="flex items-center gap-2 text-xs text-surface-400">
            <div className="w-3 h-3 bg-surface-700 rounded-sm"></div>
            <span>No workout</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-surface-400">
            <div className="w-3 h-3 bg-success rounded-sm"></div>
            <span>Workout completed</span>
          </div>
        </div>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="p-4 pb-24 max-w-full overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-6">
          <SkeletonLoader count={4} type="stat" className="grid grid-cols-2 md:grid-cols-4 gap-4" />
          <SkeletonLoader count={2} type="card" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 pb-24 max-w-full overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <ErrorState
            message="Couldn't load progress data"
            description={error}
            onRetry={loadData}
          />
        </div>
      </div>
    );
  }

  if (!workoutLogs.length) {
    return (
      <div className="p-4 pb-24 max-w-full overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <EmptyState
            title="No workout history yet"
            description="Complete your first workout to start tracking your progress and building your fitness journey."
            actionLabel="Start Your First Workout"
            onAction={() => navigate('/plan')}
            icon="TrendingUp"
          />
        </div>
      </div>
    );
  }

  const stats = calculateStats();
  const chartData = getChartData();

  return (
    <div className="p-4 pb-24 max-w-full overflow-hidden">
    <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
            <div>
<h1 className="text-2xl font-bold text-text-readable-primary font-display">Your Progress
                                </h1>
                <p className="text-surface-400">Track your fitness journey and achievements
                                </p>
            </div>
            <div className="flex gap-2">
                {["week", "month", "all"].map(range => <Button
                    key={range}
                    variant={timeRange === range ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setTimeRange(range)}>
                    {range === "all" ? "All Time" : `This ${range}`}
                </Button>)}
            </div>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
                title="Workouts"
                value={stats.totalWorkouts}
                subtitle={`This ${timeRange}`}
                icon="Dumbbell"
                color="primary"
                trend={stats.totalWorkouts > 0 ? "up" : "neutral"}
                trendValue={`${stats.totalWorkouts} completed`} />
            <StatCard
                title="Current Streak"
                value={`${stats.currentStreak}d`}
                subtitle="Days in a row"
                icon="Flame"
                color="warning"
                trend={stats.currentStreak > 3 ? "up" : "neutral"} />
            <StatCard
                title="Avg Duration"
                value={`${stats.avgDuration}m`}
                subtitle="Per workout"
                icon="Clock"
                color="accent" />
            <StatCard
                title="Total Sets"
                value={stats.totalSets}
                subtitle={`This ${timeRange}`}
                icon="Target"
                color="secondary" />
        </div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProgressChart data={chartData} title="Workout Frequency" type="area" />
            {renderStreakCalendar()}
        </div>
        {/* Recent Workouts */}
        <Card>
            <div className="flex justify-between items-center mb-4">
<h3 className="text-lg font-semibold text-text-readable-primary font-display">Recent Workouts
                                </h3>
                <Button variant="ghost" size="sm" icon="History">View All
                                </Button>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
                {workoutLogs.slice(0, 10).map((log, index) => <motion.div
                    key={log.id}
                    initial={{
                        opacity: 0,
                        y: 10
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        delay: index * 0.05
                    }}
                    className="flex items-center justify-between py-3 px-4 bg-surface-800 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div
                            className={`
                    w-3 h-3 rounded-full
                    ${log.completed ? "bg-success" : "bg-warning"}
                  `} />
                        <div>
                            <h4 className="text-sm font-medium text-white">
                                {format(new Date(log.date), "EEEE, MMM d")}
                            </h4>
                            <p className="text-xs text-surface-400">
                                {log.exercises?.length || 0}exercises • {log.duration || 0}min
                                                    </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant={log.completed ? "success" : "warning"} size="sm">
                            {log.completed ? "Completed" : "Incomplete"}
                        </Badge>
                        <ApperIcon name="ChevronRight" size={16} className="text-surface-500" />
                    </div>
                </motion.div>)}
            </div>
        </Card>
        {/* Achievement Badges */}
        <Card>
<h3 className="text-lg font-semibold text-text-readable-primary mb-4 font-display">Achievements
                          </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[{
                    name: "First Workout",
                    icon: "Star",
                    unlocked: stats.totalWorkouts >= 1
                }, {
                    name: "7 Day Streak",
                    icon: "Flame",
                    unlocked: stats.currentStreak >= 7
                }, {
                    name: "10 Workouts",
                    icon: "Target",
                    unlocked: workoutLogs.filter(l => l.completed).length >= 10
                }, {
                    name: "Consistency King",
                    icon: "Crown",
                    unlocked: stats.currentStreak >= 30
                }].map((achievement, index) => <motion.div
                    key={achievement.name}
                    initial={{
                        opacity: 0,
                        scale: 0.9
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1
                    }}
                    transition={{
                        delay: index * 0.1
                    }}
                    className={`
                  text-center p-4 rounded-lg border transition-all
                  ${achievement.unlocked ? "bg-gradient-to-br from-warning/20 to-accent/20 border-warning/30" : "bg-surface-800 border-surface-600"}
                `}>
                    <div
                        className={`
                  w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center
                  ${achievement.unlocked ? "bg-warning/20" : "bg-surface-700"}
                `}>
                        <ApperIcon
                            name={achievement.icon}
                            size={24}
                            className={achievement.unlocked ? "text-warning" : "text-surface-500"} />
                    </div>
                    <h4
                        className={`
                  text-sm font-medium mb-1
                  ${achievement.unlocked ? "text-surface-950" : "text-surface-500"}
                `}>
                        {achievement.name}
                    </h4>
                    <Badge variant={achievement.unlocked ? "success" : "default"} size="sm">
                        {achievement.unlocked ? "Unlocked" : "Locked"}
                    </Badge>
                </motion.div>)}
            </div>
        </Card>
    </div>
</div>
  );
};

export default Progress;