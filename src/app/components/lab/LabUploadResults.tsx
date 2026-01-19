import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Upload, 
  CheckCircle2, 
  FileText, 
  AlertCircle 
} from 'lucide-react';
import { AdminSection } from './types';

interface LabUploadResultsProps {
  darkMode: boolean;
  setActiveSection: (section: AdminSection) => void;
}

export function LabUploadResults({ darkMode, setActiveSection }: LabUploadResultsProps) {
  const [uploadStep, setUploadStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);

  const themeClasses = useMemo(() => ({
    cardBg: darkMode ? 'bg-[#252525]' : 'bg-white',
    textPrimary: darkMode ? 'text-[#E0E0E0]' : 'text-gray-800',
    textSecondary: darkMode ? 'text-[#C0C0C0]' : 'text-gray-600',
    borderColor: darkMode ? 'border-[#2C2C2C]' : 'border-gray-200',
    hoverBg: darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-50'
  }), [darkMode]);

  const { cardBg, textPrimary, textSecondary, borderColor } = themeClasses;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <button
        onClick={() => setActiveSection('home')}
        className={`flex items-center gap-2 mb-6 -ml-2 p-2 ${textSecondary} transition-colors ${themeClasses.hoverBg} rounded-lg`}
      >
        <ArrowLeft className="size-5" />
        <span className="font-medium">Back</span>
      </button>

      <h2 className={`text-2xl font-bold ${textPrimary} mb-6`}>Upload Results</h2>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-8 px-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex flex-col items-center flex-1 relative">
            <div className={`size-8 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-colors ${
              step <= uploadStep ? 'bg-[#1f5527] text-white' : `${darkMode ? 'bg-[#333]' : 'bg-gray-200'} ${textSecondary}`
            }`}>
              {step < uploadStep ? <CheckCircle2 className="size-5" /> : step}
            </div>
            <div className={`text-xs font-medium ${step <= uploadStep ? textPrimary : textSecondary}`}>
              {step === 1 ? 'Select File' : step === 2 ? 'Verify Data' : 'Confirm'}
            </div>
            {step < 3 && (
              <div className={`absolute top-4 left-[50%] w-full h-[2px] -z-10 ${
                step < uploadStep ? 'bg-[#1f5527]' : darkMode ? 'bg-[#333]' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className={`${cardBg} ${borderColor} border rounded-lg p-8 text-center`}>
        {uploadStep === 1 && (
          <div className="py-8">
            <div className={`mx-auto size-16 rounded-full ${darkMode ? 'bg-[#1e1e1e]' : 'bg-gray-50'} flex items-center justify-center mb-4`}>
              <Upload className={`size-8 ${textSecondary}`} />
            </div>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-2`}>
              Drag and drop your CSV or Excel file here
            </h3>
            <p className={`text-sm ${textSecondary} mb-6 max-w-md mx-auto`}>
              Make sure your file follows the standard template with columns for Sample ID, Test Code, and Result Value.
            </p>
            <div className="flex justify-center gap-3">
              <button className={`px-4 py-2 border ${borderColor} rounded-lg ${textPrimary} hover:${themeClasses.hoverBg}`}>
                Download Template
              </button>
              <button 
                onClick={() => {
                  setUploadStep(2);
                  // Simulate progress
                  let progress = 0;
                  const interval = setInterval(() => {
                    progress += 10;
                    setUploadProgress(progress);
                    if (progress >= 100) clearInterval(interval);
                  }, 200);
                }}
                className="px-4 py-2 bg-[#1f5527] text-white rounded-lg hover:bg-[#2d7a3e]"
              >
                Select File
              </button>
            </div>
          </div>
        )}

        {uploadStep === 2 && (
          <div className="py-4">
            {uploadProgress < 100 ? (
              <div className="max-w-md mx-auto">
                <div className={`text-sm font-medium ${textPrimary} mb-2`}>Processing file...</div>
                <div className={`w-full h-2 ${darkMode ? 'bg-[#333]' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                  <div 
                    className="h-full bg-[#1f5527] transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-left">
                <div className={`flex items-center gap-2 mb-4 p-3 rounded-lg ${darkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-50 text-green-800'}`}>
                  <CheckCircle2 className="size-5" />
                  <span className="font-medium">File processed successfully. 142 results found.</span>
                </div>
                
                <h4 className={`text-sm font-semibold ${textPrimary} mb-3`}>Preview Data</h4>
                <div className={`border ${borderColor} rounded-lg overflow-hidden mb-6`}>
                  <table className="w-full text-sm">
                    <thead className={darkMode ? 'bg-[#333]' : 'bg-gray-50'}>
                      <tr>
                        <th className={`px-4 py-2 text-left ${textSecondary}`}>Sample ID</th>
                        <th className={`px-4 py-2 text-left ${textSecondary}`}>Test Code</th>
                        <th className={`px-4 py-2 text-left ${textSecondary}`}>Value</th>
                        <th className={`px-4 py-2 text-left ${textSecondary}`}>Status</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${borderColor}`}>
                      {[1, 2, 3].map(i => (
                        <tr key={i}>
                          <td className={`px-4 py-2 ${textPrimary}`}>1-652-30{i}</td>
                          <td className={`px-4 py-2 ${textPrimary}`}>DM</td>
                          <td className={`px-4 py-2 ${textPrimary}`}>{(35 + Math.random() * 5).toFixed(1)}%</td>
                          <td className="px-4 py-2 text-green-500 flex items-center gap-1">
                            <CheckCircle2 className="size-3" /> Valid
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => setUploadStep(1)}
                    className={`px-4 py-2 border ${borderColor} rounded-lg ${textPrimary}`}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setUploadStep(3)}
                    className="px-4 py-2 bg-[#1f5527] text-white rounded-lg hover:bg-[#2d7a3e]"
                  >
                    Upload 142 Results
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {uploadStep === 3 && (
          <div className="py-8">
            <div className={`mx-auto size-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4`}>
              <CheckCircle2 className="size-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-2`}>
              Upload Complete!
            </h3>
            <p className={`text-sm ${textSecondary} mb-6 max-w-md mx-auto`}>
              142 results have been successfully uploaded and notifications have been sent to the respective clients.
            </p>
            <button 
              onClick={() => {
                setUploadStep(1);
                setUploadProgress(0);
                setActiveSection('home');
              }}
              className="px-4 py-2 bg-[#1f5527] text-white rounded-lg hover:bg-[#2d7a3e]"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
