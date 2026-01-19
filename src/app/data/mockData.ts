import { Project } from '@/app/types';

// Sample type descriptions
export const sampleTypeDescriptions: Record<string, string> = {
  'Corn Silage': 'Fermented whole corn plant feed. High in energy and digestible fiber. Common forage for dairy cattle.',
  'Hay/Haylage': 'Dried or fermented grass/legume forage. Provides fiber and protein. Quality varies by cutting time.',
  'TMR': 'Total Mixed Ration - Complete feed blend. Contains all nutrients needed. Fed as a single mixture.',
  'Grains/Commodities': 'Concentrated energy sources. Includes corn, soybeans, and byproducts. High starch content.',
};

// Mock projects data - different projects for each farm
export const getProjectsForFarm = (farmName: string): Project[] => {
  if (farmName === 'Friendly Illinois Brothers') {
    return [
      {
        id: 'proj-1',
        name: 'Q4 2025 Silage Analysis',
        sampleCount: 12,
        sharedWith: [{ name: 'Midwest Feed Solutions', color: 'blue' }],
        isShared: true,
        createdDate: '2025-10-15',
        description: 'Tracking silage quality through harvest season to optimize ration formulation'
      },
      {
        id: 'proj-2',
        name: 'Winter Feed Quality',
        sampleCount: 8,
        sharedWith: [],
        isShared: false,
        createdDate: '2025-11-20',
        description: 'Monitoring feed consistency during winter months for herd health'
      },
      {
        id: 'proj-3',
        name: 'TMR Optimization Study',
        sampleCount: 15,
        sharedWith: [{ name: 'Heritage Ag Co.', color: 'green' }, { name: 'Sunrise Dairy', color: 'amber' }],
        isShared: true,
        createdDate: '2025-09-01',
        description: 'Collaborative study to improve TMR digestibility and milk production'
      }
    ];
  } else if (farmName === 'Goeser\'s Grazers') {
    return [
      {
        id: 'proj-4',
        name: 'Spring Hay Comparison',
        sampleCount: 6,
        sharedWith: [],
        isShared: false,
        createdDate: '2025-12-05',
        description: 'Comparing first and second cutting hay quality to determine best usage'
      },
      {
        id: 'proj-5',
        name: 'Nutrient Tracking 2025',
        sampleCount: 20,
        sharedWith: [{ name: 'Green Valley Nutrition', color: 'green' }],
        isShared: true,
        createdDate: '2025-08-15',
        description: 'Year-long nutrient monitoring program with nutritionist partnership'
      }
    ];
  } else {
    // Standard Dairy Consultants - no projects
    return [];
  }
};