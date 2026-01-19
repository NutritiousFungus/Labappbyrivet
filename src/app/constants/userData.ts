// User data constants
import type { User } from '@/app/types/user';

export const CURRENT_USER: User = {
  name: 'Austin Russell',
  email: 'austin_russell@rockriverlab.com',
  farms: ['Standard Dairy Consultants', 'Friendly Illinois Brothers', 'Goeser\'s Grazers', 'Scott Tindall'],
  roles: {
    'Friendly Illinois Brothers': 'Owner',
    'Goeser\'s Grazers': 'Nutritionist',
    'Standard Dairy Consultants': 'Manager',
    'Scott Tindall': 'Manager'
  }
};

export const FARM_NAMES = ['Standard Dairy Consultants', 'Friendly Illinois Brothers', 'Goeser\'s Grazers'] as const;
export type FarmName = typeof FARM_NAMES[number];