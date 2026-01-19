import { X, Award, Users, MapPin, Phone, Mail } from 'lucide-react';
import { GenericLabLogo } from '@/app/components/GenericLabLogo';

interface AboutUsProps {
  onClose: () => void;
}

export function AboutUs({ onClose }: AboutUsProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GenericLabLogo className="h-10" />
            <h1 className="text-2xl font-semibold text-gray-900">About Us</h1>
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
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <GenericLabLogo className="h-20 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Leading Agricultural Testing Since 1976
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our laboratory provides accurate, timely analytical services to help farmers and nutritionists optimize feed quality and soil health.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-12 bg-green-50 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            To deliver the most accurate and reliable feed and soil analysis in the industry, empowering agricultural professionals to make data-driven decisions that improve productivity, profitability, and sustainability.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-white border border-gray-200 rounded-xl">
            <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-2">48+ Years</div>
            <div className="text-gray-600">Industry Experience</div>
          </div>
          <div className="text-center p-6 bg-white border border-gray-200 rounded-xl">
            <Users className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-2">10,000+</div>
            <div className="text-gray-600">Satisfied Customers</div>
          </div>
          <div className="text-center p-6 bg-white border border-gray-200 rounded-xl">
            <MapPin className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-2">50 States</div>
            <div className="text-gray-600">Nationwide Service</div>
          </div>
        </div>

        {/* Services */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Services</h3>
          <div className="space-y-4">
            <div className="p-6 bg-white border border-gray-200 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Feed & Forage Testing</h4>
              <p className="text-gray-600">
                Comprehensive nutritional analysis using state-of-the-art NIR technology and wet chemistry methods. From basic checks to advanced CNCPS profiles.
              </p>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Soil Testing</h4>
              <p className="text-gray-600">
                Complete soil fertility analysis including pH, nutrient levels, CEC, and organic matter. Customized recommendations for optimal crop production.
              </p>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Consulting Services</h4>
              <p className="text-gray-600">
                Expert nutritionists and agronomists available to help interpret results and develop customized feeding and fertilization programs.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Contact Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">Headquarters</div>
                <div className="text-gray-600">Watertown, Wisconsin</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">Phone</div>
                <div className="text-gray-600">(920) 261-7115</div>
              </div>
            </div>
            <div className="flex items-center gap-3 md:col-span-2">
              <Mail className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">Email</div>
                <div className="text-gray-600">info@rockriverlaboratory.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}