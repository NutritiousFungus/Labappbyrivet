import { useState, useMemo } from 'react';
import { ArrowLeft, X, Share2, ChevronDown, Calendar, Wheat, Sprout, Beaker, Package, TrendingUp, TrendingDown, Activity, MapPin, Folder } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, AreaChart, Area, ComposedChart } from 'recharts';
import { Project, SampleHistoryItem } from '@/app/types';

interface TrendsMetricsDashboardProps {
  onBack: () => void;
  darkMode?: boolean;
  selectedFarm: string;
  projects: Project[];
  projectSampleAssignments: Record<string, string[]>;
  sampleData: SampleHistoryItem[];
}

export function TrendsMetricsDashboard({ onBack, darkMode, selectedFarm, projects, projectSampleAssignments, sampleData }: TrendsMetricsDashboardProps) {
  const [selectedOrg, setSelectedOrg] = useState(selectedFarm);
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Corn Silage', 'TMR']);
  const [startDate, setStartDate] = useState('2025-12-01');
  const [endDate, setEndDate] = useState('2026-01-13');
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'project' | 'national'>('project');

  // All sample data with various properties
  const allSamples = useMemo(() => [
    { id: '1-652-293', farm: 'North Pasture', type: 'Corn Silage', date: '2026-01-13', cp: 8.4, ndf: 42.1, starch: 33.2, lignin: 3.1, ash: 4.9, starch7hr: 87.9, ndfd240: 54.8, org: 'Friendly Illinois Brothers' },
    { id: '1-652-290', farm: 'Home Site', type: 'Corn Silage', date: '2026-01-11', cp: 8.3, ndf: 43.2, starch: 32.1, lignin: 3.3, ash: 4.7, starch7hr: 88.1, ndfd240: 55.4, org: 'Friendly Illinois Brothers' },
    { id: '1-652-289', farm: 'North Pasture', type: 'TMR', date: '2026-01-09', cp: 17.2, ndf: 35.8, starch: 24.5, lignin: 4.2, ash: 8.1, starch7hr: 86.5, ndfd240: 52.9, org: 'Friendly Illinois Brothers' },
    { id: '1-652-287', farm: 'Home Site', type: 'Corn Silage', date: '2026-01-07', cp: 8.1, ndf: 42.8, starch: 31.8, lignin: 3.2, ash: 4.8, starch7hr: 87.3, ndfd240: 54.2, org: 'Friendly Illinois Brothers' },
    { id: '1-652-285', farm: 'South Field', type: 'Corn Silage', date: '2026-01-05', cp: 8.0, ndf: 43.5, starch: 30.9, lignin: 3.4, ash: 5.0, starch7hr: 84.8, ndfd240: 51.8, org: 'Friendly Illinois Brothers' },
    { id: '1-652-283', farm: 'North Pasture', type: 'TMR', date: '2026-01-03', cp: 16.8, ndf: 36.2, starch: 25.1, lignin: 4.1, ash: 7.9, starch7hr: 86.1, ndfd240: 53.1, org: 'Friendly Illinois Brothers' },
    { id: '1-652-281', farm: 'Home Site', type: 'Corn Silage', date: '2026-01-01', cp: 7.9, ndf: 42.0, starch: 32.5, lignin: 3.0, ash: 4.6, starch7hr: 85.2, ndfd240: 52.3, org: 'Friendly Illinois Brothers' },
    { id: '1-652-279', farm: 'East Barn', type: 'Hay/Haylage', date: '2025-12-28', cp: 19.5, ndf: 48.3, starch: 2.1, lignin: 6.8, ash: 9.2, starch7hr: 0, ndfd240: 48.9, org: 'Friendly Illinois Brothers' },
    { id: '1-652-277', farm: 'South Field', type: 'Corn Silage', date: '2025-12-24', cp: 7.8, ndf: 41.5, starch: 33.8, lignin: 2.9, ash: 4.5, starch7hr: 89.2, ndfd240: 53.7, org: 'Friendly Illinois Brothers' },
    { id: '1-652-275', farm: 'North Pasture', type: 'TMR', date: '2025-12-20', cp: 17.5, ndf: 34.9, starch: 26.3, lignin: 3.9, ash: 8.3, starch7hr: 87.8, ndfd240: 54.1, org: 'Friendly Illinois Brothers' },
    { id: '1-652-273', farm: 'Home Site', type: 'Grains', date: '2025-12-15', cp: 9.2, ndf: 11.5, starch: 71.3, lignin: 1.2, ash: 1.8, starch7hr: 94.5, ndfd240: 0, org: 'Friendly Illinois Brothers' },
    { id: '1-652-271', farm: 'East Barn', type: 'Corn Silage', date: '2025-12-10', cp: 8.2, ndf: 42.9, starch: 31.2, lignin: 3.3, ash: 4.9, starch7hr: 86.8, ndfd240: 52.5, org: 'Friendly Illinois Brothers' },
    { id: '1-652-269', farm: 'South Field', type: 'Hay/Haylage', date: '2025-12-05', cp: 18.9, ndf: 49.1, starch: 1.8, lignin: 7.1, ash: 9.5, starch7hr: 0, ndfd240: 47.3, org: 'Friendly Illinois Brothers' },
    { id: '1-652-267', farm: 'North Pasture', type: 'TMR', date: '2025-12-01', cp: 16.9, ndf: 35.5, starch: 25.8, lignin: 4.0, ash: 8.0, starch7hr: 86.9, ndfd240: 53.5, org: 'Friendly Illinois Brothers' },
    // Goeser's Grazers samples
    { id: '1-652-265', farm: 'Main Barn', type: 'Corn Silage', date: '2026-01-12', cp: 7.6, ndf: 44.2, starch: 30.5, lignin: 3.5, ash: 5.1, starch7hr: 84.2, ndfd240: 51.2, org: 'Goeser\'s Grazers' },
    { id: '1-652-263', farm: 'West Field', type: 'TMR', date: '2026-01-08', cp: 18.1, ndf: 33.8, starch: 27.2, lignin: 3.8, ash: 8.5, starch7hr: 88.3, ndfd240: 55.8, org: 'Goeser\'s Grazers' },
    // Standard Dairy Consultants samples
    { id: '1-652-261', farm: 'Field A', type: 'Hay/Haylage', date: '2026-01-10', cp: 20.1, ndf: 47.5, starch: 2.3, lignin: 6.5, ash: 9.8, starch7hr: 0, ndfd240: 49.5, org: 'Standard Dairy Consultants' },
  ], []);

  // Get samples for selected project
  const projectSamples = useMemo(() => {
    if (selectedProject === 'all' || viewMode === 'national') {
      return sampleData.filter(s => s.farm === selectedOrg);
    }
    const sampleIds = projectSampleAssignments[selectedProject] || [];
    return sampleData.filter(s => sampleIds.includes(s.id));
  }, [selectedProject, projectSampleAssignments, sampleData, selectedOrg, viewMode]);

  // Filter samples based on selections
  const filteredSamples = useMemo(() => {
    return projectSamples.filter(sample => {
      const matchesLocation = selectedLocation === 'All Locations' || sample.sampleName.includes(selectedLocation);
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(sample.sampleType);
      const now = new Date('2026-01-13T12:00:00');
      const sampleDate = new Date(now);
      sampleDate.setDate(sampleDate.getDate() - (sample.daysAgo || 0));
      const start = new Date(startDate);
      const end = new Date(endDate);
      const matchesDate = sampleDate >= start && sampleDate <= end;
      
      return matchesLocation && matchesType && matchesDate;
    });
  }, [projectSamples, selectedLocation, selectedTypes, startDate, endDate]);

  // Calculate average metrics from filtered samples
  const avgMetrics = useMemo(() => {
    if (filteredSamples.length === 0) {
      return { cp: 0, ndf: 0, starch: 0, lignin: 0, ash: 0, sampleCount: 0 };
    }

    // Use mock values for demo purposes
    const mockValues = {
      'Corn Silage': { cp: 8.2, ndf: 42.5, starch: 32.0, lignin: 3.2, ash: 4.8 },
      'Hay/Haylage': { cp: 19.2, ndf: 48.5, starch: 2.0, lignin: 6.9, ash: 9.3 },
      'TMR': { cp: 17.1, ndf: 35.4, starch: 25.5, lignin: 4.0, ash: 8.1 },
      'Grains/Commodities': { cp: 9.2, ndf: 11.5, starch: 71.3, lignin: 1.2, ash: 1.8 },
    };

    const sampleTypeGroups = filteredSamples.reduce((acc, sample) => {
      acc[sample.sampleType] = (acc[sample.sampleType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totals = Object.entries(sampleTypeGroups).reduce((acc, [type, count]) => {
      const values = mockValues[type as keyof typeof mockValues] || mockValues['Corn Silage'];
      return {
        cp: acc.cp + (values.cp * count),
        ndf: acc.ndf + (values.ndf * count),
        starch: acc.starch + (values.starch * count),
        lignin: acc.lignin + (values.lignin * count),
        ash: acc.ash + (values.ash * count),
      };
    }, { cp: 0, ndf: 0, starch: 0, lignin: 0, ash: 0 });

    const count = filteredSamples.length;
    return {
      cp: parseFloat((totals.cp / count).toFixed(1)),
      ndf: parseFloat((totals.ndf / count).toFixed(1)),
      starch: parseFloat((totals.starch / count).toFixed(1)),
      lignin: parseFloat((totals.lignin / count).toFixed(1)),
      ash: parseFloat((totals.ash / count).toFixed(1)),
      sampleCount: count,
    };
  }, [filteredSamples]);

  // Radar chart data based on filtered samples
  const radarData = useMemo(() => {
    // Benchmarks vary by sample type
    const hasCornSilage = selectedTypes.includes('Corn Silage');
    const hasTMR = selectedTypes.includes('TMR');
    const hasHay = selectedTypes.includes('Hay/Haylage');
    
    let cpBenchmark = 8.0;
    let ndfBenchmark = 42.0;
    let starchBenchmark = 32.0;
    
    if (hasTMR && !hasCornSilage) {
      cpBenchmark = 17.0;
      ndfBenchmark = 35.0;
      starchBenchmark = 25.0;
    } else if (hasHay && !hasCornSilage && !hasTMR) {
      cpBenchmark = 19.0;
      ndfBenchmark = 48.0;
      starchBenchmark = 2.0;
    }
    
    return [
      {
        parameter: 'Crude Protein',
        current: avgMetrics.cp,
        benchmark: cpBenchmark,
        fullMark: hasTMR || hasHay ? 25 : 12,
      },
      {
        parameter: 'NDF',
        current: avgMetrics.ndf,
        benchmark: ndfBenchmark,
        fullMark: 60,
      },
      {
        parameter: 'Starch',
        current: avgMetrics.starch,
        benchmark: starchBenchmark,
        fullMark: hasTMR ? 35 : hasHay ? 5 : 75,
      },
      {
        parameter: 'Lignin',
        current: avgMetrics.lignin,
        benchmark: hasHay ? 6.8 : hasTMR ? 4.0 : 3.2,
        fullMark: 10,
      },
      {
        parameter: 'Ash',
        current: avgMetrics.ash,
        benchmark: hasTMR ? 8.0 : hasHay ? 9.0 : 4.8,
        fullMark: 12,
      },
    ];
  }, [avgMetrics, selectedTypes]);

  // Line chart data based on chronological filtered samples
  const lineData = useMemo(() => {
    const sorted = [...filteredSamples].sort((a, b) => (b.daysAgo || 0) - (a.daysAgo || 0));
    
    const now = new Date('2026-01-13T12:00:00');
    return sorted.slice(0, 10).reverse().map(sample => {
      const sampleDate = new Date(now);
      sampleDate.setDate(sampleDate.getDate() - (sample.daysAgo || 0));
      
      // Mock digestibility values
      const mockDigestibility = {
        'Corn Silage': { starch7hr: 87.5, ndfd240: 53.5, cp: 8.2, ndf: 42.5 },
        'Hay/Haylage': { starch7hr: 0, ndfd240: 48.5, cp: 19.2, ndf: 48.5 },
        'TMR': { starch7hr: 86.8, ndfd240: 53.2, cp: 17.1, ndf: 35.4 },
        'Grains/Commodities': { starch7hr: 94.5, ndfd240: 0, cp: 9.2, ndf: 11.5 },
      };
      
      const values = mockDigestibility[sample.sampleType as keyof typeof mockDigestibility] || mockDigestibility['Corn Silage'];
      
      return {
        date: sampleDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        starch7hr: values.starch7hr || null,
        ndfd240: values.ndfd240 || null,
        cp: values.cp,
        ndf: values.ndf,
      };
    });
  }, [filteredSamples]);

  // Summary statistics
  const summaryStats = useMemo(() => {
    if (filteredSamples.length === 0) {
      return {
        avgCP: 0,
        avgNDF: 0,
        avgStarch: 0,
        cpTrend: 0,
        ndfTrend: 0,
        starchTrend: 0,
      };
    }

    // Simple trend calculation based on sample count change
    const trendVariation = Math.random() * 10 - 5; // Random variation for demo

    return {
      avgCP: avgMetrics.cp,
      avgNDF: avgMetrics.ndf,
      avgStarch: avgMetrics.starch,
      cpTrend: parseFloat((2.3 + trendVariation * 0.1).toFixed(1)),
      ndfTrend: parseFloat((-1.8 + trendVariation * 0.1).toFixed(1)),
      starchTrend: parseFloat((3.5 + trendVariation * 0.1).toFixed(1)),
    };
  }, [filteredSamples, avgMetrics]);

  const sampleTypes = ['Corn Silage', 'TMR', 'Hay/Haylage', 'Grains'];

  const removeType = (type: string) => {
    setSelectedTypes(selectedTypes.filter(t => t !== type));
  };

  const getSampleTypeIcon = (sampleType: string, size: 'small' | 'large' = 'large') => {
    // Return placeholder image with yellow color for all types
    let bgColor = darkMode ? 'bg-yellow-900/20' : 'bg-yellow-100';
    let iconColor = darkMode ? 'text-yellow-400' : 'text-yellow-600';
    let Icon = Wheat;
    
    switch (sampleType) {
      case 'Corn Silage':
        Icon = Wheat;
        break;
      case 'Hay/Haylage':
      case 'Hay':
        Icon = Sprout;
        break;
      case 'TMR':
        Icon = Beaker;
        break;
      case 'Grains/Commodities':
      case 'Grains':
        Icon = Package;
        break;
      default:
        Icon = Wheat;
    }
    
    const boxSize = size === 'small' ? 'size-5' : 'size-6';
    const iconSize = size === 'small' ? 'size-3' : 'size-4';
    
    return (
      <div className={`${boxSize} rounded ${bgColor} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`${iconSize} ${iconColor}`} strokeWidth={1.5} />
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#181818]' : 'bg-stone-200'} ${darkMode ? 'text-[#C0C0C0]' : 'text-gray-800'} flex flex-col`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-[#252525] border-[#2C2C2C]' : 'bg-gray-800 shadow-sm'} border-b sticky top-0 z-20`}>
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className={`p-2 ${darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-700'} rounded-full transition-colors`}
            >
              <ArrowLeft className={`size-5 ${darkMode ? 'text-[#C0C0C0]' : 'text-gray-200'}`} />
            </button>
            <span className={`text-base font-semibold ${darkMode ? 'text-[#E0E0E0]' : 'text-white'}`}>Trends & Metrics</span>
          </div>
          <button className={`px-4 py-2 border ${darkMode ? 'border-[#3C3C3C] text-[#C0C0C0] hover:border-green-600 hover:text-green-500' : 'border-gray-600 text-gray-200 hover:border-green-500 hover:text-green-400'} rounded-lg text-sm transition-all flex items-center gap-2 group`}>
            <Share2 className="size-4" />
            <span>Share</span>
          </button>
        </div>
      </header>

      {/* View Mode Toggle */}
      <div className={`${darkMode ? 'bg-[#1F1F1F] border-[#2C2C2C]' : 'bg-gray-50 border-gray-200'} border-b px-4 py-3`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('project')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'project'
                  ? darkMode ? 'bg-green-700 text-white' : 'bg-green-600 text-white'
                  : darkMode ? 'bg-[#2C2C2C] text-[#909090] hover:text-[#C0C0C0]' : 'bg-white text-gray-600 hover:text-gray-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <Folder className="size-4" />
                Project View
              </span>
            </button>
            <button
              onClick={() => setViewMode('national')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'national'
                  ? darkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'
                  : darkMode ? 'bg-[#2C2C2C] text-[#909090] hover:text-[#C0C0C0]' : 'bg-white text-gray-600 hover:text-gray-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <MapPin className="size-4" />
                National Trends
              </span>
            </button>
          </div>
          {viewMode === 'project' && projects.length > 0 && (
            <div className="flex items-center gap-2">
              <label className={`text-xs ${darkMode ? 'text-[#909090]' : 'text-gray-600'}`}>Project:</label>
              <div className="relative">
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className={`${darkMode ? 'bg-[#1A1A1A] border-[#3C3C3C] text-[#C0C0C0] focus:border-[#505050]' : 'bg-white border-gray-300 text-gray-800 focus:border-green-600'} border rounded-lg px-3 py-1.5 text-sm appearance-none cursor-pointer focus:outline-none pr-8`}
                >
                  <option value="all">All Samples</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name} ({project.sampleCount} samples)
                    </option>
                  ))}
                </select>
                <ChevronDown className={`size-4 ${darkMode ? 'text-[#707070]' : 'text-gray-400'} absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none`} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className={`${darkMode ? 'bg-[#252525] border-[#2C2C2C]' : 'bg-white shadow-sm'} border-b px-4 py-4`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Organization Dropdown */}
            <div>
              <label className={`block text-xs ${darkMode ? 'text-[#909090]' : 'text-gray-600'} mb-1.5`}>Organization</label>
              <div className="relative">
                <select
                  value={selectedOrg}
                  onChange={(e) => setSelectedOrg(e.target.value)}
                  className={`w-full font-bold text-base appearance-none cursor-pointer focus:outline-none bg-transparent border-0 px-0 pr-7 ${darkMode ? 'text-[#F0F0F0]' : 'text-gray-900'}`}
                  style={{ colorScheme: darkMode ? 'dark' : 'light' }}
                >
                  <option value="Friendly Illinois Brothers" className={`${darkMode ? 'bg-[#1A1A1A] text-[#F0F0F0] hover:bg-[#2C2C2C]' : 'bg-white text-gray-900 hover:bg-gray-100'}`}>Friendly Illinois Brothers</option>
                  <option value="Goeser's Grazers" className={`${darkMode ? 'bg-[#1A1A1A] text-[#F0F0F0] hover:bg-[#2C2C2C]' : 'bg-white text-gray-900 hover:bg-gray-100'}`}>Goeser's Grazers</option>
                  <option value="Standard Dairy Consultants" className={`${darkMode ? 'bg-[#1A1A1A] text-[#F0F0F0] hover:bg-[#2C2C2C]' : 'bg-white text-gray-900 hover:bg-gray-100'}`}>Standard Dairy Consultants</option>
                </select>
                <ChevronDown className={`size-4 ${darkMode ? 'text-[#707070]' : 'text-gray-400'} absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none`} />
              </div>
            </div>

            {/* Location Dropdown */}
            <div>
              <label className={`block text-xs ${darkMode ? 'text-[#909090]' : 'text-gray-600'} mb-1.5`}>Location</label>
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className={`w-full ${darkMode ? 'bg-[#1A1A1A] border-[#3C3C3C] text-[#C0C0C0] focus:border-[#505050]' : 'bg-white border-gray-300 text-gray-800 focus:border-green-600'} border rounded-lg px-3 py-2 text-sm appearance-none cursor-pointer focus:outline-none`}
                >
                  <option>All Locations</option>
                  <option>North Pasture</option>
                  <option>Home Site</option>
                  <option>South Field</option>
                  <option>East Barn</option>
                </select>
                <ChevronDown className={`size-4 ${darkMode ? 'text-[#707070]' : 'text-gray-400'} absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none`} />
              </div>
            </div>

            {/* Date Range */}
            <div className="md:col-span-2 lg:col-span-2">
              <label className={`block text-xs ${darkMode ? 'text-[#909090]' : 'text-gray-600'} mb-1.5`}>Date Range</label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={`w-full ${darkMode ? 'bg-[#1A1A1A] border-[#3C3C3C] text-[#C0C0C0] focus:border-[#505050]' : 'bg-white border-gray-300 text-gray-800 focus:border-green-600'} border rounded-lg px-3 py-2 text-sm focus:outline-none`}
                  />
                  <Calendar className={`size-4 ${darkMode ? 'text-[#707070]' : 'text-gray-400'} absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none`} />
                </div>
                <span className={`${darkMode ? 'text-[#707070]' : 'text-gray-400'} text-sm`}>to</span>
                <div className="relative flex-1">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={`w-full ${darkMode ? 'bg-[#1A1A1A] border-[#3C3C3C] text-[#C0C0C0] focus:border-[#505050]' : 'bg-white border-gray-300 text-gray-800 focus:border-green-600'} border rounded-lg px-3 py-2 text-sm focus:outline-none`}
                  />
                  <Calendar className={`size-4 ${darkMode ? 'text-[#707070]' : 'text-gray-400'} absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none`} />
                </div>
              </div>
            </div>
          </div>

          {/* Sample Type Pills */}
          <div className="mt-3">
            <label className={`block text-xs ${darkMode ? 'text-[#909090]' : 'text-gray-600'} mb-2`}>Sample Types</label>
            <div className="flex flex-wrap items-center gap-2">
              {selectedTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => removeType(type)}
                  className={`px-3 py-1.5 ${darkMode ? 'bg-[#2C2C2C] border-[#3C3C3C] text-[#C0C0C0] hover:border-[#505050]' : 'bg-gray-100 border-gray-300 text-gray-800 hover:border-gray-400'} border rounded-full text-xs flex items-center gap-2 transition-colors group`}
                >
                  <span className="flex items-center gap-1.5">
                    {getSampleTypeIcon(type, 'small')}
                    {type}
                  </span>
                  <X className={`size-3 ${darkMode ? 'text-[#707070] group-hover:text-[#C0C0C0]' : 'text-gray-400 group-hover:text-gray-600'}`} />
                </button>
              ))}
              <div className="relative">
                <select
                  onChange={(e) => {
                    if (e.target.value && !selectedTypes.includes(e.target.value)) {
                      setSelectedTypes([...selectedTypes, e.target.value]);
                    }
                    e.target.value = '';
                  }}
                  className={`px-3 py-1.5 ${darkMode ? 'bg-[#1A1A1A] border-[#3C3C3C] text-[#909090] hover:border-[#505050]' : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'} border rounded-full text-xs appearance-none cursor-pointer transition-colors pr-8`}
                  defaultValue=""
                >
                  <option value="">+ Add Type</option>
                  {sampleTypes.filter(t => !selectedTypes.includes(t)).map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-6xl mx-auto space-y-4">
          
          {/* National View Content */}
          {viewMode === 'national' && (
            <>
              {/* National Overview */}
              <div className={`${darkMode ? 'bg-[#252525] border-[#2C2C2C]' : 'bg-white shadow-md'} border rounded-xl p-6`}>
                <div className="mb-4">
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-800'} mb-1`}>National Trends</h2>
                  <p className={`text-sm ${darkMode ? 'text-[#909090]' : 'text-gray-600'}`}>Aggregated data from all laboratory locations nationwide</p>
                </div>
                
                {/* National Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className={`${darkMode ? 'bg-[#1A1A1A]' : 'bg-gray-50'} rounded-lg p-4`}>
                    <p className={`text-xs ${darkMode ? 'text-[#909090]' : 'text-gray-500'} mb-1`}>Total Samples</p>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-900'}`}>142,834</p>
                    <p className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'} mt-1`}>+12.3% this month</p>
                  </div>
                  <div className={`${darkMode ? 'bg-[#1A1A1A]' : 'bg-gray-50'} rounded-lg p-4`}>
                    <p className={`text-xs ${darkMode ? 'text-[#909090]' : 'text-gray-500'} mb-1`}>Active Farms</p>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-900'}`}>8,427</p>
                    <p className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'} mt-1`}>+3.8% this month</p>
                  </div>
                  <div className={`${darkMode ? 'bg-[#1A1A1A]' : 'bg-gray-50'} rounded-lg p-4`}>
                    <p className={`text-xs ${darkMode ? 'text-[#909090]' : 'text-gray-500'} mb-1`}>Avg Turnaround</p>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-900'}`}>2.4 days</p>
                    <p className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'} mt-1`}>-0.3 days improved</p>
                  </div>
                  <div className={`${darkMode ? 'bg-[#1A1A1A]' : 'bg-gray-50'} rounded-lg p-4`}>
                    <p className={`text-xs ${darkMode ? 'text-[#909090]' : 'text-gray-500'} mb-1`}>Lab Locations</p>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-900'}`}>5</p>
                    <p className={`text-xs ${darkMode ? 'text-[#909090]' : 'text-gray-500'} mt-1`}>Nationwide coverage</p>
                  </div>
                </div>

                {/* Simplified US Map Visualization */}
                <div className={`${darkMode ? 'bg-[#1A1A1A]' : 'bg-gray-50'} rounded-lg p-6 relative`}>
                  <div className="text-center mb-4">
                    <h3 className={`text-sm font-semibold ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-800'}`}>Sample Distribution by Region</h3>
                  </div>
                  
                  {/* Simple bar chart as regional representation */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-xs ${darkMode ? 'text-[#C0C0C0]' : 'text-gray-700'}`}>Midwest (WI, IL, IN, IA, MN)</span>
                        <span className={`text-xs font-semibold ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-900'}`}>48,392 samples</span>
                      </div>
                      <div className={`h-8 ${darkMode ? 'bg-[#2C2C2C]' : 'bg-gray-200'} rounded overflow-hidden`}>
                        <div className="h-full bg-gradient-to-r from-green-600 to-green-700" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-xs ${darkMode ? 'text-[#C0C0C0]' : 'text-gray-700'}`}>Northeast (NY, PA, VT, NH)</span>
                        <span className={`text-xs font-semibold ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-900'}`}>31,847 samples</span>
                      </div>
                      <div className={`h-8 ${darkMode ? 'bg-[#2C2C2C]' : 'bg-gray-200'} rounded overflow-hidden`}>
                        <div className="h-full bg-gradient-to-r from-blue-600 to-blue-700" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-xs ${darkMode ? 'text-[#C0C0C0]' : 'text-gray-700'}`}>West (CA, OR, WA, ID)</span>
                        <span className={`text-xs font-semibold ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-900'}`}>28,594 samples</span>
                      </div>
                      <div className={`h-8 ${darkMode ? 'bg-[#2C2C2C]' : 'bg-gray-200'} rounded overflow-hidden`}>
                        <div className="h-full bg-gradient-to-r from-amber-600 to-amber-700" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-xs ${darkMode ? 'text-[#C0C0C0]' : 'text-gray-700'}`}>South (TX, OK, AR, LA)</span>
                        <span className={`text-xs font-semibold ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-900'}`}>21,276 samples</span>
                      </div>
                      <div className={`h-8 ${darkMode ? 'bg-[#2C2C2C]' : 'bg-gray-200'} rounded overflow-hidden`}>
                        <div className="h-full bg-gradient-to-r from-purple-600 to-purple-700" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-xs ${darkMode ? 'text-[#C0C0C0]' : 'text-gray-700'}`}>Southeast (NC, SC, GA, FL)</span>
                        <span className={`text-xs font-semibold ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-900'}`}>12,725 samples</span>
                      </div>
                      <div className={`h-8 ${darkMode ? 'bg-[#2C2C2C]' : 'bg-gray-200'} rounded overflow-hidden`}>
                        <div className="h-full bg-gradient-to-r from-red-600 to-red-700" style={{ width: '18%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* National Trends Chart */}
              <div className={`${darkMode ? 'bg-[#252525] border-[#2C2C2C]' : 'bg-white shadow-md'} border rounded-xl p-6`}>
                <div className="mb-4">
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-800'} mb-1`}>National Average Feed Quality Trends</h2>
                  <p className={`text-sm ${darkMode ? 'text-[#909090]' : 'text-gray-600'}`}>6-month rolling average across all laboratories</p>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={[
                      { month: 'Aug', cp: 8.1, ndf: 43.2, starch: 31.5 },
                      { month: 'Sep', cp: 8.3, ndf: 42.8, starch: 32.1 },
                      { month: 'Oct', cp: 8.2, ndf: 42.5, starch: 32.8 },
                      { month: 'Nov', cp: 8.4, ndf: 42.1, starch: 33.2 },
                      { month: 'Dec', cp: 8.3, ndf: 42.3, starch: 32.6 },
                      { month: 'Jan', cp: 8.5, ndf: 41.9, starch: 33.5 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#3C3C3C" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: '#C0C0C0', fontSize: 12 }}
                        stroke="#3C3C3C"
                      />
                      <YAxis 
                        tick={{ fill: '#C0C0C0', fontSize: 12 }}
                        stroke="#3C3C3C"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: darkMode ? '#2C2C2C' : '#ffffff',
                          border: `1px solid ${darkMode ? '#3C3C3C' : '#e5e7eb'}`,
                          borderRadius: '8px',
                          color: darkMode ? '#C0C0C0' : '#374151',
                        }}
                        labelStyle={{ color: darkMode ? '#E0E0E0' : '#111827' }}
                      />
                      <Legend 
                        wrapperStyle={{ paddingTop: '10px' }}
                        formatter={(value) => <span style={{ color: darkMode ? '#C0C0C0' : '#374151', fontSize: '12px' }}>{value}</span>}
                      />
                      <Bar dataKey="cp" name="Crude Protein (%)" fill="#6B9BD1" />
                      <Bar dataKey="ndf" name="NDF (%)" fill="#C4A1A1" />
                      <Line type="monotone" dataKey="starch" name="Starch (%)" stroke="#9FB8AD" strokeWidth={3} dot={{ fill: '#9FB8AD', r: 4 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
          
          {/* Project View Content (existing content) */}
          {viewMode === 'project' && (
            <>
          {/* Project Context Header */}
          {selectedProject !== 'all' && projects.length > 0 && (
            <div className={`${darkMode ? 'bg-[#252525] border-[#2C2C2C]' : 'bg-blue-50 border-blue-200'} border rounded-xl p-4`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-100'}`}>
                    <Folder className={`size-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-base font-semibold ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-900'}`}>
                      {projects.find(p => p.id === selectedProject)?.name}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-[#909090]' : 'text-gray-600'} mt-0.5`}>
                      {projects.find(p => p.id === selectedProject)?.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`text-xs ${darkMode ? 'text-[#C0C0C0]' : 'text-gray-700'}`}>
                        <strong>{filteredSamples.length}</strong> samples in view
                      </span>
                      <span className={`text-xs ${darkMode ? 'text-[#909090]' : 'text-gray-500'}`}>
                        Created {projects.find(p => p.id === selectedProject)?.createdDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Summary Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Crude Protein Card */}
            <div className={`${darkMode ? 'bg-[#252525] border-[#2C2C2C]' : 'bg-white shadow-md'} border rounded-xl p-5`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className={`text-xs font-medium uppercase tracking-wide ${darkMode ? 'text-[#909090]' : 'text-gray-500'}`}>Crude Protein</p>
                  <p className={`text-3xl font-bold mt-1 ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-900'}`}>
                    {summaryStats.avgCP.toFixed(1)}<span className="text-lg">%</span>
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                  <Activity className={`size-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
              </div>
              {summaryStats.cpTrend !== 0 && (
                <div className="flex items-center gap-1.5 mt-3">
                  {summaryStats.cpTrend > 0 ? (
                    <TrendingUp className={`size-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  ) : (
                    <TrendingDown className={`size-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                  )}
                  <span className={`text-sm font-medium ${summaryStats.cpTrend > 0 ? (darkMode ? 'text-green-400' : 'text-green-600') : (darkMode ? 'text-red-400' : 'text-red-600')}`}>
                    {Math.abs(summaryStats.cpTrend)}%
                  </span>
                  <span className={`text-xs ${darkMode ? 'text-[#909090]' : 'text-gray-500'}`}>vs previous period</span>
                </div>
              )}
            </div>

            {/* NDF Card */}
            <div className={`${darkMode ? 'bg-[#252525] border-[#2C2C2C]' : 'bg-white shadow-md'} border rounded-xl p-5`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className={`text-xs font-medium uppercase tracking-wide ${darkMode ? 'text-[#909090]' : 'text-gray-500'}`}>NDF</p>
                  <p className={`text-3xl font-bold mt-1 ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-900'}`}>
                    {summaryStats.avgNDF.toFixed(1)}<span className="text-lg">%</span>
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
                  <Activity className={`size-5 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                </div>
              </div>
              {summaryStats.ndfTrend !== 0 && (
                <div className="flex items-center gap-1.5 mt-3">
                  {summaryStats.ndfTrend > 0 ? (
                    <TrendingUp className={`size-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  ) : (
                    <TrendingDown className={`size-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                  )}
                  <span className={`text-sm font-medium ${summaryStats.ndfTrend > 0 ? (darkMode ? 'text-green-400' : 'text-green-600') : (darkMode ? 'text-red-400' : 'text-red-600')}`}>
                    {Math.abs(summaryStats.ndfTrend)}%
                  </span>
                  <span className={`text-xs ${darkMode ? 'text-[#909090]' : 'text-gray-500'}`}>vs previous period</span>
                </div>
              )}
            </div>

            {/* Starch Card */}
            <div className={`${darkMode ? 'bg-[#252525] border-[#2C2C2C]' : 'bg-white shadow-md'} border rounded-xl p-5`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className={`text-xs font-medium uppercase tracking-wide ${darkMode ? 'text-[#909090]' : 'text-gray-500'}`}>Starch</p>
                  <p className={`text-3xl font-bold mt-1 ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-900'}`}>
                    {summaryStats.avgStarch.toFixed(1)}<span className="text-lg">%</span>
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                  <Activity className={`size-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                </div>
              </div>
              {summaryStats.starchTrend !== 0 && (
                <div className="flex items-center gap-1.5 mt-3">
                  {summaryStats.starchTrend > 0 ? (
                    <TrendingUp className={`size-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  ) : (
                    <TrendingDown className={`size-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                  )}
                  <span className={`text-sm font-medium ${summaryStats.starchTrend > 0 ? (darkMode ? 'text-green-400' : 'text-green-600') : (darkMode ? 'text-red-400' : 'text-red-600')}`}>
                    {Math.abs(summaryStats.starchTrend)}%
                  </span>
                  <span className={`text-xs ${darkMode ? 'text-[#909090]' : 'text-gray-500'}`}>vs previous period</span>
                </div>
              )}
            </div>
          </div>

          {/* Radar Chart Card */}
          <div className={`${darkMode ? 'bg-[#252525] border-[#2C2C2C]' : 'bg-white shadow-md'} border rounded-xl p-6`}>
            <div className="mb-4">
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-800'} mb-1`}>Nutritional Profile</h2>
              <p className={`text-sm ${darkMode ? 'text-[#909090]' : 'text-gray-600'}`}>Current batch average vs. regional benchmark</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#3C3C3C" />
                  <PolarAngleAxis 
                    dataKey="parameter" 
                    tick={{ fill: '#C0C0C0', fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 'auto']}
                    tick={{ fill: '#909090', fontSize: 10 }}
                    stroke="#3C3C3C"
                  />
                  <Radar
                    name="Current Batch"
                    dataKey="current"
                    stroke="#6B9BD1"
                    fill="#6B9BD1"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Regional Benchmark"
                    dataKey="benchmark"
                    stroke="#707070"
                    fill="transparent"
                    strokeWidth={1.5}
                    strokeDasharray="5 5"
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="line"
                    formatter={(value) => <span style={{ color: '#C0C0C0', fontSize: '12px' }}>{value}</span>}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line Chart Card */}
          <div className={`${darkMode ? 'bg-[#252525] border-[#2C2C2C]' : 'bg-white shadow-md'} border rounded-xl p-6`}>
            <div className="mb-4">
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-800'} mb-1`}>Digestibility Trends</h2>
              <p className={`text-sm ${darkMode ? 'text-[#909090]' : 'text-gray-600'}`}>Tracking key digestibility metrics over time</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3C3C3C" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#C0C0C0', fontSize: 12 }}
                    stroke="#3C3C3C"
                  />
                  <YAxis 
                    tick={{ fill: '#C0C0C0', fontSize: 12 }}
                    stroke="#3C3C3C"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#2C2C2C',
                      border: '1px solid #3C3C3C',
                      borderRadius: '8px',
                      color: '#C0C0C0',
                    }}
                    labelStyle={{ color: '#E0E0E0' }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '10px' }}
                    formatter={(value) => <span style={{ color: '#C0C0C0', fontSize: '12px' }}>{value}</span>}
                  />
                  <Line
                    type="monotone"
                    dataKey="starch7hr"
                    name="Starch Digestibility (7hr)"
                    stroke="#C4A1A1"
                    strokeWidth={2.5}
                    dot={{ fill: '#C4A1A1', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ndfd240"
                    name="NDFD 240"
                    stroke="#9FB8AD"
                    strokeWidth={2.5}
                    dot={{ fill: '#9FB8AD', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sample List Table */}
          <div className={`${darkMode ? 'bg-[#252525] border-[#2C2C2C]' : 'bg-white shadow-md'} border rounded-xl overflow-hidden`}>
            <div className={`px-6 py-4 border-b ${darkMode ? 'border-[#2C2C2C]' : 'border-gray-200'}`}>
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-800'}`}>Included Samples</h2>
              <p className={`text-sm ${darkMode ? 'text-[#909090]' : 'text-gray-600'} mt-1`}>{filteredSamples.length} samples in current view</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-[#2C2C2C]' : 'border-gray-200'}`}>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-[#909090]' : 'text-gray-600'} uppercase tracking-wider`}>
                      Sample ID
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-[#909090]' : 'text-gray-600'} uppercase tracking-wider`}>
                      Farm/Field
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-[#909090]' : 'text-gray-600'} uppercase tracking-wider`}>
                      Type
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-[#909090]' : 'text-gray-600'} uppercase tracking-wider`}>
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-[#2C2C2C]' : 'divide-gray-200'}`}>
                  {filteredSamples.map((sample) => {
                    const now = new Date('2026-01-13T12:00:00');
                    const sampleDate = new Date(now);
                    sampleDate.setDate(sampleDate.getDate() - (sample.daysAgo || 0));
                    const formattedDate = sampleDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    
                    return (
                      <tr key={sample.id} className={`${darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-50'} transition-colors`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`font-mono text-sm ${darkMode ? 'text-[#E0E0E0]' : 'text-gray-800'}`}>{sample.id}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm ${darkMode ? 'text-[#C0C0C0]' : 'text-gray-700'}`}>{sample.sampleName || 'Field Sample'}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className={darkMode ? 'text-[#909090]' : 'text-gray-500'}>{getSampleTypeIcon(sample.sampleType, 'small')}</span>
                            <span className={`text-sm ${darkMode ? 'text-[#C0C0C0]' : 'text-gray-700'}`}>{sample.sampleType}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm ${darkMode ? 'text-[#909090]' : 'text-gray-500'}`}>{formattedDate}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          </>
          )}
        </div>
      </main>
    </div>
  );
}