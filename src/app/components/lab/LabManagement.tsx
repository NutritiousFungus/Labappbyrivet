import React, { useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  MoreVertical,
  LucideIcon
} from 'lucide-react';
import { AdminSection } from './types';

interface LabManagementProps {
  darkMode: boolean;
  setActiveSection: (section: AdminSection) => void;
  title: string;
  icon: LucideIcon;
  data: any[];
  onAdd?: () => void;
  addButtonText?: string;
}

export function LabManagement({ 
  darkMode, 
  setActiveSection, 
  title, 
  icon: Icon, 
  data,
  onAdd,
  addButtonText = 'Add Item'
}: LabManagementProps) {
  const themeClasses = useMemo(() => ({
    cardBg: darkMode ? 'bg-[#252525]' : 'bg-white',
    textPrimary: darkMode ? 'text-[#E0E0E0]' : 'text-gray-800',
    textSecondary: darkMode ? 'text-[#C0C0C0]' : 'text-gray-600',
    borderColor: darkMode ? 'border-[#2C2C2C]' : 'border-gray-200',
    hoverBg: darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-50'
  }), [darkMode]);

  const { cardBg, textPrimary, textSecondary, borderColor } = themeClasses;

  // Get columns from first data item keys
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <button
        onClick={() => setActiveSection('home')}
        className={`flex items-center gap-2 mb-6 -ml-2 p-2 ${textSecondary} transition-colors ${themeClasses.hoverBg} rounded-lg`}
      >
        <ArrowLeft className="size-5" />
        <span className="font-medium">Back</span>
      </button>

      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${textPrimary}`}>{title}</h2>
        <button className="px-4 py-2 bg-[#1f5527] hover:bg-[#2d7a3e] text-white rounded-lg font-medium transition-colors flex items-center gap-2">
          <Icon className="size-4" />
          {addButtonText}
        </button>
      </div>

      <div className={`${cardBg} ${borderColor} border rounded-lg overflow-hidden`}>
        {/* Toolbar */}
        <div className={`p-4 border-b ${borderColor} flex gap-4`}>
          <div className="relative flex-1">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 size-4 ${textSecondary}`} />
            <input 
              type="text" 
              placeholder="Search..."
              className={`w-full pl-10 pr-4 py-2 ${darkMode ? 'bg-[#2C2C2C]' : 'bg-white'} border ${borderColor} rounded-lg text-sm ${textPrimary}`}
            />
          </div>
          <button className={`px-4 py-2 border ${borderColor} rounded-lg ${textSecondary} hover:${textPrimary} flex items-center gap-2`}>
            <Filter className="size-4" />
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={darkMode ? 'bg-[#2C2C2C]' : 'bg-gray-50'}>
              <tr>
                {columns.map((col) => (
                  <th key={col} className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>
                    {col}
                  </th>
                ))}
                <th className={`px-6 py-3 text-right text-xs font-medium ${textSecondary} uppercase tracking-wider`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${borderColor}`}>
              {data.map((item, idx) => (
                <tr key={idx} className={themeClasses.hoverBg}>
                  {columns.map((col) => (
                    <td key={col} className={`px-6 py-4 whitespace-nowrap text-sm ${textPrimary}`}>
                      {item[col]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className={`${textSecondary} hover:${textPrimary}`}>
                      <MoreVertical className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} className={`px-6 py-8 text-center text-sm ${textSecondary}`}>
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
