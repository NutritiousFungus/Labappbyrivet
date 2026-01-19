// Utility functions for theme-related logic

export interface ThemeClasses {
  bgColor: string;
  navBg: string;
  navBorder: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  navTextPrimary: string;
  navTextSecondary: string;
  navTextTertiary: string;
  cardBg: string;
  cardBorder: string;
  hoverBg: string;
  hoverItemBg: string;
  navHoverBg: string;
  divideBorder: string;
  inputBg: string;
  inputBorder: string;
}

export function getThemeClasses(darkMode: boolean): ThemeClasses {
  return {
    bgColor: darkMode ? 'bg-[#181818]' : 'bg-stone-300',
    navBg: darkMode ? 'bg-[#252525]' : 'bg-[#475569]',
    navBorder: darkMode ? 'border-[#2C2C2C]' : 'shadow-sm',
    textPrimary: darkMode ? 'text-[#E0E0E0]' : 'text-gray-800',
    textSecondary: darkMode ? 'text-[#C0C0C0]' : 'text-gray-600',
    textTertiary: darkMode ? 'text-[#909090]' : 'text-gray-500',
    navTextPrimary: darkMode ? 'text-[#E0E0E0]' : 'text-white',
    navTextSecondary: darkMode ? 'text-[#C0C0C0]' : 'text-gray-200',
    navTextTertiary: darkMode ? 'text-[#909090]' : 'text-gray-300',
    cardBg: darkMode ? 'bg-[#252525]' : 'bg-white',
    cardBorder: darkMode ? 'border border-[#2C2C2C]' : 'shadow-md',
    hoverBg: darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-100',
    hoverItemBg: darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-50',
    navHoverBg: darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-700',
    divideBorder: darkMode ? 'divide-[#2C2C2C]' : 'divide-gray-100',
    inputBg: darkMode ? 'bg-[#1A1A1A]' : 'bg-white',
    inputBorder: darkMode ? 'border-[#3C3C3C]' : 'border-gray-300',
  };
}

export function getBorderColorClass(testingMode: 'feeds' | 'soil', opacity: '30' | '100' = '100'): string {
  // Using brand colors: Feeds Green (#2d7a3e) and Soil Brown (#411900)
  const baseClass = testingMode === 'feeds' ? 'border-l-[#2d7a3e]' : 'border-l-[#411900]';
  if (opacity === '30') {
    return testingMode === 'feeds' ? 'border-l-[#2d7a3e]/30' : 'border-l-[#411900]/30';
  }
  return baseClass;
}

export function getHoverBorderColorClass(testingMode: 'feeds' | 'soil'): string {
  // Using brand colors: Dark Plant Green (#1f5527) and Soil Brown (#411900)
  return testingMode === 'feeds' ? 'hover:border-l-[#1f5527]' : 'hover:border-l-[#411900]';
}
