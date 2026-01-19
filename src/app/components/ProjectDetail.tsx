import { useState } from 'react';
import { ArrowLeft, Users, Calendar, Share2, FileText, MoreVertical, Trash2, Edit, UserPlus, X, Check, Lightbulb, Beaker, Plus } from 'lucide-react';
import { Project } from '@/app/types';
import { StatusBadge } from '@/app/components/StatusBadge';

interface ProjectDetailProps {
  project: Project;
  darkMode: boolean;
  onBack: () => void;
  onAddSamples: () => void;
  onShareProject: (organizations: string[]) => void;
  onRemoveSample: (sampleId: string) => void;
  onSampleClick: (sampleId: string, sampleName: string) => void;
}

export function ProjectDetail({
  project,
  darkMode,
  onBack,
  onAddSamples,
  onShareProject,
  onRemoveSample,
  onSampleClick
}: ProjectDetailProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedOrgsToShare, setSelectedOrgsToShare] = useState<Set<string>>(new Set());
  const [showInsights, setShowInsights] = useState(false);

  const textPrimary = darkMode ? 'text-[#E8E8E8]' : 'text-stone-800';
  const textSecondary = darkMode ? 'text-[#C0C0C0]' : 'text-stone-600';
  const textTertiary = darkMode ? 'text-[#909090]' : 'text-stone-400';
  const cardBg = darkMode ? 'bg-[#1E1E1E]' : 'bg-white';
  const bgSecondary = darkMode ? 'bg-[#161616]' : 'bg-stone-50';
  const hoverBg = darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-stone-50';
  const borderColor = darkMode ? 'border-[#2C2C2C]' : 'border-stone-200';
  const inputBg = darkMode ? 'bg-[#2A2A2A]' : 'bg-white';
  const inputBorder = darkMode ? 'border-[#3C3C3C]' : 'border-stone-300';

  // Mock list of available organizations to share with
  const availableOrganizations = [
    { id: 'org1', name: 'Heritage Ag Co.', color: 'blue' },
    { id: 'org2', name: 'Sunrise Dairy', color: 'amber' },
    { id: 'org3', name: 'Green Valley Nutrition', color: 'green' },
    { id: 'org4', name: 'Midwest Feed Solutions', color: 'purple' },
  ];

  const toggleOrgSelection = (orgId: string) => {
    const newSet = new Set(selectedOrgsToShare);
    if (newSet.has(orgId)) {
      newSet.delete(orgId);
    } else {
      newSet.add(orgId);
    }
    setSelectedOrgsToShare(newSet);
  };

  const handleShare = () => {
    onShareProject(Array.from(selectedOrgsToShare));
    setShowShareModal(false);
    setSelectedOrgsToShare(new Set());
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 mb-4 -ml-2 p-2 ${textSecondary} transition-colors ${hoverBg} rounded-lg`}
        >
          <ArrowLeft className="size-5" />
          <span className="font-medium">Back to Projects</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${textPrimary} mb-2`}>
              {project.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className={textSecondary}>
                {project.samples.length} {project.samples.length === 1 ? 'sample' : 'samples'}
              </span>
              {project.sharedWith.length > 0 && (
                <>
                  <span className={textTertiary}>•</span>
                  <div className="flex items-center gap-1.5">
                    <Users className={`size-4 ${textTertiary}`} />
                    <span className={textSecondary}>
                      Shared with {project.sharedWith.map(org => org.name).join(', ')}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowShareModal(true)}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 ${cardBg} border ${borderColor} ${hoverBg} rounded-lg font-medium transition-colors text-sm md:text-base ${textPrimary}`}
            >
              <Share2 className="size-4 md:size-5" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={onAddSamples}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg font-medium transition-colors text-sm md:text-base`}
            >
              <Plus className="size-4 md:size-5" />
              Add Samples
            </button>
          </div>
        </div>
      </div>

      {/* Samples List */}
      {project.samples.length === 0 ? (
        <div className={`${cardBg} border ${borderColor} rounded-xl p-8 md:p-12 text-center`}>
          <div className={`${darkMode ? 'bg-[#2A2A2A]' : 'bg-stone-100'} rounded-full p-6 w-fit mx-auto mb-4`}>
            <Circle className={`size-10 ${textTertiary}`} strokeWidth={1.5} />
          </div>
          <h3 className={`text-lg font-semibold ${textPrimary} mb-2`}>No Samples Yet</h3>
          <p className={`text-sm ${textSecondary} mb-6`}>
            Add samples to this project to start tracking and analyzing
          </p>
          <button
            onClick={onAddSamples}
            className={`inline-flex items-center gap-2 px-4 py-2.5 ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg font-medium transition-colors`}
          >
            <Plus className="size-5" />
            Add Samples
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {project.samples.map((sample) => (
            <div
              key={sample.id}
              className={`${cardBg} border ${borderColor} rounded-xl p-4 md:p-5 ${hoverBg} transition-all group`}
            >
              <div className="flex items-start justify-between gap-3">
                <button
                  onClick={() => onSampleClick(sample.id, sample.name)}
                  className="flex-1 text-left"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h4 className={`text-base md:text-lg font-semibold ${textPrimary}`}>
                      {sample.name}
                    </h4>
                    <StatusBadge status={sample.status} darkMode={darkMode} />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm">
                    <span className={textSecondary}>{sample.type}</span>
                    <span className={textTertiary}>•</span>
                    <span className={textSecondary}>Lab #{sample.labNumber}</span>
                    <span className={textTertiary}>•</span>
                    <span className={textSecondary}>{sample.submittedDate}</span>
                  </div>
                </button>
                <button
                  onClick={() => onRemoveSample(sample.id)}
                  className={`p-2 ${hoverBg} rounded-lg transition-colors opacity-0 group-hover:opacity-100`}
                  title="Remove from project"
                >
                  <Trash2 className={`size-4 md:size-5 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Share Project Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`${cardBg} rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto`}>
            <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between sticky top-0 ${cardBg} z-10`}>
              <h2 className={`text-xl font-semibold ${textPrimary}`}>
                Share Project
              </h2>
              <button
                onClick={() => setShowShareModal(false)}
                className={`p-2 ${hoverBg} rounded-full transition-colors`}
              >
                <X className={`size-5 ${textSecondary}`} />
              </button>
            </div>

            <div className="p-6">
              <p className={`text-sm ${textSecondary} mb-4`}>
                Select organizations to share this project with. They'll be able to view all samples and results.
              </p>

              <div className="space-y-2">
                {availableOrganizations.map((org) => {
                  const isSelected = selectedOrgsToShare.has(org.id);
                  const isAlreadyShared = project.sharedWith.some(shared => shared.name === org.name);
                  
                  return (
                    <button
                      key={org.id}
                      onClick={() => !isAlreadyShared && toggleOrgSelection(org.id)}
                      disabled={isAlreadyShared}
                      className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                        isAlreadyShared
                          ? `${borderColor} ${darkMode ? 'bg-[#2A2A2A]/50' : 'bg-stone-100/50'} cursor-not-allowed`
                          : isSelected
                            ? `border-green-600 ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`
                            : `${borderColor} ${cardBg} ${hoverBg}`
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`size-10 rounded-full bg-${org.color}-500/20 flex items-center justify-center`}>
                          <Users className={`size-5 text-${org.color}-600`} />
                        </div>
                        <div className="text-left">
                          <div className={`font-medium ${textPrimary}`}>{org.name}</div>
                          {isAlreadyShared && (
                            <div className={`text-xs ${textTertiary}`}>Already shared</div>
                          )}
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 className="size-5 text-green-600" />}
                      {!isSelected && !isAlreadyShared && <Circle className={`size-5 ${textTertiary}`} />}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowShareModal(false)}
                  className={`flex-1 px-4 py-2.5 ${cardBg} border ${borderColor} ${hoverBg} rounded-lg font-medium transition-colors ${textPrimary}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleShare}
                  disabled={selectedOrgsToShare.size === 0}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                    selectedOrgsToShare.size > 0
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : darkMode
                        ? 'bg-[#2A2A2A] text-[#707070] cursor-not-allowed'
                        : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  }`}
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Insights Modal */}
      {showInsights && (() => {
        const completedSamples = project.samples.filter(s => s.status === 'completed');
        const insights = [
          `This project contains ${project.samples.length} samples with ${completedSamples.length} completed analyses, providing a comprehensive view of your feeding program.`,
          `Sample diversity shows strong attention to quality control - testing multiple sources helps identify consistency patterns and potential issues early.`,
          `The ${project.samples.length}-sample dataset enables statistical analysis of variation across your operation, which is valuable for precision feeding strategies.`,
          `Shared with ${project.sharedWith.length > 0 ? project.sharedWith.map(o => o.name).join(' and ') : 'no external organizations'} - ${project.sharedWith.length > 0 ? 'great collaboration for comprehensive nutritional planning' : 'consider sharing with your nutritionist for expert review'}.`,
          `Project created ${project.createdDate} - timing of sample collection is ideal for ${new Date().getMonth() >= 5 && new Date().getMonth() <= 9 ? 'harvest season monitoring' : 'winter feeding program optimization'}.`,
        ];

        return (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className={`${cardBg} rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col`}>
              <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className={`${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'} p-2 rounded-lg`}>
                    <Lightbulb className={`size-6 ${darkMode ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-600 fill-yellow-400'}`} />
                  </div>
                  <div>
                    <h2 className={`text-xl font-semibold ${textPrimary}`}>
                      Project Insights
                    </h2>
                    <p className={`text-sm ${textTertiary}`}>{project.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowInsights(false)}
                  className={`p-2 ${hoverBg} rounded-full transition-colors`}
                >
                  <X className={`size-5 ${textSecondary}`} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4">
                <div className={`rounded-lg p-3 border ${darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
                  <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                    <strong>Note:</strong> These insights are AI-generated based on your project structure and sample data. Consult with a nutritionist for specific recommendations.
                  </p>
                </div>

                {insights.map((insight, index) => (
                  <div key={index} className={`p-4 rounded-xl border ${borderColor} ${darkMode ? 'bg-[#1A1A1A]' : 'bg-stone-50'}`}>
                    <div className="flex gap-3">
                      <div className={`size-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold text-sm ${darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'}`}>
                        {index + 1}
                      </div>
                      <p className={`text-sm ${textPrimary} flex-1 leading-relaxed`}>
                        {insight}
                      </p>
                    </div>
                  </div>
                ))}

                <div className={`rounded-lg p-4 border ${darkMode ? 'bg-amber-900/20 border-amber-800' : 'bg-amber-50 border-amber-200'}`}>
                  <div className="flex gap-2">
                    <Beaker className={`size-5 flex-shrink-0 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                    <div>
                      <p className={`text-sm font-semibold mb-1 ${darkMode ? 'text-amber-300' : 'text-amber-900'}`}>
                        Need More Detailed Analysis?
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-amber-200' : 'text-amber-800'}`}>
                        Our team can provide in-depth project reviews and trend analysis. Contact us to schedule a consultation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`px-6 py-4 border-t ${borderColor}`}>
                <button
                  onClick={() => setShowInsights(false)}
                  className={`w-full px-4 py-3 ${darkMode ? 'bg-[#2A2A2A] hover:bg-[#333]' : 'bg-stone-800 hover:bg-stone-900'} text-white rounded-lg transition-colors font-medium`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Floating AI Insights Button */}
      <button
        onClick={() => setShowInsights(!showInsights)}
        className={`group fixed bottom-6 right-6 flex items-center gap-2 px-4 py-4 ${darkMode ? 'bg-[#3A3A3A] hover:bg-[#454545]' : 'bg-gray-700 hover:bg-gray-800'} text-white rounded-full shadow-xl transition-all hover:pr-6 z-40`}
        title="Generate AI Insights"
      >
        <Lightbulb className={`size-6 flex-shrink-0 ${showInsights ? 'fill-yellow-400 text-yellow-400' : ''}`} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-sm font-medium">
          Generate Insights
        </span>
      </button>
    </div>
  );
}