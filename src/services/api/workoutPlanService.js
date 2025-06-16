import workoutPlans from '../mockData/workoutPlan.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class WorkoutPlanService {
  constructor() {
    this.data = [...workoutPlans];
  }

  async getAll() {
    await delay(300);
    return [...this.data];
  }

  async getById(id) {
    await delay(200);
    const plan = this.data.find(item => item.id === id);
    if (!plan) {
      throw new Error('Workout plan not found');
    }
    return { ...plan };
  }

  async getTodayPlan() {
    await delay(250);
    const today = new Date().toISOString().split('T')[0];
    const plan = this.data.find(item => item.date.startsWith(today));
    if (!plan) {
      // Generate a new plan for today
      return this.generatePlan();
    }
    return { ...plan };
  }

  async generatePlan(preferences = {}) {
    await delay(500); // Simulate AI generation time
    const newPlan = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      exercises: [
        {
          id: '1',
          name: 'Push-ups',
          sets: 3,
          reps: '10-12',
          weight: 0,
          rest: 60,
          muscleGroups: ['chest', 'triceps', 'shoulders']
        },
        {
          id: '2',
          name: 'Squats',
          sets: 3,
          reps: '12-15',
          weight: 0,
          rest: 90,
          muscleGroups: ['quadriceps', 'glutes']
        },
        {
          id: '3',
          name: 'Plank',
          sets: 3,
          reps: '30-45 sec',
          weight: 0,
          rest: 60,
          muscleGroups: ['core', 'abs']
        }
      ],
      targetMuscles: ['chest', 'legs', 'core'],
      estimatedDuration: 25
    };
    
    this.data.push(newPlan);
    return { ...newPlan };
  }

  async create(plan) {
    await delay(300);
    const newPlan = {
      ...plan,
      id: Date.now().toString(),
      date: plan.date || new Date().toISOString()
    };
    this.data.push(newPlan);
    return { ...newPlan };
  }

  async update(id, updates) {
    await delay(250);
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Workout plan not found');
    }
    this.data[index] = { ...this.data[index], ...updates };
    return { ...this.data[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Workout plan not found');
    }
    this.data.splice(index, 1);
    return { success: true };
  }
}

export default new WorkoutPlanService();