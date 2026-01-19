import { X, Wheat, Sprout, Droplet, Box, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SamplingInstructionsProps {
  onClose: () => void;
  testingMode: 'feeds' | 'soil';
  darkMode: boolean;
}

export function SamplingInstructions({ onClose, testingMode, darkMode }: SamplingInstructionsProps) {
  const cardBg = darkMode ? 'bg-[#252525]' : 'bg-white';
  const textPrimary = darkMode ? 'text-[#E0E0E0]' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-[#C0C0C0]' : 'text-gray-700';
  const textTertiary = darkMode ? 'text-[#909090]' : 'text-gray-600';
  const borderColor = darkMode ? 'border-[#2C2C2C]' : 'border-gray-200';
  const accentColor = testingMode === 'feeds' ? '#2d7a3e' : '#411900';

  const feedsInstructions = [
    {
      title: 'Corn Silage Sampling',
      icon: Wheat,
      steps: [
        'Sample from the face of the pile or bunker, taking cores from multiple locations',
        'Collect at least 2-3 pounds (1 kg) of material',
        'Mix samples thoroughly in a clean bucket',
        'Place in a clean plastic bag, removing as much air as possible',
        'Label clearly with sample name and Container ID',
        'Ship within 24 hours using overnight delivery if possible'
      ]
    },
    {
      title: 'Hay & Haylage Sampling',
      icon: Sprout,
      steps: [
        'Use a hay probe to core 15-20 bales from different locations',
        'Take cores from the center of bales, not from the ends',
        'Combine cores to create a composite sample of 2-3 pounds',
        'Mix thoroughly and place in clean plastic bag',
        'For haylage, sample within 48 hours of opening and ship immediately',
        'Keep samples cool during shipping'
      ]
    },
    {
      title: 'TMR & Feed Sampling',
      icon: Droplet,
      steps: [
        'Sample from the feed bunk or mixer at multiple locations',
        'Collect samples throughout the feeding period for best representation',
        'Mix subsamples thoroughly to create composite sample',
        'Collect at least 2 pounds of material',
        'Place in sealed plastic bag, removing excess air',
        'Ship within 24 hours for most accurate results'
      ]
    },
    {
      title: 'Grains & Commodities',
      icon: Box,
      steps: [
        'Use a grain probe to sample from multiple locations in bin or pile',
        'Sample from top, middle, and bottom depths',
        'Collect approximately 2 pounds of material',
        'Mix subsamples thoroughly in clean container',
        'Ensure sample is representative of entire lot',
        'Ship in sealed plastic bag or container'
      ]
    }
  ];

  const soilInstructions = [
    {
      title: 'Field Soil Sampling',
      icon: Wheat,
      steps: [
        'Sample when soil is not too wet or too dry',
        'Take 15-20 cores per sampling area (up to 20 acres)',
        'Sample to 6-8 inches depth for cropland',
        'Mix cores thoroughly in clean plastic bucket',
        'Remove rocks, roots, and debris',
        'Place approximately 2 cups of mixed soil in sample bag'
      ]
    },
    {
      title: 'Garden & Lawn Sampling',
      icon: Sprout,
      steps: [
        'Take 8-10 cores from problem and non-problem areas separately',
        'Sample to 4 inches depth for lawns, 6 inches for gardens',
        'Mix cores from each area separately',
        'Remove grass, roots, and stones',
        'Submit separate samples for problem vs. healthy areas',
        'Label each sample clearly'
      ]
    }
  ];

  const instructions = testingMode === 'feeds' ? feedsInstructions : soilInstructions;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className={`${cardBg} rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between`}
          style={{ borderLeftWidth: '8px', borderLeftColor: accentColor }}
        >
          <div>
            <h2 className={`text-2xl font-bold ${textPrimary}`}>Sampling Instructions</h2>
            <p className={`text-sm ${textTertiary} mt-1`}>
              {testingMode === 'feeds' ? 'Feed & Forage Best Practices' : 'Soil Sampling Best Practices'}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 hover:bg-gray-100 ${darkMode ? 'hover:bg-[#2C2C2C]' : ''} rounded-full transition-colors`}
          >
            <X className={`size-6 ${textSecondary}`} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* General Tips */}
          <div className={`mb-6 p-4 rounded-xl border-l-4`} style={{ 
            backgroundColor: darkMode ? 'rgba(45, 122, 62, 0.1)' : 'rgba(45, 122, 62, 0.05)',
            borderLeftColor: accentColor 
          }}>
            <div className="flex items-start gap-3">
              <AlertCircle className="size-5 flex-shrink-0 mt-0.5" style={{ color: accentColor }} />
              <div>
                <h3 className={`font-semibold ${textPrimary} mb-2`}>General Sampling Tips</h3>
                <ul className={`space-y-1 text-sm ${textSecondary}`}>
                  <li>• Always use clean sampling equipment to avoid contamination</li>
                  <li>• Take samples from multiple locations for representative results</li>
                  <li>• Label all samples clearly with name and Container ID before shipping</li>
                  <li>• Ship samples as soon as possible to maintain sample integrity</li>
                  <li>• Use overnight shipping when possible, especially in warm weather</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Specific Instructions */}
          <div className="space-y-6">
            {instructions.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className={`p-5 rounded-xl border ${borderColor}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: darkMode ? 'rgba(45, 122, 62, 0.2)' : 'rgba(45, 122, 62, 0.1)' }}
                    >
                      <Icon className="size-6" style={{ color: accentColor }} />
                    </div>
                    <h3 className={`text-lg font-semibold ${textPrimary}`}>{item.title}</h3>
                  </div>
                  <ol className={`space-y-2 ${textSecondary}`}>
                    {item.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="size-5 flex-shrink-0 mt-0.5" style={{ color: accentColor }} />
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>

          {/* Contact Info */}
          <div className={`mt-6 p-4 rounded-xl ${darkMode ? 'bg-[#2C2C2C]' : 'bg-gray-50'}`}>
            <p className={`text-sm ${textSecondary} text-center`}>
              Questions about sampling? Contact our laboratory team for personalized guidance and support.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t ${borderColor} flex justify-end`}>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-medium transition-colors"
            style={{ 
              backgroundColor: accentColor,
              color: 'white'
            }}
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
