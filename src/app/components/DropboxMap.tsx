import { X, MapPin, Phone, Clock, Navigation } from 'lucide-react';

interface DropboxMapProps {
  onClose: () => void;
  darkMode?: boolean;
}

const dropboxLocations = [
  {
    id: 1,
    name: 'Watertown, WI',
    address: '622 Commerce Street\nWatertown, WI 53094',
    phone: '(920) 261-3200',
    hours: 'Mon-Fri: 7:00 AM - 5:00 PM\nSat: 7:00 AM - 12:00 PM',
    coordinates: { lat: 43.1947, lng: -88.7290 },
    region: 'Central Wisconsin'
  },
  {
    id: 2,
    name: 'Ithaca, NY',
    address: '215 Langmuir Lab\nIthaca, NY 14853',
    phone: '(607) 257-1000',
    hours: 'Mon-Fri: 8:00 AM - 4:30 PM',
    coordinates: { lat: 42.4440, lng: -76.4820 },
    region: 'Northeast'
  },
  {
    id: 3,
    name: 'Tulare, CA',
    address: '1250 E. Bardsley Ave\nTulare, CA 93274',
    phone: '(559) 686-5505',
    hours: 'Mon-Fri: 6:00 AM - 4:00 PM',
    coordinates: { lat: 36.2077, lng: -119.3473 },
    region: 'West Coast'
  },
  {
    id: 4,
    name: 'Lancaster, PA',
    address: '2123 Old Philadelphia Pike\nLancaster, PA 17602',
    phone: '(717) 392-4817',
    hours: 'Mon-Fri: 7:00 AM - 5:00 PM\nSat: 7:00 AM - 1:00 PM',
    coordinates: { lat: 40.0379, lng: -76.3055 },
    region: 'Mid-Atlantic'
  },
  {
    id: 5,
    name: 'Greeley, CO',
    address: '4156 W. 10th Street\nGreeley, CO 80634',
    phone: '(970) 356-5208',
    hours: 'Mon-Fri: 7:00 AM - 5:00 PM',
    coordinates: { lat: 40.4233, lng: -104.7091 },
    region: 'Mountain West'
  },
  {
    id: 6,
    name: 'Stephenville, TX',
    address: '2405 W. Washington St\nStephenville, TX 76401',
    phone: '(254) 965-5515',
    hours: 'Mon-Fri: 7:30 AM - 4:30 PM',
    coordinates: { lat: 32.2207, lng: -98.2023 },
    region: 'South Central'
  },
  {
    id: 7,
    name: 'Twin Falls, ID',
    address: '1951 Kimberly Road\nTwin Falls, ID 83301',
    phone: '(208) 733-4041',
    hours: 'Mon-Fri: 7:00 AM - 5:00 PM',
    coordinates: { lat: 42.5630, lng: -114.4608 },
    region: 'Northwest'
  },
  {
    id: 8,
    name: 'Marshfield, WI',
    address: '804 S. Central Ave\nMarshfield, WI 54449',
    phone: '(715) 387-2594',
    hours: 'Mon-Fri: 7:00 AM - 5:00 PM',
    coordinates: { lat: 44.6688, lng: -90.1718 },
    region: 'North Central'
  }
];

