import React from 'react';
import { Check, Edit3, Search, Eye, FileText, Plus, MessageCircle } from 'lucide-react';
import { getThemeClasses } from '@/app/utils/themeUtils';
import { getSampleTypeIcon } from '@/app/utils/sampleIcons';
import { StatusBadge } from '@/app/components/StatusBadge';
import { testPackageAnalytes, addOnAnalytes } from '@/app/constants/testPackages';

interface SampleListProps {
  activity: any[];
  testingMode: 'feeds' | 'soil';
  headerTheme: 'blue' | 'grey';
  darkMode: boolean;
  selectMode: boolean;
  selectedSamples: Set<string>;
  hasMore: boolean;
  onToggleSelection: (id: string) => void;
  onSelectSample: (id: string) => void;
  onRequestChanges: (id: string) => void;
  onCheckStatus: (id: string) => void;
}

export function SampleList({
  activity,
  testingMode,
  headerTheme,
  darkMode,
  selectMode,
  selectedSamples,
  hasMore,
  onToggleSelection,
  onSelectSample,
  onRequestChanges,
  onCheckStatus
}: SampleListProps) {
  const theme = getThemeClasses(darkMode);
  const {
    textPrimary,
    textSecondary,
    textTertiary,
    cardBg,
    cardBorder,
    inputBg,
    inputBorder,
    hoverItemBg
  } = theme;

  if (activity.length === 0) {
    return (
      <div className={`px-5 py-12 text-center ${textTertiary}`}>
        <Search className="size-12 mx-auto mb-3 opacity-30" />
        {headerTheme === 'grey' ? (
          <div className="group cursor-default">
            <p className="italic text-gray-400 text-lg mb-2">
              "Whom the gods would destroy they first make mad."
            </p>
            <p className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              - <span className="italic">Sophoclean Proverb</span>
            </p>
          </div>
        ) : (
          <div className="group cursor-default">
            <p className="italic text-sm mb-1">
              "The nation that destroys its soil destroys itself."
            </p>
            <p className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              - prometheusbound
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {headerTheme === 'grey' ? (
        <div className="px-5 py-16 text-center">
          <div className="group cursor-default">
            <p className="italic text-gray-400 text-lg mb-2">
              "Whom the gods would destroy they first make mad."
            </p>
            <p className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              - <span className="italic">Sophoclean Proverb</span>
            </p>
          </div>
        </div>
      ) : (
        <>
          {activity.map((item, index) => {
            // Determine if this row can be clicked
            const isClickable = !selectMode && (item.status === 'completed' || item.status === 'partial' || item.status === 'processing' || item.status === 'intransit' || item.status === 'pending');
            // More distinct alternating colors
            const rowBg = index % 2 === 0 
              ? (darkMode ? '' : 'bg-stone-100') 
              : (darkMode ? 'bg-[#222222]' : 'bg-white');
            
            return (
              <div
                key={item.id}
                className={`w-full px-3 sm:px-4 md:px-5 py-2.5 md:py-3 transition-all text-left border-l-4 ${
                  headerTheme === 'grey'
                    ? 'border-l-black/30 hover:border-l-black'
                    : (testingMode === 'feeds' ? 'border-l-[#1f5527]/30 hover:border-l-[#1f5527]' : 'border-l-[#411900]/30 hover:border-l-[#411900]/70')
                } ${rowBg} ${
                  isClickable ? 'cursor-pointer hover:bg-opacity-60 hover:shadow-sm' : ''
                } ${
                  selectMode && (item.status === 'completed' || item.status === 'partial') ? 'cursor-pointer hover:shadow-sm' : ''
                }`}
                onClick={() => {
                  if (selectMode && (item.status === 'completed' || item.status === 'partial')) {
                    onToggleSelection(item.id);
                  } else if (isClickable) {
                    onSelectSample(item.id);
                  }
                }}
              >
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  {/* Checkbox in Select Mode */}
                  {selectMode && (item.status === 'completed' || item.status === 'partial') && (
                    <div className="flex-shrink-0">
                      <div
                        className={`size-5 rounded border-2 flex items-center justify-center transition-all ${
                          selectedSamples.has(item.id)
                            ? 'bg-[#2d7a3e] border-[#2d7a3e]'
                            : `${inputBorder} ${inputBg}`
                        }`}
                      >
                        {selectedSamples.has(item.id) && (
                          <Check className="size-3.5 text-white" strokeWidth={3} />
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Sample Type Image Placeholder - Vertically centered */}
                  <div className="flex-shrink-0 hidden sm:block">
                    {getSampleTypeIcon(item.sampleType, testingMode, darkMode)}
                  </div>
                  
                  {/* Sample Info - Compact Layout */}
                  <div className="flex-1 min-w-0">
                    {/* Sample Name and Timestamp - Single Row */}
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap mb-1.5">
                      {item.sampleName && (
                        <>
                          <span className={`text-xs font-semibold ${textTertiary} uppercase tracking-wide hidden sm:inline`}>Name</span>
                          <span className={`text-sm sm:text-base font-bold ${textPrimary}`}>{item.sampleName}</span>
                          <span className={`text-xs ${textTertiary} hidden sm:inline`}>•</span>
                        </>
                      )}
                      <span className={`text-xs ${textTertiary}`}>{item.timestamp}</span>
                    </div>
                    
                    {/* Lab No / Container ID - Single Row */}
                    <div className="flex items-center gap-2 mb-1.5">
                      {item.status === 'pending' ? (
                        <>
                          <span className={`text-xs font-semibold ${textTertiary} uppercase tracking-wide`}>Container ID</span>
                          <span className={`font-mono text-sm ${textSecondary}`}>{item.bagLabelId}</span>
                        </>
                      ) : (
                        <>
                          <span className={`text-xs font-semibold ${textTertiary} uppercase tracking-wide`}>Lab Number</span>
                          <span className={`font-mono text-sm ${textSecondary}`}>{item.id}</span>
                        </>
                      )}
                    </div>
                    
                    {/* Tests - Single Row */}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm ${textSecondary}`}>{item.sampleType}</span>
                        <span className={`text-xs ${textTertiary}`}>•</span>
                        
                        {/* Test Package with Tooltip */}
                        <div className="relative group inline-block">
                          <span className={`text-sm font-medium ${textPrimary} cursor-help border-b border-dashed ${darkMode ? 'border-gray-600' : 'border-gray-400'}`}>
                            {item.testPackage}
                          </span>
                          {/* Tooltip */}
                          <div className={`absolute bottom-full left-0 mb-2 hidden group-hover:block z-[100] ${cardBg} ${cardBorder} ${darkMode ? 'border' : 'shadow-xl'} rounded-lg p-3 min-w-[200px]`}>
                            <div className={`text-xs font-semibold ${textPrimary} mb-1.5`}>{item.testPackage} includes:</div>
                            <div className={`text-xs ${textSecondary} space-y-0.5`}>
                              {testPackageAnalytes[item.testPackage]?.map((analyte: string, idx: number) => (
                                <div key={idx}>• {analyte}</div>
                              ))}
                            </div>
                            {/* Arrow */}
                            <div className={`absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 ${darkMode ? 'border-t-[#252525]' : 'border-t-white'} border-l-transparent border-r-transparent`}></div>
                          </div>
                        </div>
                        
                        {item.addOns && item.addOns.length > 0 && (
                          <>
                            <span className={`text-xs ${textTertiary}`}>+</span>
                            {item.addOns.map((addOn: string, idx: number) => (
                              <div key={idx} className="relative group inline-block">
                                <span className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} font-medium cursor-help border-b border-dashed ${darkMode ? 'border-blue-600' : 'border-blue-400'}`}>
                                  {addOn}
                                </span>
                                {/* Tooltip for Add-ons */}
                                <div className={`absolute bottom-full left-0 mb-2 hidden group-hover:block z-[100] ${cardBg} ${cardBorder} ${darkMode ? 'border' : 'shadow-xl'} rounded-lg p-3 min-w-[200px]`}>
                                  <div className={`text-xs font-semibold ${textPrimary} mb-1.5`}>{addOn} includes:</div>
                                  <div className={`text-xs ${textSecondary} space-y-0.5`}>
                                    {addOnAnalytes[addOn]?.map((analyte: string, aidx: number) => (
                                      <div key={aidx}>• {analyte}</div>
                                    ))}
                                  </div>
                                  {/* Arrow */}
                                  <div className={`absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 ${darkMode ? 'border-t-[#252525]' : 'border-t-white'} border-l-transparent border-r-transparent`}></div>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Badge and Action Buttons - Vertically Centered on Right */}
                  <div className="flex-shrink-0 hidden sm:flex flex-col items-end gap-2">
                    <StatusBadge status={item.status} darkMode={darkMode} />
                    {item.status === 'pending' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRequestChanges(item.id);
                        }}
                        className={`flex items-center gap-1.5 text-xs font-medium ${darkMode ? 'text-gray-400 bg-gray-800 hover:bg-gray-700' : 'text-gray-700 bg-gray-200 hover:bg-gray-300'} px-2 md:px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
                      >
                        <Edit3 className="size-3.5" />
                        <span className="text-xs font-medium">Make Changes</span>
                      </button>
                    )}
                    {item.status === 'processing' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCheckStatus(item.id);
                        }}
                        className={`flex items-center gap-1.5 text-xs font-medium ${darkMode ? 'text-amber-600 bg-amber-900/20 hover:bg-amber-900/30' : 'text-amber-800 bg-amber-100 hover:bg-amber-200'} px-2 md:px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap border ${darkMode ? 'border-amber-900/40' : 'border-amber-200'}`}
                      >
                        <Eye className="size-3.5" />
                        <span className="text-xs font-medium">Check Status</span>
                      </button>
                    )}
                    {item.status === 'partial' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSample(item.id);
                        }}
                        className={`flex items-center gap-1.5 text-xs font-medium ${darkMode ? 'text-blue-400 bg-blue-900/20 hover:bg-blue-900/30' : 'text-blue-700 bg-blue-100 hover:bg-blue-200'} px-2 md:px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap border ${darkMode ? 'border-blue-900/40' : 'border-blue-200'}`}
                      >
                        <FileText className="size-3.5" />
                        <span className="text-xs font-medium">View Partial Results</span>
                      </button>
                    )}
                    {item.status === 'completed' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSample(item.id);
                        }}
                        className={`flex items-center gap-1.5 text-xs font-medium ${darkMode ? 'text-[#2d7a3e] bg-[#2d7a3e]/30 hover:bg-[#2d7a3e]/40' : 'text-[#2d7a3e] bg-[#2d7a3e]/10 hover:bg-[#2d7a3e]/20'} px-2 md:px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap border ${darkMode ? 'border-[#2d7a3e]/40' : 'border-[#2d7a3e]/20'}`}
                      >
                        <FileText className="size-3.5" />
                        <span className="text-xs font-medium">View Results</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Loading indicator for infinite scroll */}
          {hasMore && (
            <div className={`px-5 py-4 text-center ${textTertiary}`}>
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#2d7a3e]"></div>
                <span className="text-sm">Loading more samples...</span>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}