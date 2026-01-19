import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Plus, X, AlertCircle, Check, Beaker, Clock, FlaskConical } from 'lucide-react';
import { GenericLabLogo } from '@/app/components/GenericLabLogo';

interface ModifyTestsProps {
  onBack: () => void;
  darkMode?: boolean;
  sampleId: string;
  currentPackage: string;
  currentAddOns: string[];
  currentSampleName?: string;
}

export function ModifyTests({ onBack, darkMode, sampleId, currentPackage, currentAddOns, currentSampleName = '' }: ModifyTestsProps) {
  const [selectedPackage, setSelectedPackage] = useState(currentPackage);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(currentAddOns);
  const [sampleName, setSampleName] = useState(currentSampleName);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [detailPopup, setDetailPopup] = useState<string | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bgColor = darkMode ? 'bg-[#181818]' : 'bg-stone-200';
  const cardBg = darkMode ? 'bg-[#252525]' : 'bg-white';
  const cardBorder = darkMode ? 'border border-[#2C2C2C]' : 'shadow-md';
  const headerBg = darkMode ? 'bg-[#252525]' : 'bg-white';
  const headerBorder = darkMode ? 'border-b border-[#2C2C2C]' : 'shadow-sm';
  const textPrimary = darkMode ? 'text-[#E0E0E0]' : 'text-stone-800';
  const textSecondary = darkMode ? 'text-[#C0C0C0]' : 'text-stone-600';
  const textTertiary = darkMode ? 'text-[#909090]' : 'text-stone-500';
  const hoverBg = darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-stone-100';
  const borderColor = darkMode ? 'border-[#2C2C2C]' : 'border-stone-200';
  const inputBg = darkMode ? 'bg-[#1A1A1A]' : 'bg-white';
  const inputBorder = darkMode ? 'border-[#3C3C3C]' : 'border-stone-300';

  const packages = [
    {
      id: 'basic',
      name: 'Basic Check',
      price: 22,
      description: 'NIR Analysis: CP, ADF, NDF, Moisture, Starch',
      popular: false,
    },
    {
      id: 'nutritionist',
      name: 'Nutritionist Select',
      price: 32,
      description: 'NIR Analysis: CP, ADF, NDF, NDFD30, Moisture, Starch, Fat, Ash, Sugar, dNDF',
      popular: true,
    },
    {
      id: 'cncps',
      name: 'CNCPS Complete',
      price: 45,
      description: 'Full NIR + CNCPS Parameters: All Nutritionist Select plus kd, Soluble Protein, NDICP',
      popular: false,
    },
  ];

  const addOns = [
    {
      id: 'dcad',
      name: 'DCAD (Dietary Cation-Anion Difference)',
      price: 18,
      description: 'Wet chemistry analysis for K, Na, Cl, S. Essential for close-up dry cow rations.',
      details: {
        icon: 'beaker',
        methodology: 'Atomic Absorption Spectroscopy (AAS) and Ion Chromatography',
        turnaround: '3-4 business days',
        parameters: ['Potassium (K)', 'Sodium (Na)', 'Chloride (Cl)', 'Sulfur (S)'],
        whyItMatters: 'DCAD is critical for managing transition cow health and preventing milk fever. Proper cation-anion balance in close-up dry cow rations helps mobilize calcium and reduce metabolic disorders.',
        idealFor: 'Close-up dry cow rations, transition cow management programs'
      }
    },
    {
      id: 'minerals',
      name: 'Complete Minerals Panel',
      price: 25,
      description: 'Wet chemistry for Ca, P, Mg, K, Na, Fe, Zn, Cu, Mn, S. Comprehensive mineral profile.',
      details: {
        icon: 'flask',
        methodology: 'ICP-OES (Inductively Coupled Plasma Optical Emission Spectroscopy)',
        turnaround: '3-4 business days',
        parameters: ['Calcium (Ca)', 'Phosphorus (P)', 'Magnesium (Mg)', 'Potassium (K)', 'Sodium (Na)', 'Iron (Fe)', 'Zinc (Zn)', 'Copper (Cu)', 'Manganese (Mn)', 'Sulfur (S)'],
        whyItMatters: 'A complete mineral profile reveals the actual mineral content of your feed, enabling precise ration balancing and preventing both deficiencies and toxicities. Essential for optimizing herd health and milk production.',
        idealFor: 'Total mixed rations, corn silage, haylage, mineral supplementation programs'
      }
    },
    {
      id: 'insitu',
      name: 'In Situ Digestibility',
      price: 35,
      description: 'Rumen cannulated cow testing for true protein digestibility. Most accurate feed evaluation.',
      details: {
        icon: 'clock',
        methodology: 'In Vivo Rumen Cannulation (Dacron Bag Technique)',
        turnaround: '7-10 business days',
        parameters: ['0h, 6h, 12h, 24h, 48h digestibility', 'Degradation rate (kd)', 'Effective degradability'],
        whyItMatters: 'In situ testing provides the gold standard for determining actual rumen degradability of protein and fiber. This real-world data from live rumen environment is far more accurate than laboratory predictions.',
        idealFor: 'High-value feeds, validating NIR predictions, research applications, troubleshooting ration issues'
      }
    },
  ];

  const handleToggleAddOn = (addOnId: string) => {
    if (selectedAddOns.includes(addOnId)) {
      setSelectedAddOns(selectedAddOns.filter(id => id !== addOnId));
    } else {
      setSelectedAddOns([...selectedAddOns, addOnId]);
    }
  };

  const handleSaveChanges = () => {
    setShowConfirmation(true);
  };

  const calculateTotal = () => {
    const packagePrice = packages.find(p => p.id === selectedPackage)?.price || 0;
    const addOnsPrice = selectedAddOns.reduce((sum, id) => {
      const addOn = addOns.find(a => a.id === id);
      return sum + (addOn?.price || 0);
    }, 0);
    return packagePrice + addOnsPrice;
  };

  const calculateAdditionalCost = () => {
    const currentPackagePrice = packages.find(p => p.name === currentPackage)?.price || 0;
    const currentAddOnsPrice = currentAddOns.reduce((sum, name) => {
      const addOn = addOns.find(a => a.name === name);
      return sum + (addOn?.price || 0);
    }, 0);
    const currentTotal = currentPackagePrice + currentAddOnsPrice;
    
    return calculateTotal() - currentTotal;
  };

  if (showConfirmation) {
    const additionalCost = calculateAdditionalCost();
    
    return (
      <div className={`min-h-screen ${bgColor} pb-24`}>
        {/* Header */}
        <header className={`${headerBg} ${headerBorder} sticky top-0 z-10`}>
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="flex-1">
              <h1 className={`font-semibold ${textPrimary}`}>Modification Confirmed</h1>
              <p className={`text-sm ${textSecondary}`}>{sampleId}</p>
            </div>
          </div>
        </header>

        <main className="px-4 py-6">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className={`w-20 h-20 rounded-full ${darkMode ? 'bg-green-500/20' : 'bg-green-100'} flex items-center justify-center mx-auto mb-4`}>
              <CheckCircle2 className={`size-10 ${darkMode ? 'text-green-400' : 'text-green-600'}`} strokeWidth={2} />
            </div>
            <h2 className={`text-2xl font-bold ${textPrimary} mb-2`}>Tests Updated!</h2>
            <p className={`${textSecondary}`}>Your sample testing has been modified</p>
          </div>

          {/* Updated Tests */}
          <div className={`${cardBg} ${cardBorder} rounded-2xl overflow-hidden mb-6`}>
            <div className={`px-5 py-4 ${borderColor} border-b`}>
              <h3 className={`text-lg font-semibold ${textPrimary}`}>Updated Test Package</h3>
            </div>
            
            <div className="p-5">
              <div className={`font-semibold ${textPrimary} mb-2`}>
                {packages.find(p => p.id === selectedPackage)?.name}
              </div>
              <div className={`text-sm ${textSecondary} mb-4`}>
                {packages.find(p => p.id === selectedPackage)?.description}
              </div>

              {selectedAddOns.length > 0 && (
                <>
                  <div className={`text-sm font-medium ${textTertiary} mb-2 uppercase tracking-wide`}>
                    Add-On Tests
                  </div>
                  <div className="space-y-2">
                    {selectedAddOns.map((id) => {
                      const addOn = addOns.find(a => a.id === id);
                      return (
                        <div key={id} className={`text-sm ${textSecondary}`}>
                          • {addOn?.name}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Cost Summary */}
          <div className={`${cardBg} ${cardBorder} rounded-xl p-5`}>
            {additionalCost > 0 ? (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className={`${textSecondary}`}>Additional Cost</span>
                  <span className={`text-xl font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                    +${additionalCost.toFixed(2)}
                  </span>
                </div>
                <div className={`text-xs ${textTertiary}`}>
                  This amount will be added to your account balance
                </div>
              </>
            ) : additionalCost < 0 ? (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className={`${textSecondary}`}>Credit Applied</span>
                  <span className={`text-xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                    ${Math.abs(additionalCost).toFixed(2)}
                  </span>
                </div>
                <div className={`text-xs ${textTertiary}`}>
                  This amount will be credited to your account
                </div>
              </>
            ) : (
              <div className={`text-center ${textSecondary}`}>
                No additional cost for this modification
              </div>
            )}
          </div>
        </main>

        {/* Fixed Bottom Button */}
        <div className={`fixed bottom-0 left-0 right-0 ${cardBg} border-t ${borderColor} p-4 shadow-lg`}>
          <button
            onClick={onBack}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition-all shadow-md active:scale-98"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

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
            <h1 className={`font-semibold ${textPrimary}`}>Modify Tests</h1>
            <p className={`text-sm ${textSecondary}`}>{sampleId}</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 pb-32 max-w-2xl mx-auto">
        {/* Important Notice */}
        <div className={`mb-6 ${darkMode ? 'bg-blue-900/20 border-blue-800/30' : 'bg-blue-50 border-blue-200'} border rounded-xl p-4`}>
          <div className={`flex items-start gap-3`}>
            <div className={`${darkMode ? 'bg-blue-800/40' : 'bg-blue-100'} rounded-lg p-2 flex-shrink-0`}>
              <svg className={`size-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-900'} mb-1`}>Lab Approval Required</h3>
              <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                If sample processing or analysis has already begun, these modifications will need to be reviewed and approved by lab staff. You'll be notified of the approval status via email.
              </p>
            </div>
          </div>
        </div>

        {/* Sample Name */}
        <div className="mb-6">
          <div className={`text-sm font-medium ${textTertiary} mb-2 uppercase tracking-wide`}>Sample Name</div>
          <input
            type="text"
            value={sampleName}
            onChange={(e) => setSampleName(e.target.value)}
            placeholder="Enter sample name (optional)"
            className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-xl ${textPrimary} placeholder:${textTertiary} focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500' : 'focus:ring-green-600'}`}
          />
        </div>

        {/* Current Package */}
        <div className="mb-6">
          <div className={`text-sm font-medium ${textTertiary} mb-2 uppercase tracking-wide`}>Current Package</div>
          <div className={`${cardBg} ${cardBorder} rounded-xl p-4`}>
            <div className={`font-semibold ${textPrimary} mb-1`}>{currentPackage}</div>
            {currentAddOns.length > 0 && (
              <div className={`text-sm ${textSecondary}`}>
                Add-ons: {currentAddOns.join(', ')}
              </div>
            )}
          </div>
        </div>

        {/* NIR Package Selection */}
        <div className="mb-4 md:mb-6">
          <h2 className={`text-lg font-semibold ${textPrimary} mb-3 md:mb-4`}>NIR Test Package</h2>
          <div className="space-y-2 md:space-y-3">
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`w-full text-left ${cardBg} ${cardBorder} rounded-xl p-3 md:p-4 transition-all ${
                  selectedPackage === pkg.id
                    ? darkMode
                      ? 'ring-2 ring-green-500'
                      : 'ring-2 ring-green-600'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between mb-1.5 md:mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5 md:mb-1">
                      <span className={`font-semibold ${textPrimary}`}>{pkg.name}</span>
                      {pkg.popular && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <div className={`text-sm ${textSecondary} mb-0 md:mb-2`}>{pkg.description}</div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <div className={`text-lg font-bold ${textPrimary}`}>${pkg.price}</div>
                    {selectedPackage === pkg.id && (
                      <CheckCircle2 className={`size-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Wet Chemistry Add-Ons */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className={`text-lg font-semibold ${textPrimary}`}>Wet Chemistry Add-Ons</h2>
            <span className={`text-xs ${textTertiary} uppercase tracking-wide`}>(Optional)</span>
          </div>
          <div className="space-y-3">
            {addOns.map((addOn) => (
              <div key={addOn.id} className="relative">
                <button
                  onClick={() => {
                    handleToggleAddOn(addOn.id);
                    setDetailPopup(addOn.id);
                  }}
                  className={`w-full text-left ${cardBg} ${cardBorder} rounded-xl p-4 transition-all ${
                    selectedAddOns.includes(addOn.id)
                      ? darkMode
                        ? 'ring-2 ring-blue-500'
                        : 'ring-2 ring-blue-600'
                      : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-semibold ${textPrimary}`}>{addOn.name}</span>
                        {selectedAddOns.includes(addOn.id) && (
                          <CheckCircle2 className={`size-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        )}
                      </div>
                      <div className={`text-sm ${textSecondary}`}>{addOn.description}</div>
                    </div>
                    <div className="ml-4">
                      <div className={`text-lg font-bold ${textPrimary}`}>+${addOn.price}</div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Current Selection Summary */}
        <div className={`${cardBg} ${cardBorder} rounded-xl p-5`}>
          <div className={`font-semibold ${textPrimary} mb-3`}>New Total</div>
          <div className="space-y-2 mb-3">
            <div className="flex justify-between text-sm">
              <span className={textSecondary}>{packages.find(p => p.id === selectedPackage)?.name}</span>
              <span className={textPrimary}>${packages.find(p => p.id === selectedPackage)?.price}</span>
            </div>
            {selectedAddOns.map((id) => {
              const addOn = addOns.find(a => a.id === id);
              return (
                <div key={id} className="flex justify-between text-sm">
                  <span className={textSecondary}>{addOn?.name}</span>
                  <span className={textPrimary}>+${addOn?.price}</span>
                </div>
              );
            })}
          </div>
          <div className={`border-t ${borderColor} pt-3 flex justify-between items-center`}>
            <span className={`font-semibold ${textPrimary}`}>Total</span>
            <span className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
              ${calculateTotal()}
            </span>
          </div>
          {calculateAdditionalCost() !== 0 && (
            <div className={`text-xs ${textTertiary} mt-2 text-right`}>
              {calculateAdditionalCost() > 0 ? '+' : ''}${calculateAdditionalCost().toFixed(2)} vs. current
            </div>
          )}
        </div>
      </main>

      {/* Fixed Bottom Button */}
      <div className={`fixed bottom-0 left-0 right-0 ${cardBg} border-t ${borderColor} p-4 shadow-lg`}>
        <button
          onClick={handleSaveChanges}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="size-5" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Detail Popup Modal */}
      {detailPopup && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setDetailPopup(null)}
        >
          <div 
            className={`${cardBg} rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const addOn = addOns.find(a => a.id === detailPopup);
              if (!addOn) return null;

              const IconComponent = addOn.details.icon === 'beaker' ? Beaker : 
                                   addOn.details.icon === 'flask' ? FlaskConical : Clock;

              return (
                <>
                  {/* Header */}
                  <div className={`sticky top-0 ${headerBg} ${headerBorder} px-6 py-4 flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <div className={`${darkMode ? 'bg-blue-600/20' : 'bg-blue-100'} rounded-xl p-2.5`}>
                        <IconComponent className={`size-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      </div>
                      <div>
                        <h3 className={`font-bold ${textPrimary}`}>{addOn.name}</h3>
                        <p className={`text-sm ${textTertiary}`}>Wet Chemistry Analysis</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setDetailPopup(null)}
                      className={`p-2 ${hoverBg} rounded-full transition-colors`}
                    >
                      <X className={`size-5 ${textSecondary}`} />
                    </button>
                  </div>

                  {/* Scrollable Content */}
                  <div className="overflow-y-auto max-h-[calc(85vh-80px)] sm:max-h-[calc(90vh-80px)] px-6 py-6 space-y-6">
                    {/* Price Badge */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 ${darkMode ? 'bg-green-600/20' : 'bg-green-50'} rounded-full`}>
                      <span className={`text-sm ${textSecondary}`}>Add-on Price:</span>
                      <span className={`text-xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>+${addOn.price}</span>
                    </div>

                    {/* Why It Matters */}
                    <div>
                      <h4 className={`font-semibold ${textPrimary} mb-3 flex items-center gap-2`}>
                        <div className={`w-1 h-5 ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} rounded-full`}></div>
                        Why It Matters
                      </h4>
                      <p className={`${textSecondary} leading-relaxed`}>
                        {addOn.details.whyItMatters}
                      </p>
                    </div>

                    {/* Methodology */}
                    <div className={`${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-50'} rounded-2xl p-5`}>
                      <div className="flex items-start gap-3">
                        <div className={`${darkMode ? 'bg-purple-600/20' : 'bg-purple-100'} rounded-lg p-2 flex-shrink-0`}>
                          <FlaskConical className={`size-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${textPrimary} mb-1.5`}>Laboratory Method</h4>
                          <p className={`text-sm ${textSecondary}`}>{addOn.details.methodology}</p>
                        </div>
                      </div>
                    </div>

                    {/* Turnaround Time */}
                    <div className={`${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-50'} rounded-2xl p-5`}>
                      <div className="flex items-start gap-3">
                        <div className={`${darkMode ? 'bg-orange-600/20' : 'bg-orange-100'} rounded-lg p-2 flex-shrink-0`}>
                          <Clock className={`size-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${textPrimary} mb-1.5`}>Turnaround Time</h4>
                          <p className={`text-sm ${textSecondary}`}>{addOn.details.turnaround}</p>
                        </div>
                      </div>
                    </div>

                    {/* Parameters Tested */}
                    <div>
                      <h4 className={`font-semibold ${textPrimary} mb-3 flex items-center gap-2`}>
                        <div className={`w-1 h-5 ${darkMode ? 'bg-green-500' : 'bg-green-600'} rounded-full`}></div>
                        Parameters Tested
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {addOn.details.parameters.map((param, idx) => (
                          <div 
                            key={idx}
                            className={`flex items-center gap-2 px-3 py-2.5 ${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-50'} rounded-lg`}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-green-400' : 'bg-green-600'}`}></div>
                            <span className={`text-sm ${textPrimary}`}>{param}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ideal For */}
                    <div className={`${darkMode ? 'bg-blue-900/20 border-blue-800/30' : 'bg-blue-50 border-blue-200'} border rounded-2xl p-5`}>
                      <h4 className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-900'} mb-2`}>
                        Ideal For
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                        {addOn.details.idealFor}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      {selectedAddOns.includes(addOn.id) ? (
                        <button
                          onClick={() => {
                            handleToggleAddOn(addOn.id);
                            setDetailPopup(null);
                          }}
                          className={`flex-1 ${darkMode ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' : 'bg-red-50 text-red-600 hover:bg-red-100'} py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2`}
                        >
                          <X className="size-5" />
                          Remove Test
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            handleToggleAddOn(addOn.id);
                            setDetailPopup(null);
                          }}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                        >
                          <Check className="size-5" />
                          Add This Test
                        </button>
                      )}
                      <button
                        onClick={() => setDetailPopup(null)}
                        className={`px-6 py-3.5 ${darkMode ? 'bg-[#2C2C2C] hover:bg-[#333333]' : 'bg-gray-200 hover:bg-gray-300'} ${textPrimary} rounded-xl font-semibold transition-all`}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}