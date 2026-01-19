import { Check, X, Pencil, Trash2, Clock } from 'lucide-react';
import { SampleHistoryItem } from '@/app/types';
import { getSampleTypeSmallIcon } from '@/app/utils/sampleIcons';
import { calculateExpectedCompletion } from '@/app/data/sampleGenerator';
import { useAppContext } from '@/app/contexts/AppContext';
import { getThemeClasses } from '@/app/utils/themeUtils';

interface SampleCardProps {
  sample: SampleHistoryItem;
  isEditing: boolean;
  editedName: string;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEditNameChange: (name: string) => void;
  onDelete?: () => void;
  onClick: () => void;
  showExpectedCompletion?: boolean;
}

export function SampleCard({
  sample,
  isEditing,
  editedName,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditNameChange,
  onDelete,
  onClick,
  showExpectedCompletion = true,
}: SampleCardProps) {
  const { darkMode } = useAppContext();
  const { textPrimary, textSecondary, textTertiary, hoverBg } = getThemeClasses(darkMode);

  return (
    <div
      className={`${darkMode ? 'bg-[#222222] hover:bg-[#2A2A2A]' : 'bg-stone-50 hover:bg-stone-100 hover:shadow-md'} rounded-xl p-3 border ${darkMode ? 'border-[#2C2C2C] hover:border-[#3C3C3C]' : 'border-stone-200 hover:border-stone-300'} ${isEditing ? '' : 'cursor-pointer'} transition-all`}
      onClick={(e) => {
        if (isEditing) return;
        if ((e.target as HTMLElement).closest('button')) return;
        onClick();
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0 mr-2">
          {isEditing ? (
            <div className="flex items-center gap-2 mb-0.5" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                value={editedName}
                onChange={(e) => onEditNameChange(e.target.value)}
                className={`flex-1 px-2 py-1 text-sm rounded border ${darkMode ? 'bg-[#2C2C2C] border-[#3C3C3C] text-[#E0E0E0]' : 'bg-white border-gray-300 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSaveEdit();
                  if (e.key === 'Escape') onCancelEdit();
                }}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSaveEdit();
                }}
                className={`p-1.5 ${darkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} text-white rounded transition-colors`}
              >
                <Check className="size-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCancelEdit();
                }}
                className={`p-1.5 ${hoverBg} rounded transition-colors`}
              >
                <X className={`size-3.5 ${textSecondary}`} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-0.5">
              <div className={`font-semibold ${textPrimary} flex-1`}>
                {sample.sampleName}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStartEdit();
                }}
                className={`p-1 ${hoverBg} rounded transition-colors opacity-60 hover:opacity-100`}
                title="Edit sample name"
              >
                <Pencil className={`size-3.5 ${textSecondary}`} />
              </button>
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Are you sure you want to delete "${sample.sampleName}"? This action cannot be undone.`)) {
                      onDelete();
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
          <div className={`text-xs ${textTertiary} mt-0.5`}>
            Created: {sample.createdDate}
          </div>
        </div>
        <div className="flex-shrink-0 text-right">
          <div className={`text-xs ${textTertiary} mb-0.5`}>
            {sample.status === 'pending' ? 'Container ID' : 'Lab Number'}
          </div>
          <div className={`text-xs font-mono ${darkMode ? 'bg-[#2C2C2C]' : 'bg-white'} px-3 py-1.5 rounded-lg border ${darkMode ? 'border-[#3C3C3C]' : 'border-stone-300'} ${textPrimary}`}>
            {sample.status === 'pending' ? sample.bagLabelId : sample.id}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className={`text-xs ${textTertiary} mb-0.5`}>Sample Type</div>
          <div className={`text-sm ${textSecondary} flex items-center gap-1`}>
            {getSampleTypeSmallIcon(sample.sampleType)}
            {sample.sampleType}
          </div>
        </div>
        <div>
          <div className={`text-xs ${textTertiary} mb-0.5`}>Test Package</div>
          <div className={`text-sm ${textSecondary}`}>
            {sample.testPackage}
          </div>
        </div>
      </div>

      {showExpectedCompletion && (() => {
        const createdDate = new Date(sample.createdDate);
        const expectedCompletion = calculateExpectedCompletion(sample.status, createdDate);
        return expectedCompletion ? (
          <div className={`mt-2 pt-2 border-t ${darkMode ? 'border-[#2C2C2C]' : 'border-stone-200'}`}>
            <div className={`flex items-center gap-2 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-lg px-3 py-2`}>
              <Clock className={`size-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'} flex-shrink-0`} />
              <div className="flex-1">
                <div className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-700'} font-medium`}>
                  Expected Completion
                </div>
                <div className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-900'} font-semibold`}>
                  {expectedCompletion.dayOfWeek}, {expectedCompletion.date} at {expectedCompletion.time}
                </div>
              </div>
            </div>
          </div>
        ) : null;
      })()}

      {sample.addOns && sample.addOns.length > 0 && (
        <div className={`mt-2 pt-2 border-t ${darkMode ? 'border-[#2C2C2C]' : 'border-stone-200'}`}>
          <div className={`text-xs ${textTertiary} mb-1`}>Add-ons</div>
          <div className="flex flex-wrap gap-1.5">
            {sample.addOns.map((addon, i) => (
              <span
                key={i}
                className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700'}`}
              >
                {addon}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
