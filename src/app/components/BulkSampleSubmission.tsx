import { X, Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from 'lucide-react';
import { GenericLabLogo } from '@/app/components/GenericLabLogo';

interface BulkSampleSubmissionProps {
  onClose: () => void;
  testingMode: 'feeds' | 'soil';
}

export function BulkSampleSubmission({ onClose, testingMode }: BulkSampleSubmissionProps) {
  const accentColor = testingMode === 'feeds' ? '#2d7a3e' : 'orange';
  const bgAccent = testingMode === 'feeds' ? 'bg-green-50' : 'bg-orange-50';
  const textAccent = testingMode === 'feeds' ? 'text-[#2d7a3e]' : 'text-orange-700';
  const borderAccent = testingMode === 'feeds' ? 'border-[#2d7a3e]' : 'border-orange-600';
  const hoverAccent = testingMode === 'feeds' ? 'hover:bg-[#246630]' : 'hover:bg-orange-700';

  const feedsColumns = [
    { name: 'Sample_Name', example: 'North Bunker', required: true, description: 'Descriptive name for the sample' },
    { name: 'Container_ID', example: 'NB-2025-001', required: true, description: 'Unique container identifier' },
    { name: 'Sample_Type', example: 'Corn Silage', required: true, description: 'Corn Silage, Hay/Haylage, TMR, or Grains/Commodities' },
    { name: 'Test_Package', example: 'Nutritionist Select', required: true, description: 'Test package name' },
    { name: 'Farm_Name', example: 'Friendly Illinois Brothers', required: true, description: 'Farm or organization name' },
    { name: 'Notes', example: 'First cutting', required: false, description: 'Optional notes or comments' },
  ];

  const soilColumns = [
    { name: 'Sample_Name', example: 'North Field', required: true, description: 'Descriptive name for the sample' },
    { name: 'Container_ID', example: 'NF-2025-001', required: true, description: 'Unique container identifier' },
    { name: 'Sample_Type', example: 'Field/Pasture', required: true, description: 'Field/Pasture, Garden/Lawn, or Commercial' },
    { name: 'Test_Package', example: 'Standard Soil', required: true, description: 'Test package name' },
    { name: 'Farm_Name', example: 'Friendly Illinois Brothers', required: true, description: 'Farm or organization name' },
    { name: 'Acres', example: '40', required: false, description: 'Optional field size in acres' },
    { name: 'Notes', example: 'Corn next year', required: false, description: 'Optional notes or comments' },
  ];

  const columns = testingMode === 'feeds' ? feedsColumns : soilColumns;

  const exampleCSV = testingMode === 'feeds'
    ? `Sample_Name,Container_ID,Sample_Type,Test_Package,Farm_Name,Notes
North Bunker,NB-2025-001,Corn Silage,Nutritionist Select,Friendly Illinois Brothers,First cutting
East Field,EF-2025-002,Hay/Haylage,Standard Profile,Friendly Illinois Brothers,Second cutting
South TMR,TMR-2025-003,TMR,Advanced Plus,Friendly Illinois Brothers,Morning mix`
    : `Sample_Name,Container_ID,Sample_Type,Test_Package,Farm_Name,Acres,Notes
North Field,NF-2025-001,Field/Pasture,Standard Soil,Friendly Illinois Brothers,40,Corn next year
South 20,S20-2025-002,Field/Pasture,Complete Soil,Friendly Illinois Brothers,20,Soybeans planned
Garden Plot,GP-2025-003,Garden/Lawn,Basic Soil Test,Friendly Illinois Brothers,,Vegetable garden`;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GenericLabLogo className="h-10" />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Bulk Sample Submission</h1>
              <p className="text-sm text-gray-600">{testingMode === 'feeds' ? 'Feed & Forage Testing' : 'Soil Testing'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Info Banner */}
        <div className="mb-8 bg-green-50 border-l-4 border-[#2d7a3e] rounded-r-xl p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-[#2d7a3e] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-[#2d7a3e] mb-2">Recommended for 20+ Samples</h3>
              <p className="text-gray-700">
                Bulk CSV upload is the fastest way to submit large batches of samples. Perfect for field sampling campaigns, 
                seasonal testing programs, or when you have multiple samples from the same farm or region.
              </p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Your CSV File</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50">
            <FileSpreadsheet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">Drop your CSV file here or click to browse</p>
            <p className="text-sm text-gray-600 mb-6">Maximum file size: 2MB • Maximum samples: 50 per upload</p>
            <button 
              className="px-8 py-3 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
              style={{ backgroundColor: testingMode === 'feeds' ? '#2d7a3e' : 'rgb(234, 88, 12)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = testingMode === 'feeds' ? '#246630' : 'rgb(194, 65, 12)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = testingMode === 'feeds' ? '#2d7a3e' : 'rgb(234, 88, 12)'}
            >
              <Upload className="w-5 h-5" />
              Select CSV File
            </button>
          </div>
        </div>

        {/* Format Requirements */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">CSV Format Requirements</h2>
          
          {/* Column Specifications */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Column Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Required</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Example</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {columns.map((col, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{col.name}</td>
                      <td className="px-4 py-3 text-sm">
                        {col.required ? (
                          <span className="inline-flex items-center gap-1 text-red-600">
                            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                            Yes
                          </span>
                        ) : (
                          <span className="text-gray-500">Optional</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-700">{col.example}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{col.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Valid Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Valid Sample Types</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {testingMode === 'feeds' ? (
                  <>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2d7a3e]" />
                      Corn Silage
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2d7a3e]" />
                      Hay/Haylage
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2d7a3e]" />
                      TMR
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2d7a3e]" />
                      Grains/Commodities
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-600" />
                      Field/Pasture
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-600" />
                      Garden/Lawn
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-600" />
                      Commercial
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Valid Test Packages</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {testingMode === 'feeds' ? (
                  <>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2d7a3e]" />
                      Basic Check
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2d7a3e]" />
                      Standard Profile
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2d7a3e]" />
                      Nutritionist Select
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2d7a3e]" />
                      Advanced Plus
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2d7a3e]" />
                      CNCPS Complete
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2d7a3e]" />
                      Premium Research
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-600" />
                      Basic Soil Test
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-600" />
                      Standard Soil
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-600" />
                      Complete Soil
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-600" />
                      Premium Soil Analysis
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Important Notes</h3>
            <ul className="space-y-2 text-sm text-blue-900">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span>The first row must contain the column headers exactly as shown above (case-sensitive)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span>Each Container_ID must be unique within your upload and across your account</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span>Use standard CSV format with commas as delimiters</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span>Save your file as .csv format (not .xlsx or other spreadsheet formats)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span>Avoid special characters in sample names and notes</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Example CSV */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Example CSV File</h2>
          <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
            <pre className="text-sm text-green-400 font-mono whitespace-pre">{exampleCSV}</pre>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors text-sm">
              Download Example Template
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors text-sm">
              Copy to Clipboard
            </button>
          </div>
        </div>

        {/* After Upload */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3">After You Upload</h3>
          <ol className="space-y-3 text-sm text-gray-700">
            <li className="flex gap-3">
              <span className="font-semibold text-gray-900 flex-shrink-0">1.</span>
              <span>We'll validate your CSV file and check for any errors or missing required fields</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-gray-900 flex-shrink-0">2.</span>
              <span>You'll see a preview of all samples to review before final submission</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-gray-900 flex-shrink-0">3.</span>
              <span>Once confirmed, all samples will be added to your account and ready for testing</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-gray-900 flex-shrink-0">4.</span>
              <span>Print container labels for each sample and ship to the laboratory</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}