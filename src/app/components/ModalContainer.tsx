import React from 'react';
import { Clock, Check } from 'lucide-react';
import { SampleIntakeFlow } from '@/app/components/SampleIntakeFlow';
import { SamplingInstructions } from '@/app/components/SamplingInstructions';
import { DropboxMap } from '@/app/components/DropboxMap';
import { SampleListModal } from '@/app/components/SampleListModal';
import { useAppContext } from '@/app/contexts/AppContext';
import { getThemeClasses } from '@/app/utils/themeUtils';
import { CustomPackage } from '@/app/types';

interface ModalContainerProps {
  modals: any;
  handleSubmitSamples: (samples?: any[]) => void;
  testingMode: 'feeds' | 'soil';
  selectedFarm: string;
  projects: any[];
  onProjectAssign: (sampleId: string, projectId: string | null) => void;
  onShowDropboxMap: () => void;
  onShowCustomPackages: () => void;
  customPackages: CustomPackage[];
  headerTheme: 'blue' | 'grey';
  showDropboxMap: boolean;
  setShowDropboxMap: (show: boolean) => void;
  handleBulkDownload: (format: string) => void;
  handleDownloadAll: (format: string) => void;
  selectedSamples: Set<string>;
  selectMode: boolean;
  setSelectMode: (mode: boolean) => void;
  currentActivity: any[];
  editingSampleId: string | null;
  editedSampleNames: Record<string, string>;
  handleStartEditSampleName: (id: string, name: string) => void;
  handleSaveSampleName: (id: string) => void;
  handleCancelEditSampleName: (id: string, name: string) => void;
  handleEditNameChange: (id: string, name: string) => void;
  handleDeleteSample: (id: string) => void;
  handleSampleClick: (id: string, modalKey: string) => void;
}

