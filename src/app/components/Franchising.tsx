import { X, MapPin, DollarSign, Handshake, BarChart3, Phone, Mail } from 'lucide-react';
import { GenericLabLogo } from '@/app/components/GenericLabLogo';

interface FranchisingProps {
  onClose: () => void;
}

export function Franchising({ onClose }: FranchisingProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GenericLabLogo className="h-10" />
            <h1 className="text-2xl font-semibold text-gray-900">Franchising Opportunities</h1>
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
            Expand the Rock River Network
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join a trusted brand with nearly 50 years of excellence in agricultural testing. Bring our proven laboratory services to your region.
          </p>
        </div>

        {/* Why Franchise */}
        <div className="mb-12 bg-green-50 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Franchise with Rock River Laboratory?</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The agricultural testing industry is growing as farmers increasingly rely on data-driven decisions. Rock River Laboratory offers a turnkey franchise model with comprehensive support, proven methodologies, and a reputation for accuracy that drives customer loyalty.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">✓</span>
              </div>
              <div className="text-gray-700">Established brand with 48+ years of industry leadership</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">✓</span>
              </div>
              <div className="text-gray-700">Comprehensive training on NIR and wet chemistry methods</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">✓</span>
              </div>
              <div className="text-gray-700">Ongoing technical support and quality control oversight</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">✓</span>
              </div>
              <div className="text-gray-700">Marketing materials and customer acquisition strategies</div>
            </div>
          </div>
        </div>

        {/* Investment & Requirements */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Investment & Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border-2 border-gray-200 rounded-xl">
              <DollarSign className="w-10 h-10 text-green-600 mb-3" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Initial Investment</h4>
              <p className="text-sm text-gray-600">
                Includes equipment, facility setup, initial inventory, and training
              </p>
            </div>

            <div className="p-6 bg-white border-2 border-gray-200 rounded-xl">
              <MapPin className="w-10 h-10 text-green-600 mb-3" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Territory Rights</h4>
              <p className="text-gray-700 mb-3">
                Exclusive geographic territories based on agricultural market density
              </p>
              <p className="text-sm text-gray-600">
                Protected service areas ensure your customer base
              </p>
            </div>

            <div className="p-6 bg-white border-2 border-gray-200 rounded-xl">
              <Handshake className="w-10 h-10 text-green-600 mb-3" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Ideal Candidate</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Background in agriculture or laboratory science</li>
                <li>• Strong business management skills</li>
                <li>• Commitment to quality and accuracy</li>
                <li>• Community connections in agricultural sector</li>
              </ul>
            </div>

            <div className="p-6 bg-white border-2 border-gray-200 rounded-xl">
              <BarChart3 className="w-10 h-10 text-green-600 mb-3" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Revenue Potential</h4>
              <p className="text-gray-700 mb-3">
                Strong recurring revenue model with seasonal peak demands
              </p>
              <p className="text-sm text-gray-600">
                Typical locations process 15,000+ samples annually
              </p>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">The Franchise Process</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Initial Inquiry</h4>
                <p className="text-gray-600">Submit your franchise application and schedule an introductory call with our franchise development team.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Discovery & Due Diligence</h4>
                <p className="text-gray-600">Review franchise disclosure documents, financial projections, and visit our flagship laboratory in Watertown, WI.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Agreement & Site Selection</h4>
                <p className="text-gray-600">Sign franchise agreement, secure territory rights, and identify optimal laboratory location in your market.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Training & Setup</h4>
                <p className="text-gray-600">Complete 6-week intensive training program, install equipment, and prepare for grand opening with marketing support.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                5
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Launch & Ongoing Support</h4>
                <p className="text-gray-600">Open your laboratory with on-site assistance, followed by continuous technical support and business coaching.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-green-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-semibold mb-3 text-center">Ready to Learn More?</h3>
          <p className="text-lg mb-6 text-center text-green-50">
            Contact our franchise development team to receive a detailed information packet
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-green-600 font-semibold rounded-lg">
              <Phone className="w-5 h-5" />
              <span>(920) 261-7115</span>
            </div>
            <div className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-green-600 font-semibold rounded-lg">
              <Mail className="w-5 h-5" />
              <span>franchising@rockriver.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}