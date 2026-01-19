import React, { useState } from 'react';
import { Bell, Sun, Moon, FlaskConical, User, Wheat, Sprout } from 'lucide-react';
import { useAppContext } from '@/app/contexts/AppContext';
import { getThemeClasses } from '@/app/utils/themeUtils';
import { MOCK_NOTIFICATIONS } from '@/app/data/notifications';
import { CURRENT_USER } from '@/app/constants/userData';
import logoImage from 'figma:asset/70a773257adca7df2225bb5f63c4e668abae4133.png';
import cannaSafeLogo from 'figma:asset/1de603cb4707eaecd97c2b30bda54875443a9eea.png';
import divingHelmetIcon from 'figma:asset/8d52049ec4887535baaca8bbb16bad072eeac45e.png';

interface HeaderProps {
  headerTheme: 'blue' | 'grey';
  isScrolled: boolean;
  modals: any; // Type should match useModalState return
  selectedSampleId: string | null;
  onResetView: () => void;
  setSearchQuery: (query: string) => void;
  setSelectMode: (mode: boolean) => void;
  setSelectedSamples: (samples: Set<string>) => void;
  setInfoPage: (page: any) => void;
  setShowTestingMenu: (show: boolean) => void;
  setShowCustomPackages: (show: boolean) => void;
  setShowWhatIsNIR: (show: boolean) => void;
  setShowDropboxMap: (show: boolean) => void;
  setShowAPIAccess: (show: boolean) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export function Header({
  headerTheme,
  isScrolled,
  modals,
  selectedSampleId,
  onResetView,
  setSearchQuery,
  setSelectMode,
  setSelectedSamples,
  setInfoPage,
  setShowTestingMenu,
  setShowCustomPackages,
  setShowWhatIsNIR,
  setShowDropboxMap,
  setShowAPIAccess,
  setIsLoggedIn
}: HeaderProps) {
  const { darkMode, setDarkMode, testingMode, setTestingMode, cannabisMode, setCannabisMode } = useAppContext();
  const currentUser = CURRENT_USER; // Use constant for now as in App.tsx
  
  // Local state for dropdowns
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLabToolsMenu, setShowLabToolsMenu] = useState(false);

  const theme = getThemeClasses(darkMode);
  const {
    navBorder,
    navHoverBg,
    navTextPrimary,
    navTextSecondary,
    cardBg,
    cardBorder,
    textPrimary,
    textTertiary,
    textSecondary,
    hoverBg,
    inputBorder
  } = theme;

