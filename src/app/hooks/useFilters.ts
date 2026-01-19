import { useState, useMemo } from 'react';

export type DateRange = 'all' | 'today' | 'week' | 'month' | 'custom';

interface FilterState {
  dateRange: DateRange;
  customDateStart: string;
  customDateEnd: string;
  testTypes: string[];
  sampleTypes: string[];
  statuses: string[];
  labNumberFrom: string;
  labNumberTo: string;
}

export function useFilters() {
  const [dateRange, setDateRange] = useState<DateRange>('all');
  const [customDateStart, setCustomDateStart] = useState('');
  const [customDateEnd, setCustomDateEnd] = useState('');
  const [testTypes, setTestTypes] = useState<string[]>([]);
  const [sampleTypes, setSampleTypes] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [labNumberFrom, setLabNumberFrom] = useState('');
  const [labNumberTo, setLabNumberTo] = useState('');

  const hasActiveFilters = useMemo(() => {
    return (
      dateRange !== 'all' ||
      testTypes.length > 0 ||
      sampleTypes.length > 0 ||
      statuses.length > 0 ||
      labNumberFrom !== '' ||
      labNumberTo !== ''
    );
  }, [dateRange, testTypes, sampleTypes, statuses, labNumberFrom, labNumberTo]);

  const toggleTestType = (type: string) => {
    setTestTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleSampleType = (type: string) => {
    setSampleTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleStatus = (status: string) => {
    setStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const clearAllFilters = () => {
    setDateRange('all');
    setCustomDateStart('');
    setCustomDateEnd('');
    setTestTypes([]);
    setSampleTypes([]);
    setStatuses([]);
    setLabNumberFrom('');
    setLabNumberTo('');
  };

  return {
    // State
    dateRange,
    customDateStart,
    customDateEnd,
    testTypes,
    sampleTypes,
    statuses,
    labNumberFrom,
    labNumberTo,
    hasActiveFilters,
    
    // Setters
    setDateRange,
    setCustomDateStart,
    setCustomDateEnd,
    setLabNumberFrom,
    setLabNumberTo,
    
    // Toggle functions
    toggleTestType,
    toggleSampleType,
    toggleStatus,
    
    // Clear
    clearAllFilters,
  };
}
