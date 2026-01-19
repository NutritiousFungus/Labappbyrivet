import { useState } from 'react';
import { Settings, Home, Plus, User, Leaf, Droplet, ArrowLeft, Moon, Sun } from 'lucide-react';
import { GenericLabLogo } from '@/app/components/GenericLabLogo';
import { SampleResults } from '@/app/components/SampleResults';

interface DarkModeDashboardProps {
  onBack: () => void;
}

interface Sample {
  id: string;
  type: 'corn-silage' | 'water-quality' | 'tissue-analysis' | 'hay';
  status: 'in-transit' | 'processing' | 'completed';
  date: string;
}

export function DarkModeDashboard({ onBack }: DarkModeDashboardProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'submit' | 'account'>('home');
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);

  // If viewing sample results, show that instead
  if (selectedSampleId) {
    const selectedSample = samples.find(s => s.id === selectedSampleId);
    return (
      <SampleResults 
        sampleId={selectedSampleId} 
        onBack={() => setSelectedSampleId(null)}
        testPackage="Nutritionist Select"
        sampleType={selectedSample?.type === 'corn-silage' ? 'Corn Silage' : selectedSample?.type === 'hay' ? 'Hay' : 'Tissue Analysis'}
        darkMode={true}
        sampleStatus={selectedSample?.status === 'processing' ? 'partial' : 'completed'}
        testingMode="feeds"
        pendingTests={selectedSample?.status === 'processing' ? ['Starch', 'Sugar', 'Minerals'] : []}
        completedTests={selectedSample?.status === 'processing' ? ['Dry Matter', 'Crude Protein', 'NDF', 'ADF'] : []}
      />
    );
  }

  // Sample data with sequential IDs in descending order
  const samples: Sample[] = [
    { id: '1-652-293', type: 'corn-silage', status: 'completed', date: '2 hours ago' },
    { id: '1-652-292', type: 'tissue-analysis', status: 'processing', date: '5 hours ago' },
    { id: '1-652-291', type: 'water-quality', status: 'in-transit', date: '8 hours ago' },
    { id: '1-652-290', type: 'corn-silage', status: 'completed', date: '1 day ago' },
    { id: '1-652-289', type: 'hay', status: 'completed', date: '1 day ago' },
    { id: '1-652-288', type: 'corn-silage', status: 'processing', date: '2 days ago' },
    { id: '1-652-287', type: 'tissue-analysis', status: 'completed', date: '3 days ago' },
    { id: '1-652-286', type: 'water-quality', status: 'completed', date: '4 days ago' },
  ];

  const getSampleIcon = (type: Sample['type']) => {
    switch (type) {
      case 'corn-silage':
        return (
          <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4M6 12h12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'water-quality':
        return <Droplet className="size-6" strokeWidth={1} />;
      case 'tissue-analysis':
        return <Leaf className="size-6" strokeWidth={1} />;
      case 'hay':
        return (
          <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2v20M7 7v10M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status: Sample['status']) => {
    switch (status) {
      case 'in-transit':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
            In Transit
          </span>
        );
      case 'processing':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300 border border-orange-500/30">
            Processing
          </span>
        );
      case 'completed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
            Completed
          </span>
        );
    }
  };

  const getSampleTypeName = (type: Sample['type']) => {
    switch (type) {
      case 'corn-silage':
        return 'Corn Silage';
      case 'water-quality':
        return 'Water Quality';
      case 'tissue-analysis':
        return 'Tissue Analysis';
      case 'hay':
        return 'Hay/Haylage';
      default:
        return 'Sample';
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 flex flex-col">
      {/* Header */}
      <header className="bg-[#1A1A1A] border-b border-gray-800 sticky top-0 z-20">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Back button for demo */}
            <button
              onClick={onBack}
              className="p-2 hover:bg-[#2C2C2C] rounded-full transition-colors"
            >
              <ArrowLeft className="size-5 text-gray-400" />
            </button>
            {/* Logo - inverted for dark mode */}
            <GenericLabLogo />
            <span className="text-base font-semibold text-gray-100">Laboratory Dashboard</span>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-[#2C2C2C] rounded-full transition-colors relative"
          >
            <Settings className="size-6 text-gray-400" />
          </button>
        </div>

        {/* Settings Dropdown */}
        {showSettings && (
          <div className="absolute right-4 top-16 bg-[#2C2C2C] border border-gray-700 rounded-xl shadow-2xl w-64 overflow-hidden z-30 animate-fade-in">
            <div className="p-4 border-b border-gray-700">
              <h3 className="font-semibold text-gray-100 mb-1">Settings</h3>
              <p className="text-xs text-gray-400">Customize your experience</p>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="size-5 text-gray-400" />
                  <span className="text-sm text-gray-300">Theme</span>
                </div>
                <div className="flex items-center gap-2 bg-[#1A1A1A] rounded-lg p-1 border border-gray-700">
                  <button className="p-1.5 rounded-md text-gray-500">
                    <Sun className="size-4" />
                  </button>
                  <button className="p-1.5 rounded-md bg-gray-700 text-gray-100">
                    <Moon className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 px-4 py-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-100 mb-1">Sample History</h1>
          <p className="text-sm text-gray-400">Track your submitted samples</p>
        </div>

        {/* Sample List */}
        <div className="space-y-3">
          {samples.map((sample) => (
            <button
              key={sample.id}
              className="w-full bg-[#2C2C2C] hover:bg-[#333333] border border-gray-800 rounded-xl p-4 transition-all text-left group"
              onClick={() => setSelectedSampleId(sample.id)}
            >
              <div className="flex items-center gap-4">
                {/* Sample Type Icon */}
                <div className="flex-shrink-0 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                  {getSampleIcon(sample.type)}
                </div>

                {/* Sample Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono font-semibold text-gray-100 text-base">
                      {sample.id}
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-400">{sample.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">
                      {getSampleTypeName(sample.type)}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex-shrink-0">
                  {getStatusBadge(sample.status)}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Load More */}
        <button className="w-full mt-4 py-3 bg-[#2C2C2C] hover:bg-[#333333] border border-gray-800 rounded-xl text-sm text-gray-400 hover:text-gray-300 transition-colors">
          Load More Samples
        </button>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-gray-800 px-4 py-3 shadow-2xl">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {/* Home */}
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition-colors p-2 rounded-lg ${
              activeTab === 'home' ? 'text-gray-100' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Home className="size-6" strokeWidth={activeTab === 'home' ? 2 : 1.5} />
            <span className="text-xs font-medium">Home</span>
          </button>

          {/* Submit - Center with Brand Color */}
          <button
            onClick={() => setActiveTab('submit')}
            className="flex flex-col items-center gap-1 transition-all transform hover:scale-105 active:scale-95 -mt-4"
          >
            <div className="bg-gradient-to-br from-green-600 to-green-700 p-4 rounded-2xl shadow-lg shadow-green-900/50">
              <Plus className="size-7 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-medium text-green-500 mt-1">Submit</span>
          </button>

          {/* Account */}
          <button
            onClick={() => setActiveTab('account')}
            className={`flex flex-col items-center gap-1 transition-colors p-2 rounded-lg ${
              activeTab === 'account' ? 'text-gray-100' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <User className="size-6" strokeWidth={activeTab === 'account' ? 2 : 1.5} />
            <span className="text-xs font-medium">Account</span>
          </button>
        </div>
      </nav>

      {/* Click outside to close settings */}
      {showSettings && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}