  return (
    <nav className={`${headerTheme === 'grey' ? 'bg-[#2a2a2a]' : 'bg-[#1e3a5f]'} ${navBorder} ${darkMode ? 'border-b' : ''} transition-all duration-300 ${isScrolled ? 'py-2 md:py-3' : 'py-3 md:py-5'} relative overflow-visible sticky top-0 z-50`} style={{
      backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,.25) 0%, transparent 50%, rgba(0,0,0,.35) 100%)',
      boxShadow: 'inset 0 2px 0 rgba(255,255,255,.25), 0 4px 12px rgba(0,0,0,.3)',
    }}>
      <div className="px-3 md:px-4">
        <div className="flex items-center justify-between relative">
          {/* Logo - Left Side - Larger */}
          <div className="flex items-center gap-2 md:gap-3">
            <img 
              src={headerTheme === 'grey' ? cannaSafeLogo : logoImage}
              alt="Laboratory Logo"
              className={`transition-all duration-300 ${isScrolled ? 'h-12 md:h-16' : 'h-16 md:h-24'} cursor-pointer hover:opacity-80 transition-opacity`}
              onClick={onResetView}
            />
          </div>
          
          {/* Feeds/Soil Toggle Switch - Centered (Cannabis in Dark Mode) */}
          {!selectedSampleId && (
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex">
              {headerTheme === 'grey' ? (
                <div className={`flex items-center bg-gray-900 rounded-full p-1.5 border ${inputBorder}`}>
                  <button
                    onClick={() => {
                      setCannabisMode('cannabis');
                      setSearchQuery('');
                      setSelectMode(false);
                      setSelectedSamples(new Set());
                    }}
                    className={`px-6 md:px-8 py-2 md:py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                      cannabisMode === 'cannabis'
                        ? 'bg-[#8DC63F] text-white shadow-lg'
                        : `${navTextSecondary} hover:${navTextPrimary}`
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>Cannabis</span>
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setCannabisMode('hemp');
                      setSearchQuery('');
                      setSelectMode(false);
                      setSelectedSamples(new Set());
                    }}
                    className={`px-6 md:px-8 py-2 md:py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                      cannabisMode === 'hemp'
                        ? 'bg-yellow-500 text-black shadow-lg'
                        : `${navTextSecondary} hover:${navTextPrimary}`
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>Vitamin E Acetate</span>
                    </span>
                  </button>
                </div>
              ) : (
                <div className={`flex items-center bg-gray-900 rounded-full p-1.5 border ${inputBorder}`}>
                  <button
                    onClick={() => {
                      setTestingMode('feeds');
                      setSearchQuery('');
                      setSelectMode(false);
                      setSelectedSamples(new Set());
                    }}
                    className={`px-6 md:px-8 py-2 md:py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                      testingMode === 'feeds'
                        ? 'bg-[#2d7a3e] text-white shadow-lg'
                        : `${navTextSecondary} hover:${navTextPrimary}`
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Wheat className="size-4 md:size-5" />
                      <span>Feeds</span>
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setTestingMode('soil');
                      setSearchQuery('');
                      setSelectMode(false);
                      setSelectedSamples(new Set());
                    }}
                    className={`px-6 md:px-8 py-2 md:py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                      testingMode === 'soil'
                        ? 'bg-[#411900] text-white shadow-lg'
                        : `${navTextSecondary} hover:${navTextPrimary}`
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Sprout className="size-4 md:size-5" />
                      <span>Soil</span>
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Right Side Controls */}
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            {/* User Greeting - Hidden on small mobile */}
            <div className={`text-sm ${navTextSecondary} mr-1 md:mr-2 hidden sm:block`}>
              {headerTheme === 'grey' ? (
                'Goodbye'
              ) : (
                <>
                  Hello, <span className={`font-semibold ${navTextPrimary}`}>{currentUser.name.split(' ')[0]}</span>
                </>
              )}
            </div>
            
            {/* Hardhat Diver Helmet - Only show in cannabis mode */}
            {headerTheme === 'grey' && (
              <button 
                onClick={() => setInfoPage('rivet')}
                className={`p-1.5 md:p-2 ${navHoverBg} rounded-full transition-colors`}
              >
                <img src={divingHelmetIcon} alt="Diving Helmet" className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}
            
            {/* Notification Bell - Hidden in cannabis mode */}
            {headerTheme !== 'grey' && (
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-1.5 md:p-2 ${navHoverBg} rounded-full transition-colors relative`}
                aria-label="Notifications"
              >
                <Bell className={`size-4 md:size-5 ${navTextSecondary}`} />
                {/* Notification badge */}
                {MOCK_NOTIFICATIONS.filter(n => n.unread).length > 0 && (
                  <span className="absolute top-0.5 md:top-1 right-0.5 md:right-1 size-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className={`absolute right-0 mt-2 w-80 sm:w-96 ${cardBg} ${cardBorder} rounded-xl ${darkMode ? 'border' : 'shadow-lg'} z-50 overflow-hidden max-h-[calc(100vh-100px)] overflow-y-auto`}>
                  <div className={`px-4 py-3 ${darkMode ? 'border-b border-[#2C2C2C]' : 'border-b border-gray-100'}`}>
                    <div className={`text-sm font-semibold ${textPrimary} flex items-center justify-between`}>
                      <span>Notifications</span>
                      <span className={`text-xs ${textTertiary}`}>{MOCK_NOTIFICATIONS.filter(n => n.unread).length} unread</span>
                    </div>
                  </div>
                  <div className="divide-y divide-opacity-50" style={{ borderColor: darkMode ? '#2C2C2C' : '#e5e7eb' }}>
                    {MOCK_NOTIFICATIONS.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`px-4 py-3 ${notification.unread ? (darkMode ? 'bg-blue-950/20' : 'bg-blue-50/50') : ''} hover:${darkMode ? 'bg-[#2A2A2A]' : 'bg-gray-50'} cursor-pointer transition-colors`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`size-2 rounded-full mt-2 flex-shrink-0 ${
                            notification.type === 'completed' ? 'bg-[#2d7a3e]' :
                            notification.type === 'arrived' ? 'bg-blue-500' :
                            notification.type === 'processing' ? 'bg-amber-500' :
                            notification.type === 'alert' ? 'bg-red-500' :
                            'bg-gray-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className={`text-sm ${textPrimary} ${notification.unread ? 'font-medium' : ''}`}>
                              {notification.message}
                            </p>
                            <p className={`text-xs ${textTertiary} mt-1`}>{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={`px-4 py-3 ${darkMode ? 'border-t border-[#2C2C2C]' : 'border-t border-gray-100'} text-center`}>
                    <button className={`text-sm ${testingMode === 'feeds' ? 'text-[#2d7a3e] hover:text-[#246630]' : 'text-amber-800 hover:text-amber-900'} font-medium`}>
                      View All Notifications
                    </button>
                  </div>
                </div>
              </>
            )}
            </div>
            )}
            
            {/* Dark Mode Toggle - Hidden in cannabis mode */}
            {headerTheme !== 'grey' && (
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-1.5 md:p-2 ${navHoverBg} rounded-full transition-colors`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className={`size-4 md:size-5 ${navTextSecondary}`} />
              ) : (
                <Moon className={`size-4 md:size-5 ${navTextSecondary}`} />
              )}
            </button>
            )}
            
            {/* Lab Tools Menu - Hidden in cannabis mode */}
            {headerTheme !== 'grey' && (
            <div className="relative">
              <button 
                onClick={() => setShowLabToolsMenu(!showLabToolsMenu)}
                className={`p-1.5 md:p-2 ${navHoverBg} rounded-full transition-colors`}
                aria-label="Lab Tools"
              >
                <FlaskConical className={`size-4 md:size-5 ${navTextSecondary}`} />
              </button>
              
              {/* Lab Tools Dropdown */}
              {showLabToolsMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowLabToolsMenu(false)}
                  />
                  <div className={`absolute right-0 mt-2 w-64 ${cardBg} ${cardBorder} rounded-xl ${darkMode ? 'border' : 'shadow-lg'} z-50 overflow-hidden`}>
                    <div className="px-2 py-2">
                      <button
                        onClick={() => {
                          setShowTestingMenu(true);
                          setShowLabToolsMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg ${hoverBg} transition-colors`}
                      >
                        <div className={`text-sm font-medium ${textPrimary}`}>Testing Menu</div>
                        <div className={`text-xs ${textTertiary} mt-0.5`}>Browse available tests and pricing</div>
                      </button>
                      <button
                        onClick={() => {
                          setShowCustomPackages(true);
                          setShowLabToolsMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg ${hoverBg} transition-colors`}
                      >
                        <div className={`text-sm font-medium ${textPrimary}`}>Custom Test Packages</div>
                        <div className={`text-xs ${textTertiary} mt-0.5`}>Create custom testing packages</div>
                      </button>
                      <button
                        onClick={() => {
                          modals.openModal('showSamplingInstructions');
                          setShowLabToolsMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg ${hoverBg} transition-colors`}
                      >
                        <div className={`text-sm font-medium ${textPrimary}`}>Sampling Instructions</div>
                        <div className={`text-xs ${textTertiary} mt-0.5`}>View best practices for sampling</div>
                      </button>
                      <button
                        onClick={() => {
                          modals.openModal('showBulkSubmission');
                          setShowLabToolsMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg ${hoverBg} transition-colors`}
                      >
                        <div className={`text-sm font-medium ${textPrimary}`}>Bulk Sample Submission</div>
                        <div className={`text-xs ${textTertiary} mt-0.5`}>Submit 20+ samples at once</div>
                      </button>
                      <button
                        onClick={() => {
                          setShowAPIAccess(true);
                          setShowLabToolsMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg ${hoverBg} transition-colors`}
                      >
                        <div className={`text-sm font-medium ${textPrimary}`}>API Access</div>
                        <div className={`text-xs ${textTertiary} mt-0.5`}>Integrate our services with your systems</div>
                      </button>
                      <button
                        onClick={() => {
                          setShowWhatIsNIR(true);
                          setShowLabToolsMenu(false);
                        }}
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
            )}
            
            {/* Account Menu - Hidden in cannabis mode */}
            {headerTheme !== 'grey' && (
            <div className="relative">
              <button 
                onClick={() => modals.toggleModal('showAccountMenu')}
                className={`p-1.5 md:p-2 ${navHoverBg} rounded-full transition-colors`}
              >
                <User className={`size-4 md:size-5 ${navTextSecondary}`} />
              </button>
              
              {modals.showAccountMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => modals.closeModal('showAccountMenu')}
                  />
                  <div className={`absolute right-0 mt-2 w-72 sm:w-80 md:w-72 ${cardBg} ${cardBorder} rounded-xl ${darkMode ? 'border' : 'shadow-lg'} z-50 overflow-hidden max-h-[calc(100vh-100px)] overflow-y-auto`}>
                    <div className={`px-4 py-3 ${darkMode ? 'border-b border-[#2C2C2C]' : 'border-b border-gray-100'}`}>
                      <div className={`text-sm font-semibold ${textPrimary}`}>{currentUser.name}</div>
                      <div className={`text-xs ${textTertiary} mt-0.5`}>{currentUser.email}</div>
                    </div>
                    <div className="px-2 py-2">
                      <button
                        onClick={() => {
                          modals.openModal('showAccountSettings');
                          modals.closeModal('showAccountMenu');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg ${hoverBg} transition-colors text-sm ${textSecondary}`}
                      >
                        Account Settings
                      </button>
                      <button
                        onClick={() => {
                          modals.openModal('showAccountBalance');
                          modals.closeModal('showAccountMenu');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg ${hoverBg} transition-colors text-sm ${textSecondary} flex justify-between items-center`}
                      >
                        <span>Account Balance</span>
                        <span className={`font-semibold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>($176.00)</span>
                      </button>
                      <button
                        onClick={() => {
                          setInfoPage('careers');
                          modals.closeModal('showAccountMenu');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg ${hoverBg} transition-colors text-sm ${textSecondary}`}
                      >
                        Careers
                      </button>
                      <button
                        onClick={() => {
                          setInfoPage('growWithUs');
                          modals.closeModal('showAccountMenu');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg ${hoverBg} transition-colors text-sm ${textSecondary}`}
                      >
                        Grow With Us
                      </button>
                      <button
                        onClick={() => {
                          setInfoPage('aboutUs');
                          modals.closeModal('showAccountMenu');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg ${hoverBg} transition-colors text-sm ${textSecondary}`}
                      >
                        About Us
                      </button>
                    </div>
                    <div className={`${darkMode ? 'border-t border-[#2C2C2C]' : 'border-t border-gray-100'} px-2 py-2`}>
                      <button
                        onClick={() => {
                          alert('Thank you for your interest in submitting feedback! Our team reviews all suggestions and uses them to improve our services.');
                          modals.closeModal('showAccountMenu');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg ${hoverBg} transition-colors text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Submit Feedback
                      </button>
                    </div>
                    <div className={`${darkMode ? 'border-t border-[#2C2C2C]' : 'border-t border-gray-100'} px-2 py-2`}>
                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          modals.closeModal('showAccountMenu');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg ${hoverBg} transition-colors text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
