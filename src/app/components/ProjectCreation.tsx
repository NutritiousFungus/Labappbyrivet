import { useState, useEffect } from 'react';
import { X, Plus, Check, Search, FolderPlus, Users } from 'lucide-react';
import { getSampleTypeSmallIcon } from '@/app/utils/sampleIcons';

interface Sample {
  id: string;
  sampleName: string;
  sampleType: string;
  testPackage: string;
  status: 'completed' | 'processing' | 'pending' | 'partial';
  createdDate: string;
  timestamp: string;
}

interface Organization {
  name: string;
  color: string;
}

interface ProjectCreationProps {
  onClose: () => void;
  onSubmit: (projectData: {
    name: string;
    description: string;
    sampleIds: string[];
    sharedWith: Organization[];
  }) => void;
  darkMode: boolean;
  availableSamples: Sample[];
  availableOrganizations: Organization[];
}

export function ProjectCreation({
  onClose,
  onSubmit,
  darkMode,
  availableSamples,
  availableOrganizations,
}: ProjectCreationProps) {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSampleIds, setSelectedSampleIds] = useState<string[]>([]);
  const [sharedOrganizations, setSharedOrganizations] = useState<Organization[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const textPrimary = darkMode ? 'text-[#E8E8E8]' : 'text-stone-800';
  const textSecondary = darkMode ? 'text-[#C0C0C0]' : 'text-stone-600';
  const textTertiary = darkMode ? 'text-[#909090]' : 'text-stone-500';
  const cardBg = darkMode ? 'bg-[#1E1E1E]' : 'bg-white';
  const inputBg = darkMode ? 'bg-[#2A2A2A]' : 'bg-white';
  const inputBorder = darkMode ? 'border-[#3C3C3C]' : 'border-stone-300';
  const hoverBg = darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-stone-50';
  const divideBorder = darkMode ? 'divide-[#2C2C2C]' : 'divide-stone-200';

  const toggleSample = (sampleId: string) => {
    setSelectedSampleIds(prev =>
      prev.includes(sampleId)
        ? prev.filter(id => id !== sampleId)
        : [...prev, sampleId]
    );
  };

  const toggleOrganization = (org: Organization) => {
    setSharedOrganizations(prev =>
      prev.some(o => o.name === org.name)
        ? prev.filter(o => o.name !== org.name)
        : [...prev, org]
    );
  };

  const handleSubmit = () => {
    if (!projectName.trim()) {
      alert('Please enter a project name');
      return;
    }
    if (selectedSampleIds.length === 0) {
      alert('Please select at least one sample');
      return;
    }

    onSubmit({
      name: projectName.trim(),
      description: description.trim(),
      sampleIds: selectedSampleIds,
      sharedWith: sharedOrganizations,
    });
  };

  const filteredSamples = availableSamples.filter(sample =>
    sample.sampleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sample.sampleType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sample.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div
        className={`${cardBg} rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className={`px-4 sm:px-6 py-4 ${darkMode ? 'border-b border-[#2C2C2C]' : 'border-b border-stone-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`size-8 sm:size-10 rounded-full ${darkMode ? 'bg-green-900/30' : 'bg-green-100'} flex items-center justify-center`}>
                <FolderPlus className={`size-4 sm:size-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <div>
                <h2 className={`text-lg sm:text-xl font-bold ${textPrimary}`}>Create New Project</h2>
                <p className={`text-xs sm:text-sm ${textTertiary}`}>Organize samples and collaborate with others</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 ${hoverBg} rounded-full transition-colors`}
            >
              <X className={`size-5 ${textSecondary}`} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="space-y-6">
            {/* Project Details */}
            <div>
              <label className={`block text-sm font-semibold ${textPrimary} mb-2`}>
                Project Name *
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Spring 2026 Silage Analysis"
                className={`w-full px-4 py-3 border ${inputBorder} rounded-xl ${inputBg} ${textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'}`}
                autoFocus
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold ${textPrimary} mb-2`}>
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add notes about this project..."
                rows={3}
                className={`w-full px-4 py-3 border ${inputBorder} rounded-xl ${inputBg} ${textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'} resize-none`}
              />
            </div>

            {/* Sample Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={`text-sm font-semibold ${textPrimary}`}>
                  Select Samples * ({selectedSampleIds.length} selected)
                </label>
                {filteredSamples.length > 0 && (
                  <button
                    onClick={() => {
                      if (selectedSampleIds.length === filteredSamples.length) {
                        setSelectedSampleIds([]);
                      } else {
                        setSelectedSampleIds(filteredSamples.map(s => s.id));
                      }
                    }}
                    className={`text-xs font-medium ${darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'} transition-colors`}
                  >
                    {selectedSampleIds.length === filteredSamples.length ? 'Deselect All' : 'Select All'}
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="relative mb-3">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 size-4 ${textTertiary}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search samples..."
                  className={`w-full pl-10 pr-4 py-2.5 border ${inputBorder} rounded-xl ${inputBg} ${textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'}`}
                />
              </div>

              {/* Sample List */}
              <div className={`border ${inputBorder} rounded-xl max-h-64 overflow-y-auto divide-y ${divideBorder}`}>
                {availableSamples.length === 0 ? (
                  <div className={`p-6 text-center ${textTertiary}`}>
                    <p className="mb-2">No completed samples available</p>
                    <p className="text-xs">Complete some sample analyses before creating a project</p>
                  </div>
                ) : filteredSamples.length === 0 ? (
                  <div className={`p-4 text-center ${textTertiary}`}>
                    No samples match your search
                  </div>
                ) : (
                  filteredSamples.map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => toggleSample(sample.id)}
                      className={`w-full px-4 py-3 text-left transition-colors ${hoverBg} flex items-center gap-3`}
                    >
                      {/* Checkbox */}
                      <div className={`size-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                        selectedSampleIds.includes(sample.id)
                          ? 'bg-green-600 border-green-600'
                          : `${inputBorder} ${darkMode ? 'border-[#3C3C3C]' : 'border-stone-300'}`
                      }`}>
                        {selectedSampleIds.includes(sample.id) && (
                          <Check className="size-3.5 text-white" />
                        )}
                      </div>

                      {/* Sample Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-semibold ${textPrimary}`}>{sample.sampleName}</span>
                          <span className={`text-xs font-mono ${textTertiary}`}>{sample.id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`flex items-center gap-1 text-xs ${textSecondary}`}>
                            {getSampleTypeSmallIcon(sample.sampleType)}
                            {sample.sampleType}
                          </div>
                          <span className={`text-xs ${textTertiary}`}>•</span>
                          <span className={`text-xs ${textSecondary}`}>{sample.testPackage}</span>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Organization Sharing */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className={`size-4 ${textSecondary}`} />
                <label className={`text-sm font-semibold ${textPrimary}`}>
                  Share with Organizations (Optional)
                </label>
              </div>

              {availableOrganizations.length === 0 ? (
                <div className={`p-4 border ${inputBorder} rounded-xl text-center ${textTertiary}`}>
                  No organizations available to share with
                </div>
              ) : (
                <div className={`border ${inputBorder} rounded-xl divide-y ${divideBorder}`}>
                  {availableOrganizations.map((org) => (
                    <button
                      key={org.name}
                      onClick={() => toggleOrganization(org)}
                      className={`w-full px-4 py-3 text-left transition-colors ${hoverBg} flex items-center gap-3`}
                    >
                      {/* Checkbox */}
                      <div className={`size-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                        sharedOrganizations.some(o => o.name === org.name)
                          ? 'bg-green-600 border-green-600'
                          : `${inputBorder} ${darkMode ? 'border-[#3C3C3C]' : 'border-stone-300'}`
                      }`}>
                        {sharedOrganizations.some(o => o.name === org.name) && (
                          <Check className="size-3.5 text-white" />
                        )}
                      </div>

                      {/* Organization */}
                      <div className="flex items-center gap-2 flex-1">
                        <div
                          className="size-3 rounded-full"
                          style={{ backgroundColor: org.color }}
                        />
                        <span className={`font-medium ${textPrimary}`}>{org.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`px-4 sm:px-6 py-4 ${darkMode ? 'border-t border-[#2C2C2C]' : 'border-t border-stone-200'} flex gap-2 sm:gap-3`}>
          <button
            onClick={onClose}
            className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 ${hoverBg} rounded-xl transition-colors font-medium text-sm sm:text-base ${textSecondary}`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 ${darkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} text-white rounded-xl transition-colors font-medium text-sm sm:text-base flex items-center justify-center gap-2`}
          >
            <Plus className="size-4 sm:size-5" />
            <span className="hidden xs:inline">Create Project</span>
            <span className="xs:hidden">Create</span>
          </button>
        </div>
      </div>
    </div>
  );
}