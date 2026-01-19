// Laboratory Dashboard - Main App Component
import { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { Clock, CheckCircle2, Plus, User, Settings, FlaskConical, ChevronDown, TrendingUp, Moon, Sun, Search, X, Download, Check, Wheat, Sprout, Beaker, Package, MessageCircle, Filter, Calendar, Sliders, Leaf, Beef, Circle, ShoppingBag, Droplets, Bell, Pencil, Trash2, Edit3, Eye, FileText, Palette, Egg } from 'lucide-react';
import { SampleIntakeFlow } from '@/app/components/SampleIntakeFlow';
import { TeamSettings } from '@/app/components/TeamSettings';
import { SampleResults } from '@/app/components/SampleResults';
import { DarkModeDashboard } from '@/app/components/DarkModeDashboard';
import { AccountBalance } from '@/app/components/AccountBalance';
import { PaymentPortal } from '@/app/components/PaymentPortal';
import { APIAccess } from '@/app/components/APIAccess';
import { ModifyTests } from '@/app/components/ModifyTests';
import { RequestChanges, ChangeRequest } from '@/app/components/RequestChanges';
import { AccountSettings } from '@/app/components/AccountSettings';
import { AboutUs } from '@/app/components/AboutUs';
import { DropboxMap } from '@/app/components/DropboxMap';
import { Careers } from '@/app/components/Careers';
import { GrowWithUs } from '@/app/components/GrowWithUs';
import { BulkSampleSubmission } from '@/app/components/BulkSampleSubmission';
import { Login } from '@/app/components/Login';
import { RivetApplications } from '@/app/components/RivetApplications';
import { IndustryNews } from '@/app/components/IndustryNews';
import { SamplingInstructions } from '@/app/components/SamplingInstructions';
import { Projects } from '@/app/components/Projects';
import { ProjectDetail } from '@/app/components/ProjectDetail';
import { ProjectCreation } from '@/app/components/ProjectCreation';
import { StatusModal } from '@/app/components/StatusModal';
import { StatusSummaryCard } from '@/app/components/StatusSummaryCard';
import { CustomPackages } from '@/app/components/CustomPackages';
import { WhatIsNIR } from '@/app/components/WhatIsNIR';
import { TestingMenuModal } from '@/app/components/TestingMenuModal';
import { LabAdminPortal } from '@/app/components/LabAdminPortal_new';
import { SampleListModal } from '@/app/components/SampleListModal';
import { SampleList } from '@/app/components/SampleList';
import { NotificationsPanel } from '@/app/components/NotificationsPanel';
import { LabToolsMenu } from '@/app/components/LabToolsMenu';
import { ProfileMenu } from '@/app/components/ProfileMenu';
import { Header } from '@/app/components/Header';
import { ModalContainer } from '@/app/components/ModalContainer';
import { FilterModal } from '@/app/components/FilterModal';
import { StatusBadge } from '@/app/components/StatusBadge';
import { useScroll } from '@/app/hooks/useScroll';
import { useFilters } from '@/app/hooks/useFilters';
import { useModalState } from '@/app/hooks/useModalState';
import { AppProvider, useAppContext } from '@/app/contexts/AppContext';
import { getThemeClasses } from '@/app/utils/themeUtils';
import { getSampleTypeIcon, getSampleTypeSmallIcon } from '@/app/utils/sampleIcons';
import { 
  getSamplesForProject, 
  getProjectForSample, 
  getProjectsForSample, 
  assignSampleToProject as assignSampleToProjectUtil, 
  assignSampleToProjects as assignSampleToProjectsUtil,
  calculateSampleStats 
} from '@/app/utils/sampleUtils';
import { applyAllFilters } from '@/app/utils/filterUtils';
import { HEARTHSTONE_GRADIENT } from '@/app/constants/theme';
import { testPackageAnalytes, addOnAnalytes } from '@/app/constants/testPackages';
import { CURRENT_USER } from '@/app/constants/userData';
import { Project, SampleHistoryItem, Stats, CustomPackage, ViewMode, InfoPage, SampleProjectView } from '@/app/types';
import { getProjectsForFarm } from '@/app/data/mockData';
import { generateSampleData, generateSoilSampleData, generateSampleId, calculateExpectedCompletion } from '@/app/data/sampleGenerator';
import { getStatusColor, getStatusLabel } from '@/app/utils/statusUtils';
import { MOCK_NOTIFICATIONS } from '@/app/data/notifications';
import logoImage from 'figma:asset/70a773257adca7df2225bb5f63c4e668abae4133.png';
import cannaSafeLogo from 'figma:asset/1de603cb4707eaecd97c2b30bda54875443a9eea.png';
import divingHelmetIcon from 'figma:asset/8d52049ec4887535baaca8bbb16bad072eeac45e.png';

// Lazy load TrendsMetricsDashboard to avoid loading recharts until needed
const TrendsMetricsDashboard = lazy(() => import('@/app/components/TrendsMetricsDashboard').then(module => ({ default: module.TrendsMetricsDashboard })));

function AppContent() {
  // Force cache bust - version 2025-01-16-v4
  useEffect(() => {
    console.log('App loaded: 2025-01-16-v4 (optimized)');
  }, []);

  // Custom hooks
  const isScrolled = useScroll(20);
  const filters = useFilters();
  const modals = useModalState();
  
  // Global context (replaces local state for darkMode, testingMode, selectedFarm, currentView)
  const { darkMode, setDarkMode, testingMode, setTestingMode, cannabisMode, setCannabisMode, selectedFarm, setSelectedFarm, currentView, setCurrentView, viewMode, setViewMode } = useAppContext();
  
  // Core state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);
  const [selectedSampleName, setSelectedSampleName] = useState<string>('');
  const [sampleCounter, setSampleCounter] = useState(1027);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectMode, setSelectMode] = useState(false);
  const [selectedSamples, setSelectedSamples] = useState<Set<string>>(new Set());
  const [requestingChangesForSample, setRequestingChangesForSample] = useState<string | null>(null);
  const [infoPage, setInfoPage] = useState<InfoPage>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [displayCount, setDisplayCount] = useState(30);
  const [sampleProjectView, setSampleProjectView] = useState<SampleProjectView>('samples');
  const [showDropboxMap, setShowDropboxMap] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showProjectCreation, setShowProjectCreation] = useState(false);
  const [showCustomPackages, setShowCustomPackages] = useState(false);
  const [showWhatIsNIR, setShowWhatIsNIR] = useState(false);
  const [showTestingMenu, setShowTestingMenu] = useState(false);
  const [showAPIAccess, setShowAPIAccess] = useState(false);
  const [showPaymentPortal, setShowPaymentPortal] = useState(false);
  const [customPackages, setCustomPackages] = useState<Record<string, CustomPackage[]>>({
    'Friendly Illinois Brothers': [],
    'Goeser\'s Grazers': [],
    'Standard Dairy Consultants': [],
  });
  const [userCreatedProjects, setUserCreatedProjects] = useState<Record<string, Project[]>>({
    'Friendly Illinois Brothers': [],
    'Goeser\'s Grazers': [],
    'Standard Dairy Consultants': [],
  });
  const [projectSampleAssignments, setProjectSampleAssignments] = useState<Record<string, string[]>>({
    'proj-1': ['1-001-027', '1-001-026', '1-001-025', '1-001-024', '1-001-023', '1-001-022', '1-001-021', '1-001-020', '1-001-019', '1-001-018', '1-001-017', '1-001-016'],
    'proj-2': ['1-001-015', '1-001-014', '1-001-013', '1-001-012', '1-001-011', '1-001-010', '1-001-009', '1-001-008'],
    'proj-3': ['1-001-007', '1-001-006', '1-001-005', '1-001-004', '1-001-003', '1-001-002', '1-001-001', '1-001-000', '1-000-999', '1-000-998', '1-000-997', '1-000-996', '1-000-995', '1-000-994', '1-000-993'],
    'proj-4': ['1-000-992', '1-000-991', '1-000-990', '1-000-989', '1-000-988', '1-000-987'],
    'proj-5': ['1-000-986', '1-000-985', '1-000-984', '1-000-983', '1-000-982', '1-000-981', '1-000-980', '1-000-979', '1-000-978', '1-000-977', '1-000-976', '1-000-975', '1-000-974', '1-000-973', '1-000-972', '1-000-971', '1-000-970', '1-000-969', '1-000-968', '1-000-967'],
  });
  const [editingSampleId, setEditingSampleId] = useState<string | null>(null);
  const [editedSampleNames, setEditedSampleNames] = useState<Record<string, string>>({});
  const [showFloatingDarkMode, setShowFloatingDarkMode] = useState(false);
  const [headerTheme, setHeaderTheme] = useState<'blue' | 'grey'>('blue');
  
  // Set favicon on mount
  useEffect(() => {
    // Remove any existing favicon links
    const existingLinks = document.querySelectorAll("link[rel*='icon']");
    existingLinks.forEach(link => link.remove());

    // Use the diving helmet icon as favicon
    const link = document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = divingHelmetIcon;
    document.head.appendChild(link);

    // Add shortcut icon for older browsers
    const shortcutLink = document.createElement('link');
    shortcutLink.rel = 'shortcut icon';
    shortcutLink.href = divingHelmetIcon;
    document.head.appendChild(shortcutLink);
  }, []);

  // Efficiency Mode: Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Lab/Client View: Ctrl + Shift + L
      if (e.ctrlKey && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
        e.preventDefault();
        // Only allow switching if not in cannabis mode (grey header)
        if (headerTheme !== 'grey') {
          setViewMode(prev => prev === 'client' ? 'lab' : 'client');
        }
      }
      
      // Toggle Dark Mode: Ctrl + Shift + D
      if (e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        setDarkMode(!darkMode);
      }
      
      // Focus Search: Ctrl + K (only in client view)
      if (e.ctrlKey && (e.key === 'k' || e.key === 'K') && viewMode === 'client') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [darkMode, headerTheme, viewMode, setDarkMode]);
  
  // User data - using constant from userData.ts
  const currentUser = CURRENT_USER;
  
  // Force selectedFarm to "Scott Tindall" when in cannabis mode, and reset to first available farm when exiting
  useEffect(() => {
    if (headerTheme === 'grey' && selectedFarm !== 'Scott Tindall') {
      setSelectedFarm('Scott Tindall');
    } else if (headerTheme === 'blue' && selectedFarm === 'Scott Tindall') {
      // When exiting cannabis mode, reset to the first available normal farm
      const normalFarms = currentUser.farms.filter(farm => farm !== 'Scott Tindall');
      if (normalFarms.length > 0) {
        setSelectedFarm(normalFarms[0]);
      }
    }
  }, [headerTheme, selectedFarm, setSelectedFarm]);
  
  const [recentActivity, setRecentActivity] = useState(() => generateSampleData());
  const [soilActivity, setSoilActivity] = useState(() => generateSoilSampleData());

  // Get current activity based on testing mode
  const currentActivity = testingMode === 'feeds' ? recentActivity : soilActivity;

  // Helper functions using utilities
  const getAllProjectsForFarm = useCallback((farmName: string) => {
    const mockProjects = getProjectsForFarm(farmName);
    const userProjects = userCreatedProjects[farmName] || [];
    return [...mockProjects, ...userProjects];
  }, [userCreatedProjects]);

  const getProjectsWithCounts = useCallback((farmName: string) => {
    const allProjects = getAllProjectsForFarm(farmName);
    return allProjects.map(p => ({
      ...p,
      sampleCount: projectSampleAssignments[p.id]?.length || 0
    }));
  }, [projectSampleAssignments, getAllProjectsForFarm]);

  // Memoized project assignment handlers
  const assignSampleToProject = useCallback((sampleId: string, projectId: string | null) => {
    setProjectSampleAssignments(prev => assignSampleToProjectUtil(sampleId, projectId, prev));
  }, []);

  const assignSampleToProjects = useCallback((sampleId: string, projectIds: string[] | null) => {
    setProjectSampleAssignments(prev => assignSampleToProjectsUtil(sampleId, projectIds, prev));
  }, []);

  // Handle project creation
  const handleCreateProject = useCallback((projectData: {
    name: string;
    description: string;
    sampleIds: string[];
    sharedWith: { name: string; color: string }[];
  }) => {
    const newProjectId = `user-proj-${Date.now()}`;
    const newProject: Project = {
      id: newProjectId,
      name: projectData.name,
      description: projectData.description,
      sampleCount: projectData.sampleIds.length,
      sharedWith: projectData.sharedWith,
      isShared: projectData.sharedWith.length > 0,
      createdDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    };

    // Add project to the current farm
    setUserCreatedProjects(prev => ({
      ...prev,
      [selectedFarm]: [...(prev[selectedFarm] || []), newProject]
    }));

    // Assign samples to the project
    setProjectSampleAssignments(prev => ({
      ...prev,
      [newProjectId]: projectData.sampleIds
    }));

    setShowProjectCreation(false);
  }, [selectedFarm]);

  // Calculate stats using utility function (memoized)
  const stats = useMemo(() => 
    calculateSampleStats(currentActivity, selectedFarm, testingMode),
    [currentActivity, selectedFarm, testingMode]
  );

  const handleSubmitSamples = (samples?: any[]) => {
    // If samples are provided (from intake flow), handle project assignments
    if (samples && samples.length > 0) {
      // Assign samples to projects if projectId is set
      samples.forEach(sample => {
        if (sample.projectId && testingMode === 'feeds') {
          // The sample will be assigned via the generateSampleData flow
          // We'll need to track this in a different way since we're not generating real samples here yet
        }
      });
    }
    
    // Create new sample entries when user submits
    const newCounter = sampleCounter + 1;
    const newSample = {
      id: generateSampleId(),
      status: 'pending' as const,
      timestamp: 'Just now',
      farm: selectedFarm,
      sampleName: '',
    };
    
    setRecentActivity([newSample, ...recentActivity]);
    setSampleCounter(newCounter);
    modals.closeModal('showIntakeFlow');
  };

  // Memoized filtering using utility function - optimized single-pass filtering
  const searchFilteredActivity = useMemo(() => 
    applyAllFilters(currentActivity, selectedFarm, searchQuery, filters),
    [currentActivity, selectedFarm, searchQuery, filters]
  );

  // Limit displayed items for infinite scroll
  const displayedActivity = searchFilteredActivity.slice(0, displayCount);

  // Check if there are more items to load
  const hasMore = displayCount < searchFilteredActivity.length;

  // Combined scroll handler for performance - handles both floating dark mode and infinite scroll
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Show floating button after scrolling down 200px
          setShowFloatingDarkMode(window.scrollY > 200);
          
          // Infinite scroll - check if user is near bottom of page
          const scrollPosition = window.innerHeight + window.scrollY;
          const pageHeight = document.documentElement.scrollHeight;
          
          // Load 50 more when user is within 300px of bottom
          if (pageHeight - scrollPosition < 300 && displayCount < searchFilteredActivity.length) {
            setDisplayCount(prev => Math.min(prev + 50, searchFilteredActivity.length));
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayCount, searchFilteredActivity.length]);

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(30);
  }, [searchQuery, filters.dateRange, filters.customDateStart, filters.customDateEnd, filters.testTypes, filters.sampleTypes, filters.statuses, filters.labNumberFrom, filters.labNumberTo, selectedFarm]);

  // Scroll to top when changing views or opening samples
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedSampleId, modals.showTeamSettings, modals.showIntakeFlow, modals.showAccountBalance]);

  // Memoized active filter count
  const activeFilterCount = useMemo(() => 
    (filters.dateRange !== 'all' ? 1 : 0) +
    filters.testTypes.length +
    filters.sampleTypes.length +
    filters.statuses.length +
    (filters.labNumberFrom || filters.labNumberTo ? 1 : 0),
    [filters.dateRange, filters.testTypes.length, filters.sampleTypes.length, filters.statuses.length, filters.labNumberFrom, filters.labNumberTo]
  );

  const handleResetView = () => {
    modals.closeAllModals();
    setSelectedSampleId(null);
    setShowCustomPackages(false);
    setShowWhatIsNIR(false);
    setInfoPage(null);
    setShowDropboxMap(false);
    setSelectedProjectId(null);
    setSampleProjectView('samples');
    window.scrollTo(0, 0);
  };

  const handleViewSample = (sampleId: string, status: string) => {
    // Allow viewing details for completed, partial, processing, and intransit samples
    if (status === 'completed' || status === 'partial' || status === 'processing' || status === 'intransit') {
      setSelectedSampleId(sampleId);
    }
  };

  const handleStartEditSampleName = (sampleId: string, currentName: string) => {
    setEditingSampleId(sampleId);
    setEditedSampleNames(prev => ({ ...(prev || {}), [sampleId]: currentName }));
  };

  const handleSaveSampleName = (sampleId: string) => {
    const newName = editedSampleNames[sampleId];
    if (newName && newName.trim()) {
      // In a real app, this would save to backend
      // For now, we'll update the sample in our mock data
      const sampleIndex = currentActivity.findIndex(s => s.id === sampleId);
      if (sampleIndex !== -1) {
        // Update the appropriate activity array based on testing mode
        if (testingMode === 'feeds') {
          const updatedActivity = [...recentActivity];
          const index = updatedActivity.findIndex(s => s.id === sampleId);
          if (index !== -1) {
            updatedActivity[index].sampleName = newName.trim();
            setRecentActivity(updatedActivity);
          }
        } else {
          const updatedActivity = [...soilActivity];
          const index = updatedActivity.findIndex(s => s.id === sampleId);
          if (index !== -1) {
            updatedActivity[index].sampleName = newName.trim();
            setSoilActivity(updatedActivity);
          }
        }
      }
      alert(`Sample name updated to: ${newName.trim()}`);
    }
    setEditingSampleId(null);
  };

  const handleCancelEditSampleName = (sampleId: string, originalName: string) => {
    setEditedSampleNames(prev => ({ ...(prev || {}), [sampleId]: originalName }));
    setEditingSampleId(null);
  };

  const toggleSampleSelection = (sampleId: string) => {
    const newSelected = new Set(selectedSamples);
    if (newSelected.has(sampleId)) {
      newSelected.delete(sampleId);
    } else {
      newSelected.add(sampleId);
    }
    setSelectedSamples(newSelected);
  };

  const selectAllFiltered = () => {
    const completedSamples = searchFilteredActivity.filter(s => s.status === 'completed');
    setSelectedSamples(new Set(completedSamples.map(s => s.id)));
  };

  const deselectAll = () => {
    setSelectedSamples(new Set());
  };

  const handleBulkDownload = (format: string) => {
    console.log(`Downloading ${selectedSamples.size} samples as ${format}`);
    modals.closeModal('showBulkDownloadModal');
    setSelectMode(false);
    setSelectedSamples(new Set());
    
    // Simulate download
    const sampleIds = Array.from(selectedSamples).join('-');
    const filename = `bulk-samples-${sampleIds.substring(0, 20)}.${format}`;
    console.log('Download would start:', filename);
  };

  const handleDownloadAll = (format: string) => {
    const completedSamples = searchFilteredActivity.filter(s => s.status === 'completed');
    console.log(`Downloading all ${completedSamples.length} filtered samples as ${format}`);
    modals.closeModal('showBulkDownloadModal');
    
    // Simulate download
    const filename = `bulk-samples-all.${format}`;
    console.log('Download would start:', filename);
  };

  const handleChangeRequest = (changeRequest: ChangeRequest) => {
    console.log('Change request submitted:', changeRequest);
    // Update sample status to show change is pending
    // In a real app, this would send the request to the server
    setRequestingChangesForSample(null);
  };

  const [modifyingSampleId, setModifyingSampleId] = useState<string | null>(null);

  // If modifying tests for a sample, render that instead
  if (modifyingSampleId) {
    const sample = currentActivity.find(s => s.id === modifyingSampleId);
    if (sample) {
      return (
        <ModifyTests
          onBack={() => setModifyingSampleId(null)}
          darkMode={darkMode}
          sampleId={sample.id}
          currentPackage={sample.testPackage}
          currentAddOns={sample.addOns}
          currentSampleName={sample.sampleName}
        />
      );
    }
  }

  // If requesting changes for a pending sample, render that instead
  if (requestingChangesForSample) {
    const sample = currentActivity.find(s => s.id === requestingChangesForSample);
    if (sample) {
      return (
        <RequestChanges
          onBack={() => setRequestingChangesForSample(null)}
          onSubmit={handleChangeRequest}
          darkMode={darkMode}
          sampleId={sample.id}
          currentPackage={sample.testPackage}
          currentAddOns={sample.addOns || []}
          sampleType={sample.sampleType}
          currentSampleName={sample.sampleName}
        />
      );
    }
  }

  // Sample modal handlers
  const handleDeleteSample = (id: string) => {
    if (testingMode === 'feeds') {
      setRecentActivity(prev => prev.filter(s => s.id !== id));
    } else {
      setSoilActivity(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleSampleClick = (id: string, modalKey: string) => {
    setSelectedSampleId(id);
    modals.closeModal(modalKey as any);
    window.scrollTo(0, 0);
  };

  const handleEditNameChange = (id: string, name: string) => {
    setEditedSampleNames(prev => ({ ...(prev || {}), [id]: name }));
  };

  // If not logged in, show login page
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  // If in lab view mode, show the Lab Admin Portal
  if (viewMode === 'lab') {
    return <LabAdminPortal onBack={() => setViewMode('client')} darkMode={darkMode} />;
  }

  // If viewing account balance, render that instead
  if (modals.showAccountBalance) {
    return <AccountBalance onBack={() => modals.closeModal('showAccountBalance')} darkMode={darkMode} farmName={selectedFarm} />;
  }

  // If viewing bulk submission page, render that instead
  if (modals.showBulkSubmission) {
    return <BulkSampleSubmission onClose={() => modals.closeModal('showBulkSubmission')} testingMode={testingMode} />;
  }

  // If viewing What is NIR page, render that instead
  if (showWhatIsNIR) {
    return <WhatIsNIR onClose={() => setShowWhatIsNIR(false)} darkMode={darkMode} />;
  }

  // If viewing testing menu, render that instead
  if (showTestingMenu) {
    return <TestingMenuModal 
      onClose={() => setShowTestingMenu(false)} 
      darkMode={darkMode} 
      testingMode={testingMode}
      onOpenCustomPackages={() => {
        setShowTestingMenu(false);
        setShowCustomPackages(true);
      }}
    />;
  }

  // If viewing custom packages page, render that instead
  if (showCustomPackages) {
    return <CustomPackages 
      onClose={() => setShowCustomPackages(false)} 
      darkMode={darkMode} 
      selectedFarm={selectedFarm}
      savedPackages={customPackages[selectedFarm] || []}
      onSavePackage={(pkg) => {
        setCustomPackages(prev => ({
          ...(prev || {}),
          [selectedFarm]: [...((prev || {})[selectedFarm] || []), pkg]
        }));
      }}
      onDeletePackage={(pkgId) => {
        setCustomPackages(prev => ({
          ...(prev || {}),
          [selectedFarm]: ((prev || {})[selectedFarm] || []).filter(p => p.id !== pkgId)
        }));
      }}
    />;
  }

  // If viewing API Access, render that instead
  if (showAPIAccess) {
    return <APIAccess onBack={() => setShowAPIAccess(false)} darkMode={darkMode} farmName={selectedFarm} />;
  }

  // If viewing Payment Portal, render that instead  
  if (showPaymentPortal) {
    return <PaymentPortal onBack={() => setShowPaymentPortal(false)} darkMode={darkMode} farmName={selectedFarm} />;
  }

  // If viewing info pages, render those instead
  if (infoPage === 'aboutUs') {
    return <AboutUs onClose={() => setInfoPage(null)} />;
  }
  if (infoPage === 'careers') {
    return <Careers onClose={() => setInfoPage(null)} />;
  }
  if (infoPage === 'growWithUs') {
    return <GrowWithUs onClose={() => setInfoPage(null)} />;
  }
  if (infoPage === 'industryNews') {
    return <IndustryNews onClose={() => setInfoPage(null)} testingMode={testingMode} />;
  }
  if (infoPage === 'samplingInstructions') {
    return <SamplingInstructions onClose={() => setInfoPage(null)} testingMode={testingMode} />;
  }
  if (infoPage === 'rivet') {
    return <RivetApplications onClose={() => setInfoPage(null)} darkMode={darkMode} />;
  }

  // Store reference to selected sample for use in rendering
  const selectedSample = selectedSampleId ? currentActivity.find(s => s.id === selectedSampleId) : null;

  // If org settings is shown, render that instead
  if (modals.showTeamSettings) {
    return <TeamSettings onBack={() => modals.closeModal('showTeamSettings')} darkMode={darkMode} selectedFarm={selectedFarm} />;
  }

  // If account settings is shown, render that instead
  if (modals.showAccountSettings) {
    return <AccountSettings onBack={() => modals.closeModal('showAccountSettings')} darkMode={darkMode} currentUser={currentUser} />;
  }

  // Show trends metrics dashboard
  if (currentView === 'trends') {
    return <Suspense fallback={<div>Loading...</div>}>
      <TrendsMetricsDashboard 
        onBack={() => setCurrentView('dashboard')} 
        darkMode={darkMode}
        selectedFarm={selectedFarm}
        projects={getProjectsWithCounts(selectedFarm)}
        projectSampleAssignments={projectSampleAssignments}
        sampleData={recentActivity}
      />
    </Suspense>;
  }

  // Use theme utility for consistent styling
  const theme = getThemeClasses(darkMode);
  const {
    bgColor,
    navBg,
    navBorder,
    textPrimary,
    textSecondary,
    textTertiary,
    navTextPrimary,
    navTextSecondary,
    navTextTertiary,
    cardBg,
    cardBorder,
    hoverBg,
    hoverItemBg,
    navHoverBg,
    divideBorder,
    inputBg,
    inputBorder,
  } = theme;

  return (
    <div className={`min-h-screen ${bgColor}`} style={{ minHeight: '100vh', overflowY: 'scroll' }}>
      <Header
        headerTheme={headerTheme}
        isScrolled={isScrolled}
        modals={modals}
        selectedSampleId={selectedSampleId}
        onResetView={handleResetView}
        setSearchQuery={setSearchQuery}
        setSelectMode={setSelectMode}
        setSelectedSamples={setSelectedSamples}
        setInfoPage={setInfoPage}
        setShowTestingMenu={setShowTestingMenu}
        setShowCustomPackages={setShowCustomPackages}
        setShowWhatIsNIR={setShowWhatIsNIR}
        setShowDropboxMap={setShowDropboxMap}
        setShowAPIAccess={setShowAPIAccess}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Main Content */}
      <main className="px-3 sm:px-4 md:px-6 py-4 md:py-6 pb-24 md:pb-24 max-w-5xl mx-auto">
        {selectedSampleId ? (
          <SampleResults 
            sampleId={selectedSampleId} 
            sampleName={selectedSample?.sampleName || ''} 
            bagLabelId={selectedSample?.bagLabelId || ''}
            testPackage={selectedSample?.testPackage || 'Nutritionist Select'}
            sampleType={selectedSample?.sampleType || 'Corn Silage'}
            addOns={selectedSample?.addOns || []}
            testingMode={testingMode}
            sampleStatus={selectedSample?.status || 'completed'}
            availableProjects={testingMode === 'feeds' ? getProjectsWithCounts(selectedFarm) : []}
            currentProjectId={testingMode === 'feeds' ? getProjectsForSample(selectedSampleId, projectSampleAssignments) : null}
            onProjectAssign={(projectIds) => assignSampleToProjects(selectedSampleId, projectIds)}
            createdDate={selectedSample?.timestamp || 'Just now'}
            pendingTests={selectedSample?.pendingTests || []}
            completedTests={selectedSample?.completedTests || []}
            onBack={() => {
              setSelectedSampleId(null);
              setSelectedSampleName('');
            }} 
            darkMode={darkMode} 
          />
        ) : (
          <>
            {/* Mobile Feeds/Soil Toggle - Only visible on mobile (Cannabis in Dark Mode) */}
            <div className="md:hidden mb-4">
          {headerTheme === 'grey' ? (
            <div className={`flex items-center justify-center bg-gray-900 rounded-full p-1 border ${inputBorder}`}>
              <button
                onClick={() => {
                  setCannabisMode('cannabis');
                  setSearchQuery('');
                  setSelectMode(false);
                  setSelectedSamples(new Set());
                }}
                className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  cannabisMode === 'cannabis'
                    ? 'bg-[#3a3a3a] text-white shadow-lg'
                    : `${navTextSecondary} hover:${navTextPrimary}`
                }`}
              >
                <span className="flex items-center justify-center gap-1.5">
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
                className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  cannabisMode === 'hemp'
                    ? 'bg-yellow-500 text-black shadow-lg'
                    : `${navTextSecondary} hover:${navTextPrimary}`
                }`}
              >
                <span className="flex items-center justify-center gap-1.5">
                  <span>Vitamin E Acetate</span>
                </span>
              </button>
            </div>
          ) : (
            <div className={`flex items-center justify-center bg-gray-900 rounded-full p-1 border ${inputBorder}`}>
              <button
                onClick={() => {
                  setTestingMode('feeds');
                  setSearchQuery('');
                  setSelectMode(false);
                  setSelectedSamples(new Set());
                }}
                className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  testingMode === 'feeds'
                    ? 'bg-[#2d7a3e] text-white shadow-lg'
                    : `${navTextSecondary} hover:${navTextPrimary}`
                }`}
              >
                <span className="flex items-center justify-center gap-1.5">
                  <Wheat className="size-4" />
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
                className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  testingMode === 'soil'
                    ? 'bg-[#411900] text-white shadow-lg'
                    : `${navTextSecondary} hover:${navTextPrimary}`
                }`}
              >
                <span className="flex items-center justify-center gap-1.5">
                  <Sprout className="size-4" />
                  <span>Soil</span>
                </span>
              </button>
            </div>
          )}
        </div>
        
        {/* Status Summary Card */}
        <StatusSummaryCard
          selectedFarm={selectedFarm}
          stats={stats}
          darkMode={darkMode}
          headerTheme={headerTheme}
          testingMode={testingMode}
          onPendingClick={() => modals.openModal('showPendingArrivalModal')}
          onInProcessClick={() => modals.openModal('showInProcessModal')}
          onPartiallyCompleteClick={() => modals.openModal('showPartiallyCompleteModal')}
          onCompletedClick={() => modals.openModal('showCompletedThisWeekModal')}
          availableFarms={headerTheme === 'grey' ? ['Scott Tindall'] : currentUser.farms.filter(farm => farm !== 'Scott Tindall')}
          onFarmChange={setSelectedFarm}
          onManageOrgClick={() => modals.openModal('showTeamSettings')}
          userRole={currentUser.roles[selectedFarm as keyof typeof currentUser.roles]}
        />

        {/* Sample History Section */}
        <div className={`${cardBg} ${cardBorder} rounded-xl md:rounded-2xl overflow-hidden border-l-8 ${
          headerTheme === 'grey' 
            ? 'border-l-black' 
            : (testingMode === 'feeds' ? 'border-l-[#1f5527]' : 'border-l-[#411900]')
        }`}>
          <div className={`px-3 sm:px-4 md:px-5 py-3 md:py-4 ${darkMode ? 'border-b border-[#2C2C2C]' : 'border-b border-gray-100'} sticky top-0 ${cardBg} z-30`}>
            <div className="flex items-center justify-between mb-3">
              {testingMode === 'feeds' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSampleProjectView('samples')}
                    className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-semibold text-sm md:text-base transition-all ${
                      sampleProjectView === 'samples'
                        ? (headerTheme === 'grey' ? 'bg-[#8DC63F] text-white' : 'bg-[#2d7a3e] text-white')
                        : darkMode
                          ? 'text-[#909090] hover:text-[#C0C0C0]'
                          : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Samples
                  </button>
                  <button
                    onClick={() => setSampleProjectView('projects')}
                    className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-semibold text-sm md:text-base transition-all ${
                      sampleProjectView === 'projects'
                        ? (headerTheme === 'grey' ? 'bg-[#8DC63F] text-white' : 'bg-[#2d7a3e] text-white')
                        : darkMode
                          ? 'text-[#909090] hover:text-[#C0C0C0]'
                          : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Projects
                  </button>
                </div>
              ) : (
                <h3 className={`text-base md:text-lg font-semibold ${textPrimary}`}>
                  Soil Sample History
                </h3>
              )}
              
              {/* Download Button - Only show for samples view */}
              {(testingMode === 'soil' || sampleProjectView === 'samples') && (
                <button
                  onClick={() => modals.openModal('showBulkDownloadModal')}
                  className={`flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 ${hoverBg} rounded-lg transition-colors`}
                >
                  <Download className={`size-4 md:size-5 ${textSecondary}`} />
                  <span className={`text-xs md:text-sm font-medium ${textSecondary} hidden sm:inline`}>Download</span>
                </button>
              )}
            </div>
            
            {/* Search Bar and Filter - Only show for samples view */}
            {(testingMode === 'soil' || sampleProjectView === 'samples') && (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className={`size-4 md:size-5 ${textTertiary} absolute left-2 md:left-3 top-1/2 -translate-y-1/2`} />
                <input
                  type="text"
                  placeholder={`Search ${testingMode === 'feeds' ? 'feed' : 'soil'} samples...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full ${inputBg} border ${inputBorder} rounded-lg pl-8 md:pl-10 pr-8 md:pr-10 py-2 md:py-2.5 text-sm ${textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'} transition-all`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className={`absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-1 ${hoverBg} rounded-full transition-colors`}
                  >
                    <X className={`size-3 md:size-4 ${textTertiary}`} />
                  </button>
                )}
              </div>
              
              {/* Filter Button */}
              <button
                onClick={() => setShowFilterModal(true)}
                className={`relative flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-2 md:py-2.5 ${hoverBg} border ${inputBorder} rounded-lg transition-colors`}
              >
                <Filter className={`size-4 md:size-5 ${textSecondary}`} />
                {activeFilterCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-[#2d7a3e] text-white text-xs font-bold rounded-full size-5 flex items-center justify-center">
                    {activeFilterCount}
                  </div>
                )}
              </button>
            </div>
            )}

            {/* Select Mode Controls */}
            {selectMode && (
              <div className={`mt-3 flex items-center justify-between p-3 ${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-100'} rounded-lg`}>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${textPrimary}`}>
                    {selectedSamples.size} selected
                  </span>
                  {selectedSamples.size > 0 && (
                    <button
                      onClick={deselectAll}
                      className={`text-xs font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={selectAllFiltered}
                    className={`text-xs font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                  >
                    Select All
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  {selectedSamples.size > 0 && (
                    <button
                      onClick={() => modals.openModal('showBulkDownloadModal')}
                      className="px-3 py-1.5 bg-[#2d7a3e] hover:bg-[#246630] text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                    >
                      <Download className="size-4" />
                      Download
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectMode(false);
                      setSelectedSamples(new Set());
                    }}
                    className={`px-3 py-1.5 ${hoverBg} rounded-lg text-xs font-medium ${textSecondary} transition-colors`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Projects View - Only for feeds mode */}
          {testingMode === 'feeds' && sampleProjectView === 'projects' ? (
            selectedProjectId ? (
              <div className="px-3 sm:px-4 md:px-5 py-6">
                <ProjectDetail
                  project={{
                    id: selectedProjectId,
                    name: getAllProjectsForFarm(selectedFarm).find(p => p.id === selectedProjectId)?.name || 'Project',
                    description: getAllProjectsForFarm(selectedFarm).find(p => p.id === selectedProjectId)?.description || '',
                    sampleCount: getSamplesForProject(selectedProjectId, currentActivity, projectSampleAssignments).length,
                    createdDate: getAllProjectsForFarm(selectedFarm).find(p => p.id === selectedProjectId)?.createdDate || new Date().toISOString(),
                    sharedWith: getAllProjectsForFarm(selectedFarm).find(p => p.id === selectedProjectId)?.sharedWith || [],
                    samples: getSamplesForProject(selectedProjectId, currentActivity, projectSampleAssignments).map(s => ({
                      id: s.id,
                      sampleName: s.sampleName,
                      sampleType: s.sampleType,
                      status: s.status as 'completed' | 'processing' | 'intransit' | 'partial',
                      submittedDate: s.createdDate,
                      labNumber: s.bagLabelId
                    }))
                  }}
                  darkMode={darkMode}
                  onBack={() => setSelectedProjectId(null)}
                  onAddSamples={() => {/* TODO */}}
                  onShareProject={(orgs) => {/* TODO */}}
                  onRemoveSample={(sampleId) => {
                    assignSampleToProject(sampleId, null);
                  }}
                  onSampleClick={(sampleId, sampleName) => {
                    setSelectedSampleId(sampleId);
                    setSelectedSampleName(sampleName);
                  }}
                />
              </div>
            ) : (
              <div className="px-3 sm:px-4 md:px-5 py-6">
                <Projects
                  projects={getProjectsWithCounts(selectedFarm)}
                  darkMode={darkMode}
                  onCreateProject={() => setShowProjectCreation(true)}
                  onProjectClick={(projectId) => setSelectedProjectId(projectId)}
                />
              </div>
            )
          ) : testingMode === 'soil' ? (
            // Coming Soon message for Soil mode
            <div className="px-5 py-24 text-center">
              <Sprout className={`size-20 mx-auto mb-6 ${darkMode ? 'text-amber-700/40' : 'text-amber-900/30'}`} />
              <h2 className={`text-3xl md:text-4xl font-bold ${textPrimary} mb-3`}>
                Soil Testing
              </h2>
              <p className={`text-xl ${textSecondary} mb-2`}>
                Coming Soon!
              </p>
              <p className={`text-sm ${textTertiary} max-w-md mx-auto`}>
                We're working on bringing comprehensive soil analysis capabilities to your dashboard.
              </p>
            </div>
          ) : (
            <SampleList
              activity={headerTheme === 'grey' ? [] : displayedActivity}
              testingMode={testingMode}
              headerTheme={headerTheme}
              darkMode={darkMode}
              selectMode={selectMode}
              selectedSamples={selectedSamples}
              hasMore={hasMore}
              onToggleSelection={toggleSampleSelection}
              onSelectSample={(id) => {
                setSelectedSampleId(id);
                window.scrollTo(0, 0);
              }}
              onRequestChanges={(id) => setRequestingChangesForSample(id)}
              onCheckStatus={(id) => setModifyingSampleId(id)}
            />
          )}
        </div>
          </>
        )}
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-30 flex flex-col items-end gap-3 md:gap-4">
        {/* Chat with Lab Team Button - Circular Expanding - Hidden in cannabis mode */}
        {headerTheme !== 'grey' && (
          <button 
            onClick={() => alert('Live chat would open here. Average response time: 3 minutes')}
            className={`group h-16 sm:h-20 md:h-24 ${darkMode ? 'bg-[#2A2A2A] hover:bg-[#333333] border-[#3C3C3C]' : 'bg-white hover:bg-gray-50 border-gray-300'} border-2 rounded-full shadow-2xl transition-all duration-300 ease-in-out md:hover:w-72 md:hover:rounded-2xl w-16 sm:w-20 md:w-24 flex items-center overflow-hidden`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" strokeWidth={2.5} style={{ color: darkMode ? '#E8E8E8' : '#1a1a1a', stroke: darkMode ? '#E8E8E8' : '#1a1a1a', fill: 'none' }} />
            </div>
            <div className="w-0 group-hover:w-auto opacity-0 group-hover:opacity-100 transition-all duration-300 pr-6 hidden md:flex flex-col items-start justify-center overflow-hidden whitespace-nowrap">
              <div className={`font-bold text-base ${darkMode ? 'text-[#E8E8E8]' : 'text-gray-900'}`}>Chat with Our</div>
              <div className={`font-bold text-base ${darkMode ? 'text-[#E8E8E8]' : 'text-gray-900'}`}>Lab Team</div>
              <div className={`text-sm ${darkMode ? 'text-[#C0C0C0]' : 'text-gray-600'}`}>~3 min response</div>
            </div>
          </button>
        )}
        
        {/* Submit Sample Button - Circular Expanding - Only show for feeds mode */}
        {testingMode === 'feeds' && (
          <button 
            onClick={() => headerTheme !== 'grey' && modals.openModal('showIntakeFlow')}
            className={`group h-16 sm:h-20 md:h-24 ${
              headerTheme === 'grey' 
                ? 'bg-[#8DC63F] hover:bg-[#8DC63F] cursor-not-allowed' 
                : 'bg-[#F7DC6F] hover:bg-[#F4D03F]'
            } rounded-full shadow-2xl transition-all duration-300 ease-in-out ${headerTheme === 'grey' ? 'md:hover:w-80' : 'md:hover:w-56'} md:hover:rounded-2xl w-16 sm:w-20 md:w-24 flex items-center justify-center overflow-hidden`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center flex-shrink-0">
              <Plus className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 md:group-hover:opacity-0 transition-opacity duration-300" strokeWidth={2.5} style={{ color: headerTheme === 'grey' ? '#ffffff' : '#1a1a1a', stroke: headerTheme === 'grey' ? '#ffffff' : '#1a1a1a', fill: 'none' }} />
            </div>
            <span className={`font-bold text-xl ${headerTheme === 'grey' ? 'text-white' : 'text-gray-900'} whitespace-nowrap w-0 group-hover:w-auto opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:inline overflow-hidden absolute left-6`}>
              {headerTheme === 'grey' ? 'No New Samples Allowed' : 'New Feed Sample'}
            </span>
          </button>
        )}
      </div>

      <ModalContainer 
        modals={modals}
        handleSubmitSamples={handleSubmitSamples}
        testingMode={testingMode}
        selectedFarm={selectedFarm}
        projects={getProjectsWithCounts(selectedFarm)}
        onProjectAssign={assignSampleToProject}
        onShowDropboxMap={() => setShowDropboxMap(true)}
        onShowCustomPackages={() => setShowCustomPackages(true)}
        customPackages={customPackages[selectedFarm] || []}
        headerTheme={headerTheme}
        showDropboxMap={showDropboxMap}
        setShowDropboxMap={setShowDropboxMap}
        handleBulkDownload={handleBulkDownload}
        handleDownloadAll={handleDownloadAll}
        selectedSamples={selectedSamples}
        selectMode={selectMode}
        setSelectMode={setSelectMode}
        currentActivity={currentActivity}
        editingSampleId={editingSampleId}
        editedSampleNames={editedSampleNames}
        handleStartEditSampleName={handleStartEditSampleName}
        handleSaveSampleName={handleSaveSampleName}
        handleCancelEditSampleName={handleCancelEditSampleName}
        handleEditNameChange={handleEditNameChange}
        handleDeleteSample={handleDeleteSample}
        handleSampleClick={handleSampleClick}
      />

      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        darkMode={darkMode}
        testingMode={testingMode}
        activeFilterCount={activeFilterCount}
        headerTheme={headerTheme}
      />

      {/* Floating Dark Mode Toggle - Only shows when scrolled */}
      {showFloatingDarkMode && (
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`fixed right-4 md:right-6 top-4 md:top-6 p-3 md:p-4 ${darkMode ? 'bg-[#3A3A3A]' : 'bg-white'} ${darkMode ? 'border border-[#4A4A4A]' : 'shadow-lg border border-gray-200'} rounded-full transition-all hover:scale-110 z-40`}
          aria-label="Toggle dark mode"
          style={{
            boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.15)'
          }}
        >
          {darkMode ? (
            <Sun className={`size-5 md:size-6 text-yellow-400`} />
          ) : (
            <Moon className={`size-5 md:size-6 text-gray-700`} />
          )}
        </button>
      )}

      {/* Switch to Lab View Button - Fixed bottom left - Hidden on mobile - Not shown in cannabis mode */}
      {headerTheme !== 'grey' && viewMode === 'client' && (
        <button
          onClick={() => setViewMode(viewMode === 'client' ? 'lab' : 'client')}
          className={`hidden md:flex fixed bottom-16 left-6 items-center justify-center px-3 py-3 ${
            darkMode ? 'bg-[#252525] hover:bg-[#2C2C2C] text-[#E0E0E0] border-[#3C3C3C]' : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
          } border rounded-full shadow-lg transition-all duration-300 z-40 group hover:justify-start hover:gap-2 hover:px-4`}
          aria-label="Switch to lab view"
        >
          <Eye className="size-5 flex-shrink-0" />
          <span className="text-sm font-medium max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
            Switch to Lab View
          </span>
        </button>
      )}

      {/* Egg Button - Fixed position floating beneath the eyeball - Always visible in client mode */}
      {viewMode === 'client' && (
        <button
          onClick={() => setHeaderTheme(headerTheme === 'blue' ? 'grey' : 'blue')}
          className={`hidden md:flex fixed bottom-6 left-6 items-center justify-center px-3 py-3 z-40 opacity-60 hover:opacity-100 transition-all duration-200 ${darkMode ? 'text-gray-400' : 'text-gray-600'} group`}
          aria-label="Toggle cannabis mode"
        >
          <Egg className="size-5 flex-shrink-0" />
          <span className="absolute -top-1 -right-1 text-red-500 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            ?
          </span>
        </button>
      )}
    </div>
  );
}

// Wrapper component that provides context
export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}