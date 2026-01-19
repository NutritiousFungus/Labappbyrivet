import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Users, 
  Eye,
  User,
  FlaskConical
} from 'lucide-react';
import logoImage from 'figma:asset/70a773257adca7df2225bb5f63c4e668abae4133.png';
import { ClientMessage } from '@/app/data/labMockData';
import { AdminSection } from './lab/types';
import { LabHome } from './lab/LabHome';
import { LabClientComms } from './lab/LabClientComms';
import { LabChat } from './lab/LabChat';
import { LabTestView } from './lab/LabTestView';
import { LabShipping } from './lab/LabShipping';
import { LabUploadResults } from './lab/LabUploadResults';
import { LabSupplyOrders } from './lab/LabSupplyOrders';
import { LabDriverRoutes } from './lab/LabDriverRoutes';
import { LabManageProjects } from './lab/LabManageProjects';
import { LabManagement } from './lab/LabManagement';

interface LabAdminPortalProps {
  onBack: () => void;
  darkMode: boolean;
}

export function LabAdminPortal({ onBack, darkMode }: LabAdminPortalProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>('home');
  const [selectedMessage, setSelectedMessage] = useState<ClientMessage | null>(null);
  
  // Client comms assignment state (lifted up to share between Comms list and Chat)
  const [messageAssignments, setMessageAssignments] = useState<Record<number, string>>({});
  
  // Header theme state (only blue supported in lab view mostly)
  const [headerTheme, setHeaderTheme] = useState<'blue' | 'grey'>('blue');
  
  // Lab team members
  const labTeamMembers = [
    'Sarah Mitchell',
    'James Rodriguez',
    'Emily Thompson',
    'Michael Chen',
    'Rachel Anderson',
    'David Park',
  ];

  // Theme classes - memoized for performance
  const themeClasses = useMemo(() => ({
    bgColor: darkMode ? 'bg-[#181818]' : 'bg-stone-300',
    hoverBg: darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-50'
  }), [darkMode]);

  const { bgColor } = themeClasses;

  const handleAssignMessage = (messageId: number, assignee: string) => {
    setMessageAssignments(prev => ({
      ...prev,
      [messageId]: assignee
    }));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <LabHome darkMode={darkMode} setActiveSection={setActiveSection} />;
      
      case 'client-comms':
        return (
          <LabClientComms 
            darkMode={darkMode} 
            setActiveSection={setActiveSection}
            setSelectedMessage={setSelectedMessage}
            messageAssignments={messageAssignments}
            onAssignMessage={handleAssignMessage}
            labTeamMembers={labTeamMembers}
          />
        );
      
      case 'chat':
        if (!selectedMessage) return <LabHome darkMode={darkMode} setActiveSection={setActiveSection} />;
        return (
          <LabChat 
            darkMode={darkMode}
            selectedMessage={selectedMessage}
            onBack={() => {
              setActiveSection('client-comms');
              setSelectedMessage(null);
            }}
            messageAssignments={messageAssignments}
            onAssignMessage={handleAssignMessage}
            labTeamMembers={labTeamMembers}
          />
        );
      
      case 'test-view':
        return <LabTestView darkMode={darkMode} setActiveSection={setActiveSection} />;
      
      case 'shipping':
        return <LabShipping darkMode={darkMode} setActiveSection={setActiveSection} />;
      
      case 'upload-results':
        return <LabUploadResults darkMode={darkMode} setActiveSection={setActiveSection} />;
      
      case 'supply-orders':
        return <LabSupplyOrders darkMode={darkMode} setActiveSection={setActiveSection} />;
      
      case 'driver-routes':
        return <LabDriverRoutes darkMode={darkMode} setActiveSection={setActiveSection} />;
      
      case 'manage-projects':
        return <LabManageProjects darkMode={darkMode} setActiveSection={setActiveSection} />;
      
      case 'manage-lab-users':
        return (
          <LabManagement 
            darkMode={darkMode}
            setActiveSection={setActiveSection}
            title="Manage Lab Users"
            icon={Users}
            addButtonText="Add Lab User"
            data={labTeamMembers.map((name, i) => ({
              Name: name,
              Role: i < 2 ? 'Manager' : 'Technician',
              Status: 'Active',
              'Last Login': 'Today'
            }))}
          />
        );

      case 'manage-orgs':
        const orgData = darkMode ? [
          { Name: 'Green Leaf Cultivators', Type: 'Cannabis Grower', Users: 3, 'Total Samples': 0, Status: 'Active', 'Account Manager': 'Sarah Mitchell' },
        ] : [
          { Name: 'Goeser\'s Grazers', Type: 'Dairy Farm', Users: 12, 'Total Samples': 847, Status: 'Active', 'Account Manager': 'Sarah Mitchell' },
          { Name: 'Friendly Illinois Brothers', Type: 'Dairy Farm', Users: 18, 'Total Samples': 1203, Status: 'Active', 'Account Manager': 'James Rodriguez' },
          { Name: 'Standard Dairy Consultants', Type: 'Consulting', Users: 8, 'Total Samples': 564, Status: 'Active', 'Account Manager': 'Emily Thompson' },
          { Name: 'Sunset Dairy', Type: 'Dairy Farm', Users: 8, 'Total Samples': 429, Status: 'Active', 'Account Manager': 'Sarah Mitchell' },
          { Name: 'Green Valley Farms', Type: 'Crop Farm', Users: 5, 'Total Samples': 312, Status: 'Active', 'Account Manager': 'Michael Chen' },
          { Name: 'Meadow View Farms', Type: 'Dairy Farm', Users: 14, 'Total Samples': 695, Status: 'Active', 'Account Manager': 'Rachel Anderson' },
          { Name: 'Heritage Dairy Co', Type: 'Dairy Farm', Users: 22, 'Total Samples': 1456, Status: 'Active', 'Account Manager': 'David Park' },
          { Name: 'Rolling Hills Ranch', Type: 'Beef', Users: 6, 'Total Samples': 187, Status: 'Active', 'Account Manager': 'Emily Thompson' },
          { Name: 'Prairie View Ag', Type: 'Crop Farm', Users: 9, 'Total Samples': 423, Status: 'Active', 'Account Manager': 'James Rodriguez' },
          { Name: 'Lakeside Dairy', Type: 'Dairy Farm', Users: 11, 'Total Samples': 578, Status: 'Active', 'Account Manager': 'Sarah Mitchell' },
          { Name: 'Riverside Consulting', Type: 'Consulting', Users: 15, 'Total Samples': 892, Status: 'Active', 'Account Manager': 'Michael Chen' },
          { Name: 'Mountain Peak Farms', Type: 'Dairy Farm', Users: 7, 'Total Samples': 234, Status: 'Active', 'Account Manager': 'Rachel Anderson' },
          { Name: 'Cloverfield Dairy', Type: 'Dairy Farm', Users: 13, 'Total Samples': 721, Status: 'Active', 'Account Manager': 'David Park' },
          { Name: 'Oakwood Ag Services', Type: 'Consulting', Users: 19, 'Total Samples': 1034, Status: 'Active', 'Account Manager': 'Emily Thompson' },
          { Name: 'Willow Creek Ranch', Type: 'Beef', Users: 4, 'Total Samples': 156, Status: 'Active', 'Account Manager': 'James Rodriguez' },
        ];
        return (
          <LabManagement 
            darkMode={darkMode}
            setActiveSection={setActiveSection}
            title="Manage Organizations"
            icon={Building2}
            addButtonText="Add Organization"
            data={orgData}
          />
        );

      case 'manage-users':
        const userData = [
          { Name: 'John Smith', Email: 'john@example.com', Role: 'Admin', Organization: 'Goeser\'s Grazers', 'Last Login': '2 hours ago', Status: 'Active' },
          { Name: 'Sarah Johnson', Email: 'sarah@example.com', Role: 'Manager', Organization: 'Friendly Illinois Brothers', 'Last Login': '1 day ago', Status: 'Active' },
          { Name: 'Mike Davis', Email: 'mike@example.com', Role: 'User', Organization: 'Standard Dairy Consultants', 'Last Login': '3 hours ago', Status: 'Active' },
          { Name: 'Emily Rodriguez', Email: 'emily.r@sunset.com', Role: 'Admin', Organization: 'Sunset Dairy', 'Last Login': '5 hours ago', Status: 'Active' },
          { Name: 'James Wilson', Email: 'james.w@greenvalley.com', Role: 'User', Organization: 'Green Valley Farms', 'Last Login': '2 days ago', Status: 'Active' },
          { Name: 'Lisa Anderson', Email: 'lisa@meadowview.com', Role: 'Manager', Organization: 'Meadow View Farms', 'Last Login': '4 hours ago', Status: 'Active' },
          { Name: 'Robert Taylor', Email: 'robert.t@heritage.com', Role: 'Admin', Organization: 'Heritage Dairy Co', 'Last Login': '1 hour ago', Status: 'Active' },
          { Name: 'Jennifer Brown', Email: 'jen.brown@rolling.com', Role: 'User', Organization: 'Rolling Hills Ranch', 'Last Login': '6 hours ago', Status: 'Active' },
          { Name: 'David Martinez', Email: 'david@prairieview.com', Role: 'Manager', Organization: 'Prairie View Ag', 'Last Login': '3 days ago', Status: 'Active' },
          { Name: 'Susan Lee', Email: 'susan@lakeside.com', Role: 'Admin', Organization: 'Lakeside Dairy', 'Last Login': '12 hours ago', Status: 'Active' },
          { Name: 'Thomas Garcia', Email: 'thomas@riverside.com', Role: 'Manager', Organization: 'Riverside Consulting', 'Last Login': '8 hours ago', Status: 'Active' },
          { Name: 'Patricia White', Email: 'pat@mountainpeak.com', Role: 'User', Organization: 'Mountain Peak Farms', 'Last Login': '1 day ago', Status: 'Active' },
          { Name: 'Christopher Moore', Email: 'chris@cloverfield.com', Role: 'Admin', Organization: 'Cloverfield Dairy', 'Last Login': '2 hours ago', Status: 'Active' },
          { Name: 'Amanda Thompson', Email: 'amanda@oakwood.com', Role: 'Manager', Organization: 'Oakwood Ag Services', 'Last Login': '5 hours ago', Status: 'Active' },
          { Name: 'Daniel Jackson', Email: 'daniel@willow.com', Role: 'User', Organization: 'Willow Creek Ranch', 'Last Login': '4 days ago', Status: 'Active' },
          { Name: 'Michelle Harris', Email: 'michelle@example.com', Role: 'User', Organization: 'Goeser\'s Grazers', 'Last Login': '7 hours ago', Status: 'Active' },
          { Name: 'Kevin Clark', Email: 'kevin@example.com', Role: 'Manager', Organization: 'Sunset Dairy', 'Last Login': '1 day ago', Status: 'Active' },
          { Name: 'Nancy Lewis', Email: 'nancy@example.com', Role: 'Admin', Organization: 'Green Valley Farms', 'Last Login': '3 hours ago', Status: 'Active' },
        ];
        return (
          <LabManagement 
            darkMode={darkMode}
            setActiveSection={setActiveSection}
            title="Manage Customer User Accounts"
            icon={Users}
            addButtonText="Add User"
            data={userData}
          />
        );

      default:
        return <LabHome darkMode={darkMode} setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className={`min-h-screen ${bgColor}`} style={{ overflowY: 'scroll' }}>
      {/* Blue Rock River Header */}
      <nav 
        className={`${darkMode ? 'bg-[#252525] border-b border-[#2C2C2C]' : headerTheme === 'blue' ? 'bg-[#1e3a5f]' : 'bg-[#2a2a2a]'} py-3 md:py-5 sticky top-0 z-50`}
        style={darkMode ? {} : {
          backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,.25) 0%, transparent 50%, rgba(0,0,0,.35) 100%)',
          boxShadow: 'inset 0 2px 0 rgba(255,255,255,.25), 0 4px 12px rgba(0,0,0,.3)',
        }}
      >
        <div className="px-3 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo - Left Side */}
            <div className="flex items-center gap-2 md:gap-3">
              <img 
                src={logoImage}
                alt="Laboratory Logo"
                className="h-16 md:h-24 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setActiveSection('home')}
              />
            </div>

            {/* User Info - Top Right */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className={`text-sm font-semibold ${darkMode ? 'text-[#E0E0E0]' : 'text-white'}`}>
                  Austin Russell
                </div>
                <div className={`text-xs ${darkMode ? 'text-[#C0C0C0]' : 'text-gray-200'}`}>
                  Lab Manager • Watertown, WI
                </div>
              </div>
              <div className={`size-10 rounded-full ${darkMode ? 'bg-[#2C2C2C]' : 'bg-white/20'} flex items-center justify-center`}>
                <User className={`size-5 ${darkMode ? 'text-[#E0E0E0]' : 'text-white'}`} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-6">
        {renderContent()}
      </main>

      {/* Switch to Client View Button - Fixed bottom left - Hidden on mobile */}
      <button
        onClick={onBack}
        className={`hidden md:flex fixed bottom-16 left-6 items-center justify-center px-3 py-3 ${
          darkMode ? 'bg-[#252525] hover:bg-[#2C2C2C] text-[#E0E0E0] border-[#3C3C3C]' : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
        } border rounded-full shadow-lg transition-all duration-300 z-40 group hover:justify-start hover:gap-2 hover:px-4`}
        aria-label="Switch to client view"
      >
        <Eye className="size-5 flex-shrink-0" />
        <span className="text-sm font-medium max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
          Switch to Client View
        </span>
      </button>
    </div>
  );
}
