import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  BarChart3,
  Edit,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { generateTestData } from '@/app/data/labMockData';
import { AdminSection } from './types';

interface LabTestViewProps {
  darkMode: boolean;
  setActiveSection: (section: AdminSection) => void;
}

export function LabTestView({ darkMode, setActiveSection }: LabTestViewProps) {
  const [sampleFilter, setSampleFilter] = useState('');
  const [sampleStatusFilter, setSampleStatusFilter] = useState<string>('all');
  const [sampleAssignments, setSampleAssignments] = useState<Record<string, string>>({});
  const [prioritySamples, setPrioritySamples] = useState<Set<string>>(new Set());
  const [selectedSamples, setSelectedSamples] = useState<Set<string>>(new Set());

  // Memoized test data
  const testData = useMemo(() => generateTestData(), []);

  // Theme classes
  const themeClasses = useMemo(() => ({
    cardBg: darkMode ? 'bg-[#252525]' : 'bg-white',
    textPrimary: darkMode ? 'text-[#E0E0E0]' : 'text-gray-800',
    textSecondary: darkMode ? 'text-[#C0C0C0]' : 'text-gray-600',
    borderColor: darkMode ? 'border-[#2C2C2C]' : 'border-gray-200',
    hoverBg: darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-50'
  }), [darkMode]);

  const { cardBg, textPrimary, textSecondary, borderColor, hoverBg } = themeClasses;

  return (
    <div className="max-w-full mx-auto px-6 py-8">
      {/* Back Button */}
      <button
        onClick={() => setActiveSection('home')}
        className={`flex items-center gap-2 mb-6 -ml-2 p-2 ${textSecondary} transition-colors ${hoverBg} rounded-lg`}
      >
        <ArrowLeft className="size-5" />
        <span className="font-medium">Back</span>
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-2xl font-bold ${textPrimary} mb-1`}>Sample Data Management</h2>
          <p className={`text-sm ${textSecondary}`}>
            View and edit sample data, assign tests, and track progress across all laboratories.
          </p>
        </div>
        <div className="flex gap-2">
          <button className={`px-4 py-2 ${cardBg} border ${borderColor} rounded-lg ${textPrimary} text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#333] transition-colors flex items-center gap-2`}>
            <BarChart3 className="size-4" />
            Analytics
          </button>
          <button className="px-4 py-2 bg-[#1f5527] text-white rounded-lg text-sm font-medium hover:bg-[#2d7a3e] transition-colors flex items-center gap-2">
            <Filter className="size-4" />
            Advanced Filter
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className={`${cardBg} p-4 rounded-lg border ${borderColor}`}>
          <div className={`text-sm ${textSecondary} mb-1`}>Samples In Process</div>
          <div className={`text-2xl font-bold ${textPrimary}`}>142</div>
          <div className="text-xs text-green-500 flex items-center gap-1 mt-1">
            <CheckCircle2 className="size-3" />
            +12 from yesterday
          </div>
        </div>
        <div className={`${cardBg} p-4 rounded-lg border ${borderColor}`}>
          <div className={`text-sm ${textSecondary} mb-1`}>Pending Review</div>
          <div className={`text-2xl font-bold ${textPrimary}`}>28</div>
          <div className="text-xs text-orange-500 flex items-center gap-1 mt-1">
            <AlertCircle className="size-3" />
            4 urgent items
          </div>
        </div>
        <div className={`${cardBg} p-4 rounded-lg border ${borderColor}`}>
          <div className={`text-sm ${textSecondary} mb-1`}>Completed Today</div>
          <div className={`text-2xl font-bold ${textPrimary}`}>64</div>
          <div className={`text-xs ${textSecondary} mt-1`}>98% turnaround time</div>
        </div>
        <div className={`${cardBg} p-4 rounded-lg border ${borderColor}`}>
          <div className={`text-sm ${textSecondary} mb-1`}>Avg Turnaround</div>
          <div className={`text-2xl font-bold ${textPrimary}`}>1.8 Days</div>
          <div className={`text-xs ${textSecondary} mt-1`}>Target: 2.0 Days</div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className={`${cardBg} border ${borderColor} rounded-lg overflow-hidden shadow-sm`}>
        {/* Table Toolbar */}
        <div className={`p-4 border-b ${borderColor} flex flex-wrap gap-4 items-center justify-between`}>
          <div className="flex items-center gap-2 flex-1 min-w-[300px]">
            <div className="relative flex-1">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 size-4 ${textSecondary}`} />
              <input 
                type="text"
                placeholder="Search by Lab ID, Farm, or Sample Type..."
                value={sampleFilter}
                onChange={(e) => setSampleFilter(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 ${darkMode ? 'bg-[#1e1e1e]' : 'bg-gray-50'} border ${borderColor} rounded-lg text-sm ${textPrimary} focus:outline-none focus:ring-2 focus:ring-[#1f5527]`}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <select 
              value={sampleStatusFilter}
              onChange={(e) => setSampleStatusFilter(e.target.value)}
              className={`px-3 py-2 ${darkMode ? 'bg-[#1e1e1e]' : 'bg-gray-50'} border ${borderColor} rounded-lg text-sm ${textPrimary}`}
            >
              <option value="all">All Statuses</option>
              <option value="received">Received</option>
              <option value="processing">In Process</option>
              <option value="review">In Review</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={darkMode ? 'bg-[#1e1e1e]' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-[#1f5527] focus:ring-[#1f5527]"
                      checked={selectedSamples.size > 0 && selectedSamples.size === testData.length}
                      onChange={() => {
                        if (selectedSamples.size === testData.length) {
                          setSelectedSamples(new Set());
                        } else {
                          setSelectedSamples(new Set(testData.map(d => d.labId)));
                        }
                      }}
                    />
                  </div>
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Lab ID</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Farm / Client</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Sample Type</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Tests</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Lab Location</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Status</th>
                <th className={`px-6 py-3 text-right text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${borderColor}`}>
              {testData.filter(item => {
                if (sampleStatusFilter !== 'all' && item.status.toLowerCase() !== sampleStatusFilter) return false;
                if (sampleFilter) {
                  const query = sampleFilter.toLowerCase();
                  return (
                    item.labId.toLowerCase().includes(query) ||
                    item.farm.toLowerCase().includes(query) ||
                    item.sampleType.toLowerCase().includes(query) ||
                    item.labLocation.toLowerCase().includes(query)
                  );
                }
                return true;
              }).map((item) => (
                <tr key={item.labId} className={`${hoverBg} transition-colors`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-[#1f5527] focus:ring-[#1f5527]"
                      checked={selectedSamples.has(item.labId)}
                      onChange={() => {
                        const newSelected = new Set(selectedSamples);
                        if (newSelected.has(item.labId)) {
                          newSelected.delete(item.labId);
                        } else {
                          newSelected.add(item.labId);
                        }
                        setSelectedSamples(newSelected);
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${textPrimary} font-mono`}>{item.labId}</div>
                    <div className={`text-xs ${textSecondary}`}>{item.dateReceived}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${textPrimary}`}>{item.farm}</div>
                    <div className={`text-xs ${textSecondary}`}>Grower: {item.grower}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.sampleType === 'Corn Silage' ? 'bg-yellow-100 text-yellow-800' : 
                      item.sampleType === 'Alfalfa Hay' ? 'bg-green-100 text-green-800' :
                      item.sampleType === 'TMR' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.sampleType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-xs ${textPrimary} max-w-[200px] truncate`} title={item.tests.join(', ')}>
                      {item.tests.join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${textPrimary}`}>{item.labLocation}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                        item.status === 'Completed' ? 'bg-green-500' :
                        item.status === 'In Process' ? 'bg-blue-500' :
                        item.status === 'Received' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`}></div>
                      <span className={`text-sm ${textPrimary}`}>{item.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className={`${textSecondary} hover:${textPrimary}`}>
                      <Edit className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className={`px-6 py-3 border-t ${borderColor} flex items-center justify-between`}>
          <div className={`text-sm ${textSecondary}`}>
            Showing 1 to 10 of {testData.length} entries
          </div>
          <div className="flex gap-1">
            <button className={`px-3 py-1 border ${borderColor} rounded ${textSecondary} hover:${textPrimary} disabled:opacity-50`}>Previous</button>
            <button className={`px-3 py-1 bg-[#1f5527] text-white rounded`}>1</button>
            <button className={`px-3 py-1 border ${borderColor} rounded ${textSecondary} hover:${textPrimary}`}>2</button>
            <button className={`px-3 py-1 border ${borderColor} rounded ${textSecondary} hover:${textPrimary}`}>3</button>
            <button className={`px-3 py-1 border ${borderColor} rounded ${textSecondary} hover:${textPrimary}`}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
