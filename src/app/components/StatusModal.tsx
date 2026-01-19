import React from 'react';
import { X, Check, Pencil, Clock, CheckCircle2, FlaskConical, Trash2 } from 'lucide-react';
import { getSampleTypeSmallIcon } from '@/app/utils/sampleIcons';

interface Sample {
  id: string;
  sampleName: string;
  bagLabelId: string;
  sampleType: string;
  testPackage: string;
  createdDate: string;
  addOns?: string[];
  pendingTests?: string[];
  completedTests?: string[];
  status?: string;
  expectedCompletion?: {
    date: string;
    dayOfWeek: string;
    time: string;
  } | null;
}

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  samples: Sample[];
  emptyIcon: React.ComponentType<{ className?: string }>;
  emptyMessage: string;
  darkMode: boolean;
  testingMode: 'feeds' | 'soil';
  editingSampleId: string | null;
  editedSampleNames: Record<string, string>;
  onSampleClick: (sampleId: string) => void;
  onStartEditSampleName: (sampleId: string, currentName: string) => void;
  onSaveSampleName: (sampleId: string) => void;
  onCancelEditSampleName: (sampleId: string, originalName: string) => void;
  onEditedNameChange: (sampleId: string, newName: string) => void;
  onDelete?: (sampleId: string) => void;
  showDeleteButton?: boolean;
}

export function StatusModal({
  isOpen,
  onClose,
  title,
  samples,
  emptyIcon: EmptyIcon,
  emptyMessage,
  darkMode,
  testingMode,
  editingSampleId,
  editedSampleNames,
  onSampleClick,
  onStartEditSampleName,
  onSaveSampleName,
  onCancelEditSampleName,
  onEditedNameChange,
  onDelete,
  showDeleteButton = false,
}: StatusModalProps) {
  if (!isOpen) return null;

  const cardBg = darkMode ? 'bg-[#252525]' : 'bg-white';
  const textPrimary = darkMode ? 'text-[#E0E0E0]' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-[#C0C0C0]' : 'text-gray-600';
  const textTertiary = darkMode ? 'text-[#909090]' : 'text-gray-500';
  const hoverBg = darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-100';

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className={`${cardBg} rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col border-l-8 ${testingMode === 'feeds' ? 'border-l-green-700' : 'border-l-blue-600'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`px-6 py-4 ${darkMode ? 'border-b border-[#2C2C2C]' : 'border-b border-gray-100'}`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold ${textPrimary}`}>{title} ({samples.length})</h3>
            <button
              onClick={onClose}
              className={`p-2 ${hoverBg} rounded-lg transition-colors`}
            >
              <X className={`size-5 ${textSecondary}`} />
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {samples.length === 0 ? (
            <div className={`text-center py-12 ${textSecondary}`}>
              <EmptyIcon className="size-12 mx-auto mb-3 opacity-30" />
              <p>{emptyMessage}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {samples.map((sample) => (
                <div
                  key={sample.id}
                  className={`${darkMode ? 'bg-[#222222] hover:bg-[#2A2A2A]' : 'bg-stone-50 hover:bg-stone-100 hover:shadow-md'} rounded-xl p-4 border ${darkMode ? 'border-[#2C2C2C] hover:border-[#3C3C3C]' : 'border-stone-200 hover:border-stone-300'} ${editingSampleId === sample.id ? '' : 'cursor-pointer'} transition-all`}
                  onClick={(e) => {
                    if (editingSampleId === sample.id) return;
                    if ((e.target as HTMLElement).closest('button')) return;
                    onSampleClick(sample.id);
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0 mr-3">
                      {editingSampleId === sample.id ? (
                        <div className="flex items-center gap-2 mb-1" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="text"
                            value={editedSampleNames[sample.id] || sample.sampleName}
                            onChange={(e) => onEditedNameChange(sample.id, e.target.value)}
                            className={`flex-1 px-2 py-1 text-sm rounded border ${darkMode ? 'bg-[#2C2C2C] border-[#3C3C3C] text-[#E0E0E0]' : 'bg-white border-gray-300 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') onSaveSampleName(sample.id);
                              if (e.key === 'Escape') onCancelEditSampleName(sample.id, sample.sampleName);
                            }}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSaveSampleName(sample.id);
                            }}
                            className={`p-1.5 ${darkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} text-white rounded transition-colors`}
                          >
                            <Check className="size-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onCancelEditSampleName(sample.id, sample.sampleName);
                            }}
                            className={`p-1.5 ${hoverBg} rounded transition-colors`}
                          >
                            <X className={`size-3.5 ${textSecondary}`} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`font-semibold ${textPrimary} flex-1`}>
                            {sample.sampleName}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onStartEditSampleName(sample.id, sample.sampleName);
                            }}
                            className={`p-1 ${hoverBg} rounded transition-colors opacity-60 hover:opacity-100`}
                            title="Edit sample name"
                          >
                            <Pencil className={`size-3.5 ${textSecondary}`} />
                          </button>
                          {showDeleteButton && onDelete && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm(`Are you sure you want to delete "${sample.sampleName}"? This action cannot be undone.`)) {
                                  onDelete(sample.id);
                                }
                              }}
                              className={`p-1 rounded transition-colors opacity-60 hover:opacity-100 ${darkMode ? 'hover:bg-red-900/30 hover:text-red-400' : 'hover:bg-red-50 hover:text-red-600'}`}
                              title="Delete sample"
                            >
                              <Trash2 className={`size-3.5 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                            </button>
                          )}
                        </div>
                      )}
                      <div className={`text-xs ${textTertiary} mt-1`}>
                        Created: {sample.createdDate}
                      </div>
                    </div>
                    <div className={`text-xs font-mono ${darkMode ? 'bg-[#2C2C2C]' : 'bg-white'} px-3 py-1.5 rounded-lg border ${darkMode ? 'border-[#3C3C3C]' : 'border-stone-300'} ${textPrimary} flex-shrink-0`}>
                      {sample.bagLabelId}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className={`text-xs ${textTertiary} mb-1`}>Sample Type</div>
                      <div className={`text-sm ${textSecondary} flex items-center gap-1`}>
                        {getSampleTypeSmallIcon(sample.sampleType)}
                        {sample.sampleType}
                      </div>
                    </div>
                    <div>
                      <div className={`text-xs ${textTertiary} mb-1`}>Test Package</div>
                      <div className={`text-sm ${textSecondary}`}>
                        {sample.testPackage}
                      </div>
                    </div>
                  </div>

                  {sample.expectedCompletion && (
                    <div className={`mt-3 pt-3 border-t ${darkMode ? 'border-[#2C2C2C]' : 'border-stone-200'}`}>
                      <div className={`flex items-center gap-2 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-lg px-3 py-2`}>
                        <Clock className={`size-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'} flex-shrink-0`} />
                        <div className="flex-1">
                          <div className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-700'} font-medium`}>
                            Expected Completion
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-900'} font-semibold`}>
                            {sample.expectedCompletion.dayOfWeek}, {sample.expectedCompletion.date} at {sample.expectedCompletion.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {sample.addOns && sample.addOns.length > 0 && (
                    <div className={`mt-3 pt-3 border-t ${darkMode ? 'border-[#2C2C2C]' : 'border-stone-200'}`}>
                      <div className={`text-xs ${textTertiary} mb-1`}>Add-ons</div>
                      <div className="flex flex-wrap gap-1">
                        {sample.addOns.map((addOn) => (
                          <span
                            key={addOn}
                            className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-[#2C2C2C] text-[#C0C0C0]' : 'bg-stone-200 text-stone-700'}`}
                          >
                            {addOn}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}