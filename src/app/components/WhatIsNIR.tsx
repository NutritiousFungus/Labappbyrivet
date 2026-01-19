import React from 'react';
import { X, Zap, Eye, TrendingUp, Clock, DollarSign, Target, CheckCircle2, Lightbulb, LineChart, Sparkles } from 'lucide-react';

interface WhatIsNIRProps {
  onClose: () => void;
  darkMode?: boolean;
}

export function WhatIsNIR({ onClose, darkMode = false }: WhatIsNIRProps) {
  const bgPrimary = darkMode ? 'bg-[#0A0A0A]' : 'bg-white';
  const bgSecondary = darkMode ? 'bg-[#1A1A1A]' : 'bg-stone-50';
  const bgCard = darkMode ? 'bg-[#1A1A1A]' : 'bg-white';
  const textPrimary = darkMode ? 'text-[#E8E8E8]' : 'text-stone-900';
  const textSecondary = darkMode ? 'text-[#A0A0A0]' : 'text-stone-600';
  const textTertiary = darkMode ? 'text-[#808080]' : 'text-stone-500';
  const borderColor = darkMode ? 'border-[#2A2A2A]' : 'border-stone-200';
  const accentBlue = darkMode ? 'text-blue-400' : 'text-blue-600';
  const accentGreen = darkMode ? 'text-green-400' : 'text-green-600';

  return (
    <div className={`fixed inset-0 ${bgPrimary} z-50 flex flex-col`}>
      {/* Header */}
      <header className={`${bgSecondary} shadow-sm px-4 py-4 border-b ${borderColor}`}>
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <h1 className={`text-xl md:text-2xl font-bold ${textPrimary}`}>What is NIR?</h1>
          <button
            onClick={onClose}
            className={`p-2 ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-stone-200'} rounded-full transition-colors`}
            aria-label="Close"
          >
            <X className={`size-5 ${textSecondary}`} />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
          {/* Hero Section */}
          <div className={`${bgCard} rounded-2xl p-6 md:p-8 border ${borderColor}`}>
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-blue-950/30' : 'bg-blue-50'}`}>
                <Sparkles className={`size-8 ${accentBlue}`} />
              </div>
              <div className="flex-1">
                <h2 className={`text-2xl md:text-3xl font-bold ${textPrimary} mb-3`}>
                  Near-Infrared Spectroscopy
                </h2>
                <p className={`text-base md:text-lg ${textSecondary} leading-relaxed`}>
                  NIR (Near-Infrared Spectroscopy) is a cutting-edge, non-destructive analytical technique that uses light wavelengths to measure the chemical composition of agricultural materials like feed, forage, and soil.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div>
            <h3 className={`text-xl md:text-2xl font-bold ${textPrimary} mb-4`}>How NIR Technology Works</h3>
            <div className={`${bgCard} rounded-2xl p-6 md:p-8 border ${borderColor}`}>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full ${darkMode ? 'bg-blue-950/30' : 'bg-blue-50'} flex items-center justify-center`}>
                    <span className={`font-bold ${accentBlue}`}>1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${textPrimary} mb-2`}>Light Absorption</h4>
                    <p className={`${textSecondary} text-sm md:text-base`}>
                      Your sample is exposed to near-infrared light wavelengths (typically 700-2500 nanometers). Different molecules absorb light at different wavelengths.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full ${darkMode ? 'bg-blue-950/30' : 'bg-blue-50'} flex items-center justify-center`}>
                    <span className={`font-bold ${accentBlue}`}>2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${textPrimary} mb-2`}>Spectral Analysis</h4>
                    <p className={`${textSecondary} text-sm md:text-base`}>
                      The instrument measures how much light is reflected back, creating a unique spectral "fingerprint" for your sample.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full ${darkMode ? 'bg-blue-950/30' : 'bg-blue-50'} flex items-center justify-center`}>
                    <span className={`font-bold ${accentBlue}`}>3</span>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${textPrimary} mb-2`}>Advanced Calibration</h4>
                    <p className={`${textSecondary} text-sm md:text-base`}>
                      Sophisticated algorithms compare your sample's spectrum against thousands of reference samples to predict nutrient composition with incredible accuracy.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full ${darkMode ? 'bg-green-950/30' : 'bg-green-50'} flex items-center justify-center`}>
                    <span className={`font-bold ${accentGreen}`}>4</span>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${textPrimary} mb-2`}>Instant Results</h4>
                    <p className={`${textSecondary} text-sm md:text-base`}>
                      Within seconds, you receive comprehensive nutritional analysis including protein, fiber, moisture, energy values, and more—all from a single scan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits for Customers */}
          <div>
            <h3 className={`text-xl md:text-2xl font-bold ${textPrimary} mb-4`}>How This Technology Helps You</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Speed */}
              <div className={`${bgCard} rounded-xl p-5 border ${borderColor}`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-lg ${darkMode ? 'bg-green-950/30' : 'bg-green-50'}`}>
                    <Clock className={`size-6 ${accentGreen}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${textPrimary} mb-2`}>Lightning-Fast Results</h4>
                    <p className={`text-sm ${textSecondary}`}>
                      Get comprehensive feed analysis in days, not weeks. Make timely decisions about ration formulation and feed purchasing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cost Effective */}
              <div className={`${bgCard} rounded-xl p-5 border ${borderColor}`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-lg ${darkMode ? 'bg-blue-950/30' : 'bg-blue-50'}`}>
                    <DollarSign className={`size-6 ${accentBlue}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${textPrimary} mb-2`}>Cost-Effective Testing</h4>
                    <p className={`text-sm ${textSecondary}`}>
                      NIR allows for affordable, routine testing so you can monitor feed quality consistently throughout the season.
                    </p>
                  </div>
                </div>
              </div>

              {/* Accuracy */}
              <div className={`${bgCard} rounded-xl p-5 border ${borderColor}`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-lg ${darkMode ? 'bg-purple-950/30' : 'bg-purple-50'}`}>
                    <Target className={`size-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${textPrimary} mb-2`}>Proven Accuracy</h4>
                    <p className={`text-sm ${textSecondary}`}>
                      NIR results are validated against traditional wet chemistry methods, ensuring you receive reliable data you can trust.
                    </p>
                  </div>
                </div>
              </div>

              {/* Better Management */}
              <div className={`${bgCard} rounded-xl p-5 border ${borderColor}`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-lg ${darkMode ? 'bg-amber-950/30' : 'bg-amber-50'}`}>
                    <TrendingUp className={`size-6 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${textPrimary} mb-2`}>Optimize Feed Management</h4>
                    <p className={`text-sm ${textSecondary}`}>
                      Track feed quality over time, identify trends, and adjust rations precisely to maximize animal performance and minimize waste.
                    </p>
                  </div>
                </div>
              </div>

              {/* Non-Destructive */}
              <div className={`${bgCard} rounded-xl p-5 border ${borderColor}`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-lg ${darkMode ? 'bg-emerald-950/30' : 'bg-emerald-50'}`}>
                    <Eye className={`size-6 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${textPrimary} mb-2`}>Non-Destructive Testing</h4>
                    <p className={`text-sm ${textSecondary}`}>
                      Your samples remain intact during analysis—no chemicals, no waste. Environmentally friendly and safe.
                    </p>
                  </div>
                </div>
              </div>

              {/* Comprehensive */}
              <div className={`${bgCard} rounded-xl p-5 border ${borderColor}`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-lg ${darkMode ? 'bg-indigo-950/30' : 'bg-indigo-50'}`}>
                    <LineChart className={`size-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${textPrimary} mb-2`}>Comprehensive Analysis</h4>
                    <p className={`text-sm ${textSecondary}`}>
                      Get multiple parameters from a single test—protein, fiber fractions, energy, moisture, and more—giving you a complete nutritional profile.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-World Applications */}
          <div>
            <h3 className={`text-xl md:text-2xl font-bold ${textPrimary} mb-4`}>Real-World Applications</h3>
            <div className={`${bgCard} rounded-xl p-6 md:p-8 border ${borderColor}`}>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className={`size-5 ${accentGreen} flex-shrink-0 mt-0.5`} />
                  <div>
                    <p className={`font-medium ${textPrimary} mb-1`}>Ration Formulation</p>
                    <p className={`text-sm ${textSecondary}`}>
                      Use precise nutrient data to balance rations that meet your herd's exact nutritional needs, improving milk production and animal health.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className={`size-5 ${accentGreen} flex-shrink-0 mt-0.5`} />
                  <div>
                    <p className={`font-medium ${textPrimary} mb-1`}>Feed Purchasing Decisions</p>
                    <p className={`text-sm ${textSecondary}`}>
                      Verify feed quality before purchasing large quantities. Know exactly what you're buying and negotiate fair prices based on actual nutrient content.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className={`size-5 ${accentGreen} flex-shrink-0 mt-0.5`} />
                  <div>
                    <p className={`font-medium ${textPrimary} mb-1`}>Harvest Timing</p>
                    <p className={`text-sm ${textSecondary}`}>
                      Test crops at different maturity stages to determine the optimal harvest window for maximum nutritional value.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className={`size-5 ${accentGreen} flex-shrink-0 mt-0.5`} />
                  <div>
                    <p className={`font-medium ${textPrimary} mb-1`}>Storage Quality Monitoring</p>
                    <p className={`text-sm ${textSecondary}`}>
                      Track how feed quality changes during storage, detecting spoilage or degradation early before it impacts your animals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className={`size-5 ${accentGreen} flex-shrink-0 mt-0.5`} />
                  <div>
                    <p className={`font-medium ${textPrimary} mb-1`}>Troubleshooting Performance Issues</p>
                    <p className={`text-sm ${textSecondary}`}>
                      When herd performance drops unexpectedly, quickly test your feeds to identify potential nutritional imbalances or quality problems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Info Box */}
          <div className={`${darkMode ? 'bg-gradient-to-br from-blue-950/40 to-green-950/40' : 'bg-gradient-to-br from-blue-50 to-green-50'} rounded-2xl p-6 md:p-8 border-2 ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-blue-900/50' : 'bg-white'}`}>
                <Lightbulb className={`size-7 ${accentBlue}`} />
              </div>
              <div className="flex-1">
                <h4 className={`font-bold text-lg ${textPrimary} mb-2`}>
                  The Bottom Line
                </h4>
                <p className={`${textSecondary} leading-relaxed`}>
                  NIR technology transforms how you manage feed and forage quality. By providing fast, accurate, and affordable nutritional analysis, this app empowers you to make data-driven decisions that improve animal performance, reduce feed costs, and increase your operation's profitability. Whether you're a dairy producer, beef rancher, or nutritionist, NIR gives you the insights you need to succeed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
