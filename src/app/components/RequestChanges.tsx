import { ArrowLeft, Check, X, Plus, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface RequestChangesProps {
  onBack: () => void;
  onSubmit: (changes: ChangeRequest) => void;
  darkMode: boolean;
  sampleId: string;
  currentPackage: string;
  currentAddOns: string[];
  sampleType: string;
  currentSampleName?: string;
}

export interface ChangeRequest {
  newPackage?: string;
  addOnsToAdd: string[];
  addOnsToRemove: string[];
  notes: string;
  newSampleName?: string;
}

export function RequestChanges({ onBack, onSubmit, darkMode, sampleId, currentPackage, currentAddOns, sampleType, currentSampleName = '' }: RequestChangesProps) {
  const [selectedPackage, setSelectedPackage] = useState<string>(currentPackage);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set(currentAddOns));
  const [changeNotes, setChangeNotes] = useState('');
  const [sampleName, setSampleName] = useState(currentSampleName);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bgColor = darkMode ? 'bg-[#181818]' : 'bg-stone-200';
  const cardBg = darkMode ? 'bg-[#252525]' : 'bg-white';
  const textPrimary = darkMode ? 'text-[#E0E0E0]' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-[#C0C0C0]' : 'text-gray-600';
  const textTertiary = darkMode ? 'text-[#909090]' : 'text-gray-500';
  const inputBg = darkMode ? 'bg-[#1A1A1A]' : 'bg-white';
  const inputBorder = darkMode ? 'border-[#3C3C3C]' : 'border-gray-300';
  const hoverBg = darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-100';

  const packages = [
    {
      name: 'Basic Check',
      price: 35,
      features: ['Dry Matter', 'Crude Protein', 'ADF', 'NDF', 'Lignin', 'Starch']
    },
    {
      name: 'Nutritionist Select',
      price: 55,
      features: ['All Basic Tests', 'RFQ/RFV', 'NEL', 'TDN', 'Sugars', 'Fat']
    },
    {
      name: 'CNCPS Complete',
      price: 85,
      features: ['All Nutritionist Tests', 'CNCPS Analysis', 'Protein Fractions', 'Advanced Fiber']
    }
  ];

  const availableAddOns = [
    { name: 'DCAD', price: 15, description: 'Dietary Cation-Anion Difference' },
    { name: 'Complete Minerals Panel', price: 25, description: 'Ca, P, Mg, K, Na, S, Fe, Zn, Cu, Mn' },
    { name: 'In Situ Digestibility', price: 40, description: '24hr & 48hr rumen degradation' },
  ];

  const toggleAddOn = (addOnName: string) => {
    const newSelected = new Set(selectedAddOns);
    if (newSelected.has(addOnName)) {
      newSelected.delete(addOnName);
    } else {
      newSelected.add(addOnName);
    }
    setSelectedAddOns(newSelected);
  };

  const hasChanges = () => {
    const packageChanged = selectedPackage !== currentPackage;
    const addOnsChanged = 
      selectedAddOns.size !== currentAddOns.length ||
      ![...selectedAddOns].every(addon => currentAddOns.includes(addon));
    const nameChanged = sampleName !== currentSampleName;
    return packageChanged || addOnsChanged || nameChanged;
  };

  const handleSubmitRequest = () => {
    const addOnsToAdd = [...selectedAddOns].filter(addon => !currentAddOns.includes(addon));
    const addOnsToRemove = currentAddOns.filter(addon => !selectedAddOns.has(addon));
    
    const changeRequest: ChangeRequest = {
      newPackage: selectedPackage !== currentPackage ? selectedPackage : undefined,
      addOnsToAdd,
      addOnsToRemove,
      notes: changeNotes,
      newSampleName: sampleName !== currentSampleName ? sampleName : undefined
    };

    onSubmit(changeRequest);
    setShowConfirmation(true);
  };

  if (showConfirmation) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center p-4`}>
        <div className={`${cardBg} rounded-2xl shadow-2xl max-w-md w-full p-8 text-center`}>
          <div className="mb-6">
            <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="size-8 text-green-600" strokeWidth={3} />
            </div>
            <h2 className={`text-2xl font-bold ${textPrimary} mb-2`}>Change Request Submitted</h2>
            <p className={`${textSecondary} mb-4`}>
              Your change request for sample <span className="font-mono font-semibold">{sampleId}</span> has been submitted successfully.
            </p>
            <div className={`${darkMode ? 'bg-[#1E1E1E]' : 'bg-blue-50'} ${darkMode ? 'border border-[#3C3C3C]' : 'border border-blue-200'} rounded-lg p-4 text-left mb-6`}>
              <div className="flex gap-3">
                <AlertCircle className={`size-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'} flex-shrink-0 mt-0.5`} />
                <div>
                  <h3 className={`font-semibold ${textPrimary} mb-1 text-sm`}>What happens next?</h3>
                  <p className={`text-xs ${textSecondary}`}>
                    Our lab team will review your request and make the changes before processing begins. You'll receive a confirmation email once the changes are applied to your sample.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onBack}
            className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgColor}`}>
      {/* Header */}
      <div className={`${cardBg} ${darkMode ? 'border-b border-[#2C2C2C]' : 'shadow-sm'} sticky top-0 z-10`}>
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={onBack}
              className={`p-2 ${hoverBg} rounded-full transition-colors`}
            >
              <ArrowLeft className={`size-5 ${textSecondary}`} />
            </button>
            <div>
              <h1 className={`text-lg font-semibold ${textPrimary}`}>Make Changes</h1>
              <p className={`text-sm ${textTertiary}`}>Sample {sampleId} • {sampleType}</p>
            </div>
          </div>
          
          {/* Info Banner */}
          <div className={`${darkMode ? 'bg-[#1E1E1E]' : 'bg-amber-50'} ${darkMode ? 'border border-[#3C3C3C]' : 'border border-amber-200'} rounded-lg p-3 mt-3`}>
            <div className="flex gap-2">
              <AlertCircle className={`size-5 ${darkMode ? 'text-amber-400' : 'text-amber-600'} flex-shrink-0`} />
              <p className={`text-xs ${darkMode ? 'text-[#C0C0C0]' : 'text-amber-800'}`}>
                This sample hasn't been processed yet. Request changes now and our team will confirm before processing begins.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 py-6 pb-32 max-w-2xl mx-auto">
        {/* Sample Name */}
        <div className="mb-6">
          <h3 className={`text-sm font-semibold ${textTertiary} uppercase tracking-wider mb-3`}>Sample Name</h3>
          <input
            type="text"
            value={sampleName}
            onChange={(e) => setSampleName(e.target.value)}
            placeholder="Enter sample name (optional)"
            className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-xl ${textPrimary} placeholder:${textTertiary} focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500' : 'focus:ring-green-600'}`}
          />
        </div>

        {/* Current Configuration */}
        <div className={`${cardBg} rounded-xl p-4 mb-6 ${darkMode ? 'border border-[#2C2C2C]' : 'shadow-sm'}`}>
          <h3 className={`text-sm font-semibold ${textTertiary} uppercase tracking-wider mb-3`}>Current Configuration</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${textSecondary}`}>Test Package:</span>
              <span className={`text-sm font-semibold ${textPrimary}`}>{currentPackage}</span>
            </div>
            {currentAddOns.length > 0 && (
              <div className="flex items-center justify-between">
                <span className={`text-sm ${textSecondary}`}>Add-Ons:</span>
                <span className={`text-sm font-semibold ${textPrimary}`}>{currentAddOns.join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Package Selection */}
        <div className="mb-6">
          <h3 className={`text-sm font-semibold ${textTertiary} uppercase tracking-wider mb-3`}>Select Test Package</h3>
          <div className="space-y-3">
            {packages.map((pkg) => (
              <button
                key={pkg.name}
                onClick={() => setSelectedPackage(pkg.name)}
                className={`w-full ${cardBg} rounded-xl p-4 text-left transition-all ${
                  selectedPackage === pkg.name
                    ? `ring-2 ${darkMode ? 'ring-green-500' : 'ring-green-600'} ${darkMode ? 'bg-[#2C2C2C]' : 'bg-green-50'}`
                    : `${darkMode ? 'border border-[#2C2C2C]' : 'border border-gray-200'} ${hoverBg}`
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-semibold ${textPrimary}`}>{pkg.name}</h4>
                      {selectedPackage === pkg.name && (
                        <div className={`size-5 rounded-full ${darkMode ? 'bg-green-500' : 'bg-green-600'} flex items-center justify-center`}>
                          <Check className="size-3 text-white" strokeWidth={3} />
                        </div>
                      )}
                      {pkg.name !== currentPackage && selectedPackage === pkg.name && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'}`}>
                          Change
                        </span>
                      )}
                    </div>
                    <ul className={`text-xs ${textTertiary} space-y-1`}>
                      {pkg.features.map((feature, i) => (
                        <li key={i}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={`text-right ml-4`}>
                    <div className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>${pkg.price}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Add-Ons */}
        <div className="mb-6">
          <h3 className={`text-sm font-semibold ${textTertiary} uppercase tracking-wider mb-3`}>Additional Tests (Optional)</h3>
          <div className="space-y-3">
            {availableAddOns.map((addon) => {
              const isSelected = selectedAddOns.has(addon.name);
              const wasOriginal = currentAddOns.includes(addon.name);
              const isNewlyAdded = isSelected && !wasOriginal;
              const isRemoved = !isSelected && wasOriginal;
              
              return (
                <button
                  key={addon.name}
                  onClick={() => toggleAddOn(addon.name)}
                  className={`w-full ${cardBg} rounded-xl p-4 text-left transition-all ${
                    isSelected
                      ? `ring-2 ${darkMode ? 'ring-green-500' : 'ring-green-600'} ${darkMode ? 'bg-[#2C2C2C]' : 'bg-green-50'}`
                      : `${darkMode ? 'border border-[#2C2C2C]' : 'border border-gray-200'} ${hoverBg}`
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-semibold ${textPrimary}`}>{addon.name}</h4>
                        {isSelected && (
                          <div className={`size-5 rounded-full ${darkMode ? 'bg-green-500' : 'bg-green-600'} flex items-center justify-center`}>
                            <Check className="size-3 text-white" strokeWidth={3} />
                          </div>
                        )}
                        {isNewlyAdded && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'} flex items-center gap-1`}>
                            <Plus className="size-3" />
                            Add
                          </span>
                        )}
                        {isRemoved && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'} flex items-center gap-1`}>
                            <X className="size-3" />
                            Remove
                          </span>
                        )}
                      </div>
                      <p className={`text-xs ${textTertiary}`}>{addon.description}</p>
                    </div>
                    <div className={`text-right ml-4`}>
                      <div className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>+${addon.price}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Additional Notes */}
        <div className="mb-6">
          <h3 className={`text-sm font-semibold ${textTertiary} uppercase tracking-wider mb-3`}>Additional Notes (Optional)</h3>
          <textarea
            value={changeNotes}
            onChange={(e) => setChangeNotes(e.target.value)}
            placeholder="Provide any specific instructions or context for your change request..."
            rows={4}
            className={`w-full ${inputBg} border ${inputBorder} rounded-xl px-4 py-3 text-sm ${textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'} transition-all resize-none`}
          />
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className={`fixed bottom-0 left-0 right-0 ${cardBg} ${darkMode ? 'border-t border-[#2C2C2C]' : 'shadow-lg'} px-4 py-4`}>
        <div className="max-w-2xl mx-auto">
          {!hasChanges() ? (
            <div className={`text-center py-2 ${textTertiary} text-sm`}>
              No changes selected
            </div>
          ) : (
            <button
              onClick={handleSubmitRequest}
              className="w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Check className="size-5" strokeWidth={2.5} />
              Submit Change Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
}