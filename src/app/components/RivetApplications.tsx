import { X } from 'lucide-react';
import divingHelmetIcon from 'figma:asset/8d52049ec4887535baaca8bbb16bad072eeac45e.png';

interface RivetApplicationsProps {
  onClose: () => void;
  darkMode: boolean;
}

export function RivetApplications({ onClose, darkMode }: RivetApplicationsProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
      <div 
        className="absolute inset-0 pointer-events-auto" 
        onClick={onClose}
      />
      <div className={`${darkMode ? 'bg-gray-800/95 text-white border border-gray-700' : 'bg-white/95 border border-gray-200'} rounded-lg shadow-2xl w-full max-w-md p-8 pointer-events-auto relative backdrop-blur-sm`}>
        {/* Made by r. change coming soon to a sexy black visit our site buttonContent */}
        <div className="text-center">
          <div className="mb-6">
            <img 
              src={divingHelmetIcon} 
              alt="Diving Helmet" 
              className="w-20 h-20 mx-auto mb-4 opacity-90"
            />
          </div>
          
          <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Coming Soon
          </h3>
        </div>
      </div>
    </div>
  );
}