import React, { useMemo } from 'react';
import { 
  ArrowLeft, 
  Truck, 
  User, 
  MapPin, 
  Phone 
} from 'lucide-react';
import { AdminSection } from './types';

interface LabDriverRoutesProps {
  darkMode: boolean;
  setActiveSection: (section: AdminSection) => void;
}

export function LabDriverRoutes({ darkMode, setActiveSection }: LabDriverRoutesProps) {
  const themeClasses = useMemo(() => ({
    cardBg: darkMode ? 'bg-[#252525]' : 'bg-white',
    textPrimary: darkMode ? 'text-[#E0E0E0]' : 'text-gray-800',
    textSecondary: darkMode ? 'text-[#C0C0C0]' : 'text-gray-600',
    borderColor: darkMode ? 'border-[#2C2C2C]' : 'border-gray-200',
    hoverBg: darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-50'
  }), [darkMode]);

  const { cardBg, textPrimary, textSecondary, borderColor } = themeClasses;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <button
        onClick={() => setActiveSection('home')}
        className={`flex items-center gap-2 mb-6 -ml-2 p-2 ${textSecondary} transition-colors ${themeClasses.hoverBg} rounded-lg`}
      >
        <ArrowLeft className="size-5" />
        <span className="font-medium">Back</span>
      </button>

      <div className={`${cardBg} rounded-lg ${borderColor} border p-6`}>
        <h2 className={`text-xl font-bold ${textPrimary} mb-6`}>Driver & Route Management</h2>
        
        <div className={`${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-50'} rounded-lg p-6`}>
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className={`${cardBg} ${borderColor} border rounded-lg p-4`}>
                <div className={`text-xs ${textSecondary} mb-1`}>Active Drivers</div>
                <div className={`text-2xl font-bold ${textPrimary}`}>3</div>
              </div>
              <div className={`${cardBg} ${borderColor} border rounded-lg p-4`}>
                <div className={`text-xs ${textSecondary} mb-1`}>Drop Boxes</div>
                <div className={`text-2xl font-bold ${textPrimary}`}>5</div>
              </div>
              <div className={`${cardBg} ${borderColor} border rounded-lg p-4`}>
                <div className={`text-xs ${textSecondary} mb-1`}>Today's Routes</div>
                <div className={`text-2xl font-bold ${textPrimary}`}>2</div>
              </div>
            </div>

            {/* Drivers List */}
            <div className={`${cardBg} ${borderColor} border rounded-lg overflow-hidden`}>
              <div className={`px-4 py-3 ${borderColor} border-b flex items-center justify-between`}>
                <h3 className={`font-semibold ${textPrimary}`}>Active Drivers</h3>
                <button className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  + Add Driver
                </button>
              </div>
              
              <div className="divide-y divide-gray-100">
                {/* Driver 1 */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-100'}`}>
                        <User className={`size-5 ${textSecondary}`} />
                      </div>
                      <div>
                        <div className={`text-sm font-semibold ${textPrimary} mb-0.5`}>Mike Johnson</div>
                        <div className={`text-xs ${textSecondary} mb-1`}>608-555-0123</div>
                        <div className={`text-xs ${textSecondary} flex items-center gap-1.5`}>
                          <Truck className="size-3" />
                          Ford Transit - WI-ABC-1234
                        </div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-semibold ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                      In Progress
                    </div>
                  </div>
                  <div className={`mt-3 ${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-50'} rounded p-3`}>
                    <div className={`text-xs ${textSecondary} mb-2`}>Today's Route: 3 stops</div>
                    <div className="space-y-1">
                      <div className={`text-xs ${textPrimary}`}>1. Heritage Feed & Grain - Mazomanie</div>
                      <div className={`text-xs ${textPrimary}`}>2. Green Valley Feed Store - Waunakee</div>
                      <div className={`text-xs ${textPrimary}`}>3. Midwest Ag Supply - DeForest</div>
                    </div>
                  </div>
                </div>

                {/* Driver 2 */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-100'}`}>
                        <User className={`size-5 ${textSecondary}`} />
                      </div>
                      <div>
                        <div className={`text-sm font-semibold ${textPrimary} mb-0.5`}>Sarah Williams</div>
                        <div className={`text-xs ${textSecondary} mb-1`}>608-555-0124</div>
                        <div className={`text-xs ${textSecondary} flex items-center gap-1.5`}>
                          <Truck className="size-3" />
                          Chevy Express - WI-DEF-5678
                        </div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-semibold ${darkMode ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-700'}`}>
                      Pending
                    </div>
                  </div>
                  <div className={`mt-3 ${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-50'} rounded p-3`}>
                    <div className={`text-xs ${textSecondary} mb-2`}>Today's Route: 2 stops</div>
                    <div className="space-y-1">
                      <div className={`text-xs ${textPrimary}`}>1. Sunrise Dairy Co-op - Cross Plains</div>
                      <div className={`text-xs ${textPrimary}`}>2. Country Feed & Supply - Arlington</div>
                    </div>
                  </div>
                </div>

                {/* Driver 3 */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-100'}`}>
                        <User className={`size-5 ${textSecondary}`} />
                      </div>
                      <div>
                        <div className={`text-sm font-semibold ${textPrimary} mb-0.5`}>Tom Anderson</div>
                        <div className={`text-xs ${textSecondary} mb-1`}>608-555-0125</div>
                        <div className={`text-xs ${textSecondary} flex items-center gap-1.5`}>
                          <Truck className="size-3" />
                          Ram ProMaster - WI-GHI-9012
                        </div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-semibold ${darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'}`}>
                      Available
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className={`${cardBg} ${borderColor} border rounded-lg p-6 text-center`}>
              <Truck className={`size-12 mx-auto mb-3 ${textSecondary}`} />
              <p className={`text-sm ${textSecondary} mb-3`}>
                Use the full Driver & Route Management interface for detailed route planning, GPS tracking, and sample pickup management.
              </p>
              <button className={`px-6 py-2.5 ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg font-semibold transition-colors`}>
                Open Full Route Manager
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
