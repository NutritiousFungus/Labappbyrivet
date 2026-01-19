import { useState } from 'react';
import { ArrowLeft, MapPin, Truck, User, Check, Clock, Navigation, Plus, X, ChevronRight } from 'lucide-react';

interface DriverRoutesProps {
  onBack: () => void;
  darkMode?: boolean;
}

interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicleInfo: string;
  status: 'active' | 'inactive';
}

interface DropboxLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pickupDays: string[];
  estimatedSamples: number;
  lat?: number;
  lng?: number;
  assigned: boolean;
  driverId?: string;
}

interface Route {
  id: string;
  driverId: string;
  date: string;
  locations: string[]; // Array of dropbox IDs
  status: 'pending' | 'in-progress' | 'completed';
  totalStops: number;
  completedStops: number;
}

export function DriverRoutes({ onBack, darkMode }: DriverRoutesProps) {
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const bgColor = darkMode ? 'bg-[#181818]' : 'bg-stone-200';
  const cardBg = darkMode ? 'bg-[#252525]' : 'bg-white';
  const cardBorder = darkMode ? 'border border-[#2C2C2C]' : 'shadow-md';
  const headerBg = darkMode ? 'bg-[#252525]' : 'bg-white';
  const headerBorder = darkMode ? 'border-b border-[#2C2C2C]' : 'shadow-sm';
  const textPrimary = darkMode ? 'text-[#E0E0E0]' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-[#C0C0C0]' : 'text-gray-600';
  const textTertiary = darkMode ? 'text-[#909090]' : 'text-gray-500';
  const hoverBg = darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-50';
  const borderColor = darkMode ? 'border-[#2C2C2C]' : 'border-gray-100';
  const inputBg = darkMode ? 'bg-[#1A1A1A]' : 'bg-white';
  const inputBorder = darkMode ? 'border-[#3C3C3C]' : 'border-gray-300';

  const [drivers] = useState<Driver[]>([
    { id: 'driver-1', name: 'Mike Johnson', phone: '608-555-0123', vehicleInfo: 'Ford Transit - WI-ABC-1234', status: 'active' },
    { id: 'driver-2', name: 'Sarah Williams', phone: '608-555-0124', vehicleInfo: 'Chevy Express - WI-DEF-5678', status: 'active' },
    { id: 'driver-3', name: 'Tom Anderson', phone: '608-555-0125', vehicleInfo: 'Ram ProMaster - WI-GHI-9012', status: 'active' },
  ]);

  const [dropboxLocations, setDropboxLocations] = useState<DropboxLocation[]>([
    {
      id: 'loc-1',
      name: 'Heritage Feed & Grain',
      address: '1245 County Road K',
      city: 'Mazomanie',
      state: 'WI',
      pickupDays: ['Monday', 'Wednesday', 'Friday'],
      estimatedSamples: 8,
      assigned: false
    },
    {
      id: 'loc-2',
      name: 'Sunrise Dairy Co-op',
      address: '456 Dairy Lane',
      city: 'Cross Plains',
      state: 'WI',
      pickupDays: ['Tuesday', 'Thursday'],
      estimatedSamples: 12,
      assigned: false
    },
    {
      id: 'loc-3',
      name: 'Green Valley Feed Store',
      address: '789 Valley Road',
      city: 'Waunakee',
      state: 'WI',
      pickupDays: ['Monday', 'Friday'],
      estimatedSamples: 6,
      assigned: false
    },
    {
      id: 'loc-4',
      name: 'Midwest Ag Supply',
      address: '321 Farm Street',
      city: 'DeForest',
      state: 'WI',
      pickupDays: ['Daily'],
      estimatedSamples: 15,
      assigned: false
    },
    {
      id: 'loc-5',
      name: 'Country Feed & Supply',
      address: '555 Rural Route 12',
      city: 'Arlington',
      state: 'WI',
      pickupDays: ['Tuesday', 'Thursday'],
      estimatedSamples: 5,
      assigned: false
    },
  ]);

  const [routes] = useState<Route[]>([
    {
      id: 'route-1',
      driverId: 'driver-1',
      date: new Date().toISOString().split('T')[0],
      locations: ['loc-1', 'loc-3', 'loc-4'],
      status: 'in-progress',
      totalStops: 3,
      completedStops: 1
    },
    {
      id: 'route-2',
      driverId: 'driver-2',
      date: new Date().toISOString().split('T')[0],
      locations: ['loc-2', 'loc-5'],
      status: 'pending',
      totalStops: 2,
      completedStops: 0
    }
  ]);

  const handleAssignLocation = (locationId: string, driverId: string) => {
    setDropboxLocations(prev => prev.map(loc => 
      loc.id === locationId 
        ? { ...loc, assigned: true, driverId: driverId }
        : loc
    ));
  };

  const handleUnassignLocation = (locationId: string) => {
    setDropboxLocations(prev => prev.map(loc => 
      loc.id === locationId 
        ? { ...loc, assigned: false, driverId: undefined }
        : loc
    ));
  };

  const getDriverRoutes = (driverId: string) => {
    return routes.filter(route => route.driverId === driverId && route.date === selectedDate);
  };

  const getAssignedLocations = (driverId: string) => {
    return dropboxLocations.filter(loc => loc.driverId === driverId);
  };

  const todayDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className={`min-h-screen ${bgColor} pb-24`}>
      {/* Header */}
      <header className={`${headerBg} ${headerBorder} sticky top-0 z-10`}>
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className={`p-2 ${hoverBg} rounded-full transition-colors -ml-2`}
          >
            <ArrowLeft className={`size-5 ${textSecondary}`} />
          </button>
          <div className="flex-1">
            <h1 className={`font-semibold ${textPrimary}`}>Driver & Route Management</h1>
            <p className={`text-sm ${textSecondary}`}>{todayDate}</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className={`${cardBg} ${cardBorder} rounded-xl p-4`}>
            <div className={`text-xs ${textTertiary} mb-1`}>Active Drivers</div>
            <div className={`text-2xl font-bold ${textPrimary}`}>{drivers.filter(d => d.status === 'active').length}</div>
          </div>
          <div className={`${cardBg} ${cardBorder} rounded-xl p-4`}>
            <div className={`text-xs ${textTertiary} mb-1`}>Drop Boxes</div>
            <div className={`text-2xl font-bold ${textPrimary}`}>{dropboxLocations.length}</div>
          </div>
          <div className={`${cardBg} ${cardBorder} rounded-xl p-4`}>
            <div className={`text-xs ${textTertiary} mb-1`}>Today's Routes</div>
            <div className={`text-2xl font-bold ${textPrimary}`}>{routes.filter(r => r.date === selectedDate).length}</div>
          </div>
        </div>

        {/* Date Selector */}
        <div className={`${cardBg} ${cardBorder} rounded-xl p-4`}>
          <label className={`text-sm font-semibold ${textPrimary} mb-2 block`}>Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className={`w-full ${inputBg} border ${inputBorder} rounded-lg px-3 py-2 ${textPrimary} focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'}`}
          />
        </div>

        {/* Drivers List */}
        <div className={`${cardBg} ${cardBorder} rounded-xl overflow-hidden`}>
          <div className={`px-4 py-3 ${borderColor} border-b flex items-center justify-between`}>
            <h3 className={`font-semibold ${textPrimary}`}>Drivers</h3>
            <button
              onClick={() => setShowAddDriver(true)}
              className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'} flex items-center gap-1`}
            >
              <Plus className="size-4" />
              Add Driver
            </button>
          </div>
          
          <div className="divide-y divide-gray-100">
            {drivers.map((driver) => {
              const driverRoutes = getDriverRoutes(driver.id);
              const assignedLocs = getAssignedLocations(driver.id);
              const currentRoute = driverRoutes[0];

              return (
                <div key={driver.id} className={`p-4 ${hoverBg} transition-colors`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-full ${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-100'}`}>
                        <User className={`size-5 ${textSecondary}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-semibold ${textPrimary} mb-0.5`}>{driver.name}</div>
                        <div className={`text-xs ${textTertiary} mb-1`}>{driver.phone}</div>
                        <div className={`text-xs ${textSecondary} flex items-center gap-1.5`}>
                          <Truck className="size-3" />
                          {driver.vehicleInfo}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedDriver(selectedDriver === driver.id ? null : driver.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        selectedDriver === driver.id
                          ? `${darkMode ? 'bg-green-600 text-white' : 'bg-green-600 text-white'}`
                          : `${darkMode ? 'bg-[#1E1E1E] text-[#C0C0C0]' : 'bg-gray-100 text-gray-700'}`
                      }`}
                    >
                      {selectedDriver === driver.id ? 'Hide Route' : 'Manage Route'}
                    </button>
                  </div>

                  {/* Route Status - Compact */}
                  {currentRoute && (
                    <div className={`${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-50'} rounded-lg p-3 mb-3`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            currentRoute.status === 'completed' 
                              ? `${darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'}`
                              : currentRoute.status === 'in-progress'
                              ? `${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`
                              : `${darkMode ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-700'}`
                          }`}>
                            {currentRoute.status === 'in-progress' ? 'In Progress' : currentRoute.status.charAt(0).toUpperCase() + currentRoute.status.slice(1)}
                          </div>
                          <span className={`text-xs ${textTertiary}`}>
                            {currentRoute.completedStops}/{currentRoute.totalStops} stops
                          </span>
                        </div>
                        <Navigation className={`size-4 ${textSecondary}`} />
                      </div>
                    </div>
                  )}

                  {/* Expandable Route Details */}
                  {selectedDriver === driver.id && (
                    <div className="mt-3 space-y-2">
                      <div className={`text-xs font-semibold ${textPrimary} mb-2`}>
                        Assigned Locations ({assignedLocs.length})
                      </div>
                      
                      {assignedLocs.length > 0 ? (
                        <div className="space-y-2">
                          {assignedLocs.map((location, index) => (
                            <div
                              key={location.id}
                              className={`${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-50'} rounded-lg p-3 flex items-start justify-between`}
                            >
                              <div className="flex items-start gap-2 flex-1">
                                <div className={`mt-0.5 px-1.5 py-0.5 rounded text-xs font-bold ${darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'}`}>
                                  {index + 1}
                                </div>
                                <div className="flex-1">
                                  <div className={`text-sm font-semibold ${textPrimary} mb-0.5`}>{location.name}</div>
                                  <div className={`text-xs ${textTertiary}`}>
                                    {location.address}, {location.city}
                                  </div>
                                  <div className={`text-xs ${textSecondary} mt-1`}>
                                    Est. {location.estimatedSamples} samples
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => handleUnassignLocation(location.id)}
                                className={`p-1.5 ${hoverBg} rounded transition-colors`}
                              >
                                <X className={`size-4 text-red-500`} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className={`text-center py-6 ${textTertiary} text-sm`}>
                          No locations assigned yet
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Unassigned Drop Box Locations */}
        <div className={`${cardBg} ${cardBorder} rounded-xl overflow-hidden`}>
          <div className={`px-4 py-3 ${borderColor} border-b`}>
            <h3 className={`font-semibold ${textPrimary}`}>Unassigned Drop Boxes</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            {dropboxLocations.filter(loc => !loc.assigned).length === 0 ? (
              <div className={`text-center py-8 ${textTertiary}`}>
                <MapPin className="size-12 mx-auto mb-2 opacity-30" />
                <div className="text-sm">All drop boxes have been assigned!</div>
              </div>
            ) : (
              dropboxLocations.filter(loc => !loc.assigned).map((location) => (
                <div key={location.id} className={`p-4 flex items-start justify-between ${hoverBg} transition-colors`}>
                  <div className="flex items-start gap-3 flex-1">
                    <MapPin className={`size-5 ${textSecondary} mt-0.5`} />
                    <div className="flex-1">
                      <div className={`text-sm font-semibold ${textPrimary} mb-1`}>{location.name}</div>
                      <div className={`text-xs ${textTertiary} mb-1`}>
                        {location.address}, {location.city}, {location.state}
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className={`${textSecondary}`}>
                          {location.pickupDays.join(', ')}
                        </span>
                        <span className={`${textTertiary}`}>•</span>
                        <span className={`${textSecondary}`}>
                          ~{location.estimatedSamples} samples
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    {drivers.filter(d => d.status === 'active').map((driver) => (
                      <button
                        key={driver.id}
                        onClick={() => handleAssignLocation(location.id, driver.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium ${darkMode ? 'bg-[#1E1E1E] hover:bg-[#2C2C2C] text-[#C0C0C0]' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} transition-colors whitespace-nowrap`}
                      >
                        Assign to {driver.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Add Driver Modal */}
      {showAddDriver && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`${cardBg} rounded-xl max-w-md w-full p-6`}>
            <h2 className={`text-lg font-bold ${textPrimary} mb-4`}>Add New Driver</h2>
            
            <div className="space-y-3 mb-6">
              <div>
                <label className={`text-sm font-medium ${textSecondary} mb-1 block`}>Driver Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`w-full ${inputBg} border ${inputBorder} rounded-lg px-3 py-2 ${textPrimary} focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'}`}
                />
              </div>
              <div>
                <label className={`text-sm font-medium ${textSecondary} mb-1 block`}>Phone Number</label>
                <input
                  type="tel"
                  placeholder="608-555-0000"
                  className={`w-full ${inputBg} border ${inputBorder} rounded-lg px-3 py-2 ${textPrimary} focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'}`}
                />
              </div>
              <div>
                <label className={`text-sm font-medium ${textSecondary} mb-1 block`}>Vehicle Info</label>
                <input
                  type="text"
                  placeholder="Ford Transit - WI-ABC-1234"
                  className={`w-full ${inputBg} border ${inputBorder} rounded-lg px-3 py-2 ${textPrimary} focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'}`}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddDriver(false)}
                className={`flex-1 py-2.5 ${darkMode ? 'bg-[#2C2C2C] hover:bg-[#333]' : 'bg-gray-100 hover:bg-gray-200'} ${textPrimary} rounded-lg font-semibold transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Add driver logic here
                  setShowAddDriver(false);
                }}
                className={`flex-1 py-2.5 ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg font-semibold transition-colors`}
              >
                Add Driver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
