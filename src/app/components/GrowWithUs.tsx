import { X, MapPin, DollarSign, Handshake, BarChart3, Phone, Mail } from 'lucide-react';
import { GenericLabLogo } from '@/app/components/GenericLabLogo';

interface GrowWithUsProps {
  onClose: () => void;
}

export function GrowWithUs({ onClose }: GrowWithUsProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GenericLabLogo className="h-10" />
            <h1 className="text-2xl font-semibold text-gray-900">Grow With Us</h1>
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
            Expand Our Network
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join a trusted brand with decades of excellence in agricultural testing. Bring our proven laboratory services to your region.
          </p>
        </div>

        {/* Why Partner */}
        <div className="mb-12 bg-blue-50 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Partner With Us?</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The agricultural testing industry is growing as farmers increasingly rely on data-driven decisions. We offer a comprehensive partnership model with full support, proven methodologies, and a reputation for accuracy that drives customer loyalty.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">✓</span>
              </div>
              <div className="text-gray-700">Established brand with decades of industry leadership</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">✓</span>
              </div>
              <div className="text-gray-700">Comprehensive training on NIR and wet chemistry methods</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">✓</span>
              </div>
              <div className="text-gray-700">Ongoing technical support and quality control oversight</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
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
              <DollarSign className="w-10 h-10 text-blue-600 mb-3" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Initial Investment</h4>
              <p className="text-sm text-gray-600">
                Includes equipment, facility setup, initial inventory, and training
              </p>
            </div>

            <div className="p-6 bg-white border-2 border-gray-200 rounded-xl">
              <MapPin className="w-10 h-10 text-blue-600 mb-3" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Territory Rights</h4>
              <p className="text-gray-700 mb-3">
                Exclusive geographic territories based on agricultural market density
              </p>
              <p className="text-sm text-gray-600">
                Protected service areas ensure your customer base
              </p>
            </div>

            <div className="p-6 bg-white border-2 border-gray-200 rounded-xl">
              <Handshake className="w-10 h-10 text-blue-600 mb-3" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Ideal Candidate</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Background in agriculture or laboratory science</li>
                <li>• Strong business management skills</li>
                <li>• Commitment to quality and accuracy</li>
                <li>• Community connections in agricultural sector</li>
              </ul>
            </div>

            <div className="p-6 bg-white border-2 border-gray-200 rounded-xl">
              <BarChart3 className="w-10 h-10 text-blue-600 mb-3" />
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
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">The Partnership Process</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Initial Inquiry</h4>
                <p className="text-gray-600">Submit your application and schedule an introductory call with our development team.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Discovery & Due Diligence</h4>
                <p className="text-gray-600">Review disclosure documents, financial projections, and visit our flagship laboratory.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Agreement & Site Selection</h4>
                <p className="text-gray-600">Sign partnership agreement, secure territory rights, and identify optimal laboratory location in your market.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Training & Setup</h4>
                <p className="text-gray-600">Complete intensive training program, install equipment, and prepare for grand opening with marketing support.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
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
        <div className="bg-blue-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-semibold mb-3 text-center">Ready to Learn More?</h3>
          <p className="text-lg mb-6 text-center text-blue-50">
            Contact our partnership development team to receive a detailed information packet
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-blue-600 font-semibold rounded-lg">
              <Phone className="w-5 h-5" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-blue-600 font-semibold rounded-lg">
              <Mail className="w-5 h-5" />
              <span>partnership@laboratory.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
