import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface Analyte {
  name: string;
  price: number;
  description?: string;
}

interface AnalyteCategory {
  name: string;
  analytes: Analyte[];
}

interface AnalyteSection {
  section: string;
  categories: AnalyteCategory[];
}

interface CustomPackage {
  id: string;
  name: string;
  analytes: string[];
  createdAt: Date;
}

interface CustomPackagesProps {
  onClose: () => void;
  darkMode: boolean;
  selectedFarm: string;
  savedPackages: CustomPackage[];
  onSavePackage: (pkg: CustomPackage) => void;
  onDeletePackage: (pkgId: string) => void;
}

// Feed Testing Analytes
const FEED_ANALYTES: AnalyteSection[] = [
  {
    section: 'NIR Analysis',
    categories: [
      {
        name: 'Basic Nutritional',
        analytes: [
          { name: 'Crude Protein (CP)', price: 8, description: 'Total protein content' },
          { name: 'Acid Detergent Fiber (ADF)', price: 6, description: 'Cell wall digestibility indicator' },
          { name: 'Neutral Detergent Fiber (NDF)', price: 6, description: 'Total fiber content' },
          { name: 'Moisture', price: 4, description: 'Water content percentage' },
          { name: 'Starch', price: 7, description: 'Rapidly fermentable carbohydrate' },
          { name: 'Crude Fat', price: 7, description: 'Total lipid content' },
          { name: 'Ash', price: 5, description: 'Mineral content' },
          { name: 'Sugar (ESC)', price: 6, description: 'Simple sugars' },
        ]
      },
      {
        name: 'Advanced Fiber',
        analytes: [
          { name: 'NDFD30', price: 9, description: '30-hour NDF digestibility' },
          { name: 'NDFD48', price: 9, description: '48-hour NDF digestibility' },
          { name: 'uNDF240', price: 10, description: 'Undigestible NDF at 240 hours' },
          { name: 'dNDF', price: 8, description: 'Digestible NDF' },
          { name: 'Lignin', price: 7, description: 'Indigestible fiber component' },
        ]
      },
      {
        name: 'CNCPS Parameters',
        analytes: [
          { name: 'Soluble Protein', price: 9, description: 'Rapidly degradable protein' },
          { name: 'NDICP', price: 8, description: 'Neutral detergent insoluble CP' },
          { name: 'ADICP', price: 8, description: 'Acid detergent insoluble CP' },
          { name: 'Kd Rate', price: 10, description: 'Protein degradation rate' },
          { name: 'RDP', price: 9, description: 'Rumen degradable protein' },
          { name: 'RUP', price: 9, description: 'Rumen undegradable protein' },
          { name: 'Fraction A', price: 8, description: 'Non-protein nitrogen' },
          { name: 'Fraction B', price: 8, description: 'True protein' },
          { name: 'Fraction C', price: 8, description: 'Unavailable protein' },
        ]
      },
      {
        name: 'Minerals (NIR)',
        analytes: [
          { name: 'Calcium', price: 6 },
          { name: 'Phosphorus', price: 6 },
          { name: 'Magnesium', price: 6 },
          { name: 'Potassium', price: 6 },
          { name: 'Sodium', price: 6 },
          { name: 'Sulfur', price: 6 },
          { name: 'Chloride', price: 7 },
        ]
      },
      {
        name: 'Energy & Digestibility',
        analytes: [
          { name: 'TDN', price: 8, description: 'Total digestible nutrients' },
          { name: 'NEL', price: 8, description: 'Net energy for lactation' },
          { name: 'NEM', price: 8, description: 'Net energy for maintenance' },
          { name: 'NEG', price: 8, description: 'Net energy for gain' },
          { name: 'Milk per Ton', price: 7, description: 'Estimated milk production' },
          { name: 'Relative Feed Value', price: 6, description: 'RFV quality index' },
        ]
      }
    ]
  },
  {
    section: 'Wet Chemistry',
    categories: [
      {
        name: 'Protein Fractions',
        analytes: [
          { name: 'Total Amino Acids', price: 45, description: 'Complete AA profile' },
          { name: 'Lysine', price: 18, description: 'First limiting amino acid' },
          { name: 'Methionine', price: 18, description: 'Sulfur amino acid' },
          { name: 'RUP (By-pass Protein)', price: 22, description: 'Rumen undegradable protein' },
        ]
      },
      {
        name: 'Minerals (Wet Chem)',
        analytes: [
          { name: 'Calcium', price: 12 },
          { name: 'Phosphorus', price: 12 },
          { name: 'Magnesium', price: 12 },
          { name: 'Potassium', price: 12 },
          { name: 'Sodium', price: 12 },
          { name: 'Sulfur', price: 12 },
          { name: 'Chloride', price: 12 },
          { name: 'Iron', price: 14 },
          { name: 'Zinc', price: 14 },
          { name: 'Copper', price: 14 },
          { name: 'Manganese', price: 14 },
          { name: 'Molybdenum', price: 16 },
        ]
      },
      {
        name: 'Specialized Tests',
        analytes: [
          { name: 'Nitrate', price: 18, description: 'Toxicity screening' },
          { name: 'Mycotoxins (Aflatoxin)', price: 35, description: 'Mold toxin screening' },
          { name: 'DON (Vomitoxin)', price: 38, description: 'Deoxynivalenol toxin' },
          { name: 'Zearalenone', price: 38, description: 'Estrogenic mycotoxin' },
          { name: 'T-2 Toxin', price: 42, description: 'Trichothecene mycotoxin' },
          { name: 'Prussic Acid', price: 25, description: 'Cyanide potential' },
          { name: 'pH', price: 8, description: 'Acidity level' },
          { name: 'Total VFA', price: 20, description: 'Volatile fatty acids' },
          { name: 'Lactic Acid', price: 16, description: 'Fermentation indicator' },
          { name: 'Acetic Acid', price: 16, description: 'Fermentation byproduct' },
          { name: 'Butyric Acid', price: 16, description: 'Clostridial fermentation' },
        ]
      },
      {
        name: 'Trace Minerals',
        analytes: [
          { name: 'Cobalt', price: 16, description: 'Vitamin B12 precursor' },
          { name: 'Selenium', price: 18, description: 'Antioxidant mineral' },
          { name: 'Iodine', price: 18, description: 'Thyroid function' },
          { name: 'Chromium', price: 16, description: 'Glucose metabolism' },
        ]
      }
    ]
  }
];

