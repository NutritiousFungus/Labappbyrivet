import { X, Briefcase, Heart, TrendingUp, GraduationCap } from 'lucide-react';
import { GenericLabLogo } from '@/app/components/GenericLabLogo';

interface CareersProps {
  onClose: () => void;
}

export function Careers({ onClose }: CareersProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GenericLabLogo className="h-10" />
            <h1 className="text-2xl font-semibold text-gray-900">Careers</h1>
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
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build a rewarding career in agricultural science at one of the industry's most trusted laboratories.
          </p>
        </div>

        {/* Why Work Here */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Work With Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-50 rounded-xl">
              <Heart className="w-10 h-10 text-green-600 mb-3" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Meaningful Work</h4>
              <p className="text-gray-700">
                Help farmers and agronomists make better decisions that impact food production and environmental sustainability.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl">
              <TrendingUp className="w-10 h-10 text-green-600 mb-3" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Career Growth</h4>
              <p className="text-gray-700">
                Advance your career with ongoing training, mentorship, and opportunities to specialize in cutting-edge analytical techniques.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl">
              <GraduationCap className="w-10 h-10 text-green-600 mb-3" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Learning Environment</h4>
              <p className="text-gray-700">
                Work with state-of-the-art NIR and wet chemistry equipment alongside experienced scientists and technicians.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl">
              <Briefcase className="w-10 h-10 text-green-600 mb-3" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Competitive Benefits</h4>
              <p className="text-gray-700">
                Enjoy comprehensive health insurance, retirement plans, paid time off, and employee wellness programs.
              </p>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Open Positions</h3>
          <div className="space-y-4">
            <div className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-green-400 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Lab Technician</h4>
                  <p className="text-sm text-gray-600">Watertown, WI • Full-time</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  Open
                </span>
              </div>
              <p className="text-gray-700 mb-3">
                Perform feed and soil sample preparation and analysis using NIR and wet chemistry methods. Entry-level position with comprehensive training provided.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Requirements:</strong> High school diploma or equivalent, attention to detail, willingness to learn
              </p>
            </div>

            <div className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-green-400 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Nutritionist / Consultant</h4>
                  <p className="text-sm text-gray-600">Remote • Full-time</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  Open
                </span>
              </div>
              <p className="text-gray-700 mb-3">
                Provide expert consultation to dairy and livestock producers. Interpret feed analysis results and develop customized nutrition programs.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Requirements:</strong> Bachelor's degree in Animal Science or related field, 3+ years experience in dairy nutrition
              </p>
            </div>

            <div className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-green-400 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Quality Assurance Specialist</h4>
                  <p className="text-sm text-gray-600">Watertown, WI • Full-time</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  Open
                </span>
              </div>
              <p className="text-gray-700 mb-3">
                Oversee laboratory quality control programs, calibration protocols, and compliance with industry standards. Ensure accuracy and reliability of all test results.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Requirements:</strong> Bachelor's degree in Chemistry or related field, 2+ years QA/QC experience
              </p>
            </div>
          </div>
        </div>

        {/* Apply CTA */}
        <div className="bg-green-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-semibold mb-3">Ready to Apply?</h3>
          <p className="text-lg mb-6 text-green-50">
            Send your resume and cover letter to our HR department
          </p>
          <div className="inline-block px-6 py-3 bg-white text-green-600 font-semibold rounded-lg">
            careers@rockriverlaboratory.com
          </div>
        </div>
      </div>
    </div>
  );
}