// Filtering and search utility functions

interface FilterCriteria {
  dateRange: 'all' | 'today' | 'week' | 'month' | 'custom';
  customDateStart?: string;
  customDateEnd?: string;
  testTypes: string[];
  sampleTypes: string[];
  statuses: string[];
  labNumberFrom?: string;
  labNumberTo?: string;
}

/**
 * Apply search query to samples
 */
export const filterBySearchQuery = (samples: any[], searchQuery: string): any[] => {
  if (!searchQuery) return samples;
  
  const query = searchQuery.toLowerCase();
  return samples.filter(item => {
    return (
      item.id.toLowerCase().includes(query) ||
      item.sampleName.toLowerCase().includes(query) ||
      item.sampleType.toLowerCase().includes(query) ||
      item.testPackage.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query) ||
      item.bagLabelId.toLowerCase().includes(query)
    );
  });
};

/**
 * Apply date range filter to samples
 */
export const filterByDateRange = (
  samples: any[], 
  dateRange: FilterCriteria['dateRange'],
  customDateStart?: string,
  customDateEnd?: string
): any[] => {
  if (dateRange === 'all') return samples;
  
  return samples.filter(item => {
    if (item.daysAgo === undefined) return true;
    
    const daysAgo = item.daysAgo;
    
    if (dateRange === 'today' && daysAgo > 0) return false;
    if (dateRange === 'week' && daysAgo > 7) return false;
    if (dateRange === 'month' && daysAgo > 30) return false;
    
    if (dateRange === 'custom' && customDateStart && customDateEnd) {
      const now = new Date('2026-01-13T12:00:00');
      const itemDate = new Date(now);
      itemDate.setDate(itemDate.getDate() - daysAgo);
      
      const startDate = new Date(customDateStart);
      const endDate = new Date(customDateEnd);
      endDate.setHours(23, 59, 59); // Include the entire end date
      
      if (itemDate < startDate || itemDate > endDate) return false;
    }
    
    return true;
  });
};

/**
 * Apply test type filter to samples
 */
export const filterByTestTypes = (samples: any[], testTypes: string[]): any[] => {
  if (testTypes.length === 0) return samples;
  return samples.filter(item => testTypes.includes(item.testPackage));
};

/**
 * Apply sample type filter to samples
 */
export const filterBySampleTypes = (samples: any[], sampleTypes: string[]): any[] => {
  if (sampleTypes.length === 0) return samples;
  return samples.filter(item => sampleTypes.includes(item.sampleType));
};

/**
 * Apply status filter to samples
 */
export const filterByStatuses = (samples: any[], statuses: string[]): any[] => {
  if (statuses.length === 0) return samples;
  return samples.filter(item => statuses.includes(item.status));
};

/**
 * Apply lab number range filter to samples
 */
export const filterByLabNumberRange = (
  samples: any[], 
  labNumberFrom?: string, 
  labNumberTo?: string
): any[] => {
  if (!labNumberFrom && !labNumberTo) return samples;
  
  return samples.filter(item => {
    const labNum = parseInt(item.id.replace(/[^0-9]/g, ''));
    const fromNum = labNumberFrom ? parseInt(labNumberFrom.replace(/[^0-9]/g, '')) : 0;
    const toNum = labNumberTo ? parseInt(labNumberTo.replace(/[^0-9]/g, '')) : 9999999;
    return labNum >= fromNum && labNum <= toNum;
  });
};

/**
 * Apply all filters to samples in one pass (optimized)
 */
export const applyAllFilters = (
  samples: any[],
  selectedFarm: string,
  searchQuery: string,
  filters: FilterCriteria
): any[] => {
  // Filter by farm first (most restrictive)
  let filtered = samples.filter(item => item.farm === selectedFarm);
  
  // Apply search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(item => (
      item.id.toLowerCase().includes(query) ||
      item.sampleName.toLowerCase().includes(query) ||
      item.sampleType.toLowerCase().includes(query) ||
      item.testPackage.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query) ||
      item.bagLabelId.toLowerCase().includes(query)
    ));
  }
  
  // Apply all other filters in a single pass
  filtered = filtered.filter(item => {
    // Date range filter
    if (filters.dateRange !== 'all' && item.daysAgo !== undefined) {
      const daysAgo = item.daysAgo;
      if (filters.dateRange === 'today' && daysAgo > 0) return false;
      if (filters.dateRange === 'week' && daysAgo > 7) return false;
      if (filters.dateRange === 'month' && daysAgo > 30) return false;
      if (filters.dateRange === 'custom' && filters.customDateStart && filters.customDateEnd) {
        const now = new Date('2026-01-13T12:00:00');
        const itemDate = new Date(now);
        itemDate.setDate(itemDate.getDate() - daysAgo);
        
        const startDate = new Date(filters.customDateStart);
        const endDate = new Date(filters.customDateEnd);
        endDate.setHours(23, 59, 59);
        
        if (itemDate < startDate || itemDate > endDate) return false;
      }
    }
    
    // Test type filter
    if (filters.testTypes.length > 0 && !filters.testTypes.includes(item.testPackage)) {
      return false;
    }
    
    // Sample type filter
    if (filters.sampleTypes.length > 0 && !filters.sampleTypes.includes(item.sampleType)) {
      return false;
    }
    
    // Status filter
    if (filters.statuses.length > 0 && !filters.statuses.includes(item.status)) {
      return false;
    }
    
    // Lab number range filter
    if (filters.labNumberFrom || filters.labNumberTo) {
      const labNum = parseInt(item.id.replace(/[^0-9]/g, ''));
      const fromNum = filters.labNumberFrom ? parseInt(filters.labNumberFrom.replace(/[^0-9]/g, '')) : 0;
      const toNum = filters.labNumberTo ? parseInt(filters.labNumberTo.replace(/[^0-9]/g, '')) : 9999999;
      if (labNum < fromNum || labNum > toNum) return false;
    }
    
    return true;
  });
  
  return filtered;
};
