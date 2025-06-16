import Plan from '@/components/pages/Plan';
import Track from '@/components/pages/Track';
import Progress from '@/components/pages/Progress';
import Profile from '@/components/pages/Profile';
import Setup from '@/components/pages/Setup';

export const routes = {
setup: {
    id: 'setup',
    label: 'Setup',
    path: '/setup',
    icon: 'Cog',
    component: Setup
  },
plan: {
    id: 'plan',
    label: 'Plan',
    path: '/plan',
    icon: 'Calendar',
    component: Plan
  },
track: {
    id: 'track',
    label: 'Track',
    path: '/track',
    icon: 'Dumbbell',
    component: Track
  },
progress: {
    id: 'progress',
    label: 'Progress',
    path: '/progress',
    icon: 'BarChart3',
    component: Progress
  },
profile: {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    icon: 'UserCircle',
    component: Profile
  }
};

export const routeArray = Object.values(routes);
export default routes;