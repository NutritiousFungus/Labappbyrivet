import React from 'react';
import { X, Search } from 'lucide-react';
import { getThemeClasses } from '@/app/utils/themeUtils';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: any; // Result of useFilters
  darkMode: boolean;
  testingMode: 'feeds' | 'soil';
  activeFilterCount: number;
  headerTheme: 'blue' | 'grey';
}

export function FilterModal({
  isOpen,
  onClose,
  filters,
  darkMode,
  testingMode,
  activeFilterCount,
  headerTheme
}: FilterModalProps) {
  if (!isOpen) return null;

  const theme = getThemeClasses(darkMode);
  const {
    cardBg,
    cardBorder,
    textPrimary,
    textSecondary,
    textTertiary,
    inputBorder,
    hoverBg,
    inputBg
  } = theme;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className={`${cardBg} rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col border-l-8 ${
        headerTheme === 'grey' 
          ? 'border-l-black' 
          : (testingMode === 'feeds' ? 'border-l-[#1f5527]' : 'border-l-[#411900]')
      }`}>
        <div className={`px-6 py-4 ${darkMode ? 'border-b border-[#2C2C2C]' : 'border-b border-gray-100'} flex items-center justify-between flex-shrink-0`}>
          <h3 className={`text-lg font-semibold ${textPrimary}`}>Filter Samples</h3>
          <button 
            onClick={onClose}
            className={`p-2 ${hoverBg} rounded-full transition-colors`}
          >
            <X className={`size-5 ${textSecondary}`} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Date Range Filter */}
          <div>
            <label className={`block text-sm font-semibold ${textPrimary} mb-2`}>Date Range</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {[
                { value: 'all', label: 'All Time' },
                { value: '7days', label: 'Last 7 Days' },
                { value: '30days', label: 'Last 30 Days' },
                { value: '90days', label: 'Last 3 Months' },
                { value: 'custom', label: 'Custom Range' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => filters.setDateRange(option.value as any)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    filters.dateRange === option.value
                      ? (testingMode === 'feeds' ? 'bg-[#2d7a3e] text-white' : 'bg-[#411900] text-white')
                      : `${hoverBg} ${textSecondary} border ${inputBorder}`
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            {filters.dateRange === 'custom' && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                <div>
                  <label className={`block text-xs font-medium ${textSecondary} mb-1`}>Start Date</label>
                  <input
                    type="date"
                    value={filters.customDateStart}
                    onChange={(e) => filters.setCustomDateStart(e.target.value)}
                    className={`w-full ${inputBg} border ${inputBorder} rounded-lg px-3 py-2 text-sm ${textPrimary} focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'}`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-medium ${textSecondary} mb-1`}>End Date</label>
                  <input
                    type="date"
                    value={filters.customDateEnd}
                    onChange={(e) => filters.setCustomDateEnd(e.target.value)}
                    className={`w-full ${inputBg} border ${inputBorder} rounded-lg px-3 py-2 text-sm ${textPrimary} focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'}`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sample Type Filter */}
          <div>
            <label className={`block text-sm font-semibold ${textPrimary} mb-2`}>Sample Type</label>
            <div className="space-y-2">
              {(testingMode === 'feeds' 
                ? ['Corn Silage', 'Hay/Haylage', 'TMR', 'Grains/Commodities']
                : ['Field/Pasture', 'Garden/Lawn', 'Commercial']
              ).map(type => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.sampleTypes.includes(type)}
                    onChange={() => filters.toggleSampleType(type)}
                    className={`rounded border-gray-300 ${testingMode === 'feeds' ? 'text-[#2d7a3e] focus:ring-[#2d7a3e]' : 'text-blue-600 focus:ring-blue-500'}`}
                  />
                  <span className={`text-sm ${textSecondary}`}>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Test Package Filter */}
          <div>
            <label className={`block text-sm font-semibold ${textPrimary} mb-2`}>Test Package</label>
            <div className="space-y-2">
              {(testingMode === 'feeds'
                ? ['Basic', 'NIR Select', 'Comprehensive']
                : ['Basic Soil', 'Complete Soil']
              ).map(pkg => (
                <label key={pkg} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.testTypes.includes(pkg)}
                    onChange={() => filters.toggleTestType(pkg)}
                    className={`rounded border-gray-300 ${testingMode === 'feeds' ? 'text-[#2d7a3e] focus:ring-[#2d7a3e]' : 'text-blue-600 focus:ring-blue-500'}`}
                  />
                  <span className={`text-sm ${textSecondary}`}>{pkg}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className={`block text-sm font-semibold ${textPrimary} mb-2`}>Status</label>
            <div className="space-y-2">
              {[
                { value: 'pending', label: 'Pending Arrival' },
                { value: 'processing', label: 'In Testing' },
                { value: 'partial', label: 'Partially Complete' },
                { value: 'completed', label: 'Completed' }
              ].map(status => (
                <label key={status.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.statuses.includes(status.value)}
                    onChange={() => filters.toggleStatus(status.value)}
                    className={`rounded border-gray-300 ${testingMode === 'feeds' ? 'text-[#2d7a3e] focus:ring-[#2d7a3e]' : 'text-blue-600 focus:ring-blue-500'}`}
                  />
                  <span className={`text-sm ${textSecondary}`}>{status.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Lab Number Range Filter */}
          <div>
            <label className={`block text-sm font-semibold ${textPrimary} mb-2`}>Lab Number Range</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="From (e.g., 1-027-450)"
                value={filters.labNumberFrom}
                onChange={(e) => filters.setLabNumberFrom(e.target.value)}
                className={`flex-1 ${inputBg} border ${inputBorder} rounded-lg px-3 py-2 text-sm ${textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'}`}
              />
              <span className={textTertiary}>to</span>
              <input
                type="text"
                placeholder="To (e.g., 1-027-489)"
                value={filters.labNumberTo}
                onChange={(e) => filters.setLabNumberTo(e.target.value)}
                className={`flex-1 ${inputBg} border ${inputBorder} rounded-lg px-3 py-2 text-sm ${textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'}`}
              />
            </div>
            <p className={`text-xs ${textTertiary} mt-1`}>Filter by lab number range</p>
          </div>
        </div>

        <div className={`px-6 py-4 ${darkMode ? 'border-t border-[#2C2C2C]' : 'border-t border-gray-100'} sticky bottom-0 ${cardBg} rounded-b-2xl`}>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-[#2C5282] hover:bg-[#1E3A5F] text-white rounded-lg font-medium transition-colors"
            >
              Apply Filters
              {activeFilterCount > 0 && ` (${activeFilterCount})`}
            </button>
            <button
              onClick={onClose}
              className={`px-4 py-3 ${hoverBg} rounded-lg transition-colors font-medium ${textSecondary}`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}