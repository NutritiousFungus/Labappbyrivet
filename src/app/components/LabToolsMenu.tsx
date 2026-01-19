// Lab Tools dropdown menu component
import React from 'react';
import { FlaskConical } from 'lucide-react';

interface LabToolsMenuProps {
  darkMode: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onWhatIsNIR: () => void;
  onCustomPackages: () => void;
  onSamplingInstructions: () => void;
  onBulkSubmission: () => void;
}

export const LabToolsMenu = React.memo(({
  darkMode,
  isOpen,
  onToggle,
  onClose,
  onWhatIsNIR,
  onCustomPackages,
  onSamplingInstructions,
  onBulkSubmission
}: LabToolsMenuProps) => {
  // Theme classes
  const navTextSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const navHoverBg = darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-100';
  const cardBg = darkMode ? 'bg-[#1F1F1F]' : 'bg-white';
  const cardBorder = darkMode ? 'border-[#2C2C2C]' : 'border-gray-200';
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
  const textTertiary = darkMode ? 'text-gray-500' : 'text-gray-500';
  const hoverBg = darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-50';
  
  const handleMenuClick = (action: () => void) => {
    action();
    onClose();
  };
  
  return (
    <div className="relative">
      <button 
        onClick={onToggle}
        className={`p-1.5 md:p-2 ${navHoverBg} rounded-full transition-colors`}
        aria-label="Lab Tools"
      >
        <FlaskConical className={`size-4 md:size-5 ${navTextSecondary}`} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={onClose}
          />
          <div className={`absolute right-0 mt-2 w-64 ${cardBg} ${cardBorder} rounded-xl ${darkMode ? 'border' : 'shadow-lg'} z-50 overflow-hidden`}>
            <div className="px-2 py-2">
              <button
                onClick={() => handleMenuClick(onCustomPackages)}
                className={`w-full text-left px-3 py-2.5 rounded-lg ${hoverBg} transition-colors`}
              >
                <div className={`text-sm font-medium ${textPrimary}`}>Custom Test Packages</div>
                <div className={`text-xs ${textTertiary} mt-0.5`}>Create custom testing packages</div>
              </button>
              <button
                onClick={() => handleMenuClick(onSamplingInstructions)}
                className={`w-full text-left px-3 py-2.5 rounded-lg ${hoverBg} transition-colors`}
              >
                <div className={`text-sm font-medium ${textPrimary}`}>Sampling Instructions</div>
                <div className={`text-xs ${textTertiary} mt-0.5`}>View best practices for sampling</div>
              </button>
              <button
                onClick={() => handleMenuClick(onBulkSubmission)}
                className={`w-full text-left px-3 py-2.5 rounded-lg ${hoverBg} transition-colors`}
              >
                <div className={`text-sm font-medium ${textPrimary}`}>Bulk Sample Submission</div>
                <div className={`text-xs ${textTertiary} mt-0.5`}>Submit 20+ samples at once</div>
              </button>
              <button
                onClick={() => handleMenuClick(onWhatIsNIR)}
                className={`w-full text-left px-3 py-2.5 rounded-lg ${hoverBg} transition-colors`}
              >
                <div className={`text-sm font-medium ${textPrimary}`}>What is NIR?</div>
                <div className={`text-xs ${textTertiary} mt-0.5`}>Learn about our testing technology</div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

LabToolsMenu.displayName = 'LabToolsMenu';