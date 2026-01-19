// Profile/Account dropdown menu component
import React from 'react';
import { User } from 'lucide-react';
import type { User as UserType } from '@/app/types/user';

interface ProfileMenuProps {
  darkMode: boolean;
  currentUser: UserType;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onAccountSettings: () => void;
  onAccountBalance: () => void;
  onCareers: () => void;
  onGrowWithUs: () => void;
  onAboutUs: () => void;
  onLogout: () => void;
}

export const ProfileMenu = React.memo(({
  darkMode,
  currentUser,
  isOpen,
  onToggle,
  onClose,
  onAccountSettings,
  onAccountBalance,
  onCareers,
  onGrowWithUs,
  onAboutUs,
  onLogout
}: ProfileMenuProps) => {
  // Theme classes
  const navTextSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const navHoverBg = darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-100';
  const cardBg = darkMode ? 'bg-[#1F1F1F]' : 'bg-white';
  const cardBorder = darkMode ? 'border-[#2C2C2C]' : 'border-gray-200';
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-300' : 'text-gray-700';
  const textTertiary = darkMode ? 'text-gray-500' : 'text-gray-500';
  const hoverBg = darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-50';
  
  const handleMenuClick = (action: () => void) => {
    action();
    onClose();
  };
  
  const handleFeedback = () => {
    alert('Thank you for your interest in submitting feedback! Our team reviews all suggestions and uses them to improve our services.');
    onClose();
  };
  
  return (
    <div className="relative">
      <button 
        onClick={onToggle}
        className={`p-1.5 md:p-2 ${navHoverBg} rounded-full transition-colors`}
        aria-label="Account menu"
      >
        <User className={`size-4 md:size-5 ${navTextSecondary}`} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={onClose}
          />
          <div className={`absolute right-0 mt-2 w-72 sm:w-80 md:w-72 ${cardBg} ${cardBorder} rounded-xl ${darkMode ? 'border' : 'shadow-lg'} z-50 overflow-hidden max-h-[calc(100vh-100px)] overflow-y-auto`}>
            <div className={`px-4 py-3 ${darkMode ? 'border-b border-[#2C2C2C]' : 'border-b border-gray-100'}`}>
              <div className={`text-sm font-semibold ${textPrimary}`}>{currentUser.name}</div>
              <div className={`text-xs ${textTertiary} mt-0.5 break-all`}>{currentUser.email}</div>
            </div>
            <div className="px-2 py-2">
              <button
                onClick={() => handleMenuClick(onAccountSettings)}
                className={`w-full text-left px-3 py-2 rounded-lg ${hoverBg} transition-colors text-sm ${textSecondary}`}
              >
                Account Settings
              </button>
              <button
                onClick={() => handleMenuClick(onAccountBalance)}
                className={`w-full text-left px-3 py-2 rounded-lg ${hoverBg} transition-colors text-sm ${textSecondary} flex justify-between items-center`}
              >
                <span>Account Balance</span>
                <span className={`font-semibold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>($176.00)</span>
              </button>
              <button
                onClick={() => handleMenuClick(onCareers)}
                className={`w-full text-left px-3 py-2 rounded-lg ${hoverBg} transition-colors text-sm ${textSecondary}`}
              >
                Careers
              </button>
              <button
                onClick={() => handleMenuClick(onGrowWithUs)}
                className={`w-full text-left px-3 py-2 rounded-lg ${hoverBg} transition-colors text-sm ${textSecondary}`}
              >
                Grow With Us
              </button>
              <button
                onClick={() => handleMenuClick(onAboutUs)}
                className={`w-full text-left px-3 py-2 rounded-lg ${hoverBg} transition-colors text-sm ${textSecondary}`}
              >
                About Us
              </button>
            </div>
            <div className={`${darkMode ? 'border-t border-[#2C2C2C]' : 'border-t border-gray-100'} px-2 py-2`}>
              <button
                onClick={handleFeedback}
                className={`w-full text-left px-3 py-2 rounded-lg ${hoverBg} transition-colors text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Submit Feedback
              </button>
            </div>
            <div className={`${darkMode ? 'border-t border-[#2C2C2C]' : 'border-t border-gray-100'} px-2 py-2`}>
              <button
                onClick={() => handleMenuClick(onLogout)}
                className={`w-full text-left px-3 py-2 rounded-lg ${hoverBg} transition-colors text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Log Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

ProfileMenu.displayName = 'ProfileMenu';