export function DropboxMap({ onClose, darkMode = false }: DropboxMapProps) {
  const bgPrimary = darkMode ? 'bg-[#1A1A1A]' : 'bg-white';
  const bgCard = darkMode ? 'bg-[#252525]' : 'bg-white';
  const textPrimary = darkMode ? 'text-[#F0F0F0]' : 'text-stone-900';
  const textSecondary = darkMode ? 'text-[#B0B0B0]' : 'text-stone-600';
  const textTertiary = darkMode ? 'text-[#909090]' : 'text-stone-500';
  const borderColor = darkMode ? 'border-[#3A3A3A]' : 'border-stone-200';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`${bgPrimary} rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${borderColor}`}>
          <div>
            <h2 className={`text-2xl font-semibold ${textPrimary}`}>Dropbox Locations</h2>
            <p className={`text-sm ${textSecondary} mt-1`}>Convenient sample drop-off locations across the country</p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-stone-100'} transition-colors ${textSecondary}`}
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Map Placeholder */}
          <div className={`${darkMode ? 'bg-[#2A2A2A] border-[#3A3A3A]' : 'bg-stone-100 border-stone-300'} border-2 rounded-xl h-80 mb-6 flex items-center justify-center relative overflow-hidden`}>
            {/* Simple map illustration */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 800 400">
                {/* US map outline (simplified) */}
                <path 
                  d="M 100 200 L 150 180 L 200 190 L 250 170 L 300 180 L 350 160 L 400 170 L 450 150 L 500 160 L 550 140 L 600 150 L 650 130 L 700 140 L 700 280 L 650 270 L 600 280 L 550 270 L 500 280 L 450 270 L 400 280 L 350 270 L 300 280 L 250 270 L 200 280 L 150 270 L 100 260 Z" 
                  fill="none" 
                  stroke={darkMode ? '#4A4A4A' : '#CBD5E1'} 
                  strokeWidth="2"
                />
              </svg>
              {/* Location pins on map */}
              {dropboxLocations.map((loc, idx) => {
                const x = 150 + (idx * 70);
                const y = 180 + (idx % 2 === 0 ? 20 : -20);
                return (
                  <div
                    key={loc.id}
                    className="absolute"
                    style={{
                      left: `${(x / 800) * 100}%`,
                      top: `${(y / 400) * 100}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <MapPin className={`size-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'} fill-current`} />
                  </div>
                );
              })}
            </div>
            <div className={`text-center z-10 ${textSecondary}`}>
              <MapPin className={`size-16 mx-auto mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <p className={`text-lg font-medium ${textPrimary}`}>8 Locations Nationwide</p>
              <p className="text-sm mt-1">Interactive map coming soon</p>
            </div>
          </div>

          {/* Location Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dropboxLocations.map((location) => (
              <div
                key={location.id}
                className={`${bgCard} border-2 ${borderColor} rounded-xl p-5 hover:${darkMode ? 'border-[#4A4A4A]' : 'border-stone-400'} transition-all`}
              >
                {/* Region Tag */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className={`text-lg font-semibold ${textPrimary}`}>{location.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                    {location.region}
                  </span>
                </div>

                {/* Address */}
                <div className="flex items-start gap-2 mb-3">
                  <MapPin className={`size-4 mt-0.5 flex-shrink-0 ${textTertiary}`} />
                  <p className={`text-sm ${textSecondary} whitespace-pre-line font-mono`}>
                    {location.address}
                  </p>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2 mb-3">
                  <Phone className={`size-4 flex-shrink-0 ${textTertiary}`} />
                  <a 
                    href={`tel:${location.phone}`}
                    className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}
                  >
                    {location.phone}
                  </a>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-2 mb-4">
                  <Clock className={`size-4 mt-0.5 flex-shrink-0 ${textTertiary}`} />
                  <p className={`text-sm ${textSecondary} whitespace-pre-line`}>
                    {location.hours}
                  </p>
                </div>

                {/* Get Directions Button */}
                <button 
                  onClick={() => {
                    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}`;
                    window.open(mapsUrl, '_blank');
                  }}
                  className={`w-full py-2 px-4 rounded-lg border-2 ${
                    darkMode 
                      ? 'border-blue-700 text-blue-400 hover:bg-blue-900/20' 
                      : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                  } transition-all font-medium text-sm flex items-center justify-center gap-2`}
                >
                  <Navigation className="size-4" />
                  Get Directions
                </button>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className={`mt-6 p-4 rounded-lg border-2 ${darkMode ? 'border-blue-700 bg-blue-900/20' : 'border-blue-200 bg-blue-50'}`}>
            <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
              <strong>Note:</strong> Dropbox locations provide same-day processing for samples dropped off during business hours. 
              Please ensure samples are properly labeled with your Container ID before dropping off.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
