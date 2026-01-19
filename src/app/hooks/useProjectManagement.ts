// Custom hook for project and sample assignment management
import { useState, useCallback, useMemo } from 'react';
import { getProjectsForFarm } from '@/app/data/mockData';
import { 
  getSamplesForProject, 
  getProjectForSample, 
  getProjectsForSample,
  assignSampleToProject as assignUtil,
  assignSampleToProjects as assignMultipleUtil
} from '@/app/utils/sampleUtils';

interface UseProjectManagementProps {
  recentActivity: any[];
}

export const useProjectManagement = ({ recentActivity }: UseProjectManagementProps) => {
  const [projectSampleAssignments, setProjectSampleAssignments] = useState<Record<string, string[]>>({
    'proj-1': ['1-001-027', '1-001-026', '1-001-025', '1-001-024', '1-001-023', '1-001-022', '1-001-021', '1-001-020', '1-001-019', '1-001-018', '1-001-017', '1-001-016'],
    'proj-2': ['1-001-015', '1-001-014', '1-001-013', '1-001-012', '1-001-011', '1-001-010', '1-001-009', '1-001-008'],
    'proj-3': ['1-001-007', '1-001-006', '1-001-005', '1-001-004', '1-001-003', '1-001-002', '1-001-001', '1-001-000', '1-000-999', '1-000-998', '1-000-997', '1-000-996', '1-000-995', '1-000-994', '1-000-993'],
    'proj-4': ['1-000-992', '1-000-991', '1-000-990', '1-000-989', '1-000-988', '1-000-987'],
    'proj-5': ['1-000-986', '1-000-985', '1-000-984', '1-000-983', '1-000-982', '1-000-981', '1-000-980', '1-000-979', '1-000-978', '1-000-977', '1-000-976', '1-000-975', '1-000-974', '1-000-973', '1-000-972', '1-000-971', '1-000-970', '1-000-969', '1-000-968', '1-000-967'],
  });

  // Get samples for a specific project
  const getSamples = useCallback((projectId: string) => {
    return getSamplesForProject(projectId, recentActivity, projectSampleAssignments);
  }, [recentActivity, projectSampleAssignments]);

  // Get projects with dynamic sample counts for a farm
  const getProjectsWithCounts = useCallback((farmName: string) => {
    return getProjectsForFarm(farmName).map(p => ({
      ...p,
      sampleCount: projectSampleAssignments[p.id]?.length || 0
    }));
  }, [projectSampleAssignments]);

  // Get first project for a sample
  const getProject = useCallback((sampleId: string) => {
    return getProjectForSample(sampleId, projectSampleAssignments);
  }, [projectSampleAssignments]);

  // Get all projects for a sample
  const getProjects = useCallback((sampleId: string) => {
    return getProjectsForSample(sampleId, projectSampleAssignments);
  }, [projectSampleAssignments]);

  // Assign sample to a single project
  const assignToProject = useCallback((sampleId: string, projectId: string | null) => {
    setProjectSampleAssignments(prev => assignUtil(sampleId, projectId, prev));
  }, []);

  // Assign sample to multiple projects
  const assignToProjects = useCallback((sampleId: string, projectIds: string[] | null) => {
    setProjectSampleAssignments(prev => assignMultipleUtil(sampleId, projectIds, prev));
  }, []);

  return {
    projectSampleAssignments,
    getSamples,
    getProjectsWithCounts,
    getProject,
    getProjects,
    assignToProject,
    assignToProjects
  };
};