export function CustomPackages({
  onClose,
  darkMode,
  selectedFarm,
  savedPackages,
  onSavePackage,
  onDeletePackage
}: CustomPackagesProps) {
  const [selectedAnalytes, setSelectedAnalytes] = useState<Analyte[]>([]);
  const [tempPackageName, setTempPackageName] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('NIR Analysis');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [mobileView, setMobileView] = useState<'browse' | 'cart'>('browse');

  const toggleAnalyte = (analyte: Analyte) => {
    setSelectedAnalytes(prev => {
      const exists = prev.find(a => a.name === analyte.name);
      if (exists) {
        return prev.filter(a => a.name !== analyte.name);
      } else {
        return [...prev, analyte];
      }
    });
  };

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  const getTotalPrice = () => {
    return selectedAnalytes.reduce((sum, a) => sum + a.price, 0);
  };

  const handleSavePackage = () => {
    if (selectedAnalytes.length === 0) return;
    setShowSaveDialog(true);
  };

  const confirmSavePackage = () => {
    if (!tempPackageName.trim()) return;

    const newPackage: CustomPackage = {
      id: `custom-${Date.now()}`,
      name: tempPackageName.trim(),
      analytes: selectedAnalytes.map(a => a.name),
      createdAt: new Date()
    };

    onSavePackage(newPackage);
    setSelectedAnalytes([]);
    setTempPackageName('');
    setShowSaveDialog(false);
  };

  const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-300' : 'text-gray-600';
  const textTertiary = darkMode ? 'text-gray-400' : 'text-gray-500';
  const bgPrimary = darkMode ? 'bg-gray-800' : 'bg-white';
  const bgSecondary = darkMode ? 'bg-gray-700' : 'bg-gray-50';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';

  const currentSection = FEED_ANALYTES.find(s => s.section === selectedSection);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className={`${bgPrimary} rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${borderColor}`}>
          <div>
            <h2 className={`text-2xl font-bold ${textPrimary}`}>
              Custom Package Builder
            </h2>
            <p className={`text-sm ${textSecondary} mt-1`}>
              Select individual analytes to build your own package
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Mobile View Toggle */}
          <div className={`md:hidden flex gap-2 p-4 border-b ${borderColor}`}>
            <button
              onClick={() => setMobileView('browse')}
              className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${
                mobileView === 'browse'
                  ? darkMode 
                    ? 'bg-gray-600 text-white' 
                    : 'bg-gray-700 text-white'
                  : darkMode 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 text-gray-600'
              }`}
            >
              Browse Tests
            </button>
            <button
              onClick={() => setMobileView('cart')}
              className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all relative ${
                mobileView === 'cart'
                  ? darkMode 
                    ? 'bg-gray-600 text-white' 
                    : 'bg-gray-700 text-white'
                  : darkMode 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 text-gray-600'
              }`}
            >
              Your Selection
              {selectedAnalytes.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {selectedAnalytes.length}
                </span>
              )}
            </button>
          </div>

          {/* Left Side - Analyte Selection */}
          <div className={`flex-1 flex-col overflow-hidden ${mobileView === 'browse' ? 'flex' : 'hidden md:flex'}`}>
            {/* Section Toggle Switch */}
            <div className={`flex justify-center items-center p-6 border-b ${borderColor}`}>
              <div className={`relative inline-flex items-center rounded-full p-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} shadow-inner`}>
                {/* Sliding Background */}
                <div 
                  className={`absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-in-out shadow-lg ${
                    selectedSection === 'NIR Analysis' 
                      ? 'left-1 bg-gradient-to-r from-[#2d7a3e] to-[#3a9650]' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-700'
                  }`}
                  style={{
                    width: 'calc(50% - 4px)',
                    transform: selectedSection === 'Wet Chemistry' ? 'translateX(calc(100% + 4px))' : 'translateX(0)'
                  }}
                />
                
                {/* NIR Button */}
                <button
                  onClick={() => setSelectedSection('NIR Analysis')}
                  className={`relative z-10 px-6 md:px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${
                    selectedSection === 'NIR Analysis'
                      ? 'text-white'
                      : darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  NIR Analysis
                </button>
                
                {/* Wet Chem Button */}
                <button
                  onClick={() => setSelectedSection('Wet Chemistry')}
                  className={`relative z-10 px-6 md:px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${
                    selectedSection === 'Wet Chemistry'
                      ? 'text-white'
                      : darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Wet Chemistry
                </button>
              </div>
            </div>

            {/* Analytes List */}
            <div className="flex-1 overflow-y-auto p-4">
              {currentSection?.categories.map((category) => {
                const isExpanded = expandedCategories.has(category.name);
                return (
                  <div key={category.name} className={`mb-4 border ${borderColor} rounded-lg overflow-hidden`}>
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className={`w-full flex items-center justify-between p-3 ${bgSecondary} ${textPrimary} font-semibold hover:opacity-80 transition-opacity`}
                    >
                      <span>{category.name}</span>
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>

                    {/* Analytes */}
                    {isExpanded && (
                      <div className="p-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
                        {category.analytes.map((analyte) => {
                          const isSelected = selectedAnalytes.some(a => a.name === analyte.name);
                          return (
                            <button
                              key={analyte.name}
                              onClick={() => toggleAnalyte(analyte)}
                              className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                                isSelected
                                  ? darkMode ? 'bg-gray-700 border-2 border-gray-500' : 'bg-gray-200 border-2 border-gray-400'
                                  : darkMode
                                    ? 'bg-gray-700 hover:bg-gray-600'
                                    : 'bg-white hover:bg-gray-50 border border-gray-200'
                              }`}
                            >
                              <div className="flex items-center gap-3 flex-1 text-left">
                                <div>
                                  <div className={`font-medium ${textPrimary}`}>
                                    {analyte.name}
                                  </div>
                                  {analyte.description && (
                                    <div className={`text-xs ${textTertiary}`}>
                                      {analyte.description}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className={`font-bold ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                                ${analyte.price}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Selected Package */}
          <div className={`w-full md:w-96 md:border-l ${borderColor} flex flex-col ${mobileView === 'cart' ? 'flex' : 'hidden md:flex'} overflow-hidden`}>
            <div className={`p-4 border-b ${borderColor}`}>
              <h3 className={`font-bold ${textPrimary} text-lg`}>Your Custom Package</h3>
              <p className={`text-sm ${textSecondary}`}>
                {selectedAnalytes.length} analytes selected
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 min-h-0">
              {selectedAnalytes.length === 0 ? (
                <div className={`text-center py-8 ${textTertiary}`}>
                  <p className="text-sm">No analytes selected yet</p>
                  <p className="text-xs mt-2">Switch to "Browse Tests" to add them</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedAnalytes.map((analyte) => (
                    <div
                      key={analyte.name}
                      className={`flex items-center justify-between p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                    >
                      <span className={`text-sm ${textPrimary}`}>{analyte.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>${analyte.price}</span>
                        <button
                          onClick={() => toggleAnalyte(analyte)}
                          className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                        >
                          <X className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total and Save - Fixed to bottom on mobile */}
            {selectedAnalytes.length > 0 && (
              <div className={`p-4 border-t ${borderColor} bg-opacity-95 backdrop-blur-sm ${darkMode ? 'bg-gray-800' : 'bg-white'} flex-shrink-0`}>
                <div className={`flex items-center justify-between mb-4 text-lg font-bold ${textPrimary}`}>
                  <span>Total Price:</span>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-700'}>${getTotalPrice()}</span>
                </div>
                <button
                  onClick={handleSavePackage}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg"
                >
                  Save Custom Package
                </button>
                <button
                  onClick={() => setMobileView('browse')}
                  className={`w-full mt-2 md:hidden py-2 rounded-lg text-sm ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  ← Back to Browse
                </button>
              </div>
            )}

            {/* Saved Packages */}
            <div className={`p-4 border-t ${borderColor} flex-shrink-0`}>
              <h4 className={`font-bold ${textPrimary} mb-3`}>Example Packages</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {/* Example Package 1 */}
                <div className={`p-3 rounded ${darkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className="flex-1">
                    <div className={`font-medium ${textPrimary} text-sm`}>High Fiber Analysis</div>
                    <div className={`text-xs ${textTertiary} mt-1`}>
                      CP, ADF, NDF, NDFD30, NDFD48, uNDF240, Lignin
                    </div>
                    <div className={`text-xs ${textSecondary} mt-1`}>
                      7 analytes • $54 total
                    </div>
                  </div>
                </div>

                {/* Example Package 2 */}
                <div className={`p-3 rounded ${darkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className="flex-1">
                    <div className={`font-medium ${textPrimary} text-sm`}>Corn Silage Essentials</div>
                    <div className={`text-xs ${textTertiary} mt-1`}>
                      CP, ADF, NDF, Moisture, Starch, NEL, Milk per Ton
                    </div>
                    <div className={`text-xs ${textSecondary} mt-1`}>
                      7 analytes • $48 total
                    </div>
                  </div>
                </div>

                {/* Example Package 3 */}
                <div className={`p-3 rounded ${darkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className="flex-1">
                    <div className={`font-medium ${textPrimary} text-sm`}>CNCPS Protein Focus</div>
                    <div className={`text-xs ${textTertiary} mt-1`}>
                      CP, Soluble Protein, NDICP, ADICP, RDP, RUP, Fraction A, B, C
                    </div>
                    <div className={`text-xs ${textSecondary} mt-1`}>
                      9 analytes • $78 total
                    </div>
                  </div>
                </div>

                {/* Example Package 4 */}
                <div className={`p-3 rounded ${darkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className="flex-1">
                    <div className={`font-medium ${textPrimary} text-sm`}>Mineral Complete</div>
                    <div className={`text-xs ${textTertiary} mt-1`}>
                      Ca, P, Mg, K, Na, S, Cl, Copper, Zinc, Manganese, Iron
                    </div>
                    <div className={`text-xs ${textSecondary} mt-1`}>
                      11 analytes • $74 total
                    </div>
                  </div>
                </div>

                {/* Example Package 5 */}
                <div className={`p-3 rounded ${darkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className="flex-1">
                    <div className={`font-medium ${textPrimary} text-sm`}>Quick Check Bundle</div>
                    <div className={`text-xs ${textTertiary} mt-1`}>
                      Moisture, CP, ADF, NDF, Starch
                    </div>
                    <div className={`text-xs ${textSecondary} mt-1`}>
                      5 analytes • $31 total
                    </div>
                  </div>
                </div>

                {/* Divider if there are saved packages */}
                {savedPackages.length > 0 && (
                  <div className={`border-t ${borderColor} pt-2 mt-2`}>
                    <h4 className={`font-bold ${textPrimary} mb-2 text-sm`}>Your Saved Packages</h4>
                  </div>
                )}

                {/* User's saved packages */}
                {savedPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`flex items-center justify-between p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                  >
                    <div className="flex-1">
                      <div className={`font-medium ${textPrimary} text-sm`}>{pkg.name}</div>
                      <div className={`text-xs ${textTertiary}`}>
                        {pkg.analytes.length} items
                      </div>
                    </div>
                    <button
                      onClick={() => onDeletePackage(pkg.id)}
                      className="p-1 hover:bg-red-100 rounded"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
          <div className={`${bgPrimary} rounded-lg p-6 max-w-md w-full`}>
            <h3 className={`text-xl font-bold ${textPrimary} mb-4`}>Name Your Package</h3>
            <input
              type="text"
              value={tempPackageName}
              onChange={(e) => setTempPackageName(e.target.value)}
              placeholder="e.g., My Custom Forage Panel"
              className={`w-full p-3 rounded-lg border ${borderColor} ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} mb-4`}
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowSaveDialog(false)}
                className={`flex-1 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                Cancel
              </button>
              <button
                onClick={confirmSavePackage}
                disabled={!tempPackageName.trim()}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Package
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}