export function ModalContainer({
  modals,
  handleSubmitSamples,
  testingMode,
  selectedFarm,
  projects,
  onProjectAssign,
  onShowDropboxMap,
  onShowCustomPackages,
  customPackages,
  headerTheme,
  showDropboxMap,
  setShowDropboxMap,
  handleBulkDownload,
  handleDownloadAll,
  selectedSamples,
  selectMode,
  setSelectMode,
  currentActivity,
  editingSampleId,
  editedSampleNames,
  handleStartEditSampleName,
  handleSaveSampleName,
  handleCancelEditSampleName,
  handleEditNameChange,
  handleDeleteSample,
  handleSampleClick
}: ModalContainerProps) {
  const { darkMode } = useAppContext();
  const theme = getThemeClasses(darkMode);
  const {
    cardBg,
    cardBorder,
    textPrimary,
    textSecondary,
    textTertiary,
    inputBorder,
    hoverBg,
    hoverItemBg,
    inputBg
  } = theme;
  
  // Get currentUser from constant
  const currentUser = { farms: ['Friendly Illinois Brothers', 'Goeser\'s Grazers', 'Standard Dairy Consultants'] }; // Minimal user data needed

  return (
    <>
      {/* Sample Intake Flow Modal */}
      {modals.showIntakeFlow && (
        <SampleIntakeFlow 
          onClose={() => modals.closeModal('showIntakeFlow')} 
          onSubmit={handleSubmitSamples} 
          darkMode={darkMode} 
          userFarms={currentUser.farms} 
          testingMode={testingMode}
          availableProjects={projects}
          onProjectAssign={onProjectAssign}
          onShowDropboxMap={onShowDropboxMap}
          onShowCustomPackages={onShowCustomPackages}
          customPackages={customPackages}
          headerTheme={headerTheme}
        />
      )}

      {/* Sampling Instructions Modal */}
      {modals.showSamplingInstructions && (
        <SamplingInstructions 
          onClose={() => modals.closeModal('showSamplingInstructions')}
          testingMode={testingMode}
          darkMode={darkMode}
        />
      )}

      {/* Dropbox Map Modal */}
      {showDropboxMap && (
        <DropboxMap 
          onClose={() => setShowDropboxMap(false)}
          darkMode={darkMode}
        />
      )}

      {/* Bulk Download Modal */}
      {modals.showBulkDownloadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`${cardBg} rounded-2xl shadow-2xl max-w-md w-full border-l-8 ${testingMode === 'feeds' ? 'border-l-[#1f5527]' : 'border-l-[#411900]'}`}>
            <div className={`px-6 py-4 ${darkMode ? 'border-b border-[#2C2C2C]' : 'border-b border-gray-100'}`}>
              <h3 className={`text-lg font-semibold ${textPrimary}`}>Bulk Download</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className={`text-sm ${textSecondary} mb-4`}>
                Choose how you'd like to download your samples:
              </div>

              {/* Download All Option */}
              <div className={`p-4 border-2 ${inputBorder} rounded-xl ${hoverItemBg} transition-colors`}>
                <h4 className={`font-semibold ${textPrimary} mb-2`}>Download All Filtered Samples</h4>
                <p className={`text-xs ${textTertiary} mb-3`}>
                  {currentActivity.filter(s => s.status === 'completed').length} completed samples
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownloadAll('pdf')}
                    className={`flex-1 px-3 py-2 ${hoverBg} rounded-lg text-sm font-medium ${textSecondary} transition-colors`}
                  >
                    PDF
                  </button>
                  <button
                    onClick={() => handleDownloadAll('csv')}
                    className={`flex-1 px-3 py-2 ${hoverBg} rounded-lg text-sm font-medium ${textSecondary} transition-colors`}
                  >
                    CSV
                  </button>
                  <button
                    onClick={() => handleDownloadAll('xml')}
                    className={`flex-1 px-3 py-2 ${hoverBg} rounded-lg text-sm font-medium ${textSecondary} transition-colors`}
                  >
                    XML
                  </button>
                </div>
              </div>

              {/* Select Specific Samples Option */}
              <div className={`p-4 border-2 ${selectMode ? 'border-[#2d7a3e]' : inputBorder} rounded-xl transition-colors`}>
                <h4 className={`font-semibold ${textPrimary} mb-2`}>Select Specific Samples</h4>
                <p className={`text-xs ${textTertiary} mb-3`}>
                  {selectMode
                    ? `${selectedSamples.size} samples selected`
                    : 'Choose individual samples to download'}
                </p>
                {!selectMode ? (
                  <button
                    onClick={() => {
                      setSelectMode(true);
                      modals.closeModal('showBulkDownloadModal');
                    }}
                    className="w-full px-4 py-2 bg-[#2d7a3e] hover:bg-[#246630] text-white rounded-lg font-medium transition-colors"
                  >
                    Enter Select Mode
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className={`text-xs ${textSecondary} mb-2`}>Choose file format:</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleBulkDownload('pdf')}
                        disabled={selectedSamples.size === 0}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedSamples.size === 0
                            ? `${darkMode ? 'bg-[#1E1E1E] text-[#606060]' : 'bg-gray-200 text-gray-400'} cursor-not-allowed`
                            : `${hoverBg} ${textSecondary}`
                        }`}
                      >
                        PDF
                      </button>
                      <button
                        onClick={() => handleBulkDownload('csv')}
                        disabled={selectedSamples.size === 0}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedSamples.size === 0
                            ? `${darkMode ? 'bg-[#1E1E1E] text-[#606060]' : 'bg-gray-200 text-gray-400'} cursor-not-allowed`
                            : `${hoverBg} ${textSecondary}`
                        }`}
                      >
                        CSV
                      </button>
                      <button
                        onClick={() => handleBulkDownload('xml')}
                        disabled={selectedSamples.size === 0}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedSamples.size === 0
                            ? `${darkMode ? 'bg-[#1E1E1E] text-[#606060]' : 'bg-gray-200 text-gray-400'} cursor-not-allowed`
                            : `${hoverBg} ${textSecondary}`
                        }`}
                      >
                        XML
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={`px-6 py-4 ${darkMode ? 'border-t border-[#2C2C2C]' : 'border-t border-gray-100'}`}>
              <button
                onClick={() => modals.closeModal('showBulkDownloadModal')}
                className={`w-full px-4 py-3 ${hoverBg} rounded-xl transition-colors font-medium ${textSecondary}`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pending Arrival Modal */}
      <SampleListModal
        isOpen={modals.showPendingArrivalModal}
        onClose={() => modals.closeModal('showPendingArrivalModal')}
        title="Pending Arrival"
        description="Samples you have submitted that we have not yet received"
        samples={currentActivity.filter(s => s.status === 'pending' && s.farm === selectedFarm)}
        emptyIcon={Clock}
        emptyMessage="No samples pending arrival"
        borderColor={testingMode === 'feeds' ? 'border-l-[#1f5527]' : 'border-l-[#411900]'}
        editingSampleId={editingSampleId}
        editedSampleNames={editedSampleNames}
        onStartEdit={handleStartEditSampleName}
        onSaveEdit={handleSaveSampleName}
        onCancelEdit={handleCancelEditSampleName}
        onEditNameChange={handleEditNameChange}
        onDelete={handleDeleteSample}
        onSampleClick={(id) => handleSampleClick(id, 'showPendingArrivalModal')}
        showExpectedCompletion={true}
      />

      {/* Completed This Week Modal */}
      <SampleListModal
        isOpen={modals.showCompletedThisWeekModal}
        onClose={() => modals.closeModal('showCompletedThisWeekModal')}
        title="Completed Last 30 Days"
        description="Samples with all tests completed and results available"
        samples={(() => {
          const now = new Date('2026-01-13T12:00:00');
          const thirtyDaysAgo = new Date(now);
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return currentActivity.filter(s => {
            if (s.status !== 'completed' || s.farm !== selectedFarm) return false;
            const sampleDate = new Date(now); // Use actual date logic here in real app
            // Using logic from App.tsx:
            // "daysAgo" is available in sample data
            return s.daysAgo <= 30;
          });
        })()}
        emptyIcon={Clock}
        emptyMessage="No samples completed in the last 30 days"
        borderColor={testingMode === 'feeds' ? 'border-l-[#1f5527]' : 'border-l-[#411900]'}
        editingSampleId={editingSampleId}
        editedSampleNames={editedSampleNames}
        onStartEdit={handleStartEditSampleName}
        onSaveEdit={handleSaveSampleName}
        onCancelEdit={handleCancelEditSampleName}
        onEditNameChange={handleEditNameChange}
        onDelete={handleDeleteSample}
        onSampleClick={(id) => handleSampleClick(id, 'showCompletedThisWeekModal')}
      />

      {/* Partially Complete Modal */}
      <SampleListModal
        isOpen={modals.showPartiallyCompleteModal}
        onClose={() => modals.closeModal('showPartiallyCompleteModal')}
        title="Partially Complete"
        description="Samples with some results available"
        samples={currentActivity.filter(s => s.status === 'partial' && s.farm === selectedFarm)}
        emptyIcon={Clock}
        emptyMessage="No partially complete samples"
        borderColor={testingMode === 'feeds' ? 'border-l-[#1f5527]' : 'border-l-[#411900]'}
        editingSampleId={editingSampleId}
        editedSampleNames={editedSampleNames}
        onStartEdit={handleStartEditSampleName}
        onSaveEdit={handleSaveSampleName}
        onCancelEdit={handleCancelEditSampleName}
        onEditNameChange={handleEditNameChange}
        onDelete={handleDeleteSample}
        onSampleClick={(id) => handleSampleClick(id, 'showPartiallyCompleteModal')}
        showExpectedCompletion={true}
      />

      {/* In Process Modal */}
      <SampleListModal
        isOpen={modals.showInProcessModal}
        onClose={() => modals.closeModal('showInProcessModal')}
        title="Processing"
        description="Samples currently being analyzed in the lab"
        samples={currentActivity.filter(s => s.status === 'processing' && s.farm === selectedFarm)}
        emptyIcon={Clock}
        emptyMessage="No samples currently processing"
        borderColor={testingMode === 'feeds' ? 'border-l-[#1f5527]' : 'border-l-[#411900]'}
        editingSampleId={editingSampleId}
        editedSampleNames={editedSampleNames}
        onStartEdit={handleStartEditSampleName}
        onSaveEdit={handleSaveSampleName}
        onCancelEdit={handleCancelEditSampleName}
        onEditNameChange={handleEditNameChange}
        onDelete={handleDeleteSample}
        onSampleClick={(id) => handleSampleClick(id, 'showInProcessModal')}
        showExpectedCompletion={true}
      />
    </>
  );
}