import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * Global application state that should be accessible throughout the app
 * without prop drilling. Includes user preferences that persist in localStorage.
 */
interface AppContextType {
  // Theme & Mode
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
  
  // Testing Mode (Feeds vs Soil)
  testingMode: 'feeds' | 'soil';
  setTestingMode: (mode: 'feeds' | 'soil') => void;
  
  // Cannabis Mode (Cannabis vs Hemp)
  cannabisMode: 'cannabis' | 'hemp';
  setCannabisMode: (mode: 'cannabis' | 'hemp') => void;
  
  // Farm Selection
  selectedFarm: string;
  setSelectedFarm: (farm: string) => void;
  
  // Current View
  currentView: 'dashboard' | 'trends';
  setCurrentView: (view: 'dashboard' | 'trends') => void;

  // View Mode (Client vs Lab)
  viewMode: 'client' | 'lab';
  setViewMode: (mode: 'client' | 'lab') => void;
}

// Create context with a default value to prevent undefined errors
const defaultContextValue: AppContextType = {
  darkMode: false,
  setDarkMode: () => {},
  toggleDarkMode: () => {},
  testingMode: 'feeds',
  setTestingMode: () => {},
  cannabisMode: 'cannabis',
  setCannabisMode: () => {},
  selectedFarm: 'Friendly Illinois Brothers',
  setSelectedFarm: () => {},
  currentView: 'dashboard',
  setCurrentView: () => {},
  viewMode: 'client',
  setViewMode: () => {},
};

const AppContext = createContext<AppContextType>(defaultContextValue);

const STORAGE_KEY = 'agrilab-preferences';

interface StoredPreferences {
  darkMode?: boolean;
  testingMode?: 'feeds' | 'soil';
  cannabisMode?: 'cannabis' | 'hemp';
  selectedFarm?: string;
  currentView?: 'dashboard' | 'trends';
  viewMode?: 'client' | 'lab';
}

/**
 * Load user preferences from localStorage
 */
function loadPreferences(): StoredPreferences {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return {};
  }
}

/**
 * Save user preferences to localStorage
 */
function savePreferences(preferences: StoredPreferences) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error('Failed to save preferences:', error);
  }
}

interface AppProviderProps {
  children: ReactNode;
}

/**
 * Provider component that wraps the app and provides global state
 */
export function AppProvider({ children }: AppProviderProps) {
  // Load initial preferences from localStorage - use lazy initialization
  const [darkMode, setDarkModeState] = useState(() => {
    const preferences = loadPreferences();
    return preferences.darkMode ?? false;
  });
  
  const [testingMode, setTestingModeState] = useState<'feeds' | 'soil'>(() => {
    const preferences = loadPreferences();
    return preferences.testingMode ?? 'feeds';
  });
  
  const [cannabisMode, setCannabisModeState] = useState<'cannabis' | 'hemp'>(() => {
    const preferences = loadPreferences();
    return preferences.cannabisMode ?? 'cannabis';
  });
  
  const [selectedFarm, setSelectedFarmState] = useState(() => {
    const preferences = loadPreferences();
    return preferences.selectedFarm ?? 'Friendly Illinois Brothers';
  });
  
  const [currentView, setCurrentViewState] = useState<'dashboard' | 'trends'>(() => {
    const preferences = loadPreferences();
    return preferences.currentView ?? 'dashboard';
  });

  const [viewMode, setViewModeState] = useState<'client' | 'lab'>(() => {
    const preferences = loadPreferences();
    return preferences.viewMode ?? 'client';
  });

  // Persist preferences whenever they change
  useEffect(() => {
    savePreferences({
      darkMode,
      testingMode,
      cannabisMode,
      selectedFarm,
      currentView,
      viewMode,
    });
  }, [darkMode, testingMode, cannabisMode, selectedFarm, currentView, viewMode]);

  const setDarkMode = (value: boolean) => {
    setDarkModeState(value);
  };

  const toggleDarkMode = () => {
    setDarkModeState(prev => !prev);
  };

  const setTestingMode = (mode: 'feeds' | 'soil') => {
    setTestingModeState(mode);
  };

  const setCannabisMode = (mode: 'cannabis' | 'hemp') => {
    setCannabisModeState(mode);
  };

  const setSelectedFarm = (farm: string) => {
    setSelectedFarmState(farm);
  };

  const setCurrentView = (view: 'dashboard' | 'trends') => {
    setCurrentViewState(view);
  };

  const setViewMode = (mode: 'client' | 'lab') => {
    setViewModeState(mode);
  };

  const value: AppContextType = {
    darkMode,
    setDarkMode,
    toggleDarkMode,
    testingMode,
    setTestingMode,
    cannabisMode,
    setCannabisMode,
    selectedFarm,
    setSelectedFarm,
    currentView,
    setCurrentView,
    viewMode,
    setViewMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * Custom hook to access global app state
 * 
 * @example
 * const { darkMode, toggleDarkMode } = useAppContext();
 */
export function useAppContext() {
  const context = useContext(AppContext);
  return context;
}