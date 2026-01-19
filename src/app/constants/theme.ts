// Theme Constants
export const COLORS = {
  // Soil/Feeds theme colors
  FEEDS_PRIMARY: 'green-700',
  FEEDS_SECONDARY: 'green-600',
  SOIL_PRIMARY: 'blue-600',
  SOIL_SECONDARY: 'blue-500',
  
  // Dark mode colors
  DARK_BG: '#181818',
  DARK_CARD_BG: '#252525',
  DARK_NAV_BG: '#252525',
  DARK_BORDER: '#2C2C2C',
  DARK_HOVER_BG: '#2A2A2A',
  DARK_INPUT_BG: '#1A1A1A',
  DARK_INPUT_BORDER: '#3C3C3C',
  
  DARK_TEXT_PRIMARY: '#E0E0E0',
  DARK_TEXT_SECONDARY: '#C0C0C0',
  DARK_TEXT_TERTIARY: '#909090',
  
  // Light mode colors
  LIGHT_BG: 'bg-stone-300',
  LIGHT_CARD_BG: 'bg-white',
  LIGHT_NAV_BG: 'bg-[#475569]',
  LIGHT_BORDER: 'border-gray-100',
  
  LIGHT_TEXT_PRIMARY: 'text-gray-800',
  LIGHT_TEXT_SECONDARY: 'text-gray-600',
  LIGHT_TEXT_TERTIARY: 'text-gray-500',
} as const;

// Project Hearthstone gradient styles - Dark Blue Theme
export const HEARTHSTONE_GRADIENT = {
  backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,.25) 0%, transparent 50%, rgba(0,0,0,.35) 100%)',
  boxShadow: 'inset 0 2px 0 rgba(255,255,255,.25), 0 4px 12px rgba(0,0,0,.3)',
};

// Animation timings
export const TRANSITIONS = {
  DEFAULT: 'transition-all duration-300',
  FAST: 'transition-all duration-150',
  SLOW: 'transition-all duration-500',
} as const;

// Z-index layers
export const Z_INDEX = {
  NAV_DROPDOWN: 50,
  MODAL_BACKDROP: 40,
  STICKY_HEADER: 30,
  FLOATING_ACTION: 20,
} as const;
