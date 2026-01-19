import React, { useMemo } from 'react';
import { 
  ArrowLeft, 
  FolderKanban, 
  Calendar, 
  MoreVertical 
} from 'lucide-react';
import { AdminSection } from './types';

interface LabManageProjectsProps {
  darkMode: boolean;
  setActiveSection: (section: AdminSection) => void;
}

export function LabManageProjects({ darkMode, setActiveSection }: LabManageProjectsProps) {
  const projectData = [
    { Name: 'Spring 2026 Feed Analysis', Organization: 'Goeser\'s Grazers', Samples: 45, Status: 'Active', StartDate: 'Jan 2, 2026', DueDate: 'Feb 15, 2026' },
    { Name: 'Winter Feed Study', Organization: 'Friendly Illinois Brothers', Samples: 67, Status: 'Active', StartDate: 'Dec 10, 2025', DueDate: 'Jan 30, 2026' },
    { Name: 'Soil Testing - North Fields', Organization: 'Green Valley Farms', Samples: 18, Status: 'Active', StartDate: 'Jan 5, 2026', DueDate: 'Jan 25, 2026' },
    { Name: 'Q4 2025 TMR Monitoring', Organization: 'Sunset Dairy', Samples: 32, Status: 'Complete', StartDate: 'Oct 1, 2025', DueDate: 'Dec 31, 2025' },
    { Name: 'Haylage Quality Assessment', Organization: 'Meadow View Farms', Samples: 28, Status: 'Active', StartDate: 'Jan 8, 2026', DueDate: 'Feb 5, 2026' },
  ];

  const themeClasses = useMemo(() => ({
    cardBg: darkMode ? 'bg-[#252525]' : 'bg-white',
    textPrimary: darkMode ? 'text-[#E0E0E0]' : 'text-gray-800',
    textSecondary: darkMode ? 'text-[#C0C0C0]' : 'text-gray-600',
    borderColor: darkMode ? 'border-[#2C2C2C]' : 'border-gray-200',
    hoverBg: darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-50'
  }), [darkMode]);

  const { cardBg, textPrimary, textSecondary, borderColor } = themeClasses;

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
        <h2 className={`text-2xl font-bold ${textPrimary}`}>Manage Projects</h2>
      </div>

      <div className={`${cardBg} border-2 border-[#2d7a3e] rounded-lg p-6 mb-6`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="size-10 rounded-full bg-[#2d7a3e] flex items-center justify-center">
            <FolderKanban className="size-5 text-white" />
          </div>
          <h3 className={`text-xl font-bold ${textPrimary}`}>Start a New Project</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Project Name</label>
            <input
              type="text"
              placeholder="e.g., Spring 2026 Feed Analysis"
              className={`w-full px-4 py-2 ${darkMode ? 'bg-[#2C2C2C]' : 'bg-white'} ${borderColor} border rounded-lg ${textPrimary}`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Organization</label>
            <select className={`w-full px-4 py-2 ${darkMode ? 'bg-[#2C2C2C]' : 'bg-white'} ${borderColor} border rounded-lg ${textPrimary}`}>
              <option value="">Select organization...</option>
              <option value="goesers">Goeser's Grazers</option>
              <option value="fib">Friendly Illinois Brothers</option>
              <option value="sdc">Standard Dairy Consultants</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-[#2d7a3e] hover:bg-[#246630] text-white rounded-lg font-semibold transition-colors">
            Create Project
          </button>
        </div>
      </div>

      <div className={`${cardBg} ${borderColor} border rounded-lg overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={darkMode ? 'bg-[#2C2C2C]' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Project Name</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Organization</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Samples</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Timeline</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Status</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${borderColor}`}>
              {projectData.map((project, idx) => (
                <tr key={idx} className={themeClasses.hoverBg}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${textPrimary}`}>
                    {project.Name}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${textSecondary}`}>
                    {project.Organization}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${textSecondary}`}>
                    {project.Samples}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${textSecondary}`}>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="size-3" />
                      {project.StartDate} - {project.DueDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      project.Status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {project.Status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className={`${textSecondary} hover:${textPrimary}`}>
                      <MoreVertical className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
