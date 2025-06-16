import exercises from '../mockData/exercise.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ExerciseService {
  constructor() {
    this.data = [...exercises];
  }

  async getAll() {
    await delay(300);
    return [...this.data];
  }

  async getById(id) {
    await delay(200);
    const exercise = this.data.find(item => item.id === id);
    if (!exercise) {
      throw new Error('Exercise not found');
    }
    return { ...exercise };
  }

  async getByMuscleGroup(muscleGroup) {
    await delay(250);
    return this.data.filter(exercise => 
      exercise.muscleGroups.includes(muscleGroup.toLowerCase())
    );
  }

  async search(query) {
    await delay(200);
    const searchTerm = query.toLowerCase();
    return this.data.filter(exercise =>
      exercise.name.toLowerCase().includes(searchTerm) ||
      exercise.muscleGroups.some(group => group.toLowerCase().includes(searchTerm))
    );
  }

  async create(exercise) {
    await delay(300);
    const newExercise = {
      ...exercise,
      id: Date.now().toString()
    };
    this.data.push(newExercise);
    return { ...newExercise };
  }

  async update(id, updates) {
    await delay(250);
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Exercise not found');
    }
    this.data[index] = { ...this.data[index], ...updates };
    return { ...this.data[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Exercise not found');
    }
    this.data.splice(index, 1);
    return { success: true };
  }
}

export default new ExerciseService();