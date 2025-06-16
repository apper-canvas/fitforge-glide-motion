import userProfiles from '../mockData/userProfile.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class UserProfileService {
  constructor() {
    this.data = [...userProfiles];
  }

  async getAll() {
    await delay(300);
    return [...this.data];
  }

  async getById(id) {
    await delay(200);
    const profile = this.data.find(item => item.id === id);
    if (!profile) {
      throw new Error('User profile not found');
    }
    return { ...profile };
  }

  async getCurrent() {
    await delay(200);
    // Return first profile as current user
    const profile = this.data[0];
    if (!profile) {
      throw new Error('No user profile found');
    }
    return { ...profile };
  }

  async create(profile) {
    await delay(300);
    const newProfile = {
      ...profile,
      id: Date.now().toString(),
      currentStreak: 0,
      totalWorkouts: 0
    };
    this.data.push(newProfile);
    return { ...newProfile };
  }

  async update(id, updates) {
    await delay(250);
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('User profile not found');
    }
    this.data[index] = { ...this.data[index], ...updates };
    return { ...this.data[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('User profile not found');
    }
    this.data.splice(index, 1);
    return { success: true };
  }
}

export default new UserProfileService();