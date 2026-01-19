// Shared type definitions used across components

export interface Organization {
  name: string;
  color: string;
}

export interface Project {
  id: string;
  name: string;
  sampleCount: number;
  sharedWith: Organization[];
  isShared: boolean;
  createdDate: string;
  description?: string;
}

export interface Stats {
  pendingArrival: number;
  inProcess: number;
  partiallyComplete: number;
  completedLast30Days: number;
}

export interface SampleHistoryItem {
  id: string;
  sampleType: string;
  packageType: string;
  testPackage: string;
  status: 'pending' | 'processing' | 'partial' | 'completed' | 'intransit';
  dateSubmitted: string;
  dateTested?: string;
  createdDate: string;
  farmName: string;
  sampleName: string;
  containerLabel?: string;
  bagLabelId: string;
  addOns?: string[];
  projectIds?: string[];
  pendingTests?: string[];
  completedTests?: string[];
}

export type TestingMode = 'feeds' | 'soil';

export type SampleStatus = 'pending' | 'processing' | 'partial' | 'completed';

export interface CustomPackage {
  id: string;
  name: string;
  analytes: string[];
  createdAt: Date;
}

export type ViewMode = 'client' | 'lab';
export type InfoPage = 'aboutUs' | 'careers' | 'growWithUs' | 'industryNews' | 'samplingInstructions' | 'rivet' | null;
export type SampleProjectView = 'samples' | 'projects';
