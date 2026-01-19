// Sample-related utility functions

/**
 * Get all samples assigned to a specific project
 */
export const getSamplesForProject = (
  projectId: string,
  allSamples: any[],
  projectSampleAssignments: Record<string, string[]>
): any[] => {
  const sampleIds = projectSampleAssignments[projectId] || [];
  return allSamples.filter(sample => sampleIds.includes(sample.id));
};

/**
 * Get the first project ID for a given sample
 * Returns null if sample is not assigned to any project
 */
export const getProjectForSample = (
  sampleId: string,
  projectSampleAssignments: Record<string, string[]>
): string | null => {
  for (const [projectId, sampleIds] of Object.entries(projectSampleAssignments)) {
    if (sampleIds.includes(sampleId)) {
      return projectId;
    }
  }
  return null;
};

/**
 * Get all project IDs for a given sample
 * Returns empty array if sample is not assigned to any projects
 */
export const getProjectsForSample = (
  sampleId: string,
  projectSampleAssignments: Record<string, string[]>
): string[] => {
  const projects: string[] = [];
  for (const [projectId, sampleIds] of Object.entries(projectSampleAssignments)) {
    if (sampleIds.includes(sampleId)) {
      projects.push(projectId);
    }
  }
  return projects;
};

/**
 * Assign a sample to a single project
 * Removes the sample from any other projects
 */
export const assignSampleToProject = (
  sampleId: string,
  projectId: string | null,
  currentAssignments: Record<string, string[]>
): Record<string, string[]> => {
  const newAssignments = { ...currentAssignments };
  
  // Remove sample from any existing project
  for (const [pid, sampleIds] of Object.entries(newAssignments)) {
    newAssignments[pid] = sampleIds.filter(id => id !== sampleId);
  }
  
  // Add to new project if specified
  if (projectId) {
    if (!newAssignments[projectId]) {
      newAssignments[projectId] = [];
    }
    newAssignments[projectId] = [...newAssignments[projectId], sampleId];
  }
  
  return newAssignments;
};

/**
 * Assign a sample to multiple projects
 * Removes the sample from any projects not in the new list
 */
export const assignSampleToProjects = (
  sampleId: string,
  projectIds: string[] | null,
  currentAssignments: Record<string, string[]>
): Record<string, string[]> => {
  const newAssignments = { ...currentAssignments };
  
  // Remove sample from any existing project
  for (const [pid, sampleIds] of Object.entries(newAssignments)) {
    newAssignments[pid] = sampleIds.filter(id => id !== sampleId);
  }
  
  // Add to new projects if specified
  if (projectIds && projectIds.length > 0) {
    projectIds.forEach(projectId => {
      if (!newAssignments[projectId]) {
        newAssignments[projectId] = [];
      }
      newAssignments[projectId] = [...newAssignments[projectId], sampleId];
    });
  }
  
  return newAssignments;
};

/**
 * Calculate statistics from sample data
 */
export const calculateSampleStats = (
  samples: any[],
  selectedFarm: string,
  testingMode: 'feeds' | 'soil'
) => {
  // Return all zeros for soil mode
  if (testingMode === 'soil') {
    return { 
      completedLast30Days: 0, 
      partiallyComplete: 0, 
      inProcess: 0, 
      pendingArrival: 0 
    };
  }
  
  const farmSamples = samples.filter(s => s.farm === selectedFarm);
  const now = new Date('2026-01-13T12:00:00');
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const completedLast30Days = farmSamples.filter(s => {
    if (s.status !== 'completed') return false;
    const sampleDate = new Date(now);
    sampleDate.setDate(sampleDate.getDate() - (s.daysAgo || 0));
    return sampleDate >= thirtyDaysAgo;
  }).length;
  
  const partiallyComplete = farmSamples.filter(s => s.status === 'partial').length;
  const inProcess = farmSamples.filter(s => s.status === 'processing').length;
  const pendingArrival = farmSamples.filter(s => s.status === 'pending').length;
  
  return { completedLast30Days, partiallyComplete, inProcess, pendingArrival };
};
