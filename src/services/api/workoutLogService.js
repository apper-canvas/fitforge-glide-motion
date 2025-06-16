import workoutLogs from '../mockData/workoutLog.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class WorkoutLogService {
  constructor() {
    this.data = [...workoutLogs];
  }

  async getAll() {
    await delay(300);
    return [...this.data];
  }

  async getById(id) {
    await delay(200);
    const log = this.data.find(item => item.id === id);
    if (!log) {
      throw new Error('Workout log not found');
    }
    return { ...log };
  }

  async getRecent(limit = 10) {
    await delay(250);
    return [...this.data]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  }

  async getByDateRange(startDate, endDate) {
    await delay(300);
    return this.data.filter(log => {
      const logDate = new Date(log.date);
      return logDate >= new Date(startDate) && logDate <= new Date(endDate);
    });
  }

  async create(log) {
    await delay(300);
    const newLog = {
      ...log,
      id: Date.now().toString(),
      date: log.date || new Date().toISOString()
    };
    this.data.push(newLog);
    return { ...newLog };
  }

  async update(id, updates) {
    await delay(250);
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Workout log not found');
    }
    this.data[index] = { ...this.data[index], ...updates };
    return { ...this.data[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Workout log not found');
    }
    this.data.splice(index, 1);
    return { success: true };
  }
}

export default new WorkoutLogService();