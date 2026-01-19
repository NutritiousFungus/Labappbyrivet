import { X, LucideIcon } from 'lucide-react';
import { SampleHistoryItem } from '@/app/types';
import { SampleCard } from '@/app/components/SampleCard';
import { useAppContext } from '@/app/contexts/AppContext';
import { getThemeClasses } from '@/app/utils/themeUtils';

interface SampleListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  samples: SampleHistoryItem[];
  emptyIcon: LucideIcon;
  emptyMessage: string;
  borderColor: string;
  editingSampleId: string | null;
  editedSampleNames: Record<string, string>;
  onStartEdit: (id: string, name: string) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: (id: string, originalName: string) => void;
  onEditNameChange: (id: string, name: string) => void;
  onDelete?: (id: string) => void;
  onSampleClick: (id: string) => void;
  showExpectedCompletion?: boolean;
}

export function SampleListModal({
  isOpen,
  onClose,
  title,
  description,
  samples,
  emptyIcon: EmptyIcon,
  emptyMessage,
  borderColor,
  editingSampleId,
  editedSampleNames,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditNameChange,
  onDelete,
  onSampleClick,
  showExpectedCompletion = true,
}: SampleListModalProps) {
  const { darkMode } = useAppContext();
  const { cardBg, textPrimary, textSecondary, hoverBg } = getThemeClasses(darkMode);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className={`${cardBg} rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col border-l-8 ${borderColor}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`px-6 py-4 ${darkMode ? 'border-b border-[#2C2C2C]' : 'border-b border-gray-100'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-lg font-semibold ${textPrimary}`}>{title} ({samples.length})</h3>
              <p className={`text-sm ${textSecondary} mt-1`}>{description}</p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 ${hoverBg} rounded-full transition-colors`}
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
            <div className="space-y-2">
              {samples.map((sample) => (
                <SampleCard
                  key={sample.id}
                  sample={sample}
                  isEditing={editingSampleId === sample.id}
                  editedName={editedSampleNames[sample.id] || sample.sampleName}
                  onStartEdit={() => onStartEdit(sample.id, sample.sampleName)}
                  onSaveEdit={() => onSaveEdit(sample.id)}
                  onCancelEdit={() => onCancelEdit(sample.id, sample.sampleName)}
                  onEditNameChange={(name) => onEditNameChange(sample.id, name)}
                  onDelete={onDelete ? () => onDelete(sample.id) : undefined}
                  onClick={() => onSampleClick(sample.id)}
                  showExpectedCompletion={showExpectedCompletion}
                />
              ))}
            </div>
          )}
        </div>
        <div className={`px-6 py-4 ${darkMode ? 'border-t border-[#2C2C2C]' : 'border-t border-gray-100'}`}>
          <button
            onClick={onClose}
            className={`w-full px-4 py-2.5 ${hoverBg} rounded-xl transition-colors font-medium ${textSecondary}`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
