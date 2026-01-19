import React from 'react';
import { ChevronDown, Settings } from 'lucide-react';
import { HEARTHSTONE_GRADIENT } from '@/app/constants/theme';
import { Stats } from '@/app/types';

interface StatusSummaryCardProps {
  selectedFarm: string;
  stats: Stats;
  darkMode: boolean;
  headerTheme?: 'blue' | 'grey';
  testingMode: 'feeds' | 'soil';
  onPendingClick: () => void;
  onInProcessClick: () => void;
  onPartiallyCompleteClick: () => void;
  onCompletedClick: () => void;
  availableFarms: string[];
  onFarmChange: (farm: string) => void;
  onManageOrgClick: () => void;
  userRole: string;
}

export function StatusSummaryCard({
  selectedFarm,
  stats,
  darkMode,
  headerTheme = 'blue',
  testingMode,
  onPendingClick,
  onInProcessClick,
  onPartiallyCompleteClick,
  onCompletedClick,
  availableFarms,
  onFarmChange,
  onManageOrgClick,
  userRole,
}: StatusSummaryCardProps) {
  const inputBorder = darkMode ? 'border-[#3C3C3C]' : 'border-white/30';
  const textSecondary = darkMode ? 'text-[#C0C0C0]' : 'text-white/90';
  
  // Calculate width for the select based on current selected farm
  const selectRef = React.useRef<HTMLSelectElement>(null);
  const [selectWidth, setSelectWidth] = React.useState<number>(200);

  React.useEffect(() => {
    if (selectRef.current) {
      // Create a temporary span to measure text width
      const span = document.createElement('span');
      span.style.visibility = 'hidden';
      span.style.position = 'absolute';
      span.style.whiteSpace = 'nowrap';
      span.style.fontSize = window.innerWidth >= 768 ? '1.5rem' : '1.25rem'; // md:text-2xl : text-xl
      span.style.fontWeight = '600'; // semibold to match the select element
      span.textContent = selectedFarm;
      document.body.appendChild(span);
      const textWidth = span.offsetWidth;
      document.body.removeChild(span);
      
      // Add generous padding for chevron icon and extra space for long names (80px buffer)
      setSelectWidth(textWidth + 80);
    }
  }, [selectedFarm]);
  
  return (
    <div 
      className={`${headerTheme === 'grey' ? 'bg-[#2a2a2a]' : 'bg-[#1e3a5f]'} ${darkMode ? 'text-[#E0E0E0]' : 'text-white'} rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg mb-4 md:mb-6 border-l-8 ${
        headerTheme === 'grey' 
          ? 'border-l-black' 
          : (testingMode === 'feeds' ? 'border-l-[#1f5527]' : 'border-l-[#411900]')
      } relative overflow-hidden`} 
      style={HEARTHSTONE_GRADIENT}
    >
      {/* Farm Selector and Manage Org */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-3 md:mb-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="relative min-w-0 flex-1">
            <select
              value={selectedFarm}
              onChange={(e) => onFarmChange(e.target.value)}
              className={`text-white font-semibold text-xl md:text-2xl appearance-none cursor-pointer focus:outline-none bg-transparent border-0 px-0 pr-8 hover:opacity-80 transition-opacity`}
              style={{ width: `${selectWidth}px`, maxWidth: '100%', colorScheme: 'light' }}
              ref={selectRef}
            >
              <option disabled className="font-bold text-sm py-2" style={{ backgroundColor: '#ffffff', color: '#1f2937' }}>
                Organizations
              </option>
              {availableFarms.map((farm) => (
                <option 
                  key={farm} 
                  value={farm}
                  style={{ backgroundColor: '#ffffff', color: '#1f2937' }}
                >
                  {farm}
                </option>
              ))}
            </select>
            <ChevronDown className={`absolute right-0 top-1/2 -translate-y-1/2 size-5 pointer-events-none ${darkMode ? 'text-[#E0E0E0]' : 'text-white'}`} />
            <div className={`text-sm md:text-base mt-1 ${darkMode ? 'text-[#A0A0A0]' : 'text-white/70'}`}>
              Role: <span className="italic">{userRole}</span>
            </div>
          </div>
        </div>
        <div className="relative sm:ml-3 flex-shrink-0">
          <button
            onClick={onManageOrgClick}
            className={`group flex items-center gap-2 p-1 hover:opacity-70 transition-all`}
            aria-label="Manage Organization"
          >
            <Settings className={`size-5 ${darkMode ? 'text-[#808080]' : 'text-white/50'}`} />
            <span className={`sm:absolute sm:left-full sm:ml-1 text-sm ${darkMode ? 'text-[#A0A0A0]' : 'text-white/70'} sm:opacity-0 sm:group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
              Manage Org
            </span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:flex md:items-center md:justify-between gap-3 md:gap-0">
        <div 
          className="flex-1 cursor-pointer hover:opacity-80 transition-opacity p-2 md:p-0 rounded-lg hover:bg-white/5 text-center"
          onClick={onPendingClick}
        >
          <div className="text-2xl md:text-3xl font-bold mb-1">{stats.pendingArrival}</div>
          <div className={`text-xs md:text-sm ${darkMode ? 'text-[#C0C0C0]' : 'text-white/90'}`}>Pending Arrival</div>
        </div>
        <div className={`hidden md:block w-px h-12 mx-4 ${darkMode ? 'bg-[#3C3C3C]' : 'bg-white/30'}`}></div>
        <div 
          className="flex-1 cursor-pointer hover:opacity-80 transition-opacity p-2 md:p-0 rounded-lg hover:bg-white/5 text-center"
          onClick={onInProcessClick}
        >
          <div className="text-2xl md:text-3xl font-bold mb-1">{stats.inProcess}</div>
          <div className={`text-xs md:text-sm ${darkMode ? 'text-[#C0C0C0]' : 'text-white/90'}`}>In Testing</div>
        </div>
        <div className={`hidden md:block w-px h-12 mx-4 ${darkMode ? 'bg-[#3C3C3C]' : 'bg-white/30'}`}></div>
        <div 
          className="flex-1 cursor-pointer hover:opacity-80 transition-opacity p-2 md:p-0 rounded-lg hover:bg-white/5 text-center"
          onClick={onPartiallyCompleteClick}
        >
          <div className="text-2xl md:text-3xl font-bold mb-1">{stats.partiallyComplete}</div>
          <div className={`text-xs md:text-sm ${darkMode ? 'text-[#C0C0C0]' : 'text-white/90'}`}>Partially Complete</div>
        </div>
        <div className={`hidden md:block w-px h-12 mx-4 ${darkMode ? 'bg-[#3C3C3C]' : 'bg-white/30'}`}></div>
        <div 
          className="flex-1 cursor-pointer hover:opacity-80 transition-opacity p-2 md:p-0 rounded-lg hover:bg-white/5 text-center"
          onClick={onCompletedClick}
        >
          <div className="text-2xl md:text-3xl font-bold mb-1">{stats.completedLast30Days}</div>
          <div className={`text-xs md:text-sm ${darkMode ? 'text-[#C0C0C0]' : 'text-white/90'}`}>Completed Last 30 Days</div>
        </div>
      </div>
    </div>
  );
}