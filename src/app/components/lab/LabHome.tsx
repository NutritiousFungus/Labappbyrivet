import React, { useMemo } from 'react';
import { 
  FlaskConical, 
  Upload, 
  Building2, 
  Users, 
  FolderKanban, 
  MessageSquare, 
  Truck, 
  ClipboardList,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { AdminSection } from './types';

interface LabHomeProps {
  darkMode: boolean;
  setActiveSection: (section: AdminSection) => void;
}

export function LabHome({ darkMode, setActiveSection }: LabHomeProps) {
  // Theme classes
  const themeClasses = useMemo(() => ({
    cardBg: darkMode ? 'bg-[#252525]' : 'bg-white',
    textPrimary: darkMode ? 'text-[#E0E0E0]' : 'text-gray-800',
    textSecondary: darkMode ? 'text-[#C0C0C0]' : 'text-gray-600',
    borderColor: darkMode ? 'border-[#2C2C2C]' : 'border-gray-200',
    hoverBg: darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-50'
  }), [darkMode]);

  const { cardBg, textPrimary, textSecondary, borderColor, hoverBg } = themeClasses;

  // Lab operations sections
  const labOperations = [
    {
      id: 'test-view' as AdminSection,
      title: 'Edit Sample Data',
      description: 'Filter and view tests by lab, assay, analyte, and sample type',
      icon: FlaskConical,
    },
    {
      id: 'shipping' as AdminSection,
      title: 'Shipping',
      description: 'Track incoming customer samples and inter-lab transfers',
      icon: Truck,
    },
    {
      id: 'supply-orders' as AdminSection,
      title: 'Lab/Office Supply Orders',
      description: 'Request and track lab and office supplies',
      icon: ClipboardList,
    },
    {
      id: 'upload-results' as AdminSection,
      title: 'Upload Results',
      description: 'Upload test results with step-by-step instructions',
      icon: Upload,
    },
  ];

  // Management sections
  const managementSections = [
    {
      id: 'manage-orgs' as AdminSection,
      title: 'Manage Organizations',
      description: 'Create, edit, and manage client organizations',
      icon: Building2,
    },
    {
      id: 'manage-users' as AdminSection,
      title: 'Manage Customer User Accounts',
      description: 'User accounts, permissions, and access control',
      icon: Users,
    },
    {
      id: 'manage-projects' as AdminSection,
      title: 'Manage Projects',
      description: 'Organize and track client projects',
      icon: FolderKanban,
    },
    {
      id: 'client-comms' as AdminSection,
      title: 'Client Communications',
      description: 'Manage client messages and announcements',
      icon: MessageSquare,
    },
    {
      id: 'driver-routes' as AdminSection,
      title: 'Driver & Route Management',
      description: 'Assign drivers to sample pickup routes',
      icon: Truck,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Employee Notification Banner */}
      <div className={`${darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'} border rounded-lg p-4 mb-6 flex items-start gap-3`}>
        <AlertCircle className="size-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <div className={`text-sm font-semibold ${textPrimary} mb-1`}>
            Reminder: Instrument Calibration & PTO Deadlines
          </div>
          <div className={`text-sm ${textSecondary}`}>
            All NIR instruments require monthly calibration verification. Next scheduled calibration: Jan 20th. 
            Don't forget to submit Q1 2026 PTO requests by January 31st for scheduling priority.
          </div>
        </div>
      </div>

      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${textPrimary} mb-2`}>
          Good morning, Austin!
        </h1>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lab Operations Column */}
        <div>
          <h2 className={`text-lg font-semibold ${textPrimary} mb-4`}>Lab Operations</h2>
          <div className={`${cardBg} ${borderColor} border border-l-8 border-l-[#1e3a8a] rounded-lg overflow-hidden`}>
            {labOperations.map((section, index) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors ${hoverBg} ${
                    index !== labOperations.length - 1 ? `border-b ${borderColor}` : ''
                  }`}
                >
                  <Icon className={`size-5 ${textSecondary} flex-shrink-0`} strokeWidth={2} />
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium ${textPrimary} mb-0.5`}>{section.title}</div>
                    <div className={`text-sm ${textSecondary}`}>{section.description}</div>
                  </div>
                  <ChevronRight className={`size-5 ${textSecondary} flex-shrink-0`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Management Column */}
        <div>
          <h2 className={`text-lg font-semibold ${textPrimary} mb-4`}>Office Operations</h2>
          <div className={`${cardBg} ${borderColor} border border-l-8 border-l-[#ca8a04] rounded-lg overflow-hidden`}>
            {managementSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors ${hoverBg} ${
                    index !== managementSections.length - 1 ? `border-b ${borderColor}` : ''
                  }`}
                >
                  <Icon className={`size-5 ${textSecondary} flex-shrink-0`} strokeWidth={2} />
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium ${textPrimary} mb-0.5`}>{section.title}</div>
                    <div className={`text-sm ${textSecondary}`}>{section.description}</div>
                  </div>
                  <ChevronRight className={`size-5 ${textSecondary} flex-shrink-0`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Subtle Manage Lab Users Button - Bottom Right */}
      <div className="flex justify-end mt-8">
        <button
          onClick={() => setActiveSection('manage-lab-users')}
          className={`text-sm ${textSecondary} hover:${textPrimary} transition-colors`}
        >
          Manage Lab Users
        </button>
      </div>
    </div>
  );
}
