// Custom hook for managing custom test packages
import { useState, useCallback } from 'react';
import type { CustomPackage } from '@/app/types';

const INITIAL_PACKAGES: Record<string, CustomPackage[]> = {
  'Friendly Illinois Brothers': [],
  'Goeser\'s Grazers': [],
  'Standard Dairy Consultants': [],
};

export const useCustomPackages = () => {
  const [customPackages, setCustomPackages] = useState<Record<string, CustomPackage[]>>(INITIAL_PACKAGES);

  // Get packages for a specific farm
  const getPackagesForFarm = useCallback((farmName: string): CustomPackage[] => {
    return customPackages[farmName] || [];
  }, [customPackages]);

  // Save a new package for a farm
  const savePackage = useCallback((farmName: string, pkg: CustomPackage) => {
    setCustomPackages(prev => ({
      ...prev,
      [farmName]: [...(prev[farmName] || []), pkg]
    }));
  }, []);

  // Delete a package from a farm
  const deletePackage = useCallback((farmName: string, packageId: string) => {
    setCustomPackages(prev => ({
      ...prev,
      [farmName]: (prev[farmName] || []).filter(p => p.id !== packageId)
    }));
  }, []);

  // Update an existing package
  const updatePackage = useCallback((farmName: string, packageId: string, updates: Partial<CustomPackage>) => {
    setCustomPackages(prev => ({
      ...prev,
      [farmName]: (prev[farmName] || []).map(p => 
        p.id === packageId ? { ...p, ...updates } : p
      )
    }));
  }, []);

  // Get total package count across all farms
  const getTotalPackageCount = useCallback((): number => {
    return Object.values(customPackages).reduce((sum, packages) => sum + packages.length, 0);
  }, [customPackages]);

  return {
    customPackages,
    getPackagesForFarm,
    savePackage,
    deletePackage,
    updatePackage,
    getTotalPackageCount
  };
};
