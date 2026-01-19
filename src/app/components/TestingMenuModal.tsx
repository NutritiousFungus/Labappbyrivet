import React, { useState } from 'react';
import { X, Leaf, Beef, Sprout, MoreHorizontal, Beaker, Droplets, ShoppingBag, Circle, Check, Info, Trophy, Award, Medal, Wheat, FlaskConical, Plus, Sparkles } from 'lucide-react';

interface TestingMenuModalProps {
  onClose: () => void;
  darkMode: boolean;
  testingMode: 'feeds' | 'soil';
  onOpenCustomPackages?: () => void;
}

export function TestingMenuModal({ onClose, darkMode, testingMode, onOpenCustomPackages }: TestingMenuModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Theme-based colors
  const bgPrimary = darkMode ? 'bg-[#1A1A1A]' : 'bg-white';
  const bgCard = darkMode ? 'bg-[#222222]' : 'bg-white';
  const textPrimary = darkMode ? 'text-[#E0E0E0]' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-[#C0C0C0]' : 'text-gray-600';
  const textTertiary = darkMode ? 'text-[#909090]' : 'text-gray-500';
  const borderColor = darkMode ? 'border-[#3C3C3C]' : 'border-gray-200';
  const inputBorder = darkMode ? 'border-[#3C3C3C]' : 'border-gray-200';
  const hoverBg = darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-50';

  const feedCategories = [
    {
      id: 'corn-silage' as const,
      name: 'Corn Silage',
      icon: Beef,
      color: darkMode ? 'bg-green-950/40 border-[#3A3A3A] hover:border-green-800' : 'bg-green-50/30 border-stone-200 hover:border-green-300',
      selectedColor: darkMode ? 'border-green-600 bg-green-950/60' : 'border-green-600 bg-green-50',
      iconColor: darkMode ? 'text-green-500' : 'text-green-600',
    },
    {
      id: 'grass-silage' as const,
      name: 'Grass Silage',
      icon: Leaf,
      color: darkMode ? 'bg-lime-950/40 border-[#3A3A3A] hover:border-lime-800' : 'bg-lime-50/30 border-stone-200 hover:border-lime-300',
      selectedColor: darkMode ? 'border-lime-600 bg-lime-950/60' : 'border-lime-600 bg-lime-50',
      iconColor: darkMode ? 'text-lime-500' : 'text-lime-600',
    },
    {
      id: 'small-grain-silage' as const,
      name: 'Small Grain Silage',
      icon: Wheat,
      color: darkMode ? 'bg-amber-950/40 border-[#3A3A3A] hover:border-amber-800' : 'bg-amber-50/30 border-stone-200 hover:border-amber-300',
      selectedColor: darkMode ? 'border-amber-600 bg-amber-950/60' : 'border-amber-600 bg-amber-50',
      iconColor: darkMode ? 'text-amber-500' : 'text-amber-600',
    },
    {
      id: 'alfalfa' as const,
      name: 'Alfalfa',
      icon: Leaf,
      color: darkMode ? 'bg-emerald-950/40 border-[#3A3A3A] hover:border-emerald-800' : 'bg-emerald-50/30 border-stone-200 hover:border-emerald-300',
      selectedColor: darkMode ? 'border-emerald-600 bg-emerald-950/60' : 'border-emerald-600 bg-emerald-50',
      iconColor: darkMode ? 'text-emerald-500' : 'text-emerald-600',
    },
    {
      id: 'hay-haylage' as const,
      name: 'Hay/Straw',
      icon: Sprout,
      color: darkMode ? 'bg-yellow-950/40 border-[#3A3A3A] hover:border-yellow-800' : 'bg-yellow-50/30 border-stone-200 hover:border-yellow-300',
      selectedColor: darkMode ? 'border-yellow-600 bg-yellow-950/60' : 'border-yellow-600 bg-yellow-50',
      iconColor: darkMode ? 'text-yellow-500' : 'text-yellow-700',
    },
    {
      id: 'tmr' as const,
      name: 'TMR',
      icon: Sprout,
      color: darkMode ? 'bg-orange-950/40 border-[#3A3A3A] hover:border-orange-800' : 'bg-orange-50/30 border-stone-200 hover:border-orange-300',
      selectedColor: darkMode ? 'border-orange-600 bg-orange-950/60' : 'border-orange-600 bg-orange-50',
      iconColor: darkMode ? 'text-orange-500' : 'text-orange-700',
    },
    {
      id: 'corn-grain' as const,
      name: 'Corn Grain',
      icon: Circle,
      color: darkMode ? 'bg-[#411900]/40 border-[#3A3A3A] hover:border-[#411900]' : 'bg-amber-50/30 border-stone-200 hover:border-amber-300',
      selectedColor: darkMode ? 'border-amber-600 bg-[#411900]/60' : 'border-amber-600 bg-amber-50',
      iconColor: darkMode ? 'text-amber-500' : 'text-amber-700',
    },
    {
      id: 'grains-commodities' as const,
      name: 'Other Grains',
      icon: ShoppingBag,
      color: darkMode ? 'bg-[#411900]/40 border-[#3A3A3A] hover:border-[#411900]' : 'bg-amber-50/30 border-stone-200 hover:border-amber-300',
      selectedColor: darkMode ? 'border-amber-600 bg-[#411900]/60' : 'border-amber-500 bg-amber-50',
      iconColor: darkMode ? 'text-amber-500' : 'text-amber-600',
    },
    {
      id: 'water' as const,
      name: 'Water',
      icon: Droplets,
      color: darkMode ? 'bg-blue-950/40 border-[#3A3A3A] hover:border-blue-800' : 'bg-blue-50/30 border-stone-200 hover:border-blue-300',
      selectedColor: darkMode ? 'border-blue-600 bg-blue-950/60' : 'border-blue-600 bg-blue-50',
      iconColor: darkMode ? 'text-blue-400' : 'text-blue-600',
    },
    {
      id: 'fecal' as const,
      name: 'Fecal',
      icon: Beaker,
      color: darkMode ? 'bg-slate-950/40 border-[#3A3A3A] hover:border-slate-800' : 'bg-slate-50/30 border-stone-200 hover:border-slate-300',
      selectedColor: darkMode ? 'border-slate-500 bg-slate-950/60' : 'border-slate-600 bg-slate-50',
      iconColor: darkMode ? 'text-slate-400' : 'text-slate-600',
    },
    {
      id: 'misc-other' as const,
      name: 'Misc/Other',
      icon: MoreHorizontal,
      color: darkMode ? 'bg-gray-950/40 border-[#3A3A3A] hover:border-gray-700' : 'bg-gray-50/30 border-stone-200 hover:border-gray-300',
      selectedColor: darkMode ? 'border-gray-500 bg-gray-900/60' : 'border-gray-600 bg-gray-50',
      iconColor: darkMode ? 'text-gray-400' : 'text-gray-600',
    },
  ];

  const soilCategories = [
    {
      id: 'field-pasture' as const,
      name: 'Field/Pasture',
      icon: Sprout,
      color: darkMode ? 'bg-[#411900]/40 border-[#3A3A3A] hover:border-[#411900]' : 'bg-amber-50/30 border-stone-200 hover:border-amber-300',
      selectedColor: darkMode ? 'border-amber-600 bg-[#411900]/60' : 'border-amber-500 bg-amber-50',
      iconColor: darkMode ? 'text-amber-500' : 'text-amber-600',
    },
    {
      id: 'garden-lawn' as const,
      name: 'Garden/Lawn',
      icon: Sprout,
      color: darkMode ? 'bg-emerald-950/40 border-[#3A3A3A] hover:border-emerald-800' : 'bg-emerald-50/30 border-stone-200 hover:border-emerald-300',
      selectedColor: darkMode ? 'border-emerald-600 bg-emerald-950/60' : 'border-emerald-600 bg-emerald-50',
      iconColor: darkMode ? 'text-emerald-500' : 'text-emerald-600',
    },
    {
      id: 'commercial' as const,
      name: 'Commercial',
      icon: Sprout,
      color: darkMode ? 'bg-slate-950/40 border-[#3A3A3A] hover:border-slate-800' : 'bg-slate-50/30 border-stone-200 hover:border-slate-300',
      selectedColor: darkMode ? 'border-slate-500 bg-slate-950/60' : 'border-slate-600 bg-slate-50',
      iconColor: darkMode ? 'text-slate-400' : 'text-slate-600',
    },
  ];

  const packages = [
    {
      id: 'premium' as const,
      name: 'Comprehensive NIR',
      tier: 'Most Popular',
      price: '$43.50',
      description: 'Comprehensive NIR analysis for precision feeding and research.',
      badge: Trophy,
      badgeColor: darkMode ? 'text-emerald-500' : 'text-emerald-600',
      popular: true,
      color: darkMode ? 'bg-emerald-900/30' : 'bg-emerald-50',
      borderColor: darkMode ? 'border-[#3A3A3A]' : 'border-emerald-200',
      hoverBorder: darkMode ? 'hover:border-emerald-700' : 'hover:border-emerald-300',
      selectedBorder: darkMode ? 'border-emerald-600' : 'border-emerald-600',
      iconColor: darkMode ? 'text-emerald-500' : 'text-emerald-600',
      baseTests: ['Dry Matter', 'Crude Protein', 'ADF', 'NDF', 'Starch', 'Ash', 'Fat'],
      extras: ['Sugar', 'NFC', 'NDFD30', 'NDFD48', 'uNDF240', 'Lignin', 'NDICP', 'ADICP', 'Soluble Protein', 'kd Rate'],
      method: 'NIR' as const
    },
    {
      id: 'nutritionist' as const,
      name: 'NIR Select',
      tier: 'Professional',
      price: '$25.50',
      description: 'Ideal for ration balancing with advanced digestibility metrics.',
      badge: Award,
      badgeColor: darkMode ? 'text-amber-500' : 'text-amber-600',
      popular: false,
      color: darkMode ? 'bg-amber-900/30' : 'bg-amber-50',
      borderColor: darkMode ? 'border-[#3A3A3A]' : 'border-amber-200',
      hoverBorder: darkMode ? 'hover:border-amber-700' : 'hover:border-amber-300',
      selectedBorder: darkMode ? 'border-amber-600' : 'border-amber-600',
      iconColor: darkMode ? 'text-amber-500' : 'text-amber-600',
      baseTests: ['Dry Matter', 'Crude Protein', 'ADF', 'NDF', 'Starch', 'Ash', 'Fat'],
      extras: ['Sugar', 'NFC', 'NDFD30'],
      method: 'NIR' as const
    },
    {
      id: 'standard' as const,
      name: 'Basic NIR',
      tier: 'Essential',
      price: '$16.50',
      description: 'Core NIR nutritional analysis for routine monitoring.',
      badge: Medal,
      badgeColor: darkMode ? 'text-slate-400' : 'text-slate-600',
      popular: false,
      color: darkMode ? 'bg-slate-900/40' : 'bg-slate-50',
      borderColor: darkMode ? 'border-[#3A3A3A]' : 'border-slate-200',
      hoverBorder: darkMode ? 'hover:border-slate-700' : 'hover:border-slate-300',
      selectedBorder: darkMode ? 'border-slate-600' : 'border-slate-600',
      iconColor: darkMode ? 'text-slate-400' : 'text-slate-600',
      baseTests: ['Dry Matter', 'Crude Protein', 'ADF', 'NDF'],
      extras: [],
      method: 'NIR' as const
    },
    {
      id: 'wet-chem-complete' as const,
      name: 'Complete Wet Chemistry',
      tier: 'Lab Grade',
      price: '$89.00',
      description: 'Full wet chemistry analysis with minerals and detailed fiber fractions.',
      badge: FlaskConical,
      badgeColor: darkMode ? 'text-blue-400' : 'text-blue-600',
      popular: false,
      color: darkMode ? 'bg-blue-900/30' : 'bg-blue-50',
      borderColor: darkMode ? 'border-[#3A3A3A]' : 'border-blue-200',
      hoverBorder: darkMode ? 'hover:border-blue-700' : 'hover:border-blue-300',
      selectedBorder: darkMode ? 'border-blue-600' : 'border-blue-600',
      iconColor: darkMode ? 'text-blue-400' : 'text-blue-600',
      baseTests: ['Dry Matter (Oven)', 'Crude Protein (Kjeldahl)', 'ADF (ANKOM)', 'NDF (ANKOM)', 'Starch (YSI)', 'Ash (Muffle Furnace)', 'Ether Extract'],
      extras: ['Ca', 'P', 'Mg', 'K', 'Na', 'S', 'Lignin', 'ADIN', 'NDIN'],
      method: 'Wet Chem' as const
    },
    {
      id: 'wet-chem-standard' as const,
      name: 'Standard Wet Chemistry',
      tier: 'Verification',
      price: '$52.00',
      description: 'Core wet chemistry parameters for NIR calibration verification.',
      badge: FlaskConical,
      badgeColor: darkMode ? 'text-cyan-400' : 'text-cyan-600',
      popular: false,
      color: darkMode ? 'bg-cyan-900/30' : 'bg-cyan-50',
      borderColor: darkMode ? 'border-[#3A3A3A]' : 'border-cyan-200',
      hoverBorder: darkMode ? 'hover:border-cyan-700' : 'hover:border-cyan-300',
      selectedBorder: darkMode ? 'border-cyan-600' : 'border-cyan-600',
      iconColor: darkMode ? 'text-cyan-400' : 'text-cyan-600',
      baseTests: ['Dry Matter (Oven)', 'Crude Protein (Kjeldahl)', 'ADF (ANKOM)', 'NDF (ANKOM)'],
      extras: [],
      method: 'Wet Chem' as const
    }
  ];

  // Mineral add-ons
  const mineralAddOns = [
    {
      id: 'mineral-panel',
      name: 'Mineral Panel',
      price: '$18',
      description: 'Complete macro and trace mineral analysis',
      tests: ['Ca', 'P', 'Mg', 'K', 'Na', 'Cl', 'S', 'Zn', 'Fe', 'Mn', 'Cu', 'Mo'],
      category: 'minerals' as const,
    },
    {
      id: 'macro-minerals',
      name: 'Macro Minerals',
      price: '$12',
      description: 'Essential macro minerals only',
      tests: ['Ca', 'P', 'Mg', 'K', 'Na', 'Cl', 'S'],
      category: 'minerals' as const,
    },
    {
      id: 'micro-minerals',
      name: 'Trace Minerals',
      price: '$10',
      description: 'Trace mineral micronutrients',
      tests: ['Zn', 'Fe', 'Mn', 'Cu', 'Mo'],
      category: 'minerals' as const,
    },
  ];

  // Toxin add-ons
  const toxinAddOns = [
    {
      id: 'mycotoxin-panel',
      name: 'Mycotoxin Panel',
      price: '$65',
      description: '5-toxin ELISA screening',
      tests: ['Aflatoxin', 'DON', 'Zearalenone', 'T2', 'Fumonisin'],
      category: 'toxins' as const,
    },
    {
      id: 'aflatoxin',
      name: 'Aflatoxin Only',
      price: '$20',
      description: 'Single toxin test',
      tests: ['Aflatoxin B1'],
      category: 'toxins' as const,
    },
  ];

  // Other add-ons
  const otherAddOns = [
    {
      id: 'dcad',
      name: 'DCAD',
      price: '$18',
      description: 'Dietary cation-anion difference',
      tests: ['K', 'Na', 'Cl', 'S'],
      category: 'other' as const,
    },
    {
      id: 'starch-bypass',
      name: 'Starch Bypass',
      price: '$11',
      description: 'Rumen-protected starch',
      tests: ['7hr Starch'],
      category: 'other' as const,
    },
    {
      id: 'amino-acids',
      name: 'Amino Acid Panel',
      price: '$95',
      description: 'Complete amino acid profile',
      tests: ['Lysine', 'Methionine', 'Threonine', 'and 15 more'],
      category: 'other' as const,
    },
  ];

  const currentCategories = testingMode === 'feeds' ? feedCategories : soilCategories;
  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnId)
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const InfoTooltip = ({ tests }: { tests: string[] }) => (
    <div className="group relative inline-block">
      <Info className={`size-4 ${textTertiary} cursor-help`} />
      <div className={`absolute left-0 top-6 hidden group-hover:block z-50 ${bgCard} ${borderColor} border rounded-lg p-3 shadow-xl w-64`}>
        <div className={`text-xs font-semibold ${textPrimary} mb-2`}>Included Tests:</div>
        <div className={`text-xs ${textSecondary} space-y-1`}>
          {tests.map((test, i) => (
            <div key={i}>• {test}</div>
          ))}
        </div>
      </div>
    </div>
  );

  const calculateTotal = () => {
    let total = 0;
    if (selectedPackage) {
      const pkg = packages.find(p => p.id === selectedPackage);
      if (pkg) {
        total += parseFloat(pkg.price.replace('$', ''));
      }
    }
    
    selectedAddOns.forEach(addOnId => {
      const addOn = [...mineralAddOns, ...toxinAddOns, ...otherAddOns].find(a => a.id === addOnId);
      if (addOn) {
        total += parseFloat(addOn.price.replace('$', ''));
      }
    });
    
    return total;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div 
        className={`${bgPrimary} rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`sticky top-0 ${bgPrimary} z-10 px-6 py-5 border-b ${borderColor} flex items-center justify-between`}>
          <div>
            <h2 className={`text-2xl font-bold ${textPrimary}`}>Testing Menu & Pricing</h2>
            <p className={`text-sm ${textSecondary} mt-1`}>Browse available tests by sample type</p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 ${hoverBg} rounded-full transition-colors`}
          >
            <X className={`size-6 ${textPrimary}`} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Step 1: Select Sample Category */}
          <div>
            <h3 className={`text-lg font-bold ${textPrimary} mb-4`}>
              Step 1: Select Sample Type
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {currentCategories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      isSelected ? category.selectedColor : category.color
                    }`}
                  >
                    <Icon className={`size-8 ${category.iconColor}`} />
                    <span className={`text-sm font-semibold ${textPrimary}`}>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Test Package (only show if category selected) */}
          {selectedCategory && (
            <div>
              <h3 className={`text-lg font-bold ${textPrimary} mb-4`}>
                Step 2: Select Test Package
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packages.map((pkg) => {
                  const BadgeIcon = pkg.badge;
                  const isSelected = selectedPackage === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`text-left p-5 rounded-xl border-2 transition-all ${
                        isSelected ? pkg.selectedBorder : pkg.borderColor
                      } ${pkg.hoverBorder} ${pkg.color}`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {pkg.popular && (
                          <div className="inline-block px-2 py-1 bg-emerald-600 text-white text-xs font-bold rounded">
                            {pkg.tier}
                          </div>
                        )}
                        <div className={`inline-block px-2 py-1 text-xs font-bold rounded ${
                          pkg.method === 'NIR' 
                            ? `${darkMode ? 'bg-amber-900/50 text-amber-400' : 'bg-amber-100 text-amber-700'}` 
                            : `${darkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-700'}`
                        }`}>
                          {pkg.method}
                        </div>
                      </div>
                      <div className="flex items-start gap-3 mb-3">
                        <BadgeIcon className={`size-6 ${pkg.badgeColor}`} />
                        <div className="flex-1">
                          <h4 className={`font-bold text-lg ${textPrimary}`}>{pkg.name}</h4>
                          <p className={`text-sm ${textSecondary} mt-1`}>{pkg.description}</p>
                        </div>
                        <div className={`text-2xl font-bold ${pkg.iconColor}`}>{pkg.price}</div>
                      </div>
                      <div className={`text-xs ${textTertiary} space-y-1`}>
                        <div className="font-semibold">Base Tests:</div>
                        <div>{pkg.baseTests.join(', ')}</div>
                        {pkg.extras.length > 0 && (
                          <>
                            <div className="font-semibold mt-2">Additional Metrics:</div>
                            <div>{pkg.extras.join(', ')}</div>
                          </>
                        )}
                      </div>
                      {isSelected && (
                        <div className="mt-3 flex items-center gap-2 text-emerald-600">
                          <Check className="size-5" />
                          <span className="font-semibold text-sm">Selected</span>
                        </div>
                      )}
                    </button>
                  );
                })}

                {/* Custom Package Builder Card */}
                <button
                  onClick={() => {
                    if (onOpenCustomPackages) {
                      onOpenCustomPackages();
                    }
                  }}
                  className={`text-left p-5 rounded-xl border-2 transition-all ${
                    darkMode ? 'border-purple-800 bg-purple-950/30 hover:border-purple-700' : 'border-purple-300 bg-purple-50 hover:border-purple-400'
                  }`}
                >
                  <div className="inline-block px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded mb-3">
                    Custom
                  </div>
                  <div className="flex items-start gap-3 mb-3">
                    <Sparkles className={`size-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    <div className="flex-1">
                      <h4 className={`font-bold text-lg ${textPrimary}`}>Build Your Own</h4>
                      <p className={`text-sm ${textSecondary} mt-1`}>Create a custom package with your exact test selection.</p>
                    </div>
                    <Plus className={`size-8 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  </div>
                  <div className={`text-xs ${textTertiary} space-y-1`}>
                    <div className="font-semibold">Features:</div>
                    <div>• Select individual NIR and wet chemistry tests</div>
                    <div>• Mix and match any analytes</div>
                    <div>• Save for future use</div>
                    <div>• Custom pricing based on selection</div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-purple-600">
                    <Plus className="size-5" />
                    <span className="font-semibold text-sm">Open Builder</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Add Optional Tests (only show if package selected) */}
          {selectedPackage && (
            <div>
              <h3 className={`text-lg font-bold ${textPrimary} mb-4`}>
                Step 3: Add Optional Tests (Optional)
              </h3>

              {/* Minerals */}
              <div className="mb-6">
                <h4 className={`text-sm font-semibold ${textSecondary} mb-3 uppercase tracking-wide`}>Minerals</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  {mineralAddOns.map((addOn) => {
                    const isSelected = selectedAddOns.includes(addOn.id);
                    return (
                      <button
                        key={addOn.id}
                        onClick={() => toggleAddOn(addOn.id)}
                        className={`w-full rounded-lg transition-all border-2 p-4 ${
                          isSelected
                            ? `border-stone-600 ${darkMode ? 'bg-[#2A2A2A]' : 'bg-stone-50'}`
                            : `${inputBorder} ${bgCard} ${darkMode ? 'hover:border-stone-600' : 'hover:border-stone-400'}`
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-semibold ${textPrimary}`}>{addOn.name}</h4>
                              <InfoTooltip tests={addOn.tests} />
                              <span className={`text-sm font-bold ${textSecondary} ml-auto`}>
                                +{addOn.price}
                              </span>
                            </div>
                            <p className={`text-xs ${textTertiary}`}>{addOn.description}</p>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="mt-2 flex items-center gap-1 text-emerald-600">
                            <Check className="size-4" />
                            <span className="text-xs font-semibold">Added</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Toxins */}
              <div className="mb-6">
                <h4 className={`text-sm font-semibold ${textSecondary} mb-3 uppercase tracking-wide`}>Toxins & Mycotoxins</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  {toxinAddOns.map((addOn) => {
                    const isSelected = selectedAddOns.includes(addOn.id);
                    return (
                      <button
                        key={addOn.id}
                        onClick={() => toggleAddOn(addOn.id)}
                        className={`w-full rounded-lg transition-all border-2 p-4 ${
                          isSelected
                            ? `border-stone-600 ${darkMode ? 'bg-[#2A2A2A]' : 'bg-stone-50'}`
                            : `${inputBorder} ${bgCard} ${darkMode ? 'hover:border-stone-600' : 'hover:border-stone-400'}`
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-semibold ${textPrimary}`}>{addOn.name}</h4>
                              <InfoTooltip tests={addOn.tests} />
                              <span className={`text-sm font-bold ${textSecondary} ml-auto`}>
                                +{addOn.price}
                              </span>
                            </div>
                            <p className={`text-xs ${textTertiary}`}>{addOn.description}</p>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="mt-2 flex items-center gap-1 text-emerald-600">
                            <Check className="size-4" />
                            <span className="text-xs font-semibold">Added</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Other */}
              <div className="mb-6">
                <h4 className={`text-sm font-semibold ${textSecondary} mb-3 uppercase tracking-wide`}>Other</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  {otherAddOns.map((addOn) => {
                    const isSelected = selectedAddOns.includes(addOn.id);
                    return (
                      <button
                        key={addOn.id}
                        onClick={() => toggleAddOn(addOn.id)}
                        className={`w-full rounded-lg transition-all border-2 p-4 ${
                          isSelected
                            ? `border-stone-600 ${darkMode ? 'bg-[#2A2A2A]' : 'bg-stone-50'}`
                            : `${inputBorder} ${bgCard} ${darkMode ? 'hover:border-stone-600' : 'hover:border-stone-400'}`
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-semibold ${textPrimary}`}>{addOn.name}</h4>
                              <InfoTooltip tests={addOn.tests} />
                              <span className={`text-sm font-bold ${textSecondary} ml-auto`}>
                                +{addOn.price}
                              </span>
                            </div>
                            <p className={`text-xs ${textTertiary}`}>{addOn.description}</p>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="mt-2 flex items-center gap-1 text-emerald-600">
                            <Check className="size-4" />
                            <span className="text-xs font-semibold">Added</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with pricing */}
        {selectedPackage && (
          <div className={`sticky bottom-0 ${bgPrimary} border-t ${borderColor} px-6 py-4 flex items-center justify-between`}>
            <div>
              <div className={`text-sm ${textSecondary}`}>Estimated Total</div>
              <div className={`text-3xl font-bold ${textPrimary}`}>${calculateTotal().toFixed(2)}</div>
              {selectedAddOns.length > 0 && (
                <div className={`text-xs ${textTertiary} mt-1`}>
                  Base package + {selectedAddOns.length} add-on{selectedAddOns.length > 1 ? 's' : ''}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className={`px-6 py-3 rounded-lg font-semibold ${darkMode ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white transition-colors`}
            >
              Done Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
